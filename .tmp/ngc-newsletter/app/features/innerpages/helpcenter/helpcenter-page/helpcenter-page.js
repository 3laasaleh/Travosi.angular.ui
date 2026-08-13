import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterOne } from '../../../../shared/components/helpcenter/helpcenter-one/helpcenter-one';
import * as i0 from "@angular/core";
export class HelpcenterPage {
    bg = 'assets/images/bg/cta.jpg';
    static ɵfac = function HelpcenterPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpcenterPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpcenterPage, selectors: [["app-helpcenter-page"]], decls: 26, vars: 2, consts: [[1, "relative", "table", "w-full", "py-36", "bg-center", "bg-no-repeat", "bg-cover"], [1, "absolute", "inset-0", "bg-slate-900", "opacity-80"], [1, "container", "relative"], [1, "grid", "grid-cols-1", "pb-8", "text-center", "mt-10"], [1, "mb-6", "text-4xl", "leading-normal", "tracking-wider", "font-semibold", "text-white"], [1, "text-center", "subcribe-form", "mt-4", "pt-2"], [1, "relative", "mx-auto", "max-w-xl"], ["type", "text", "id", "help", "name", "name", "placeholder", "Search your questions or topic...", 1, "py-4", "pe-40", "ps-6", "w-full", "h-[50px]", "outline-none", "text-black", "rounded-full", "bg-white", "opacity-70", "border", "border-gray-100", "dark:border-gray-700"], ["type", "submit", 1, "py-2", "px-5", "inline-block", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "absolute", "top-[2px]", "end-[3px]", "h-[46px]", "bg-primary", "text-white", "rounded-full"], [1, "absolute", "text-center", "z-10", "bottom-5", "start-0", "end-0", "mx-3"], [1, "tracking-[0.5px]", "mb-0", "inline-block"], [1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white/50", "hover:text-white"], ["routerLink", "/"], [1, "inline-block", "text-base", "text-white/50", "mx-0.5", "ltr:rotate-0", "rtl:rotate-180"], [1, "mdi", "mdi-chevron-right"], ["aria-current", "page", 1, "inline-block", "uppercase", "text-[13px]", "font-bold", "duration-500", "ease-in-out", "text-white"]], template: function HelpcenterPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "app-home-navbar");
            i0.ɵɵelementStart(2, "section", 0);
            i0.ɵɵelement(3, "div", 1);
            i0.ɵɵelementStart(4, "div", 2)(5, "div", 3)(6, "h3", 4);
            i0.ɵɵtext(7, "Hello ! ");
            i0.ɵɵelement(8, "br");
            i0.ɵɵtext(9, " How can we help you?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 5)(11, "form", 6);
            i0.ɵɵelement(12, "input", 7);
            i0.ɵɵelementStart(13, "button", 8);
            i0.ɵɵtext(14, "Search");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(15, "div", 9)(16, "ul", 10)(17, "li", 11)(18, "a", 12);
            i0.ɵɵtext(19, "Sea World ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "li", 13);
            i0.ɵɵelement(21, "i", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "li", 15);
            i0.ɵɵtext(23, "Helpcenter");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(24, "app-helpcenter-one")(25, "app-footer-one");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
        } }, dependencies: [RouterLink, HomeNavbar, HelpcenterOne, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpcenterPage, [{
        type: Component,
        args: [{ selector: 'app-helpcenter-page', imports: [RouterLink, HomeNavbar, HelpcenterOne, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n<app-home-navbar />\r\n    <section class=\"relative table w-full py-36 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\">\r\n        <div class=\"absolute inset-0 bg-slate-900 opacity-80\"></div>\r\n        <div class=\"container relative\">\r\n            <div class=\"grid grid-cols-1 pb-8 text-center mt-10\">\r\n                <h3 class=\"mb-6 text-4xl leading-normal tracking-wider font-semibold text-white\">Hello ! <br/> How can we help you?</h3>\r\n\r\n                <div class=\"text-center subcribe-form mt-4 pt-2\">\r\n                    <form class=\"relative mx-auto max-w-xl\">\r\n                        <input type=\"text\" id=\"help\" name=\"name\" class=\"py-4 pe-40 ps-6 w-full h-[50px] outline-none text-black  rounded-full bg-white opacity-70  border border-gray-100 dark:border-gray-700\" placeholder=\"Search your questions or topic...\">\r\n                        <button type=\"submit\" class=\"py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-primary text-white rounded-full\">Search</button>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"absolute text-center z-10 bottom-5 start-0 end-0 mx-3\">\r\n            <ul class=\"tracking-[0.5px] mb-0 inline-block\">\r\n                <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white\"><a routerLink=\"/\">Sea World </a></li>\r\n                <li class=\"inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180\"><i class=\"mdi mdi-chevron-right\"></i></li>\r\n                <li class=\"inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white\" aria-current=\"page\">Helpcenter</li>\r\n            </ul>\r\n        </div>\r\n    </section>\r\n    <app-helpcenter-one />\r\n    <app-footer-one />\r\n    \r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpcenterPage, { className: "HelpcenterPage", filePath: "app/features/innerpages/helpcenter/helpcenter-page/helpcenter-page.ts", lineNumber: 13 }); })();
