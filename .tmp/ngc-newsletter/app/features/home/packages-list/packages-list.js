import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import { formatHomePrice } from '../home-price.util';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5, 6, 7, 8];
const _c1 = a0 => ["/packages", a0];
const _forTrack0 = ($index, $item) => $item.id ?? $item.packageId ?? $index;
function HomePackagesList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 10);
    i0.ɵɵlistener("click", function HomePackagesList_Conditional_9_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadPackages()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, ctx_r1.errorMessage));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 4, "showMore"), " ");
} }
function HomePackagesList_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12);
    i0.ɵɵelementStart(2, "div", 13);
    i0.ɵɵelement(3, "div", 14)(4, "div", 15)(5, "div", 16);
    i0.ɵɵelementEnd()();
} }
function HomePackagesList_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵrepeaterCreate(1, HomePackagesList_Conditional_10_For_2_Template, 6, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function HomePackagesList_Conditional_11_For_2_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.destinationName(item_r3), " ");
} }
function HomePackagesList_Conditional_11_For_2_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function HomePackagesList_Conditional_11_For_2_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", ctx, " ", i0.ɵɵpipeBind1(3, 2, "days"), " ");
} }
function HomePackagesList_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 17)(1, "article", 19)(2, "div", 20);
    i0.ɵɵelement(3, "img", 21);
    i0.ɵɵconditionalCreate(4, HomePackagesList_Conditional_11_For_2_Conditional_4_Template, 3, 1, "span", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 23)(6, "h2", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, HomePackagesList_Conditional_11_For_2_Conditional_8_Template, 2, 1, "p", 25);
    i0.ɵɵelementStart(9, "div", 26);
    i0.ɵɵconditionalCreate(10, HomePackagesList_Conditional_11_For_2_Conditional_10_Template, 4, 4, "p", 27);
    i0.ɵɵelementStart(11, "div", 28)(12, "strong", 29);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 30);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵelement(17, "i", 31);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    let tmp_16_0;
    let tmp_17_0;
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(11, _c1, item_r3.id ?? item_r3.packageId));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(item_r3), i0.ɵɵsanitizeUrl)("alt", ctx_r1.packageTitle(item_r3));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.destinationName(item_r3) ? 4 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.packageTitle(item_r3));
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_16_0 = ctx_r1.packageDescription(item_r3)) ? 8 : -1, tmp_16_0);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_17_0 = ctx_r1.durationDays(item_r3)) ? 10 : -1, tmp_17_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.formattedPrice(item_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(16, 9, "exploreNow"), " ");
} }
function HomePackagesList_Conditional_11_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵelement(1, "i", 34);
    i0.ɵɵelementStart(2, "p", 35);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "noPackagesFound"));
} }
function HomePackagesList_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, HomePackagesList_Conditional_11_For_2_Template, 18, 13, "a", 17, _forTrack0, false, HomePackagesList_Conditional_11_ForEmpty_3_Template, 5, 3, "div", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.packages);
} }
function HomePackagesList_Conditional_12_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r5);
} }
function HomePackagesList_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "span", 36);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 37)(5, "label", 38)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 39);
    i0.ɵɵlistener("change", function HomePackagesList_Conditional_12_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, HomePackagesList_Conditional_12_For_11_Template, 2, 2, "option", 40, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 41);
    i0.ɵɵlistener("pageChange", function HomePackagesList_Conditional_12_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageChange($event)); });
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
export class HomePackagesList {
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    currencyService = inject(CurrencyService);
    destroyRef = inject(DestroyRef);
    translate = inject(TranslateService);
    pageSizeOptions = [8, 12, 24];
    heroImage = 'assets/images/bg/cta.jpg';
    packages = [];
    isLoading = false;
    errorMessage = '';
    paginationInfo = {
        page: 1,
        pageSize: 12,
        totalCount: 0,
        totalPages: 1,
    };
    ngOnInit() {
        this.loadPackages();
    }
    loadPackages() {
        this.isLoading = true;
        this.errorMessage = '';
        this.apiService
            .getUnauthntecated(`Packages?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`)
            .pipe(catchError(() => {
            this.errorMessage = 'packagesLoadError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
            if (response === null) {
                this.packages = [];
                return;
            }
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.packages ?? pageData;
            this.packages = Array.isArray(rows) ? rows : [];
            const totalCount = Number(pageData?.totalCount ?? this.packages.length);
            const pageSize = Number(pageData?.pageSize ?? this.paginationInfo.pageSize);
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize,
                totalCount,
                totalPages: Math.max(1, Number(pageData?.totalPages ?? Math.ceil(totalCount / Math.max(1, pageSize)))),
            };
        });
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages) {
            return;
        }
        this.paginationInfo.page = page;
        this.loadPackages();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadPackages();
    }
    packageTitle(item) {
        const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
        return arabic
            ? (item?.nameAr ?? item?.titleAr ?? item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? '')
            : (item?.nameEng ?? item?.titleEng ?? item?.name ?? item?.title ?? item?.nameAr ?? item?.titleAr ?? '');
    }
    packageDescription(item) {
        const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
        return arabic
            ? (item?.descriptionAr ?? item?.subDescriptionAr ?? item?.description ?? item?.subDescription ?? '')
            : (item?.descriptionEng ?? item?.subDescriptionEng ?? item?.description ?? item?.subDescription ?? '');
    }
    destinationName(item) {
        return item?.destinationName ?? item?.destination?.nameEng ?? item?.destination?.name ?? '';
    }
    durationDays(item) {
        const value = Number(item?.durationDays ?? item?.days);
        return Number.isFinite(value) && value > 0 ? value : null;
    }
    formattedPrice(item) {
        return formatHomePrice(this.currencyService, item?.pricePerPerson ?? item?.price, item);
    }
    imageUrl(item) {
        const image = Array.isArray(item?.images) ? item.images[0] : null;
        const url = image?.imageUrl ??
            image?.url ??
            image?.path ??
            item?.coverImageUrl ??
            item?.imageUrl ??
            '';
        if (!url)
            return 'assets/images/bg/2.jpg';
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    static ɵfac = function HomePackagesList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomePackagesList)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomePackagesList, selectors: [["app-home-packages-list"]], decls: 14, vars: 8, consts: [[1, "relative", "table", "w-full", "bg-cover", "bg-center", "bg-no-repeat", "py-36"], [1, "absolute", "inset-0", "bg-gradient-to-b", "from-slate-900/55", "via-slate-900/75", "to-slate-900"], [1, "container", "relative", "pt-10", "text-center"], [1, "text-4xl", "font-semibold", "tracking-wide", "text-white"], [1, "relative", "py-16", "md:py-24"], [1, "container", "relative"], [1, "mb-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], ["aria-busy", "true", 1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4"], [1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-4"], [1, "mt-8", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-5", "dark:border-slate-800"], ["type", "button", 1, "rounded-full", "border", "border-red-300", "px-4", "py-1.5", "font-semibold", "hover:bg-red-100", 3, "click"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "aspect-[4/3]", "animate-pulse", "bg-slate-200"], [1, "space-y-3", "p-4"], [1, "h-4", "w-1/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-full", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "group", "flex", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "duration-300", "hover:-translate-y-1", "hover:border-primary/40", "hover:shadow-lg", "dark:border-slate-800", 3, "routerLink"], [1, "col-span-full", "rounded-2xl", "border", "border-dashed", "border-slate-300", "p-12", "text-center", "text-slate-500", "dark:border-slate-700"], [1, "flex", "w-full", "flex-col"], [1, "relative", "overflow-hidden"], ["loading", "lazy", 1, "aspect-[4/3]", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "absolute", "start-3", "top-3", "rounded-full", "bg-white/90", "px-3", "py-1", "text-xs", "font-semibold", "text-slate-700", "shadow-sm", "backdrop-blur", "/90"], [1, "flex", "flex-1", "flex-col", "p-4"], [1, "line-clamp-2", "text-lg", "font-semibold", "transition", "group-hover:text-primary"], [1, "mt-2", "line-clamp-2", "text-sm", "leading-6", "text-slate-500"], [1, "mt-auto", "pt-4"], [1, "mb-3", "flex", "items-center", "gap-2", "text-sm", "text-slate-500"], [1, "flex", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-3", "dark:border-slate-800"], [1, "text-lg", "text-primary"], [1, "text-sm", "font-semibold", "text-slate-500", "transition", "group-hover:text-primary"], [1, "mdi", "mdi-arrow-right", "rtl:rotate-180"], [1, "mdi", "mdi-map-marker-outline", "me-1", "text-primary"], [1, "mdi", "mdi-calendar-range", "text-primary"], [1, "mdi", "mdi-package-variant-closed-remove", "text-5xl", "text-slate-300"], [1, "mt-3"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-2", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "border-slate-200", "bg-white", "px-3", "py-2", "text-sm", "text-slate-700", "dark:border-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function HomePackagesList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0);
            i0.ɵɵelement(2, "div", 1);
            i0.ɵɵelementStart(3, "div", 2)(4, "h1", 3);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "main", 4)(8, "div", 5);
            i0.ɵɵconditionalCreate(9, HomePackagesList_Conditional_9_Template, 7, 6, "div", 6);
            i0.ɵɵconditionalCreate(10, HomePackagesList_Conditional_10_Template, 3, 1, "div", 7)(11, HomePackagesList_Conditional_11_Template, 4, 1, "div", 8);
            i0.ɵɵconditionalCreate(12, HomePackagesList_Conditional_12_Template, 13, 11, "div", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(13, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.heroImage + ")");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, "packages"));
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.errorMessage ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 10 : 11);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(!ctx.isLoading && !ctx.errorMessage ? 12 : -1);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, PaginationOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomePackagesList, [{
        type: Component,
        args: [{ selector: 'app-home-packages-list', standalone: true, imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\n\n<section\n  class=\"relative table w-full bg-cover bg-center bg-no-repeat py-36\"\n  [style.background-image]=\"'url(' + heroImage + ')'\"\n>\n  <div class=\"absolute inset-0 bg-gradient-to-b from-slate-900/55 via-slate-900/75 to-slate-900\"></div>\n  <div class=\"container relative pt-10 text-center\">\n    <h1 class=\"text-4xl font-semibold tracking-wide text-white\">{{ 'packages' | translate }}</h1>\n  </div>\n</section>\n\n<main class=\"relative py-16 md:py-24\">\n  <div class=\"container relative\">\n    @if (errorMessage) {\n      <div class=\"mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">\n        <span>{{ errorMessage | translate }}</span>\n        <button type=\"button\" class=\"rounded-full border border-red-300 px-4 py-1.5 font-semibold hover:bg-red-100\" (click)=\"loadPackages()\">\n          {{ 'showMore' | translate }}\n        </button>\n      </div>\n    }\n\n    @if (isLoading) {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\" aria-busy=\"true\">\n        @for (card of [1,2,3,4,5,6,7,8]; track card) {\n          <div class=\"overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm\">\n            <div class=\"aspect-[4/3] animate-pulse bg-slate-200\"></div>\n            <div class=\"space-y-3 p-4\">\n              <div class=\"h-4 w-1/3 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-4 w-full animate-pulse rounded-full bg-slate-200\"></div>\n            </div>\n          </div>\n        }\n      </div>\n    } @else {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4\">\n        @for (item of packages; track item.id ?? item.packageId ?? $index) {\n          <a\n            [routerLink]=\"['/packages', item.id ?? item.packageId]\"\n            class=\"group flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:border-slate-800 \"\n          >\n            <article class=\"flex w-full flex-col\">\n              <div class=\"relative overflow-hidden\">\n                <img [src]=\"imageUrl(item)\" [alt]=\"packageTitle(item)\" loading=\"lazy\" class=\"aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105\" />\n                @if (destinationName(item)) {\n                  <span class=\"absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur /90 \">\n                    <i class=\"mdi mdi-map-marker-outline me-1 text-primary\"></i>{{ destinationName(item) }}\n                  </span>\n                }\n              </div>\n\n              <div class=\"flex flex-1 flex-col p-4\">\n                <h2 class=\"line-clamp-2 text-lg font-semibold transition group-hover:text-primary\">{{ packageTitle(item) }}</h2>\n                @if (packageDescription(item); as description) {\n                  <p class=\"mt-2 line-clamp-2 text-sm leading-6 text-slate-500\">{{ description }}</p>\n                }\n\n                <div class=\"mt-auto pt-4\">\n                  @if (durationDays(item); as duration) {\n                    <p class=\"mb-3 flex items-center gap-2 text-sm text-slate-500\">\n                      <i class=\"mdi mdi-calendar-range text-primary\"></i>\n                      {{ duration }} {{ 'days' | translate }}\n                    </p>\n                  }\n                  <div class=\"flex items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800\">\n                    <strong class=\"text-lg text-primary\">{{ formattedPrice(item) }}</strong>\n                    <span class=\"text-sm font-semibold text-slate-500 transition group-hover:text-primary\">\n                      {{ 'exploreNow' | translate }} <i class=\"mdi mdi-arrow-right rtl:rotate-180\"></i>\n                    </span>\n                  </div>\n                </div>\n              </div>\n            </article>\n          </a>\n        } @empty {\n          <div class=\"col-span-full rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-700\">\n            <i class=\"mdi mdi-package-variant-closed-remove text-5xl text-slate-300\"></i>\n            <p class=\"mt-3\">{{ 'noPackagesFound' | translate }}</p>\n          </div>\n        }\n      </div>\n    }\n\n    @if (!isLoading && !errorMessage) {\n      <div class=\"mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800\">\n        <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\n        <div class=\"flex flex-wrap items-center gap-2\">\n          <label class=\"flex items-center gap-2 text-sm text-slate-500\">\n            <span>{{ 'pageSize' | translate }}</span>\n            <select class=\"rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700  \" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">\n              @for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }\n            </select>\n          </label>\n          <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\n        </div>\n      </div>\n    }\n  </div>\n</main>\n\n<app-footer-one />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomePackagesList, { className: "HomePackagesList", filePath: "app/features/home/packages-list/packages-list.ts", lineNumber: 35 }); })();
