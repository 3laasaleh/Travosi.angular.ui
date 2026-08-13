import { Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import * as i0 from "@angular/core";
export class TaglineOne {
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function TaglineOne_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TaglineOne)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TaglineOne, selectors: [["app-tagline-one"]], decls: 29, vars: 0, consts: [[1, "tagline", "bg-slate-900"], [1, "container", "relative"], [1, "grid", "grid-cols-1"], [1, "flex", "items-center", "justify-between"], [1, "list-none"], [1, "inline-flex", "items-center"], ["data-feather", "clock", 1, "text-primary", "size-4"], [1, "ms-2", "text-slate-300"], [1, "inline-flex", "items-center", "ms-2"], ["data-feather", "map-pin", 1, "text-primary", "size-4"], ["data-feather", "mail", 1, "text-primary", "size-4"], ["href", "mailto:Info@seaworldholidays.com", 1, "ms-2", "text-slate-300", "hover:text-slate-200"], [1, "inline-flex", "mb-0"], ["href", "#!", 1, "text-slate-300", "hover:text-primary"], ["data-feather", "facebook", "title", "facebook", 1, "size-4", "align-middle"], [1, "inline-flex", "ms-2", "mb-0"], ["data-feather", "instagram", "title", "instagram", 1, "size-4", "align-middle"], ["href", "tel:+152534-468-854", 1, "text-slate-300", "hover:text-primary"], ["data-feather", "phone", "title", "phone", 1, "size-4", "align-middle"]], template: function TaglineOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "ul", 4)(5, "li", 5);
            i0.ɵɵdomElement(6, "i", 6);
            i0.ɵɵdomElementStart(7, "span", 7);
            i0.ɵɵtext(8, "Sat-Thur: 9am to 6pm");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(9, "li", 8);
            i0.ɵɵdomElement(10, "i", 9);
            i0.ɵɵdomElementStart(11, "span", 7);
            i0.ɵɵtext(12, "7 Mariouteya, Haram, Al Rehab Tower,");
            i0.ɵɵdomElementEnd()()();
            i0.ɵɵdomElementStart(13, "ul", 4)(14, "li", 5);
            i0.ɵɵdomElement(15, "i", 10);
            i0.ɵɵdomElementStart(16, "a", 11);
            i0.ɵɵtext(17, "Info@seaworldholidays.com");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(18, "li", 8)(19, "ul", 4)(20, "li", 12)(21, "a", 13);
            i0.ɵɵdomElement(22, "i", 14);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(23, "li", 15)(24, "a", 13);
            i0.ɵɵdomElement(25, "i", 16);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(26, "li", 15)(27, "a", 17);
            i0.ɵɵdomElement(28, "i", 18);
            i0.ɵɵdomElementEnd()()()()()()()()();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TaglineOne, [{
        type: Component,
        args: [{ selector: 'app-tagline-one', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"tagline bg-slate-900\">\r\n    <div class=\"container relative\">\r\n        <div class=\"grid grid-cols-1\">\r\n            <div class=\"flex items-center justify-between\">\r\n                <ul class=\"list-none\">\r\n                    <li class=\"inline-flex items-center\">\r\n                        <i data-feather=\"clock\" class=\"text-primary size-4\"></i>\r\n                        <span class=\"ms-2 text-slate-300\">Sat-Thur: 9am to 6pm</span>\r\n                    </li>\r\n                    <li class=\"inline-flex items-center ms-2\">\r\n                        <i data-feather=\"map-pin\" class=\"text-primary size-4\"></i>\r\n                        <span class=\"ms-2 text-slate-300\">7 Mariouteya, Haram, Al Rehab Tower,</span>\r\n                    </li>\r\n                </ul>\r\n\r\n                <ul class=\"list-none\">\r\n                    <li class=\"inline-flex items-center\">\r\n                        <i data-feather=\"mail\" class=\"text-primary size-4\"></i>\r\n                        <a href=\"mailto:Info@seaworldholidays.com\" class=\"ms-2 text-slate-300 hover:text-slate-200\">Info@seaworldholidays.com</a>\r\n                    </li>\r\n                    <li class=\"inline-flex items-center ms-2\">\r\n                        <ul class=\"list-none\">\r\n                            <li class=\"inline-flex mb-0\"><a href=\"#!\" class=\"text-slate-300 hover:text-primary\"><i data-feather=\"facebook\" class=\"size-4 align-middle\" title=\"facebook\"></i></a></li>\r\n                            <li class=\"inline-flex ms-2 mb-0\"><a href=\"#!\" class=\"text-slate-300 hover:text-primary\"><i data-feather=\"instagram\" class=\"size-4 align-middle\" title=\"instagram\"></i></a></li>\r\n                            <li class=\"inline-flex ms-2 mb-0\"><a href=\"tel:+152534-468-854\" class=\"text-slate-300 hover:text-primary\"><i data-feather=\"phone\" class=\"size-4 align-middle\" title=\"phone\"></i></a></li>\r\n                        </ul>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TaglineOne, { className: "TaglineOne", filePath: "app/shared/components/tagline-one/tagline-one.ts", lineNumber: 9 }); })();
