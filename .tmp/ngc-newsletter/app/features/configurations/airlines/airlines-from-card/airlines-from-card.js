import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { ImageUploadValidationError, normalizeImageUpload, } from '../../shared/image-upload.util';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
function AirlinesFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function AirlinesFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function AirlinesFromCard_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airlineNameRequired"));
} }
function AirlinesFromCard_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airlineCodeRequired"));
} }
function AirlinesFromCard_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airlineCodeInvalid"));
} }
function AirlinesFromCard_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.imageValidationMessage));
} }
function AirlinesFromCard_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airlineLogoRequired"));
} }
function AirlinesFromCard_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "img", 25);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementStart(3, "button", 26);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵlistener("click", function AirlinesFromCard_Conditional_40_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.removeLogo()); });
    i0.ɵɵelement(5, "i", 27);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.getLogoUrl(ctx_r0.logoUpload.url), i0.ɵɵsanitizeUrl);
    i0.ɵɵattribute("alt", i0.ɵɵpipeBind1(2, 10, "airlineLogo"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isLoading || ctx_r0.isDeletingLogo);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(4, 12, "removeImage"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.isDeletingLogo)("mdi-spin", ctx_r0.isDeletingLogo)("mdi-close", !ctx_r0.isDeletingLogo);
} }
function AirlinesFromCard_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 28);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function AirlinesFromCard_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, ctx_r0.selectedAirline ? "update" : "add"), " ");
} }
function AirlinesFromCard_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function AirlinesFromCard_Conditional_45_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading || ctx_r0.isDeletingLogo);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
export class AirlinesFromCard {
    apiService;
    cdr;
    translate;
    selectedAirline = null;
    airlineSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    maxImageBytes = 5 * 1024 * 1024;
    imageConstraints = { maxWidth: 2400, maxHeight: 1600 };
    airlineForm = this.createForm();
    logoUpload = null;
    isLoading = false;
    isDeletingLogo = false;
    errorMessage = '';
    imageValidationMessage = '';
    successMessage = '';
    constructor(apiService, cdr, translate) {
        this.apiService = apiService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnChanges(changes) {
        if (!changes['selectedAirline'])
            return;
        if (this.selectedAirline)
            this.populateForm(this.selectedAirline);
        else
            this.resetForm(false);
    }
    ngOnDestroy() {
        this.revokeNewLogoUrl();
    }
    saveAirline() {
        if (this.isLoading)
            return;
        if (this.airlineForm.invalid) {
            this.airlineForm.markAllAsTouched();
            return;
        }
        const form = this.airlineForm.getRawValue();
        const payload = {
            name: form.name.trim(),
            code: form.code.trim().toUpperCase(),
        };
        if (this.selectedAirline?.id)
            payload.id = this.selectedAirline.id;
        const requestPayload = new FormData();
        Object.entries(payload).forEach(([key, value]) => requestPayload.append(key, String(value)));
        if (this.logoUpload?.file) {
            requestPayload.append('Logo', this.logoUpload.file, this.logoUpload.file.name);
        }
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = this.selectedAirline
            ? this.apiService.put('Airlines', requestPayload)
            : this.apiService.post('Airlines', requestPayload);
        request$
            .pipe(catchError(() => {
            this.errorMessage = 'airlineSaveError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }))
            .subscribe((res) => {
            if (res === null)
                return;
            if (res?.isSuccess === false) {
                this.errorMessage = res.message;
                return;
            }
            this.successMessage = res.message;
            this.resetForm(false);
            this.airlineSaved.emit();
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    async onLogoSelected(event) {
        const input = event.target;
        const file = input.files?.[0];
        input.value = '';
        this.imageValidationMessage = '';
        if (!file)
            return;
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            this.imageValidationMessage = 'invalidImageType';
            return;
        }
        if (file.size > this.maxImageBytes) {
            this.imageValidationMessage = 'imageTooLarge';
            return;
        }
        try {
            const normalized = await normalizeImageUpload(file, this.imageConstraints);
            this.revokeNewLogoUrl();
            this.logoUpload = {
                file: normalized,
                url: URL.createObjectURL(normalized),
                name: normalized.name,
                existing: false,
            };
            this.airlineForm.controls.logo.setValue(this.logoUpload.url);
            this.airlineForm.controls.logo.markAsTouched();
        }
        catch (error) {
            this.imageValidationMessage = error instanceof ImageUploadValidationError
                ? error.translationKey
                : 'imageReadError';
        }
        this.cdr.markForCheck();
    }
    async removeLogo() {
        if (!this.logoUpload || this.isLoading || this.isDeletingLogo)
            return;
        const confirmation = await Swal.fire({
            title: this.translate.instant('confirmImageDelete'),
            text: this.translate.instant('imageDeleteWarning'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('delete'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: '#e11d48',
            reverseButtons: true,
        });
        if (!confirmation.isConfirmed)
            return;
        if (this.logoUpload.existing && this.selectedAirline?.id) {
            this.isDeletingLogo = true;
            this.apiService.deleteRequest(`Airlines/${this.selectedAirline.id}/logo`).pipe(catchError(() => {
                Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
                return of({ imageDeleteFailed: true });
            }), finalize(() => {
                this.isDeletingLogo = false;
                this.cdr.markForCheck();
            })).subscribe((response) => {
                if (response?.imageDeleteFailed || response?.isSuccess === false)
                    return;
                this.clearLogo();
                this.showLogoDeletedToast();
            });
            return;
        }
        this.clearLogo();
        this.showLogoDeletedToast();
    }
    getLogoUrl(url) {
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    populateForm(airline) {
        this.revokeNewLogoUrl();
        const logoUrl = airline.logoUrl ?? '';
        this.logoUpload = logoUrl
            ? { url: logoUrl, name: this.translate.instant('airlineLogo'), existing: true }
            : null;
        this.airlineForm.setValue({
            name: airline.name ?? '',
            code: airline.code ?? '',
            logo: logoUrl,
        });
    }
    resetForm(emitCancel) {
        this.revokeNewLogoUrl();
        this.logoUpload = null;
        this.imageValidationMessage = '';
        this.airlineForm.reset({ name: '', code: '', logo: '' });
        if (emitCancel)
            this.editCancelled.emit();
    }
    clearLogo() {
        this.revokeNewLogoUrl();
        this.logoUpload = null;
        this.airlineForm.controls.logo.setValue('');
        this.airlineForm.controls.logo.markAsTouched();
        this.cdr.markForCheck();
    }
    revokeNewLogoUrl() {
        if (this.logoUpload?.file)
            URL.revokeObjectURL(this.logoUpload.url);
    }
    showLogoDeletedToast() {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: this.translate.instant('imageDeleted'),
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true,
        });
    }
    createForm() {
        return new FormGroup({
            name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            code: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,3}$/)],
            }),
            logo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        });
    }
    static ɵfac = function AirlinesFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || AirlinesFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AirlinesFromCard, selectors: [["app-airlines-from-card"]], inputs: { selectedAirline: "selectedAirline" }, outputs: { airlineSaved: "airlineSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 46, vars: 35, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "text-xl", "font-semibold"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "name", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], ["formControlName", "code", "type", "text", "maxlength", "3", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "uppercase"], [1, "mb-2", "flex", "items-center", "justify-between"], ["for", "airlineLogo", 1, "text-sm", "font-medium"], [1, "text-xs", "text-slate-500"], ["for", "airlineLogo", 1, "flex", "cursor-pointer", "flex-col", "items-center", "rounded-2xl", "border-2", "border-dashed", "border-slate-300", "bg-white", "px-4", "py-6", "text-center", "transition", "hover:border-primary", "hover:bg-primary/5"], [1, "grid", "h-12", "w-12", "place-items-center", "rounded-2xl", "bg-primary/10", "text-2xl", "text-primary"], [1, "mdi", "mdi-cloud-upload-outline"], [1, "mt-2", "text-sm", "font-semibold", "text-primary"], [1, "mt-1", "text-xs", "text-slate-500"], ["id", "airlineLogo", "type", "file", "accept", "image/jpeg,image/png,image/webp", 1, "sr-only", 3, "change", "disabled"], ["role", "alert", 1, "mt-2", "text-xs", "font-medium", "text-red-600"], [1, "mt-2", "text-xs", "text-red-600"], [1, "relative", "mt-3", "grid", "h-28", "w-44", "place-items-center", "overflow-hidden", "rounded-xl", "border", "border-slate-200", "bg-white", "p-2", "shadow-sm"], [1, "flex", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "disabled"], [1, "max-h-full", "max-w-full", "object-contain", 3, "src"], ["type", "button", 1, "absolute", "end-2", "top-2", "grid", "h-8", "w-8", "place-items-center", "rounded-full", "bg-black/70", "text-lg", "text-white", "transition", "hover:bg-rose-600", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"]], template: function AirlinesFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, AirlinesFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, AirlinesFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "form", 4);
            i0.ɵɵlistener("ngSubmit", function AirlinesFromCard_Template_form_ngSubmit_6_listener() { return ctx.saveAirline(); });
            i0.ɵɵelementStart(7, "div", 5)(8, "div")(9, "label", 6);
            i0.ɵɵtext(10);
            i0.ɵɵpipe(11, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "input", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(13, AirlinesFromCard_Conditional_13_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div")(15, "label", 6);
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(18, "input", 9);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(19, AirlinesFromCard_Conditional_19_Template, 3, 3, "p", 8);
            i0.ɵɵconditionalCreate(20, AirlinesFromCard_Conditional_20_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div")(22, "div", 10)(23, "label", 11);
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span", 12);
            i0.ɵɵtext(27, "1 / 1");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "label", 13)(29, "span", 14);
            i0.ɵɵelement(30, "i", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 16);
            i0.ɵɵtext(32);
            i0.ɵɵpipe(33, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span", 17);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "input", 18);
            i0.ɵɵlistener("change", function AirlinesFromCard_Template_input_change_37_listener($event) { return ctx.onLogoSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(38, AirlinesFromCard_Conditional_38_Template, 3, 3, "p", 19);
            i0.ɵɵconditionalCreate(39, AirlinesFromCard_Conditional_39_Template, 3, 3, "p", 20);
            i0.ɵɵconditionalCreate(40, AirlinesFromCard_Conditional_40_Template, 6, 14, "div", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 22)(42, "button", 23);
            i0.ɵɵconditionalCreate(43, AirlinesFromCard_Conditional_43_Template, 4, 3)(44, AirlinesFromCard_Conditional_44_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(45, AirlinesFromCard_Conditional_45_Template, 3, 4, "button", 24);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 23, ctx.selectedAirline ? "editAirline" : "addAirline"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.airlineForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 25, "airlineName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.airlineForm.get("name")?.touched && ctx.airlineForm.get("name")?.hasError("required") ? 13 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 27, "airlineCode"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.airlineForm.get("code")?.touched && ctx.airlineForm.get("code")?.hasError("required") ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.airlineForm.get("code")?.touched && ctx.airlineForm.get("code")?.hasError("pattern") ? 20 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 29, "airlineLogo"));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("cursor-not-allowed", ctx.isLoading || ctx.isDeletingLogo)("opacity-60", ctx.isLoading || ctx.isDeletingLogo);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(33, 31, ctx.logoUpload ? "replaceImage" : "chooseImage"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 33, "airlineLogoRules"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isLoading || ctx.isDeletingLogo);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.imageValidationMessage ? 38 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.airlineForm.controls.logo.touched && ctx.airlineForm.controls.logo.invalid ? 39 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.logoUpload ? 40 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.airlineForm.invalid || ctx.isLoading || ctx.isDeletingLogo);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 43 : 44);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedAirline ? 45 : -1);
        } }, dependencies: [ReactiveFormsModule, i3.ɵNgNoValidate, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.MaxLengthValidator, i3.FormGroupDirective, i3.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AirlinesFromCard, [{
        type: Component,
        args: [{ selector: 'app-airlines-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{\r\n    errorMessage | translate }}</div> }\r\n  @if (successMessage) { <div\r\n    class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{\r\n    successMessage | translate }}</div> }\r\n  <h2 class=\"mb-4 text-xl font-semibold\">{{ (selectedAirline ? 'editAirline' : 'addAirline') | translate }}</h2>\r\n  <form class=\"space-y-4\" [formGroup]=\"airlineForm\" (ngSubmit)=\"saveAirline()\">\r\n    <div class=\"grid gap-4 md:grid-cols-2\">\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'airlineName' | translate }}</label><input\r\n          formControlName=\"name\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if\r\n        (airlineForm.get('name')?.touched && airlineForm.get('name')?.hasError('required')) { <p\r\n          class=\"mt-1 text-xs text-red-600\">{{ 'airlineNameRequired' | translate }}</p> }</div>\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'airlineCode' | translate }}</label><input\r\n          formControlName=\"code\" type=\"text\" maxlength=\"3\"\r\n          class=\"w-full rounded-2xl border border-slate-300 px-3 py-2 uppercase\" />@if (airlineForm.get('code')?.touched\r\n        && airlineForm.get('code')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{\r\n          'airlineCodeRequired' | translate }}</p> }@if (airlineForm.get('code')?.touched &&\r\n        airlineForm.get('code')?.hasError('pattern')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'airlineCodeInvalid' |\r\n          translate }}</p> }</div>\r\n    </div>\r\n    <div>\n      <div class=\"mb-2 flex items-center justify-between\"><label for=\"airlineLogo\" class=\"text-sm font-medium\">{{ 'airlineLogo' | translate }}</label><span class=\"text-xs text-slate-500\">1 / 1</span></div>\n      <label for=\"airlineLogo\" class=\"flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-6 text-center transition hover:border-primary hover:bg-primary/5\"\n        [class.cursor-not-allowed]=\"isLoading || isDeletingLogo\" [class.opacity-60]=\"isLoading || isDeletingLogo\">\n        <span class=\"grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary\"><i class=\"mdi mdi-cloud-upload-outline\"></i></span>\n        <span class=\"mt-2 text-sm font-semibold text-primary\">{{ (logoUpload ? 'replaceImage' : 'chooseImage') | translate }}</span>\n        <span class=\"mt-1 text-xs text-slate-500\">{{ 'airlineLogoRules' | translate }}</span>\n      </label>\n      <input id=\"airlineLogo\" type=\"file\" accept=\"image/jpeg,image/png,image/webp\" class=\"sr-only\" [disabled]=\"isLoading || isDeletingLogo\" (change)=\"onLogoSelected($event)\" />\n      @if (imageValidationMessage) { <p class=\"mt-2 text-xs font-medium text-red-600\" role=\"alert\">{{ imageValidationMessage | translate }}</p> }\n      @if (airlineForm.controls.logo.touched && airlineForm.controls.logo.invalid) { <p class=\"mt-2 text-xs text-red-600\">{{ 'airlineLogoRequired' | translate }}</p> }\n      @if (logoUpload) {\n        <div class=\"relative mt-3 grid h-28 w-44 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm\">\n          <img [src]=\"getLogoUrl(logoUpload.url)\" [attr.alt]=\"'airlineLogo' | translate\" class=\"max-h-full max-w-full object-contain\" />\n          <button type=\"button\" class=\"absolute end-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-lg text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60\" [disabled]=\"isLoading || isDeletingLogo\" [attr.aria-label]=\"'removeImage' | translate\" (click)=\"removeLogo()\"><i class=\"mdi\" [class.mdi-loading]=\"isDeletingLogo\" [class.mdi-spin]=\"isDeletingLogo\" [class.mdi-close]=\"!isDeletingLogo\"></i></button>\n        </div>\n      }\n    </div>\r\n    <div class=\"flex gap-3\"><button type=\"submit\" [disabled]=\"airlineForm.invalid || isLoading || isDeletingLogo\"\n        class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">\r\n        @if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'saving' | translate\r\n          }}</span> }\r\n        @else { {{ (selectedAirline ? 'update' : 'add') | translate }} }</button>\r\n      @if (selectedAirline) { <button type=\"button\"\r\n        class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading || isDeletingLogo\"\n        (click)=\"cancelEdit()\">\r\n        {{ 'cancel' | translate }}</button>\r\n      }</div>\r\n  </form>\r\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { selectedAirline: [{
            type: Input
        }], airlineSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AirlinesFromCard, { className: "AirlinesFromCard", filePath: "app/features/configurations/airlines/airlines-from-card/airlines-from-card.ts", lineNumber: 45 }); })();
