import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map, of, shareReplay } from 'rxjs';
import { ApiService } from './apiservice.service';
import * as i0 from "@angular/core";
export class VisitorTrackingService {
    apiService = inject(ApiService);
    platformId = inject(PLATFORM_ID);
    storageKey = 'seaworldVisitorId';
    trackingRequest;
    track() {
        if (this.trackingRequest)
            return this.trackingRequest;
        const visitorId = this.getOrCreateVisitorId();
        if (!visitorId) {
            this.trackingRequest = of(null);
            return this.trackingRequest;
        }
        this.trackingRequest = this.apiService
            .postUnauthenticated('AboutUs/Visitors', { visitorId })
            .pipe(map((response) => {
            if (response?.isSuccess === false)
                return null;
            const value = Number(response?.data ?? response);
            return Number.isFinite(value) ? value : null;
        }), catchError(() => of(null)), shareReplay({ bufferSize: 1, refCount: false }));
        return this.trackingRequest;
    }
    getOrCreateVisitorId() {
        if (!isPlatformBrowser(this.platformId))
            return null;
        try {
            const savedId = localStorage.getItem(this.storageKey);
            if (savedId && this.isUuid(savedId))
                return savedId;
            const visitorId = crypto.randomUUID();
            localStorage.setItem(this.storageKey, visitorId);
            return visitorId;
        }
        catch {
            // Do not create a non-persistent ID because that would inflate unique visitor totals.
            return null;
        }
    }
    isUuid(value) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
    }
    static ɵfac = function VisitorTrackingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || VisitorTrackingService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: VisitorTrackingService, factory: VisitorTrackingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(VisitorTrackingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
