import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { helps } from '../../../../data/data';
import * as i0 from "@angular/core";
function HelpcenterSupportComp_For_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 30);
    i0.ɵɵelement(2, "i", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 32)(4, "a", 33);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 34);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 35)(9, "a", 36);
    i0.ɵɵtext(10);
    i0.ɵɵelement(11, "i", 37);
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
export class HelpcenterSupportComp {
    helps = helps;
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function HelpcenterSupportComp_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpcenterSupportComp)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpcenterSupportComp, selectors: [["app-helpcenter-support-comp"]], decls: 48, vars: 0, consts: [[1, "relative", "md:py-24", "py-16", "bg-gray-50"], [1, "container", "relative"], [1, "grid", "md:grid-cols-12", "grid-cols-1", "gap-6", "mx-auto", "text-center"], [1, "lg:col-start-3", "lg:col-span-8", "md:col-start-2", "md:col-span-10"], [1, "bg-white", "rounded-md", "shadow", "dark:shadow-gray-800", "p-6"], [1, "grid", "lg:grid-cols-12", "lg:gap-6"], [1, "lg:col-span-6", "mb-5"], [1, "text-start"], ["for", "name", 1, "font-semibold"], [1, "form-icon", "relative", "mt-2"], ["data-feather", "user", 1, "size-4", "absolute", "top-3", "start-4"], ["name", "name", "id", "name", "type", "text", "placeholder", "Name :", 1, "ps-11", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "email", 1, "font-semibold"], ["data-feather", "mail", 1, "size-4", "absolute", "top-3", "start-4"], ["name", "email", "id", "email", "type", "email", "placeholder", "Email :", 1, "ps-11", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], [1, "grid", "grid-cols-1"], [1, "mb-5"], ["for", "subject", 1, "font-semibold"], ["data-feather", "book", 1, "size-4", "absolute", "top-3", "start-4"], ["name", "subject", "id", "subject", "placeholder", "Subject :", 1, "ps-11", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "comments", 1, "font-semibold"], ["data-feather", "message-circle", 1, "size-4", "absolute", "top-3", "start-4"], ["name", "comments", "id", "comments", "placeholder", "Message :", 1, "ps-11", "w-full", "py-2", "px-3", "h-28", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["type", "submit", "id", "submit", "name", "send", 1, "py-2", "px-5", "font-semibold", "tracking-wide", "border", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "hover:bg-primary-600", "border-primary", "hover:border-primary-600", "text-white", "rounded-md", "justify-center", "flex", "items-center"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "grid", "grid-cols-1", "pb-8", "text-center"], [1, "mb-6", "md:text-3xl", "text-2xl", "md:leading-normal", "leading-normal", "font-semibold"], [1, "text-slate-400", "max-w-xl", "mx-auto"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "md:grid-cols-2", "mt-6", "gap-6"], [1, "text-center", "px-6", "mt-6"], [1, "w-20", "h-20", "bg-primary/5", "text-primary", "rounded-xl", "text-3xl", "flex", "align-middle", "justify-center", "items-center", "shadow-sm", "dark:shadow-gray-800", "mx-auto"], [1, "size-[30px]"], [1, "content", "mt-7"], ["routerLink", "/helpcenter-faqs", 1, "title", "h5", "text-lg", "font-medium", "hover:text-primary"], [1, "text-slate-400", "mt-3"], [1, "mt-5"], [1, "text-primary", 3, "routerLink"], [1, "mdi", "mdi-chevron-right"]], template: function HelpcenterSupportComp_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div")(1, "section", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "form")(7, "div", 5)(8, "div", 6)(9, "div", 7)(10, "label", 8);
            i0.ɵɵtext(11, "Your Name:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 9);
            i0.ɵɵelement(13, "i", 10)(14, "input", 11);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "div", 6)(16, "div", 7)(17, "label", 12);
            i0.ɵɵtext(18, "Your Email:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 9);
            i0.ɵɵelement(20, "i", 13)(21, "input", 14);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(22, "div", 15)(23, "div", 16)(24, "div", 7)(25, "label", 17);
            i0.ɵɵtext(26, "Your Question:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 9);
            i0.ɵɵelement(28, "i", 18)(29, "input", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(30, "div", 16)(31, "div", 7)(32, "label", 20);
            i0.ɵɵtext(33, "Your Comment:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 9);
            i0.ɵɵelement(35, "i", 21)(36, "textarea", 22);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(37, "button", 23);
            i0.ɵɵtext(38, "Send Message");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(39, "div", 24)(40, "div", 25)(41, "h3", 26);
            i0.ɵɵtext(42, "Find The Help You Need");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "p", 27);
            i0.ɵɵtext(44, "Upgrade your style with our curated sets. Choose confidence, embrace your unique look.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "div", 28);
            i0.ɵɵrepeaterCreate(46, HelpcenterSupportComp_For_47_Template, 12, 5, "div", 29, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(46);
            i0.ɵɵrepeater(ctx.helps);
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpcenterSupportComp, [{
        type: Component,
        args: [{ selector: 'app-helpcenter-support-comp', imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <section class=\"relative md:py-24 py-16 bg-gray-50 \">\r\n        <div class=\"container relative\">\r\n            <div class=\"grid md:grid-cols-12 grid-cols-1 gap-6 mx-auto text-center\">\r\n                <div class=\"lg:col-start-3 lg:col-span-8 md:col-start-2 md:col-span-10\">\r\n                    <div class=\"bg-white  rounded-md shadow dark:shadow-gray-800 p-6\">\r\n                        <form>\r\n                            <div class=\"grid lg:grid-cols-12 lg:gap-6\">\r\n                                <div class=\"lg:col-span-6 mb-5\">\r\n                                    <div class=\"text-start\">\r\n                                        <label for=\"name\" class=\"font-semibold\">Your Name:</label>\r\n                                        <div class=\"form-icon relative mt-2\">\r\n                                            <i data-feather=\"user\" class=\"size-4 absolute top-3 start-4\"></i>\r\n                                            <input name=\"name\" id=\"name\" type=\"text\" class=\"ps-11 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Name :\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"lg:col-span-6 mb-5\">\r\n                                    <div class=\"text-start\">\r\n                                        <label for=\"email\" class=\"font-semibold\">Your Email:</label>\r\n                                        <div class=\"form-icon relative mt-2\">\r\n                                            <i data-feather=\"mail\" class=\"size-4 absolute top-3 start-4\"></i>\r\n                                            <input name=\"email\" id=\"email\" type=\"email\" class=\"ps-11 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Email :\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <div class=\"grid grid-cols-1\">\r\n                                <div class=\"mb-5\">\r\n                                    <div class=\"text-start\">\r\n                                        <label for=\"subject\" class=\"font-semibold\">Your Question:</label>\r\n                                        <div class=\"form-icon relative mt-2\">\r\n                                            <i data-feather=\"book\" class=\"size-4 absolute top-3 start-4\"></i>\r\n                                            <input name=\"subject\" id=\"subject\" class=\"ps-11 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Subject :\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div class=\"mb-5\">\r\n                                    <div class=\"text-start\">\r\n                                        <label for=\"comments\" class=\"font-semibold\">Your Comment:</label>\r\n                                        <div class=\"form-icon relative mt-2\">\r\n                                            <i data-feather=\"message-circle\" class=\"size-4 absolute top-3 start-4\"></i>\r\n                                            <textarea name=\"comments\" id=\"comments\" class=\"ps-11 w-full py-2 px-3 h-28 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Message :\"></textarea>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                            <button type=\"submit\" id=\"submit\" name=\"send\" class=\"py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-primary hover:bg-primary-600 border-primary hover:border-primary-600 text-white rounded-md justify-center flex items-center\">Send Message</button>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"grid grid-cols-1 pb-8 text-center\">\r\n                <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">Find The Help You Need</h3>\r\n                <p class=\"text-slate-400 max-w-xl mx-auto\">Upgrade your style with our curated sets. Choose confidence, embrace your unique look.</p>\r\n            </div>\r\n\r\n            <div class=\"grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-6 gap-6\">\r\n                @for (item of helps; track $index) {\r\n                    <div class=\"text-center px-6 mt-6\">\r\n                        <div class=\"w-20 h-20 bg-primary/5 text-primary rounded-xl text-3xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-800 mx-auto\">\r\n                            <i [attr.data-feather]=\"item.icon\" class=\"size-[30px]\"></i>\r\n                        </div>\r\n\r\n                        <div class=\"content mt-7\">\r\n                            <a routerLink=\"/helpcenter-faqs\" class=\"title h5 text-lg font-medium hover:text-primary\">{{ item.name }}</a>\r\n                            <p class=\"text-slate-400 mt-3\">{{ item.desc }}</p>\r\n\r\n                            <div class=\"mt-5\">\r\n                                <a [routerLink]=\"item.to\" class=\"text-primary\">{{ item.button }} <i class=\"mdi mdi-chevron-right\"></i></a>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                }\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpcenterSupportComp, { className: "HelpcenterSupportComp", filePath: "app/shared/components/helpcenter/helpcenter-support/helpcenter-support.ts", lineNumber: 12 }); })();
