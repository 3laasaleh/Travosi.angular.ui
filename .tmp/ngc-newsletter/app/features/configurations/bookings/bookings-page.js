import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../user/_services/auth.service';
import { BookingsFromCard } from './bookings-from-card/bookings-from-card';
import { BookingsList } from './bookings-list/bookings-list';
import * as i0 from "@angular/core";
function Bookings_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelementStart(2, "button", 12);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵlistener("click", function Bookings_Conditional_19_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedBooking()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 13)(5, "app-bookings-from-card", 14);
    i0.ɵɵlistener("bookingSaved", function Bookings_Conditional_19_Template_app_bookings_from_card_bookingSaved_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleBookingSaved()); })("editCancelled", function Bookings_Conditional_19_Template_app_bookings_from_card_editCancelled_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedBooking()); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 3, "assignBookingAgent"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 5, "close"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("selectedBooking", ctx_r1.selectedBooking);
} }
export class Bookings {
    authService = inject(AuthService);
    viewMode = 'table';
    selectedBooking = null;
    refreshToken = 0;
    get isAdmin() {
        return this.authService.getCurrentUserRole() === 'Admin';
    }
    selectBookingForEdit(booking) {
        this.selectedBooking = booking;
    }
    clearSelectedBooking() {
        this.selectedBooking = null;
        this.refreshToken++;
    }
    handleBookingSaved() {
        this.selectedBooking = null;
        this.refreshToken++;
    }
    static ɵfac = function Bookings_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Bookings)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Bookings, selectors: [["app-bookings"]], decls: 20, vars: 19, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "mdi"], [1, "grid", "grid-cols-1", "gap-6"], [3, "editRequested", "viewMode", "refreshToken"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-[9999]", "grid", "place-items-center", "overflow-y-auto", "bg-slate-950/60", "p-4", "backdrop-blur-sm"], ["type", "button", 1, "absolute", "inset-0", "cursor-default", 3, "click"], [1, "relative", "z-10", "w-full", "max-w-2xl"], [3, "bookingSaved", "editCancelled", "selectedBooking"]], template: function Bookings_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵlistener("click", function Bookings_Template_button_click_14_listener() { return ctx.viewMode = ctx.viewMode === "table" ? "grid" : "table"; });
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "div", 9)(18, "app-configurations-bookings-list", 10);
            i0.ɵɵlistener("editRequested", function Bookings_Template_app_configurations_bookings_list_editRequested_18_listener($event) { return ctx.selectBookingForEdit($event); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵconditionalCreate(19, Bookings_Conditional_19_Template, 6, 7, "div", 11);
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 11, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 13, "bookings"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 15, "manageBookings"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 17, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-view-grid-outline", ctx.viewMode === "table")("mdi-table", ctx.viewMode === "grid");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("viewMode", ctx.viewMode)("refreshToken", ctx.refreshToken);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedBooking ? 19 : -1);
        } }, dependencies: [BookingsFromCard, BookingsList, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Bookings, [{
        type: Component,
        args: [{ selector: 'app-bookings', standalone: true, imports: [TranslatePipe, BookingsFromCard, BookingsList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\n      <div><p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p><h1 class=\"mt-2 text-3xl font-semibold\">{{ 'bookings' | translate }}</h1><p class=\"mt-2 text-sm text-slate-500\">{{ 'manageBookings' | translate }}</p></div>\n      <div class=\"flex gap-3\">\n        \n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\"><i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i></button>\n      </div>\n    </header>\n    <div class=\"grid grid-cols-1 gap-6\">\n      <app-configurations-bookings-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (editRequested)=\"selectBookingForEdit($event)\" />\n    </div>\n  </div>\n</section>\n\n@if (selectedBooking) {\n  <div class=\"fixed inset-0 z-[9999] grid place-items-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm\" role=\"dialog\" aria-modal=\"true\" [attr.aria-label]=\"'assignBookingAgent' | translate\">\n    <button type=\"button\" class=\"absolute inset-0 cursor-default\" [attr.aria-label]=\"'close' | translate\" (click)=\"clearSelectedBooking()\"></button>\n    <div class=\"relative z-10 w-full max-w-2xl\"><app-bookings-from-card [selectedBooking]=\"selectedBooking\" (bookingSaved)=\"handleBookingSaved()\" (editCancelled)=\"clearSelectedBooking()\" /></div>\n  </div>\n}\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Bookings, { className: "Bookings", filePath: "app/features/configurations/bookings/bookings-page.ts", lineNumber: 15 }); })();
