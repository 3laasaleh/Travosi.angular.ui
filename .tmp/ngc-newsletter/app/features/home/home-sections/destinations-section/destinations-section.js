import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { LanguageService } from '../../../../core/services/language.service';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5, 6];
const _c1 = a0 => ["/destinations", a0];
const _forTrack0 = ($index, $item) => $item.id ?? $item.destinationId ?? $index;
function DestinationsSection_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "div", 13);
    i0.ɵɵelementEnd();
} }
function DestinationsSection_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, DestinationsSection_Conditional_11_For_2_Template, 2, 0, "div", 12, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function DestinationsSection_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "i", 14);
    i0.ɵɵelementStart(2, "p", 15);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 16);
    i0.ɵɵlistener("click", function DestinationsSection_Conditional_12_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadDestinations()); });
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 2, "destinationsLoadError"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 4, "showMore"), " ");
} }
function DestinationsSection_Conditional_13_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", destination_r3.subDescription ?? destination_r3.description, " ");
} }
function DestinationsSection_Conditional_13_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵelement(1, "img", 19)(2, "div", 20);
    i0.ɵɵelementStart(3, "div", 21)(4, "div", 22)(5, "h3", 23);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, DestinationsSection_Conditional_13_For_2_Conditional_7_Template, 2, 1, "p", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 25);
    i0.ɵɵelement(9, "i", 26);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const destination_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(5, _c1, destination_r3.id ?? destination_r3.destinationId));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.imageUrl(destination_r3), i0.ɵɵsanitizeUrl)("alt", ctx_r1.destinationName(destination_r3));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.destinationName(destination_r3), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(destination_r3.subDescription ?? destination_r3.description ? 7 : -1);
} }
function DestinationsSection_Conditional_13_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelement(1, "i", 27);
    i0.ɵɵelementStart(2, "p", 28);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "noDestinationsFound"));
} }
function DestinationsSection_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, DestinationsSection_Conditional_13_For_2_Template, 10, 7, "a", 17, _forTrack0, false, DestinationsSection_Conditional_13_ForEmpty_3_Template, 5, 3, "div", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.destinations);
} }
export class DestinationsSection {
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    languageService = inject(LanguageService);
    destinations = [];
    isLoading = true;
    hasError = false;
    ngOnInit() {
        this.loadDestinations();
    }
    loadDestinations() {
        this.isLoading = true;
        this.hasError = false;
        this.apiService
            .getUnauthntecated('destinations?page=1&pageSize=12')
            .pipe(catchError(() => {
            this.hasError = true;
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
            if (response === null) {
                this.destinations = [];
                return;
            }
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
            this.destinations = Array.isArray(rows) ? rows.slice(0, 12) : [];
        });
    }
    destinationName(destination) {
        const isArabic = this.languageService.getCurrentLanguage() === 'ar';
        return isArabic
            ? destination?.nameAr ?? destination?.nameEng ?? destination?.name ?? ''
            : destination?.nameEng ?? destination?.name ?? destination?.nameAr ?? '';
    }
    imageUrl(destination) {
        const image = Array.isArray(destination?.images) ? destination.images[0] : null;
        const url = image?.imageUrl ??
            image?.url ??
            image?.path ??
            destination?.coverImageUrl ??
            destination?.imageUrl ??
            '';
        if (!url)
            return 'assets/images/bg/2.jpg';
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        return `${environment.imageUrl.replace(/\/+$/, '')}/${String(url).replace(/^\/+/, '')}`;
    }
    static ɵfac = function DestinationsSection_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DestinationsSection)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DestinationsSection, selectors: [["app-destinations-section"]], decls: 19, vars: 10, consts: [[1, "relative", "overflow-hidden", "py-16", "md:py-24"], [1, "pointer-events-none", "absolute", "-start-28", "top-10", "size-72", "rounded-full", "bg-primary/5", "blur-3xl"], [1, "container", "relative"], [1, "mb-10", "text-center"], [1, "mb-2", "text-sm", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "text-2xl", "font-semibold", "md:text-3xl"], ["aria-busy", "true", 1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3"], [1, "rounded-3xl", "border", "border-dashed", "border-slate-300", "bg-slate-50", "px-6", "py-12", "text-center", "dark:border-slate-700"], [1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3"], [1, "mt-10", "text-center"], ["routerLink", "/destinations", 1, "group", "inline-flex", "items-center", "justify-center", "gap-2", "font-semibold", "text-primary", "transition", "hover:gap-3", "hover:underline", "hover:underline-offset-4"], ["aria-hidden", "true", 1, "mdi", "mdi-arrow-right", "text-xl", "rtl:rotate-180"], [1, "relative", "aspect-[4/3]", "animate-pulse", "overflow-hidden", "rounded-3xl", "bg-slate-200"], [1, "absolute", "inset-x-5", "bottom-5", "h-6", "w-1/2", "rounded-full", "bg-white/45"], ["aria-hidden", "true", 1, "mdi", "mdi-map-marker-off-outline", "text-5xl", "text-slate-300"], [1, "mt-3", "text-slate-500"], ["type", "button", 1, "mt-5", "rounded-full", "bg-primary", "px-5", "py-2.5", "font-semibold", "text-white", "transition", "hover:opacity-90", 3, "click"], [1, "group", "relative", "aspect-[4/3]", "overflow-hidden", "rounded-3xl", "bg-slate-900", "shadow-md", "transition", "duration-300", "hover:-translate-y-1", "hover:shadow-xl", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-primary", "focus-visible:ring-offset-2", 3, "routerLink"], [1, "col-span-full", "rounded-3xl", "border", "border-dashed", "border-slate-300", "px-6", "py-12", "text-center", "text-slate-500", "dark:border-slate-700"], ["loading", "lazy", 1, "h-full", "w-full", "object-cover", "transition", "duration-700", "group-hover:scale-110", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-950", "via-slate-950/20", "to-transparent"], [1, "absolute", "inset-x-0", "bottom-0", "flex", "items-end", "justify-between", "gap-4", "p-6", "text-white"], [1, "min-w-0"], [1, "truncate", "text-xl", "font-semibold", "md:text-2xl"], [1, "mt-2", "line-clamp-2", "text-sm", "leading-6", "text-white/75"], [1, "grid", "size-11", "shrink-0", "place-items-center", "rounded-full", "border", "border-white/40", "bg-white/15", "text-xl", "backdrop-blur-sm", "transition", "group-hover:border-primary", "group-hover:bg-primary"], ["aria-hidden", "true", 1, "mdi", "mdi-arrow-right", "rtl:rotate-180"], ["aria-hidden", "true", 1, "mdi", "mdi-map-marker-question-outline", "text-5xl", "text-slate-300"], [1, "mt-3"]], template: function DestinationsSection_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3)(4, "div")(5, "p", 4);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h2", 5);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(11, DestinationsSection_Conditional_11_Template, 3, 1, "div", 6)(12, DestinationsSection_Conditional_12_Template, 8, 6, "div", 7)(13, DestinationsSection_Conditional_13_Template, 4, 1, "div", 8);
            i0.ɵɵelementStart(14, "div", 9)(15, "a", 10);
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "translate");
            i0.ɵɵelement(18, "i", 11);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 4, "exploreNow"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 6, "destinations"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 11 : ctx.hasError ? 12 : 13);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(17, 8, "exploreMore"), " ");
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DestinationsSection, [{
        type: Component,
        args: [{ selector: 'app-destinations-section', imports: [RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"relative overflow-hidden py-16 md:py-24\">\n  <div class=\"pointer-events-none absolute -start-28 top-10 size-72 rounded-full bg-primary/5 blur-3xl\"></div>\n  <div class=\"container relative\">\n    <div class=\"mb-10 text-center\">\n      <div>\n        <p class=\"mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary\">\n          {{ 'exploreNow' | translate }}\n        </p>\n        <h2 class=\"text-2xl font-semibold md:text-3xl\">{{ 'destinations' | translate }}</h2>\n      </div>\n    </div>\n\n    @if (isLoading) {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\" aria-busy=\"true\">\n        @for (card of [1, 2, 3, 4, 5, 6]; track card) {\n          <div class=\"relative aspect-[4/3] animate-pulse overflow-hidden rounded-3xl bg-slate-200 \">\n            <div class=\"absolute inset-x-5 bottom-5 h-6 w-1/2 rounded-full bg-white/45\"></div>\n          </div>\n        }\n      </div>\n    } @else if (hasError) {\n      <div class=\"rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 \">\n        <i class=\"mdi mdi-map-marker-off-outline text-5xl text-slate-300\" aria-hidden=\"true\"></i>\n        <p class=\"mt-3 text-slate-500\">{{ 'destinationsLoadError' | translate }}</p>\n        <button\n          type=\"button\"\n          class=\"mt-5 rounded-full bg-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90\"\n          (click)=\"loadDestinations()\"\n        >\n          {{ 'showMore' | translate }}\n        </button>\n      </div>\n    } @else {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\">\n        @for (destination of destinations; track destination.id ?? destination.destinationId ?? $index) {\n          <a\n            [routerLink]=\"['/destinations', destination.id ?? destination.destinationId]\"\n            class=\"group relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-900 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2\"\n          >\n            <img\n              [src]=\"imageUrl(destination)\"\n              [alt]=\"destinationName(destination)\"\n              loading=\"lazy\"\n              class=\"h-full w-full object-cover transition duration-700 group-hover:scale-110\"\n            />\n            <div class=\"absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent\"></div>\n            <div class=\"absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white\">\n              <div class=\"min-w-0\">\n                <h3 class=\"truncate text-xl font-semibold md:text-2xl\">\n                  {{ destinationName(destination) }}\n                </h3>\n                @if (destination.subDescription ?? destination.description) {\n                  <p class=\"mt-2 line-clamp-2 text-sm leading-6 text-white/75\">\n                    {{ destination.subDescription ?? destination.description }}\n                  </p>\n                }\n              </div>\n              <span class=\"grid size-11 shrink-0 place-items-center rounded-full border border-white/40 bg-white/15 text-xl backdrop-blur-sm transition group-hover:border-primary group-hover:bg-primary\">\n                <i class=\"mdi mdi-arrow-right rtl:rotate-180\" aria-hidden=\"true\"></i>\n              </span>\n            </div>\n          </a>\n        } @empty {\n          <div class=\"col-span-full rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500 dark:border-slate-700\">\n            <i class=\"mdi mdi-map-marker-question-outline text-5xl text-slate-300\" aria-hidden=\"true\"></i>\n            <p class=\"mt-3\">{{ 'noDestinationsFound' | translate }}</p>\n          </div>\n        }\n      </div>\n    }\n\n    <div class=\"mt-10 text-center\">\n      <a routerLink=\"/destinations\" class=\"group inline-flex items-center justify-center gap-2 font-semibold text-primary transition hover:gap-3 hover:underline hover:underline-offset-4\">\n        {{ 'exploreMore' | translate }}\n        <i class=\"mdi mdi-arrow-right text-xl rtl:rotate-180\" aria-hidden=\"true\"></i>\n      </a>\n    </div>\n  </div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DestinationsSection, { className: "DestinationsSection", filePath: "app/features/home/home-sections/destinations-section/destinations-section.ts", lineNumber: 23 }); })();
