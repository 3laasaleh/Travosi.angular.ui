import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { DestinationsFromCard } from './destinations-from-card/destinations-from-card';
import { DestinationsList } from './destinations-list/destinations-list';
import * as i0 from "@angular/core";
function Destinations_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-destinations-from-card", 14);
    i0.ɵɵlistener("destinationSaved", function Destinations_Conditional_21_Template_app_destinations_from_card_destinationSaved_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleDestinationSaved()); })("editCancelled", function Destinations_Conditional_21_Template_app_destinations_from_card_editCancelled_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearSelectedDestination()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("selectedDestination", ctx_r1.selectedDestination);
} }
function Destinations_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-configurations-destinations-list", 15);
    i0.ɵɵlistener("previewRequested", function Destinations_Conditional_22_Template_app_configurations_destinations_list_previewRequested_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openPreview($event)); })("editRequested", function Destinations_Conditional_22_Template_app_configurations_destinations_list_editRequested_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectDestinationForEdit($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("viewMode", ctx_r1.viewMode)("refreshToken", ctx_r1.refreshToken);
} }
function Destinations_Conditional_23_Conditional_5_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function Destinations_Conditional_23_Conditional_5_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previewPreviousImage()); });
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 33);
    i0.ɵɵlistener("click", function Destinations_Conditional_23_Conditional_5_Conditional_1_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.previewNextImage()); });
    i0.ɵɵelement(3, "i", 34);
    i0.ɵɵelementEnd();
} }
function Destinations_Conditional_23_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 30);
    i0.ɵɵconditionalCreate(1, Destinations_Conditional_23_Conditional_5_Conditional_1_Template, 4, 0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r1.imageUrl(ctx), i0.ɵɵsanitizeUrl)("alt", ctx_r1.previewDestination.nameEng);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.getImages(ctx_r1.previewDestination).length > 1 ? 1 : -1);
} }
function Destinations_Conditional_23_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵelementEnd();
} }
function Destinations_Conditional_23_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.previewDestination.subDescription);
} }
function Destinations_Conditional_23_Conditional_19_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function Destinations_Conditional_23_Conditional_19_For_2_Template_button_click_0_listener() { const ɵ$index_93_r7 = i0.ɵɵrestoreView(_r6).$index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.showPreviewImage(ɵ$index_93_r7)); });
    i0.ɵɵelement(1, "img", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r8 = ctx.$implicit;
    const ɵ$index_93_r7 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("border-primary", ɵ$index_93_r7 === ctx_r1.previewImageIndex);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.imageUrl(image_r8), i0.ɵɵsanitizeUrl)("alt", ctx_r1.previewDestination.nameEng);
} }
function Destinations_Conditional_23_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵrepeaterCreate(1, Destinations_Conditional_23_Conditional_19_For_2_Template, 2, 4, "button", 36, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.getImages(ctx_r1.previewDestination));
} }
function Destinations_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵlistener("click", function Destinations_Conditional_23_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePreview()); });
    i0.ɵɵelementStart(1, "div", 17);
    i0.ɵɵlistener("click", function Destinations_Conditional_23_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "button", 18);
    i0.ɵɵlistener("click", function Destinations_Conditional_23_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closePreview()); });
    i0.ɵɵelement(3, "i", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 20);
    i0.ɵɵconditionalCreate(5, Destinations_Conditional_23_Conditional_5_Template, 2, 3)(6, Destinations_Conditional_23_Conditional_6_Template, 2, 0, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 22)(8, "p", 23);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 24)(12, "h2", 25);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 26);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(16, Destinations_Conditional_23_Conditional_16_Template, 2, 1, "p", 27);
    i0.ɵɵelementStart(17, "p", 28);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(19, Destinations_Conditional_23_Conditional_19_Template, 3, 0, "div", 29);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.getImages(ctx_r1.previewDestination)[ctx_r1.previewImageIndex]) ? 5 : 6, tmp_1_0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 7, "destination"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.previewDestination.nameEng);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.previewDestination.nameAr);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.previewDestination.subDescription ? 16 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.previewDestination.description);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.getImages(ctx_r1.previewDestination).length > 1 ? 19 : -1);
} }
export class Destinations {
    viewMode = 'table';
    showForm = false;
    selectedDestination = null;
    previewDestination = null;
    previewImageIndex = 0;
    refreshToken = 0;
    toggleForm() {
        this.showForm = !this.showForm;
        if (!this.showForm)
            this.selectedDestination = null;
    }
    selectDestinationForEdit(destination) {
        this.selectedDestination = destination;
        this.showForm = true;
    }
    clearSelectedDestination() {
        this.selectedDestination = null;
        this.showForm = false;
    }
    handleDestinationSaved() {
        this.selectedDestination = null;
        this.showForm = false;
        this.refreshToken++;
    }
    openPreview(destination) {
        this.previewDestination = destination;
        this.previewImageIndex = 0;
    }
    closePreview() {
        this.previewDestination = null;
        this.previewImageIndex = 0;
    }
    showPreviewImage(index) {
        this.previewImageIndex = index;
    }
    previewPreviousImage() {
        const count = this.getImages(this.previewDestination).length;
        if (count)
            this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
    }
    previewNextImage() {
        const count = this.getImages(this.previewDestination).length;
        if (count)
            this.previewImageIndex = (this.previewImageIndex + 1) % count;
    }
    getImages(destination) {
        if (Array.isArray(destination?.images))
            return destination.images;
        return destination?.imageUrl ? [{ url: destination.imageUrl }] : [];
    }
    imageUrl(image) {
        const url = typeof image === 'string'
            ? image
            : (image?.url ?? image?.imageUrl ?? image?.path ?? '');
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
    }
    static ɵfac = function Destinations_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Destinations)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Destinations, selectors: [["app-destinations"]], decls: 24, vars: 26, consts: [[1, "min-h-screen", "bg-slate-50", "px-4", "text-slate-800"], [1, "mx-auto", "max-w-7xl", "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm"], [1, "mb-6", "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-end", "lg:justify-between"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "mt-2", "text-sm", "text-slate-500"], [1, "flex", "gap-3"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-primary/40", "bg-primary/5", "text-xl", "text-primary", "transition", "hover:bg-primary", "hover:text-white", 3, "click"], [1, "mdi"], ["type", "button", 1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-rose-50", "text-xl", "text-rose-600", "transition", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "grid", "grid-cols-1", "gap-6"], [3, "selectedDestination"], [3, "viewMode", "refreshToken"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-999", "flex", "items-center", "justify-center", "bg-slate-950/75", "p-4", "backdrop-blur-sm"], [3, "destinationSaved", "editCancelled", "selectedDestination"], [3, "previewRequested", "editRequested", "viewMode", "refreshToken"], ["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-999", "flex", "items-center", "justify-center", "bg-slate-950/75", "p-4", "backdrop-blur-sm", 3, "click"], [1, "relative", "max-h-[92vh]", "w-full", "max-w-4xl", "overflow-y-auto", "rounded-[2rem]", "bg-white", "shadow-2xl", 3, "click"], ["type", "button", 1, "absolute", "right-4", "top-4", "z-20", "grid", "h-10", "w-10", "place-items-center", "rounded-full", "bg-black/55", "text-xl", "text-white", 3, "click"], [1, "mdi", "mdi-close"], [1, "relative", "overflow-hidden", "bg-slate-200"], [1, "grid", "aspect-[16/9]", "place-items-center", "text-slate-400"], [1, "p-6", "md:p-8"], [1, "text-xs", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "mt-2", "flex", "justify-between", "gap-3"], [1, "text-3xl", "font-semibold"], ["dir", "rtl", 1, "text-xl", "text-slate-500"], [1, "mt-4", "text-lg", "font-medium"], [1, "mt-4", "whitespace-pre-line", "leading-7", "text-slate-600"], [1, "mt-6", "flex", "gap-2", "overflow-x-auto"], [1, "aspect-[16/9]", "max-h-[520px]", "w-full", "object-cover", 3, "src", "alt"], ["type", "button", 1, "absolute", "left-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-black/45", "text-2xl", "text-white", 3, "click"], [1, "mdi", "mdi-chevron-left"], ["type", "button", 1, "absolute", "right-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "bg-black/45", "text-2xl", "text-white", 3, "click"], [1, "mdi", "mdi-chevron-right"], [1, "mdi", "mdi-image-off-outline", "text-6xl"], ["type", "button", 1, "overflow-hidden", "rounded-xl", "border-2", 3, "border-primary"], ["type", "button", 1, "overflow-hidden", "rounded-xl", "border-2", 3, "click"], [1, "h-16", "w-24", "object-cover", 3, "src", "alt"]], template: function Destinations_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵlistener("click", function Destinations_Template_button_click_14_listener() { return ctx.toggleForm(); });
            i0.ɵɵelement(16, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 9);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵlistener("click", function Destinations_Template_button_click_17_listener() { return ctx.viewMode = ctx.viewMode === "table" ? "grid" : "table"; });
            i0.ɵɵelement(19, "i", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 10);
            i0.ɵɵconditionalCreate(21, Destinations_Conditional_21_Template, 1, 1, "app-destinations-from-card", 11)(22, Destinations_Conditional_22_Template, 1, 2, "app-configurations-destinations-list", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(23, Destinations_Conditional_23_Template, 20, 9, "div", 13);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 16, "admin"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 18, "destinations"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 20, "manageDestinationDetails"));
            i0.ɵɵadvance(3);
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(15, 22, ctx.showForm ? "hideAddDestination" : "showAddDestination"))("aria-expanded", ctx.showForm);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-eye-off-outline", ctx.showForm)("mdi-plus", !ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵattribute("title", i0.ɵɵpipeBind1(18, 24, ctx.viewMode === "table" ? "switchToGrid" : "switchToTable"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-view-grid-outline", ctx.viewMode === "table")("mdi-table", ctx.viewMode === "grid");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.showForm ? 21 : 22);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.previewDestination ? 23 : -1);
        } }, dependencies: [DestinationsFromCard, DestinationsList, TranslatePipe], styles: ["[_nghost-%COMP%] {\r\n  display: block;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Destinations, [{
        type: Component,
        args: [{ selector: 'app-destinations', standalone: true, imports: [TranslatePipe, DestinationsFromCard, DestinationsList], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"min-h-screen bg-slate-50 px-4 text-slate-800\">\r\n  <div class=\"mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm\">\r\n    <header class=\"mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between\">\r\n      <div><p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'admin' | translate }}</p><h1 class=\"mt-2 text-3xl font-semibold\">{{ 'destinations' | translate }}</h1><p class=\"mt-2 text-sm text-slate-500\">{{ 'manageDestinationDetails' | translate }}</p></div>\r\n      <div class=\"flex gap-3\">\r\n        \r\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-primary/5 text-xl text-primary transition hover:bg-primary hover:text-white\" [attr.title]=\"(showForm ? 'hideAddDestination' : 'showAddDestination') | translate\" [attr.aria-expanded]=\"showForm\" (click)=\"toggleForm()\"><i class=\"mdi\" [class.mdi-eye-off-outline]=\"showForm\" [class.mdi-plus]=\"!showForm\"></i></button>\r\n        <button type=\"button\" class=\"grid h-10 w-10 place-items-center rounded-full border border-rose-200 bg-rose-50 text-xl text-rose-600 transition hover:bg-rose-600 hover:text-white\" [attr.title]=\"(viewMode === 'table' ? 'switchToGrid' : 'switchToTable') | translate\" (click)=\"viewMode = viewMode === 'table' ? 'grid' : 'table'\"><i class=\"mdi\" [class.mdi-view-grid-outline]=\"viewMode === 'table'\" [class.mdi-table]=\"viewMode === 'grid'\"></i></button>\r\n      </div>\r\n    </header>\r\n    <div class=\"grid grid-cols-1 gap-6\">\n      @if (showForm) {\n        <app-destinations-from-card [selectedDestination]=\"selectedDestination\" (destinationSaved)=\"handleDestinationSaved()\" (editCancelled)=\"clearSelectedDestination()\" />\n      } @else {\n        <app-configurations-destinations-list [viewMode]=\"viewMode\" [refreshToken]=\"refreshToken\" (previewRequested)=\"openPreview($event)\" (editRequested)=\"selectDestinationForEdit($event)\" />\n      }\n    </div>\r\n  </div>\r\n\r\n  @if (previewDestination) {\r\n    <div class=\"fixed inset-0 z-999 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm\" role=\"dialog\" aria-modal=\"true\" (click)=\"closePreview()\">\r\n      <div class=\"relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl \" (click)=\"$event.stopPropagation()\">\r\n        <button type=\"button\" class=\"absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-xl text-white\" (click)=\"closePreview()\"><i class=\"mdi mdi-close\"></i></button>\r\n        <div class=\"relative overflow-hidden bg-slate-200\">\r\n          @if (getImages(previewDestination)[previewImageIndex]; as image) {\r\n            <img [src]=\"imageUrl(image)\" [alt]=\"previewDestination.nameEng\" class=\"aspect-[16/9] max-h-[520px] w-full object-cover\" />\r\n            @if (getImages(previewDestination).length > 1) { <button type=\"button\" class=\"absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-2xl text-white\" (click)=\"previewPreviousImage()\"><i class=\"mdi mdi-chevron-left\"></i></button><button type=\"button\" class=\"absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-2xl text-white\" (click)=\"previewNextImage()\"><i class=\"mdi mdi-chevron-right\"></i></button> }\r\n          } @else { <div class=\"grid aspect-[16/9] place-items-center text-slate-400\"><i class=\"mdi mdi-image-off-outline text-6xl\"></i></div> }\r\n        </div>\r\n        <div class=\"p-6 md:p-8\"><p class=\"text-xs font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'destination' | translate }}</p><div class=\"mt-2 flex justify-between gap-3\"><h2 class=\"text-3xl font-semibold\">{{ previewDestination.nameEng }}</h2><p dir=\"rtl\" class=\"text-xl text-slate-500\">{{ previewDestination.nameAr }}</p></div>@if (previewDestination.subDescription) { <p class=\"mt-4 text-lg font-medium\">{{ previewDestination.subDescription }}</p> }<p class=\"mt-4 whitespace-pre-line leading-7 text-slate-600\">{{ previewDestination.description }}</p>@if (getImages(previewDestination).length > 1) { <div class=\"mt-6 flex gap-2 overflow-x-auto\">@for (image of getImages(previewDestination); track $index; let index = $index) { <button type=\"button\" class=\"overflow-hidden rounded-xl border-2\" [class.border-primary]=\"index === previewImageIndex\" (click)=\"showPreviewImage(index)\"><img [src]=\"imageUrl(image)\" [alt]=\"previewDestination.nameEng\" class=\"h-16 w-24 object-cover\" /></button> }</div> }</div>\r\n      </div>\r\n    </div>\r\n  }\r\n</section>\r\n", styles: [":host {\r\n  display: block;\r\n}\r\n\r\nbutton:disabled {\r\n  opacity: 0.5;\r\n  cursor: not-allowed;\r\n}\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Destinations, { className: "Destinations", filePath: "app/features/configurations/destinations/destinations-page.ts", lineNumber: 16 }); })();
