import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export interface CurrencyOption {
  id: number;
  code: string;
  symbol: string;
  labelKey: string;
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { id: 1, code: 'USD', symbol: '$', labelKey: 'currencyUsd' },
  { id: 2, code: 'EGP', symbol: 'E£', labelKey: 'currencyEgp' },
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
