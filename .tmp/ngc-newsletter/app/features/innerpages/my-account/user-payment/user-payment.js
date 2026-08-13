import { Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import * as i0 from "@angular/core";
function UserPayment_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 12)(1, "div", 41);
    i0.ɵɵelement(2, "img", 42);
    i0.ɵɵelementStart(3, "div", 43)(4, "p", 44);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 45);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div")(9, "a", 46);
    i0.ɵɵelement(10, "i", 47);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", item_r1.image, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.date);
} }
export class UserPayment {
    bg = 'assets/images/bg/cta.jpg';
    payments = [
        {
            image: 'assets/images/payments/visa.jpg',
            name: 'Visa ending in 4578',
            date: 'Expires in 12/2022',
        },
        {
            image: 'assets/images/payments/american-express.jpg',
            name: 'American Express ending in 4578',
            date: 'Expires in 12/2022',
        },
        {
            image: 'assets/images/payments/discover.jpg',
            name: 'Discover ending in 4578',
            date: 'Expires in 12/2022',
        },
        {
            image: 'assets/images/payments/mastercard.jpg',
            name: 'Master Card ending in 4578',
            date: 'Expires in 12/2022',
        },
    ];
    ngAfterViewInit() {
        feather.replace();
    }
    showModal() {
        document.getElementById('paymentMethod')?.showModal();
    }
    static ɵfac = function UserPayment_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserPayment)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserPayment, selectors: [["app-user-payment"]], decls: 105, vars: 2, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "md:flex"], [1, "lg:w-1/4", "md:w-1/3", "md:px-3"], [1, "lg:w-3/4", "md:w-2/3", "md:px-3", "mt-6", "md:mt-0"], [1, "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white"], [1, "p-6", "border-b", "border-gray-100", "dark:border-gray-700"], [1, "text-xl", "font-semibold"], [1, "text-slate-400", "mt-2"], [1, "px-6"], [1, "flex", "ms-0", "justify-between", "items-center", "py-6"], [1, "py-6", "ms-0", "border-t", "border-gray-100", "dark:border-gray-700"], ["href", "javascript:void(0)", 1, "py-2", "px-5", "inline-block", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", 3, "click"], ["id", "paymentMethod", 1, "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white", "text-slate-900"], [1, "relative", "w-full", "h-auto", "max-w-md"], [1, "flex", "justify-between", "items-center", "px-6", "py-4", "border-b", "border-gray-100", "dark:border-gray-700"], [1, "font-bold", "text-lg"], ["method", "dialog"], [1, "size-6", "flex", "justify-center", "items-center", "shadow", "dark:shadow-gray-800", "rounded-md", "btn-ghost"], ["data-feather", "x", 1, "size-4"], [1, "p-6", "text-center"], [1, "grid", "md:grid-cols-12", "grid-cols-1", "gap-4"], [1, "md:col-span-12"], [1, "text-start"], ["for", "name", 1, "font-semibold"], ["name", "name", "id", "name", "type", "text", "required", "", "placeholder", "Name :", 1, "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], [1, "lg:col-span-6"], ["for", "ex_month", 1, "form-label", "font-medium"], ["id", "ex_month", 1, "form-select", "form-input", "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "ex_year", 1, "form-label", "font-medium"], ["id", "ex_year", 1, "form-select", "form-input", "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "card_number", 1, "font-semibold"], ["name", "number", "id", "card_number", "type", "number", "required", "", "placeholder", "number :", 1, "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "cvv_number", 1, "font-semibold"], ["name", "number", "id", "cvv_number", "type", "number", "required", "", "placeholder", "number :", 1, "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["for", "card_names", 1, "form-label", "font-medium"], ["id", "card_names", 1, "form-select", "form-input", "mt-2", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], [1, "mt-4"], ["type", "submit", "id", "submit", "name", "send", 1, "py-2", "px-5", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "justify-center", "flex", "items-center"], [1, "flex", "items-center"], ["alt", "", 1, "rounded", "shadow", "dark:shadow-gray-800", "w-12", 3, "src"], [1, "ms-3"], [1, "font-semibold"], [1, "text-slate-400", "text-sm"], ["href", "javascript:void(0)", 1, "size-9", "inline-flex", "items-center", "justify-center", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary-600/5", "hover:bg-primary-600", "text-primary-600", "hover:text-white", "rounded-full"], ["data-feather", "trash-2", 1, "h-4", "w-4"]], template: function UserPayment_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0)(2, "div", 1);
            i0.ɵɵelement(3, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "div", 5);
            i0.ɵɵelement(7, "app-account-tab");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6)(9, "div", 7)(10, "div", 8)(11, "h5", 9);
            i0.ɵɵtext(12, "Payment Methods");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p", 10);
            i0.ɵɵtext(14, "Primary payment method is used by default");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 11)(16, "ul");
            i0.ɵɵrepeaterCreate(17, UserPayment_For_18_Template, 11, 3, "li", 12, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementStart(19, "li", 13)(20, "a", 14);
            i0.ɵɵlistener("click", function UserPayment_Template_a_click_20_listener() { return ctx.showModal(); });
            i0.ɵɵtext(21, "Add Payment Method");
            i0.ɵɵelementEnd()()()()()()()()();
            i0.ɵɵelementStart(22, "dialog", 15)(23, "div", 16)(24, "div", 17)(25, "h3", 18);
            i0.ɵɵtext(26, "Add Payment Method");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "form", 19)(28, "button", 20);
            i0.ɵɵelement(29, "i", 21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(30, "div", 22)(31, "form")(32, "div", 23)(33, "div", 24)(34, "div", 25)(35, "label", 26);
            i0.ɵɵtext(36, "Your Name :");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(37, "input", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 28)(39, "div", 25)(40, "label", 29);
            i0.ɵɵtext(41, "Month :");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "select", 30)(43, "option");
            i0.ɵɵtext(44, "Jan");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "option");
            i0.ɵɵtext(46, "Feb");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "option");
            i0.ɵɵtext(48, "Mar");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "option");
            i0.ɵɵtext(50, "Apr");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "option");
            i0.ɵɵtext(52, "May");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "option");
            i0.ɵɵtext(54, "June");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "option");
            i0.ɵɵtext(56, "July");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "option");
            i0.ɵɵtext(58, "Aug");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "option");
            i0.ɵɵtext(60, "Sep");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "option");
            i0.ɵɵtext(62, "Oct");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "option");
            i0.ɵɵtext(64, "Nov");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "option");
            i0.ɵɵtext(66, "Dec");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(67, "div", 28)(68, "div", 25)(69, "label", 31);
            i0.ɵɵtext(70, "Year :");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "select", 32)(72, "option");
            i0.ɵɵtext(73, "2022");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "option");
            i0.ɵɵtext(75, "2023");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "option");
            i0.ɵɵtext(77, "2024");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "option");
            i0.ɵɵtext(79, "2025");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(80, "div", 28)(81, "div", 25)(82, "label", 33);
            i0.ɵɵtext(83, "Card no. :");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(84, "input", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "div", 28)(86, "div", 25)(87, "label", 35);
            i0.ɵɵtext(88, "CVV :");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(89, "input", 36);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(90, "div", 24)(91, "div", 25)(92, "label", 37);
            i0.ɵɵtext(93, "Cards :");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "select", 38)(95, "option");
            i0.ɵɵtext(96, "Visa");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "option");
            i0.ɵɵtext(98, "Ame. Express");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "option");
            i0.ɵɵtext(100, "Master");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(101, "div", 39)(102, "button", 40);
            i0.ɵɵtext(103, "Add Card");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelement(104, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(14);
            i0.ɵɵrepeater(ctx.payments);
        } }, dependencies: [HomeNavbar, AccountTab, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserPayment, [{
        type: Component,
        args: [{ selector: 'app-user-payment', imports: [HomeNavbar, AccountTab, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n<section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n    <div class=\"container relative\">\r\n        <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n    </div>\r\n\r\n    <div class=\"container relative md:mt-24 mt-16\">\r\n        <div class=\"md:flex\">\r\n            <div class=\"lg:w-1/4 md:w-1/3 md:px-3\">\r\n                <app-account-tab />\r\n            </div>\r\n\r\n            <div class=\"lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0\">\r\n                <div class=\"rounded-md shadow dark:shadow-gray-800 bg-white \">\r\n                    <div class=\"p-6 border-b border-gray-100 dark:border-gray-700\">\r\n                        <h5 class=\"text-xl font-semibold\">Payment Methods</h5>\r\n                        <p class=\"text-slate-400 mt-2\">Primary payment method is used by default</p>\r\n                    </div>\r\n\r\n                    <div class=\"px-6\">\r\n                        <ul>\r\n                            @for (item of payments; track $index) {\r\n                                <li class=\"flex ms-0 justify-between items-center py-6\">\r\n                                    <div class=\"flex items-center\">\r\n                                        <img [src]=\"item.image\" class=\"rounded shadow dark:shadow-gray-800 w-12\" alt=\"\">\r\n\r\n                                        <div class=\"ms-3\">\r\n                                            <p class=\"font-semibold\">{{ item.name }}</p>\r\n                                            <p class=\"text-slate-400 text-sm\">{{ item.date }}</p>\r\n                                        </div>\r\n                                    </div>\r\n\r\n                                    <div>\r\n                                        <a href=\"javascript:void(0)\" class=\"size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center bg-primary-600/5 hover:bg-primary-600 text-primary-600 hover:text-white rounded-full\"><i data-feather=\"trash-2\" class=\"h-4 w-4\"></i></a>\r\n                                    </div>\r\n                                </li>\r\n                            }\r\n                            <li class=\"py-6 ms-0 border-t border-gray-100 dark:border-gray-700\">\r\n                                <a href=\"javascript:void(0)\" (click)=\"showModal()\" class=\"py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md\">Add Payment Method</a>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n\r\n<dialog id=\"paymentMethod\" class=\"rounded-md shadow dark:shadow-gray-800 bg-white  text-slate-900 \">\r\n    <div class=\"relative w-full h-auto max-w-md\">\r\n        <div class=\"flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-700\">\r\n            <h3 class=\"font-bold text-lg\">Add Payment Method</h3>\r\n            <form method=\"dialog\">\r\n                <button class=\"size-6 flex justify-center items-center shadow dark:shadow-gray-800 rounded-md btn-ghost\"><i data-feather=\"x\" class=\"size-4\"></i></button>\r\n            </form>\r\n        </div>\r\n        <div class=\"p-6 text-center\">\r\n            <form>\r\n                <div class=\"grid md:grid-cols-12 grid-cols-1 gap-4\">\r\n                    <div class=\"md:col-span-12\">\r\n                        <div class=\"text-start\">\r\n                            <label for=\"name\" class=\"font-semibold\">Your Name :</label>\r\n                            <input name=\"name\" id=\"name\" type=\"text\" class=\"mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" required placeholder=\"Name :\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"lg:col-span-6\">\r\n                        <div class=\"text-start\">\r\n                            <label for=\"ex_month\" class=\"form-label font-medium\">Month :</label>\r\n                            <select id=\"ex_month\" class=\"form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\">\r\n                                <option>Jan</option>\r\n                                <option>Feb</option>\r\n                                <option>Mar</option>\r\n                                <option>Apr</option>\r\n                                <option>May</option>\r\n                                <option>June</option>\r\n                                <option>July</option>\r\n                                <option>Aug</option>\r\n                                <option>Sep</option>\r\n                                <option>Oct</option>\r\n                                <option>Nov</option>\r\n                                <option>Dec</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"lg:col-span-6\">\r\n                        <div class=\"text-start\">\r\n                            <label for=\"ex_year\" class=\"form-label font-medium\">Year :</label>\r\n                            <select id=\"ex_year\" class=\"form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\">\r\n                                <option>2022</option>\r\n                                <option>2023</option>\r\n                                <option>2024</option>\r\n                                <option>2025</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"lg:col-span-6\">\r\n                        <div class=\"text-start\">\r\n                            <label for=\"card_number\" class=\"font-semibold\">Card no. :</label>\r\n                            <input name=\"number\" id=\"card_number\" type=\"number\" class=\"mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" required placeholder=\"number :\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"lg:col-span-6\">\r\n                        <div class=\"text-start\">\r\n                            <label for=\"cvv_number\" class=\"font-semibold\">CVV :</label>\r\n                            <input name=\"number\" id=\"cvv_number\" type=\"number\" class=\"mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" required placeholder=\"number :\">\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"md:col-span-12\">\r\n                        <div class=\"text-start\">\r\n                            <label for=\"card_names\" class=\"form-label font-medium\">Cards :</label>\r\n                            <select id=\"card_names\" class=\"form-select form-input mt-2 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\">\r\n                                <option>Visa</option>\r\n                                <option>Ame. Express</option>\r\n                                <option>Master</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"mt-4\">\r\n                    <button type=\"submit\" id=\"submit\" name=\"send\" class=\"py-2 px-5 font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md justify-center flex items-center\">Add Card</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</dialog>\r\n\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserPayment, { className: "UserPayment", filePath: "app/features/innerpages/my-account/user-payment/user-payment.ts", lineNumber: 13 }); })();
