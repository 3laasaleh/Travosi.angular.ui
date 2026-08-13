import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VisitorTrackingService } from './core/services/visitor-tracking.service';
import { CustomerContactOverlay } from './shared/components/customer-contact-overlay/customer-contact-overlay';
import * as i0 from "@angular/core";
export class App {
    title = signal('Sea World', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    translate = inject(TranslateService);
    visitorTracking = inject(VisitorTrackingService);
    constructor() {
        this.translate.addLangs(['en', 'ar']);
        this.visitorTracking.track().subscribe();
    }
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], decls: 2, vars: 0, template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet")(1, "app-customer-contact-overlay");
        } }, dependencies: [RouterOutlet, CustomerContactOverlay], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', imports: [RouterOutlet, CustomerContactOverlay], changeDetection: ChangeDetectionStrategy.OnPush, template: "<router-outlet />\n<app-customer-contact-overlay />\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "app/app.ts", lineNumber: 14 }); })();
