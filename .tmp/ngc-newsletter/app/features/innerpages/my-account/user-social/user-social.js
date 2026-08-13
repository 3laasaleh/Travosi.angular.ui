import { Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import * as i0 from "@angular/core";
function UserSocial_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 11)(2, "span", 12);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 13)(5, "form")(6, "div", 14);
    i0.ɵɵelement(7, "i", 20)(8, "input", 21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 17);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.name);
    i0.ɵɵadvance(4);
    i0.ɵɵattribute("data-feather", item_r1.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", item_r1.placeholder);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.desc);
} }
export class UserSocial {
    bg = 'assets/images/bg/cta.jpg';
    socials = [
        {
            name: 'Facebook',
            icon: 'facebook',
            placeholder: 'Facebook Profile Name',
            desc: 'Add your Facebook username (e.g. jesus).',
        },
        {
            name: 'Instagram',
            icon: 'instagram',
            placeholder: 'Instagram Profile Name',
            desc: 'Add your Instagram username (e.g. jesus).',
        },
        {
            name: 'Linkedin',
            icon: 'linkedin',
            placeholder: 'Linkedin Profile Name',
            desc: 'Add your Linkedin username.',
        },
        { name: 'Youtube', icon: 'youtube', placeholder: 'Youtube url', desc: 'Add your Youtube url.' },
    ];
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function UserSocial_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserSocial)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserSocial, selectors: [["app-user-social"]], decls: 34, vars: 2, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "md:flex"], [1, "lg:w-1/4", "md:w-1/3", "md:px-3"], [1, "lg:w-3/4", "md:w-2/3", "md:px-3", "mt-6", "md:mt-0"], [1, "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white", "mt-6"], [1, "p-6", "border-b", "border-gray-100", "dark:border-gray-700"], [1, "text-lg", "font-semibold"], [1, "p-6"], [1, "md:w-1/3"], [1, "font-medium"], [1, "md:w-2/3", "mt-4", "md:mt-0"], [1, "form-icon", "relative"], ["data-feather", "twitter", 1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["type", "text", "placeholder", "Twitter Profile Name", "id", "twitter_name", "name", "name", "required", "", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], [1, "text-slate-400", "mt-1"], [1, "md:flex", "mt-8"], [1, "py-2", "px-5", "inline-block", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "mt-5"], [1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["type", "text", "name", "name", "required", "", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"]], template: function UserSocial_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "app-home-navbar");
            i0.ɵɵelementStart(2, "section", 0)(3, "div", 1);
            i0.ɵɵelement(4, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3)(6, "div", 4)(7, "div", 5);
            i0.ɵɵelement(8, "app-account-tab");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7)(11, "div", 8)(12, "h5", 9);
            i0.ɵɵtext(13, "Social Profiles :");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 10)(15, "div", 4)(16, "div", 11)(17, "span", 12);
            i0.ɵɵtext(18, "Twitter");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 13)(20, "form")(21, "div", 14);
            i0.ɵɵelement(22, "i", 15)(23, "input", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "p", 17);
            i0.ɵɵtext(25, "Add your Twitter username (e.g. jesus).");
            i0.ɵɵelementEnd()()();
            i0.ɵɵrepeaterCreate(26, UserSocial_For_27_Template, 11, 4, "div", 18, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementStart(28, "div", 4)(29, "div", 11);
            i0.ɵɵelement(30, "span", 12);
            i0.ɵɵelementStart(31, "button", 19);
            i0.ɵɵtext(32, "Save Social Profile");
            i0.ɵɵelementEnd()()()()()()()()()();
            i0.ɵɵelement(33, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(22);
            i0.ɵɵrepeater(ctx.socials);
        } }, dependencies: [HomeNavbar, AccountTab, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserSocial, [{
        type: Component,
        args: [{ selector: 'app-user-social', imports: [HomeNavbar, AccountTab, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <app-home-navbar />\r\n\r\n    <section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n        <div class=\"container relative\">\r\n            <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"md:flex\">\r\n                <div class=\"lg:w-1/4 md:w-1/3 md:px-3\">\r\n                    <app-account-tab />\r\n                </div>\r\n\r\n                <div class=\"lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0\">\r\n                    <div class=\"rounded-md shadow dark:shadow-gray-800 bg-white  mt-6\">\r\n                        <div class=\"p-6 border-b border-gray-100 dark:border-gray-700\">\r\n                            <h5 class=\"text-lg font-semibold\">Social Profiles :</h5>\r\n                        </div>\r\n\r\n                        <div class=\"p-6\">\r\n                            <div class=\"md:flex\">\r\n                                <div class=\"md:w-1/3\">\r\n                                    <span class=\"font-medium\">Twitter</span>\r\n                                </div>\r\n\r\n                                <div class=\"md:w-2/3 mt-4 md:mt-0\">\r\n                                    <form>\r\n                                        <div class=\"form-icon relative\">\r\n                                            <i data-feather=\"twitter\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                            <input type=\"text\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Twitter Profile Name\" id=\"twitter_name\" name=\"name\" required=\"\">\r\n                                        </div>\r\n                                    </form>\r\n\r\n                                    <p class=\"text-slate-400 mt-1\">Add your Twitter username (e.g. jesus).</p>\r\n                                </div>\r\n                            </div>\r\n                            @for (item of socials; track $index) {\r\n                                <div class=\"md:flex mt-8\">\r\n                                    <div class=\"md:w-1/3\">\r\n                                        <span class=\"font-medium\">{{ item.name }}</span>\r\n                                    </div>\r\n\r\n                                    <div class=\"md:w-2/3 mt-4 md:mt-0\">\r\n                                        <form>\r\n                                            <div class=\"form-icon relative\">\r\n                                                <i [attr.data-feather]=\"item.icon\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                                <input type=\"text\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" [placeholder]=\"item.placeholder\" name=\"name\" required=\"\">\r\n                                            </div>\r\n                                        </form>\r\n\r\n                                        <p class=\"text-slate-400 mt-1\">{{ item.desc }}</p>\r\n                                    </div>\r\n                                </div>\r\n                            }\r\n                            <div class=\"md:flex\">\r\n                                <div class=\"md:w-1/3\">\r\n                                    <span class=\"font-medium\"></span>\r\n                                    <button class=\"py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md mt-5\">Save Social Profile</button>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserSocial, { className: "UserSocial", filePath: "app/features/innerpages/my-account/user-social/user-social.ts", lineNumber: 13 }); })();
