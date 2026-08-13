import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import * as i0 from "@angular/core";
function CustomerContactOverlay_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "a", 0);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵdomElement(3, "span", 2)(4, "i", 3);
    i0.ɵɵdomElementStart(5, "span", 4);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵdomProperty("href", ctx_r0.whatsappUrl, i0.ɵɵsanitizeUrl)("title", i0.ɵɵpipeBind1(1, 4, "whatsappFloatingLabel"));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 6, "whatsappFloatingLabel"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 8, "whatsappFloatingLabel"), " ");
} }
function CustomerContactOverlay_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "div", 5);
    i0.ɵɵdomListener("click", function CustomerContactOverlay_Conditional_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeModal()); });
    i0.ɵɵdomElementStart(1, "section", 6);
    i0.ɵɵdomListener("click", function CustomerContactOverlay_Conditional_1_Template_section_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵdomElement(2, "div", 7);
    i0.ɵɵdomElementStart(3, "button", 8);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵdomListener("click", function CustomerContactOverlay_Conditional_1_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeModal()); });
    i0.ɵɵdomElement(5, "i", 9);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(6, "div", 10);
    i0.ɵɵdomElement(7, "img", 11);
    i0.ɵɵdomElementStart(8, "div", 12);
    i0.ɵɵdomElement(9, "i", 13);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(10, "h2", 14);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(13, "p", 15);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(16, "div", 16)(17, "p", 17);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(20, "a", 18);
    i0.ɵɵdomElement(21, "i", 19);
    i0.ɵɵtext(22);
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(23, "div", 20)(24, "a", 21);
    i0.ɵɵdomElement(25, "i", 22);
    i0.ɵɵtext(26, " WhatsApp ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(27, "a", 23);
    i0.ɵɵdomElement(28, "i", 24);
    i0.ɵɵtext(29, " Instagram ");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(30, "a", 25);
    i0.ɵɵdomElement(31, "i", 26);
    i0.ɵɵtext(32, " Facebook ");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(33, "p", 27);
    i0.ɵɵtext(34);
    i0.ɵɵpipe(35, "translate");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(36, "div", 28)(37, "button", 29);
    i0.ɵɵdomListener("click", function CustomerContactOverlay_Conditional_1_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeModal()); });
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "translate");
    i0.ɵɵdomElementEnd()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(4, 11, "close"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 13, "leaveSiteTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 15, "leaveSiteMessage"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 17, "bookingContactPrompt"));
    i0.ɵɵadvance(2);
    i0.ɵɵdomProperty("href", ctx_r0.phoneUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.phoneDisplay, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵdomProperty("href", ctx_r0.whatsappUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵdomProperty("href", ctx_r0.instagramUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵdomProperty("href", ctx_r0.facebookUrl, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(35, 19, "thanksForVisiting"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(39, 21, "continueBrowsing"), " ");
} }
export class CustomerContactOverlay {
    router = inject(Router);
    phoneDisplay = '+20 115 501 1300';
    phoneUrl = 'tel:+201155011300';
    whatsappUrl = 'https://wa.me/201155011300';
    instagramUrl = 'https://www.instagram.com/seaworldholidays1/';
    facebookUrl = 'https://www.facebook.com/seaworldholidays1/';
    isCustomerPage = signal(true, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isCustomerPage" }] : /* istanbul ignore next */ []));
    modalOpen = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "modalOpen" }] : /* istanbul ignore next */ []));
    constructor() {
        // this.updateRoute(this.router.url);
        // this.router.events
        //   .pipe(
        //     filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        //     takeUntilDestroyed(),
        //   )
        //   .subscribe((event) => 
        //     this.updateRoute(event.urlAfterRedirects)
        // );
    }
    // @HostListener('window:beforeunload', ['$event'])
    // onPageHide(event: any) {
    //     if (!this.isCustomerPage() || this.modalOpen()) {
    //     return;
    //   }
    //   event.preventDefault();
    //   event.returnValue = '';
    //     this.modalOpen.set(true);
    //   }
    closeModal() {
        this.modalOpen.set(false);
    }
    updateRoute(url) {
        const currentPath = url.split(/[?#]/, 1)[0] || '/';
        const customerPage = !currentPath.startsWith('/configurations');
        this.isCustomerPage.set(customerPage);
        if (!customerPage && this.modalOpen())
            this.closeModal();
    }
    static ɵfac = function CustomerContactOverlay_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomerContactOverlay)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomerContactOverlay, selectors: [["app-customer-contact-overlay"]], decls: 2, vars: 2, consts: [["target", "_blank", "rel", "noopener noreferrer", "data-exit-bypass", "", 1, "group", "fixed", "bottom-5", "right-5", "z-[80]", "grid", "h-14", "w-14", "place-items-center", "rounded-full", "bg-[#25d366]", "text-3xl", "text-white", "shadow-[0_12px_30px_rgba(37,211,102,.42)]", "transition", "duration-300", "hover:-translate-y-1", "hover:scale-105", "hover:bg-[#1ebe5d]", "focus:outline-none", "focus:ring-4", "focus:ring-[#25d366]/30", "md:bottom-7", "md:right-7", "md:h-16", "md:w-16", 3, "href", "title"], ["role", "presentation", 1, "fixed", "inset-0", "z-[100]", "grid", "place-items-center", "overflow-y-auto", "bg-slate-950/70", "p-4", "backdrop-blur-sm"], [1, "absolute", "inset-0", "-z-10", "animate-ping", "rounded-full", "bg-[#25d366]/25"], ["aria-hidden", "true", 1, "mdi", "mdi-whatsapp"], [1, "pointer-events-none", "absolute", "right-full", "mr-3", "hidden", "whitespace-nowrap", "rounded-xl", "bg-slate-950", "px-3", "py-2", "text-xs", "font-semibold", "text-white", "opacity-0", "shadow-lg", "transition", "group-hover:opacity-100", "md:block"], ["role", "presentation", 1, "fixed", "inset-0", "z-[100]", "grid", "place-items-center", "overflow-y-auto", "bg-slate-950/70", "p-4", "backdrop-blur-sm", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "exit-dialog-title", 1, "relative", "w-full", "max-w-lg", "overflow-hidden", "rounded-3xl", "border", "border-white/20", "bg-white", "shadow-2xl", "dark:border-slate-700", 3, "click"], [1, "h-2", "bg-gradient-to-r", "from-primary", "via-cyan-400", "to-amber-300"], ["type", "button", 1, "absolute", "end-4", "top-5", "grid", "h-9", "w-9", "place-items-center", "rounded-full", "text-xl", "text-slate-400", "transition", "hover:bg-slate-100", "hover:text-slate-700", "dark:hover:bg-slate-800", "dark:hover:text-white", 3, "click"], [1, "mdi", "mdi-close"], [1, "p-6", "text-center", "sm:p-8"], ["src", "assets/images/main-logo.png", "alt", "Sea World Holidays", 1, "mx-auto", "h-16", "w-auto"], [1, "mx-auto", "mt-5", "grid", "h-14", "w-14", "place-items-center", "rounded-full", "bg-amber-50", "text-3xl", "text-amber-500", "dark:bg-amber-400/10"], [1, "mdi", "mdi-hand-wave-outline"], ["id", "exit-dialog-title", 1, "mt-4", "text-2xl", "font-bold", "text-slate-900"], [1, "mx-auto", "mt-3", "max-w-md", "leading-7", "text-slate-600"], [1, "mt-6", "rounded-2xl", "bg-slate-50", "p-4", "/70"], [1, "text-sm", "font-medium", "text-slate-500"], ["data-exit-bypass", "", "dir", "ltr", 1, "mt-2", "inline-flex", "items-center", "gap-2", "text-xl", "font-bold", "text-primary", "transition", "hover:underline", 3, "href"], [1, "mdi", "mdi-phone"], [1, "mt-5", "flex", "flex-wrap", "justify-center", "gap-3"], ["target", "_blank", "rel", "noopener noreferrer", "data-exit-bypass", "", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-[#25d366]", "px-4", "py-2.5", "font-semibold", "text-white", "transition", "hover:-translate-y-0.5", "hover:shadow-lg", 3, "href"], [1, "mdi", "mdi-whatsapp", "text-xl"], ["target", "_blank", "rel", "noopener noreferrer", "data-exit-bypass", "", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-gradient-to-r", "from-fuchsia-600", "to-rose-500", "px-4", "py-2.5", "font-semibold", "text-white", "transition", "hover:-translate-y-0.5", "hover:shadow-lg", 3, "href"], [1, "mdi", "mdi-instagram", "text-xl"], ["target", "_blank", "rel", "noopener noreferrer", "data-exit-bypass", "", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-[#1877f2]", "px-4", "py-2.5", "font-semibold", "text-white", "transition", "hover:-translate-y-0.5", "hover:shadow-lg", 3, "href"], [1, "mdi", "mdi-facebook", "text-xl"], [1, "mt-6", "text-sm", "font-medium", "text-slate-500"], [1, "mt-6", "flex", "flex-col-reverse", "justify-center", "gap-3", "sm:flex-row"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-5", "py-2.5", "font-semibold", "text-slate-700", "transition", "hover:border-primary", "hover:text-primary", "dark:border-slate-700", 3, "click"]], template: function CustomerContactOverlay_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, CustomerContactOverlay_Conditional_0_Template, 8, 10, "a", 0);
            i0.ɵɵconditionalCreate(1, CustomerContactOverlay_Conditional_1_Template, 40, 23, "div", 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.isCustomerPage() ? 0 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.modalOpen() ? 1 : -1);
        } }, dependencies: [TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomerContactOverlay, [{
        type: Component,
        args: [{ selector: 'app-customer-contact-overlay', standalone: true, imports: [TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (isCustomerPage()) {\n  <a\n    [href]=\"whatsappUrl\"\n    target=\"_blank\"\n    rel=\"noopener noreferrer\"\n    data-exit-bypass\n    class=\"group fixed bottom-5 right-5 z-[80] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-3xl text-white shadow-[0_12px_30px_rgba(37,211,102,.42)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25d366]/30 md:bottom-7 md:right-7 md:h-16 md:w-16\"\n    [attr.aria-label]=\"'whatsappFloatingLabel' | translate\"\n    [title]=\"'whatsappFloatingLabel' | translate\"\n  >\n    <span class=\"absolute inset-0 -z-10 animate-ping rounded-full bg-[#25d366]/25\"></span>\n    <i class=\"mdi mdi-whatsapp\" aria-hidden=\"true\"></i>\n    <span class=\"pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 md:block\">\n      {{ 'whatsappFloatingLabel' | translate }}\n    </span>\n  </a>\n}\n\n@if (modalOpen()) {\n  <div class=\"fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm\" role=\"presentation\" (click)=\"closeModal()\">\n    <section\n      role=\"dialog\"\n      aria-modal=\"true\"\n      aria-labelledby=\"exit-dialog-title\"\n      class=\"relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl dark:border-slate-700 \"\n      (click)=\"$event.stopPropagation()\"\n    >\n      <div class=\"h-2 bg-gradient-to-r from-primary via-cyan-400 to-amber-300\"></div>\n      <button\n        type=\"button\"\n        class=\"absolute end-4 top-5 grid h-9 w-9 place-items-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white\"\n        [attr.aria-label]=\"'close' | translate\"\n        (click)=\"closeModal()\"\n      >\n        <i class=\"mdi mdi-close\"></i>\n      </button>\n\n      <div class=\"p-6 text-center sm:p-8\">\n        <img src=\"assets/images/main-logo.png\" alt=\"Sea World Holidays\" class=\"mx-auto h-16 w-auto\" />\n        <div class=\"mx-auto mt-5 grid h-14 w-14 place-items-center rounded-full bg-amber-50 text-3xl text-amber-500 dark:bg-amber-400/10\">\n          <i class=\"mdi mdi-hand-wave-outline\"></i>\n        </div>\n        <h2 id=\"exit-dialog-title\" class=\"mt-4 text-2xl font-bold text-slate-900 \">{{ 'leaveSiteTitle' | translate }}</h2>\n        <p class=\"mx-auto mt-3 max-w-md leading-7 text-slate-600 \">{{ 'leaveSiteMessage' | translate }}</p>\n\n        <div class=\"mt-6 rounded-2xl bg-slate-50 p-4 /70\">\n          <p class=\"text-sm font-medium text-slate-500 \">{{ 'bookingContactPrompt' | translate }}</p>\n          <a [href]=\"phoneUrl\" data-exit-bypass class=\"mt-2 inline-flex items-center gap-2 text-xl font-bold text-primary transition hover:underline\" dir=\"ltr\">\n            <i class=\"mdi mdi-phone\"></i>{{ phoneDisplay }}\n          </a>\n        </div>\n\n        <div class=\"mt-5 flex flex-wrap justify-center gap-3\">\n          <a [href]=\"whatsappUrl\" target=\"_blank\" rel=\"noopener noreferrer\" data-exit-bypass class=\"inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg\">\n            <i class=\"mdi mdi-whatsapp text-xl\"></i> WhatsApp\n          </a>\n          <a [href]=\"instagramUrl\" target=\"_blank\" rel=\"noopener noreferrer\" data-exit-bypass class=\"inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-rose-500 px-4 py-2.5 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg\">\n            <i class=\"mdi mdi-instagram text-xl\"></i> Instagram\n          </a>\n          <a [href]=\"facebookUrl\" target=\"_blank\" rel=\"noopener noreferrer\" data-exit-bypass class=\"inline-flex items-center gap-2 rounded-full bg-[#1877f2] px-4 py-2.5 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg\">\n            <i class=\"mdi mdi-facebook text-xl\"></i> Facebook\n          </a>\n        </div>\n\n        <p class=\"mt-6 text-sm font-medium text-slate-500 \">{{ 'thanksForVisiting' | translate }}</p>\n\n        <div class=\"mt-6 flex flex-col-reverse justify-center gap-3 sm:flex-row\">\n          <button type=\"button\" class=\"rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-700 \" (click)=\"closeModal()\">\n            {{ 'continueBrowsing' | translate }}\n          </button>\n        </div>\n      </div>\n    </section>\n  </div>\n}\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomerContactOverlay, { className: "CustomerContactOverlay", filePath: "app/shared/components/customer-contact-overlay/customer-contact-overlay.ts", lineNumber: 14 }); })();
