import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function TeamOne_Conditional_6_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 5);
    i0.ɵɵdomElement(1, "div", 6)(2, "div", 7)(3, "div", 8);
    i0.ɵɵdomElementEnd();
} }
function TeamOne_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, TeamOne_Conditional_6_For_1_Template, 4, 0, "div", 5, i0.ɵɵrepeaterTrackByIdentity);
} if (rf & 2) {
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function TeamOne_Conditional_7_For_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "img", 22);
    i0.ɵɵdomListener("error", function TeamOne_Conditional_7_For_1_Conditional_3_Template_img_error_0_listener() { i0.ɵɵrestoreView(_r1); const item_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.showAvatarIcon(item_r2.id)); });
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵdomProperty("src", item_r2.image, i0.ɵɵsanitizeUrl)("alt", item_r2.name);
} }
function TeamOne_Conditional_7_For_1_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElement(0, "i", 23);
    i0.ɵɵdomElementStart(1, "span", 24);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.name);
} }
function TeamOne_Conditional_7_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 9)(1, "div", 11)(2, "div", 12);
    i0.ɵɵconditionalCreate(3, TeamOne_Conditional_7_For_1_Conditional_3_Template, 1, 2, "img", 13)(4, TeamOne_Conditional_7_For_1_Conditional_4_Template, 3, 1);
    i0.ɵɵdomElement(5, "div", 14);
    i0.ɵɵdomElementStart(6, "ul", 15)(7, "li", 16)(8, "a", 17);
    i0.ɵɵdomElement(9, "i", 18);
    i0.ɵɵdomElementEnd()()()();
    i0.ɵɵdomElementStart(10, "div", 19)(11, "a", 20);
    i0.ɵɵtext(12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "p", 21);
    i0.ɵɵtext(14);
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r2.hasProfileImage(item_r2) ? 3 : 4);
    i0.ɵɵadvance(5);
    i0.ɵɵdomProperty("href", "mailto:" + item_r2.email, i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("aria-label", item_r2.email);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r2.position);
} }
function TeamOne_Conditional_7_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noAgentsFound"));
} }
function TeamOne_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, TeamOne_Conditional_7_For_1_Template, 15, 5, "div", 9, _forTrack0, false, TeamOne_Conditional_7_ForEmpty_2_Template, 3, 3, "p", 10);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r2.teamData);
} }
export class TeamOne {
    teamData = [];
    isLoading = false;
    failedImageIds = new Set();
    hasProfileImage(member) {
        return Boolean(member.image) && !this.failedImageIds.has(member.id);
    }
    showAvatarIcon(memberId) {
        this.failedImageIds = new Set(this.failedImageIds).add(memberId);
    }
    static ɵfac = function TeamOne_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeamOne)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeamOne, selectors: [["app-team-one"]], inputs: { teamData: "teamData", isLoading: "isLoading" }, decls: 8, vars: 1, consts: [[1, "container", "relative"], [1, "grid", "grid-cols-1", "pb-6", "text-center"], [1, "mb-6", "md:text-3xl", "text-2xl", "md:leading-normal", "leading-normal", "font-semibold"], [1, "text-slate-400", "max-w-xl", "mx-auto"], [1, "grid", "md:grid-cols-12", "grid-cols-1", "mt-8", "gap-[30px]"], ["aria-hidden", "true", 1, "lg:col-span-3", "md:col-span-6", "text-center"], [1, "mx-auto", "h-52", "w-52", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "mx-auto", "mt-4", "h-5", "w-32", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "mx-auto", "mt-2", "h-4", "w-20", "animate-pulse", "rounded-full", "bg-slate-100"], [1, "lg:col-span-3", "md:col-span-6"], [1, "col-span-full", "py-8", "text-center", "text-sm", "text-slate-500"], [1, "group", "text-center"], [1, "relative", "inline-flex", "mx-auto", "h-52", "w-52", "items-center", "justify-center", "overflow-hidden", "rounded-full", "bg-slate-100"], [1, "h-full", "w-full", "object-cover", 3, "src", "alt"], [1, "absolute", "inset-0", "bg-gradient-to-b", "from-transparent", "to-black", "h-52", "w-52", "rounded-full", "opacity-0", "group-hover:opacity-100", "duration-500"], [1, "list-none", "absolute", "start-0", "end-0", "-bottom-20", "group-hover:bottom-5", "duration-500"], [1, "inline"], [1, "size-8", "inline-flex", "items-center", "justify-center", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "rounded-md", "border", "border-primary", "bg-primary", "text-white", 3, "href"], [1, "mdi", "mdi-email-outline"], [1, "content", "mt-3"], ["href", "javascript:void(0)", 1, "text-lg", "font-semibold", "hover:text-primary", "duration-500"], [1, "text-slate-400"], [1, "h-full", "w-full", "object-cover", 3, "error", "src", "alt"], ["aria-hidden", "true", 1, "mdi", "mdi-account", "text-8xl", "text-slate-400"], [1, "sr-only"]], template: function TeamOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
            i0.ɵɵtext(3, "Our Team");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElement(4, "p", 3);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "div", 4);
            i0.ɵɵconditionalCreate(6, TeamOne_Conditional_6_Template, 2, 1)(7, TeamOne_Conditional_7_Template, 3, 1);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵconditional(ctx.isLoading ? 6 : 7);
        } }, dependencies: [TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeamOne, [{
        type: Component,
        args: [{ selector: 'app-team-one', imports: [TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"container relative\">\n    <div class=\"grid grid-cols-1 pb-6 text-center\">\n        <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">Our Team</h3>\n        <p class=\"text-slate-400 max-w-xl mx-auto\"></p>\n    </div>\n\n    <div class=\"grid md:grid-cols-12 grid-cols-1 mt-8 gap-[30px]\">\n        @if (isLoading) {\n            @for (item of [1, 2, 3, 4]; track item) {\n                <div class=\"lg:col-span-3 md:col-span-6 text-center\" aria-hidden=\"true\">\n                    <div class=\"mx-auto h-52 w-52 animate-pulse rounded-full bg-slate-200\"></div>\n                    <div class=\"mx-auto mt-4 h-5 w-32 animate-pulse rounded-full bg-slate-200\"></div>\n                    <div class=\"mx-auto mt-2 h-4 w-20 animate-pulse rounded-full bg-slate-100\"></div>\n                </div>\n            }\n        } @else {\n        @for (item of teamData; track item.id) {\n            <div class=\"lg:col-span-3 md:col-span-6\">\n                <div class=\"group text-center\">\n                    <div class=\"relative inline-flex mx-auto h-52 w-52 items-center justify-center overflow-hidden rounded-full bg-slate-100 \">\n                        @if (hasProfileImage(item)) {\n                            <img [src]=\"item.image\" class=\"h-full w-full object-cover\" [alt]=\"item.name\" (error)=\"showAvatarIcon(item.id)\">\n                        } @else {\n                            <i class=\"mdi mdi-account text-8xl text-slate-400\" aria-hidden=\"true\"></i>\n                            <span class=\"sr-only\">{{ item.name }}</span>\n                        }\n                        <div class=\"absolute inset-0 bg-gradient-to-b from-transparent to-black h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 duration-500\"></div>\n\n                        <ul class=\"list-none absolute start-0 end-0 -bottom-20 group-hover:bottom-5 duration-500\">\n                            <li class=\"inline\">\n                                <a [href]=\"'mailto:' + item.email\" class=\"size-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border border-primary bg-primary text-white\" [attr.aria-label]=\"item.email\"><i class=\"mdi mdi-email-outline\"></i></a></li>\n                        </ul>\n                    </div>\n\n                    <div class=\"content mt-3\">\n                        <a href=\"javascript:void(0)\" class=\"text-lg font-semibold hover:text-primary duration-500\">{{ item.name }}</a>\n                        <p class=\"text-slate-400\">{{ item.position }}</p>\n                    </div>\n                </div>\n            </div>\n        } @empty {\n            <p class=\"col-span-full py-8 text-center text-sm text-slate-500\">{{ 'noAgentsFound' | translate }}</p>\n        }\n        }\n    </div>\n</div>\n" }]
    }], null, { teamData: [{
            type: Input
        }], isLoading: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeamOne, { className: "TeamOne", filePath: "app/shared/components/team-one/team-one.ts", lineNumber: 18 }); })();
