import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { AuthService } from '../../_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
function SignupPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function SignupPage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function SignupPage_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "firstNameRequired"));
} }
function SignupPage_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "firstNameMin"));
} }
function SignupPage_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "lastNameRequired"));
} }
function SignupPage_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "lastNameMin"));
} }
function SignupPage_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "mobileRequired"));
} }
function SignupPage_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "mobileInvalid"));
} }
function SignupPage_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "emailRequired"));
} }
function SignupPage_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "emailInvalid"));
} }
function SignupPage_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "dateOfBirthRequired"));
} }
function SignupPage_For_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 27);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const gender_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", gender_r2.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, gender_r2.label));
} }
function SignupPage_Conditional_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "passportNumberRequired"));
} }
function SignupPage_Conditional_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "passwordRequired"));
} }
function SignupPage_Conditional_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "passwordMin"));
} }
function SignupPage_Conditional_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "confirmRequired"));
} }
function SignupPage_Conditional_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "confirmMismatch"));
} }
function SignupPage_Conditional_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "acceptTerms"));
} }
function SignupPage_Conditional_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 45);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "submitting"));
} }
function SignupPage_Conditional_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "createAccount"), " ");
} }
export class SignupPage {
    fb = inject(FormBuilder);
    _authService = inject(AuthService);
    router = inject(Router);
    cdr = inject(ChangeDetectorRef);
    genders = [
        { value: 0, label: 'male' },
        { value: 1, label: 'female' },
    ];
    maxBirthDate = new Date().toISOString().slice(0, 10);
    bg = 'assets/images/bg/6.jpg';
    logo = 'assets/images/main-logo.png';
    isSubmitting = false;
    errorMessage = '';
    successMessage = '';
    showPassword = false;
    showConfirmPassword = false;
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    toggleConfirmPasswordVisibility() {
        this.showConfirmPassword = !this.showConfirmPassword;
    }
    signupForm = this.fb.nonNullable.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        mobile: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', Validators.required],
        gender: [0, Validators.required],
        passportNumber: ['', [Validators.required, Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        acceptTerms: [false, Validators.requiredTrue],
    }, {
        validators: this.passwordMatchValidator,
    });
    ngAfterViewInit() {
        feather.replace();
    }
    onSubmit() {
        if (this.isSubmitting)
            return;
        this.errorMessage = '';
        this.successMessage = '';
        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched();
            return;
        }
        const payload = {
            firstName: this.signupForm.get('firstName')?.value?.trim() ?? '',
            lastName: this.signupForm.get('lastName')?.value?.trim() ?? '',
            email: this.signupForm.get('email')?.value?.trim() ?? '',
            mobile: this.signupForm.get('mobile')?.value?.trim() ?? '',
            password: this.signupForm.get('password')?.value ?? '',
            confirmPassword: this.signupForm.get('confirmPassword')?.value ?? '',
            dateOfBirth: this.signupForm.controls.dateOfBirth.value,
            gender: Number(this.signupForm.controls.gender.value),
            passportNumber: this.signupForm.controls.passportNumber.value.trim(),
        };
        this.isSubmitting = true;
        this._authService.registeration(payload).pipe(finalize(() => {
            this.isSubmitting = false;
            this.cdr.markForCheck();
        })).subscribe({
            next: (res) => {
                if (res.isSuccess) {
                    this.successMessage = res.data ?? 'signupCompleted';
                    this.router.navigateByUrl('/login');
                }
                else {
                    this.errorMessage = res.message ?? 'signupFailed';
                }
            },
            error: (error) => {
                this.errorMessage =
                    error?.error?.message || error?.message || 'registrationFailed';
            },
        });
    }
    passwordMatchValidator(control) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        if (password && confirmPassword && password !== confirmPassword) {
            control.get('confirmPassword')?.setErrors({ mismatch: true });
            return { mismatch: true };
        }
        if (control.get('confirmPassword')?.hasError('mismatch')) {
            control.get('confirmPassword')?.setErrors(null);
        }
        return null;
    }
    static ɵfac = function SignupPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SignupPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SignupPage, selectors: [["app-signup-page"]], decls: 113, vars: 123, consts: [[1, "min-h-screen", "py-12", "flex", "items-center", "relative", "overflow-hidden", "zoom-image"], [1, "absolute", "inset-0", "image-wrap", "z-1", "bg-no-repeat", "bg-center", "bg-cover"], ["id", "particles-snow", 1, "absolute", "inset-0", "bg-gradient-to-b", "from-transparent", "to-black", "z-2"], [1, "container", "relative", "z-3"], [1, "flex", "justify-center"], [1, "max-w-[900px]", "w-full", "m-auto", "p-6", "bg-white", "shadow-md", "dark:shadow-gray-700", "rounded-md"], ["routerLink", "/"], ["alt", "", 1, "mx-auto", "custom-logo-h", 3, "src"], [1, "my-2", "text-xl", "font-semibold"], [1, "mb-6", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-6", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "text-start", 3, "ngSubmit", "formGroup"], [1, "grid", "lg:grid-cols-2", "md:grid-cols-2", "sm:grid-cols-1", "gap-2"], [1, "mb-1"], ["for", "firstName", 1, "font-semibold"], ["id", "firstName", "type", "text", "formControlName", "firstName", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], [1, "mt-1", "text-sm", "text-red-600"], ["for", "lastName", 1, "font-semibold"], ["id", "lastName", "type", "text", "formControlName", "lastName", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["for", "mobile", 1, "font-semibold"], ["id", "mobile", "type", "tel", "formControlName", "mobile", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["for", "email", 1, "font-semibold"], ["id", "email", "type", "email", "formControlName", "email", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["for", "dateOfBirth", 1, "font-semibold"], ["id", "dateOfBirth", "formControlName", "dateOfBirth", 1, "mt-3", "block", 3, "max", "placeholder", "ariaLabel", "inputClass"], ["for", "gender", 1, "font-semibold"], ["id", "gender", "formControlName", "gender", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "bg-white", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:border-primary", "focus:ring-0"], [3, "ngValue"], ["for", "passportNumber", 1, "font-semibold"], ["id", "passportNumber", "type", "text", "formControlName", "passportNumber", 1, "mt-3", "w-full", "py-2", "px-3", "h-10", "uppercase", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:border-primary", "focus:ring-0"], ["for", "password", 1, "font-semibold"], [1, "relative", "mt-3"], ["id", "password", "formControlName", "password", 1, "w-full", "h-10", "rounded", "border", "border-gray-100", "bg-transparent", "py-2", "ps-3", "pe-11", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", "dark:border-gray-800", 3, "type", "placeholder"], ["type", "button", 1, "absolute", "end-1", "top-1/2", "z-10", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-md", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["aria-hidden", "true", 1, "mdi", "text-xl"], ["for", "confirmPassword", 1, "font-semibold"], ["id", "confirmPassword", "formControlName", "confirmPassword", 1, "w-full", "h-10", "rounded", "border", "border-gray-100", "bg-transparent", "py-2", "ps-3", "pe-11", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", "dark:border-gray-800", 3, "type", "placeholder"], [1, "flex", "items-center", "w-full", "mb-0"], ["formControlName", "acceptTerms", "type", "checkbox", "id", "AcceptTC", 1, "size-4", "rounded", "border", "text-primary", "focus:shadow-primary/50", "focus:ring-0"], ["for", "AcceptTC", 1, "form-check-label", "text-slate-400"], ["href", "javascript:void(0)", 1, "text-primary"], ["type", "submit", 1, "inline-flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-md", "border", "border-primary", "bg-primary", "px-5", "py-2", "text-center", "text-base", "font-semibold", "text-white", "duration-500", "hover:bg-primary-600", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "text-center"], [1, "text-slate-400", "me-2"], ["routerLink", "/login", 1, "text-black", "font-bold", "inline-block"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"]], template: function SignupPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "a", 6);
            i0.ɵɵelement(7, "img", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h5", 8);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(11, SignupPage_Conditional_11_Template, 3, 3, "div", 9);
            i0.ɵɵconditionalCreate(12, SignupPage_Conditional_12_Template, 3, 3, "div", 10);
            i0.ɵɵelementStart(13, "form", 11);
            i0.ɵɵlistener("ngSubmit", function SignupPage_Template_form_ngSubmit_13_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(14, "div", 12)(15, "div", 13)(16, "label", 14);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 15);
            i0.ɵɵpipe(20, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(21, SignupPage_Conditional_21_Template, 3, 3, "p", 16);
            i0.ɵɵconditionalCreate(22, SignupPage_Conditional_22_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 13)(24, "label", 17);
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 18);
            i0.ɵɵpipe(28, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(29, SignupPage_Conditional_29_Template, 3, 3, "p", 16);
            i0.ɵɵconditionalCreate(30, SignupPage_Conditional_30_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 13)(32, "label", 19);
            i0.ɵɵtext(33);
            i0.ɵɵpipe(34, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(35, "input", 20);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(37, SignupPage_Conditional_37_Template, 3, 3, "p", 16);
            i0.ɵɵconditionalCreate(38, SignupPage_Conditional_38_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 13)(40, "label", 21);
            i0.ɵɵtext(41);
            i0.ɵɵpipe(42, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(43, "input", 22);
            i0.ɵɵpipe(44, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(45, SignupPage_Conditional_45_Template, 3, 3, "p", 16);
            i0.ɵɵconditionalCreate(46, SignupPage_Conditional_46_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "div", 13)(48, "label", 23);
            i0.ɵɵtext(49);
            i0.ɵɵpipe(50, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(51, "app-date-picker", 24);
            i0.ɵɵpipe(52, "translate");
            i0.ɵɵpipe(53, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(54, SignupPage_Conditional_54_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 13)(56, "label", 25);
            i0.ɵɵtext(57);
            i0.ɵɵpipe(58, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "select", 26);
            i0.ɵɵrepeaterCreate(60, SignupPage_For_61_Template, 3, 4, "option", 27, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "div", 13)(63, "label", 28);
            i0.ɵɵtext(64);
            i0.ɵɵpipe(65, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(66, "input", 29);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(67, SignupPage_Conditional_67_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 13)(69, "label", 30);
            i0.ɵɵtext(70);
            i0.ɵɵpipe(71, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div", 31);
            i0.ɵɵelement(73, "input", 32);
            i0.ɵɵpipe(74, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(75, "button", 33);
            i0.ɵɵpipe(76, "translate");
            i0.ɵɵlistener("click", function SignupPage_Template_button_click_75_listener() { return ctx.togglePasswordVisibility(); });
            i0.ɵɵelement(77, "i", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(78, SignupPage_Conditional_78_Template, 3, 3, "p", 16);
            i0.ɵɵconditionalCreate(79, SignupPage_Conditional_79_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 13)(81, "label", 35);
            i0.ɵɵtext(82);
            i0.ɵɵpipe(83, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "div", 31);
            i0.ɵɵelement(85, "input", 36);
            i0.ɵɵpipe(86, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(87, "button", 33);
            i0.ɵɵpipe(88, "translate");
            i0.ɵɵlistener("click", function SignupPage_Template_button_click_87_listener() { return ctx.toggleConfirmPasswordVisibility(); });
            i0.ɵɵelement(89, "i", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(90, SignupPage_Conditional_90_Template, 3, 3, "p", 16);
            i0.ɵɵconditionalCreate(91, SignupPage_Conditional_91_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "div", 13)(93, "div", 37);
            i0.ɵɵelement(94, "input", 38);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(95, "label", 39);
            i0.ɵɵtext(96);
            i0.ɵɵpipe(97, "translate");
            i0.ɵɵelementStart(98, "a", 40);
            i0.ɵɵtext(99);
            i0.ɵɵpipe(100, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(101, SignupPage_Conditional_101_Template, 3, 3, "p", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "div", 13)(103, "button", 41);
            i0.ɵɵconditionalCreate(104, SignupPage_Conditional_104_Template, 4, 3)(105, SignupPage_Conditional_105_Template, 2, 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(106, "div", 42)(107, "span", 43);
            i0.ɵɵtext(108);
            i0.ɵɵpipe(109, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "a", 44);
            i0.ɵɵtext(111);
            i0.ɵɵpipe(112, "translate");
            i0.ɵɵelementEnd()()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("src", ctx.logo, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 75, "createAccount"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.errorMessage ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.signupForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 77, "firstName"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-red-500", ctx.signupForm.get("firstName")?.touched && ctx.signupForm.get("firstName")?.invalid);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(20, 79, "firstNamePlaceholder"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.signupForm.get("firstName")?.touched && ctx.signupForm.get("firstName")?.hasError("required") ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("firstName")?.touched && ctx.signupForm.get("firstName")?.hasError("minlength") ? 22 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 81, "lastName"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-red-500", ctx.signupForm.get("lastName")?.touched && ctx.signupForm.get("lastName")?.invalid);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(28, 83, "lastNamePlaceholder"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.signupForm.get("lastName")?.touched && ctx.signupForm.get("lastName")?.hasError("required") ? 29 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("lastName")?.touched && ctx.signupForm.get("lastName")?.hasError("minlength") ? 30 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 85, "mobile"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-red-500", ctx.signupForm.get("mobile")?.touched && ctx.signupForm.get("mobile")?.invalid);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(36, 87, "mobilePlaceholder"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.signupForm.get("mobile")?.touched && ctx.signupForm.get("mobile")?.hasError("required") ? 37 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("mobile")?.touched && ctx.signupForm.get("mobile")?.hasError("pattern") ? 38 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(42, 89, "email"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-red-500", ctx.signupForm.get("email")?.touched && ctx.signupForm.get("email")?.invalid);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(44, 91, "emailPlaceholder"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.signupForm.get("email")?.touched && ctx.signupForm.get("email")?.hasError("required") ? 45 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("email")?.touched && ctx.signupForm.get("email")?.hasError("email") ? 46 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(50, 93, "dateOfBirth"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("max", ctx.maxBirthDate)("placeholder", i0.ɵɵpipeBind1(52, 95, "dateOfBirth"))("ariaLabel", i0.ɵɵpipeBind1(53, 97, "dateOfBirth"))("inputClass", ctx.signupForm.controls.dateOfBirth.touched && ctx.signupForm.controls.dateOfBirth.invalid ? "h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary focus:ring-0 dark:border-gray-800   border-red-500" : "h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary focus:ring-0 dark:border-gray-800  ");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.signupForm.controls.dateOfBirth.touched && ctx.signupForm.controls.dateOfBirth.invalid ? 54 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 99, "gender"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.genders);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(65, 101, "passportNumber"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("border-red-500", ctx.signupForm.controls.passportNumber.touched && ctx.signupForm.controls.passportNumber.invalid);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.controls.passportNumber.touched && ctx.signupForm.controls.passportNumber.hasError("required") ? 67 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(71, 103, "password"));
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("border-red-500", ctx.signupForm.get("password")?.touched && ctx.signupForm.get("password")?.invalid);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(74, 105, "password"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(76, 107, ctx.showPassword ? "hidePassword" : "showPassword"))("aria-pressed", ctx.showPassword);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showPassword)("mdi-eye-outline", !ctx.showPassword);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("password")?.touched && ctx.signupForm.get("password")?.hasError("required") ? 78 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("password")?.touched && ctx.signupForm.get("password")?.hasError("minlength") ? 79 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(83, 109, "confirmPassword"));
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("border-red-500", ctx.signupForm.get("confirmPassword")?.touched && ctx.signupForm.get("confirmPassword")?.invalid);
            i0.ɵɵproperty("type", ctx.showConfirmPassword ? "text" : "password")("placeholder", i0.ɵɵpipeBind1(86, 111, "confirmPassword"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(88, 113, ctx.showConfirmPassword ? "hideConfirmPassword" : "showConfirmPassword"))("aria-pressed", ctx.showConfirmPassword);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showConfirmPassword)("mdi-eye-outline", !ctx.showConfirmPassword);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("confirmPassword")?.touched && ctx.signupForm.get("confirmPassword")?.hasError("required") ? 90 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.signupForm.get("confirmPassword")?.touched && ctx.signupForm.get("confirmPassword")?.hasError("mismatch") ? 91 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(97, 115, "acceptTerms"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(100, 117, "terms"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.signupForm.get("acceptTerms")?.touched && ctx.signupForm.get("acceptTerms")?.hasError("required") ? 101 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.signupForm.invalid || ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isSubmitting ? 104 : 105);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(109, 119, "alreadyHave"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(112, 121, "signin"));
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SignupPage, [{
        type: Component,
        args: [{ selector: 'app-signup-page', imports: [ReactiveFormsModule, RouterLink, TranslatePipe, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen py-12 flex items-center relative overflow-hidden zoom-image\">\r\n    <div class=\"absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover\"\r\n        [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n    <div class=\"absolute inset-0 bg-gradient-to-b from-transparent to-black z-2\" id=\"particles-snow\"></div>\r\n    <div class=\"container relative z-3\">\r\n        <div class=\"flex justify-center\">\r\n            <div\r\n                class=\"max-w-[900px] w-full m-auto p-6 bg-white  shadow-md dark:shadow-gray-700 rounded-md\">\r\n                <a routerLink=\"/\"><img [src]=\"logo\" class=\"mx-auto custom-logo-h\" alt=\"\"></a>\r\n                <h5 class=\"my-2 text-xl font-semibold\">{{ 'createAccount' | translate }}</h5>\r\n                @if (errorMessage) { <div\r\n                    class=\"mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{\r\n                    errorMessage | translate }}</div> }\r\n                @if (successMessage) { <div\r\n                    class=\"mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">\r\n                    {{ successMessage | translate }}</div> }\r\n\r\n                <form class=\"text-start\" [formGroup]=\"signupForm\" (ngSubmit)=\"onSubmit()\">\r\n                    <div class=\"grid  lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1  gap-2\">\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"firstName\">{{ 'firstName' | translate }}</label>\r\n                            <input id=\"firstName\" type=\"text\" formControlName=\"firstName\"\r\n                                class=\"mt-3 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\"\r\n                                [class.border-red-500]=\"signupForm.get('firstName')?.touched && signupForm.get('firstName')?.invalid\"\r\n                                [placeholder]=\"'firstNamePlaceholder' | translate\">\r\n                            @if (signupForm.get('firstName')?.touched &&\r\n                            signupForm.get('firstName')?.hasError('required')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'firstNameRequired' | translate }}</p>\r\n                            }\r\n                            @if (signupForm.get('firstName')?.touched &&\r\n                            signupForm.get('firstName')?.hasError('minlength')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'firstNameMin' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"lastName\">{{ 'lastName' | translate }}</label>\r\n                            <input id=\"lastName\" type=\"text\" formControlName=\"lastName\"\r\n                                class=\"mt-3 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\"\r\n                                [class.border-red-500]=\"signupForm.get('lastName')?.touched && signupForm.get('lastName')?.invalid\"\r\n                                [placeholder]=\"'lastNamePlaceholder' | translate\">\r\n                            @if (signupForm.get('lastName')?.touched &&\r\n                            signupForm.get('lastName')?.hasError('required')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'lastNameRequired' | translate }}</p>\r\n                            }\r\n                            @if (signupForm.get('lastName')?.touched &&\r\n                            signupForm.get('lastName')?.hasError('minlength')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'lastNameMin' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n\r\n\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"mobile\">{{ 'mobile' | translate }}</label>\r\n                            <input id=\"mobile\" type=\"tel\" formControlName=\"mobile\"\r\n                                class=\"mt-3 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\"\r\n                                [class.border-red-500]=\"signupForm.get('mobile')?.touched && signupForm.get('mobile')?.invalid\"\r\n                                [placeholder]=\"'mobilePlaceholder' | translate\">\r\n                            @if (signupForm.get('mobile')?.touched && signupForm.get('mobile')?.hasError('required')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'mobileRequired' | translate }}</p>\r\n                            }\r\n                            @if (signupForm.get('mobile')?.touched && signupForm.get('mobile')?.hasError('pattern')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'mobileInvalid' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"email\">{{ 'email' | translate }}</label>\r\n                            <input id=\"email\" type=\"email\" formControlName=\"email\"\r\n                                class=\"mt-3 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\"\r\n                                [class.border-red-500]=\"signupForm.get('email')?.touched && signupForm.get('email')?.invalid\"\r\n                                [placeholder]=\"'emailPlaceholder' | translate\">\r\n                            @if (signupForm.get('email')?.touched && signupForm.get('email')?.hasError('required')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'emailRequired' | translate }}</p>\r\n                            }\r\n                            @if (signupForm.get('email')?.touched && signupForm.get('email')?.hasError('email')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'emailInvalid' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"dateOfBirth\">{{ 'dateOfBirth' | translate }}</label>\r\n                            <app-date-picker\r\n                                id=\"dateOfBirth\"\r\n                                formControlName=\"dateOfBirth\"\r\n                                [max]=\"maxBirthDate\"\r\n                                [placeholder]=\"'dateOfBirth' | translate\"\r\n                                [ariaLabel]=\"'dateOfBirth' | translate\"\r\n                                class=\"mt-3 block\"\r\n                                [inputClass]=\"signupForm.controls.dateOfBirth.touched && signupForm.controls.dateOfBirth.invalid\r\n                                    ? 'h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary focus:ring-0 dark:border-gray-800   border-red-500'\r\n                                    : 'h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary focus:ring-0 dark:border-gray-800  '\" />\r\n                            @if (signupForm.controls.dateOfBirth.touched && signupForm.controls.dateOfBirth.invalid) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'dateOfBirthRequired' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"gender\">{{ 'gender' | translate }}</label>\r\n                            <select id=\"gender\" formControlName=\"gender\"\r\n                                class=\"mt-3 w-full py-2 px-3 h-10 bg-white   rounded outline-none border border-gray-100 dark:border-gray-800 focus:border-primary focus:ring-0\">\r\n                                @for (gender of genders; track gender.value) {\r\n                                <option [ngValue]=\"gender.value\">{{ gender.label | translate }}</option>\r\n                                }\r\n                            </select>\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\n                            <label class=\"font-semibold\" for=\"passportNumber\">{{ 'passportNumber' | translate }}</label>\n                            <input id=\"passportNumber\" type=\"text\" formControlName=\"passportNumber\"\n                                class=\"mt-3 w-full py-2 px-3 h-10 uppercase bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:border-primary focus:ring-0\"\n                                [class.border-red-500]=\"signupForm.controls.passportNumber.touched && signupForm.controls.passportNumber.invalid\">\n                            @if (signupForm.controls.passportNumber.touched && signupForm.controls.passportNumber.hasError('required')) {\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'passportNumberRequired' | translate }}</p>\n                            }\n                        </div>\n\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"password\">{{ 'password' | translate }}</label>\r\n                            <div class=\"relative mt-3\">\r\n                                <input id=\"password\" [type]=\"showPassword ? 'text' : 'password'\"\r\n                                    formControlName=\"password\"\r\n                                    class=\"w-full h-10 rounded border border-gray-100 bg-transparent py-2 ps-3 pe-11 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-800  \"\r\n                                    [class.border-red-500]=\"signupForm.get('password')?.touched && signupForm.get('password')?.invalid\"\r\n                                    [placeholder]=\"'password' | translate\">\r\n                                <button type=\"button\" (click)=\"togglePasswordVisibility()\"\r\n                                    class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\"\r\n                                    [attr.aria-label]=\"(showPassword ? 'hidePassword' : 'showPassword') | translate\"\r\n                                    [attr.aria-pressed]=\"showPassword\">\r\n                                    <i class=\"mdi text-xl\" [class.mdi-eye-off-outline]=\"showPassword\"\r\n                                        [class.mdi-eye-outline]=\"!showPassword\" aria-hidden=\"true\"></i>\r\n                                </button>\r\n                            </div>\r\n                            @if (signupForm.get('password')?.touched &&\r\n                            signupForm.get('password')?.hasError('required')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'passwordRequired' | translate }}</p>\r\n                            }\r\n                            @if (signupForm.get('password')?.touched &&\r\n                            signupForm.get('password')?.hasError('minlength')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'passwordMin' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\r\n                            <label class=\"font-semibold\" for=\"confirmPassword\">{{ 'confirmPassword' | translate\r\n                                }}</label>\r\n                            <div class=\"relative mt-3\">\r\n                                <input id=\"confirmPassword\" [type]=\"showConfirmPassword ? 'text' : 'password'\"\r\n                                    formControlName=\"confirmPassword\"\r\n                                    class=\"w-full h-10 rounded border border-gray-100 bg-transparent py-2 ps-3 pe-11 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-800  \"\r\n                                    [class.border-red-500]=\"signupForm.get('confirmPassword')?.touched && signupForm.get('confirmPassword')?.invalid\"\r\n                                    [placeholder]=\"'confirmPassword' | translate\">\r\n                                <button type=\"button\" (click)=\"toggleConfirmPasswordVisibility()\"\r\n                                    class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\"\r\n                                    [attr.aria-label]=\"(showConfirmPassword ? 'hideConfirmPassword' : 'showConfirmPassword') | translate\"\r\n                                    [attr.aria-pressed]=\"showConfirmPassword\">\r\n                                    <i class=\"mdi text-xl\" [class.mdi-eye-off-outline]=\"showConfirmPassword\"\r\n                                        [class.mdi-eye-outline]=\"!showConfirmPassword\" aria-hidden=\"true\"></i>\r\n                                </button>\r\n                            </div>\r\n                            @if (signupForm.get('confirmPassword')?.touched &&\r\n                            signupForm.get('confirmPassword')?.hasError('required')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'confirmRequired' | translate }}</p>\r\n                            }\r\n                            @if (signupForm.get('confirmPassword')?.touched &&\r\n                            signupForm.get('confirmPassword')?.hasError('mismatch')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'confirmMismatch' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\r\n                            <div class=\"flex items-center w-full mb-0\">\r\n                                <input formControlName=\"acceptTerms\" type=\"checkbox\" id=\"AcceptTC\" \r\n                                class=\"size-4 rounded border  text-primary focus:shadow-primary/50 focus:ring-0 \">\r\n                                <label class=\"form-check-label text-slate-400\" for=\"AcceptTC\">{{ 'acceptTerms' |\r\n                                    translate }} <a href=\"javascript:void(0)\" class=\"text-primary\">{{ 'terms' |\r\n                                        translate }}</a></label>\r\n                            </div>\r\n                            @if (signupForm.get('acceptTerms')?.touched &&\r\n                            signupForm.get('acceptTerms')?.hasError('required')) {\r\n                            <p class=\"mt-1 text-sm text-red-600\">{{ 'acceptTerms' | translate }}</p>\r\n                            }\r\n                        </div>\r\n\r\n                        <div class=\"mb-1\">\r\n                            <button type=\"submit\"\r\n                                class=\"inline-flex w-full items-center justify-center gap-2 rounded-md border border-primary bg-primary px-5 py-2 text-center text-base font-semibold text-white duration-500 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60\"\r\n                                [disabled]=\"signupForm.invalid || isSubmitting\">\r\n                                @if (isSubmitting) {\r\n                                <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i>\r\n                                <span>{{ 'submitting' | translate }}</span>\r\n                                } @else {\r\n                                {{ 'createAccount' | translate }}\r\n                                }\r\n                            </button>\r\n                        </div>\r\n\r\n                        <div class=\"text-center\">\r\n                            <span class=\"text-slate-400 me-2\">{{ 'alreadyHave' | translate }}</span> <a\r\n                                routerLink=\"/login\" class=\"text-black  font-bold inline-block\">{{\r\n                                'signin' | translate }}</a>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!-- <app-switcher-one [switcherBack]=\"false\" /> -->\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SignupPage, { className: "SignupPage", filePath: "app/features/user/auth-pages/signup-page/signup-page.ts", lineNumber: 29 }); })();
