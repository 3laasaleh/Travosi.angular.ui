import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function HotelsFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function HotelsFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function HotelsFromCard_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "hotelNameRequired"));
} }
function HotelsFromCard_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const star_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", star_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(star_r2);
} }
function HotelsFromCard_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "starRatingRequired"));
} }
function HotelsFromCard_For_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", destination_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(destination_r3.nameEng ?? destination_r3.name);
} }
function HotelsFromCard_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "destinationRequired"));
} }
function HotelsFromCard_Conditional_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "emailInvalid"));
} }
function HotelsFromCard_Conditional_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 24);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function HotelsFromCard_Conditional_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, ctx_r0.selectedHotel ? "update" : "add"), " ");
} }
function HotelsFromCard_Conditional_83_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function HotelsFromCard_Conditional_83_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
export class HotelsFromCard {
    apiService;
    cdr;
    selectedHotel = null;
    hotelSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    hotelForm = this.createForm();
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    starOptions = [1, 2, 3, 4, 5];
    destinations = [];
    constructor(apiService, cdr) {
        this.apiService = apiService;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.apiService.get('Destinations?page=1&pageSize=500').pipe(catchError(() => of(null)), finalize(() => this.cdr.markForCheck())).subscribe((response) => {
            const page = response?.data ?? response;
            const rows = page?.data ?? page?.items ?? page?.destinations ?? page;
            this.destinations = (Array.isArray(rows) ? rows : []).filter((item) => item?.isActive !== false);
        });
    }
    ngOnChanges(changes) {
        if (!changes['selectedHotel'])
            return;
        if (this.selectedHotel)
            this.populateForm(this.selectedHotel);
        else
            this.resetForm(false);
    }
    saveHotel() {
        if (this.isLoading)
            return;
        if (this.hotelForm.invalid) {
            this.hotelForm.markAllAsTouched();
            return;
        }
        const form = this.hotelForm.getRawValue();
        const payload = {
            name: form.name.trim(),
            starRating: Number(form.starRating),
            destinationId: Number(form.destinationId),
            address: form.address.trim(),
            description: form.description.trim(),
            phoneNumber: form.phoneNumber.trim(),
            email: form.email.trim(),
            website: form.website.trim(),
            isActive: form.isActive,
        };
        if (this.selectedHotel?.id)
            payload.id = this.selectedHotel.id;
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = this.selectedHotel
            ? this.apiService.put('Hotels', payload)
            : this.apiService.post('Hotels', payload);
        request$
            .pipe(catchError(() => {
            this.errorMessage = 'hotelSaveError';
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
            this.hotelSaved.emit();
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    populateForm(hotel) {
        this.hotelForm.setValue({
            name: hotel.name ?? '',
            starRating: hotel.starRating ?? 1,
            destinationId: hotel.destinationId ?? null,
            address: hotel.address ?? '',
            description: hotel.description ?? '',
            phoneNumber: hotel.phoneNumber ?? '',
            email: hotel.email ?? '',
            website: hotel.website ?? '',
            isActive: hotel.isActive !== false,
        });
    }
    resetForm(emitCancel) {
        this.hotelForm.reset({
            name: '',
            starRating: 1,
            destinationId: null,
            address: '',
            description: '',
            phoneNumber: '',
            email: '',
            website: '',
            isActive: true,
        });
        if (emitCancel)
            this.editCancelled.emit();
    }
    createForm() {
        return new FormGroup({
            name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            starRating: new FormControl(1, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(1), Validators.max(5)],
            }),
            destinationId: new FormControl(null, { validators: [Validators.required] }),
            address: new FormControl('', { nonNullable: true }),
            description: new FormControl('', { nonNullable: true }),
            phoneNumber: new FormControl('', { nonNullable: true }),
            email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
            website: new FormControl('', { nonNullable: true }),
            isActive: new FormControl(true, { nonNullable: true }),
        });
    }
    static ɵfac = function HotelsFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || HotelsFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HotelsFromCard, selectors: [["app-hotels-from-card"]], inputs: { selectedHotel: "selectedHotel" }, outputs: { hotelSaved: "hotelSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 84, vars: 59, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "text-xl", "font-semibold"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "name", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], ["formControlName", "starRating", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [3, "value"], ["formControlName", "destinationId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2"], [3, "ngValue"], [1, "text-slate-400"], ["formControlName", "address", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "description", "rows", "4", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "phoneNumber", "type", "tel", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "email", "type", "email", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "website", "type", "url", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "flex", "items-center", "gap-2", "text-sm", "font-medium"], ["formControlName", "isActive", "type", "checkbox"], [1, "flex", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"]], template: function HotelsFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, HotelsFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, HotelsFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "form", 4);
            i0.ɵɵlistener("ngSubmit", function HotelsFromCard_Template_form_ngSubmit_6_listener() { return ctx.saveHotel(); });
            i0.ɵɵelementStart(7, "div", 5)(8, "div")(9, "label", 6);
            i0.ɵɵtext(10);
            i0.ɵɵpipe(11, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "input", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(13, HotelsFromCard_Conditional_13_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div")(15, "label", 6);
            i0.ɵɵtext(16);
            i0.ɵɵpipe(17, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "select", 9);
            i0.ɵɵrepeaterCreate(19, HotelsFromCard_For_20_Template, 2, 2, "option", 10, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(21, HotelsFromCard_Conditional_21_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div")(23, "label", 6);
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "select", 11)(27, "option", 12);
            i0.ɵɵtext(28);
            i0.ɵɵpipe(29, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(30, HotelsFromCard_For_31_Template, 2, 2, "option", 12, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(32, HotelsFromCard_Conditional_32_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div")(34, "label", 6);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementStart(37, "span", 13);
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(40, "input", 14);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div")(42, "label", 6);
            i0.ɵɵtext(43);
            i0.ɵɵpipe(44, "translate");
            i0.ɵɵelementStart(45, "span", 13);
            i0.ɵɵtext(46);
            i0.ɵɵpipe(47, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(48, "textarea", 15);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 5)(50, "div")(51, "label", 6);
            i0.ɵɵtext(52);
            i0.ɵɵpipe(53, "translate");
            i0.ɵɵelementStart(54, "span", 13);
            i0.ɵɵtext(55);
            i0.ɵɵpipe(56, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(57, "input", 16);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div")(59, "label", 6);
            i0.ɵɵtext(60);
            i0.ɵɵpipe(61, "translate");
            i0.ɵɵelementStart(62, "span", 13);
            i0.ɵɵtext(63);
            i0.ɵɵpipe(64, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(65, "input", 17);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(66, HotelsFromCard_Conditional_66_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "div")(68, "label", 6);
            i0.ɵɵtext(69);
            i0.ɵɵpipe(70, "translate");
            i0.ɵɵelementStart(71, "span", 13);
            i0.ɵɵtext(72);
            i0.ɵɵpipe(73, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(74, "input", 18);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "label", 19);
            i0.ɵɵelement(76, "input", 20);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtext(77);
            i0.ɵɵpipe(78, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "div", 21)(80, "button", 22);
            i0.ɵɵconditionalCreate(81, HotelsFromCard_Conditional_81_Template, 4, 3)(82, HotelsFromCard_Conditional_82_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(83, HotelsFromCard_Conditional_83_Template, 3, 4, "button", 23);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 27, ctx.selectedHotel ? "editHotel" : "addHotel"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.hotelForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 29, "hotelName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hotelForm.get("name")?.touched && ctx.hotelForm.get("name")?.hasError("required") ? 13 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 31, "starRating"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.starOptions);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.hotelForm.get("starRating")?.touched && ctx.hotelForm.get("starRating")?.invalid ? 21 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 33, "destination"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", null);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 35, "selectDestination"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.destinations);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.hotelForm.controls.destinationId.touched && ctx.hotelForm.controls.destinationId.invalid ? 32 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(36, 37, "address"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(39, 39, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(44, 41, "description"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(47, 43, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(53, 45, "phone"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(56, 47, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(61, 49, "email"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(64, 51, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.hotelForm.get("email")?.touched && ctx.hotelForm.get("email")?.hasError("email") ? 66 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(70, 53, "website"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(73, 55, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(78, 57, "activeHotel"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.hotelForm.invalid || ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 81 : 82);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedHotel ? 83 : -1);
        } }, dependencies: [ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HotelsFromCard, [{
        type: Component,
        args: [{ selector: 'app-hotels-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\r\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\r\n  <h2 class=\"mb-4 text-xl font-semibold\">{{ (selectedHotel ? 'editHotel' : 'addHotel') | translate }}</h2>\r\n  <form class=\"space-y-4\" [formGroup]=\"hotelForm\" (ngSubmit)=\"saveHotel()\">\r\n    <div class=\"grid gap-4 md:grid-cols-2\">\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'hotelName' | translate }}</label><input formControlName=\"name\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (hotelForm.get('name')?.touched && hotelForm.get('name')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'hotelNameRequired' | translate }}</p> }</div>\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'starRating' | translate }}</label><select formControlName=\"starRating\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\">@for (star of starOptions; track star) { <option [value]=\"star\">{{ star }}</option> }</select>@if (hotelForm.get('starRating')?.touched && hotelForm.get('starRating')?.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'starRatingRequired' | translate }}</p> }</div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'destination' | translate }}</label><select formControlName=\"destinationId\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2\"><option [ngValue]=\"null\">{{ 'selectDestination' | translate }}</option>@for (destination of destinations; track destination.id) { <option [ngValue]=\"destination.id\">{{ destination.nameEng ?? destination.name }}</option> }</select>@if (hotelForm.controls.destinationId.touched && hotelForm.controls.destinationId.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'destinationRequired' | translate }}</p> }</div>\n    </div>\r\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'address' | translate }} <span class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><input formControlName=\"address\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\r\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'description' | translate }} <span class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><textarea formControlName=\"description\" rows=\"4\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\"></textarea></div>\r\n    <div class=\"grid gap-4 md:grid-cols-2\">\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'phone' | translate }} <span class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><input formControlName=\"phoneNumber\" type=\"tel\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'email' | translate }} <span class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><input formControlName=\"email\" type=\"email\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (hotelForm.get('email')?.touched && hotelForm.get('email')?.hasError('email')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'emailInvalid' | translate }}</p> }</div>\r\n    </div>\r\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'website' | translate }} <span class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><input formControlName=\"website\" type=\"url\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\r\n    <label class=\"flex items-center gap-2 text-sm font-medium\"><input formControlName=\"isActive\" type=\"checkbox\" />{{ 'activeHotel' | translate }}</label>\r\n    <div class=\"flex gap-3\"><button type=\"submit\" [disabled]=\"hotelForm.invalid || isLoading\" class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'saving' | translate }}</span> } @else { {{ (selectedHotel ? 'update' : 'add') | translate }} }</button>@if (selectedHotel) { <button type=\"button\" class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading\" (click)=\"cancelEdit()\">{{ 'cancel' | translate }}</button> }</div>\n  </form>\r\n</div>\r\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], { selectedHotel: [{
            type: Input
        }], hotelSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HotelsFromCard, { className: "HotelsFromCard", filePath: "app/features/configurations/hotels/hotels-from-card/hotels-from-card.ts", lineNumber: 37 }); })();
