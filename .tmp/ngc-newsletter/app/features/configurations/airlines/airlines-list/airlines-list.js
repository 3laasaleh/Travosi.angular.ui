import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@ngx-translate/core";
const _c0 = () => [1, 2, 3, 4, 5];
const _c1 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function AirlinesList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function AirlinesList_Conditional_6_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function AirlinesList_Conditional_6_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12)(2, "div", 10)(3, "div", 10)(4, "div", 13);
    i0.ɵɵelementEnd();
} }
function AirlinesList_Conditional_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 9);
    i0.ɵɵrepeaterCreate(2, AirlinesList_Conditional_6_Conditional_0_For_3_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, AirlinesList_Conditional_6_Conditional_0_For_5_Template, 5, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c0));
} }
function AirlinesList_Conditional_6_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 15);
    i0.ɵɵelement(2, "div", 16)(3, "div", 17)(4, "div", 13);
    i0.ɵɵelementEnd()();
} }
function AirlinesList_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, AirlinesList_Conditional_6_Conditional_1_For_2_Template, 5, 0, "div", 14, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function AirlinesList_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, AirlinesList_Conditional_6_Conditional_0_Template, 6, 2, "div", 7)(1, AirlinesList_Conditional_6_Conditional_1_Template, 3, 1, "div", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function AirlinesList_Conditional_7_For_21_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 22);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", item_r3.name);
} }
function AirlinesList_Conditional_7_For_21_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵelementEnd();
} }
function AirlinesList_Conditional_7_For_21_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 27);
} }
function AirlinesList_Conditional_7_For_21_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 33);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("translate-x-6", item_r3.isActive !== false)("translate-x-1", item_r3.isActive === false);
} }
function AirlinesList_Conditional_7_For_21_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵlistener("click", function AirlinesList_Conditional_7_For_21_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementEnd();
} }
function AirlinesList_Conditional_7_For_21_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function AirlinesList_Conditional_7_For_21_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteAirline(item_r3)); });
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelementEnd();
} }
function AirlinesList_Conditional_7_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 21)(1, "td", 20);
    i0.ɵɵconditionalCreate(2, AirlinesList_Conditional_7_For_21_Conditional_2_Template, 1, 2, "img", 22)(3, AirlinesList_Conditional_7_For_21_Conditional_3_Template, 2, 0, "div", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 20)(7, "span", 25);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td", 20)(10, "button", 26);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵlistener("click", function AirlinesList_Conditional_7_For_21_Template_button_click_10_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleAirlineStatus(item_r3)); });
    i0.ɵɵconditionalCreate(12, AirlinesList_Conditional_7_For_21_Conditional_12_Template, 1, 0, "i", 27)(13, AirlinesList_Conditional_7_For_21_Conditional_13_Template, 1, 4, "span", 28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td", 20)(15, "div", 29);
    i0.ɵɵconditionalCreate(16, AirlinesList_Conditional_7_For_21_Conditional_16_Template, 2, 0, "button", 30);
    i0.ɵɵconditionalCreate(17, AirlinesList_Conditional_7_For_21_Conditional_17_Template, 2, 0, "button", 31);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.logoUrl(item_r3)) ? 2 : 3, tmp_11_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.code);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", item_r3.isActive !== false)("bg-slate-300", item_r3.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", item_r3.isActive !== false)("aria-label", i0.ɵɵpipeBind1(11, 13, item_r3.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === item_r3.id ? 12 : 13);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(item_r3.isActive === false ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r3.isActive === false ? 17 : -1);
} }
function AirlinesList_Conditional_7_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 38);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noAirlinesFound"));
} }
function AirlinesList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "table", 18)(2, "thead", 19)(3, "tr")(4, "th", 20);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 20);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 20);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 20);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 20);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, AirlinesList_Conditional_7_For_21_Template, 18, 15, "tr", 21, _forTrack0, false, AirlinesList_Conditional_7_ForEmpty_22_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, "logo"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "airlineName"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 10, "airlineCode"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 12, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 14, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.airlines);
} }
function AirlinesList_Conditional_8_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 22);
} if (rf & 2) {
    const item_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", item_r7.name);
} }
function AirlinesList_Conditional_8_For_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵelementEnd();
} }
function AirlinesList_Conditional_8_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 27);
} }
function AirlinesList_Conditional_8_For_2_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 33);
} if (rf & 2) {
    const item_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("translate-x-6", item_r7.isActive !== false)("translate-x-1", item_r7.isActive === false);
} }
function AirlinesList_Conditional_8_For_2_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵlistener("click", function AirlinesList_Conditional_8_For_2_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const item_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "edit"));
} }
function AirlinesList_Conditional_8_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function AirlinesList_Conditional_8_For_2_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const item_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteAirline(item_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "delete"));
} }
function AirlinesList_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 14)(1, "div", 40)(2, "div", 41);
    i0.ɵɵconditionalCreate(3, AirlinesList_Conditional_8_For_2_Conditional_3_Template, 1, 2, "img", 22)(4, AirlinesList_Conditional_8_For_2_Conditional_4_Template, 2, 0, "div", 23);
    i0.ɵɵelementStart(5, "div")(6, "h3", 42);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 25);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "div", 43)(11, "button", 26);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵlistener("click", function AirlinesList_Conditional_8_For_2_Template_button_click_11_listener() { const item_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleAirlineStatus(item_r7)); });
    i0.ɵɵconditionalCreate(13, AirlinesList_Conditional_8_For_2_Conditional_13_Template, 1, 0, "i", 27)(14, AirlinesList_Conditional_8_For_2_Conditional_14_Template, 1, 4, "span", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(15, AirlinesList_Conditional_8_For_2_Conditional_15_Template, 3, 3, "button", 44);
    i0.ɵɵconditionalCreate(16, AirlinesList_Conditional_8_For_2_Conditional_16_Template, 3, 3, "button", 45);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.logoUrl(item_r7)) ? 3 : 4, tmp_11_0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7.code);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", item_r7.isActive !== false)("bg-slate-300", item_r7.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", item_r7.isActive !== false)("aria-label", i0.ɵɵpipeBind1(12, 13, item_r7.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === item_r7.id ? 13 : 14);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r7.isActive === false ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r7.isActive === false ? 16 : -1);
} }
function AirlinesList_Conditional_8_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noAirlinesFound"));
} }
function AirlinesList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, AirlinesList_Conditional_8_For_2_Template, 17, 15, "article", 14, _forTrack0, false, AirlinesList_Conditional_8_ForEmpty_3_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.airlines);
} }
function AirlinesList_Conditional_9_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 52);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r11);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r11);
} }
function AirlinesList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 48);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 49)(5, "label", 50)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 51);
    i0.ɵɵlistener("change", function AirlinesList_Conditional_9_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, AirlinesList_Conditional_9_For_11_Template, 2, 2, "option", 52, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 53);
    i0.ɵɵlistener("pageChange", function AirlinesList_Conditional_9_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class AirlinesList {
    apiService;
    cdr;
    translate;
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    airlines = [];
    isLoading = false;
    statusUpdatingId = null;
    deletingId = null;
    errorMessage = '';
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
    constructor(apiService, cdr, translate) {
        this.apiService = apiService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() {
        this.loadAirlines();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadAirlines();
        }
    }
    loadAirlines() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService.get(`Airlines/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(catchError(() => {
            this.errorMessage = 'airlineServiceUnavailable';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.airlines ?? pageData;
            this.airlines = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.airlines.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadAirlines();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadAirlines();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadAirlines();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadAirlines();
        }
    }
    async toggleAirlineStatus(airline) {
        if (this.statusUpdatingId !== null)
            return;
        const airlineId = Number(airline?.id);
        if (!Number.isInteger(airlineId) || airlineId <= 0)
            return;
        const isActive = airline?.isActive !== false;
        const confirmation = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(isActive ? 'confirmDeactivateAirline' : 'confirmActivateAirline'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: isActive ? '#e11d48' : '#059669',
            reverseButtons: true,
        });
        if (!confirmation.isConfirmed)
            return;
        this.statusUpdatingId = airlineId;
        this.apiService.patch(`Airlines/${airlineId}/ChangeStatus`, {}).pipe(catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('airlineStatusUpdateError') });
            return of({ statusToggleFailed: true });
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response?.statusToggleFailed || response?.isSuccess === false) {
                if (response?.isSuccess === false) {
                    Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('airlineStatusUpdateError') });
                }
                return;
            }
            airline.isActive = !isActive;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.translate.instant('airlineStatusUpdated'),
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
            });
            this.cdr.markForCheck();
        });
    }
    logoUrl(airline) {
        const url = String(airline?.logoUrl ?? '');
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    async deleteAirline(airline) {
        if (this.deletingId !== null)
            return;
        const result = await Swal.fire({ title: this.translate.instant('confirmDeleteRecord'), text: this.translate.instant('recordDeleteWarning'), icon: 'warning', showCancelButton: true, confirmButtonText: this.translate.instant('delete'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true });
        if (!result.isConfirmed)
            return;
        this.deletingId = Number(airline.id);
        this.apiService.deleteRequest(`Airlines/${airline.id}`).pipe(catchError(() => { Swal.fire({ icon: 'error', title: this.translate.instant('recordDeleteError') }); return of(null); }), finalize(() => { this.deletingId = null; this.cdr.markForCheck(); })).subscribe((response) => { if (response?.isSuccess === false || response === null)
            return; this.loadAirlines(); });
    }
    static ɵfac = function AirlinesList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || AirlinesList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AirlinesList, selectors: [["app-configurations-airlines-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 6, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "gap-4", "overflow-y-auto", "pe-1", "md:grid-cols-2"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "grid", "grid-cols-[80px_1fr_100px_100px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[80px_1fr_100px_100px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-12", "w-20", "animate-pulse", "rounded-lg", "bg-slate-200"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-2xl", "border"], [1, "space-y-3", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "h-12", "w-20", "rounded-lg", "object-contain", 3, "src", "alt"], [1, "grid", "h-12", "w-20", "place-items-center", "rounded-lg", "bg-slate-100"], [1, "px-4", "py-3", "font-semibold"], [1, "rounded-full", "bg-slate-100", "px-2", "py-0.5", "text-xs", "font-semibold"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "cursor-pointer", "items-center", "rounded-full", "transition-colors", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi", "mdi-loading", "mdi-spin", "mx-auto", "text-sm", "text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", 3, "translate-x-6", "translate-x-1"], [1, "flex", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-rose-300", "text-rose-600", "hover:bg-rose-600", "hover:text-white"], [1, "mdi", "mdi-image-off-outline"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-rose-300", "text-rose-600", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "mdi", "mdi-delete-outline"], ["colspan", "5", 1, "p-8", "text-center", "text-slate-500"], [1, "text-sm", "text-slate-500"], [1, "p-4"], [1, "flex", "items-center", "gap-3"], [1, "font-semibold"], [1, "mt-4", "flex", "items-center", "justify-between", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function AirlinesList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, AirlinesList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, AirlinesList_Conditional_6_Template, 2, 1)(7, AirlinesList_Conditional_7_Template, 23, 16, "div", 4)(8, AirlinesList_Conditional_8_Template, 4, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, AirlinesList_Conditional_9_Template, 13, 11, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "airlineRecords"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 6 : ctx.viewMode === "table" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 9 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AirlinesList, [{
        type: Component,
        args: [{ selector: 'app-configurations-airlines-list', standalone: true, imports: [TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n  <div class=\"mb-4 flex items-center justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ 'airlineRecords' | translate }}</h2>\n  </div>\n\r\n  @if (isLoading)\r\n  {\r\n  @if (viewMode === 'table') {\r\n  <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\r\n    <div class=\"grid grid-cols-[80px_1fr_100px_100px_120px] gap-4 bg-slate-50 px-4 py-3\">\n      @for (column of [1,2,3,4,5];track column)\n      {\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\r\n    </div>\r\n    @for (row of [1,2,3,4,5];track row)\r\n    { <div class=\"grid grid-cols-[80px_1fr_100px_100px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\n      <div class=\"h-12 w-20 animate-pulse rounded-lg bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n    </div> }\r\n  </div>\r\n  }\r\n  @else {\r\n  <div class=\"grid gap-4 md:grid-cols-2\">@for (card of [1,2,3,4]; track card) { <div class=\"overflow-hidden rounded-2xl border\">\r\n      <div class=\"space-y-3 p-4\">\r\n        <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n      </div>\r\n    </div> }</div>\r\n  }\r\n  }\r\n  @else if (viewMode === 'table') {\r\n  <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n    <table class=\"min-w-full text-left text-sm\">\n      <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\n        <tr>\r\n          <th class=\"px-4 py-3\">{{ 'logo' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'airlineName' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'airlineCode' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        @for (item of airlines; track item.id) { <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\r\n          <td class=\"px-4 py-3\">\r\n            @if (logoUrl(item); as logo) { <img [src]=\"logo\" [alt]=\"item.name\" class=\"h-12 w-20 rounded-lg object-contain\" /> }\n            @else { <div class=\"grid h-12 w-20 place-items-center rounded-lg bg-slate-100\"><i class=\"mdi mdi-image-off-outline\"></i></div> }\r\n          </td>\r\n          <td class=\"px-4 py-3 font-semibold\">{{ item.name }}</td>\r\n          <td class=\"px-4 py-3\"><span class=\"rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold\">{{ item.code }}</span></td>\n          <td class=\"px-4 py-3\"><button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"item.isActive !== false\" [attr.aria-label]=\"(item.isActive === false ? 'activate' : 'deactivate') | translate\" class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60\" [class.bg-emerald-500]=\"item.isActive !== false\" [class.bg-slate-300]=\"item.isActive === false\" (click)=\"toggleAirlineStatus(item)\">@if (statusUpdatingId === item.id) { <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\"></i> } @else { <span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform\" [class.translate-x-6]=\"item.isActive !== false\" [class.translate-x-1]=\"item.isActive === false\"></span> }</button></td>\n          <td class=\"px-4 py-3\">\n            <div class=\"flex gap-2\">\n              @if (item.isActive === false) { <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer\" (click)=\"editRequested.emit(item)\"><i class=\"mdi mdi-pencil-outline\"></i></button> }\n              @if (item.isActive === false) { <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white\" (click)=\"deleteAirline(item)\"><i class=\"mdi mdi-delete-outline\"></i></button> }\n            </div>\r\n          </td>\r\n        </tr> } @empty { <tr>\r\n          <td colspan=\"5\" class=\"p-8 text-center text-slate-500\">{{ 'noAirlinesFound' | translate }}</td>\n        </tr> }\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  } @else {\r\n  <div class=\"grid max-h-[70vh] gap-4 overflow-y-auto pe-1 md:grid-cols-2\">@for (item of airlines; track item.id) { <article class=\"overflow-hidden rounded-2xl border\">\n      <div class=\"p-4\">\r\n        <div class=\"flex items-center gap-3\">\r\n          @if (logoUrl(item); as logo) { <img [src]=\"logo\" [alt]=\"item.name\" class=\"h-12 w-20 rounded-lg object-contain\" /> }\n          @else { <div class=\"grid h-12 w-20 place-items-center rounded-lg bg-slate-100\"><i class=\"mdi mdi-image-off-outline\"></i></div> }\r\n          <div>\r\n            <h3 class=\"font-semibold\">{{ item.name }}</h3>\r\n            <span class=\"rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold\">{{ item.code }}</span>\r\n          </div>\r\n        </div>\r\n        <div class=\"mt-4 flex items-center justify-between gap-2\">\n          <button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"item.isActive !== false\" [attr.aria-label]=\"(item.isActive === false ? 'activate' : 'deactivate') | translate\" class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60\" [class.bg-emerald-500]=\"item.isActive !== false\" [class.bg-slate-300]=\"item.isActive === false\" (click)=\"toggleAirlineStatus(item)\">@if (statusUpdatingId === item.id) { <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\"></i> } @else { <span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform\" [class.translate-x-6]=\"item.isActive !== false\" [class.translate-x-1]=\"item.isActive === false\"></span> }</button>\n          @if (item.isActive === false) { <button type=\"button\" class=\"rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white\" (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button> }\n          @if (item.isActive === false) { <button type=\"button\" class=\"rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600\" (click)=\"deleteAirline(item)\">{{ 'delete' | translate }}</button> }\n        </div>\r\n      </div>\r\n    </article> } @empty { <p class=\"text-sm text-slate-500\">{{ 'noAirlinesFound' | translate }}</p> }</div>\r\n  }\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n      <div class=\"flex flex-wrap items-center gap-2\">\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\n      </div>\n    </div>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AirlinesList, { className: "AirlinesList", filePath: "app/features/configurations/airlines/airlines-list/airlines-list.ts", lineNumber: 33 }); })();
