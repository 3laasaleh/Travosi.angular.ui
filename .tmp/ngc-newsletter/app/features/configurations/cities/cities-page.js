import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CitiesFromCard } from './cities-from-card/cities-from-card';
import { CitiesList } from './cities-list/cities-list';
import * as i0 from "@angular/core";
function Cities_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-cities-from-card", 13);
    i0.ɵɵlistener("citySaved", function Cities_Conditional_21_Template_app_cities_from_card_citySaved_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleCitySaved()); })("editCancelled", function Cities_Conditional_21_Template_app_cities_from_card_editCancelled_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedCity()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedCity", ctx_r1.selectedCity);
} }
function Cities_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-configurations-cities-list", 14);
    i0.ɵɵlistener("editRequested", function Cities_Conditional_22_Template_app_configurations_cities_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectCityForEdit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
export class Cities {
    viewMode = 'table';
    showForm = false;
    selectedCity = null;
    refreshToken = 0;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedCity = null;
    }
    selectCityForEdit(city) {
        this.selectedCity = city;
        this.showForm = true;
    }
    clearSelectedCity() {
        this.selectedCity = null;
        this.showForm = false;
    }
    handleCitySaved() {
        this.selectedCity = null;
        this.showForm = false;
        this.refreshToken++;
    }
    static ɵfac = function Cities_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Cities)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Cities, selectors: [["app-cities"]], decls: 23, vars: 25, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "grid", "grid-cols-1", "gap-6"], [3, "selectedCity"], [3, "viewMode", "refreshToken"], [3, "citySaved", "editCancelled", "selectedCity"], [3, "editRequested", "viewMode", "refreshToken"]], template: function Cities_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵlistener("click", function Cities_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 9);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵlistener("click", function Cities_Template_button_click_17_listener() { return ctx.viewMode = ctx.viewMode === "table" ? "grid" : "table"; });
            i0.ɵɵelement(19, "i", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 10);
            i0.ɵɵconditionalCreate(21, Cities_Conditional_21_Template, 1, 1, "app-cities-from-card", 11)(22, Cities_Conditional_22_Template, 1, 2, "app-configurations-cities-list", 12);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 15, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 17, "cities"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 19, "manageCityDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 21, ctx.showForm ? "hideAddCity" : "showAddCity"))("aria-expanded", ctx.showForm);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showForm)("mdi-plus", !ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(18, 23, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-view-grid-outline", ctx.viewMode === "table")("mdi-table", ctx.viewMode === "grid");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showForm ? 21 : 22);
        } }, dependencies: [CitiesFromCard, CitiesList, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Cities, [{
        type: Component,
        args: [{ selector: 'app-cities', standalone: true, imports: [TranslatePipe, CitiesFromCard, CitiesList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\n      <div>\n        <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p>\n        <h1 class=\"mt-2 text-3xl font-semibold\">{{ 'cities' | translate }}</h1>\n        <p class=\"mt-2 text-sm text-slate-500\">{{ 'manageCityDetails' | translate }}</p>\n      </div>\n      <div class=\"flex gap-3\">\n        \n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"(showForm ? 'hideAddCity' : 'showAddCity') | translate\" [attr.aria-expanded]=\"showForm\" (click)=\"toggleForm()\">\n          <i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\"></i>\n        </button>\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\">\n          <i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i>\n        </button>\n      </div>\n    </header>\n\n    <div class=\"grid grid-cols-1 gap-6\">\n      @if (showForm) {\n        <app-cities-from-card [selectedCity]=\"selectedCity\" (citySaved)=\"handleCitySaved()\" (editCancelled)=\"clearSelectedCity()\" />\n      } @else {\n        <app-configurations-cities-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (editRequested)=\"selectCityForEdit($event)\" />\n      }\n    </div>\n  </div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Cities, { className: "Cities", filePath: "app/features/configurations/cities/cities-page.ts", lineNumber: 14 }); })();
