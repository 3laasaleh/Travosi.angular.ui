import { environment } from '../../../../../environments/environment';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
import * as i1 from "../../admin.service";
import * as i2 from "@ngx-translate/core";
const _c0 = () => [1, 2, 3, 4, 5];
const _c1 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function DestinationsList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function DestinationsList_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function DestinationsList_Conditional_7_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 11);
} }
function DestinationsList_Conditional_7_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 13)(2, "div", 11)(3, "div", 11)(4, "div", 14)(5, "div", 15);
    i0.ɵɵelementEnd();
} }
function DestinationsList_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 10);
    i0.ɵɵrepeaterCreate(2, DestinationsList_Conditional_7_Conditional_0_For_3_Template, 1, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, DestinationsList_Conditional_7_Conditional_0_For_5_Template, 6, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c0));
} }
function DestinationsList_Conditional_7_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "div", 17);
    i0.ɵɵelementStart(2, "div", 18);
    i0.ɵɵelement(3, "div", 19)(4, "div", 20)(5, "div", 21)(6, "div", 14);
    i0.ɵɵelementEnd()();
} }
function DestinationsList_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵrepeaterCreate(1, DestinationsList_Conditional_7_Conditional_1_For_2_Template, 7, 0, "div", 16, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function DestinationsList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, DestinationsList_Conditional_7_Conditional_0_Template, 6, 2, "div", 8)(1, DestinationsList_Conditional_7_Conditional_1_Template, 3, 1, "div", 9);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function DestinationsList_Conditional_8_For_21_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 26);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", item_r3.nameEng);
} }
function DestinationsList_Conditional_8_For_21_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelementEnd();
} }
function DestinationsList_Conditional_8_For_21_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 31);
} }
function DestinationsList_Conditional_8_For_21_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 38);
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("translate-x-6", item_r3.isActive !== false)("translate-x-1", item_r3.isActive === false);
} }
function DestinationsList_Conditional_8_For_21_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function DestinationsList_Conditional_8_For_21_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(1, "i", 40);
    i0.ɵɵelementEnd();
} }
function DestinationsList_Conditional_8_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 25)(1, "td", 24);
    i0.ɵɵconditionalCreate(2, DestinationsList_Conditional_8_For_21_Conditional_2_Template, 1, 2, "img", 26)(3, DestinationsList_Conditional_8_For_21_Conditional_3_Template, 2, 0, "div", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 28);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 29);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 24)(9, "button", 30);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵlistener("click", function DestinationsList_Conditional_8_For_21_Template_button_click_9_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleDestinationStatus(item_r3)); });
    i0.ɵɵconditionalCreate(11, DestinationsList_Conditional_8_For_21_Conditional_11_Template, 1, 0, "i", 31)(12, DestinationsList_Conditional_8_For_21_Conditional_12_Template, 1, 4, "span", 32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td", 24)(14, "div", 33)(15, "button", 34);
    i0.ɵɵlistener("click", function DestinationsList_Conditional_8_For_21_Template_button_click_15_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previewRequested.emit(item_r3)); });
    i0.ɵɵelement(16, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(17, DestinationsList_Conditional_8_For_21_Conditional_17_Template, 2, 0, "button", 36);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.getImages(item_r3)[0]) ? 2 : 3, tmp_11_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.nameEng ?? item_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.nameAr);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", item_r3.isActive !== false)("bg-slate-300", item_r3.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", item_r3.isActive !== false)("aria-label", i0.ɵɵpipeBind1(10, 12, item_r3.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === item_r3.id ? 11 : 12);
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(item_r3.isActive !== true ? 17 : -1);
} }
function DestinationsList_Conditional_8_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 41);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noDestinationsFound"));
} }
function DestinationsList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, DestinationsList_Conditional_8_For_21_Template, 18, 14, "tr", 25, _forTrack0, false, DestinationsList_Conditional_8_ForEmpty_22_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, "image"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "englishName"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 10, "arabicName"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 12, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 14, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.destinations);
} }
function DestinationsList_Conditional_9_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 43);
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", item_r6.nameEng);
} }
function DestinationsList_Conditional_9_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 51);
    i0.ɵɵlistener("click", function DestinationsList_Conditional_9_For_2_Conditional_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const item_r6 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "edit"));
} }
function DestinationsList_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 16);
    i0.ɵɵconditionalCreate(1, DestinationsList_Conditional_9_For_2_Conditional_1_Template, 1, 2, "img", 43);
    i0.ɵɵelementStart(2, "div", 44)(3, "h3", 45);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 46);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 47);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 48)(10, "button", 49);
    i0.ɵɵlistener("click", function DestinationsList_Conditional_9_For_2_Template_button_click_10_listener() { const item_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.previewRequested.emit(item_r6)); });
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(13, DestinationsList_Conditional_9_For_2_Conditional_13_Template, 3, 3, "button", 50);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.getImages(item_r6)[0]) ? 1 : -1, tmp_11_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r6.nameEng ?? item_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.nameAr);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.subDescription ?? item_r6.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 6, "view"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r6.isActive !== true ? 13 : -1);
} }
function DestinationsList_Conditional_9_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noDestinationsFound"));
} }
function DestinationsList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, DestinationsList_Conditional_9_For_2_Template, 14, 8, "article", 16, _forTrack0, false, DestinationsList_Conditional_9_ForEmpty_3_Template, 3, 3, "p", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.destinations);
} }
function DestinationsList_Conditional_10_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r9);
} }
function DestinationsList_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 52);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 53)(5, "label", 54)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 55);
    i0.ɵɵlistener("change", function DestinationsList_Conditional_10_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, DestinationsList_Conditional_10_For_11_Template, 2, 2, "option", 56, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 57);
    i0.ɵɵlistener("pageChange", function DestinationsList_Conditional_10_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class DestinationsList {
    adminService;
    cdr;
    translate;
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    previewRequested = new EventEmitter();
    editRequested = new EventEmitter();
    destinations = [];
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
        this.loadDestinations();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadDestinations();
        }
    }
    loadDestinations() {
        this.isLoading = true;
        this.errorMessage = '';
        this.adminService.getDestinations(this.paginationInfo.page, this.paginationInfo.pageSize).pipe(catchError(() => {
            this.errorMessage = 'destinationServiceUnavailable';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
            this.destinations = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.destinations.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadDestinations();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadDestinations();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadDestinations();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadDestinations();
        }
    }
    deactivateDestination(destination) {
        if (this.statusUpdatingId !== null || destination.isActive === false)
            return;
        this.statusUpdatingId = Number(destination.id);
        this.adminService.cangeStatus(destination.id).pipe(catchError(() => {
            this.errorMessage = 'destinationSaveError';
            return of(null);
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            this.successMessage = 'destinationDeactivated';
            destination.isActive = false;
            this.cdr.markForCheck();
        });
    }
    async toggleDestinationStatus(destination) {
        if (this.statusUpdatingId !== null)
            return;
        const result = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(destination.isActive ? 'confirmDeactivateDestination' : 'confirmActivateDestination'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: destination.isActive ? '#e11d48' : '#059669',
            reverseButtons: true,
        });
        if (!result.isConfirmed)
            return;
        this.statusUpdatingId = Number(destination.id);
        this.adminService.cangeStatus(destination.id).pipe(catchError(() => {
            Swal.fire({
                icon: 'error',
                title: this.translate.instant('statusUpdateError'),
            });
            return of({ statusToggleFailed: true });
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response?.statusToggleFailed || response?.isSuccess === false) {
                if (response?.isSuccess === false) {
                    Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('statusUpdateError') });
                }
                return;
            }
            destination.isActive = !destination.isActive;
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
    getImages(destination) {
        if (Array.isArray(destination?.images))
            return destination.images;
        return destination?.imageUrl ? [{ url: environment.imageUrl + destination.imageUrl }] : [];
    }
    imageUrl(image) {
        const url = typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? '');
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    static ɵfac = function DestinationsList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || DestinationsList)(i0.ɵɵdirectiveInject(i1.AdminService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DestinationsList, selectors: [["app-configurations-destinations-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { previewRequested: "previewRequested", editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 11, vars: 7, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]", "gap-3", "overflow-y-auto", "pe-1"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]", "gap-3"], [1, "grid", "grid-cols-[80px_1fr_1fr_100px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[80px_1fr_1fr_100px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-12", "w-20", "animate-pulse", "rounded-lg", "bg-slate-200"], [1, "h-7", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-xl", "border"], [1, "h-32", "animate-pulse", "bg-slate-200"], [1, "space-y-2", "p-3"], [1, "h-4", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-3", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "h-12", "w-20", "rounded-lg", "object-cover", 3, "src", "alt"], [1, "grid", "h-12", "w-20", "place-items-center", "rounded-lg", "bg-slate-100"], [1, "px-4", "py-3", "font-semibold"], ["dir", "rtl", 1, "px-4", "py-3"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "cursor-pointer", "items-center", "rounded-full", "transition-colors", "duration-200", "focus:outline-none", "focus:ring-2", "focus:ring-primary/30", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin", "mx-auto", "text-sm", "text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200", 3, "translate-x-6", "translate-x-1"], [1, "flex", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-primary/40", "text-primary", "transition-colors", "duration-200", "hover:border-primary", "hover:bg-primary", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-eye-outline"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer"], [1, "mdi", "mdi-image-off-outline"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["colspan", "5", 1, "p-8", "text-center", "text-slate-500"], [1, "text-sm", "text-slate-500"], [1, "h-32", "w-full", "object-cover", 3, "src", "alt"], [1, "p-3"], [1, "text-sm", "font-semibold"], ["dir", "rtl", 1, "text-xs", "text-slate-500"], [1, "mt-2", "line-clamp-2", "text-xs", "leading-5"], [1, "mt-3", "flex", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-primary/40", "px-2.5", "py-1", "text-xs", "font-semibold", "text-primary", "transition-colors", "duration-200", "hover:border-primary", "hover:bg-primary", "hover:text-white", 3, "click"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-2.5", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-2.5", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function DestinationsList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, DestinationsList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, DestinationsList_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, DestinationsList_Conditional_7_Template, 2, 1)(8, DestinationsList_Conditional_8_Template, 23, 16, "div", 5)(9, DestinationsList_Conditional_9_Template, 4, 1, "div", 6);
            i0.ɵɵconditionalCreate(10, DestinationsList_Conditional_10_Template, 13, 11, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 5, "destinationsData"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 7 : ctx.viewMode === "table" ? 8 : 9);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 10 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DestinationsList, [{
        type: Component,
        args: [{ selector: 'app-configurations-destinations-list', standalone: true, imports: [TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\r\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\r\n  <div class=\"mb-4 flex items-center justify-between\">\r\n    <h2 class=\"text-xl font-semibold\">{{ 'destinationsData' | translate }}</h2>\r\n  </div>\r\n\r\n  <!-- //skelton -->\r\n  @if (isLoading) \r\n  {\r\n  @if (viewMode === 'table') {\r\n  <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\r\n    <div class=\"grid grid-cols-[80px_1fr_1fr_100px_120px] gap-4 bg-slate-50 px-4 py-3\">\r\n      @for (column of [1,2,3,4,5];track column)\r\n      {\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\r\n    </div>\r\n    @for (row of [1,2,3,4,5];track row)\r\n    { <div class=\"grid grid-cols-[80px_1fr_1fr_100px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\r\n      <div class=\"h-12 w-20 animate-pulse rounded-lg bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n    </div> }\r\n  </div>\r\n  }\r\n  \r\n  @else {\r\n  <div class=\"grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3\">@for (card of [1,2,3,4]; track card) { <div\n      class=\"overflow-hidden rounded-xl border\">\n      <div class=\"h-32 animate-pulse bg-slate-200\"></div>\n      <div class=\"space-y-2 p-3\">\n        <div class=\"h-4 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\n        <div class=\"h-3 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\n        <div class=\"h-3 animate-pulse rounded-full bg-slate-200\"></div>\n        <div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div>\n      </div>\r\n    </div> }</div>\r\n  }\r\n  }\r\n   @else if (viewMode === 'table') {\r\n  <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\r\n    <table class=\"min-w-full text-left text-sm\">\r\n      <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\r\n        <tr>\r\n          <th class=\"px-4 py-3\">{{ 'image' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'englishName' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'arabicName' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        @for (item of destinations; track item.id) { <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\r\n          <td class=\"px-4 py-3\">\r\n            @if (getImages(item)[0]; as image)\r\n            {\r\n            <img [src]=\"imageUrl(image)\" [alt]=\"item.nameEng\" class=\"h-12 w-20 rounded-lg object-cover\" />\r\n            }\r\n            @else { <div class=\"grid h-12 w-20 place-items-center rounded-lg bg-slate-100\"><i\r\n                class=\"mdi mdi-image-off-outline\"></i></div> \r\n              }\r\n          </td>\r\n          <td class=\"px-4 py-3 font-semibold\">{{ item.nameEng ?? item.name }}</td>\r\n          <td class=\"px-4 py-3\" dir=\"rtl\">{{ item.nameAr }}</td>\r\n          <td class=\"px-4 py-3\">\r\n            <button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"item.isActive !== false\"\r\n              [attr.aria-label]=\"(item.isActive === false ? 'activate' : 'deactivate') | translate\"\r\n              class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60\"\r\n              [class.bg-emerald-500]=\"item.isActive !== false\" [class.bg-slate-300]=\"item.isActive === false\"\r\n              (click)=\"toggleDestinationStatus(item)\">\r\n              @if (statusUpdatingId === item.id) { <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\" aria-hidden=\"true\"></i> }\r\n              @else { <span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200\"\r\n                [class.translate-x-6]=\"item.isActive !== false\" [class.translate-x-1]=\"item.isActive === false\"></span> }\r\n            </button>\r\n          </td>\r\n          <td class=\"px-4 py-3\">\r\n            <div class=\"flex gap-2\"><button type=\"button\"\r\n                class=\"grid h-8 w-8 place-items-center rounded-full border border-primary/40 text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white cursor-pointer\"\r\n                (click)=\"previewRequested.emit(item)\"><i class=\"mdi mdi-eye-outline\"></i></button>\r\n              @if (item.isActive !== true) {\r\n                <button type=\"button\"\r\n                class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer\" (click)=\"editRequested.emit(item)\"><i\r\n                  class=\"mdi mdi-pencil-outline\"></i></button>\r\n              }\r\n             </div>\r\n          </td>\r\n        </tr> } @empty { <tr>\r\n          <td colspan=\"5\" class=\"p-8 text-center text-slate-500\">{{ 'noDestinationsFound' | translate }}</td>\r\n        </tr> }\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  } @else {\r\n  <div class=\"grid max-h-[70vh] grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 overflow-y-auto pe-1\">@for (item of destinations; track item.id) { <article\n      class=\"overflow-hidden rounded-xl border\">@if (getImages(item)[0]; as image) { \n        <img [src]=\"imageUrl(image)\"\n        [alt]=\"item.nameEng\" class=\"h-32 w-full object-cover\" /> }<div class=\"p-3\">\n        <h3 class=\"text-sm font-semibold\">{{ item.nameEng ?? item.name }}</h3>\n        <p dir=\"rtl\" class=\"text-xs text-slate-500\">{{ item.nameAr }}</p>\n        <p class=\"mt-2 line-clamp-2 text-xs leading-5\">{{ item.subDescription ?? item.description }}</p>\n        <div class=\"mt-3 flex gap-2\"><button type=\"button\" class=\"rounded-full border border-primary/40 px-2.5 py-1 text-xs font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white\"\n            (click)=\"previewRequested.emit(item)\">{{ 'view' | translate }}</button>\n          @if (item.isActive !== true) {\n            <button type=\"button\"\n              class=\"rounded-full border border-amber-300 px-2.5 py-1 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white\"\n              (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button>\n          }\n        </div>\n      </div>\r\n    </article> } @empty { <p class=\"text-sm text-slate-500\">{{ 'noDestinationsFound' | translate }}</p> }</div>\r\n  }\r\n  @if (!isLoading) {\r\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\r\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\r\n      <div class=\"flex flex-wrap items-center gap-2\">\r\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\r\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n" }]
    }], () => [{ type: i1.AdminService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], previewRequested: [{
            type: Output
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DestinationsList, { className: "DestinationsList", filePath: "app/features/configurations/destinations/destinations-list/destinations-list.ts", lineNumber: 33 }); })();
