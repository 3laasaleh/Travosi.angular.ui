import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
const _c0 = (a0, a1) => ["/destinations", a0, "cities", a1];
const _forTrack0 = ($index, $item) => $item.id;
function DestinationCitiesCarousel_For_4_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const city_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(city_r1.nameAr);
} }
function DestinationCitiesCarousel_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "a", 9);
    i0.ɵɵelement(2, "img", 10);
    i0.ɵɵelementStart(3, "div", 11)(4, "div")(5, "h3", 12);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, DestinationCitiesCarousel_For_4_Conditional_7_Template, 2, 1, "p", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "i", 14);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const city_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction2(5, _c0, ctx_r1.destinationId, city_r1.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.cityImage(city_r1), i0.ɵɵsanitizeUrl)("alt", ctx_r1.cityName(city_r1));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.cityName(city_r1));
    i0.ɵɵadvance();
    i0.ɵɵconditional(city_r1.nameAr ? 7 : -1);
} }
export class DestinationCitiesCarousel {
    translate = inject(TranslateService);
    destinationId;
    cities = [];
    swiper = null;
    instanceId = `city-carousel-${Math.random().toString(36).slice(2)}`;
    ngAfterViewInit() { this.initialize(); }
    ngOnChanges(changes) {
        if (changes['cities'] && !changes['cities'].firstChange)
            setTimeout(() => this.initialize());
    }
    ngOnDestroy() { this.swiper?.destroy(true, true); }
    get selector() { return `#${this.instanceId}`; }
    cityName(city) { return this.isArabic ? city?.nameAr ?? city?.nameEng ?? city?.name ?? '' : city?.nameEng ?? city?.nameAr ?? city?.name ?? ''; }
    get isArabic() { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
    cityImage(city) {
        const raw = city?.coverImageUrl ?? city?.imageUrl ?? city?.images?.[0]?.imageUrl ?? city?.images?.[0]?.url ?? '';
        if (!raw)
            return 'assets/images/bg/2.jpg';
        if (/^(blob:|data:|https?:\/\/)/i.test(raw))
            return raw;
        return `${environment.imageUrl}${String(raw).replace(/^\/+/, '')}`;
    }
    initialize() {
        this.swiper?.destroy(true, true);
        if (!this.cities.length || !document.querySelector(this.selector))
            return;
        this.swiper = new Swiper(`${this.selector} .swiper`, {
            modules: [Navigation, Pagination],
            slidesPerView: 1.1,
            spaceBetween: 16,
            navigation: { nextEl: `${this.selector} .cities-next`, prevEl: `${this.selector} .cities-prev` },
            pagination: { el: `${this.selector} .cities-pagination`, clickable: true },
            breakpoints: { 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3.1 }, 1280: { slidesPerView: 4 } },
        });
    }
    static ɵfac = function DestinationCitiesCarousel_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DestinationCitiesCarousel)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DestinationCitiesCarousel, selectors: [["app-destination-cities-carousel"]], inputs: { destinationId: "destinationId", cities: "cities" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 1, consts: [[1, "relative", 3, "id"], [1, "swiper", "overflow-hidden"], [1, "swiper-wrapper"], [1, "swiper-slide", "pb-8"], ["type", "button", 1, "cities-prev", "absolute", "start-3", "top-[40%]", "z-10", "grid", "h-9", "w-9", "place-items-center", "rounded-full", "bg-white/95", "text-lg", "text-slate-700", "shadow", "transition", "hover:bg-primary", "hover:text-white"], [1, "mdi", "mdi-chevron-left", "rtl:rotate-180"], ["type", "button", 1, "cities-next", "absolute", "end-3", "top-[40%]", "z-10", "grid", "h-9", "w-9", "place-items-center", "rounded-full", "bg-white/95", "text-lg", "text-slate-700", "shadow", "transition", "hover:bg-primary", "hover:text-white"], [1, "mdi", "mdi-chevron-right", "rtl:rotate-180"], [1, "cities-pagination", "absolute", "bottom-0", "left-1/2", "z-10", "-translate-x-1/2"], [1, "group", "block", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "hover:-translate-y-1", "hover:border-primary/40", "hover:shadow-lg", 3, "routerLink"], [1, "aspect-[4/3]", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "flex", "items-center", "justify-between", "gap-3", "p-4"], [1, "font-semibold", "group-hover:text-primary"], ["dir", "rtl", 1, "mt-1", "text-xs", "text-slate-500"], [1, "mdi", "mdi-arrow-right", "text-xl", "text-primary", "rtl:rotate-180"]], template: function DestinationCitiesCarousel_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵrepeaterCreate(3, DestinationCitiesCarousel_For_4_Template, 9, 8, "div", 3, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "button", 4);
            i0.ɵɵelement(6, "i", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 6);
            i0.ɵɵelement(8, "i", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(9, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("id", ctx.instanceId);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.cities);
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DestinationCitiesCarousel, [{
        type: Component,
        args: [{ selector: 'app-destination-cities-carousel', standalone: true, imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [id]=\"instanceId\" class=\"relative\">\n  <div class=\"swiper overflow-hidden\">\n    <div class=\"swiper-wrapper\">\n      @for (city of cities; track city.id) {\n        <div class=\"swiper-slide pb-8\">\n          <a [routerLink]=\"['/destinations', destinationId, 'cities', city.id]\" class=\"group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg\">\n            <img [src]=\"cityImage(city)\" [alt]=\"cityName(city)\" class=\"aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105\" />\n            <div class=\"flex items-center justify-between gap-3 p-4\"><div><h3 class=\"font-semibold group-hover:text-primary\">{{ cityName(city) }}</h3>@if (city.nameAr) { <p dir=\"rtl\" class=\"mt-1 text-xs text-slate-500\">{{ city.nameAr }}</p> }</div><i class=\"mdi mdi-arrow-right text-xl text-primary rtl:rotate-180\"></i></div>\n          </a>\n        </div>\n      }\n    </div>\n  </div>\n  <button type=\"button\" class=\"cities-prev absolute start-3 top-[40%] z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-lg text-slate-700 shadow transition hover:bg-primary hover:text-white\"><i class=\"mdi mdi-chevron-left rtl:rotate-180\"></i></button>\n  <button type=\"button\" class=\"cities-next absolute end-3 top-[40%] z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-lg text-slate-700 shadow transition hover:bg-primary hover:text-white\"><i class=\"mdi mdi-chevron-right rtl:rotate-180\"></i></button>\n  <div class=\"cities-pagination absolute bottom-0 left-1/2 z-10 -translate-x-1/2\"></div>\n</div>\n" }]
    }], null, { destinationId: [{
            type: Input
        }], cities: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DestinationCitiesCarousel, { className: "DestinationCitiesCarousel", filePath: "app/shared/components/destination-cities-carousel/destination-cities-carousel.ts", lineNumber: 15 }); })();
