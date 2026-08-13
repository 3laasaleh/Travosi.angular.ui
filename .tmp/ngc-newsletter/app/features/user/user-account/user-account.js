import { Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { packageData } from '../../../data/data';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import * as i0 from "@angular/core";
export class UserAccount {
    bg = 'assets/images/bg/cta.jpg';
    packageData = packageData.slice(0, 6);
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function UserAccount_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserAccount)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserAccount, selectors: [["app-user-account"]], decls: 9, vars: 2, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "md:flex"], [1, "lg:w-1/4", "md:w-1/3", "md:px-3"]], template: function UserAccount_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0)(2, "div", 1);
            i0.ɵɵelement(3, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "div", 5);
            i0.ɵɵelement(7, "app-account-tab");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelement(8, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
        } }, dependencies: [HomeNavbar, AccountTab, FooterOne], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserAccount, [{
        type: Component,
        args: [{ selector: 'app-user-account', imports: [HomeNavbar, AccountTab, FooterOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n<section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n    <div class=\"container relative\">\r\n        <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n    </div>\r\n\r\n    <div class=\"container relative md:mt-24 mt-16\">\r\n        <div class=\"md:flex\">\r\n            <div class=\"lg:w-1/4 md:w-1/3 md:px-3\">\r\n                <app-account-tab />\r\n            </div>\r\n\r\n\r\n        </div>\r\n    </div>\r\n</section>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserAccount, { className: "UserAccount", filePath: "app/features/user/user-account/user-account.ts", lineNumber: 15 }); })();
