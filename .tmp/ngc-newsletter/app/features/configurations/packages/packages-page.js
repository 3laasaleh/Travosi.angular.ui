import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { PackagesFromCard } from './packages-from-card/packages-from-card';
import { PackagesList } from './packages-list/packages-list';
import * as i0 from "@angular/core";
function Packages_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.viewMode = ctx_r1.viewMode === "table" ? "grid" : "table"); });
    i0.ɵɵelement(2, "i", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("title", i0.ɵɵpipeBind1(1, 5, ctx_r1.viewMode === "table" ? "switchToGrid" : "switchToTable"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-view-grid-outline", ctx_r1.viewMode === "table")("mdi-table", ctx_r1.viewMode === "grid");
} }
function Packages_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-packages-from-card", 14);
    i0.ɵɵlistener("packageSaved", function Packages_Conditional_19_Template_app_packages_from_card_packageSaved_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handlePackageSaved()); })("editCancelled", function Packages_Conditional_19_Template_app_packages_from_card_editCancelled_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedPackage()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedPackage", ctx_r1.selectedPackage);
} }
function Packages_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-configurations-packages-list", 15);
    i0.ɵɵlistener("previewRequested", function Packages_Conditional_20_Template_app_configurations_packages_list_previewRequested_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openPreview($event)); })("editRequested", function Packages_Conditional_20_Template_app_configurations_packages_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectPackageForEdit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
function Packages_Conditional_21_Conditional_6_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_6_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previewPreviousImage()); });
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 36);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_6_Conditional_5_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previewNextImage()); });
    i0.ɵɵelement(5, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 38);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 4, "previousImage"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(4, 6, "nextImage"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r1.previewImageIndex + 1, " / ", ctx_r1.getImages(ctx_r1.previewPackage).length);
} }
function Packages_Conditional_21_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openImageMagnifier()); });
    i0.ɵɵelement(2, "img", 31);
    i0.ɵɵelementStart(3, "span", 32);
    i0.ɵɵelement(4, "i", 33);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(5, Packages_Conditional_21_Conditional_6_Conditional_5_Template, 8, 8);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 4, "viewLargerImage"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", ctx_r1.packageTitle(ctx_r1.previewPackage));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.getImages(ctx_r1.previewPackage).length > 1 ? 5 : -1);
} }
function Packages_Conditional_21_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 39);
    i0.ɵɵelementEnd();
} }
function Packages_Conditional_21_Conditional_26_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 41);
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_26_For_2_Template_button_click_0_listener() { const ɵ$index_113_r9 = i0.ɵɵrestoreView(_r8).$index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.showPreviewImage(ɵ$index_113_r9)); });
    i0.ɵɵelement(1, "img", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r10 = ctx.$implicit;
    const ɵ$index_113_r9 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("border-primary", ɵ$index_113_r9 === ctx_r1.previewImageIndex)("border-transparent", ɵ$index_113_r9 !== ctx_r1.previewImageIndex);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.imageUrl(image_r10), i0.ɵɵsanitizeUrl)("alt", ctx_r1.packageTitle(ctx_r1.previewPackage));
} }
function Packages_Conditional_21_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵrepeaterCreate(1, Packages_Conditional_21_Conditional_26_For_2_Template, 2, 6, "button", 40, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.getImages(ctx_r1.previewPackage));
} }
function Packages_Conditional_21_Conditional_27_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 46);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_27_Conditional_5_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.previewPreviousImage()); });
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 47);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_27_Conditional_5_Template_button_click_3_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.previewNextImage()); });
    i0.ɵɵelement(5, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 48);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 4, "previousImage"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(4, 6, "nextImage"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ctx_r1.previewImageIndex + 1, " / ", ctx_r1.getImages(ctx_r1.previewPackage).length);
} }
function Packages_Conditional_21_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_27_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeImageMagnifier()); });
    i0.ɵɵelementStart(1, "button", 44);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_27_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeImageMagnifier()); });
    i0.ɵɵelement(3, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "img", 45);
    i0.ɵɵlistener("click", function Packages_Conditional_21_Conditional_27_Template_img_click_4_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, Packages_Conditional_21_Conditional_27_Conditional_5_Template, 8, 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 4, "close"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", ctx_r1.packageTitle(ctx_r1.previewPackage));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.getImages(ctx_r1.previewPackage).length > 1 ? 5 : -1);
} }
function Packages_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵlistener("click", function Packages_Conditional_21_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePreview()); });
    i0.ɵɵelementStart(1, "div", 17);
    i0.ɵɵlistener("click", function Packages_Conditional_21_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 18);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵlistener("click", function Packages_Conditional_21_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePreview()); });
    i0.ɵɵelement(4, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 20);
    i0.ɵɵconditionalCreate(6, Packages_Conditional_21_Conditional_6_Template, 6, 6)(7, Packages_Conditional_21_Conditional_7_Template, 2, 0, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 22)(9, "p", 23);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "h2", 4);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 24);
    i0.ɵɵelement(15, "i", 25);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 26)(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span");
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "p", 27);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(26, Packages_Conditional_21_Conditional_26_Template, 3, 0, "div", 28);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(27, Packages_Conditional_21_Conditional_27_Template, 6, 6, "div", 29);
} if (rf & 2) {
    let tmp_2_0;
    let tmp_10_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 12, "close"));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.getImages(ctx_r1.previewPackage)[ctx_r1.previewImageIndex]) ? 6 : 7, tmp_2_0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 14, "travelPackage"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.packageTitle(ctx_r1.previewPackage));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.destinationName(ctx_r1.previewPackage));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(20, 16, "duration"), ": ", ctx_r1.previewPackage.durationDays ?? ctx_r1.previewPackage.duration ?? "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(23, 18, "price"), ": ", ctx_r1.packagePrice(ctx_r1.previewPackage));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.previewPackage.fullDescription ?? ctx_r1.previewPackage.description);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.getImages(ctx_r1.previewPackage).length > 1 ? 26 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_10_0 = ctx_r1.imageMagnifierOpen && ctx_r1.getImages(ctx_r1.previewPackage)[ctx_r1.previewImageIndex]) ? 27 : -1, tmp_10_0);
} }
export class Packages {
    translate = inject(TranslateService);
    viewMode = 'table';
    showForm = false;
    selectedPackage = null;
    previewPackage = null;
    previewImageIndex = 0;
    imageMagnifierOpen = false;
    refreshToken = 0;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedPackage = null;
    }
    selectPackageForEdit(travelPackage) {
        if (travelPackage?.isActive !== false)
            return;
        this.selectedPackage = travelPackage;
        this.showForm = true;
    }
    clearSelectedPackage() {
        this.selectedPackage = null;
        this.showForm = false;
    }
    handlePackageSaved() {
        this.selectedPackage = null;
        this.showForm = false;
        this.refreshToken++;
    }
    openPreview(travelPackage) {
        this.previewPackage = travelPackage;
        this.previewImageIndex = 0;
        this.imageMagnifierOpen = false;
    }
    closePreview() {
        this.previewPackage = null;
        this.previewImageIndex = 0;
        this.imageMagnifierOpen = false;
    }
    showPreviewImage(index) {
        if (index >= 0 && index < this.getImages(this.previewPackage).length) {
            this.previewImageIndex = index;
        }
    }
    previewPreviousImage() {
        const count = this.getImages(this.previewPackage).length;
        if (count)
            this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
    }
    previewNextImage() {
        const count = this.getImages(this.previewPackage).length;
        if (count)
            this.previewImageIndex = (this.previewImageIndex + 1) % count;
    }
    openImageMagnifier() {
        if (this.getImages(this.previewPackage)[this.previewImageIndex]) {
            this.imageMagnifierOpen = true;
        }
    }
    closeImageMagnifier() {
        this.imageMagnifierOpen = false;
    }
    packageTitle(travelPackage) {
        return travelPackage?.titleEng ?? travelPackage?.title ?? travelPackage?.nameEng ?? travelPackage?.name ?? '';
    }
    destinationName(travelPackage) {
        const destinations = Array.isArray(travelPackage?.destinations) ? travelPackage.destinations : [];
        if (destinations.length) {
            return destinations
                .map((destination) => destination?.destinationName ?? destination?.nameEng ?? destination?.name)
                .filter(Boolean)
                .join(', ');
        }
        return travelPackage?.destination?.nameEng ?? travelPackage?.destinationName
            ?? this.translate.instant('destinationNumber', { id: travelPackage?.destinationId ?? '-' });
    }
    getImages(travelPackage) {
        if (Array.isArray(travelPackage?.images) && travelPackage.images.length)
            return travelPackage.images;
        const cover = travelPackage?.coverImageUrl ?? travelPackage?.imageUrl;
        return cover ? [{ imageUrl: cover }] : [];
    }
    imageUrl(image) {
        const url = typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? '');
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    packagePrice(travelPackage) {
        const price = Number(travelPackage?.pricePerPerson ?? travelPackage?.price ?? 0);
        return `$${Number.isFinite(price) ? price : 0}`;
    }
    static ɵfac = function Packages_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Packages)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Packages, selectors: [["app-packages"]], decls: 22, vars: 20, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white"], [1, "grid", "grid-cols-1", "gap-6"], [3, "selectedPackage"], [3, "viewMode", "refreshToken"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [3, "packageSaved", "editCancelled", "selectedPackage"], [3, "previewRequested", "editRequested", "viewMode", "refreshToken"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-999", "flex", "items-center", "justify-center", "bg-slate-950/75", "p-4", "backdrop-blur-sm", 3, "click"], [1, "relative", "max-h-[92vh]", "w-full", "max-w-4xl", "overflow-y-auto", "rounded-[2rem]", "bg-white", "shadow-2xl", 3, "click"], ["type", "button", 1, "absolute", "right-4", "top-4", "z-20", "grid", "h-10", "w-10", "place-items-center", "rounded-full", "bg-black/55", "text-xl", "text-white", 3, "click"], [1, "mdi", "mdi-close"], [1, "relative", "overflow-hidden", "bg-slate-200"], [1, "grid", "aspect-[16/9]", "place-items-center", "text-slate-400"], [1, "p-6", "md:p-8"], [1, "text-xs", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "mt-2", "text-sm", "font-medium", "text-primary"], [1, "mdi", "mdi-map-marker-outline"], [1, "mt-4", "flex", "flex-wrap", "gap-4", "text-sm", "text-slate-500"], [1, "mt-5", "whitespace-pre-line", "leading-7", "text-slate-600"], [1, "mt-6", "flex", "gap-2", "overflow-x-auto", "pb-1"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-[1000]", "flex", "items-center", "justify-center", "bg-black/95", "p-4"], ["type", "button", 1, "group", "block", "w-full", "cursor-zoom-in", 3, "click"], [1, "aspect-[16/9]", "max-h-[520px]", "w-full", "object-cover", 3, "src", "alt"], [1, "absolute", "bottom-4", "left-4", "grid", "h-11", "w-11", "place-items-center", "rounded-full", "bg-black/55", "text-xl", "text-white", "transition", "group-hover:scale-105", "group-hover:bg-primary"], [1, "mdi", "mdi-magnify-plus-outline"], ["type", "button", 1, "absolute", "left-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-black/45", "text-2xl", "text-white", "transition", "hover:bg-black/70", 3, "click"], [1, "mdi", "mdi-chevron-left"], ["type", "button", 1, "absolute", "right-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-black/45", "text-2xl", "text-white", "transition", "hover:bg-black/70", 3, "click"], [1, "mdi", "mdi-chevron-right"], [1, "absolute", "bottom-4", "right-4", "rounded-full", "bg-black/55", "px-3", "py-1", "text-xs", "font-semibold", "text-white"], [1, "mdi", "mdi-image-off-outline", "text-6xl"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", 3, "border-primary", "border-transparent"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", 3, "click"], [1, "h-16", "w-24", "object-cover", 3, "src", "alt"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-[1000]", "flex", "items-center", "justify-center", "bg-black/95", "p-4", 3, "click"], ["type", "button", 1, "absolute", "right-5", "top-5", "z-20", "grid", "h-11", "w-11", "place-items-center", "rounded-full", "bg-white/15", "text-2xl", "text-white", "transition", "hover:bg-white/25", 3, "click"], [1, "max-h-[92vh]", "max-w-[94vw]", "object-contain", 3, "click", "src", "alt"], ["type", "button", 1, "absolute", "left-5", "top-1/2", "grid", "h-12", "w-12", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-white/15", "text-3xl", "text-white", "transition", "hover:bg-white/25", 3, "click"], ["type", "button", 1, "absolute", "right-5", "top-1/2", "grid", "h-12", "w-12", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-white/15", "text-3xl", "text-white", "transition", "hover:bg-white/25", 3, "click"], [1, "absolute", "bottom-5", "rounded-full", "bg-white/15", "px-4", "py-2", "text-sm", "font-semibold", "text-white"]], template: function Packages_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "header", 2)(3, "div")(4, "p", 3);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h1", 4);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 5);
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 6)(14, "button", 7);
            i0.ɵɵpipe(15, "translate");
            i0.ɵɵlistener("click", function Packages_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(17, Packages_Conditional_17_Template, 3, 7, "button", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 10);
            i0.ɵɵconditionalCreate(19, Packages_Conditional_19_Template, 1, 1, "app-packages-from-card", 11)(20, Packages_Conditional_20_Template, 1, 2, "app-configurations-packages-list", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(21, Packages_Conditional_21_Template, 28, 20);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 12, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 14, "packages"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 16, "managePackageDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 18, ctx.showForm ? "hideAddPackage" : "showAddPackage"))("aria-expanded", ctx.showForm);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showForm)("mdi-plus", !ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.showForm ? 17 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showForm ? 19 : 20);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.previewPackage ? 21 : -1);
        } }, dependencies: [PackagesFromCard, PackagesList, TranslatePipe], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Packages, [{
        type: Component,
        args: [{ selector: 'app-packages', standalone: true, imports: [TranslatePipe, PackagesFromCard, PackagesList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\n      <div>\n        <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p>\n        <h1 class=\"mt-2 text-3xl font-semibold\">{{ 'packages' | translate }}</h1>\n        <p class=\"mt-2 text-sm text-slate-500\">{{ 'managePackageDetails' | translate }}</p>\n      </div>\n      <div class=\"flex gap-3\">\n        \n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"(showForm ? 'hideAddPackage' : 'showAddPackage') | translate\" [attr.aria-expanded]=\"showForm\" (click)=\"toggleForm()\"><i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\"></i></button>\n        @if (!showForm) {\n          <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\"><i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i></button>\n        }\n      </div>\n    </header>\n\n    <div class=\"grid grid-cols-1 gap-6\">\n      @if (showForm) {\n        <app-packages-from-card [selectedPackage]=\"selectedPackage\" (packageSaved)=\"handlePackageSaved()\" (editCancelled)=\"clearSelectedPackage()\" />\n      } @else {\n        <app-configurations-packages-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (previewRequested)=\"openPreview($event)\" (editRequested)=\"selectPackageForEdit($event)\" />\n      }\n    </div>\n  </div>\n\n  @if (previewPackage) {\n    <div class=\"fixed inset-0 z-999 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm\" role=\"dialog\" aria-modal=\"true\" (click)=\"closePreview()\">\n      <div class=\"relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl \" (click)=\"$event.stopPropagation()\">\n        <button type=\"button\" class=\"absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-xl text-white\" [attr.aria-label]=\"'close' | translate\" (click)=\"closePreview()\"><i class=\"mdi mdi-close\"></i></button>\n        <div class=\"relative overflow-hidden bg-slate-200\">\n          @if (getImages(previewPackage)[previewImageIndex]; as image) {\n            <button type=\"button\" class=\"group block w-full cursor-zoom-in\" [attr.aria-label]=\"'viewLargerImage' | translate\" (click)=\"openImageMagnifier()\">\n              <img [src]=\"imageUrl(image)\" [alt]=\"packageTitle(previewPackage)\" class=\"aspect-[16/9] max-h-[520px] w-full object-cover\" />\n              <span class=\"absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-xl text-white transition group-hover:scale-105 group-hover:bg-primary\"><i class=\"mdi mdi-magnify-plus-outline\"></i></span>\n            </button>\n            @if (getImages(previewPackage).length > 1) {\n              <button type=\"button\" class=\"absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-2xl text-white transition hover:bg-black/70\" [attr.aria-label]=\"'previousImage' | translate\" (click)=\"previewPreviousImage()\"><i class=\"mdi mdi-chevron-left\"></i></button>\n              <button type=\"button\" class=\"absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-2xl text-white transition hover:bg-black/70\" [attr.aria-label]=\"'nextImage' | translate\" (click)=\"previewNextImage()\"><i class=\"mdi mdi-chevron-right\"></i></button>\n              <span class=\"absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white\">{{ previewImageIndex + 1 }} / {{ getImages(previewPackage).length }}</span>\n            }\n          } @else { <div class=\"grid aspect-[16/9] place-items-center text-slate-400\"><i class=\"mdi mdi-image-off-outline text-6xl\"></i></div> }\n        </div>\n        <div class=\"p-6 md:p-8\">\n          <p class=\"text-xs font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'travelPackage' | translate }}</p>\n          <h2 class=\"mt-2 text-3xl font-semibold\">{{ packageTitle(previewPackage) }}</h2>\n          <p class=\"mt-2 text-sm font-medium text-primary\"><i class=\"mdi mdi-map-marker-outline\"></i> {{ destinationName(previewPackage) }}</p>\n          <div class=\"mt-4 flex flex-wrap gap-4 text-sm text-slate-500\">\n            <span>{{ 'duration' | translate }}: {{ previewPackage.durationDays ?? previewPackage.duration ?? '-' }}</span>\n            <span>{{ 'price' | translate }}: {{ packagePrice(previewPackage) }}</span>\n          </div>\n          <p class=\"mt-5 whitespace-pre-line leading-7 text-slate-600\">{{ previewPackage.fullDescription ?? previewPackage.description }}</p>\n          @if (getImages(previewPackage).length > 1) {\n            <div class=\"mt-6 flex gap-2 overflow-x-auto pb-1\">\n              @for (image of getImages(previewPackage); track $index; let index = $index) {\n                <button type=\"button\" class=\"shrink-0 overflow-hidden rounded-xl border-2\" [class.border-primary]=\"index === previewImageIndex\" [class.border-transparent]=\"index !== previewImageIndex\" (click)=\"showPreviewImage(index)\"><img [src]=\"imageUrl(image)\" [alt]=\"packageTitle(previewPackage)\" class=\"h-16 w-24 object-cover\" /></button>\n              }\n            </div>\n          }\n        </div>\n      </div>\n    </div>\n\n    @if (imageMagnifierOpen && getImages(previewPackage)[previewImageIndex]; as magnifiedImage) {\n      <div class=\"fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-4\" role=\"dialog\" aria-modal=\"true\" (click)=\"closeImageMagnifier()\">\n        <button type=\"button\" class=\"absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25\" [attr.aria-label]=\"'close' | translate\" (click)=\"closeImageMagnifier()\"><i class=\"mdi mdi-close\"></i></button>\n        <img [src]=\"imageUrl(magnifiedImage)\" [alt]=\"packageTitle(previewPackage)\" class=\"max-h-[92vh] max-w-[94vw] object-contain\" (click)=\"$event.stopPropagation()\" />\n        @if (getImages(previewPackage).length > 1) {\n          <button type=\"button\" class=\"absolute left-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/25\" [attr.aria-label]=\"'previousImage' | translate\" (click)=\"$event.stopPropagation(); previewPreviousImage()\"><i class=\"mdi mdi-chevron-left\"></i></button>\n          <button type=\"button\" class=\"absolute right-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/25\" [attr.aria-label]=\"'nextImage' | translate\" (click)=\"$event.stopPropagation(); previewNextImage()\"><i class=\"mdi mdi-chevron-right\"></i></button>\n          <span class=\"absolute bottom-5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white\">{{ previewImageIndex + 1 }} / {{ getImages(previewPackage).length }}</span>\n        }\n      </div>\n    }\n  }\n</section>\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\nbutton:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Packages, { className: "Packages", filePath: "app/features/configurations/packages/packages-page.ts", lineNumber: 16 }); })();
