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
const _forTrack0 = ($index, $item) => $item.id ?? $item.packageId;
function PackagesList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function PackagesList_Conditional_6_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function PackagesList_Conditional_6_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12)(2, "div", 10)(3, "div", 10)(4, "div", 13)(5, "div", 14);
    i0.ɵɵelementEnd();
} }
function PackagesList_Conditional_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 9);
    i0.ɵɵrepeaterCreate(2, PackagesList_Conditional_6_Conditional_0_For_3_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, PackagesList_Conditional_6_Conditional_0_For_5_Template, 6, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c0));
} }
function PackagesList_Conditional_6_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "div", 16);
    i0.ɵɵelementStart(2, "div", 17);
    i0.ɵɵelement(3, "div", 18)(4, "div", 19)(5, "div", 14);
    i0.ɵɵelementEnd()();
} }
function PackagesList_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, PackagesList_Conditional_6_Conditional_1_For_2_Template, 6, 0, "div", 15, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function PackagesList_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, PackagesList_Conditional_6_Conditional_0_Template, 6, 2, "div", 7)(1, PackagesList_Conditional_6_Conditional_1_Template, 3, 1, "div", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function PackagesList_Conditional_7_For_24_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 24);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", ctx_r0.packageTitle(item_r3));
} }
function PackagesList_Conditional_7_For_24_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementEnd();
} }
function PackagesList_Conditional_7_For_24_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 29);
} }
function PackagesList_Conditional_7_For_24_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 36);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("translate-x-6", item_r3.isActive !== false)("translate-x-1", item_r3.isActive === false);
} }
function PackagesList_Conditional_7_For_24_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function PackagesList_Conditional_7_For_24_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementEnd();
} }
function PackagesList_Conditional_7_For_24_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 23)(1, "td", 22);
    i0.ɵɵconditionalCreate(2, PackagesList_Conditional_7_For_24_Conditional_2_Template, 1, 2, "img", 24)(3, PackagesList_Conditional_7_For_24_Conditional_3_Template, 2, 0, "div", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 26);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 22);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 27);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 22)(11, "button", 28);
    i0.ɵɵlistener("click", function PackagesList_Conditional_7_For_24_Template_button_click_11_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.togglePackageStatus(item_r3)); });
    i0.ɵɵconditionalCreate(12, PackagesList_Conditional_7_For_24_Conditional_12_Template, 1, 0, "i", 29)(13, PackagesList_Conditional_7_For_24_Conditional_13_Template, 1, 4, "span", 30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td", 22)(15, "div", 31)(16, "button", 32);
    i0.ɵɵlistener("click", function PackagesList_Conditional_7_For_24_Template_button_click_16_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previewRequested.emit(item_r3)); });
    i0.ɵɵelement(17, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(18, PackagesList_Conditional_7_For_24_Conditional_18_Template, 2, 0, "button", 34);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.imageUrl(item_r3)) ? 2 : 3, tmp_11_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.packageTitle(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.destinationName(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.packagePrice(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", item_r3.isActive !== false)("bg-slate-300", item_r3.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", item_r3.isActive !== false);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === (item_r3.id ?? item_r3.packageId) ? 12 : 13);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(item_r3.isActive === false ? 18 : -1);
} }
function PackagesList_Conditional_7_ForEmpty_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 39);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noPackagesFound"));
} }
function PackagesList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "table", 20)(2, "thead", 21)(3, "tr")(4, "th", 22);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 22);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 22);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 22);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 22);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 22);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody");
    i0.ɵɵrepeaterCreate(23, PackagesList_Conditional_7_For_24_Template, 19, 12, "tr", 23, _forTrack0, false, PackagesList_Conditional_7_ForEmpty_25_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "image"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "title"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 11, "destination"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 13, "price"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 15, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 17, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.packages);
} }
function PackagesList_Conditional_8_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 42);
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", ctx_r0.packageTitle(item_r6));
} }
function PackagesList_Conditional_8_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "i", 55);
    i0.ɵɵelementEnd();
} }
function PackagesList_Conditional_8_For_2_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function PackagesList_Conditional_8_For_2_Conditional_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const item_r6 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "edit"));
} }
function PackagesList_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 40);
    i0.ɵɵconditionalCreate(1, PackagesList_Conditional_8_For_2_Conditional_1_Template, 1, 2, "img", 42)(2, PackagesList_Conditional_8_For_2_Conditional_2_Template, 2, 0, "div", 43);
    i0.ɵɵelementStart(3, "div", 44)(4, "div", 45)(5, "h3", 46);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 47);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "p", 48);
    i0.ɵɵelement(11, "i", 49);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 50);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 51);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 52)(18, "button", 53);
    i0.ɵɵlistener("click", function PackagesList_Conditional_8_For_2_Template_button_click_18_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previewRequested.emit(item_r6)); });
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(21, PackagesList_Conditional_8_For_2_Conditional_21_Template, 3, 3, "button", 54);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.imageUrl(item_r6)) ? 1 : 2, tmp_11_0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.packageTitle(item_r6));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-emerald-100", item_r6.isActive !== false)("text-emerald-700", item_r6.isActive !== false)("bg-slate-200", item_r6.isActive === false)("text-slate-600", item_r6.isActive === false);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 16, item_r6.isActive === false ? "inactive" : "active"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.destinationName(item_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.packagePrice(item_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.description ?? item_r6.fullDescription);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 18, "view"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r6.isActive === false ? 21 : -1);
} }
function PackagesList_Conditional_8_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 41);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noPackagesFound"));
} }
function PackagesList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, PackagesList_Conditional_8_For_2_Template, 22, 20, "article", 40, _forTrack0, false, PackagesList_Conditional_8_ForEmpty_3_Template, 3, 3, "p", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.packages);
} }
function PackagesList_Conditional_9_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 61);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r9);
} }
function PackagesList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 57);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 58)(5, "label", 59)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 60);
    i0.ɵɵlistener("change", function PackagesList_Conditional_9_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, PackagesList_Conditional_9_For_11_Template, 2, 2, "option", 61, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 62);
    i0.ɵɵlistener("pageChange", function PackagesList_Conditional_9_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class PackagesList {
    apiService;
    cdr;
    translate;
    viewMode = 'grid';
    refreshToken = 0;
    previewRequested = new EventEmitter();
    editRequested = new EventEmitter();
    pageSizeOptions = [10, 20, 50];
    packages = [];
    isLoading = false;
    statusUpdatingId = null;
    errorMessage = '';
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 1 };
    constructor(apiService, cdr, translate) {
        this.apiService = apiService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() {
        this.loadPackages();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadPackages();
        }
    }
    loadPackages() {
        this.isLoading = true;
        this.errorMessage = '';
        const query = `page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`;
        this.apiService.get(`Packages/GetAll?${query}`).pipe(catchError(() => this.apiService.get(`Packages?${query}`).pipe(catchError(() => {
            this.errorMessage = 'packagesLoadError';
            return of(null);
        }))), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.packages ?? pageData;
            this.packages = Array.isArray(rows) ? rows : [];
            const totalCount = Number(pageData?.totalCount ?? this.packages.length);
            const pageSize = Number(pageData?.pageSize ?? this.paginationInfo.pageSize);
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize,
                totalCount,
                totalPages: Math.max(1, Number(pageData?.totalPages ?? Math.ceil(totalCount / Math.max(1, pageSize)))),
            };
        });
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadPackages();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadPackages();
    }
    async togglePackageStatus(travelPackage) {
        if (this.statusUpdatingId !== null)
            return;
        const isActive = travelPackage.isActive !== false;
        const result = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(isActive ? 'confirmDeactivatePackage' : 'confirmActivatePackage'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: isActive ? '#e11d48' : '#059669',
            reverseButtons: true,
        });
        if (!result.isConfirmed)
            return;
        this.statusUpdatingId = Number(travelPackage.id ?? travelPackage.packageId);
        this.apiService.patch('Packages/ChangeStatus', {
            Id: this.statusUpdatingId,
            IsActive: !isActive,
        }).pipe(catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('statusUpdateError') });
            return of({ statusToggleFailed: true });
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response?.statusToggleFailed)
                return;
            travelPackage.isActive = !isActive;
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: this.translate.instant('statusUpdated'), showConfirmButton: false, timer: 2200, timerProgressBar: true });
            this.cdr.markForCheck();
        });
    }
    packageTitle(item) {
        return item?.titleEng ?? item?.title ?? item?.nameEng ?? item?.name ?? '';
    }
    destinationName(item) {
        const destinations = Array.isArray(item?.destinations) ? item.destinations : [];
        if (destinations.length) {
            return destinations
                .map((destination) => destination?.destinationName ?? destination?.nameEng ?? destination?.name)
                .filter(Boolean)
                .join(', ');
        }
        return item?.destination?.nameEng ?? item?.destinationName ?? `#${item?.destinationId ?? '-'}`;
    }
    imageUrl(item) {
        const image = Array.isArray(item?.images) ? item.images[0] : null;
        const url = image?.imageUrl ?? image?.url ?? image?.path ?? item?.coverImageUrl ?? item?.imageUrl ?? '';
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    packagePrice(item) {
        const price = Number(item?.pricePerPerson ?? item?.price ?? 0);
        return `$${Number.isFinite(price) ? price : 0}`;
    }
    static ɵfac = function PackagesList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || PackagesList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PackagesList, selectors: [["app-configurations-packages-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { previewRequested: "previewRequested", editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 6, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "grid-cols-[repeat(auto-fill,minmax(230px,1fr))]", "gap-4", "overflow-y-auto", "pe-1"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "grid-cols-[repeat(auto-fill,minmax(230px,1fr))]", "gap-4"], [1, "grid", "grid-cols-[80px_1.5fr_1fr_100px_110px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[80px_1.5fr_1fr_100px_110px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-12", "w-20", "animate-pulse", "rounded-lg", "bg-slate-200"], [1, "h-7", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-2xl", "border"], [1, "h-36", "animate-pulse", "bg-slate-200"], [1, "space-y-3", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "h-12", "w-20", "rounded-lg", "object-cover", 3, "src", "alt"], [1, "grid", "h-12", "w-20", "place-items-center", "rounded-lg", "bg-slate-100"], [1, "px-4", "py-3", "font-semibold"], [1, "px-4", "py-3", "font-semibold", "text-primary"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "items-center", "rounded-full", "transition-colors", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi", "mdi-loading", "mdi-spin", "mx-auto", "text-sm", "text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", 3, "translate-x-6", "translate-x-1"], [1, "flex", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-primary/40", "text-primary", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi", "mdi-eye-outline"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "hover:bg-amber-500", "hover:text-white"], [1, "mdi", "mdi-image-off-outline"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "hover:bg-amber-500", "hover:text-white", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["colspan", "6", 1, "p-8", "text-center", "text-slate-500"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white"], [1, "text-sm", "text-slate-500"], [1, "h-36", "w-full", "object-cover", 3, "src", "alt"], [1, "grid", "h-36", "place-items-center", "bg-slate-100", "text-slate-400"], [1, "p-4"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "font-semibold"], [1, "rounded-full", "px-2", "py-1", "text-[10px]", "font-semibold"], [1, "mt-2", "text-xs", "text-primary"], [1, "mdi", "mdi-map-marker-outline"], [1, "mt-2", "text-lg", "font-semibold", "text-primary"], [1, "mt-2", "line-clamp-2", "text-sm", "text-slate-500"], [1, "mt-3", "flex", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-primary/40", "px-3", "py-1", "text-xs", "font-semibold", "text-primary", 3, "click"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600"], [1, "mdi", "mdi-image-off-outline", "text-4xl"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function PackagesList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, PackagesList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, PackagesList_Conditional_6_Template, 2, 1)(7, PackagesList_Conditional_7_Template, 26, 19, "div", 4)(8, PackagesList_Conditional_8_Template, 4, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, PackagesList_Conditional_9_Template, 13, 11, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "packageList"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 6 : ctx.viewMode === "table" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 9 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PackagesList, [{
        type: Component,
        args: [{ selector: 'app-configurations-packages-list', standalone: true, imports: [TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n  <div class=\"mb-4 flex items-center justify-between\"><h2 class=\"text-xl font-semibold\">{{ 'packageList' | translate }}</h2></div>\n\n  @if (isLoading) {\n    @if (viewMode === 'table') {\n      <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\n        <div class=\"grid grid-cols-[80px_1.5fr_1fr_100px_110px] gap-4 bg-slate-50 px-4 py-3\">@for (column of [1,2,3,4,5]; track column) { <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }</div>\n        @for (row of [1,2,3,4,5]; track row) { <div class=\"grid grid-cols-[80px_1.5fr_1fr_100px_110px] items-center gap-4 border-t border-slate-200 px-4 py-3\"><div class=\"h-12 w-20 animate-pulse rounded-lg bg-slate-200\"></div><div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div><div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div><div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div><div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div></div> }\n      </div>\n    } @else {\n      <div class=\"grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4\">@for (card of [1,2,3,4]; track card) { <div class=\"overflow-hidden rounded-2xl border\"><div class=\"h-36 animate-pulse bg-slate-200\"></div><div class=\"space-y-3 p-4\"><div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div><div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div><div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div></div></div> }</div>\n    }\n  } @else if (viewMode === 'table') {\n    <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n      <table class=\"min-w-full text-left text-sm\">\n        <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\"><tr><th class=\"px-4 py-3\">{{ 'image' | translate }}</th><th class=\"px-4 py-3\">{{ 'title' | translate }}</th><th class=\"px-4 py-3\">{{ 'destination' | translate }}</th><th class=\"px-4 py-3\">{{ 'price' | translate }}</th><th class=\"px-4 py-3\">{{ 'status' | translate }}</th><th class=\"px-4 py-3\">{{ 'actions' | translate }}</th></tr></thead>\n        <tbody>\n          @for (item of packages; track item.id ?? item.packageId) {\n            <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\n              <td class=\"px-4 py-3\">@if (imageUrl(item); as image) { <img [src]=\"image\" [alt]=\"packageTitle(item)\" class=\"h-12 w-20 rounded-lg object-cover\" /> } @else { <div class=\"grid h-12 w-20 place-items-center rounded-lg bg-slate-100\"><i class=\"mdi mdi-image-off-outline\"></i></div> }</td>\n              <td class=\"px-4 py-3 font-semibold\">{{ packageTitle(item) }}</td>\n              <td class=\"px-4 py-3\">{{ destinationName(item) }}</td>\n              <td class=\"px-4 py-3 font-semibold text-primary\">{{ packagePrice(item) }}</td>\n              <td class=\"px-4 py-3\"><button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"item.isActive !== false\" class=\"relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60\" [class.bg-emerald-500]=\"item.isActive !== false\" [class.bg-slate-300]=\"item.isActive === false\" (click)=\"togglePackageStatus(item)\">@if (statusUpdatingId === (item.id ?? item.packageId)) { <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\"></i> } @else { <span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform\" [class.translate-x-6]=\"item.isActive !== false\" [class.translate-x-1]=\"item.isActive === false\"></span> }</button></td>\n              <td class=\"px-4 py-3\"><div class=\"flex gap-2\"><button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-white\" (click)=\"previewRequested.emit(item)\"><i class=\"mdi mdi-eye-outline\"></i></button>@if (item.isActive === false) { <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 hover:bg-amber-500 hover:text-white\" (click)=\"editRequested.emit(item)\"><i class=\"mdi mdi-pencil-outline\"></i></button> }</div></td>\n            </tr>\n          } @empty { <tr><td colspan=\"6\" class=\"p-8 text-center text-slate-500\">{{ 'noPackagesFound' | translate }}</td></tr> }\n        </tbody>\n      </table>\n    </div>\n  } @else {\n    <div class=\"grid max-h-[70vh] grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 overflow-y-auto pe-1\">\n      @for (item of packages; track item.id ?? item.packageId) {\n        <article class=\"overflow-hidden rounded-2xl border border-slate-200 bg-white\">\n          @if (imageUrl(item); as image) { <img [src]=\"image\" [alt]=\"packageTitle(item)\" class=\"h-36 w-full object-cover\" /> } @else { <div class=\"grid h-36 place-items-center bg-slate-100 text-slate-400\"><i class=\"mdi mdi-image-off-outline text-4xl\"></i></div> }\n          <div class=\"p-4\"><div class=\"flex items-start justify-between gap-2\"><h3 class=\"font-semibold\">{{ packageTitle(item) }}</h3><span class=\"rounded-full px-2 py-1 text-[10px] font-semibold\" [class.bg-emerald-100]=\"item.isActive !== false\" [class.text-emerald-700]=\"item.isActive !== false\" [class.bg-slate-200]=\"item.isActive === false\" [class.text-slate-600]=\"item.isActive === false\">{{ (item.isActive === false ? 'inactive' : 'active') | translate }}</span></div><p class=\"mt-2 text-xs text-primary\"><i class=\"mdi mdi-map-marker-outline\"></i> {{ destinationName(item) }}</p><p class=\"mt-2 text-lg font-semibold text-primary\">{{ packagePrice(item) }}</p><p class=\"mt-2 line-clamp-2 text-sm text-slate-500\">{{ item.description ?? item.fullDescription }}</p><div class=\"mt-3 flex gap-2\"><button type=\"button\" class=\"rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary\" (click)=\"previewRequested.emit(item)\">{{ 'view' | translate }}</button>@if (item.isActive === false) { <button type=\"button\" class=\"rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-600\" (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button> }</div></div>\n        </article>\n      } @empty { <p class=\"text-sm text-slate-500\">{{ 'noPackagesFound' | translate }}</p> }\n    </div>\n  }\n\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\"><span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span><div class=\"flex flex-wrap items-center gap-2\"><label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label><app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" /></div></div>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], previewRequested: [{
            type: Output
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PackagesList, { className: "PackagesList", filePath: "app/features/configurations/packages/packages-list/packages-list.ts", lineNumber: 33 }); })();
