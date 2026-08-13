import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
import * as i1 from "../../admin.service";
import * as i2 from "@ngx-translate/core";
const _c0 = () => [1, 2, 3, 4, 5, 6];
const _c1 = () => [1, 2, 3, 4, 5];
const _c2 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function ToursList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function ToursList_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function ToursList_Conditional_7_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 11);
} }
function ToursList_Conditional_7_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 13)(2, "div", 11)(3, "div", 11)(4, "div", 14)(5, "div", 14)(6, "div", 15);
    i0.ɵɵelementEnd();
} }
function ToursList_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 10);
    i0.ɵɵrepeaterCreate(2, ToursList_Conditional_7_Conditional_0_For_3_Template, 1, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, ToursList_Conditional_7_Conditional_0_For_5_Template, 7, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c1));
} }
function ToursList_Conditional_7_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "div", 17);
    i0.ɵɵelementStart(2, "div", 18);
    i0.ɵɵelement(3, "div", 19)(4, "div", 20)(5, "div", 21)(6, "div", 14);
    i0.ɵɵelementEnd()();
} }
function ToursList_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵrepeaterCreate(1, ToursList_Conditional_7_Conditional_1_For_2_Template, 7, 0, "div", 16, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c2));
} }
function ToursList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, ToursList_Conditional_7_Conditional_0_Template, 6, 2, "div", 8)(1, ToursList_Conditional_7_Conditional_1_Template, 3, 1, "div", 9);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function ToursList_Conditional_8_For_27_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 26);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", item_r3.titleEng);
} }
function ToursList_Conditional_8_For_27_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelement(1, "i", 39);
    i0.ɵɵelementEnd();
} }
function ToursList_Conditional_8_For_27_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 33);
} }
function ToursList_Conditional_8_For_27_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 40);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("translate-x-6", item_r3.isActive !== false)("translate-x-1", item_r3.isActive === false);
} }
function ToursList_Conditional_8_For_27_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function ToursList_Conditional_8_For_27_Conditional_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(2, "i", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 1, "edit"));
} }
function ToursList_Conditional_8_For_27_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 25)(1, "td", 24);
    i0.ɵɵconditionalCreate(2, ToursList_Conditional_8_For_27_Conditional_2_Template, 1, 2, "img", 26)(3, ToursList_Conditional_8_For_27_Conditional_3_Template, 2, 0, "div", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 28);
    i0.ɵɵtext(5);
    i0.ɵɵelementStart(6, "p", 29);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 30);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 24);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 31);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 24)(15, "button", 32);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵlistener("click", function ToursList_Conditional_8_For_27_Template_button_click_15_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleTourStatus(item_r3)); });
    i0.ɵɵconditionalCreate(17, ToursList_Conditional_8_For_27_Conditional_17_Template, 1, 0, "i", 33)(18, ToursList_Conditional_8_For_27_Conditional_18_Template, 1, 4, "span", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td", 24)(20, "div", 35)(21, "button", 36);
    i0.ɵɵpipe(22, "translate");
    i0.ɵɵlistener("click", function ToursList_Conditional_8_For_27_Template_button_click_21_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previewRequested.emit(item_r3)); });
    i0.ɵɵelement(23, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(24, ToursList_Conditional_8_For_27_Conditional_24_Template, 3, 3, "button", 38);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.getImages(item_r3)[0]) ? 2 : 3, tmp_11_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.titleEng ?? item_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.destinationName(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.titleAr);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.tourDuration(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.tourPrice(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", item_r3.isActive !== false)("bg-slate-300", item_r3.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", item_r3.isActive !== false)("aria-label", i0.ɵɵpipeBind1(16, 16, item_r3.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === item_r3.id ? 17 : 18);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(22, 18, "view"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(item_r3.isActive === false ? 24 : -1);
} }
function ToursList_Conditional_8_ForEmpty_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 43);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noToursFound"));
} }
function ToursList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "table", 22)(2, "thead", 23)(3, "tr")(4, "th", 24);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 24);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 24);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 24);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 24);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 24);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "th", 24);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "tbody");
    i0.ɵɵrepeaterCreate(26, ToursList_Conditional_8_For_27_Template, 25, 20, "tr", 25, _forTrack0, false, ToursList_Conditional_8_ForEmpty_28_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 8, "image"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 10, "englishTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 12, "arabicTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 14, "duration"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 16, "price"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 18, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 20, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.tours);
} }
function ToursList_Conditional_9_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 45);
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", item_r6.titleEng);
} }
function ToursList_Conditional_9_For_2_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 58);
    i0.ɵɵlistener("click", function ToursList_Conditional_9_For_2_Conditional_24_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const item_r6 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "edit"));
} }
function ToursList_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 16);
    i0.ɵɵconditionalCreate(1, ToursList_Conditional_9_For_2_Conditional_1_Template, 1, 2, "img", 45);
    i0.ɵɵelementStart(2, "div", 46)(3, "h3", 47);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 48);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 49)(8, "span", 50);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 51);
    i0.ɵɵtext(11, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 52);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 51);
    i0.ɵɵtext(15, "\u00B7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 53);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "p", 54);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 55)(21, "button", 56);
    i0.ɵɵlistener("click", function ToursList_Conditional_9_For_2_Template_button_click_21_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previewRequested.emit(item_r6)); });
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(24, ToursList_Conditional_9_For_2_Conditional_24_Template, 3, 3, "button", 57);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.getImages(item_r6)[0]) ? 1 : -1, tmp_11_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r6.titleEng ?? item_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.titleAr);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.destinationName(item_r6));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.tourDuration(item_r6));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.tourPrice(item_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.description ?? item_r6.overview);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 9, "view"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r6.isActive === false ? 24 : -1);
} }
function ToursList_Conditional_9_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 44);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noToursFound"));
} }
function ToursList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, ToursList_Conditional_9_For_2_Template, 25, 11, "article", 16, _forTrack0, false, ToursList_Conditional_9_ForEmpty_3_Template, 3, 3, "p", 44);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.tours);
} }
function ToursList_Conditional_10_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r9);
} }
function ToursList_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 59);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 60)(5, "label", 61)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 62);
    i0.ɵɵlistener("change", function ToursList_Conditional_10_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, ToursList_Conditional_10_For_11_Template, 2, 2, "option", 63, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 64);
    i0.ɵɵlistener("pageChange", function ToursList_Conditional_10_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class ToursList {
    adminService;
    cdr;
    translate;
    pageSizeOptions = [10, 20, 50];
    currencies = [
        { id: 2, code: 'USD' },
        { id: 1, code: 'EGP' },
    ];
    viewMode = 'table';
    refreshToken = 0;
    previewRequested = new EventEmitter();
    editRequested = new EventEmitter();
    tours = [];
    isLoading = false;
    statusUpdatingId = null;
    errorMessage = '';
    successMessage = '';
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
    constructor(adminService, cdr, translate) {
        this.adminService = adminService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() {
        this.loadTours();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadTours();
        }
    }
    loadTours() {
        this.isLoading = true;
        this.errorMessage = '';
        this.adminService.getTours(this.paginationInfo.page, this.paginationInfo.pageSize).pipe(catchError(() => {
            this.errorMessage = 'toursLoadError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.tours ?? pageData;
            this.tours = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.tours.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadTours();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadTours();
    }
    async toggleTourStatus(tour) {
        if (this.statusUpdatingId !== null)
            return;
        const currentlyActive = tour?.isActive !== false;
        const nextStatus = !currentlyActive;
        const confirmation = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(currentlyActive ? 'confirmDeactivateTour' : 'confirmActivateTour'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: currentlyActive ? '#e11d48' : '#059669',
            reverseButtons: true,
        });
        if (!confirmation.isConfirmed)
            return;
        const tourId = Number(tour?.id ?? tour?.tourId);
        if (!Number.isInteger(tourId) || tourId <= 0)
            return;
        this.statusUpdatingId = tourId;
        this.adminService.changeTourStatus(tourId, nextStatus).pipe(catchError(() => {
            Swal.fire({
                icon: 'error',
                title: this.translate.instant('tourStatusUpdateError'),
            });
            return of({ statusToggleFailed: true });
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response?.statusToggleFailed)
                return;
            if (response?.isSuccess === false) {
                Swal.fire({
                    icon: 'error',
                    title: response?.message || this.translate.instant('tourStatusUpdateError'),
                });
                return;
            }
            tour.isActive = nextStatus;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.translate.instant('tourStatusUpdated'),
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
            });
            this.cdr.markForCheck();
        });
    }
    destinationName(tour) {
        return (tour?.destination?.nameEng ??
            tour?.destinationName ??
            this.translate.instant('destinationNumber', { id: tour?.destinationId ?? '-' }));
    }
    tourDuration(tour) {
        const days = Number(tour?.durationDays ?? 0);
        const hours = Number(tour?.durationhours ?? tour?.durationHours ?? 0);
        return this.translate.instant('durationDaysHours', { days, hours });
    }
    tourPrice(tour) {
        const currency = this.currencies.find((item) => item.id === Number(tour?.currencyId));
        const currencyCode = String(currency?.code ?? '').toUpperCase();
        const suffix = currencyCode === 'USD' ? '$' : currencyCode;
        return `${tour?.pricePerPerson ?? tour?.price ?? 0} ${suffix}`.trim();
    }
    getImages(tour) {
        const cover = tour?.coverImageUrl ?? tour?.imageUrl;
        const images = Array.isArray(tour?.images) ? tour.images : [];
        if (!cover)
            return images;
        const coverIndex = images.findIndex((image) => this.imageMatchesCover(image, cover));
        if (coverIndex < 0)
            return [{ url: cover }, ...images];
        return [images[coverIndex], ...images.filter((_, index) => index !== coverIndex)];
    }
    imageUrl(image) {
        const url = typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? '');
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    imageMatchesCover(image, cover) {
        return this.normalizeImagePath(this.imageUrl(image)) === this.normalizeImagePath(cover);
    }
    normalizeImagePath(url) {
        return String(url ?? '')
            .trim()
            .replace(/\\/g, '/')
            .replace(/^https?:\/\/[^/]+\/images\//i, '')
            .replace(/^\/+/, '')
            .replace(/^images\//i, '')
            .toLowerCase();
    }
    static ɵfac = function ToursList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || ToursList)(i0.ɵɵdirectiveInject(i1.AdminService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToursList, selectors: [["app-configurations-tours-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { previewRequested: "previewRequested", editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 11, vars: 7, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]", "gap-3", "overflow-y-auto", "pe-1"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]", "gap-3"], [1, "grid", "grid-cols-[80px_1fr_1fr_100px_100px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[80px_1fr_1fr_100px_100px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-12", "w-20", "animate-pulse", "rounded-lg", "bg-slate-200"], [1, "h-7", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-xl", "border"], [1, "h-32", "animate-pulse", "bg-slate-200"], [1, "space-y-2", "p-3"], [1, "h-4", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-3", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "h-12", "w-20", "rounded-lg", "object-cover", 3, "src", "alt"], [1, "grid", "h-12", "w-20", "place-items-center", "rounded-lg", "bg-slate-100"], [1, "px-4", "py-3", "font-semibold"], [1, "text-xs", "font-normal", "text-slate-500"], ["dir", "rtl", 1, "px-4", "py-3"], [1, "px-4", "py-3", "font-semibold", "text-primary"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "cursor-pointer", "items-center", "rounded-full", "transition-colors", "duration-200", "focus:outline-none", "focus:ring-2", "focus:ring-emerald-500/30", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin", "mx-auto", "text-sm", "text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200", 3, "translate-x-6", "translate-x-1"], [1, "flex", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-primary/40", "text-primary", "transition-colors", "duration-200", "hover:border-primary", "hover:bg-primary", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-eye-outline"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer"], [1, "mdi", "mdi-image-off-outline"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["colspan", "7", 1, "p-8", "text-center", "text-slate-500"], [1, "text-sm", "text-slate-500"], [1, "h-32", "w-full", "object-cover", 3, "src", "alt"], [1, "p-3"], [1, "text-sm", "font-semibold", "text-slate-950"], ["dir", "rtl", 1, "text-xs", "text-slate-500"], [1, "mt-1", "flex", "flex-wrap", "items-center", "gap-1", "text-xs"], [1, "font-medium", "text-slate-950"], [1, "text-slate-300"], [1, "font-semibold", "text-red-600"], [1, "font-semibold", "text-primary"], [1, "mt-2", "line-clamp-2", "text-xs", "leading-5"], [1, "mt-3", "flex", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-primary/40", "px-2.5", "py-1", "text-xs", "font-semibold", "text-primary", "transition-colors", "duration-200", "hover:border-primary", "hover:bg-primary", "hover:text-white", 3, "click"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-2.5", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-2.5", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function ToursList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, ToursList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, ToursList_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, ToursList_Conditional_7_Template, 2, 1)(8, ToursList_Conditional_8_Template, 29, 22, "div", 5)(9, ToursList_Conditional_9_Template, 4, 1, "div", 6);
            i0.ɵɵconditionalCreate(10, ToursList_Conditional_10_Template, 13, 11, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 5, "tourList"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 7 : ctx.viewMode === "table" ? 8 : 9);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 10 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToursList, [{
        type: Component,
        args: [{ selector: 'app-configurations-tours-list', standalone: true, imports: [TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\r\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\r\n  <div class=\"mb-4 flex items-center justify-between\">\r\n    <h2 class=\"text-xl font-semibold\">{{ 'tourList' | translate }}</h2>\r\n  </div>\r\n\r\n  <!-- skeleton -->\r\n  @if (isLoading) {\r\n    @if (viewMode === 'table') {\r\n      <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\r\n        <div class=\"grid grid-cols-[80px_1fr_1fr_100px_100px_120px] gap-4 bg-slate-50 px-4 py-3\">\r\n          @for (column of [1,2,3,4,5,6]; track column) { <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\r\n        </div>\r\n        @for (row of [1,2,3,4,5]; track row) {\r\n          <div class=\"grid grid-cols-[80px_1fr_1fr_100px_100px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\r\n            <div class=\"h-12 w-20 animate-pulse rounded-lg bg-slate-200\"></div>\r\n            <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n            <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n            <div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div>\r\n            <div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div>\r\n            <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n          </div>\r\n        }\r\n      </div>\r\n    } @else {\r\n      <div class=\"grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3\">\r\n        @for (card of [1,2,3,4]; track card) {\r\n          <div class=\"overflow-hidden rounded-xl border\">\r\n            <div class=\"h-32 animate-pulse bg-slate-200\"></div>\r\n            <div class=\"space-y-2 p-3\">\r\n              <div class=\"h-4 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\r\n              <div class=\"h-3 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\r\n              <div class=\"h-3 animate-pulse rounded-full bg-slate-200\"></div>\r\n              <div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div>\r\n            </div>\r\n          </div>\r\n        }\r\n      </div>\r\n    }\r\n  } @else if (viewMode === 'table') {\r\n    <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\r\n      <table class=\"min-w-full text-left text-sm\">\r\n        <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\r\n          <tr>\r\n            <th class=\"px-4 py-3\">{{ 'image' | translate }}</th>\r\n            <th class=\"px-4 py-3\">{{ 'englishTitle' | translate }}</th>\r\n            <th class=\"px-4 py-3\">{{ 'arabicTitle' | translate }}</th>\r\n            <th class=\"px-4 py-3\">{{ 'duration' | translate }}</th>\r\n            <th class=\"px-4 py-3\">{{ 'price' | translate }}</th>\r\n            <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\r\n            <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          @for (item of tours; track item.id) {\r\n            <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\r\n              <td class=\"px-4 py-3\">\r\n                @if (getImages(item)[0]; as image) {\r\n                  <img [src]=\"imageUrl(image)\" [alt]=\"item.titleEng\" class=\"h-12 w-20 rounded-lg object-cover\" />\r\n                } @else {\r\n                  <div class=\"grid h-12 w-20 place-items-center rounded-lg bg-slate-100\"><i class=\"mdi mdi-image-off-outline\"></i></div>\r\n                }\r\n              </td>\r\n              <td class=\"px-4 py-3 font-semibold\">{{ item.titleEng ?? item.title }}<p class=\"text-xs font-normal text-slate-500\">{{ destinationName(item) }}</p></td>\r\n              <td class=\"px-4 py-3\" dir=\"rtl\">{{ item.titleAr }}</td>\r\n              <td class=\"px-4 py-3\">{{ tourDuration(item) }}</td>\r\n              <td class=\"px-4 py-3 font-semibold text-primary\">{{ tourPrice(item) }}</td>\r\n              <td class=\"px-4 py-3\">\r\n                <button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"item.isActive !== false\"\r\n                  [attr.aria-label]=\"(item.isActive === false ? 'activate' : 'deactivate') | translate\"\r\n                  class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60\"\r\n                  [class.bg-emerald-500]=\"item.isActive !== false\" [class.bg-slate-300]=\"item.isActive === false\"\r\n                  (click)=\"toggleTourStatus(item)\">\r\n                  @if (statusUpdatingId === item.id) {\r\n                    <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\" aria-hidden=\"true\"></i>\r\n                  } @else {\r\n                    <span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200\"\r\n                      [class.translate-x-6]=\"item.isActive !== false\" [class.translate-x-1]=\"item.isActive === false\"></span>\r\n                  }\r\n                </button>\r\n              </td>\r\n              <td class=\"px-4 py-3\">\r\n                <div class=\"flex gap-2\">\r\n                  <button type=\"button\"\r\n                    class=\"grid h-8 w-8 place-items-center rounded-full border border-primary/40 text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white cursor-pointer\"\r\n                    [attr.aria-label]=\"'view' | translate\" (click)=\"previewRequested.emit(item)\"><i class=\"mdi mdi-eye-outline\"></i></button>\r\n                  @if (item.isActive === false) {\r\n                    <button type=\"button\"\r\n                      class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer\"\r\n                      [attr.aria-label]=\"'edit' | translate\" (click)=\"editRequested.emit(item)\"><i class=\"mdi mdi-pencil-outline\"></i></button>\r\n                  }\r\n                </div>\r\n              </td>\r\n            </tr>\r\n          } @empty {\r\n            <tr><td colspan=\"7\" class=\"p-8 text-center text-slate-500\">{{ 'noToursFound' | translate }}</td></tr>\r\n          }\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  } @else {\r\n    <div class=\"grid max-h-[70vh] grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 overflow-y-auto pe-1\">\r\n      @for (item of tours; track item.id) {\r\n        <article class=\"overflow-hidden rounded-xl border\">\r\n          @if (getImages(item)[0]; as image) { <img [src]=\"imageUrl(image)\" [alt]=\"item.titleEng\" class=\"h-32 w-full object-cover\" /> }\r\n          <div class=\"p-3\">\r\n            <h3 class=\"text-sm font-semibold text-slate-950 \">{{ item.titleEng ?? item.title }}</h3>\r\n            <p dir=\"rtl\" class=\"text-xs text-slate-500\">{{ item.titleAr }}</p>\r\n            <p class=\"mt-1 flex flex-wrap items-center gap-1 text-xs\">\r\n              <span class=\"font-medium text-slate-950 \">{{ destinationName(item) }}</span>\r\n              <span class=\"text-slate-300 \">\u00B7</span>\r\n              <span class=\"font-semibold text-red-600 \">{{ tourDuration(item) }}</span>\r\n              <span class=\"text-slate-300 \">\u00B7</span>\r\n              <span class=\"font-semibold text-primary\">{{ tourPrice(item) }}</span>\r\n            </p>\r\n            <p class=\"mt-2 line-clamp-2 text-xs leading-5\">{{ item.description ?? item.overview }}</p>\r\n            <div class=\"mt-3 flex gap-2\">\r\n              <button type=\"button\" class=\"rounded-full border border-primary/40 px-2.5 py-1 text-xs font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white\"\r\n                (click)=\"previewRequested.emit(item)\">{{ 'view' | translate }}</button>\r\n              @if (item.isActive === false) {\r\n                <button type=\"button\"\r\n                  class=\"rounded-full border border-amber-300 px-2.5 py-1 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white\"\r\n                  (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button>\r\n              }\r\n            </div>\r\n          </div>\r\n        </article>\r\n      } @empty { <p class=\"text-sm text-slate-500\">{{ 'noToursFound' | translate }}</p> }\r\n    </div>\r\n  }\r\n  @if (!isLoading) {\r\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\r\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\r\n      <div class=\"flex flex-wrap items-center gap-2\">\r\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\r\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n" }]
    }], () => [{ type: i1.AdminService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], previewRequested: [{
            type: Output
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToursList, { className: "ToursList", filePath: "app/features/configurations/tours/tours-list/tours-list.ts", lineNumber: 33 }); })();
