import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5, 6];
const _c1 = a0 => ["/blogs", a0];
const _forTrack0 = ($index, $item) => $item.id;
function BlogPage_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function BlogPage_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 9);
} }
function BlogPage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵrepeaterCreate(1, BlogPage_Conditional_10_For_2_Template, 1, 0, "div", 9, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function BlogPage_Conditional_11_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 10);
    i0.ɵɵelement(1, "img", 12);
    i0.ɵɵelementStart(2, "div", 13)(3, "p", 14);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h2", 15);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 16);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "a", 17);
    i0.ɵɵtext(11, "Read more ");
    i0.ɵɵelement(12, "i", 18);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const blog_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.image(blog_r2), i0.ɵɵsanitizeUrl)("alt", ctx_r0.title(blog_r2));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 6, blog_r2.publishedAt, "longDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.title(blog_r2));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.summary(blog_r2));
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(9, _c1, blog_r2.id));
} }
function BlogPage_Conditional_11_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1, "No published blogs yet.");
    i0.ɵɵelementEnd();
} }
function BlogPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, BlogPage_Conditional_11_For_2_Template, 13, 11, "article", 10, _forTrack0, false, BlogPage_Conditional_11_ForEmpty_3_Template, 2, 0, "p", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.blogs);
} }
export class BlogPage {
    api = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    translate = inject(TranslateService);
    blogs = [];
    isLoading = false;
    errorMessage = '';
    bg = 'assets/images/bg/cta.jpg';
    ngOnInit() {
        this.isLoading = true;
        this.api.getUnauthntecated('Blogs?page=1&pageSize=30').pipe(catchError(() => { this.errorMessage = 'Unable to load blogs right now.'; return of(null); }), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); })).subscribe(response => { const page = response?.data ?? response; this.blogs = Array.isArray(page?.data) ? page.data : []; });
    }
    get isArabic() { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
    title(blog) { return this.isArabic ? (blog.titleAr || blog.titleEng) : (blog.titleEng || blog.titleAr); }
    summary(blog) { return this.isArabic ? (blog.summaryAr || blog.summaryEng) : (blog.summaryEng || blog.summaryAr); }
    image(blog) { const url = blog?.images?.[0]?.imageUrl ?? blog?.images?.[0]?.url; return !url ? 'assets/images/blog/1.jpg' : (/^(https?:|data:|blob:)/i.test(url) ? url : `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`); }
    static ɵfac = function BlogPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlogPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlogPage, selectors: [["app-blog-page"]], decls: 13, vars: 4, consts: [[1, "relative", "table", "w-full", "items-center", "bg-cover", "bg-top", "bg-no-repeat", "py-36"], [1, "absolute", "inset-0", "bg-slate-900/75"], [1, "container", "relative", "text-center"], [1, "text-4xl", "font-semibold", "text-white"], [1, "mt-3", "text-slate-200"], [1, "container", "py-16", "md:py-24"], [1, "rounded-xl", "bg-rose-50", "p-4", "text-rose-700"], [1, "grid", "gap-6", "md:grid-cols-2", "lg:grid-cols-3"], [1, "grid", "gap-7", "md:grid-cols-2", "lg:grid-cols-3"], [1, "h-80", "animate-pulse", "rounded-2xl", "bg-slate-100"], [1, "group", "overflow-hidden", "rounded-2xl", "border", "border-slate-100", "bg-white", "shadow-sm", "transition", "hover:-translate-y-1", "hover:shadow-lg"], [1, "col-span-full", "py-12", "text-center", "text-slate-500"], [1, "h-52", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "p-5"], [1, "text-xs", "font-medium", "uppercase", "tracking-wide", "text-primary"], [1, "mt-2", "text-xl", "font-semibold", "leading-7"], [1, "mt-3", "line-clamp-3", "text-sm", "leading-6", "text-slate-500"], [1, "mt-4", "inline-flex", "items-center", "font-semibold", "text-primary", 3, "routerLink"], [1, "mdi", "mdi-arrow-right", "ms-1"]], template: function BlogPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0);
            i0.ɵɵelement(2, "div", 1);
            i0.ɵɵelementStart(3, "div", 2)(4, "h1", 3);
            i0.ɵɵtext(5, "Blogs & Travel Stories");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtext(7, "Guides, inspiration, and news from Sea World.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "main", 5);
            i0.ɵɵconditionalCreate(9, BlogPage_Conditional_9_Template, 2, 1, "p", 6);
            i0.ɵɵconditionalCreate(10, BlogPage_Conditional_10_Template, 3, 1, "div", 7)(11, BlogPage_Conditional_11_Template, 4, 1, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.errorMessage ? 9 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 10 : 11);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogPage, [{
        type: Component,
        args: [{ selector: 'app-blog-page', standalone: true, imports: [RouterLink, DatePipe, HomeNavbar, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\n<section class=\"relative table w-full items-center bg-cover bg-top bg-no-repeat py-36\" [style.background-image]=\"'url(' + bg + ')'\">\n  <div class=\"absolute inset-0 bg-slate-900/75\"></div><div class=\"container relative text-center\"><h1 class=\"text-4xl font-semibold text-white\">Blogs &amp; Travel Stories</h1><p class=\"mt-3 text-slate-200\">Guides, inspiration, and news from Sea World.</p></div>\n</section>\n<main class=\"container py-16 md:py-24\">\n  @if (errorMessage) { <p class=\"rounded-xl bg-rose-50 p-4 text-rose-700\">{{ errorMessage }}</p> }\n  @if (isLoading) { <div class=\"grid gap-6 md:grid-cols-2 lg:grid-cols-3\">@for (item of [1,2,3,4,5,6]; track item) { <div class=\"h-80 animate-pulse rounded-2xl bg-slate-100\"></div> }</div> }\n  @else { <div class=\"grid gap-7 md:grid-cols-2 lg:grid-cols-3\">@for (blog of blogs; track blog.id) { <article class=\"group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg\"><img [src]=\"image(blog)\" [alt]=\"title(blog)\" class=\"h-52 w-full object-cover transition duration-500 group-hover:scale-105\" /><div class=\"p-5\"><p class=\"text-xs font-medium uppercase tracking-wide text-primary\">{{ blog.publishedAt | date:'longDate' }}</p><h2 class=\"mt-2 text-xl font-semibold leading-7\">{{ title(blog) }}</h2><p class=\"mt-3 line-clamp-3 text-sm leading-6 text-slate-500\">{{ summary(blog) }}</p><a [routerLink]=\"['/blogs', blog.id]\" class=\"mt-4 inline-flex items-center font-semibold text-primary\">Read more <i class=\"mdi mdi-arrow-right ms-1\"></i></a></div></article> } @empty { <p class=\"col-span-full py-12 text-center text-slate-500\">No published blogs yet.</p> }</div> }\n</main>\n<app-footer-one />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlogPage, { className: "BlogPage", filePath: "app/features/innerpages/blog/blog-page/blog-page.ts", lineNumber: 12 }); })();
