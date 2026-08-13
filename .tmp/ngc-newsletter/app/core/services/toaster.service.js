import { Injectable } from '@angular/core';
import { toast } from 'sonner';
import { MessageStatusEnum } from '../enums/messagestatus.enum';
import * as i0 from "@angular/core";
export class ToasterService {
    addToaster(severity, message, detail) {
        const description = detail ?? '';
        switch (severity) {
            case MessageStatusEnum.Success:
                toast.success(message, {
                    description,
                    duration: 3000
                });
                break;
            case MessageStatusEnum.Error:
                toast.error(message, {
                    description,
                    duration: 3000
                });
                break;
            case MessageStatusEnum.Warning:
                toast.warning(message, {
                    description,
                    duration: 3000
                });
                break;
            case MessageStatusEnum.Info:
            default:
                toast.info(message, {
                    description,
                    duration: 3000
                });
                break;
        }
    }
    static ɵfac = function ToasterService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToasterService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToasterService, factory: ToasterService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
