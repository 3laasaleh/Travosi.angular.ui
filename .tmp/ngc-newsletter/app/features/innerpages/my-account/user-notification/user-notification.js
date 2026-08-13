import { Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import * as i0 from "@angular/core";
export class UserNotification {
    bg = 'assets/images/bg/cta.jpg';
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function UserNotification_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserNotification)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserNotification, selectors: [["app-user-notification"]], decls: 69, vars: 2, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "md:flex"], [1, "lg:w-1/4", "md:w-1/3", "md:px-3"], [1, "lg:w-3/4", "md:w-2/3", "md:px-3", "mt-6", "md:mt-0"], [1, "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white"], [1, "p-6", "border-b", "border-gray-100", "dark:border-gray-700"], [1, "text-lg", "font-semibold"], [1, "p-6"], [1, "flex", "justify-between", "pb-4"], [1, "mb-0", "font-medium"], [1, ""], ["type", "checkbox", "value", "", "id", "noti1", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti1", 1, "form-check-label"], [1, "flex", "justify-between", "py-4", "border-t", "border-gray-100", "dark:border-gray-700"], ["type", "checkbox", "value", "", "checked", "", "id", "noti2", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti2", 1, "form-check-label"], ["type", "checkbox", "value", "", "id", "noti3", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti3", 1, "form-check-label"], ["type", "checkbox", "value", "", "id", "noti4", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti4", 1, "form-check-label"], [1, "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white", "mt-6"], ["type", "checkbox", "value", "", "id", "noti5", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti5", 1, "form-check-label"], ["type", "checkbox", "value", "", "id", "noti6", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti6", 1, "form-check-label"], ["type", "checkbox", "value", "", "checked", "", "id", "noti7", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti7", 1, "form-check-label"], ["type", "checkbox", "value", "", "checked", "", "id", "noti8", 1, "form-checkbox", "size-4", "appearance-none", "rounded", "border", "border-gray-200", "dark:border-gray-800", "accent-red-600", "checked:appearance-auto", "dark:accent-red-600", "focus:border-red-300", "focus:ring-0", "focus:ring-offset-0", "focus:ring-red-200", "focus:ring-opacity-50"], ["for", "noti8", 1, "form-check-label"]], template: function UserNotification_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "app-home-navbar");
            i0.ɵɵelementStart(2, "section", 0)(3, "div", 1);
            i0.ɵɵelement(4, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3)(6, "div", 4)(7, "div", 5);
            i0.ɵɵelement(8, "app-account-tab");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7)(11, "div", 8)(12, "h5", 9);
            i0.ɵɵtext(13, "Account Notifications :");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 10)(15, "div", 11)(16, "h6", 12);
            i0.ɵɵtext(17, "When someone mentions me");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 13);
            i0.ɵɵelement(19, "input", 14)(20, "label", 15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 16)(22, "h6", 12);
            i0.ɵɵtext(23, "When someone follows me");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 13);
            i0.ɵɵelement(25, "input", 17)(26, "label", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 16)(28, "h6", 12);
            i0.ɵɵtext(29, "When shares my activity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 13);
            i0.ɵɵelement(31, "input", 19)(32, "label", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 16)(34, "h6", 12);
            i0.ɵɵtext(35, "When someone messages me");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 13);
            i0.ɵɵelement(37, "input", 21)(38, "label", 22);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(39, "div", 23)(40, "div", 8)(41, "h5", 9);
            i0.ɵɵtext(42, "Marketing Notifications :");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div", 10)(44, "div", 11)(45, "h6", 12);
            i0.ɵɵtext(46, "There is a sale or promotion");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "div", 13);
            i0.ɵɵelement(48, "input", 24)(49, "label", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 16)(51, "h6", 12);
            i0.ɵɵtext(52, "Company news");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 13);
            i0.ɵɵelement(54, "input", 26)(55, "label", 27);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "div", 16)(57, "h6", 12);
            i0.ɵɵtext(58, "Weekly jobs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "div", 13);
            i0.ɵɵelement(60, "input", 28)(61, "label", 29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "div", 16)(63, "h6", 12);
            i0.ɵɵtext(64, "Unsubscribe News");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "div", 13);
            i0.ɵɵelement(66, "input", 30)(67, "label", 31);
            i0.ɵɵelementEnd()()()()()()()()();
            i0.ɵɵelement(68, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
        } }, dependencies: [HomeNavbar, AccountTab, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserNotification, [{
        type: Component,
        args: [{ selector: 'app-user-notification', imports: [HomeNavbar, AccountTab, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <app-home-navbar />\r\n    <section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n        <div class=\"container relative\">\r\n            <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"md:flex\">\r\n                <div class=\"lg:w-1/4 md:w-1/3 md:px-3\">\r\n                    <app-account-tab />\r\n                </div>\r\n\r\n                <div class=\"lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0\">\r\n                    <div class=\"rounded-md shadow dark:shadow-gray-800 bg-white \">\r\n                        <div class=\"p-6 border-b border-gray-100 dark:border-gray-700\">\r\n                            <h5 class=\"text-lg font-semibold\">Account Notifications :</h5>\r\n                        </div>\r\n\r\n                        <div class=\"p-6\">\r\n                            <div class=\"flex justify-between pb-4\">\r\n                                <h6 class=\"mb-0 font-medium\">When someone mentions me</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" id=\"noti1\">\r\n                                    <label class=\"form-check-label\" for=\"noti1\"></label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"flex justify-between py-4 border-t border-gray-100 dark:border-gray-700\">\r\n                                <h6 class=\"mb-0 font-medium\">When someone follows me</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" checked id=\"noti2\">\r\n                                    <label class=\"form-check-label\" for=\"noti2\"></label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"flex justify-between py-4 border-t border-gray-100 dark:border-gray-700\">\r\n                                <h6 class=\"mb-0 font-medium\">When shares my activity</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" id=\"noti3\">\r\n                                    <label class=\"form-check-label\" for=\"noti3\"></label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"flex justify-between py-4 border-t border-gray-100 dark:border-gray-700\">\r\n                                <h6 class=\"mb-0 font-medium\">When someone messages me</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" id=\"noti4\">\r\n                                    <label class=\"form-check-label\" for=\"noti4\"></label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"rounded-md shadow dark:shadow-gray-800 bg-white  mt-6\">\r\n                        <div class=\"p-6 border-b border-gray-100 dark:border-gray-700\">\r\n                            <h5 class=\"text-lg font-semibold\">Marketing Notifications :</h5>\r\n                        </div>\r\n\r\n                        <div class=\"p-6\">\r\n                            <div class=\"flex justify-between pb-4\">\r\n                                <h6 class=\"mb-0 font-medium\">There is a sale or promotion</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" id=\"noti5\">\r\n                                    <label class=\"form-check-label\" for=\"noti5\"></label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"flex justify-between py-4 border-t border-gray-100 dark:border-gray-700\">\r\n                                <h6 class=\"mb-0 font-medium\">Company news</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" id=\"noti6\">\r\n                                    <label class=\"form-check-label\" for=\"noti6\"></label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"flex justify-between py-4 border-t border-gray-100 dark:border-gray-700\">\r\n                                <h6 class=\"mb-0 font-medium\">Weekly jobs</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" checked id=\"noti7\">\r\n                                    <label class=\"form-check-label\" for=\"noti7\"></label>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"flex justify-between py-4 border-t border-gray-100 dark:border-gray-700\">\r\n                                <h6 class=\"mb-0 font-medium\">Unsubscribe News</h6>\r\n                                <div class=\"\">\r\n                                    <input class=\"form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-red-600 checked:appearance-auto dark:accent-red-600 focus:border-red-300 focus:ring-0 focus:ring-offset-0 focus:ring-red-200 focus:ring-opacity-50\" type=\"checkbox\" value=\"\" checked id=\"noti8\">\r\n                                    <label class=\"form-check-label\" for=\"noti8\"></label>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserNotification, { className: "UserNotification", filePath: "app/features/innerpages/my-account/user-notification/user-notification.ts", lineNumber: 13 }); })();
