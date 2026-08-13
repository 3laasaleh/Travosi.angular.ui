import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterSupportComp } from '../../../../shared/components/helpcenter/helpcenter-support/helpcenter-support';
import * as i0 from "@angular/core";
export class HelpcenterSupport {
    bg = 'assets/images/bg/cta.jpg';
    static ɵfac = function HelpcenterSupport_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpcenterSupport)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpcenterSupport, selectors: [["app-helpcenter-support"]], decls: 23, vars: 2, consts: [[1, "relative", "table", "w-full", "py-36", "bg-center", "bg-no-repeat", "bg-cover"], [1, "absolute", "inset-0", "bg-slate-900", "opacity-80"], [1, "container", "relative"], [1, "grid", "grid-cols-1", "pb-8", "text-center", "mt-10"], [1, "text-4xl", "leading-normal", "tracking-wider", "font-semibold", "text-white"], [1, "absolute", "text-center", "z-10", "bottom-5", "start-0", "end-0", "mx-3"], [1, "tracking-[0.5px]", "mb-0", "inline-block"], [1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white/50", "hover:text-white"], ["routerLink", "/"], [1, "inline-block", "text-base", "text-white/50", "mx-0.5", "ltr:rotate-0", "rtl:rotate-180"], [1, "mdi", "mdi-chevron-right"], ["routerLink", "/helpcenter"], ["aria-current", "page", 1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white"]], template: function HelpcenterSupport_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0);
            i0.ɵɵelement(2, "div", 1);
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3)(5, "h3", 4);
            i0.ɵɵtext(6, "Submit Your Support Request");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "div", 5)(8, "ul", 6)(9, "li", 7)(10, "a", 8);
            i0.ɵɵtext(11, "Sea World");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "li", 9);
            i0.ɵɵelement(13, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "li", 7)(15, "a", 11);
            i0.ɵɵtext(16, "Helpcenter");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "li", 9);
            i0.ɵɵelement(18, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "li", 12);
            i0.ɵɵtext(20, "Support");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(21, "app-helpcenter-support-comp")(22, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
        } }, dependencies: [RouterLink, HomeNavbar, HelpcenterSupportComp, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpcenterSupport, [{
        type: Component,
        args: [{ selector: 'app-helpcenter-support', imports: [RouterLink, HomeNavbar, HelpcenterSupportComp, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n<section class=\"relative table w-full py-36 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\">\r\n    <div class=\"absolute inset-0 bg-slate-900 opacity-80\"></div>\r\n    <div class=\"container relative\">\r\n        <div class=\"grid grid-cols-1 pb-8 text-center mt-10\">\r\n            <h3 class=\"text-4xl leading-normal tracking-wider font-semibold text-white\">Submit Your Support Request</h3>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"absolute text-center z-10 bottom-5 start-0 end-0 mx-3\">\r\n        <ul class=\"tracking-[0.5px] mb-0 inline-block\">\r\n            <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white\"><a routerLink=\"/\">Sea World</a></li>\r\n            <li class=\"inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180\"><i class=\"mdi mdi-chevron-right\"></i></li>\r\n            <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white\"><a routerLink=\"/helpcenter\">Helpcenter</a></li>\r\n            <li class=\"inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180\"><i class=\"mdi mdi-chevron-right\"></i></li>\r\n            <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white\" aria-current=\"page\">Support</li>\r\n        </ul>\r\n    </div>\r\n</section>\r\n\r\n<app-helpcenter-support-comp />\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpcenterSupport, { className: "HelpcenterSupport", filePath: "app/features/innerpages/helpcenter/helpcenter-support/helpcenter-support.ts", lineNumber: 13 }); })();
