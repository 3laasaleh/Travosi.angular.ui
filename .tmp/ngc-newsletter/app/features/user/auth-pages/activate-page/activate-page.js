import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
function ActivatePage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "activationInProgress"));
} }
function ActivatePage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 12)(4, "a", 13);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, ctx_r0.errorMessage));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, "returnToSignup"));
} }
function ActivatePage_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "accountActivatedRedirecting"), " ");
} }
export class ActivatePage {
    http = inject(HttpClient);
    route = inject(ActivatedRoute);
    router = inject(Router);
    cdr = inject(ChangeDetectorRef);
    bg = 'assets/images/bg/6.jpg';
    logo = 'assets/images/main-logo.png';
    apiUrl = `${environment.baseUrl}Account/Activate`;
    isLoading = true;
    errorMessage = '';
    email = '';
    token = '';
    ngOnInit() {
        const email = this.route.snapshot.queryParamMap.get('email')?.trim() ?? '';
        const token = this.route.snapshot.queryParamMap.get('token')?.trim() ?? '';
        if (!email || !token) {
            this.isLoading = false;
            this.errorMessage = 'activationLinkInvalid';
            return;
        }
        this.email = email;
        this.token = token;
        this.activateAccount();
    }
    activateAccount() {
        this.errorMessage = '';
        this.isLoading = true;
        this.http
            .post(this.apiUrl, { email: this.email, token: this.token }, { headers: new HttpHeaders({ Authorization: `Bearer ${this.token}` }) }).subscribe({
            next: (res1) => {
                const res = res1;
                this.isLoading = false;
                if (res.isSuccess && res.data)
                    this.router.navigateByUrl('/signup-success?status=activated');
                else {
                    this.errorMessage = res.message;
                }
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage =
                    error?.error?.message || error?.message || 'activationFailed';
            },
        });
    }
    static ɵfac = function ActivatePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ActivatePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ActivatePage, selectors: [["app-activate-page"]], decls: 14, vars: 9, consts: [[1, "md:h-screen", "py-36", "flex", "items-center", "relative", "overflow-hidden", "zoom-image"], [1, "absolute", "inset-0", "image-wrap", "z-1", "bg-no-repeat", "bg-center", "bg-cover"], [1, "absolute", "inset-0", "bg-gradient-to-b", "from-transparent", "to-black", "z-2"], [1, "container", "relative", "z-3"], [1, "flex", "justify-center"], [1, "max-w-[600px]", "h-[60vh]", "w-full", "m-auto", "p-6", "bg-white", "shadow-md", "dark:shadow-gray-700", "rounded-md"], ["routerLink", "/"], ["alt", "", 1, "mx-auto", "custom-logo-h", 3, "src"], [1, "my-4", "text-xl", "font-semibold"], [1, "mt-4", "rounded", "border", "border-slate-200", "bg-slate-50", "p-4", "text-sm", "text-slate-900"], [1, "mt-4", "rounded", "border", "border-green-200", "bg-green-50", "p-4", "text-sm", "text-green-700"], [1, "mt-4", "rounded", "border", "border-red-200", "bg-red-50", "p-4", "text-sm", "text-red-700"], [1, "mt-4", "text-center"], ["routerLink", "/signup", 1, "text-primary", "font-semibold"]], template: function ActivatePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "a", 6);
            i0.ɵɵelement(7, "img", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h5", 8);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(11, ActivatePage_Conditional_11_Template, 3, 3, "div", 9);
            i0.ɵɵconditionalCreate(12, ActivatePage_Conditional_12_Template, 7, 6);
            i0.ɵɵconditionalCreate(13, ActivatePage_Conditional_13_Template, 3, 3, "div", 10);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("src", ctx.logo, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 7, "activateAccount"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage && !ctx.isLoading ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.isLoading && !ctx.errorMessage ? 13 : -1);
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivatePage, [{
        type: Component,
        args: [{ selector: 'app-activate-page', imports: [RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"md:h-screen py-36 flex items-center relative overflow-hidden zoom-image\">\r\n  <div class=\"absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover\" [style.background-image]=\"'url(' + bg + ')'\">\r\n  </div>\r\n  <div class=\"absolute inset-0 bg-gradient-to-b from-transparent to-black z-2\"></div>\r\n  <div class=\"container relative z-3\">\r\n    <div class=\"flex justify-center\">\r\n      <div class=\"max-w-[600px] h-[60vh] w-full m-auto p-6 bg-white  shadow-md dark:shadow-gray-700 rounded-md\">\r\n        <a routerLink=\"/\"><img [src]=\"logo\" class=\"mx-auto custom-logo-h\" alt=\"\"></a>\r\n        <h5 class=\"my-4 text-xl font-semibold\">{{ 'activateAccount' | translate }}</h5>\r\n\r\n        @if (isLoading) {\r\n          <div class=\"mt-4 rounded border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900\">{{ 'activationInProgress' | translate }}</div>\r\n        }\r\n\r\n        @if (errorMessage && !isLoading) {\r\n          <div class=\"mt-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700\">{{ errorMessage | translate }}</div>\r\n          <div class=\"mt-4 text-center\">\r\n            <a routerLink=\"/signup\" class=\"text-primary font-semibold\">{{ 'returnToSignup' | translate }}</a>\r\n          </div>\r\n        }\r\n\r\n        @if (!isLoading && !errorMessage) {\r\n          <div class=\"mt-4 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-700\">\r\n            {{ 'accountActivatedRedirecting' | translate }}\r\n          </div>\r\n        }\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ActivatePage, { className: "ActivatePage", filePath: "app/features/user/auth-pages/activate-page/activate-page.ts", lineNumber: 14 }); })();
