import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { ImageUploadValidationError, normalizeImageUpload, } from '../../shared/image-upload.util';
import * as i0 from "@angular/core";
import * as i1 from "../../admin.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.url;
function BlogsFormCard_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function BlogsFormCard_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 24);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r0.imageValidationMessage), " ");
} }
function BlogsFormCard_Conditional_52_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelement(1, "img", 28);
    i0.ɵɵelementStart(2, "button", 29);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵlistener("click", function BlogsFormCard_Conditional_52_For_2_Template_button_click_2_listener() { const ɵ$index_96_r3 = i0.ɵɵrestoreView(_r2).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeImage(ɵ$index_96_r3)); });
    i0.ɵɵelement(5, "i", 30);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const image_r4 = ctx.$implicit;
    const ɵ$index_96_r3 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.getImageUrl(image_r4.url), i0.ɵɵsanitizeUrl)("alt", image_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.deletingImageIndex !== null || ctx_r0.isSaving || ctx_r0.isProcessingImages);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 11, "removeImage"))("title", i0.ɵɵpipeBind1(4, 13, "removeImage"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.deletingImageIndex === ɵ$index_96_r3)("mdi-spin", ctx_r0.deletingImageIndex === ɵ$index_96_r3)("mdi-close", ctx_r0.deletingImageIndex !== ɵ$index_96_r3);
} }
function BlogsFormCard_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵrepeaterCreate(1, BlogsFormCard_Conditional_52_For_2_Template, 6, 15, "div", 27, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.images);
} }
function BlogsFormCard_Conditional_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 31);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function BlogsFormCard_Conditional_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.selectedBlog ? "Update blog" : "Create blog", " ");
} }
export class BlogsFormCard {
    adminService;
    cdr;
    translate;
    selectedBlog = null;
    saved = new EventEmitter();
    cancelled = new EventEmitter();
    maxImages = 5;
    maxImageBytes = 5 * 1024 * 1024;
    maxImageWidth = 2400;
    maxImageHeight = 1600;
    imageConstraints = {
        maxWidth: this.maxImageWidth,
        maxHeight: this.maxImageHeight,
    };
    form = new FormGroup({
        titleEng: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(200)],
        }),
        titleAr: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(200)],
        }),
        summaryEng: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(500)],
        }),
        summaryAr: new FormControl('', {
            nonNullable: true,
            validators: [Validators.maxLength(500)],
        }),
        contentEng: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(15000)],
        }),
        contentAr: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(15000)],
        }),
        publishedAt: new FormControl('', { nonNullable: true }),
    });
    images = [];
    isSaving = false;
    isProcessingImages = false;
    deletingImageIndex = null;
    errorMessage = '';
    imageValidationMessage = '';
    constructor(adminService, cdr, translate) {
        this.adminService = adminService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnChanges(changes) {
        if (changes['selectedBlog'])
            this.populate();
    }
    ngOnDestroy() {
        this.revokeNewImageUrls();
    }
    populate() {
        this.revokeNewImageUrls();
        this.imageValidationMessage = '';
        this.errorMessage = '';
        const blog = this.selectedBlog;
        const storedImages = blog?.images ?? blog?.Images ?? [];
        this.images = (Array.isArray(storedImages) ? storedImages : [])
            .slice(0, this.maxImages)
            .map((image, index) => ({
            id: image?.id ?? image?.Id,
            existing: true,
            url: image?.imageUrl ?? image?.ImageUrl ?? image?.url ?? image?.Url ?? '',
            name: image?.imageName ??
                image?.ImageName ??
                image?.name ??
                this.translate.instant('blogImageNumber', { number: index + 1 }),
        }))
            .filter((image) => !!image.url);
        this.form.reset({
            titleEng: blog?.titleEng ?? blog?.TitleEng ?? '',
            titleAr: blog?.titleAr ?? blog?.TitleAr ?? '',
            summaryEng: blog?.summaryEng ?? blog?.SummaryEng ?? '',
            summaryAr: blog?.summaryAr ?? blog?.SummaryAr ?? '',
            contentEng: blog?.contentEng ?? blog?.ContentEng ?? '',
            contentAr: blog?.contentAr ?? blog?.ContentAr ?? '',
            publishedAt: this.dateInput(blog?.publishedAt ?? blog?.PublishedAt),
        });
    }
    async onFiles(event) {
        const input = event.target;
        const files = Array.from(input.files ?? []);
        input.value = '';
        this.imageValidationMessage = '';
        if (this.isSaving ||
            this.isProcessingImages ||
            this.deletingImageIndex !== null ||
            files.length === 0)
            return;
        if (this.images.length + files.length > this.maxImages) {
            this.imageValidationMessage = 'blogImageLimit';
            this.cdr.markForCheck();
            return;
        }
        this.isProcessingImages = true;
        this.cdr.markForCheck();
        try {
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
                    this.images.push({
                        file: normalized,
                        url: URL.createObjectURL(normalized),
                        name: normalized.name,
                        existing: false,
                    });
                }
                catch (error) {
                    this.imageValidationMessage =
                        error instanceof ImageUploadValidationError
                            ? error.translationKey
                            : 'imageReadError';
                }
            }
        }
        finally {
            this.isProcessingImages = false;
            this.cdr.markForCheck();
        }
    }
    async removeImage(index) {
        if (this.deletingImageIndex !== null || this.isSaving || this.isProcessingImages)
            return;
        const image = this.images[index];
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
        if (image.existing && image.id) {
            this.deletingImageIndex = index;
            this.adminService
                .deleteBlogImage(image.id)
                .pipe(catchError(() => {
                Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
                return of({ imageDeleteFailed: true });
            }), finalize(() => {
                this.deletingImageIndex = null;
                this.cdr.markForCheck();
            }))
                .subscribe((response) => {
                if (!response ||
                    response?.imageDeleteFailed ||
                    response?.isSuccess === false ||
                    response?.IsSuccess === false) {
                    if (!response?.imageDeleteFailed) {
                        Swal.fire({
                            icon: 'error',
                            title: response?.message ??
                                response?.Message ??
                                this.translate.instant('imageDeleteError'),
                        });
                    }
                    return;
                }
                this.removeLocal(index);
                this.showImageDeletedToast();
            });
            return;
        }
        this.removeLocal(index);
        this.showImageDeletedToast();
    }
    save() {
        if (this.isSaving || this.isProcessingImages || this.deletingImageIndex !== null)
            return;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const value = this.form.getRawValue();
        const data = new FormData();
        const blogId = this.selectedBlog?.id ?? this.selectedBlog?.Id;
        if (blogId)
            data.append('Id', String(blogId));
        data.append('TitleEng', value.titleEng.trim());
        data.append('TitleAr', value.titleAr.trim());
        data.append('SummaryEng', value.summaryEng.trim());
        data.append('SummaryAr', value.summaryAr.trim());
        data.append('ContentEng', value.contentEng.trim());
        data.append('ContentAr', value.contentAr.trim());
        if (value.publishedAt)
            data.append('PublishedAt', `${value.publishedAt}T00:00:00.000Z`);
        this.images
            .filter((image) => image.file)
            .forEach((image) => data.append('Images', image.file, image.file.name));
        this.isSaving = true;
        this.errorMessage = '';
        (this.selectedBlog ? this.adminService.updateBlog(data) : this.adminService.createBlog(data))
            .pipe(catchError(() => {
            this.errorMessage = 'Unable to save this blog.';
            return of(null);
        }), finalize(() => {
            this.isSaving = false;
            this.cdr.markForCheck();
        }))
            .subscribe((response) => {
            if (response?.isSuccess === false || response?.IsSuccess === false) {
                this.errorMessage =
                    response?.message ?? response?.Message ?? 'Unable to save this blog.';
                return;
            }
            if (response)
                this.saved.emit();
        });
    }
    getImageUrl(url) {
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    removeLocal(index) {
        const [image] = this.images.splice(index, 1);
        if (image?.file)
            URL.revokeObjectURL(image.url);
        this.imageValidationMessage = '';
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
    revokeNewImageUrls() {
        this.images
            .filter((image) => image.file)
            .forEach((image) => URL.revokeObjectURL(image.url));
    }
    dateInput(value) {
        if (!value)
            return '';
        const date = new Date(String(value));
        return Number.isNaN(date.valueOf()) ? '' : date.toISOString().slice(0, 10);
    }
    static ɵfac = function BlogsFormCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || BlogsFormCard)(i0.ɵɵdirectiveInject(i1.AdminService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlogsFormCard, selectors: [["app-blogs-form-card"]], inputs: { selectedBlog: "selectedBlog" }, outputs: { saved: "saved", cancelled: "cancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 56, vars: 32, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], ["type", "button", 1, "text-sm", "text-slate-500", 3, "click"], [1, "mb-4", "rounded-xl", "bg-rose-50", "p-3", "text-sm", "text-rose-700"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "text-sm", "font-medium"], ["formControlName", "titleEng", "maxlength", "200", 1, "mt-1", "w-full", "rounded-xl", "border", "p-2"], ["formControlName", "titleAr", "maxlength", "200", "dir", "rtl", 1, "mt-1", "w-full", "rounded-xl", "border", "p-2"], ["formControlName", "summaryEng", "maxlength", "500", "rows", "2", 1, "mt-1", "w-full", "rounded-xl", "border", "p-2"], ["formControlName", "summaryAr", "maxlength", "500", "rows", "2", "dir", "rtl", 1, "mt-1", "w-full", "rounded-xl", "border", "p-2"], ["formControlName", "contentEng", "maxlength", "15000", "rows", "8", 1, "mt-1", "w-full", "rounded-xl", "border", "p-2"], ["formControlName", "contentAr", "maxlength", "15000", "rows", "8", "dir", "rtl", 1, "mt-1", "w-full", "rounded-xl", "border", "p-2"], ["for", "blog-publish-date", 1, "block", "text-sm", "font-medium"], ["formControlName", "publishedAt", "id", "blog-publish-date", "placeholder", "Select a publish date", "ariaLabel", "Publish date", "inputClass", "rounded-xl border border-slate-300 bg-white px-3 py-2.5 pe-11 shadow-sm", 1, "mt-1", "block", "max-w-sm"], [1, "mt-1", "text-xs", "text-slate-500"], [1, "mb-2", "flex", "items-center", "justify-between", "gap-3"], ["for", "blog-images", 1, "text-sm", "font-medium"], [1, "text-xs", "text-slate-500"], ["for", "blog-images", 1, "flex", "flex-col", "items-center", "rounded-2xl", "border-2", "border-dashed", "border-slate-300", "bg-white", "px-4", "py-5", "text-center", "transition", "hover:border-primary"], ["aria-hidden", "true", 1, "mdi", "mb-2", "text-3xl", "text-primary"], [1, "text-sm", "font-semibold", "text-primary"], ["id", "blog-images", "type", "file", "accept", "image/jpeg,image/png,image/webp", "multiple", "", 1, "sr-only", 3, "change", "disabled"], ["role", "alert", 1, "mt-2", "text-xs", "font-medium", "text-red-600"], [1, "mt-3", "grid", "grid-cols-2", "gap-3", "sm:grid-cols-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "relative", "overflow-hidden", "rounded-xl", "bg-slate-200"], [1, "aspect-[3/2]", "w-full", "object-cover", 3, "src", "alt"], ["type", "button", 1, "absolute", "end-2", "top-2", "grid", "h-8", "w-8", "cursor-pointer", "place-items-center", "rounded-full", "bg-black/70", "text-lg", "text-white", "transition-colors", "duration-200", "hover:bg-rose-600", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"]], template: function BlogsFormCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "button", 3);
            i0.ɵɵlistener("click", function BlogsFormCard_Template_button_click_4_listener() { return ctx.cancelled.emit(); });
            i0.ɵɵtext(5, "Cancel");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, BlogsFormCard_Conditional_6_Template, 2, 1, "p", 4);
            i0.ɵɵelementStart(7, "form", 5);
            i0.ɵɵlistener("ngSubmit", function BlogsFormCard_Template_form_ngSubmit_7_listener() { return ctx.save(); });
            i0.ɵɵelementStart(8, "div", 6)(9, "label", 7);
            i0.ɵɵtext(10, " English title ");
            i0.ɵɵelement(11, "input", 8);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "label", 7);
            i0.ɵɵtext(13, " Arabic title ");
            i0.ɵɵelement(14, "input", 9);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 6)(16, "label", 7);
            i0.ɵɵtext(17, " English summary ");
            i0.ɵɵelement(18, "textarea", 10);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "label", 7);
            i0.ɵɵtext(20, " Arabic summary ");
            i0.ɵɵelement(21, "textarea", 11);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 6)(23, "label", 7);
            i0.ɵɵtext(24, " English content ");
            i0.ɵɵelement(25, "textarea", 12);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "label", 7);
            i0.ɵɵtext(27, " Arabic content ");
            i0.ɵɵelement(28, "textarea", 13);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div")(30, "label", 14);
            i0.ɵɵtext(31, "Publish date");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "app-date-picker", 15);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementStart(33, "p", 16);
            i0.ɵɵtext(34, "Choose the day this blog should appear on the website.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div")(36, "div", 17)(37, "label", 18);
            i0.ɵɵtext(38);
            i0.ɵɵpipe(39, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "span", 19);
            i0.ɵɵtext(41);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "label", 20);
            i0.ɵɵelement(43, "i", 21);
            i0.ɵɵelementStart(44, "span", 22);
            i0.ɵɵtext(45);
            i0.ɵɵpipe(46, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "span", 16);
            i0.ɵɵtext(48);
            i0.ɵɵpipe(49, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "input", 23);
            i0.ɵɵlistener("change", function BlogsFormCard_Template_input_change_50_listener($event) { return ctx.onFiles($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(51, BlogsFormCard_Conditional_51_Template, 3, 3, "p", 24);
            i0.ɵɵconditionalCreate(52, BlogsFormCard_Conditional_52_Template, 3, 0, "div", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "button", 26);
            i0.ɵɵconditionalCreate(54, BlogsFormCard_Conditional_54_Template, 4, 3)(55, BlogsFormCard_Conditional_55_Template, 1, 1);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.selectedBlog ? "Edit blog" : "Add blog");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.errorMessage ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(4);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 26, "blogImages"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate2("", ctx.images.length, " / ", ctx.maxImages);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("cursor-pointer", ctx.images.length < ctx.maxImages && !ctx.isSaving && !ctx.isProcessingImages && ctx.deletingImageIndex === null)("cursor-not-allowed", ctx.images.length >= ctx.maxImages || ctx.isSaving || ctx.isProcessingImages || ctx.deletingImageIndex !== null)("opacity-60", ctx.images.length >= ctx.maxImages || ctx.isSaving || ctx.isProcessingImages || ctx.deletingImageIndex !== null);
            i0.ɵɵattribute("aria-disabled", ctx.images.length >= ctx.maxImages || ctx.isSaving || ctx.isProcessingImages || ctx.deletingImageIndex !== null);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("mdi-image-multiple-outline", !ctx.isProcessingImages)("mdi-loading", ctx.isProcessingImages)("mdi-spin", ctx.isProcessingImages);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(46, 28, ctx.isProcessingImages ? "processingImages" : "chooseImages"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(49, 30, "blogImageRules"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.images.length >= ctx.maxImages || ctx.isSaving || ctx.isProcessingImages || ctx.deletingImageIndex !== null);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.imageValidationMessage ? 51 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.images.length ? 52 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isSaving || ctx.isProcessingImages || ctx.deletingImageIndex !== null || ctx.form.invalid);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isSaving ? 54 : 55);
        } }, dependencies: [ReactiveFormsModule, i3.ɵNgNoValidate, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.MaxLengthValidator, i3.FormGroupDirective, i3.FormControlName, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogsFormCard, [{
        type: Component,
        args: [{ selector: 'app-blogs-form-card', standalone: true, imports: [ReactiveFormsModule, DatePicker, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\n  <div class=\"mb-4 flex items-center justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ selectedBlog ? 'Edit blog' : 'Add blog' }}</h2>\n    <button type=\"button\" class=\"text-sm text-slate-500\" (click)=\"cancelled.emit()\">Cancel</button>\n  </div>\n\n  @if (errorMessage) {\n    <p class=\"mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700\">{{ errorMessage }}</p>\n  }\n\n  <form class=\"space-y-4\" [formGroup]=\"form\" (ngSubmit)=\"save()\">\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <label class=\"text-sm font-medium\">\n        English title\n        <input formControlName=\"titleEng\" maxlength=\"200\" class=\"mt-1 w-full rounded-xl border p-2\" />\n      </label>\n      <label class=\"text-sm font-medium\">\n        Arabic title\n        <input formControlName=\"titleAr\" maxlength=\"200\" dir=\"rtl\" class=\"mt-1 w-full rounded-xl border p-2\" />\n      </label>\n    </div>\n\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <label class=\"text-sm font-medium\">\n        English summary\n        <textarea formControlName=\"summaryEng\" maxlength=\"500\" rows=\"2\" class=\"mt-1 w-full rounded-xl border p-2\"></textarea>\n      </label>\n      <label class=\"text-sm font-medium\">\n        Arabic summary\n        <textarea formControlName=\"summaryAr\" maxlength=\"500\" rows=\"2\" dir=\"rtl\" class=\"mt-1 w-full rounded-xl border p-2\"></textarea>\n      </label>\n    </div>\n\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <label class=\"text-sm font-medium\">\n        English content\n        <textarea formControlName=\"contentEng\" maxlength=\"15000\" rows=\"8\" class=\"mt-1 w-full rounded-xl border p-2\"></textarea>\n      </label>\n      <label class=\"text-sm font-medium\">\n        Arabic content\n        <textarea formControlName=\"contentAr\" maxlength=\"15000\" rows=\"8\" dir=\"rtl\" class=\"mt-1 w-full rounded-xl border p-2\"></textarea>\n      </label>\n    </div>\n\n    <div>\n      <label for=\"blog-publish-date\" class=\"block text-sm font-medium\">Publish date</label>\n      <app-date-picker\n        formControlName=\"publishedAt\"\n        id=\"blog-publish-date\"\n        placeholder=\"Select a publish date\"\n        ariaLabel=\"Publish date\"\n        class=\"mt-1 block max-w-sm\"\n        inputClass=\"rounded-xl border border-slate-300 bg-white px-3 py-2.5 pe-11 shadow-sm\"\n      />\n      <p class=\"mt-1 text-xs text-slate-500\">Choose the day this blog should appear on the website.</p>\n    </div>\n\n    <div>\n      <div class=\"mb-2 flex items-center justify-between gap-3\">\n        <label for=\"blog-images\" class=\"text-sm font-medium\">{{ 'blogImages' | translate }}</label>\n        <span class=\"text-xs text-slate-500\">{{ images.length }} / {{ maxImages }}</span>\n      </div>\n\n      <label\n        for=\"blog-images\"\n        class=\"flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-4 py-5 text-center transition hover:border-primary\"\n        [class.cursor-pointer]=\"images.length < maxImages && !isSaving && !isProcessingImages && deletingImageIndex === null\"\n        [class.cursor-not-allowed]=\"images.length >= maxImages || isSaving || isProcessingImages || deletingImageIndex !== null\"\n        [class.opacity-60]=\"images.length >= maxImages || isSaving || isProcessingImages || deletingImageIndex !== null\"\n        [attr.aria-disabled]=\"images.length >= maxImages || isSaving || isProcessingImages || deletingImageIndex !== null\"\n      >\n        <i\n          class=\"mdi mb-2 text-3xl text-primary\"\n          [class.mdi-image-multiple-outline]=\"!isProcessingImages\"\n          [class.mdi-loading]=\"isProcessingImages\"\n          [class.mdi-spin]=\"isProcessingImages\"\n          aria-hidden=\"true\"\n        ></i>\n        <span class=\"text-sm font-semibold text-primary\">\n          {{ (isProcessingImages ? 'processingImages' : 'chooseImages') | translate }}\n        </span>\n        <span class=\"mt-1 text-xs text-slate-500\">{{ 'blogImageRules' | translate }}</span>\n      </label>\n      <input\n        id=\"blog-images\"\n        class=\"sr-only\"\n        type=\"file\"\n        accept=\"image/jpeg,image/png,image/webp\"\n        multiple\n        [disabled]=\"images.length >= maxImages || isSaving || isProcessingImages || deletingImageIndex !== null\"\n        (change)=\"onFiles($event)\"\n      />\n\n      @if (imageValidationMessage) {\n        <p class=\"mt-2 text-xs font-medium text-red-600\" role=\"alert\">\n          {{ imageValidationMessage | translate }}\n        </p>\n      }\n\n      @if (images.length) {\n        <div class=\"mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3\">\n          @for (image of images; track image.url; let index = $index) {\n            <div class=\"relative overflow-hidden rounded-xl bg-slate-200\">\n              <img\n                [src]=\"getImageUrl(image.url)\"\n                [alt]=\"image.name\"\n                class=\"aspect-[3/2] w-full object-cover\"\n              />\n              <button\n                type=\"button\"\n                class=\"absolute end-2 top-2 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-black/70 text-lg text-white transition-colors duration-200 hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60\"\n                [disabled]=\"deletingImageIndex !== null || isSaving || isProcessingImages\"\n                [attr.aria-label]=\"'removeImage' | translate\"\n                [attr.title]=\"'removeImage' | translate\"\n                (click)=\"removeImage(index)\"\n              >\n                <i\n                  class=\"mdi\"\n                  [class.mdi-loading]=\"deletingImageIndex === index\"\n                  [class.mdi-spin]=\"deletingImageIndex === index\"\n                  [class.mdi-close]=\"deletingImageIndex !== index\"\n                  aria-hidden=\"true\"\n                ></i>\n              </button>\n            </div>\n          }\n        </div>\n      }\n    </div>\n\n    <button\n      type=\"submit\"\n      [disabled]=\"isSaving || isProcessingImages || deletingImageIndex !== null || form.invalid\"\n      class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\"\n    >\n      @if (isSaving) {\n        <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i>\n        <span>{{ 'saving' | translate }}</span>\n      } @else {\n        {{ selectedBlog ? 'Update blog' : 'Create blog' }}\n      }\n    </button>\n  </form>\n</div>\n" }]
    }], () => [{ type: i1.AdminService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { selectedBlog: [{
            type: Input
        }], saved: [{
            type: Output
        }], cancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlogsFormCard, { className: "BlogsFormCard", filePath: "app/features/configurations/blogs/blogs-form-card/blogs-form-card.ts", lineNumber: 39 }); })();
