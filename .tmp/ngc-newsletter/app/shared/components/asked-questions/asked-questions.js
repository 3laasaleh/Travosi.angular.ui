import { Component, ChangeDetectionStrategy } from '@angular/core';
import { datas } from '../../../data/data';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function AskedQuestions_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 8)(1, "h2", 9)(2, "button", 10);
    i0.ɵɵdomListener("click", function AskedQuestions_For_11_Template_button_click_2_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleclick(item_r2.id)); });
    i0.ɵɵdomElementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(5, "svg", 11);
    i0.ɵɵdomElement(6, "path", 12);
    i0.ɵɵdomElementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵdomElementStart(7, "div", 13)(8, "div", 14)(9, "p", 15);
    i0.ɵɵtext(10);
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-gray-50", item_r2.id === ctx_r2.activeIndex)("", item_r2.id === ctx_r2.activeIndex)("text-primary", item_r2.id === ctx_r2.activeIndex);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.title);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("rotate-180", item_r2.id === ctx_r2.activeIndex);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("hidden", item_r2.id !== ctx_r2.activeIndex);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r2.desc);
} }
export class AskedQuestions {
    datas = datas;
    activeIndex = 1;
    handleclick(id) {
        this.activeIndex = id;
    }
    static ɵfac = function AskedQuestions_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AskedQuestions)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AskedQuestions, selectors: [["app-asked-questions"]], decls: 12, vars: 0, consts: [[1, "container", "relative", "md:mt-24", "mt-16"], [1, "grid", "grid-cols-1", "pb-6", "text-center"], [1, "mb-6", "md:text-3xl", "text-2xl", "md:leading-normal", "leading-normal", "font-semibold"], [1, "text-slate-400", "max-w-xl", "mx-auto"], [1, "relative", "grid", "md:grid-cols-12", "grid-cols-1", "items-center", "mt-6", "gap-6"], [1, "md:col-span-6"], ["src", "assets/images/bg/6.jpg", "alt", "", 1, "w-full", "h-[540px]", "object-cover", "rounded-md", "shadow", "dark:shadow-gray-800"], ["id", "accordion-collapse", "data-accordion", "collapse"], [1, "relative", "shadow", "dark:shadow-gray-800", "rounded-md", "overflow-hidden", "mt-4"], ["id", "accordion-collapse-heading-1", 1, "text-base", "font-semibold"], ["type", "button", 1, "flex", "justify-between", "items-center", "p-5", "w-full", "font-medium", "text-start", 3, "click"], ["data-accordion-icon", "", "fill", "currentColor", "viewBox", "0 0 20 20", "xmlns", "http://www.w3.org/2000/svg", 1, "w-4", "h-4", "shrink-0"], ["fill-rule", "evenodd", "d", "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", "clip-rule", "evenodd"], ["id", "accordion-collapse-body-1", "aria-labelledby", "accordion-collapse-heading-1"], [1, "p-5"], [1, "text-slate-400", "dark:text-gray-400"]], template: function AskedQuestions_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
            i0.ɵɵtext(3, "Frequently Asked Questions");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElement(4, "p", 3);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "div", 4)(6, "div", 5);
            i0.ɵɵdomElement(7, "img", 6);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(8, "div", 5)(9, "div", 7);
            i0.ɵɵrepeaterCreate(10, AskedQuestions_For_11_Template, 11, 12, "div", 8, _forTrack0);
            i0.ɵɵdomElementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵrepeater(ctx.datas);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AskedQuestions, [{
        type: Component,
        args: [{ selector: 'app-asked-questions', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"container relative md:mt-24 mt-16\">\r\n    <div class=\"grid grid-cols-1 pb-6 text-center\">\r\n        <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">Frequently Asked Questions</h3>\r\n        <p class=\"text-slate-400 max-w-xl mx-auto\"></p>\r\n    </div>\r\n\r\n    <div class=\"relative grid md:grid-cols-12 grid-cols-1 items-center mt-6 gap-6\">\r\n        <div class=\"md:col-span-6\">\r\n            <img src=\"assets/images/bg/6.jpg\" class=\"w-full h-[540px] object-cover rounded-md shadow dark:shadow-gray-800\" alt=\"\">\r\n        </div>\r\n\r\n        <div class=\"md:col-span-6\">\r\n            <div id=\"accordion-collapse\" data-accordion=\"collapse\">\r\n                @for (item of datas; track item.id) {\r\n                    <div class=\"relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4\">\r\n                        <h2 class=\"text-base font-semibold\" id=\"accordion-collapse-heading-1\">\r\n                            <button type=\"button\" (click)=\"handleclick(item.id)\" [class.bg-gray-50]=\"item.id === activeIndex\" [class.]=\"item.id === activeIndex\" [class.text-primary]=\"item.id === activeIndex\" class=\"flex justify-between items-center p-5 w-full font-medium text-start\">\r\n                                <span>{{ item.title }}</span>\r\n                                <svg data-accordion-icon [class.rotate-180]=\"item.id === activeIndex\" class=\"w-4 h-4 shrink-0\" fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                                    <path fill-rule=\"evenodd\" d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\" clip-rule=\"evenodd\"></path>\r\n                                </svg>\r\n                            </button>\r\n                        </h2>\r\n                        <div id=\"accordion-collapse-body-1\" [class.hidden]=\"item.id !== activeIndex\" aria-labelledby=\"accordion-collapse-heading-1\">\r\n                            <div class=\"p-5\">\r\n                                <p class=\"text-slate-400 dark:text-gray-400\">{{ item.desc }}</p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                }\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AskedQuestions, { className: "AskedQuestions", filePath: "app/shared/components/asked-questions/asked-questions.ts", lineNumber: 9 }); })();
