import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, finalize, map, of, shareReplay, tap } from 'rxjs';
import { ApiService } from './apiservice.service';

export type SupportedCurrencyCode = 'USD' | 'EGP';

export interface CurrencyOption {
  id: number;
  code: SupportedCurrencyCode;
  name: string;
  symbol: string;
}

interface CurrencyRate {
  fromCurrency: 'USD';
  toCurrency: 'EGP';
  rate: number;
  rateDate: string | null;
  provider: string | null;
  isStale: boolean;
}

interface CacheEntry<T> {
  cachedAt: number;
  value: T;
}

const FALLBACK_CURRENCIES: CurrencyOption[] = [
  { id: 2, code: 'USD', name: 'USD', symbol: '$' },
  { id: 1, code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
];
const CURRENCY_CACHE_TTL_MS = 24 * 60 * 60 * 1_000;
const RATE_CACHE_TTL_MS = 6 * 60 * 60 * 1_000;
const RATE_MAX_STALE_MS = 72 * 60 * 60 * 1_000;
const LEGACY_RATE_ASSUMED_AGE_MS = 24 * 60 * 60 * 1_000;
const CURRENCY_CACHE_KEY = 'seaworld.currency-options.v1';
const RATE_CACHE_KEY = 'seaworld.usd-egp-rate.v1';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  readonly options = signal<CurrencyOption[]>(FALLBACK_CURRENCIES);
  readonly currentCurrency;
  readonly usdToEgpRate = signal<number | null>(null);
  readonly rateDate = signal<string | null>(null);
  readonly rateProvider = signal<string | null>(null);
  readonly isRateStale = signal(false);
  readonly isLoading = signal(false);
  readonly isRateLoading = signal(false);
  readonly currencyError = signal<string | null>(null);
  readonly rateError = signal<string | null>(null);

  private readonly currencyCookie = 'currency';
  private readonly legacyRateCookie = 'usdToEgpRate';
  private currencyRequest$: Observable<CurrencyOption[] | null> | null = null;
  private rateRequest$: Observable<CurrencyRate | null> | null = null;
  private rateCachedAt = 0;
  private rateNeedsRefresh = false;
  private rateRefreshScheduled = false;
  private automaticRateAttempted = false;
  private readonly amountFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  constructor(private readonly cookies: CookieService, private readonly api: ApiService) {
    const currencyCache = this.readCache<CurrencyOption[]>(CURRENCY_CACHE_KEY);
    const normalizedCachedOptions = this.normalizeOptions(currencyCache?.value);
    const cachedOptions = normalizedCachedOptions || FALLBACK_CURRENCIES;
    this.options.set(cachedOptions);
    this.currentCurrency = signal<CurrencyOption>(this.resolveSaved(cachedOptions));

    const rateCache = this.readCache<CurrencyRate>(RATE_CACHE_KEY);
    const cachedRate = this.normalizeRate(rateCache?.value);
    if (cachedRate && rateCache && this.cacheAge(rateCache) <= RATE_MAX_STALE_MS) {
      this.rateCachedAt = rateCache.cachedAt;
      this.rateNeedsRefresh = !this.rateCacheFresh(rateCache);
      this.applyRate({
        ...cachedRate,
        isStale: cachedRate.isStale || this.rateNeedsRefresh,
      });
    } else {
      this.applyLegacyRate();
    }

    if (!currencyCache || !normalizedCachedOptions || !this.currencyCacheFresh(currencyCache)) {
      this.loadCurrencies();
    }
    if (this.currentCurrency().code === 'EGP'
      && (!rateCache || !cachedRate || !this.rateCacheFresh(rateCache) || this.usdToEgpRate() === null)) {
      this.automaticRateAttempted = true;
      if (this.usableExchangeRate() === null) {
        const requestedCurrency = this.currentCurrency();
        this.currentCurrency.set(
          this.options().find((option) => option.code === 'USD') ?? this.currentCurrency(),
        );
        this.loadExchangeRate(false, () => {
          const latestOption = this.options().find((option) => option.code === requestedCurrency.code);
          if (latestOption) this.commitCurrency(latestOption);
        });
      } else {
        this.loadExchangeRate();
      }
    }
  }

  loadCurrencies(force = false): Observable<CurrencyOption[] | null> {
    if (this.currencyRequest$) return this.currencyRequest$;
    const cache = this.readCache<CurrencyOption[]>(CURRENCY_CACHE_KEY);
    const cachedOptions = this.normalizeOptions(cache?.value);
    if (!force && cache && cachedOptions && this.currencyCacheFresh(cache)) return of(this.options());

    this.isLoading.set(true);
    this.currencyError.set(null);
    const request$ = this.api.getUnauthntecated('Currencies').pipe(
      map((response: unknown) => this.parseCurrenciesResponse(response)),
      tap((currencies) => {
        this.options.set(currencies);
        this.currentCurrency.set(this.resolveCurrent(currencies));
        this.writeCache(CURRENCY_CACHE_KEY, currencies);
      }),
      catchError(() => {
        this.currencyError.set('currencyListLoadError');
        return of(null);
      }),
      finalize(() => {
        this.isLoading.set(false);
        this.currencyRequest$ = null;
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    this.currencyRequest$ = request$;
    request$.subscribe();
    return request$;
  }

  selectCurrency(code: string): void {
    const normalizedCode = this.tryResolveCurrencyCode(code);
    if (!normalizedCode) return;
    const selected = this.options().find((option) => option.code === normalizedCode);
    if (!selected) return;

    const isChanging = selected.code !== this.currentCurrency().code;
    if (isChanging && this.usableExchangeRate() === null) {
      this.automaticRateAttempted = true;
      this.loadExchangeRate(true, () => this.commitCurrency(selected));
      return;
    }

    if (isChanging) this.commitCurrency(selected);

    if (selected.code === 'EGP' && this.shouldRefreshRate()) {
      this.automaticRateAttempted = true;
      this.loadExchangeRate(this.rateError() !== null);
    }
  }

  convert(value: unknown, sourceCurrency: unknown = 'USD'): number {
    const price = this.normalizeAmount(value);
    const source = this.resolveCurrencyCode(sourceCurrency);
    const target = this.currentCurrency().code;
    if (source === target) return price;

    const rate = this.usableExchangeRate();
    if (rate === null) return price;
    const converted = source === 'USD' ? price * rate : price / rate;
    return Math.round((converted + Number.EPSILON) * 100) / 100;
  }

  displayLabel(sourceCurrency: unknown = 'USD'): string {
    return this.displayCurrencyCode(sourceCurrency) === 'EGP' ? 'EGP' : '$';
  }

  formatPrice(value: unknown, sourceCurrency: unknown = 'USD'): string {
    this.ensureRateFor(sourceCurrency);
    const amount = this.convert(value, sourceCurrency);
    const code = this.displayCurrencyCode(sourceCurrency);
    const formatted = this.amountFormatter.format(amount);
    return code === 'EGP' ? `${formatted} EGP` : `${formatted}$`;
  }

  loadExchangeRate(done?: () => void): Observable<CurrencyRate | null>;
  loadExchangeRate(force?: boolean, done?: () => void): Observable<CurrencyRate | null>;
  loadExchangeRate(
    forceOrDone: boolean | (() => void) = false,
    callback?: () => void,
  ): Observable<CurrencyRate | null> {
    const force = typeof forceOrDone === 'boolean' ? forceOrDone : false;
    const done = typeof forceOrDone === 'function' ? forceOrDone : callback;
    if (this.rateRequest$) {
      if (done) this.rateRequest$.subscribe((rate) => { if (rate) done(); });
      return this.rateRequest$;
    }
    const cache = this.readCache<CurrencyRate>(RATE_CACHE_KEY);
    const cachedRate = this.normalizeRate(cache?.value);
    if (!force && cache && cachedRate && this.rateCacheFresh(cache) && this.usdToEgpRate() !== null) {
      done?.();
      return of(cachedRate);
    }

    this.isRateLoading.set(true);
    this.rateError.set(null);
    const request$ = this.api.getUnauthntecated('Currencies/exchange-rate?from=USD&to=EGP').pipe(
      map((response: unknown) => this.parseRateResponse(response)),
      tap((rate) => {
        this.applyRate(rate);
        this.rateCachedAt = Date.now();
        this.rateNeedsRefresh = false;
        this.automaticRateAttempted = false;
        this.writeCache(RATE_CACHE_KEY, rate);
        this.cookies.set(this.legacyRateCookie, String(rate.rate), {
          path: '/',
          sameSite: 'Strict',
          expires: 1,
        });
        done?.();
      }),
      catchError(() => {
        this.rateError.set('currencyRateLoadError');
        return of(null);
      }),
      finalize(() => {
        this.isRateLoading.set(false);
        this.rateRequest$ = null;
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    this.rateRequest$ = request$;
    request$.subscribe();
    return request$;
  }

  private parseCurrenciesResponse(response: unknown): CurrencyOption[] {
    const data = this.unwrapResponse(response);
    const rows = this.extractArray(data, ['data', 'items', 'currencies']);
    const currencies = this.normalizeOptions(rows);
    if (!currencies) throw new Error('The currency response did not contain USD or EGP.');
    return currencies;
  }

  private parseRateResponse(response: unknown): CurrencyRate {
    const data = this.asRecord(this.unwrapResponse(response));
    const rate = this.normalizeRate(data);
    if (!rate) throw new Error('The exchange-rate response was invalid.');
    return rate;
  }

  private unwrapResponse(response: unknown): unknown {
    let value = response;
    for (let depth = 0; depth < 3; depth++) {
      const record = this.asRecord(value);
      if (!record) return value;
      const success = this.readBoolean(record, 'isSuccess', 'IsSuccess');
      if (success === false) {
        throw new Error(this.readString(record, 'message', 'Message') || 'The API request failed.');
      }
      const nested = record['data'] ?? record['Data'];
      if (nested === undefined) return value;
      value = nested;
    }
    return value;
  }

  private extractArray(value: unknown, keys: string[]): unknown[] {
    if (Array.isArray(value)) return value;
    const record = this.asRecord(value);
    if (!record) return [];
    for (const key of keys) {
      const nested = record[key] ?? record[this.capitalize(key)];
      if (Array.isArray(nested)) return nested;
    }
    return [];
  }

  private normalizeOptions(value: unknown): CurrencyOption[] | null {
    if (!Array.isArray(value)) return null;
    const byCode = new Map<SupportedCurrencyCode, CurrencyOption>();
    for (const row of value) {
      const currency = this.mapCurrency(row);
      if (currency && !byCode.has(currency.code)) byCode.set(currency.code, currency);
    }
    if (!byCode.size) return null;
    const options = FALLBACK_CURRENCIES.map((fallback) => byCode.get(fallback.code) ?? fallback);
    return options;
  }

  private mapCurrency(value: unknown): CurrencyOption | null {
    const row = this.asRecord(value);
    if (!row) return null;
    const id = Number(row['id'] ?? row['Id']);
    const name = this.readString(row, 'name', 'Name');
    const sign = this.readString(row, 'sign', 'Sign', 'symbol', 'Symbol');
    const descriptor = this.readString(row, 'code', 'Code') || `${name} ${sign}`.trim();
    const code = this.tryResolveCurrencyCode(descriptor) ?? this.tryResolveCurrencyCode(id);
    if (!Number.isFinite(id) || id <= 0 || !code) return null;
    return {
      id,
      code,
      name: name || code,
      symbol: sign || (code === 'USD' ? '$' : 'EGP'),
    };
  }

  private normalizeRate(value: unknown): CurrencyRate | null {
    const data = this.asRecord(value);
    if (!data) return null;
    const rate = Number(data['rate'] ?? data['Rate']);
    const from = this.tryResolveCurrencyCode(data['fromCurrency'] ?? data['FromCurrency'] ?? 'USD');
    const to = this.tryResolveCurrencyCode(data['toCurrency'] ?? data['ToCurrency'] ?? 'EGP');
    if (!Number.isFinite(rate) || rate <= 0 || !from || !to || from === to) return null;
    const usdToEgp = from === 'USD' && to === 'EGP' ? rate : 1 / rate;
    return {
      fromCurrency: 'USD',
      toCurrency: 'EGP',
      rate: usdToEgp,
      rateDate: this.readString(data, 'rateDate', 'RateDate') || null,
      provider: this.readString(data, 'provider', 'Provider') || null,
      isStale: this.readBoolean(data, 'isStale', 'IsStale') ?? false,
    };
  }

  private applyRate(rate: CurrencyRate): void {
    this.usdToEgpRate.set(rate.rate);
    this.rateDate.set(rate.rateDate);
    this.rateProvider.set(rate.provider);
    this.isRateStale.set(rate.isStale);
  }

  private applyLegacyRate(): void {
    const rate = Number(this.cookies.get(this.legacyRateCookie));
    if (Number.isFinite(rate) && rate > 0) {
      this.usdToEgpRate.set(rate);
      this.isRateStale.set(true);
      this.rateCachedAt = Date.now() - LEGACY_RATE_ASSUMED_AGE_MS;
      this.rateNeedsRefresh = true;
    }
  }

  private ensureRateFor(sourceCurrency: unknown): void {
    const source = this.resolveCurrencyCode(sourceCurrency);
    if (source !== this.currentCurrency().code
      && this.shouldRefreshRate()
      && !this.isRateLoading()
      && !this.automaticRateAttempted
      && !this.rateRefreshScheduled) {
      // Price formatting runs during template evaluation. Defer signal writes
      // until that change-detection pass has completed.
      this.rateRefreshScheduled = true;
      queueMicrotask(() => {
        this.rateRefreshScheduled = false;
        if (source !== this.currentCurrency().code
          && this.shouldRefreshRate()
          && !this.isRateLoading()) {
          this.automaticRateAttempted = true;
          if (this.usdToEgpRate() !== null) this.isRateStale.set(true);
          this.loadExchangeRate();
        }
      });
    }
  }

  private shouldRefreshRate(): boolean {
    return this.usableExchangeRate() === null
      || this.rateNeedsRefresh
      || (this.rateCachedAt > 0 && Date.now() - this.rateCachedAt > RATE_CACHE_TTL_MS);
  }

  private usableExchangeRate(): number | null {
    const rate = this.usdToEgpRate();
    if (rate === null || rate <= 0) return null;
    if (this.rateCachedAt > 0 && Date.now() - this.rateCachedAt > RATE_MAX_STALE_MS) return null;
    return rate;
  }

  private displayCurrencyCode(sourceCurrency: unknown): SupportedCurrencyCode {
    const source = this.resolveCurrencyCode(sourceCurrency);
    const target = this.currentCurrency().code;
    return source === target || this.usableExchangeRate() !== null ? target : source;
  }

  private normalizeAmount(value: unknown): number {
    const amount = Number(value ?? 0);
    return Number.isFinite(amount) ? amount : 0;
  }

  private resolveCurrencyCode(value: unknown): SupportedCurrencyCode {
    return this.tryResolveCurrencyCode(value) ?? 'USD';
  }

  private tryResolveCurrencyCode(value: unknown): SupportedCurrencyCode | null {
    if (value !== null && typeof value === 'object') {
      const row = this.asRecord(value);
      if (row) {
        const candidates = [
          row['code'], row['Code'], row['currencyCode'], row['CurrencyCode'],
          row['sign'], row['Sign'], row['symbol'], row['Symbol'],
          row['name'], row['Name'], row['id'], row['Id'],
        ];
        for (const candidate of candidates) {
          const resolved = this.tryResolveCurrencyCode(candidate);
          if (resolved) return resolved;
        }
        return null;
      }
    }
    if (typeof value === 'number' || /^\d+$/.test(String(value ?? ''))) {
      if (Number(value) === 1) return 'EGP';
      if (Number(value) === 2) return 'USD';
      return null;
    }
    const normalized = String(value ?? 'USD').trim().toUpperCase();
    if (normalized.includes('EGP') || normalized.includes('EGYPT')) return 'EGP';
    if (normalized.includes('USD')
      || normalized.includes('US DOLLAR')
      || normalized.includes('UNITED STATES DOLLAR')
      || normalized === '$') return 'USD';
    return null;
  }

  private resolveSaved(options: CurrencyOption[]): CurrencyOption {
    const savedCode = this.resolveCurrencyCode(this.cookies.get(this.currencyCookie) || 'USD');
    return options.find((option) => option.code === savedCode)
      ?? options.find((option) => option.code === 'USD')
      ?? options[0];
  }

  private resolveCurrent(options: CurrencyOption[]): CurrencyOption {
    const currentCode = this.currentCurrency().code;
    return options.find((option) => option.code === currentCode) ?? this.resolveSaved(options);
  }

  private commitCurrency(selected: CurrencyOption): void {
    this.cookies.set(this.currencyCookie, selected.code, {
      path: '/',
      sameSite: 'Strict',
      expires: 365,
    });
    this.currentCurrency.set(selected);
  }

  private readCache<T>(key: string): CacheEntry<T> | null {
    try {
      if (typeof localStorage === 'undefined') return null;
      const parsed = JSON.parse(localStorage.getItem(key) ?? 'null') as unknown;
      const record = this.asRecord(parsed);
      const cachedAt = Number(record?.['cachedAt']);
      const clockSkewToleranceMs = 5 * 60 * 1_000;
      if (!record
        || !Number.isFinite(cachedAt)
        || cachedAt <= 0
        || cachedAt > Date.now() + clockSkewToleranceMs
        || !('value' in record)) return null;
      return { cachedAt, value: record['value'] as T };
    } catch {
      return null;
    }
  }

  private writeCache<T>(key: string, value: T): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify({ cachedAt: Date.now(), value } satisfies CacheEntry<T>));
      }
    } catch {
      // Storage can be disabled or full; in-memory signals remain authoritative.
    }
  }

  private currencyCacheFresh(entry: CacheEntry<CurrencyOption[]>): boolean {
    return this.cacheAge(entry) <= CURRENCY_CACHE_TTL_MS;
  }

  private rateCacheFresh(entry: CacheEntry<CurrencyRate>): boolean {
    return this.cacheAge(entry) <= RATE_CACHE_TTL_MS;
  }

  private cacheAge<T>(entry: CacheEntry<T>): number {
    return Math.max(0, Date.now() - entry.cachedAt);
  }

  private readString(record: Record<string, unknown>, ...keys: string[]): string {
    for (const key of keys) {
      if (typeof record[key] === 'string') return record[key].trim();
    }
    return '';
  }

  private readBoolean(record: Record<string, unknown>, ...keys: string[]): boolean | undefined {
    for (const key of keys) {
      if (typeof record[key] === 'boolean') return record[key];
    }
    return undefined;
  }

  private asRecord(value: unknown): Record<string, unknown> | null {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
      ? value as Record<string, unknown>
      : null;
  }

  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
