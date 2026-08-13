import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenu } from '../../layout/sidebar-menu/sidebar-menu';
import { ConfigurationsNavbar } from '../../layout/admin-navbar/configurations-navbar';
import * as i0 from "@angular/core";
import * as i1 from "../user/_services/auth.service";
import * as i2 from "@angular/router";
export class ConfigurationsPage {
    authService;
    router;
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
    }
    static ɵfac = function ConfigurationsPage_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || ConfigurationsPage)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConfigurationsPage, selectors: [["app-configurations-page"]], decls: 7, vars: 0, consts: [[1, "min-h-[calc(100vh-5rem)]", "bg-slate-50", "px-4", "py-8", "text-slate-800", "sm:px-6", "lg:px-8"], [1, "flex", "flex-col", "gap-6", "lg:flex-row"], [1, "flex", "shrink-0", "flex-col"], [1, "flex", "min-w-0", "flex-1", "flex-col"]], template: function ConfigurationsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-configurations-navbar");
            i0.ɵɵelementStart(1, "section", 0)(2, "div", 1)(3, "div", 2);
            i0.ɵɵelement(4, "app-sidebar-menu");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 3);
            i0.ɵɵelement(6, "router-outlet");
            i0.ɵɵelementEnd()()();
        } }, dependencies: [CommonModule, RouterOutlet, SidebarMenu, ConfigurationsNavbar], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfigurationsPage, [{
        type: Component,
        args: [{ selector: 'app-configurations-page', standalone: true, imports: [CommonModule, RouterOutlet, SidebarMenu, ConfigurationsNavbar], changeDetection: ChangeDetectionStrategy.OnPush, template: "\r\n<app-configurations-navbar />\r\n<section class=\"min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-8 text-slate-800   sm:px-6 lg:px-8\">\r\n  <div class=\"flex flex-col gap-6 lg:flex-row\">\r\n     <div class=\"flex shrink-0 flex-col\">\r\n      <app-sidebar-menu />\r\n    </div>\r\n    <div class=\"flex min-w-0 flex-1 flex-col\">\r\n    \r\n    <router-outlet />\r\n    </div>\r\n  </div>\r\n\r\n</section>\r\n\r\n\r\n\r\n    <!-- <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\r\n      <div class=\"mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\r\n        <div>\r\n          <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">Admin Panel</p>\r\n          <h1 class=\"mt-2 text-3xl font-semibold\">Content management</h1>\r\n          <p class=\"mt-2 max-w-2xl text-sm text-slate-500\">\r\n            Open dedicated pages to manage destinations, tours, and packages.\r\n          </p>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"grid gap-4 md:grid-cols-3\">\r\n      <a routerLink=\"/configurations/destinations\" class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-primary hover:shadow-sm\">\r\n        <h2 class=\"text-xl font-semibold\">Destinations</h2>\r\n        <p class=\"mt-2 text-sm text-slate-500\">Display destinations as table or grid, and add or edit records.</p>\r\n      </a>\r\n      <a routerLink=\"/configurations/tours\" class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-primary hover:shadow-sm\">\r\n        <h2 class=\"text-xl font-semibold\">Tours</h2>\r\n        <p class=\"mt-2 text-sm text-slate-500\">Create and manage tours with itinerary, price, and status controls.</p>\r\n      </a>\r\n      <a routerLink=\"/configurations/packages\" class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-primary hover:shadow-sm\">\r\n        <h2 class=\"text-xl font-semibold\">Packages</h2>\r\n        <p class=\"mt-2 text-sm text-slate-500\">Add and manage package deals for the public travel listing.</p>\r\n      </a>\r\n    </div>\r\n  </div> -->\r\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\nbutton:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConfigurationsPage, { className: "ConfigurationsPage", filePath: "app/features/configurations/configurations-page.ts", lineNumber: 16 }); })();
