import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TasksFromCard } from './tasks-from-card/tasks-from-card';
import { TasksList } from './tasks-list/tasks-list';
import { AuthService } from '../../user/_services/auth.service';
import * as i0 from "@angular/core";
function Tasks_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function Tasks_Conditional_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵelement(2, "i", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("title", i0.ɵɵpipeBind1(1, 6, ctx_r1.showForm ? "hideAddTask" : "showAddTask"))("aria-expanded", ctx_r1.showForm);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-eye-off-outline", ctx_r1.showForm)("mdi-plus", !ctx_r1.showForm);
} }
function Tasks_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-tasks-from-card", 14);
    i0.ɵɵlistener("taskSaved", function Tasks_Conditional_19_Template_app_tasks_from_card_taskSaved_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleTaskSaved()); })("editCancelled", function Tasks_Conditional_19_Template_app_tasks_from_card_editCancelled_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedTask()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedTask", ctx_r1.selectedTask);
} }
function Tasks_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-configurations-tasks-list", 15);
    i0.ɵɵlistener("editRequested", function Tasks_Conditional_20_Template_app_configurations_tasks_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectTaskForEdit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
export class Tasks {
    authService = inject(AuthService);
    viewMode = 'table';
    selectedTask = null;
    refreshToken = 0;
    get isAdmin() {
        return this.authService.getCurrentUserRole() === 'Admin';
    }
    showForm = false;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedTask = null;
    }
    selectTaskForEdit(task) {
        this.selectedTask = task;
        this.showForm = true;
    }
    clearSelectedTask() {
        this.selectedTask = null;
        this.showForm = false;
    }
    handleTaskSaved() {
        this.selectedTask = null;
        this.showForm = false;
        this.refreshToken++;
    }
    static ɵfac = function Tasks_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Tasks)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Tasks, selectors: [["app-tasks"]], decls: 21, vars: 18, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "mdi"], [1, "grid", "grid-cols-1", "gap-6"], [3, "selectedTask"], [3, "viewMode", "refreshToken"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [3, "taskSaved", "editCancelled", "selectedTask"], [3, "editRequested", "viewMode", "refreshToken"]], template: function Tasks_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵelementStart(13, "div", 6);
            i0.ɵɵconditionalCreate(14, Tasks_Conditional_14_Template, 3, 8, "button", 7);
            i0.ɵɵelementStart(15, "button", 8);
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵlistener("click", function Tasks_Template_button_click_15_listener() { return ctx.viewMode = ctx.viewMode === "table" ? "grid" : "table"; });
            i0.ɵɵelement(17, "i", 9);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "div", 10);
            i0.ɵɵconditionalCreate(19, Tasks_Conditional_19_Template, 1, 1, "app-tasks-from-card", 11)(20, Tasks_Conditional_20_Template, 1, 2, "app-configurations-tasks-list", 12);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 10, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 12, "tasks"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 14, "manageTaskDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.isAdmin ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(16, 16, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-view-grid-outline", ctx.viewMode === "table")("mdi-table", ctx.viewMode === "grid");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showForm && ctx.isAdmin ? 19 : 20);
        } }, dependencies: [TasksFromCard, TasksList, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Tasks, [{
        type: Component,
        args: [{ selector: 'app-tasks', standalone: true, imports: [TranslatePipe, TasksFromCard, TasksList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\r\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\r\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\r\n      <div><p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p><h1 class=\"mt-2 text-3xl font-semibold\">{{ 'tasks' | translate }}</h1><p class=\"mt-2 text-sm text-slate-500\">{{ 'manageTaskDetails' | translate }}</p></div>\r\n      <div class=\"flex gap-3\">\r\n        \r\n        @if (isAdmin) {\r\n          <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"(showForm ? 'hideAddTask' : 'showAddTask') | translate\" [attr.aria-expanded]=\"showForm\" (click)=\"toggleForm()\"><i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\"></i></button>\r\n        }\r\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\"><i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i></button>\r\n      </div>\r\n    </header>\r\n    <div class=\"grid grid-cols-1 gap-6\">\n      @if (showForm && isAdmin) {\n        <app-tasks-from-card [selectedTask]=\"selectedTask\" (taskSaved)=\"handleTaskSaved()\" (editCancelled)=\"clearSelectedTask()\" />\n      } @else {\n        <app-configurations-tasks-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (editRequested)=\"selectTaskForEdit($event)\" />\n      }\n    </div>\r\n  </div>\r\n</section>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Tasks, { className: "Tasks", filePath: "app/features/configurations/tasks/tasks-page.ts", lineNumber: 15 }); })();
