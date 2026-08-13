import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { HomeNavbar } from '../../layout/home-navbar/home-navbar';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { FooterOne } from '../../layout/footer-one/footer-one';
import { AgencyOne } from '../../shared/components/agency-one/agency-one';
import { DestinationsSection } from './home-sections/destinations-section/destinations-section';
import { PackagesSection } from './home-sections/packages-section/packages-section';
import { BlogsSection } from './home-sections/blogs-section/blogs-section';
import { ToursSection } from './home-sections/tours-section/tours-section';
import { UsersOne } from '../../shared/components/users-one/users-one';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/apiservice.service";
import * as i2 from "../../core/services/visitor-tracking.service";
function Home_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 0);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelement(2, "div", 4);
    i0.ɵɵelementStart(3, "div", 5);
    i0.ɵɵelement(4, "div", 6)(5, "div", 7)(6, "div", 8)(7, "div", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 1, "loadingHomePage"));
} }
function Home_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 10)(2, "div", 11)(3, "div", 12)(4, "div", 13)(5, "div", 14);
    i0.ɵɵelement(6, "div", 15);
    i0.ɵɵelementStart(7, "div", 16)(8, "div", 17)(9, "div", 18);
    i0.ɵɵelement(10, "img", 19);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementStart(12, "h1", 20);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 21);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 22)(19, "a", 23);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()()()()()();
    i0.ɵɵelementStart(22, "div", 13)(23, "div", 14);
    i0.ɵɵelement(24, "div", 15);
    i0.ɵɵelementStart(25, "div", 16)(26, "div", 17)(27, "div", 18);
    i0.ɵɵelement(28, "img", 19);
    i0.ɵɵpipe(29, "translate");
    i0.ɵɵelementStart(30, "h1", 20);
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "p", 21);
    i0.ɵɵtext(34);
    i0.ɵɵpipe(35, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 22)(37, "a", 24);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "translate");
    i0.ɵɵelementEnd()()()()()()()()();
    i0.ɵɵelement(40, "div", 25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r0.bg2 + ")");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("src", ctx_r0.map, i0.ɵɵsanitizeUrl)("alt", i0.ɵɵpipeBind1(11, 14, "travelAroundWorld"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 16, "homeHeroPackagesTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 18, "homeHeroPackagesDescription"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 20, "explorePackages"));
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r0.bg3 + ")");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("src", ctx_r0.map, i0.ɵɵsanitizeUrl)("alt", i0.ɵɵpipeBind1(29, 22, "travelAroundWorld"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(32, 24, "homeHeroDestinationsTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(35, 26, "homeHeroDestinationsDescription"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 28, "exploreDestinations"));
} }
export class Home {
    cdr;
    apiService;
    visitorTracking;
    destroyRef;
    isLoading = true;
    bg2 = 'assets/images/bg/2.jpg';
    bg3 = 'assets/images/bg/3.jpg';
    map = 'assets/images/map-plane.png';
    visitorTotal = 0;
    packageTotal = 0;
    constructor(cdr, apiService, visitorTracking, destroyRef) {
        this.cdr = cdr;
        this.apiService = apiService;
        this.visitorTracking = visitorTracking;
        this.destroyRef = destroyRef;
    }
    ngOnInit() {
        this.loadStatistics();
        Promise.all([this.bg2, this.bg3, this.map].map((source) => this.preloadImage(source)))
            .finally(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
            requestAnimationFrame(() => this.initializeSlider());
        });
    }
    ngAfterViewInit() {
        if (!this.isLoading)
            this.initializeSlider();
    }
    initializeSlider() {
        if (!document.querySelector('.swiper-container .swiper'))
            return;
        new Swiper('.swiper-container .swiper', {
            modules: [Navigation, Autoplay, Pagination],
            autoplay: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
        });
    }
    preloadImage(source) {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => resolve();
            image.src = source;
        });
    }
    loadStatistics() {
        this.visitorTracking
            .track()
            .pipe(switchMap(() => this.apiService
            .getUnauthntecated('AboutUs/Statistics')
            .pipe(catchError(() => of(null)))), takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
            const data = response?.data ?? response?.Data ?? response;
            if (!data || response?.isSuccess === false || response?.IsSuccess === false)
                return;
            this.visitorTotal = this.nonNegativeNumber(data.totalVisitors ?? data.TotalVisitors);
            this.packageTotal = this.nonNegativeNumber(data.totalPackages ?? data.TotalPackages);
            this.cdr.markForCheck();
        });
    }
    nonNegativeNumber(value) {
        const number = Number(value);
        return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
    }
    static ɵfac = function Home_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Home)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i2.VisitorTrackingService), i0.ɵɵdirectiveInject(i0.DestroyRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Home, selectors: [["app-home"]], decls: 11, vars: 3, consts: [["aria-busy", "true", 1, "relative", "grid", "h-screen", "place-items-center", "overflow-hidden", "bg-slate-200"], ["id", "home", 1, "swiper-slider-hero", "relative", "block", "h-screen"], [3, "visitorTotal", "packageTotal"], [1, "relative", "md:mt-24", "mt-16", "overflow-hidden"], [1, "absolute", "inset-0", "animate-pulse", "bg-gradient-to-br", "from-slate-300", "via-slate-200", "to-slate-300"], [1, "container", "relative", "text-center"], [1, "mx-auto", "h-40", "w-72", "animate-pulse", "rounded-3xl", "bg-white/45"], [1, "mx-auto", "mt-8", "h-12", "w-full", "max-w-2xl", "animate-pulse", "rounded-full", "bg-white/55"], [1, "mx-auto", "mt-4", "h-6", "w-full", "max-w-xl", "animate-pulse", "rounded-full", "bg-white/45"], [1, "mx-auto", "mt-8", "h-11", "w-28", "animate-pulse", "rounded-lg", "bg-white/55"], [1, "swiper-container", "absolute", "end-0", "top-0", "w-full", "h-full"], [1, "swiper", "h-full"], [1, "swiper-wrapper"], [1, "swiper-slide", "flex", "items-center", "overflow-hidden"], [1, "slide-inner", "absolute", "end-0", "top-0", "w-full", "h-full", "slide-bg-image", "flex", "items-center", "bg-center"], [1, "absolute", "inset-0", "bg-slate-900/70"], [1, "container", "relative"], [1, "grid", "grid-cols-1"], [1, "text-center"], [1, "mx-auto", "w-[300px]", 3, "src", "alt"], [1, "font-bold", "text-white", "lg:leading-normal", "leading-normal", "text-4xl", "lg:text-6xl", "mb-6", "mt-5"], [1, "text-white/70", "text-xl", "max-w-xl", "mx-auto"], [1, "mt-6"], ["routerLink", "/packages", 1, "py-2", "px-5", "inline-block", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md"], ["routerLink", "/destinations", 1, "py-2", "px-5", "inline-block", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md"], [1, "swiper-pagination"]], template: function Home_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵconditionalCreate(1, Home_Conditional_1_Template, 8, 3, "section", 0)(2, Home_Conditional_2_Template, 41, 30, "section", 1);
            i0.ɵɵelement(3, "app-destinations-section")(4, "app-tours-section")(5, "app-packages-section")(6, "app-blogs-section")(7, "app-users-one")(8, "app-agency-one", 2);
            i0.ɵɵelementStart(9, "section", 3);
            i0.ɵɵelement(10, "app-footer-one");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 1 : 2);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("visitorTotal", ctx.visitorTotal)("packageTotal", ctx.packageTotal);
        } }, dependencies: [HomeNavbar,
            AgencyOne,
            UsersOne,
            FooterOne,
            DestinationsSection,
            ToursSection,
            PackagesSection,
            BlogsSection,
            RouterLink,
            TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Home, [{
        type: Component,
        args: [{ selector: 'app-home', imports: [
                    HomeNavbar,
                    AgencyOne,
                    UsersOne,
                    FooterOne,
                    DestinationsSection,
                    ToursSection,
                    PackagesSection,
                    BlogsSection,
                    TranslatePipe,
                    RouterLink,
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "\r\n<app-home-navbar />\r\n@if (isLoading) {\r\n  <section class=\"relative grid h-screen place-items-center overflow-hidden bg-slate-200\" aria-busy=\"true\" [attr.aria-label]=\"'loadingHomePage' | translate\">\r\n    <div class=\"absolute inset-0 animate-pulse bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300\"></div>\r\n    <div class=\"container relative text-center\">\r\n      <div class=\"mx-auto h-40 w-72 animate-pulse rounded-3xl bg-white/45\"></div>\r\n      <div class=\"mx-auto mt-8 h-12 w-full max-w-2xl animate-pulse rounded-full bg-white/55\"></div>\r\n      <div class=\"mx-auto mt-4 h-6 w-full max-w-xl animate-pulse rounded-full bg-white/45\"></div>\r\n      <div class=\"mx-auto mt-8 h-11 w-28 animate-pulse rounded-lg bg-white/55\"></div>\r\n    </div>\r\n  </section>\r\n} @else {\r\n<section class=\"swiper-slider-hero relative block h-screen\" id=\"home\">\r\n    <div class=\"swiper-container absolute end-0 top-0 w-full h-full\">\r\n        <div class=\"swiper h-full\">\r\n            <div class=\"swiper-wrapper\">\r\n                <div class=\"swiper-slide flex items-center overflow-hidden\">\r\n                    <div class=\"slide-inner absolute end-0 top-0 w-full h-full slide-bg-image flex items-center bg-center\" [style.background-image]=\"'url(' + bg2 + ')'\">\r\n                        <div class=\"absolute inset-0 bg-slate-900/70\"></div>\r\n                        <div class=\"container relative\">\r\n                            <div class=\"grid grid-cols-1\">\r\n                                <div class=\"text-center\">\r\n                                    <img [src]=\"map\" class=\"mx-auto w-[300px]\" [alt]=\"'travelAroundWorld' | translate\">\r\n                                    <h1 class=\"font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5\">{{ 'homeHeroPackagesTitle' | translate }}</h1>\r\n                                    <p class=\"text-white/70 text-xl max-w-xl mx-auto\">{{ 'homeHeroPackagesDescription' | translate }}</p>\r\n                                    <div class=\"mt-6\">\r\n                                        <a routerLink=\"/packages\" class=\"py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md\">{{ 'explorePackages' | translate }}</a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"swiper-slide flex items-center overflow-hidden\">\r\n                    <div class=\"slide-inner absolute end-0 top-0 w-full h-full slide-bg-image flex items-center bg-center\" [style.background-image]=\"'url(' + bg3 + ')'\">\r\n                        <div class=\"absolute inset-0 bg-slate-900/70\"></div>\r\n                        <div class=\"container relative\">\r\n                            <div class=\"grid grid-cols-1\">\r\n                                <div class=\"text-center\">\r\n                                    <img [src]=\"map\" class=\"mx-auto w-[300px]\" [alt]=\"'travelAroundWorld' | translate\">\r\n                                    <h1 class=\"font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-6xl mb-6 mt-5\">{{ 'homeHeroDestinationsTitle' | translate }}</h1>\r\n                                    <p class=\"text-white/70 text-xl max-w-xl mx-auto\">{{ 'homeHeroDestinationsDescription' | translate }}</p>\r\n\r\n                                    <div class=\"mt-6\">\r\n                                        <a routerLink=\"/destinations\" class=\"py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md\">{{ 'exploreDestinations' | translate }}</a>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"swiper-pagination\"></div>\r\n    </div>\r\n</section>\r\n}\r\n\r\n\r\n\r\n    <app-destinations-section />\n    <app-tours-section />\n    <app-packages-section />\n    <app-blogs-section />\n\r\n\r\n<app-users-one />\r\n <app-agency-one [visitorTotal]=\"visitorTotal\" [packageTotal]=\"packageTotal\" />\r\n\r\n<section class=\"relative md:mt-24 mt-16 overflow-hidden\">\r\n    <app-footer-one />\r\n</section>\r\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.ApiService }, { type: i2.VisitorTrackingService }, { type: i0.DestroyRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Home, { className: "Home", filePath: "app/features/home/home.ts", lineNumber: 45 }); })();
