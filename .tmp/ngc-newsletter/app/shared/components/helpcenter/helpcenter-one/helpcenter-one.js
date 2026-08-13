import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { helps, starts } from '../../../../data/data';
import * as i0 from "@angular/core";
function HelpcenterOne_For_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "div", 14);
    i0.ɵɵelement(2, "i", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 16)(4, "a", 17);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 18);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 19)(9, "a", 20);
    i0.ɵɵtext(10);
    i0.ɵɵelement(11, "i", 21);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-feather", item_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", item_r1.to);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", item_r1.button, " ");
} }
function HelpcenterOne_For_19_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h5", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 26);
    i0.ɵɵtext(3, "Sea World");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", item_r2.name, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", item_r2.name3);
} }
function HelpcenterOne_For_19_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h5", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2.name);
} }
function HelpcenterOne_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementStart(2, "div", 23);
    i0.ɵɵconditionalCreate(3, HelpcenterOne_For_19_Conditional_3_Template, 5, 2, "h5", 24)(4, HelpcenterOne_For_19_Conditional_4_Template, 2, 1, "h5", 24);
    i0.ɵɵelementStart(5, "p", 25);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-feather", item_r2.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r2.name2 ? 3 : 4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r2.desc);
} }
export class HelpcenterOne {
    helps = helps;
    starts = starts;
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function HelpcenterOne_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpcenterOne)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpcenterOne, selectors: [["app-helpcenter-one"]], decls: 30, vars: 0, consts: [[1, "relative", "md:py-24", "py-16"], [1, "container", "relative"], [1, "grid", "grid-cols-1", "pb-8", "text-center"], [1, "mb-6", "md:text-3xl", "text-2xl", "md:leading-normal", "leading-normal", "font-semibold"], [1, "text-slate-400", "max-w-xl", "mx-auto"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "md:grid-cols-2", "mt-6", "gap-6"], [1, "text-center", "px-6", "mt-6"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "grid", "md:grid-cols-2", "grid-cols-1", "mt-8", "gap-6"], [1, "flex"], [1, "grid", "grid-cols-1", "text-center"], [1, "mt-6"], ["routerLink", "/helpcenter-support", 1, "py-2", "px-5", "inline-flex", "items-center", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "me-2", "mt-2"], ["data-feather", "phone", 1, "size-4", "me-1"], [1, "w-20", "h-20", "bg-primary/5", "text-primary", "rounded-xl", "text-3xl", "flex", "align-middle", "justify-center", "items-center", "shadow-sm", "dark:shadow-gray-800", "mx-auto"], [1, "size-[30px]"], [1, "content", "mt-7"], ["routerLink", "/helpcenter-faqs", 1, "title", "h5", "text-lg", "font-medium", "hover:text-primary"], [1, "text-slate-400", "mt-3"], [1, "mt-5"], [1, "text-primary", 3, "routerLink"], [1, "mdi", "mdi-chevron-right"], [1, "fea", "icon-ex-md", "text-primary", "me-3"], [1, "flex-1"], [1, "mb-2", "text-xl", "font-semibold"], [1, "text-slate-400"], [1, "text-primary"]], template: function HelpcenterOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "section", 0)(2, "div", 1)(3, "div", 2)(4, "h3", 3);
            i0.ɵɵtext(5, "Find The Help You Need");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtext(7, "Upgrade your style with our curated sets. Choose confidence, embrace your unique look.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵrepeaterCreate(9, HelpcenterOne_For_10_Template, 12, 5, "div", 6, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 7)(12, "div", 2)(13, "h3", 3);
            i0.ɵɵtext(14, "Get Started");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 4);
            i0.ɵɵtext(16, "Upgrade your style with our curated sets. Choose confidence, embrace your unique look.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 8);
            i0.ɵɵrepeaterCreate(18, HelpcenterOne_For_19_Template, 7, 3, "div", 9, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 7)(21, "div", 10)(22, "h3", 3);
            i0.ɵɵtext(23, "Have Question ? Get in touch!");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "p", 4);
            i0.ɵɵtext(25, "Upgrade your style with our curated sets. Choose confidence, embrace your unique look.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 11)(27, "a", 12);
            i0.ɵɵelement(28, "i", 13);
            i0.ɵɵtext(29, " Contact us");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.helps);
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.starts);
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpcenterOne, [{
        type: Component,
        args: [{ selector: 'app-helpcenter-one', imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <section class=\"relative md:py-24 py-16\">\r\n        <div class=\"container relative\">\r\n            <div class=\"grid grid-cols-1 pb-8 text-center\">\r\n                <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">Find The Help You Need</h3>\r\n                <p class=\"text-slate-400 max-w-xl mx-auto\">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>\r\n            </div>\r\n\r\n            <div class=\"grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-6 gap-6\">\r\n                @for (item of helps; track $index) {\r\n                    <div class=\"text-center px-6 mt-6\">\r\n                        <div class=\"w-20 h-20 bg-primary/5 text-primary rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto\">\r\n                            <i [attr.data-feather]=\"item.icon\" class=\"size-[30px]\"></i>\r\n                        </div>\r\n\r\n                        <div class=\"content mt-7\">\r\n                            <a routerLink=\"/helpcenter-faqs\" class=\"title h5 text-lg font-medium hover:text-primary\">{{ item.name }}</a>\r\n                            <p class=\"text-slate-400 mt-3\">{{ item.desc }}</p>\r\n                            <div class=\"mt-5\">\r\n                                <a [routerLink]=\"item.to\" class=\"text-primary\">{{ item.button }} <i class=\"mdi mdi-chevron-right\"></i></a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                }\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"grid grid-cols-1 pb-8 text-center\">\r\n                <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">Get Started</h3>\r\n\r\n                <p class=\"text-slate-400 max-w-xl mx-auto\">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>\r\n            </div>\r\n\r\n            <div class=\"grid md:grid-cols-2 grid-cols-1 mt-8 gap-6\">\r\n                @for (item of starts; track $index) {\r\n                    <div class=\"flex\">\r\n                        <i [attr.data-feather]=\"item.icon\" class=\"fea icon-ex-md text-primary me-3\"></i>\r\n                        <div class=\"flex-1\">\r\n                            @if (item.name2) {\r\n                                <h5 class=\"mb-2 text-xl font-semibold\">{{ item.name }} <span class=\"text-primary\">Sea World</span> {{ item.name3 }}</h5>\r\n                            } @else {\r\n                                <h5 class=\"mb-2 text-xl font-semibold\"> {{ item.name }}</h5>\r\n                            }\r\n                            <p class=\"text-slate-400\">{{ item.desc }}</p>\r\n                        </div>\r\n                    </div>\r\n                }\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"grid grid-cols-1 text-center\">\r\n                <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">Have Question ? Get in touch!</h3>\r\n\r\n                <p class=\"text-slate-400 max-w-xl mx-auto\">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>\r\n\r\n                <div class=\"mt-6\">\r\n                    <a routerLink=\"/helpcenter-support\" class=\"py-2 px-5 inline-flex items-center font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md me-2 mt-2\"><i data-feather=\"phone\" class=\"size-4 me-1\"></i> Contact us</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpcenterOne, { className: "HelpcenterOne", filePath: "app/shared/components/helpcenter/helpcenter-one/helpcenter-one.ts", lineNumber: 12 }); })();
