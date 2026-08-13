import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ToursFromCard } from './tours-from-card/tours-from-card';
import { ToursList } from './tours-list/tours-list';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { TourDetail } from '../../home/tour-page/tour-detail/tour-detail/tour-detail';
import * as i0 from "@angular/core";
function Tours_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function Tours_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.viewMode = ctx_r1.viewMode === "table" ? "grid" : "table"); });
    i0.ɵɵelement(2, "i", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("title", i0.ɵɵpipeBind1(1, 5, ctx_r1.viewMode === "table" ? "switchToGrid" : "switchToTable"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-view-grid-outline", ctx_r1.viewMode === "table")("mdi-table", ctx_r1.viewMode === "grid");
} }
function Tours_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-tours-from-card", 15);
    i0.ɵɵlistener("tourSaved", function Tours_Conditional_19_Template_app_tours_from_card_tourSaved_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleTourSaved()); })("editCancelled", function Tours_Conditional_19_Template_app_tours_from_card_editCancelled_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedTour()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedTour", ctx_r1.selectedTour);
} }
function Tours_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-configurations-tours-list", 16);
    i0.ɵɵlistener("previewRequested", function Tours_Conditional_20_Template_app_configurations_tours_list_previewRequested_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openPreview($event)); })("editRequested", function Tours_Conditional_20_Template_app_configurations_tours_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectTourForEdit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
function Tours_Conditional_21_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function Tours_Conditional_21_Conditional_6_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previewPreviousImage()); });
    i0.ɵɵelement(1, "i", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 32);
    i0.ɵɵlistener("click", function Tours_Conditional_21_Conditional_6_Conditional_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previewNextImage()); });
    i0.ɵɵelement(3, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 34);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r1.previewImageIndex + 1, " / ", ctx_r1.getImages(ctx_r1.previewTour).length);
} }
function Tours_Conditional_21_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 29);
    i0.ɵɵconditionalCreate(1, Tours_Conditional_21_Conditional_6_Conditional_1_Template, 6, 2);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", ctx_r1.previewTour.titleEng ?? ctx_r1.previewTour.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.getImages(ctx_r1.previewTour).length > 1 ? 1 : -1);
} }
function Tours_Conditional_21_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementEnd();
} }
function Tours_Conditional_21_Conditional_10_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function Tours_Conditional_21_Conditional_10_For_2_Template_button_click_0_listener() { const ɵ$index_80_r8 = i0.ɵɵrestoreView(_r7).$index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.showPreviewImage(ɵ$index_80_r8)); });
    i0.ɵɵelement(1, "img", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r9 = ctx.$implicit;
    const ɵ$index_80_r8 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("border-primary", ɵ$index_80_r8 === ctx_r1.previewImageIndex)("opacity-60", ɵ$index_80_r8 !== ctx_r1.previewImageIndex)("border-transparent", ɵ$index_80_r8 !== ctx_r1.previewImageIndex);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.imageUrl(image_r9), i0.ɵɵsanitizeUrl)("alt", ctx_r1.previewTour.titleEng ?? ctx_r1.previewTour.title);
} }
function Tours_Conditional_21_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵrepeaterCreate(1, Tours_Conditional_21_Conditional_10_For_2_Template, 2, 8, "button", 36, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.getImages(ctx_r1.previewTour));
} }
function Tours_Conditional_21_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-itinerary-timeline", 27);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("items", ctx_r1.getItinerary(ctx_r1.previewTour));
} }
function Tours_Conditional_21_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 28)(1, "div", 39)(2, "span", 40);
    i0.ɵɵelement(3, "i", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "h3", 42);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 43);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 2, "cancellationPolicy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.previewTour.cancellationPolicy);
} }
function Tours_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵlistener("click", function Tours_Conditional_21_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePreview()); });
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵlistener("click", function Tours_Conditional_21_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 19);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵlistener("click", function Tours_Conditional_21_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePreview()); });
    i0.ɵɵelement(4, "i", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 21);
    i0.ɵɵconditionalCreate(6, Tours_Conditional_21_Conditional_6_Template, 2, 3)(7, Tours_Conditional_21_Conditional_7_Template, 2, 0, "div", 22);
    i0.ɵɵelementStart(8, "span", 23);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(10, Tours_Conditional_21_Conditional_10_Template, 3, 0, "div", 24);
    i0.ɵɵelementStart(11, "div", 25);
    i0.ɵɵelement(12, "app-tour-detail", 26);
    i0.ɵɵconditionalCreate(13, Tours_Conditional_21_Conditional_13_Template, 1, 1, "app-itinerary-timeline", 27);
    i0.ɵɵconditionalCreate(14, Tours_Conditional_21_Conditional_14_Template, 10, 4, "section", 28);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 7, "close"));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.getImages(ctx_r1.previewTour)[ctx_r1.previewImageIndex]) ? 6 : 7, tmp_2_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.destinationName(ctx_r1.previewTour));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.getImages(ctx_r1.previewTour).length > 1 ? 10 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("tour", ctx_r1.previewTour);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.getItinerary(ctx_r1.previewTour).length ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.previewTour.cancellationPolicy ? 14 : -1);
} }
export class Tours {
    translate = inject(TranslateService);
    viewMode = 'table';
    showForm = false;
    selectedTour = null;
    previewTour = null;
    previewImageIndex = 0;
    refreshToken = 0;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedTour = null;
    }
    selectTourForEdit(tour) {
        if (tour?.isActive !== false)
            return;
        this.selectedTour = tour;
        this.showForm = true;
    }
    clearSelectedTour() {
        this.selectedTour = null;
        this.showForm = false;
    }
    handleTourSaved() {
        this.selectedTour = null;
        this.showForm = false;
        this.refreshToken++;
    }
    openPreview(tour) {
        this.previewTour = tour;
        this.previewImageIndex = 0;
    }
    closePreview() {
        this.previewTour = null;
        this.previewImageIndex = 0;
    }
    showPreviewImage(index) {
        this.previewImageIndex = index;
    }
    previewPreviousImage() {
        const count = this.getImages(this.previewTour).length;
        if (count)
            this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
    }
    previewNextImage() {
        const count = this.getImages(this.previewTour).length;
        if (count)
            this.previewImageIndex = (this.previewImageIndex + 1) % count;
    }
    destinationName(tour) {
        return (tour?.destination?.nameEng ??
            tour?.destinationName ??
            this.translate.instant('destinationNumber', { id: tour?.destinationId ?? '-' }));
    }
    getItinerary(tour) {
        const itinerary = tour?.itinerary ?? tour?.itineraries;
        return Array.isArray(itinerary) ? itinerary : [];
    }
    getImages(tour) {
        const cover = tour?.coverImageUrl ?? tour?.imageUrl;
        const images = Array.isArray(tour?.images) ? tour.images : [];
        if (!cover)
            return images;
        const coverIndex = images.findIndex((image) => this.imageMatchesCover(image, cover));
        if (coverIndex < 0)
            return [{ url: cover }, ...images];
        return [images[coverIndex], ...images.filter((_, index) => index !== coverIndex)];
    }
    imageUrl(image) {
        const url = typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? '');
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    imageMatchesCover(image, cover) {
        return this.normalizeImagePath(this.imageUrl(image)) === this.normalizeImagePath(cover);
    }
    normalizeImagePath(url) {
        return String(url ?? '')
            .trim()
            .replace(/\\/g, '/')
            .replace(/^https?:\/\/[^/]+\/images\//i, '')
            .replace(/^\/+/, '')
            .replace(/^images\//i, '')
            .toLowerCase();
    }
    static ɵfac = function Tours_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Tours)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Tours, selectors: [["app-tours"]], decls: 22, vars: 20, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white"], [1, "grid", "grid-cols-1", "gap-6"], [3, "selectedTour"], [3, "viewMode", "refreshToken"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-999", "flex", "items-center", "justify-center", "bg-slate-950/75", "p-4", "backdrop-blur-sm"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [3, "tourSaved", "editCancelled", "selectedTour"], [3, "previewRequested", "editRequested", "viewMode", "refreshToken"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-999", "flex", "items-center", "justify-center", "bg-slate-950/75", "p-4", "backdrop-blur-sm", 3, "click"], [1, "relative", "max-h-[94vh]", "w-full", "max-w-6xl", "overflow-y-auto", "rounded-[2rem]", "bg-slate-50", "shadow-2xl", 3, "click"], ["type", "button", 1, "absolute", "right-4", "top-4", "z-20", "grid", "h-11", "w-11", "place-items-center", "rounded-full", "border", "border-white/30", "bg-slate-950/65", "text-xl", "text-white", "shadow-lg", "backdrop-blur", "transition", "hover:rotate-90", "hover:bg-primary", 3, "click"], [1, "mdi", "mdi-close"], [1, "relative", "overflow-hidden", "rounded-t-[2rem]", "bg-slate-200"], [1, "grid", "aspect-[16/9]", "place-items-center", "text-slate-400"], [1, "absolute", "bottom-4", "left-4", "rounded-full", "bg-primary", "px-3", "py-1", "text-xs", "font-semibold", "text-white"], [1, "flex", "gap-3", "overflow-x-auto", "border-b", "border-slate-200", "bg-white", "px-5", "py-4", "dark:border-slate-800"], [1, "space-y-8", "p-5", "sm:p-8"], [3, "tour"], [3, "items"], [1, "overflow-hidden", "rounded-3xl", "border", "border-slate-200", "bg-white", "shadow-sm", "dark:border-slate-800"], [1, "mx-auto", "aspect-[16/9]", "max-h-[540px]", "w-full", "object-cover", 3, "src", "alt"], ["type", "button", 1, "absolute", "left-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/30", "bg-black/45", "text-2xl", "text-white", "backdrop-blur", "transition", "hover:bg-primary", 3, "click"], [1, "mdi", "mdi-chevron-left"], ["type", "button", 1, "absolute", "right-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/30", "bg-black/45", "text-2xl", "text-white", "backdrop-blur", "transition", "hover:bg-primary", 3, "click"], [1, "mdi", "mdi-chevron-right"], [1, "absolute", "bottom-4", "right-4", "rounded-full", "bg-black/55", "px-3", "py-1", "text-xs", "font-semibold", "text-white"], [1, "mdi", "mdi-image-off-outline", "text-6xl"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", "transition", 3, "border-primary", "opacity-60", "border-transparent"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", "transition", 3, "click"], [1, "h-16", "w-24", "object-cover", 3, "src", "alt"], [1, "flex", "items-start", "gap-4", "p-6", "sm:p-8"], [1, "grid", "h-12", "w-12", "shrink-0", "place-items-center", "rounded-2xl", "bg-primary/10", "text-2xl", "text-primary"], [1, "mdi", "mdi-calendar-remove-outline"], [1, "text-xl", "font-bold", "text-slate-900"], [1, "mt-3", "whitespace-pre-line", "text-sm", "leading-7", "text-slate-600", "x"]], template: function Tours_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵlistener("click", function Tours_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(17, Tours_Conditional_17_Template, 3, 7, "button", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 10);
            i0.ɵɵconditionalCreate(19, Tours_Conditional_19_Template, 1, 1, "app-tours-from-card", 11)(20, Tours_Conditional_20_Template, 1, 2, "app-configurations-tours-list", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(21, Tours_Conditional_21_Template, 15, 9, "div", 13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 12, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 14, "tours"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 16, "manageTourDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 18, ctx.showForm ? "hideAddTour" : "showAddTour"))("aria-expanded", ctx.showForm);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showForm)("mdi-plus", !ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.showForm ? 17 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showForm ? 19 : 20);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.previewTour ? 21 : -1);
        } }, dependencies: [ToursFromCard, ToursList, ItineraryTimeline, TourDetail, TranslatePipe], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Tours, [{
        type: Component,
        args: [{ selector: 'app-tours', standalone: true, imports: [TranslatePipe, ToursFromCard, ToursList, ItineraryTimeline, TourDetail], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\n      <div>\n        <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p>\n        <h1 class=\"mt-2 text-3xl font-semibold\">{{ 'tours' | translate }}</h1>\n        <p class=\"mt-2 text-sm text-slate-500\">{{ 'manageTourDetails' | translate }}</p>\n      </div>\n      <div class=\"flex gap-3\">\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"(showForm ? 'hideAddTour' : 'showAddTour') | translate\" [attr.aria-expanded]=\"showForm\" (click)=\"toggleForm()\">\n          <i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\"></i>\n        </button>\n        @if (!showForm) {\n          <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\">\n            <i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i>\n          </button>\n        }\n      </div>\n    </header>\n\n    <div class=\"grid grid-cols-1 gap-6\">\n      @if (showForm) {\n        <app-tours-from-card [selectedTour]=\"selectedTour\" (tourSaved)=\"handleTourSaved()\" (editCancelled)=\"clearSelectedTour()\" />\n      } @else {\n        <app-configurations-tours-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (previewRequested)=\"openPreview($event)\" (editRequested)=\"selectTourForEdit($event)\" />\n      }\n    </div>\n  </div>\n\n  @if (previewTour) {\n    <div class=\"fixed inset-0 z-999 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm\" role=\"dialog\" aria-modal=\"true\" (click)=\"closePreview()\">\n      <div class=\"relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] bg-slate-50 shadow-2xl \" (click)=\"$event.stopPropagation()\">\n        <button type=\"button\" class=\"absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-slate-950/65 text-xl text-white shadow-lg backdrop-blur transition hover:rotate-90 hover:bg-primary\" [attr.aria-label]=\"'close' | translate\" (click)=\"closePreview()\">\n          <i class=\"mdi mdi-close\"></i>\n        </button>\n\n        <div class=\"relative overflow-hidden rounded-t-[2rem] bg-slate-200 \">\n          @if (getImages(previewTour)[previewImageIndex]; as image) {\n            <img [src]=\"imageUrl(image)\" [alt]=\"previewTour.titleEng ?? previewTour.title\" class=\"mx-auto aspect-[16/9] max-h-[540px] w-full object-cover\" />\n            @if (getImages(previewTour).length > 1) {\n              <button type=\"button\" class=\"absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/45 text-2xl text-white backdrop-blur transition hover:bg-primary\" (click)=\"previewPreviousImage()\">\n                <i class=\"mdi mdi-chevron-left\"></i>\n              </button>\n              <button type=\"button\" class=\"absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/45 text-2xl text-white backdrop-blur transition hover:bg-primary\" (click)=\"previewNextImage()\">\n                <i class=\"mdi mdi-chevron-right\"></i>\n              </button>\n              <span class=\"absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white\">{{ previewImageIndex + 1 }} / {{ getImages(previewTour).length }}</span>\n            }\n          } @else {\n            <div class=\"grid aspect-[16/9] place-items-center text-slate-400\">\n              <i class=\"mdi mdi-image-off-outline text-6xl\"></i>\n            </div>\n          }\n          <span class=\"absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white\">{{ destinationName(previewTour) }}</span>\n        </div>\n\n        @if (getImages(previewTour).length > 1) {\n          <div class=\"flex gap-3 overflow-x-auto border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 \">\n            @for (image of getImages(previewTour); track $index; let index = $index) {\n              <button type=\"button\" class=\"shrink-0 overflow-hidden rounded-xl border-2 transition\" [class.border-primary]=\"index === previewImageIndex\" [class.opacity-60]=\"index !== previewImageIndex\" [class.border-transparent]=\"index !== previewImageIndex\" (click)=\"showPreviewImage(index)\">\n                <img [src]=\"imageUrl(image)\" [alt]=\"previewTour.titleEng ?? previewTour.title\" class=\"h-16 w-24 object-cover\" />\n              </button>\n            }\n          </div>\n        }\n\n        <div class=\"space-y-8 p-5 sm:p-8\">\n          <app-tour-detail [tour]=\"previewTour\" />\n\n          @if (getItinerary(previewTour).length) {\n            <app-itinerary-timeline [items]=\"getItinerary(previewTour)\" />\n          }\n\n          @if (previewTour.cancellationPolicy) {\n            <section class=\"overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 \">\n              <div class=\"flex items-start gap-4 p-6 sm:p-8\">\n                <span class=\"grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary\">\n                  <i class=\"mdi mdi-calendar-remove-outline\"></i>\n                </span>\n                <div>\n                  <h3 class=\"text-xl font-bold text-slate-900 \">{{ 'cancellationPolicy' | translate }}</h3>\n                  <p class=\"mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 x\">{{ previewTour.cancellationPolicy }}</p>\n                </div>\n              </div>\n            </section>\n          }\n        </div>\n      </div>\n    </div>\n  }\n</section>\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\nbutton:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Tours, { className: "Tours", filePath: "app/features/configurations/tours/tours-page.ts", lineNumber: 17 }); })();
