import { Pipe } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import * as i0 from "@angular/core";
export class currencyPipe extends CurrencyPipe {
    transform(value, currencyCode, display, digitsInfo, locale) {
        if (locale == 'ar')
            currencyCode = 'ج';
        return super.transform(value, currencyCode);
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵcurrencyPipe_BaseFactory; return function currencyPipe_Factory(__ngFactoryType__) { return (ɵcurrencyPipe_BaseFactory || (ɵcurrencyPipe_BaseFactory = i0.ɵɵgetInheritedFactory(currencyPipe)))(__ngFactoryType__ || currencyPipe); }; })();
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "currency", type: currencyPipe, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(currencyPipe, [{
        type: Pipe,
        args: [{
                name: 'currency',
                standalone: true
            }]
    }], null, null); })();
