import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
export class SignupSuccess {
    route = inject(ActivatedRoute);
    year = new Date().getFullYear();
    title = 'success';
    message = 'accountCreatedActivationRequired';
    buttonText = 'continue';
    redirectLink = '/';
    ngOnInit() {
        const status = this.route.snapshot.queryParamMap.get('status');
        if (status === 'activated') {
            this.title = 'activated';
            this.message = 'accountActivatedSignin';
            this.buttonText = 'signin';
            this.redirectLink = '/login';
        }
        else if (status === 'registered') {
            this.title = 'success';
            this.message = 'accountCreatedActivationRequired';
            this.buttonText = 'continue';
            this.redirectLink = '/';
        }
    }
    static ɵfac = function SignupSuccess_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SignupSuccess)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SignupSuccess, selectors: [["app-signup-success"]], decls: 25, vars: 17, consts: [[1, "relative", "flex", "h-screen", "items-center", "justify-center", "bg-slate-50"], [1, "container", "relative"], [1, "flex", "justify-center"], [1, "lg:w-2/5"], [1, "relative", "overflow-hidden", "rounded-md", "bg-white", "shadow", "dark:shadow-gray-800"], [1, "bg-emerald-600", "px-6", "py-12", "text-center"], [1, "mdi", "mdi-check-circle", "text-6xl", "text-white"], [1, "mt-2", "text-xl", "font-semibold", "uppercase", "tracking-wide", "text-white"], [1, "px-6", "py-12", "text-center"], [1, "text-xl", "font-semibold", "text-black"], [1, "mt-4", "text-slate-400"], [1, "mt-6"], [1, "inline-block", "rounded-md", "bg-primary", "px-5", "py-2", "text-center", "text-base", "tracking-wide", "text-white", "duration-500", 3, "routerLink"], [1, "border-t", "border-gray-100", "p-6", "text-center", "dark:border-gray-700"], [1, "mb-0", "text-slate-400"]], template: function SignupSuccess_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5);
            i0.ɵɵelement(6, "i", 6);
            i0.ɵɵelementStart(7, "h5", 7);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 8)(11, "p", 9);
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "p", 10);
            i0.ɵɵtext(15);
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 11)(18, "a", 12);
            i0.ɵɵtext(19);
            i0.ɵɵpipe(20, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "div", 13)(22, "p", 14);
            i0.ɵɵtext(23);
            i0.ɵɵpipe(24, "translate");
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 7, "success"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 9, ctx.title));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 11, ctx.message));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("routerLink", ctx.redirectLink);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 13, ctx.buttonText));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2("\u00A9 ", ctx.year, " Sea World Holidays. ", i0.ɵɵpipeBind1(24, 15, "allRightsReserved"));
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignupSuccess, [{
        type: Component,
        args: [{ selector: 'app-signup-success', imports: [RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"relative flex h-screen items-center justify-center bg-slate-50 \">\n    <div class=\"container relative\">\n        <div class=\"flex justify-center\">\n            <div class=\"lg:w-2/5\">\n                <div class=\"relative overflow-hidden rounded-md bg-white shadow  dark:shadow-gray-800\">\n                    <div class=\"bg-emerald-600 px-6 py-12 text-center\">\n                        <i class=\"mdi mdi-check-circle text-6xl text-white\"></i>\n                        <h5 class=\"mt-2 text-xl font-semibold uppercase tracking-wide text-white\">{{ 'success' | translate }}</h5>\n                    </div>\n\n                    <div class=\"px-6 py-12 text-center\">\n                        <p class=\"text-xl font-semibold text-black \">{{ title | translate }}</p>\n                        <p class=\"mt-4 text-slate-400\">{{ message | translate }}</p>\n                        <div class=\"mt-6\">\n                            <a [routerLink]=\"redirectLink\" class=\"inline-block rounded-md bg-primary px-5 py-2 text-center text-base tracking-wide text-white duration-500\">{{ buttonText | translate }}</a>\n                        </div>\n                    </div>\n\n                    <div class=\"border-t border-gray-100 p-6 text-center dark:border-gray-700\">\n                        <p class=\"mb-0 text-slate-400\">&copy; {{ year }} Sea World Holidays. {{ 'allRightsReserved' | translate }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SignupSuccess, { className: "SignupSuccess", filePath: "app/features/user/auth-pages/signup-success/signup-success.ts", lineNumber: 11 }); })();
