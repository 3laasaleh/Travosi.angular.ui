import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterGuidesComp } from '../../../../shared/components/helpcenter/helpcenter-guides/helpcenter-guides';
import * as i0 from "@angular/core";
export class HelpcenterGuides {
    bg = 'assets/images/bg/cta.jpg';
    static ɵfac = function HelpcenterGuides_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpcenterGuides)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpcenterGuides, selectors: [["app-helpcenter-guides"]], decls: 24, vars: 2, consts: [[1, "relative", "table", "w-full", "py-36", "bg-center", "bg-no-repeat", "bg-cover"], [1, "absolute", "inset-0", "bg-slate-900", "opacity-80"], [1, "container", "relative"], [1, "grid", "grid-cols-1", "pb-8", "text-center", "mt-10"], [1, "text-4xl", "leading-normal", "tracking-wider", "font-semibold", "text-white"], [1, "absolute", "text-center", "z-10", "bottom-5", "start-0", "end-0", "mx-3"], [1, "tracking-[0.5px]", "mb-0", "inline-block"], [1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white/50", "hover:text-white"], ["routerLink", "/"], [1, "inline-block", "text-base", "text-white/50", "mx-0.5", "ltr:rotate-0", "rtl:rotate-180"], [1, "mdi", "mdi-chevron-right"], ["routerLink", "/helpcenter"], ["aria-current", "page", 1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white"]], template: function HelpcenterGuides_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "app-home-navbar");
            i0.ɵɵelementStart(2, "section", 0);
            i0.ɵɵelement(3, "div", 1);
            i0.ɵɵelementStart(4, "div", 2)(5, "div", 3)(6, "h3", 4);
            i0.ɵɵtext(7, "Guides & Support");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(8, "div", 5)(9, "ul", 6)(10, "li", 7)(11, "a", 8);
            i0.ɵɵtext(12, "Sea World ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "li", 9);
            i0.ɵɵelement(14, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "li", 7)(16, "a", 11);
            i0.ɵɵtext(17, "Helpcenter");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "li", 9);
            i0.ɵɵelement(19, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "li", 12);
            i0.ɵɵtext(21, "Guides");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(22, "app-helpcenter-guides-comp");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
        } }, dependencies: [RouterLink, HomeNavbar, HelpcenterGuidesComp, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpcenterGuides, [{
        type: Component,
        args: [{ selector: 'app-helpcenter-guides', imports: [RouterLink, HomeNavbar, HelpcenterGuidesComp, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n<app-home-navbar />\r\n    <section class=\"relative table w-full py-36 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\">\r\n        <div class=\"absolute inset-0 bg-slate-900 opacity-80\"></div>\r\n        <div class=\"container relative\">\r\n            <div class=\"grid grid-cols-1 pb-8 text-center mt-10\">\r\n                <h3 class=\"text-4xl leading-normal tracking-wider font-semibold text-white\">Guides & Support</h3>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"absolute text-center z-10 bottom-5 start-0 end-0 mx-3\">\r\n            <ul class=\"tracking-[0.5px] mb-0 inline-block\">\r\n                <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white\">\r\n                    <a routerLink=\"/\">Sea World </a>\r\n                </li>\r\n                <li class=\"inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180\"><i class=\"mdi mdi-chevron-right\"></i></li>\r\n                <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white\"><a routerLink=\"/helpcenter\">Helpcenter</a></li>\r\n                <li class=\"inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180\"><i class=\"mdi mdi-chevron-right\"></i></li>\r\n                <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white\" aria-current=\"page\">Guides</li>\r\n            </ul>\r\n        </div>\r\n    </section>\r\n    <app-helpcenter-guides-comp />\r\n</div>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpcenterGuides, { className: "HelpcenterGuides", filePath: "app/features/innerpages/helpcenter/helpcenter-guides/helpcenter-guides.ts", lineNumber: 13 }); })();
