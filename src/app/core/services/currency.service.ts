import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from './apiservice.service';

export interface CurrencyOption {
  id: number;
  code: string;
  symbol: string;
  labelKey: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { id: 2, code: 'USD', symbol: '$', labelKey: 'currencyUsd' },
  { id: 1, code: 'EGP', symbol: 'E£', labelKey: 'currencyEgp' },
];

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  readonly options = CURRENCY_OPTIONS;
  currentCurrency = signal<CurrencyOption>(this.resolveInitialCurrency());
  readonly usdToEgpRate = signal<number | null>(null);
  readonly rateDate = signal<string | null>(null);
  readonly isRateLoading = signal(false);

  private readonly rateCookieName = 'usdToEgpRate';

  constructor(
    private cookieService: CookieService,
    private apiService: ApiService,
  ) {
    this.currentCurrency.set(this.resolveInitialCurrency());
    this.usdToEgpRate.set(this.resolveCachedRate());
    this.loadExchangeRate();
  }

  setCurrency(code: string): void {
    const option = this.options.find((currency) => currency.code === code) ?? this.options[0];
    this.cookieService.set('currency', option.code, {
      path: '/',
      sameSite: 'Strict',
    });
    this.currentCurrency.set(option);
    if (option.code === 'EGP' && this.usdToEgpRate() === null) this.loadExchangeRate();
  }

  convertPrice(amount: unknown, sourceCurrency: unknown = 'USD'): number {
    const value = Number(amount ?? 0);
    if (!Number.isFinite(value)) return 0;

    const source = this.resolveCurrency(sourceCurrency);
    const target = this.currentCurrency();
    if (source.code === target.code) return value;

    const rate = this.usdToEgpRate();
    if (!rate || rate <= 0) return value;

    const converted = source.code === 'USD' && target.code === 'EGP'
      ? value * rate
      : source.code === 'EGP' && target.code === 'USD'
        ? value / rate
        : value;
    return Math.round((converted + Number.EPSILON) * 100) / 100;
  }

  displaySymbol(sourceCurrency: unknown = 'USD'): string {
    const source = this.resolveCurrency(sourceCurrency);
    const target = this.currentCurrency();
    const canConvert = source.code === target.code || Number(this.usdToEgpRate()) > 0;
    return canConvert ? target.symbol : source.symbol;
  }

  loadExchangeRate(): void {
    if (this.isRateLoading()) return;

    this.isRateLoading.set(true);
    this.apiService.getUnauthntecated('Currencies/exchange-rate?from=USD&to=EGP').pipe(
      catchError(() => of(null)),
      finalize(() => this.isRateLoading.set(false)),
    ).subscribe((response: any) => {
      const data = response?.data ?? response;
      const rate = Number(data?.rate);
      if (!Number.isFinite(rate) || rate <= 0) return;

      this.usdToEgpRate.set(rate);
      this.rateDate.set(data?.rateDate ?? data?.date ?? null);
      this.cookieService.set(this.rateCookieName, String(rate), {
        path: '/',
        sameSite: 'Strict',
        expires: 1,
      });
    });
  }

  private resolveInitialCurrency(): CurrencyOption {
    const saved = this.cookieService?.get?.('currency');
    return CURRENCY_OPTIONS.find((currency) => currency.code === saved) ?? CURRENCY_OPTIONS[0];
  }

  private resolveCachedRate(): number | null {
    const rate = Number(this.cookieService?.get?.(this.rateCookieName));
    return Number.isFinite(rate) && rate > 0 ? rate : null;
  }

  private resolveCurrency(value: unknown): CurrencyOption {
    if (value && typeof value === 'object') {
      const currency = value as Record<string, unknown>;
      value = currency['currencyId'] ?? currency['id'] ?? currency['code'] ?? currency['symbol'] ?? currency['sign'];
    }

    if (typeof value === 'number' || /^\d+$/.test(String(value ?? ''))) {
      const id = Number(value);
      return this.options.find((currency) => currency.id === id) ?? this.options[0];
    }

    const code = String(value ?? 'USD').trim().toUpperCase();
    return this.options.find((currency) => currency.code === code || currency.symbol.toUpperCase() === code)
      ?? this.options[0];
  }
}
