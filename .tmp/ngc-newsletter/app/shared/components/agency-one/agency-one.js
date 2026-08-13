import { Component, Input, ViewChild, ChangeDetectionStrategy, } from '@angular/core';
import { CountUp } from 'countup.js';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
const _c0 = ["visitorCount"];
const _c1 = ["packageCount"];
export class AgencyOne {
    about = 'assets/images/about.jpg';
    map = 'assets/images/map-plane-big.png';
    visitorTotal = 4589;
    packageTotal = 50;
    visitorCount;
    packageCount;
    visitorCounter;
    packageCounter;
    ngAfterViewInit() {
        feather.replace();
        this.visitorCounter = new CountUp(this.visitorCount.nativeElement, this.visitorTotal, {
            startVal: 0,
        });
        this.packageCounter = new CountUp(this.packageCount.nativeElement, this.packageTotal, {
            startVal: 0,
        });
        this.visitorCounter.start();
        this.packageCounter.start();
    }
    ngOnChanges(changes) {
        if (changes['visitorTotal'])
            this.visitorCounter?.update(this.visitorTotal);
        if (changes['packageTotal'])
            this.packageCounter?.update(this.packageTotal);
    }
    static ɵfac = function AgencyOne_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AgencyOne)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AgencyOne, selectors: [["app-agency-one"]], viewQuery: function AgencyOne_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.visitorCount = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.packageCount = _t.first);
        } }, inputs: { visitorTotal: "visitorTotal", packageTotal: "packageTotal" }, features: [i0.ɵɵNgOnChangesFeature], decls: 47, vars: 28, consts: [["visitorCount", ""], ["packageCount", ""], [1, "container", "relative", "md:mt-24", "mt-16"], [1, "grid", "md:grid-cols-12", "grid-cols-1", "items-center", "gap-6", "relative"], [1, "md:col-span-5"], [1, "relative"], [1, "mx-auto", "rounded-3xl", "shadow", "dark:shadow-gray-700", "w-[90%]", 3, "src", "alt"], [1, "absolute", "flex", "items-center", "bottom-16", "md:-start-10", "-start-5", "p-4", "rounded-lg", "shadow-md", "dark:shadow-gray-800", "bg-white", "w-56", "m-3"], [1, "flex", "items-center", "justify-center", "h-[65px]", "min-w-[65px]", "bg-primary/5", "text-primary", "text-center", "rounded-xl", "me-3"], ["data-feather", "users", 1, "size-6"], [1, "flex-1"], [1, "text-slate-400"], [1, "text-xl", "font-bold"], [1, "absolute", "flex", "items-center", "top-16", "md:-end-10", "-end-5", "p-4", "rounded-lg", "shadow-md", "dark:shadow-gray-800", "bg-white", "w-60", "m-3"], ["data-feather", "globe", 1, "size-6"], [1, "text-xl", "font-bold", "flex"], [1, "md:col-span-7"], [1, "lg:ms-8"], [1, "mb-2", "text-sm", "font-semibold", "uppercase", "tracking-[0.22em]", "text-primary"], [1, "mb-6", "md:text-3xl", "text-2xl", "md:leading-normal", "leading-normal", "font-semibold"], [1, "text-slate-400", "max-w-xl", "mb-6"], ["routerLink", "/aboutus", 1, "py-2", "px-5", "inline-block", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md"], [1, "mdi", "mdi-chevron-right", "align-middle", "ms-0.5", "rtl:rotate-180"], [1, "absolute", "bottom-0", "start-1/3", "-z-1"], [1, "lg:w-[600px]", "w-96", 3, "src", "alt"]], template: function AgencyOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5);
            i0.ɵɵelement(4, "img", 6);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementStart(6, "div", 7)(7, "div", 8);
            i0.ɵɵelement(8, "i", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 10)(10, "span", 11);
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p", 12)(14, "span", null, 0);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(17, "div", 13)(18, "div", 8);
            i0.ɵɵelement(19, "i", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 10)(21, "span", 11);
            i0.ɵɵtext(22);
            i0.ɵɵpipe(23, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "p", 15)(25, "span", null, 1);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(28, "+");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(29, "div", 16)(30, "div", 17)(31, "p", 18);
            i0.ɵɵtext(32);
            i0.ɵɵpipe(33, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "h3", 19);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "p", 20);
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "a", 21);
            i0.ɵɵtext(41);
            i0.ɵɵpipe(42, "translate");
            i0.ɵɵelement(43, "i", 22);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(44, "div", 23);
            i0.ɵɵelement(45, "img", 24);
            i0.ɵɵpipe(46, "translate");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("src", ctx.about, i0.ɵɵsanitizeUrl)("alt", i0.ɵɵpipeBind1(5, 12, "seaworldTravelConsultants"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 14, "visitors"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.visitorTotal);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 16, "travelPackages"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.packageTotal);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(33, 18, "aboutseaworldHolidays"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 20, "trustedTravelPartnerTitle"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 22, "trustedTravelPartnerDescription"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(42, 24, "learnMoreAboutUs"), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("src", ctx.map, i0.ɵɵsanitizeUrl)("alt", i0.ɵɵpipeBind1(46, 26, "travelAroundWorld"));
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AgencyOne, [{
        type: Component,
        args: [{ selector: 'app-agency-one', imports: [TranslatePipe, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"container relative md:mt-24 mt-16\">\r\n    <div class=\"grid md:grid-cols-12 grid-cols-1 items-center gap-6 relative\">\r\n        <div class=\"md:col-span-5\">\r\n            <div class=\"relative\">\r\n                <img [src]=\"about\" class=\"mx-auto rounded-3xl shadow dark:shadow-gray-700 w-[90%]\" [alt]=\"'seaworldTravelConsultants' | translate\">\r\n\r\n                <div class=\"absolute flex items-center bottom-16 md:-start-10 -start-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white  w-56 m-3\">\r\n                    <div class=\"flex items-center justify-center h-[65px] min-w-[65px] bg-primary/5 text-primary text-center rounded-xl me-3\">\r\n                        <i data-feather=\"users\" class=\"size-6\"></i>\r\n                    </div>\r\n                    <div class=\"flex-1\">\r\n                        <span class=\"text-slate-400\">{{ 'visitors' | translate }}</span>\r\n                        <p class=\"text-xl font-bold\"><span #visitorCount>{{ visitorTotal }}</span></p>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"absolute flex items-center top-16 md:-end-10 -end-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white  w-60 m-3\">\r\n                    <div class=\"flex items-center justify-center h-[65px] min-w-[65px] bg-primary/5 text-primary text-center rounded-xl me-3\">\r\n                        <i data-feather=\"globe\" class=\"size-6\"></i>\r\n                    </div>\r\n                    <div class=\"flex-1\">\r\n                        <span class=\"text-slate-400\">{{ 'travelPackages' | translate }}</span>\r\n                        <p class=\"text-xl font-bold flex\"><span #packageCount>{{ packageTotal }}</span>+</p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"md:col-span-7\">\r\n            <div class=\"lg:ms-8\">\r\n                <p class=\"mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary\">{{ 'aboutseaworldHolidays' | translate }}</p>\r\n                <h3 class=\"mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">{{ 'trustedTravelPartnerTitle' | translate }}</h3>\r\n                <p class=\"text-slate-400 max-w-xl mb-6\">{{ 'trustedTravelPartnerDescription' | translate }}</p>\r\n                <a routerLink=\"/aboutus\" class=\"py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md\">{{ 'learnMoreAboutUs' | translate }} <i class=\"mdi mdi-chevron-right align-middle ms-0.5 rtl:rotate-180\"></i></a>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"absolute bottom-0 start-1/3 -z-1\">\r\n            <img [src]=\"map\" class=\"lg:w-[600px] w-96\" [alt]=\"'travelAroundWorld' | translate\">\r\n        </div>\r\n    </div>\r\n</div>\r\n" }]
    }], null, { visitorTotal: [{
            type: Input
        }], packageTotal: [{
            type: Input
        }], visitorCount: [{
            type: ViewChild,
            args: ['visitorCount']
        }], packageCount: [{
            type: ViewChild,
            args: ['packageCount']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AgencyOne, { className: "AgencyOne", filePath: "app/shared/components/agency-one/agency-one.ts", lineNumber: 22 }); })();
