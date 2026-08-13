import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ViewChild, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swiper from 'swiper';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { LanguageService } from '../../../../core/services/language.service';
import * as i0 from "@angular/core";
const _c0 = ["blogSwiper"];
const _c1 = () => [1, 2, 3];
const _c2 = a0 => ["/blogs", a0];
function _forTrack0($index, $item) { /* @ts-ignore */
return this.blogId($item) ?? $index; }
function BlogsSection_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 14);
    i0.ɵɵelement(1, "div", 15);
    i0.ɵɵelementStart(2, "div", 16);
    i0.ɵɵelement(3, "div", 17)(4, "div", 18)(5, "div", 19)(6, "div", 20);
    i0.ɵɵelementEnd()();
} }
function BlogsSection_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵrepeaterCreate(1, BlogsSection_Conditional_10_For_2_Template, 7, 0, "article", 14, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function BlogsSection_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementStart(2, "p", 22);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 23);
    i0.ɵɵlistener("click", function BlogsSection_Conditional_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadBlogs()); });
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 2, "blogsLoadError"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 4, "tryAgain"), " ");
} }
function BlogsSection_Conditional_12_For_5_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "time", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const blog_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("datetime", ctx_r1.publishedAt(blog_r3));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 2, ctx_r1.publishedAt(blog_r3), "longDate"), " ");
} }
function BlogsSection_Conditional_12_For_5_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const blog_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.summary(blog_r3), " ");
} }
function BlogsSection_Conditional_12_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26)(1, "a", 27)(2, "article", 28)(3, "div", 29);
    i0.ɵɵelement(4, "img", 30);
    i0.ɵɵconditionalCreate(5, BlogsSection_Conditional_12_For_5_Conditional_5_Template, 3, 5, "time", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 32)(7, "h3", 33);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, BlogsSection_Conditional_12_For_5_Conditional_9_Template, 2, 1, "p", 34);
    i0.ɵɵelementStart(10, "div", 35)(11, "span", 36);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 37);
    i0.ɵɵelement(15, "i", 38);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const blog_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(9, _c2, ctx_r1.blogId(blog_r3)));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(blog_r3), i0.ɵɵsanitizeUrl)("alt", ctx_r1.title(blog_r3));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.publishedAt(blog_r3) ? 5 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.title(blog_r3), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.summary(blog_r3) ? 9 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 7, "readMore"));
} }
function BlogsSection_Conditional_12_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelement(2, "i", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 41);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelement(5, "i", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "div", 43);
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 2, "previousBlog"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(4, 4, "nextBlog"));
} }
function BlogsSection_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 24, 0)(3, "div", 25);
    i0.ɵɵrepeaterCreate(4, BlogsSection_Conditional_12_For_5_Template, 16, 11, "div", 26, _forTrack0, true);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(6, BlogsSection_Conditional_12_Conditional_6_Template, 7, 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r1.blogs);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.blogs.length > 1 ? 6 : -1);
} }
function BlogsSection_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementStart(2, "p", 44);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "noBlogsFound"));
} }
export class BlogsSection {
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    languageService = inject(LanguageService);
    swiper = null;
    swiperInitializationTimer = null;
    blogSwiperElement;
    set blogSwiper(element) {
        this.blogSwiperElement = element;
        if (element)
            this.scheduleSwiperInitialization();
    }
    blogs = [];
    isLoading = true;
    hasError = false;
    ngOnInit() {
        this.loadBlogs();
    }
    ngOnDestroy() {
        if (this.swiperInitializationTimer !== null) {
            clearTimeout(this.swiperInitializationTimer);
        }
        this.destroySwiper();
    }
    loadBlogs() {
        this.isLoading = true;
        this.hasError = false;
        this.destroySwiper();
        this.apiService
            .getUnauthntecated('Blogs/AllActive')
            .pipe(catchError(() => {
            this.hasError = true;
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
            if (response === null || this.isFailedResponse(response)) {
                this.blogs = [];
                this.hasError = true;
                return;
            }
            this.blogs = this.extractBlogs(response);
        });
    }
    blogId(blog) {
        return blog.id ?? blog.Id;
    }
    publishedAt(blog) {
        return blog.publishedAt ?? blog.PublishedAt;
    }
    title(blog) {
        const titleEng = blog.titleEng ?? blog.TitleEng ?? '';
        const titleAr = blog.titleAr ?? blog.TitleAr ?? '';
        return this.isArabic ? titleAr || titleEng : titleEng || titleAr;
    }
    summary(blog) {
        const summaryEng = blog.summaryEng ?? blog.SummaryEng ?? '';
        const summaryAr = blog.summaryAr ?? blog.SummaryAr ?? '';
        return this.isArabic ? summaryAr || summaryEng : summaryEng || summaryAr;
    }
    imageUrl(blog) {
        const images = blog.images ?? blog.Images ?? [];
        const firstImage = Array.isArray(images) ? images[0] : undefined;
        const image = firstImage;
        const rawUrl = typeof image === 'string'
            ? image
            : image?.['imageUrl'] ?? image?.['ImageUrl'] ?? image?.['url'] ?? image?.['Url'];
        if (!rawUrl)
            return 'assets/images/blog/1.jpg';
        const url = String(rawUrl);
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    get isArabic() {
        return this.languageService.currentLanguage() === 'ar';
    }
    isFailedResponse(response) {
        if (!response || typeof response !== 'object')
            return false;
        const envelope = response;
        return envelope['isSuccess'] === false || envelope['IsSuccess'] === false;
    }
    extractBlogs(response) {
        const envelope = response;
        const candidates = [
            envelope?.['data'],
            envelope?.['Data'],
            envelope?.['data']?.['data'],
            envelope?.['data']?.['Data'],
            envelope?.['data']?.['items'],
            envelope?.['Data']?.['data'],
            envelope?.['Data']?.['Data'],
            envelope?.['Data']?.['items'],
            response,
        ];
        return candidates.find((candidate) => Array.isArray(candidate)) ?? [];
    }
    scheduleSwiperInitialization() {
        if (this.swiperInitializationTimer !== null) {
            clearTimeout(this.swiperInitializationTimer);
        }
        this.swiperInitializationTimer = setTimeout(() => {
            this.swiperInitializationTimer = null;
            this.initializeSwiper();
        });
    }
    initializeSwiper() {
        const element = this.blogSwiperElement?.nativeElement;
        if (!element || this.swiper || this.blogs.length === 0)
            return;
        this.swiper = new Swiper(element, {
            modules: [A11y, Autoplay, Navigation, Pagination],
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 24,
            speed: 650,
            rewind: this.blogs.length > 1,
            watchOverflow: true,
            autoplay: this.blogs.length > 1
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }
                : false,
            navigation: {
                nextEl: '.home-blogs-next',
                prevEl: '.home-blogs-previous',
            },
            pagination: {
                el: '.home-blogs-pagination',
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 2, slidesPerGroup: 2 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
            },
        });
    }
    destroySwiper() {
        this.swiper?.destroy(true, true);
        this.swiper = null;
    }
    static ɵfac = function BlogsSection_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlogsSection)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlogsSection, selectors: [["app-blogs-section"]], viewQuery: function BlogsSection_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.blogSwiper = _t.first);
        } }, decls: 19, vars: 10, consts: [["blogSwiper", ""], [1, "relative", "overflow-hidden", "bg-slate-50", "py-16", "md:py-24"], [1, "pointer-events-none", "absolute", "-end-24", "top-10", "size-72", "rounded-full", "bg-primary/5", "blur-3xl"], [1, "container", "relative"], [1, "mb-10", "text-center"], [1, "mb-2", "text-sm", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "text-2xl", "font-semibold", "md:text-3xl"], ["aria-busy", "true", 1, "grid", "gap-6", "sm:grid-cols-2", "lg:grid-cols-3"], [1, "rounded-3xl", "border", "border-dashed", "border-slate-300", "bg-white", "px-6", "py-12", "text-center", "dark:border-slate-700"], [1, "relative", "px-1", "pb-12"], [1, "rounded-3xl", "border", "border-dashed", "border-slate-300", "px-6", "py-12", "text-center", "text-slate-500", "dark:border-slate-700"], [1, "mt-10", "text-center"], ["routerLink", "/blogs", 1, "group", "inline-flex", "items-center", "justify-center", "gap-2", "font-semibold", "text-primary", "transition", "hover:gap-3", "hover:underline", "hover:underline-offset-4"], ["aria-hidden", "true", 1, "mdi", "mdi-arrow-right", "text-xl", "rtl:rotate-180"], [1, "overflow-hidden", "rounded-3xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "aspect-[4/3]", "animate-pulse", "bg-slate-200"], [1, "space-y-3", "p-5"], [1, "h-3", "w-1/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-6", "w-3/4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-full", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-4/5", "animate-pulse", "rounded-full", "bg-slate-200"], ["aria-hidden", "true", 1, "mdi", "mdi-post-outline", "text-5xl", "text-slate-300"], [1, "mt-3", "text-slate-500"], ["type", "button", 1, "mt-5", "rounded-full", "bg-primary", "px-5", "py-2.5", "font-semibold", "text-white", "transition", "hover:opacity-90", 3, "click"], [1, "swiper", "overflow-hidden"], [1, "swiper-wrapper"], [1, "swiper-slide", "h-auto"], [1, "group", "flex", "h-full", "overflow-hidden", "rounded-3xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "duration-300", "hover:-translate-y-1", "hover:border-primary/40", "hover:shadow-xl", "focus-visible:outline-none", "focus-visible:ring-2", "focus-visible:ring-primary", "focus-visible:ring-offset-2", 3, "routerLink"], [1, "flex", "min-h-[450px]", "w-full", "flex-col"], [1, "relative", "overflow-hidden"], ["loading", "lazy", 1, "aspect-[4/3]", "w-full", "object-cover", "transition", "duration-700", "group-hover:scale-105", 3, "src", "alt"], [1, "absolute", "start-4", "top-4", "rounded-full", "bg-white/95", "px-3", "py-1.5", "text-xs", "font-semibold", "text-slate-700", "shadow-sm", "backdrop-blur"], [1, "flex", "flex-1", "flex-col", "p-5"], [1, "line-clamp-2", "text-xl", "font-semibold", "leading-7", "transition", "group-hover:text-primary"], [1, "mt-3", "line-clamp-3", "text-sm", "leading-6", "text-slate-500"], [1, "mt-auto", "flex", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4", "dark:border-slate-800"], [1, "text-sm", "font-semibold", "text-primary"], [1, "grid", "size-10", "place-items-center", "rounded-full", "bg-primary/10", "text-xl", "text-primary", "transition", "group-hover:bg-primary", "group-hover:text-white"], ["aria-hidden", "true", 1, "mdi", "mdi-arrow-right", "rtl:rotate-180"], ["type", "button", 1, "home-blogs-previous", "absolute", "start-3", "top-1/2", "z-10", "grid", "size-11", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-white/95", "text-xl", "text-slate-700", "shadow-md", "transition", "hover:bg-primary", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-40"], ["aria-hidden", "true", 1, "mdi", "mdi-chevron-left", "rtl:rotate-180"], ["type", "button", 1, "home-blogs-next", "absolute", "end-3", "top-1/2", "z-10", "grid", "size-11", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-white/95", "text-xl", "text-slate-700", "shadow-md", "transition", "hover:bg-primary", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-40"], ["aria-hidden", "true", 1, "mdi", "mdi-chevron-right", "rtl:rotate-180"], [1, "home-blogs-pagination", "absolute", "inset-x-0", "bottom-0", "text-center"], [1, "mt-3"]], template: function BlogsSection_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1);
            i0.ɵɵelement(1, "div", 2);
            i0.ɵɵelementStart(2, "div", 3)(3, "div", 4)(4, "p", 5);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h2", 6);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(10, BlogsSection_Conditional_10_Template, 3, 1, "div", 7)(11, BlogsSection_Conditional_11_Template, 8, 6, "div", 8)(12, BlogsSection_Conditional_12_Template, 7, 1, "div", 9)(13, BlogsSection_Conditional_13_Template, 5, 3, "div", 10);
            i0.ɵɵelementStart(14, "div", 11)(15, "a", 12);
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "translate");
            i0.ɵɵelement(18, "i", 13);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 4, "exploreNow"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 6, "blogs"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 10 : ctx.hasError ? 11 : ctx.blogs.length ? 12 : 13);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(17, 8, "viewAllBlogs"), " ");
        } }, dependencies: [RouterLink, DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogsSection, [{
        type: Component,
        args: [{ selector: 'app-blogs-section', standalone: true, imports: [DatePipe, RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"relative overflow-hidden bg-slate-50 py-16 md:py-24\">\n  <div class=\"pointer-events-none absolute -end-24 top-10 size-72 rounded-full bg-primary/5 blur-3xl\"></div>\n\n  <div class=\"container relative\">\n    <div class=\"mb-10 text-center\">\n      <p class=\"mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary\">\n        {{ 'exploreNow' | translate }}\n      </p>\n      <h2 class=\"text-2xl font-semibold md:text-3xl\">{{ 'blogs' | translate }}</h2>\n    </div>\n\n    @if (isLoading) {\n      <div class=\"grid gap-6 sm:grid-cols-2 lg:grid-cols-3\" aria-busy=\"true\">\n        @for (card of [1, 2, 3]; track card) {\n          <article class=\"overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm\">\n            <div class=\"aspect-[4/3] animate-pulse bg-slate-200\"></div>\n            <div class=\"space-y-3 p-5\">\n              <div class=\"h-3 w-1/3 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-6 w-3/4 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-4 w-full animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-4 w-4/5 animate-pulse rounded-full bg-slate-200\"></div>\n            </div>\n          </article>\n        }\n      </div>\n    } @else if (hasError) {\n      <div class=\"rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700\">\n        <i class=\"mdi mdi-post-outline text-5xl text-slate-300\" aria-hidden=\"true\"></i>\n        <p class=\"mt-3 text-slate-500\">{{ 'blogsLoadError' | translate }}</p>\n        <button\n          type=\"button\"\n          class=\"mt-5 rounded-full bg-primary px-5 py-2.5 font-semibold text-white transition hover:opacity-90\"\n          (click)=\"loadBlogs()\"\n        >\n          {{ 'tryAgain' | translate }}\n        </button>\n      </div>\n    } @else if (blogs.length) {\n      <div class=\"relative px-1 pb-12\">\n        <div #blogSwiper class=\"swiper overflow-hidden\">\n          <div class=\"swiper-wrapper\">\n            @for (blog of blogs; track blogId(blog) ?? $index) {\n              <div class=\"swiper-slide h-auto\">\n                <a\n                  [routerLink]=\"['/blogs', blogId(blog)]\"\n                  class=\"group flex h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2\"\n                >\n                  <article class=\"flex min-h-[450px] w-full flex-col\">\n                    <div class=\"relative overflow-hidden\">\n                      <img\n                        [src]=\"imageUrl(blog)\"\n                        [alt]=\"title(blog)\"\n                        loading=\"lazy\"\n                        class=\"aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105\"\n                      />\n                      @if (publishedAt(blog)) {\n                        <time\n                          class=\"absolute start-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur\"\n                          [attr.datetime]=\"publishedAt(blog)\"\n                        >\n                          {{ publishedAt(blog) | date: 'longDate' }}\n                        </time>\n                      }\n                    </div>\n\n                    <div class=\"flex flex-1 flex-col p-5\">\n                      <h3 class=\"line-clamp-2 text-xl font-semibold leading-7 transition group-hover:text-primary\">\n                        {{ title(blog) }}\n                      </h3>\n                      @if (summary(blog)) {\n                        <p class=\"mt-3 line-clamp-3 text-sm leading-6 text-slate-500\">\n                          {{ summary(blog) }}\n                        </p>\n                      }\n\n                      <div class=\"mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800\">\n                        <span class=\"text-sm font-semibold text-primary\">{{ 'readMore' | translate }}</span>\n                        <span class=\"grid size-10 place-items-center rounded-full bg-primary/10 text-xl text-primary transition group-hover:bg-primary group-hover:text-white\">\n                          <i class=\"mdi mdi-arrow-right rtl:rotate-180\" aria-hidden=\"true\"></i>\n                        </span>\n                      </div>\n                    </div>\n                  </article>\n                </a>\n              </div>\n            }\n          </div>\n        </div>\n\n        @if (blogs.length > 1) {\n          <button\n            type=\"button\"\n            class=\"home-blogs-previous absolute start-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-xl text-slate-700 shadow-md transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40\"\n            [attr.aria-label]=\"'previousBlog' | translate\"\n          >\n            <i class=\"mdi mdi-chevron-left rtl:rotate-180\" aria-hidden=\"true\"></i>\n          </button>\n          <button\n            type=\"button\"\n            class=\"home-blogs-next absolute end-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-xl text-slate-700 shadow-md transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-40\"\n            [attr.aria-label]=\"'nextBlog' | translate\"\n          >\n            <i class=\"mdi mdi-chevron-right rtl:rotate-180\" aria-hidden=\"true\"></i>\n          </button>\n          <div class=\"home-blogs-pagination absolute inset-x-0 bottom-0 text-center\"></div>\n        }\n      </div>\n    } @else {\n      <div class=\"rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500 dark:border-slate-700\">\n        <i class=\"mdi mdi-post-outline text-5xl text-slate-300\" aria-hidden=\"true\"></i>\n        <p class=\"mt-3\">{{ 'noBlogsFound' | translate }}</p>\n      </div>\n    }\n\n    <div class=\"mt-10 text-center\">\n      <a\n        routerLink=\"/blogs\"\n        class=\"group inline-flex items-center justify-center gap-2 font-semibold text-primary transition hover:gap-3 hover:underline hover:underline-offset-4\"\n      >\n        {{ 'viewAllBlogs' | translate }}\n        <i class=\"mdi mdi-arrow-right text-xl rtl:rotate-180\" aria-hidden=\"true\"></i>\n      </a>\n    </div>\n  </div>\n</section>\n" }]
    }], null, { blogSwiper: [{
            type: ViewChild,
            args: ['blogSwiper']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlogsSection, { className: "BlogsSection", filePath: "app/features/home/home-sections/blogs-section/blogs-section.ts", lineNumber: 47 }); })();
