import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
function PaginationOne_For_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 7);
    i0.ɵɵtext(1, "\u2026");
    i0.ɵɵdomElementEnd();
} }
function PaginationOne_For_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 9);
    i0.ɵɵdomListener("click", function PaginationOne_For_7_Conditional_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const page_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToPage(page_r2)); });
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const page_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("z-10", page_r2 === ctx_r2.normalizedCurrentPage)("border-primary", page_r2 === ctx_r2.normalizedCurrentPage)("bg-primary", page_r2 === ctx_r2.normalizedCurrentPage)("text-white", page_r2 === ctx_r2.normalizedCurrentPage)("border-gray-100", page_r2 !== ctx_r2.normalizedCurrentPage)("bg-white", page_r2 !== ctx_r2.normalizedCurrentPage)("text-slate-400", page_r2 !== ctx_r2.normalizedCurrentPage)("enabled:hover:border-primary", page_r2 !== ctx_r2.normalizedCurrentPage)("enabled:hover:bg-primary", page_r2 !== ctx_r2.normalizedCurrentPage)("enabled:hover:text-white", page_r2 !== ctx_r2.normalizedCurrentPage)("dark:border-gray-800", page_r2 !== ctx_r2.normalizedCurrentPage)("", page_r2 !== ctx_r2.normalizedCurrentPage)("dark:enabled:hover:border-primary", page_r2 !== ctx_r2.normalizedCurrentPage)("dark:enabled:hover:bg-primary", page_r2 !== ctx_r2.normalizedCurrentPage);
    i0.ɵɵattribute("aria-current", page_r2 === ctx_r2.normalizedCurrentPage ? "page" : null)("aria-label", "Page " + page_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(page_r2);
} }
function PaginationOne_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li");
    i0.ɵɵconditionalCreate(1, PaginationOne_For_7_Conditional_1_Template, 2, 0, "span", 7)(2, PaginationOne_For_7_Conditional_2_Template, 2, 31, "button", 8);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const page_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵconditional(page_r2 === "ellipsis" ? 1 : 2);
} }
export class PaginationOne {
    currentPage = 1;
    totalPages = 5;
    maxVisiblePages = 5;
    compact = false;
    pageChange = new EventEmitter();
    get normalizedTotalPages() {
        return Math.max(1, Math.floor(Number(this.totalPages) || 1));
    }
    get normalizedCurrentPage() {
        return Math.min(this.normalizedTotalPages, Math.max(1, Math.floor(Number(this.currentPage) || 1)));
    }
    get visiblePages() {
        const totalPages = this.normalizedTotalPages;
        const maxVisiblePages = Math.max(3, Math.floor(Number(this.maxVisiblePages) || 5));
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }
        const currentPage = this.normalizedCurrentPage;
        const middlePageCount = Math.max(1, maxVisiblePages - 2);
        let startPage = Math.max(2, currentPage - Math.floor(middlePageCount / 2));
        let endPage = startPage + middlePageCount - 1;
        if (endPage >= totalPages) {
            endPage = totalPages - 1;
            startPage = Math.max(2, endPage - middlePageCount + 1);
        }
        const pages = [1];
        if (startPage > 2) {
            pages.push('ellipsis');
        }
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }
        if (endPage < totalPages - 1) {
            pages.push('ellipsis');
        }
        pages.push(totalPages);
        return pages;
    }
    goToPage(page) {
        const targetPage = Math.min(this.normalizedTotalPages, Math.max(1, Math.floor(Number(page) || 1)));
        if (targetPage === this.normalizedCurrentPage)
            return;
        this.currentPage = targetPage;
        this.pageChange.emit(targetPage);
    }
    static ɵfac = function PaginationOne_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PaginationOne)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaginationOne, selectors: [["app-pagination-one"]], inputs: { currentPage: "currentPage", totalPages: "totalPages", maxVisiblePages: "maxVisiblePages", compact: "compact" }, outputs: { pageChange: "pageChange" }, decls: 11, vars: 4, consts: [[1, "flex", "justify-center"], ["aria-label", "Pagination"], [1, "inline-flex", "items-center", "-space-x-px"], ["type", "button", "aria-label", "Previous page", 1, "inline-flex", "size-[40px]", "items-center", "justify-center", "rounded-s-3xl", "border", "border-gray-100", "bg-white", "text-slate-400", "enabled:hover:border-primary", "enabled:hover:bg-primary", "enabled:hover:text-white", "dark:border-gray-800", "dark:enabled:hover:border-primary", "dark:enabled:hover:bg-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-chevron-left", "text-xl", "rtl:rotate-180"], ["type", "button", "aria-label", "Next page", 1, "inline-flex", "size-[40px]", "items-center", "justify-center", "rounded-e-3xl", "border", "border-gray-100", "bg-white", "text-slate-400", "enabled:hover:border-primary", "enabled:hover:bg-primary", "enabled:hover:text-white", "dark:border-gray-800", "dark:enabled:hover:border-primary", "dark:enabled:hover:bg-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-chevron-right", "text-xl", "rtl:rotate-180"], ["aria-hidden", "true", 1, "inline-flex", "size-[40px]", "items-center", "justify-center", "border", "border-gray-100", "bg-white", "text-slate-400", "dark:border-gray-800"], ["type", "button", 1, "inline-flex", "size-[40px]", "items-center", "justify-center", "border", 3, "z-10", "border-primary", "bg-primary", "text-white", "border-gray-100", "bg-white", "text-slate-400", "enabled:hover:border-primary", "enabled:hover:bg-primary", "enabled:hover:text-white", "dark:border-gray-800", "", "dark:enabled:hover:border-primary", "dark:enabled:hover:bg-primary"], ["type", "button", 1, "inline-flex", "size-[40px]", "items-center", "justify-center", "border", 3, "click"]], template: function PaginationOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "nav", 1)(2, "ul", 2)(3, "li")(4, "button", 3);
            i0.ɵɵdomListener("click", function PaginationOne_Template_button_click_4_listener() { return ctx.goToPage(ctx.normalizedCurrentPage - 1); });
            i0.ɵɵdomElement(5, "i", 4);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵrepeaterCreate(6, PaginationOne_For_7_Template, 3, 1, "li", null, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵdomElementStart(8, "li")(9, "button", 5);
            i0.ɵɵdomListener("click", function PaginationOne_Template_button_click_9_listener() { return ctx.goToPage(ctx.normalizedCurrentPage + 1); });
            i0.ɵɵdomElement(10, "i", 6);
            i0.ɵɵdomElementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵclassProp("mt-6", !ctx.compact);
            i0.ɵɵadvance(4);
            i0.ɵɵdomProperty("disabled", ctx.normalizedCurrentPage === 1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.visiblePages);
            i0.ɵɵadvance(3);
            i0.ɵɵdomProperty("disabled", ctx.normalizedCurrentPage === ctx.normalizedTotalPages);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaginationOne, [{
        type: Component,
        args: [{ selector: 'app-pagination-one', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"flex justify-center\" [class.mt-6]=\"!compact\">\n  <nav aria-label=\"Pagination\">\n    <ul class=\"inline-flex items-center -space-x-px\">\n      <li>\n        <button\n          type=\"button\"\n          aria-label=\"Previous page\"\n          class=\"inline-flex size-[40px] items-center justify-center rounded-s-3xl border border-gray-100 bg-white text-slate-400 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-white dark:border-gray-800  dark:enabled:hover:border-primary dark:enabled:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60\"\n          [disabled]=\"normalizedCurrentPage === 1\"\n          (click)=\"goToPage(normalizedCurrentPage - 1)\"\n        >\n          <i class=\"mdi mdi-chevron-left text-xl rtl:rotate-180\" aria-hidden=\"true\"></i>\n        </button>\n      </li>\n\n      @for (page of visiblePages; track $index) {\n        <li>\n          @if (page === 'ellipsis') {\n            <span\n              class=\"inline-flex size-[40px] items-center justify-center border border-gray-100 bg-white text-slate-400 dark:border-gray-800 \"\n              aria-hidden=\"true\"\n            >\u2026</span>\n          } @else {\n            <button\n              type=\"button\"\n              class=\"inline-flex size-[40px] items-center justify-center border\"\n              [class.z-10]=\"page === normalizedCurrentPage\"\n              [class.border-primary]=\"page === normalizedCurrentPage\"\n              [class.bg-primary]=\"page === normalizedCurrentPage\"\n              [class.text-white]=\"page === normalizedCurrentPage\"\n              [class.border-gray-100]=\"page !== normalizedCurrentPage\"\n              [class.bg-white]=\"page !== normalizedCurrentPage\"\n              [class.text-slate-400]=\"page !== normalizedCurrentPage\"\n              [class.enabled:hover:border-primary]=\"page !== normalizedCurrentPage\"\n              [class.enabled:hover:bg-primary]=\"page !== normalizedCurrentPage\"\n              [class.enabled:hover:text-white]=\"page !== normalizedCurrentPage\"\n              [class.dark:border-gray-800]=\"page !== normalizedCurrentPage\"\n              [class.]=\"page !== normalizedCurrentPage\"\n              [class.dark:enabled:hover:border-primary]=\"page !== normalizedCurrentPage\"\n              [class.dark:enabled:hover:bg-primary]=\"page !== normalizedCurrentPage\"\n              [attr.aria-current]=\"page === normalizedCurrentPage ? 'page' : null\"\n              [attr.aria-label]=\"'Page ' + page\"\n              (click)=\"goToPage(page)\"\n            >{{ page }}</button>\n          }\n        </li>\n      }\n\n      <li>\n        <button\n          type=\"button\"\n          aria-label=\"Next page\"\n          class=\"inline-flex size-[40px] items-center justify-center rounded-e-3xl border border-gray-100 bg-white text-slate-400 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-white dark:border-gray-800  dark:enabled:hover:border-primary dark:enabled:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60\"\n          [disabled]=\"normalizedCurrentPage === normalizedTotalPages\"\n          (click)=\"goToPage(normalizedCurrentPage + 1)\"\n        >\n          <i class=\"mdi mdi-chevron-right text-xl rtl:rotate-180\" aria-hidden=\"true\"></i>\n        </button>\n      </li>\n    </ul>\n  </nav>\n</div>\n" }]
    }], null, { currentPage: [{
            type: Input
        }], totalPages: [{
            type: Input
        }], maxVisiblePages: [{
            type: Input
        }], compact: [{
            type: Input
        }], pageChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PaginationOne, { className: "PaginationOne", filePath: "app/shared/components/listing/tour-grid/pagination-one/pagination-one.ts", lineNumber: 8 }); })();
