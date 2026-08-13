import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BookingsList } from '../bookings/bookings-list/bookings-list';
import * as i0 from "@angular/core";
export class AgentBookingManager {
    static ɵfac = function AgentBookingManager_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AgentBookingManager)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AgentBookingManager, selectors: [["app-agent-booking-manager"]], decls: 14, vars: 9, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "md:flex-row", "md:items-end", "md:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"]], template: function AgentBookingManager_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(13, "app-configurations-bookings-list");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 3, "agent"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 5, "bookings"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 7, "manageBookings"));
        } }, dependencies: [BookingsList, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AgentBookingManager, [{
        type: Component,
        args: [{ selector: 'app-agent-booking-manager', standalone: true, imports: [TranslatePipe, BookingsList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between\">\n      <div><p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'agent' | translate }}</p><h1 class=\"mt-2 text-3xl font-semibold\">{{ 'bookings' | translate }}</h1><p class=\"mt-2 text-sm text-slate-500\">{{ 'manageBookings' | translate }}</p></div>\n      \n    </header>\n    <app-configurations-bookings-list />\n  </div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AgentBookingManager, { className: "AgentBookingManager", filePath: "app/features/configurations/agent-booking-manager/agent-booking-manager.ts", lineNumber: 13 }); })();
