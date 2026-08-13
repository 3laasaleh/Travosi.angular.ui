import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { FLIGHT_CLASS_OPTIONS } from '../flight-class.enum';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import Swal from 'sweetalert2';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@ngx-translate/core";
const _c0 = () => [1, 2, 3, 4, 5, 6];
const _c1 = () => [1, 2, 3, 4, 5];
const _c2 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function FlightsList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function FlightsList_Conditional_6_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function FlightsList_Conditional_6_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 10)(2, "div", 10)(3, "div", 10)(4, "div", 10)(5, "div", 10)(6, "div", 12);
    i0.ɵɵelementEnd();
} }
function FlightsList_Conditional_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 9);
    i0.ɵɵrepeaterCreate(2, FlightsList_Conditional_6_Conditional_0_For_3_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, FlightsList_Conditional_6_Conditional_0_For_5_Template, 7, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c1));
} }
function FlightsList_Conditional_6_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "div", 14);
    i0.ɵɵelement(2, "div", 15)(3, "div", 16)(4, "div", 10)(5, "div", 12);
    i0.ɵɵelementEnd()();
} }
function FlightsList_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, FlightsList_Conditional_6_Conditional_1_For_2_Template, 6, 0, "div", 13, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c2));
} }
function FlightsList_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, FlightsList_Conditional_6_Conditional_0_Template, 6, 2, "div", 7)(1, FlightsList_Conditional_6_Conditional_1_Template, 3, 1, "div", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function FlightsList_Conditional_7_For_33_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function FlightsList_Conditional_7_For_33_Conditional_27_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteFlight(item_r3)); });
    i0.ɵɵelement(1, "i", 31);
    i0.ɵɵelementEnd();
} }
function FlightsList_Conditional_7_For_33_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 20)(1, "td", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 19);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 19);
    i0.ɵɵtext(6);
    i0.ɵɵelement(7, "i", 22);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 19);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 19);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 19);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 19)(17, "span", 23);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td", 19)(21, "button", 24);
    i0.ɵɵlistener("click", function FlightsList_Conditional_7_For_33_Template_button_click_21_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleFlightStatus(item_r3)); });
    i0.ɵɵelement(22, "span", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "td", 19)(24, "div", 26)(25, "button", 27);
    i0.ɵɵlistener("click", function FlightsList_Conditional_7_For_33_Template_button_click_25_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(26, "i", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(27, FlightsList_Conditional_7_For_33_Conditional_27_Template, 2, 0, "button", 29);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.flightNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.airlineName ?? item_r3.airline?.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r3.departureAirport, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r3.arrivalAirport);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 19, item_r3.departureTime, "short"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.price);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.availableSeats);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 22, ctx_r0.flightClassKey(item_r3.flightClass)));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("bg-emerald-500", item_r3.isActive !== false)("bg-slate-300", item_r3.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", item_r3.isActive !== false);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("translate-x-6", item_r3.isActive !== false)("translate-x-1", item_r3.isActive === false);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(item_r3.isActive === false ? 27 : -1);
} }
function FlightsList_Conditional_7_ForEmpty_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 32);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noFlightsFound"));
} }
function FlightsList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "table", 17)(2, "thead", 18)(3, "tr")(4, "th", 19);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 19);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 19);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 19);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 19);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 19);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "th", 19);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "th", 19);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "th", 19);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "tbody");
    i0.ɵɵrepeaterCreate(32, FlightsList_Conditional_7_For_33_Template, 28, 24, "tr", 20, _forTrack0, false, FlightsList_Conditional_7_ForEmpty_34_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 10, "flightNumber"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 12, "airline"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 14, "route"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 16, "departureTime"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 18, "price"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 20, "availableSeats"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 22, "flightClass"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(27, 24, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 26, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.flights);
} }
function FlightsList_Conditional_8_For_2_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function FlightsList_Conditional_8_For_2_Conditional_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const item_r6 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteFlight(item_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "delete"));
} }
function FlightsList_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 13)(1, "div", 34)(2, "div", 35)(3, "h3", 36);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 23);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p", 37);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 38);
    i0.ɵɵtext(11);
    i0.ɵɵelement(12, "i", 22);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 37);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "date");
    i0.ɵɵpipe(17, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 39)(19, "span", 36);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 40)(24, "button", 41);
    i0.ɵɵlistener("click", function FlightsList_Conditional_8_For_2_Template_button_click_24_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r6)); });
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 42);
    i0.ɵɵlistener("click", function FlightsList_Conditional_8_For_2_Template_button_click_27_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleFlightStatus(item_r6)); });
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(30, FlightsList_Conditional_8_For_2_Conditional_30_Template, 3, 3, "button", 43);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r6.flightNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 21, ctx_r0.flightClassKey(item_r6.flightClass)));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r6.airlineName ?? item_r6.airline?.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r6.departureAirport, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r6.arrivalAirport);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(16, 23, item_r6.departureTime, "short"), " - ", i0.ɵɵpipeBind2(17, 26, item_r6.arrivalTime, "short"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r6.price);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" \u00B7 ", item_r6.availableSeats, " ", i0.ɵɵpipeBind1(22, 29, "availableSeats"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 31, "edit"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("border-emerald-300", item_r6.isActive === false)("text-emerald-600", item_r6.isActive === false)("border-rose-300", item_r6.isActive !== false)("text-rose-600", item_r6.isActive !== false);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 33, item_r6.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r6.isActive === false ? 30 : -1);
} }
function FlightsList_Conditional_8_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 33);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noFlightsFound"));
} }
function FlightsList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, FlightsList_Conditional_8_For_2_Template, 31, 35, "article", 13, _forTrack0, false, FlightsList_Conditional_8_ForEmpty_3_Template, 3, 3, "p", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.flights);
} }
function FlightsList_Conditional_9_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r9);
} }
function FlightsList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 45);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 46)(5, "label", 47)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 48);
    i0.ɵɵlistener("change", function FlightsList_Conditional_9_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, FlightsList_Conditional_9_For_11_Template, 2, 2, "option", 49, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 50);
    i0.ɵɵlistener("pageChange", function FlightsList_Conditional_9_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class FlightsList {
    apiService;
    cdr;
    translate;
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    flights = [];
    isLoading = false;
    errorMessage = '';
    statusUpdatingId = null;
    deletingId = null;
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
    constructor(apiService, cdr, translate) {
        this.apiService = apiService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() {
        this.loadFlights();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadFlights();
        }
    }
    loadFlights() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService.get(`Flights/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(catchError(() => {
            this.errorMessage = 'flightServiceUnavailable';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.flights ?? pageData;
            this.flights = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.flights.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadFlights();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadFlights();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadFlights();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadFlights();
        }
    }
    flightClassKey(value) {
        return FLIGHT_CLASS_OPTIONS.find((option) => option.value === Number(value))?.labelKey ?? '';
    }
    async toggleFlightStatus(flight) {
        if (this.statusUpdatingId !== null)
            return;
        const result = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(flight.isActive === false ? 'confirmActivateFlight' : 'confirmDeactivateFlight'),
            icon: 'warning', showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'), cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: flight.isActive === false ? '#059669' : '#e11d48', reverseButtons: true,
        });
        if (!result.isConfirmed)
            return;
        this.statusUpdatingId = Number(flight.id);
        this.apiService.patch(`Flights/${flight.id}/ChangeStatus`, {}).pipe(catchError(() => { Swal.fire({ icon: 'error', title: this.translate.instant('statusUpdateError') }); return of(null); }), finalize(() => { this.statusUpdatingId = null; this.cdr.markForCheck(); })).subscribe((response) => {
            if (response?.isSuccess === false || response === null)
                return;
            flight.isActive = flight.isActive === false;
            this.cdr.markForCheck();
        });
    }
    async deleteFlight(flight) {
        if (this.deletingId !== null)
            return;
        const result = await Swal.fire({ title: this.translate.instant('confirmDeleteRecord'), text: this.translate.instant('recordDeleteWarning'), icon: 'warning', showCancelButton: true, confirmButtonText: this.translate.instant('delete'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true });
        if (!result.isConfirmed)
            return;
        this.deletingId = Number(flight.id);
        this.apiService.deleteRequest(`Flights/${flight.id}`).pipe(catchError(() => { Swal.fire({ icon: 'error', title: this.translate.instant('recordDeleteError') }); return of(null); }), finalize(() => { this.deletingId = null; this.cdr.markForCheck(); })).subscribe((response) => { if (response?.isSuccess === false || response === null)
            return; this.loadFlights(); });
    }
    static ɵfac = function FlightsList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || FlightsList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FlightsList, selectors: [["app-configurations-flights-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 6, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "gap-4", "overflow-y-auto", "pe-1", "md:grid-cols-2"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "grid", "grid-cols-[100px_1fr_1fr_120px_80px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[100px_1fr_1fr_120px_80px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-2xl", "border"], [1, "space-y-3", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "px-4", "py-3", "font-semibold"], [1, "mdi", "mdi-arrow-right"], [1, "rounded-full", "bg-slate-100", "px-2", "py-0.5", "text-xs", "font-semibold"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "items-center", "rounded-full", 3, "click", "disabled"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform"], [1, "flex", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-rose-300", "text-rose-600", "hover:bg-rose-600", "hover:text-white"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-rose-300", "text-rose-600", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "mdi", "mdi-delete-outline"], ["colspan", "9", 1, "p-8", "text-center", "text-slate-500"], [1, "text-sm", "text-slate-500"], [1, "p-4"], [1, "flex", "items-center", "justify-between"], [1, "font-semibold"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "mt-2", "text-sm", "font-medium"], [1, "mt-2", "text-sm"], [1, "mt-4", "flex", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], ["type", "button", 1, "rounded-full", "border", "px-3", "py-1", "text-xs", "font-semibold", 3, "click"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function FlightsList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, FlightsList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, FlightsList_Conditional_6_Template, 2, 1)(7, FlightsList_Conditional_7_Template, 35, 28, "div", 4)(8, FlightsList_Conditional_8_Template, 4, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, FlightsList_Conditional_9_Template, 13, 11, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "flightRecords"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 6 : ctx.viewMode === "table" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 9 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FlightsList, [{
        type: Component,
        args: [{ selector: 'app-configurations-flights-list', standalone: true, imports: [TranslatePipe, DatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n  <div class=\"mb-4 flex items-center justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ 'flightRecords' | translate }}</h2>\n  </div>\n\r\n  @if (isLoading)\r\n  {\r\n  @if (viewMode === 'table') {\r\n  <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\r\n    <div class=\"grid grid-cols-[100px_1fr_1fr_120px_80px_120px] gap-4 bg-slate-50 px-4 py-3\">\r\n      @for (column of [1,2,3,4,5,6];track column)\r\n      {\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\r\n    </div>\r\n    @for (row of [1,2,3,4,5];track row)\r\n    { <div class=\"grid grid-cols-[100px_1fr_1fr_120px_80px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n    </div> }\r\n  </div>\r\n  }\r\n  @else {\r\n  <div class=\"grid gap-4 md:grid-cols-2\">@for (card of [1,2,3,4]; track card) { <div class=\"overflow-hidden rounded-2xl border\">\r\n      <div class=\"space-y-3 p-4\">\r\n        <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n      </div>\r\n    </div> }</div>\r\n  }\r\n  }\r\n  @else if (viewMode === 'table') {\r\n  <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n    <table class=\"min-w-full text-left text-sm\">\n      <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\n        <tr>\r\n          <th class=\"px-4 py-3\">{{ 'flightNumber' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'airline' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'route' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'departureTime' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'price' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'availableSeats' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'flightClass' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        @for (item of flights; track item.id) { <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\r\n          <td class=\"px-4 py-3 font-semibold\">{{ item.flightNumber }}</td>\r\n          <td class=\"px-4 py-3\">{{ item.airlineName ?? item.airline?.name }}</td>\n          <td class=\"px-4 py-3\">{{ item.departureAirport }} <i class=\"mdi mdi-arrow-right\"></i> {{ item.arrivalAirport }}</td>\r\n          <td class=\"px-4 py-3\">{{ item.departureTime | date: 'short' }}</td>\r\n          <td class=\"px-4 py-3\">{{ item.price }}</td>\r\n          <td class=\"px-4 py-3\">{{ item.availableSeats }}</td>\r\n          <td class=\"px-4 py-3\"><span class=\"rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold\">{{ flightClassKey(item.flightClass) | translate }}</span></td>\n          <td class=\"px-4 py-3\"><button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"item.isActive !== false\" class=\"relative inline-flex h-6 w-11 items-center rounded-full\" [class.bg-emerald-500]=\"item.isActive !== false\" [class.bg-slate-300]=\"item.isActive === false\" (click)=\"toggleFlightStatus(item)\"><span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform\" [class.translate-x-6]=\"item.isActive !== false\" [class.translate-x-1]=\"item.isActive === false\"></span></button></td>\n          <td class=\"px-4 py-3\">\r\n            <div class=\"flex gap-2\">\r\n              <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer\" (click)=\"editRequested.emit(item)\"><i class=\"mdi mdi-pencil-outline\"></i></button>\n              @if (item.isActive === false) { <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white\" (click)=\"deleteFlight(item)\"><i class=\"mdi mdi-delete-outline\"></i></button> }\n            </div>\r\n          </td>\r\n        </tr> } @empty { <tr>\r\n          <td colspan=\"9\" class=\"p-8 text-center text-slate-500\">{{ 'noFlightsFound' | translate }}</td>\n        </tr> }\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  } @else {\r\n  <div class=\"grid max-h-[70vh] gap-4 overflow-y-auto pe-1 md:grid-cols-2\">@for (item of flights; track item.id) { <article class=\"overflow-hidden rounded-2xl border\">\n      <div class=\"p-4\">\r\n        <div class=\"flex items-center justify-between\">\r\n          <h3 class=\"font-semibold\">{{ item.flightNumber }}</h3>\r\n          <span class=\"rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold\">{{ flightClassKey(item.flightClass) | translate }}</span>\r\n        </div>\r\n        <p class=\"mt-1 text-sm text-slate-500\">{{ item.airlineName ?? item.airline?.name }}</p>\n        <p class=\"mt-2 text-sm font-medium\">{{ item.departureAirport }} <i class=\"mdi mdi-arrow-right\"></i> {{ item.arrivalAirport }}</p>\r\n        <p class=\"mt-1 text-sm text-slate-500\">{{ item.departureTime | date: 'short' }} - {{ item.arrivalTime | date: 'short' }}</p>\r\n        <p class=\"mt-2 text-sm\"><span class=\"font-semibold\">{{ item.price }}</span> \u00B7 {{ item.availableSeats }} {{ 'availableSeats' | translate }}</p>\r\n        <div class=\"mt-4 flex gap-2\">\n          <button type=\"button\" class=\"rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white\" (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button>\n          <button type=\"button\" class=\"rounded-full border px-3 py-1 text-xs font-semibold\" [class.border-emerald-300]=\"item.isActive === false\" [class.text-emerald-600]=\"item.isActive === false\" [class.border-rose-300]=\"item.isActive !== false\" [class.text-rose-600]=\"item.isActive !== false\" (click)=\"toggleFlightStatus(item)\">{{ (item.isActive === false ? 'activate' : 'deactivate') | translate }}</button>\n          @if (item.isActive === false) { <button type=\"button\" class=\"rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600\" (click)=\"deleteFlight(item)\">{{ 'delete' | translate }}</button> }\n        </div>\r\n      </div>\r\n    </article> } @empty { <p class=\"text-sm text-slate-500\">{{ 'noFlightsFound' | translate }}</p> }</div>\r\n  }\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n      <div class=\"flex flex-wrap items-center gap-2\">\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\n      </div>\n    </div>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FlightsList, { className: "FlightsList", filePath: "app/features/configurations/flights/flights-list/flights-list.ts", lineNumber: 34 }); })();
