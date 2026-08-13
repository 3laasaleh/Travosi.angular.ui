import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../features/user/_services/auth.service';
import * as i0 from "@angular/core";
const _c0 = () => ({ exact: true });
const _forTrack0 = ($index, $item) => $item.path;
function SidebarMenu_Conditional_0_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "h5", 7);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 8);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "adminAgentMenu"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, "quickAccessManagement"));
} }
function SidebarMenu_Conditional_0_For_11_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, item_r3.label));
} }
function SidebarMenu_Conditional_0_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "a", 9);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelement(3, "i");
    i0.ɵɵconditionalCreate(4, SidebarMenu_Conditional_0_For_11_Conditional_4_Template, 3, 3, "span");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.activeMenu === item_r3.path);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("justify-center", ctx_r1.collapsed)("px-0", ctx_r1.collapsed);
    i0.ɵɵproperty("routerLink", item_r3.path)("routerLinkActiveOptions", i0.ɵɵpureFunction0(14, _c0));
    i0.ɵɵattribute("title", ctx_r1.collapsed ? i0.ɵɵpipeBind1(2, 12, item_r3.label) : null);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("mdi text-xl leading-none " + item_r3.icon);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.collapsed ? 4 : -1);
} }
function SidebarMenu_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 1)(1, "div", 2);
    i0.ɵɵconditionalCreate(2, SidebarMenu_Conditional_0_Conditional_2_Template, 7, 6, "div");
    i0.ɵɵelementStart(3, "button", 3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵlistener("click", function SidebarMenu_Conditional_0_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleCollapsed()); });
    i0.ɵɵelement(6, "i", 4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "nav");
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementStart(9, "ul", 5);
    i0.ɵɵrepeaterCreate(10, SidebarMenu_Conditional_0_For_11_Template, 5, 15, "li", 6, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("w-72", !ctx_r1.collapsed)("w-24", ctx_r1.collapsed);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("justify-between", !ctx_r1.collapsed)("justify-center", ctx_r1.collapsed);
    i0.ɵɵadvance();
    i0.ɵɵconditional(!ctx_r1.collapsed ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(4, 17, ctx_r1.collapsed ? "expandMenu" : "collapseMenu"))("title", i0.ɵɵpipeBind1(5, 19, ctx_r1.collapsed ? "expandMenu" : "collapseMenu"))("aria-expanded", !ctx_r1.collapsed);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("mdi-chevron-double-left", !ctx_r1.collapsed)("mdi-chevron-double-right", ctx_r1.collapsed);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(8, 21, "adminNavigation"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.menuItems);
} }
export class SidebarMenu {
    authService = inject(AuthService);
    activeMenu = '';
    collapsed = false;
    menuItems = [
        { label: 'destinations', path: '/configurations/destinations', icon: 'mdi-map-marker-outline' },
        { label: 'tours', path: '/configurations/tours', icon: 'mdi-compass-outline' },
        { label: 'packages', path: '/configurations/packages', icon: 'mdi-package-variant-closed' },
        { label: 'bookings', path: '/configurations/bookings', icon: 'mdi-calendar-check-outline' },
        { label: 'customers', path: '/configurations/customers', icon: 'mdi-account-group-outline' },
        { label: 'tasks', path: '/configurations/tasks', icon: 'mdi-checkbox-marked-outline' },
        { label: 'airlines', path: '/configurations/airlines', icon: 'mdi-airplane' },
        { label: 'hotels', path: '/configurations/hotels', icon: 'mdi-bed-outline' },
        { label: 'flights', path: '/configurations/flights', icon: 'mdi-airplane-takeoff' },
        { label: 'cities', path: '/configurations/cities', icon: 'mdi-city-variant-outline' },
        { label: 'blogs', path: '/configurations/blogs', icon: 'mdi-post-outline' },
        { label: 'quotations', path: '/configurations/quotations', icon: 'mdi-file-document-outline' },
        { label: 'invoices', path: '/configurations/invoices', icon: 'mdi-receipt-text-outline' },
        { label: 'vouchers', path: '/configurations/vouchers', icon: 'mdi-ticket-confirmation-outline' },
    ];
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }
    get currentRole() {
        return this.authService.getCurrentUserRole();
    }
    get showSidebar() {
        return this.currentRole === 'Admin' || this.currentRole === 'Agent';
    }
    static ɵfac = function SidebarMenu_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SidebarMenu)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SidebarMenu, selectors: [["app-sidebar-menu"]], decls: 1, vars: 1, consts: [[1, "hidden", "lg:block", "shrink-0", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm", "transition-all", "duration-300", 3, "w-72", "w-24"], [1, "hidden", "lg:block", "shrink-0", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm", "transition-all", "duration-300"], [1, "mb-6", "flex", "items-start", "gap-2"], ["type", "button", 1, "grid", "h-10", "w-10", "shrink-0", "cursor-pointer", "place-items-center", "rounded-full", "border", "border-slate-300", "text-xl", "text-slate-600", "transition-colors", "duration-200", "hover:border-primary", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi"], [1, "space-y-2", "text-sm"], [3, "active"], [1, "text-lg", "font-semibold", "text-slate-900"], [1, "text-sm", "text-slate-500", "mt-1"], ["routerLinkActive", "active !border-primary !bg-primary !text-white", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-2xl", "border", "border-gray-100", "bg-slate-50", "px-4", "py-3", "text-slate-700", "transition", "hover:border-primary", "hover:bg-primary", "hover:text-white", 3, "routerLink", "routerLinkActiveOptions"]], template: function SidebarMenu_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, SidebarMenu_Conditional_0_Template, 12, 23, "aside", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.showSidebar ? 0 : -1);
        } }, dependencies: [RouterLink, RouterLinkActive, TranslatePipe], styles: ["[_nghost-%COMP%] { display: contents; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SidebarMenu, [{
        type: Component,
        args: [{ selector: 'app-sidebar-menu', imports: [RouterLink, RouterLinkActive, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if(showSidebar) {\r\n  <aside\r\n    class=\"hidden lg:block shrink-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 \"\r\n    [class.w-72]=\"!collapsed\"\r\n    [class.w-24]=\"collapsed\"\r\n  >\r\n    <div class=\"mb-6 flex items-start gap-2\" [class.justify-between]=\"!collapsed\" [class.justify-center]=\"collapsed\">\r\n      @if (!collapsed) {\r\n        <div>\r\n          <h5 class=\"text-lg font-semibold text-slate-900 \">{{ 'adminAgentMenu' | translate }}</h5>\r\n          <p class=\"text-sm text-slate-500  mt-1\">{{ 'quickAccessManagement' | translate }}</p>\r\n        </div>\r\n      }\r\n      <button\r\n        type=\"button\"\r\n        class=\"grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-slate-300 text-xl text-slate-600 transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white\"\r\n        [attr.aria-label]=\"(collapsed ? 'expandMenu' : 'collapseMenu') | translate\"\r\n        [attr.title]=\"(collapsed ? 'expandMenu' : 'collapseMenu') | translate\"\r\n        [attr.aria-expanded]=\"!collapsed\"\r\n        (click)=\"toggleCollapsed()\"\r\n      >\r\n        <i class=\"mdi\" [class.mdi-chevron-double-left]=\"!collapsed\" [class.mdi-chevron-double-right]=\"collapsed\"></i>\r\n      </button>\r\n    </div>\r\n\r\n    <nav [attr.aria-label]=\"'adminNavigation' | translate\">\r\n      <ul class=\"space-y-2 text-sm\">\r\n        @for (item of menuItems; track item.path) {\r\n          <li [class.active]=\"activeMenu === item.path\">\r\n            <a\r\n              [routerLink]=\"item.path\"\r\n              routerLinkActive=\"active !border-primary !bg-primary !text-white\"\r\n              [routerLinkActiveOptions]=\"{ exact: true }\"\r\n              ariaCurrentWhenActive=\"page\"\r\n              class=\"flex items-center gap-3 rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-primary hover:bg-primary hover:text-white\"\r\n              [class.justify-center]=\"collapsed\"\r\n              [class.px-0]=\"collapsed\"\r\n              [attr.title]=\"collapsed ? (item.label | translate) : null\"\r\n            >\r\n              <i [class]=\"'mdi text-xl leading-none ' + item.icon\"></i>\r\n              @if (!collapsed) {\r\n                <span>{{ item.label | translate }}</span>\r\n              }\r\n            </a>\r\n          </li>\r\n        }\r\n      </ul>\r\n    </nav>\r\n  </aside>\r\n}\r\n", styles: [":host { display: contents; }"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SidebarMenu, { className: "SidebarMenu", filePath: "app/layout/sidebar-menu/sidebar-menu.ts", lineNumber: 19 }); })();
