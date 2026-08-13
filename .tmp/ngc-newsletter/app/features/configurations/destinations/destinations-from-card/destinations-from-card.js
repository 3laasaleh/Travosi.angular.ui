import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { ImageUploadValidationError, normalizeImageUpload, } from '../../shared/image-upload.util';
import * as i0 from "@angular/core";
import * as i1 from "../../admin.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.url;
function DestinationsFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function DestinationsFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function DestinationsFromCard_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "englishNameRequired"));
} }
function DestinationsFromCard_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "englishNameInvalid"));
} }
function DestinationsFromCard_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arabicNameRequired"));
} }
function DestinationsFromCard_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arabicNameInvalid"));
} }
function DestinationsFromCard_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 20);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.imageValidationMessage));
} }
function DestinationsFromCard_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "imagesRequired"));
} }
function DestinationsFromCard_Conditional_55_For_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "cover"));
} }
function DestinationsFromCard_Conditional_55_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelement(1, "img", 28);
    i0.ɵɵelementStart(2, "button", 29);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵlistener("click", function DestinationsFromCard_Conditional_55_For_2_Template_button_click_2_listener() { const ɵ$index_117_r3 = i0.ɵɵrestoreView(_r2).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeImage(ɵ$index_117_r3)); });
    i0.ɵɵelement(5, "i", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, DestinationsFromCard_Conditional_55_For_2_Conditional_6_Template, 3, 3, "span", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r4 = ctx.$implicit;
    const ɵ$index_117_r3 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.getImageUrl(image_r4.url), i0.ɵɵsanitizeUrl)("alt", image_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.deletingImageIndex !== null);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 12, "removeImage"))("title", i0.ɵɵpipeBind1(4, 14, "removeImage"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.deletingImageIndex === ɵ$index_117_r3)("mdi-spin", ctx_r0.deletingImageIndex === ɵ$index_117_r3)("mdi-close", ctx_r0.deletingImageIndex !== ɵ$index_117_r3);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ɵ$index_117_r3 === 0 ? 6 : -1);
} }
function DestinationsFromCard_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵrepeaterCreate(1, DestinationsFromCard_Conditional_55_For_2_Template, 7, 16, "div", 27, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.imageUploads);
} }
function DestinationsFromCard_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 32);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function DestinationsFromCard_Conditional_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, ctx_r0.selectedDestination ? "update" : "add"), " ");
} }
function DestinationsFromCard_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 33);
    i0.ɵɵlistener("click", function DestinationsFromCard_Conditional_64_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
export class DestinationsFromCard {
    adminService;
    cdr;
    translate;
    selectedDestination = null;
    destinationSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    maxImages = 5;
    maxImageBytes = 5 * 1024 * 1024;
    maxImageWidth = 2400;
    maxImageHeight = 1600;
    imageConstraints = {
        maxWidth: this.maxImageWidth,
        maxHeight: this.maxImageHeight,
    };
    destinationForm = this.createForm();
    imageUploads = [];
    isLoading = false;
    deletingImageIndex = null;
    errorMessage = '';
    imageValidationMessage = '';
    successMessage = '';
    constructor(adminService, cdr, translate) {
        this.adminService = adminService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnChanges(changes) {
        if (!changes['selectedDestination'])
            return;
        if (this.selectedDestination)
            this.populateForm(this.selectedDestination);
        else
            this.resetForm(false);
    }
    ngOnDestroy() {
        this.revokeNewImageUrls();
    }
    saveDestination() {
        if (this.isLoading)
            return;
        if (this.destinationForm.invalid) {
            this.destinationForm.markAllAsTouched();
            return;
        }
        const form = this.destinationForm.getRawValue();
        const payload = new FormData();
        if (this.selectedDestination?.id)
            payload.append('Id', this.selectedDestination?.id.toString());
        payload.append('NameEng', form.nameEng.trim());
        payload.append('NameAr', form.nameAr.trim());
        payload.append('SubDescription', form.subDescription);
        payload.append('Description', form.description);
        payload.append('IsActive', String(form.isActive));
        this.imageUploads
            .filter((image) => image.file)
            .forEach((image) => payload.append('Images', image.file, image.file.name));
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const editing = this.selectedDestination;
        const request$ = editing
            ? this.adminService.updateDestination(payload)
            : this.adminService.createDestination(payload);
        request$
            .pipe(catchError(() => {
            this.errorMessage = 'destinationSaveError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }))
            .subscribe((res) => {
            if (res === null)
                return;
            if (res.isSuccess === false) {
                this.errorMessage = res.message;
                return;
            }
            this.successMessage = res.message;
            this.resetForm(false);
            this.destinationSaved.emit();
        });
    }
    async onImagesSelected(event) {
        const input = event.target;
        const files = Array.from(input.files ?? []);
        input.value = '';
        this.imageValidationMessage = '';
        if (this.imageUploads.length + files.length > this.maxImages) {
            this.imageValidationMessage = 'destinationImageLimit';
            return;
        }
        for (const file of files) {
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                this.imageValidationMessage = 'invalidImageType';
                continue;
            }
            if (file.size > this.maxImageBytes) {
                this.imageValidationMessage = 'imageTooLarge';
                continue;
            }
            try {
                const normalized = await normalizeImageUpload(file, this.imageConstraints);
                this.imageUploads.push({
                    file: normalized,
                    url: URL.createObjectURL(normalized),
                    name: normalized.name,
                    existing: false,
                });
            }
            catch (error) {
                this.imageValidationMessage = error instanceof ImageUploadValidationError
                    ? error.translationKey
                    : 'imageReadError';
            }
        }
        this.syncImagesControl();
        this.cdr.markForCheck();
    }
    async removeImage(index) {
        if (this.deletingImageIndex !== null)
            return;
        const image = this.imageUploads[index];
        if (!image)
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
        if (image.existing && this.selectedDestination?.id) {
            this.deletingImageIndex = index;
            this.adminService.deleteDestinationImage(image?.id).pipe(catchError(() => {
                Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
                return of({ imageDeleteFailed: true });
            }), finalize(() => {
                this.deletingImageIndex = null;
                this.cdr.markForCheck();
            })).subscribe((response) => {
                if (response?.imageDeleteFailed || response?.isSuccess === false) {
                    if (response?.isSuccess === false) {
                        Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('imageDeleteError') });
                    }
                    return;
                }
                this.removeImageLocally(index);
                this.showImageDeletedToast();
            });
            return;
        }
        this.removeImageLocally(index);
        this.showImageDeletedToast();
    }
    cancelEdit() {
        this.resetForm(true);
    }
    populateForm(destination) {
        this.revokeNewImageUrls();
        this.imageValidationMessage = '';
        const images = Array.isArray(destination?.images) ? destination.images : [];
        this.imageUploads = images
            .slice(0, this.maxImages)
            .map((image, index) => ({
            id: image.id,
            url: this.imageUrl(image),
            name: image?.imageName ?? image?.name
                ?? this.translate.instant('destinationImageNumber', { number: index + 1 }),
            existing: true,
        }))
            .filter((image) => !!image.url);
        this.destinationForm.setValue({
            nameEng: destination.nameEng ?? destination.name ?? '',
            nameAr: destination.nameAr ?? '',
            subDescription: destination.subDescription ?? '',
            description: destination.description ?? '',
            images: this.imageUploads.map((image) => image.url),
            isActive: destination.isActive !== false,
        });
    }
    resetForm(emitCancel) {
        this.revokeNewImageUrls();
        this.imageUploads = [];
        this.imageValidationMessage = '';
        this.destinationForm.reset({
            nameEng: '',
            nameAr: '',
            subDescription: '',
            description: '',
            images: [],
            isActive: true,
        });
        if (emitCancel)
            this.editCancelled.emit();
    }
    syncImagesControl() {
        this.destinationForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
        this.destinationForm.controls.images.markAsTouched();
    }
    removeImageLocally(index) {
        const [removed] = this.imageUploads.splice(index, 1);
        if (removed?.file)
            URL.revokeObjectURL(removed.url);
        this.syncImagesControl();
        this.cdr.markForCheck();
    }
    showImageDeletedToast() {
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
            nameEng: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\s'-]*$/)],
            }),
            nameAr: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'-]*$/),
                ],
            }),
            subDescription: new FormControl('', { nonNullable: true }),
            description: new FormControl('', { nonNullable: true }),
            images: new FormControl([], {
                nonNullable: true,
                validators: [Validators.required],
            }),
            isActive: new FormControl(true, { nonNullable: true }),
        });
    }
    imageUrl(image) {
        return typeof image === 'string' ? image : (image?.url ?? image?.imageUrl ?? image?.path ?? '');
    }
    revokeNewImageUrls() {
        this.imageUploads
            .filter((image) => image.file)
            .forEach((image) => URL.revokeObjectURL(image.url));
    }
    getImageUrl(url) {
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    static ɵfac = function DestinationsFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || DestinationsFromCard)(i0.ɵɵdirectiveInject(i1.AdminService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DestinationsFromCard, selectors: [["app-destinations-from-card"]], inputs: { selectedDestination: "selectedDestination" }, outputs: { destinationSaved: "destinationSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 65, vars: 49, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "text-xl", "font-semibold"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "nameEng", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], ["formControlName", "nameAr", "type", "text", "dir", "rtl", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "text-slate-400"], ["formControlName", "subDescription", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "description", "rows", "4", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mb-2", "flex", "justify-between"], ["for", "destinationImages", 1, "text-sm", "font-medium"], [1, "text-xs", "text-slate-500"], ["for", "destinationImages", 1, "flex", "cursor-pointer", "flex-col", "items-center", "rounded-2xl", "border-2", "border-dashed", "border-slate-300", "bg-white", "px-4", "py-5", "text-center", "hover:border-primary"], [1, "text-sm", "font-semibold", "text-primary"], [1, "mt-1", "text-xs", "text-slate-500"], ["id", "destinationImages", "type", "file", "accept", "image/jpeg,image/png,image/webp", "multiple", "", 1, "sr-only", 3, "change", "disabled"], ["role", "alert", 1, "mt-2", "text-xs", "font-medium", "text-red-600"], [1, "mt-3", "grid", "grid-cols-2", "gap-3", "sm:grid-cols-3"], [1, "flex", "items-center", "gap-2", "text-sm", "font-medium"], ["formControlName", "isActive", "type", "checkbox"], [1, "flex", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "relative", "overflow-hidden", "rounded-xl", "bg-slate-200"], [1, "aspect-[3/2]", "w-full", "object-cover", 3, "src", "alt"], ["type", "button", 1, "absolute", "right-2", "top-2", "grid", "h-8", "w-8", "cursor-pointer", "place-items-center", "rounded-full", "bg-black/70", "text-lg", "text-white", "transition-colors", "duration-200", "hover:bg-rose-600", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi"], [1, "absolute", "bottom-2", "left-2", "rounded-full", "bg-primary", "px-2", "py-1", "text-[10px]", "font-semibold", "text-white"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"]], template: function DestinationsFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, DestinationsFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, DestinationsFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "form", 4);
            i0.ɵɵlistener("ngSubmit", function DestinationsFromCard_Template_form_ngSubmit_6_listener() { return ctx.saveDestination(); });
            i0.ɵɵelementStart(7, "div", 5)(8, "div")(9, "label", 6);
            i0.ɵɵtext(10);
            i0.ɵɵpipe(11, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "input", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(13, DestinationsFromCard_Conditional_13_Template, 3, 3, "p", 8);
            i0.ɵɵconditionalCreate(14, DestinationsFromCard_Conditional_14_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div")(16, "label", 6);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 9);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(20, DestinationsFromCard_Conditional_20_Template, 3, 3, "p", 8);
            i0.ɵɵconditionalCreate(21, DestinationsFromCard_Conditional_21_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div")(23, "label", 6);
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "translate");
            i0.ɵɵelementStart(26, "span", 10);
            i0.ɵɵtext(27);
            i0.ɵɵpipe(28, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(29, "input", 11);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div")(31, "label", 6);
            i0.ɵɵtext(32);
            i0.ɵɵpipe(33, "translate");
            i0.ɵɵelementStart(34, "span", 10);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(37, "textarea", 12);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div")(39, "div", 13)(40, "label", 14);
            i0.ɵɵtext(41);
            i0.ɵɵpipe(42, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span", 15);
            i0.ɵɵtext(44);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "label", 16)(46, "span", 17);
            i0.ɵɵtext(47);
            i0.ɵɵpipe(48, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "span", 18);
            i0.ɵɵtext(50);
            i0.ɵɵpipe(51, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "input", 19);
            i0.ɵɵlistener("change", function DestinationsFromCard_Template_input_change_52_listener($event) { return ctx.onImagesSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(53, DestinationsFromCard_Conditional_53_Template, 3, 3, "p", 20);
            i0.ɵɵconditionalCreate(54, DestinationsFromCard_Conditional_54_Template, 3, 3, "p", 8);
            i0.ɵɵconditionalCreate(55, DestinationsFromCard_Conditional_55_Template, 3, 0, "div", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "label", 22);
            i0.ɵɵelement(57, "input", 23);
            i0.ɵɵcontrolCreate();
            i0.ɵɵtext(58);
            i0.ɵɵpipe(59, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 24)(61, "button", 25);
            i0.ɵɵconditionalCreate(62, DestinationsFromCard_Conditional_62_Template, 4, 3)(63, DestinationsFromCard_Conditional_63_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(64, DestinationsFromCard_Conditional_64_Template, 3, 4, "button", 26);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(5, 27, ctx.selectedDestination ? "editDestination" : "addDestination"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.destinationForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 29, "englishName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.destinationForm.get("nameEng")?.touched && ctx.destinationForm.get("nameEng")?.hasError("required") ? 13 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.destinationForm.get("nameEng")?.touched && ctx.destinationForm.get("nameEng")?.hasError("pattern") ? 14 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 31, "arabicName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.destinationForm.get("nameAr")?.touched && ctx.destinationForm.get("nameAr")?.hasError("required") ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.destinationForm.get("nameAr")?.touched && ctx.destinationForm.get("nameAr")?.hasError("pattern") ? 21 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(25, 33, "shortDescription"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(28, 35, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(33, 37, "description"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(36, 39, "optional"), ")");
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(42, 41, "destinationImages"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", ctx.imageUploads.length, " / ", ctx.maxImages);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(48, 43, "chooseImages"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(51, 45, "destinationImageRules"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.imageUploads.length >= ctx.maxImages);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.imageValidationMessage ? 53 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.destinationForm.get("images")?.touched && ctx.destinationForm.get("images")?.invalid ? 54 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.imageUploads.length ? 55 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(59, 47, "activeDestination"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.destinationForm.invalid || ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 62 : 63);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedDestination ? 64 : -1);
        } }, dependencies: [ReactiveFormsModule, i3.ɵNgNoValidate, i3.DefaultValueAccessor, i3.CheckboxControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.FormGroupDirective, i3.FormControlName, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DestinationsFromCard, [{
        type: Component,
        args: [{ selector: 'app-destinations-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{\n    errorMessage | translate }}</div> }\n  @if (successMessage) { <div\n    class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{\n    successMessage | translate }}</div> }\n  <h2 class=\"mb-4 text-xl font-semibold\">{{ (selectedDestination ? 'editDestination' : 'addDestination') | translate }}\n  </h2>\n  <form class=\"space-y-4\" [formGroup]=\"destinationForm\" (ngSubmit)=\"saveDestination()\">\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'englishName' | translate }}</label><input\n          formControlName=\"nameEng\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if\n        (destinationForm.get('nameEng')?.touched && destinationForm.get('nameEng')?.hasError('required')) { <p\n          class=\"mt-1 text-xs text-red-600\">{{ 'englishNameRequired' | translate }}</p> }@if\n        (destinationForm.get('nameEng')?.touched && destinationForm.get('nameEng')?.hasError('pattern')) { <p\n          class=\"mt-1 text-xs text-red-600\">{{ 'englishNameInvalid' | translate }}</p> }</div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'arabicName' | translate }}</label><input\n          formControlName=\"nameAr\" type=\"text\" dir=\"rtl\"\n          class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (destinationForm.get('nameAr')?.touched &&\n        destinationForm.get('nameAr')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{\n          'arabicNameRequired' | translate }}</p> }@if (destinationForm.get('nameAr')?.touched &&\n        destinationForm.get('nameAr')?.hasError('pattern')) { <p class=\"mt-1 text-xs text-red-600\">{{\n          'arabicNameInvalid' | translate }}</p> }</div>\n    </div>\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'shortDescription' | translate }} <span\n          class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><input formControlName=\"subDescription\"\n        type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" /></div>\n    <div><label class=\"mb-2 block text-sm font-medium\">{{ 'description' | translate }} <span\n          class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><textarea\n        formControlName=\"description\" rows=\"4\"\n        class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\"></textarea></div>\n    <div>\n      <div class=\"mb-2 flex justify-between\"><label for=\"destinationImages\" class=\"text-sm font-medium\">{{\n          'destinationImages' | translate }}</label><span class=\"text-xs text-slate-500\">{{ imageUploads.length }} / {{\n          maxImages }}</span></div>\n      <label for=\"destinationImages\"\n        class=\"flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-5 text-center hover:border-primary\"><span\n          class=\"text-sm font-semibold text-primary\">{{ 'chooseImages' | translate }}</span><span\n          class=\"mt-1 text-xs text-slate-500\">{{ 'destinationImageRules' | translate }}</span></label>\n      <input id=\"destinationImages\" type=\"file\" accept=\"image/jpeg,image/png,image/webp\" multiple class=\"sr-only\"\n        [disabled]=\"imageUploads.length >= maxImages\" (change)=\"onImagesSelected($event)\" />\n      @if (imageValidationMessage) { <p class=\"mt-2 text-xs font-medium text-red-600\" role=\"alert\">{{\n        imageValidationMessage | translate }}</p> }\n      @if (destinationForm.get('images')?.touched && destinationForm.get('images')?.invalid) { <p\n        class=\"mt-1 text-xs text-red-600\">{{ 'imagesRequired' | translate }}</p> }\n      @if (imageUploads.length) { <div class=\"mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3\">@for (image of imageUploads;\n        track image.url; let index = $index) { \n          <div class=\"relative overflow-hidden rounded-xl bg-slate-200\">\n          <img [src]=\"getImageUrl(image.url)\" [alt]=\"image.name\" class=\"aspect-[3/2] w-full object-cover\" />\n            <button type=\"button\"\n              class=\"absolute right-2 top-2 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black/70 text-lg text-white transition-colors duration-200 hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60\"\n              [disabled]=\"deletingImageIndex !== null\"\n              [attr.aria-label]=\"'removeImage' | translate\" [attr.title]=\"'removeImage' | translate\"\n              (click)=\"removeImage(index)\">\n              <i class=\"mdi\" [class.mdi-loading]=\"deletingImageIndex === index\" [class.mdi-spin]=\"deletingImageIndex === index\" [class.mdi-close]=\"deletingImageIndex !== index\"></i>\n            </button>\n          @if (index === 0)\n          { <span\n            class=\"absolute bottom-2 left-2 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white\">\n            {{'cover' | translate }}</span> }\n        </div> }\n      </div> }\n    </div>\n    <label class=\"flex items-center gap-2 text-sm font-medium\">\n      <input formControlName=\"isActive\" type=\"checkbox\" />{{\n      'activeDestination' | translate }}</label>\n    <div class=\"flex gap-3\"><button type=\"submit\" [disabled]=\"destinationForm.invalid || isLoading\"\n        class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">\n        @if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'saving' | translate }}</span> }\n        @else { {{ (selectedDestination ? 'update' : 'add') | translate }} }\n        </button>@if (selectedDestination) { <button type=\"button\" [disabled]=\"isLoading\"\n        class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"cancelEdit()\">{{ 'cancel' |\n        translate }}</button> }</div>\n  </form>\n</div>\n" }]
    }], () => [{ type: i1.AdminService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { selectedDestination: [{
            type: Input
        }], destinationSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DestinationsFromCard, { className: "DestinationsFromCard", filePath: "app/features/configurations/destinations/destinations-from-card/destinations-from-card.ts", lineNumber: 53 }); })();
