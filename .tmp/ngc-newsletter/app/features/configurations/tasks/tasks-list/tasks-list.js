import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { TASK_STATUS_OPTIONS, TaskStatusEnum } from '../task-status.enum';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "../../../user/_services/auth.service";
import * as i3 from "../../../../core/services/task-notifications.service";
import * as i4 from "@ngx-translate/core";
const _c0 = () => [1, 2, 3, 4, 5];
const _c1 = () => [1, 2, 3, 4];
const _forTrack0 = ($index, $item) => $item.id;
function TasksList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function TasksList_Conditional_6_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function TasksList_Conditional_6_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 10)(2, "div", 10)(3, "div", 10)(4, "div", 12)(5, "div", 13);
    i0.ɵɵelementEnd();
} }
function TasksList_Conditional_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 9);
    i0.ɵɵrepeaterCreate(2, TasksList_Conditional_6_Conditional_0_For_3_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, TasksList_Conditional_6_Conditional_0_For_5_Template, 6, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c0));
} }
function TasksList_Conditional_6_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 15);
    i0.ɵɵelement(2, "div", 16)(3, "div", 17)(4, "div", 13);
    i0.ɵɵelementEnd()();
} }
function TasksList_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, TasksList_Conditional_6_Conditional_1_For_2_Template, 5, 0, "div", 14, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c1));
} }
function TasksList_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, TasksList_Conditional_6_Conditional_0_Template, 6, 2, "div", 7)(1, TasksList_Conditional_6_Conditional_1_Template, 3, 1, "div", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function TasksList_Conditional_7_For_21_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 28);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function TasksList_Conditional_7_For_21_Conditional_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r3)); });
    i0.ɵɵelement(2, "i", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵattribute("title", i0.ɵɵpipeBind1(1, 1, "edit"));
} }
function TasksList_Conditional_7_For_21_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function TasksList_Conditional_7_For_21_Conditional_15_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.startTask(item_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "startTask"));
} }
function TasksList_Conditional_7_For_21_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function TasksList_Conditional_7_For_21_Conditional_16_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.finishTask(item_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "finishTask"));
} }
function TasksList_Conditional_7_For_21_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function TasksList_Conditional_7_For_21_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeTask(item_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 32);
    i0.ɵɵlistener("click", function TasksList_Conditional_7_For_21_Conditional_17_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const item_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.returnTask(item_r3)); });
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, "closeTask"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 6, "returnTask"));
} }
function TasksList_Conditional_7_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 21)(1, "td", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 20);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td", 20);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 20)(9, "span", 23);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td", 20)(13, "div", 24);
    i0.ɵɵconditionalCreate(14, TasksList_Conditional_7_For_21_Conditional_14_Template, 3, 3, "button", 25);
    i0.ɵɵconditionalCreate(15, TasksList_Conditional_7_For_21_Conditional_15_Template, 3, 4, "button", 26);
    i0.ɵɵconditionalCreate(16, TasksList_Conditional_7_For_21_Conditional_16_Template, 3, 4, "button", 27);
    i0.ɵɵconditionalCreate(17, TasksList_Conditional_7_For_21_Conditional_17_Template, 6, 8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.agentName ?? item_r3.agent?.firstName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 28, item_r3.dueDate, "mediumDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("bg-amber-50", item_r3.status === ctx_r0.taskStatusEnum.Pending)("text-amber-600", item_r3.status === ctx_r0.taskStatusEnum.Pending)("bg-sky-50", item_r3.status === ctx_r0.taskStatusEnum.InProgress)("text-sky-600", item_r3.status === ctx_r0.taskStatusEnum.InProgress)("bg-emerald-50", item_r3.status === ctx_r0.taskStatusEnum.Completed)("text-emerald-600", item_r3.status === ctx_r0.taskStatusEnum.Completed)("bg-rose-50", item_r3.status === ctx_r0.taskStatusEnum.Returned)("text-rose-600", item_r3.status === ctx_r0.taskStatusEnum.Returned)("bg-slate-100", item_r3.status === ctx_r0.taskStatusEnum.Closed)("text-slate-600", item_r3.status === ctx_r0.taskStatusEnum.Closed);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 31, ctx_r0.taskStatusKey(item_r3.status)));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.isAdmin ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canStart(item_r3) ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canFinish(item_r3) ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canReview(item_r3) ? 17 : -1);
} }
function TasksList_Conditional_7_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 33);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noTasksFound"));
} }
function TasksList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "table", 18)(2, "thead", 19)(3, "tr")(4, "th", 20);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 20);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 20);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 20);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 20);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "tbody");
    i0.ɵɵrepeaterCreate(20, TasksList_Conditional_7_For_21_Template, 18, 33, "tr", 21, _forTrack0, false, TasksList_Conditional_7_ForEmpty_22_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 6, "taskTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 8, "assignedAgent"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 10, "dueDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 12, "taskStatus"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 14, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.tasks);
} }
function TasksList_Conditional_8_For_2_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 40)(1, "span", 37);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(3, 2, "agentCompletionNote"), ":");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r7.agentDescription);
} }
function TasksList_Conditional_8_For_2_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function TasksList_Conditional_8_For_2_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const item_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(item_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "edit"));
} }
function TasksList_Conditional_8_For_2_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function TasksList_Conditional_8_For_2_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const item_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.startTask(item_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "startTask"));
} }
function TasksList_Conditional_8_For_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function TasksList_Conditional_8_For_2_Conditional_19_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const item_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.finishTask(item_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "finishTask"));
} }
function TasksList_Conditional_8_For_2_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function TasksList_Conditional_8_For_2_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const item_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeTask(item_r7)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 32);
    i0.ɵɵlistener("click", function TasksList_Conditional_8_For_2_Conditional_20_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r11); const item_r7 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.returnTask(item_r7)); });
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 4, "closeTask"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.updatingTaskId !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 6, "returnTask"));
} }
function TasksList_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 14)(1, "div", 35)(2, "div", 36)(3, "h3", 37);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 23);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p", 38);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 39);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, TasksList_Conditional_8_For_2_Conditional_12_Template, 5, 4, "p", 40);
    i0.ɵɵelementStart(13, "p", 38);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 41);
    i0.ɵɵconditionalCreate(17, TasksList_Conditional_8_For_2_Conditional_17_Template, 3, 3, "button", 42);
    i0.ɵɵconditionalCreate(18, TasksList_Conditional_8_For_2_Conditional_18_Template, 3, 4, "button", 26);
    i0.ɵɵconditionalCreate(19, TasksList_Conditional_8_For_2_Conditional_19_Template, 3, 4, "button", 27);
    i0.ɵɵconditionalCreate(20, TasksList_Conditional_8_For_2_Conditional_20_Template, 6, 8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r7.title);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-amber-50", item_r7.status === ctx_r0.taskStatusEnum.Pending)("text-amber-600", item_r7.status === ctx_r0.taskStatusEnum.Pending)("bg-sky-50", item_r7.status === ctx_r0.taskStatusEnum.InProgress)("text-sky-600", item_r7.status === ctx_r0.taskStatusEnum.InProgress)("bg-emerald-50", item_r7.status === ctx_r0.taskStatusEnum.Completed)("text-emerald-600", item_r7.status === ctx_r0.taskStatusEnum.Completed)("bg-rose-50", item_r7.status === ctx_r0.taskStatusEnum.Returned)("text-rose-600", item_r7.status === ctx_r0.taskStatusEnum.Returned)("bg-slate-100", item_r7.status === ctx_r0.taskStatusEnum.Closed)("text-slate-600", item_r7.status === ctx_r0.taskStatusEnum.Closed);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 30, ctx_r0.taskStatusKey(item_r7.status)));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r7.agentName ?? item_r7.agent?.firstName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7.description);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r7.agentDescription ? 12 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(15, 32, item_r7.dueDate, "mediumDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.isAdmin ? 17 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canStart(item_r7) ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canFinish(item_r7) ? 19 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.canReview(item_r7) ? 20 : -1);
} }
function TasksList_Conditional_8_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 34);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noTasksFound"));
} }
function TasksList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, TasksList_Conditional_8_For_2_Template, 21, 35, "article", 14, _forTrack0, false, TasksList_Conditional_8_ForEmpty_3_Template, 3, 3, "p", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.tasks);
} }
function TasksList_Conditional_9_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r13 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r13);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r13);
} }
function TasksList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 44);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 45)(5, "label", 46)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 47);
    i0.ɵɵlistener("change", function TasksList_Conditional_9_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, TasksList_Conditional_9_For_11_Template, 2, 2, "option", 48, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 49);
    i0.ɵɵlistener("pageChange", function TasksList_Conditional_9_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(3, 7, "totalRecords"), ": ", ctx_r0.paginationInfo.totalCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 9, "pageSize"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r0.paginationInfo.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("compact", true)("currentPage", ctx_r0.paginationInfo.page)("totalPages", ctx_r0.paginationInfo.totalPages);
} }
export class TasksList {
    apiService;
    authService;
    taskNotifications;
    translate;
    cdr;
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    tasks = [];
    isLoading = false;
    updatingTaskId = null;
    errorMessage = '';
    paginationInfo = { page: 1, pageSize: 10, totalCount: 0, totalPages: 0 };
    taskStatusEnum = TaskStatusEnum;
    constructor(apiService, authService, taskNotifications, translate, cdr) {
        this.apiService = apiService;
        this.authService = authService;
        this.taskNotifications = taskNotifications;
        this.translate = translate;
        this.cdr = cdr;
    }
    get isAdmin() {
        return this.authService.getCurrentUserRole() === 'Admin';
    }
    ngOnInit() {
        this.loadTasks();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.loadTasks();
        }
    }
    loadTasks() {
        this.isLoading = true;
        this.errorMessage = '';
        const url = this.isAdmin
            ? `Tasks/GetAllTasks?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`
            : `Tasks/GetAgentTasks?page=${this.paginationInfo.page}&pageSize=${this.paginationInfo.pageSize}`;
        this.apiService.get(url).pipe(catchError(() => {
            this.errorMessage = 'taskServiceUnavailable';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.tasks ?? pageData;
            this.tasks = Array.isArray(rows) ? rows : [];
            this.paginationInfo = {
                page: Number(pageData?.page ?? this.paginationInfo.page),
                pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
                totalCount: Number(pageData?.totalCount ?? this.tasks.length),
                totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
            };
        });
    }
    previousPage() {
        if (this.paginationInfo.page > 1) {
            this.paginationInfo.page--;
            this.loadTasks();
        }
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.loadTasks();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.loadTasks();
    }
    nextPage() {
        if (this.paginationInfo.page < this.paginationInfo.totalPages) {
            this.paginationInfo.page++;
            this.loadTasks();
        }
    }
    taskStatusKey(value) {
        return TASK_STATUS_OPTIONS.find((option) => option.value === Number(value))?.labelKey ?? '';
    }
    canStart(task) {
        const status = Number(task?.status);
        return !this.isAdmin && (status === TaskStatusEnum.Pending || status === TaskStatusEnum.Returned);
    }
    canFinish(task) {
        return !this.isAdmin && Number(task?.status) === TaskStatusEnum.InProgress;
    }
    canReview(task) {
        return this.isAdmin && Number(task?.status) === TaskStatusEnum.Completed;
    }
    startTask(task) {
        this.changeStatus(task, TaskStatusEnum.InProgress);
    }
    async finishTask(task) {
        const result = await Swal.fire({
            title: this.translate.instant('finishTask'),
            input: 'textarea',
            inputLabel: this.translate.instant('agentCompletionNote'),
            inputPlaceholder: this.translate.instant('agentCompletionNotePlaceholder'),
            inputValue: task?.agentDescription ?? '',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('finishTask'),
            cancelButtonText: this.translate.instant('cancel'),
            inputValidator: (value) => value?.trim() ? null : this.translate.instant('agentCompletionNoteRequired'),
        });
        if (!result.isConfirmed)
            return;
        this.changeStatus(task, TaskStatusEnum.Completed, String(result.value).trim());
    }
    closeTask(task) {
        this.changeStatus(task, TaskStatusEnum.Closed);
    }
    async returnTask(task) {
        const result = await Swal.fire({
            title: this.translate.instant('returnTask'),
            input: 'textarea',
            inputLabel: this.translate.instant('returnReason'),
            inputPlaceholder: this.translate.instant('returnReasonPlaceholder'),
            showCancelButton: true,
            confirmButtonText: this.translate.instant('returnTask'),
            cancelButtonText: this.translate.instant('cancel'),
        });
        if (!result.isConfirmed)
            return;
        this.changeStatus(task, TaskStatusEnum.Returned, String(result.value ?? '').trim() || undefined);
    }
    changeStatus(task, status, description) {
        const taskId = Number(task?.id);
        if (!Number.isInteger(taskId) || taskId <= 0 || this.updatingTaskId !== null)
            return;
        const payload = { status: Number(status) };
        if (description !== undefined)
            payload.description = description;
        this.updatingTaskId = taskId;
        this.apiService.patch(`Tasks/${taskId}/ChangeStatus`, payload).pipe(catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('taskStatusUpdateError') });
            return of(null);
        }), finalize(() => {
            this.updatingTaskId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('taskStatusUpdateError') });
                return;
            }
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: response?.message || this.translate.instant('taskStatusUpdated'),
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
            });
            this.taskNotifications.notifyChanged();
            this.loadTasks();
        });
    }
    static ɵfac = function TasksList_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || TasksList)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.TaskNotificationsService), i0.ɵɵdirectiveInject(i4.TranslateService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TasksList, selectors: [["app-configurations-tasks-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 6, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "gap-4", "overflow-y-auto", "pe-1", "md:grid-cols-2"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "grid", "grid-cols-[1fr_1fr_120px_120px_120px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[1fr_1fr_120px_120px_120px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-7", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-2xl", "border"], [1, "space-y-3", "p-4"], [1, "h-5", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "hover:bg-slate-50"], [1, "px-4", "py-3", "font-semibold"], [1, "rounded-full", "px-2", "py-0.5", "text-xs", "font-semibold"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer"], ["type", "button", 1, "rounded-full", "border", "border-sky-300", "px-3", "py-1", "text-xs", "font-semibold", "text-sky-600", "transition-colors", "duration-200", "hover:border-sky-500", "hover:bg-sky-500", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-emerald-300", "px-3", "py-1", "text-xs", "font-semibold", "text-emerald-600", "transition-colors", "duration-200", "hover:border-emerald-500", "hover:bg-emerald-500", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", "cursor-pointer", 3, "click"], [1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "rounded-full", "border", "border-sky-300", "px-3", "py-1", "text-xs", "font-semibold", "text-sky-600", "transition-colors", "duration-200", "hover:border-sky-500", "hover:bg-sky-500", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "border", "border-emerald-300", "px-3", "py-1", "text-xs", "font-semibold", "text-emerald-600", "transition-colors", "duration-200", "hover:border-emerald-500", "hover:bg-emerald-500", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-600", "transition-colors", "duration-200", "hover:border-rose-500", "hover:bg-rose-500", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["colspan", "5", 1, "p-8", "text-center", "text-slate-500"], [1, "text-sm", "text-slate-500"], [1, "p-4"], [1, "flex", "items-center", "justify-between"], [1, "font-semibold"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "mt-2", "text-sm"], [1, "mt-2", "rounded-xl", "bg-slate-50", "p-2", "text-xs", "text-slate-600"], [1, "mt-4", "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-600", "transition-colors", "duration-200", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function TasksList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, TasksList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, TasksList_Conditional_6_Template, 2, 1)(7, TasksList_Conditional_7_Template, 23, 16, "div", 4)(8, TasksList_Conditional_8_Template, 4, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, TasksList_Conditional_9_Template, 13, 11, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "taskRecords"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 6 : ctx.viewMode === "table" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 9 : -1);
        } }, dependencies: [PaginationOne, TranslatePipe, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TasksList, [{
        type: Component,
        args: [{ selector: 'app-configurations-tasks-list', standalone: true, imports: [TranslatePipe, DatePipe, PaginationOne], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\r\n  <div class=\"mb-4 flex items-center justify-between\">\r\n    <h2 class=\"text-xl font-semibold\">{{ 'taskRecords' | translate }}</h2>\r\n  </div>\r\n\r\n  @if (isLoading)\r\n  {\r\n  @if (viewMode === 'table') {\r\n  <div class=\"overflow-hidden rounded-2xl border border-slate-200\">\r\n    <div class=\"grid grid-cols-[1fr_1fr_120px_120px_120px] gap-4 bg-slate-50 px-4 py-3\">\r\n      @for (column of [1,2,3,4,5];track column)\r\n      {\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div> }\r\n    </div>\r\n    @for (row of [1,2,3,4,5];track row)\r\n    { <div class=\"grid grid-cols-[1fr_1fr_120px_120px_120px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-7 animate-pulse rounded-full bg-slate-200\"></div>\r\n      <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n    </div> }\r\n  </div>\r\n  }\r\n  @else {\r\n  <div class=\"grid gap-4 md:grid-cols-2\">@for (card of [1,2,3,4]; track card) { <div class=\"overflow-hidden rounded-2xl border\">\r\n      <div class=\"space-y-3 p-4\">\r\n        <div class=\"h-5 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\r\n        <div class=\"h-8 animate-pulse rounded-full bg-slate-200\"></div>\r\n      </div>\r\n    </div> }</div>\r\n  }\r\n  }\r\n  @else if (viewMode === 'table') {\r\n  <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\r\n    <table class=\"min-w-full text-left text-sm\">\r\n      <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\r\n        <tr>\r\n          <th class=\"px-4 py-3\">{{ 'taskTitle' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'assignedAgent' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'dueDate' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'taskStatus' | translate }}</th>\r\n          <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        @for (item of tasks; track item.id) { <tr class=\"border-t border-slate-200 hover:bg-slate-50\">\r\n          <td class=\"px-4 py-3 font-semibold\">{{ item.title }}</td>\r\n          <td class=\"px-4 py-3\">{{ item.agentName ?? item.agent?.firstName }}</td>\r\n          <td class=\"px-4 py-3\">{{ item.dueDate | date: 'mediumDate' }}</td>\r\n          <td class=\"px-4 py-3\">\r\n            <span class=\"rounded-full px-2 py-0.5 text-xs font-semibold\"\r\n              [class.bg-amber-50]=\"item.status === taskStatusEnum.Pending\" [class.text-amber-600]=\"item.status === taskStatusEnum.Pending\"\r\n              [class.bg-sky-50]=\"item.status === taskStatusEnum.InProgress\" [class.text-sky-600]=\"item.status === taskStatusEnum.InProgress\"\r\n              [class.bg-emerald-50]=\"item.status === taskStatusEnum.Completed\" [class.text-emerald-600]=\"item.status === taskStatusEnum.Completed\"\r\n              [class.bg-rose-50]=\"item.status === taskStatusEnum.Returned\" [class.text-rose-600]=\"item.status === taskStatusEnum.Returned\"\r\n              [class.bg-slate-100]=\"item.status === taskStatusEnum.Closed\" [class.text-slate-600]=\"item.status === taskStatusEnum.Closed\">{{ taskStatusKey(item.status) | translate }}</span>\r\n          </td>\r\n          <td class=\"px-4 py-3\">\r\n            <div class=\"flex flex-wrap gap-2\">\r\n              @if (isAdmin) {\r\n                <button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-amber-300 text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white cursor-pointer\" [attr.title]=\"'edit' | translate\" (click)=\"editRequested.emit(item)\"><i class=\"mdi mdi-pencil-outline\"></i></button>\r\n              }\r\n              @if (canStart(item)) {\r\n                <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-sky-300 px-3 py-1 text-xs font-semibold text-sky-600 transition-colors duration-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"startTask(item)\">{{ 'startTask' | translate }}</button>\r\n              }\r\n              @if (canFinish(item)) {\r\n                <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-600 transition-colors duration-200 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"finishTask(item)\">{{ 'finishTask' | translate }}</button>\r\n              }\r\n              @if (canReview(item)) {\r\n                <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-600 transition-colors duration-200 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"closeTask(item)\">{{ 'closeTask' | translate }}</button>\r\n                <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 transition-colors duration-200 hover:border-rose-500 hover:bg-rose-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"returnTask(item)\">{{ 'returnTask' | translate }}</button>\r\n              }\r\n            </div>\r\n          </td>\r\n        </tr> } @empty { <tr>\r\n          <td colspan=\"5\" class=\"p-8 text-center text-slate-500\">{{ 'noTasksFound' | translate }}</td>\r\n        </tr> }\r\n      </tbody>\r\n    </table>\r\n  </div>\r\n  } @else {\r\n  <div class=\"grid max-h-[70vh] gap-4 overflow-y-auto pe-1 md:grid-cols-2\">@for (item of tasks; track item.id) { <article class=\"overflow-hidden rounded-2xl border\">\r\n      <div class=\"p-4\">\r\n        <div class=\"flex items-center justify-between\">\r\n          <h3 class=\"font-semibold\">{{ item.title }}</h3>\r\n          <span class=\"rounded-full px-2 py-0.5 text-xs font-semibold\"\r\n            [class.bg-amber-50]=\"item.status === taskStatusEnum.Pending\" [class.text-amber-600]=\"item.status === taskStatusEnum.Pending\"\r\n            [class.bg-sky-50]=\"item.status === taskStatusEnum.InProgress\" [class.text-sky-600]=\"item.status === taskStatusEnum.InProgress\"\r\n            [class.bg-emerald-50]=\"item.status === taskStatusEnum.Completed\" [class.text-emerald-600]=\"item.status === taskStatusEnum.Completed\"\r\n            [class.bg-rose-50]=\"item.status === taskStatusEnum.Returned\" [class.text-rose-600]=\"item.status === taskStatusEnum.Returned\"\r\n            [class.bg-slate-100]=\"item.status === taskStatusEnum.Closed\" [class.text-slate-600]=\"item.status === taskStatusEnum.Closed\">{{ taskStatusKey(item.status) | translate }}</span>\r\n        </div>\r\n        <p class=\"mt-1 text-sm text-slate-500\">{{ item.agentName ?? item.agent?.firstName }}</p>\r\n        <p class=\"mt-2 text-sm\">{{ item.description }}</p>\r\n        @if (item.agentDescription) {\r\n          <p class=\"mt-2 rounded-xl bg-slate-50 p-2 text-xs text-slate-600\"><span class=\"font-semibold\">{{ 'agentCompletionNote' | translate }}:</span> {{ item.agentDescription }}</p>\r\n        }\r\n        <p class=\"mt-1 text-sm text-slate-500\">{{ item.dueDate | date: 'mediumDate' }}</p>\r\n        <div class=\"mt-4 flex flex-wrap gap-2\">\r\n          @if (isAdmin) {\r\n            <button type=\"button\" class=\"rounded-full border border-amber-300 px-3 py-1 text-xs font-semibold text-amber-600 transition-colors duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white\" (click)=\"editRequested.emit(item)\">{{ 'edit' | translate }}</button>\r\n          }\r\n          @if (canStart(item)) {\r\n            <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-sky-300 px-3 py-1 text-xs font-semibold text-sky-600 transition-colors duration-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"startTask(item)\">{{ 'startTask' | translate }}</button>\r\n          }\r\n          @if (canFinish(item)) {\r\n            <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-600 transition-colors duration-200 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"finishTask(item)\">{{ 'finishTask' | translate }}</button>\r\n          }\r\n          @if (canReview(item)) {\r\n            <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-emerald-300 px-3 py-1 text-xs font-semibold text-emerald-600 transition-colors duration-200 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"closeTask(item)\">{{ 'closeTask' | translate }}</button>\r\n            <button type=\"button\" [disabled]=\"updatingTaskId !== null\" class=\"rounded-full border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 transition-colors duration-200 hover:border-rose-500 hover:bg-rose-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"returnTask(item)\">{{ 'returnTask' | translate }}</button>\r\n          }\r\n        </div>\r\n      </div>\r\n    </article> } @empty { <p class=\"text-sm text-slate-500\">{{ 'noTasksFound' | translate }}</p> }</div>\r\n  }\r\n  @if (!isLoading) {\r\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\r\n      <span class=\"text-sm font-medium text-slate-500\">{{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}</span>\r\n      <div class=\"flex flex-wrap items-center gap-2\">\r\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\"><span>{{ 'pageSize' | translate }}</span><select class=\"rounded-full border bg-white px-2 py-1 text-sm text-slate-700\" [value]=\"paginationInfo.pageSize\" (change)=\"onPageSizeChange($event)\">@for (size of pageSizeOptions; track size) { <option [value]=\"size\">{{ size }}</option> }</select></label>\r\n        <app-pagination-one [compact]=\"true\" [currentPage]=\"paginationInfo.page\" [totalPages]=\"paginationInfo.totalPages\" (pageChange)=\"onPageChange($event)\" />\r\n      </div>\r\n    </div>\r\n  }\r\n</div>\r\n" }]
    }], () => [{ type: i1.ApiService }, { type: i2.AuthService }, { type: i3.TaskNotificationsService }, { type: i4.TranslateService }, { type: i0.ChangeDetectorRef }], { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TasksList, { className: "TasksList", filePath: "app/features/configurations/tasks/tasks-list/tasks-list.ts", lineNumber: 36 }); })();
