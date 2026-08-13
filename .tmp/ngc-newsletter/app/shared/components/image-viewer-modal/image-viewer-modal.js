import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Input, Output, } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
function ImageViewerModal_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 11);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵdomListener("click", function ImageViewerModal_Conditional_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previousImage()); });
    i0.ɵɵdomElement(3, "i", 12);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(4, "button", 13);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵdomListener("click", function ImageViewerModal_Conditional_14_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextImage()); });
    i0.ɵɵdomElement(7, "i", 14);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    i0.ɵɵdomProperty("title", i0.ɵɵpipeBind1(1, 4, "previous"));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 6, "previous"));
    i0.ɵɵadvance(4);
    i0.ɵɵdomProperty("title", i0.ɵɵpipeBind1(5, 8, "next"));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 10, "next"));
} }
function ImageViewerModal_Conditional_15_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 16);
    i0.ɵɵdomListener("click", function ImageViewerModal_Conditional_15_For_2_Template_button_click_0_listener() { const ɵ$index_41_r4 = i0.ɵɵrestoreView(_r3).$index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectImage(ɵ$index_41_r4)); });
    i0.ɵɵdomElement(1, "img", 17);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const image_r5 = ctx.$implicit;
    const ɵ$index_41_r4 = ctx.$index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("border-primary", ɵ$index_41_r4 === ctx_r1.selectedIndex)("border-transparent", ɵ$index_41_r4 !== ctx_r1.selectedIndex);
    i0.ɵɵadvance();
    i0.ɵɵdomProperty("src", image_r5, i0.ɵɵsanitizeUrl)("alt", ctx_r1.title);
} }
function ImageViewerModal_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 10);
    i0.ɵɵrepeaterCreate(1, ImageViewerModal_Conditional_15_For_2_Template, 2, 6, "button", 15, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵdomElementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.images);
} }
export class ImageViewerModal {
    document = inject(DOCUMENT);
    previousBodyOverflow = '';
    images = [];
    title = '';
    selectedIndex = 0;
    selectedIndexChange = new EventEmitter();
    closed = new EventEmitter();
    get currentImage() {
        return this.images[this.selectedIndex] ?? this.images[0] ?? '';
    }
    ngOnInit() {
        this.previousBodyOverflow = this.document.body.style.overflow;
        this.document.body.style.overflow = 'hidden';
    }
    ngOnDestroy() {
        this.document.body.style.overflow = this.previousBodyOverflow;
    }
    handleKeydown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            this.close();
        }
        else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this.previousImage();
        }
        else if (event.key === 'ArrowRight') {
            event.preventDefault();
            this.nextImage();
        }
    }
    selectImage(index) {
        if (index < 0 || index >= this.images.length)
            return;
        this.selectedIndex = index;
        this.selectedIndexChange.emit(index);
    }
    previousImage() {
        const imageCount = this.images.length;
        if (imageCount < 2)
            return;
        this.selectImage((this.selectedIndex - 1 + imageCount) % imageCount);
    }
    nextImage() {
        const imageCount = this.images.length;
        if (imageCount < 2)
            return;
        this.selectImage((this.selectedIndex + 1) % imageCount);
    }
    close() {
        this.closed.emit();
    }
    static ɵfac = function ImageViewerModal_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ImageViewerModal)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ImageViewerModal, selectors: [["app-image-viewer-modal"]], hostBindings: function ImageViewerModal_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown", function ImageViewerModal_keydown_HostBindingHandler($event) { return ctx.handleKeydown($event); }, i0.ɵɵresolveDocument);
        } }, inputs: { images: "images", title: "title", selectedIndex: "selectedIndex" }, outputs: { selectedIndexChange: "selectedIndexChange", closed: "closed" }, decls: 16, vars: 14, consts: [["role", "dialog", "aria-modal", "true", 1, "fixed", "inset-0", "z-[9999]", "flex", "bg-slate-950/95", "p-3", "backdrop-blur-md", "md:p-6", 3, "click"], [1, "mx-auto", "flex", "h-full", "w-full", "max-w-7xl", "min-h-0", "flex-col", 3, "click"], [1, "mb-3", "flex", "shrink-0", "items-center", "justify-between", "gap-4", "text-white"], [1, "min-w-0"], [1, "truncate", "text-base", "font-semibold", "md:text-lg"], [1, "mt-1", "text-xs", "text-white/60"], ["type", "button", 1, "grid", "h-11", "w-11", "shrink-0", "place-items-center", "rounded-full", "border", "border-white/25", "bg-white/10", "text-2xl", "transition", "hover:bg-white", "hover:text-slate-950", "focus:outline-none", "focus:ring-2", "focus:ring-white", 3, "click", "title"], [1, "mdi", "mdi-close"], [1, "relative", "flex", "min-h-0", "flex-1", "items-center", "justify-center", "overflow-hidden", "rounded-2xl", "bg-black/35"], [1, "max-h-full", "max-w-full", "object-contain", 3, "src", "alt"], [1, "mt-3", "flex", "shrink-0", "justify-center", "gap-2", "overflow-x-auto", "pb-1"], ["type", "button", 1, "absolute", "start-3", "top-1/2", "grid", "h-12", "w-12", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/30", "bg-slate-950/60", "text-3xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", "md:start-5", 3, "click", "title"], [1, "mdi", "mdi-chevron-left", "rtl:rotate-180"], ["type", "button", 1, "absolute", "end-3", "top-1/2", "grid", "h-12", "w-12", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/30", "bg-slate-950/60", "text-3xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", "md:end-5", 3, "click", "title"], [1, "mdi", "mdi-chevron-right", "rtl:rotate-180"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-lg", "border-2", "transition", 3, "border-primary", "border-transparent"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-lg", "border-2", "transition", 3, "click"], [1, "h-16", "w-24", "object-cover", "md:h-20", "md:w-28", 3, "src", "alt"]], template: function ImageViewerModal_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵdomListener("click", function ImageViewerModal_Template_div_click_0_listener() { return ctx.close(); });
            i0.ɵɵdomElementStart(1, "div", 1);
            i0.ɵɵdomListener("click", function ImageViewerModal_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
            i0.ɵɵdomElementStart(2, "header", 2)(3, "div", 3)(4, "h2", 4);
            i0.ɵɵtext(5);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "p", 5);
            i0.ɵɵtext(7);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(8, "button", 6);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵdomListener("click", function ImageViewerModal_Template_button_click_8_listener() { return ctx.close(); });
            i0.ɵɵdomElement(11, "i", 7);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(12, "div", 8);
            i0.ɵɵdomElement(13, "img", 9);
            i0.ɵɵconditionalCreate(14, ImageViewerModal_Conditional_14_Template, 8, 12);
            i0.ɵɵdomElementEnd();
            i0.ɵɵconditionalCreate(15, ImageViewerModal_Conditional_15_Template, 3, 0, "div", 10);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵattribute("aria-label", ctx.title);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.selectedIndex + 1, " / ", ctx.images.length);
            i0.ɵɵadvance();
            i0.ɵɵdomProperty("title", i0.ɵɵpipeBind1(9, 10, "close"));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(10, 12, "close"));
            i0.ɵɵadvance(5);
            i0.ɵɵdomProperty("src", ctx.currentImage, i0.ɵɵsanitizeUrl)("alt", ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.images.length > 1 ? 14 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.images.length > 1 ? 15 : -1);
        } }, dependencies: [TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ImageViewerModal, [{
        type: Component,
        args: [{ selector: 'app-image-viewer-modal', standalone: true, imports: [TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"fixed inset-0 z-[9999] flex bg-slate-950/95 p-3 backdrop-blur-md md:p-6\"\n  role=\"dialog\"\n  aria-modal=\"true\"\n  [attr.aria-label]=\"title\"\n  (click)=\"close()\"\n>\n  <div class=\"mx-auto flex h-full w-full max-w-7xl min-h-0 flex-col\" (click)=\"$event.stopPropagation()\">\n    <header class=\"mb-3 flex shrink-0 items-center justify-between gap-4 text-white\">\n      <div class=\"min-w-0\">\n        <h2 class=\"truncate text-base font-semibold md:text-lg\">{{ title }}</h2>\n        <p class=\"mt-1 text-xs text-white/60\">{{ selectedIndex + 1 }} / {{ images.length }}</p>\n      </div>\n      <button\n        type=\"button\"\n        class=\"grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-2xl transition hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-white\"\n        [attr.aria-label]=\"'close' | translate\"\n        [title]=\"'close' | translate\"\n        (click)=\"close()\"\n      >\n        <i class=\"mdi mdi-close\"></i>\n      </button>\n    </header>\n\n    <div class=\"relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-black/35\">\n      <img [src]=\"currentImage\" [alt]=\"title\" class=\"max-h-full max-w-full object-contain\" />\n\n      @if (images.length > 1) {\n        <button\n          type=\"button\"\n          class=\"absolute start-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-slate-950/60 text-3xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white md:start-5\"\n          [attr.aria-label]=\"'previous' | translate\"\n          [title]=\"'previous' | translate\"\n          (click)=\"previousImage()\"\n        >\n          <i class=\"mdi mdi-chevron-left rtl:rotate-180\"></i>\n        </button>\n        <button\n          type=\"button\"\n          class=\"absolute end-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-slate-950/60 text-3xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white md:end-5\"\n          [attr.aria-label]=\"'next' | translate\"\n          [title]=\"'next' | translate\"\n          (click)=\"nextImage()\"\n        >\n          <i class=\"mdi mdi-chevron-right rtl:rotate-180\"></i>\n        </button>\n      }\n    </div>\n\n    @if (images.length > 1) {\n      <div class=\"mt-3 flex shrink-0 justify-center gap-2 overflow-x-auto pb-1\">\n        @for (image of images; track $index; let imageIndex = $index) {\n          <button\n            type=\"button\"\n            class=\"shrink-0 overflow-hidden rounded-lg border-2 transition\"\n            [class.border-primary]=\"imageIndex === selectedIndex\"\n            [class.border-transparent]=\"imageIndex !== selectedIndex\"\n            (click)=\"selectImage(imageIndex)\"\n          >\n            <img [src]=\"image\" [alt]=\"title\" class=\"h-16 w-24 object-cover md:h-20 md:w-28\" />\n          </button>\n        }\n      </div>\n    }\n  </div>\n</div>\n" }]
    }], null, { images: [{
            type: Input
        }], title: [{
            type: Input
        }], selectedIndex: [{
            type: Input
        }], selectedIndexChange: [{
            type: Output
        }], closed: [{
            type: Output
        }], handleKeydown: [{
            type: HostListener,
            args: ['document:keydown', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ImageViewerModal, { className: "ImageViewerModal", filePath: "app/shared/components/image-viewer-modal/image-viewer-modal.ts", lineNumber: 22 }); })();
