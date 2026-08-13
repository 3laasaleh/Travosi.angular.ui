import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function LoginPage_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "emailRequired"));
} }
function LoginPage_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "emailInvalid"));
} }
function LoginPage_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "passwordRequired"));
} }
function LoginPage_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 28);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "submittingSignin"));
} }
function LoginPage_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "signin"), " ");
} }
function LoginPage_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 24);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
export class LoginPage {
    bg = 'assets/images/bg/6.jpg';
    logo = 'assets/images/main-logo.png';
    fb = inject(FormBuilder);
    _authService = inject(AuthService);
    route = inject(ActivatedRoute);
    cdr = inject(ChangeDetectorRef);
    loginForm = this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [false],
    });
    isSubmitting = false;
    errorMessage = '';
    showPassword = false;
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    ngAfterViewInit() {
        feather.replace();
    }
    onSubmit() {
        if (this.isSubmitting)
            return;
        this.errorMessage = '';
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        const payload = {
            email: this.loginForm.get('email')?.value?.trim(),
            password: this.loginForm.get('password')?.value,
            rememberMe: this.loginForm.get('rememberMe')?.value,
        };
        // AuthService handles storing the login result and redirection
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this._authService.login(payload, returnUrl).pipe(finalize(() => {
            this.isSubmitting = false;
            this.cdr.markForCheck();
        })).subscribe({
            next: (res) => {
                if (!res.isSuccess && res?.message)
                    this.errorMessage = res?.message ?? "";
            },
            error: (error) => {
                this.errorMessage = error.message;
            },
        });
    }
    static ɵfac = function LoginPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginPage, selectors: [["app-login-page"]], decls: 49, vars: 43, consts: [[1, "md:h-screen", "py-36", "flex", "items-center", "relative", "overflow-hidden", "zoom-image"], [1, "absolute", "inset-0", "image-wrap", "z-1", "bg-no-repeat", "bg-center", "bg-cover"], ["id", "particles-snow", 1, "absolute", "inset-0", "bg-gradient-to-b", "from-transparent", "to-black", "z-2"], [1, "container", "relative", "z-3"], [1, "flex", "justify-center"], [1, "max-w-[400px]", "w-full", "m-auto", "p-6", "bg-white", "shadow-md", "dark:shadow-gray-700", "rounded-md"], ["routerLink", "/"], ["alt", "", 1, "mx-auto", "custom-logo-h", 3, "src"], [1, "my-6", "text-xl", "font-semibold"], [1, "text-start", 3, "formGroup"], [1, "grid", "grid-cols-1"], [1, "mb-4"], ["for", "LoginEmail", 1, "font-semibold"], ["id", "LoginEmail", "type", "email", "formControlName", "email", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], [1, "mt-1", "text-sm", "text-red-600"], ["for", "LoginPassword", 1, "font-semibold"], [1, "relative", "mt-3"], ["id", "LoginPassword", "formControlName", "password", 1, "h-10", "w-full", "rounded", "border", "border-gray-100", "bg-transparent", "py-2", "ps-3", "pe-12", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", "dark:border-gray-800", 3, "type", "placeholder"], ["type", "button", 1, "absolute", "end-1", "top-1/2", "z-10", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-md", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["aria-hidden", "true", 1, "mdi", "text-xl"], [1, "flex", "justify-between", "mb-4"], [1, "text-slate-400", "mb-0"], ["routerLink", "/forgot-password", 1, "text-slate-400"], ["type", "button", 1, "inline-flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-md", "bg-primary", "px-5", "py-2", "text-center", "text-base", "text-white", "duration-500", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mt-2", "text-sm", "text-red-600"], [1, "text-center"], [1, "text-slate-400", "me-2"], ["routerLink", "/signup", 1, "text-black", "font-bold", "inline-block"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"]], template: function LoginPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "a", 6);
            i0.ɵɵelement(7, "img", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h5", 8);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "form", 9)(12, "div", 10)(13, "div", 11)(14, "label", 12);
            i0.ɵɵtext(15);
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 13);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(19, LoginPage_Conditional_19_Template, 3, 3, "p", 14);
            i0.ɵɵconditionalCreate(20, LoginPage_Conditional_20_Template, 3, 3, "p", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 11)(22, "label", 15);
            i0.ɵɵtext(23);
            i0.ɵɵpipe(24, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 16);
            i0.ɵɵelement(26, "input", 17);
            i0.ɵɵpipe(27, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(28, "button", 18);
            i0.ɵɵpipe(29, "translate");
            i0.ɵɵlistener("click", function LoginPage_Template_button_click_28_listener() { return ctx.togglePasswordVisibility(); });
            i0.ɵɵelement(30, "i", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(31, LoginPage_Conditional_31_Template, 3, 3, "p", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 20)(33, "p", 21)(34, "a", 22);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "div", 11)(38, "button", 23);
            i0.ɵɵlistener("click", function LoginPage_Template_button_click_38_listener() { return ctx.onSubmit(); });
            i0.ɵɵconditionalCreate(39, LoginPage_Conditional_39_Template, 4, 3)(40, LoginPage_Conditional_40_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(41, LoginPage_Conditional_41_Template, 3, 3, "p", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 25)(43, "span", 26);
            i0.ɵɵtext(44);
            i0.ɵɵpipe(45, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "a", 27);
            i0.ɵɵtext(47);
            i0.ɵɵpipe(48, "translate");
            i0.ɵɵelementEnd()()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("src", ctx.logo, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 25, "signin"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 27, "emailAddress"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(18, 29, "emailAddress"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.loginForm.get("email")?.touched && ctx.loginForm.get("email")?.hasError("required") ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loginForm.get("email")?.touched && ctx.loginForm.get("email")?.hasError("email") ? 20 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 31, "password"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(27, 33, "password"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(29, 35, ctx.showPassword ? "hidePassword" : "showPassword"))("aria-pressed", ctx.showPassword);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showPassword)("mdi-eye-outline", !ctx.showPassword);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loginForm.get("password")?.touched && ctx.loginForm.get("password")?.hasError("required") ? 31 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(36, 37, "forgotPassword"), "?");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.loginForm.invalid || ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isSubmitting ? 39 : 40);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.errorMessage ? 41 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(45, 39, "noAccount"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(48, 41, "signup"));
        } }, dependencies: [RouterLink, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, TranslatePipe], encapsulation: 2, changeDetection: 1 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginPage, [{
        type: Component,
        args: [{ selector: 'app-login-page', imports: [RouterLink, ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.Eager, template: "<section class=\"md:h-screen py-36 flex items-center relative overflow-hidden zoom-image\">\r\n    <div class=\"absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover\" [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n    <div class=\"absolute inset-0 bg-gradient-to-b from-transparent to-black z-2\" id=\"particles-snow\"></div>\r\n    <div class=\"container relative z-3\">\r\n        <div class=\"flex justify-center\">\r\n            <div class=\"max-w-[400px] w-full m-auto p-6 bg-white  shadow-md dark:shadow-gray-700 rounded-md\">\r\n                <a routerLink=\"/\"><img [src]=\"logo\" class=\"mx-auto custom-logo-h\" alt=\"\"></a>\r\n                <h5 class=\"my-6 text-xl font-semibold\">{{ 'signin' | translate }}</h5>\r\n                <form class=\"text-start\" [formGroup]=\"loginForm\" >\r\n                    <div class=\"grid grid-cols-1\">\r\n                        <div class=\"mb-4\">\r\n                            <label class=\"font-semibold\" for=\"LoginEmail\">{{'emailAddress' |translate}}</label>\r\n                            <input id=\"LoginEmail\" type=\"email\" formControlName=\"email\" class=\"mt-3 w-full py-2 px-3\r\n                             h-10 bg-transparent   rounded\r\n                              outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\"\r\n                             [placeholder]=\"'emailAddress'|translate\">\r\n                            @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('required')) {\r\n                                <p class=\"mt-1 text-sm text-red-600\">{{ 'emailRequired' | translate }}</p>\r\n                            }\r\n                            @if (loginForm.get('email')?.touched && loginForm.get('email')?.hasError('email')) {\r\n                                <p class=\"mt-1 text-sm text-red-600\">{{ 'emailInvalid' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-4\">\r\n                            <label class=\"font-semibold\" for=\"LoginPassword\">{{'password' |  translate}}</label>\r\n                            <div class=\"relative mt-3\">\r\n                                <input id=\"LoginPassword\" [type]=\"showPassword ? 'text' : 'password'\" formControlName=\"password\"\r\n                                    class=\"h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 pe-12 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-800  \"\r\n                                    [placeholder]=\"'password' | translate\">\r\n                                <button type=\"button\" (click)=\"togglePasswordVisibility()\"\r\n                                    class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\"\r\n                                    [attr.aria-label]=\"(showPassword ? 'hidePassword' : 'showPassword') | translate\"\r\n                                    [attr.aria-pressed]=\"showPassword\">\r\n                                    <i class=\"mdi text-xl\" [class.mdi-eye-off-outline]=\"showPassword\" [class.mdi-eye-outline]=\"!showPassword\" aria-hidden=\"true\"></i>\r\n                                </button>\r\n                            </div>\r\n                            @if (loginForm.get('password')?.touched && loginForm.get('password')?.hasError('required')) {\r\n                                <p class=\"mt-1 text-sm text-red-600\">{{ 'passwordRequired' | translate }}</p>\r\n                            }\r\n                       \r\n                        </div>\r\n\r\n                        <div class=\"flex justify-between mb-4\">\r\n                            <!-- <div class=\"flex items-center mb-0\">\r\n                                <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50 me-2\" type=\"checkbox\" value=\"\" id=\"RememberMe\">\r\n                                <label class=\"form-checkbox-label text-slate-400\" for=\"RememberMe\">Remember me</label>\r\n                            </div> -->\r\n                            <p class=\"text-slate-400 mb-0\"><a routerLink=\"/forgot-password\" class=\"text-slate-400\">{{ 'forgotPassword' | translate }}?</a></p>\r\n                        </div>\r\n\r\n                        <div class=\"mb-4\">\r\n                            <button type=\"button\" (click)=\"onSubmit()\" class=\"inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-center text-base text-white duration-500 disabled:cursor-not-allowed disabled:opacity-60\" \r\n                            [disabled]=\"loginForm.invalid || isSubmitting\">\r\n                                @if (isSubmitting) {\r\n                                    <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i>\r\n                                    <span>{{ 'submittingSignin' | translate }}</span>\r\n                                } @else {\r\n                                    {{ 'signin' | translate }}\r\n                                }\r\n                            </button>\r\n                            @if (errorMessage) {\r\n                                <p class=\"mt-2 text-sm text-red-600\">{{ errorMessage | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"text-center\">\r\n                            <span class=\"text-slate-400 me-2\">{{ 'noAccount' | translate }}</span> <a routerLink=\"/signup\" class=\"text-black  font-bold inline-block\">{{ 'signup' | translate }}</a>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "app/features/user/auth-pages/login-page/login-page.ts", lineNumber: 17 }); })();
