import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { guidesData } from '../../../../data/data';
import * as i0 from "@angular/core";
function HelpcenterGuidesComp_For_5_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 12)(1, "li", 13)(2, "a", 14);
    i0.ɵɵelement(3, "i", 15);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const features_r1 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", features_r1, " ");
} }
function HelpcenterGuidesComp_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "h5", 11);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(3, HelpcenterGuidesComp_For_5_For_4_Template, 5, 1, "ul", 12, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.title);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(item_r2.features);
} }
export class HelpcenterGuidesComp {
    guidesData = guidesData;
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function HelpcenterGuidesComp_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpcenterGuidesComp)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpcenterGuidesComp, selectors: [["app-helpcenter-guides-comp"]], decls: 16, vars: 0, consts: [[1, "relative", "md:py-24", "py-16"], [1, "container", "relative"], [1, "grid", "lg:grid-cols-3", "md:grid-cols-2", "grid-cols-1", "gap-6"], [1, ""], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "grid", "grid-cols-1", "text-center"], [1, "mb-6", "md:text-3xl", "text-2xl", "md:leading-normal", "leading-normal", "font-semibold"], [1, "text-slate-400", "max-w-xl", "mx-auto"], [1, "mt-6"], ["routerLink", "/helpcenter-support", 1, "py-2", "px-5", "inline-flex", "items-center", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "me-2", "mt-2"], ["data-feather", "phone", 1, "size-4", "me-1"], [1, "font-semibold", "text-xl", "mb-4"], [1, "list-none", "mt-2"], [1, "mt-2"], ["href", "javascript:void(0)", 1, "text-slate-400"], [1, "mdi", "mdi-arrow-right", "text-primary", "me-2"]], template: function HelpcenterGuidesComp_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "section", 0)(2, "div", 1)(3, "div", 2);
            i0.ɵɵrepeaterCreate(4, HelpcenterGuidesComp_For_5_Template, 5, 1, "div", 3, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 4)(7, "div", 5)(8, "h3", 6);
            i0.ɵɵtext(9, "Have Question ? Get in touch!");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, "Upgrade your style with our curated sets. Choose confidence, embrace your unique look.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 8)(13, "a", 9);
            i0.ɵɵelement(14, "i", 10);
            i0.ɵɵtext(15, " Contact us");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.guidesData);
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpcenterGuidesComp, [{
        type: Component,
        args: [{ selector: 'app-helpcenter-guides-comp', imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <section class=\"relative md:py-24 py-16\">\r\n        <div class=\"container relative\">\r\n            <div class=\"grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6\">\r\n                @for (item of guidesData; track $index) {\r\n                    <div class=\"\">\r\n                        <h5 class=\"font-semibold text-xl mb-4\">{{ item.title }}</h5>\r\n                        @for (features of item.features; track $index) {\r\n                            <ul class=\"list-none mt-2\">\r\n                                <li class=\"mt-2\">\r\n                                    <a href=\"javascript:void(0)\" class=\"text-slate-400\">\r\n                                        <i class=\"mdi mdi-arrow-right text-primary me-2\"></i>{{ features }}\r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n                        }\r\n                    </div>\r\n                }\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"grid grid-cols-1 text-center\">\r\n                <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">Have Question ? Get in touch!</h3>\r\n\r\n                <p class=\"text-slate-400 max-w-xl mx-auto\">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>\r\n\r\n                <div class=\"mt-6\">\r\n                    <a routerLink=\"/helpcenter-support\" class=\"py-2 px-5 inline-flex items-center font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md me-2 mt-2\"><i data-feather=\"phone\" class=\"size-4 me-1\"></i> Contact us</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpcenterGuidesComp, { className: "HelpcenterGuidesComp", filePath: "app/shared/components/helpcenter/helpcenter-guides/helpcenter-guides.ts", lineNumber: 12 }); })();
