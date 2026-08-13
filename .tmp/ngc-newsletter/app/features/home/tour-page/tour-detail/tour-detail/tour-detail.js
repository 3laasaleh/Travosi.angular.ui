import { ChangeDetectionStrategy, Component, Input, inject, } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CurrencyService } from '../../../../../core/services/currency.service';
import { formatHomePrice } from '../../../home-price.util';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id ?? $index;
function TourDetail_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 8);
    i0.ɵɵdomElement(1, "i", 28);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.destinationName, " ");
} }
function TourDetail_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate2(" \u00B7 ", ctx_r0.durationHours, " ", i0.ɵɵpipeBind1(1, 2, "hours"), " ");
} }
function TourDetail_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "section", 26)(1, "div", 29)(2, "span", 30);
    i0.ɵɵdomElement(3, "i", 31);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "div")(5, "p", 32);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "h2", 33);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(11, "p", 34);
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 3, "tour"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 5, "tourDescriptions"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.description);
} }
function TourDetail_Conditional_65_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 42)(1, "span", 43);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p", 44);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ɵ$index_157_r3 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_157_r3 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.itemValue(item_r2));
} }
function TourDetail_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "section", 27);
    i0.ɵɵdomElement(1, "div", 35);
    i0.ɵɵdomElementStart(2, "div", 36)(3, "span", 37);
    i0.ɵɵdomElement(4, "i", 38);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "div")(6, "p", 39);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(9, "h2", 40);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(12, "div", 41);
    i0.ɵɵrepeaterCreate(13, TourDetail_Conditional_65_For_14_Template, 5, 2, "div", 42, _forTrack0);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 2, "exploreNow"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 4, "tourHighlights"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.highlightItems);
} }
function TourDetail_Conditional_66_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li", 54);
    i0.ɵɵdomElement(1, "i", 60);
    i0.ɵɵdomElementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.itemValue(item_r4));
} }
function TourDetail_Conditional_66_ForEmpty_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li", 55);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noTourIncludesAdded"));
} }
function TourDetail_Conditional_66_For_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li", 54);
    i0.ɵɵdomElement(1, "i", 61);
    i0.ɵɵdomElementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.itemValue(item_r5));
} }
function TourDetail_Conditional_66_ForEmpty_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li", 55);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noTourExcludesAdded"));
} }
function TourDetail_Conditional_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "section", 1)(1, "div", 45)(2, "p", 46);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "h2", 40);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(8, "div", 47)(9, "div", 48)(10, "div", 29)(11, "span", 49);
    i0.ɵɵdomElement(12, "i", 50);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "div")(14, "h3", 51);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(17, "p", 52);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "translate");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(20, "ul", 53);
    i0.ɵɵrepeaterCreate(21, TourDetail_Conditional_66_For_22_Template, 4, 1, "li", 54, _forTrack0, false, TourDetail_Conditional_66_ForEmpty_23_Template, 3, 3, "li", 55);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(24, "div", 56)(25, "div", 29)(26, "span", 57);
    i0.ɵɵdomElement(27, "i", 58);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(28, "div")(29, "h3", 59);
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(32, "p", 52);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "translate");
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵdomElementStart(35, "ul", 53);
    i0.ɵɵrepeaterCreate(36, TourDetail_Conditional_66_For_37_Template, 4, 1, "li", 54, _forTrack0, false, TourDetail_Conditional_66_ForEmpty_38_Template, 3, 3, "li", 55);
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 10, "tour"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 12, "whatsIncludedExcluded"));
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 14, "included"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.includedItems.length, " ", i0.ɵɵpipeBind1(19, 16, "items"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.includedItems);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(31, 18, "excluded"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.excludedItems.length, " ", i0.ɵɵpipeBind1(34, 20, "items"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.excludedItems);
} }
export class TourDetail {
    currencyService = inject(CurrencyService);
    tour = null;
    get title() {
        return (this.tour?.titleEng ??
            this.tour?.nameEng ??
            this.tour?.title ??
            this.tour?.name ??
            '');
    }
    get destinationName() {
        return (this.tour?.destinationName ??
            this.tour?.destination?.nameEng ??
            this.tour?.destination?.name ??
            '');
    }
    get durationDays() {
        return this.tour?.durationDays ?? this.tour?.days ?? this.tour?.duration ?? 0;
    }
    get durationHours() {
        return this.tour?.durationHours ?? this.tour?.durationhours ?? this.tour?.hours ?? 0;
    }
    get tourType() {
        return (this.tour?.typeName ??
            this.tour?.tourType ??
            this.tour?.type ??
            this.tour?.categoryName ??
            '-');
    }
    get groupSize() {
        return this.tour?.maxSeats ?? this.tour?.groupSize ?? this.tour?.capacity ?? 0;
    }
    get languages() {
        const languages = this.tour?.languages ?? this.tour?.language;
        if (Array.isArray(languages)) {
            return languages
                .map((language) => language?.name ?? language?.nameEng ?? language)
                .filter(Boolean)
                .join(', ');
        }
        return languages || '-';
    }
    get formattedPrice() {
        return formatHomePrice(this.currencyService, this.tour?.pricePerPerson ?? this.tour?.price, this.tour);
    }
    get description() {
        return this.tour?.fullDescription ?? this.tour?.description ?? this.tour?.overview ?? '';
    }
    get highlightItems() {
        return Array.isArray(this.tour?.highlights) ? this.tour.highlights : [];
    }
    get includedItems() {
        const items = Array.isArray(this.tour?.includes) ? this.tour.includes : [];
        return items.filter((item) => item?.isIncluded !== false);
    }
    get excludedItems() {
        const items = Array.isArray(this.tour?.excludes) ? this.tour.excludes : [];
        if (items.length)
            return items;
        const legacyItems = Array.isArray(this.tour?.includes) ? this.tour.includes : [];
        return legacyItems.filter((item) => item?.isIncluded === false);
    }
    itemValue(item) {
        return typeof item === 'string'
            ? item
            : (item?.value ?? item?.text ?? item?.name ?? '');
    }
    get itineraryItems() {
        const items = this.tour?.itinerary ?? this.tour?.itineraries ?? [];
        return Array.isArray(items) ? items : [];
    }
    get itinerarySteps() {
        const ids = new Set(this.itineraryItems.map((item) => Number(item?.id)));
        return this.itineraryItems.filter((item) => item?.isChildNode !== true || !item?.parentId || !ids.has(Number(item.parentId)));
    }
    itineraryChildren(step) {
        const stepId = Number(step?.id);
        if (!Number.isFinite(stepId) || stepId <= 0)
            return [];
        return this.itineraryItems.filter((item) => item?.isChildNode === true && Number(item?.parentId) === stepId);
    }
    itineraryTime(step) {
        const format = (value) => {
            const match = typeof value === 'string' ? value.match(/^(\d{2}):(\d{2})/) : null;
            return match ? `${match[1]}:${match[2]}` : '';
        };
        return [format(step?.startTime), format(step?.endTime)].filter(Boolean).join(' - ');
    }
    static ɵfac = function TourDetail_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TourDetail)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TourDetail, selectors: [["app-tour-detail"]], inputs: { tour: "tour" }, decls: 67, vars: 38, consts: [[1, "space-y-8"], [1, "overflow-hidden", "rounded-3xl", "border", "border-slate-200", "bg-white", "shadow-sm", "dark:border-slate-800"], [1, "relative", "overflow-hidden", "bg-gradient-to-br", "from-cyan-50", "via-white", "to-amber-50", "p-6", "sm:p-8", "dark:from-cyan-950/40", "dark:via-slate-900", "dark:to-amber-950/20"], [1, "pointer-events-none", "absolute", "-end-16", "-top-20", "h-52", "w-52", "rounded-full", "bg-primary/10", "blur-3xl"], [1, "relative"], [1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary/10", "px-3", "py-1", "text-xs", "font-bold", "uppercase", "tracking-[0.18em]", "text-primary"], [1, "mdi", "mdi-compass-outline", "text-base"], [1, "mt-4", "text-2xl", "font-bold", "leading-tight", "text-slate-900", "sm:text-3xl"], [1, "mt-3", "flex", "items-center", "gap-2", "font-medium", "text-slate-500"], [1, "grid", "grid-cols-2", "divide-x", "divide-y", "divide-slate-100", "sm:grid-cols-3", "dark:divide-slate-800"], [1, "flex", "items-center", "gap-3", "p-4", "sm:p-5"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-cyan-50", "text-xl", "text-primary", "dark:bg-primary/10"], [1, "mdi", "mdi-clock-outline"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-slate-400"], [1, "mt-1", "text-sm", "font-bold", "text-slate-800"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-violet-50", "text-xl", "text-violet-600", "dark:bg-violet-500/10"], [1, "mdi", "mdi-shape-outline"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-blue-50", "text-xl", "text-blue-600", "dark:bg-blue-500/10"], [1, "mdi", "mdi-account-group-outline"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-amber-50", "text-xl", "text-amber-600", "dark:bg-amber-500/10"], [1, "mdi", "mdi-translate"], [1, "col-span-2", "flex", "items-center", "gap-3", "p-4", "sm:col-span-2", "sm:p-5"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-emerald-50", "text-xl", "text-emerald-600", "dark:bg-emerald-500/10"], [1, "mdi", "mdi-wallet-outline"], [1, "mt-1", "text-lg", "font-black", "text-primary"], [1, "text-xs", "font-semibold", "text-slate-400"], [1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm", "sm:p-8", "dark:border-slate-800"], [1, "relative", "overflow-hidden", "rounded-3xl", "border", "border-amber-200/70", "bg-gradient-to-br", "from-amber-50", "via-white", "to-orange-50", "p-6", "shadow-sm", "sm:p-8", "dark:border-amber-500/20", "dark:from-amber-950/30", "dark:via-slate-900", "dark:to-orange-950/20"], [1, "mdi", "mdi-map-marker-outline", "text-xl", "text-primary"], [1, "flex", "items-center", "gap-3"], [1, "grid", "h-11", "w-11", "place-items-center", "rounded-2xl", "bg-primary/10", "text-2xl", "text-primary"], [1, "mdi", "mdi-text-box-outline"], [1, "text-xs", "font-bold", "uppercase", "tracking-[0.2em]", "text-primary"], [1, "mt-1", "text-xl", "font-bold", "text-slate-900"], [1, "mt-5", "whitespace-pre-line", "text-base", "leading-8", "text-slate-600"], [1, "pointer-events-none", "absolute", "-end-12", "-top-12", "h-40", "w-40", "rounded-full", "bg-amber-300/20", "blur-2xl"], [1, "relative", "flex", "items-center", "gap-4"], [1, "grid", "h-12", "w-12", "shrink-0", "place-items-center", "rounded-2xl", "bg-amber-500", "text-2xl", "text-white", "shadow-lg", "shadow-amber-500/25"], [1, "mdi", "mdi-star-four-points-outline"], [1, "text-xs", "font-bold", "uppercase", "tracking-[0.22em]", "text-amber-600", "dark:text-amber-400"], [1, "mt-1", "text-2xl", "font-bold", "text-slate-900"], [1, "relative", "mt-6", "grid", "gap-3", "sm:grid-cols-2"], [1, "flex", "items-start", "gap-3", "rounded-2xl", "border", "border-amber-200/70", "bg-white/80", "p-4", "backdrop-blur", "transition", "hover:-translate-y-0.5", "hover:border-amber-400", "hover:shadow-md", "dark:border-amber-500/15", "/70"], [1, "grid", "h-8", "w-8", "shrink-0", "place-items-center", "rounded-full", "bg-amber-100", "text-xs", "font-black", "text-amber-700", "dark:bg-amber-500/20", "dark:text-amber-300"], [1, "pt-1", "text-sm", "font-semibold", "leading-6", "text-slate-700"], [1, "border-b", "border-slate-100", "bg-slate-50/80", "px-6", "py-5", "sm:px-8", "dark:border-slate-800", "/40"], [1, "text-xs", "font-bold", "uppercase", "tracking-[0.22em]", "text-primary"], [1, "grid", "md:grid-cols-2", "md:divide-x", "md:divide-slate-200", "dark:md:divide-slate-800"], [1, "bg-gradient-to-b", "from-emerald-50/70", "to-white", "p-6", "sm:p-8", "dark:from-emerald-950/20", "dark:to-slate-900"], [1, "grid", "h-11", "w-11", "place-items-center", "rounded-2xl", "bg-emerald-500", "text-2xl", "text-white", "shadow-lg", "shadow-emerald-500/20"], [1, "mdi", "mdi-check-bold"], [1, "text-lg", "font-bold", "text-emerald-700", "dark:text-emerald-400"], [1, "text-xs", "font-medium", "text-slate-400"], [1, "mt-6", "space-y-3"], [1, "flex", "items-start", "gap-3", "text-sm", "font-medium", "leading-6", "text-slate-700"], [1, "text-sm", "text-slate-400"], [1, "border-t", "border-slate-200", "bg-gradient-to-b", "from-rose-50/70", "to-white", "p-6", "sm:p-8", "md:border-t-0", "dark:border-slate-800", "dark:from-rose-950/20", "dark:to-slate-900"], [1, "grid", "h-11", "w-11", "place-items-center", "rounded-2xl", "bg-rose-500", "text-2xl", "text-white", "shadow-lg", "shadow-rose-500/20"], [1, "mdi", "mdi-close-thick"], [1, "text-lg", "font-bold", "text-rose-700", "dark:text-rose-400"], [1, "mdi", "mdi-check-circle", "mt-0.5", "shrink-0", "text-xl", "text-emerald-500"], [1, "mdi", "mdi-close-circle", "mt-0.5", "shrink-0", "text-xl", "text-rose-500"]], template: function TourDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "section", 1)(2, "div", 2);
            i0.ɵɵdomElement(3, "div", 3);
            i0.ɵɵdomElementStart(4, "div", 4)(5, "span", 5);
            i0.ɵɵdomElement(6, "i", 6);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(9, "h2", 7);
            i0.ɵɵtext(10);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(11, TourDetail_Conditional_11_Template, 3, 1, "p", 8);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(12, "div", 9)(13, "div", 10)(14, "span", 11);
            i0.ɵɵdomElement(15, "i", 12);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(16, "div")(17, "p", 13);
            i0.ɵɵtext(18);
            i0.ɵɵpipe(19, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(20, "p", 14);
            i0.ɵɵtext(21);
            i0.ɵɵpipe(22, "translate");
            i0.ɵɵconditionalCreate(23, TourDetail_Conditional_23_Template, 2, 4);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(24, "div", 10)(25, "span", 15);
            i0.ɵɵdomElement(26, "i", 16);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(27, "div")(28, "p", 13);
            i0.ɵɵtext(29);
            i0.ɵɵpipe(30, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(31, "p", 14);
            i0.ɵɵtext(32);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(33, "div", 10)(34, "span", 17);
            i0.ɵɵdomElement(35, "i", 18);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(36, "div")(37, "p", 13);
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(40, "p", 14);
            i0.ɵɵtext(41);
            i0.ɵɵpipe(42, "translate");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(43, "div", 10)(44, "span", 19);
            i0.ɵɵdomElement(45, "i", 20);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(46, "div")(47, "p", 13);
            i0.ɵɵtext(48);
            i0.ɵɵpipe(49, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(50, "p", 14);
            i0.ɵɵtext(51);
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(52, "div", 21)(53, "span", 22);
            i0.ɵɵdomElement(54, "i", 23);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(55, "div")(56, "p", 13);
            i0.ɵɵtext(57);
            i0.ɵɵpipe(58, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(59, "p", 24);
            i0.ɵɵtext(60);
            i0.ɵɵdomElementStart(61, "span", 25);
            i0.ɵɵtext(62);
            i0.ɵɵpipe(63, "translate");
            i0.ɵɵdomElementEnd()()()()()();
            i0.ɵɵconditionalCreate(64, TourDetail_Conditional_64_Template, 13, 7, "section", 26);
            i0.ɵɵconditionalCreate(65, TourDetail_Conditional_65_Template, 15, 6, "section", 27);
            i0.ɵɵconditionalCreate(66, TourDetail_Conditional_66_Template, 39, 22, "section", 1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(8, 20, "tour"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.destinationName ? 11 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 22, "duration"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", ctx.durationDays, " ", i0.ɵɵpipeBind1(22, 24, "days"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.durationHours ? 23 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 26, "type"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.tourType);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 28, "groupSize"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", ctx.groupSize, " ", i0.ɵɵpipeBind1(42, 30, "people"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(49, 32, "languages"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.languages);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 34, "pricePerPerson"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.formattedPrice, " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("/ ", i0.ɵɵpipeBind1(63, 36, "person"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.description ? 64 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.highlightItems.length ? 65 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.includedItems.length || ctx.excludedItems.length ? 66 : -1);
        } }, dependencies: [TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TourDetail, [{
        type: Component,
        args: [{ selector: 'app-tour-detail', imports: [TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"space-y-8\">\n  <section class=\"overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 \">\n    <div class=\"relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-6 sm:p-8 dark:from-cyan-950/40 dark:via-slate-900 dark:to-amber-950/20\">\n      <div class=\"pointer-events-none absolute -end-16 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl\"></div>\n      <div class=\"relative\">\n        <span class=\"inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary\">\n          <i class=\"mdi mdi-compass-outline text-base\"></i>{{ 'tour' | translate }}\n        </span>\n        <h2 class=\"mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl \">{{ title }}</h2>\n        @if (destinationName) {\n          <p class=\"mt-3 flex items-center gap-2 font-medium text-slate-500 \">\n            <i class=\"mdi mdi-map-marker-outline text-xl text-primary\"></i>{{ destinationName }}\n          </p>\n        }\n      </div>\n    </div>\n\n    <div class=\"grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-3 dark:divide-slate-800\">\n      <div class=\"flex items-center gap-3 p-4 sm:p-5\">\n        <span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-xl text-primary dark:bg-primary/10\"><i class=\"mdi mdi-clock-outline\"></i></span>\n        <div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'duration' | translate }}</p><p class=\"mt-1 text-sm font-bold text-slate-800 \">{{ durationDays }} {{ 'days' | translate }} @if (durationHours) { \u00B7 {{ durationHours }} {{ 'hours' | translate }} }</p></div>\n      </div>\n      <div class=\"flex items-center gap-3 p-4 sm:p-5\">\n        <span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-xl text-violet-600 dark:bg-violet-500/10\"><i class=\"mdi mdi-shape-outline\"></i></span>\n        <div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'type' | translate }}</p><p class=\"mt-1 text-sm font-bold text-slate-800 \">{{ tourType }}</p></div>\n      </div>\n      <div class=\"flex items-center gap-3 p-4 sm:p-5\">\n        <span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-xl text-blue-600 dark:bg-blue-500/10\"><i class=\"mdi mdi-account-group-outline\"></i></span>\n        <div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'groupSize' | translate }}</p><p class=\"mt-1 text-sm font-bold text-slate-800 \">{{ groupSize }} {{ 'people' | translate }}</p></div>\n      </div>\n      <div class=\"flex items-center gap-3 p-4 sm:p-5\">\n        <span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-xl text-amber-600 dark:bg-amber-500/10\"><i class=\"mdi mdi-translate\"></i></span>\n        <div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'languages' | translate }}</p><p class=\"mt-1 text-sm font-bold text-slate-800 \">{{ languages }}</p></div>\n      </div>\n      <div class=\"col-span-2 flex items-center gap-3 p-4 sm:col-span-2 sm:p-5\">\n        <span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-xl text-emerald-600 dark:bg-emerald-500/10\"><i class=\"mdi mdi-wallet-outline\"></i></span>\n        <div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'pricePerPerson' | translate }}</p><p class=\"mt-1 text-lg font-black text-primary\">{{ formattedPrice }} <span class=\"text-xs font-semibold text-slate-400\">/ {{ 'person' | translate }}</span></p></div>\n      </div>\n    </div>\n  </section>\n\n  @if (description) {\n    <section class=\"rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 \">\n      <div class=\"flex items-center gap-3\">\n        <span class=\"grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary\"><i class=\"mdi mdi-text-box-outline\"></i></span>\n        <div><p class=\"text-xs font-bold uppercase tracking-[0.2em] text-primary\">{{ 'tour' | translate }}</p><h2 class=\"mt-1 text-xl font-bold text-slate-900 \">{{ 'tourDescriptions' | translate }}</h2></div>\n      </div>\n      <p class=\"mt-5 whitespace-pre-line text-base leading-8 text-slate-600 \">{{ description }}</p>\n    </section>\n  }\n\n  @if (highlightItems.length) {\n    <section class=\"relative overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm sm:p-8 dark:border-amber-500/20 dark:from-amber-950/30 dark:via-slate-900 dark:to-orange-950/20\">\n      <div class=\"pointer-events-none absolute -end-12 -top-12 h-40 w-40 rounded-full bg-amber-300/20 blur-2xl\"></div>\n      <div class=\"relative flex items-center gap-4\">\n        <span class=\"grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500 text-2xl text-white shadow-lg shadow-amber-500/25\"><i class=\"mdi mdi-star-four-points-outline\"></i></span>\n        <div>\n          <p class=\"text-xs font-bold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400\">{{ 'exploreNow' | translate }}</p>\n          <h2 class=\"mt-1 text-2xl font-bold text-slate-900 \">{{ 'tourHighlights' | translate }}</h2>\n        </div>\n      </div>\n\n      <div class=\"relative mt-6 grid gap-3 sm:grid-cols-2\">\n        @for (item of highlightItems; track item.id ?? $index; let number = $index) {\n          <div class=\"flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-white/80 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md dark:border-amber-500/15 /70\">\n            <span class=\"grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-100 text-xs font-black text-amber-700 dark:bg-amber-500/20 dark:text-amber-300\">{{ number + 1 }}</span>\n            <p class=\"pt-1 text-sm font-semibold leading-6 text-slate-700 \">{{ itemValue(item) }}</p>\n          </div>\n        }\n      </div>\n    </section>\n  }\n\n  @if (includedItems.length || excludedItems.length) {\n    <section class=\"overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 \">\n      <div class=\"border-b border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-8 dark:border-slate-800 /40\">\n        <p class=\"text-xs font-bold uppercase tracking-[0.22em] text-primary\">{{ 'tour' | translate }}</p>\n        <h2 class=\"mt-1 text-2xl font-bold text-slate-900 \">{{ 'whatsIncludedExcluded' | translate }}</h2>\n      </div>\n\n      <div class=\"grid md:grid-cols-2 md:divide-x md:divide-slate-200 dark:md:divide-slate-800\">\n        <div class=\"bg-gradient-to-b from-emerald-50/70 to-white p-6 sm:p-8 dark:from-emerald-950/20 dark:to-slate-900\">\n          <div class=\"flex items-center gap-3\">\n            <span class=\"grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500 text-2xl text-white shadow-lg shadow-emerald-500/20\"><i class=\"mdi mdi-check-bold\"></i></span>\n            <div><h3 class=\"text-lg font-bold text-emerald-700 dark:text-emerald-400\">{{ 'included' | translate }}</h3><p class=\"text-xs font-medium text-slate-400\">{{ includedItems.length }} {{ 'items' | translate }}</p></div>\n          </div>\n          <ul class=\"mt-6 space-y-3\">\n            @for (item of includedItems; track item.id ?? $index) {\n              <li class=\"flex items-start gap-3 text-sm font-medium leading-6 text-slate-700 \">\n                <i class=\"mdi mdi-check-circle mt-0.5 shrink-0 text-xl text-emerald-500\"></i><span>{{ itemValue(item) }}</span>\n              </li>\n            } @empty {\n              <li class=\"text-sm text-slate-400\">{{ 'noTourIncludesAdded' | translate }}</li>\n            }\n          </ul>\n        </div>\n\n        <div class=\"border-t border-slate-200 bg-gradient-to-b from-rose-50/70 to-white p-6 sm:p-8 md:border-t-0 dark:border-slate-800 dark:from-rose-950/20 dark:to-slate-900\">\n          <div class=\"flex items-center gap-3\">\n            <span class=\"grid h-11 w-11 place-items-center rounded-2xl bg-rose-500 text-2xl text-white shadow-lg shadow-rose-500/20\"><i class=\"mdi mdi-close-thick\"></i></span>\n            <div><h3 class=\"text-lg font-bold text-rose-700 dark:text-rose-400\">{{ 'excluded' | translate }}</h3><p class=\"text-xs font-medium text-slate-400\">{{ excludedItems.length }} {{ 'items' | translate }}</p></div>\n          </div>\n          <ul class=\"mt-6 space-y-3\">\n            @for (item of excludedItems; track item.id ?? $index) {\n              <li class=\"flex items-start gap-3 text-sm font-medium leading-6 text-slate-700 \">\n                <i class=\"mdi mdi-close-circle mt-0.5 shrink-0 text-xl text-rose-500\"></i><span>{{ itemValue(item) }}</span>\n              </li>\n            } @empty {\n              <li class=\"text-sm text-slate-400\">{{ 'noTourExcludesAdded' | translate }}</li>\n            }\n          </ul>\n        </div>\n      </div>\n    </section>\n  }\n</div>\n" }]
    }], null, { tour: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TourDetail, { className: "TourDetail", filePath: "app/features/home/tour-page/tour-detail/tour-detail/tour-detail.ts", lineNumber: 17 }); })();
