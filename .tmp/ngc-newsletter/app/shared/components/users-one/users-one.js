import { Component, ChangeDetectionStrategy } from '@angular/core';
import { tns } from 'tiny-slider';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.title;
function UsersOne_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 7)(1, "div", 8)(2, "div", 9)(3, "span", 10);
    i0.ɵɵdomElement(4, "i", 11);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "h4", 12);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "p", 13);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("mdi " + item_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 4, item_r1.title));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 6, item_r1.description));
} }
export class UsersOne {
    travelPromises = [
        { icon: 'mdi-map-marker-path', title: 'personalizedTravelPlanning', description: 'personalizedTravelPlanningDescription' },
        { icon: 'mdi-headset', title: 'supportThroughoutJourney', description: 'supportThroughoutJourneyDescription' },
        { icon: 'mdi-shield-check-outline', title: 'trustedTravelArrangements', description: 'trustedTravelArrangementsDescription' },
    ];
    ngAfterViewInit() {
        tns({
            container: '.tiny-three-item',
            controls: false,
            mouseDrag: true,
            loop: true,
            rewind: true,
            autoplay: true,
            autoplayButtonOutput: false,
            autoplayTimeout: 3000,
            navPosition: 'bottom',
            speed: 400,
            gutter: 12,
            responsive: {
                992: { items: 3 },
                768: { items: 2 },
                320: { items: 1 },
            },
        });
    }
    static ɵfac = function UsersOne_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersOne)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UsersOne, selectors: [["app-users-one"]], decls: 15, vars: 9, consts: [[1, "container", "relative", "md:mt-24", "mt-16"], [1, "grid", "grid-cols-1", "pb-6", "text-center"], [1, "mb-2", "text-sm", "font-semibold", "uppercase", "tracking-[0.22em]", "text-primary"], [1, "mb-4", "md:text-3xl", "text-2xl", "md:leading-normal", "leading-normal", "font-semibold"], [1, "text-slate-400", "max-w-xl", "mx-auto"], [1, "grid", "grid-cols-1", "mt-6"], [1, "tiny-three-item"], [1, "tiny-slide", "text-center"], [1, "cursor-e-resize"], [1, "content", "relative", "m-2", "min-h-64", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-7", "shadow-sm", "dark:border-slate-800"], [1, "mx-auto", "grid", "size-16", "place-items-center", "rounded-2xl", "bg-primary/10", "text-3xl", "text-primary"], [1, "mdi"], [1, "mt-5", "text-xl", "font-semibold"], [1, "mt-3", "leading-7", "text-slate-400"]], template: function UsersOne_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(5, "h3", 3);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "translate");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(8, "p", 4);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(11, "div", 5)(12, "div", 6);
            i0.ɵɵrepeaterCreate(13, UsersOne_For_14_Template, 11, 8, "div", 7, _forTrack0);
            i0.ɵɵdomElementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 3, "ourTravelPromise"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 5, "whyTravelersChooseUs"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 7, "whyTravelersChooseUsDescription"));
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.travelPromises);
        } }, dependencies: [TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersOne, [{
        type: Component,
        args: [{ selector: 'app-users-one', imports: [TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"container relative md:mt-24 mt-16\">\n    <div class=\"grid grid-cols-1 pb-6 text-center\">\n        <p class=\"mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary\">{{ 'ourTravelPromise' | translate }}</p>\n        <h3 class=\"mb-4 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold\">{{ 'whyTravelersChooseUs' | translate }}</h3>\n        <p class=\"text-slate-400 max-w-xl mx-auto\">{{ 'whyTravelersChooseUsDescription' | translate }}</p>\n    </div>\n\n    <div class=\"grid grid-cols-1 mt-6\">\n        <div class=\"tiny-three-item\">\n            @for (item of travelPromises; track item.title) {\n                <div class=\"tiny-slide text-center\">\n                    <div class=\"cursor-e-resize\">\n                        <div class=\"content relative m-2 min-h-64 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 \">\n                            <span class=\"mx-auto grid size-16 place-items-center rounded-2xl bg-primary/10 text-3xl text-primary\"><i class=\"mdi\" [class]=\"'mdi ' + item.icon\"></i></span>\n                            <h4 class=\"mt-5 text-xl font-semibold\">{{ item.title | translate }}</h4>\n                            <p class=\"mt-3 leading-7 text-slate-400\">{{ item.description | translate }}</p>\n                        </div>\n                    </div>\n                </div>\n            }\n        </div>\n    </div>\n</div>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UsersOne, { className: "UsersOne", filePath: "app/shared/components/users-one/users-one.ts", lineNumber: 11 }); })();
