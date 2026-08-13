import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/apiservice.service";
export class AirportSearchService {
    apiService;
    constructor(apiService) {
        this.apiService = apiService;
    }
    search(request) {
        const query = request.query.trim();
        const language = request.language.toLowerCase().startsWith('ar') ? 'ar' : 'en';
        const url = [
            `Airports/search?query=${encodeURIComponent(query)}`,
            `language=${encodeURIComponent(language)}`,
            `sessionToken=${encodeURIComponent(request.sessionToken)}`,
        ].join('&');
        return this.apiService.get(url).pipe(map((response) => this.parseResponse(response)));
    }
    parseResponse(response) {
        const envelope = this.asRecord(response);
        const succeeded = envelope?.isSuccess ?? envelope?.IsSuccess;
        if (succeeded === false) {
            throw new Error(envelope?.message ?? envelope?.Message ?? 'Airport search failed.');
        }
        const payload = envelope?.data ?? envelope?.Data ?? response;
        const rows = this.extractRows(payload);
        const uniqueResults = new Map();
        for (const row of rows) {
            const airport = this.normalizeAirport(row);
            if (airport && !uniqueResults.has(airport.placeId)) {
                uniqueResults.set(airport.placeId, airport);
            }
        }
        return [...uniqueResults.values()];
    }
    extractRows(payload) {
        if (Array.isArray(payload))
            return payload;
        const record = this.asRecord(payload);
        if (!record)
            return [];
        for (const key of ['items', 'data', 'airports', 'results']) {
            if (Array.isArray(record[key]))
                return record[key];
        }
        return [];
    }
    normalizeAirport(value) {
        const record = this.asRecord(value);
        if (!record)
            return null;
        const placeId = this.readString(record, 'placeId', 'PlaceId');
        const name = this.readString(record, 'name', 'Name');
        const description = this.readString(record, 'description', 'Description');
        const displayName = this.readString(record, 'displayName', 'DisplayName') || description || name;
        if (!placeId || !displayName)
            return null;
        return {
            placeId,
            name: name || displayName,
            description: description || displayName,
            displayName,
        };
    }
    readString(record, ...keys) {
        for (const key of keys) {
            if (typeof record[key] === 'string')
                return record[key].trim();
        }
        return '';
    }
    asRecord(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value)
            ? value
            : null;
    }
    static ɵfac = function AirportSearchService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || AirportSearchService)(i0.ɵɵinject(i1.ApiService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AirportSearchService, factory: AirportSearchService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AirportSearchService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ApiService }], null); })();
