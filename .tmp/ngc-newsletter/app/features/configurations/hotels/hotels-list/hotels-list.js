import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@ngx-translate/core";
const _c0 = () => [1, 2, 3, 4, 5];
const _c1 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function HotelsList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function HotelsList_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function HotelsList_Conditional_7_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 11);
} }
function HotelsList_Conditional_7_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 11)(2, "div", 11)(3, "div", 11)(4, "div", 13)(5, "div", 14);
    i0.ɵɵelementEnd();
} }
function HotelsList_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 10);
    i0.ɵɵrepeaterCreate(2, HotelsList_Conditional_7_Conditional_0_For_3_Template, 1, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, HotelsList_Conditional_7_Conditional_0_For_5_Template, 6, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c0));
} }
function HotelsList_Conditional_7_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16);
    i0.ɵɵelement(2, "div", 17)(3, "div", 18)(4, "div", 11)(5, "div", 14);
    i0.ɵɵelementEnd()();
} }
function HotelsList_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵrepeaterCreate(1, HotelsList_Conditional_7_Conditional_1_For_2_Template, 6, 0, "div", 15, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function HotelsList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, HotelsList_Conditional_7_Conditional_0_Template, 6, 2, "div", 8)(1, HotelsList_Conditional_7_Conditional_1_Template, 3, 1, "div", 9);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function HotelsList_Conditional_8_For_24_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 25);
} }
function HotelsList_Conditional_8_For_24_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 27);
} }
function HotelsList_Conditional_8_For_24_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 33);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("translate-x-6", item_r3.isActive !== false)("translate-x-1", item_r3.isActive === false);
} }
function HotelsList_Conditional_8_For_24_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵlistener("click", function HotelsList_Conditional_8_For_24_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteHotel(item_r3)); });
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementEnd();
} }
function HotelsList_Conditional_8_For_24_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 22)(1, "td", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21)(4, "span", 24);
    i0.ɵɵrepeaterCreate(5, HotelsList_Conditional_8_For_24_For_6_Template, 1, 0, "i", 25, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 21);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 21);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 21)(12, "button", 26);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵlistener("click", function HotelsList_Conditional_8_For_24_Template_button_click_12_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleHotelStatus(item_r3)); });
    i0.ɵɵconditionalCreate(14, HotelsList_Conditional_8_For_24_Conditional_14_Template, 1, 0, "i", 27)(15, HotelsList_Conditional_8_For_24_Conditional_15_Template, 1, 4, "span", 28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 21)(17, "div", 29)(18, "button", 30);
    i0.ɵɵlistener("click", function HotelsList_Conditional_8_For_24_Template_button_click_18_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(19, "i", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(20, HotelsList_Conditional_8_For_24_Conditional_20_Template, 2, 0, "button", 32);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.name);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.stars(item_r3.starRating));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.address);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.phoneNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", item_r3.isActive !== false)("bg-slate-300", item_r3.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", item_r3.isActive !== false)("aria-label", i0.ɵɵpipeBind1(13, 12, item_r3.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === item_r3.id ? 14 : 15);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(item_r3.isActive === false ? 20 : -1);
} }
function HotelsList_Conditional_8_ForEmpty_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 36);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noHotelsFound"));
} }
function HotelsList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "table", 19)(2, "thead", 20)(3, "tr")(4, "th", 21);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 21);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 21);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 21);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 21);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 21);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody");
    i0.ɵɵrepeaterCreate(23, HotelsList_Conditional_8_For_24_Template, 21, 14, "tr", 22, _forTrack0, false, HotelsList_Conditional_8_ForEmpty_25_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "hotelName"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "starRating"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 11, "address"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 13, "phone"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 15, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 17, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.hotels);
} }
function HotelsList_Conditional_9_For_2_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 25);
} }
function HotelsList_Conditional_9_For_2_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function HotelsList_Conditional_9_For_2_Conditional_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const item_r6 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.deleteHotel(item_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "delete"));
} }
function HotelsList_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 15)(1, "div", 38)(2, "div", 39)(3, "h3", 40);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 41);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p", 42);
    i0.ɵɵrepeaterCreate(9, HotelsList_Conditional_9_For_2_For_10_Template, 1, 0, "i", 25, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 43);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 44);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 45)(16, "button", 46);
    i0.ɵɵlistener("click", function HotelsList_Conditional_9_For_2_Template_button_click_16_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r6)); });
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 47);
    i0.ɵɵlistener("click", function HotelsList_Conditional_9_For_2_Template_button_click_19_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleHotelStatus(item_r6)); });
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(22, HotelsList_Conditional_9_For_2_Conditional_22_Template, 3, 3, "button", 48);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r6.name);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-emerald-50", item_r6.isActive !== false)("text-emerald-600", item_r6.isActive !== false)("bg-slate-100", item_r6.isActive === false)("text-slate-500", item_r6.isActive === false);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 23, item_r6.isActive !== false ? "active" : "inactive"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.stars(item_r6.starRating));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r6.address);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 25, "edit"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("border-emerald-300", item_r6.isActive === false)("text-emerald-600", item_r6.isActive === false)("border-rose-300", item_r6.isActive !== false)("text-rose-600", item_r6.isActive !== false);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 27, item_r6.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r6.isActive === false ? 22 : -1);
} }
function HotelsList_Conditional_9_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 37);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noHotelsFound"));
} }
function HotelsList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, HotelsList_Conditional_9_For_2_Template, 23, 29, "article", 15, _forTrack0, false, HotelsList_Conditional_9_ForEmpty_3_Template, 3, 3, "p", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.hotels);
} }
function HotelsList_Conditional_10_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r9);
} }
function HotelsList_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 50);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 51)(5, "label", 52)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 53);
    i0.ɵɵlistener("change", function HotelsList_Conditional_10_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, HotelsList_Conditional_10_For_11_Template, 2, 2, "option", 54, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 55);
    i0.ɵɵlistener("pageChange", function HotelsList_Conditional_10_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class HotelsList {
    apiService;
    cdr;
    translate;
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    hotels = [];
    isLoading = false;
    statusUpdatingId = null;
    deletingId = null;
    errorMessage = '';
    successMessage = '';
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
    constructor(apiService, cdr, translate) {
        this.apiService = apiService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() {
        this.loadHotels();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadHotels();
        }
    }
    loadHotels() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService.get(`Hotels/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(catchError(() => {
            this.errorMessage = 'hotelServiceUnavailable';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.hotels ?? pageData;
            this.hotels = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.hotels.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadHotels();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadHotels();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadHotels();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadHotels();
        }
    }
    async toggleHotelStatus(hotel) {
        if (this.statusUpdatingId !== null)
            return;
        const result = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(hotel.isActive ? 'confirmDeactivateHotel' : 'confirmActivateHotel'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: hotel.isActive ? '#e11d48' : '#059669',
            reverseButtons: true,
        });
        if (!result.isConfirmed)
            return;
        this.statusUpdatingId = Number(hotel.id);
        this.apiService.patch(`Hotels/${hotel.id}/ChangeStatus`, {}).pipe(catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('statusUpdateError') });
            return of({ statusToggleFailed: true });
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response?.statusToggleFailed)
                return;
            hotel.isActive = !hotel.isActive;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.translate.instant('statusUpdated'),
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
            });
            this.cdr.markForCheck();
        });
    }
    stars(count) {
        return Array.from({ length: Number(count) || 0 });
    }
    async deleteHotel(hotel) {
        if (this.deletingId !== null)
            return;
        const result = await Swal.fire({ title: this.translate.instant('confirmDeleteRecord'), text: this.translate.instant('recordDeleteWarning'), icon: 'warning', showCancelButton: true, confirmButtonText: this.translate.instant('delete'), cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true });
        if (!result.isConfirmed)
            return;
        this.deletingId = Number(hotel.id);
        this.apiService.deleteRequest(`Hotels/${hotel.id}`).pipe(catchError(() => { Swal.fire({ icon: 'error', title: this.translate.instant('recordDeleteError') }); return of(null); }), finalize(() => { this.deletingId = null; this.cdr.markForCheck(); })).subscribe((response) => { if (response?.isSuccess === false || response === null)
            return; this.loadHotels(); });
    }
    static ɵfac = function HotelsList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || HotelsList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HotelsList, selectors: [["app-configurations-hotels-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 11, vars: 7, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "gap-4", "overflow-y-auto", "pe-1", "md:grid-cols-2"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "grid", "grid-cols-[1fr_100px_1fr_100px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[1fr_100px_1fr_100px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-7", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-2xl", "border"], [1, "space-y-3", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "px-4", "py-3", "font-semibold"], [1, "text-amber-500"], [1, "mdi", "mdi-star"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "cursor-pointer", "items-center", "rounded-full", "transition-colors", "duration-200", "focus:outline-none", "focus:ring-2", "focus:ring-primary/30", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin", "mx-auto", "text-sm", "text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200", 3, "translate-x-6", "translate-x-1"], [1, "flex", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-rose-300", "text-rose-600", "hover:bg-rose-600", "hover:text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-rose-300", "text-rose-600", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "mdi", "mdi-delete-outline"], ["colspan", "6", 1, "p-8", "text-center", "text-slate-500"], [1, "text-sm", "text-slate-500"], [1, "p-4"], [1, "flex", "items-center", "justify-between"], [1, "font-semibold"], [1, "rounded-full", "px-2", "py-0.5", "text-xs", "font-semibold"], [1, "text-sm", "text-amber-500"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "mt-2", "text-sm"], [1, "mt-4", "flex", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], ["type", "button", 1, "rounded-full", "border", "px-3", "py-1", "text-xs", "font-semibold", 3, "click"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function HotelsList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, HotelsList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, HotelsList_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, HotelsList_Conditional_7_Template, 2, 1)(8, HotelsList_Conditional_8_Template, 26, 19, "div", 5)(9, HotelsList_Conditional_9_Template, 4, 1, "div", 6);
            i0.ɵɵconditionalCreate(10, HotelsList_Conditional_10_Template, 13, 11, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 5, "hotelRecords"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 7 : ctx.viewMode === "table" ? 8 : 9);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 10 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HotelsList, [{
        type: Component,
        args: [{ selector: 'app-configurations-hotels-list', standalone: true, imports: [TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\r\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\n  <div class=\"mb-4 flex items-center justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ 'hotelRecords' | translate }}</h2>\n  </div>\n\r\n  @if (isLoading)\r\n  {\r\n  @if (viewMode === 'table') {\r\n  <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\r\n    <div class=\"grid grid-cols-[1fr_100px_1fr_100px_120px] gap-4 bg-slate-50 px-4 py-3\">\r\n      @for (column of [1,2,3,4,5];track column)\r\n      {\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\r\n    </div>\r\n    @for (row of [1,2,3,4,5];track row)\r\n    { <div class=\"grid grid-cols-[1fr_100px_1fr_100px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n    </div> }\r\n  </div>\r\n  }\r\n  @else {\r\n  <div class=\"grid gap-4 md:grid-cols-2\">@for (card of [1,2,3,4]; track card) { <div class=\"overflow-hidden rounded-2xl border\">\r\n      <div class=\"space-y-3 p-4\">\r\n        <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n      </div>\r\n    </div> }</div>\r\n  }\r\n  }\r\n  @else if (viewMode === 'table') {\r\n  <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n    <table class=\"min-w-full text-left text-sm\">\n      <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\n        <tr>\r\n          <th class=\"px-4 py-3\">{{ 'hotelName' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'starRating' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'address' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'phone' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        @for (item of hotels; track item.id) { <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\r\n          <td class=\"px-4 py-3 font-semibold\">{{ item.name }}</td>\r\n          <td class=\"px-4 py-3\"><span class=\"text-amber-500\">@for (star of stars(item.starRating); track $index) {<i class=\"mdi mdi-star\"></i>}</span></td>\r\n          <td class=\"px-4 py-3\">{{ item.address }}</td>\r\n          <td class=\"px-4 py-3\">{{ item.phoneNumber }}</td>\r\n          <td class=\"px-4 py-3\">\r\n            <button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"item.isActive !== false\" [attr.aria-label]=\"(item.isActive === false ? 'activate' : 'deactivate') | translate\" class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60\" [class.bg-emerald-500]=\"item.isActive !== false\" [class.bg-slate-300]=\"item.isActive === false\" (click)=\"toggleHotelStatus(item)\">\n              @if (statusUpdatingId === item.id) { <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\" aria-hidden=\"true\"></i> }\n              @else { <span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200\" [class.translate-x-6]=\"item.isActive !== false\" [class.translate-x-1]=\"item.isActive === false\"></span> }\n            </button>\r\n          </td>\r\n          <td class=\"px-4 py-3\">\r\n            <div class=\"flex gap-2\">\r\n              <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer\" (click)=\"editRequested.emit(item)\"><i class=\"mdi mdi-pencil-outline\"></i></button>\n              @if (item.isActive === false) { <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white\" (click)=\"deleteHotel(item)\"><i class=\"mdi mdi-delete-outline\"></i></button> }\n            </div>\r\n          </td>\r\n        </tr> } @empty { <tr>\r\n          <td colspan=\"6\" class=\"p-8 text-center text-slate-500\">{{ 'noHotelsFound' | translate }}</td>\r\n        </tr> }\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  } @else {\r\n  <div class=\"grid max-h-[70vh] gap-4 overflow-y-auto pe-1 md:grid-cols-2\">@for (item of hotels; track item.id) { <article class=\"overflow-hidden rounded-2xl border\">\n      <div class=\"p-4\">\r\n        <div class=\"flex items-center justify-between\">\r\n          <h3 class=\"font-semibold\">{{ item.name }}</h3>\r\n          <span class=\"rounded-full px-2 py-0.5 text-xs font-semibold\" [class.bg-emerald-50]=\"item.isActive !== false\" [class.text-emerald-600]=\"item.isActive !== false\" [class.bg-slate-100]=\"item.isActive === false\" [class.text-slate-500]=\"item.isActive === false\">{{ (item.isActive !== false ? 'active' : 'inactive') | translate }}</span>\r\n        </div>\r\n        <p class=\"text-sm text-amber-500\">@for (star of stars(item.starRating); track $index) {<i class=\"mdi mdi-star\"></i>}</p>\r\n        <p class=\"mt-2 text-sm text-slate-500\">{{ item.address }}</p>\r\n        <p class=\"mt-2 text-sm\">{{ item.description }}</p>\r\n        <div class=\"mt-4 flex gap-2\">\n          <button type=\"button\" class=\"rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white\" (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button>\n          <button type=\"button\" class=\"rounded-full border px-3 py-1 text-xs font-semibold\" [class.border-emerald-300]=\"item.isActive === false\" [class.text-emerald-600]=\"item.isActive === false\" [class.border-rose-300]=\"item.isActive !== false\" [class.text-rose-600]=\"item.isActive !== false\" (click)=\"toggleHotelStatus(item)\">{{ (item.isActive === false ? 'activate' : 'deactivate') | translate }}</button>\n          @if (item.isActive === false) { <button type=\"button\" class=\"rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600\" (click)=\"deleteHotel(item)\">{{ 'delete' | translate }}</button> }\n        </div>\n      </div>\r\n    </article> } @empty { <p class=\"text-sm text-slate-500\">{{ 'noHotelsFound' | translate }}</p> }</div>\r\n  }\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n      <div class=\"flex flex-wrap items-center gap-2\">\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\n      </div>\n    </div>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HotelsList, { className: "HotelsList", filePath: "app/features/configurations/hotels/hotels-list/hotels-list.ts", lineNumber: 32 }); })();
