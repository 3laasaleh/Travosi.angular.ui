import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../../core/services/currency.service';
import { AuthService } from '../../../../user/_services/auth.service';
import { DatePicker } from '../../../../../shared/components/date-picker/date-picker';
import { formatHomePrice } from '../../../home-price.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = (a0, a1) => ({ from: a0, to: a1 });
function TourBookingCard_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelementStart(2, "div", 29)(3, "span", 30);
    i0.ɵɵelement(4, "span", 31)(5, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 33);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 34);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 3, "creatingBooking"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 5, "creatingBooking"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 7, "pleaseWaitForRequest"));
} }
function TourBookingCard_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "span", 35);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 36);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "pricePerChild"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.formattedPricePerChild);
} }
function TourBookingCard_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "p", 37);
    i0.ɵɵelement(2, "i", 38);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 39);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 2, "availableBookingDates"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(7, 4, "availableBookingDateRange", i0.ɵɵpureFunction2(7, _c0, ctx_r0.availableDateFrom, ctx_r0.availableDateTo)), " ");
} }
function TourBookingCard_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "dateFromRequired"));
} }
function TourBookingCard_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "dateToRequired"));
} }
function TourBookingCard_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "bookingDateRangeInvalid"));
} }
function TourBookingCard_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "atLeastOneAdult"));
} }
function TourBookingCard_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "travelersWholeNumber"));
} }
function TourBookingCard_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "childrenCannotBeNegative"));
} }
function TourBookingCard_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "travelersWholeNumber"));
} }
function TourBookingCard_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "specialRequestsMaxLength"));
} }
function TourBookingCard_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 40);
    i0.ɵɵelement(1, "i", 41);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("text-slate-400", ctx_r0.guests <= ctx_r0.seatsAvailable)("text-red-500", ctx_r0.guests > ctx_r0.seatsAvailable);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.seatsAvailable, " ", i0.ɵɵpipeBind1(3, 6, "seatsAvailable"), " ");
} }
function TourBookingCard_Conditional_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function TourBookingCard_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function TourBookingCard_Conditional_62_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 42);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "creatingBooking"));
} }
function TourBookingCard_Conditional_62_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 43);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "bookNow"));
} }
function TourBookingCard_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵconditionalCreate(1, TourBookingCard_Conditional_62_Conditional_1_Template, 4, 3)(2, TourBookingCard_Conditional_62_Conditional_2_Template, 4, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isSubmitting || ctx_r0.product?.isActive === false);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isSubmitting ? 1 : 2);
} }
function TourBookingCard_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function TourBookingCard_Conditional_63_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goToLogin()); });
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(3, 1, "loginToBook"), " ");
} }
export class TourBookingCard {
    apiService = inject(ApiService);
    authService = inject(AuthService);
    router = inject(Router);
    cdr = inject(ChangeDetectorRef);
    translate = inject(TranslateService);
    currencyService = inject(CurrencyService);
    tour = null;
    travelPackage = null;
    get product() {
        return this.tour ?? this.travelPackage;
    }
    get isPackage() {
        return this.travelPackage != null;
    }
    isSubmitting = false;
    errorMessage = '';
    successMessage = '';
    bookingForm = new FormGroup({
        dateFrom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        dateTo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)] }),
        children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.pattern(/^\d+$/)] }),
        specialRequests: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(1000)] }),
    }, { validators: TourBookingCard.dateRangeValidator });
    get isLoggedIn() {
        return this.authService.getCurentUser() !== null && !this.authService.isTokenExpired();
    }
    get pricePerPerson() {
        return this.rawPrice(this.product?.pricePerPerson ?? this.product?.price);
    }
    get pricePerChild() {
        return this.rawPrice(this.product?.pricePerChild);
    }
    get seatsAvailable() {
        const available = Number(this.product?.seatsAvailable);
        if (Number.isFinite(available) && available >= 0)
            return available;
        return Math.max(0, Number(this.product?.maxSeats ?? this.product?.maxCapacity ?? 0) - Number(this.product?.seatsBooked ?? 0));
    }
    get hasSeatLimit() {
        return this.product?.seatsAvailable !== null && this.product?.seatsAvailable !== undefined
            || Number(this.product?.maxSeats ?? this.product?.maxCapacity ?? 0) > 0;
    }
    get guests() {
        return this.bookingForm.controls.adults.value + this.bookingForm.controls.children.value;
    }
    get totalAmount() {
        return (this.bookingForm.controls.adults.value * this.pricePerPerson +
            this.bookingForm.controls.children.value * this.pricePerChild);
    }
    get formattedPricePerPerson() {
        return formatHomePrice(this.currencyService, this.pricePerPerson, this.product);
    }
    get formattedPricePerChild() {
        return formatHomePrice(this.currencyService, this.pricePerChild, this.product);
    }
    get formattedTotalAmount() {
        return formatHomePrice(this.currencyService, this.totalAmount, this.product);
    }
    get minTravelDate() {
        const today = this.toDateInput(new Date());
        const productStart = this.toDateInput(this.product?.startDate ?? this.product?.dateFrom);
        return productStart && productStart > today ? productStart : today;
    }
    get maxTravelDate() {
        return this.toDateInput(this.product?.endDate ?? this.product?.dateTo) || null;
    }
    get minDateTo() {
        return this.bookingForm.controls.dateFrom.value || this.minTravelDate;
    }
    get hasAvailableDateRange() {
        return Boolean(this.minTravelDate && this.maxTravelDate);
    }
    get availableDateFrom() {
        return this.formatDisplayDate(this.minTravelDate);
    }
    get availableDateTo() {
        return this.formatDisplayDate(this.maxTravelDate);
    }
    goToLogin() {
        this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.url },
        });
    }
    bookNow() {
        if (this.isSubmitting)
            return;
        if (!this.isLoggedIn) {
            this.goToLogin();
            return;
        }
        if (this.bookingForm.invalid) {
            this.bookingForm.markAllAsTouched();
            return;
        }
        if (this.product?.isActive === false) {
            this.errorMessage = this.isPackage ? 'packageUnavailableForBooking' : 'tourUnavailableForBooking';
            return;
        }
        const form = this.bookingForm.getRawValue();
        if (form.dateFrom < this.minTravelDate ||
            Boolean(this.maxTravelDate && form.dateTo > this.maxTravelDate)) {
            this.errorMessage = 'bookingDateOutsideAvailability';
            this.showToast('error', this.errorMessage);
            return;
        }
        if (this.hasSeatLimit && this.guests > this.seatsAvailable) {
            this.errorMessage = 'bookingSeatsExceeded';
            return;
        }
        const productId = Number(this.product?.id ?? this.product?.tourId ?? this.product?.packageId);
        if (!Number.isInteger(productId) || productId <= 0) {
            this.errorMessage = 'bookingCreateError';
            return;
        }
        const payload = {
            NumberOfTravelers: this.guests,
            SpecialRequests: form.specialRequests.trim() || null,
            DateFrom: this.toApiDate(form.dateFrom),
            DateTo: this.toApiDate(form.dateTo),
            TourId: this.isPackage ? null : productId,
            PackageId: this.isPackage ? productId : null,
            TravelDate: this.toApiDate(form.dateFrom),
            Adults: form.adults,
            Children: form.children,
            Notes: form.specialRequests.trim() || null,
        };
        this.isSubmitting = true;
        this.errorMessage = '';
        this.successMessage = '';
        this.apiService.post('Bookings', payload).pipe(catchError((error) => {
            this.errorMessage = this.bookingErrorMessage(error?.error?.message);
            this.showToast('error', this.errorMessage);
            return of(null);
        }), finalize(() => {
            this.isSubmitting = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = this.bookingErrorMessage(response?.message);
                this.showToast('error', this.errorMessage);
                return;
            }
            this.successMessage = response?.message || 'bookingCreated';
            this.showToast('success', this.successMessage);
            this.bookingForm.reset({ dateFrom: '', dateTo: '', adults: 1, children: 0, specialRequests: '' });
        });
    }
    static dateRangeValidator(control) {
        const dateFrom = control.get('dateFrom')?.value;
        const dateTo = control.get('dateTo')?.value;
        if (!dateFrom || !dateTo)
            return null;
        return String(dateTo) >= String(dateFrom) ? null : { invalidBookingDateRange: true };
    }
    toApiDate(value) {
        return `${value}T00:00:00`;
    }
    toDateInput(value) {
        if (!value)
            return '';
        if (value instanceof Date) {
            const offset = value.getTimezoneOffset() * 60_000;
            return new Date(value.getTime() - offset).toISOString().slice(0, 10);
        }
        const match = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
        return match?.[1] ?? '';
    }
    formatDisplayDate(value) {
        if (!value)
            return '';
        const date = new Date(`${value}T00:00:00`);
        if (Number.isNaN(date.getTime()))
            return value;
        const locale = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar') ? 'ar-EG' : 'en-GB';
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    }
    bookingErrorMessage(message) {
        const value = typeof message === 'string' ? message : '';
        return /already has a booking|already have a booking|same dates/i.test(value)
            ? 'duplicateBookingDates'
            : value || 'bookingCreateError';
    }
    rawPrice(value) {
        const price = Number(value ?? 0);
        return Number.isFinite(price) ? price : 0;
    }
    showToast(icon, message) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon,
            title: this.translate.instant(message),
            showConfirmButton: false,
            timer: icon === 'success' ? 3000 : 4200,
            timerProgressBar: true,
        });
    }
    static ɵfac = function TourBookingCard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TourBookingCard)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TourBookingCard, selectors: [["app-tour-booking-card"]], inputs: { tour: "tour", travelPackage: "travelPackage" }, decls: 64, vars: 64, consts: [["role", "status", "aria-live", "assertive", 1, "fixed", "inset-0", "z-[9999]", "grid", "place-items-center", "bg-slate-950/55", "px-4", "backdrop-blur-sm"], [1, "sticky", "top-24", "rounded-2xl", "border", "border-gray-100", "bg-white", "p-6", "shadow"], [1, "flex", "items-end", "justify-between"], [1, "text-sm", "font-medium", "text-slate-400"], [1, "text-2xl", "font-semibold"], [1, "text-end"], [1, "mt-6", 3, "ngSubmit", "formGroup"], ["role", "note", 1, "mb-4", "rounded-2xl", "border", "border-primary/20", "bg-primary/5", "px-4", "py-3"], [1, "mb-4", "grid", "grid-cols-2", "gap-3"], ["for", "bookingDateFrom", 1, "text-sm", "font-semibold"], ["id", "bookingDateFrom", "formControlName", "dateFrom", 1, "mt-2", "block", 3, "min", "max", "placeholder", "ariaLabel", "inputClass"], [1, "mt-1", "text-xs", "text-red-500"], ["for", "bookingDateTo", 1, "text-sm", "font-semibold"], ["id", "bookingDateTo", "formControlName", "dateTo", 1, "mt-2", "block", 3, "min", "max", "placeholder", "ariaLabel", "inputClass"], ["for", "adults", 1, "text-sm", "font-semibold"], ["id", "adults", "type", "number", "min", "1", "step", "1", "formControlName", "adults", 1, "mt-2", "h-10", "w-full", "rounded", "border", "border-gray-100", "bg-transparent", "px-3", "py-2", "outline-none", "focus:border-primary-400", "dark:border-gray-800"], ["for", "children", 1, "text-sm", "font-semibold"], ["id", "children", "type", "number", "min", "0", "step", "1", "formControlName", "children", 1, "mt-2", "h-10", "w-full", "rounded", "border", "border-gray-100", "bg-transparent", "px-3", "py-2", "outline-none", "focus:border-primary-400", "dark:border-gray-800"], [1, "mb-4"], ["for", "specialRequests", 1, "text-sm", "font-semibold"], ["id", "specialRequests", "formControlName", "specialRequests", "rows", "3", "maxlength", "1000", 1, "mt-2", "w-full", "rounded", "border", "border-gray-100", "bg-transparent", "px-3", "py-2", "outline-none", "focus:border-primary-400", "dark:border-gray-800", 3, "placeholder"], [1, "mb-4", "text-xs", 3, "text-slate-400", "text-red-500"], [1, "mb-4", "flex", "items-center", "justify-between", "rounded-xl", "bg-slate-50", "px-4", "py-3"], [1, "text-sm", "font-semibold"], [1, "text-lg", "font-bold", "text-primary"], [1, "mb-4", "rounded-xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], ["type", "submit", 1, "inline-flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-md", "bg-primary-600", "px-5", "py-2.5", "text-center", "text-base", "text-white", "duration-500", "hover:bg-primary-600", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-primary-600", 3, "disabled"], ["type", "button", 1, "inline-flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-md", "bg-primary", "px-5", "py-2.5", "text-center", "text-base", "text-white", "duration-500", "hover:bg-primary-600"], [1, "flex", "min-w-64", "flex-col", "items-center", "rounded-3xl", "border", "border-white/15", "bg-white", "px-8", "py-7", "text-center", "shadow-2xl"], [1, "relative", "grid", "h-16", "w-16", "place-items-center"], [1, "absolute", "inset-0", "animate-spin", "rounded-full", "border-4", "border-slate-200", "border-t-primary-600"], [1, "mdi", "mdi-calendar-check-outline", "text-2xl", "text-primary"], [1, "mt-5", "font-semibold", "text-slate-800"], [1, "mt-1", "text-xs", "text-slate-500"], [1, "text-xs", "font-medium", "text-slate-400"], [1, "text-base", "font-semibold"], [1, "flex", "items-center", "gap-2", "text-xs", "font-bold", "uppercase", "tracking-[0.14em]", "text-primary"], ["aria-hidden", "true", 1, "mdi", "mdi-calendar-range", "text-lg"], [1, "mt-1.5", "text-sm", "font-semibold", "text-slate-700"], [1, "mb-4", "text-xs"], [1, "mdi", "mdi-account-group-outline", "me-1"], [1, "mdi", "mdi-loading", "mdi-spin"], [1, "mdi", "mdi-calendar-check-outline"], ["type", "button", 1, "inline-flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-md", "bg-primary", "px-5", "py-2.5", "text-center", "text-base", "text-white", "duration-500", "hover:bg-primary-600", 3, "click"], [1, "mdi", "mdi-login"]], template: function TourBookingCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, TourBookingCard_Conditional_0_Template, 12, 9, "div", 0);
            i0.ɵɵelementStart(1, "div", 1)(2, "div", 2)(3, "div")(4, "span", 3);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(9, TourBookingCard_Conditional_9_Template, 6, 4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "form", 6);
            i0.ɵɵlistener("ngSubmit", function TourBookingCard_Template_form_ngSubmit_10_listener() { return ctx.bookNow(); });
            i0.ɵɵconditionalCreate(11, TourBookingCard_Conditional_11_Template, 8, 10, "div", 7);
            i0.ɵɵelementStart(12, "div", 8)(13, "div")(14, "label", 9);
            i0.ɵɵtext(15);
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "app-date-picker", 10);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵpipe(19, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(20, TourBookingCard_Conditional_20_Template, 3, 3, "p", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div")(22, "label", 12);
            i0.ɵɵtext(23);
            i0.ɵɵpipe(24, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(25, "app-date-picker", 13);
            i0.ɵɵpipe(26, "translate");
            i0.ɵɵpipe(27, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(28, TourBookingCard_Conditional_28_Template, 3, 3, "p", 11);
            i0.ɵɵconditionalCreate(29, TourBookingCard_Conditional_29_Template, 3, 3, "p", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 8)(31, "div")(32, "label", 14);
            i0.ɵɵtext(33);
            i0.ɵɵpipe(34, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(35, "input", 15);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(36, TourBookingCard_Conditional_36_Template, 3, 3, "p", 11);
            i0.ɵɵconditionalCreate(37, TourBookingCard_Conditional_37_Template, 3, 3, "p", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div")(39, "label", 16);
            i0.ɵɵtext(40);
            i0.ɵɵpipe(41, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(42, "input", 17);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(43, TourBookingCard_Conditional_43_Template, 3, 3, "p", 11);
            i0.ɵɵconditionalCreate(44, TourBookingCard_Conditional_44_Template, 3, 3, "p", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "div", 18)(46, "label", 19);
            i0.ɵɵtext(47);
            i0.ɵɵpipe(48, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(49, "textarea", 20);
            i0.ɵɵpipe(50, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(51, TourBookingCard_Conditional_51_Template, 3, 3, "p", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(52, TourBookingCard_Conditional_52_Template, 4, 8, "p", 21);
            i0.ɵɵelementStart(53, "div", 22)(54, "span", 23);
            i0.ɵɵtext(55);
            i0.ɵɵpipe(56, "translate");
            i0.ɵɵpipe(57, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "span", 24);
            i0.ɵɵtext(59);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(60, TourBookingCard_Conditional_60_Template, 3, 3, "div", 25);
            i0.ɵɵconditionalCreate(61, TourBookingCard_Conditional_61_Template, 3, 3, "div", 26);
            i0.ɵɵconditionalCreate(62, TourBookingCard_Conditional_62_Template, 3, 2, "button", 27)(63, TourBookingCard_Conditional_63_Template, 4, 3, "button", 28);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.isSubmitting ? 0 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 38, "pricePerPerson"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.formattedPricePerPerson);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.pricePerChild > 0 ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.bookingForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasAvailableDateRange ? 11 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 40, "dateFrom"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("min", ctx.minTravelDate)("max", ctx.maxTravelDate)("placeholder", i0.ɵɵpipeBind1(18, 42, "dateFrom"))("ariaLabel", i0.ɵɵpipeBind1(19, 44, "dateFrom"))("inputClass", "h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary-400 dark:border-gray-800  ");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.bookingForm.controls.dateFrom.touched && ctx.bookingForm.controls.dateFrom.hasError("required") ? 20 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 46, "dateTo"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("min", ctx.minDateTo)("max", ctx.maxTravelDate)("placeholder", i0.ɵɵpipeBind1(26, 48, "dateTo"))("ariaLabel", i0.ɵɵpipeBind1(27, 50, "dateTo"))("inputClass", "h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary-400 dark:border-gray-800  ");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.bookingForm.controls.dateTo.touched && ctx.bookingForm.controls.dateTo.hasError("required") ? 28 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((ctx.bookingForm.controls.dateFrom.touched || ctx.bookingForm.controls.dateTo.touched) && ctx.bookingForm.hasError("invalidBookingDateRange") ? 29 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 52, "adults"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.bookingForm.controls.adults.touched && ctx.bookingForm.controls.adults.hasError("min") ? 36 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.bookingForm.controls.adults.touched && ctx.bookingForm.controls.adults.hasError("pattern") ? 37 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(41, 54, "children"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.bookingForm.controls.children.touched && ctx.bookingForm.controls.children.hasError("min") ? 43 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.bookingForm.controls.children.touched && ctx.bookingForm.controls.children.hasError("pattern") ? 44 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(48, 56, "specialRequests"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(50, 58, "specialRequestsPlaceholder"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.bookingForm.controls.specialRequests.touched && ctx.bookingForm.controls.specialRequests.hasError("maxlength") ? 51 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hasSeatLimit ? 52 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate3("", i0.ɵɵpipeBind1(56, 60, "total"), " \u00B7 ", ctx.guests, " ", i0.ɵɵpipeBind1(57, 62, "travelers"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.formattedTotalAmount);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 60 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 61 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoggedIn ? 62 : 63);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MaxLengthValidator, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TourBookingCard, [{
        type: Component,
        args: [{ selector: 'app-tour-booking-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (isSubmitting) {\n  <!-- loader -->\n  <div class=\"fixed inset-0 z-[9999] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm\" role=\"status\" aria-live=\"assertive\" [attr.aria-label]=\"'creatingBooking' | translate\">\n    <div class=\"flex min-w-64 flex-col items-center rounded-3xl border border-white/15 bg-white px-8 py-7 text-center shadow-2xl\">\n      <span class=\"relative grid h-16 w-16 place-items-center\">\n        <span class=\"absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600\"></span>\n        <i class=\"mdi mdi-calendar-check-outline text-2xl text-primary\"></i>\n      </span>\n      <p class=\"mt-5 font-semibold text-slate-800\">{{ 'creatingBooking' | translate }}</p>\n      <p class=\"mt-1 text-xs text-slate-500\">{{ 'pleaseWaitForRequest' | translate }}</p>\n    </div>\n  </div>\n}\n\n<div class=\"sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow \">\n  <div class=\"flex items-end justify-between\">\n    <div>\n      <span class=\"text-sm font-medium text-slate-400\">{{ 'pricePerPerson' | translate }}</span>\n      <p class=\"text-2xl font-semibold\">{{ formattedPricePerPerson }}</p>\n    </div>\n    @if (pricePerChild > 0) {\n      <div class=\"text-end\">\n        <span class=\"text-xs font-medium text-slate-400\">{{ 'pricePerChild' | translate }}</span>\n        <p class=\"text-base font-semibold\">{{ formattedPricePerChild }}</p>\n      </div>\n    }\n  </div>\n\n  <form class=\"mt-6\" [formGroup]=\"bookingForm\" (ngSubmit)=\"bookNow()\">\n    @if (hasAvailableDateRange) {\n      <div class=\"mb-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3\" role=\"note\">\n        <p class=\"flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary\">\n          <i class=\"mdi mdi-calendar-range text-lg\" aria-hidden=\"true\"></i>\n          {{ 'availableBookingDates' | translate }}\n        </p>\n        <p class=\"mt-1.5 text-sm font-semibold text-slate-700\">\n          {{ 'availableBookingDateRange' | translate:{ from: availableDateFrom, to: availableDateTo } }}\n        </p>\n      </div>\n    }\n\n    <div class=\"mb-4 grid grid-cols-2 gap-3\">\n      <div>\n        <label for=\"bookingDateFrom\" class=\"text-sm font-semibold\">{{ 'dateFrom' | translate }}</label>\n        <app-date-picker\n          id=\"bookingDateFrom\"\n          formControlName=\"dateFrom\"\n          [min]=\"minTravelDate\"\n          [max]=\"maxTravelDate\"\n          [placeholder]=\"'dateFrom' | translate\"\n          [ariaLabel]=\"'dateFrom' | translate\"\n          class=\"mt-2 block\"\n          [inputClass]=\"'h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary-400 dark:border-gray-800  '\" />\n        @if (bookingForm.controls.dateFrom.touched && bookingForm.controls.dateFrom.hasError('required')) {\n          <p class=\"mt-1 text-xs text-red-500\">{{ 'dateFromRequired' | translate }}</p>\n        }\n      </div>\n      <div>\n        <label for=\"bookingDateTo\" class=\"text-sm font-semibold\">{{ 'dateTo' | translate }}</label>\n        <app-date-picker\n          id=\"bookingDateTo\"\n          formControlName=\"dateTo\"\n          [min]=\"minDateTo\"\n          [max]=\"maxTravelDate\"\n          [placeholder]=\"'dateTo' | translate\"\n          [ariaLabel]=\"'dateTo' | translate\"\n          class=\"mt-2 block\"\n          [inputClass]=\"'h-10 w-full rounded border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:border-primary-400 dark:border-gray-800  '\" />\n        @if (bookingForm.controls.dateTo.touched && bookingForm.controls.dateTo.hasError('required')) {\n          <p class=\"mt-1 text-xs text-red-500\">{{ 'dateToRequired' | translate }}</p>\n        }\n        @if ((bookingForm.controls.dateFrom.touched || bookingForm.controls.dateTo.touched) && bookingForm.hasError('invalidBookingDateRange')) {\n          <p class=\"mt-1 text-xs text-red-500\">{{ 'bookingDateRangeInvalid' | translate }}</p>\n        }\n      </div>\n    </div>\n\n    <div class=\"mb-4 grid grid-cols-2 gap-3\">\n      <div>\n        <label for=\"adults\" class=\"text-sm font-semibold\">{{ 'adults' | translate }}</label>\n        <input id=\"adults\" type=\"number\" min=\"1\" step=\"1\" formControlName=\"adults\"\n          class=\"mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:border-primary-400 dark:border-gray-800  \" />\n        @if (bookingForm.controls.adults.touched && bookingForm.controls.adults.hasError('min')) { <p class=\"mt-1 text-xs text-red-500\">{{ 'atLeastOneAdult' | translate }}</p> }\n        @if (bookingForm.controls.adults.touched && bookingForm.controls.adults.hasError('pattern')) { <p class=\"mt-1 text-xs text-red-500\">{{ 'travelersWholeNumber' | translate }}</p> }\n      </div>\n      <div>\n        <label for=\"children\" class=\"text-sm font-semibold\">{{ 'children' | translate }}</label>\n        <input id=\"children\" type=\"number\" min=\"0\" step=\"1\" formControlName=\"children\"\n          class=\"mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:border-primary-400 dark:border-gray-800  \" />\n        @if (bookingForm.controls.children.touched && bookingForm.controls.children.hasError('min')) { <p class=\"mt-1 text-xs text-red-500\">{{ 'childrenCannotBeNegative' | translate }}</p> }\n        @if (bookingForm.controls.children.touched && bookingForm.controls.children.hasError('pattern')) { <p class=\"mt-1 text-xs text-red-500\">{{ 'travelersWholeNumber' | translate }}</p> }\n      </div>\n    </div>\n\n    <div class=\"mb-4\">\n      <label for=\"specialRequests\" class=\"text-sm font-semibold\">{{ 'specialRequests' | translate }}</label>\n      <textarea id=\"specialRequests\" formControlName=\"specialRequests\" rows=\"3\" maxlength=\"1000\"\n        class=\"mt-2 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:border-primary-400 dark:border-gray-800  \"\n        [placeholder]=\"'specialRequestsPlaceholder' | translate\"></textarea>\n      @if (bookingForm.controls.specialRequests.touched && bookingForm.controls.specialRequests.hasError('maxlength')) { <p class=\"mt-1 text-xs text-red-500\">{{ 'specialRequestsMaxLength' | translate }}</p> }\n    </div>\n\n    @if (hasSeatLimit) {\n      <p class=\"mb-4 text-xs\" [class.text-slate-400]=\"guests <= seatsAvailable\" [class.text-red-500]=\"guests > seatsAvailable\">\n        <i class=\"mdi mdi-account-group-outline me-1\"></i>{{ seatsAvailable }} {{ 'seatsAvailable' | translate }}\n      </p>\n    }\n\n    <div class=\"mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 \">\n      <span class=\"text-sm font-semibold\">{{ 'total' | translate }} \u00B7 {{ guests }} {{ 'travelers' | translate }}</span>\n      <span class=\"text-lg font-bold text-primary\">{{ formattedTotalAmount }}</span>\n    </div>\n\n    @if (errorMessage) { <div class=\"mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n    @if (successMessage) { <div class=\"mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\n\n    @if (isLoggedIn) {\n      <button type=\"submit\" [disabled]=\"isSubmitting || product?.isActive === false\"\n        class=\"inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-center text-base text-white duration-500 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary-600\">\n        @if (isSubmitting) { <i class=\"mdi mdi-loading mdi-spin\"></i><span>{{ 'creatingBooking' | translate }}</span> } @else { <i class=\"mdi mdi-calendar-check-outline\"></i><span>{{ 'bookNow' | translate }}</span> }\n      </button>\n    } @else {\n      <button type=\"button\" (click)=\"goToLogin()\" class=\"inline-flex w-full items-center justify-center gap-2 rounded-md  bg-primary  px-5 py-2.5 text-center text-base text-white duration-500 hover:bg-primary-600\">\n        <i class=\"mdi mdi-login\"></i>{{ 'loginToBook' | translate }}\n      </button>\n    }\n  </form>\n</div>\n" }]
    }], null, { tour: [{
            type: Input
        }], travelPackage: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TourBookingCard, { className: "TourBookingCard", filePath: "app/features/home/tour-page/tour-detail/tour-booking-card/tour-booking-card.ts", lineNumber: 34 }); })();
