import { Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import * as i0 from "@angular/core";
function ContactPage_For_38_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.status);
} }
function ContactPage_For_38_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.status);
} }
function ContactPage_For_38_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 44);
    i0.ɵɵlistener("click", function ContactPage_For_38_Conditional_12_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggle()); });
    i0.ɵɵtext(1, "View on Google map");
    i0.ɵɵelementEnd();
} }
function ContactPage_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 35)(2, "div", 36);
    i0.ɵɵelement(3, "i");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 37)(5, "h5", 38);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 39);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 40);
    i0.ɵɵconditionalCreate(10, ContactPage_For_38_Conditional_10_Template, 2, 1, "a", 41);
    i0.ɵɵconditionalCreate(11, ContactPage_For_38_Conditional_11_Template, 2, 1, "a", 42);
    i0.ɵɵconditionalCreate(12, ContactPage_For_38_Conditional_12_Template, 2, 0, "a", 43);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-feather", item_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.desc);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r1.status === "+201155011300" ? 10 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r1.status === "Info@seaworldholidays.com" ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r1.status === "View on Google map" ? 12 : -1);
} }
export class ContactPage {
    bg = 'assets/images/travel-train-station.svg';
    isActive = false;
    contacts = [
        {
            icon: 'phone',
            name: 'Phone',
            desc: 'The phrasal sequence of the is now so that many campaign and benefit',
            status: '+201155011300',
        },
        {
            icon: 'mail',
            name: 'Email',
            desc: 'The phrasal sequence of the is now so that many campaign and benefit',
            status: 'Info@seaworldholidays.com',
        },
        {
            icon: 'map-pin',
            name: 'Location',
            desc: 'C/54 Northwest Freeway, Suite 558, 7 Mariouteya, Haram, Al Rehab Tower,',
            status: 'View on Google map',
        },
    ];
    ngAfterViewInit() {
        feather.replace();
    }
    toggle() {
        this.isActive = !this.isActive;
    }
    static ɵfac = function ContactPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ContactPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactPage, selectors: [["app-contact-page"]], decls: 47, vars: 5, consts: [[1, "container-fluid", "relative", "mt-20"], [1, "grid", "grid-cols-1"], [1, "w-full", "leading-[0]", "border-0"], ["src", i0.ɵɵtrustConstantResourceUrl `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin`, "allowfullscreen", "", 1, "w-full", "h-[500px]", 2, "border", "0"], [1, "relative", "lg:py-24", "py-16"], [1, "container"], [1, "grid", "md:grid-cols-12", "grid-cols-1", "items-center", "gap-6"], [1, "lg:col-span-7", "md:col-span-6"], ["alt", "", 1, "w-full", "max-w-[500px]", "mx-auto", 3, "src"], [1, "lg:col-span-5", "md:col-span-6"], [1, "lg:ms-5"], [1, "bg-white", "rounded-md", "shadow", "dark:shadow-gray-800", "p-6"], [1, "mb-6", "text-2xl", "leading-normal", "font-semibold"], [1, "grid", "lg:grid-cols-12", "grid-cols-1", "gap-3"], [1, "lg:col-span-6"], ["for", "name", 1, "font-semibold"], ["name", "name", "id", "name", "type", "text", "placeholder", "Name :", "required", "", 1, "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "email", 1, "font-semibold"], ["name", "email", "id", "email", "type", "email", "placeholder", "Email :", "required", "", 1, "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], [1, "lg:col-span-12"], ["for", "subject", 1, "font-semibold"], ["name", "subject", "id", "subject", "placeholder", "Subject :", "required", "", 1, "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "comments", 1, "font-semibold"], ["name", "comments", "id", "comments", "placeholder", "Message :", 1, "mt-2", "w-full", "py-2", "px-3", "h-28", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["type", "submit", "id", "submit", "name", "send", 1, "py-2", "px-5", "inline-block", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "mt-2"], [1, "container", "lg:mt-24", "mt-16"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "md:grid-cols-2", "gap-6"], [1, "text-center", "px-6"], [1, "bg-slate-900/[0.9]", "top-0", "left-0", "bottom-0", "w-[100%]", "h-[100%]", "z-999"], [1, "h-[100%]", "flex", "items-center", "justify-center"], ["src", i0.ɵɵtrustConstantResourceUrl `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d55431.05581015953!2d-95.461302!3d29.735948000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c36647a52ab1%3A0x70a301678672cb!2sBriargrove%20Park%2C%20Houston%2C%20TX%2C%20USA!5e0!3m2!1sen!2sin!4v1710322657489!5m2!1sen!2sin`, "width", "700", "height", "500", "frameborder", "0"], [1, "text-slate-400", "absolute", "top-[20px]", "right-[20px]"], ["stroke", "currentColor", "fill", "none", "stroke-width", "2", "viewBox", "0 0 24 24", "stroke-linecap", "round", "stroke-linejoin", "round", "height", "1em", "width", "1em", "xmlns", "http://www.w3.org/2000/svg", 1, "size-5", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "relative", "text-transparent"], [1, "size-20", "bg-primary/5", "text-primary", "rounded-xl", "text-2xl", "flex", "align-middle", "justify-center", "items-center", "mx-auto", "shadow-sm", "dark:shadow-gray-800"], [1, "content", "mt-7"], [1, "title", "h5", "text-lg", "font-semibold"], [1, "text-slate-400", "mt-3"], [1, "mt-5"], ["href", "tel:+152534-468-854", 1, "text-primary", "font-medium"], ["href", "mailto:Info@seaworldholidays.com", 1, "text-primary", "font-medium"], ["href", "javascript:void(0)", "data-type", "iframe", 1, "video-play-icon", "read-more", "lightbox", "text-primary", "font-medium"], ["href", "javascript:void(0)", "data-type", "iframe", 1, "video-play-icon", "read-more", "lightbox", "text-primary", "font-medium", 3, "click"]], template: function ContactPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "div", 0)(2, "div", 1)(3, "div", 2);
            i0.ɵɵelement(4, "iframe", 3);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(5, "section", 4)(6, "div", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "img", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 9)(11, "div", 10)(12, "div", 11)(13, "h3", 12);
            i0.ɵɵtext(14, "Get in touch !");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "form")(16, "div", 13)(17, "div", 14)(18, "label", 15);
            i0.ɵɵtext(19, "Your Name:");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(20, "input", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 14)(22, "label", 17);
            i0.ɵɵtext(23, "Your Email:");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(24, "input", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 19)(26, "label", 20);
            i0.ɵɵtext(27, "Your Question:");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 19)(30, "label", 22);
            i0.ɵɵtext(31, "Your Comment:");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "textarea", 23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "button", 24);
            i0.ɵɵtext(34, "Send Message");
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵelementStart(35, "div", 25)(36, "div", 26);
            i0.ɵɵrepeaterCreate(37, ContactPage_For_38_Template, 13, 6, "div", 27, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(39, "div", 28)(40, "div", 29);
            i0.ɵɵelement(41, "iframe", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "button", 31);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(43, "svg", 32);
            i0.ɵɵlistener("click", function ContactPage_Template_svg_click_43_listener() { return ctx.toggle(); });
            i0.ɵɵelement(44, "line", 33)(45, "line", 34);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelement(46, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("src", ctx.bg, i0.ɵɵsanitizeUrl);
            i0.ɵɵadvance(28);
            i0.ɵɵrepeater(ctx.contacts);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("fixed", ctx.isActive)("hidden", !ctx.isActive);
        } }, dependencies: [HomeNavbar, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactPage, [{
        type: Component,
        args: [{ selector: 'app-contact-page', imports: [HomeNavbar, FooterOne,], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n<div class=\"container-fluid relative mt-20\">\r\n    <div class=\"grid grid-cols-1\">\r\n        <div class=\"w-full leading-[0] border-0\">\r\n            <iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin\" style=\"border:0\" class=\"w-full h-[500px]\" allowfullscreen></iframe>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<section class=\"relative lg:py-24 py-16\">\r\n    <div class=\"container\">\r\n        <div class=\"grid md:grid-cols-12 grid-cols-1 items-center gap-6\">\r\n            <div class=\"lg:col-span-7 md:col-span-6\">\r\n                <img [src]=\"bg\" class=\"w-full max-w-[500px] mx-auto\" alt=\"\">\r\n            </div>\r\n\r\n            <div class=\"lg:col-span-5 md:col-span-6\">\r\n                <div class=\"lg:ms-5\">\r\n                    <div class=\"bg-white  rounded-md shadow dark:shadow-gray-800 p-6\">\r\n                        <h3 class=\"mb-6 text-2xl leading-normal font-semibold\">Get in touch !</h3>\r\n                        <form>\r\n                            <div class=\"grid lg:grid-cols-12 grid-cols-1 gap-3\">\r\n                                <div class=\"lg:col-span-6\">\r\n                                    <label for=\"name\" class=\"font-semibold\">Your Name:</label>\r\n                                    <input name=\"name\" id=\"name\" type=\"text\" class=\"mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Name :\" required>\r\n                                </div>\r\n\r\n                                <div class=\"lg:col-span-6\">\r\n                                    <label for=\"email\" class=\"font-semibold\">Your Email:</label>\r\n                                    <input name=\"email\" id=\"email\" type=\"email\" class=\"mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Email :\" required>\r\n                                </div>\r\n\r\n                                <div class=\"lg:col-span-12\">\r\n                                    <label for=\"subject\" class=\"font-semibold\">Your Question:</label>\r\n                                    <input name=\"subject\" id=\"subject\" class=\"mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Subject :\" required>\r\n                                </div>\r\n\r\n                                <div class=\"lg:col-span-12\">\r\n                                    <label for=\"comments\" class=\"font-semibold\">Your Comment:</label>\r\n                                    <textarea name=\"comments\" id=\"comments\" class=\"mt-2 w-full py-2 px-3 h-28 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Message :\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                            <button type=\"submit\" id=\"submit\" name=\"send\" class=\"py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md mt-2\">Send Message</button>\r\n                        </form>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"container lg:mt-24 mt-16\">\r\n        <div class=\"grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6\">\r\n            @for (item of contacts; track $index) {\r\n                <div class=\"text-center px-6\">\r\n                    <div class=\"relative text-transparent\">\r\n                        <div class=\"size-20 bg-primary/5 text-primary rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800\">\r\n                            <i [attr.data-feather]=\"item.icon\"></i>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"content mt-7\">\r\n                        <h5 class=\"title h5 text-lg font-semibold\">{{ item.name }}</h5>\r\n                        <p class=\"text-slate-400 mt-3\">{{ item.desc }}</p>\r\n\r\n                        <div class=\"mt-5\">\r\n                            @if (item.status === '+201155011300') {\r\n                                <a href=\"tel:+152534-468-854\" class=\"text-primary font-medium\">{{ item.status }}</a>\r\n                            }\r\n                            @if (item.status === 'Info@seaworldholidays.com') {\r\n                                <a href=\"mailto:Info@seaworldholidays.com\" class=\"text-primary font-medium\">{{ item.status }}</a>\r\n                            }\r\n                            @if (item.status === 'View on Google map') {\r\n                                <a href=\"javascript:void(0)\" (click)=\"toggle()\" data-type=\"iframe\" class=\"video-play-icon read-more lightbox text-primary font-medium\">View on Google map</a>\r\n                            }\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            }\r\n        </div>\r\n    </div>\r\n</section>\r\n<div [class.fixed]=\"isActive\" [class.hidden]=\"!isActive\" class=\"bg-slate-900/[0.9] top-0 left-0 bottom-0 w-[100%] h-[100%] z-999\">\r\n    <div class=\"h-[100%] flex items-center justify-center\">\r\n        <iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d55431.05581015953!2d-95.461302!3d29.735948000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c36647a52ab1%3A0x70a301678672cb!2sBriargrove%20Park%2C%20Houston%2C%20TX%2C%20USA!5e0!3m2!1sen!2sin!4v1710322657489!5m2!1sen!2sin\" width=\"700\" height=\"500\" frameborder=\"0\"></iframe>\r\n    </div>\r\n    <button class=\"text-slate-400 absolute top-[20px] right-[20px]\">\r\n        <svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"size-5\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\" (click)=\"toggle()\">\r\n            <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\r\n            <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\r\n        </svg>\r\n    </button>\r\n</div>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ContactPage, { className: "ContactPage", filePath: "app/features/innerpages/contact-page/contact-page.ts", lineNumber: 12 }); })();
