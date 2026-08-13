import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class TaskNotificationsService {
    changed = signal(0, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "changed" }] : /* istanbul ignore next */ []));
    notifyChanged() {
        this.changed.update((value) => value + 1);
    }
    static ɵfac = function TaskNotificationsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TaskNotificationsService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TaskNotificationsService, factory: TaskNotificationsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaskNotificationsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
