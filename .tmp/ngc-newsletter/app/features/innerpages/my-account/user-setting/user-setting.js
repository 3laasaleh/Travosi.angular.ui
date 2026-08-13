import { Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
function UserSetting_For_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label", 12);
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "span", 23);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 13);
    i0.ɵɵelement(6, "i", 24)(7, "input", 25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.name2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-feather", item_r1.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", item_r1.placeholder);
} }
function UserSetting_For_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label", 12);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 13);
    i0.ɵɵelement(4, "i", 24)(5, "input", 26);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-feather", item_r2.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("placeholder", item_r2.placeholder);
} }
function UserSetting_For_42_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "label", 12);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 13);
    i0.ɵɵelement(4, "i", 24)(5, "input", 27);
    i0.ɵɵelementStart(6, "button", 28);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵlistener("click", function UserSetting_For_42_Template_button_click_6_listener() { const $index_r4 = i0.ɵɵrestoreView(_r3).$index; const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.togglePasswordVisibility($index_r4)); });
    i0.ɵɵelement(8, "i", 29);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-feather", item_r6.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("type", ctx_r4.passwordVisibility[$index_r4] ? "text" : "password")("placeholder", item_r6.placeholder);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(7, 10, ctx_r4.passwordVisibility[$index_r4] ? "hidePassword" : "showPassword"))("aria-pressed", ctx_r4.passwordVisibility[$index_r4]);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-eye-off-outline", ctx_r4.passwordVisibility[$index_r4])("mdi-eye-outline", !ctx_r4.passwordVisibility[$index_r4]);
} }
export class UserSetting {
    bg = 'assets/images/bg/cta.jpg';
    details = [
        { name: 'First Name : ', name2: '*', icon: 'user', placeholder: 'First Name:' },
        { name: 'Last Name : ', name2: '*', icon: 'user-check', placeholder: 'Last Name:' },
        { name: 'Your Email : ', name2: '*', icon: 'mail', placeholder: 'Email' },
        { name: 'Occupation : ', name2: '', icon: 'bookmark', placeholder: 'Occupation :' },
    ];
    details2 = [
        { name: 'Phone No. :', icon: 'phone', placeholder: 'Phone :' },
        { name: 'Website :', icon: 'globe', placeholder: 'Url :' },
    ];
    details3 = [
        { name: 'Old password :', icon: 'key', placeholder: 'Old password' },
        { name: 'New password :', icon: 'key', placeholder: 'New password' },
        { name: 'Re-type New password :', icon: 'key', placeholder: 'Re-type New password' },
    ];
    passwordVisibility = this.details3.map(() => false);
    togglePasswordVisibility(index) {
        this.passwordVisibility[index] = !this.passwordVisibility[index];
    }
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function UserSetting_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserSetting)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserSetting, selectors: [["app-user-setting"]], decls: 53, vars: 2, consts: [[1, "relative", "lg:pb-24", "pb-16", "md:mt-[84px]", "mt-[70px]"], [1, "container", "relative"], [1, "relative", "overflow-hidden", "md:rounded-md", "shadow", "dark:shadow-gray-800", "h-52", "bg-center", "bg-no-repeat", "bg-cover"], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "md:flex"], [1, "lg:w-1/4", "md:w-1/3", "md:px-3"], [1, "lg:w-3/4", "md:w-2/3", "md:px-3", "mt-6", "md:mt-0"], [1, "p-6", "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white"], [1, "text-lg", "font-semibold", "mb-4"], [1, "grid", "lg:grid-cols-2", "grid-cols-1", "gap-5"], [1, "grid", "grid-cols-1"], [1, "mt-5"], [1, "form-label", "font-medium"], [1, "form-icon", "relative", "mt-2"], ["data-feather", "message-circle", 1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["name", "comments", "id", "comments", "placeholder", "Message :", 1, "ps-11", "w-full", "py-2", "px-3", "h-28", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["type", "submit", "id", "submit", "name", "send", "value", "Save Changes", 1, "py-2", "px-5", "inline-block", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "mt-5"], [1, "p-6", "rounded-md", "shadow", "dark:shadow-gray-800", "bg-white", "mt-6"], [1, "grid", "grid-cols-1", "gap-5"], [1, "py-2", "px-5", "inline-block", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "mt-5"], [1, "text-lg", "font-semibold", "mb-5", "text-primary-600"], [1, "text-slate-400", "mb-4"], ["href", "javascript:void(0)", 1, "py-2", "px-5", "inline-block", "font-semibold", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary-600", "text-white", "rounded-md"], [1, "text-primary-600"], [1, "w-4", "h-4", "absolute", "top-3", "start-4"], ["type", "text", "name", "name", "required", "", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["name", "number", "type", "number", 1, "ps-12", "w-full", "py-2", "px-3", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0", 3, "placeholder"], ["required", "", 1, "ps-12", "pe-12", "w-full", "py-2", "h-10", "bg-transparent", "rounded", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", 3, "type", "placeholder"], ["type", "button", 1, "absolute", "end-1", "top-1/2", "z-10", "grid", "size-9", "-translate-y-1/2", "place-items-center", "rounded-md", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["aria-hidden", "true", 1, "mdi", "text-xl"]], template: function UserSetting_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div");
            i0.ɵɵelement(1, "app-home-navbar");
            i0.ɵɵelementStart(2, "section", 0)(3, "div", 1);
            i0.ɵɵelement(4, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3)(6, "div", 4)(7, "div", 5);
            i0.ɵɵelement(8, "app-account-tab");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7)(11, "h5", 8);
            i0.ɵɵtext(12, "Personal Detail :");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "form")(14, "div", 9);
            i0.ɵɵrepeaterCreate(15, UserSetting_For_16_Template, 8, 4, "div", null, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 10)(18, "div", 11)(19, "label", 12);
            i0.ɵɵtext(20, "Description : ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 13);
            i0.ɵɵelement(22, "i", 14)(23, "textarea", 15);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(24, "input", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 17)(26, "div", 9)(27, "div")(28, "h5", 8);
            i0.ɵɵtext(29, "Contact Info :");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "form")(31, "div", 18);
            i0.ɵɵrepeaterCreate(32, UserSetting_For_33_Template, 6, 3, "div", null, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "button", 19);
            i0.ɵɵtext(35, "Add");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "div")(37, "h5", 8);
            i0.ɵɵtext(38, "Change password :");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "form")(40, "div", 18);
            i0.ɵɵrepeaterCreate(41, UserSetting_For_42_Template, 9, 12, "div", null, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "button", 19);
            i0.ɵɵtext(44, "Save password");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(45, "div", 17)(46, "h5", 20);
            i0.ɵɵtext(47, "Delete Account :");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "p", 21);
            i0.ɵɵtext(49, "Do you want to delete the account? Please press below \"Delete\" button");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "a", 22);
            i0.ɵɵtext(51, "Delete");
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵelement(52, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("background-image", "url(" + ctx.bg + ")");
            i0.ɵɵadvance(11);
            i0.ɵɵrepeater(ctx.details);
            i0.ɵɵadvance(17);
            i0.ɵɵrepeater(ctx.details2);
            i0.ɵɵadvance(9);
            i0.ɵɵrepeater(ctx.details3);
        } }, dependencies: [HomeNavbar, AccountTab, FooterOne, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserSetting, [{
        type: Component,
        args: [{ selector: 'app-user-setting', imports: [HomeNavbar, AccountTab, FooterOne, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div>\r\n    <app-home-navbar />\r\n    <section class=\"relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]\">\r\n        <div class=\"container relative\">\r\n            <div class=\"relative overflow-hidden md:rounded-md shadow dark:shadow-gray-800 h-52 bg-center bg-no-repeat bg-cover\" [style.background-image]=\"'url(' + bg + ')'\"></div>\r\n        </div>\r\n\r\n        <div class=\"container relative md:mt-24 mt-16\">\r\n            <div class=\"md:flex\">\r\n                <div class=\"lg:w-1/4 md:w-1/3 md:px-3\">\r\n                    <app-account-tab />\r\n                </div>\r\n\r\n                <div class=\"lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0\">\r\n                    <div class=\"p-6 rounded-md shadow dark:shadow-gray-800 bg-white \">\r\n                        <h5 class=\"text-lg font-semibold mb-4\">Personal Detail :</h5>\r\n                        <form>\r\n                            <div class=\"grid lg:grid-cols-2 grid-cols-1 gap-5\">\r\n                                @for (item of details; track $index) {\r\n                                    <div>\r\n                                        <label class=\"form-label font-medium\">{{ item.name }}<span class=\"text-primary-600\">{{ item.name2 }}</span></label>\r\n                                        <div class=\"form-icon relative mt-2\">\r\n                                            <i [attr.data-feather]=\"item.icon\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                            <input type=\"text\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" [placeholder]=\"item.placeholder\" name=\"name\" required=\"\">\r\n                                        </div>\r\n                                    </div>\r\n                                }\r\n                            </div>\r\n\r\n                            <div class=\"grid grid-cols-1\">\r\n                                <div class=\"mt-5\">\r\n                                    <label class=\"form-label font-medium\">Description : </label>\r\n                                    <div class=\"form-icon relative mt-2\">\r\n                                        <i data-feather=\"message-circle\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                        <textarea name=\"comments\" id=\"comments\" class=\"ps-11 w-full py-2 px-3 h-28 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Message :\"></textarea>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n\r\n                            <input type=\"submit\" id=\"submit\" name=\"send\" class=\"py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md mt-5\" value=\"Save Changes\">\r\n                        </form>\r\n                    </div>\r\n\r\n                    <div class=\"p-6 rounded-md shadow dark:shadow-gray-800 bg-white  mt-6\">\r\n                        <div class=\"grid lg:grid-cols-2 grid-cols-1 gap-5\">\r\n                            <div>\r\n                                <h5 class=\"text-lg font-semibold mb-4\">Contact Info :</h5>\r\n\r\n                                <form>\r\n                                    <div class=\"grid grid-cols-1 gap-5\">\r\n                                        @for (item of details2; track $index) {\r\n                                            <div>\r\n                                                <label class=\"form-label font-medium\">{{ item.name }}</label>\r\n                                                <div class=\"form-icon relative mt-2\">\r\n                                                    <i [attr.data-feather]=\"item.icon\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                                    <input name=\"number\" type=\"number\" class=\"ps-12 w-full py-2 px-3 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" [placeholder]=\"item.placeholder\">\r\n                                                </div>\r\n                                            </div>\r\n                                        }\r\n                                    </div>\r\n\r\n                                    <button class=\"py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md mt-5\">Add</button>\r\n                                </form>\r\n                            </div>\r\n\r\n                            <div>\r\n                                <h5 class=\"text-lg font-semibold mb-4\">Change password :</h5>\r\n                                <form>\r\n                                    <div class=\"grid grid-cols-1 gap-5\">\r\n                                        @for (item of details3; track $index) {\r\n                                            <div>\r\n                                                <label class=\"form-label font-medium\">{{ item.name }}</label>\r\n                                                <div class=\"form-icon relative mt-2\">\r\n                                                    <i [attr.data-feather]=\"item.icon\" class=\"w-4 h-4 absolute top-3 start-4\"></i>\r\n                                                    <input [type]=\"passwordVisibility[$index] ? 'text' : 'password'\" class=\"ps-12 pe-12 w-full py-2 h-10 bg-transparent   rounded outline-none border border-gray-100 dark:border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20\" [placeholder]=\"item.placeholder\" required>\r\n                                                    <button type=\"button\" (click)=\"togglePasswordVisibility($index)\" class=\"absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-primary dark:hover:bg-slate-800\" [attr.aria-label]=\"(passwordVisibility[$index] ? 'hidePassword' : 'showPassword') | translate\" [attr.aria-pressed]=\"passwordVisibility[$index]\"><i class=\"mdi text-xl\" [class.mdi-eye-off-outline]=\"passwordVisibility[$index]\" [class.mdi-eye-outline]=\"!passwordVisibility[$index]\" aria-hidden=\"true\"></i></button>\r\n                                                </div>\r\n                                            </div>\r\n                                        }\r\n                                    </div>\r\n\r\n                                    <button class=\"py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md mt-5\">Save password</button>\r\n                                </form>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"p-6 rounded-md shadow dark:shadow-gray-800 bg-white  mt-6\">\r\n                        <h5 class=\"text-lg font-semibold mb-5 text-primary-600\">Delete Account :</h5>\r\n\r\n                        <p class=\"text-slate-400 mb-4\">Do you want to delete the account? Please press below \"Delete\" button</p>\r\n\r\n                        <a href=\"javascript:void(0)\" class=\"py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-primary-600 text-white rounded-md\">Delete</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n</div>\r\n<app-footer-one />\r\n\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserSetting, { className: "UserSetting", filePath: "app/features/innerpages/my-account/user-setting/user-setting.ts", lineNumber: 14 }); })();
