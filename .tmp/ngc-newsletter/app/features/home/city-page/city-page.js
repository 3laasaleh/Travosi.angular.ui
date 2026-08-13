import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, forkJoin, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { formatHomePrice } from '../home-price.util';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/destinations", a0];
const _c1 = a0 => ({ city: a0 });
const _c2 = a0 => ["/tours", a0];
const _forTrack0 = ($index, $item) => $item.id;
function CityPage_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 0);
} }
function CityPage_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 1)(1, "div");
    i0.ɵɵelement(2, "i", 2);
    i0.ɵɵelementStart(3, "h1", 3);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 4);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 3, ctx_r0.errorMessage));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c0, ctx_r0.destinationId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 5, "backToDestination"));
} }
function CityPage_Conditional_3_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.city.nameAr);
} }
function CityPage_Conditional_3_Conditional_23_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 28);
    i0.ɵɵelement(1, "img", 29);
    i0.ɵɵelementStart(2, "span", 30)(3, "span", 31);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 32);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const tour_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(5, _c2, tour_r2.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.tourImage(tour_r2), i0.ɵɵsanitizeUrl)("alt", ctx_r0.tourTitle(tour_r2));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.tourTitle(tour_r2));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.formattedTourPrice(tour_r2));
} }
function CityPage_Conditional_3_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "p", 27);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, CityPage_Conditional_3_Conditional_23_For_5_Template, 7, 7, "a", 28, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "moreDestinationTours"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.recommendedTours);
} }
function CityPage_Conditional_3_For_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 25);
    i0.ɵɵelement(1, "img", 33);
    i0.ɵɵelementStart(2, "div", 34)(3, "h3", 35);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 36);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 37);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const tour_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(6, _c2, tour_r3.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.tourImage(tour_r3), i0.ɵɵsanitizeUrl)("alt", ctx_r0.tourTitle(tour_r3));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.tourTitle(tour_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tour_r3.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.formattedTourPrice(tour_r3));
} }
function CityPage_Conditional_3_ForEmpty_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noToursForCity"));
} }
function CityPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 5);
    i0.ɵɵelement(1, "div", 6);
    i0.ɵɵelementStart(2, "div", 7)(3, "a", 8);
    i0.ɵɵelement(4, "i", 9);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 10);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "h1", 11);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(11, CityPage_Conditional_3_Conditional_11_Template, 2, 1, "p", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "main", 13)(13, "div", 14)(14, "aside", 15)(15, "p", 16);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "h2", 17);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 18);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(23, CityPage_Conditional_3_Conditional_23_Template, 6, 3, "div", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "section")(25, "div", 20)(26, "div")(27, "p", 21);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "h2", 22);
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "span", 23);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 24);
    i0.ɵɵrepeaterCreate(36, CityPage_Conditional_3_For_37_Template, 9, 8, "a", 25, _forTrack0, false, CityPage_Conditional_3_ForEmpty_38_Template, 3, 3, "div", 26);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r0.cityImage() + ")");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(26, _c0, ctx_r0.destinationId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 15, "backToDestination"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.destinationName());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.cityName());
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r0.isArabic && ctx_r0.city.nameAr ? 11 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 17, "exploreCity"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.cityName());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 19, "cityToursSidebarHint"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.recommendedTours.length ? 23 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 21, "topTours"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(32, 23, "topToursInCity", i0.ɵɵpureFunction1(28, _c1, ctx_r0.cityName())));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r0.tours.length, " / 10");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.tours);
} }
export class CityPage {
    route = inject(ActivatedRoute);
    api = inject(ApiService);
    translate = inject(TranslateService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    currencyService = inject(CurrencyService);
    destinationId = 0;
    city = null;
    destination = null;
    tours = [];
    recommendedTours = [];
    isLoading = true;
    errorMessage = '';
    ngOnInit() {
        this.route.paramMap.pipe(map(params => ({ destinationId: Number(params.get('destinationId')), cityId: Number(params.get('cityId')) })), distinctUntilChanged((left, right) => left.destinationId === right.destinationId && left.cityId === right.cityId), takeUntilDestroyed(this.destroyRef)).subscribe(({ destinationId, cityId }) => this.load(destinationId, cityId));
    }
    cityName() { return this.isArabic ? this.city?.nameAr ?? this.city?.nameEng ?? '' : this.city?.nameEng ?? this.city?.nameAr ?? ''; }
    destinationName() { return this.isArabic ? this.destination?.nameAr ?? this.destination?.nameEng ?? '' : this.destination?.nameEng ?? this.destination?.nameAr ?? ''; }
    cityImage() {
        return this.imageUrl(this.destination?.coverImageUrl ??
            this.destination?.imageUrl ??
            this.destination?.images?.[0] ??
            this.city?.coverImageUrl ??
            this.city?.imageUrl);
    }
    imageUrl(source) { const raw = typeof source === 'string' ? source : source?.imageUrl ?? source?.url ?? ''; return !raw ? 'assets/images/bg/3.jpg' : /^(blob:|data:|https?:\/\/)/i.test(raw) ? raw : `${environment.imageUrl}${String(raw).replace(/^\/+/, '')}`; }
    tourImage(tour) { return this.imageUrl(tour?.coverImageUrl ?? tour?.images?.[0] ?? tour?.imageUrl); }
    tourTitle(tour) { return this.isArabic ? tour?.titleAr ?? tour?.titleEng ?? '' : tour?.titleEng ?? tour?.titleAr ?? ''; }
    formattedTourPrice(tour) { return formatHomePrice(this.currencyService, tour?.pricePerPerson ?? tour?.price, tour); }
    get isArabic() { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
    load(destinationId, cityId) {
        this.destinationId = destinationId;
        this.isLoading = true;
        this.errorMessage = '';
        this.city = null;
        this.destination = null;
        this.tours = [];
        this.recommendedTours = [];
        if (!destinationId || !cityId) {
            this.errorMessage = 'cityNotFound';
            this.isLoading = false;
            return;
        }
        forkJoin({
            city: this.api.getUnauthntecated(`Cities/${cityId}`).pipe(catchError(() => of(null))),
            destination: this.api.getUnauthntecated(`Destinations/${destinationId}`).pipe(catchError(() => of(null))),
            tours: this.api.getUnauthntecated(`Tours?page=1&pageSize=10&destinationId=${destinationId}&cityId=${cityId}`).pipe(catchError(() => of(null))),
            recommended: this.api.getUnauthntecated(`Tours?page=1&pageSize=5&destinationId=${destinationId}`).pipe(catchError(() => of(null))),
        }).pipe(finalize(() => { this.isLoading = false; this.cdr.markForCheck(); }), takeUntilDestroyed(this.destroyRef)).subscribe(result => {
            this.city = this.entity(result.city, 'city');
            this.destination = this.entity(result.destination, 'destination');
            if (!this.city || Number(this.city.destinationId) !== destinationId) {
                this.errorMessage = 'cityNotFound';
                return;
            }
            this.tours = this.collection(result.tours, 'tours').filter(tour => Number(tour?.cityId) === cityId).slice(0, 10);
            this.recommendedTours = this.collection(result.recommended, 'tours').filter(tour => Number(tour?.cityId) !== cityId).slice(0, 5);
        });
    }
    entity(response, key) { const data = response?.data ?? response; return response?.isSuccess === false ? null : data?.[key] ?? data; }
    collection(response, key) { const data = response?.data ?? response; const rows = data?.data ?? data?.items ?? data?.[key] ?? data; return Array.isArray(rows) ? rows : []; }
    static ɵfac = function CityPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CityPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CityPage, selectors: [["app-city-page"]], decls: 5, vars: 1, consts: [[1, "min-h-[70vh]", "animate-pulse", "bg-slate-100"], [1, "container", "grid", "min-h-[60vh]", "place-items-center", "py-24", "text-center"], [1, "mdi", "mdi-city-variant-outline", "text-7xl", "text-slate-300"], [1, "mt-4", "text-3xl", "font-semibold"], [1, "mt-6", "inline-flex", "rounded-full", "bg-primary", "px-5", "py-2.5", "font-semibold", "text-white", 3, "routerLink"], [1, "relative", "min-h-[330px]", "bg-cover", "bg-center", "py-16"], [1, "absolute", "inset-0", "bg-slate-950/70"], [1, "container", "relative", "text-white"], [1, "inline-flex", "items-center", "gap-2", "text-sm", "font-semibold", "text-white/80", "hover:text-white", 3, "routerLink"], [1, "mdi", "mdi-arrow-left", "rtl:rotate-180"], [1, "mt-12", "text-sm", "font-semibold", "uppercase", "tracking-[.25em]", "text-primary"], [1, "mt-3", "text-4xl", "font-semibold", "md:text-6xl"], ["dir", "rtl", 1, "mt-3", "text-2xl", "text-white/75"], [1, "py-16", "md:py-24"], [1, "container", "grid", "gap-8", "lg:grid-cols-[280px_minmax(0,1fr)]"], [1, "self-start", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm", "lg:sticky", "lg:top-28"], [1, "text-xs", "font-bold", "uppercase", "tracking-[.2em]", "text-primary"], [1, "mt-2", "text-xl", "font-semibold"], [1, "mt-3", "text-sm", "leading-6", "text-slate-500"], [1, "mt-5", "space-y-3", "border-t", "border-slate-100", "pt-4"], [1, "mb-8", "flex", "items-end", "justify-between", "gap-4"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[.25em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "grid", "gap-6", "sm:grid-cols-2", "xl:grid-cols-3"], [1, "group", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "hover:-translate-y-1", "hover:border-primary/40", "hover:shadow-lg", 3, "routerLink"], [1, "col-span-full", "rounded-2xl", "border", "border-dashed", "border-slate-300", "p-10", "text-center", "text-slate-500"], [1, "text-sm", "font-semibold"], [1, "flex", "gap-3", "rounded-xl", "p-1", "transition", "hover:bg-slate-50", 3, "routerLink"], [1, "h-14", "w-16", "rounded-lg", "object-cover", 3, "src", "alt"], [1, "min-w-0"], [1, "line-clamp-2", "text-sm", "font-semibold", "hover:text-primary"], [1, "mt-1", "block", "text-xs", "text-primary"], [1, "aspect-[4/3]", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "p-4"], [1, "line-clamp-2", "font-semibold", "group-hover:text-primary"], [1, "mt-2", "line-clamp-2", "text-sm", "text-slate-500"], [1, "mt-4", "border-t", "border-slate-100", "pt-3", "text-lg", "font-semibold", "text-primary"]], template: function CityPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵconditionalCreate(1, CityPage_Conditional_1_Template, 1, 0, "div", 0)(2, CityPage_Conditional_2_Template, 9, 9, "main", 1)(3, CityPage_Conditional_3_Template, 39, 30);
            i0.ɵɵelement(4, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 1 : ctx.errorMessage ? 2 : 3);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CityPage, [{
        type: Component,
        args: [{ selector: 'app-city-page', standalone: true, imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\n@if (isLoading) { <div class=\"min-h-[70vh] animate-pulse bg-slate-100\"></div> }\n@else if (errorMessage) { <main class=\"container grid min-h-[60vh] place-items-center py-24 text-center\"><div><i class=\"mdi mdi-city-variant-outline text-7xl text-slate-300\"></i><h1 class=\"mt-4 text-3xl font-semibold\">{{ errorMessage | translate }}</h1><a [routerLink]=\"['/destinations', destinationId]\" class=\"mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 font-semibold text-white\">{{ 'backToDestination' | translate }}</a></div></main> }\n@else {\n  <section class=\"relative min-h-[330px] bg-cover bg-center py-16\" [style.background-image]=\"'url(' + cityImage() + ')'\">\n    <div class=\"absolute inset-0 bg-slate-950/70\"></div><div class=\"container relative text-white\"><a [routerLink]=\"['/destinations', destinationId]\" class=\"inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white\"><i class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>{{ 'backToDestination' | translate }}</a><p class=\"mt-12 text-sm font-semibold uppercase tracking-[.25em] text-primary\">{{ destinationName() }}</p><h1 class=\"mt-3 text-4xl font-semibold md:text-6xl\">{{ cityName() }}</h1>@if (!isArabic && city.nameAr) { <p dir=\"rtl\" class=\"mt-3 text-2xl text-white/75\">{{ city.nameAr }}</p> }</div>\n  </section>\n  <main class=\"py-16 md:py-24\"><div class=\"container grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]\">\n    <aside class=\"self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28\"><p class=\"text-xs font-bold uppercase tracking-[.2em] text-primary\">{{ 'exploreCity' | translate }}</p><h2 class=\"mt-2 text-xl font-semibold\">{{ cityName() }}</h2><p class=\"mt-3 text-sm leading-6 text-slate-500\">{{ 'cityToursSidebarHint' | translate }}</p>@if (recommendedTours.length) { <div class=\"mt-5 space-y-3 border-t border-slate-100 pt-4\"><p class=\"text-sm font-semibold\">{{ 'moreDestinationTours' | translate }}</p>@for (tour of recommendedTours; track tour.id) { <a [routerLink]=\"['/tours', tour.id]\" class=\"flex gap-3 rounded-xl p-1 transition hover:bg-slate-50\"><img [src]=\"tourImage(tour)\" [alt]=\"tourTitle(tour)\" class=\"h-14 w-16 rounded-lg object-cover\"/><span class=\"min-w-0\"><span class=\"line-clamp-2 text-sm font-semibold hover:text-primary\">{{ tourTitle(tour) }}</span><span class=\"mt-1 block text-xs text-primary\">{{ formattedTourPrice(tour) }}</span></span></a> }</div> }</aside>\n    <section><div class=\"mb-8 flex items-end justify-between gap-4\"><div><p class=\"text-sm font-semibold uppercase tracking-[.25em] text-primary\">{{ 'topTours' | translate }}</p><h2 class=\"mt-2 text-3xl font-semibold\">{{ 'topToursInCity' | translate:{ city: cityName() } }}</h2></div><span class=\"text-sm font-medium text-slate-500\">{{ tours.length }} / 10</span></div><div class=\"grid gap-6 sm:grid-cols-2 xl:grid-cols-3\">@for (tour of tours; track tour.id) { <a [routerLink]=\"['/tours', tour.id]\" class=\"group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg\"><img [src]=\"tourImage(tour)\" [alt]=\"tourTitle(tour)\" class=\"aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105\"/><div class=\"p-4\"><h3 class=\"line-clamp-2 font-semibold group-hover:text-primary\">{{ tourTitle(tour) }}</h3><p class=\"mt-2 line-clamp-2 text-sm text-slate-500\">{{ tour.description }}</p><div class=\"mt-4 border-t border-slate-100 pt-3 text-lg font-semibold text-primary\">{{ formattedTourPrice(tour) }}</div></div></a> } @empty { <div class=\"col-span-full rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500\">{{ 'noToursForCity' | translate }}</div> }</div></section>\n  </div></main>\n}\n<app-footer-one />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CityPage, { className: "CityPage", filePath: "app/features/home/city-page/city-page.ts", lineNumber: 18 }); })();
