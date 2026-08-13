import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@angular/forms";
const _c0 = a0 => ({ agent: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function BookingsFromCard_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function BookingsFromCard_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵelement(2, "i", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 10);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 11);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 12);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 13);
    i0.ɵɵlistener("click", function BookingsFromCard_Conditional_12_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeAfterSuccess()); });
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "assignmentSuccessful"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 6, ctx_r0.successMessage));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 8, "agentNotificationConfirmed", i0.ɵɵpureFunction1(13, _c0, ctx_r0.selectedAgentName)));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 11, "done"));
} }
function BookingsFromCard_Conditional_13_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 26)(2, "p", 27);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 28);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p", 12);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 29);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("#", ctx_r0.selectedBooking.id, " \u2014 ", ctx_r0.selectedBooking.tourTitle ?? ctx_r0.selectedBooking.packageName ?? "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 10, ctx_r0.selectedBooking.createdDate, "mediumDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3("", i0.ɵɵpipeBind1(9, 13, "customer"), ": ", ctx_r0.selectedBooking.userName ?? "-", " \u00B7 ", ctx_r0.selectedBooking.userMobile ?? "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate4("", ctx_r0.selectedBooking.numberOfTravelers, " ", i0.ɵɵpipeBind1(12, 15, "guests"), " \u2014 ", i0.ɵɵpipeBind1(13, 17, "total"), ": $", ctx_r0.selectedBooking.totalPrice);
} }
function BookingsFromCard_Conditional_13_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 19);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const agent_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", agent_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", agent_r4.firstName, " ", agent_r4.lastName);
} }
function BookingsFromCard_Conditional_13_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "agentRequired"));
} }
function BookingsFromCard_Conditional_13_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 30);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(2, 1, "saving"), " ");
} }
function BookingsFromCard_Conditional_13_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(2, 1, "assignAndNotify"), " ");
} }
function BookingsFromCard_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, BookingsFromCard_Conditional_13_Conditional_0_Template, 14, 19, "div", 14);
    i0.ɵɵelementStart(1, "form", 15);
    i0.ɵɵlistener("ngSubmit", function BookingsFromCard_Conditional_13_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.saveAssignment()); });
    i0.ɵɵelementStart(2, "div")(3, "label", 16);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "select", 17)(7, "option", 18);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, BookingsFromCard_Conditional_13_For_11_Template, 2, 3, "option", 19, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(12, BookingsFromCard_Conditional_13_Conditional_12_Template, 3, 3, "p", 20);
    i0.ɵɵelementStart(13, "p", 21);
    i0.ɵɵelement(14, "i", 22);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 23)(18, "button", 24);
    i0.ɵɵlistener("click", function BookingsFromCard_Conditional_13_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 25);
    i0.ɵɵconditionalCreate(22, BookingsFromCard_Conditional_13_Conditional_22_Template, 3, 3)(23, BookingsFromCard_Conditional_13_Conditional_23_Template, 3, 3);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.selectedBooking ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r0.bookingForm);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 11, "assignedAgent"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 13, "selectAgent"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.agents);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.bookingForm.controls.agentId.touched && ctx_r0.bookingForm.controls.agentId.invalid ? 12 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 15, "bookingAgentNotificationHint"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 17, "cancel"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.bookingForm.invalid || ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isLoading ? 22 : 23);
} }
export class BookingsFromCard {
    apiService;
    cdr;
    selectedBooking = null;
    bookingSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    bookingForm = this.createForm();
    agents = [];
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    assignmentSucceeded = false;
    get selectedAgentName() {
        const selectedId = Number(this.bookingForm.controls.agentId.value);
        const agent = this.agents.find((item) => Number(item.id) === selectedId);
        return agent ? `${agent.firstName ?? ''} ${agent.lastName ?? ''}`.trim() : '';
    }
    constructor(apiService, cdr) {
        this.apiService = apiService;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.loadAgents();
    }
    ngOnChanges(changes) {
        if (!changes['selectedBooking'])
            return;
        if (this.selectedBooking)
            this.populateForm(this.selectedBooking);
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
    saveAssignment() {
        if (this.isLoading)
            return;
        if (this.bookingForm.invalid) {
            this.bookingForm.markAllAsTouched();
            return;
        }
        const bookingId = Number(this.selectedBooking?.id ?? this.selectedBooking?.bookingId);
        if (!Number.isInteger(bookingId) || bookingId <= 0)
            return;
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        this.apiService
            .patch(`Bookings/${bookingId}/AssignAgent`, { agentId: this.bookingForm.getRawValue().agentId })
            .pipe(catchError(() => {
            this.errorMessage = 'bookingAssignError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }))
            .subscribe((res) => {
            if (res === null)
                return;
            if (res?.isSuccess === false) {
                this.errorMessage = res?.message || 'bookingAssignError';
                return;
            }
            this.successMessage = res?.message || 'bookingAssigned';
            this.assignmentSucceeded = true;
        });
    }
    closeAfterSuccess() {
        this.bookingSaved.emit();
    }
    cancelEdit() {
        this.resetForm(true);
    }
    populateForm(booking) {
        this.bookingForm.setValue({
            agentId: booking?.agentId ?? booking?.agent?.id ?? null,
        });
    }
    resetForm(emitCancel) {
        this.bookingForm.reset({ agentId: null });
        this.assignmentSucceeded = false;
        this.successMessage = '';
        if (emitCancel)
            this.editCancelled.emit();
    }
    createForm() {
        return new FormGroup({
            agentId: new FormControl(null, { validators: [Validators.required] }),
        });
    }
    static ɵfac = function BookingsFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || BookingsFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BookingsFromCard, selectors: [["app-bookings-from-card"]], inputs: { selectedBooking: "selectedBooking" }, outputs: { bookingSaved: "bookingSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 14, vars: 8, consts: [[1, "rounded-3xl", "border", "border-white/30", "bg-white", "p-6", "shadow-2xl"], [1, "mb-5", "flex", "items-start", "justify-between", "gap-4"], [1, "text-xs", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "mt-1", "text-2xl", "font-semibold"], ["type", "button", 1, "grid", "h-9", "w-9", "place-items-center", "rounded-full", "border", "border-slate-200", "text-slate-500", "hover:bg-slate-100", 3, "click"], [1, "mdi", "mdi-close"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "rounded-3xl", "border", "border-emerald-200", "bg-emerald-50", "p-6", "text-center"], [1, "mx-auto", "grid", "h-16", "w-16", "place-items-center", "rounded-full", "bg-emerald-500", "text-3xl", "text-white"], [1, "mdi", "mdi-check"], [1, "mt-4", "text-xl", "font-semibold", "text-emerald-800"], [1, "mt-2", "text-sm", "text-emerald-700"], [1, "mt-2", "text-sm", "text-slate-600"], ["type", "button", 1, "mt-5", "rounded-full", "bg-primary", "px-6", "py-2.5", "text-sm", "font-semibold", "text-white", 3, "click"], [1, "mb-5", "rounded-2xl", "border", "border-slate-200", "bg-slate-50", "p-4"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "agentId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2.5", "outline-none", "focus:border-primary"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], [1, "mt-1", "text-xs", "text-red-600"], [1, "mt-2", "text-xs", "text-slate-500"], [1, "mdi", "mdi-bell-outline", "me-1", "text-primary"], [1, "flex", "justify-end", "gap-3"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"], ["type", "submit", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2", "text-sm", "font-semibold", "text-white", "disabled:opacity-60", 3, "disabled"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-2"], [1, "font-semibold"], [1, "text-sm", "text-slate-500"], [1, "mt-1", "text-sm", "text-slate-600"], [1, "mdi", "mdi-loading", "mdi-spin"], [1, "mdi", "mdi-account-arrow-right-outline"]], template: function BookingsFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h2", 3);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "button", 4);
            i0.ɵɵlistener("click", function BookingsFromCard_Template_button_click_9_listener() { return ctx.cancelEdit(); });
            i0.ɵɵelement(10, "i", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(11, BookingsFromCard_Conditional_11_Template, 3, 3, "div", 6);
            i0.ɵɵconditionalCreate(12, BookingsFromCard_Conditional_12_Template, 15, 15, "div", 7)(13, BookingsFromCard_Conditional_13_Template, 24, 19);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "bookingAssignment"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 6, "assignBookingAgent"));
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.errorMessage ? 11 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.assignmentSucceeded ? 12 : 13);
        } }, dependencies: [ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BookingsFromCard, [{
        type: Component,
        args: [{ selector: 'app-bookings-from-card', standalone: true, imports: [DatePipe, ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-white/30 bg-white p-6 shadow-2xl\">\n  <div class=\"mb-5 flex items-start justify-between gap-4\"><div><p class=\"text-xs font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'bookingAssignment' | translate }}</p><h2 class=\"mt-1 text-2xl font-semibold\">{{ 'assignBookingAgent' | translate }}</h2></div><button type=\"button\" class=\"grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100\" (click)=\"cancelEdit()\"><i class=\"mdi mdi-close\"></i></button></div>\n\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n\n  @if (assignmentSucceeded) {\n    <div class=\"rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center\">\n      <span class=\"mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-3xl text-white\"><i class=\"mdi mdi-check\"></i></span>\n      <h3 class=\"mt-4 text-xl font-semibold text-emerald-800\">{{ 'assignmentSuccessful' | translate }}</h3>\n      <p class=\"mt-2 text-sm text-emerald-700\">{{ successMessage | translate }}</p>\n      <p class=\"mt-2 text-sm text-slate-600\">{{ 'agentNotificationConfirmed' | translate:{ agent: selectedAgentName } }}</p>\n      <button type=\"button\" class=\"mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white\" (click)=\"closeAfterSuccess()\">{{ 'done' | translate }}</button>\n    </div>\n  } @else {\n    @if (selectedBooking) {\n      <div class=\"mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4\">\n        <div class=\"flex flex-wrap items-center justify-between gap-2\"><p class=\"font-semibold\">#{{ selectedBooking.id }} \u2014 {{ selectedBooking.tourTitle ?? selectedBooking.packageName ?? '-' }}</p><p class=\"text-sm text-slate-500\">{{ selectedBooking.createdDate | date: 'mediumDate' }}</p></div>\n        <p class=\"mt-2 text-sm text-slate-600\">{{ 'customer' | translate }}: {{ selectedBooking.userName ?? '-' }} \u00B7 {{ selectedBooking.userMobile ?? '-' }}</p>\n        <p class=\"mt-1 text-sm text-slate-600\">{{ selectedBooking.numberOfTravelers }} {{ 'guests' | translate }} \u2014 {{ 'total' | translate }}: ${{ selectedBooking.totalPrice }}</p>\n      </div>\n    }\n    <form class=\"space-y-4\" [formGroup]=\"bookingForm\" (ngSubmit)=\"saveAssignment()\">\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'assignedAgent' | translate }}</label><select formControlName=\"agentId\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-primary\"><option [ngValue]=\"null\" disabled>{{ 'selectAgent' | translate }}</option>@for (agent of agents; track agent.id) { <option [ngValue]=\"agent.id\">{{ agent.firstName }} {{ agent.lastName }}</option> }</select>@if (bookingForm.controls.agentId.touched && bookingForm.controls.agentId.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'agentRequired' | translate }}</p> }<p class=\"mt-2 text-xs text-slate-500\"><i class=\"mdi mdi-bell-outline me-1 text-primary\"></i>{{ 'bookingAgentNotificationHint' | translate }}</p></div>\n      <div class=\"flex justify-end gap-3\"><button type=\"button\" class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading\" (click)=\"cancelEdit()\">{{ 'cancel' | translate }}</button><button type=\"submit\" [disabled]=\"bookingForm.invalid || isLoading\" class=\"inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:opacity-60\">@if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\"></i>{{ 'saving' | translate }} } @else { <i class=\"mdi mdi-account-arrow-right-outline\"></i>{{ 'assignAndNotify' | translate }} }</button></div>\n    </form>\n  }\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], { selectedBooking: [{
            type: Input
        }], bookingSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BookingsFromCard, { className: "BookingsFromCard", filePath: "app/features/configurations/bookings/bookings-from-card/bookings-from-card.ts", lineNumber: 25 }); })();
