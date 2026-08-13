import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import feather from 'feather-icons';
import { ApiService } from '../../../../core/services/apiservice.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function ResetPassword_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "resetInvalidLink"), " ");
} }
function ResetPassword_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "a", 10);
    i0.ɵɵlistener("click", function ResetPassword_Conditional_12_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.navigateToHome()); });
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, "resetTokenExpired"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 4, "backToHome"));
} }
function ResetPassword_Conditional_13_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 17);
} }
function ResetPassword_Conditional_13_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function ResetPassword_Conditional_13_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "passwordRequired"));
} }
function ResetPassword_Conditional_13_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "passwordMinLength"));
} }
function ResetPassword_Conditional_13_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "passwordComplexity"));
} }
function ResetPassword_Conditional_13_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 17);
} }
function ResetPassword_Conditional_13_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function ResetPassword_Conditional_13_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "confirmMismatch"));
} }
function ResetPassword_Conditional_13_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.successMessage));
} }
function ResetPassword_Conditional_13_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.errorMessage));
} }
function ResetPassword_Conditional_13_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 25);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function ResetPassword_Conditional_13_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "savePassword"), " ");
} }
function ResetPassword_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 11);
    i0.ɵɵlistener("ngSubmit", function ResetPassword_Conditional_13_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSubmit()); });
    i0.ɵɵelementStart(1, "div", 12)(2, "div")(3, "div", 13)(4, "label", 14);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "input", 15);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(9, "button", 16);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵlistener("click", function ResetPassword_Conditional_13_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.togglePasswordVisibility()); });
    i0.ɵɵconditionalCreate(11, ResetPassword_Conditional_13_Conditional_11_Template, 1, 0, "i", 17)(12, ResetPassword_Conditional_13_Conditional_12_Template, 1, 0, "i", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(13, ResetPassword_Conditional_13_Conditional_13_Template, 3, 3, "p", 19);
    i0.ɵɵconditionalCreate(14, ResetPassword_Conditional_13_Conditional_14_Template, 3, 3, "p", 19);
    i0.ɵɵconditionalCreate(15, ResetPassword_Conditional_13_Conditional_15_Template, 3, 3, "p", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div")(17, "div", 13)(18, "label", 20);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 21);
    i0.ɵɵpipe(22, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(23, "button", 16);
    i0.ɵɵpipe(24, "translate");
    i0.ɵɵlistener("click", function ResetPassword_Conditional_13_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleConfirmPasswordVisibility()); });
    i0.ɵɵconditionalCreate(25, ResetPassword_Conditional_13_Conditional_25_Template, 1, 0, "i", 17)(26, ResetPassword_Conditional_13_Conditional_26_Template, 1, 0, "i", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(27, ResetPassword_Conditional_13_Conditional_27_Template, 3, 3, "p", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(28, ResetPassword_Conditional_13_Conditional_28_Template, 3, 3, "div", 22);
    i0.ɵɵconditionalCreate(29, ResetPassword_Conditional_13_Conditional_29_Template, 3, 3, "div", 23);
    i0.ɵɵelementStart(30, "button", 24);
    i0.ɵɵconditionalCreate(31, ResetPassword_Conditional_13_Conditional_31_Template, 4, 3)(32, ResetPassword_Conditional_13_Conditional_32_Template, 2, 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.resetPasswordForm);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 21, "newPassword"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("type", ctx_r1.showPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(8, 23, "newPassword"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(10, 25, ctx_r1.showPassword ? "hidePassword" : "showPassword"))("aria-pressed", ctx_r1.showPassword);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.showPassword ? 11 : 12);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.password?.touched && ctx_r1.password?.errors?.["required"] ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.password?.touched && ctx_r1.password?.errors?.["minlength"] ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.password?.touched && ctx_r1.password?.errors?.["pattern"] ? 15 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 27, "confirmNewPassword"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("type", ctx_r1.showConfirmPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(22, 29, "confirmNewPassword"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(24, 31, ctx_r1.showConfirmPassword ? "hideConfirmPassword" : "showConfirmPassword"))("aria-pressed", ctx_r1.showConfirmPassword);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.showConfirmPassword ? 25 : 26);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.resetPasswordForm.touched && ctx_r1.resetPasswordForm.errors?.["mismatch"] ? 27 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.successMessage ? 28 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.errorMessage ? 29 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.resetPasswordForm.invalid || ctx_r1.isSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isSubmitting ? 31 : 32);
} }
export class ResetPassword {
    route = inject(ActivatedRoute);
    _router = inject(Router);
    apiService = inject(ApiService);
    fb = inject(FormBuilder);
    jwtHelper = inject(JwtHelperService);
    cdr = inject(ChangeDetectorRef);
    bg = 'assets/images/bg/6.jpg';
    email = '';
    token = '';
    isSubmitting = false;
    errorMessage = '';
    successMessage = '';
    tokenExpired = false;
    invalidLink = false;
    showPassword = false;
    showConfirmPassword = false;
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
    resetPasswordForm = this.fb.nonNullable.group({
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
            ],
        ],
        confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    constructor() {
        const token = this.route.snapshot.queryParamMap.get('token') ?? '';
        const email = this.route.snapshot.queryParamMap.get('email') ?? '';
        this.email = email;
        this.token = token;
        if (!token || !email) {
            this.invalidLink = true;
            return;
        }
        if (this.jwtHelper.isTokenExpired(token)) {
            this.tokenExpired = true;
            return;
        }
    }
    ngAfterViewInit() {
        feather.replace();
    }
    get password() {
        return this.resetPasswordForm.get('password');
    }
    get confirmPassword() {
        return this.resetPasswordForm.get('confirmPassword');
    }
    onSubmit() {
        if (this.isSubmitting)
            return;
        this.errorMessage = '';
        this.successMessage = '';
        if (!this.isFormValid()) {
            this.resetPasswordForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        const payload = {
            email: this.email,
            token: this.token,
            password: this.password?.value,
        };
        this.apiService.post('Account/changepassword', payload).pipe(finalize(() => {
            this.isSubmitting = false;
            this.cdr.markForCheck();
        })).subscribe({
            next: () => {
                this.successMessage = 'resetPasswordSuccess';
            },
            error: () => {
                this.errorMessage = 'resetPasswordError';
            },
        });
    }
    isFormValid() {
        return this.resetPasswordForm.valid && !this.resetPasswordForm.hasError('mismatch');
    }
    passwordMatchValidator(control) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        return password && confirmPassword && password === confirmPassword ? null : { mismatch: true };
    }
    navigateToHome() {
        this._router.navigate(['home']);
    }
    static ɵfac = function ResetPassword_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ResetPassword)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResetPassword, selectors: [["app-reset-password"]], decls: 14, vars: 8, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "grid", "place-items-center"], [1, "w-full", "lg:w-2/5"], [1, "p-6", "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white"], [1, "text-lg", "font-semibold", "mb-4"], [1, "text-red-600", "mb-4"], [3, "formGroup"], [1, "cursor-pointer", "font-semibold", "text-lg", "text-blue-600", 3, "click"], [3, "ngSubmit", "formGroup"], [1, "grid", "gap-5"], [1, "relative", "mt-2"], ["for", "password", 1, "form-label", "font-medium"], ["id", "password", "formControlName", "password", 1, "w-full", "py-2", "h-10", "ps-4", "pe-12", "rounded", "border", "border-gray-200", "dark:border-slate-800", "bg-transparent", "text-slate-700", 3, "type", "placeholder"], ["type", "button", 1, "absolute", "end-1", "top-1/2", "z-10", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-md", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], [1, "mdi", "mdi-eye-off-outline", "text-xl"], [1, "mdi", "mdi-eye-outline", "text-xl"], [1, "text-sm", "text-red-600"], ["for", "confirmPassword", 1, "form-label", "font-medium"], ["id", "confirmPassword", "formControlName", "confirmPassword", 1, "mt-2", "ps-4", "pe-12", "w-full", "py-2", "h-10", "rounded", "border", "border-gray-200", "dark:border-slate-800", "bg-transparent", "text-slate-700", 3, "type", "placeholder"], [1, "text-emerald-600", "mt-4"], [1, "text-red-600", "mt-4"], ["type", "submit", 1, "mt-5", "inline-flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-md", "bg-primary", "px-5", "py-2", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"]], template: function ResetPassword_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "section", 0)(2, "div", 1);
            i0.ɵɵelement(3, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "h5", 7);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(11, ResetPassword_Conditional_11_Template, 3, 3, "div", 8);
            i0.ɵɵconditionalCreate(12, ResetPassword_Conditional_12_Template, 6, 6);
            i0.ɵɵconditionalCreate(13, ResetPassword_Conditional_13_Template, 33, 33, "form", 9);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 6, "resetPassword"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.invalidLink ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.tokenExpired && !ctx.invalidLink ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.invalidLink && !ctx.tokenExpired ? 13 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResetPassword, [{
        type: Component,
        args: [{ selector: 'app-reset-password', imports: [ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n        <div class=\"container relative\">\r\n            <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\"\r\n                [style.background-image]=\"'url(' + bg + ')'\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"grid place-items-center\">\r\n                <div class=\"w-full lg:w-2/5\">\r\n                    <div class=\"p-6 rounded-md shadow dark:shadow-gray-800 bg-white \">\r\n                        <h5 class=\"text-lg font-semibold mb-4\">{{ 'resetPassword' | translate }}</h5>\r\n\r\n                        @if (invalidLink) {\r\n                        <div class=\"text-red-600 mb-4\">\r\n                            {{ 'resetInvalidLink' | translate }}\r\n                        </div>\r\n                        }\r\n\r\n                        @if (tokenExpired && !invalidLink) {\r\n                        <div class=\"text-red-600 mb-4\">\r\n                            {{ 'resetTokenExpired' | translate }}\r\n                        </div>\r\n                        <a (click)=\"navigateToHome()\" class=\"cursor-pointer font-semibold text-lg text-blue-600\">\r\n                            {{ 'backToHome' | translate }}</a>\r\n\r\n                        }\r\n\r\n                        @if (!invalidLink && !tokenExpired) {\r\n                        <form [formGroup]=\"resetPasswordForm\" (ngSubmit)=\"onSubmit()\">\r\n                            <div class=\"grid gap-5\">\r\n                                <div>\r\n                                    <div class=\"relative mt-2\">\r\n                                        <label class=\"form-label font-medium\" for=\"password\">{{ 'newPassword' |\r\n                                            translate\r\n                                            }}</label>\r\n                                        <input id=\"password\" [type]=\"showPassword ? 'text' : 'password'\"\r\n                                            formControlName=\"password\"\r\n                                            class=\"w-full py-2 h-10 ps-4 pe-12 rounded border border-gray-200 dark:border-slate-800 bg-transparent  text-slate-700 \"\r\n                                            [placeholder]=\"'newPassword' | translate\">\r\n\r\n                                        <button type=\"button\" (click)=\"togglePasswordVisibility()\"\r\n                                            class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\"\r\n                                            [attr.aria-label]=\"(showPassword ? 'hidePassword' : 'showPassword') | translate\"\r\n                                            [attr.aria-pressed]=\"showPassword\">\r\n\r\n                                            @if (showPassword) {\r\n                                            <!-- Eye Off -->\r\n                                            <i class=\"mdi mdi-eye-off-outline text-xl\"></i>\r\n                                            } @else {\r\n                                            <!-- Eye -->\r\n                                            <i class=\"mdi mdi-eye-outline text-xl\"></i>\r\n                                            }\r\n                                        </button>\r\n\r\n                                    </div>\r\n                                    @if (password?.touched && password?.errors?.['required']) {\r\n                                    <p class=\"text-sm text-red-600\">{{ 'passwordRequired' | translate }}</p>\r\n                                    }\r\n                                    @if (password?.touched && password?.errors?.['minlength']) {\r\n                                    <p class=\"text-sm text-red-600\">{{ 'passwordMinLength' | translate }}</p>\r\n                                    }\r\n                                    @if (password?.touched && password?.errors?.['pattern']) {\r\n                                    <p class=\"text-sm text-red-600\">{{ 'passwordComplexity' | translate }}</p>\r\n                                    }\r\n                                </div>\r\n                                <div>\r\n                                    <div class=\"relative mt-2\">\r\n                                        <label class=\"form-label font-medium\" for=\"confirmPassword\">{{\r\n                                            'confirmNewPassword'\r\n                                            | translate }}</label>\r\n                                        <input id=\"confirmPassword\" [type]=\"showConfirmPassword ? 'text' : 'password'\" formControlName=\"confirmPassword\"\r\n                                            class=\"mt-2 ps-4 pe-12 w-full py-2 h-10 rounded border border-gray-200 dark:border-slate-800 bg-transparent  text-slate-700 \"\r\n                                            [placeholder]=\"'confirmNewPassword' | translate\">\r\n                                        <button type=\"button\" (click)=\"toggleConfirmPasswordVisibility()\"\r\n                                            class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\"\r\n                                            [attr.aria-label]=\"(showConfirmPassword ? 'hideConfirmPassword' : 'showConfirmPassword') | translate\"\r\n                                            [attr.aria-pressed]=\"showConfirmPassword\">\r\n\r\n                                            @if (showConfirmPassword) {\r\n                                            <!-- Eye Off -->\r\n                                            <i class=\"mdi mdi-eye-off-outline text-xl\"></i>\r\n                                            } @else {\r\n                                            <!-- Eye -->\r\n                                            <i class=\"mdi mdi-eye-outline text-xl\"></i>\r\n                                            }\r\n                                        </button>\r\n\r\n                                    </div>\r\n                                    @if (resetPasswordForm.touched && resetPasswordForm.errors?.['mismatch']) {\r\n                                    <p class=\"text-sm text-red-600\">{{ 'confirmMismatch' | translate }}</p>\r\n                                    }\r\n                                </div>\r\n                            </div>\r\n\r\n                            @if (successMessage) {\r\n                            <div class=\"text-emerald-600 mt-4\">{{ successMessage | translate }}</div>\r\n                            }\r\n                            @if (errorMessage) {\r\n                            <div class=\"text-red-600 mt-4\">{{ errorMessage | translate }}</div>\r\n                            }\r\n\r\n                            <button type=\"submit\" class=\"mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60\"\r\n                                [disabled]=\"resetPasswordForm.invalid || isSubmitting\">\r\n                                @if (isSubmitting) {\r\n                                    <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i>\r\n                                    <span>{{ 'saving' | translate }}</span>\r\n                                } @else {\r\n                                    {{ 'savePassword' | translate }}\r\n                                }\r\n                            </button>\r\n                        </form>\r\n                        }\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </section>\r\n</div>\r\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ResetPassword, { className: "ResetPassword", filePath: "app/features/user/auth-pages/reset-password/reset-password.ts", lineNumber: 16 }); })();
