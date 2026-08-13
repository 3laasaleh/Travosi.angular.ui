import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
const _c0 = (a0, a1) => ["/destinations", a0, "cities", a1];
const _forTrack0 = ($index, $item) => $item.id;
function DestinationCitiesGrid_For_2_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const city_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(city_r1.nameAr);
} }
function DestinationCitiesGrid_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 1);
    i0.ɵɵelement(1, "img", 2);
    i0.ɵɵelementStart(2, "div", 3)(3, "h3", 4);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, DestinationCitiesGrid_For_2_Conditional_5_Template, 2, 1, "p", 5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const city_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction2(5, _c0, ctx_r1.destinationId, city_r1.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.cityImage(city_r1), i0.ɵɵsanitizeUrl)("alt", ctx_r1.cityName(city_r1));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.cityName(city_r1));
    i0.ɵɵadvance();
    i0.ɵɵconditional(city_r1.nameAr ? 5 : -1);
} }
export class DestinationCitiesGrid {
    translate = inject(TranslateService);
    destinationId;
    cities = [];
    cityName(city) { return this.isArabic ? city?.nameAr ?? city?.nameEng ?? city?.name ?? '' : city?.nameEng ?? city?.nameAr ?? city?.name ?? ''; }
    get isArabic() { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
    cityImage(city) { const raw = city?.coverImageUrl ?? city?.imageUrl ?? city?.images?.[0]?.imageUrl ?? ''; return !raw ? 'assets/images/bg/2.jpg' : /^(blob:|data:|https?:\/\/)/i.test(raw) ? raw : `${environment.imageUrl}${String(raw).replace(/^\/+/, '')}`; }
    static ɵfac = function DestinationCitiesGrid_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DestinationCitiesGrid)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DestinationCitiesGrid, selectors: [["app-destination-cities-grid"]], inputs: { destinationId: "destinationId", cities: "cities" }, decls: 3, vars: 0, consts: [[1, "grid", "gap-5", "sm:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-5"], [1, "group", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "hover:-translate-y-1", "hover:border-primary/40", "hover:shadow-lg", 3, "routerLink"], [1, "aspect-[4/3]", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "p-4"], [1, "font-semibold", "group-hover:text-primary"], ["dir", "rtl", 1, "mt-1", "text-xs", "text-slate-500"]], template: function DestinationCitiesGrid_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, DestinationCitiesGrid_For_2_Template, 6, 8, "a", 1, _forTrack0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.cities);
        } }, dependencies: [RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DestinationCitiesGrid, [{
        type: Component,
        args: [{ selector: 'app-destination-cities-grid', standalone: true, imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5\">\n  @for (city of cities; track city.id) {\n    <a [routerLink]=\"['/destinations', destinationId, 'cities', city.id]\" class=\"group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg\">\n      <img [src]=\"cityImage(city)\" [alt]=\"cityName(city)\" class=\"aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105\" />\n      <div class=\"p-4\"><h3 class=\"font-semibold group-hover:text-primary\">{{ cityName(city) }}</h3>@if (city.nameAr) { <p dir=\"rtl\" class=\"mt-1 text-xs text-slate-500\">{{ city.nameAr }}</p> }</div>\n    </a>\n  }\n</div>\n" }]
    }], null, { destinationId: [{
            type: Input
        }], cities: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DestinationCitiesGrid, { className: "DestinationCitiesGrid", filePath: "app/shared/components/destination-cities-grid/destination-cities-grid.ts", lineNumber: 7 }); })();
