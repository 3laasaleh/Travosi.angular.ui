import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LoaderService {
    loading = false;
    constructor() { }
    setLoading(loading) {
        this.loading = loading;
    }
    getLoading() {
        return this.loading;
    }
    static ɵfac = function LoaderService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoaderService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LoaderService, factory: LoaderService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoaderService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [], null); })();
