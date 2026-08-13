import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of, switchMap, throwError } from 'rxjs';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
const _c0 = () => [1, 2, 3, 4, 5];
const _c1 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function QuotationsList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function QuotationsList_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.sendMessage));
} }
function QuotationsList_Conditional_7_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 11);
} }
function QuotationsList_Conditional_7_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 11)(2, "div", 11)(3, "div", 11)(4, "div", 11)(5, "div", 13);
    i0.ɵɵelementEnd();
} }
function QuotationsList_Conditional_7_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 10);
    i0.ɵɵrepeaterCreate(2, QuotationsList_Conditional_7_Conditional_0_For_3_Template, 1, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, QuotationsList_Conditional_7_Conditional_0_For_5_Template, 6, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c0));
} }
function QuotationsList_Conditional_7_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 15);
    i0.ɵɵelement(2, "div", 16)(3, "div", 17)(4, "div", 13);
    i0.ɵɵelementEnd()();
} }
function QuotationsList_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵrepeaterCreate(1, QuotationsList_Conditional_7_Conditional_1_For_2_Template, 5, 0, "div", 14, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function QuotationsList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, QuotationsList_Conditional_7_Conditional_0_Template, 6, 2, "div", 8)(1, QuotationsList_Conditional_7_Conditional_1_Template, 3, 1, "div", 9);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function QuotationsList_Conditional_8_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 21)(1, "td", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 20);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 20);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td", 20);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 20)(10, "div", 23)(11, "button", 24);
    i0.ɵɵlistener("click", function QuotationsList_Conditional_8_For_21_Template_button_click_11_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(12, "i", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 26);
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵlistener("click", function QuotationsList_Conditional_8_For_21_Template_button_click_13_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.sendQuotation(item_r3)); });
    i0.ɵɵelement(15, "i", 27);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.quotationNo);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.customerName ?? item_r3.customer?.firstName + " " + item_r3.customer?.lastName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r3.travelStartDate, " \u2014 ", item_r3.travelEndDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.totalAmount);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r0.sendingQuotationId !== null);
    i0.ɵɵattribute("title", i0.ɵɵpipeBind1(14, 13, "sendAndDownloadPdf"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.sendingQuotationId === item_r3.id)("mdi-spin", ctx_r0.sendingQuotationId === item_r3.id)("mdi-file-pdf-box", ctx_r0.sendingQuotationId !== item_r3.id);
} }
function QuotationsList_Conditional_8_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 28);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noQuotationsFound"));
} }
function QuotationsList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "table", 18)(2, "thead", 19)(3, "tr")(4, "th", 20);
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
    i0.ɵɵrepeaterCreate(20, QuotationsList_Conditional_8_For_21_Template, 16, 15, "tr", 21, _forTrack0, false, QuotationsList_Conditional_8_ForEmpty_22_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, "quotationNo"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "customer"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 10, "travelDates"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 12, "totalAmount"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 14, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.quotations);
} }
function QuotationsList_Conditional_9_For_2_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 40);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "submitting"));
} }
function QuotationsList_Conditional_9_For_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "sendAndDownloadPdf"), " ");
} }
function QuotationsList_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 14)(1, "div", 30)(2, "div", 31)(3, "h3", 32);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 33);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 34);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 35);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p", 36);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 37)(14, "button", 38);
    i0.ɵɵlistener("click", function QuotationsList_Conditional_9_For_2_Template_button_click_14_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r5)); });
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 39);
    i0.ɵɵlistener("click", function QuotationsList_Conditional_9_For_2_Template_button_click_17_listener() { const item_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.sendQuotation(item_r5)); });
    i0.ɵɵconditionalCreate(18, QuotationsList_Conditional_9_For_2_Conditional_18_Template, 4, 3)(19, QuotationsList_Conditional_9_For_2_Conditional_19_Template, 2, 3);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r5.quotationNo);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.totalAmount);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.customerName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r5.travelStartDate, " \u2014 ", item_r5.travelEndDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.notes);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 9, "edit"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.sendingQuotationId !== null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.sendingQuotationId === item_r5.id ? 18 : 19);
} }
function QuotationsList_Conditional_9_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noQuotationsFound"));
} }
function QuotationsList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, QuotationsList_Conditional_9_For_2_Template, 20, 11, "article", 14, _forTrack0, false, QuotationsList_Conditional_9_ForEmpty_3_Template, 3, 3, "p", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.quotations);
} }
function QuotationsList_Conditional_10_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r7);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r7);
} }
function QuotationsList_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 41);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 42)(5, "label", 43)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 44);
    i0.ɵɵlistener("change", function QuotationsList_Conditional_10_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, QuotationsList_Conditional_10_For_11_Template, 2, 2, "option", 45, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 46);
    i0.ɵɵlistener("pageChange", function QuotationsList_Conditional_10_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
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
export class QuotationsList {
    apiService;
    cdr;
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    quotations = [];
    isLoading = false;
    errorMessage = '';
    sendMessage = '';
    sendingQuotationId = null;
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
    constructor(apiService, cdr) {
        this.apiService = apiService;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.loadQuotations();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadQuotations();
        }
    }
    loadQuotations() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService.get(`Quotations?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`).pipe(catchError(() => {
            this.errorMessage = 'quotationServiceUnavailable';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.quotations ?? pageData;
            this.quotations = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.quotations.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadQuotations();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadQuotations();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadQuotations();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadQuotations();
        }
    }
    sendQuotation(quotation) {
        const id = Number(quotation.id);
        if (!id || this.sendingQuotationId !== null)
            return;
        const isSent = Number(quotation.status) === 2;
        this.sendingQuotationId = id;
        this.errorMessage = '';
        this.sendMessage = '';
        const pdf$ = isSent
            ? this.apiService.getFile(`Quotations/${id}/Pdf`)
            : this.apiService.patch(`Quotations/${id}/Send`, {}).pipe(switchMap((response) => response?.isSuccess === false
                ? throwError(() => new Error(response?.message || 'quotationSendError'))
                : this.apiService.getFile(`Quotations/${id}/Pdf`)));
        pdf$.pipe(catchError(() => {
            this.errorMessage = 'quotationSendError';
            return of(null);
        }), finalize(() => {
            this.sendingQuotationId = null;
            this.cdr.markForCheck();
        })).subscribe((blob) => {
            if (blob === null)
                return;
            if (blob.type.includes('pdf')) {
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = `${quotation.quotationNo ?? `quotation-${id}`}.pdf`;
                anchor.click();
                URL.revokeObjectURL(url);
                this.sendMessage = 'quotationPdfDownloaded';
                if (!isSent)
                    this.loadQuotations();
                return;
            }
            this.errorMessage = 'quotationPdfInvalid';
        });
    }
    static ɵfac = function QuotationsList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || QuotationsList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: QuotationsList, selectors: [["app-configurations-quotations-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 11, vars: 7, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "gap-4", "overflow-y-auto", "pe-1", "md:grid-cols-2"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "grid", "grid-cols-[1fr_1fr_120px_100px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[1fr_1fr_120px_100px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-2xl", "border"], [1, "space-y-3", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "px-4", "py-3", "font-semibold"], [1, "flex", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-primary/40", "text-primary", "transition", "hover:bg-primary", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-50", 3, "click", "disabled"], [1, "mdi"], ["colspan", "5", 1, "p-8", "text-center", "text-slate-500"], [1, "text-sm", "text-slate-500"], [1, "p-4"], [1, "flex", "items-center", "justify-between"], [1, "font-semibold"], [1, "rounded-full", "bg-slate-100", "px-2", "py-0.5", "text-xs", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "mt-2", "text-sm"], [1, "mt-4", "flex", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "border", "border-primary/40", "px-3", "py-1", "text-xs", "font-semibold", "text-primary", "hover:bg-primary", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-50", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function QuotationsList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, QuotationsList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, QuotationsList_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(7, QuotationsList_Conditional_7_Template, 2, 1)(8, QuotationsList_Conditional_8_Template, 23, 16, "div", 5)(9, QuotationsList_Conditional_9_Template, 4, 1, "div", 6);
            i0.ɵɵconditionalCreate(10, QuotationsList_Conditional_10_Template, 13, 11, "div", 7);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.sendMessage ? 2 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 5, "quotationRecords"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 7 : ctx.viewMode === "table" ? 8 : 9);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 10 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QuotationsList, [{
        type: Component,
        args: [{ selector: 'app-configurations-quotations-list', standalone: true, imports: [TranslatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n  @if (sendMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ sendMessage | translate }}</div> }\n  <div class=\"mb-4 flex items-center justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ 'quotationRecords' | translate }}</h2>\n  </div>\n\r\n  @if (isLoading)\r\n  {\r\n  @if (viewMode === 'table') {\r\n  <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\r\n    <div class=\"grid grid-cols-[1fr_1fr_120px_100px_120px] gap-4 bg-slate-50 px-4 py-3\">\r\n      @for (column of [1,2,3,4,5];track column)\r\n      {\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\r\n    </div>\r\n    @for (row of [1,2,3,4,5];track row)\r\n    { <div class=\"grid grid-cols-[1fr_1fr_120px_100px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n    </div> }\r\n  </div>\r\n  }\r\n  @else {\r\n  <div class=\"grid gap-4 md:grid-cols-2\">@for (card of [1,2,3,4]; track card) { <div class=\"overflow-hidden rounded-2xl border\">\r\n      <div class=\"space-y-3 p-4\">\r\n        <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n      </div>\r\n    </div> }</div>\r\n  }\r\n  }\r\n  @else if (viewMode === 'table') {\r\n  <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n    <table class=\"min-w-full text-left text-sm\">\n      <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\n        <tr>\r\n          <th class=\"px-4 py-3\">{{ 'quotationNo' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'customer' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'travelDates' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'totalAmount' | translate }}</th>\n          <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        @for (item of quotations; track item.id) { <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\r\n          <td class=\"px-4 py-3 font-semibold\">{{ item.quotationNo }}</td>\n          <td class=\"px-4 py-3\">{{ item.customerName ?? item.customer?.firstName + ' ' + item.customer?.lastName }}</td>\n          <td class=\"px-4 py-3\">{{ item.travelStartDate }} \u2014 {{ item.travelEndDate }}</td>\n          <td class=\"px-4 py-3\">{{ item.totalAmount }}</td>\n          <td class=\"px-4 py-3\">\r\n            <div class=\"flex gap-2\">\r\n              <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer\" (click)=\"editRequested.emit(item)\"><i class=\"mdi mdi-pencil-outline\"></i></button>\n              <button type=\"button\" [disabled]=\"sendingQuotationId !== null\" class=\"grid h-8 w-8 place-items-center rounded-full border border-primary/40 text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50\" [attr.title]=\"'sendAndDownloadPdf' | translate\" (click)=\"sendQuotation(item)\"><i class=\"mdi\" [class.mdi-loading]=\"sendingQuotationId === item.id\" [class.mdi-spin]=\"sendingQuotationId === item.id\" [class.mdi-file-pdf-box]=\"sendingQuotationId !== item.id\"></i></button>\n            </div>\r\n          </td>\r\n        </tr> } @empty { <tr>\r\n          <td colspan=\"5\" class=\"p-8 text-center text-slate-500\">{{ 'noQuotationsFound' | translate }}</td>\r\n        </tr> }\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  } @else {\r\n  <div class=\"grid max-h-[70vh] gap-4 overflow-y-auto pe-1 md:grid-cols-2\">@for (item of quotations; track item.id) { <article class=\"overflow-hidden rounded-2xl border\">\n      <div class=\"p-4\">\r\n        <div class=\"flex items-center justify-between\">\r\n          <h3 class=\"font-semibold\">{{ item.quotationNo }}</h3>\n          <span class=\"rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold\">{{ item.totalAmount }}</span>\n        </div>\r\n        <p class=\"mt-2 text-sm text-slate-500\">{{ item.customerName }}</p>\n        <p class=\"mt-1 text-sm text-slate-500\">{{ item.travelStartDate }} \u2014 {{ item.travelEndDate }}</p>\n        <p class=\"mt-2 text-sm\">{{ item.notes }}</p>\n        <div class=\"mt-4 flex gap-2\">\r\n          <button type=\"button\" class=\"rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white\" (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button>\n          <button type=\"button\" [disabled]=\"sendingQuotationId !== null\" class=\"inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50\" (click)=\"sendQuotation(item)\">@if (sendingQuotationId === item.id) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'submitting' | translate }}</span> } @else { {{ 'sendAndDownloadPdf' | translate }} }</button>\n        </div>\r\n      </div>\r\n    </article> } @empty { <p class=\"text-sm text-slate-500\">{{ 'noQuotationsFound' | translate }}</p> }</div>\r\n  }\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n      <div class=\"flex flex-wrap items-center gap-2\">\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\n      </div>\n    </div>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(QuotationsList, { className: "QuotationsList", filePath: "app/features/configurations/quotations/quotations-list/quotations-list.ts", lineNumber: 31 }); })();
