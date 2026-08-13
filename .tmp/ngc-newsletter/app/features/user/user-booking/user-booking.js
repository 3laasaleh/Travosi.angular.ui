import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/apiservice.service";
import * as i2 from "../_services/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
const _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
const _c1 = () => [1, 2, 3, 4, 5];
const _c2 = (a0, a1) => ({ shown: a0, total: a1 });
const _c3 = (a0, a1) => ({ page: a0, total: a1 });
function UserBooking_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", size_r1)("selected", size_r1 === ctx_r1.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r1);
} }
function UserBooking_Conditional_26_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 21);
} }
function UserBooking_Conditional_26_For_7_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 21);
} if (rf & 2) {
    const column_r3 = ctx.$implicit;
    i0.ɵɵclassProp("w-2/3", column_r3 === 8);
} }
function UserBooking_Conditional_26_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵrepeaterCreate(1, UserBooking_Conditional_26_For_7_For_2_Template, 1, 2, "div", 23, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function UserBooking_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelementStart(2, "div", 19)(3, "div", 20);
    i0.ɵɵrepeaterCreate(4, UserBooking_Conditional_26_For_5_Template, 1, 0, "div", 21, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(6, UserBooking_Conditional_26_For_7_Template, 3, 1, "div", 22, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 1, "loadingBookings"));
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(4, _c1));
} }
function UserBooking_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.errorMessage));
} }
function UserBooking_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noBookingsFound"));
} }
function UserBooking_Conditional_29_For_27_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵpipe(3, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const booking_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(2, 2, "cancellationFee"), ": $", i0.ɵɵpipeBind2(3, 4, booking_r5.cancellationFeeAmount, "1.0-2"));
} }
function UserBooking_Conditional_29_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 28)(1, "td", 33);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 34);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 34);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 34);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 34);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 34);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "number");
    i0.ɵɵconditionalCreate(17, UserBooking_Conditional_29_For_27_Conditional_17_Template, 4, 7, "span", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td", 34)(19, "span", 36);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const booking_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", booking_r5.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(booking_r5.tourTitle ?? booking_r5.packageName ?? "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 11, booking_r5.createdDate, "mediumDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(10, 14, booking_r5.dateFrom, "mediumDate"), " - ", i0.ɵɵpipeBind2(11, 17, booking_r5.dateTo, "mediumDate"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(booking_r5.numberOfTravelers);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("$", i0.ɵɵpipeBind2(16, 20, booking_r5.totalPrice, "1.0-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(booking_r5.cancellationFeeAmount > 0 ? 17 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(booking_r5.statusName === "Confirmed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : booking_r5.statusName === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" : booking_r5.statusName === "Cancelled" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" : "bg-slate-100 text-slate-700  ");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 23, ctx_r1.bookingStatusKey(booking_r5.statusName)));
} }
function UserBooking_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24)(1, "table", 25)(2, "thead", 26)(3, "tr")(4, "th", 27);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 27);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 27);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 27);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 27);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 27);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "th", 27);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "tbody");
    i0.ɵɵrepeaterCreate(26, UserBooking_Conditional_29_For_27_Template, 22, 25, "tr", 28, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 29)(29, "p", 30);
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 31)(33, "button", 32);
    i0.ɵɵlistener("click", function UserBooking_Conditional_29_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.prevPage()); });
    i0.ɵɵtext(34);
    i0.ɵɵpipe(35, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 30);
    i0.ɵɵtext(37);
    i0.ɵɵpipe(38, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "button", 32);
    i0.ɵɵlistener("click", function UserBooking_Conditional_29_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextPage()); });
    i0.ɵɵtext(40);
    i0.ɵɵpipe(41, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 13, "bookingId"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 15, "tourOrPackage"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 17, "bookedOn"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 19, "travelDates"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 21, "guests"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 23, "amount"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 25, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.pagedBookings);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(31, 27, "showingBookings", i0.ɵɵpureFunction2(37, _c2, ctx_r1.pagedBookings.length, ctx_r1.bookings.length)));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.page === 1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(35, 30, "previous"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(38, 32, "pageOf", i0.ɵɵpureFunction2(40, _c3, ctx_r1.page, ctx_r1.totalPages)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.page >= ctx_r1.totalPages);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(41, 35, "next"));
} }
export class UserBooking {
    apiService;
    authService;
    router;
    cdr;
    bookings = [];
    isLoading = false;
    errorMessage = '';
    page = 1;
    pageSize = 10;
    pageSizes = [10, 20, 50];
    constructor(apiService, authService, router, cdr) {
        this.apiService = apiService;
        this.authService = authService;
        this.router = router;
        this.cdr = cdr;
    }
    ngOnInit() {
        const user = this.authService.getCurentUser();
        if (!user) {
            this.router.navigate(['login']);
            return;
        }
        this.loadBookings(user.userId);
    }
    get pagedBookings() {
        const start = (this.page - 1) * this.pageSize;
        return this.bookings.slice(start, start + this.pageSize);
    }
    get totalPages() {
        return Math.max(1, Math.ceil(this.bookings.length / this.pageSize));
    }
    loadBookings(userId) {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService.get(`Bookings/user/${userId}`).subscribe({
            next: (data) => {
                this.bookings = Array.isArray(data) ? data : [];
                this.page = 1;
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            error: () => {
                this.errorMessage = 'userBookingsLoadError';
                this.isLoading = false;
                this.cdr.markForCheck();
            },
            complete: () => {
                this.isLoading = false;
                this.cdr.markForCheck();
            },
        });
    }
    bookingStatusKey(statusName) {
        const keys = {
            pending: 'bookingStatusPending',
            confirmed: 'bookingStatusConfirmed',
            cancelled: 'bookingStatusCancelled',
            completed: 'bookingStatusCompleted',
        };
        return keys[(statusName ?? '').toLowerCase()] ?? statusName;
    }
    prevPage() {
        if (this.page > 1) {
            this.page -= 1;
        }
    }
    nextPage() {
        if (this.page < this.totalPages) {
            this.page += 1;
        }
    }
    onPageSizeChange(event) {
        const value = Number(event.target.value);
        if (value > 0) {
            this.pageSize = value;
            this.page = 1;
        }
    }
    static ɵfac = function UserBooking_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || UserBooking)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserBooking, selectors: [["app-user-booking"]], decls: 31, vars: 10, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover", 2, "background-image", "url('assets/images/bg/cta.jpg')"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "md:flex"], [1, "lg:w-1/4", "md:w-1/3", "md:px-3"], [1, "lg:w-3/4", "md:w-2/3", "md:px-3", "mt-6", "md:mt-0"], [1, "rounded-md", "border", "border-gray-100", "dark:border-gray-700", "bg-white", "shadow", "dark:shadow-gray-800", "p-6"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "md:justify-between", "gap-4"], [1, "text-xl", "font-semibold", "text-slate-900"], [1, "text-slate-400", "mt-1"], [1, "flex", "items-center", "gap-3", "text-sm", "text-slate-500"], ["for", "pageSize", 1, "font-medium"], ["id", "pageSize", 1, "rounded-md", "border", "border-gray-200", "dark:border-gray-700", "bg-white", "text-slate-900", "px-3", "py-2", 3, "change"], [3, "value", "selected"], [1, "mt-6", "overflow-hidden", "rounded-xl", "border", "border-gray-100", "dark:border-gray-700"], ["aria-busy", "true", 1, "overflow-x-auto"], [1, "p-8", "text-center", "text-red-600"], [1, "p-8", "text-center", "text-slate-500"], [1, "min-w-[900px]"], [1, "grid", "grid-cols-8", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200", "dark:bg-slate-700"], [1, "grid", "grid-cols-8", "gap-4", "border-t", "border-gray-100", "px-4", "py-4", "dark:border-gray-800"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200", "dark:bg-slate-700", 3, "w-2/3"], [1, "overflow-x-auto"], [1, "min-w-full", "text-left", "text-sm", "text-slate-600"], [1, "bg-slate-50", "text-slate-700"], [1, "px-4", "py-3", "font-medium"], [1, "border-t", "border-gray-100", "dark:border-gray-800", "hover:bg-slate-50", "dark:hover:bg-slate-950"], [1, "mt-4", "flex", "flex-col", "gap-3", "sm:flex-row", "sm:items-center", "sm:justify-between"], [1, "text-sm", "text-slate-500"], [1, "flex", "items-center", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-gray-200", "bg-white", "px-4", "py-2", "text-sm", "text-slate-700", "hover:border-primary", "hover:bg-primary", "hover:text-white", "dark:border-slate-700", 3, "click", "disabled"], [1, "px-4", "py-4", "font-medium", "text-slate-800"], [1, "px-4", "py-4"], [1, "block", "text-xs", "font-semibold", "text-rose-600"], [1, "inline-flex", "rounded-full", "px-3", "py-1", "text-xs", "font-semibold", "uppercase", "tracking-wide"]], template: function UserBooking_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0)(2, "div", 1);
            i0.ɵɵelement(3, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "div", 5);
            i0.ɵɵelement(7, "app-account-tab");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6)(9, "div", 7)(10, "div", 8)(11, "div")(12, "h5", 9);
            i0.ɵɵtext(13);
            i0.ɵɵpipe(14, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 10);
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 11)(19, "label", 12);
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "select", 13);
            i0.ɵɵlistener("change", function UserBooking_Template_select_change_22_listener($event) { return ctx.onPageSizeChange($event); });
            i0.ɵɵrepeaterCreate(23, UserBooking_For_24_Template, 2, 3, "option", 14, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(25, "div", 15);
            i0.ɵɵconditionalCreate(26, UserBooking_Conditional_26_Template, 8, 5, "div", 16)(27, UserBooking_Conditional_27_Template, 3, 3, "div", 17)(28, UserBooking_Conditional_28_Template, 3, 3, "div", 18)(29, UserBooking_Conditional_29_Template, 42, 43);
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelement(30, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 4, "myBookings"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 6, "bookingHistoryDescription"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(21, 8, "rows"), ":");
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.pageSizes);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.isLoading ? 26 : ctx.errorMessage ? 27 : ctx.bookings.length === 0 ? 28 : 29);
        } }, dependencies: [CommonModule, HomeNavbar, AccountTab, FooterOne, i4.DecimalPipe, i4.DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserBooking, [{
        type: Component,
        args: [{ selector: 'app-user-booking', standalone: true, imports: [CommonModule, HomeNavbar, AccountTab, FooterOne, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n<section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n    <div class=\"container relative\">\r\n        <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\" style=\"background-image: url('assets/images/bg/cta.jpg')\"></div>\r\n    </div>\r\n\r\n    <div class=\"container relative md:mt-24 mt-16\">\r\n        <div class=\"md:flex\">\r\n            <div class=\"lg:w-1/4 md:w-1/3 md:px-3\">\r\n                <app-account-tab />\r\n            </div>\r\n\r\n            <div class=\"lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0\">\r\n                <div class=\"rounded-md border border-gray-100 dark:border-gray-700 bg-white  shadow dark:shadow-gray-800 p-6\">\r\n                    <div class=\"flex flex-col md:flex-row md:items-center md:justify-between gap-4\">\r\n                        <div>\r\n                            <h5 class=\"text-xl font-semibold text-slate-900 \">{{ 'myBookings' | translate }}</h5>\r\n                            <p class=\"text-slate-400 mt-1\">{{ 'bookingHistoryDescription' | translate }}</p>\r\n                        </div>\r\n\r\n                        <div class=\"flex items-center gap-3 text-sm text-slate-500 \">\r\n                            <label for=\"pageSize\" class=\"font-medium\">{{ 'rows' | translate }}:</label>\r\n                            <select id=\"pageSize\" class=\"rounded-md border border-gray-200 dark:border-gray-700 bg-white  text-slate-900  px-3 py-2\" (change)=\"onPageSizeChange($event)\">\r\n                                @for (size of pageSizes; track size) {\r\n                                    <option [value]=\"size\" [selected]=\"size === pageSize\">{{ size }}</option>\r\n                                }\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"mt-6 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700\">\r\n                        @if (isLoading) {\r\n                            <div class=\"overflow-x-auto\" aria-busy=\"true\" [attr.aria-label]=\"'loadingBookings' | translate\">\r\n                                <div class=\"min-w-[900px]\">\r\n                                    <div class=\"grid grid-cols-8 gap-4 bg-slate-50 px-4 py-3 \">\r\n                                        @for (column of [1, 2, 3, 4, 5, 6, 7, 8]; track column) {\r\n                                            <div class=\"h-4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700\"></div>\r\n                                        }\r\n                                    </div>\r\n                                    @for (row of [1, 2, 3, 4, 5]; track row) {\r\n                                        <div class=\"grid grid-cols-8 gap-4 border-t border-gray-100 px-4 py-4 dark:border-gray-800\">\r\n                                            @for (column of [1, 2, 3, 4, 5, 6, 7, 8]; track column) {\r\n                                                <div class=\"h-4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700\" [class.w-2/3]=\"column === 8\"></div>\r\n                                            }\r\n                                        </div>\r\n                                    }\r\n                                </div>\r\n                            </div>\r\n                        } @else if (errorMessage) {\r\n                            <div class=\"p-8 text-center text-red-600 \">{{ errorMessage | translate }}</div>\r\n                        } @else if (bookings.length === 0) {\r\n                            <div class=\"p-8 text-center text-slate-500 \">{{ 'noBookingsFound' | translate }}</div>\r\n                        } @else {\r\n                            <div class=\"overflow-x-auto\">\r\n                                <table class=\"min-w-full text-left text-sm text-slate-600 \">\r\n                                    <thead class=\"bg-slate-50  text-slate-700 \">\r\n                                        <tr>\r\n                                            <th class=\"px-4 py-3 font-medium\">{{ 'bookingId' | translate }}</th>\r\n                                            <th class=\"px-4 py-3 font-medium\">{{ 'tourOrPackage' | translate }}</th>\r\n                                            <th class=\"px-4 py-3 font-medium\">{{ 'bookedOn' | translate }}</th>\r\n                                            <th class=\"px-4 py-3 font-medium\">{{ 'travelDates' | translate }}</th>\r\n                                            <th class=\"px-4 py-3 font-medium\">{{ 'guests' | translate }}</th>\r\n                                            <th class=\"px-4 py-3 font-medium\">{{ 'amount' | translate }}</th>\r\n                                            <th class=\"px-4 py-3 font-medium\">{{ 'status' | translate }}</th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        @for (booking of pagedBookings; track $index) {\r\n                                            <tr class=\"border-t border-gray-100 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-950\">\r\n                                                <td class=\"px-4 py-4 font-medium text-slate-800 \">#{{ booking.id }}</td>\r\n                                                <td class=\"px-4 py-4\">{{ booking.tourTitle ?? booking.packageName ?? '-' }}</td>\r\n                                                <td class=\"px-4 py-4\">{{ booking.createdDate | date: 'mediumDate' }}</td>\r\n                                                <td class=\"px-4 py-4\">{{ booking.dateFrom | date: 'mediumDate' }} - {{ booking.dateTo | date: 'mediumDate' }}</td>\r\n                                                <td class=\"px-4 py-4\">{{ booking.numberOfTravelers }}</td>\r\n                                                <td class=\"px-4 py-4\">${{ booking.totalPrice | number: '1.0-2' }} @if (booking.cancellationFeeAmount > 0) { <span class=\"block text-xs font-semibold text-rose-600\">{{ 'cancellationFee' | translate }}: ${{ booking.cancellationFeeAmount | number: '1.0-2' }}</span> }</td>\r\n                                                <td class=\"px-4 py-4\">\r\n                                                    <span class=\"inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide\" [class]=\"booking.statusName === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : booking.statusName === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : booking.statusName === 'Cancelled' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' : 'bg-slate-100 text-slate-700  '\">{{ bookingStatusKey(booking.statusName) | translate }}</span>\r\n                                                </td>\r\n                                            </tr>\r\n                                        }\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n\r\n                            <div class=\"mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between\">\r\n                                <p class=\"text-sm text-slate-500 \">{{ 'showingBookings' | translate: { shown: pagedBookings.length, total: bookings.length } }}</p>\r\n                                <div class=\"flex items-center gap-2\">\r\n                                    <button type=\"button\" class=\"rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-primary hover:bg-primary hover:text-white dark:border-slate-700  \" [disabled]=\"page === 1\" (click)=\"prevPage()\">{{ 'previous' | translate }}</button>\r\n                                    <span class=\"text-sm text-slate-500 \">{{ 'pageOf' | translate: { page: page, total: totalPages } }}</span>\r\n                                    <button type=\"button\" class=\"rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-primary hover:bg-primary hover:text-white dark:border-slate-700  \" [disabled]=\"page >= totalPages\" (click)=\"nextPage()\">{{ 'next' | translate }}</button>\r\n                                </div>\r\n                            </div>\r\n                        }\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<app-footer-one />\r\n" }]
    }], () => [{ type: i1.ApiService }, { type: i2.AuthService }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserBooking, { className: "UserBooking", filePath: "app/features/user/user-booking/user-booking.ts", lineNumber: 32 }); })();
