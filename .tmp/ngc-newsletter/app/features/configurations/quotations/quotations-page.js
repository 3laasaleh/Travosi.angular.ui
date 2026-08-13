import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { QuotationsFromCard } from './quotations-from-card/quotations-from-card';
import { QuotationsList } from './quotations-list/quotations-list';
import * as i0 from "@angular/core";
function Quotations_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-quotations-from-card", 13);
    i0.ɵɵlistener("quotationSaved", function Quotations_Conditional_21_Template_app_quotations_from_card_quotationSaved_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleQuotationSaved()); })("editCancelled", function Quotations_Conditional_21_Template_app_quotations_from_card_editCancelled_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedQuotation()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedQuotation", ctx_r1.selectedQuotation);
} }
function Quotations_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-configurations-quotations-list", 14);
    i0.ɵɵlistener("editRequested", function Quotations_Conditional_22_Template_app_configurations_quotations_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectQuotationForEdit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
export class Quotations {
    viewMode = 'table';
    showForm = false;
    selectedQuotation = null;
    refreshToken = 0;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedQuotation = null;
    }
    selectQuotationForEdit(quotation) {
        this.selectedQuotation = quotation;
        this.showForm = true;
    }
    clearSelectedQuotation() {
        this.selectedQuotation = null;
        this.showForm = false;
    }
    handleQuotationSaved() {
        this.selectedQuotation = null;
        this.showForm = false;
        this.refreshToken++;
    }
    static ɵfac = function Quotations_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Quotations)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Quotations, selectors: [["app-quotations"]], decls: 23, vars: 25, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "grid", "grid-cols-1", "gap-6"], [3, "selectedQuotation"], [3, "viewMode", "refreshToken"], [3, "quotationSaved", "editCancelled", "selectedQuotation"], [3, "editRequested", "viewMode", "refreshToken"]], template: function Quotations_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "header", 2)(3, "div")(4, "p", 3);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h1", 4);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 5);
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 6)(14, "button", 7);
            i0.ɵɵpipe(15, "translate");
            i0.ɵɵlistener("click", function Quotations_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 9);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵlistener("click", function Quotations_Template_button_click_17_listener() { return ctx.viewMode = ctx.viewMode === "table" ? "grid" : "table"; });
            i0.ɵɵelement(19, "i", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 10);
            i0.ɵɵconditionalCreate(21, Quotations_Conditional_21_Template, 1, 1, "app-quotations-from-card", 11)(22, Quotations_Conditional_22_Template, 1, 2, "app-configurations-quotations-list", 12);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 15, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 17, "quotations"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 19, "manageQuotationDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 21, ctx.showForm ? "hideAddQuotation" : "showAddQuotation"))("aria-expanded", ctx.showForm);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showForm)("mdi-plus", !ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(18, 23, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-view-grid-outline", ctx.viewMode === "table")("mdi-table", ctx.viewMode === "grid");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showForm ? 21 : 22);
        } }, dependencies: [QuotationsFromCard, QuotationsList, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Quotations, [{
        type: Component,
        args: [{ selector: 'app-quotations', standalone: true, imports: [TranslatePipe, QuotationsFromCard, QuotationsList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\r\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\r\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\r\n      <div><p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p><h1 class=\"mt-2 text-3xl font-semibold\">{{ 'quotations' | translate }}</h1><p class=\"mt-2 text-sm text-slate-500\">{{ 'manageQuotationDetails' | translate }}</p></div>\n      <div class=\"flex gap-3\">\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"(showForm ? 'hideAddQuotation' : 'showAddQuotation') | translate\" [attr.aria-expanded]=\"showForm\" (click)=\"toggleForm()\">\n          <i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\"></i>\n        </button>\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\"><i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i></button>\n      </div>\n    </header>\n    <div class=\"grid grid-cols-1 gap-6\">\n      @if (showForm) {\n        <app-quotations-from-card [selectedQuotation]=\"selectedQuotation\" (quotationSaved)=\"handleQuotationSaved()\" (editCancelled)=\"clearSelectedQuotation()\" />\n      } @else {\n        <app-configurations-quotations-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (editRequested)=\"selectQuotationForEdit($event)\" />\n      }\n    </div>\n  </div>\r\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Quotations, { className: "Quotations", filePath: "app/features/configurations/quotations/quotations-page.ts", lineNumber: 14 }); })();
