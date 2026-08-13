import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { Subject, of, throwError } from 'rxjs';
import { ApiService } from './apiservice.service';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  const optionsCacheKey = 'seaworld.currency-options.v1';
  const rateCacheKey = 'seaworld.usd-egp-rate.v1';
  let api: { getUnauthntecated: ReturnType<typeof vi.fn> };
  let cookieValues: Record<string, string>;
  let cookies: { get: ReturnType<typeof vi.fn>; set: ReturnType<typeof vi.fn> };
  let storage: Map<string, string>;

  beforeEach(() => {
    storage = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => storage.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => storage.set(key, value)),
      removeItem: vi.fn((key: string) => storage.delete(key)),
      clear: vi.fn(() => storage.clear()),
      key: vi.fn(() => null),
      get length() { return storage.size; },
    });
    cookieValues = {};
    api = { getUnauthntecated: vi.fn() };
    cookies = {
      get: vi.fn((name: string) => cookieValues[name] ?? ''),
      set: vi.fn((name: string, value: string) => cookieValues[name] = value),
    };
    TestBed.configureTestingModule({
      providers: [
        CurrencyService,
        { provide: ApiService, useValue: api },
        { provide: CookieService, useValue: cookies },
      ],
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('uses fresh storage caches without calling either API and preserves selection', () => {
    cookieValues['currency'] = 'EGP';
    localStorage.setItem(optionsCacheKey, JSON.stringify({
      cachedAt: Date.now(),
      value: [
        { id: 2, code: 'USD', name: 'US Dollar', symbol: '$' },
        { id: 1, code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
      ],
    }));
    localStorage.setItem(rateCacheKey, JSON.stringify({
      cachedAt: Date.now(),
      value: { fromCurrency: 'USD', toCurrency: 'EGP', rate: 51, rateDate: '2026-08-13', provider: 'CBE' },
    }));

    const service = TestBed.inject(CurrencyService);

    expect(service.currentCurrency().code).toBe('EGP');
    expect(service.formatPrice(100, 2)).toBe('5,100 EGP');
    expect(api.getUnauthntecated).not.toHaveBeenCalled();
  });

  it('redraws already-loaded source prices when the selected currency changes', () => {
    localStorage.setItem(optionsCacheKey, JSON.stringify({
      cachedAt: Date.now(),
      value: [
        { id: 2, code: 'USD', name: 'US Dollar', symbol: '$' },
        { id: 1, code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
      ],
    }));
    localStorage.setItem(rateCacheKey, JSON.stringify({
      cachedAt: Date.now(),
      value: { fromCurrency: 'USD', toCurrency: 'EGP', rate: 51, rateDate: '2026-08-13', provider: 'CBE' },
    }));
    const service = TestBed.inject(CurrencyService);

    expect(service.formatPrice(100, 2)).toBe('100$');

    service.selectCurrency('EGP');

    expect(service.currentCurrency().code).toBe('EGP');
    expect(service.formatPrice(100, 2)).toBe('5,100 EGP');
    expect(api.getUnauthntecated).not.toHaveBeenCalled();
  });

  it('refreshes a structurally invalid cache instead of trusting its timestamp', () => {
    localStorage.setItem(optionsCacheKey, JSON.stringify({
      cachedAt: Date.now(),
      value: [{ id: 3, code: 'EUR', name: 'Euro', symbol: 'EUR' }],
    }));
    api.getUnauthntecated.mockReturnValue(of({
      isSuccess: true,
      data: [{ id: 2, name: 'USD', sign: '$' }, { id: 1, name: 'Egyptian Pound', sign: 'EGP' }],
    }));

    const service = TestBed.inject(CurrencyService);

    expect(api.getUnauthntecated).toHaveBeenCalledWith('Currencies');
    expect(service.options().map((option) => option.code)).toEqual(['USD', 'EGP']);
  });

  it('deduplicates an in-flight exchange-rate request', () => {
    const currencies$ = of({ isSuccess: true, data: [{ id: 2, name: 'USD', sign: '$' }, { id: 1, name: 'Egyptian Pound', sign: 'EGP' }] });
    const rate$ = new Subject<unknown>();
    api.getUnauthntecated.mockImplementation((url: string) => url === 'Currencies' ? currencies$ : rate$);
    const service = TestBed.inject(CurrencyService);

    service.loadExchangeRate(true);
    service.loadExchangeRate(true);

    expect(api.getUnauthntecated).toHaveBeenCalledTimes(2);
    expect(api.getUnauthntecated).toHaveBeenCalledWith('Currencies/exchange-rate?from=USD&to=EGP');
  });

  it('normalizes nested PascalCase responses and ignores unsupported currencies', () => {
    api.getUnauthntecated.mockImplementation((url: string) => url === 'Currencies'
      ? of({ Data: { IsSuccess: true, Data: [
        { Id: 3, Name: 'Euro', Sign: 'EUR' },
        { Id: 2, Name: 'US Dollar', Sign: '$' },
        { Id: 1, Name: 'Egyptian Pound', Sign: 'EGP' },
      ] } })
      : of({ Data: { IsSuccess: true, Data: { FromCurrency: 'USD', ToCurrency: 'EGP', Rate: 51 } } }));
    const service = TestBed.inject(CurrencyService);

    service.selectCurrency('EGP');

    expect(service.options().map((option) => option.code)).toEqual(['USD', 'EGP']);
    expect(service.formatPrice(100, { Id: 2 })).toBe('5,100 EGP');
    service.selectCurrency('EUR');
    expect(service.currentCurrency().code).toBe('EGP');
  });

  it('does not commit a new display currency when its required rate fails', () => {
    api.getUnauthntecated.mockImplementation((url: string) => url === 'Currencies'
      ? of({ isSuccess: true, data: [{ id: 2, name: 'USD', sign: '$' }, { id: 1, name: 'Egyptian Pound', sign: 'EGP' }] })
      : throwError(() => new Error('rate unavailable')));
    const service = TestBed.inject(CurrencyService);

    service.selectCurrency('EGP');

    expect(service.currentCurrency().code).toBe('USD');
    expect(cookieValues['currency']).toBeUndefined();
    expect(service.rateError()).toBe('currencyRateLoadError');
  });

  it('falls back to USD when a saved EGP selection cannot obtain a rate', () => {
    cookieValues['currency'] = 'EGP';
    api.getUnauthntecated.mockImplementation((url: string) => url === 'Currencies'
      ? of({ isSuccess: true, data: [{ id: 2, name: 'USD', sign: '$' }, { id: 1, name: 'Egyptian Pound', sign: 'EGP' }] })
      : throwError(() => new Error('rate unavailable')));

    const service = TestBed.inject(CurrencyService);

    expect(service.currentCurrency().code).toBe('USD');
    expect(service.rateError()).toBe('currencyRateLoadError');
  });

  it('keeps source amount and label until a cross-currency rate becomes available', () => {
    api.getUnauthntecated.mockImplementation((url: string) => url === 'Currencies'
      ? of({ isSuccess: true, data: [{ id: 2, name: 'USD', sign: '$' }, { id: 1, name: 'Egyptian Pound', sign: 'EGP' }] })
      : new Subject<unknown>());
    const service = TestBed.inject(CurrencyService);

    expect(service.formatPrice(5100, { code: 'EGP' })).toBe('5,100 EGP');
    return Promise.resolve().then(() => {
      expect(api.getUnauthntecated).toHaveBeenCalledWith('Currencies/exchange-rate?from=USD&to=EGP');
    });
  });

  it('uses a stale rate immediately and refreshes it once in the background', async () => {
    const now = Date.now();
    localStorage.setItem(optionsCacheKey, JSON.stringify({
      cachedAt: now,
      value: [
        { id: 2, code: 'USD', name: 'US Dollar', symbol: '$' },
        { id: 1, code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
      ],
    }));
    localStorage.setItem(rateCacheKey, JSON.stringify({
      cachedAt: now - (7 * 60 * 60 * 1_000),
      value: { fromCurrency: 'USD', toCurrency: 'EGP', rate: 51, rateDate: '2026-08-12', provider: 'CBE' },
    }));
    api.getUnauthntecated.mockReturnValue(of({
      isSuccess: true,
      data: { fromCurrency: 'USD', toCurrency: 'EGP', rate: 50, rateDate: '2026-08-13', provider: 'CBE' },
    }));
    const service = TestBed.inject(CurrencyService);

    expect(service.formatPrice(5100, 'EGP')).toBe('100$');
    expect(service.isRateStale()).toBe(true);

    await Promise.resolve();

    expect(api.getUnauthntecated).toHaveBeenCalledTimes(1);
    expect(service.formatPrice(5100, 'EGP')).toBe('102$');
    expect(service.isRateStale()).toBe(false);
  });
});
