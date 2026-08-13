import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.code;
const _forTrack2 = ($index, $item) => $item.value;
function QuotationsFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function QuotationsFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function QuotationsFromCard_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 36);
    i0.ɵɵlistener("click", function QuotationsFromCard_Conditional_6_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.retryOptions()); });
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "quotationOptionsLoadError"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, "retry"));
} }
function QuotationsFromCard_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const customer_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", customer_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", customer_r3.firstName, " ", customer_r3.lastName, "", customer_r3.companyName ? " \u2014 " + customer_r3.companyName : "");
} }
function QuotationsFromCard_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currency_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", currency_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3("", currency_r4.symbol, " ", i0.ɵɵpipeBind1(2, 4, currency_r4.labelKey), " (", currency_r4.code, ")");
} }
function QuotationsFromCard_For_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", status_r5.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, status_r5.label.toLowerCase()));
} }
function QuotationsFromCard_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "endDateBeforeStart"));
} }
function QuotationsFromCard_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "quotationValidityBeforeTravel"));
} }
function QuotationsFromCard_Conditional_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 25);
} }
function QuotationsFromCard_Conditional_85_For_7_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 42);
} if (rf & 2) {
    const pkg_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.thumbnail(pkg_r7), i0.ɵɵsanitizeUrl)("alt", ctx_r0.itemName(pkg_r7));
} }
function QuotationsFromCard_Conditional_85_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 39)(1, "span", 41);
    i0.ɵɵconditionalCreate(2, QuotationsFromCard_Conditional_85_For_7_Conditional_2_Template, 1, 2, "img", 42);
    i0.ɵɵelementStart(3, "input", 43);
    i0.ɵɵlistener("change", function QuotationsFromCard_Conditional_85_For_7_Template_input_change_3_listener($event) { const pkg_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.togglePackage(pkg_r7, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 44)(5, "span", 45);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 46);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵpipe(10, "number");
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵpipe(12, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pkg_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.thumbnail(pkg_r7) ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r0.isPackageSelected(pkg_r7.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.itemName(pkg_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(9, 8, "adultPrice"), ": ", i0.ɵɵpipeBind2(10, 10, ctx_r0.packagePrice(pkg_r7), "1.2-2"), " \u00B7 ", i0.ɵɵpipeBind1(11, 13, "childPrice"), ": ", i0.ɵɵpipeBind2(12, 15, ctx_r0.childPrice(pkg_r7), "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(15, 18, ctx_r0.catalogTotal(pkg_r7), "1.2-2"));
} }
function QuotationsFromCard_Conditional_85_ForEmpty_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 40);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noPackagesFound"));
} }
function QuotationsFromCard_Conditional_85_For_15_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 42);
} if (rf & 2) {
    const tour_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.thumbnail(tour_r9), i0.ɵɵsanitizeUrl)("alt", ctx_r0.itemName(tour_r9));
} }
function QuotationsFromCard_Conditional_85_For_15_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 39)(1, "span", 41);
    i0.ɵɵconditionalCreate(2, QuotationsFromCard_Conditional_85_For_15_Conditional_2_Template, 1, 2, "img", 42);
    i0.ɵɵelementStart(3, "input", 43);
    i0.ɵɵlistener("change", function QuotationsFromCard_Conditional_85_For_15_Template_input_change_3_listener($event) { const tour_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleTour(tour_r9, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 44)(5, "span", 45);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 46);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵpipe(10, "number");
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵpipe(12, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tour_r9 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.thumbnail(tour_r9) ? 2 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r0.isTourSelected(tour_r9.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.itemName(tour_r9));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(9, 8, "adultPrice"), ": ", i0.ɵɵpipeBind2(10, 10, ctx_r0.packagePrice(tour_r9), "1.2-2"), " \u00B7 ", i0.ɵɵpipeBind1(11, 13, "childPrice"), ": ", i0.ɵɵpipeBind2(12, 15, ctx_r0.childPrice(tour_r9), "1.2-2"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(15, 18, ctx_r0.catalogTotal(tour_r9), "1.2-2"));
} }
function QuotationsFromCard_Conditional_85_ForEmpty_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 40);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noToursFound"));
} }
function QuotationsFromCard_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26)(1, "section")(2, "h3", 37);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 38);
    i0.ɵɵrepeaterCreate(6, QuotationsFromCard_Conditional_85_For_7_Template, 16, 21, "label", 39, _forTrack0, false, QuotationsFromCard_Conditional_85_ForEmpty_8_Template, 3, 3, "p", 40);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "section")(10, "h3", 37);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 38);
    i0.ɵɵrepeaterCreate(14, QuotationsFromCard_Conditional_85_For_15_Template, 16, 21, "label", 39, _forTrack0, false, QuotationsFromCard_Conditional_85_ForEmpty_16_Template, 3, 3, "p", 40);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 4, "packages"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.packages);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 6, "tours"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.tours);
} }
function QuotationsFromCard_Conditional_138_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 47);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function QuotationsFromCard_Conditional_139_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, ctx_r0.selectedQuotation ? "update" : "add"), " ");
} }
function QuotationsFromCard_Conditional_140_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 48);
    i0.ɵɵlistener("click", function QuotationsFromCard_Conditional_140_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
export var QuotationStatusEnum;
(function (QuotationStatusEnum) {
    QuotationStatusEnum[QuotationStatusEnum["Draft"] = 1] = "Draft";
    QuotationStatusEnum[QuotationStatusEnum["Sent"] = 2] = "Sent";
    QuotationStatusEnum[QuotationStatusEnum["Accepted"] = 3] = "Accepted";
    QuotationStatusEnum[QuotationStatusEnum["Rejected"] = 4] = "Rejected";
    QuotationStatusEnum[QuotationStatusEnum["Expired"] = 5] = "Expired";
    QuotationStatusEnum[QuotationStatusEnum["Cancelled"] = 6] = "Cancelled";
})(QuotationStatusEnum || (QuotationStatusEnum = {}));
export class QuotationsFromCard {
    apiService;
    cdr;
    selectedQuotation = null;
    quotationSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    quotationStatusEnum = QuotationStatusEnum;
    statuses = Object.entries(QuotationStatusEnum)
        .filter(([, value]) => typeof value === 'number')
        .map(([label, value]) => ({ label, value: value }));
    quotationForm;
    customers = [];
    currencies = [
        { id: 2, code: 'USD', symbol: '$', labelKey: 'currencyUsd' },
        { id: 1, code: 'EGP', symbol: 'EGP', labelKey: 'currencyEgp' },
    ];
    packages = [];
    tours = [];
    selectedPackageIds = new Set();
    selectedTourIds = new Set();
    isLoading = false;
    optionsLoading = false;
    optionsLoadError = false;
    errorMessage = '';
    successMessage = '';
    constructor(apiService, cdr) {
        this.apiService = apiService;
        this.cdr = cdr;
        this.quotationForm = this.createForm();
    }
    ngOnInit() {
        this.loadOptions();
    }
    ngOnChanges(changes) {
        if (this.selectedQuotation)
            this.populateForm(this.selectedQuotation);
        else
            this.resetForm(false);
    }
    get selectedPackages() {
        return this.packages.filter((pkg) => this.selectedPackageIds.has(Number(pkg.id)));
    }
    get selectedTours() {
        return this.tours.filter((tour) => this.selectedTourIds.has(Number(tour.id)));
    }
    get travelerCount() {
        const form = this.quotationForm.controls;
        return form.adults.value + form.children.value + form.infants.value;
    }
    get subTotal() {
        return this.selectedPackages.reduce((sum, pkg) => sum + this.catalogTotal(pkg), 0)
            + this.selectedTours.reduce((sum, tour) => sum + this.catalogTotal(tour), 0);
    }
    get totalCost() {
        return [...this.selectedPackages, ...this.selectedTours].reduce((sum, item) => sum + Number(item.costPrice ?? item.cost ?? 0), 0);
    }
    get tax() {
        const discountedSubtotal = Math.max(0, this.subTotal - this.quotationForm.controls.discount.value);
        return discountedSubtotal * this.quotationForm.controls.taxRate.value / 100;
    }
    get totalAmount() {
        return Math.max(0, this.subTotal - this.quotationForm.controls.discount.value) + this.tax;
    }
    get today() { return new Date().toISOString().slice(0, 10); }
    isPackageSelected(id) {
        return this.selectedPackageIds.has(Number(id));
    }
    togglePackage(pkg, checked) {
        const id = Number(pkg.id);
        if (checked)
            this.selectedPackageIds.add(id);
        else
            this.selectedPackageIds.delete(id);
    }
    isTourSelected(id) {
        return this.selectedTourIds.has(Number(id));
    }
    toggleTour(tour, checked) {
        const id = Number(tour.id);
        if (checked)
            this.selectedTourIds.add(id);
        else
            this.selectedTourIds.delete(id);
    }
    packagePrice(pkg) {
        return Number(pkg.pricePerPerson ?? pkg.price ?? pkg.totalAmount ?? 0);
    }
    childPrice(item) {
        return Number(item.pricePerChild ?? 0);
    }
    catalogTotal(item) {
        return this.packagePrice(item) * this.quotationForm.controls.adults.value
            + this.childPrice(item) * this.quotationForm.controls.children.value;
    }
    itemName(item) {
        return item?.nameEng ?? item?.titleEng ?? item?.title ?? item?.name ?? '';
    }
    thumbnail(item) {
        const image = item?.images?.[0];
        const raw = item?.coverImageUrl ?? image?.imageUrl ?? image?.url ?? item?.imageUrl ?? '';
        if (!raw || /^(blob:|data:|https?:\/\/)/i.test(raw))
            return raw;
        const path = String(raw).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    buildQuotationItems() {
        const items = [];
        let sortOrder = 1;
        const addCatalogItem = (item, itemType, reference) => {
            const base = {
                itemType,
                description: this.itemName(item),
                costPrice: Number(item.costPrice ?? item.cost ?? 0),
                discount: 0,
                sortOrder: sortOrder++,
                [reference]: Number(item.id),
            };
            const adults = this.quotationForm.controls.adults.value;
            const children = this.quotationForm.controls.children.value;
            if (adults > 0)
                items.push({ ...base, description: `${base.description} - Adults`, quantity: adults, sellingPrice: this.packagePrice(item) });
            if (children > 0 && this.childPrice(item) > 0)
                items.push({ ...base, description: `${base.description} - Children`, quantity: children, sellingPrice: this.childPrice(item), sortOrder: sortOrder++ });
        };
        this.selectedPackages.forEach((item) => addCatalogItem(item, 1, 'packageId'));
        this.selectedTours.forEach((item) => addCatalogItem(item, 2, 'tourId'));
        return items;
    }
    saveQuotation() {
        if (this.isLoading)
            return;
        if (this.quotationForm.controls.discount.value > this.subTotal) {
            this.errorMessage = 'discountExceedsSubtotal';
            return;
        }
        if (this.quotationForm.invalid || (!this.selectedPackageIds.size && !this.selectedTourIds.size)) {
            this.quotationForm.markAllAsTouched();
            if (!this.selectedPackageIds.size && !this.selectedTourIds.size)
                this.errorMessage = 'selectAtLeastOneTravelItem';
            return;
        }
        const form = this.quotationForm.getRawValue();
        const payload = {
            quotationNo: form.quotationNo.trim(),
            customerId: Number(form.customerId),
            currencyId: Number(form.currencyId),
            travelStartDate: form.travelStartDate,
            travelEndDate: form.travelEndDate,
            adults: form.adults,
            children: form.children,
            infants: form.infants,
            exchangeRate: form.exchangeRate,
            subTotal: this.subTotal,
            discount: form.discount,
            taxRate: form.taxRate,
            tax: this.tax,
            totalAmount: this.totalAmount,
            totalCost: this.totalCost,
            status: form.status,
            validUntil: form.validUntil,
            notes: form.notes.trim() || null,
            items: this.buildQuotationItems(),
        };
        if (this.selectedQuotation?.id)
            payload.id = this.selectedQuotation.id;
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = this.selectedQuotation
            ? this.apiService.put('Quotations', payload)
            : this.apiService.post('Quotations', payload);
        request$.pipe(catchError((error) => {
            this.errorMessage = error?.error?.message ?? 'quotationSaveError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = response.message;
                return;
            }
            this.successMessage = response?.message ?? 'quotationSaved';
            this.resetForm(false);
            this.quotationSaved.emit();
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    loadOptions() {
        this.optionsLoading = true;
        this.optionsLoadError = false;
        forkJoin({
            customers: this.apiService.get('Customers?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
            packages: this.apiService.get('Packages?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
            tours: this.apiService.get('Tours?page=1&pageSize=100').pipe(catchError(() => { this.optionsLoadError = true; return of([]); })),
        }).pipe(finalize(() => {
            this.optionsLoading = false;
            this.cdr.markForCheck();
        })).subscribe(({ customers, packages, tours }) => {
            this.customers = this.rows(customers, 'customers');
            this.packages = this.rows(packages, 'packages');
            this.tours = this.rows(tours, 'tours');
            if (this.selectedQuotation)
                this.selectQuotationItems(this.selectedQuotation.items);
        });
    }
    retryOptions() { this.loadOptions(); }
    populateForm(quotation) {
        this.quotationForm.setValue({
            quotationNo: quotation.quotationNo ?? '',
            customerId: quotation.customerId ?? '',
            currencyId: quotation.currencyId ?? '',
            travelStartDate: quotation.travelStartDate ?? '',
            travelEndDate: quotation.travelEndDate ?? '',
            adults: quotation.adults ?? 1,
            children: quotation.children ?? 0,
            infants: quotation.infants ?? 0,
            exchangeRate: quotation.exchangeRate ?? 1,
            discount: quotation.discount ?? 0,
            taxRate: quotation.taxRate ?? 0,
            status: quotation.status ?? QuotationStatusEnum.Draft,
            validUntil: quotation.validUntil ?? '',
            notes: quotation.notes ?? '',
        });
        this.selectQuotationItems(quotation.items);
    }
    selectQuotationItems(items) {
        this.selectedPackageIds = new Set((items ?? []).filter((item) => item.packageId ?? item.package?.id)
            .map((item) => Number(item.packageId ?? item.package?.id)));
        this.selectedTourIds = new Set((items ?? []).filter((item) => item.tourId).map((item) => Number(item.tourId)));
    }
    resetForm(emitCancel) {
        this.selectedPackageIds.clear();
        this.selectedTourIds.clear();
        this.quotationForm.reset({
            quotationNo: '',
            customerId: '',
            currencyId: this.currencies[0].id,
            travelStartDate: '',
            travelEndDate: '',
            adults: 1,
            children: 0,
            infants: 0,
            exchangeRate: 1,
            discount: 0,
            taxRate: 0,
            status: QuotationStatusEnum.Draft,
            validUntil: '',
            notes: '',
        });
        if (emitCancel)
            this.editCancelled.emit();
    }
    rows(response, key) {
        const payload = response?.data ?? response;
        const rows = payload?.data ?? payload?.items ?? payload?.[key] ?? payload;
        return Array.isArray(rows) ? rows : [];
    }
    createForm() {
        return new FormGroup({
            quotationNo: new FormControl('', { nonNullable: true }),
            customerId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            currencyId: new FormControl(this.currencies[0].id, {
                nonNullable: true,
                validators: [Validators.required],
            }),
            travelStartDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            travelEndDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            adults: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
            children: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
            infants: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
            exchangeRate: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(0.000001)] }),
            discount: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
            taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
            status: new FormControl(QuotationStatusEnum.Draft, { nonNullable: true, validators: [Validators.required] }),
            validUntil: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            notes: new FormControl('', { nonNullable: true }),
        }, { validators: this.quotationDatesValidator });
    }
    quotationDatesValidator(control) {
        const start = String(control.get('travelStartDate')?.value ?? '');
        const end = String(control.get('travelEndDate')?.value ?? '');
        const validUntil = String(control.get('validUntil')?.value ?? '');
        if (start && end && end < start)
            return { invalidTravelDateRange: true };
        if (start && validUntil && validUntil > start)
            return { invalidValidityDate: true };
        return null;
    }
    static ɵfac = function QuotationsFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || QuotationsFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: QuotationsFromCard, selectors: [["app-quotations-from-card"]], inputs: { selectedQuotation: "selectedQuotation" }, outputs: { quotationSaved: "quotationSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 141, vars: 116, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "text-xl", "font-semibold"], [1, "mb-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "rounded-2xl", "border", "border-amber-200", "bg-amber-50", "px-4", "py-3", "text-sm", "text-amber-800"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "quotationNo", "type", "text", "readonly", "", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-slate-100", "px-3", "py-2", "text-slate-500", 3, "placeholder"], ["formControlName", "customerId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2"], ["value", ""], [3, "ngValue"], ["formControlName", "currencyId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2"], ["formControlName", "status", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2"], ["formControlName", "travelStartDate", "id", "quotation-travel-start-date", "inputClass", "rounded-2xl border border-slate-300 px-3 py-2 pe-11", 3, "min", "ariaLabel"], ["formControlName", "travelEndDate", "id", "quotation-travel-end-date", "inputClass", "rounded-2xl border border-slate-300 px-3 py-2 pe-11", 3, "min", "ariaLabel"], ["formControlName", "validUntil", "id", "quotation-valid-until", "inputClass", "rounded-2xl border border-slate-300 px-3 py-2 pe-11", 3, "min", "max", "ariaLabel"], ["formControlName", "exchangeRate", "type", "number", "min", "0.000001", "step", "0.000001", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "text-sm", "text-red-600"], [1, "grid", "gap-4", "sm:grid-cols-3"], ["formControlName", "adults", "type", "number", "min", "1", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "children", "type", "number", "min", "0", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "infants", "type", "number", "min", "0", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-4"], [1, "px-2", "text-sm", "font-semibold"], [1, "h-28", "animate-pulse", "rounded-xl", "bg-slate-100"], [1, "grid", "gap-5", "lg:grid-cols-2"], ["formControlName", "discount", "type", "number", "min", "0", "step", "0.01", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", 3, "max"], [1, "mt-1", "text-xs", "text-slate-500"], ["formControlName", "taxRate", "type", "number", "min", "0", "step", "0.01", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "grid", "gap-3", "rounded-2xl", "bg-slate-900", "p-4", "text-sm", "text-white", "sm:grid-cols-2"], [1, "sm:col-span-2", "text-base", "text-emerald-300"], ["formControlName", "notes", "rows", "3", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "flex", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1", "font-semibold", "hover:bg-amber-100", 3, "click"], [1, "mb-2", "text-sm", "font-semibold", "text-primary"], [1, "max-h-72", "space-y-2", "overflow-y-auto"], [1, "flex", "cursor-pointer", "items-center", "justify-between", "gap-3", "rounded-xl", "border", "p-3", "hover:border-primary"], [1, "py-4", "text-center", "text-sm", "text-slate-500"], [1, "flex", "min-w-0", "items-center", "gap-3"], [1, "h-12", "w-16", "rounded-lg", "object-cover", 3, "src", "alt"], ["type", "checkbox", 3, "change", "checked"], [1, "min-w-0"], [1, "block", "truncate", "font-medium"], [1, "text-xs", "text-slate-500"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"]], template: function QuotationsFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, QuotationsFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, QuotationsFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(6, QuotationsFromCard_Conditional_6_Template, 7, 6, "div", 4);
            i0.ɵɵelementStart(7, "form", 5);
            i0.ɵɵlistener("ngSubmit", function QuotationsFromCard_Template_form_ngSubmit_7_listener() { return ctx.saveQuotation(); });
            i0.ɵɵelementStart(8, "div", 6)(9, "div")(10, "label", 7);
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 8);
            i0.ɵɵpipe(14, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div")(16, "label", 7);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "select", 9)(20, "option", 10);
            i0.ɵɵtext(21);
            i0.ɵɵpipe(22, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(23, QuotationsFromCard_For_24_Template, 2, 4, "option", 11, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div")(26, "label", 7);
            i0.ɵɵtext(27);
            i0.ɵɵpipe(28, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "select", 12);
            i0.ɵɵrepeaterCreate(30, QuotationsFromCard_For_31_Template, 3, 6, "option", 11, _forTrack1);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div")(33, "label", 7);
            i0.ɵɵtext(34);
            i0.ɵɵpipe(35, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "select", 13);
            i0.ɵɵrepeaterCreate(37, QuotationsFromCard_For_38_Template, 3, 4, "option", 11, _forTrack2);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div")(40, "label", 7);
            i0.ɵɵtext(41);
            i0.ɵɵpipe(42, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(43, "app-date-picker", 14);
            i0.ɵɵpipe(44, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div")(46, "label", 7);
            i0.ɵɵtext(47);
            i0.ɵɵpipe(48, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(49, "app-date-picker", 15);
            i0.ɵɵpipe(50, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "div")(52, "label", 7);
            i0.ɵɵtext(53);
            i0.ɵɵpipe(54, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(55, "app-date-picker", 16);
            i0.ɵɵpipe(56, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div")(58, "label", 7);
            i0.ɵɵtext(59);
            i0.ɵɵpipe(60, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(61, "input", 17);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(62, QuotationsFromCard_Conditional_62_Template, 3, 3, "p", 18);
            i0.ɵɵconditionalCreate(63, QuotationsFromCard_Conditional_63_Template, 3, 3, "p", 18);
            i0.ɵɵelementStart(64, "div", 19)(65, "div")(66, "label", 7);
            i0.ɵɵtext(67);
            i0.ɵɵpipe(68, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(69, "input", 20);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div")(71, "label", 7);
            i0.ɵɵtext(72);
            i0.ɵɵpipe(73, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(74, "input", 21);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "div")(76, "label", 7);
            i0.ɵɵtext(77);
            i0.ɵɵpipe(78, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(79, "input", 22);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(80, "fieldset", 23)(81, "legend", 24);
            i0.ɵɵtext(82);
            i0.ɵɵpipe(83, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(84, QuotationsFromCard_Conditional_84_Template, 1, 0, "div", 25)(85, QuotationsFromCard_Conditional_85_Template, 17, 8, "div", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "div", 6)(87, "div")(88, "label", 7);
            i0.ɵɵtext(89);
            i0.ɵɵpipe(90, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(91, "input", 27);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(92, "p", 28);
            i0.ɵɵtext(93);
            i0.ɵɵpipe(94, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(95, "div")(96, "label", 7);
            i0.ɵɵtext(97);
            i0.ɵɵpipe(98, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(99, "input", 29);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(100, "div", 30)(101, "p");
            i0.ɵɵtext(102);
            i0.ɵɵpipe(103, "translate");
            i0.ɵɵelementStart(104, "strong");
            i0.ɵɵtext(105);
            i0.ɵɵpipe(106, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "p");
            i0.ɵɵtext(108);
            i0.ɵɵpipe(109, "translate");
            i0.ɵɵelementStart(110, "strong");
            i0.ɵɵtext(111);
            i0.ɵɵpipe(112, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(113, "p");
            i0.ɵɵtext(114);
            i0.ɵɵpipe(115, "translate");
            i0.ɵɵelementStart(116, "strong");
            i0.ɵɵtext(117);
            i0.ɵɵpipe(118, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(119, "p");
            i0.ɵɵtext(120);
            i0.ɵɵpipe(121, "translate");
            i0.ɵɵelementStart(122, "strong");
            i0.ɵɵtext(123);
            i0.ɵɵpipe(124, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(125, "p", 31);
            i0.ɵɵtext(126);
            i0.ɵɵpipe(127, "translate");
            i0.ɵɵelementStart(128, "strong");
            i0.ɵɵtext(129);
            i0.ɵɵpipe(130, "number");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(131, "div")(132, "label", 7);
            i0.ɵɵtext(133);
            i0.ɵɵpipe(134, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(135, "textarea", 32);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(136, "div", 33)(137, "button", 34);
            i0.ɵɵconditionalCreate(138, QuotationsFromCard_Conditional_138_Template, 4, 3)(139, QuotationsFromCard_Conditional_139_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(140, QuotationsFromCard_Conditional_140_Template, 3, 4, "button", 35);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 47, ctx.selectedQuotation ? "editQuotation" : "addQuotation"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.optionsLoadError ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.quotationForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 49, "quotationNo"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(14, 51, "quotationNoGenerated"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 53, "customer"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 55, "selectCustomer"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.customers);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 57, "currency"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.currencies);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(35, 59, "status"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.statuses);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(42, 61, "travelStartDate"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("min", ctx.today)("ariaLabel", i0.ɵɵpipeBind1(44, 63, "travelStartDate"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(48, 65, "travelEndDate"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("min", ctx.quotationForm.controls.travelStartDate.value || ctx.today)("ariaLabel", i0.ɵɵpipeBind1(50, 67, "travelEndDate"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(54, 69, "validUntil"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("min", ctx.today)("max", ctx.quotationForm.controls.travelStartDate.value || null)("ariaLabel", i0.ɵɵpipeBind1(56, 71, "validUntil"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(60, 73, "exchangeRate"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.quotationForm.hasError("invalidTravelDateRange") ? 62 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.quotationForm.hasError("invalidValidityDate") ? 63 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(68, 75, "adults"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(73, 77, "children"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(78, 79, "infants"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(83, 81, "quotationTravelItems"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.optionsLoading ? 84 : 85);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(90, 83, "discountAmount"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("max", ctx.subTotal);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(94, 85, "discountAppliedBeforeTax"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(98, 87, "taxRate"), " (%)");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(103, 89, "subTotal"), ": ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(106, 91, ctx.subTotal, "1.2-2"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(109, 94, "discount"), ": ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(112, 96, ctx.quotationForm.controls.discount.value, "1.2-2"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(115, 99, "tax"), ": ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(118, 101, ctx.tax, "1.2-2"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(121, 104, "totalCost"), ": ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(124, 106, ctx.totalCost, "1.2-2"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(127, 109, "finalPriceAfterDiscount"), ": ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(130, 111, ctx.totalAmount, "1.2-2"));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(134, 114, "notes"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.quotationForm.invalid || ctx.isLoading || ctx.optionsLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 138 : 139);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedQuotation ? 140 : -1);
        } }, dependencies: [ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, i2.FormGroupDirective, i2.FormControlName, DatePicker, DecimalPipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QuotationsFromCard, [{
        type: Component,
        args: [{ selector: 'app-quotations-from-card', standalone: true, imports: [ReactiveFormsModule, DecimalPipe, TranslatePipe, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\n  <h2 class=\"mb-4 text-xl font-semibold\">{{ (selectedQuotation ? 'editQuotation' : 'addQuotation') | translate }}</h2>\n  @if (optionsLoadError) { <div class=\"mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800\"><span>{{ 'quotationOptionsLoadError' | translate }}</span><button type=\"button\" (click)=\"retryOptions()\" class=\"rounded-full border border-amber-300 px-3 py-1 font-semibold hover:bg-amber-100\">{{ 'retry' | translate }}</button></div> }\n  <form class=\"space-y-5\" [formGroup]=\"quotationForm\" (ngSubmit)=\"saveQuotation()\">\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'quotationNo' | translate }}</label><input formControlName=\"quotationNo\" type=\"text\" readonly [placeholder]=\"'quotationNoGenerated' | translate\" class=\"w-full rounded-2xl border border-slate-300 bg-slate-100 px-3 py-2 text-slate-500\" /></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'customer' | translate }}</label><select formControlName=\"customerId\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2\"><option value=\"\">{{ 'selectCustomer' | translate }}</option>@for (customer of customers; track customer.id) { <option [ngValue]=\"customer.id\">{{ customer.firstName }} {{ customer.lastName }}{{ customer.companyName ? ' \u2014 ' + customer.companyName : '' }}</option> }</select></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'currency' | translate }}</label><select formControlName=\"currencyId\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2\">@for (currency of currencies; track currency.code) { <option [ngValue]=\"currency.id\">{{ currency.symbol }} {{ currency.labelKey | translate }} ({{ currency.code }})</option> }</select></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'status' | translate }}</label><select formControlName=\"status\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2\">@for (status of statuses; track status.value) { <option [ngValue]=\"status.value\">{{ status.label.toLowerCase() | translate }}</option> }</select></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'travelStartDate' | translate }}</label><app-date-picker formControlName=\"travelStartDate\" id=\"quotation-travel-start-date\" [min]=\"today\" [ariaLabel]=\"'travelStartDate' | translate\" inputClass=\"rounded-2xl border border-slate-300 px-3 py-2 pe-11\" /></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'travelEndDate' | translate }}</label><app-date-picker formControlName=\"travelEndDate\" id=\"quotation-travel-end-date\" [min]=\"quotationForm.controls.travelStartDate.value || today\" [ariaLabel]=\"'travelEndDate' | translate\" inputClass=\"rounded-2xl border border-slate-300 px-3 py-2 pe-11\" /></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'validUntil' | translate }}</label><app-date-picker formControlName=\"validUntil\" id=\"quotation-valid-until\" [min]=\"today\" [max]=\"quotationForm.controls.travelStartDate.value || null\" [ariaLabel]=\"'validUntil' | translate\" inputClass=\"rounded-2xl border border-slate-300 px-3 py-2 pe-11\" /></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'exchangeRate' | translate }}</label><input formControlName=\"exchangeRate\" type=\"number\" min=\"0.000001\" step=\"0.000001\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\n    </div>\n    @if (quotationForm.hasError('invalidTravelDateRange')) { <p class=\"text-sm text-red-600\">{{ 'endDateBeforeStart' | translate }}</p> }\n    @if (quotationForm.hasError('invalidValidityDate')) { <p class=\"text-sm text-red-600\">{{ 'quotationValidityBeforeTravel' | translate }}</p> }\n\n    <div class=\"grid gap-4 sm:grid-cols-3\">\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'adults' | translate }}</label><input formControlName=\"adults\" type=\"number\" min=\"1\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'children' | translate }}</label><input formControlName=\"children\" type=\"number\" min=\"0\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'infants' | translate }}</label><input formControlName=\"infants\" type=\"number\" min=\"0\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\n    </div>\n\n    <fieldset class=\"rounded-2xl border border-slate-200 bg-white p-4\">\n      <legend class=\"px-2 text-sm font-semibold\">{{ 'quotationTravelItems' | translate }}</legend>\n      @if (optionsLoading) { <div class=\"h-28 animate-pulse rounded-xl bg-slate-100\"></div> }\n      @else {\n        <div class=\"grid gap-5 lg:grid-cols-2\">\n          <section><h3 class=\"mb-2 text-sm font-semibold text-primary\">{{ 'packages' | translate }}</h3><div class=\"max-h-72 space-y-2 overflow-y-auto\">\n            @for (pkg of packages; track pkg.id) { <label class=\"flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 hover:border-primary\"><span class=\"flex min-w-0 items-center gap-3\">@if (thumbnail(pkg)) { <img [src]=\"thumbnail(pkg)\" [alt]=\"itemName(pkg)\" class=\"h-12 w-16 rounded-lg object-cover\" /> }<input type=\"checkbox\" [checked]=\"isPackageSelected(pkg.id)\" (change)=\"togglePackage(pkg, $any($event.target).checked)\" /><span class=\"min-w-0\"><span class=\"block truncate font-medium\">{{ itemName(pkg) }}</span><span class=\"text-xs text-slate-500\">{{ 'adultPrice' | translate }}: {{ packagePrice(pkg) | number:'1.2-2' }} \u00B7 {{ 'childPrice' | translate }}: {{ childPrice(pkg) | number:'1.2-2' }}</span></span></span><strong>{{ catalogTotal(pkg) | number:'1.2-2' }}</strong></label> }\n            @empty { <p class=\"py-4 text-center text-sm text-slate-500\">{{ 'noPackagesFound' | translate }}</p> }\n          </div></section>\n          <section><h3 class=\"mb-2 text-sm font-semibold text-primary\">{{ 'tours' | translate }}</h3><div class=\"max-h-72 space-y-2 overflow-y-auto\">\n            @for (tour of tours; track tour.id) { <label class=\"flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 hover:border-primary\"><span class=\"flex min-w-0 items-center gap-3\">@if (thumbnail(tour)) { <img [src]=\"thumbnail(tour)\" [alt]=\"itemName(tour)\" class=\"h-12 w-16 rounded-lg object-cover\" /> }<input type=\"checkbox\" [checked]=\"isTourSelected(tour.id)\" (change)=\"toggleTour(tour, $any($event.target).checked)\" /><span class=\"min-w-0\"><span class=\"block truncate font-medium\">{{ itemName(tour) }}</span><span class=\"text-xs text-slate-500\">{{ 'adultPrice' | translate }}: {{ packagePrice(tour) | number:'1.2-2' }} \u00B7 {{ 'childPrice' | translate }}: {{ childPrice(tour) | number:'1.2-2' }}</span></span></span><strong>{{ catalogTotal(tour) | number:'1.2-2' }}</strong></label> }\n            @empty { <p class=\"py-4 text-center text-sm text-slate-500\">{{ 'noToursFound' | translate }}</p> }\n          </div></section>\n        </div>\n      }\n    </fieldset>\n\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'discountAmount' | translate }}</label><input formControlName=\"discount\" type=\"number\" min=\"0\" [max]=\"subTotal\" step=\"0.01\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /><p class=\"mt-1 text-xs text-slate-500\">{{ 'discountAppliedBeforeTax' | translate }}</p></div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'taxRate' | translate }} (%)</label><input formControlName=\"taxRate\" type=\"number\" min=\"0\" step=\"0.01\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\n    </div>\n\n    <div class=\"grid gap-3 rounded-2xl bg-slate-900 p-4 text-sm text-white sm:grid-cols-2\">\n      <p>{{ 'subTotal' | translate }}: <strong>{{ subTotal | number:'1.2-2' }}</strong></p><p>{{ 'discount' | translate }}: <strong>{{ quotationForm.controls.discount.value | number:'1.2-2' }}</strong></p>\n      <p>{{ 'tax' | translate }}: <strong>{{ tax | number:'1.2-2' }}</strong></p><p>{{ 'totalCost' | translate }}: <strong>{{ totalCost | number:'1.2-2' }}</strong></p>\n      <p class=\"sm:col-span-2 text-base text-emerald-300\">{{ 'finalPriceAfterDiscount' | translate }}: <strong>{{ totalAmount | number:'1.2-2' }}</strong></p>\n    </div>\n\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'notes' | translate }}</label><textarea formControlName=\"notes\" rows=\"3\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\"></textarea></div>\n    <div class=\"flex gap-3\"><button type=\"submit\" [disabled]=\"quotationForm.invalid || isLoading || optionsLoading\" class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'saving' | translate }}</span> } @else { {{ (selectedQuotation ? 'update' : 'add') | translate }} }</button>@if (selectedQuotation) { <button type=\"button\" class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading\" (click)=\"cancelEdit()\">{{ 'cancel' | translate }}</button> }</div>\n  </form>\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], { selectedQuotation: [{
            type: Input
        }], quotationSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(QuotationsFromCard, { className: "QuotationsFromCard", filePath: "app/features/configurations/quotations/quotations-from-card/quotations-from-card.ts", lineNumber: 59 }); })();
