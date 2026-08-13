import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/apiservice.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/common";
const _forTrack0 = ($index, $item) => $item.id;
function Invoices_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage), " ");
} }
function Invoices_Conditional_16_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 10)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 44);
    i0.ɵɵlistener("click", function Invoices_Conditional_16_Conditional_0_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.loadOptions()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, "invoiceOptionsLoadError"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 5, ctx_r0.isOptionsLoading ? "loading" : "retry"), " ");
} }
function Invoices_Conditional_16_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const customer_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngValue", customer_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.customerName(customer_r4));
} }
function Invoices_Conditional_16_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "customerRequired"));
} }
function Invoices_Conditional_16_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currency_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngValue", currency_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.currencyLabel(currency_r5));
} }
function Invoices_Conditional_16_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "invoiceDueDateInvalid"));
} }
function Invoices_Conditional_16_For_44_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const service_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngValue", service_r8.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.name(service_r8));
} }
function Invoices_Conditional_16_For_44_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "serviceRequired"));
} }
function Invoices_Conditional_16_For_44_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "descriptionRequired"));
} }
function Invoices_Conditional_16_For_44_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 16);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "lineDiscountExceedsTotal"));
} }
function Invoices_Conditional_16_For_44_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label", 34);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementStart(4, "select", 45);
    i0.ɵɵlistener("change", function Invoices_Conditional_16_For_44_Template_select_change_4_listener() { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.itemTypeChanged(row_r7)); });
    i0.ɵɵelementStart(5, "option", 15);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "option", 15);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "label", 34);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelementStart(14, "select", 46);
    i0.ɵɵlistener("change", function Invoices_Conditional_16_For_44_Template_select_change_14_listener() { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.serviceChanged(row_r7)); });
    i0.ɵɵelementStart(15, "option", 15);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, Invoices_Conditional_16_For_44_For_19_Template, 2, 2, "option", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(20, Invoices_Conditional_16_For_44_Conditional_20_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "label", 34);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵelement(24, "input", 47);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(25, Invoices_Conditional_16_For_44_Conditional_25_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "label", 34);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "translate");
    i0.ɵɵelement(29, "input", 48);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "label", 34);
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "translate");
    i0.ɵɵelement(33, "input", 49);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "label", 34);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "translate");
    i0.ɵɵelement(37, "input", 50);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(38, Invoices_Conditional_16_For_44_Conditional_38_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "label", 34);
    i0.ɵɵtext(40);
    i0.ɵɵpipe(41, "translate");
    i0.ɵɵelementStart(42, "span", 51);
    i0.ɵɵtext(43);
    i0.ɵɵpipe(44, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "button", 52);
    i0.ɵɵpipe(46, "translate");
    i0.ɵɵlistener("click", function Invoices_Conditional_16_For_44_Template_button_click_45_listener() { const $index_r9 = i0.ɵɵrestoreView(_r6).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeItem($index_r9)); });
    i0.ɵɵelement(47, "i", 53);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    const $index_r9 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroupName", $index_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 21, "type"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", 2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 23, "tour"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngValue", 1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 25, "package"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 27, "service"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 29, "select"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.serviceOptions(row_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(row_r7.controls.serviceId.touched && row_r7.controls.serviceId.invalid ? 20 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(23, 31, "description"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(row_r7.controls.description.touched && row_r7.controls.description.invalid ? 25 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(28, 33, "quantity"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(32, 35, "unitPrice"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(36, 37, "lineDiscount"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.lineDiscountInvalid(row_r7) ? 38 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(41, 39, "lineTotal"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.selectedCurrencySign, "", i0.ɵɵpipeBind2(44, 41, ctx_r0.lineTotal(row_r7), "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(46, 44, "removeInvoiceItem"));
} }
function Invoices_Conditional_16_ForEmpty_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 28);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "addInvoiceItemHint"));
} }
function Invoices_Conditional_16_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 36);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "discountExceedsSubtotal"));
} }
function Invoices_Conditional_16_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 36);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "taxRateInvalid"));
} }
function Invoices_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵconditionalCreate(0, Invoices_Conditional_16_Conditional_0_Template, 7, 7, "div", 10);
    i0.ɵɵelementStart(1, "form", 11);
    i0.ɵɵlistener("ngSubmit", function Invoices_Conditional_16_Template_form_ngSubmit_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.save()); });
    i0.ɵɵelementStart(2, "div", 12)(3, "label", 13);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementStart(6, "select", 14)(7, "option", 15);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, Invoices_Conditional_16_For_11_Template, 2, 2, "option", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(12, Invoices_Conditional_16_Conditional_12_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "label", 13);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementStart(16, "select", 17);
    i0.ɵɵrepeaterCreate(17, Invoices_Conditional_16_For_18_Template, 2, 2, "option", 15, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "label", 13);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelement(22, "app-date-picker", 18);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "label", 13);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "translate");
    i0.ɵɵelement(27, "app-date-picker", 19);
    i0.ɵɵpipe(28, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(29, Invoices_Conditional_16_Conditional_29_Template, 3, 3, "small", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 20)(31, "div", 21)(32, "h2", 22);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 23)(36, "button", 24);
    i0.ɵɵlistener("click", function Invoices_Conditional_16_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addItem(2)); });
    i0.ɵɵtext(37);
    i0.ɵɵpipe(38, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "button", 25);
    i0.ɵɵlistener("click", function Invoices_Conditional_16_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addItem(1)); });
    i0.ɵɵtext(40);
    i0.ɵɵpipe(41, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "div", 26);
    i0.ɵɵrepeaterCreate(43, Invoices_Conditional_16_For_44_Template, 48, 46, "div", 27, i0.ɵɵrepeaterTrackByIdentity, false, Invoices_Conditional_16_ForEmpty_45_Template, 3, 3, "p", 28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 29)(47, "label", 13);
    i0.ɵɵtext(48);
    i0.ɵɵpipe(49, "translate");
    i0.ɵɵelement(50, "textarea", 30);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 31)(52, "div", 32)(53, "span");
    i0.ɵɵtext(54);
    i0.ɵɵpipe(55, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "strong");
    i0.ɵɵtext(57);
    i0.ɵɵpipe(58, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "div", 33)(60, "label", 34);
    i0.ɵɵtext(61);
    i0.ɵɵpipe(62, "translate");
    i0.ɵɵelement(63, "input", 35);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(64, Invoices_Conditional_16_Conditional_64_Template, 3, 3, "small", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "label", 34);
    i0.ɵɵtext(66);
    i0.ɵɵpipe(67, "translate");
    i0.ɵɵelement(68, "input", 37);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(69, Invoices_Conditional_16_Conditional_69_Template, 3, 3, "small", 36);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "div", 38)(71, "span");
    i0.ɵɵtext(72);
    i0.ɵɵpipe(73, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "strong");
    i0.ɵɵtext(75);
    i0.ɵɵpipe(76, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(77, "div", 39)(78, "span");
    i0.ɵɵtext(79);
    i0.ɵɵpipe(80, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "strong");
    i0.ɵɵtext(82);
    i0.ɵɵpipe(83, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(84, "p", 40);
    i0.ɵɵtext(85);
    i0.ɵɵpipe(86, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(87, "div", 41)(88, "button", 42);
    i0.ɵɵlistener("click", function Invoices_Conditional_16_Template_button_click_88_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleForm()); });
    i0.ɵɵtext(89);
    i0.ɵɵpipe(90, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "button", 43);
    i0.ɵɵtext(92);
    i0.ɵɵpipe(93, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.optionsLoadError ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 40, "customer"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 42, "select"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.customers);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.form.controls.customerId.touched && ctx_r0.form.controls.customerId.invalid ? 12 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(15, 44, "currency"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.currencies);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 46, "invoiceDate"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ariaLabel", i0.ɵɵpipeBind1(23, 48, "invoiceDate"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(26, 50, "dueDate"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("min", ctx_r0.form.controls.invoiceDate.value || null)("ariaLabel", i0.ɵɵpipeBind1(28, 52, "dueDate"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.form.hasError("invalidInvoiceDates") && ctx_r0.form.controls.dueDate.touched ? 29 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 54, "invoiceItems"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" + ", i0.ɵɵpipeBind1(38, 56, "tour"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" + ", i0.ɵɵpipeBind1(41, 58, "package"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.items.controls);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(49, 60, "notes"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(55, 62, "subTotal"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.selectedCurrencySign, "", i0.ɵɵpipeBind2(58, 64, ctx_r0.subTotal, "1.2-2"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(62, 67, "discount"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.invoiceDiscountInvalid ? 64 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(67, 69, "taxRate"), " (%) ");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.form.controls.taxRate.touched && ctx_r0.form.controls.taxRate.invalid ? 69 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(73, 71, "tax"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.selectedCurrencySign, "", i0.ɵɵpipeBind2(76, 73, ctx_r0.tax, "1.2-2"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(80, 76, "total"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.selectedCurrencySign, "", i0.ɵɵpipeBind2(83, 78, ctx_r0.total, "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(86, 81, "serverCalculatedTotalsHint"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(90, 83, "cancel"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.isOptionsLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(93, 85, ctx_r0.isSaving ? "saving" : "save"), " ");
} }
function Invoices_Conditional_17_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 57);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "loading"));
} }
function Invoices_Conditional_17_Conditional_24_For_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 58)(1, "td", 59);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td", 56);
    i0.ɵɵtext(4);
    i0.ɵɵelementStart(5, "small", 60);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 56);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 56);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 56);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 56)(15, "div", 23)(16, "button", 61);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵlistener("click", function Invoices_Conditional_17_Conditional_24_For_1_Template_button_click_16_listener() { const invoice_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.edit(invoice_r11)); });
    i0.ɵɵelement(18, "i", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 63);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵlistener("click", function Invoices_Conditional_17_Conditional_24_For_1_Template_button_click_19_listener() { const invoice_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.pdf(invoice_r11)); });
    i0.ɵɵelement(21, "i", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 64);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵlistener("click", function Invoices_Conditional_17_Conditional_24_For_1_Template_button_click_22_listener() { const invoice_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.delete(invoice_r11)); });
    i0.ɵɵelement(24, "i", 7);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const invoice_r11 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(invoice_r11.invoiceNo);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", invoice_r11.customerName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(invoice_r11.customerNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(invoice_r11.invoiceDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(invoice_r11.dueDate);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", invoice_r11.currencySign, "", i0.ɵɵpipeBind2(13, 25, invoice_r11.totalAmount, "1.2-2"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r0.isOptionsLoading || ctx_r0.deletingId !== null || ctx_r0.downloadingId !== null);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(17, 28, "edit"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.downloadingId !== null || ctx_r0.deletingId !== null);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(20, 30, "downloadPdf"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.downloadingId === invoice_r11.id)("mdi-spin", ctx_r0.downloadingId === invoice_r11.id)("mdi-file-pdf-box", ctx_r0.downloadingId !== invoice_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.deletingId !== null || ctx_r0.downloadingId !== null);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(23, 32, "delete"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.deletingId === invoice_r11.id)("mdi-spin", ctx_r0.deletingId === invoice_r11.id)("mdi-delete-outline", ctx_r0.deletingId !== invoice_r11.id);
} }
function Invoices_Conditional_17_Conditional_24_ForEmpty_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 57);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noInvoicesFound"));
} }
function Invoices_Conditional_17_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, Invoices_Conditional_17_Conditional_24_For_1_Template, 25, 34, "tr", 58, _forTrack0, false, Invoices_Conditional_17_Conditional_24_ForEmpty_2_Template, 4, 3, "tr");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵrepeater(ctx_r0.invoices);
} }
function Invoices_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "table", 54)(2, "thead", 55)(3, "tr")(4, "th", 56);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 56);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 56);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 56);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 56);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 56);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody");
    i0.ɵɵconditionalCreate(23, Invoices_Conditional_17_Conditional_23_Template, 4, 3, "tr")(24, Invoices_Conditional_17_Conditional_24_Template, 3, 1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "invoiceNo"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "customer"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 11, "invoiceDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 13, "dueDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 15, "total"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 17, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.isListLoading ? 23 : 24);
} }
export class Invoices {
    api;
    cdr;
    translate;
    fallbackCurrencies = [
        { id: 2, name: 'USD', sign: '$' },
        { id: 1, name: 'Egyptian Pound', sign: 'EGP' },
    ];
    showForm = false;
    invoices = [];
    customers = [];
    tours = [];
    packages = [];
    currencies = [...this.fallbackCurrencies];
    isListLoading = false;
    isOptionsLoading = false;
    optionsLoadError = false;
    isSaving = false;
    errorMessage = '';
    selectedId = 0;
    deletingId = null;
    downloadingId = null;
    form = new FormGroup({
        customerId: new FormControl(null, [Validators.required, Validators.min(1)]),
        currencyId: new FormControl(2, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
        invoiceDate: new FormControl(this.localDate(new Date()), { nonNullable: true, validators: [Validators.required] }),
        dueDate: new FormControl(this.localDate(new Date()), { nonNullable: true, validators: [Validators.required] }),
        discount: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
        taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.max(100)] }),
        notes: new FormControl('', { nonNullable: true }),
        items: new FormArray([]),
    }, { validators: Invoices.invoiceDatesValidator });
    constructor(api, cdr, translate) {
        this.api = api;
        this.cdr = cdr;
        this.translate = translate;
        this.form.controls.invoiceDate.valueChanges.subscribe((invoiceDate) => {
            const dueDate = this.form.controls.dueDate.value;
            if (invoiceDate && (!dueDate || dueDate < invoiceDate)) {
                this.form.controls.dueDate.setValue(invoiceDate);
            }
        });
    }
    ngOnInit() {
        this.load();
        this.loadOptions();
    }
    get items() {
        return this.form.controls.items;
    }
    get subTotal() {
        return this.roundMoney(this.items.controls.reduce((sum, row) => sum + this.lineTotal(row), 0));
    }
    get tax() {
        const taxable = Math.max(0, this.subTotal - this.numberValue(this.form.controls.discount.value));
        return this.roundMoney(taxable * this.numberValue(this.form.controls.taxRate.value) / 100);
    }
    get total() {
        return this.roundMoney(Math.max(0, this.subTotal - this.numberValue(this.form.controls.discount.value)) + this.tax);
    }
    get invoiceDiscountInvalid() {
        return this.numberValue(this.form.controls.discount.value) > this.subTotal;
    }
    get selectedCurrencySign() {
        return this.currencies.find((currency) => currency.id === Number(this.form.controls.currencyId.value))?.sign ?? '';
    }
    toggleForm() {
        if (this.isSaving)
            return;
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.reset();
    }
    addItem(type = 2, source) {
        this.items.push(this.createItemGroup(type, source));
        this.errorMessage = '';
    }
    removeItem(index) {
        this.items.removeAt(index);
        this.errorMessage = '';
    }
    serviceOptions(row) {
        return Number(row.controls.itemType.value) === 1 ? this.packages : this.tours;
    }
    itemTypeChanged(row) {
        row.patchValue({ serviceId: null, description: '', unitPrice: 0, discount: 0 });
        row.controls.serviceId.markAsUntouched();
        this.errorMessage = '';
    }
    serviceChanged(row) {
        const source = this.serviceOptions(row)
            .find((option) => Number(option.id) === Number(row.controls.serviceId.value));
        row.patchValue({
            description: this.name(source),
            unitPrice: this.numberValue(source?.pricePerPerson ?? source?.price),
            discount: 0,
        });
    }
    lineBase(row) {
        return this.roundMoney(this.numberValue(row.controls.quantity.value) * this.numberValue(row.controls.unitPrice.value));
    }
    lineTotal(row) {
        return this.roundMoney(Math.max(0, this.lineBase(row) - this.numberValue(row.controls.discount.value)));
    }
    lineDiscountInvalid(row) {
        return this.numberValue(row.controls.discount.value) > this.lineBase(row);
    }
    save() {
        if (this.isSaving)
            return;
        if (this.form.hasError('invalidInvoiceDates')) {
            this.form.markAllAsTouched();
            this.errorMessage = 'invoiceDueDateInvalid';
            return;
        }
        if (this.invoiceDiscountInvalid) {
            this.form.controls.discount.markAsTouched();
            this.errorMessage = 'discountExceedsSubtotal';
            return;
        }
        if (this.items.controls.some((row) => this.lineDiscountInvalid(row))) {
            this.items.markAllAsTouched();
            this.errorMessage = 'lineDiscountExceedsTotal';
            return;
        }
        if (this.form.controls.taxRate.invalid) {
            this.form.controls.taxRate.markAsTouched();
            this.errorMessage = 'taxRateInvalid';
            return;
        }
        if (this.form.invalid || !this.items.length) {
            this.form.markAllAsTouched();
            this.errorMessage = 'invalidInvoiceData';
            return;
        }
        const value = this.form.getRawValue();
        const payload = {
            id: this.selectedId,
            customerId: Number(value.customerId),
            currencyId: Number(value.currencyId),
            invoiceDate: value.invoiceDate,
            dueDate: value.dueDate,
            discount: this.numberValue(value.discount),
            taxRate: this.numberValue(value.taxRate),
            notes: value.notes.trim() || null,
            items: value.items.map((item, index) => ({
                itemType: Number(item.itemType),
                description: item.description.trim(),
                quantity: Number(item.quantity),
                unitPrice: this.numberValue(item.unitPrice),
                discount: this.numberValue(item.discount),
                sortOrder: index + 1,
                packageId: Number(item.itemType) === 1 ? Number(item.serviceId) : null,
                tourId: Number(item.itemType) === 2 ? Number(item.serviceId) : null,
            })),
        };
        this.isSaving = true;
        this.errorMessage = '';
        const request$ = this.selectedId
            ? this.api.put('Invoices', payload)
            : this.api.post('Invoices', payload);
        request$.pipe(catchError((error) => {
            this.errorMessage = this.apiError(error, 'invoiceSaveError');
            return of(null);
        }), finalize(() => {
            this.isSaving = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = this.responseError(response, 'invoiceSaveError');
                return;
            }
            this.showForm = false;
            this.reset();
            this.load();
        });
    }
    edit(invoice) {
        this.reset();
        this.selectedId = Number(invoice.id);
        this.ensureCurrencyIsAvailable(invoice);
        this.form.patchValue({
            customerId: Number(invoice.customerId),
            currencyId: Number(invoice.currencyId),
            invoiceDate: this.dateOnly(invoice.invoiceDate),
            dueDate: this.dateOnly(invoice.dueDate),
            discount: this.numberValue(invoice.discount),
            taxRate: this.numberValue(invoice.taxRate),
            notes: invoice.notes ?? '',
        });
        (invoice.items ?? []).forEach((item) => {
            const itemType = Number(item.itemType);
            const serviceId = Number(itemType === 1 ? item.packageId : item.tourId);
            this.ensureCatalogItemIsAvailable(itemType, serviceId, item.description, item.unitPrice);
            const source = this.serviceOptionsForType(itemType)
                .find((option) => Number(option.id) === serviceId);
            const row = this.createItemGroup(itemType, source);
            row.patchValue({
                serviceId,
                description: item.description ?? this.name(source),
                quantity: this.numberValue(item.quantity, 1),
                unitPrice: this.numberValue(item.unitPrice),
                discount: this.numberValue(item.discount),
            });
            this.items.push(row);
        });
        this.showForm = true;
    }
    pdf(invoice) {
        if (this.downloadingId !== null)
            return;
        this.downloadingId = Number(invoice.id);
        this.errorMessage = '';
        this.api.getFile(`Invoices/${invoice.id}/Pdf`).pipe(catchError(() => {
            this.errorMessage = 'pdfDownloadError';
            return of(null);
        }), finalize(() => {
            this.downloadingId = null;
            this.cdr.markForCheck();
        })).subscribe((blob) => {
            if (blob)
                this.download(blob, `${invoice.invoiceNo || `invoice-${invoice.id}`}.pdf`);
        });
    }
    delete(invoice) {
        if (this.deletingId !== null)
            return;
        const confirmed = confirm(`${this.translate.instant('confirmDeleteRecord')} ${this.translate.instant('recordDeleteWarning')}`);
        if (!confirmed)
            return;
        this.deletingId = Number(invoice.id);
        this.errorMessage = '';
        this.api.delete('Invoices', invoice.id).pipe(catchError((error) => {
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
            tours: safeGet('Tours?page=1&pageSize=100'),
            packages: safeGet('Packages?page=1&pageSize=100'),
            currencies: safeGet('Currencies'),
        }).pipe(finalize(() => {
            this.isOptionsLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            this.customers = this.optionRows(response.customers);
            this.tours = this.optionRows(response.tours);
            this.packages = this.optionRows(response.packages);
            const currencies = this.optionRows(response.currencies)
                .map((currency) => ({
                id: Number(currency.id),
                name: String(currency.name ?? currency.code ?? currency.sign ?? ''),
                sign: String(currency.sign ?? currency.code ?? ''),
            }))
                .filter((currency) => currency.id > 0 && currency.name);
            this.currencies = currencies.length ? currencies : [...this.fallbackCurrencies];
        });
    }
    name(item) {
        return item?.nameEng ?? item?.titleEng ?? item?.nameAr ?? item?.titleAr ?? item?.name ?? '';
    }
    customerName(customer) {
        return customer?.companyName ?? `${customer?.firstName ?? ''} ${customer?.lastName ?? ''}`.trim();
    }
    currencyLabel(currency) {
        return currency.sign && currency.sign !== currency.name
            ? `${currency.name} (${currency.sign})`
            : currency.name;
    }
    load() {
        this.isListLoading = true;
        this.api.get('Invoices').pipe(catchError((error) => {
            this.errorMessage = this.apiError(error, 'invoiceListLoadError');
            return of(null);
        }), finalize(() => {
            this.isListLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = this.responseError(response, 'invoiceListLoadError');
                this.invoices = [];
                return;
            }
            this.invoices = this.rows(response);
        });
    }
    createItemGroup(type, source) {
        return new FormGroup({
            itemType: new FormControl(type, { nonNullable: true, validators: [Validators.required] }),
            serviceId: new FormControl(source?.id ?? null, [Validators.required, Validators.min(1)]),
            description: new FormControl(this.name(source), {
                nonNullable: true,
                validators: [Validators.required, Validators.pattern(/\S/)],
            }),
            quantity: new FormControl(1, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(1), Invoices.integerValidator],
            }),
            unitPrice: new FormControl(this.numberValue(source?.pricePerPerson ?? source?.price), {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0)],
            }),
            discount: new FormControl(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0)],
            }),
        });
    }
    serviceOptionsForType(type) {
        return type === 1 ? this.packages : this.tours;
    }
    ensureCatalogItemIsAvailable(type, id, description, price) {
        if (!id)
            return;
        const target = this.serviceOptionsForType(type);
        if (target.some((option) => Number(option.id) === id))
            return;
        target.push(type === 1
            ? { id, nameEng: description, pricePerPerson: price }
            : { id, titleEng: description, pricePerPerson: price });
    }
    ensureCurrencyIsAvailable(invoice) {
        const id = Number(invoice.currencyId);
        if (!id || this.currencies.some((currency) => currency.id === id))
            return;
        const sign = String(invoice.currencySign ?? '');
        this.currencies.push({ id, name: sign || `#${id}`, sign });
    }
    optionRows(response) {
        if (!response || response?.isSuccess === false) {
            this.optionsLoadError = true;
            return [];
        }
        return this.rows(response);
    }
    rows(response) {
        const payload = response?.data ?? response;
        const rows = Array.isArray(payload) ? payload : payload?.data ?? payload?.items ?? [];
        return Array.isArray(rows) ? rows : [];
    }
    reset() {
        const today = this.localDate(new Date());
        this.selectedId = 0;
        this.items.clear();
        this.errorMessage = '';
        this.form.reset({
            currencyId: this.currencies.some((currency) => currency.id === 2) ? 2 : (this.currencies[0]?.id ?? 2),
            discount: 0,
            taxRate: 0,
            customerId: null,
            invoiceDate: today,
            dueDate: today,
            notes: '',
        });
    }
    numberValue(value, fallback = 0) {
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    }
    roundMoney(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }
    localDate(value) {
        return [
            value.getFullYear().toString().padStart(4, '0'),
            (value.getMonth() + 1).toString().padStart(2, '0'),
            value.getDate().toString().padStart(2, '0'),
        ].join('-');
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
    static invoiceDatesValidator(control) {
        const invoiceDate = String(control.get('invoiceDate')?.value ?? '');
        const dueDate = String(control.get('dueDate')?.value ?? '');
        return invoiceDate && dueDate && dueDate < invoiceDate ? { invalidInvoiceDates: true } : null;
    }
    static integerValidator(control) {
        const value = Number(control.value);
        return Number.isInteger(value) ? null : { integer: true };
    }
    static ɵfac = function Invoices_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || Invoices)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Invoices, selectors: [["app-invoices"]], decls: 18, vars: 16, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "items-end", "justify-between", "gap-4"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], ["type", "button", 1, "grid", "h-11", "w-11", "shrink-0", "place-items-center", "rounded-full", "border", "border-primary/40", "text-xl", "text-primary", "hover:bg-primary", "hover:text-white", "disabled:cursor-not-allowed", "disabled:opacity-50", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi"], ["role", "alert", 1, "mb-4", "rounded-xl", "border", "border-red-200", "bg-red-50", "p-3", "text-sm", "text-red-700"], [1, "overflow-auto", "rounded-2xl", "border"], ["role", "alert", 1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "rounded-xl", "border", "border-amber-200", "bg-amber-50", "p-3", "text-sm", "text-amber-800"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-4", "md:grid-cols-2", "xl:grid-cols-4"], [1, "text-sm", "font-medium"], ["formControlName", "customerId", 1, "mt-2", "w-full", "rounded-xl", "border-slate-300", 3, "disabled"], [3, "ngValue"], [1, "mt-1", "block", "text-red-600"], ["formControlName", "currencyId", 1, "mt-2", "w-full", "rounded-xl", "border-slate-300", 3, "disabled"], ["formControlName", "invoiceDate", 1, "mt-2", "block", 3, "ariaLabel"], ["formControlName", "dueDate", 1, "mt-2", "block", 3, "min", "ariaLabel"], [1, "rounded-2xl", "border", "border-slate-200", "p-4"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "font-semibold"], [1, "flex", "gap-2"], ["type", "button", 1, "rounded-full", "bg-primary", "px-3", "py-1.5", "text-sm", "text-white", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "bg-slate-800", "px-3", "py-1.5", "text-sm", "text-white", "disabled:opacity-50", 3, "click", "disabled"], ["formArrayName", "items", 1, "space-y-3"], [1, "grid", "items-start", "gap-3", "rounded-xl", "bg-slate-50", "p-3", "md:grid-cols-2", "xl:grid-cols-[100px_minmax(180px,1.4fr)_minmax(180px,1.4fr)_90px_120px_120px_120px_44px]", 3, "formGroupName"], [1, "rounded-xl", "bg-slate-50", "p-6", "text-center", "text-sm", "text-slate-500"], [1, "grid", "gap-4", "md:grid-cols-2"], ["formControlName", "notes", "rows", "5", 1, "mt-2", "w-full", "rounded-xl", "border-slate-300"], [1, "rounded-2xl", "bg-slate-900", "p-5", "text-white"], [1, "flex", "justify-between"], [1, "mt-3", "grid", "grid-cols-2", "gap-3"], [1, "text-xs"], ["type", "number", "formControlName", "discount", "min", "0", "step", "0.01", "inputmode", "decimal", 1, "mt-1", "w-full", "rounded-lg", "border-0", "text-slate-900"], [1, "mt-1", "block", "text-red-300"], ["type", "number", "formControlName", "taxRate", "min", "0", "max", "100", "step", "0.01", "inputmode", "decimal", 1, "mt-1", "w-full", "rounded-lg", "border-0", "text-slate-900"], [1, "mt-4", "flex", "justify-between", "border-t", "border-white/20", "pt-3"], [1, "mt-3", "flex", "justify-between", "text-xl"], [1, "mt-4", "text-xs", "text-slate-300"], [1, "flex", "justify-end", "gap-3"], ["type", "button", 1, "rounded-full", "border", "px-5", "py-2", "disabled:opacity-50", 3, "click", "disabled"], ["type", "submit", 1, "rounded-full", "bg-primary", "px-6", "py-2", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "font-semibold", "underline", 3, "click", "disabled"], ["formControlName", "itemType", 1, "mt-1", "w-full", "rounded-lg", "border-slate-300", 3, "change"], ["formControlName", "serviceId", 1, "mt-1", "w-full", "rounded-lg", "border-slate-300", 3, "change", "disabled"], ["type", "text", "formControlName", "description", "autocomplete", "off", 1, "mt-1", "w-full", "rounded-lg", "border-slate-300"], ["type", "number", "formControlName", "quantity", "min", "1", "step", "1", "inputmode", "numeric", 1, "mt-1", "w-full", "rounded-lg", "border-slate-300"], ["type", "number", "formControlName", "unitPrice", "min", "0", "step", "0.01", "inputmode", "decimal", 1, "mt-1", "w-full", "rounded-lg", "border-slate-300"], ["type", "number", "formControlName", "discount", "min", "0", "step", "0.01", "inputmode", "decimal", 1, "mt-1", "w-full", "rounded-lg", "border-slate-300"], [1, "mt-1", "block", "rounded-lg", "bg-white", "px-3", "py-2", "font-semibold"], ["type", "button", 1, "mt-5", "grid", "h-9", "w-9", "place-items-center", "rounded-full", "text-red-600", "hover:bg-red-50", 3, "click"], ["aria-hidden", "true", 1, "mdi", "mdi-delete-outline"], [1, "min-w-full", "text-left", "text-sm"], [1, "bg-slate-50"], [1, "p-3"], ["colspan", "6", 1, "p-10", "text-center", "text-slate-500"], [1, "border-t"], [1, "p-3", "font-semibold"], [1, "block", "text-slate-500"], ["type", "button", 1, "icon-btn", "text-amber-600", "disabled:opacity-40", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "icon-btn", "text-primary", "disabled:opacity-40", 3, "click", "disabled"], ["type", "button", 1, "icon-btn", "text-red-600", "disabled:opacity-40", 3, "click", "disabled"]], template: function Invoices_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵlistener("click", function Invoices_Template_button_click_12_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(14, "i", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(15, Invoices_Conditional_15_Template, 3, 3, "div", 8);
            i0.ɵɵconditionalCreate(16, Invoices_Conditional_16_Template, 94, 87)(17, Invoices_Conditional_17_Template, 25, 19, "div", 9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 10, "invoices"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 12, "manageInvoices"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isSaving);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(13, 14, ctx.showForm ? "cancel" : "createInvoice"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-plus", !ctx.showForm)("mdi-close", ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showForm ? 16 : 17);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i3.ɵNgNoValidate, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.NumberValueAccessor, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.MinValidator, i3.MaxValidator, i3.FormGroupDirective, i3.FormControlName, i3.FormGroupName, i3.FormArrayName, DatePicker, i4.DecimalPipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Invoices, [{
        type: Component,
        args: [{ selector: 'app-invoices', standalone: true, imports: [CommonModule, ReactiveFormsModule, TranslatePipe, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex items-end justify-between gap-4\">\n      <div>\n        <p class=\"text-sm font-semibold uppercase tracking-[.3em] text-primary\">CRM</p>\n        <h1 class=\"mt-2 text-3xl font-semibold\">{{ 'invoices' | translate }}</h1>\n        <p class=\"mt-2 text-sm text-slate-500\">{{ 'manageInvoices' | translate }}</p>\n      </div>\n      <button\n        type=\"button\"\n        class=\"grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 text-xl text-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50\"\n        [disabled]=\"isSaving\"\n        [attr.aria-label]=\"(showForm ? 'cancel' : 'createInvoice') | translate\"\n        (click)=\"toggleForm()\">\n        <i class=\"mdi\" [class.mdi-plus]=\"!showForm\" [class.mdi-close]=\"showForm\" aria-hidden=\"true\"></i>\n      </button>\n    </header>\n\n    @if (errorMessage) {\n      <div role=\"alert\" class=\"mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700\">\n        {{ errorMessage | translate }}\n      </div>\n    }\n\n    @if (showForm) {\n      @if (optionsLoadError) {\n        <div role=\"alert\" class=\"mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800\">\n          <span>{{ 'invoiceOptionsLoadError' | translate }}</span>\n          <button type=\"button\" class=\"font-semibold underline\" [disabled]=\"isOptionsLoading\" (click)=\"loadOptions()\">\n            {{ (isOptionsLoading ? 'loading' : 'retry') | translate }}\n          </button>\n        </div>\n      }\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"save()\" class=\"space-y-6\">\n        <div class=\"grid gap-4 md:grid-cols-2 xl:grid-cols-4\">\n          <label class=\"text-sm font-medium\">\n            {{ 'customer' | translate }}\n            <select formControlName=\"customerId\" class=\"mt-2 w-full rounded-xl border-slate-300\" [disabled]=\"isOptionsLoading\">\n              <option [ngValue]=\"null\">{{ 'select' | translate }}</option>\n              @for (customer of customers; track customer.id) {\n                <option [ngValue]=\"customer.id\">{{ customerName(customer) }}</option>\n              }\n            </select>\n            @if (form.controls.customerId.touched && form.controls.customerId.invalid) {\n              <small class=\"mt-1 block text-red-600\">{{ 'customerRequired' | translate }}</small>\n            }\n          </label>\n\n          <label class=\"text-sm font-medium\">\n            {{ 'currency' | translate }}\n            <select formControlName=\"currencyId\" class=\"mt-2 w-full rounded-xl border-slate-300\" [disabled]=\"isOptionsLoading\">\n              @for (currency of currencies; track currency.id) {\n                <option [ngValue]=\"currency.id\">{{ currencyLabel(currency) }}</option>\n              }\n            </select>\n          </label>\n\n          <label class=\"text-sm font-medium\">\n            {{ 'invoiceDate' | translate }}\n            <app-date-picker\n              formControlName=\"invoiceDate\"\n              class=\"mt-2 block\"\n              [ariaLabel]=\"'invoiceDate' | translate\" />\n          </label>\n\n          <label class=\"text-sm font-medium\">\n            {{ 'dueDate' | translate }}\n            <app-date-picker\n              formControlName=\"dueDate\"\n              class=\"mt-2 block\"\n              [min]=\"form.controls.invoiceDate.value || null\"\n              [ariaLabel]=\"'dueDate' | translate\" />\n            @if (form.hasError('invalidInvoiceDates') && form.controls.dueDate.touched) {\n              <small class=\"mt-1 block text-red-600\">{{ 'invoiceDueDateInvalid' | translate }}</small>\n            }\n          </label>\n        </div>\n\n        <div class=\"rounded-2xl border border-slate-200 p-4\">\n          <div class=\"mb-4 flex flex-wrap items-center justify-between gap-3\">\n            <h2 class=\"font-semibold\">{{ 'invoiceItems' | translate }}</h2>\n            <div class=\"flex gap-2\">\n              <button type=\"button\" class=\"rounded-full bg-primary px-3 py-1.5 text-sm text-white disabled:opacity-50\" [disabled]=\"isOptionsLoading\" (click)=\"addItem(2)\">\n                + {{ 'tour' | translate }}\n              </button>\n              <button type=\"button\" class=\"rounded-full bg-slate-800 px-3 py-1.5 text-sm text-white disabled:opacity-50\" [disabled]=\"isOptionsLoading\" (click)=\"addItem(1)\">\n                + {{ 'package' | translate }}\n              </button>\n            </div>\n          </div>\n\n          <div formArrayName=\"items\" class=\"space-y-3\">\n            @for (row of items.controls; track row) {\n              <div [formGroupName]=\"$index\" class=\"grid items-start gap-3 rounded-xl bg-slate-50 p-3 md:grid-cols-2 xl:grid-cols-[100px_minmax(180px,1.4fr)_minmax(180px,1.4fr)_90px_120px_120px_120px_44px]\">\n                <label class=\"text-xs\">\n                  {{ 'type' | translate }}\n                  <select formControlName=\"itemType\" class=\"mt-1 w-full rounded-lg border-slate-300\" (change)=\"itemTypeChanged(row)\">\n                    <option [ngValue]=\"2\">{{ 'tour' | translate }}</option>\n                    <option [ngValue]=\"1\">{{ 'package' | translate }}</option>\n                  </select>\n                </label>\n\n                <label class=\"text-xs\">\n                  {{ 'service' | translate }}\n                  <select formControlName=\"serviceId\" class=\"mt-1 w-full rounded-lg border-slate-300\" [disabled]=\"isOptionsLoading\" (change)=\"serviceChanged(row)\">\n                    <option [ngValue]=\"null\">{{ 'select' | translate }}</option>\n                    @for (service of serviceOptions(row); track service.id) {\n                      <option [ngValue]=\"service.id\">{{ name(service) }}</option>\n                    }\n                  </select>\n                  @if (row.controls.serviceId.touched && row.controls.serviceId.invalid) {\n                    <small class=\"mt-1 block text-red-600\">{{ 'serviceRequired' | translate }}</small>\n                  }\n                </label>\n\n                <label class=\"text-xs\">\n                  {{ 'description' | translate }}\n                  <input type=\"text\" formControlName=\"description\" class=\"mt-1 w-full rounded-lg border-slate-300\" autocomplete=\"off\">\n                  @if (row.controls.description.touched && row.controls.description.invalid) {\n                    <small class=\"mt-1 block text-red-600\">{{ 'descriptionRequired' | translate }}</small>\n                  }\n                </label>\n\n                <label class=\"text-xs\">\n                  {{ 'quantity' | translate }}\n                  <input type=\"number\" formControlName=\"quantity\" min=\"1\" step=\"1\" inputmode=\"numeric\" class=\"mt-1 w-full rounded-lg border-slate-300\">\n                </label>\n\n                <label class=\"text-xs\">\n                  {{ 'unitPrice' | translate }}\n                  <input type=\"number\" formControlName=\"unitPrice\" min=\"0\" step=\"0.01\" inputmode=\"decimal\" class=\"mt-1 w-full rounded-lg border-slate-300\">\n                </label>\n\n                <label class=\"text-xs\">\n                  {{ 'lineDiscount' | translate }}\n                  <input type=\"number\" formControlName=\"discount\" min=\"0\" step=\"0.01\" inputmode=\"decimal\" class=\"mt-1 w-full rounded-lg border-slate-300\">\n                  @if (lineDiscountInvalid(row)) {\n                    <small class=\"mt-1 block text-red-600\">{{ 'lineDiscountExceedsTotal' | translate }}</small>\n                  }\n                </label>\n\n                <label class=\"text-xs\">\n                  {{ 'lineTotal' | translate }}\n                  <span class=\"mt-1 block rounded-lg bg-white px-3 py-2 font-semibold\">{{ selectedCurrencySign }}{{ lineTotal(row) | number:'1.2-2' }}</span>\n                </label>\n\n                <button type=\"button\" class=\"mt-5 grid h-9 w-9 place-items-center rounded-full text-red-600 hover:bg-red-50\" [attr.aria-label]=\"'removeInvoiceItem' | translate\" (click)=\"removeItem($index)\">\n                  <i class=\"mdi mdi-delete-outline\" aria-hidden=\"true\"></i>\n                </button>\n              </div>\n            } @empty {\n              <p class=\"rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500\">{{ 'addInvoiceItemHint' | translate }}</p>\n            }\n          </div>\n        </div>\n\n        <div class=\"grid gap-4 md:grid-cols-2\">\n          <label class=\"text-sm font-medium\">\n            {{ 'notes' | translate }}\n            <textarea formControlName=\"notes\" rows=\"5\" class=\"mt-2 w-full rounded-xl border-slate-300\"></textarea>\n          </label>\n\n          <div class=\"rounded-2xl bg-slate-900 p-5 text-white\">\n            <div class=\"flex justify-between\">\n              <span>{{ 'subTotal' | translate }}</span>\n              <strong>{{ selectedCurrencySign }}{{ subTotal | number:'1.2-2' }}</strong>\n            </div>\n            <div class=\"mt-3 grid grid-cols-2 gap-3\">\n              <label class=\"text-xs\">\n                {{ 'discount' | translate }}\n                <input type=\"number\" formControlName=\"discount\" min=\"0\" step=\"0.01\" inputmode=\"decimal\" class=\"mt-1 w-full rounded-lg border-0 text-slate-900\">\n                @if (invoiceDiscountInvalid) {\n                  <small class=\"mt-1 block text-red-300\">{{ 'discountExceedsSubtotal' | translate }}</small>\n                }\n              </label>\n              <label class=\"text-xs\">\n                {{ 'taxRate' | translate }} (%)\n                <input type=\"number\" formControlName=\"taxRate\" min=\"0\" max=\"100\" step=\"0.01\" inputmode=\"decimal\" class=\"mt-1 w-full rounded-lg border-0 text-slate-900\">\n                @if (form.controls.taxRate.touched && form.controls.taxRate.invalid) {\n                  <small class=\"mt-1 block text-red-300\">{{ 'taxRateInvalid' | translate }}</small>\n                }\n              </label>\n            </div>\n            <div class=\"mt-4 flex justify-between border-t border-white/20 pt-3\">\n              <span>{{ 'tax' | translate }}</span>\n              <strong>{{ selectedCurrencySign }}{{ tax | number:'1.2-2' }}</strong>\n            </div>\n            <div class=\"mt-3 flex justify-between text-xl\">\n              <span>{{ 'total' | translate }}</span>\n              <strong>{{ selectedCurrencySign }}{{ total | number:'1.2-2' }}</strong>\n            </div>\n            <p class=\"mt-4 text-xs text-slate-300\">{{ 'serverCalculatedTotalsHint' | translate }}</p>\n          </div>\n        </div>\n\n        <div class=\"flex justify-end gap-3\">\n          <button type=\"button\" class=\"rounded-full border px-5 py-2 disabled:opacity-50\" [disabled]=\"isSaving\" (click)=\"toggleForm()\">\n            {{ 'cancel' | translate }}\n          </button>\n          <button type=\"submit\" class=\"rounded-full bg-primary px-6 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\" [disabled]=\"isSaving || isOptionsLoading\">\n            {{ (isSaving ? 'saving' : 'save') | translate }}\n          </button>\n        </div>\n      </form>\n    } @else {\n      <div class=\"overflow-auto rounded-2xl border\">\n        <table class=\"min-w-full text-left text-sm\">\n          <thead class=\"bg-slate-50\">\n            <tr>\n              <th class=\"p-3\">{{ 'invoiceNo' | translate }}</th>\n              <th class=\"p-3\">{{ 'customer' | translate }}</th>\n              <th class=\"p-3\">{{ 'invoiceDate' | translate }}</th>\n              <th class=\"p-3\">{{ 'dueDate' | translate }}</th>\n              <th class=\"p-3\">{{ 'total' | translate }}</th>\n              <th class=\"p-3\">{{ 'actions' | translate }}</th>\n            </tr>\n          </thead>\n          <tbody>\n            @if (isListLoading) {\n              <tr><td colspan=\"6\" class=\"p-10 text-center text-slate-500\">{{ 'loading' | translate }}</td></tr>\n            } @else {\n              @for (invoice of invoices; track invoice.id) {\n                <tr class=\"border-t\">\n                  <td class=\"p-3 font-semibold\">{{ invoice.invoiceNo }}</td>\n                  <td class=\"p-3\">\n                    {{ invoice.customerName }}\n                    <small class=\"block text-slate-500\">{{ invoice.customerNumber }}</small>\n                  </td>\n                  <td class=\"p-3\">{{ invoice.invoiceDate }}</td>\n                  <td class=\"p-3\">{{ invoice.dueDate }}</td>\n                  <td class=\"p-3\">{{ invoice.currencySign }}{{ invoice.totalAmount | number:'1.2-2' }}</td>\n                  <td class=\"p-3\">\n                    <div class=\"flex gap-2\">\n                      <button type=\"button\" class=\"icon-btn text-amber-600 disabled:opacity-40\" [disabled]=\"isOptionsLoading || deletingId !== null || downloadingId !== null\" [attr.aria-label]=\"'edit' | translate\" (click)=\"edit(invoice)\">\n                        <i class=\"mdi mdi-pencil-outline\" aria-hidden=\"true\"></i>\n                      </button>\n                      <button type=\"button\" class=\"icon-btn text-primary disabled:opacity-40\" [disabled]=\"downloadingId !== null || deletingId !== null\" [attr.aria-label]=\"'downloadPdf' | translate\" (click)=\"pdf(invoice)\">\n                        <i class=\"mdi\" [class.mdi-loading]=\"downloadingId === invoice.id\" [class.mdi-spin]=\"downloadingId === invoice.id\" [class.mdi-file-pdf-box]=\"downloadingId !== invoice.id\" aria-hidden=\"true\"></i>\n                      </button>\n                      <button type=\"button\" class=\"icon-btn text-red-600 disabled:opacity-40\" [disabled]=\"deletingId !== null || downloadingId !== null\" [attr.aria-label]=\"'delete' | translate\" (click)=\"delete(invoice)\">\n                        <i class=\"mdi\" [class.mdi-loading]=\"deletingId === invoice.id\" [class.mdi-spin]=\"deletingId === invoice.id\" [class.mdi-delete-outline]=\"deletingId !== invoice.id\" aria-hidden=\"true\"></i>\n                      </button>\n                    </div>\n                  </td>\n                </tr>\n              } @empty {\n                <tr><td colspan=\"6\" class=\"p-10 text-center text-slate-500\">{{ 'noInvoicesFound' | translate }}</td></tr>\n              }\n            }\n          </tbody>\n        </table>\n      </div>\n    }\n  </div>\n</section>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Invoices, { className: "Invoices", filePath: "app/features/configurations/invoices/invoices-page.ts", lineNumber: 41 }); })();
