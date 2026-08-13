import { Component, ChangeDetectionStrategy } from '@angular/core';
import * as i0 from "@angular/core";
function PrivacyOne_For_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "li", 9);
    i0.ɵɵdomElement(1, "i", 12);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1);
} }
export class PrivacyOne {
    data = [
        'Digital Marketing Solutions for Tomorrow',
        'Our Talented & Experienced Marketing Agency',
        'Create your own skin to match your brand',
        'Digital Marketing Solutions for Tomorrow',
        'Our Talented & Experienced Marketing Agency',
        'Create your own skin to match your brand',
    ];
    static ɵfac = function PrivacyOne_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PrivacyOne)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PrivacyOne, selectors: [["app-privacy-one"]], decls: 25, vars: 0, consts: [[1, "relative", "md:py-24", "py-16"], [1, "container", "relative"], [1, "md:flex", "justify-center"], [1, "md:w-3/4"], [1, "p-6", "bg-white", "shadow", "dark:shadow-gray-800", "rounded-md"], [1, "text-xl", "font-semibold", "mb-4"], [1, "text-slate-400"], [1, "text-xl", "font-semibold", "mb-4", "mt-8"], [1, "list-none", "text-slate-400", "mt-4"], [1, "flex", "ms-0", "mt-2"], [1, "mt-8"], ["href", "javascript:void(0)", 1, "py-2", "px-5", "inline-block", "font-semibold", "tracking-wide", "border", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "hover:bg-primary-600", "border-primary", "hover:border-primary-600", "text-white", "rounded-md"], [1, "mdi", "mdi-chevron-right", "text-primary", "text-lg", "align-middle", "me-2"]], template: function PrivacyOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "h5", 5);
            i0.ɵɵtext(6, "Overview :");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(7, "p", 6);
            i0.ɵɵtext(8, "It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(9, "p", 6);
            i0.ɵɵtext(10, "In the 1960s, the text suddenly became known beyond the professional circle of typesetters and layout designers when it was used for Letraset sheets (adhesive letters on transparent film, popular until the 1980s) Versions of the text were subsequently included in DTP programmes such as PageMaker etc.");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(11, "p", 6);
            i0.ɵɵtext(12, "There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical stories.");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(13, "h5", 7);
            i0.ɵɵtext(14, "We use your information to :");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(15, "ul", 8);
            i0.ɵɵrepeaterCreate(16, PrivacyOne_For_17_Template, 3, 1, "li", 9, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(18, "h5", 7);
            i0.ɵɵtext(19, "Information Provided Voluntarily :");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(20, "p", 6);
            i0.ɵɵtext(21, "In the 1960s, the text suddenly became known beyond the professional circle of typesetters and layout designers when it was used for Letraset sheets (adhesive letters on transparent film, popular until the 1980s) Versions of the text were subsequently included in DTP programmes such as PageMaker etc.");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(22, "div", 10)(23, "a", 11);
            i0.ɵɵtext(24, "Print");
            i0.ɵɵdomElementEnd()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵrepeater(ctx.data);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PrivacyOne, [{
        type: Component,
        args: [{ selector: 'app-privacy-one', changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"relative md:py-24 py-16\">\r\n    <div class=\"container relative\">\r\n        <div class=\"md:flex justify-center\">\r\n            <div class=\"md:w-3/4\">\r\n                <div class=\"p-6 bg-white  shadow dark:shadow-gray-800 rounded-md\">\r\n                    <h5 class=\"text-xl font-semibold mb-4\">Overview :</h5>\r\n                    <p class=\"text-slate-400\">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>\r\n                    <p class=\"text-slate-400\">In the 1960s, the text suddenly became known beyond the professional circle of typesetters and layout designers when it was used for Letraset sheets (adhesive letters on transparent film, popular until the 1980s) Versions of the text were subsequently included in DTP programmes such as PageMaker etc.</p>\r\n                    <p class=\"text-slate-400\">There is now an abundance of readable dummy texts. These are usually used when a text is required purely to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or nonsensical stories.</p>\r\n\r\n                    <h5 class=\"text-xl font-semibold mb-4 mt-8\">We use your information to :</h5>\r\n                    <ul class=\"list-none text-slate-400 mt-4\">\r\n                        @for (item of data; track $index) {\r\n                            <li class=\"flex ms-0 mt-2\"><i class=\"mdi mdi-chevron-right text-primary text-lg align-middle me-2\"></i>{{ item }}</li>\r\n                        }\r\n                    </ul>\r\n\r\n                    <h5 class=\"text-xl font-semibold mb-4 mt-8\">Information Provided Voluntarily :</h5>\r\n                    <p class=\"text-slate-400\">In the 1960s, the text suddenly became known beyond the professional circle of typesetters and layout designers when it was used for Letraset sheets (adhesive letters on transparent film, popular until the 1980s) Versions of the text were subsequently included in DTP programmes such as PageMaker etc.</p>\r\n\r\n                    <div class=\"mt-8\">\r\n                        <a href=\"javascript:void(0)\" class=\"py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-600 border-primary hover:border-primary-600 text-white rounded-md\">Print</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PrivacyOne, { className: "PrivacyOne", filePath: "app/shared/components/utility/privacy-one/privacy-one.ts", lineNumber: 8 }); })();
