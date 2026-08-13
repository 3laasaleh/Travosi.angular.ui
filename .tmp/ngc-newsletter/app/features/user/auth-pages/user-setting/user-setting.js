import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import feather from 'feather-icons';
import { AccountTab } from '../../account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../../core/services/apiservice.service';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function UserSetting_Conditional_51_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.personalMessage));
} }
function UserSetting_Conditional_51_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.personalError));
} }
function UserSetting_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, UserSetting_Conditional_51_Conditional_0_Template, 3, 3, "p", 38);
    i0.ɵɵconditionalCreate(1, UserSetting_Conditional_51_Conditional_1_Template, 3, 3, "p", 39);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.personalMessage ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.personalError ? 1 : -1);
} }
function UserSetting_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 40);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function UserSetting_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "saveChanges"), " ");
} }
function UserSetting_Conditional_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 37);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "confirmMismatch"));
} }
function UserSetting_Conditional_95_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.passwordMessage));
} }
function UserSetting_Conditional_95_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.passwordError));
} }
function UserSetting_Conditional_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, UserSetting_Conditional_95_Conditional_0_Template, 3, 3, "p", 38);
    i0.ɵɵconditionalCreate(1, UserSetting_Conditional_95_Conditional_1_Template, 3, 3, "p", 39);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.passwordMessage ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.passwordError ? 1 : -1);
} }
function UserSetting_Conditional_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 40);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function UserSetting_Conditional_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "savePassword"), " ");
} }
export class UserSetting {
    bg = 'assets/images/bg/cta.jpg';
    _authService = inject(AuthService);
    _route = inject(Router);
    fb = inject(FormBuilder);
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    currentUser;
    isPersonalSubmitting = false;
    isPasswordSubmitting = false;
    personalMessage = '';
    personalError = '';
    passwordMessage = '';
    passwordError = '';
    showOldPassword = false;
    showNewPassword = false;
    showConfirmPassword = false;
    toggleOldPasswordVisibility() {
        this.showOldPassword = !this.showOldPassword;
    }
    toggleNewPasswordVisibility() {
        this.showNewPassword = !this.showNewPassword;
    }
    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
    personalForm = this.fb.nonNullable.group({
        firstName: [''],
        lastName: [''],
        email: [{ value: '', disabled: true },],
        phone: [''],
    });
    passwordForm = this.fb.nonNullable.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    constructor() {
        const user = this._authService.getCurentUser();
        if (!user) {
            this._route.navigate(['login']);
            return;
        }
        this.currentUser = user;
        this.personalForm.patchValue({
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            phone: user?.mobile ?? '',
            email: user?.email ?? "",
        });
    }
    ngAfterViewInit() {
        feather.replace();
    }
    savePersonalDetails() {
        if (this.isPersonalSubmitting)
            return;
        this.personalMessage = '';
        this.personalError = '';
        if (this.personalForm.invalid) {
            this.personalForm.markAllAsTouched();
            return;
        }
        this.isPersonalSubmitting = true;
        const payload = {
            firstName: this.personalForm.value.firstName,
            lastName: this.personalForm.value.lastName,
            phone: this.personalForm.value.phone,
        };
        this.apiService.post('Account/UpdateProfile', payload).pipe(finalize(() => {
            this.isPersonalSubmitting = false;
            this.cdr.markForCheck();
        })).subscribe({
            next: () => {
                this.personalMessage = 'personalSaveSuccess';
                this.personalForm.markAsPristine();
            },
            error: () => {
                this.personalError = 'personalSaveError';
            },
        });
    }
    changePassword() {
        if (this.isPasswordSubmitting)
            return;
        this.passwordMessage = '';
        this.passwordError = '';
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            return;
        }
        const payload = {
            oldPassword: this.passwordForm.value.oldPassword,
            newPassword: this.passwordForm.value.newPassword,
            confirmPassword: this.passwordForm.value.confirmPassword,
        };
        this.isPasswordSubmitting = true;
        this.apiService.put('Account/ChangePassword', payload).pipe(finalize(() => {
            this.isPasswordSubmitting = false;
            this.cdr.markForCheck();
        })).subscribe({
            next: () => {
                this.passwordMessage = 'passwordSaveSuccess';
                this.passwordForm.reset();
            },
            error: () => {
                this.passwordError = 'passwordSaveError';
            },
        });
    }
    passwordMatchValidator(form) {
        return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
    }
    static ɵfac = function UserSetting_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserSetting)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserSetting, selectors: [["app-user-setting"]], decls: 100, vars: 89, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "md:flex"], [1, "lg:w-1/4", "md:w-1/3", "md:px-3"], [1, "lg:w-3/4", "md:w-2/3", "md:px-3", "mt-6", "md:mt-0"], [1, "p-6", "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white"], [1, "text-lg", "font-semibold", "mb-4"], [1, "text-slate-500", "mb-5"], [3, "ngSubmit", "formGroup"], [1, "grid", "lg:grid-cols-2", "grid-cols-1", "gap-5"], ["for", "firstName", 1, "form-label", "font-medium"], [1, "form-icon", "relative", "mt-2"], ["data-feather", "user", 1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["id", "firstName", "formControlName", "firstName", "type", "text", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["for", "lastName", 1, "form-label", "font-medium"], ["data-feather", "user-check", 1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["id", "lastName", "formControlName", "lastName", "type", "text", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["for", "email", 1, "form-label", "font-medium"], ["data-feather", "mail", 1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["id", "email", "formControlName", "email", "type", "email", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["for", "phone", 1, "form-label", "font-medium"], ["data-feather", "phone", 1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["id", "phone", "formControlName", "phone", "type", "tel", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["type", "submit", 1, "mt-5", "inline-flex", "items-center", "justify-center", "gap-2", "rounded-md", "bg-primary", "px-5", "py-2", "text-center", "text-base", "font-semibold", "text-white", "duration-500", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "p-6", "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white", "mt-6"], [1, "grid", "grid-cols-1", "gap-5"], ["for", "oldPassword", 1, "form-label", "font-medium"], ["data-feather", "key", 1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["id", "oldPassword", "formControlName", "oldPassword", 1, "ps-12", "pe-12", "w-full", "py-2", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", 3, "type", "placeholder"], ["type", "button", 1, "absolute", "end-1", "top-1/2", "z-10", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-md", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["aria-hidden", "true", 1, "mdi", "text-xl"], ["for", "newPassword", 1, "form-label", "font-medium"], ["id", "newPassword", "formControlName", "newPassword", 1, "ps-12", "pe-12", "w-full", "py-2", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", 3, "type", "placeholder"], ["for", "confirmPassword", 1, "form-label", "font-medium"], ["id", "confirmPassword", "formControlName", "confirmPassword", 1, "ps-12", "pe-12", "w-full", "py-2", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", 3, "type", "placeholder"], [1, "mt-1", "text-sm", "text-red-600"], [1, "text-sm", "text-emerald-600"], [1, "text-sm", "text-red-600"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"]], template: function UserSetting_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "app-home-navbar");
            i0.ɵɵelementStart(2, "section", 0)(3, "div", 1);
            i0.ɵɵelement(4, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3)(6, "div", 4)(7, "div", 5);
            i0.ɵɵelement(8, "app-account-tab");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7)(11, "h5", 8);
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "p", 9);
            i0.ɵɵtext(15);
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "form", 10);
            i0.ɵɵlistener("ngSubmit", function UserSetting_Template_form_ngSubmit_17_listener() { return ctx.savePersonalDetails(); });
            i0.ɵɵelementStart(18, "div", 11)(19, "div")(20, "label", 12);
            i0.ɵɵtext(21);
            i0.ɵɵpipe(22, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 13);
            i0.ɵɵelement(24, "i", 14)(25, "input", 15);
            i0.ɵɵpipe(26, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div")(28, "label", 16);
            i0.ɵɵtext(29);
            i0.ɵɵpipe(30, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 13);
            i0.ɵɵelement(32, "i", 17)(33, "input", 18);
            i0.ɵɵpipe(34, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div")(36, "label", 19);
            i0.ɵɵtext(37);
            i0.ɵɵpipe(38, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 13);
            i0.ɵɵelement(40, "i", 20)(41, "input", 21);
            i0.ɵɵpipe(42, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div")(44, "label", 22);
            i0.ɵɵtext(45);
            i0.ɵɵpipe(46, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "div", 13);
            i0.ɵɵelement(48, "i", 23)(49, "input", 24);
            i0.ɵɵpipe(50, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(51, UserSetting_Conditional_51_Template, 2, 2);
            i0.ɵɵelementStart(52, "button", 25);
            i0.ɵɵconditionalCreate(53, UserSetting_Conditional_53_Template, 4, 3)(54, UserSetting_Conditional_54_Template, 2, 3);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(55, "div", 26)(56, "h5", 8);
            i0.ɵɵtext(57);
            i0.ɵɵpipe(58, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "form", 10);
            i0.ɵɵlistener("ngSubmit", function UserSetting_Template_form_ngSubmit_59_listener() { return ctx.changePassword(); });
            i0.ɵɵelementStart(60, "div", 27)(61, "div")(62, "label", 28);
            i0.ɵɵtext(63);
            i0.ɵɵpipe(64, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "div", 13);
            i0.ɵɵelement(66, "i", 29)(67, "input", 30);
            i0.ɵɵpipe(68, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(69, "button", 31);
            i0.ɵɵpipe(70, "translate");
            i0.ɵɵlistener("click", function UserSetting_Template_button_click_69_listener() { return ctx.toggleOldPasswordVisibility(); });
            i0.ɵɵelement(71, "i", 32);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(72, "div")(73, "label", 33);
            i0.ɵɵtext(74);
            i0.ɵɵpipe(75, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "div", 13);
            i0.ɵɵelement(77, "i", 29)(78, "input", 34);
            i0.ɵɵpipe(79, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(80, "button", 31);
            i0.ɵɵpipe(81, "translate");
            i0.ɵɵlistener("click", function UserSetting_Template_button_click_80_listener() { return ctx.toggleNewPasswordVisibility(); });
            i0.ɵɵelement(82, "i", 32);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(83, "div")(84, "label", 35);
            i0.ɵɵtext(85);
            i0.ɵɵpipe(86, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "div", 13);
            i0.ɵɵelement(88, "i", 29)(89, "input", 36);
            i0.ɵɵpipe(90, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(91, "button", 31);
            i0.ɵɵpipe(92, "translate");
            i0.ɵɵlistener("click", function UserSetting_Template_button_click_91_listener() { return ctx.toggleConfirmPasswordVisibility(); });
            i0.ɵɵelement(93, "i", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(94, UserSetting_Conditional_94_Template, 3, 3, "p", 37);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(95, UserSetting_Conditional_95_Template, 2, 2);
            i0.ɵɵelementStart(96, "button", 25);
            i0.ɵɵconditionalCreate(97, UserSetting_Conditional_97_Template, 4, 3)(98, UserSetting_Conditional_98_Template, 2, 3);
            i0.ɵɵelementEnd()()()()()()()();
            i0.ɵɵelement(99, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 49, "personalDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 51, "createChangeSaveData"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.personalForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 53, "firstName"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(26, 55, "firstName"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 57, "lastName"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(34, 59, "lastName"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(38, 61, "email"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(42, 63, "email"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(46, 65, "phone"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(50, 67, "phone"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.personalMessage || ctx.personalError ? 51 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.personalForm.invalid || ctx.personalForm.pristine || ctx.isPersonalSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isPersonalSubmitting ? 53 : 54);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 69, "changePassword"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.passwordForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(64, 71, "oldPassword"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("type", ctx.showOldPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(68, 73, "oldPassword"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(70, 75, ctx.showOldPassword ? "hidePassword" : "showPassword"))("aria-pressed", ctx.showOldPassword);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showOldPassword)("mdi-eye-outline", !ctx.showOldPassword);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(75, 77, "newPassword"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("type", ctx.showNewPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(79, 79, "newPassword"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(81, 81, ctx.showNewPassword ? "hidePassword" : "showPassword"))("aria-pressed", ctx.showNewPassword);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showNewPassword)("mdi-eye-outline", !ctx.showNewPassword);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(86, 83, "confirmNewPassword"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("type", ctx.showConfirmPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(90, 85, "confirmNewPassword"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(92, 87, ctx.showConfirmPassword ? "hideConfirmPassword" : "showConfirmPassword"))("aria-pressed", ctx.showConfirmPassword);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showConfirmPassword)("mdi-eye-outline", !ctx.showConfirmPassword);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.passwordForm.touched ? 94 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.passwordMessage || ctx.passwordError ? 95 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.passwordForm.invalid || ctx.isPasswordSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isPasswordSubmitting ? 97 : 98);
        } }, dependencies: [HomeNavbar, AccountTab, FooterOne, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserSetting, [{
        type: Component,
        args: [{ selector: 'app-user-setting', imports: [HomeNavbar, AccountTab, FooterOne, ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <app-home-navbar />\r\n    <section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n        <div class=\"container relative\">\r\n            <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"md:flex\">\r\n                <div class=\"lg:w-1/4 md:w-1/3 md:px-3\">\r\n                    <app-account-tab />\r\n                </div>\r\n\r\n                <div class=\"lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0\">\r\n                    <div class=\"p-6 rounded-md shadow dark:shadow-gray-800 bg-white \">\r\n                        <h5 class=\"text-lg font-semibold mb-4\">{{ 'personalDetails' | translate }}</h5>\r\n                        <p class=\"text-slate-500 mb-5\">{{ 'createChangeSaveData' | translate }}</p>\r\n                        <form [formGroup]=\"personalForm\" (ngSubmit)=\"savePersonalDetails()\">\r\n                            <div class=\"grid lg:grid-cols-2 grid-cols-1 gap-5\">\r\n                                <div>\r\n                                    <label class=\"form-label font-medium\" for=\"firstName\">{{ 'firstName' | translate }}</label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"user\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <input id=\"firstName\" formControlName=\"firstName\" type=\"text\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" [placeholder]=\"'firstName' | translate\">\r\n                                    </div>\r\n                                </div>\r\n                                <div>\r\n                                    <label class=\"form-label font-medium\" for=\"lastName\">{{ 'lastName' | translate }}</label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"user-check\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <input id=\"lastName\" formControlName=\"lastName\" type=\"text\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" [placeholder]=\"'lastName' | translate\">\r\n                                    </div>\r\n                                </div>\r\n                                <div>\r\n                                    <label class=\"form-label font-medium\" for=\"email\">{{ 'email' | translate }}</label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"mail\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <input id=\"email\"  formControlName=\"email\" type=\"email\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" [placeholder]=\"'email' | translate\">\r\n                                    </div>\r\n                                </div>\r\n                                <div>\r\n                                    <label class=\"form-label font-medium\" for=\"phone\">{{ 'phone' | translate }}</label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"phone\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <input id=\"phone\" formControlName=\"phone\" type=\"tel\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" [placeholder]=\"'phone' | translate\">\r\n                                    </div>\r\n                                </div>\r\n                             \r\n                            </div>\r\n                            @if (personalMessage || personalError) {\r\n                                @if (personalMessage) {\r\n                                    <p class=\"text-sm text-emerald-600\">{{ personalMessage | translate }}</p>\r\n                                }\r\n                                @if (personalError) {\r\n                                    <p class=\"text-sm text-red-600\">{{ personalError | translate }}</p>\r\n                                }\r\n                            }\r\n                            <button type=\"submit\" class=\"mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-center text-base font-semibold text-white duration-500 disabled:cursor-not-allowed disabled:opacity-60\" [disabled]=\"personalForm.invalid || personalForm.pristine || isPersonalSubmitting\">\r\n                                @if (isPersonalSubmitting) {\r\n                                    <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i>\r\n                                    <span>{{ 'saving' | translate }}</span>\r\n                                } @else {\r\n                                    {{ 'saveChanges' | translate }}\r\n                                }\r\n                            </button>\r\n                        </form>\r\n                    </div>\r\n\r\n                    <div class=\"p-6 rounded-md shadow dark:shadow-gray-800 bg-white  mt-6\">\r\n                        <h5 class=\"text-lg font-semibold mb-4\">{{ 'changePassword' | translate }}</h5>\r\n                        <form [formGroup]=\"passwordForm\" (ngSubmit)=\"changePassword()\">\r\n                            <div class=\"grid grid-cols-1 gap-5\">\r\n                                <div>\r\n                                    <label class=\"form-label font-medium\" for=\"oldPassword\">{{ 'oldPassword' | translate }}</label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"key\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <input id=\"oldPassword\" [type]=\"showOldPassword ? 'text' : 'password'\" formControlName=\"oldPassword\" class=\"ps-12 pe-12 w-full py-2 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20\" [placeholder]=\"'oldPassword' | translate\">\r\n                                        <button type=\"button\" (click)=\"toggleOldPasswordVisibility()\" class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\" [attr.aria-label]=\"(showOldPassword ? 'hidePassword' : 'showPassword') | translate\" [attr.aria-pressed]=\"showOldPassword\"><i class=\"mdi text-xl\" [class.mdi-eye-off-outline]=\"showOldPassword\" [class.mdi-eye-outline]=\"!showOldPassword\" aria-hidden=\"true\"></i></button>\r\n                                    </div>\r\n                                </div>\r\n                                <div>\r\n                                    <label class=\"form-label font-medium\" for=\"newPassword\">{{ 'newPassword' | translate }}</label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"key\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <input id=\"newPassword\" [type]=\"showNewPassword ? 'text' : 'password'\" formControlName=\"newPassword\" class=\"ps-12 pe-12 w-full py-2 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20\" [placeholder]=\"'newPassword' | translate\">\r\n                                        <button type=\"button\" (click)=\"toggleNewPasswordVisibility()\" class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\" [attr.aria-label]=\"(showNewPassword ? 'hidePassword' : 'showPassword') | translate\" [attr.aria-pressed]=\"showNewPassword\"><i class=\"mdi text-xl\" [class.mdi-eye-off-outline]=\"showNewPassword\" [class.mdi-eye-outline]=\"!showNewPassword\" aria-hidden=\"true\"></i></button>\r\n                                    </div>\r\n                                </div>\r\n                                <div>\r\n                                    <label class=\"form-label font-medium\" for=\"confirmPassword\">{{ 'confirmNewPassword' | translate }}</label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"key\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <input id=\"confirmPassword\" [type]=\"showConfirmPassword ? 'text' : 'password'\" formControlName=\"confirmPassword\" class=\"ps-12 pe-12 w-full py-2 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20\" [placeholder]=\"'confirmNewPassword' | translate\">\r\n                                        <button type=\"button\" (click)=\"toggleConfirmPasswordVisibility()\" class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\" [attr.aria-label]=\"(showConfirmPassword ? 'hideConfirmPassword' : 'showConfirmPassword') | translate\" [attr.aria-pressed]=\"showConfirmPassword\"><i class=\"mdi text-xl\" [class.mdi-eye-off-outline]=\"showConfirmPassword\" [class.mdi-eye-outline]=\"!showConfirmPassword\" aria-hidden=\"true\"></i></button>\r\n                                    </div>\r\n                                    @if ( passwordForm.touched) {\r\n                                        <p class=\"mt-1 text-sm text-red-600\">{{ 'confirmMismatch' | translate }}</p>\r\n                                    }\r\n                                </div>\r\n                            </div>\r\n                            @if (passwordMessage || passwordError) {\r\n                                @if (passwordMessage) {\r\n                                    <p class=\"text-sm text-emerald-600\">{{ passwordMessage | translate }}</p>\r\n                                }\r\n                                @if (passwordError) {\r\n                                    <p class=\"text-sm text-red-600\">{{ passwordError | translate }}</p>\r\n                                }\r\n                            }\r\n                            <button type=\"submit\" class=\"mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-center text-base font-semibold text-white duration-500 disabled:cursor-not-allowed disabled:opacity-60\" [disabled]=\"passwordForm.invalid || isPasswordSubmitting\">\r\n                                @if (isPasswordSubmitting) {\r\n                                    <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i>\r\n                                    <span>{{ 'saving' | translate }}</span>\r\n                                } @else {\r\n                                    {{ 'savePassword' | translate }}\r\n                                }\r\n                            </button>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>\r\n<app-footer-one />\r\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserSetting, { className: "UserSetting", filePath: "app/features/user/auth-pages/user-setting/user-setting.ts", lineNumber: 19 }); })();
