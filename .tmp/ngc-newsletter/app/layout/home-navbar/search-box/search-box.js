import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, HostListener, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, debounceTime, distinctUntilChanged, forkJoin, map, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.labelKey;
const _forTrack1 = ($index, $item) => $item.id;
function SearchBox_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 6);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function SearchBox_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSearch()); });
    i0.ɵɵelement(2, "i", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 1, "clearSearch"));
} }
function SearchBox_Conditional_6_Conditional_2_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function SearchBox_Conditional_6_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, SearchBox_Conditional_6_Conditional_2_For_1_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
} if (rf & 2) {
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function SearchBox_Conditional_6_Conditional_3_For_1_Conditional_0_For_4_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function SearchBox_Conditional_6_Conditional_3_For_1_Conditional_0_For_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 13);
    i0.ɵɵlistener("click", function SearchBox_Conditional_6_Conditional_3_For_1_Conditional_0_For_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.closeResults()); });
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementStart(2, "span", 14)(3, "span", 15);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, SearchBox_Conditional_6_Conditional_3_For_1_Conditional_0_For_4_Conditional_5_Template, 2, 1, "span", 16);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_26_0;
    const item_r4 = ctx.$implicit;
    const group_r5 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("routerLink", group_r5.route);
    i0.ɵɵadvance();
    i0.ɵɵclassMap("mdi text-primary " + group_r5.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.displayName(item_r4));
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_26_0 = ctx_r1.displayDescription(item_r4)) ? 5 : -1, tmp_26_0);
} }
function SearchBox_Conditional_6_Conditional_3_For_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, SearchBox_Conditional_6_Conditional_3_For_1_Conditional_0_For_4_Template, 6, 5, "a", 12, _forTrack1);
} if (rf & 2) {
    const group_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, group_r5.labelKey));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(group_r5.items);
} }
function SearchBox_Conditional_6_Conditional_3_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, SearchBox_Conditional_6_Conditional_3_For_1_Conditional_0_Template, 5, 3);
} if (rf & 2) {
    const group_r5 = ctx.$implicit;
    i0.ɵɵconditional(group_r5.items.length ? 0 : -1);
} }
function SearchBox_Conditional_6_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, SearchBox_Conditional_6_Conditional_3_For_1_Template, 1, 1, null, null, _forTrack0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r1.groups);
} }
function SearchBox_Conditional_6_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noSearchResults"));
} }
function SearchBox_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 8);
    i0.ɵɵconditionalCreate(2, SearchBox_Conditional_6_Conditional_2_Template, 2, 1)(3, SearchBox_Conditional_6_Conditional_3_Template, 2, 0)(4, SearchBox_Conditional_6_Conditional_4_Template, 3, 3, "p", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isLoading ? 2 : ctx_r1.hasResults ? 3 : 4);
} }
export class SearchBox {
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    elementRef = inject((ElementRef));
    translate = inject(TranslateService);
    searchControl = new FormControl('', { nonNullable: true });
    resultsOpen = false;
    isLoading = false;
    loaded = false;
    destinations = [];
    tours = [];
    packages = [];
    groups = [];
    get hasResults() {
        return this.groups.some((group) => group.items.length > 0);
    }
    displayName(item) {
        const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
        return arabic
            ? (item?.nameAr ?? item?.titleAr ?? item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? '')
            : (item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? item?.nameAr ?? item?.titleAr ?? '');
    }
    displayDescription(item) {
        const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
        return arabic
            ? (item?.subDescriptionAr ?? item?.descriptionAr ?? item?.subDescription ?? item?.description ?? '')
            : (item?.subDescriptionEng ?? item?.descriptionEng ?? item?.subDescription ?? item?.description ?? '');
    }
    ngOnInit() {
        this.searchControl.valueChanges
            .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe((term) => this.search(term));
    }
    onFocus() {
        this.ensureDataLoaded();
        if (this.searchControl.value.trim().length >= 2)
            this.resultsOpen = true;
    }
    clearSearch() {
        this.searchControl.setValue('');
        this.resultsOpen = false;
    }
    closeResults() {
        this.resultsOpen = false;
    }
    search(term) {
        const query = term.trim().toLowerCase();
        if (query.length < 2) {
            this.resultsOpen = false;
            this.groups = [];
            this.cdr.markForCheck();
            return;
        }
        this.ensureDataLoaded();
        const matches = (items) => items
            .filter((item) => {
            const name = `${item.nameEng ?? item.name ?? ''} ${item.nameAr ?? ''}`.toLowerCase();
            return name.includes(query);
        })
            .slice(0, 5);
        this.groups = [
            { labelKey: 'destinations', icon: 'mdi-map-marker-outline', route: '/destinations', items: matches(this.destinations) },
            { labelKey: 'tours', icon: 'mdi-compass-outline', route: '/tours', items: matches(this.tours) },
            { labelKey: 'packages', icon: 'mdi-package-variant-closed', route: '/packages', items: matches(this.packages) },
        ];
        this.resultsOpen = true;
        this.cdr.markForCheck();
    }
    ensureDataLoaded() {
        if (this.loaded || this.isLoading)
            return;
        this.isLoading = true;
        const load = (url, key) => this.apiService.getUnauthntecated(url).pipe(map((response) => {
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.[key] ?? pageData;
            return Array.isArray(rows) ? rows : [];
        }), catchError(() => of([])));
        forkJoin({
            destinations: load('destinations?page=1&pageSize=100', 'destinations'),
            tours: load('Tours?page=1&pageSize=100', 'tours'),
            packages: load('Packages?page=1&pageSize=100', 'packages'),
        })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(({ destinations, tours, packages }) => {
            this.destinations = destinations;
            this.tours = tours;
            this.packages = packages;
            this.loaded = true;
            this.isLoading = false;
            this.search(this.searchControl.value);
        });
    }
    closeOnOutsideClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.resultsOpen = false;
        }
    }
    closeOnEscape() {
        this.resultsOpen = false;
    }
    static ɵfac = function SearchBox_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SearchBox)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchBox, selectors: [["app-search-box"]], hostBindings: function SearchBox_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function SearchBox_click_HostBindingHandler($event) { return ctx.closeOnOutsideClick($event); }, i0.ɵɵresolveDocument)("keydown.escape", function SearchBox_keydown_escape_HostBindingHandler() { return ctx.closeOnEscape(); }, i0.ɵɵresolveDocument);
        } }, decls: 7, vars: 7, consts: [[1, "relative", "w-full", "max-w-md"], [1, "relative"], [1, "mdi", "mdi-magnify", "pointer-events-none", "absolute", "start-3", "top-1/2", "-translate-y-1/2", "text-lg", "text-slate-400"], ["type", "search", "role", "combobox", "aria-autocomplete", "list", 1, "w-full", "rounded-xl", "border", "border-slate-200", "bg-slate-50", "py-2", "ps-10", "pe-9", "text-sm", "font-medium", "text-slate-700", "outline-none", "transition", "placeholder:text-slate-400", "focus:border-primary", "focus:bg-white", "focus:ring-2", "focus:ring-primary/20", "dark:border-slate-700", 3, "focus", "formControl", "placeholder"], ["type", "button", 1, "absolute", "end-2", "top-1/2", "grid", "size-6", "-translate-y-1/2", "place-items-center", "rounded-full", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800"], ["role", "listbox", 1, "absolute", "start-0", "end-0", "mt-2", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg", "dark:border-slate-700"], ["type", "button", 1, "absolute", "end-2", "top-1/2", "grid", "size-6", "-translate-y-1/2", "place-items-center", "rounded-full", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], [1, "mdi", "mdi-close"], [1, "max-h-96", "overflow-y-auto", "p-2"], [1, "p-4", "text-center", "text-sm", "text-slate-500"], [1, "mx-3", "my-2", "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "px-3", "pb-1", "pt-2", "text-xs", "font-semibold", "uppercase", "tracking-[0.2em]", "text-slate-400"], ["role", "option", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "routerLink"], ["role", "option", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLink"], [1, "min-w-0"], [1, "block", "truncate"], [1, "block", "truncate", "text-xs", "text-slate-400"]], template: function SearchBox_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "i", 2);
            i0.ɵɵelementStart(3, "input", 3);
            i0.ɵɵpipe(4, "translate");
            i0.ɵɵlistener("focus", function SearchBox_Template_input_focus_3_listener() { return ctx.onFocus(); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(5, SearchBox_Conditional_5_Template, 3, 3, "button", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, SearchBox_Conditional_6_Template, 5, 1, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formControl", ctx.searchControl)("placeholder", i0.ɵɵpipeBind1(4, 5, "searchPlaceholder"));
            i0.ɵɵattribute("aria-expanded", ctx.resultsOpen);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.searchControl.value ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.resultsOpen ? 6 : -1);
        } }, dependencies: [ReactiveFormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlDirective, RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchBox, [{
        type: Component,
        args: [{ selector: 'app-search-box', standalone: true, imports: [ReactiveFormsModule, RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"relative w-full max-w-md\">\r\n  <div class=\"relative\">\r\n    <i class=\"mdi mdi-magnify pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-lg text-slate-400\"></i>\r\n    <input\r\n      type=\"search\"\r\n      [formControl]=\"searchControl\"\r\n      [placeholder]=\"'searchPlaceholder' | translate\"\r\n      role=\"combobox\"\r\n      aria-autocomplete=\"list\"\r\n      [attr.aria-expanded]=\"resultsOpen\"\r\n      class=\"w-full rounded-xl border border-slate-200 bg-slate-50 py-2 ps-10 pe-9 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-slate-700  \"\r\n      (focus)=\"onFocus()\"\r\n    />\r\n    @if (searchControl.value) {\r\n      <button type=\"button\" class=\"absolute end-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\" [attr.aria-label]=\"'clearSearch' | translate\" (click)=\"clearSearch()\">\r\n        <i class=\"mdi mdi-close\"></i>\r\n      </button>\r\n    }\r\n  </div>\r\n\r\n  @if (resultsOpen) {\r\n    <div class=\"absolute start-0 end-0 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 \" role=\"listbox\">\r\n      <div class=\"max-h-96 overflow-y-auto p-2\">\r\n        @if (isLoading) {\r\n          @for (row of [1,2,3,4]; track row) {\r\n            <div class=\"mx-3 my-2 h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n          }\r\n        } @else if (hasResults) {\r\n          @for (group of groups; track group.labelKey) {\r\n            @if (group.items.length) {\r\n              <p class=\"px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400\">{{ group.labelKey | translate }}</p>\r\n              @for (item of group.items; track item.id) {\r\n                <a [routerLink]=\"group.route\" (click)=\"closeResults()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\" role=\"option\">\r\n                  <i [class]=\"'mdi text-primary ' + group.icon\"></i>\r\n                  <span class=\"min-w-0\">\r\n                    <span class=\"block truncate\">{{ displayName(item) }}</span>\r\n                    @if (displayDescription(item); as description) { <span class=\"block truncate text-xs text-slate-400\">{{ description }}</span> }\r\n                  </span>\r\n                </a>\r\n              }\r\n            }\r\n          }\r\n        } @else {\r\n          <p class=\"p-4 text-center text-sm text-slate-500\">{{ 'noSearchResults' | translate }}</p>\r\n        }\r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n" }]
    }], null, { closeOnOutsideClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], closeOnEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SearchBox, { className: "SearchBox", filePath: "app/layout/home-navbar/search-box/search-box.ts", lineNumber: 32 }); })();
