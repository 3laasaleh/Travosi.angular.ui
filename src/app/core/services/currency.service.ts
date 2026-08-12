import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from './apiservice.service';

export interface CurrencyOption {
  id: number;
  code: string;
  name: string;
  symbol: string;
}

const FALLBACK_CURRENCIES: CurrencyOption[] = [
  { id: 2, code: 'USD', name: 'US Dollar', symbol: '$' },
  { id: 1, code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
];

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  readonly options = signal<CurrencyOption[]>(FALLBACK_CURRENCIES);
  readonly currentCurrency = signal<CurrencyOption>(this.resolveSaved(FALLBACK_CURRENCIES));
  readonly usdToEgpRate = signal<number | null>(this.cachedRate());
  readonly rateDate = signal<string | null>(null);
  readonly rateProvider = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly isRateLoading = signal(false);
  private readonly currencyCookie = 'currency';
  private readonly rateCookie = 'usdToEgpRate';

  constructor(private cookies: CookieService, private api: ApiService) {
    this.loadCurrencies();
    if (this.currentCurrency().code === 'EGP' && this.usdToEgpRate() === null) {
      this.loadExchangeRate(() => window.location.reload());
    }
  }

  loadCurrencies(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.api.getUnauthntecated('Currencies').pipe(
      catchError(() => of(null)),
      finalize(() => this.isLoading.set(false)),
    ).subscribe((response: any) => {
      const payload = response?.data ?? response;
      const rows = Array.isArray(payload) ? payload : payload?.data ?? [];
      const currencies = rows.map((row: any) => this.mapCurrency(row)).filter((row: CurrencyOption | null): row is CurrencyOption => !!row);
      if (!currencies.length) return;
      this.options.set(currencies);
      this.currentCurrency.set(this.resolveSaved(currencies));
      if (this.currentCurrency().code === 'EGP' && this.usdToEgpRate() === null) {
        this.loadExchangeRate(() => window.location.reload());
      }
    });
  }

  selectCurrency(code: string): void {
    const selected = this.options().find(x => x.code === code);
    if (!selected || selected.code === this.currentCurrency().code) return;
    this.cookies.set(this.currencyCookie, selected.code, { path: '/', sameSite: 'Strict', expires: 365 });
    this.currentCurrency.set(selected);
    if (selected.code === 'EGP') {
      this.loadExchangeRate(() => window.location.reload());
      return;
    }
    window.location.reload();
  }

  loadExchangeRate(done?: () => void): void {
    if (this.isRateLoading()) return;
    this.isRateLoading.set(true);
    this.api.getUnauthntecated('Currencies/exchange-rate?from=USD&to=EGP').pipe(
      catchError(() => of(null)),
      finalize(() => this.isRateLoading.set(false)),
    ).subscribe((response: any) => {
      const data = response?.data ?? response;
      const rate = Number(data?.rate);
      if (!Number.isFinite(rate) || rate <= 0) return;
      this.usdToEgpRate.set(rate);
      this.rateDate.set(data?.rateDate ?? null);
      this.rateProvider.set(data?.provider ?? null);
      this.cookies.set(this.rateCookie, String(rate), { path: '/', sameSite: 'Strict', expires: 1 });
      done?.();
    });
  }

  private mapCurrency(row: any): CurrencyOption | null {
    const id = Number(row?.id);
    const name = String(row?.name ?? '').trim();
    const sign = String(row?.sign ?? '').trim();
    const normalized = `${name} ${sign}`.toUpperCase();
    const code = normalized.includes('EGP') || normalized.includes('EGYPT') ? 'EGP'
      : normalized.includes('USD') || sign === '$' ? 'USD' : sign.toUpperCase();
    return id > 0 && code ? { id, code, name: name || code, symbol: code === 'EGP' ? 'EGP' : sign || code } : null;
  }

  private resolveSaved(options: CurrencyOption[]): CurrencyOption {
    const code = this.cookies.get(this.currencyCookie).toUpperCase();
    return options.find(x => x.code === code) ?? options.find(x => x.code === 'USD') ?? options[0];
  }

  private cachedRate(): number | null {
    const rate = Number(this.cookies.get(this.rateCookie));
    return Number.isFinite(rate) && rate > 0 ? rate : null;
  }
}
