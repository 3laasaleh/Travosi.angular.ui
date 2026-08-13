import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { ApiService } from '../../../../core/services/apiservice.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function ForgotPassword_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 9);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 10);
    i0.ɵɵelement(3, "path", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "div")(5, "h3", 12);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 13);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "a", 14);
    i0.ɵɵlistener("click", function ForgotPassword_Conditional_8_Template_a_click_11_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.navigateToHome()); });
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 3, "emailSentSuccessfully"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(10, 5, "passwordResetEmailSentDescription"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 7, "backToHome"));
} }
function ForgotPassword_Conditional_9_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.errorMessage));
} }
function ForgotPassword_Conditional_9_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 27);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "submitting"));
} }
function ForgotPassword_Conditional_9_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "send"));
} }
function ForgotPassword_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "h5", 15);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 16)(4, "p", 17);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "form", 18);
    i0.ɵɵlistener("ngSubmit", function ForgotPassword_Conditional_9_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSubmit()); });
    i0.ɵɵelementStart(8, "div", 16)(9, "div", 19)(10, "label", 20);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 21);
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, ForgotPassword_Conditional_9_Conditional_15_Template, 3, 3, "p", 22);
    i0.ɵɵelementStart(16, "div", 19)(17, "button", 23);
    i0.ɵɵconditionalCreate(18, ForgotPassword_Conditional_9_Conditional_18_Template, 4, 3)(19, ForgotPassword_Conditional_9_Conditional_19_Template, 3, 3, "span");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 24)(21, "span", 25);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "a", 26);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "translate");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 10, "resetPasswordTitle"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 12, "resetPasswordInstructions"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.resetPasswordForm);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(12, 14, "emailAddress"), ":");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(14, 16, "emailPlaceholder"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.errorMessage ? 15 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.resetPasswordForm.invalid || ctx_r1.isSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSubmitting ? 18 : 19);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(23, 18, "rememberPassword"), "?");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 20, "signin"));
} }
export class ForgotPassword {
    _apiService = inject(ApiService);
    _router = inject(Router);
    bg = 'assets/images/bg/6.jpg';
    logo = 'assets/images/main-logo.png';
    fb = inject(FormBuilder);
    cdr = inject(ChangeDetectorRef);
    resetPasswordForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
    });
    isEmailSent = false;
    isSubmitting = false;
    errorMessage = '';
    messageSent;
    ngAfterViewInit() {
        feather.replace();
    }
    navigateToHome() {
        this._router.navigate(['home']);
    }
    onSubmit() {
        if (this.isSubmitting)
            return;
        this.errorMessage = '';
        if (this.resetPasswordForm.invalid) {
            this.resetPasswordForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        this._apiService
            .post('account/ForgetPassword', this.resetPasswordForm.getRawValue())
            .pipe(finalize(() => {
            this.isSubmitting = false;
            this.cdr.markForCheck();
        }))
            .subscribe({ next: (res) => {
                this.isEmailSent = true;
                this.messageSent = res.message;
            }, error: () => {
                this.errorMessage = 'forgotPasswordError';
            } });
    }
    static ɵfac = function ForgotPassword_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ForgotPassword)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForgotPassword, selectors: [["app-forgot-password"]], decls: 10, vars: 6, consts: [[1, "md:h-screen", "py-36", "flex", "items-center", "relative", "overflow-hidden", "zoom-image"], [1, "absolute", "inset-0", "image-wrap", "z-1", "bg-no-repeat", "bg-center", "bg-cover"], ["id", "particles-snow", 1, "absolute", "inset-0", "bg-gradient-to-b", "from-transparent", "to-black", "z-2"], [1, "container", "relative", "z-3"], [1, "flex", "justify-center"], [1, "max-w-[400px]", "w-full", "m-auto", "p-6", "bg-white", "shadow-md", "dark:shadow-gray-700", "rounded-md"], ["routerLink", "/"], ["alt", "", 1, "mx-auto", 3, "src"], [1, "rounded-lg", "border", "border-green-200", "bg-green-50", "p-4", "text-green-800"], [1, "flex", "items-start", "gap-3"], ["fill", "none", "stroke", "currentColor", "stroke-width", "2", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "M5 13l4 4L19 7"], [1, "font-semibold", "text-lg"], [1, "mt-1"], [1, "cursor-pointer", "font-semibold", "text-lg", "text-blue-600", 3, "click"], [1, "my-6", "text-xl", "font-semibold"], [1, "grid", "grid-cols-1"], [1, "text-slate-400", "mb-6"], [3, "ngSubmit", "formGroup"], [1, "mb-4"], ["for", "LoginEmail", 1, "font-semibold"], ["id", "LoginEmail", "formControlName", "email", "type", "email", "required", "", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], [1, "mb-4", "text-sm", "text-red-600"], ["type", "submit", 1, "inline-flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-md", "bg-primary", "px-5", "py-2", "text-center", "text-base", "text-white", "duration-500", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "text-center"], [1, "text-slate-400", "me-2"], ["routerLink", "/login", 1, "text-black", "font-bold", "inline-block"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"]], template: function ForgotPassword_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "a", 6);
            i0.ɵɵelement(7, "img", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(8, ForgotPassword_Conditional_8_Template, 14, 9, "div", 8)(9, ForgotPassword_Conditional_9_Template, 27, 22);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(6);
            i0.ɵɵstyleProp("height", 10, "rem");
            i0.ɵɵproperty("src", ctx.logo, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isEmailSent ? 8 : 9);
        } }, dependencies: [RouterLink, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.FormGroupDirective, i1.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotPassword, [{
        type: Component,
        args: [{ selector: 'app-forgot-password', imports: [RouterLink, TranslatePipe, ReactiveFormsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"md:h-screen py-36 flex items-center relative overflow-hidden zoom-image\">\r\n    <div class=\"absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover\"\r\n        [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n    <div class=\"absolute inset-0 bg-gradient-to-b from-transparent to-black z-2\" id=\"particles-snow\"></div>\r\n    <div class=\"container relative z-3\">\r\n        <div class=\"flex justify-center\">\r\n            <div\r\n                class=\"max-w-[400px] w-full m-auto p-6 bg-white  shadow-md dark:shadow-gray-700 rounded-md\">\r\n                <a routerLink=\"/\">\r\n                    <img [src]=\"logo\" [style.height.rem]=\"10\" class=\"mx-auto\" alt=\"\"></a>\r\n                @if(isEmailSent){\r\n                <div\r\n                    class=\"rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 \">\r\n\r\n                    <div class=\"flex items-start gap-3\">\r\n                        <svg class=\"w-6 h-6 text-green-600\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"\r\n                            viewBox=\"0 0 24 24\">\r\n                            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5 13l4 4L19 7\" />\r\n                        </svg>\r\n\r\n                        <div>\r\n                            <h3 class=\"font-semibold text-lg\">\r\n                                {{ 'emailSentSuccessfully' | translate }}\r\n                            </h3>\r\n\r\n                            <p class=\"mt-1\">\r\n                                {{ 'passwordResetEmailSentDescription' | translate }}\r\n                            </p>\r\n                            <a (click)=\"navigateToHome()\" class=\"cursor-pointer font-semibold text-lg text-blue-600\">{{ 'backToHome' | translate }}</a>\r\n                        </div>\r\n                    </div>\r\n                </div> }\r\n                @else{\r\n                <h5 class=\"my-6 text-xl font-semibold\">{{ 'resetPasswordTitle' | translate }}</h5>\r\n                <div class=\"grid grid-cols-1\">\r\n                    <p class=\"text-slate-400 mb-6\">{{ 'resetPasswordInstructions' | translate }}</p>\r\n                    <form [formGroup]=\"resetPasswordForm\" (ngSubmit)=\"onSubmit()\">\r\n                        <div class=\"grid grid-cols-1\">\r\n                            <div class=\"mb-4\">\r\n                                <label class=\"font-semibold\" for=\"LoginEmail\">{{ 'emailAddress' | translate }}:</label>\r\n                                <input id=\"LoginEmail\" formControlName=\"email\" type=\"email\"\r\n                                    class=\"mt-3 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\"\r\n                                    [placeholder]=\"'emailPlaceholder' | translate\" required>\r\n                            </div>\r\n\r\n                            @if (errorMessage) {\r\n                                <p class=\"mb-4 text-sm text-red-600\">{{ errorMessage | translate }}</p>\r\n                            }\r\n                            <div class=\"mb-4\">\r\n                                <button type=\"submit\" [disabled]=\"resetPasswordForm.invalid || isSubmitting\"\r\n                                    class=\"inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-center text-base text-white duration-500 disabled:cursor-not-allowed disabled:opacity-60\">\r\n                                    @if (isSubmitting) {\r\n                                        <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i>\r\n                                        <span>{{ 'submitting' | translate }}</span>\r\n                                    } @else {\r\n                                        <span>{{ 'send' | translate }}</span>\r\n                                    }\r\n                                </button>\r\n                            </div>\r\n\r\n                            <div class=\"text-center\">\r\n                                <span class=\"text-slate-400 me-2\">{{ 'rememberPassword' | translate }}?</span>\r\n                                <a routerLink=\"/login\" class=\"text-black  font-bold inline-block\">{{ 'signin' | translate }}</a>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                }\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ForgotPassword, { className: "ForgotPassword", filePath: "app/features/user/auth-pages/forgot-password/forgot-password.ts", lineNumber: 15 }); })();
