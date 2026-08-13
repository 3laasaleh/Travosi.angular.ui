import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "ngx-cookie-service";
export class UtilityService {
    _coockiesService;
    _imgUrl = environment.imageUrl;
    defaultImage = '/assets/images/parts-trans.png';
    loader = '/assets/loaders/loader.gif';
    constructor(_coockiesService) {
        this._coockiesService = _coockiesService;
    }
    onImageError(event) {
        const target = event.target;
        target.src = this.defaultImage;
    }
    onImageStartLoad(event) {
        const target = event.target;
        target.src = this.loader;
    }
    getHeaders() {
        const bearer = 'Bearer ' + this._coockiesService.get('token');
        return {
            headers: new HttpHeaders({
                'Authorization': bearer,
                'Content-Type': 'application/json'
            })
        };
    }
    static ɵfac = function UtilityService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || UtilityService)(i0.ɵɵinject(i1.CookieService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UtilityService, factory: UtilityService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UtilityService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.CookieService }], null); })();
