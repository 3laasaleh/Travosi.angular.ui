import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id ?? $index;
function ItineraryTimeline_Conditional_0_For_17_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 15);
    i0.ɵɵdomElement(1, "i", 19);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const step_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.value(step_r1), " ");
} }
function ItineraryTimeline_Conditional_0_For_17_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 16);
    i0.ɵɵdomElement(1, "i", 20);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const step_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.time(step_r1), " ");
} }
function ItineraryTimeline_Conditional_0_For_17_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 17);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const step_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.description(step_r1));
} }
function ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 27);
    i0.ɵɵdomElement(1, "i", 19);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const child_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.value(child_r3), " ");
} }
function ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "span", 28);
    i0.ɵɵdomElement(1, "i", 20);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const child_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.time(child_r3), " ");
} }
function ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 29);
    i0.ɵɵtext(1);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const child_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.description(child_r3));
} }
function ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li", 21);
    i0.ɵɵdomElement(1, "span", 22);
    i0.ɵɵdomElementStart(2, "div", 23)(3, "div", 24)(4, "div")(5, "p", 25);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "h4", 26);
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(11, ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Conditional_11_Template, 3, 1, "p", 27);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(12, ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Conditional_12_Template, 3, 1, "span", 28);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(13, ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Conditional_13_Template, 2, 1, "p", 29);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const child_r3 = ctx.$implicit;
    const ɵ$index_68_r4 = ctx.$index;
    const ctx_r4 = i0.ɵɵnextContext(2);
    const step_r1 = ctx_r4.$implicit;
    const ɵ$index_29_r6 = ctx_r4.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(7, 8, "childStep"), " ", ɵ$index_68_r4 + 1, " \u00B7 ", i0.ɵɵpipeBind1(8, 10, "day"), " ", ctx_r1.dayNumber(child_r3, ctx_r1.dayNumber(step_r1, ɵ$index_29_r6 + 1)));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.title(child_r3));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.value(child_r3) ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.time(child_r3) ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.description(child_r3) ? 13 : -1);
} }
function ItineraryTimeline_Conditional_0_For_17_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "ol", 18);
    i0.ɵɵrepeaterCreate(1, ItineraryTimeline_Conditional_0_For_17_Conditional_15_For_2_Template, 14, 12, "li", 21, _forTrack0);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const step_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.children(step_r1));
} }
function ItineraryTimeline_Conditional_0_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li", 10)(1, "span", 11);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "article", 12)(4, "div", 13)(5, "div")(6, "p", 5);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(10, "h3", 14);
    i0.ɵɵtext(11);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(12, ItineraryTimeline_Conditional_0_For_17_Conditional_12_Template, 3, 1, "p", 15);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(13, ItineraryTimeline_Conditional_0_For_17_Conditional_13_Template, 3, 1, "span", 16);
    i0.ɵɵdomElementEnd();
    i0.ɵɵconditionalCreate(14, ItineraryTimeline_Conditional_0_For_17_Conditional_14_Template, 2, 1, "p", 17);
    i0.ɵɵconditionalCreate(15, ItineraryTimeline_Conditional_0_For_17_Conditional_15_Template, 3, 0, "ol", 18);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const ɵ$index_29_r6 = ctx.$index;
    const ɵ$count_29_r7 = ctx.$count;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ɵ$index_29_r6 + 1, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("mb-2", !(ɵ$index_29_r6 === ɵ$count_29_r7 - 1));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(8, 12, "journeyStep"), " ", ɵ$index_29_r6 + 1, " \u00B7 ", i0.ɵɵpipeBind1(9, 14, "day"), " ", ctx_r1.dayNumber(step_r1, ɵ$index_29_r6 + 1));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.title(step_r1));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.value(step_r1) ? 12 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.time(step_r1) ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.description(step_r1) ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.children(step_r1).length ? 15 : -1);
} }
function ItineraryTimeline_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "section", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
    i0.ɵɵdomElement(4, "i", 4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "div")(6, "p", 5);
    i0.ɵɵtext(7, "Sea World Holidays");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "h2", 6);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(11, "p", 7);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵdomElementEnd()()()();
    i0.ɵɵdomElementStart(14, "div", 8)(15, "ol", 9);
    i0.ɵɵrepeaterCreate(16, ItineraryTimeline_Conditional_0_For_17_Template, 16, 16, "li", 10, _forTrack0);
    i0.ɵɵdomElementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 2, "tripItinerary"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 4, "tripItineraryDescription"));
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.itinerary);
} }
export class ItineraryTimeline {
    items = [];
    get itinerary() {
        return Array.isArray(this.items) ? this.items : [];
    }
    children(item) {
        const children = item?.childs ?? item?.Childs ?? item?.children ?? item?.childItineraries;
        return Array.isArray(children) ? children : [];
    }
    dayNumber(item, fallback) {
        const value = Number(item?.dayNumber ?? item?.DayNumber);
        return Number.isInteger(value) && value > 0 ? value : fallback;
    }
    title(item) {
        return String(item?.title ?? item?.Title ?? '');
    }
    value(item) {
        return String(item?.value ?? item?.Value ?? '');
    }
    description(item) {
        return String(item?.description ?? item?.Description ?? '');
    }
    time(item) {
        const start = this.formatTime(item?.startTime ?? item?.StartTime);
        const end = this.formatTime(item?.endTime ?? item?.EndTime);
        if (start && end)
            return `${start} - ${end}`;
        return start || end;
    }
    formatTime(value) {
        if (typeof value !== 'string')
            return '';
        const match = value.match(/^(\d{2}):(\d{2})/);
        return match ? `${match[1]}:${match[2]}` : '';
    }
    static ɵfac = function ItineraryTimeline_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ItineraryTimeline)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ItineraryTimeline, selectors: [["app-itinerary-timeline"]], inputs: { items: "items" }, decls: 1, vars: 1, consts: [[1, "overflow-hidden", "rounded-[2rem]", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "border-b", "border-primary/10", "bg-primary/5", "px-6", "py-7", "md:px-8", "md:py-8"], [1, "flex", "items-start", "gap-4"], [1, "grid", "h-12", "w-12", "shrink-0", "place-items-center", "rounded-2xl", "bg-primary", "text-2xl", "text-white", "shadow-md", "shadow-primary/20"], [1, "mdi", "mdi-map-marker-path"], [1, "text-xs", "font-bold", "uppercase", "tracking-[0.22em]", "text-primary"], [1, "mt-1", "text-2xl", "font-semibold", "text-slate-900", "md:text-3xl"], [1, "mt-2", "max-w-2xl", "text-sm", "leading-6", "text-slate-600"], [1, "p-6", "md:p-8"], [1, "relative", "space-y-6", "before:absolute", "before:bottom-5", "before:start-[1.125rem]", "before:top-5", "before:w-0.5", "before:bg-primary/20"], [1, "relative", "ps-14"], [1, "absolute", "start-0", "top-0", "z-10", "grid", "h-9", "w-9", "place-items-center", "rounded-full", "border-4", "border-white", "bg-primary", "text-sm", "font-bold", "text-white", "shadow-md", "shadow-primary/20"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm", "transition", "hover:border-primary/30", "hover:shadow-md", "sm:p-6"], [1, "flex", "flex-col", "gap-3", "sm:flex-row", "sm:items-start", "sm:justify-between"], [1, "mt-1", "text-xl", "font-semibold", "text-slate-900", "md:text-2xl"], [1, "mt-2", "inline-flex", "items-center", "gap-1.5", "text-sm", "font-medium", "text-slate-500"], [1, "inline-flex", "w-fit", "items-center", "gap-2", "rounded-full", "bg-primary/10", "px-3", "py-1.5", "text-xs", "font-bold", "text-primary"], [1, "mt-4", "whitespace-pre-line", "text-sm", "leading-7", "text-slate-600"], [1, "relative", "mt-6", "space-y-4", "border-t", "border-slate-100", "pt-5", "before:absolute", "before:bottom-3", "before:start-[0.4375rem]", "before:top-8", "before:w-px", "before:bg-primary/20"], [1, "mdi", "mdi-map-marker-outline", "text-primary"], [1, "mdi", "mdi-clock-outline"], [1, "relative", "ps-8"], [1, "absolute", "start-0", "top-1.5", "z-10", "h-3.5", "w-3.5", "rounded-full", "border-[3px]", "border-primary", "bg-white", "shadow-sm"], [1, "rounded-xl", "bg-primary/[0.04]", "p-4"], [1, "flex", "flex-col", "gap-2", "sm:flex-row", "sm:items-start", "sm:justify-between"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-[0.2em]", "text-primary"], [1, "mt-1", "font-semibold", "text-slate-900"], [1, "mt-1", "flex", "items-center", "gap-1.5", "text-xs", "font-medium", "text-slate-500"], [1, "inline-flex", "w-fit", "items-center", "gap-1.5", "text-xs", "font-medium", "text-primary"], [1, "mt-2", "whitespace-pre-line", "text-sm", "leading-6", "text-slate-600"]], template: function ItineraryTimeline_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, ItineraryTimeline_Conditional_0_Template, 18, 6, "section", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.itinerary.length ? 0 : -1);
        } }, dependencies: [TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ItineraryTimeline, [{
        type: Component,
        args: [{ selector: 'app-itinerary-timeline', standalone: true, imports: [TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (itinerary.length) {\n  <section class=\"overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm\">\n    <header class=\"border-b border-primary/10 bg-primary/5 px-6 py-7 md:px-8 md:py-8\">\n      <div class=\"flex items-start gap-4\">\n        <span class=\"grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-2xl text-white shadow-md shadow-primary/20\">\n          <i class=\"mdi mdi-map-marker-path\"></i>\n        </span>\n        <div>\n          <p class=\"text-xs font-bold uppercase tracking-[0.22em] text-primary\">Sea World Holidays</p>\n          <h2 class=\"mt-1 text-2xl font-semibold text-slate-900 md:text-3xl\">{{ 'tripItinerary' | translate }}</h2>\n          <p class=\"mt-2 max-w-2xl text-sm leading-6 text-slate-600\">{{ 'tripItineraryDescription' | translate }}</p>\n        </div>\n      </div>\n    </header>\n\n    <div class=\"p-6 md:p-8\">\n      <ol class=\"relative space-y-6 before:absolute before:bottom-5 before:start-[1.125rem] before:top-5 before:w-0.5 before:bg-primary/20\">\n        @for (step of itinerary; track step.id ?? $index; let stepIndex = $index; let last = $last) {\n          <li class=\"relative ps-14\">\n            <span class=\"absolute start-0 top-0 z-10 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-primary text-sm font-bold text-white shadow-md shadow-primary/20\">\n              {{ stepIndex + 1 }}\n            </span>\n\n            <article class=\"rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md sm:p-6\" [class.mb-2]=\"!last\">\n              <div class=\"flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between\">\n                <div>\n                  <p class=\"text-xs font-bold uppercase tracking-[0.22em] text-primary\">{{ 'journeyStep' | translate }} {{ stepIndex + 1 }} \u00B7 {{ 'day' | translate }} {{ dayNumber(step, stepIndex + 1) }}</p>\n                  <h3 class=\"mt-1 text-xl font-semibold text-slate-900 md:text-2xl\">{{ title(step) }}</h3>\n                  @if (value(step)) {\n                    <p class=\"mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500\">\n                      <i class=\"mdi mdi-map-marker-outline text-primary\"></i>{{ value(step) }}\n                    </p>\n                  }\n                </div>\n                @if (time(step)) {\n                  <span class=\"inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary\">\n                    <i class=\"mdi mdi-clock-outline\"></i>{{ time(step) }}\n                  </span>\n                }\n              </div>\n\n              @if (description(step)) {\n                <p class=\"mt-4 whitespace-pre-line text-sm leading-7 text-slate-600\">{{ description(step) }}</p>\n              }\n\n              @if (children(step).length) {\n                <ol class=\"relative mt-6 space-y-4 border-t border-slate-100 pt-5 before:absolute before:bottom-3 before:start-[0.4375rem] before:top-8 before:w-px before:bg-primary/20\">\n                  @for (child of children(step); track child.id ?? $index; let childIndex = $index) {\n                    <li class=\"relative ps-8\">\n                      <span class=\"absolute start-0 top-1.5 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-primary bg-white shadow-sm\"></span>\n                      <div class=\"rounded-xl bg-primary/[0.04] p-4\">\n                        <div class=\"flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between\">\n                          <div>\n                            <p class=\"text-[10px] font-bold uppercase tracking-[0.2em] text-primary\">{{ 'childStep' | translate }} {{ childIndex + 1 }} \u00B7 {{ 'day' | translate }} {{ dayNumber(child, dayNumber(step, stepIndex + 1)) }}</p>\n                            <h4 class=\"mt-1 font-semibold text-slate-900\">{{ title(child) }}</h4>\n                            @if (value(child)) {\n                              <p class=\"mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500\">\n                                <i class=\"mdi mdi-map-marker-outline text-primary\"></i>{{ value(child) }}\n                              </p>\n                            }\n                          </div>\n                          @if (time(child)) {\n                            <span class=\"inline-flex w-fit items-center gap-1.5 text-xs font-medium text-primary\">\n                              <i class=\"mdi mdi-clock-outline\"></i>{{ time(child) }}\n                            </span>\n                          }\n                        </div>\n                        @if (description(child)) {\n                          <p class=\"mt-2 whitespace-pre-line text-sm leading-6 text-slate-600\">{{ description(child) }}</p>\n                        }\n                      </div>\n                    </li>\n                  }\n                </ol>\n              }\n            </article>\n          </li>\n        }\n      </ol>\n    </div>\n  </section>\n}\n" }]
    }], null, { items: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ItineraryTimeline, { className: "ItineraryTimeline", filePath: "app/shared/components/itinerary-timeline/itinerary-timeline.ts", lineNumber: 11 }); })();
