import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4];
const _c1 = a0 => ["/tours", a0];
const _forTrack0 = ($index, $item) => $item.id;
function ToursMenu_Conditional_5_Conditional_2_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
} }
function ToursMenu_Conditional_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, ToursMenu_Conditional_5_Conditional_2_For_1_Template, 1, 0, "div", 6, i0.ɵɵrepeaterTrackByIdentity);
} if (rf & 2) {
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function ToursMenu_Conditional_5_Conditional_3_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 9);
    i0.ɵɵlistener("click", function ToursMenu_Conditional_5_Conditional_3_For_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.closeMenu()); });
    i0.ɵɵelement(1, "i", 10);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c1, item_r4.id ?? item_r4.tourId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r4.nameEng ?? item_r4.name, " ");
} }
function ToursMenu_Conditional_5_Conditional_3_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noToursFound"));
} }
function ToursMenu_Conditional_5_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, ToursMenu_Conditional_5_Conditional_3_For_1_Template, 3, 4, "a", 7, _forTrack0, false, ToursMenu_Conditional_5_Conditional_3_ForEmpty_2_Template, 3, 3, "p", 8);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r2.tours);
} }
function ToursMenu_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 4);
    i0.ɵɵconditionalCreate(2, ToursMenu_Conditional_5_Conditional_2_Template, 2, 1)(3, ToursMenu_Conditional_5_Conditional_3_Template, 3, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 5);
    i0.ɵɵlistener("click", function ToursMenu_Conditional_5_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeMenu()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r2.isLoading ? 2 : 3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 2, "viewAllTours"));
} }
export class ToursMenu {
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    elementRef = inject((ElementRef));
    menuOpen = false;
    isLoading = false;
    loaded = false;
    tours = [];
    toggleMenu(event) {
        event.stopPropagation();
        this.menuOpen = !this.menuOpen;
        if (this.menuOpen && !this.loaded)
            this.loadTours();
    }
    closeMenu() {
        this.menuOpen = false;
    }
    loadTours() {
        this.isLoading = true;
        this.apiService.getUnauthntecated('Tours?page=1&pageSize=100').pipe(catchError(() => of(null)), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.tours ?? pageData;
            this.tours = Array.isArray(rows) ? rows : [];
            this.loaded = true;
        });
    }
    closeOnOutsideClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.menuOpen = false;
        }
    }
    static ɵfac = function ToursMenu_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToursMenu)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToursMenu, selectors: [["app-tours-menu"]], hostBindings: function ToursMenu_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function ToursMenu_click_HostBindingHandler($event) { return ctx.closeOnOutsideClick($event); }, i0.ɵɵresolveDocument);
        } }, decls: 6, vars: 9, consts: [[1, "relative"], ["type", "button", "aria-haspopup", "menu", 1, "flex", "items-center", "gap-1", "rounded-xl", "px-4", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], [1, "mdi", "text-base", "leading-none"], ["role", "menu", 1, "absolute", "left-0", "mt-2", "w-64", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg", "dark:border-slate-700"], [1, "max-h-80", "overflow-y-auto", "p-2"], ["routerLink", "/tours", 1, "block", "border-t", "border-slate-100", "px-4", "py-3", "text-center", "text-sm", "font-semibold", "text-primary", "hover:bg-slate-50", "dark:border-slate-800", "dark:hover:bg-slate-800", 3, "click"], [1, "mx-3", "my-2", "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], ["role", "menuitem", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "routerLink"], [1, "p-4", "text-center", "text-sm", "text-slate-500"], ["role", "menuitem", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLink"], [1, "mdi", "mdi-compass-outline", "text-primary"]], template: function ToursMenu_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "button", 1);
            i0.ɵɵlistener("click", function ToursMenu_Template_button_click_1_listener($event) { return ctx.toggleMenu($event); });
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "translate");
            i0.ɵɵelement(4, "i", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, ToursMenu_Conditional_5_Template, 7, 4, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-expanded", ctx.menuOpen);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 7, "tours"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-chevron-down", !ctx.menuOpen)("mdi-chevron-up", ctx.menuOpen);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.menuOpen ? 5 : -1);
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToursMenu, [{
        type: Component,
        args: [{ selector: 'app-tours-menu', standalone: true, imports: [RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"relative\">\r\n  <button\r\n    type=\"button\"\r\n    class=\"flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-800\"\r\n    aria-haspopup=\"menu\"\r\n    [attr.aria-expanded]=\"menuOpen\"\r\n    (click)=\"toggleMenu($event)\"\r\n  >\r\n    {{ 'tours' | translate }}\r\n    <i class=\"mdi text-base leading-none\" [class.mdi-chevron-down]=\"!menuOpen\" [class.mdi-chevron-up]=\"menuOpen\"></i>\r\n  </button>\r\n\r\n  @if (menuOpen) {\r\n    <div class=\"absolute left-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 \" role=\"menu\">\r\n      <div class=\"max-h-80 overflow-y-auto p-2\">\r\n        @if (isLoading) {\r\n          @for (row of [1,2,3,4]; track row) {\r\n            <div class=\"mx-3 my-2 h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n          }\r\n        } @else {\r\n          @for (item of tours; track item.id) {\r\n            <a [routerLink]=\"['/tours', item.id ?? item.tourId]\" (click)=\"closeMenu()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\" role=\"menuitem\">\r\n              <i class=\"mdi mdi-compass-outline text-primary\"></i>\r\n              {{ item.nameEng ?? item.name }}\r\n            </a>\r\n          } @empty {\r\n            <p class=\"p-4 text-center text-sm text-slate-500\">{{ 'noToursFound' | translate }}</p>\r\n          }\r\n        }\r\n      </div>\r\n      <a routerLink=\"/tours\" (click)=\"closeMenu()\" class=\"block border-t border-slate-100 px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800\">{{ 'viewAllTours' | translate }}</a>\r\n    </div>\r\n  }\r\n</div>\r\n" }]
    }], null, { closeOnOutsideClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToursMenu, { className: "ToursMenu", filePath: "app/layout/home-navbar/tours-menu/tours-menu.ts", lineNumber: 21 }); })();
