import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { BOOKING_STATUS_OPTIONS, BookingStatusEnum } from '../../../../core/enums/booking-status.enum';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "../../../user/_services/auth.service";
import * as i3 from "@ngx-translate/core";
const _c0 = (a0, a1, a2, a3) => [a0, a1, a2, a3];
const _c1 = () => [1, 2, 3, 4, 5];
const _forTrack0 = ($index, $item) => $item.id;
function BookingsList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function BookingsList_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", option_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, ctx_r0.bookingStatusKey(option_r2)));
} }
function BookingsList_Conditional_16_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 12);
} }
function BookingsList_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, BookingsList_Conditional_16_For_2_Template, 1, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function BookingsList_Conditional_17_For_36_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵpipe(3, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const booking_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(2, 2, "cancellationFee"), ": $", i0.ɵɵpipeBind2(3, 4, booking_r3.cancellationFeeAmount, "1.0-2"));
} }
function BookingsList_Conditional_17_For_36_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function BookingsList_Conditional_17_For_36_Conditional_31_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const booking_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(booking_r3)); });
    i0.ɵɵelement(2, "i", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵattribute("title", i0.ɵɵpipeBind1(1, 1, "assignBookingAgent"));
} }
function BookingsList_Conditional_17_For_36_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function BookingsList_Conditional_17_For_36_Conditional_32_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const booking_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.confirmBooking(booking_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingBookingId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "confirmBooking"));
} }
function BookingsList_Conditional_17_For_36_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function BookingsList_Conditional_17_For_36_Conditional_33_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const booking_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.completeBooking(booking_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingBookingId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "completeBooking"));
} }
function BookingsList_Conditional_17_For_36_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function BookingsList_Conditional_17_For_36_Conditional_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const booking_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.cancelBooking(booking_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingBookingId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancelBooking"));
} }
function BookingsList_Conditional_17_For_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 16)(1, "td", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 15);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 15)(6, "a", 18);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 15)(9, "span", 19);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 15);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 15);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td", 15);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 15);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "number");
    i0.ɵɵconditionalCreate(24, BookingsList_Conditional_17_For_36_Conditional_24_Template, 4, 7, "span", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "td", 15)(26, "span", 21);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "td", 15)(30, "div", 22);
    i0.ɵɵconditionalCreate(31, BookingsList_Conditional_17_For_36_Conditional_31_Template, 3, 3, "button", 23);
    i0.ɵɵconditionalCreate(32, BookingsList_Conditional_17_For_36_Conditional_32_Template, 3, 4, "button", 24);
    i0.ɵɵconditionalCreate(33, BookingsList_Conditional_17_For_36_Conditional_33_Template, 3, 4, "button", 25);
    i0.ɵɵconditionalCreate(34, BookingsList_Conditional_17_For_36_Conditional_34_Template, 3, 4, "button", 26);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const booking_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("#", booking_r3.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(booking_r3.userName || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", booking_r3.userMobile ? "tel:" + booking_r3.userMobile : null, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(booking_r3.userMobile || "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(booking_r3.tourId ? i0.ɵɵpipeBind1(11, 32, "tour") : i0.ɵɵpipeBind1(12, 34, "travelPackage"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(booking_r3.tourTitle ?? booking_r3.packageName ?? "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.agentName(booking_r3) || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(18, 36, booking_r3.createdDate, "mediumDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(booking_r3.numberOfTravelers);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("$", i0.ɵɵpipeBind2(23, 39, booking_r3.totalPrice, "1.0-2"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(+booking_r3.cancellationFeeAmount > 0 ? 24 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-amber-50", +booking_r3.status === ctx_r0.bookingStatusEnum.Pending)("text-amber-600", +booking_r3.status === ctx_r0.bookingStatusEnum.Pending)("bg-emerald-50", +booking_r3.status === ctx_r0.bookingStatusEnum.Confirmed)("text-emerald-600", +booking_r3.status === ctx_r0.bookingStatusEnum.Confirmed)("bg-rose-50", +booking_r3.status === ctx_r0.bookingStatusEnum.Cancelled)("text-rose-600", +booking_r3.status === ctx_r0.bookingStatusEnum.Cancelled)("bg-slate-100", +booking_r3.status === ctx_r0.bookingStatusEnum.Completed)("text-slate-600", +booking_r3.status === ctx_r0.bookingStatusEnum.Completed);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 42, ctx_r0.bookingStatusKey(booking_r3.status)));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.isAdmin ? 31 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canConfirm(booking_r3) ? 32 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canComplete(booking_r3) ? 33 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canCancel(booking_r3) ? 34 : -1);
} }
function BookingsList_Conditional_17_ForEmpty_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 32);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noBookingsFound"));
} }
function BookingsList_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "table", 13)(2, "thead", 14)(3, "tr")(4, "th", 15);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 15);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 15);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 15);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 15);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 15);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "th", 15);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th", 15);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "th", 15);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "th", 15);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "tbody");
    i0.ɵɵrepeaterCreate(35, BookingsList_Conditional_17_For_36_Template, 35, 44, "tr", 16, _forTrack0, false, BookingsList_Conditional_17_ForEmpty_37_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 11, "bookingId"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 13, "customer"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 15, "customerPhone"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 17, "bookingProduct"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 19, "assignedAgent"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 21, "bookingDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 23, "guests"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(27, 25, "amount"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 27, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(33, 29, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.bookings);
} }
function BookingsList_Conditional_18_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵpipe(3, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const booking_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(2, 2, "cancellationFee"), ": $", i0.ɵɵpipeBind2(3, 4, booking_r8.cancellationFeeAmount, "1.0-2"));
} }
function BookingsList_Conditional_18_For_2_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function BookingsList_Conditional_18_For_2_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const booking_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(booking_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "assignBookingAgent"));
} }
function BookingsList_Conditional_18_For_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 48);
    i0.ɵɵlistener("click", function BookingsList_Conditional_18_For_2_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const booking_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.confirmBooking(booking_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingBookingId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "confirmBooking"));
} }
function BookingsList_Conditional_18_For_2_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function BookingsList_Conditional_18_For_2_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const booking_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.completeBooking(booking_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingBookingId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "completeBooking"));
} }
function BookingsList_Conditional_18_For_2_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function BookingsList_Conditional_18_For_2_Conditional_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const booking_r8 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.cancelBooking(booking_r8)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingBookingId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancelBooking"));
} }
function BookingsList_Conditional_18_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 33)(1, "div", 35)(2, "h3", 36);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 37);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 38);
    i0.ɵɵtext(8);
    i0.ɵɵelementStart(9, "a", 39);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 40);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵpipe(15, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(16, BookingsList_Conditional_18_For_2_Conditional_16_Template, 4, 7, "p", 41);
    i0.ɵɵelementStart(17, "div", 42);
    i0.ɵɵconditionalCreate(18, BookingsList_Conditional_18_For_2_Conditional_18_Template, 3, 3, "button", 43);
    i0.ɵɵconditionalCreate(19, BookingsList_Conditional_18_For_2_Conditional_19_Template, 3, 4, "button", 44);
    i0.ɵɵconditionalCreate(20, BookingsList_Conditional_18_For_2_Conditional_20_Template, 3, 4, "button", 45);
    i0.ɵɵconditionalCreate(21, BookingsList_Conditional_18_For_2_Conditional_21_Template, 3, 4, "button", 46);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const booking_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("#", booking_r8.id, " \u2014 ", booking_r8.tourTitle ?? booking_r8.packageName ?? "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 15, ctx_r0.bookingStatusKey(booking_r8.status)));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", booking_r8.userName || "-", " \u00B7 ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", booking_r8.userMobile ? "tel:" + booking_r8.userMobile : null, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(booking_r8.userMobile || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind2(13, 17, booking_r8.createdDate, "mediumDate"), " \u2014 ", booking_r8.numberOfTravelers, " ", i0.ɵɵpipeBind1(14, 20, "guests"), " \u2014 $", i0.ɵɵpipeBind2(15, 22, booking_r8.totalPrice, "1.0-2"));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(+booking_r8.cancellationFeeAmount > 0 ? 16 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.isAdmin ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canConfirm(booking_r8) ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canComplete(booking_r8) ? 20 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canCancel(booking_r8) ? 21 : -1);
} }
function BookingsList_Conditional_18_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 34);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noBookingsFound"));
} }
function BookingsList_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵrepeaterCreate(1, BookingsList_Conditional_18_For_2_Template, 22, 25, "article", 33, _forTrack0, false, BookingsList_Conditional_18_ForEmpty_3_Template, 3, 3, "p", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.bookings);
} }
function BookingsList_Conditional_19_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r14 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r14);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r14);
} }
function BookingsList_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "span", 51);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 52)(5, "label", 53)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 54);
    i0.ɵɵlistener("change", function BookingsList_Conditional_19_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, BookingsList_Conditional_19_For_11_Template, 2, 2, "option", 7, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 55);
    i0.ɵɵlistener("pageChange", function BookingsList_Conditional_19_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(3, 7, "totalRecords"), ": ", ctx_r0.paginationInfo.totalCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 9, "pageSize"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r0.paginationInfo.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("compact", true)("currentPage", ctx_r0.paginationInfo.page)("totalPages", ctx_r0.paginationInfo.totalPages);
} }
export class BookingsList {
    apiService;
    authService;
    translate;
    cdr;
    pageSizeOptions = [10, 20, 50];
    bookingStatusEnum = BookingStatusEnum;
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    bookings = [];
    isLoading = false;
    updatingBookingId = null;
    selectedStatus = '';
    errorMessage = '';
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
    constructor(apiService, authService, translate, cdr) {
        this.apiService = apiService;
        this.authService = authService;
        this.translate = translate;
        this.cdr = cdr;
    }
    get isAdmin() {
        return this.authService.getCurrentUserRole() === 'Admin';
    }
    ngOnInit() {
        this.loadBookings();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadBookings();
        }
    }
    loadBookings() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService
            .get(`Bookings?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}${this.selectedStatus === '' ? '' : `&status=${this.selectedStatus}`}`)
            .pipe(catchError(() => {
            this.errorMessage = 'bookingsLoadError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }))
            .subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.bookings ?? pageData;
            this.bookings = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.bookings.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadBookings();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadBookings();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadBookings();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadBookings();
        }
    }
    onStatusFilterChange(event) {
        const value = event.target.value;
        this.selectedStatus = value === '' ? '' : Number(value);
        this.paginationInfo.page = 1;
        this.loadBookings();
    }
    bookingStatusKey(value) {
        const status = Number(value);
        return (BOOKING_STATUS_OPTIONS.find((option) => option.value === status)?.labelKey ??
            String(value ?? ''));
    }
    agentName(booking) {
        return booking?.agentName ?? booking?.agent?.firstName ?? '';
    }
    canConfirm(booking) {
        return Number(booking?.status) === BookingStatusEnum.Pending;
    }
    canCancel(booking) {
        const status = Number(booking?.status);
        return status === BookingStatusEnum.Pending || status === BookingStatusEnum.Confirmed;
    }
    canComplete(booking) {
        return Number(booking?.status) === BookingStatusEnum.Confirmed;
    }
    async confirmBooking(booking) {
        const phone = booking?.userMobile || this.translate.instant('notAvailable');
        const result = await Swal.fire({
            icon: 'question',
            title: this.translate.instant('confirmBookingByPhone'),
            html: `<p class="text-sm text-slate-500">${this.translate.instant('customerPhone')}: <strong>${this.escapeHtml(phone)}</strong></p>`,
            input: 'textarea',
            inputLabel: this.translate.instant('statusNoteOptional'),
            inputPlaceholder: this.translate.instant('phoneConfirmationNotePlaceholder'),
            showCancelButton: true,
            confirmButtonText: this.translate.instant('customerContactedConfirm'),
            cancelButtonText: this.translate.instant('cancel'),
        });
        if (!result.isConfirmed)
            return;
        this.changeStatus(booking, BookingStatusEnum.Confirmed, {
            customerContacted: true,
            note: String(result.value ?? '').trim() || null,
        });
    }
    completeBooking(booking) {
        this.changeStatus(booking, BookingStatusEnum.Completed);
    }
    async cancelBooking(booking) {
        const freeCancellation = booking?.isFreeCancellation === true;
        const result = await Swal.fire({
            icon: 'warning',
            title: this.translate.instant('cancelBookingConfirm'),
            text: freeCancellation
                ? this.translate.instant('freeCancellationNoFee')
                : this.translate.instant('enterCancellationFee'),
            input: freeCancellation ? undefined : 'number',
            inputValue: freeCancellation ? undefined : 0,
            inputAttributes: freeCancellation ? undefined : { min: '0', step: '0.01' },
            inputValidator: freeCancellation ? undefined : (value) => Number(value) < 0 ? this.translate.instant('cancellationFeeInvalid') : undefined,
            showCancelButton: true,
            confirmButtonText: this.translate.instant('cancelBooking'),
            cancelButtonText: this.translate.instant('cancel'),
        });
        if (!result.isConfirmed)
            return;
        this.changeStatus(booking, BookingStatusEnum.Cancelled, {
            cancellationFeeAmount: freeCancellation ? 0 : Number(result.value ?? 0),
        });
    }
    changeStatus(booking, status, details = {}) {
        const bookingId = Number(booking?.id ?? booking?.bookingId);
        if (!Number.isInteger(bookingId) || bookingId <= 0 || this.updatingBookingId !== null)
            return;
        this.updatingBookingId = bookingId;
        this.apiService
            .patch(`Bookings/${bookingId}/ChangeStatus`, { status: Number(status), ...details })
            .pipe(catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('bookingStatusUpdateError') });
            return of(null);
        }), finalize(() => {
            this.updatingBookingId = null;
            this.cdr.markForCheck();
        }))
            .subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                Swal.fire({
                    icon: 'error',
                    title: response?.message || this.translate.instant('bookingStatusUpdateError'),
                });
                return;
            }
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: response?.message || this.translate.instant('bookingStatusUpdated'),
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
            });
            this.loadBookings();
        });
    }
    escapeHtml(value) {
        return String(value ?? '').replace(/[&<>'"]/g, (character) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
        })[character] ?? character);
    }
    static ɵfac = function BookingsList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || BookingsList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.TranslateService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BookingsList, selectors: [["app-configurations-bookings-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 20, vars: 18, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "flex", "flex-col", "gap-3", "sm:flex-row", "sm:items-center", "sm:justify-between"], [1, "text-xl", "font-semibold"], [1, "flex", "items-center", "gap-2", "text-sm", "font-medium", "text-slate-600"], [1, "rounded-full", "border", "border-slate-200", "bg-white", "px-4", "py-2", "outline-none", "focus:border-primary", 3, "change", "value"], ["value", ""], [3, "value"], [1, "space-y-3"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "gap-4", "overflow-y-auto", "pe-1", "md:grid-cols-2"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "h-12", "animate-pulse", "rounded-xl", "bg-slate-100"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "px-4", "py-3", "font-semibold"], [1, "font-medium", "text-primary", "hover:underline", 3, "href"], [1, "me-2", "rounded-full", "bg-slate-100", "px-2", "py-0.5", "text-[10px]", "font-semibold", "uppercase", "text-slate-500"], [1, "block", "text-xs", "font-semibold", "text-rose-600"], [1, "rounded-full", "px-2.5", "py-1", "text-xs", "font-semibold"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-primary/40", "text-primary", "transition", "hover:bg-primary", "hover:text-white"], ["type", "button", 1, "rounded-full", "border", "border-emerald-300", "px-3", "py-1", "text-xs", "font-semibold", "text-emerald-600", "transition", "hover:bg-emerald-500", "hover:text-white", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-sky-300", "px-3", "py-1", "text-xs", "font-semibold", "text-sky-600", "transition", "hover:bg-sky-500", "hover:text-white", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", "transition", "hover:bg-rose-500", "hover:text-white", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-primary/40", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi", "mdi-account-arrow-right-outline"], ["type", "button", 1, "rounded-full", "border", "border-emerald-300", "px-3", "py-1", "text-xs", "font-semibold", "text-emerald-600", "transition", "hover:bg-emerald-500", "hover:text-white", "disabled:opacity-60", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "border", "border-sky-300", "px-3", "py-1", "text-xs", "font-semibold", "text-sky-600", "transition", "hover:bg-sky-500", "hover:text-white", "disabled:opacity-60", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", "transition", "hover:bg-rose-500", "hover:text-white", "disabled:opacity-60", 3, "click", "disabled"], ["colspan", "10", 1, "p-8", "text-center", "text-slate-500"], [1, "rounded-2xl", "border", "border-slate-200", "p-4"], [1, "text-sm", "text-slate-500"], [1, "flex", "items-start", "justify-between", "gap-3"], [1, "font-semibold"], [1, "rounded-full", "bg-slate-100", "px-2.5", "py-1", "text-xs", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "text-primary", "hover:underline", 3, "href"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "mt-2", "text-xs", "font-semibold", "text-rose-600"], [1, "mt-4", "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-primary/40", "px-3", "py-1", "text-xs", "font-semibold", "text-primary", "hover:bg-primary", "hover:text-white"], ["type", "button", 1, "rounded-full", "border", "border-emerald-300", "px-3", "py-1", "text-xs", "font-semibold", "text-emerald-600", "hover:bg-emerald-500", "hover:text-white", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-sky-300", "px-3", "py-1", "text-xs", "font-semibold", "text-sky-600", "hover:bg-sky-500", "hover:text-white", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", "hover:bg-rose-500", "hover:text-white", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-primary/40", "px-3", "py-1", "text-xs", "font-semibold", "text-primary", "hover:bg-primary", "hover:text-white", 3, "click"], ["type", "button", 1, "rounded-full", "border", "border-emerald-300", "px-3", "py-1", "text-xs", "font-semibold", "text-emerald-600", "hover:bg-emerald-500", "hover:text-white", "disabled:opacity-60", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "border", "border-sky-300", "px-3", "py-1", "text-xs", "font-semibold", "text-sky-600", "hover:bg-sky-500", "hover:text-white", "disabled:opacity-60", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", "hover:bg-rose-500", "hover:text-white", "disabled:opacity-60", 3, "click", "disabled"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function BookingsList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, BookingsList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "label", 4)(7, "span");
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "select", 5);
            i0.ɵɵlistener("change", function BookingsList_Template_select_change_10_listener($event) { return ctx.onStatusFilterChange($event); });
            i0.ɵɵelementStart(11, "option", 6);
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(14, BookingsList_For_15_Template, 3, 4, "option", 7, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(16, BookingsList_Conditional_16_Template, 3, 1, "div", 8)(17, BookingsList_Conditional_17_Template, 38, 31, "div", 9)(18, BookingsList_Conditional_18_Template, 4, 1, "div", 10);
            i0.ɵɵconditionalCreate(19, BookingsList_Conditional_19_Template, 13, 11, "div", 11);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 7, "bookingRecords"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "filterByStatus"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.selectedStatus);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 11, "allStatuses"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(i0.ɵɵpureFunction4(13, _c0, ctx.bookingStatusEnum.Pending, ctx.bookingStatusEnum.Confirmed, ctx.bookingStatusEnum.Cancelled, ctx.bookingStatusEnum.Completed));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 16 : ctx.viewMode === "table" ? 17 : 18);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 19 : -1);
        } }, dependencies: [PaginationOne, DatePipe, DecimalPipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BookingsList, [{
        type: Component,
        args: [{ selector: 'app-configurations-bookings-list', standalone: true, imports: [DatePipe, DecimalPipe, TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\n  @if (errorMessage) {\n    <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div>\n  }\n\n  <div class=\"mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ 'bookingRecords' | translate }}</h2>\n    <label class=\"flex items-center gap-2 text-sm font-medium text-slate-600\">\n      <span>{{ 'filterByStatus' | translate }}</span>\n      <select class=\"rounded-full border border-slate-200 bg-white px-4 py-2 outline-none focus:border-primary\" [value]=\"selectedStatus\" (change)=\"onStatusFilterChange($event)\">\n        <option value=\"\">{{ 'allStatuses' | translate }}</option>\n        @for (option of [bookingStatusEnum.Pending, bookingStatusEnum.Confirmed, bookingStatusEnum.Cancelled, bookingStatusEnum.Completed]; track option) {\n          <option [value]=\"option\">{{ bookingStatusKey(option) | translate }}</option>\n        }\n      </select>\n    </label>\n  </div>\n\n  @if (isLoading) {\n    <div class=\"space-y-3\">\n      @for (row of [1,2,3,4,5]; track row) { <div class=\"h-12 animate-pulse rounded-xl bg-slate-100\"></div> }\n    </div>\n  } @else if (viewMode === 'table') {\n    <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n      <table class=\"min-w-full text-left text-sm\">\n        <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\n          <tr>\n            <th class=\"px-4 py-3\">{{ 'bookingId' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'customer' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'customerPhone' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'bookingProduct' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'assignedAgent' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'bookingDate' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'guests' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'amount' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\n          </tr>\n        </thead>\n        <tbody>\n          @for (booking of bookings; track booking.id) {\n            <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\n              <td class=\"px-4 py-3 font-semibold\">#{{ booking.id }}</td>\n              <td class=\"px-4 py-3\">{{ booking.userName || '-' }}</td>\n              <td class=\"px-4 py-3\"><a class=\"font-medium text-primary hover:underline\" [href]=\"booking.userMobile ? 'tel:' + booking.userMobile : null\">{{ booking.userMobile || '-' }}</a></td>\n              <td class=\"px-4 py-3\"><span class=\"me-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-500\">{{ booking.tourId ? ('tour' | translate) : ('travelPackage' | translate) }}</span>{{ booking.tourTitle ?? booking.packageName ?? '-' }}</td>\n              <td class=\"px-4 py-3\">{{ agentName(booking) || '-' }}</td>\n              <td class=\"px-4 py-3\">{{ booking.createdDate | date: 'mediumDate' }}</td>\n              <td class=\"px-4 py-3\">{{ booking.numberOfTravelers }}</td>\n              <td class=\"px-4 py-3\">${{ booking.totalPrice | number: '1.0-2' }} @if (+booking.cancellationFeeAmount > 0) { <span class=\"block text-xs font-semibold text-rose-600\">{{ 'cancellationFee' | translate }}: ${{ booking.cancellationFeeAmount | number: '1.0-2' }}</span> }</td>\n              <td class=\"px-4 py-3\">\n                <span class=\"rounded-full px-2.5 py-1 text-xs font-semibold\"\n                  [class.bg-amber-50]=\"+booking.status === bookingStatusEnum.Pending\" [class.text-amber-600]=\"+booking.status === bookingStatusEnum.Pending\"\n                  [class.bg-emerald-50]=\"+booking.status === bookingStatusEnum.Confirmed\" [class.text-emerald-600]=\"+booking.status === bookingStatusEnum.Confirmed\"\n                  [class.bg-rose-50]=\"+booking.status === bookingStatusEnum.Cancelled\" [class.text-rose-600]=\"+booking.status === bookingStatusEnum.Cancelled\"\n                  [class.bg-slate-100]=\"+booking.status === bookingStatusEnum.Completed\" [class.text-slate-600]=\"+booking.status === bookingStatusEnum.Completed\">{{ bookingStatusKey(booking.status) | translate }}</span>\n              </td>\n              <td class=\"px-4 py-3\"><div class=\"flex flex-wrap gap-2\">\n                @if (isAdmin) { <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-primary/40 text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"'assignBookingAgent' | translate\" (click)=\"editRequested.emit(booking)\"><i class=\"mdi mdi-account-arrow-right-outline\"></i></button> }\n                @if (canConfirm(booking)) { <button type=\"button\" [disabled]=\"updatingBookingId !== null\" class=\"rounded-full border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-500 hover:text-white disabled:opacity-60\" (click)=\"confirmBooking(booking)\">{{ 'confirmBooking' | translate }}</button> }\n                @if (canComplete(booking)) { <button type=\"button\" [disabled]=\"updatingBookingId !== null\" class=\"rounded-full border border-sky-300 px-3 py-1 text-xs font-semibold text-sky-600 transition hover:bg-sky-500 hover:text-white disabled:opacity-60\" (click)=\"completeBooking(booking)\">{{ 'completeBooking' | translate }}</button> }\n                @if (canCancel(booking)) { <button type=\"button\" [disabled]=\"updatingBookingId !== null\" class=\"rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white disabled:opacity-60\" (click)=\"cancelBooking(booking)\">{{ 'cancelBooking' | translate }}</button> }\n              </div></td>\n            </tr>\n          } @empty { <tr><td colspan=\"10\" class=\"p-8 text-center text-slate-500\">{{ 'noBookingsFound' | translate }}</td></tr> }\n        </tbody>\n      </table>\n    </div>\n  } @else {\n    <div class=\"grid max-h-[70vh] gap-4 overflow-y-auto pe-1 md:grid-cols-2\">\n      @for (booking of bookings; track booking.id) {\n        <article class=\"rounded-2xl border border-slate-200 p-4\">\n          <div class=\"flex items-start justify-between gap-3\"><h3 class=\"font-semibold\">#{{ booking.id }} \u2014 {{ booking.tourTitle ?? booking.packageName ?? '-' }}</h3><span class=\"rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold\">{{ bookingStatusKey(booking.status) | translate }}</span></div>\n          <p class=\"mt-2 text-sm text-slate-500\">{{ booking.userName || '-' }} \u00B7 <a class=\"text-primary hover:underline\" [href]=\"booking.userMobile ? 'tel:' + booking.userMobile : null\">{{ booking.userMobile || '-' }}</a></p>\n          <p class=\"mt-1 text-sm text-slate-500\">{{ booking.createdDate | date: 'mediumDate' }} \u2014 {{ booking.numberOfTravelers }} {{ 'guests' | translate }} \u2014 ${{ booking.totalPrice | number: '1.0-2' }}</p>\n          @if (+booking.cancellationFeeAmount > 0) { <p class=\"mt-2 text-xs font-semibold text-rose-600\">{{ 'cancellationFee' | translate }}: ${{ booking.cancellationFeeAmount | number: '1.0-2' }}</p> }\n          <div class=\"mt-4 flex flex-wrap gap-2\">\n            @if (isAdmin) { <button type=\"button\" class=\"rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-white\" (click)=\"editRequested.emit(booking)\">{{ 'assignBookingAgent' | translate }}</button> }\n            @if (canConfirm(booking)) { <button type=\"button\" [disabled]=\"updatingBookingId !== null\" class=\"rounded-full border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-600 hover:bg-emerald-500 hover:text-white disabled:opacity-60\" (click)=\"confirmBooking(booking)\">{{ 'confirmBooking' | translate }}</button> }\n            @if (canComplete(booking)) { <button type=\"button\" [disabled]=\"updatingBookingId !== null\" class=\"rounded-full border border-sky-300 px-3 py-1 text-xs font-semibold text-sky-600 hover:bg-sky-500 hover:text-white disabled:opacity-60\" (click)=\"completeBooking(booking)\">{{ 'completeBooking' | translate }}</button> }\n            @if (canCancel(booking)) { <button type=\"button\" [disabled]=\"updatingBookingId !== null\" class=\"rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-500 hover:text-white disabled:opacity-60\" (click)=\"cancelBooking(booking)\">{{ 'cancelBooking' | translate }}</button> }\n          </div>\n        </article>\n      } @empty { <p class=\"text-sm text-slate-500\">{{ 'noBookingsFound' | translate }}</p> }\n    </div>\n  }\n\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n      <div class=\"flex flex-wrap items-center gap-2\"><label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label><app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" /></div>\n    </div>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i2.AuthService }, { type: i3.TranslateService }, { type: i0.ChangeDetectorRef }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BookingsList, { className: "BookingsList", filePath: "app/features/configurations/bookings/bookings-list/bookings-list.ts", lineNumber: 35 }); })();
