import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { TermsOne } from '../../../../shared/components/utility/terms-one/terms-one';
import * as i0 from "@angular/core";
export class Terms {
    static ɵfac = function Terms_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Terms)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Terms, selectors: [["app-terms"]], decls: 23, vars: 0, consts: [[1, "relative", "table", "w-full", "py-32", "lg:py-40", "bg-gray-50"], [1, "container", "relative"], [1, "grid", "grid-cols-1", "text-center", "mt-10"], [1, "text-3xl", "leading-normal", "font-semibold"], [1, "absolute", "text-center", "z-10", "bottom-5", "start-0", "end-0", "mx-3"], [1, "tracking-[0.5px]", "mb-0", "inline-block"], [1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "hover:text-primary"], ["routerLink", "/"], [1, "inline-block", "text-base", "text-slate-950", "mx-0.5", "ltr:rotate-0", "rtl:rotate-180"], [1, "mdi", "mdi-chevron-right"], ["href", "javascript:void(0)"], ["aria-current", "page", 1, "inline-block", "uppercase", "text-[13px]", "font-bold", "text-primary"]], template: function Terms_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "app-home-navbar");
            i0.ɵɵelementStart(2, "section", 0)(3, "div", 1)(4, "div", 2)(5, "h3", 3);
            i0.ɵɵtext(6, "Terms of Services");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "div", 4)(8, "ul", 5)(9, "li", 6)(10, "a", 7);
            i0.ɵɵtext(11, "Sea World ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "li", 8);
            i0.ɵɵelement(13, "i", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "li", 6)(15, "a", 10);
            i0.ɵɵtext(16, "Utility");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "li", 8);
            i0.ɵɵelement(18, "i", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "li", 11);
            i0.ɵɵtext(20, "Terms");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(21, "app-terms-one");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(22, "app-footer-one");
        } }, dependencies: [RouterLink, HomeNavbar, TermsOne, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Terms, [{
        type: Component,
        args: [{ selector: 'app-terms', imports: [RouterLink, HomeNavbar, TermsOne, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <app-home-navbar />\r\n    <!-- Start Hero -->\r\n    <section class=\"relative table w-full py-32 lg:py-40 bg-gray-50 \">\r\n        <div class=\"container relative\">\r\n            <div class=\"grid grid-cols-1 text-center mt-10\">\r\n                <h3 class=\"text-3xl leading-normal font-semibold\">Terms of Services</h3>\r\n            </div><!--end grid-->\r\n        </div><!--end container-->\r\n\r\n        <div class=\"absolute text-center z-10 bottom-5 start-0 end-0 mx-3\">\r\n            <ul class=\"tracking-[0.5px] mb-0 inline-block\">\r\n                <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-primary\">\r\n                    <a routerLink=\"/\">Sea World </a>\r\n                </li>\r\n                <li class=\"inline-block text-base text-slate-950  mx-0.5 ltr:rotate-0 rtl:rotate-180\">\r\n                    <i class=\"mdi mdi-chevron-right\"></i>\r\n                </li>\r\n                <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-primary\">\r\n                    <a href=\"javascript:void(0)\">Utility</a>\r\n                </li>\r\n                <li class=\"inline-block text-base text-slate-950  mx-0.5 ltr:rotate-0 rtl:rotate-180\">\r\n                    <i class=\"mdi mdi-chevron-right\"></i>\r\n                </li>\r\n                <li class=\"inline-block uppercase text-[13px] font-bold text-primary\" aria-current=\"page\">Terms</li>\r\n            </ul>\r\n        </div>\r\n    </section><!--end section-->\r\n    <!-- End Hero -->\r\n    <app-terms-one />\r\n</div>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Terms, { className: "Terms", filePath: "app/features/innerpages/utility/terms/terms.ts", lineNumber: 13 }); })();
