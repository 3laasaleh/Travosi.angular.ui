import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { TASK_STATUS_OPTIONS, TaskStatusEnum } from '../task-status.enum';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
function TasksFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function TasksFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function TasksFromCard_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "taskTitleRequired"));
} }
function TasksFromCard_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const agent_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", agent_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", agent_r2.firstName, " ", agent_r2.lastName);
} }
function TasksFromCard_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "agentRequired"));
} }
function TasksFromCard_For_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", option_r3.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, option_r3.labelKey));
} }
function TasksFromCard_For_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", option_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, option_r4.labelKey));
} }
function TasksFromCard_For_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 13);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", option_r5.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, option_r5.labelKey));
} }
function TasksFromCard_Conditional_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 21);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function TasksFromCard_Conditional_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, ctx_r0.selectedTask ? "update" : "add"), " ");
} }
function TasksFromCard_Conditional_68_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function TasksFromCard_Conditional_68_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
export class TasksFromCard {
    apiService;
    cdr;
    selectedTask = null;
    taskSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    taskForm = this.createForm();
    agents = [];
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    taskStatusOptions = TASK_STATUS_OPTIONS;
    taskTypeOptions = [
        { value: 1, labelKey: 'taskTypeFollowUpCustomer' }, { value: 2, labelKey: 'taskTypePrepareQuotation' },
        { value: 3, labelKey: 'taskTypeConfirmBooking' }, { value: 4, labelKey: 'taskTypeCollectPayment' },
        { value: 5, labelKey: 'taskTypeDocumentRequest' }, { value: 6, labelKey: 'taskTypeCustomerSupport' },
        { value: 7, labelKey: 'taskTypeGeneral' },
    ];
    priorityOptions = [
        { value: 1, labelKey: 'priorityLow' }, { value: 2, labelKey: 'priorityMedium' },
        { value: 3, labelKey: 'priorityHigh' }, { value: 4, labelKey: 'priorityUrgent' },
    ];
    constructor(apiService, cdr) {
        this.apiService = apiService;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.loadAgents();
    }
    ngOnChanges(changes) {
        if (!changes['selectedTask'])
            return;
        if (this.selectedTask)
            this.populateForm(this.selectedTask);
        else
            this.resetForm(false);
    }
    loadAgents() {
        this.apiService.get('Account/GetAgents').pipe(catchError(() => of(null)), finalize(() => this.cdr.markForCheck())).subscribe((response) => {
            if (response === null)
                return;
            const rows = response?.data ?? response;
            this.agents = Array.isArray(rows) ? rows : [];
        });
    }
    saveTask() {
        if (this.isLoading)
            return;
        if (this.taskForm.invalid) {
            this.taskForm.markAllAsTouched();
            return;
        }
        const form = this.taskForm.getRawValue();
        const payload = {
            title: form.title.trim(),
            description: form.description.trim(),
            agentId: form.agentId,
            dueDate: form.dueDate || null,
            status: Number(form.status),
            taskType: Number(form.taskType),
            priority: Number(form.priority),
        };
        if (this.selectedTask?.id)
            payload.id = this.selectedTask.id;
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = this.selectedTask
            ? this.apiService.put('Tasks', payload)
            : this.apiService.post('Tasks', payload);
        request$
            .pipe(catchError(() => {
            this.errorMessage = 'taskSaveError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }))
            .subscribe((res) => {
            if (res === null)
                return;
            if (!res.isSuccess) {
                this.errorMessage = res.message;
                return;
            }
            this.successMessage = res.message;
            this.resetForm(false);
            this.taskSaved.emit();
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    populateForm(task) {
        this.taskForm.setValue({
            title: task.title ?? '',
            description: task.description ?? '',
            agentId: task.agentId ?? null,
            dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
            status: task.status ?? TaskStatusEnum.Pending,
            taskType: task.taskType ?? 7,
            priority: task.priority ?? 2,
        });
    }
    resetForm(emitCancel) {
        this.taskForm.reset({
            title: '',
            description: '',
            agentId: null,
            dueDate: '',
            status: TaskStatusEnum.Pending,
            taskType: 7,
            priority: 2,
        });
        if (emitCancel)
            this.editCancelled.emit();
    }
    createForm() {
        return new FormGroup({
            title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            description: new FormControl('', { nonNullable: true }),
            agentId: new FormControl(null, { validators: [Validators.required] }),
            dueDate: new FormControl('', { nonNullable: true }),
            status: new FormControl(TaskStatusEnum.Pending, { nonNullable: true, validators: [Validators.required] }),
            taskType: new FormControl(7, { nonNullable: true, validators: [Validators.required] }),
            priority: new FormControl(2, { nonNullable: true, validators: [Validators.required] }),
        });
    }
    static ɵfac = function TasksFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || TasksFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TasksFromCard, selectors: [["app-tasks-from-card"]], inputs: { selectedTask: "selectedTask" }, outputs: { taskSaved: "taskSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 69, vars: 45, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "text-xl", "font-semibold"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "title", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], [1, "text-slate-400"], ["formControlName", "description", "rows", "4", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "grid", "gap-4", "md:grid-cols-2"], ["formControlName", "agentId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["formControlName", "dueDate", "id", "task-due-date", "inputClass", "rounded-2xl border border-slate-300 px-3 py-2 pe-11", 3, "ariaLabel"], ["formControlName", "taskType", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "priority", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "status", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "flex", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"]], template: function TasksFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, TasksFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, TasksFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "form", 4);
            i0.ɵɵlistener("ngSubmit", function TasksFromCard_Template_form_ngSubmit_6_listener() { return ctx.saveTask(); });
            i0.ɵɵelementStart(7, "div")(8, "label", 5);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(11, "input", 6);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(12, TasksFromCard_Conditional_12_Template, 3, 3, "p", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div")(14, "label", 5);
            i0.ɵɵtext(15);
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵelementStart(17, "span", 8);
            i0.ɵɵtext(18);
            i0.ɵɵpipe(19, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(20, "textarea", 9);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 10)(22, "div")(23, "label", 5);
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "select", 11)(27, "option", 12);
            i0.ɵɵtext(28);
            i0.ɵɵpipe(29, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(30, TasksFromCard_For_31_Template, 2, 3, "option", 13, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(32, TasksFromCard_Conditional_32_Template, 3, 3, "p", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div")(34, "label", 5);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementStart(37, "span", 8);
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(40, "app-date-picker", 14);
            i0.ɵɵpipe(41, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div", 10)(43, "div")(44, "label", 5);
            i0.ɵɵtext(45);
            i0.ɵɵpipe(46, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "select", 15);
            i0.ɵɵrepeaterCreate(48, TasksFromCard_For_49_Template, 3, 4, "option", 13, _forTrack1);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div")(51, "label", 5);
            i0.ɵɵtext(52);
            i0.ɵɵpipe(53, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "select", 16);
            i0.ɵɵrepeaterCreate(55, TasksFromCard_For_56_Template, 3, 4, "option", 13, _forTrack1);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "div")(58, "label", 5);
            i0.ɵɵtext(59);
            i0.ɵɵpipe(60, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "select", 17);
            i0.ɵɵrepeaterCreate(62, TasksFromCard_For_63_Template, 3, 4, "option", 13, _forTrack1);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "div", 18)(65, "button", 19);
            i0.ɵɵconditionalCreate(66, TasksFromCard_Conditional_66_Template, 4, 3)(67, TasksFromCard_Conditional_67_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(68, TasksFromCard_Conditional_68_Template, 3, 4, "button", 20);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 21, ctx.selectedTask ? "editTask" : "addTask"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.taskForm);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 23, "taskTitle"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.taskForm.get("title")?.touched && ctx.taskForm.get("title")?.hasError("required") ? 12 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(16, 25, "description"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(19, 27, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 29, "assignedAgent"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", null);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 31, "selectAgent"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.agents);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.taskForm.get("agentId")?.touched && ctx.taskForm.get("agentId")?.hasError("required") ? 32 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(36, 33, "dueDate"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(39, 35, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ariaLabel", i0.ɵɵpipeBind1(41, 37, "dueDate"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(46, 39, "taskType"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.taskTypeOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(53, 41, "priority"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.priorityOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(60, 43, "taskStatus"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.taskStatusOptions);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.taskForm.invalid || ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 66 : 67);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedTask ? 68 : -1);
        } }, dependencies: [ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TasksFromCard, [{
        type: Component,
        args: [{ selector: 'app-tasks-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\r\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\r\n  <h2 class=\"mb-4 text-xl font-semibold\">{{ (selectedTask ? 'editTask' : 'addTask') | translate }}</h2>\r\n  <form class=\"space-y-4\" [formGroup]=\"taskForm\" (ngSubmit)=\"saveTask()\">\r\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'taskTitle' | translate }}</label><input formControlName=\"title\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (taskForm.get('title')?.touched && taskForm.get('title')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'taskTitleRequired' | translate }}</p> }</div>\r\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'description' | translate }} <span class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><textarea formControlName=\"description\" rows=\"4\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\"></textarea></div>\r\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'assignedAgent' | translate }}</label><select formControlName=\"agentId\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\"><option [ngValue]=\"null\" disabled>{{ 'selectAgent' | translate }}</option>@for (agent of agents; track agent.id) { <option [ngValue]=\"agent.id\">{{ agent.firstName }} {{ agent.lastName }}</option> }</select>@if (taskForm.get('agentId')?.touched && taskForm.get('agentId')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'agentRequired' | translate }}</p> }</div>\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'dueDate' | translate }} <span class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><app-date-picker formControlName=\"dueDate\" id=\"task-due-date\" [ariaLabel]=\"'dueDate' | translate\" inputClass=\"rounded-2xl border border-slate-300 px-3 py-2 pe-11\" /></div>\n    </div>\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'taskType' | translate }}</label><select formControlName=\"taskType\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\">@for (option of taskTypeOptions; track option.value) { <option [ngValue]=\"option.value\">{{ option.labelKey | translate }}</option> }</select></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'priority' | translate }}</label><select formControlName=\"priority\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\">@for (option of priorityOptions; track option.value) { <option [ngValue]=\"option.value\">{{ option.labelKey | translate }}</option> }</select></div>\n    </div>\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'taskStatus' | translate }}</label><select formControlName=\"status\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\">@for (option of taskStatusOptions; track option.value) { <option [ngValue]=\"option.value\">{{ option.labelKey | translate }}</option> }</select></div>\r\n    <div class=\"flex gap-3\"><button type=\"submit\" [disabled]=\"taskForm.invalid || isLoading\" class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'saving' | translate }}</span> } @else { {{ (selectedTask ? 'update' : 'add') | translate }} }</button>@if (selectedTask) { <button type=\"button\" class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading\" (click)=\"cancelEdit()\">{{ 'cancel' | translate }}</button> }</div>\n  </form>\r\n</div>\r\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], { selectedTask: [{
            type: Input
        }], taskSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TasksFromCard, { className: "TasksFromCard", filePath: "app/features/configurations/tasks/tasks-from-card/tasks-from-card.ts", lineNumber: 37 }); })();
