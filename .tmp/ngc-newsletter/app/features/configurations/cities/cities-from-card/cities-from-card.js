import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function CitiesFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function CitiesFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function CitiesFromCard_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "englishNameRequired"));
} }
function CitiesFromCard_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arabicNameRequired"));
} }
function CitiesFromCard_For_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", destination_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", destination_r2.nameEng, " \u2014 ", destination_r2.nameAr);
} }
function CitiesFromCard_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "destinationRequired"));
} }
function CitiesFromCard_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 15);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function CitiesFromCard_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, ctx_r0.selectedCity ? "update" : "add"), " ");
} }
function CitiesFromCard_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function CitiesFromCard_Conditional_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
export class CitiesFromCard {
    apiService;
    cdr;
    selectedCity = null;
    citySaved = new EventEmitter();
    editCancelled = new EventEmitter();
    cityForm = this.createForm();
    destinations = [];
    isLoading = false;
    destinationsLoading = false;
    errorMessage = '';
    successMessage = '';
    constructor(apiService, cdr) {
        this.apiService = apiService;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.loadDestinations();
    }
    ngOnChanges(changes) {
        if (!changes['selectedCity'])
            return;
        if (this.selectedCity)
            this.populateForm(this.selectedCity);
        else
            this.resetForm(false);
    }
    saveCity() {
        if (this.isLoading)
            return;
        if (this.cityForm.invalid) {
            this.cityForm.markAllAsTouched();
            return;
        }
        const form = this.cityForm.getRawValue();
        const payload = {
            nameEng: form.nameEng.trim(),
            nameAr: form.nameAr.trim(),
            destinationId: Number(form.destinationId),
        };
        if (this.selectedCity?.id)
            payload.id = this.selectedCity.id;
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = this.selectedCity
            ? this.apiService.put('Cities', payload)
            : this.apiService.post('Cities', payload);
        request$.pipe(catchError(() => {
            this.errorMessage = 'citySaveError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = response.message || 'citySaveError';
                return;
            }
            this.successMessage = this.selectedCity ? 'cityUpdated' : 'cityCreated';
            this.resetForm(false);
            this.citySaved.emit();
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    loadDestinations() {
        this.destinationsLoading = true;
        this.apiService.get('Destinations/GetAll?page=1&pageSize=500').pipe(catchError(() => {
            this.errorMessage = 'destinationsLoadError';
            return of(null);
        }), finalize(() => {
            this.destinationsLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
            this.destinations = (Array.isArray(rows) ? rows : []).filter((destination) => destination?.isActive !== false);
        });
    }
    populateForm(city) {
        this.cityForm.setValue({
            nameEng: city.nameEng ?? '',
            nameAr: city.nameAr ?? '',
            destinationId: city.destinationId ?? null,
        });
    }
    resetForm(emitCancel) {
        this.cityForm.reset({ nameEng: '', nameAr: '', destinationId: null });
        if (emitCancel)
            this.editCancelled.emit();
    }
    createForm() {
        return new FormGroup({
            nameEng: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(150)],
            }),
            nameAr: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(150)],
            }),
            destinationId: new FormControl(null, { validators: [Validators.required] }),
        });
    }
    static ɵfac = function CitiesFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CitiesFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CitiesFromCard, selectors: [["app-cities-from-card"]], inputs: { selectedCity: "selectedCity" }, outputs: { citySaved: "citySaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 35, vars: 25, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "text-xl", "font-semibold"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "nameEng", "type", "text", "maxlength", "150", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], ["formControlName", "nameAr", "type", "text", "maxlength", "150", "dir", "rtl", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "destinationId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], [1, "flex", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"]], template: function CitiesFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, CitiesFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, CitiesFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "form", 4);
            i0.ɵɵlistener("ngSubmit", function CitiesFromCard_Template_form_ngSubmit_6_listener() { return ctx.saveCity(); });
            i0.ɵɵelementStart(7, "div")(8, "label", 5);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(11, "input", 6);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(12, CitiesFromCard_Conditional_12_Template, 3, 3, "p", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div")(14, "label", 5);
            i0.ɵɵtext(15);
            i0.ɵɵpipe(16, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 8);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(18, CitiesFromCard_Conditional_18_Template, 3, 3, "p", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div")(20, "label", 5);
            i0.ɵɵtext(21);
            i0.ɵɵpipe(22, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "select", 9)(24, "option", 10);
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(27, CitiesFromCard_For_28_Template, 2, 3, "option", 11, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(29, CitiesFromCard_Conditional_29_Template, 3, 3, "p", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 12)(31, "button", 13);
            i0.ɵɵconditionalCreate(32, CitiesFromCard_Conditional_32_Template, 4, 3)(33, CitiesFromCard_Conditional_33_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(34, CitiesFromCard_Conditional_34_Template, 3, 4, "button", 14);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 15, ctx.selectedCity ? "editCity" : "addCity"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.cityForm);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 17, "englishName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.cityForm.controls.nameEng.touched && ctx.cityForm.controls.nameEng.invalid ? 12 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 19, "arabicName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.cityForm.controls.nameAr.touched && ctx.cityForm.controls.nameAr.invalid ? 18 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 21, "destination"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", null);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 23, ctx.destinationsLoading ? "loadingDestinations" : "selectDestination"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.destinations);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.cityForm.controls.destinationId.touched && ctx.cityForm.controls.destinationId.invalid ? 29 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.cityForm.invalid || ctx.isLoading || ctx.destinationsLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 32 : 33);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedCity ? 34 : -1);
        } }, dependencies: [ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MaxLengthValidator, i2.FormGroupDirective, i2.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CitiesFromCard, [{
        type: Component,
        args: [{ selector: 'app-cities-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\n  @if (errorMessage) {\n    <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div>\n  }\n  @if (successMessage) {\n    <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div>\n  }\n\n  <h2 class=\"mb-4 text-xl font-semibold\">{{ (selectedCity ? 'editCity' : 'addCity') | translate }}</h2>\n  <form class=\"space-y-4\" [formGroup]=\"cityForm\" (ngSubmit)=\"saveCity()\">\n    <div>\n      <label class=\"mb-2 block text-sm font-medium\">{{ 'englishName' | translate }}</label>\n      <input formControlName=\"nameEng\" type=\"text\" maxlength=\"150\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />\n      @if (cityForm.controls.nameEng.touched && cityForm.controls.nameEng.invalid) {\n        <p class=\"mt-1 text-xs text-red-600\">{{ 'englishNameRequired' | translate }}</p>\n      }\n    </div>\n    <div>\n      <label class=\"mb-2 block text-sm font-medium\">{{ 'arabicName' | translate }}</label>\n      <input formControlName=\"nameAr\" type=\"text\" maxlength=\"150\" dir=\"rtl\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />\n      @if (cityForm.controls.nameAr.touched && cityForm.controls.nameAr.invalid) {\n        <p class=\"mt-1 text-xs text-red-600\">{{ 'arabicNameRequired' | translate }}</p>\n      }\n    </div>\n    <div>\n      <label class=\"mb-2 block text-sm font-medium\">{{ 'destination' | translate }}</label>\n      <select formControlName=\"destinationId\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2\">\n        <option [ngValue]=\"null\" disabled>{{ (destinationsLoading ? 'loadingDestinations' : 'selectDestination') | translate }}</option>\n        @for (destination of destinations; track destination.id) {\n          <option [ngValue]=\"destination.id\">{{ destination.nameEng }} \u2014 {{ destination.nameAr }}</option>\n        }\n      </select>\n      @if (cityForm.controls.destinationId.touched && cityForm.controls.destinationId.invalid) {\n        <p class=\"mt-1 text-xs text-red-600\">{{ 'destinationRequired' | translate }}</p>\n      }\n    </div>\n    <div class=\"flex gap-3\">\n      <button type=\"submit\" [disabled]=\"cityForm.invalid || isLoading || destinationsLoading\" class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'saving' | translate }}</span> } @else { {{ (selectedCity ? 'update' : 'add') | translate }} }</button>\n      @if (selectedCity) {\n        <button type=\"button\" class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading\" (click)=\"cancelEdit()\">{{ 'cancel' | translate }}</button>\n      }\n    </div>\n  </form>\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], { selectedCity: [{
            type: Input
        }], citySaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CitiesFromCard, { className: "CitiesFromCard", filePath: "app/features/configurations/cities/cities-from-card/cities-from-card.ts", lineNumber: 34 }); })();
