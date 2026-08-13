import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../core/services/currency.service';
import { formatHomePrice } from '../../home-price.util';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
const _c1 = a0 => ["/tours", a0];
const _forTrack0 = ($index, $item) => $item.id ?? $index;
function ToursSection_Conditional_9_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12);
    i0.ɵɵelementStart(2, "div", 13);
    i0.ɵɵelement(3, "div", 14)(4, "div", 15)(5, "div", 16);
    i0.ɵɵelementEnd()();
} }
function ToursSection_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, ToursSection_Conditional_9_For_2_Template, 6, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function ToursSection_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "p", 17);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 18);
    i0.ɵɵlistener("click", function ToursSection_Conditional_10_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadTours()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "toursLoadError"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, "showMore"));
} }
function ToursSection_Conditional_11_For_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 24);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.destinationName);
} }
function ToursSection_Conditional_11_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r3.fullDescription ?? item_r3.description);
} }
function ToursSection_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 19)(1, "article", 21)(2, "div", 22);
    i0.ɵɵelement(3, "img", 23);
    i0.ɵɵconditionalCreate(4, ToursSection_Conditional_11_For_2_Conditional_4_Template, 3, 1, "span", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 25)(6, "h3", 26);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, ToursSection_Conditional_11_For_2_Conditional_8_Template, 2, 1, "p", 27);
    i0.ɵɵelementStart(9, "div", 28)(10, "div", 29)(11, "strong", 30);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "i", 31);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c1, item_r3.id));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(item_r3), i0.ɵɵsanitizeUrl)("alt", item_r3.titleEng);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r3.destinationName ? 4 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.titleEng);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r3.description ?? item_r3.fullDescription ? 8 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.formattedPrice(item_r3));
} }
function ToursSection_Conditional_11_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noToursFound"));
} }
function ToursSection_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵrepeaterCreate(1, ToursSection_Conditional_11_For_2_Template, 14, 9, "a", 19, _forTrack0, false, ToursSection_Conditional_11_ForEmpty_3_Template, 3, 3, "p", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.tours);
} }
export class ToursSection {
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    currencyService = inject(CurrencyService);
    tours = [];
    isLoading = false;
    hasError = false;
    ngOnInit() {
        this.loadTours();
    }
    loadTours() {
        this.isLoading = true;
        this.hasError = false;
        this.apiService.getUnauthntecated('tours/GetHomePage').pipe(catchError(() => {
            this.hasError = true;
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            var res = response?.data;
            this.tours = Array.isArray(res?.data) ? res.data : [];
        });
    }
    formattedPrice(item) {
        return formatHomePrice(this.currencyService, item?.pricePerPerson ?? item?.price, item);
    }
    imageUrl(item) {
        const url = item?.coverImageUrl ?? item?.imageUrl ?? '';
        if (!url)
            return 'assets/images/bg/3.jpg';
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    static ɵfac = function ToursSection_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToursSection)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToursSection, selectors: [["app-tours-section"]], decls: 17, vars: 10, consts: [[1, "relative", "overflow-hidden", "py-16", "md:py-24"], [1, "container", "relative"], [1, "mb-10", "text-center"], [1, "mb-2", "text-sm", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "text-2xl", "font-semibold", "md:text-3xl"], ["aria-busy", "true", 1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4"], [1, "rounded-3xl", "border", "border-dashed", "border-slate-300", "bg-slate-50", "px-6", "py-12", "text-center", "dark:border-slate-700"], [1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4"], [1, "mt-10", "text-center"], ["routerLink", "/tours", 1, "group", "inline-flex", "items-center", "justify-center", "gap-2", "font-semibold", "text-primary", "transition", "hover:gap-3", "hover:underline", "hover:underline-offset-4"], [1, "mdi", "mdi-arrow-right", "text-xl", "rtl:rotate-180"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "aspect-[4/3]", "animate-pulse", "bg-slate-200"], [1, "space-y-3", "p-4"], [1, "h-4", "w-1/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-full", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "text-slate-500"], ["type", "button", 1, "mt-5", "rounded-full", "bg-primary", "px-5", "py-2.5", "font-semibold", "text-white", 3, "click"], [1, "group", "flex", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "duration-300", "hover:-translate-y-1", "hover:border-primary/40", "hover:shadow-lg", "dark:border-slate-800", 3, "routerLink"], [1, "col-span-full", "text-center", "text-slate-400"], [1, "flex", "w-full", "flex-col"], [1, "relative", "overflow-hidden"], ["loading", "lazy", 1, "aspect-[4/3]", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "absolute", "start-3", "top-3", "rounded-full", "bg-white/90", "px-3", "py-1", "text-xs", "font-semibold", "text-slate-700", "shadow-sm", "backdrop-blur"], [1, "flex", "flex-1", "flex-col", "p-4"], [1, "line-clamp-2", "text-lg", "font-semibold", "transition", "group-hover:text-primary"], [1, "mt-2", "line-clamp-2", "text-sm", "leading-6", "text-slate-500"], [1, "mt-auto", "pt-4"], [1, "flex", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-3", "dark:border-slate-800"], [1, "text-lg", "text-primary"], [1, "mdi", "mdi-arrow-right", "text-xl", "text-slate-400", "transition", "group-hover:text-primary", "rtl:rotate-180"], [1, "mdi", "mdi-map-marker-outline", "me-1", "text-primary"]], template: function ToursSection_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "p", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h2", 4);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(9, ToursSection_Conditional_9_Template, 3, 1, "div", 5)(10, ToursSection_Conditional_10_Template, 7, 6, "div", 6)(11, ToursSection_Conditional_11_Template, 4, 1, "div", 7);
            i0.ɵɵelementStart(12, "div", 8)(13, "a", 9);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "translate");
            i0.ɵɵelement(16, "i", 10);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "exploreNow"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 6, "tours"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 9 : ctx.hasError ? 10 : 11);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 8, "exploreMore"));
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToursSection, [{
        type: Component,
        args: [{ selector: 'app-tours-section', imports: [RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"relative overflow-hidden py-16 md:py-24\">\n  <div class=\"container relative\">\n    <div class=\"mb-10 text-center\">\n      <p class=\"mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'exploreNow' | translate }}</p>\n      <h2 class=\"text-2xl font-semibold md:text-3xl\">{{ 'tours' | translate }}</h2>\n    </div>\n\n    @if (isLoading) {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\" aria-busy=\"true\">\n        @for (card of [1,2,3,4,5,6,7,8]; track card) {\n          <div class=\"overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm\">\n            <div class=\"aspect-[4/3] animate-pulse bg-slate-200\"></div>\n            <div class=\"space-y-3 p-4\"><div class=\"h-4 w-1/3 animate-pulse rounded-full bg-slate-200\"></div><div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div><div class=\"h-4 w-full animate-pulse rounded-full bg-slate-200\"></div></div>\n          </div>\n        }\n      </div>\n    } @else if (hasError) {\n      <div class=\"rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 \">\n        <p class=\"text-slate-500\">{{ 'toursLoadError' | translate }}</p>\n        <button type=\"button\" class=\"mt-5 rounded-full bg-primary px-5 py-2.5 font-semibold text-white\" (click)=\"loadTours()\">{{ 'showMore' | translate }}</button>\n      </div>\n    } @else {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\">\n        @for (item of tours; track item.id ?? $index) {\n          <a [routerLink]=\"['/tours', item.id ]\" class=\"group flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800 \">\n            <article class=\"flex w-full flex-col\">\n              <div class=\"relative overflow-hidden\">\n                <img [src]=\"imageUrl(item)\" [alt]=\"item.titleEng \" loading=\"lazy\" class=\"aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105\" />\n                @if (item.destinationName ) { <span class=\"absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur\"><i class=\"mdi mdi-map-marker-outline me-1 text-primary\"></i>{{ item.destinationName  }}</span> }\n              </div>\n              <div class=\"flex flex-1 flex-col p-4\">\n                <h3 class=\"line-clamp-2 text-lg font-semibold transition group-hover:text-primary\">{{ item.titleEng }}</h3>\n                @if (item.description ?? item.fullDescription) { <p class=\"mt-2 line-clamp-2 text-sm leading-6 text-slate-500\">{{ item.fullDescription ?? item.description }}</p> }\n                <div class=\"mt-auto pt-4\"><div class=\"flex items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800\"><strong class=\"text-lg text-primary\">{{ formattedPrice(item) }}</strong><i class=\"mdi mdi-arrow-right text-xl text-slate-400 transition group-hover:text-primary rtl:rotate-180\"></i></div></div>\n              </div>\n            </article>\n          </a>\n        } @empty { <p class=\"col-span-full text-center text-slate-400\">{{ 'noToursFound' | translate }}</p> }\n      </div>\n    }\n\n    <div class=\"mt-10 text-center\">\n      <a routerLink=\"/tours\" class=\"group inline-flex items-center justify-center gap-2 font-semibold text-primary transition hover:gap-3 hover:underline hover:underline-offset-4\">{{ 'exploreMore' | translate }}<i class=\"mdi mdi-arrow-right text-xl rtl:rotate-180\"></i></a>\n    </div>\n  </div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToursSection, { className: "ToursSection", filePath: "app/features/home/home-sections/tours-section/tours-section.ts", lineNumber: 28 }); })();
