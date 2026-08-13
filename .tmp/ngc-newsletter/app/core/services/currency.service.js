import { Injectable, signal } from '@angular/core';
import { catchError, finalize, map, of, shareReplay, tap } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "ngx-cookie-service";
import * as i2 from "./apiservice.service";
const FALLBACK_CURRENCIES = [
    { id: 2, code: 'USD', name: 'USD', symbol: '$' },
    { id: 1, code: 'EGP', name: 'Egyptian Pound', symbol: 'EGP' },
];
const CURRENCY_CACHE_TTL_MS = 24 * 60 * 60 * 1_000;
const RATE_CACHE_TTL_MS = 6 * 60 * 60 * 1_000;
const RATE_MAX_STALE_MS = 72 * 60 * 60 * 1_000;
const LEGACY_RATE_ASSUMED_AGE_MS = 24 * 60 * 60 * 1_000;
const CURRENCY_CACHE_KEY = 'seaworld.currency-options.v1';
const RATE_CACHE_KEY = 'seaworld.usd-egp-rate.v1';
export class CurrencyService {
    cookies;
    api;
    options = signal(FALLBACK_CURRENCIES, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "options" }] : /* istanbul ignore next */ []));
    currentCurrency;
    usdToEgpRate = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "usdToEgpRate" }] : /* istanbul ignore next */ []));
    rateDate = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rateDate" }] : /* istanbul ignore next */ []));
    rateProvider = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rateProvider" }] : /* istanbul ignore next */ []));
    isRateStale = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isRateStale" }] : /* istanbul ignore next */ []));
    isLoading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isRateLoading = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isRateLoading" }] : /* istanbul ignore next */ []));
    currencyError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currencyError" }] : /* istanbul ignore next */ []));
    rateError = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "rateError" }] : /* istanbul ignore next */ []));
    currencyCookie = 'currency';
    legacyRateCookie = 'usdToEgpRate';
    currencyRequest$ = null;
    rateRequest$ = null;
    rateCachedAt = 0;
    rateNeedsRefresh = false;
    rateRefreshScheduled = false;
    automaticRateAttempted = false;
    amountFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
    constructor(cookies, api) {
        this.cookies = cookies;
        this.api = api;
        const currencyCache = this.readCache(CURRENCY_CACHE_KEY);
        const normalizedCachedOptions = this.normalizeOptions(currencyCache?.value);
        const cachedOptions = normalizedCachedOptions || FALLBACK_CURRENCIES;
        this.options.set(cachedOptions);
        this.currentCurrency = signal(this.resolveSaved(cachedOptions), /* @ts-ignore */
        ...(ngDevMode ? [{ debugName: "currentCurrency" }] : /* istanbul ignore next */ []));
        const rateCache = this.readCache(RATE_CACHE_KEY);
        const cachedRate = this.normalizeRate(rateCache?.value);
        if (cachedRate && rateCache && this.cacheAge(rateCache) <= RATE_MAX_STALE_MS) {
            this.rateCachedAt = rateCache.cachedAt;
            this.rateNeedsRefresh = !this.rateCacheFresh(rateCache);
            this.applyRate({
                ...cachedRate,
                isStale: cachedRate.isStale || this.rateNeedsRefresh,
            });
        }
        else {
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
                this.currentCurrency.set(this.options().find((option) => option.code === 'USD') ?? this.currentCurrency());
                this.loadExchangeRate(false, () => {
                    const latestOption = this.options().find((option) => option.code === requestedCurrency.code);
                    if (latestOption)
                        this.commitCurrency(latestOption);
                });
            }
            else {
                this.loadExchangeRate();
            }
        }
    }
    loadCurrencies(force = false) {
        if (this.currencyRequest$)
            return this.currencyRequest$;
        const cache = this.readCache(CURRENCY_CACHE_KEY);
        const cachedOptions = this.normalizeOptions(cache?.value);
        if (!force && cache && cachedOptions && this.currencyCacheFresh(cache))
            return of(this.options());
        this.isLoading.set(true);
        this.currencyError.set(null);
        const request$ = this.api.getUnauthntecated('Currencies').pipe(map((response) => this.parseCurrenciesResponse(response)), tap((currencies) => {
            this.options.set(currencies);
            this.currentCurrency.set(this.resolveCurrent(currencies));
            this.writeCache(CURRENCY_CACHE_KEY, currencies);
        }), catchError(() => {
            this.currencyError.set('currencyListLoadError');
            return of(null);
        }), finalize(() => {
            this.isLoading.set(false);
            this.currencyRequest$ = null;
        }), shareReplay({ bufferSize: 1, refCount: false }));
        this.currencyRequest$ = request$;
        request$.subscribe();
        return request$;
    }
    selectCurrency(code) {
        const normalizedCode = this.tryResolveCurrencyCode(code);
        if (!normalizedCode)
            return;
        const selected = this.options().find((option) => option.code === normalizedCode);
        if (!selected)
            return;
        const isChanging = selected.code !== this.currentCurrency().code;
        if (isChanging && this.usableExchangeRate() === null) {
            this.automaticRateAttempted = true;
            this.loadExchangeRate(true, () => this.commitCurrency(selected));
            return;
        }
        if (isChanging)
            this.commitCurrency(selected);
        if (selected.code === 'EGP' && this.shouldRefreshRate()) {
            this.automaticRateAttempted = true;
            this.loadExchangeRate(this.rateError() !== null);
        }
    }
    convert(value, sourceCurrency = 'USD') {
        const price = this.normalizeAmount(value);
        const source = this.resolveCurrencyCode(sourceCurrency);
        const target = this.currentCurrency().code;
        if (source === target)
            return price;
        const rate = this.usableExchangeRate();
        if (rate === null)
            return price;
        const converted = source === 'USD' ? price * rate : price / rate;
        return Math.round((converted + Number.EPSILON) * 100) / 100;
    }
    displayLabel(sourceCurrency = 'USD') {
        return this.displayCurrencyCode(sourceCurrency) === 'EGP' ? 'EGP' : '$';
    }
    formatPrice(value, sourceCurrency = 'USD') {
        this.ensureRateFor(sourceCurrency);
        const amount = this.convert(value, sourceCurrency);
        const code = this.displayCurrencyCode(sourceCurrency);
        const formatted = this.amountFormatter.format(amount);
        return code === 'EGP' ? `${formatted} EGP` : `${formatted}$`;
    }
    loadExchangeRate(forceOrDone = false, callback) {
        const force = typeof forceOrDone === 'boolean' ? forceOrDone : false;
        const done = typeof forceOrDone === 'function' ? forceOrDone : callback;
        if (this.rateRequest$) {
            if (done)
                this.rateRequest$.subscribe((rate) => { if (rate)
                    done(); });
            return this.rateRequest$;
        }
        const cache = this.readCache(RATE_CACHE_KEY);
        const cachedRate = this.normalizeRate(cache?.value);
        if (!force && cache && cachedRate && this.rateCacheFresh(cache) && this.usdToEgpRate() !== null) {
            done?.();
            return of(cachedRate);
        }
        this.isRateLoading.set(true);
        this.rateError.set(null);
        const request$ = this.api.getUnauthntecated('Currencies/exchange-rate?from=USD&to=EGP').pipe(map((response) => this.parseRateResponse(response)), tap((rate) => {
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
        }), catchError(() => {
            this.rateError.set('currencyRateLoadError');
            return of(null);
        }), finalize(() => {
            this.isRateLoading.set(false);
            this.rateRequest$ = null;
        }), shareReplay({ bufferSize: 1, refCount: false }));
        this.rateRequest$ = request$;
        request$.subscribe();
        return request$;
    }
    parseCurrenciesResponse(response) {
        const data = this.unwrapResponse(response);
        const rows = this.extractArray(data, ['data', 'items', 'currencies']);
        const currencies = this.normalizeOptions(rows);
        if (!currencies)
            throw new Error('The currency response did not contain USD or EGP.');
        return currencies;
    }
    parseRateResponse(response) {
        const data = this.asRecord(this.unwrapResponse(response));
        const rate = this.normalizeRate(data);
        if (!rate)
            throw new Error('The exchange-rate response was invalid.');
        return rate;
    }
    unwrapResponse(response) {
        let value = response;
        for (let depth = 0; depth < 3; depth++) {
            const record = this.asRecord(value);
            if (!record)
                return value;
            const success = this.readBoolean(record, 'isSuccess', 'IsSuccess');
            if (success === false) {
                throw new Error(this.readString(record, 'message', 'Message') || 'The API request failed.');
            }
            const nested = record['data'] ?? record['Data'];
            if (nested === undefined)
                return value;
            value = nested;
        }
        return value;
    }
    extractArray(value, keys) {
        if (Array.isArray(value))
            return value;
        const record = this.asRecord(value);
        if (!record)
            return [];
        for (const key of keys) {
            const nested = record[key] ?? record[this.capitalize(key)];
            if (Array.isArray(nested))
                return nested;
        }
        return [];
    }
    normalizeOptions(value) {
        if (!Array.isArray(value))
            return null;
        const byCode = new Map();
        for (const row of value) {
            const currency = this.mapCurrency(row);
            if (currency && !byCode.has(currency.code))
                byCode.set(currency.code, currency);
        }
        if (!byCode.size)
            return null;
        const options = FALLBACK_CURRENCIES.map((fallback) => byCode.get(fallback.code) ?? fallback);
        return options;
    }
    mapCurrency(value) {
        const row = this.asRecord(value);
        if (!row)
            return null;
        const id = Number(row['id'] ?? row['Id']);
        const name = this.readString(row, 'name', 'Name');
        const sign = this.readString(row, 'sign', 'Sign', 'symbol', 'Symbol');
        const descriptor = this.readString(row, 'code', 'Code') || `${name} ${sign}`.trim();
        const code = this.tryResolveCurrencyCode(descriptor) ?? this.tryResolveCurrencyCode(id);
        if (!Number.isFinite(id) || id <= 0 || !code)
            return null;
        return {
            id,
            code,
            name: name || code,
            symbol: sign || (code === 'USD' ? '$' : 'EGP'),
        };
    }
    normalizeRate(value) {
        const data = this.asRecord(value);
        if (!data)
            return null;
        const rate = Number(data['rate'] ?? data['Rate']);
        const from = this.tryResolveCurrencyCode(data['fromCurrency'] ?? data['FromCurrency'] ?? 'USD');
        const to = this.tryResolveCurrencyCode(data['toCurrency'] ?? data['ToCurrency'] ?? 'EGP');
        if (!Number.isFinite(rate) || rate <= 0 || !from || !to || from === to)
            return null;
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
    applyRate(rate) {
        this.usdToEgpRate.set(rate.rate);
        this.rateDate.set(rate.rateDate);
        this.rateProvider.set(rate.provider);
        this.isRateStale.set(rate.isStale);
    }
    applyLegacyRate() {
        const rate = Number(this.cookies.get(this.legacyRateCookie));
        if (Number.isFinite(rate) && rate > 0) {
            this.usdToEgpRate.set(rate);
            this.isRateStale.set(true);
            this.rateCachedAt = Date.now() - LEGACY_RATE_ASSUMED_AGE_MS;
            this.rateNeedsRefresh = true;
        }
    }
    ensureRateFor(sourceCurrency) {
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
                    if (this.usdToEgpRate() !== null)
                        this.isRateStale.set(true);
                    this.loadExchangeRate();
                }
            });
        }
    }
    shouldRefreshRate() {
        return this.usableExchangeRate() === null
            || this.rateNeedsRefresh
            || (this.rateCachedAt > 0 && Date.now() - this.rateCachedAt > RATE_CACHE_TTL_MS);
    }
    usableExchangeRate() {
        const rate = this.usdToEgpRate();
        if (rate === null || rate <= 0)
            return null;
        if (this.rateCachedAt > 0 && Date.now() - this.rateCachedAt > RATE_MAX_STALE_MS)
            return null;
        return rate;
    }
    displayCurrencyCode(sourceCurrency) {
        const source = this.resolveCurrencyCode(sourceCurrency);
        const target = this.currentCurrency().code;
        return source === target || this.usableExchangeRate() !== null ? target : source;
    }
    normalizeAmount(value) {
        const amount = Number(value ?? 0);
        return Number.isFinite(amount) ? amount : 0;
    }
    resolveCurrencyCode(value) {
        return this.tryResolveCurrencyCode(value) ?? 'USD';
    }
    tryResolveCurrencyCode(value) {
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
                    if (resolved)
                        return resolved;
                }
                return null;
            }
        }
        if (typeof value === 'number' || /^\d+$/.test(String(value ?? ''))) {
            if (Number(value) === 1)
                return 'EGP';
            if (Number(value) === 2)
                return 'USD';
            return null;
        }
        const normalized = String(value ?? 'USD').trim().toUpperCase();
        if (normalized.includes('EGP') || normalized.includes('EGYPT'))
            return 'EGP';
        if (normalized.includes('USD')
            || normalized.includes('US DOLLAR')
            || normalized.includes('UNITED STATES DOLLAR')
            || normalized === '$')
            return 'USD';
        return null;
    }
    resolveSaved(options) {
        const savedCode = this.resolveCurrencyCode(this.cookies.get(this.currencyCookie) || 'USD');
        return options.find((option) => option.code === savedCode)
            ?? options.find((option) => option.code === 'USD')
            ?? options[0];
    }
    resolveCurrent(options) {
        const currentCode = this.currentCurrency().code;
        return options.find((option) => option.code === currentCode) ?? this.resolveSaved(options);
    }
    commitCurrency(selected) {
        this.cookies.set(this.currencyCookie, selected.code, {
            path: '/',
            sameSite: 'Strict',
            expires: 365,
        });
        this.currentCurrency.set(selected);
    }
    readCache(key) {
        try {
            if (typeof localStorage === 'undefined')
                return null;
            const parsed = JSON.parse(localStorage.getItem(key) ?? 'null');
            const record = this.asRecord(parsed);
            const cachedAt = Number(record?.['cachedAt']);
            const clockSkewToleranceMs = 5 * 60 * 1_000;
            if (!record
                || !Number.isFinite(cachedAt)
                || cachedAt <= 0
                || cachedAt > Date.now() + clockSkewToleranceMs
                || !('value' in record))
                return null;
            return { cachedAt, value: record['value'] };
        }
        catch {
            return null;
        }
    }
    writeCache(key, value) {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, JSON.stringify({ cachedAt: Date.now(), value }));
            }
        }
        catch {
            // Storage can be disabled or full; in-memory signals remain authoritative.
        }
    }
    currencyCacheFresh(entry) {
        return this.cacheAge(entry) <= CURRENCY_CACHE_TTL_MS;
    }
    rateCacheFresh(entry) {
        return this.cacheAge(entry) <= RATE_CACHE_TTL_MS;
    }
    cacheAge(entry) {
        return Math.max(0, Date.now() - entry.cachedAt);
    }
    readString(record, ...keys) {
        for (const key of keys) {
            if (typeof record[key] === 'string')
                return record[key].trim();
        }
        return '';
    }
    readBoolean(record, ...keys) {
        for (const key of keys) {
            if (typeof record[key] === 'boolean')
                return record[key];
        }
        return undefined;
    }
    asRecord(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value)
            ? value
            : null;
    }
    capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    static ɵfac = function CurrencyService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CurrencyService)(i0.ɵɵinject(i1.CookieService), i0.ɵɵinject(i2.ApiService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CurrencyService, factory: CurrencyService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CurrencyService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.CookieService }, { type: i2.ApiService }], null); })();
