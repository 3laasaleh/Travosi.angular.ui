import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { environment } from '../../../../environments/environment';
import { CurrencyService } from '../../../core/services/currency.service';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5];
const _c1 = a0 => ["/destinations", a0];
const _c2 = (a0, a1) => ["/destinations", a0, "cities", a1];
const _c3 = a0 => ["/tours", a0];
const _forTrack0 = ($index, $item) => $item.id;
function DestinationsMenu_Conditional_5_Conditional_2_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 8);
} }
function DestinationsMenu_Conditional_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵrepeaterCreate(1, DestinationsMenu_Conditional_5_Conditional_2_For_2_Template, 1, 0, "div", 8, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function DestinationsMenu_Conditional_5_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "i", 9);
    i0.ɵɵelementStart(2, "p", 10);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 11);
    i0.ɵɵlistener("click", function DestinationsMenu_Conditional_5_Conditional_3_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.retry()); });
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 2, "destinationsLoadError"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, "retry"));
} }
function DestinationsMenu_Conditional_5_Conditional_4_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵlistener("mouseenter", function DestinationsMenu_Conditional_5_Conditional_4_For_4_Template_a_mouseenter_0_listener() { const destination_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectDestination(destination_r6)); })("focus", function DestinationsMenu_Conditional_5_Conditional_4_For_4_Template_a_focus_0_listener() { const destination_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectDestination(destination_r6)); })("click", function DestinationsMenu_Conditional_5_Conditional_4_For_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵelementStart(1, "span", 18);
    i0.ɵɵelement(2, "i", 19);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "i", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("bg-primary-50", ctx_r1.selectedDestination?.id === destination_r6.id)("text-primary", ctx_r1.selectedDestination?.id === destination_r6.id);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(6, _c1, destination_r6.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.destinationName(destination_r6));
} }
function DestinationsMenu_Conditional_5_Conditional_4_ForEmpty_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noDestinationsFound"));
} }
function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 17);
    i0.ɵɵlistener("mouseenter", function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_For_4_Template_a_mouseenter_0_listener() { const city_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.selectCity(city_r8)); })("focus", function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_For_4_Template_a_focus_0_listener() { const city_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.selectCity(city_r8)); })("click", function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_For_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵelementStart(1, "span", 18);
    i0.ɵɵelement(2, "i", 23);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "i", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const city_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("bg-primary-50", ctx_r1.selectedCity?.id === city_r8.id)("text-primary", ctx_r1.selectedCity?.id === city_r8.id);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction2(6, _c2, ctx_r1.selectedDestination.id, city_r8.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.cityName(city_r8));
} }
function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_ForEmpty_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noCitiesForDestination"));
} }
function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Conditional_6_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 28);
    i0.ɵɵlistener("click", function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Conditional_6_For_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵelement(1, "img", 29);
    i0.ɵɵelementStart(2, "span", 30)(3, "span", 31);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 32);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const tour_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(5, _c3, tour_r10.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.tourImage(tour_r10), i0.ɵɵsanitizeUrl)("alt", ctx_r1.tourName(tour_r10));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.tourName(tour_r10));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formattedTourPrice(tour_r10));
} }
function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Conditional_6_ForEmpty_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementStart(2, "p", 34);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "noToursForCity"));
} }
function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 24)(2, "div", 25);
    i0.ɵɵrepeaterCreate(3, DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Conditional_6_For_4_Template, 7, 7, "a", 26, _forTrack0, false, DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Conditional_6_ForEmpty_5_Template, 5, 3, "div", 27);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.tours);
} }
function DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 5)(2, "div", 21);
    i0.ɵɵrepeaterCreate(3, DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_For_4_Template, 5, 9, "a", 13, _forTrack0, false, DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_ForEmpty_5_Template, 3, 3, "p", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Conditional_6_Template, 6, 1, "div", 22);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.cities);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.selectedCity ? 6 : -1);
} }
function DestinationsMenu_Conditional_5_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, DestinationsMenu_Conditional_5_Conditional_4_For_4_Template, 5, 8, "a", 13, _forTrack0, false, DestinationsMenu_Conditional_5_Conditional_4_ForEmpty_5_Template, 3, 3, "p", 14);
    i0.ɵɵelementStart(6, "a", 15);
    i0.ɵɵlistener("click", function DestinationsMenu_Conditional_5_Conditional_4_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenu()); });
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, DestinationsMenu_Conditional_5_Conditional_4_Conditional_9_Template, 7, 2, "div", 16);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, "destinations"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.destinations);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 6, "viewAllDestinations"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.selectedDestination ? 9 : -1);
} }
function DestinationsMenu_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵlistener("mouseenter", function DestinationsMenu_Conditional_5_Template_div_mouseenter_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.cancelClose()); })("mouseleave", function DestinationsMenu_Conditional_5_Template_div_mouseleave_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.scheduleClose()); });
    i0.ɵɵelementStart(1, "div", 5);
    i0.ɵɵconditionalCreate(2, DestinationsMenu_Conditional_5_Conditional_2_Template, 3, 1, "div", 6)(3, DestinationsMenu_Conditional_5_Conditional_3_Template, 8, 6, "div", 7)(4, DestinationsMenu_Conditional_5_Conditional_4_Template, 10, 8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isLoading ? 2 : ctx_r1.loadFailed ? 3 : 4);
} }
export class DestinationsMenu {
    api = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    elementRef = inject((ElementRef));
    translate = inject(TranslateService);
    currencyService = inject(CurrencyService);
    menuOpen = false;
    isLoading = false;
    loaded = false;
    loadFailed = false;
    destinations = [];
    selectedDestination = null;
    selectedCity = null;
    closeTimer = null;
    destinationName(item) { return this.isArabic ? item?.nameAr ?? item?.nameEng ?? '' : item?.nameEng ?? item?.nameAr ?? ''; }
    cityName(item) { return this.destinationName(item); }
    tourName(item) { return this.isArabic ? item?.titleAr ?? item?.titleEng ?? '' : item?.titleEng ?? item?.titleAr ?? ''; }
    tourImage(tour) {
        const raw = String(tour?.coverImageUrl ?? '').trim();
        if (!raw)
            return 'assets/images/bg/3.jpg';
        if (/^(blob:|data:|https?:\/\/)/i.test(raw))
            return raw;
        const path = raw.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    formattedTourPrice(tour) {
        return this.currencyService.formatPrice(tour?.pricePerPerson, tour?.currencyId ?? tour?.currency ?? 'USD');
    }
    get isArabic() { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
    get cities() { return this.selectedDestination?.cities ?? []; }
    get tours() { return this.selectedCity?.tours ?? []; }
    toggleMenu(event) {
        event.stopPropagation();
        this.menuOpen = !this.menuOpen;
        if (this.menuOpen && !this.loaded)
            this.loadHierarchy();
    }
    openMenu() {
        this.cancelClose();
        this.menuOpen = true;
        if (!this.loaded && !this.isLoading)
            this.loadHierarchy();
    }
    scheduleClose() {
        this.cancelClose();
        this.closeTimer = setTimeout(() => this.closeMenu(), 140);
    }
    cancelClose() {
        if (this.closeTimer !== null) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    closeMenu() {
        this.cancelClose();
        this.menuOpen = false;
        this.selectedDestination = null;
        this.selectedCity = null;
    }
    selectDestination(destination) {
        if (this.selectedDestination?.id === destination?.id)
            return;
        this.selectedDestination = destination;
        this.selectedCity = null;
    }
    selectCity(city) { this.selectedCity = city; }
    retry() { this.loaded = false; this.loadHierarchy(); }
    loadHierarchy() {
        this.isLoading = true;
        this.loadFailed = false;
        this.api.getUnauthntecated('Destinations/Navigation?takeDestinations=10&takeCities=10&takeTours=8').pipe(catchError(() => {
            this.loadFailed = true;
            return of(null);
        }), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); })).subscribe((response) => {
            if (response === null)
                return;
            const data = response?.data ?? response;
            const rows = data?.data ?? data?.destinations ?? data;
            this.destinations = Array.isArray(rows) ? rows : [];
            this.selectedDestination = null;
            this.selectedCity = null;
            this.loaded = true;
        });
    }
    closeOnEscape() { this.closeMenu(); }
    closeOnOutsideClick(event) { if (!this.elementRef.nativeElement.contains(event.target))
        this.closeMenu(); }
    static ɵfac = function DestinationsMenu_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DestinationsMenu)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DestinationsMenu, selectors: [["app-destinations-menu"]], hostBindings: function DestinationsMenu_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown.escape", function DestinationsMenu_keydown_escape_HostBindingHandler() { return ctx.closeOnEscape(); }, i0.ɵɵresolveDocument)("click", function DestinationsMenu_click_HostBindingHandler($event) { return ctx.closeOnOutsideClick($event); }, i0.ɵɵresolveDocument);
        } }, decls: 6, vars: 9, consts: [[1, "relative", 3, "mouseenter", "mouseleave", "focusin"], ["type", "button", "aria-haspopup", "true", "aria-controls", "destinations-hover-menu", 1, "flex", "items-center", "gap-1", "rounded-xl", "px-4", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", 3, "click"], ["aria-hidden", "true", 1, "mdi", "text-base", "leading-none"], ["id", "destinations-hover-menu", "role", "menu", 1, "absolute", "right-0", "top-full", "z-[60]", "pt-2", "rtl:left-0", "rtl:right-auto"], ["id", "destinations-hover-menu", "role", "menu", 1, "absolute", "right-0", "top-full", "z-[60]", "pt-2", "rtl:left-0", "rtl:right-auto", 3, "mouseenter", "mouseleave"], [1, "relative", "w-64", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-2", "shadow-xl"], [1, "space-y-2", "p-2"], [1, "p-5", "text-center"], [1, "h-11", "animate-pulse", "rounded-xl", "bg-slate-100"], ["aria-hidden", "true", 1, "mdi", "mdi-cloud-alert-outline", "text-3xl", "text-rose-400"], [1, "mt-2", "text-sm", "text-slate-500"], ["type", "button", 1, "mt-3", "rounded-full", "bg-primary", "px-4", "py-1.5", "text-xs", "font-semibold", "text-white", 3, "click"], [1, "px-3", "pb-2", "pt-1", "text-xs", "font-bold", "uppercase", "tracking-[.18em]", "text-primary"], ["role", "menuitem", 1, "group", "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-700", "transition", "hover:bg-primary-50", "hover:text-primary", "focus:bg-primary-50", "focus:text-primary", "focus:outline-none", 3, "routerLink", "bg-primary-50", "text-primary"], [1, "p-4", "text-sm", "text-slate-500"], ["routerLink", "/destinations", 1, "mt-2", "block", "border-t", "border-slate-100", "px-3", "pt-3", "text-center", "text-sm", "font-semibold", "text-primary", "hover:underline", 3, "click"], [1, "absolute", "right-full", "top-0", "hidden", "pe-2", "lg:block", "rtl:left-full", "rtl:right-auto", "rtl:pe-0", "rtl:ps-2"], ["role", "menuitem", 1, "group", "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-700", "transition", "hover:bg-primary-50", "hover:text-primary", "focus:bg-primary-50", "focus:text-primary", "focus:outline-none", 3, "mouseenter", "focus", "click", "routerLink"], [1, "min-w-0", "truncate"], ["aria-hidden", "true", 1, "mdi", "mdi-map-marker-outline", "me-2"], ["aria-hidden", "true", 1, "mdi", "mdi-chevron-left", "text-lg", "rtl:rotate-180"], [1, "max-h-80", "overflow-y-auto", "py-1"], [1, "absolute", "right-full", "top-0", "pe-2", "rtl:left-full", "rtl:right-auto", "rtl:pe-0", "rtl:ps-2"], ["aria-hidden", "true", 1, "mdi", "mdi-city-variant-outline", "me-2"], [1, "w-80", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-2", "shadow-xl"], [1, "max-h-96", "space-y-1", "overflow-y-auto", "py-1"], ["role", "menuitem", 1, "group", "flex", "gap-3", "rounded-xl", "p-2", "transition", "hover:bg-primary-50", "focus:bg-primary-50", "focus:outline-none", 3, "routerLink"], [1, "p-5", "text-center", "text-sm", "text-slate-500"], ["role", "menuitem", 1, "group", "flex", "gap-3", "rounded-xl", "p-2", "transition", "hover:bg-primary-50", "focus:bg-primary-50", "focus:outline-none", 3, "click", "routerLink"], [1, "h-14", "w-16", "shrink-0", "rounded-lg", "object-cover", 3, "src", "alt"], [1, "min-w-0", "py-0.5"], [1, "line-clamp-2", "text-sm", "font-semibold", "leading-5", "text-slate-700", "group-hover:text-primary"], [1, "mt-1", "block", "text-xs", "font-bold", "text-primary"], ["aria-hidden", "true", 1, "mdi", "mdi-map-search-outline", "text-3xl", "text-slate-300"], [1, "mt-2"]], template: function DestinationsMenu_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵlistener("mouseenter", function DestinationsMenu_Template_div_mouseenter_0_listener() { return ctx.openMenu(); })("mouseleave", function DestinationsMenu_Template_div_mouseleave_0_listener() { return ctx.scheduleClose(); })("focusin", function DestinationsMenu_Template_div_focusin_0_listener() { return ctx.openMenu(); });
            i0.ɵɵelementStart(1, "button", 1);
            i0.ɵɵlistener("click", function DestinationsMenu_Template_button_click_1_listener($event) { return ctx.toggleMenu($event); });
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "translate");
            i0.ɵɵelement(4, "i", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, DestinationsMenu_Conditional_5_Template, 5, 1, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-expanded", ctx.menuOpen);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 7, "destinations"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-chevron-down", !ctx.menuOpen)("mdi-chevron-up", ctx.menuOpen);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.menuOpen ? 5 : -1);
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DestinationsMenu, [{
        type: Component,
        args: [{ selector: 'app-destinations-menu', standalone: true, imports: [RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"relative\" (mouseenter)=\"openMenu()\" (mouseleave)=\"scheduleClose()\" (focusin)=\"openMenu()\">\n  <button\n    type=\"button\"\n    class=\"flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20\"\n    aria-haspopup=\"true\"\n    aria-controls=\"destinations-hover-menu\"\n    [attr.aria-expanded]=\"menuOpen\"\n    (click)=\"toggleMenu($event)\">\n    {{ 'destinations' | translate }}\n    <i class=\"mdi text-base leading-none\" [class.mdi-chevron-down]=\"!menuOpen\" [class.mdi-chevron-up]=\"menuOpen\" aria-hidden=\"true\"></i>\n  </button>\n\n  @if (menuOpen) {\n    <div\n      id=\"destinations-hover-menu\"\n      class=\"absolute right-0 top-full z-[60] pt-2 rtl:left-0 rtl:right-auto\"\n      role=\"menu\"\n      (mouseenter)=\"cancelClose()\"\n      (mouseleave)=\"scheduleClose()\">\n\n      <div class=\"relative w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl\">\n        @if (isLoading) {\n          <div class=\"space-y-2 p-2\">\n            @for (item of [1,2,3,4,5]; track item) { <div class=\"h-11 animate-pulse rounded-xl bg-slate-100\"></div> }\n          </div>\n        } @else if (loadFailed) {\n          <div class=\"p-5 text-center\">\n            <i class=\"mdi mdi-cloud-alert-outline text-3xl text-rose-400\" aria-hidden=\"true\"></i>\n            <p class=\"mt-2 text-sm text-slate-500\">{{ 'destinationsLoadError' | translate }}</p>\n            <button type=\"button\" class=\"mt-3 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white\" (click)=\"retry()\">{{ 'retry' | translate }}</button>\n          </div>\n        } @else {\n          <p class=\"px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[.18em] text-primary\">{{ 'destinations' | translate }}</p>\n\n          @for (destination of destinations; track destination.id) {\n            <a\n              [routerLink]=\"['/destinations', destination.id]\"\n              role=\"menuitem\"\n              class=\"group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-primary focus:bg-primary-50 focus:text-primary focus:outline-none\"\n              [class.bg-primary-50]=\"selectedDestination?.id === destination.id\"\n              [class.text-primary]=\"selectedDestination?.id === destination.id\"\n              (mouseenter)=\"selectDestination(destination)\"\n              (focus)=\"selectDestination(destination)\"\n              (click)=\"closeMenu()\">\n              <span class=\"min-w-0 truncate\"><i class=\"mdi mdi-map-marker-outline me-2\" aria-hidden=\"true\"></i>{{ destinationName(destination) }}</span>\n              <i class=\"mdi mdi-chevron-left text-lg rtl:rotate-180\" aria-hidden=\"true\"></i>\n            </a>\n          } @empty {\n            <p class=\"p-4 text-sm text-slate-500\">{{ 'noDestinationsFound' | translate }}</p>\n          }\n\n          <a routerLink=\"/destinations\" (click)=\"closeMenu()\" class=\"mt-2 block border-t border-slate-100 px-3 pt-3 text-center text-sm font-semibold text-primary hover:underline\">{{ 'viewAllDestinations' | translate }}</a>\n\n          @if (selectedDestination) {\n            <div class=\"absolute right-full top-0 hidden pe-2 lg:block rtl:left-full rtl:right-auto rtl:pe-0 rtl:ps-2\">\n              <div class=\"relative w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl\">\n                <div class=\"max-h-80 overflow-y-auto py-1\">\n                  @for (city of cities; track city.id) {\n                    <a\n                      [routerLink]=\"['/destinations', selectedDestination.id, 'cities', city.id]\"\n                      role=\"menuitem\"\n                      class=\"group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-primary focus:bg-primary-50 focus:text-primary focus:outline-none\"\n                      [class.bg-primary-50]=\"selectedCity?.id === city.id\"\n                      [class.text-primary]=\"selectedCity?.id === city.id\"\n                      (mouseenter)=\"selectCity(city)\"\n                      (focus)=\"selectCity(city)\"\n                      (click)=\"closeMenu()\">\n                      <span class=\"min-w-0 truncate\"><i class=\"mdi mdi-city-variant-outline me-2\" aria-hidden=\"true\"></i>{{ cityName(city) }}</span>\n                      <i class=\"mdi mdi-chevron-left text-lg rtl:rotate-180\" aria-hidden=\"true\"></i>\n                    </a>\n                  } @empty {\n                    <p class=\"p-4 text-sm text-slate-500\">{{ 'noCitiesForDestination' | translate }}</p>\n                  }\n                </div>\n\n                @if (selectedCity) {\n                  <div class=\"absolute right-full top-0 pe-2 rtl:left-full rtl:right-auto rtl:pe-0 rtl:ps-2\">\n                    <div class=\"w-80 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl\">\n                      <div class=\"max-h-96 space-y-1 overflow-y-auto py-1\">\n                        @for (tour of tours; track tour.id) {\n                          <a [routerLink]=\"['/tours', tour.id]\" role=\"menuitem\" (click)=\"closeMenu()\" class=\"group flex gap-3 rounded-xl p-2 transition hover:bg-primary-50 focus:bg-primary-50 focus:outline-none\">\n                            <img [src]=\"tourImage(tour)\" [alt]=\"tourName(tour)\" class=\"h-14 w-16 shrink-0 rounded-lg object-cover\" />\n                            <span class=\"min-w-0 py-0.5\">\n                              <span class=\"line-clamp-2 text-sm font-semibold leading-5 text-slate-700 group-hover:text-primary\">{{ tourName(tour) }}</span>\n                              <span class=\"mt-1 block text-xs font-bold text-primary\">{{ formattedTourPrice(tour) }}</span>\n                            </span>\n                          </a>\n                        } @empty {\n                          <div class=\"p-5 text-center text-sm text-slate-500\">\n                            <i class=\"mdi mdi-map-search-outline text-3xl text-slate-300\" aria-hidden=\"true\"></i>\n                            <p class=\"mt-2\">{{ 'noToursForCity' | translate }}</p>\n                          </div>\n                        }\n                      </div>\n                    </div>\n                  </div>\n                }\n              </div>\n            </div>\n          }\n        }\n      </div>\n    </div>\n  }\n</div>\n" }]
    }], null, { closeOnEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }], closeOnOutsideClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DestinationsMenu, { className: "DestinationsMenu", filePath: "app/layout/home-navbar/destinations-menu/destinations-menu.ts", lineNumber: 13 }); })();
