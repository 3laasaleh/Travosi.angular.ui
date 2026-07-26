import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface CurrencyOption {
  code: string;
  symbol: string;
  labelKey: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'USD', symbol: '$', labelKey: 'currencyUsd' },
  { code: 'EUR', symbol: '€', labelKey: 'currencyEur' },
  { code: 'EGP', symbol: 'E£', labelKey: 'currencyEgp' },
  { code: 'SAR', symbol: 'SR', labelKey: 'currencySar' },
];

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  readonly options = CURRENCY_OPTIONS;
  currentCurrency = signal<CurrencyOption>(this.resolveInitialCurrency());

  constructor(private cookieService: CookieService) {
    this.currentCurrency.set(this.resolveInitialCurrency());
  }

  setCurrency(code: string): void {
    const option = this.options.find((currency) => currency.code === code) ?? this.options[0];
    this.cookieService.set('currency', option.code, {
      path: '/',
      sameSite: 'Strict',
    });
    this.currentCurrency.set(option);
  }

  private resolveInitialCurrency(): CurrencyOption {
    const saved = this.cookieService?.get?.('currency');
    return CURRENCY_OPTIONS.find((currency) => currency.code === saved) ?? CURRENCY_OPTIONS[0];
  }
}
