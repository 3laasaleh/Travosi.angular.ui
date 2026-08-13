import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/apiservice.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function Vouchers_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage), " ");
} }
function Vouchers_Conditional_16_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 28);
    i0.ɵɵlistener("click", function Vouchers_Conditional_16_Conditional_0_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.loadOptions()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, "voucherOptionsLoadError"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 5, ctx_r0.isOptionsLoading ? "loading" : "retry"), " ");
} }
function Vouchers_Conditional_16_For_11_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const customer_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" - ", customer_r4.mobile, " ");
} }
function Vouchers_Conditional_16_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵconditionalCreate(2, Vouchers_Conditional_16_For_11_Conditional_2_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const customer_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngValue", customer_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.customerName(customer_r4), " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(customer_r4.mobile ? 2 : -1);
} }
function Vouchers_Conditional_16_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "customerRequired"));
} }
function Vouchers_Conditional_16_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r5.key));
} }
function Vouchers_Conditional_16_For_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const service_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngValue", service_r6.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.serviceName(service_r6));
} }
function Vouchers_Conditional_16_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noServicesAvailable"));
} }
function Vouchers_Conditional_16_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "serviceRequired"));
} }
function Vouchers_Conditional_16_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "serviceDateRequired"));
} }
function Vouchers_Conditional_16_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "invalidVoucherDates"));
} }
function Vouchers_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, Vouchers_Conditional_16_Conditional_0_Template, 7, 7, "div", 10);
    i0.ɵɵelementStart(1, "form", 11);
    i0.ɵɵlistener("ngSubmit", function Vouchers_Conditional_16_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.save()); });
    i0.ɵɵelementStart(2, "div", 12)(3, "label", 13);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementStart(6, "select", 14)(7, "option", 15);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, Vouchers_Conditional_16_For_11_Template, 3, 3, "option", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(12, Vouchers_Conditional_16_Conditional_12_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "label", 13);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementStart(16, "select", 17);
    i0.ɵɵlistener("change", function Vouchers_Conditional_16_Template_select_change_16_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.serviceTypeChanged()); });
    i0.ɵɵrepeaterCreate(17, Vouchers_Conditional_16_For_18_Template, 3, 4, "option", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "label", 18);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementStart(22, "select", 19)(23, "option", 15);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(26, Vouchers_Conditional_16_For_27_Template, 2, 2, "option", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(28, Vouchers_Conditional_16_Conditional_28_Template, 3, 3, "small", 20)(29, Vouchers_Conditional_16_Conditional_29_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "label", 13);
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "translate");
    i0.ɵɵelement(33, "app-date-picker", 21);
    i0.ɵɵpipe(34, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(35, Vouchers_Conditional_16_Conditional_35_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "label", 13);
    i0.ɵɵtext(37);
    i0.ɵɵpipe(38, "translate");
    i0.ɵɵelement(39, "app-date-picker", 22);
    i0.ɵɵpipe(40, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(41, Vouchers_Conditional_16_Conditional_41_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "p", 23);
    i0.ɵɵelement(43, "i", 24);
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "div", 25)(47, "button", 26);
    i0.ɵɵlistener("click", function Vouchers_Conditional_16_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleForm()); });
    i0.ɵɵtext(48);
    i0.ɵɵpipe(49, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "button", 27);
    i0.ɵɵtext(51);
    i0.ɵɵpipe(52, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.optionsLoadError ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 25, "customer"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 27, "select"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.customers);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.form.controls.customerId.touched && ctx_r0.form.controls.customerId.invalid ? 12 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(15, 29, "voucherType"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.types);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 31, "service"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 33, ctx_r0.isOptionsLoading ? "loading" : "select"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.serviceOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.isOptionsLoading && !ctx_r0.serviceOptions.length ? 28 : ctx_r0.form.controls.serviceId.touched && ctx_r0.form.controls.serviceId.invalid ? 29 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(32, 35, "serviceDate"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ariaLabel", i0.ɵɵpipeBind1(34, 37, "serviceDate"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.form.controls.serviceDate.touched && ctx_r0.form.controls.serviceDate.invalid ? 35 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(38, 39, "endDateOptional"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("min", ctx_r0.form.controls.serviceDate.value || null)("ariaLabel", i0.ɵɵpipeBind1(40, 41, "endDateOptional"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.form.hasError("invalidDateRange") && ctx_r0.form.controls.endDate.touched ? 41 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(45, 43, "voucherDetailsHelp"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(49, 45, "cancel"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.isOptionsLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(52, 47, ctx_r0.isSaving ? "saving" : "save"), " ");
} }
function Vouchers_Conditional_17_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 32);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "loading"));
} }
function Vouchers_Conditional_17_Conditional_24_For_1_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 35);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const voucher_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(2, 2, "to"), " ", voucher_r8.endDate);
} }
function Vouchers_Conditional_17_Conditional_24_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 33)(1, "td", 34);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 31);
    i0.ɵɵtext(4);
    i0.ɵɵelementStart(5, "small", 35);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 31);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 31);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 31);
    i0.ɵɵtext(13);
    i0.ɵɵconditionalCreate(14, Vouchers_Conditional_17_Conditional_24_For_1_Conditional_14_Template, 3, 4, "small", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 31)(16, "div", 36)(17, "button", 37);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵlistener("click", function Vouchers_Conditional_17_Conditional_24_For_1_Template_button_click_17_listener() { const voucher_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.edit(voucher_r8)); });
    i0.ɵɵelement(19, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 39);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵlistener("click", function Vouchers_Conditional_17_Conditional_24_For_1_Template_button_click_20_listener() { const voucher_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.pdf(voucher_r8)); });
    i0.ɵɵelement(22, "i", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 40);
    i0.ɵɵpipe(24, "translate");
    i0.ɵɵlistener("click", function Vouchers_Conditional_17_Conditional_24_For_1_Template_button_click_23_listener() { const voucher_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.delete(voucher_r8)); });
    i0.ɵɵelement(25, "i", 7);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const voucher_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(voucher_r8.voucherNo);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", voucher_r8.customerName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(voucher_r8.customerNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 25, ctx_r0.voucherTypeKey(voucher_r8.serviceType)));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(voucher_r8.serviceName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", voucher_r8.serviceDate, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(voucher_r8.endDate ? 14 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.deletingId !== null || ctx_r0.downloadingId !== null);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(18, 27, "edit"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.downloadingId !== null || ctx_r0.deletingId !== null);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(21, 29, "downloadPdf"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.downloadingId === voucher_r8.id)("mdi-spin", ctx_r0.downloadingId === voucher_r8.id)("mdi-file-pdf-box", ctx_r0.downloadingId !== voucher_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.deletingId !== null || ctx_r0.downloadingId !== null);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(24, 31, "delete"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.deletingId === voucher_r8.id)("mdi-spin", ctx_r0.deletingId === voucher_r8.id)("mdi-delete-outline", ctx_r0.deletingId !== voucher_r8.id);
} }
function Vouchers_Conditional_17_Conditional_24_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 32);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noVouchersFound"));
} }
function Vouchers_Conditional_17_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, Vouchers_Conditional_17_Conditional_24_For_1_Template, 26, 33, "tr", 33, _forTrack0, false, Vouchers_Conditional_17_Conditional_24_ForEmpty_2_Template, 4, 3, "tr");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r0.vouchers);
} }
function Vouchers_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "table", 29)(2, "thead", 30)(3, "tr")(4, "th", 31);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 31);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 31);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 31);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 31);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 31);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody");
    i0.ɵɵconditionalCreate(23, Vouchers_Conditional_17_Conditional_23_Template, 4, 3, "tr")(24, Vouchers_Conditional_17_Conditional_24_Template, 3, 1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "voucherNo"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "customer"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 11, "type"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 13, "service"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 15, "serviceDates"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 17, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.isListLoading ? 23 : 24);
} }
export class Vouchers {
    api;
    cdr;
    translate;
    showForm = false;
    vouchers = [];
    customers = [];
    flights = [];
    hotels = [];
    tours = [];
    packages = [];
    selectedId = 0;
    errorMessage = '';
    isListLoading = false;
    isOptionsLoading = false;
    optionsLoadError = false;
    isSaving = false;
    deletingId = null;
    downloadingId = null;
    types = [
        { id: 1, key: 'flight', referenceKey: 'flightId' },
        { id: 2, key: 'hotel', referenceKey: 'hotelId' },
        { id: 3, key: 'tour', referenceKey: 'tourId' },
        { id: 4, key: 'package', referenceKey: 'packageId' },
    ];
    form = new FormGroup({
        customerId: new FormControl(null, Validators.required),
        serviceType: new FormControl(1, { nonNullable: true, validators: [Validators.required] }),
        serviceId: new FormControl(null, Validators.required),
        serviceDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        endDate: new FormControl('', { nonNullable: true }),
    }, { validators: Vouchers.dateRangeValidator });
    constructor(api, cdr, translate) {
        this.api = api;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() {
        this.load();
        this.loadOptions();
    }
    get serviceOptions() {
        switch (this.form.controls.serviceType.value) {
            case 1: return this.flights;
            case 2: return this.hotels;
            case 3: return this.tours;
            case 4: return this.packages;
            default: return [];
        }
    }
    toggleForm() {
        if (this.isSaving)
            return;
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.reset();
    }
    serviceTypeChanged() {
        this.form.controls.serviceId.reset(null);
        this.errorMessage = '';
    }
    save() {
        if (this.isSaving)
            return;
        if (this.form.hasError('invalidDateRange')) {
            this.form.markAllAsTouched();
            this.errorMessage = 'invalidVoucherDates';
            return;
        }
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.errorMessage = 'invalidVoucherData';
            return;
        }
        const value = this.form.getRawValue();
        const type = this.types.find((option) => option.id === Number(value.serviceType));
        if (!type || value.serviceId === null) {
            this.errorMessage = 'invalidVoucherData';
            return;
        }
        const references = {
            flightId: null,
            hotelId: null,
            tourId: null,
            packageId: null,
        };
        references[type.referenceKey] = Number(value.serviceId);
        const payload = {
            id: this.selectedId,
            customerId: Number(value.customerId),
            serviceType: Number(value.serviceType),
            serviceDate: value.serviceDate,
            endDate: value.endDate || null,
            ...references,
        };
        this.isSaving = true;
        this.errorMessage = '';
        const request$ = this.selectedId
            ? this.api.put('Vouchers', payload)
            : this.api.post('Vouchers', payload);
        request$.pipe(catchError((error) => {
            this.errorMessage = this.apiError(error, 'voucherSaveError');
            return of(null);
        }), finalize(() => {
            this.isSaving = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = this.responseError(response, 'voucherSaveError');
                return;
            }
            this.showForm = false;
            this.reset();
            this.load();
        });
    }
    edit(voucher) {
        this.reset();
        this.selectedId = Number(voucher.id);
        const serviceType = Number(voucher.serviceType);
        const serviceId = this.referenceId(voucher, serviceType);
        this.ensureSelectedServiceIsAvailable(voucher, serviceType, serviceId);
        this.form.setValue({
            customerId: Number(voucher.customerId),
            serviceType,
            serviceId,
            serviceDate: this.dateOnly(voucher.serviceDate),
            endDate: this.dateOnly(voucher.endDate),
        });
        this.showForm = true;
    }
    pdf(voucher) {
        if (this.downloadingId !== null)
            return;
        this.downloadingId = Number(voucher.id);
        this.errorMessage = '';
        this.api.getFile(`Vouchers/${voucher.id}/Pdf`).pipe(catchError(() => {
            this.errorMessage = 'pdfDownloadError';
            return of(null);
        }), finalize(() => {
            this.downloadingId = null;
            this.cdr.markForCheck();
        })).subscribe((blob) => {
            if (blob)
                this.download(blob, `${voucher.voucherNo || `voucher-${voucher.id}`}.pdf`);
        });
    }
    delete(voucher) {
        if (this.deletingId !== null)
            return;
        const confirmed = confirm(`${this.translate.instant('confirmDeleteRecord')} ${this.translate.instant('recordDeleteWarning')}`);
        if (!confirmed)
            return;
        this.deletingId = Number(voucher.id);
        this.errorMessage = '';
        this.api.delete('Vouchers', voucher.id).pipe(catchError((error) => {
            this.errorMessage = this.apiError(error, 'recordDeleteError');
            return of(null);
        }), finalize(() => {
            this.deletingId = null;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = this.responseError(response, 'recordDeleteError');
                return;
            }
            this.load();
        });
    }
    customerName(customer) {
        return customer?.companyName ?? `${customer?.firstName ?? ''} ${customer?.lastName ?? ''}`.trim();
    }
    serviceName(service) {
        switch (this.form.controls.serviceType.value) {
            case 1:
                return [service?.flightNumber, `${service?.departureAirport ?? ''} - ${service?.arrivalAirport ?? ''}`]
                    .filter(Boolean).join(' - ');
            case 2: return service?.name ?? '';
            case 3: return service?.titleEng ?? service?.titleAr ?? service?.name ?? '';
            case 4: return service?.nameEng ?? service?.nameAr ?? service?.name ?? '';
            default: return '';
        }
    }
    voucherTypeKey(value) {
        return this.types.find((type) => type.id === Number(value))?.key ?? String(value ?? '');
    }
    loadOptions() {
        if (this.isOptionsLoading)
            return;
        this.isOptionsLoading = true;
        this.optionsLoadError = false;
        const safeGet = (url) => this.api.get(url).pipe(catchError(() => {
            this.optionsLoadError = true;
            return of(null);
        }));
        forkJoin({
            customers: safeGet('Customers?page=1&pageSize=100'),
            flights: safeGet('Flights/GetAll?page=1&pageSize=100'),
            hotels: safeGet('Hotels?page=1&pageSize=100'),
            tours: safeGet('Tours?page=1&pageSize=100'),
            packages: safeGet('Packages?page=1&pageSize=100'),
        }).pipe(finalize(() => {
            this.isOptionsLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            this.customers = this.rows(response.customers);
            this.flights = this.rows(response.flights);
            this.hotels = this.rows(response.hotels);
            this.tours = this.rows(response.tours);
            this.packages = this.rows(response.packages);
        });
    }
    load() {
        this.isListLoading = true;
        this.api.get('Vouchers').pipe(catchError((error) => {
            this.errorMessage = this.apiError(error, 'voucherListLoadError');
            return of(null);
        }), finalize(() => {
            this.isListLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = this.responseError(response, 'voucherListLoadError');
                this.vouchers = [];
                return;
            }
            this.vouchers = this.rows(response);
        });
    }
    rows(response) {
        const payload = response?.data ?? response;
        const rows = Array.isArray(payload) ? payload : payload?.data ?? payload?.items ?? [];
        return Array.isArray(rows) ? rows : [];
    }
    reset() {
        this.selectedId = 0;
        this.errorMessage = '';
        this.form.reset({ customerId: null, serviceType: 1, serviceId: null, serviceDate: '', endDate: '' });
    }
    referenceId(voucher, serviceType) {
        const type = this.types.find((option) => option.id === serviceType);
        const value = type ? voucher?.[type.referenceKey] : null;
        return value === null || value === undefined ? null : Number(value);
    }
    ensureSelectedServiceIsAvailable(voucher, serviceType, serviceId) {
        if (serviceId === null)
            return;
        const target = serviceType === 1 ? this.flights
            : serviceType === 2 ? this.hotels
                : serviceType === 3 ? this.tours
                    : this.packages;
        if (target.some((option) => Number(option.id) === serviceId))
            return;
        const fallback = { id: serviceId };
        if (serviceType === 1)
            fallback.flightNumber = voucher.serviceName;
        else if (serviceType === 2)
            fallback.name = voucher.serviceName;
        else if (serviceType === 3)
            fallback.titleEng = voucher.serviceName;
        else
            fallback.nameEng = voucher.serviceName;
        target.push(fallback);
    }
    dateOnly(value) {
        return typeof value === 'string' ? value.slice(0, 10) : '';
    }
    responseError(response, fallback) {
        const errors = Array.isArray(response?.errors)
            ? response.errors.filter((error) => typeof error === 'string' && error.trim())
            : [];
        return errors.length ? errors.join(' ') : response?.message || fallback;
    }
    apiError(error, fallback) {
        return this.responseError(error?.error, fallback);
    }
    download(blob, name) {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = name;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 0);
    }
    static dateRangeValidator(control) {
        const start = String(control.get('serviceDate')?.value ?? '');
        const end = String(control.get('endDate')?.value ?? '');
        return start && end && end < start ? { invalidDateRange: true } : null;
    }
    static ɵfac = function Vouchers_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Vouchers)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Vouchers, selectors: [["app-vouchers"]], decls: 18, vars: 16, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "items-end", "justify-between", "gap-4"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], ["type", "button", 1, "grid", "h-11", "w-11", "shrink-0", "place-items-center", "rounded-full", "border", "border-primary/40", "text-xl", "text-primary", "hover:bg-primary", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-50", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi"], ["role", "alert", 1, "mb-4", "rounded-xl", "border", "border-red-200", "bg-red-50", "p-3", "text-sm", "text-red-700"], [1, "overflow-auto", "rounded-2xl", "border"], ["role", "alert", 1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "rounded-xl", "border", "border-amber-200", "bg-amber-50", "p-3", "text-sm", "text-amber-800"], [1, "rounded-3xl", "bg-gradient-to-br", "from-slate-50", "to-blue-50", "p-6", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-5", "md:grid-cols-2"], [1, "text-sm", "font-medium"], ["formControlName", "customerId", 1, "mt-2", "w-full", "rounded-xl", "border-slate-300", 3, "disabled"], [3, "ngValue"], [1, "mt-1", "block", "text-red-600"], ["formControlName", "serviceType", 1, "mt-2", "w-full", "rounded-xl", "border-slate-300", 3, "change"], [1, "text-sm", "font-medium", "md:col-span-2"], ["formControlName", "serviceId", 1, "mt-2", "w-full", "rounded-xl", "border-slate-300", 3, "disabled"], [1, "mt-1", "block", "text-amber-700"], ["formControlName", "serviceDate", 1, "mt-2", "block", 3, "ariaLabel"], ["formControlName", "endDate", 1, "mt-2", "block", 3, "min", "ariaLabel"], [1, "mt-5", "rounded-xl", "border", "border-blue-100", "bg-white/80", "p-4", "text-sm", "text-slate-600"], ["aria-hidden", "true", 1, "mdi", "mdi-information-outline", "me-2", "text-primary"], [1, "mt-6", "flex", "justify-end", "gap-3"], ["type", "button", 1, "rounded-full", "border", "bg-white", "px-5", "py-2", "disabled:opacity-50", 3, "click", "disabled"], ["type", "submit", 1, "rounded-full", "bg-primary", "px-6", "py-2", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "font-semibold", "underline", 3, "click", "disabled"], [1, "min-w-full", "text-left", "text-sm"], [1, "bg-slate-50"], [1, "p-3"], ["colspan", "6", 1, "p-10", "text-center", "text-slate-500"], [1, "border-t"], [1, "p-3", "font-semibold"], [1, "block", "text-slate-500"], [1, "flex", "gap-2"], ["type", "button", 1, "icon-btn", "text-amber-600", "disabled:opacity-40", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "icon-btn", "text-primary", "disabled:opacity-40", 3, "click", "disabled"], ["type", "button", 1, "icon-btn", "text-red-600", "disabled:opacity-40", 3, "click", "disabled"]], template: function Vouchers_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "header", 2)(3, "div")(4, "p", 3);
            i0.ɵɵtext(5, "CRM");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1", 4);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 5);
            i0.ɵɵtext(10);
            i0.ɵɵpipe(11, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 6);
            i0.ɵɵpipe(13, "translate");
            i0.ɵɵlistener("click", function Vouchers_Template_button_click_12_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(14, "i", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(15, Vouchers_Conditional_15_Template, 3, 3, "div", 8);
            i0.ɵɵconditionalCreate(16, Vouchers_Conditional_16_Template, 53, 49)(17, Vouchers_Conditional_17_Template, 25, 19, "div", 9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 10, "vouchers"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 12, "manageVouchers"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isSaving);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(13, 14, ctx.showForm ? "cancel" : "createVoucher"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-plus", !ctx.showForm)("mdi-close", ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showForm ? 16 : 17);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i3.ɵNgNoValidate, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.FormGroupDirective, i3.FormControlName, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Vouchers, [{
        type: Component,
        args: [{ selector: 'app-vouchers', standalone: true, imports: [CommonModule, ReactiveFormsModule, TranslatePipe, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex items-end justify-between gap-4\">\n      <div>\n        <p class=\"text-sm font-semibold uppercase tracking-[.3em] text-primary\">CRM</p>\n        <h1 class=\"mt-2 text-3xl font-semibold\">{{ 'vouchers' | translate }}</h1>\n        <p class=\"mt-2 text-sm text-slate-500\">{{ 'manageVouchers' | translate }}</p>\n      </div>\n      <button\n        type=\"button\"\n        class=\"grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 text-xl text-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50\"\n        [disabled]=\"isSaving\"\n        [attr.aria-label]=\"(showForm ? 'cancel' : 'createVoucher') | translate\"\n        (click)=\"toggleForm()\">\n        <i class=\"mdi\" [class.mdi-plus]=\"!showForm\" [class.mdi-close]=\"showForm\" aria-hidden=\"true\"></i>\n      </button>\n    </header>\n\n    @if (errorMessage) {\n      <div role=\"alert\" class=\"mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700\">\n        {{ errorMessage | translate }}\n      </div>\n    }\n\n    @if (showForm) {\n      @if (optionsLoadError) {\n        <div role=\"alert\" class=\"mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800\">\n          <span>{{ 'voucherOptionsLoadError' | translate }}</span>\n          <button type=\"button\" class=\"font-semibold underline\" [disabled]=\"isOptionsLoading\" (click)=\"loadOptions()\">\n            {{ (isOptionsLoading ? 'loading' : 'retry') | translate }}\n          </button>\n        </div>\n      }\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"save()\" class=\"rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 p-6\">\n        <div class=\"grid gap-5 md:grid-cols-2\">\n          <label class=\"text-sm font-medium\">\n            {{ 'customer' | translate }}\n            <select formControlName=\"customerId\" class=\"mt-2 w-full rounded-xl border-slate-300\" [disabled]=\"isOptionsLoading\">\n              <option [ngValue]=\"null\">{{ 'select' | translate }}</option>\n              @for (customer of customers; track customer.id) {\n                <option [ngValue]=\"customer.id\">\n                  {{ customerName(customer) }} @if (customer.mobile) { - {{ customer.mobile }} }\n                </option>\n              }\n            </select>\n            @if (form.controls.customerId.touched && form.controls.customerId.invalid) {\n              <small class=\"mt-1 block text-red-600\">{{ 'customerRequired' | translate }}</small>\n            }\n          </label>\n\n          <label class=\"text-sm font-medium\">\n            {{ 'voucherType' | translate }}\n            <select formControlName=\"serviceType\" class=\"mt-2 w-full rounded-xl border-slate-300\" (change)=\"serviceTypeChanged()\">\n              @for (type of types; track type.id) {\n                <option [ngValue]=\"type.id\">{{ type.key | translate }}</option>\n              }\n            </select>\n          </label>\n\n          <label class=\"text-sm font-medium md:col-span-2\">\n            {{ 'service' | translate }}\n            <select formControlName=\"serviceId\" class=\"mt-2 w-full rounded-xl border-slate-300\" [disabled]=\"isOptionsLoading\">\n              <option [ngValue]=\"null\">{{ (isOptionsLoading ? 'loading' : 'select') | translate }}</option>\n              @for (service of serviceOptions; track service.id) {\n                <option [ngValue]=\"service.id\">{{ serviceName(service) }}</option>\n              }\n            </select>\n            @if (!isOptionsLoading && !serviceOptions.length) {\n              <small class=\"mt-1 block text-amber-700\">{{ 'noServicesAvailable' | translate }}</small>\n            } @else if (form.controls.serviceId.touched && form.controls.serviceId.invalid) {\n              <small class=\"mt-1 block text-red-600\">{{ 'serviceRequired' | translate }}</small>\n            }\n          </label>\n\n          <label class=\"text-sm font-medium\">\n            {{ 'serviceDate' | translate }}\n            <app-date-picker\n              formControlName=\"serviceDate\"\n              class=\"mt-2 block\"\n              [ariaLabel]=\"'serviceDate' | translate\" />\n            @if (form.controls.serviceDate.touched && form.controls.serviceDate.invalid) {\n              <small class=\"mt-1 block text-red-600\">{{ 'serviceDateRequired' | translate }}</small>\n            }\n          </label>\n\n          <label class=\"text-sm font-medium\">\n            {{ 'endDateOptional' | translate }}\n            <app-date-picker\n              formControlName=\"endDate\"\n              class=\"mt-2 block\"\n              [min]=\"form.controls.serviceDate.value || null\"\n              [ariaLabel]=\"'endDateOptional' | translate\" />\n            @if (form.hasError('invalidDateRange') && form.controls.endDate.touched) {\n              <small class=\"mt-1 block text-red-600\">{{ 'invalidVoucherDates' | translate }}</small>\n            }\n          </label>\n        </div>\n\n        <p class=\"mt-5 rounded-xl border border-blue-100 bg-white/80 p-4 text-sm text-slate-600\">\n          <i class=\"mdi mdi-information-outline me-2 text-primary\" aria-hidden=\"true\"></i>\n          {{ 'voucherDetailsHelp' | translate }}\n        </p>\n\n        <div class=\"mt-6 flex justify-end gap-3\">\n          <button type=\"button\" class=\"rounded-full border bg-white px-5 py-2 disabled:opacity-50\" [disabled]=\"isSaving\" (click)=\"toggleForm()\">\n            {{ 'cancel' | translate }}\n          </button>\n          <button type=\"submit\" class=\"rounded-full bg-primary px-6 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\" [disabled]=\"isSaving || isOptionsLoading\">\n            {{ (isSaving ? 'saving' : 'save') | translate }}\n          </button>\n        </div>\n      </form>\n    } @else {\n      <div class=\"overflow-auto rounded-2xl border\">\n        <table class=\"min-w-full text-left text-sm\">\n          <thead class=\"bg-slate-50\">\n            <tr>\n              <th class=\"p-3\">{{ 'voucherNo' | translate }}</th>\n              <th class=\"p-3\">{{ 'customer' | translate }}</th>\n              <th class=\"p-3\">{{ 'type' | translate }}</th>\n              <th class=\"p-3\">{{ 'service' | translate }}</th>\n              <th class=\"p-3\">{{ 'serviceDates' | translate }}</th>\n              <th class=\"p-3\">{{ 'actions' | translate }}</th>\n            </tr>\n          </thead>\n          <tbody>\n            @if (isListLoading) {\n              <tr><td colspan=\"6\" class=\"p-10 text-center text-slate-500\">{{ 'loading' | translate }}</td></tr>\n            } @else {\n              @for (voucher of vouchers; track voucher.id) {\n                <tr class=\"border-t\">\n                  <td class=\"p-3 font-semibold\">{{ voucher.voucherNo }}</td>\n                  <td class=\"p-3\">\n                    {{ voucher.customerName }}\n                    <small class=\"block text-slate-500\">{{ voucher.customerNumber }}</small>\n                  </td>\n                  <td class=\"p-3\">{{ voucherTypeKey(voucher.serviceType) | translate }}</td>\n                  <td class=\"p-3\">{{ voucher.serviceName }}</td>\n                  <td class=\"p-3\">\n                    {{ voucher.serviceDate }}\n                    @if (voucher.endDate) { <small class=\"block text-slate-500\">{{ 'to' | translate }} {{ voucher.endDate }}</small> }\n                  </td>\n                  <td class=\"p-3\">\n                    <div class=\"flex gap-2\">\n                      <button type=\"button\" class=\"icon-btn text-amber-600 disabled:opacity-40\" [disabled]=\"deletingId !== null || downloadingId !== null\" [attr.aria-label]=\"'edit' | translate\" (click)=\"edit(voucher)\">\n                        <i class=\"mdi mdi-pencil-outline\" aria-hidden=\"true\"></i>\n                      </button>\n                      <button type=\"button\" class=\"icon-btn text-primary disabled:opacity-40\" [disabled]=\"downloadingId !== null || deletingId !== null\" [attr.aria-label]=\"'downloadPdf' | translate\" (click)=\"pdf(voucher)\">\n                        <i class=\"mdi\" [class.mdi-loading]=\"downloadingId === voucher.id\" [class.mdi-spin]=\"downloadingId === voucher.id\" [class.mdi-file-pdf-box]=\"downloadingId !== voucher.id\" aria-hidden=\"true\"></i>\n                      </button>\n                      <button type=\"button\" class=\"icon-btn text-red-600 disabled:opacity-40\" [disabled]=\"deletingId !== null || downloadingId !== null\" [attr.aria-label]=\"'delete' | translate\" (click)=\"delete(voucher)\">\n                        <i class=\"mdi\" [class.mdi-loading]=\"deletingId === voucher.id\" [class.mdi-spin]=\"deletingId === voucher.id\" [class.mdi-delete-outline]=\"deletingId !== voucher.id\" aria-hidden=\"true\"></i>\n                      </button>\n                    </div>\n                  </td>\n                </tr>\n              } @empty {\n                <tr><td colspan=\"6\" class=\"p-10 text-center text-slate-500\">{{ 'noVouchersFound' | translate }}</td></tr>\n              }\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n  </div>\n</section>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Vouchers, { className: "Vouchers", filePath: "app/features/configurations/vouchers/vouchers-page.ts", lineNumber: 31 }); })();
