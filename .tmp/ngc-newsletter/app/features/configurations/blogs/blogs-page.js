import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BlogsFormCard } from './blogs-form-card/blogs-form-card';
import { BlogsList } from './blogs-list/blogs-list';
import * as i0 from "@angular/core";
function Blogs_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-blogs-form-card", 12);
    i0.ɵɵlistener("saved", function Blogs_Conditional_22_Template_app_blogs_form_card_saved_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saved()); })("cancelled", function Blogs_Conditional_22_Template_app_blogs_form_card_cancelled_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedBlog", ctx_r1.selectedBlog);
} }
function Blogs_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-blogs-list", 13);
    i0.ɵɵlistener("editRequested", function Blogs_Conditional_23_Template_app_blogs_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.edit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
export class Blogs {
    viewMode = 'table';
    showForm = false;
    selectedBlog = null;
    refreshToken = 0;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedBlog = null;
    }
    edit(blog) { this.selectedBlog = blog; this.showForm = true; }
    closeForm() { this.selectedBlog = null; this.showForm = false; }
    saved() { this.closeForm(); this.refreshToken++; }
    static ɵfac = function Blogs_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Blogs)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Blogs, selectors: [["app-blogs"]], decls: 24, vars: 31, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], ["aria-hidden", "true", 1, "mdi"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [3, "selectedBlog"], [3, "viewMode", "refreshToken"], [3, "saved", "cancelled", "selectedBlog"], [3, "editRequested", "viewMode", "refreshToken"]], template: function Blogs_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "header", 2)(3, "div")(4, "p", 3);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h1", 4);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 5);
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 6)(14, "button", 7);
            i0.ɵɵpipe(15, "translate");
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵlistener("click", function Blogs_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(17, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 9);
            i0.ɵɵpipe(19, "translate");
            i0.ɵɵpipe(20, "translate");
            i0.ɵɵlistener("click", function Blogs_Template_button_click_18_listener() { return ctx.viewMode = ctx.viewMode === "table" ? "grid" : "table"; });
            i0.ɵɵelement(21, "i", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(22, Blogs_Conditional_22_Template, 1, 1, "app-blogs-form-card", 10)(23, Blogs_Conditional_23_Template, 1, 2, "app-blogs-list", 11);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 17, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 19, "blogs"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 21, "manageBlogDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 23, ctx.showForm ? "hideAddBlog" : "showAddBlog"))("aria-label", i0.ɵɵpipeBind1(16, 25, ctx.showForm ? "hideAddBlog" : "showAddBlog"))("aria-expanded", ctx.showForm);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showForm)("mdi-plus", !ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(19, 27, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"))("aria-label", i0.ɵɵpipeBind1(20, 29, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"));
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("mdi-view-grid-outline", ctx.viewMode === "table")("mdi-table", ctx.viewMode === "grid");
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showForm ? 22 : 23);
        } }, dependencies: [BlogsFormCard, BlogsList, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Blogs, [{
        type: Component,
        args: [{ selector: 'app-blogs', standalone: true, imports: [BlogsFormCard, BlogsList, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\n      <div>\n        <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p>\n        <h1 class=\"mt-2 text-3xl font-semibold\">{{ 'blogs' | translate }}</h1>\n        <p class=\"mt-2 text-sm text-slate-500\">{{ 'manageBlogDetails' | translate }}</p>\n      </div>\n\n      <div class=\"flex gap-3\">\n        <button\n          type=\"button\"\n          class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\"\n          [attr.title]=\"(showForm ? 'hideAddBlog' : 'showAddBlog') | translate\"\n          [attr.aria-label]=\"(showForm ? 'hideAddBlog' : 'showAddBlog') | translate\"\n          [attr.aria-expanded]=\"showForm\"\n          (click)=\"toggleForm()\"\n        >\n          <i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\" aria-hidden=\"true\"></i>\n        </button>\n\n        <button\n          type=\"button\"\n          class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\"\n          [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\"\n          [attr.aria-label]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\"\n          (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\"\n        >\n          <i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\" aria-hidden=\"true\"></i>\n        </button>\n      </div>\n    </header>\n\n    @if (showForm) {\n      <app-blogs-form-card [selectedBlog]=\"selectedBlog\" (saved)=\"saved()\" (cancelled)=\"closeForm()\" />\n    } @else {\n      <app-blogs-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (editRequested)=\"edit($event)\" />\n    }\n  </div>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Blogs, { className: "Blogs", filePath: "app/features/configurations/blogs/blogs-page.ts", lineNumber: 13 }); })();
