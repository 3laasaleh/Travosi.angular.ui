import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { LanguageService } from '../../../core/services/language.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
const _c1 = a0 => ["/destinations", a0];
const _forTrack0 = ($index, $item) => $item.id ?? $item.destinationId ?? $index;
function HomeDestinationsList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 10);
    i0.ɵɵlistener("click", function HomeDestinationsList_Conditional_9_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadDestinations()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, ctx_r1.errorMessage));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, "showMore"));
} }
function HomeDestinationsList_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12);
    i0.ɵɵelementStart(2, "div", 13);
    i0.ɵɵelement(3, "div", 14)(4, "div", 15);
    i0.ɵɵelementEnd()();
} }
function HomeDestinationsList_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵrepeaterCreate(1, HomeDestinationsList_Conditional_10_For_2_Template, 5, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function HomeDestinationsList_Conditional_11_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(destination_r3.subDescription ?? destination_r3.description);
} }
function HomeDestinationsList_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 16)(1, "article", 18)(2, "div", 19);
    i0.ɵɵelement(3, "img", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 21)(5, "h2", 22);
    i0.ɵɵelement(6, "i", 23);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, HomeDestinationsList_Conditional_11_For_2_Conditional_8_Template, 2, 1, "p", 24);
    i0.ɵɵelementStart(9, "div", 25)(10, "div", 26)(11, "span", 27);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelement(14, "i", 28);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const destination_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c1, destination_r3.id ?? destination_r3.destinationId));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(destination_r3), i0.ɵɵsanitizeUrl)("alt", ctx_r1.destinationName(destination_r3));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r1.destinationName(destination_r3), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(destination_r3.subDescription ?? destination_r3.description ? 8 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(13, 6, "exploreNow"), " ");
} }
function HomeDestinationsList_Conditional_11_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelement(1, "i", 29);
    i0.ɵɵelementStart(2, "p", 30);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "noDestinationsFound"));
} }
function HomeDestinationsList_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, HomeDestinationsList_Conditional_11_For_2_Template, 15, 10, "a", 16, _forTrack0, false, HomeDestinationsList_Conditional_11_ForEmpty_3_Template, 5, 3, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.destinations);
} }
function HomeDestinationsList_Conditional_12_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r5);
} }
function HomeDestinationsList_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "span", 31);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 32)(5, "label", 33)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 34);
    i0.ɵɵlistener("change", function HomeDestinationsList_Conditional_12_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, HomeDestinationsList_Conditional_12_For_11_Template, 2, 2, "option", 35, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 36);
    i0.ɵɵlistener("pageChange", function HomeDestinationsList_Conditional_12_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageChange($event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(3, 7, "totalRecords"), ": ", ctx_r1.paginationInfo.totalCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 9, "pageSize"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.paginationInfo.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("compact", true)("currentPage", ctx_r1.paginationInfo.page)("totalPages", ctx_r1.paginationInfo.totalPages);
} }
export class HomeDestinationsList {
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    languageService = inject(LanguageService);
    pageSizeOptions = [8, 12, 24];
    heroImage = 'assets/images/bg/cta.jpg';
    destinations = [];
    isLoading = false;
    errorMessage = '';
    paginationInfo = {
        page: 1,
        pageSize: 12,
        totalCount: 0,
        totalPages: 1,
    };
    ngOnInit() {
        this.loadDestinations();
    }
    loadDestinations() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService
            .getUnauthntecated(`destinations?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`)
            .pipe(catchError(() => {
            this.errorMessage = 'destinationsLoadError';
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
            this.destinations = Array.isArray(rows) ? rows : [];
            this.updatePagination(pageData, this.destinations.length);
        });
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) {
            return;
        }
        this.paginationInfo.page = page;
        this.loadDestinations();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadDestinations();
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
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    updatePagination(pageData, rowCount) {
        const totalCount = Number(pageData?.totalCount ?? rowCount);
        const pageSize = Number(pageData?.pageSize ?? this.paginationInfo.pageSize);
        this.paginationInfo = {
            page: Number(pageData?.page ?? this.paginationInfo.page),
            pageSize,
            totalCount,
            totalPages: Math.max(1, Number(pageData?.totalPages ?? Math.ceil(totalCount / Math.max(1, pageSize)))),
        };
    }
    static ɵfac = function HomeDestinationsList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeDestinationsList)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeDestinationsList, selectors: [["app-home-destinations-list"]], decls: 14, vars: 8, consts: [[1, "relative", "table", "w-full", "bg-cover", "bg-center", "bg-no-repeat", "py-36"], [1, "absolute", "inset-0", "bg-gradient-to-b", "from-slate-900/55", "via-slate-900/75", "to-slate-900"], [1, "container", "relative", "pt-10", "text-center"], [1, "text-4xl", "font-semibold", "tracking-wide", "text-white"], [1, "relative", "py-16", "md:py-24"], [1, "container", "relative"], [1, "mb-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], ["aria-busy", "true", 1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4"], [1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4"], [1, "mt-8", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-5", "dark:border-slate-800"], ["type", "button", 1, "rounded-full", "border", "border-red-300", "px-4", "py-1.5", "font-semibold", "hover:bg-red-100", 3, "click"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "aspect-[4/3]", "animate-pulse", "bg-slate-200"], [1, "space-y-3", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-full", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "group", "flex", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "duration-300", "hover:-translate-y-1", "hover:border-primary/40", "hover:shadow-lg", "dark:border-slate-800", 3, "routerLink"], [1, "col-span-full", "rounded-2xl", "border", "border-dashed", "border-slate-300", "p-12", "text-center", "text-slate-500", "dark:border-slate-700"], [1, "flex", "w-full", "flex-col"], [1, "relative", "overflow-hidden"], ["loading", "lazy", 1, "aspect-[4/3]", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "flex", "flex-1", "flex-col", "p-4"], [1, "line-clamp-2", "text-lg", "font-semibold", "transition", "group-hover:text-primary"], [1, "mdi", "mdi-map-marker-outline", "me-1", "text-primary"], [1, "mt-2", "line-clamp-2", "text-sm", "leading-6", "text-slate-500"], [1, "mt-auto", "pt-4"], [1, "flex", "items-center", "justify-end", "border-t", "border-slate-100", "pt-3", "dark:border-slate-800"], [1, "text-sm", "font-semibold", "text-slate-500", "transition", "group-hover:text-primary"], [1, "mdi", "mdi-arrow-right", "rtl:rotate-180"], [1, "mdi", "mdi-map-marker-question-outline", "text-5xl", "text-slate-300"], [1, "mt-3"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-2", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "border-slate-200", "bg-white", "px-3", "py-2", "text-sm", "text-slate-700", "dark:border-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function HomeDestinationsList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0);
            i0.ɵɵelement(2, "div", 1);
            i0.ɵɵelementStart(3, "div", 2)(4, "h1", 3);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "main", 4)(8, "div", 5);
            i0.ɵɵconditionalCreate(9, HomeDestinationsList_Conditional_9_Template, 7, 6, "div", 6);
            i0.ɵɵconditionalCreate(10, HomeDestinationsList_Conditional_10_Template, 3, 1, "div", 7)(11, HomeDestinationsList_Conditional_11_Template, 4, 1, "div", 8);
            i0.ɵɵconditionalCreate(12, HomeDestinationsList_Conditional_12_Template, 13, 11, "div", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(13, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.heroImage + ")");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, "destinations"));
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.errorMessage ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 10 : 11);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.isLoading && !ctx.errorMessage ? 12 : -1);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeDestinationsList, [{
        type: Component,
        args: [{ selector: 'app-home-destinations-list', standalone: true, imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\n\n<section class=\"relative table w-full bg-cover bg-center bg-no-repeat py-36\" [style.background-image]=\"'url(' + heroImage + ')'\">\n  <div class=\"absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-900/75 to-slate-900\"></div>\n  <div class=\"container relative pt-10 text-center\">\n    <h1 class=\"text-4xl font-semibold tracking-wide text-white\">{{ 'destinations' | translate }}</h1>\n  </div>\n</section>\n\n<main class=\"relative py-16 md:py-24\">\n  <div class=\"container relative\">\n    @if (errorMessage) {\n      <div class=\"mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">\n        <span>{{ errorMessage | translate }}</span>\n        <button type=\"button\" class=\"rounded-full border border-red-300 px-4 py-1.5 font-semibold hover:bg-red-100\" (click)=\"loadDestinations()\">{{ 'showMore' | translate }}</button>\n      </div>\n    }\n\n    @if (isLoading) {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\" aria-busy=\"true\">\n        @for (card of [1,2,3,4,5,6,7,8]; track card) {\n          <div class=\"overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm\">\n            <div class=\"aspect-[4/3] animate-pulse bg-slate-200\"></div>\n            <div class=\"space-y-3 p-4\">\n              <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-4 w-full animate-pulse rounded-full bg-slate-200\"></div>\n            </div>\n          </div>\n        }\n      </div>\n    } @else {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\">\n        @for (destination of destinations; track destination.id ?? destination.destinationId ?? $index) {\n          <a [routerLink]=\"['/destinations', destination.id ?? destination.destinationId]\" class=\"group flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800 \">\n            <article class=\"flex w-full flex-col\">\n              <div class=\"relative overflow-hidden\">\n                <img [src]=\"imageUrl(destination)\" [alt]=\"destinationName(destination)\" loading=\"lazy\" class=\"aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105\" />\n              </div>\n              <div class=\"flex flex-1 flex-col p-4\">\n                <h2 class=\"line-clamp-2 text-lg font-semibold transition group-hover:text-primary\">\n                  <i class=\"mdi mdi-map-marker-outline me-1 text-primary\"></i>{{ destinationName(destination) }}\n                </h2>\n                @if (destination.subDescription ?? destination.description) {\n                  <p class=\"mt-2 line-clamp-2 text-sm leading-6 text-slate-500\">{{ destination.subDescription ?? destination.description }}</p>\n                }\n                <div class=\"mt-auto pt-4\">\n                  <div class=\"flex items-center justify-end border-t border-slate-100 pt-3 dark:border-slate-800\">\n                    <span class=\"text-sm font-semibold text-slate-500 transition group-hover:text-primary\">{{ 'exploreNow' | translate }} <i class=\"mdi mdi-arrow-right rtl:rotate-180\"></i></span>\n                  </div>\n                </div>\n              </div>\n            </article>\n          </a>\n        } @empty {\n          <div class=\"col-span-full rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-700\">\n            <i class=\"mdi mdi-map-marker-question-outline text-5xl text-slate-300\"></i>\n            <p class=\"mt-3\">{{ 'noDestinationsFound' | translate }}</p>\n          </div>\n        }\n      </div>\n    }\n\n    @if (!isLoading && !errorMessage) {\n      <div class=\"mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800\">\n        <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n        <div class=\"flex flex-wrap items-center gap-2\">\n          <label class=\"flex items-center gap-2 text-sm text-slate-500\">\n            <span>{{ 'pageSize' | translate }}</span>\n            <select class=\"rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700  \" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">\n              @for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }\n            </select>\n          </label>\n          <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\n        </div>\n      </div>\n    }\n  </div>\n</main>\n\n<app-footer-one />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeDestinationsList, { className: "HomeDestinationsList", filePath: "app/features/home/destinations-list/destinations-list.ts", lineNumber: 34 }); })();
