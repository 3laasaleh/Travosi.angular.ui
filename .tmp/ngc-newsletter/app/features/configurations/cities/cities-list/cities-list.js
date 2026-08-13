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
function CitiesList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function CitiesList_Conditional_6_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function CitiesList_Conditional_6_Conditional_0_For_5_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function CitiesList_Conditional_6_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵrepeaterCreate(1, CitiesList_Conditional_6_Conditional_0_For_5_For_2_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function CitiesList_Conditional_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 9);
    i0.ɵɵrepeaterCreate(2, CitiesList_Conditional_6_Conditional_0_For_3_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, CitiesList_Conditional_6_Conditional_0_For_5_Template, 3, 1, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c0));
} }
function CitiesList_Conditional_6_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 13)(2, "div", 14)(3, "div", 15);
    i0.ɵɵelementEnd();
} }
function CitiesList_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, CitiesList_Conditional_6_Conditional_1_For_2_Template, 4, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function CitiesList_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, CitiesList_Conditional_6_Conditional_0_Template, 6, 2, "div", 7)(1, CitiesList_Conditional_6_Conditional_1_Template, 3, 1, "div", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function CitiesList_Conditional_7_For_21_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const city_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(city_r3.destinationNameAr);
} }
function CitiesList_Conditional_7_For_21_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 25);
} }
function CitiesList_Conditional_7_For_21_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 29);
} if (rf & 2) {
    const city_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("translate-x-6", city_r3.isActive !== false)("translate-x-1", city_r3.isActive === false);
} }
function CitiesList_Conditional_7_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 19)(1, "td", 20);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 18)(6, "span", 22);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, CitiesList_Conditional_7_For_21_Conditional_8_Template, 2, 1, "span", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 18)(10, "button", 24);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵlistener("click", function CitiesList_Conditional_7_For_21_Template_button_click_10_listener() { const city_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleCityStatus(city_r3)); });
    i0.ɵɵconditionalCreate(12, CitiesList_Conditional_7_For_21_Conditional_12_Template, 1, 0, "i", 25)(13, CitiesList_Conditional_7_For_21_Conditional_13_Template, 1, 4, "span", 26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td", 18)(15, "button", 27);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵlistener("click", function CitiesList_Conditional_7_For_21_Template_button_click_15_listener() { const city_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(city_r3)); });
    i0.ɵɵelement(17, "i", 28);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const city_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(city_r3.nameEng);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(city_r3.nameAr);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(city_r3.destinationNameEng || "\u2014");
    i0.ɵɵadvance();
    i0.ɵɵconditional(city_r3.destinationNameAr ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", city_r3.isActive !== false)("bg-slate-300", city_r3.isActive === false);
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", city_r3.isActive !== false)("aria-label", i0.ɵɵpipeBind1(11, 13, city_r3.isActive === false ? "activate" : "deactivate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === city_r3.id ? 12 : 13);
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(16, 15, "editCity"));
} }
function CitiesList_Conditional_7_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 30);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noCitiesFound"));
} }
function CitiesList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "table", 16)(2, "thead", 17)(3, "tr")(4, "th", 18);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 18);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 18);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 18);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 18);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, CitiesList_Conditional_7_For_21_Template, 18, 17, "tr", 19, _forTrack0, false, CitiesList_Conditional_7_ForEmpty_22_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, "englishName"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "arabicName"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 10, "destination"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 12, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 14, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.cities);
} }
function CitiesList_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 31)(1, "div", 33)(2, "div", 34)(3, "div")(4, "h3", 35);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 36);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 37);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 38)(12, "span", 39);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 40)(17, "button", 41);
    i0.ɵɵlistener("click", function CitiesList_Conditional_8_For_2_Template_button_click_17_listener() { const city_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(city_r5)); });
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "translate");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const city_r5 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(city_r5.nameEng);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(city_r5.nameAr);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-emerald-50", city_r5.isActive !== false)("text-emerald-600", city_r5.isActive !== false)("bg-slate-100", city_r5.isActive === false)("text-slate-500", city_r5.isActive === false);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 14, city_r5.isActive !== false ? "active" : "inactive"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(14, 16, "destination"), ":");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", city_r5.destinationNameEng || "\u2014", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 18, "edit"));
} }
function CitiesList_Conditional_8_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 32);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noCitiesFound"));
} }
function CitiesList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, CitiesList_Conditional_8_For_2_Template, 20, 20, "article", 31, _forTrack0, false, CitiesList_Conditional_8_ForEmpty_3_Template, 3, 3, "p", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.cities);
} }
function CitiesList_Conditional_9_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r7);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r7);
} }
function CitiesList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 42);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 43)(5, "label", 44)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 45);
    i0.ɵɵlistener("change", function CitiesList_Conditional_9_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, CitiesList_Conditional_9_For_11_Template, 2, 2, "option", 46, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 47);
    i0.ɵɵlistener("pageChange", function CitiesList_Conditional_9_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class CitiesList {
    apiService;
    cdr;
    translate;
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    cities = [];
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
        this.loadCities();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadCities();
        }
    }
    loadCities() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService.get(`Cities/GetAll?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(catchError(() => {
            this.errorMessage = 'cityServiceUnavailable';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.cities ?? pageData;
            this.cities = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.cities.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadCities();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadCities();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadCities();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadCities();
        }
    }
    async toggleCityStatus(city) {
        if (this.statusUpdatingId !== null)
            return;
        const result = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(city.isActive !== false ? 'confirmDeactivateCity' : 'confirmActivateCity'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: city.isActive !== false ? '#e11d48' : '#059669',
            reverseButtons: true,
        });
        if (!result.isConfirmed)
            return;
        this.statusUpdatingId = Number(city.id);
        this.apiService.patch(`Cities/${city.id}/ChangeStatus`, {}).pipe(catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('statusUpdateError') });
            return of(null);
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null || response?.isSuccess === false)
                return;
            city.isActive = !city.isActive;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.translate.instant('cityStatusUpdated'),
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
            });
            this.cdr.markForCheck();
        });
    }
    static ɵfac = function CitiesList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CitiesList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CitiesList, selectors: [["app-configurations-cities-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 6, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "gap-4", "overflow-y-auto", "pe-1", "md:grid-cols-2"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "grid", "grid-cols-[1fr_1fr_1fr_100px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[1fr_1fr_1fr_100px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "space-y-3", "rounded-2xl", "border", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "px-4", "py-3", "font-semibold"], ["dir", "rtl", 1, "px-4", "py-3"], [1, "block"], ["dir", "rtl", 1, "text-xs", "text-slate-500"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "cursor-pointer", "items-center", "rounded-full", "transition-colors", "duration-200", "focus:outline-none", "focus:ring-2", "focus:ring-primary/30", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin", "mx-auto", "text-sm", "text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200", 3, "translate-x-6", "translate-x-1"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], [1, "mdi", "mdi-pencil-outline"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200"], ["colspan", "5", 1, "p-8", "text-center", "text-slate-500"], [1, "overflow-hidden", "rounded-2xl", "border"], [1, "text-sm", "text-slate-500"], [1, "p-4"], [1, "flex", "items-start", "justify-between", "gap-3"], [1, "font-semibold"], ["dir", "rtl", 1, "mt-1", "text-sm", "text-slate-500"], [1, "rounded-full", "px-2", "py-0.5", "text-xs", "font-semibold"], [1, "mt-3", "rounded-xl", "bg-primary/5", "px-3", "py-2", "text-sm", "text-slate-700"], [1, "font-medium"], [1, "mt-4", "flex", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "hover:bg-amber-500", "hover:text-white", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function CitiesList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, CitiesList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, CitiesList_Conditional_6_Template, 2, 1)(7, CitiesList_Conditional_7_Template, 23, 16, "div", 4)(8, CitiesList_Conditional_8_Template, 4, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, CitiesList_Conditional_9_Template, 13, 11, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "cityRecords"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 6 : ctx.viewMode === "table" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 9 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CitiesList, [{
        type: Component,
        args: [{ selector: 'app-configurations-cities-list', standalone: true, imports: [TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\n  @if (errorMessage) {\n    <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div>\n  }\n  <div class=\"mb-4 flex items-center justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ 'cityRecords' | translate }}</h2>\n  </div>\n\n  @if (isLoading) {\n    @if (viewMode === 'table') {\n      <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\n        <div class=\"grid grid-cols-[1fr_1fr_1fr_100px_120px] gap-4 bg-slate-50 px-4 py-3\">\n          @for (column of [1,2,3,4,5]; track column) { <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\n        </div>\n        @for (row of [1,2,3,4,5]; track row) {\n          <div class=\"grid grid-cols-[1fr_1fr_1fr_100px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\n            @for (column of [1,2,3,4,5]; track column) { <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\n          </div>\n        }\n      </div>\n    } @else {\n      <div class=\"grid gap-4 md:grid-cols-2\">\n        @for (card of [1,2,3,4]; track card) {\n          <div class=\"space-y-3 rounded-2xl border p-4\">\n            <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\n            <div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\n            <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\n          </div>\n        }\n      </div>\n    }\n  } @else if (viewMode === 'table') {\n    <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n      <table class=\"min-w-full text-left text-sm\">\n        <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\n          <tr>\n            <th class=\"px-4 py-3\">{{ 'englishName' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'arabicName' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'destination' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\n          </tr>\n        </thead>\n        <tbody>\n          @for (city of cities; track city.id) {\n            <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\n              <td class=\"px-4 py-3 font-semibold\">{{ city.nameEng }}</td>\n              <td class=\"px-4 py-3\" dir=\"rtl\">{{ city.nameAr }}</td>\n              <td class=\"px-4 py-3\">\n                <span class=\"block\">{{ city.destinationNameEng || '\u2014' }}</span>\n                @if (city.destinationNameAr) { <span class=\"text-xs text-slate-500\" dir=\"rtl\">{{ city.destinationNameAr }}</span> }\n              </td>\n              <td class=\"px-4 py-3\">\n                <button type=\"button\" role=\"switch\" [disabled]=\"statusUpdatingId !== null\" [attr.aria-checked]=\"city.isActive !== false\" [attr.aria-label]=\"(city.isActive === false ? 'activate' : 'deactivate') | translate\" class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60\" [class.bg-emerald-500]=\"city.isActive !== false\" [class.bg-slate-300]=\"city.isActive === false\" (click)=\"toggleCityStatus(city)\">\n                  @if (statusUpdatingId === city.id) { <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\" aria-hidden=\"true\"></i> }\n                  @else { <span class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200\" [class.translate-x-6]=\"city.isActive !== false\" [class.translate-x-1]=\"city.isActive === false\"></span> }\n                </button>\n              </td>\n              <td class=\"px-4 py-3\">\n                <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition hover:border-amber-500 hover:bg-amber-500 hover:text-white\" [attr.aria-label]=\"'editCity' | translate\" (click)=\"editRequested.emit(city)\">\n                  <i class=\"mdi mdi-pencil-outline\"></i>\n                </button>\n              </td>\n            </tr>\n          } @empty {\n            <tr><td colspan=\"5\" class=\"p-8 text-center text-slate-500\">{{ 'noCitiesFound' | translate }}</td></tr>\n          }\n        </tbody>\n      </table>\n    </div>\n  } @else {\n    <div class=\"grid max-h-[70vh] gap-4 overflow-y-auto pe-1 md:grid-cols-2\">\n      @for (city of cities; track city.id) {\n        <article class=\"overflow-hidden rounded-2xl border\">\n          <div class=\"p-4\">\n            <div class=\"flex items-start justify-between gap-3\">\n              <div>\n                <h3 class=\"font-semibold\">{{ city.nameEng }}</h3>\n                <p class=\"mt-1 text-sm text-slate-500\" dir=\"rtl\">{{ city.nameAr }}</p>\n              </div>\n              <span class=\"rounded-full px-2 py-0.5 text-xs font-semibold\" [class.bg-emerald-50]=\"city.isActive !== false\" [class.text-emerald-600]=\"city.isActive !== false\" [class.bg-slate-100]=\"city.isActive === false\" [class.text-slate-500]=\"city.isActive === false\">{{ (city.isActive !== false ? 'active' : 'inactive') | translate }}</span>\n            </div>\n            <div class=\"mt-3 rounded-xl bg-primary/5 px-3 py-2 text-sm text-slate-700\">\n              <span class=\"font-medium\">{{ 'destination' | translate }}:</span> {{ city.destinationNameEng || '\u2014' }}\n            </div>\n            <div class=\"mt-4 flex gap-2\">\n              <button type=\"button\" class=\"rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-500 hover:text-white\" (click)=\"editRequested.emit(city)\">{{ 'edit' | translate }}</button>\n            </div>\n          </div>\n        </article>\n      } @empty {\n        <p class=\"text-sm text-slate-500\">{{ 'noCitiesFound' | translate }}</p>\n      }\n    </div>\n  }\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n      <div class=\"flex flex-wrap items-center gap-2\">\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\n      </div>\n    </div>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CitiesList, { className: "CitiesList", filePath: "app/features/configurations/cities/cities-list/cities-list.ts", lineNumber: 33 }); })();
