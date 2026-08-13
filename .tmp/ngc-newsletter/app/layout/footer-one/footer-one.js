import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/apiservice.service";
import * as i2 from "@angular/forms";
function FooterOne_Conditional_85_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "newsletterEmailRequired"), " ");
} }
function FooterOne_Conditional_85_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "newsletterEmailInvalid"), " ");
} }
function FooterOne_Conditional_85_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "newsletterEmailTooLong"), " ");
} }
function FooterOne_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵconditionalCreate(1, FooterOne_Conditional_85_Conditional_1_Template, 2, 3)(2, FooterOne_Conditional_85_Conditional_2_Template, 2, 3)(3, FooterOne_Conditional_85_Conditional_3_Template, 2, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.emailControl.hasError("required") ? 1 : ctx_r0.emailControl.hasError("email") ? 2 : ctx_r0.emailControl.hasError("maxlength") ? 3 : -1);
} }
function FooterOne_Conditional_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 45);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("text-green-700", ctx_r0.newsletterMessageKind === "success")("text-red-600", ctx_r0.newsletterMessageKind === "error");
    i0.ɵɵattribute("role", ctx_r0.newsletterMessageKind === "error" ? "alert" : "status");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 6, ctx_r0.newsletterMessage), " ");
} }
export class FooterOne {
    apiService;
    changeDetectorRef;
    logo = 'assets/images/main-logo.png';
    year = new Date().getFullYear();
    isSubmitting = false;
    newsletterMessage = null;
    newsletterMessageKind = null;
    newsletterForm = new FormGroup({
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email, Validators.maxLength(254)],
        }),
    });
    constructor(apiService, changeDetectorRef) {
        this.apiService = apiService;
        this.changeDetectorRef = changeDetectorRef;
    }
    get emailControl() {
        return this.newsletterForm.controls.email;
    }
    ngAfterViewInit() {
        feather.replace();
    }
    subscribeToNewsletter() {
        if (this.isSubmitting) {
            return;
        }
        const email = this.emailControl.value.trim();
        this.emailControl.setValue(email);
        this.newsletterMessage = null;
        this.newsletterMessageKind = null;
        if (this.newsletterForm.invalid) {
            this.newsletterForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        this.apiService
            .postUnauthenticated('NewsletterSubscriptions/Subscribe', { email })
            .pipe(finalize(() => {
            this.isSubmitting = false;
            this.changeDetectorRef.markForCheck();
        }))
            .subscribe({
            next: (response) => {
                if (!response?.isSuccess || !response.data) {
                    this.showNewsletterError();
                    return;
                }
                this.newsletterMessageKind = 'success';
                if (response.data.isNewSubscription) {
                    this.newsletterMessage = 'newsletterSubscribedSuccess';
                    this.newsletterForm.reset();
                }
                else {
                    this.newsletterMessage = 'newsletterAlreadySubscribed';
                }
            },
            error: () => this.showNewsletterError(),
        });
    }
    showNewsletterError() {
        this.newsletterMessageKind = 'error';
        this.newsletterMessage = 'newsletterSubscribeError';
    }
    static ɵfac = function FooterOne_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || FooterOne)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FooterOne, selectors: [["app-footer-one"]], decls: 99, vars: 70, consts: [[1, "footer", "relative", "border-t", "border-slate-200", "bg-white", "text-slate-600", "dark:border-slate-800"], [1, "container", "relative"], [1, "grid", "grid-cols-1", "gap-8", "px-0", "py-[60px]", "md:grid-cols-2", "lg:grid-cols-4"], [1, "mt-6", "leading-7", "text-slate-500"], [1, "mt-6", "flex", "gap-2"], ["href", "mailto:Info@seaworldholidays.com", "target", "_blank", "rel", "noopener noreferrer", 1, "inline-flex", "size-10", "items-center", "justify-center", "rounded-xl", "bg-[#ea4335]", "text-white", "shadow-sm", "transition-all", "duration-200", "hover:-translate-y-1", "hover:shadow-lg"], ["aria-hidden", "true", 1, "mdi", "mdi-email", "text-xl"], ["href", "tel:+201155011300", 1, "inline-flex", "size-10", "items-center", "justify-center", "rounded-xl", "bg-primary", "text-white", "shadow-sm", "transition-all", "duration-200", "hover:-translate-y-1", "hover:shadow-lg"], ["aria-hidden", "true", 1, "mdi", "mdi-phone", "text-xl"], ["href", "https://wa.me/201155011300", "target", "_blank", "rel", "noopener noreferrer", 1, "inline-flex", "size-10", "items-center", "justify-center", "rounded-xl", "bg-[#25d366]", "text-white", "shadow-sm", "transition-all", "duration-200", "hover:-translate-y-1", "hover:bg-[#1ebe5d]", "hover:shadow-lg"], ["aria-hidden", "true", 1, "mdi", "mdi-whatsapp", "text-2xl"], ["href", "https://www.instagram.com/seaworldholidays1/", "target", "_blank", "rel", "noopener noreferrer", 1, "inline-flex", "size-10", "items-center", "justify-center", "rounded-xl", "bg-gradient-to-br", "from-[#833ab4]", "via-[#fd1d1d]", "to-[#fcb045]", "text-white", "shadow-sm", "transition-all", "duration-200", "hover:-translate-y-1", "hover:shadow-lg"], ["aria-hidden", "true", 1, "mdi", "mdi-instagram", "text-2xl"], ["href", "https://www.facebook.com/seaworldholidays1/", "target", "_blank", "rel", "noopener noreferrer", 1, "inline-flex", "size-10", "items-center", "justify-center", "rounded-xl", "bg-[#1877f2]", "text-white", "shadow-sm", "transition-all", "duration-200", "hover:-translate-y-1", "hover:bg-[#0f6adf]", "hover:shadow-lg"], ["aria-hidden", "true", 1, "mdi", "mdi-facebook", "text-2xl"], [1, "font-semibold", "tracking-[1px]", "text-slate-400"], [1, "mt-6", "font-semibold", "text-slate-400"], [1, "mt-4", "flex", "items-start"], ["data-feather", "map-pin", "aria-hidden", "true", 1, "me-2", "mt-1", "size-4", "shrink-0", "text-primary"], [1, "leading-7", "text-slate-500"], [1, "mt-4", "flex", "items-center"], ["data-feather", "mail", "aria-hidden", "true", 1, "me-2", "size-4", "shrink-0", "text-primary"], ["href", "mailto:Info@seaworldholidays.com", 1, "transition", "hover:text-primary"], ["data-feather", "phone", "aria-hidden", "true", 1, "me-2", "size-4", "shrink-0", "text-primary"], ["href", "tel:+201155011300", "dir", "ltr", 1, "transition", "hover:text-primary"], [1, "footer-list", "mt-6", "space-y-3"], ["routerLink", "/aboutus", 1, "transition", "hover:text-primary"], [1, "mdi", "mdi-chevron-right", "text-primary", "rtl:rotate-180"], ["routerLink", "/destinations", 1, "transition", "hover:text-primary"], ["routerLink", "/packages", 1, "transition", "hover:text-primary"], ["routerLink", "/contact", 1, "transition", "hover:text-primary"], [1, "mt-6", "text-slate-500"], ["novalidate", "", 1, "mt-4", 3, "ngSubmit", "formGroup"], ["for", "footerNewsletterEmail", 1, "text-sm", "font-medium", "text-slate-400"], [1, "text-primary"], [1, "relative", "mt-2"], ["data-feather", "mail", "aria-hidden", "true", 1, "absolute", "start-4", "top-3", "size-4", "text-primary"], ["id", "footerNewsletterEmail", "type", "email", "formControlName", "email", "maxlength", "254", "autocomplete", "email", "inputmode", "email", "required", "", 1, "h-10", "w-full", "rounded", "border", "border-slate-200", "bg-slate", "px-3", "pe-3", "ps-12", "text-slate-400", "outline-none", "placeholder:text-slate-400", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", 3, "placeholder"], ["id", "footerNewsletterEmailError", "role", "alert", 1, "mt-2", "text-sm", "text-red-600"], ["type", "submit", 1, "mt-3", "w-full", "rounded-md", "bg-primary", "px-5", "py-2", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["aria-live", "polite", 1, "mt-3", "text-sm", 3, "text-green-700", "text-red-600"], [1, "border-t", "border-slate-200", "px-0", "py-[30px]", "dark:border-slate-800"], [1, "container", "text-center", "text-slate-500"], [1, "mt-2", "text-sm"], ["href", "tel:+201010660737", "dir", "ltr", 1, "font-medium", "transition", "hover:text-primary"], ["aria-live", "polite", 1, "mt-3", "text-sm"]], template: function FooterOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "section")(4, "p", 3);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 4)(8, "a", 5);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelement(10, "i", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "a", 7);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelement(13, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "a", 9);
            i0.ɵɵpipe(15, "translate");
            i0.ɵɵelement(16, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "a", 11);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵelement(19, "i", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "a", 13);
            i0.ɵɵpipe(21, "translate");
            i0.ɵɵelement(22, "i", 14);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(23, "section")(24, "h5", 15);
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "h6", 16);
            i0.ɵɵtext(28, "Sea World Holidays");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 17);
            i0.ɵɵelement(30, "i", 18);
            i0.ɵɵelementStart(31, "p", 19);
            i0.ɵɵtext(32);
            i0.ɵɵpipe(33, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 20);
            i0.ɵɵelement(35, "i", 21);
            i0.ɵɵelementStart(36, "a", 22);
            i0.ɵɵtext(37, "Info@seaworldholidays.com");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 20);
            i0.ɵɵelement(39, "i", 23);
            i0.ɵɵelementStart(40, "a", 24);
            i0.ɵɵtext(41, "+20 115 501 1300");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(42, "nav");
            i0.ɵɵpipe(43, "translate");
            i0.ɵɵelementStart(44, "h5", 15);
            i0.ɵɵtext(45);
            i0.ɵɵpipe(46, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "ul", 25)(48, "li")(49, "a", 26);
            i0.ɵɵelement(50, "i", 27);
            i0.ɵɵtext(51);
            i0.ɵɵpipe(52, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "li")(54, "a", 28);
            i0.ɵɵelement(55, "i", 27);
            i0.ɵɵtext(56);
            i0.ɵɵpipe(57, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "li")(59, "a", 29);
            i0.ɵɵelement(60, "i", 27);
            i0.ɵɵtext(61);
            i0.ɵɵpipe(62, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "li")(64, "a", 30);
            i0.ɵɵelement(65, "i", 27);
            i0.ɵɵtext(66);
            i0.ɵɵpipe(67, "translate");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(68, "section")(69, "h5", 15);
            i0.ɵɵtext(70);
            i0.ɵɵpipe(71, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "p", 31);
            i0.ɵɵtext(73);
            i0.ɵɵpipe(74, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "form", 32);
            i0.ɵɵlistener("ngSubmit", function FooterOne_Template_form_ngSubmit_75_listener() { return ctx.subscribeToNewsletter(); });
            i0.ɵɵelementStart(76, "label", 33);
            i0.ɵɵtext(77);
            i0.ɵɵpipe(78, "translate");
            i0.ɵɵelementStart(79, "span", 34);
            i0.ɵɵtext(80, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(81, "div", 35);
            i0.ɵɵelement(82, "i", 36)(83, "input", 37);
            i0.ɵɵpipe(84, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(85, FooterOne_Conditional_85_Template, 4, 1, "p", 38);
            i0.ɵɵelementStart(86, "button", 39);
            i0.ɵɵtext(87);
            i0.ɵɵpipe(88, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(89, FooterOne_Conditional_89_Template, 3, 8, "p", 40);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(90, "div", 41)(91, "div", 42)(92, "p");
            i0.ɵɵtext(93);
            i0.ɵɵpipe(94, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(95, "p", 43);
            i0.ɵɵtext(96, " Powered by El Wakel: ");
            i0.ɵɵelementStart(97, "a", 44);
            i0.ɵɵtext(98, "+20 101 066 0737");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 30, "footerTravelDescription"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(9, 32, "emailseaworldHolidays"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(12, 34, "callseaworldHolidays"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(15, 36, "whatsappseaworldHolidays"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(18, 38, "instagramseaworldHolidays"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(21, 40, "facebookseaworldHolidays"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 42, "office"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(33, 44, "officeAddress"));
            i0.ɵɵadvance(10);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(43, 46, "footerCompanyLinks"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(46, 48, "company"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(52, 50, "aboutUs"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(57, 52, "destinations"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(62, 54, "packages"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(67, 56, "contactUs"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(71, 58, "newsletter"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(74, 60, "newsletterDescription"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.newsletterForm);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(78, 62, "writeYourEmail"), " ");
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("border-red-500", ctx.emailControl.invalid && ctx.emailControl.touched);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(84, 64, "writeYourEmail"));
            i0.ɵɵattribute("aria-invalid", ctx.emailControl.invalid && ctx.emailControl.touched)("aria-describedby", ctx.emailControl.invalid && ctx.emailControl.touched ? "footerNewsletterEmailError" : null);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.emailControl.invalid && ctx.emailControl.touched ? 85 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isSubmitting);
            i0.ɵɵattribute("aria-busy", ctx.isSubmitting);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(88, 66, ctx.isSubmitting ? "subscribing" : "subscribe"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.newsletterMessage ? 89 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2("\u00A9 ", ctx.year, " Sea World Holidays. ", i0.ɵɵpipeBind1(94, 68, "allRightsReserved"));
        } }, dependencies: [ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.MaxLengthValidator, i2.FormGroupDirective, i2.FormControlName, RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FooterOne, [{
        type: Component,
        args: [{ selector: 'app-footer-one', imports: [ReactiveFormsModule, RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<footer\r\n  class=\"footer relative border-t border-slate-200 bg-white text-slate-600 dark:border-slate-800  \">\r\n  <div class=\"container relative\">\r\n    <div class=\"grid grid-cols-1 gap-8 px-0 py-[60px] md:grid-cols-2 lg:grid-cols-4\">\r\n      <section>\r\n\r\n        <p class=\"mt-6 leading-7 text-slate-500 \">{{ 'footerTravelDescription' | translate }}</p>\r\n        <div class=\"mt-6 flex gap-2\">\r\n          <a href=\"mailto:Info@seaworldholidays.com\" target=\"_blank\" rel=\"noopener noreferrer\"\n            class=\"inline-flex size-10 items-center justify-center rounded-xl bg-[#ea4335] text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg\"\n            [attr.aria-label]=\"'emailseaworldHolidays' | translate\">\n            <i class=\"mdi mdi-email text-xl\" aria-hidden=\"true\"></i>\n          </a>\n\n          <a href=\"tel:+201155011300\"\n            class=\"inline-flex size-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg\"\n            [attr.aria-label]=\"'callseaworldHolidays' | translate\">\n            <i class=\"mdi mdi-phone text-xl\" aria-hidden=\"true\"></i>\n          </a>\n\n          <a href=\"https://wa.me/201155011300\" target=\"_blank\" rel=\"noopener noreferrer\"\n            class=\"inline-flex size-10 items-center justify-center rounded-xl bg-[#25d366] text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-lg\"\n            [attr.aria-label]=\"'whatsappseaworldHolidays' | translate\">\n            <i class=\"mdi mdi-whatsapp text-2xl\" aria-hidden=\"true\"></i>\n          </a>\n\n          <a href=\"https://www.instagram.com/seaworldholidays1/\" target=\"_blank\" rel=\"noopener noreferrer\"\n            class=\"inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg\"\n            [attr.aria-label]=\"'instagramseaworldHolidays' | translate\">\n            <i class=\"mdi mdi-instagram text-2xl\" aria-hidden=\"true\"></i>\n          </a>\n\n          <a href=\"https://www.facebook.com/seaworldholidays1/\" target=\"_blank\" rel=\"noopener noreferrer\"\n            class=\"inline-flex size-10 items-center justify-center rounded-xl bg-[#1877f2] text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#0f6adf] hover:shadow-lg\"\n            [attr.aria-label]=\"'facebookseaworldHolidays' | translate\">\n            <i class=\"mdi mdi-facebook text-2xl\" aria-hidden=\"true\"></i>\n          </a>\n        </div>\r\n      </section>\r\n\r\n      <section>\r\n        <h5 class=\"font-semibold tracking-[1px] text-slate-400 \">{{ 'office' | translate }}</h5>\r\n        <h6 class=\"mt-6 font-semibold text-slate-400 \">Sea World Holidays</h6>\r\n        <div class=\"mt-4 flex items-start\">\r\n          <i data-feather=\"map-pin\" class=\"me-2 mt-1 size-4 shrink-0 text-primary\" aria-hidden=\"true\"></i>\r\n          <p class=\"leading-7 text-slate-500 \">{{ 'officeAddress' | translate }}</p>\r\n        </div>\r\n        <div class=\"mt-4 flex items-center\"><i data-feather=\"mail\" class=\"me-2 size-4 shrink-0 text-primary\"\r\n            aria-hidden=\"true\"></i><a href=\"mailto:Info@seaworldholidays.com\"\r\n            class=\"transition hover:text-primary\">Info&#64;seaworldholidays.com</a></div>\r\n        <div class=\"mt-4 flex items-center\"><i data-feather=\"phone\" class=\"me-2 size-4 shrink-0 text-primary\"\r\n            aria-hidden=\"true\"></i><a href=\"tel:+201155011300\" class=\"transition hover:text-primary\" dir=\"ltr\">+20 115\r\n            501 1300</a></div>\r\n      </section>\r\n\r\n      <nav [attr.aria-label]=\"'footerCompanyLinks' | translate\">\r\n        <h5 class=\"font-semibold tracking-[1px] text-slate-400 \">{{ 'company' | translate }}</h5>\r\n        <ul class=\"footer-list mt-6 space-y-3\">\r\n          <li><a routerLink=\"/aboutus\" class=\"transition hover:text-primary\"><i\r\n                class=\"mdi mdi-chevron-right text-primary rtl:rotate-180\"></i> {{ 'aboutUs' | translate }}</a></li>\r\n          <li><a routerLink=\"/destinations\" class=\"transition hover:text-primary\"><i\r\n                class=\"mdi mdi-chevron-right text-primary rtl:rotate-180\"></i> {{ 'destinations' | translate }}</a></li>\r\n          <li><a routerLink=\"/packages\" class=\"transition hover:text-primary\"><i\r\n                class=\"mdi mdi-chevron-right text-primary rtl:rotate-180\"></i> {{ 'packages' | translate }}</a></li>\r\n          <li><a routerLink=\"/contact\" class=\"transition hover:text-primary\"><i\r\n                class=\"mdi mdi-chevron-right text-primary rtl:rotate-180\"></i> {{ 'contactUs' | translate }}</a></li>\r\n        </ul>\r\n      </nav>\r\n\r\n      <section>\r\n        <h5 class=\"font-semibold tracking-[1px] text-slate-400 \">{{ 'newsletter' | translate }}</h5>\r\n        <p class=\"mt-6 text-slate-500 \">{{ 'newsletterDescription' | translate }}</p>\r\n        <form class=\"mt-4\" [formGroup]=\"newsletterForm\" (ngSubmit)=\"subscribeToNewsletter()\" novalidate>\n          <label for=\"footerNewsletterEmail\" class=\"text-sm font-medium text-slate-400 \">{{\n            'writeYourEmail' | translate }} <span class=\"text-primary\">*</span></label>\n          <div class=\"relative mt-2\"><i data-feather=\"mail\" class=\"absolute start-4 top-3 size-4 text-primary\"\n              aria-hidden=\"true\"></i><input id=\"footerNewsletterEmail\" type=\"email\"\n              class=\"h-10 w-full rounded border border-slate-200 bg-slate px-3 pe-3 ps-12 text-slate-400 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20  \"\n              [class.border-red-500]=\"emailControl.invalid && emailControl.touched\"\n              [placeholder]=\"'writeYourEmail' | translate\" formControlName=\"email\" maxlength=\"254\"\n              autocomplete=\"email\" inputmode=\"email\" required\n              [attr.aria-invalid]=\"emailControl.invalid && emailControl.touched\"\n              [attr.aria-describedby]=\"emailControl.invalid && emailControl.touched ? 'footerNewsletterEmailError' : null\"></div>\n\n          @if (emailControl.invalid && emailControl.touched) {\n            <p id=\"footerNewsletterEmailError\" class=\"mt-2 text-sm text-red-600\" role=\"alert\">\n              @if (emailControl.hasError('required')) {\n                {{ 'newsletterEmailRequired' | translate }}\n              } @else if (emailControl.hasError('email')) {\n                {{ 'newsletterEmailInvalid' | translate }}\n              } @else if (emailControl.hasError('maxlength')) {\n                {{ 'newsletterEmailTooLong' | translate }}\n              }\n            </p>\n          }\n\n          <button type=\"submit\" class=\"mt-3 w-full rounded-md bg-primary px-5 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\"\n            [disabled]=\"isSubmitting\" [attr.aria-busy]=\"isSubmitting\">\n            {{ (isSubmitting ? 'subscribing' : 'subscribe') | translate }}\n          </button>\n\n          @if (newsletterMessage) {\n            <p class=\"mt-3 text-sm\" [class.text-green-700]=\"newsletterMessageKind === 'success'\"\n              [class.text-red-600]=\"newsletterMessageKind === 'error'\"\n              [attr.role]=\"newsletterMessageKind === 'error' ? 'alert' : 'status'\" aria-live=\"polite\">\n              {{ newsletterMessage | translate }}\n            </p>\n          }\n        </form>\n      </section>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"border-t border-slate-200 px-0 py-[30px] dark:border-slate-800\">\n    <div class=\"container text-center text-slate-500 \">\n      <p>&copy; {{ year }} Sea World Holidays. {{ 'allRightsReserved' | translate }}</p>\n      <p class=\"mt-2 text-sm\">\n        Powered by El Wakel:\n        <a href=\"tel:+201010660737\" class=\"font-medium transition hover:text-primary\" dir=\"ltr\">+20 101 066 0737</a>\n      </p>\n    </div>\n  </div>\n</footer>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FooterOne, { className: "FooterOne", filePath: "app/layout/footer-one/footer-one.ts", lineNumber: 27 }); })();
