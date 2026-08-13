import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FlightsFromCard } from './flights-from-card/flights-from-card';
import { FlightsList } from './flights-list/flights-list';
import * as i0 from "@angular/core";
function Flights_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-flights-from-card", 13);
    i0.ɵɵlistener("flightSaved", function Flights_Conditional_21_Template_app_flights_from_card_flightSaved_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleFlightSaved()); })("editCancelled", function Flights_Conditional_21_Template_app_flights_from_card_editCancelled_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedFlight()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedFlight", ctx_r1.selectedFlight);
} }
function Flights_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-configurations-flights-list", 14);
    i0.ɵɵlistener("editRequested", function Flights_Conditional_22_Template_app_configurations_flights_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectFlightForEdit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
export class Flights {
    viewMode = 'table';
    showForm = false;
    selectedFlight = null;
    refreshToken = 0;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedFlight = null;
    }
    selectFlightForEdit(flight) {
        this.selectedFlight = flight;
        this.showForm = true;
    }
    clearSelectedFlight() {
        this.selectedFlight = null;
        this.showForm = false;
    }
    handleFlightSaved() {
        this.selectedFlight = null;
        this.showForm = false;
        this.refreshToken++;
    }
    static ɵfac = function Flights_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Flights)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Flights, selectors: [["app-flights"]], decls: 23, vars: 25, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "grid", "grid-cols-1", "gap-6"], [3, "selectedFlight"], [3, "viewMode", "refreshToken"], [3, "flightSaved", "editCancelled", "selectedFlight"], [3, "editRequested", "viewMode", "refreshToken"]], template: function Flights_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵlistener("click", function Flights_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 9);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵlistener("click", function Flights_Template_button_click_17_listener() { return ctx.viewMode = ctx.viewMode === "table" ? "grid" : "table"; });
            i0.ɵɵelement(19, "i", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 10);
            i0.ɵɵconditionalCreate(21, Flights_Conditional_21_Template, 1, 1, "app-flights-from-card", 11)(22, Flights_Conditional_22_Template, 1, 2, "app-configurations-flights-list", 12);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 15, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 17, "flights"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 19, "manageFlightDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 21, ctx.showForm ? "hideAddFlight" : "showAddFlight"))("aria-expanded", ctx.showForm);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showForm)("mdi-plus", !ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(18, 23, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-view-grid-outline", ctx.viewMode === "table")("mdi-table", ctx.viewMode === "grid");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showForm ? 21 : 22);
        } }, dependencies: [FlightsFromCard, FlightsList, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Flights, [{
        type: Component,
        args: [{ selector: 'app-flights', standalone: true, imports: [TranslatePipe, FlightsFromCard, FlightsList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\r\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\r\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\r\n      <div><p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p><h1 class=\"mt-2 text-3xl font-semibold\">{{ 'flights' | translate }}</h1><p class=\"mt-2 text-sm text-slate-500\">{{ 'manageFlightDetails' | translate }}</p></div>\r\n      <div class=\"flex gap-3\">\r\n        \r\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"(showForm ? 'hideAddFlight' : 'showAddFlight') | translate\" [attr.aria-expanded]=\"showForm\" (click)=\"toggleForm()\"><i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\"></i></button>\r\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\"><i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i></button>\r\n      </div>\r\n    </header>\r\n    <div class=\"grid grid-cols-1 gap-6\">\n      @if (showForm) {\n        <app-flights-from-card [selectedFlight]=\"selectedFlight\" (flightSaved)=\"handleFlightSaved()\" (editCancelled)=\"clearSelectedFlight()\" />\n      } @else {\n        <app-configurations-flights-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (editRequested)=\"selectFlightForEdit($event)\" />\n      }\n    </div>\r\n  </div>\r\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Flights, { className: "Flights", filePath: "app/features/configurations/flights/flights-page.ts", lineNumber: 14 }); })();
