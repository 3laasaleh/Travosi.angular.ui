import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of, switchMap } from 'rxjs';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { ApiService } from '../../../core/services/apiservice.service';
import { VisitorTrackingService } from '../../../core/services/visitor-tracking.service';
import { environment } from '../../../../environments/environment';
import { AgencyOne } from '../../../shared/components/agency-one/agency-one';
import { TeamOne } from '../../../shared/components/team-one/team-one';
import { UsersOne } from '../../../shared/components/users-one/users-one';
import * as i0 from "@angular/core";
function AboutUs_For_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 38);
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1);
} }
function AboutUs_For_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 38);
    i0.ɵɵelement(1, "i", 53);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r2);
} }
export class AboutUs {
    apiService = inject(ApiService);
    visitorTracking = inject(VisitorTrackingService);
    destroyRef = inject(DestroyRef);
    changeDetector = inject(ChangeDetectorRef);
    cta = 'assets/images/bg/cta.jpg';
    agents = [];
    visitorTotal = 0;
    packageTotal = 0;
    isLoading = true;
    ngOnInit() {
        this.visitorTracking
            .track()
            .pipe(switchMap(() => forkJoin({
            agents: this.apiService
                .getUnauthntecated('AboutUs/Agents')
                .pipe(catchError(() => of(null))),
            statistics: this.apiService
                .getUnauthntecated('AboutUs/Statistics')
                .pipe(catchError(() => of(null))),
        })), finalize(() => {
            this.isLoading = false;
            this.changeDetector.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe(({ agents, statistics }) => {
            const agentData = this.responseData(agents);
            this.agents = Array.isArray(agentData)
                ? agentData.map((agent) => this.mapAgent(agent))
                : [];
            const statisticData = this.responseData(statistics) ?? {};
            this.visitorTotal = this.nonNegativeNumber(statisticData.totalVisitors ?? statisticData.TotalVisitors);
            this.packageTotal = this.nonNegativeNumber(statisticData.totalPackages ?? statisticData.TotalPackages);
            this.changeDetector.markForCheck();
        });
    }
    responseData(response) {
        if (!response || response.isSuccess === false || response.IsSuccess === false)
            return null;
        return response.data ?? response.Data ?? response;
    }
    mapAgent(agent) {
        const firstName = String(agent?.firstName ?? agent?.FirstName ?? '').trim();
        const lastName = String(agent?.lastName ?? agent?.LastName ?? '').trim();
        const name = [firstName, lastName].filter(Boolean).join(' ') || 'Travel Agent';
        return {
            id: this.nonNegativeNumber(agent?.id ?? agent?.Id),
            name,
            email: String(agent?.email ?? agent?.Email ?? '').trim(),
            position: 'Travel Agent',
            image: this.agentImage(agent?.profileImageUrl ?? agent?.ProfileImageUrl),
        };
    }
    agentImage(value) {
        const image = String(value ?? '').trim();
        if (!image)
            return '';
        if (/^(https?:|data:|blob:)/i.test(image))
            return image;
        const relativePath = image.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${relativePath}`;
    }
    nonNegativeNumber(value) {
        const number = Number(value);
        return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
    }
    static ɵfac = function AboutUs_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AboutUs)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AboutUs, selectors: [["app-about-us"]], decls: 105, vars: 64, consts: [[1, "relative", "table", "w-full", "items-center", "bg-cover", "bg-top", "bg-no-repeat", "py-36"], [1, "absolute", "inset-0", "bg-gradient-to-b", "from-slate-900/60", "via-slate-900/80", "to-slate-900"], [1, "container", "relative"], [1, "mt-10", "grid", "grid-cols-1", "pb-8", "text-center"], [1, "mb-3", "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "text-4xl", "font-semibold", "leading-normal", "tracking-wide", "text-white", "md:text-5xl"], [1, "mx-auto", "mt-4", "max-w-2xl", "text-lg", "text-white/70"], [1, "absolute", "bottom-5", "start-0", "end-0", "z-10", "mx-3", "text-center"], [1, "mb-0", "inline-block", "tracking-[0.5px]"], [1, "inline-block", "text-[13px]", "font-bold", "uppercase", "text-white/50", "transition", "hover:text-white"], ["routerLink", "/home"], [1, "mx-0.5", "inline-block", "text-base", "text-white/50", "ltr:rotate-0", "rtl:rotate-180"], [1, "mdi", "mdi-chevron-right"], ["aria-current", "page", 1, "inline-block", "text-[13px]", "font-bold", "uppercase", "text-white"], [1, "relative", "overflow-hidden", "py-16", "md:py-24"], [1, "pointer-events-none", "absolute", "-start-36", "top-20", "size-96", "rounded-full", "bg-primary/5", "blur-3xl"], [1, "pointer-events-none", "absolute", "-end-36", "bottom-20", "size-96", "rounded-full", "bg-sky-500/5", "blur-3xl"], [1, "mx-auto", "max-w-4xl", "text-center"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-3", "text-3xl", "font-semibold", "md:text-4xl"], [1, "mt-6", "space-y-5", "text-base", "leading-8", "text-slate-600", "md:text-lg"], [1, "mt-14", "grid", "gap-6", "md:grid-cols-2"], [1, "rounded-[2rem]", "border", "border-slate-200", "bg-white", "p-7", "shadow-sm", "dark:border-slate-800", "md:p-9"], [1, "grid", "size-14", "place-items-center", "rounded-2xl", "bg-primary/10", "text-3xl", "text-primary"], [1, "mdi", "mdi-target"], [1, "mt-6", "text-2xl", "font-semibold"], [1, "mt-4", "leading-7", "text-slate-600"], [1, "rounded-[2rem]", "border", "border-slate-200", "bg-slate-950", "p-7", "text-white", "shadow-sm", "md:p-9"], [1, "grid", "size-14", "place-items-center", "rounded-2xl", "bg-white/10", "text-3xl", "text-primary"], [1, "mdi", "mdi-eye-outline"], [1, "mt-4", "leading-7", "text-white/70"], [1, "mt-14", "grid", "gap-8", "lg:grid-cols-2"], [1, "rounded-[2rem]", "bg-slate-50", "p-7", "md:p-9"], [1, "flex", "items-center", "gap-4"], [1, "grid", "size-12", "place-items-center", "rounded-2xl", "bg-primary", "text-2xl", "text-white"], [1, "mdi", "mdi-briefcase-outline"], [1, "text-2xl", "font-semibold"], [1, "mt-7", "space-y-4"], [1, "flex", "items-start", "gap-3", "text-slate-600"], [1, "rounded-[2rem]", "border", "border-primary/15", "bg-primary/5", "p-7", "md:p-9"], [1, "grid", "size-12", "place-items-center", "rounded-2xl", "bg-white", "text-2xl", "text-primary", "shadow-sm"], [1, "mdi", "mdi-star-circle-outline"], [1, "mt-14", "overflow-hidden", "rounded-[2rem]", "bg-gradient-to-br", "from-slate-950", "via-slate-900", "to-primary/90", "p-8", "text-white", "md:p-12"], [1, "grid", "items-center", "gap-8", "lg:grid-cols-[0.35fr_1fr]"], [1, "text-center", "lg:text-start"], [1, "inline-grid", "size-24", "place-items-center", "rounded-full", "border", "border-white/15", "bg-white/10", "text-5xl", "text-primary"], [1, "mdi", "mdi-hand-heart-outline"], [1, "text-3xl", "font-semibold"], [1, "mt-5", "text-lg", "leading-8", "text-white/75"], [1, "mt-5", "text-lg", "font-semibold", "leading-8", "text-white"], [3, "visitorTotal", "packageTotal"], [3, "teamData", "isLoading"], [1, "mdi", "mdi-check-circle", "mt-0.5", "shrink-0", "text-xl", "text-primary"], [1, "mdi", "mdi-check-decagram", "mt-0.5", "shrink-0", "text-xl", "text-primary"]], template: function AboutUs_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵelementStart(1, "section", 0);
            i0.ɵɵelement(2, "div", 1);
            i0.ɵɵelementStart(3, "div", 2)(4, "div", 3)(5, "p", 4);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h1", 5);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "p", 6);
            i0.ɵɵtext(12);
            i0.ɵɵpipe(13, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(14, "div", 7)(15, "ul", 8)(16, "li", 9)(17, "a", 10);
            i0.ɵɵtext(18);
            i0.ɵɵpipe(19, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "li", 11);
            i0.ɵɵelement(21, "i", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "li", 13);
            i0.ɵɵtext(23);
            i0.ɵɵpipe(24, "translate");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "main", 14);
            i0.ɵɵelement(26, "div", 15)(27, "div", 16);
            i0.ɵɵelementStart(28, "div", 2)(29, "section", 17)(30, "p", 18);
            i0.ɵɵtext(31);
            i0.ɵɵpipe(32, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "h2", 19);
            i0.ɵɵtext(34);
            i0.ɵɵpipe(35, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 20)(37, "p");
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "p");
            i0.ɵɵtext(41);
            i0.ɵɵpipe(42, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "section", 21)(44, "article", 22)(45, "span", 23);
            i0.ɵɵelement(46, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "h2", 25);
            i0.ɵɵtext(48);
            i0.ɵɵpipe(49, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "p", 26);
            i0.ɵɵtext(51);
            i0.ɵɵpipe(52, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "article", 27)(54, "span", 28);
            i0.ɵɵelement(55, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "h2", 25);
            i0.ɵɵtext(57);
            i0.ɵɵpipe(58, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "p", 30);
            i0.ɵɵtext(60);
            i0.ɵɵpipe(61, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(62, "section", 31)(63, "article", 32)(64, "div", 33)(65, "span", 34);
            i0.ɵɵelement(66, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "h2", 36);
            i0.ɵɵtext(68);
            i0.ɵɵpipe(69, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "ul", 37);
            i0.ɵɵrepeaterCreate(71, AboutUs_For_72_Template, 4, 1, "li", 38, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵpipe(73, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(74, "article", 39)(75, "div", 33)(76, "span", 40);
            i0.ɵɵelement(77, "i", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "h2", 36);
            i0.ɵɵtext(79);
            i0.ɵɵpipe(80, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(81, "ul", 37);
            i0.ɵɵrepeaterCreate(82, AboutUs_For_83_Template, 4, 1, "li", 38, i0.ɵɵrepeaterTrackByIndex);
            i0.ɵɵpipe(84, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(85, "section", 42)(86, "div", 43)(87, "div", 44)(88, "span", 45);
            i0.ɵɵelement(89, "i", 46);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(90, "div")(91, "h2", 47);
            i0.ɵɵtext(92);
            i0.ɵɵpipe(93, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "p", 48);
            i0.ɵɵtext(95);
            i0.ɵɵpipe(96, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "p", 49);
            i0.ɵɵtext(98);
            i0.ɵɵpipe(99, "translate");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelement(100, "app-agency-one", 50);
            i0.ɵɵelementStart(101, "section", 14);
            i0.ɵɵelement(102, "app-team-one", 51)(103, "app-users-one");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(104, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background-image", "url(" + ctx.cta + ")");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 24, "aboutseaworld.eyebrow"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 26, "aboutseaworld.pageTitle"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 28, "aboutseaworld.tagline"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 30, "aboutseaworld.home"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 32, "aboutseaworld.breadcrumb"));
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(32, 34, "aboutseaworld.introduction.eyebrow"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(35, 36, "aboutseaworld.introduction.title"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 38, "aboutseaworld.introduction.paragraphOne"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(42, 40, "aboutseaworld.introduction.paragraphTwo"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(49, 42, "aboutseaworld.mission.title"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(52, 44, "aboutseaworld.mission.description"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 46, "aboutseaworld.vision.title"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(61, 48, "aboutseaworld.vision.description"));
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(69, 50, "aboutseaworld.offer.title"));
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(i0.ɵɵpipeBind1(73, 52, "aboutseaworld.offer.items"));
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(80, 54, "aboutseaworld.whyChooseUs.title"));
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(i0.ɵɵpipeBind1(84, 56, "aboutseaworld.whyChooseUs.items"));
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(93, 58, "aboutseaworld.commitment.title"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(96, 60, "aboutseaworld.commitment.description"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(99, 62, "aboutseaworld.closing"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("visitorTotal", ctx.visitorTotal)("packageTotal", ctx.packageTotal);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("teamData", ctx.agents)("isLoading", ctx.isLoading);
        } }, dependencies: [RouterLink,
            HomeNavbar,
            AgencyOne,
            TeamOne,
            UsersOne,
            FooterOne,
            TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AboutUs, [{
        type: Component,
        args: [{ selector: 'app-about-us', imports: [
                    RouterLink,
                    TranslatePipe,
                    HomeNavbar,
                    AgencyOne,
                    TeamOne,
                    UsersOne,
                    FooterOne,
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n\r\n<section class=\"relative table w-full items-center bg-cover bg-top bg-no-repeat py-36\" [style.background-image]=\"'url(' + cta + ')'\">\r\n  <div class=\"absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900\"></div>\r\n  <div class=\"container relative\">\r\n    <div class=\"mt-10 grid grid-cols-1 pb-8 text-center\">\r\n      <p class=\"mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'aboutseaworld.eyebrow' | translate }}</p>\r\n      <h1 class=\"text-4xl font-semibold leading-normal tracking-wide text-white md:text-5xl\">{{ 'aboutseaworld.pageTitle' | translate }}</h1>\r\n      <p class=\"mx-auto mt-4 max-w-2xl text-lg text-white/70\">{{ 'aboutseaworld.tagline' | translate }}</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"absolute bottom-5 start-0 end-0 z-10 mx-3 text-center\">\r\n    <ul class=\"mb-0 inline-block tracking-[0.5px]\">\r\n      <li class=\"inline-block text-[13px] font-bold uppercase text-white/50 transition hover:text-white\"><a routerLink=\"/home\">{{ 'aboutseaworld.home' | translate }}</a></li>\r\n      <li class=\"mx-0.5 inline-block text-base text-white/50 ltr:rotate-0 rtl:rotate-180\"><i class=\"mdi mdi-chevron-right\"></i></li>\r\n      <li class=\"inline-block text-[13px] font-bold uppercase text-white\" aria-current=\"page\">{{ 'aboutseaworld.breadcrumb' | translate }}</li>\r\n    </ul>\r\n  </div>\r\n</section>\r\n\r\n<main class=\"relative overflow-hidden py-16 md:py-24\">\r\n  <div class=\"pointer-events-none absolute -start-36 top-20 size-96 rounded-full bg-primary/5 blur-3xl\"></div>\r\n  <div class=\"pointer-events-none absolute -end-36 bottom-20 size-96 rounded-full bg-sky-500/5 blur-3xl\"></div>\r\n  <div class=\"container relative\">\r\n    <section class=\"mx-auto max-w-4xl text-center\">\r\n      <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'aboutseaworld.introduction.eyebrow' | translate }}</p>\r\n      <h2 class=\"mt-3 text-3xl font-semibold md:text-4xl\">{{ 'aboutseaworld.introduction.title' | translate }}</h2>\r\n      <div class=\"mt-6 space-y-5 text-base leading-8 text-slate-600  md:text-lg\">\r\n        <p>{{ 'aboutseaworld.introduction.paragraphOne' | translate }}</p>\r\n        <p>{{ 'aboutseaworld.introduction.paragraphTwo' | translate }}</p>\r\n      </div>\r\n    </section>\r\n\r\n    <section class=\"mt-14 grid gap-6 md:grid-cols-2\">\r\n      <article class=\"rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800  md:p-9\">\r\n        <span class=\"grid size-14 place-items-center rounded-2xl bg-primary/10 text-3xl text-primary\"><i class=\"mdi mdi-target\"></i></span>\r\n        <h2 class=\"mt-6 text-2xl font-semibold\">{{ 'aboutseaworld.mission.title' | translate }}</h2>\r\n        <p class=\"mt-4 leading-7 text-slate-600 \">{{ 'aboutseaworld.mission.description' | translate }}</p>\r\n      </article>\r\n      <article class=\"rounded-[2rem] border border-slate-200 bg-slate-950 p-7 text-white shadow-sm md:p-9\">\r\n        <span class=\"grid size-14 place-items-center rounded-2xl bg-white/10 text-3xl text-primary\"><i class=\"mdi mdi-eye-outline\"></i></span>\r\n        <h2 class=\"mt-6 text-2xl font-semibold\">{{ 'aboutseaworld.vision.title' | translate }}</h2>\r\n        <p class=\"mt-4 leading-7 text-white/70\">{{ 'aboutseaworld.vision.description' | translate }}</p>\r\n      </article>\r\n    </section>\r\n\r\n    <section class=\"mt-14 grid gap-8 lg:grid-cols-2\">\r\n      <article class=\"rounded-[2rem] bg-slate-50 p-7  md:p-9\">\r\n        <div class=\"flex items-center gap-4\"><span class=\"grid size-12 place-items-center rounded-2xl bg-primary text-2xl text-white\"><i class=\"mdi mdi-briefcase-outline\"></i></span><h2 class=\"text-2xl font-semibold\">{{ 'aboutseaworld.offer.title' | translate }}</h2></div>\r\n        <ul class=\"mt-7 space-y-4\">\r\n          @for (item of ('aboutseaworld.offer.items' | translate); track $index) {\r\n            <li class=\"flex items-start gap-3 text-slate-600 \"><i class=\"mdi mdi-check-circle mt-0.5 shrink-0 text-xl text-primary\"></i><span>{{ item }}</span></li>\r\n          }\r\n        </ul>\r\n      </article>\r\n\r\n      <article class=\"rounded-[2rem] border border-primary/15 bg-primary/5 p-7 md:p-9\">\r\n        <div class=\"flex items-center gap-4\"><span class=\"grid size-12 place-items-center rounded-2xl bg-white text-2xl text-primary shadow-sm\"><i class=\"mdi mdi-star-circle-outline\"></i></span><h2 class=\"text-2xl font-semibold\">{{ 'aboutseaworld.whyChooseUs.title' | translate }}</h2></div>\r\n        <ul class=\"mt-7 space-y-4\">\r\n          @for (item of ('aboutseaworld.whyChooseUs.items' | translate); track $index) {\r\n            <li class=\"flex items-start gap-3 text-slate-600 \"><i class=\"mdi mdi-check-decagram mt-0.5 shrink-0 text-xl text-primary\"></i><span>{{ item }}</span></li>\r\n          }\r\n        </ul>\r\n      </article>\r\n    </section>\r\n\r\n    <section class=\"mt-14 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-primary/90 p-8 text-white md:p-12\">\r\n      <div class=\"grid items-center gap-8 lg:grid-cols-[0.35fr_1fr]\">\r\n        <div class=\"text-center lg:text-start\"><span class=\"inline-grid size-24 place-items-center rounded-full border border-white/15 bg-white/10 text-5xl text-primary\"><i class=\"mdi mdi-hand-heart-outline\"></i></span></div>\r\n        <div>\r\n          <h2 class=\"text-3xl font-semibold\">{{ 'aboutseaworld.commitment.title' | translate }}</h2>\r\n          <p class=\"mt-5 text-lg leading-8 text-white/75\">{{ 'aboutseaworld.commitment.description' | translate }}</p>\r\n          <p class=\"mt-5 text-lg font-semibold leading-8 text-white\">{{ 'aboutseaworld.closing' | translate }}</p>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</main>\r\n\r\n<app-agency-one [visitorTotal]=\"visitorTotal\" [packageTotal]=\"packageTotal\" />\r\n\r\n<section class=\"relative overflow-hidden py-16 md:py-24\">\r\n  <app-team-one [teamData]=\"agents\" [isLoading]=\"isLoading\" />\r\n  <app-users-one />\r\n</section>\r\n\r\n<app-footer-one />\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AboutUs, { className: "AboutUs", filePath: "app/features/innerpages/about-us/about-us.ts", lineNumber: 36 }); })();
