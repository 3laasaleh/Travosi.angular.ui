import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MessageStatusEnum } from '../enums/messagestatus.enum';
import * as i0 from "@angular/core";
import * as i1 from "../services/toaster.service";
import * as i2 from "../../features/user/_services/auth.service";
import * as i3 from "../services/loader.service";
export class Global_Interceptor {
    toaster;
    authService;
    loadingService;
    constructor(toaster, authService, loadingService) {
        this.toaster = toaster;
        this.authService = authService;
        this.loadingService = loadingService;
    }
    isResponseModel(obj) {
        return obj && typeof obj.isSuccess === 'boolean' && 'data' in obj;
    }
    totalRequests = 0;
    intercept(request, next) {
        this.totalRequests++;
        this.loadingService.setLoading(true);
        return next.handle(request).pipe(catchError((err) => {
            if (err.status == 401) {
                this.authService.logout();
            }
            else {
                this.toaster.addToaster(MessageStatusEnum.Error, err.message, MessageStatusEnum.Error);
                if (err?.error?.errors) {
                    Object.values(err.error.errors).forEach((element) => {
                        this.toaster.addToaster(MessageStatusEnum.Error, element[0]);
                    });
                }
                if (this.totalRequests > 0)
                    this.totalRequests--;
                if (this.totalRequests == 0) {
                    this.loadingService.setLoading(false);
                }
            }
            throw new Error(err.name);
        }), tap((evt) => {
            if (evt instanceof HttpResponse) {
                let isResponseModel = this.isResponseModel(evt.body);
                if (this.totalRequests > 0)
                    this.totalRequests--;
                if (this.totalRequests == 0) {
                    this.loadingService.setLoading(false);
                }
                if (!isResponseModel)
                    return;
                let response = evt.body;
                if (!response?.isSuccess && response?.message != "" && response.statusCode != 500)
                    this.toaster.addToaster(MessageStatusEnum.Error, response.message);
                if (this.totalRequests == 0) {
                    this.loadingService.setLoading(false);
                }
            }
        }));
    }
    static ɵfac = function Global_Interceptor_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Global_Interceptor)(i0.ɵɵinject(i1.ToasterService), i0.ɵɵinject(i2.AuthService), i0.ɵɵinject(i3.LoaderService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Global_Interceptor, factory: Global_Interceptor.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Global_Interceptor, [{
        type: Injectable
    }], () => [{ type: i1.ToasterService }, { type: i2.AuthService }, { type: i3.LoaderService }], null); })();
