import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { blogData } from '../../../../data/data';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
function BlogStandard_For_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "div", 36);
    i0.ɵɵelement(2, "img", 37);
    i0.ɵɵelementStart(3, "div", 38)(4, "span", 39);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(6, "div", 40)(7, "div", 41)(8, "span", 42);
    i0.ɵɵelement(9, "i", 43);
    i0.ɵɵtext(10, "5 min read");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 44)(12, "a", 45);
    i0.ɵɵtext(13, "Sea World");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "a", 46);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "p", 47);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 48)(19, "a", 49);
    i0.ɵɵtext(20, "Read More ");
    i0.ɵɵelement(21, "i", 50);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", item_r1.image, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.status);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(item_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.desc);
} }
export class BlogStandard {
    bg = 'assets/images/bg/cta.jpg';
    client = 'assets/images/client/05.jpg';
    blogData = blogData;
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function BlogStandard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlogStandard)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlogStandard, selectors: [["app-blog-standard"]], decls: 59, vars: 3, consts: [[1, "relative", "table", "w-full", "items-center", "py-36", "bg-top", "bg-no-repeat", "bg-cover"], [1, "absolute", "inset-0", "bg-gradient-to-b", "from-slate-900/60", "via-slate-900/80", "to-slate-900"], [1, "container", "relative"], [1, "grid", "grid-cols-1", "pb-8", "text-center", "mt-10"], [1, "text-4xl", "leading-normal", "tracking-wider", "font-semibold", "text-white"], [1, "absolute", "text-center", "z-10", "bottom-5", "start-0", "end-0", "mx-3"], [1, "tracking-[0.5px]", "mb-0", "inline-block"], [1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white/50", "hover:text-white"], ["routerLink", "/"], [1, "inline-block", "text-base", "text-white/50", "mx-0.5", "ltr:rotate-0", "rtl:rotate-180"], [1, "mdi", "mdi-chevron-right"], ["aria-current", "page", 1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white"], [1, "relative", "md:py-24", "py-16"], [1, "container"], [1, "grid", "md:grid-cols-12", "grid-cols-1", "gap-6"], [1, "lg:col-span-8", "md:col-span-6"], [1, "grid", "grid-cols-1", "gap-6"], [1, "group", "relative", "overflow-hidden"], [1, "lg:col-span-4", "md:col-span-6"], [1, "sticky", "top-20"], [1, "text-lg", "font-medium", "bg-gray-50", "shadow", "dark:shadow-gray-800", "rounded-md", "p-2", "text-center"], [1, "text-center", "mt-8"], ["alt", "", 1, "h-20", "w-20", "mx-auto", "rounded-full", "shadow", "mb-4", 3, "src"], ["href", "javascript:void(0)", 1, "text-lg", "font-medium", "hover:text-primary", "transition-all", "duration-500", "ease-in-out", "h5"], [1, "text-slate-400"], [1, "text-lg", "font-medium", "bg-gray-50", "shadow", "dark:shadow-gray-800", "rounded-md", "p-2", "text-center", "mt-8"], [1, "list-none", "text-center", "mt-8", "space-x-0.5"], [1, "inline"], ["href", "javascript:void(0)", 1, "size-8", "inline-flex", "items-center", "justify-center", "tracking-wide", "align-middle", "text-base", "border", "border-gray-100", "dark:border-gray-800", "rounded-md", "text-slate-400", "hover:border-primary", "hover:text-white", "hover:bg-primary"], ["data-feather", "facebook", 1, "size-4"], ["data-feather", "instagram", 1, "size-4"], ["data-feather", "twitter", 1, "size-4"], ["data-feather", "linkedin", 1, "size-4"], ["data-feather", "github", 1, "size-4"], ["data-feather", "youtube", 1, "size-4"], ["data-feather", "gitlab", 1, "size-4"], [1, "relative", "overflow-hidden", "rounded-md", "shadow", "dark:shadow-gray-800"], ["alt", "", 1, "group-hover:scale-110", "group-hover:rotate-3", "duration-500", 3, "src"], [1, "absolute", "top-0", "start-0", "p-4", "opacity-0", "group-hover:opacity-100", "duration-500"], [1, "bg-primary", "text-white", "text-[12px]", "px-2.5", "py-1", "font-medium", "rounded-md", "h-5"], [1, "mt-6"], [1, "flex", "mb-4"], [1, "flex", "items-center", "text-slate-400", "text-sm"], ["data-feather", "clock", 1, "size-4", "text-slate-900", "me-1.5"], [1, "text-slate-400", "text-sm", "ms-3"], ["href", "javascript:void(0)", 1, "text-slate-900", "hover:text-primary", "dark:hover:text-primary", "font-medium"], ["routerLink", "/blog-detail", 1, "text-lg", "font-medium", "hover:text-primary", "duration-500", "ease-in-out"], [1, "text-slate-400", "mt-2"], [1, "mt-3"], ["routerLink", "/blog-detail", 1, "hover:text-primary", "inline-flex", "items-center"], ["data-feather", "chevron-right", 1, "size-4", "ms-1"]], template: function BlogStandard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0);
            i0.ɵɵelement(2, "div", 1);
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3)(5, "h3", 4);
            i0.ɵɵtext(6, "Blogs / News");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "div", 5)(8, "ul", 6)(9, "li", 7)(10, "a", 8);
            i0.ɵɵtext(11, "Sea World");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "li", 9);
            i0.ɵɵelement(13, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "li", 11);
            i0.ɵɵtext(15, "Blogs");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(16, "section", 12)(17, "div", 13)(18, "div", 14)(19, "div", 15)(20, "div", 16);
            i0.ɵɵrepeaterCreate(21, BlogStandard_For_22_Template, 22, 4, "div", 17, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "app-pagination-one");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 18)(25, "div", 19)(26, "h5", 20);
            i0.ɵɵtext(27, "Author");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 21);
            i0.ɵɵelement(29, "img", 22);
            i0.ɵɵelementStart(30, "a", 23);
            i0.ɵɵtext(31, "Cristina Romsey");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "p", 24);
            i0.ɵɵtext(33, "Content Writer");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "h5", 25);
            i0.ɵɵtext(35, "Social sites");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "ul", 26)(37, "li", 27)(38, "a", 28);
            i0.ɵɵelement(39, "i", 29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "li", 27)(41, "a", 28);
            i0.ɵɵelement(42, "i", 30);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "li", 27)(44, "a", 28);
            i0.ɵɵelement(45, "i", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "li", 27)(47, "a", 28);
            i0.ɵɵelement(48, "i", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "li", 27)(50, "a", 28);
            i0.ɵɵelement(51, "i", 33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "li", 27)(53, "a", 28);
            i0.ɵɵelement(54, "i", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "li", 27)(56, "a", 28);
            i0.ɵɵelement(57, "i", 35);
            i0.ɵɵelementEnd()()()()()()()();
            i0.ɵɵelement(58, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(20);
            i0.ɵɵrepeater(ctx.blogData);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("src", ctx.client, i0.ɵɵsanitizeUrl);
        } }, dependencies: [RouterLink, HomeNavbar, PaginationOne, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogStandard, [{
        type: Component,
        args: [{ selector: 'app-blog-standard', imports: [RouterLink, HomeNavbar, PaginationOne, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n<section class=\"relative table w-full items-center py-36 bg-top bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\">\r\n    <div class=\"absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900\"></div>\r\n    <div class=\"container relative\">\r\n        <div class=\"grid grid-cols-1 pb-8 text-center mt-10\">\r\n            <h3 class=\"text-4xl leading-normal tracking-wider font-semibold text-white\">Blogs / News</h3>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"absolute text-center z-10 bottom-5 start-0 end-0 mx-3\">\r\n        <ul class=\"tracking-[0.5px] mb-0 inline-block\">\r\n            <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white\">\r\n                <a routerLink=\"/\">Sea World</a>\r\n            </li>\r\n            <li class=\"inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180\"><i class=\"mdi mdi-chevron-right\"></i></li>\r\n            <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white\" aria-current=\"page\">Blogs</li>\r\n        </ul>\r\n    </div>\r\n</section>\r\n\r\n<section class=\"relative md:py-24 py-16\">\r\n    <div class=\"container\">\r\n        <div class=\"grid md:grid-cols-12 grid-cols-1 gap-6\">\r\n            <div class=\"lg:col-span-8 md:col-span-6\">\r\n                <div class=\"grid grid-cols-1 gap-6\">\r\n                    @for (item of blogData; track $index) {\r\n                        <div class=\"group relative overflow-hidden\">\r\n                            <div class=\"relative overflow-hidden rounded-md shadow dark:shadow-gray-800\">\r\n                                <img [src]=\"item.image\" class=\"group-hover:scale-110 group-hover:rotate-3 duration-500\" alt=\"\">\r\n                                <div class=\"absolute top-0 start-0 p-4 opacity-0 group-hover:opacity-100 duration-500\">\r\n                                    <span class=\"bg-primary text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5\">{{ item.status }}</span>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"mt-6\">\r\n                                <div class=\"flex mb-4\">\r\n                                    <span class=\"flex items-center text-slate-400 text-sm\"><i data-feather=\"clock\" class=\"size-4 text-slate-900  me-1.5\"></i>5 min read</span>\r\n                                    <span class=\"text-slate-400 text-sm ms-3\"> <a href=\"javascript:void(0)\" class=\"text-slate-900  hover:text-primary dark:hover:text-primary font-medium\">Sea World</a></span>\r\n                                </div>\r\n\r\n                                <a routerLink=\"/blog-detail\" class=\"text-lg font-medium hover:text-primary duration-500 ease-in-out\">{{ item.title }}</a>\r\n                                <p class=\"text-slate-400 mt-2\">{{ item.desc }}</p>\r\n\r\n                                <div class=\"mt-3\">\r\n                                    <a routerLink=\"/blog-detail\" class=\"hover:text-primary inline-flex items-center\">Read More <i data-feather=\"chevron-right\" class=\"size-4 ms-1\"></i></a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    }\r\n                </div>\r\n                <app-pagination-one />\r\n            </div>\r\n\r\n            <div class=\"lg:col-span-4 md:col-span-6\">\r\n                <div class=\"sticky top-20\">\r\n                    <h5 class=\"text-lg font-medium bg-gray-50  shadow dark:shadow-gray-800 rounded-md p-2 text-center\">Author</h5>\r\n                    <div class=\"text-center mt-8\">\r\n                        <img [src]=\"client\" class=\"h-20 w-20 mx-auto rounded-full shadow mb-4\" alt=\"\">\r\n                        <a href=\"javascript:void(0)\" class=\"text-lg font-medium hover:text-primary transition-all duration-500 ease-in-out h5\">Cristina Romsey</a>\r\n                        <p class=\"text-slate-400\">Content Writer</p>\r\n                    </div>\r\n\r\n                    <h5 class=\"text-lg font-medium bg-gray-50  shadow dark:shadow-gray-800 rounded-md p-2 text-center mt-8\">Social sites</h5>\r\n                    <ul class=\"list-none text-center mt-8 space-x-0.5\">\r\n                        <li class=\"inline\"><a href=\"javascript:void(0)\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary\"><i data-feather=\"facebook\" class=\"size-4\"></i></a></li>\r\n                        <li class=\"inline\"><a href=\"javascript:void(0)\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary\"><i data-feather=\"instagram\" class=\"size-4\"></i></a></li>\r\n                        <li class=\"inline\"><a href=\"javascript:void(0)\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary\"><i data-feather=\"twitter\" class=\"size-4\"></i></a></li>\r\n                        <li class=\"inline\"><a href=\"javascript:void(0)\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary\"><i data-feather=\"linkedin\" class=\"size-4\"></i></a></li>\r\n                        <li class=\"inline\"><a href=\"javascript:void(0)\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary\"><i data-feather=\"github\" class=\"size-4\"></i></a></li>\r\n                        <li class=\"inline\"><a href=\"javascript:void(0)\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary\"><i data-feather=\"youtube\" class=\"size-4\"></i></a></li>\r\n                        <li class=\"inline\"><a href=\"javascript:void(0)\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-primary hover:text-white hover:bg-primary\"><i data-feather=\"gitlab\" class=\"size-4\"></i></a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlogStandard, { className: "BlogStandard", filePath: "app/features/innerpages/blog/blog-standard/blog-standard.ts", lineNumber: 15 }); })();
