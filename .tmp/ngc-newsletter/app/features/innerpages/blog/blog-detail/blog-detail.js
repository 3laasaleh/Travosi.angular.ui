import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function BlogDetail_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 3);
} }
function BlogDetail_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function BlogDetail_Conditional_7_Conditional_6_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 11);
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("src", ctx_r0.image(item_r2), i0.ɵɵsanitizeUrl)("alt", ctx_r0.title);
} }
function BlogDetail_Conditional_7_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵrepeaterCreate(1, BlogDetail_Conditional_7_Conditional_6_For_2_Template, 1, 2, "img", 11, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("md:grid-cols-2", ctx_r0.blog.images.length > 1);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.blog.images);
} }
function BlogDetail_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 5)(1, "p", 6);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h1", 7);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, BlogDetail_Conditional_7_Conditional_6_Template, 3, 2, "div", 8);
    i0.ɵɵelementStart(7, "div", 9);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 6, ctx_r0.blog.publishedAt, "longDate"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("dir", ctx_r0.isArabic ? "rtl" : "ltr");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.blog.images?.length ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("dir", ctx_r0.isArabic ? "rtl" : "ltr");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.content);
} }
export class BlogDetail {
    api = inject(ApiService);
    route = inject(ActivatedRoute);
    cdr = inject(ChangeDetectorRef);
    translate = inject(TranslateService);
    blog = null;
    isLoading = true;
    errorMessage = '';
    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (!Number.isInteger(id) || id <= 0) {
            this.errorMessage = 'Blog not found.';
            this.isLoading = false;
            return;
        }
        this.api.getUnauthntecated(`Blogs/${id}`).pipe(catchError(() => { this.errorMessage = 'Blog not found.'; return of(null); }), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); })).subscribe(response => { if (response?.isSuccess === false || !response) {
            this.errorMessage = response?.message || 'Blog not found.';
            return;
        } this.blog = response.data ?? response; });
    }
    get isArabic() { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
    get title() { return this.isArabic ? (this.blog?.titleAr || this.blog?.titleEng || '') : (this.blog?.titleEng || this.blog?.titleAr || ''); }
    get content() { return this.isArabic ? (this.blog?.contentAr || this.blog?.contentEng || '') : (this.blog?.contentEng || this.blog?.contentAr || ''); }
    image(image) { const url = image?.imageUrl ?? image?.url ?? image; return /^(https?:|data:|blob:)/i.test(url ?? '') ? url : `${environment.imageUrl}${String(url ?? '').replace(/^\/+/, '')}`; }
    static ɵfac = function BlogDetail_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlogDetail)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlogDetail, selectors: [["app-blog-detail"]], decls: 9, vars: 1, consts: [[1, "container", "py-16", "md:py-24"], ["routerLink", "/blogs", 1, "inline-flex", "items-center", "text-sm", "font-semibold", "text-primary"], [1, "mdi", "mdi-arrow-left", "me-1"], [1, "mt-8", "h-96", "animate-pulse", "rounded-2xl", "bg-slate-100"], [1, "mt-8", "rounded-xl", "bg-rose-50", "p-4", "text-rose-700"], [1, "mx-auto", "mt-8", "max-w-4xl"], [1, "text-sm", "font-medium", "text-primary"], [1, "mt-3", "text-3xl", "font-semibold", "leading-tight", "md:text-5xl", 3, "dir"], [1, "mt-8", "grid", "gap-4", 3, "md:grid-cols-2"], [1, "mt-8", "whitespace-pre-line", "text-lg", "leading-8", "text-slate-700", 3, "dir"], [1, "mt-8", "grid", "gap-4"], [1, "w-full", "rounded-2xl", "object-cover", 3, "src", "alt"]], template: function BlogDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "main", 0)(2, "a", 1);
            i0.ɵɵelement(3, "i", 2);
            i0.ɵɵtext(4, "Back to blogs");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(5, BlogDetail_Conditional_5_Template, 1, 0, "div", 3)(6, BlogDetail_Conditional_6_Template, 2, 1, "p", 4)(7, BlogDetail_Conditional_7_Template, 9, 9, "article", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(8, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.isLoading ? 5 : ctx.errorMessage ? 6 : ctx.blog ? 7 : -1);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogDetail, [{
        type: Component,
        args: [{ selector: 'app-blog-detail', standalone: true, imports: [RouterLink, DatePipe, HomeNavbar, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\n<main class=\"container py-16 md:py-24\">\n  <a routerLink=\"/blogs\" class=\"inline-flex items-center text-sm font-semibold text-primary\"><i class=\"mdi mdi-arrow-left me-1\"></i>Back to blogs</a>\n  @if (isLoading) { <div class=\"mt-8 h-96 animate-pulse rounded-2xl bg-slate-100\"></div> }\n  @else if (errorMessage) { <p class=\"mt-8 rounded-xl bg-rose-50 p-4 text-rose-700\">{{ errorMessage }}</p> }\n  @else if (blog) { <article class=\"mx-auto mt-8 max-w-4xl\"><p class=\"text-sm font-medium text-primary\">{{ blog.publishedAt | date:'longDate' }}</p><h1 class=\"mt-3 text-3xl font-semibold leading-tight md:text-5xl\" [dir]=\"isArabic ? 'rtl' : 'ltr'\">{{ title }}</h1>\n    @if (blog.images?.length) { <div class=\"mt-8 grid gap-4\" [class.md:grid-cols-2]=\"blog.images.length > 1\">@for (item of blog.images; track item.id) { <img [src]=\"image(item)\" [alt]=\"title\" class=\"w-full rounded-2xl object-cover\" /> }</div> }\n    <div class=\"mt-8 whitespace-pre-line text-lg leading-8 text-slate-700\" [dir]=\"isArabic ? 'rtl' : 'ltr'\">{{ content }}</div>\n  </article> }\n</main>\n<app-footer-one />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlogDetail, { className: "BlogDetail", filePath: "app/features/innerpages/blog/blog-detail/blog-detail.ts", lineNumber: 12 }); })();
