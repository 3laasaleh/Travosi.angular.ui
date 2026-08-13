import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, map, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { environment } from '../../../../environments/environment';
import { ImageViewerModal } from '../../../shared/components/image-viewer-modal/image-viewer-modal';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { TourBookingCard } from './tour-detail/tour-booking-card/tour-booking-card';
import { TourDetail } from './tour-detail/tour-detail/tour-detail';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3];
function HomeTourPage_Conditional_1_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 7);
} }
function HomeTourPage_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 0);
    i0.ɵɵelement(1, "div", 3);
    i0.ɵɵelementStart(2, "div", 4);
    i0.ɵɵelement(3, "div", 5);
    i0.ɵɵelementStart(4, "div", 6);
    i0.ɵɵrepeaterCreate(5, HomeTourPage_Conditional_1_For_6_Template, 1, 0, "div", 7, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function HomeTourPage_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 1)(1, "div");
    i0.ɵɵelement(2, "i", 8);
    i0.ɵɵelementStart(3, "h1", 9);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 10);
    i0.ɵɵelement(7, "i", 11);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 2, ctx_r0.errorMessage));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 4, "back"), " ");
} }
function HomeTourPage_Conditional_3_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.tour.titleAr ?? ctx_r0.tour.nameAr);
} }
function HomeTourPage_Conditional_3_Conditional_16_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵlistener("click", function HomeTourPage_Conditional_3_Conditional_16_Conditional_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.previousImage()); });
    i0.ɵɵelement(3, "i", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 32);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵlistener("click", function HomeTourPage_Conditional_3_Conditional_16_Conditional_7_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.nextImage()); });
    i0.ɵɵelement(7, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 34);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 6, "previous"));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 8, "previous"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(5, 10, "next"));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 12, "next"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2(" ", ctx_r0.selectedImageIndex + 1, " / ", ctx_r0.images.length, " ");
} }
function HomeTourPage_Conditional_3_Conditional_16_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function HomeTourPage_Conditional_3_Conditional_16_Conditional_8_For_2_Template_button_click_0_listener() { const ɵ$index_96_r5 = i0.ɵɵrestoreView(_r4).$index; const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.selectImage(ɵ$index_96_r5)); });
    i0.ɵɵelement(1, "img", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r6 = ctx.$implicit;
    const ɵ$index_96_r5 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("border-primary", ɵ$index_96_r5 === ctx_r0.selectedImageIndex)("border-transparent", ɵ$index_96_r5 !== ctx_r0.selectedImageIndex);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.imageUrl(image_r6), i0.ɵɵsanitizeUrl)("alt", ctx_r0.title);
} }
function HomeTourPage_Conditional_3_Conditional_16_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵrepeaterCreate(1, HomeTourPage_Conditional_3_Conditional_16_Conditional_8_For_2_Template, 2, 6, "button", 35, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.images);
} }
function HomeTourPage_Conditional_3_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 25)(2, "img", 26);
    i0.ɵɵlistener("click", function HomeTourPage_Conditional_3_Conditional_16_Template_img_click_2_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openImageViewer()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 27);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵlistener("click", function HomeTourPage_Conditional_3_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openImageViewer()); });
    i0.ɵɵelement(6, "i", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, HomeTourPage_Conditional_3_Conditional_16_Conditional_7_Template, 10, 14);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, HomeTourPage_Conditional_3_Conditional_16_Conditional_8_Template, 3, 0, "div", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r0.imageUrl(ctx_r0.images[ctx_r0.selectedImageIndex]), i0.ɵɵsanitizeUrl)("alt", ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(4, 6, "view"));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(5, 8, "view"));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.images.length > 1 ? 7 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.images.length > 1 ? 8 : -1);
} }
function HomeTourPage_Conditional_3_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "app-itinerary-timeline", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("items", ctx_r0.itinerary);
} }
function HomeTourPage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 12);
    i0.ɵɵelement(1, "div", 13);
    i0.ɵɵelementStart(2, "div", 14)(3, "a", 15);
    i0.ɵɵelement(4, "i", 11);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 16);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h1", 17);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, HomeTourPage_Conditional_3_Conditional_12_Template, 2, 1, "p", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "main", 19)(14, "div", 20)(15, "section");
    i0.ɵɵconditionalCreate(16, HomeTourPage_Conditional_3_Conditional_16_Template, 9, 10, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 22);
    i0.ɵɵelement(18, "app-tour-detail", 23);
    i0.ɵɵelementStart(19, "aside");
    i0.ɵɵelement(20, "app-tour-booking-card", 23);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(21, HomeTourPage_Conditional_3_Conditional_21_Template, 2, 1, "div", 24);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r0.imageUrl(ctx_r0.images[0]) + ")");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 10, "home"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 12, "tour"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tour.titleAr ?? ctx_r0.tour.nameAr ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.images.length ? 16 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("tour", ctx_r0.tour);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("tour", ctx_r0.tour);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.itinerary.length ? 21 : -1);
} }
function HomeTourPage_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-image-viewer-modal", 39);
    i0.ɵɵtwoWayListener("selectedIndexChange", function HomeTourPage_Conditional_4_Template_app_image_viewer_modal_selectedIndexChange_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.selectedImageIndex, $event) || (ctx_r0.selectedImageIndex = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("closed", function HomeTourPage_Conditional_4_Template_app_image_viewer_modal_closed_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeImageViewer()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("images", ctx_r0.resolvedImages)("title", ctx_r0.title);
    i0.ɵɵtwoWayProperty("selectedIndex", ctx_r0.selectedImageIndex);
} }
export class HomeTourPage {
    route = inject(ActivatedRoute);
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    tour = null;
    isLoading = true;
    errorMessage = '';
    selectedImageIndex = 0;
    imageViewerOpen = false;
    get images() {
        const cover = this.tour?.coverImageUrl ??
            this.tour?.imageUrl ??
            this.tour?.coverImage ??
            null;
        const gallery = Array.isArray(this.tour?.images) ? this.tour.images : [];
        if (!cover)
            return gallery;
        const coverIndex = gallery.findIndex((image) => this.imageMatchesCover(image, cover));
        if (coverIndex < 0)
            return [cover, ...gallery];
        return [gallery[coverIndex], ...gallery.filter((_, index) => index !== coverIndex)];
    }
    get destinationId() {
        const id = this.tour?.destinationId ?? this.tour?.destination?.id;
        return id === null || id === undefined ? null : Number(id);
    }
    get resolvedImages() {
        return this.images.map((image) => this.imageUrl(image));
    }
    get itinerary() {
        const value = this.tour?.itinerary
            ?? this.tour?.Itinerary
            ?? this.tour?.itineraries
            ?? this.tour?.tourItinerary
            ?? this.tour?.itinerarySteps;
        return Array.isArray(value) ? value : [];
    }
    get title() {
        return (this.tour?.titleEng ??
            this.tour?.nameEng ??
            this.tour?.title ??
            this.tour?.name ??
            '');
    }
    ngOnInit() {
        this.route.paramMap
            .pipe(map((params) => Number(params.get('id'))), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe((tourId) => {
            if (!Number.isFinite(tourId) || tourId <= 0) {
                this.tour = null;
                this.isLoading = false;
                this.errorMessage = 'tourNotFound';
                this.cdr.markForCheck();
                return;
            }
            this.loadTour(tourId);
        });
    }
    selectImage(index) {
        if (index < 0 || index >= this.images.length)
            return;
        this.selectedImageIndex = index;
    }
    previousImage() {
        const imageCount = this.images.length;
        if (imageCount < 2)
            return;
        this.selectedImageIndex = (this.selectedImageIndex - 1 + imageCount) % imageCount;
    }
    nextImage() {
        const imageCount = this.images.length;
        if (imageCount < 2)
            return;
        this.selectedImageIndex = (this.selectedImageIndex + 1) % imageCount;
    }
    openImageViewer() {
        if (this.images.length)
            this.imageViewerOpen = true;
    }
    closeImageViewer() {
        this.imageViewerOpen = false;
    }
    imageUrl(source) {
        const url = typeof source === 'string'
            ? source
            : (source?.imageUrl ?? source?.url ?? source?.path ?? '');
        if (!url)
            return 'assets/images/bg/3.jpg';
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
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
    loadTour(tourId) {
        this.isLoading = true;
        this.errorMessage = '';
        this.tour = null;
        this.selectedImageIndex = 0;
        this.imageViewerOpen = false;
        this.tourRequest(tourId)
            .pipe(finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((tour) => {
            this.tour = tour;
            if (!tour)
                this.errorMessage = 'tourNotFound';
        });
    }
    tourRequest(tourId) {
        return this.apiService.getUnauthntecated(`Tours/${tourId}`).pipe(map((response) => this.extractEntity(response, 'tour')), catchError(() => this.apiService.getUnauthntecated('Tours?page=1&pageSize=100').pipe(map((response) => this.extractCollection(response, ['tours']).find((tour) => Number(tour?.id ?? tour?.tourId) === Number(tourId)) ?? null), catchError(() => of(null)))));
    }
    extractEntity(response, key) {
        if (response?.isSuccess === false)
            return null;
        const data = response && Object.prototype.hasOwnProperty.call(response, 'data')
            ? response.data
            : response;
        return data?.[key] ?? data;
    }
    extractCollection(response, keys) {
        const data = response?.data ?? response;
        const rows = data?.data ??
            data?.items ??
            keys.map((key) => data?.[key]).find((value) => Array.isArray(value)) ??
            data;
        return Array.isArray(rows) ? rows : [];
    }
    static ɵfac = function HomeTourPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeTourPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeTourPage, selectors: [["app-home-tour-page"]], decls: 6, vars: 2, consts: [["aria-busy", "true", 1, "container", "py-16", "md:py-24"], [1, "container", "grid", "min-h-[70vh]", "place-items-center", "py-24", "text-center"], [3, "images", "title", "selectedIndex"], [1, "mb-8", "h-10", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "gap-4", "md:grid-cols-[1fr_220px]"], [1, "aspect-[16/9]", "animate-pulse", "rounded-2xl", "bg-slate-200"], [1, "grid", "gap-3"], [1, "h-32", "animate-pulse", "rounded-xl", "bg-slate-200"], [1, "mdi", "mdi-compass-off-outline", "text-7xl", "text-slate-300"], [1, "mt-4", "text-3xl", "font-semibold"], ["routerLink", "/home", 1, "mt-6", "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2.5", "font-semibold", "text-white"], [1, "mdi", "mdi-arrow-left", "rtl:rotate-180"], [1, "relative", "flex", "min-h-[360px]", "items-end", "bg-cover", "bg-center", "bg-no-repeat", "py-14"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-950", "via-slate-950/65", "to-slate-900/25"], [1, "container", "relative", "text-white"], ["routerLink", "/home", 1, "mb-5", "inline-flex", "items-center", "gap-2", "text-sm", "font-semibold", "text-white/75", "hover:text-white"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-3", "max-w-4xl", "text-4xl", "font-semibold", "md:text-5xl"], ["dir", "rtl", 1, "mt-3", "text-2xl", "text-white/75"], [1, "py-16", "md:py-24"], [1, "container"], [1, "mx-auto", "max-w-6xl"], [1, "grid", "gap-8", "lg:grid-cols-[minmax(0,1fr)_360px]"], [3, "tour"], [1, "mt-12"], [1, "group", "relative", "mx-auto", "overflow-hidden", "rounded-2xl", "bg-slate-100", "shadow-sm"], [1, "aspect-[16/9]", "max-h-[620px]", "w-full", "cursor-zoom-in", "object-cover", "transition-opacity", "duration-300", 3, "click", "src", "alt"], ["type", "button", 1, "absolute", "end-4", "top-4", "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-white/40", "bg-slate-950/55", "text-xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", 3, "click", "title"], [1, "mdi", "mdi-fullscreen"], [1, "mt-4", "flex", "justify-center", "gap-3", "overflow-x-auto", "pb-2"], ["type", "button", 1, "absolute", "start-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/40", "bg-slate-950/55", "text-2xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", 3, "click", "title"], [1, "mdi", "mdi-chevron-left", "rtl:rotate-180"], ["type", "button", 1, "absolute", "end-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/40", "bg-slate-950/55", "text-2xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", 3, "click", "title"], [1, "mdi", "mdi-chevron-right", "rtl:rotate-180"], [1, "absolute", "bottom-4", "end-4", "rounded-full", "bg-slate-950/60", "px-3", "py-1", "text-xs", "font-semibold", "text-white", "backdrop-blur-sm"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", "transition", 3, "border-primary", "border-transparent"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", "transition", 3, "click"], [1, "h-24", "w-36", "object-cover", "sm:h-28", "sm:w-44", 3, "src", "alt"], [3, "items"], [3, "selectedIndexChange", "closed", "images", "title", "selectedIndex"]], template: function HomeTourPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵconditionalCreate(1, HomeTourPage_Conditional_1_Template, 7, 1, "main", 0)(2, HomeTourPage_Conditional_2_Template, 10, 6, "main", 1)(3, HomeTourPage_Conditional_3_Template, 22, 14);
            i0.ɵɵconditionalCreate(4, HomeTourPage_Conditional_4_Template, 1, 3, "app-image-viewer-modal", 2);
            i0.ɵɵelement(5, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 1 : ctx.errorMessage ? 2 : 3);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.imageViewerOpen ? 4 : -1);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, TourDetail, TourBookingCard, ItineraryTimeline, ImageViewerModal, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeTourPage, [{
        type: Component,
        args: [{ selector: 'app-home-tour-page', standalone: true, imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, TourDetail, TourBookingCard, ItineraryTimeline, ImageViewerModal], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\r\n\r\n@if (isLoading) {\r\n  <main class=\"container py-16 md:py-24\" aria-busy=\"true\">\r\n    <div class=\"mb-8 h-10 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\r\n    <div class=\"grid gap-4 md:grid-cols-[1fr_220px]\">\r\n      <div class=\"aspect-[16/9] animate-pulse rounded-2xl bg-slate-200\"></div>\r\n      <div class=\"grid gap-3\">\r\n        @for (image of [1,2,3]; track image) {\r\n          <div class=\"h-32 animate-pulse rounded-xl bg-slate-200\"></div>\r\n        }\r\n      </div>\r\n    </div>\r\n  </main>\r\n} @else if (errorMessage) {\r\n  <main class=\"container grid min-h-[70vh] place-items-center py-24 text-center\">\r\n    <div>\r\n      <i class=\"mdi mdi-compass-off-outline text-7xl text-slate-300\"></i>\r\n      <h1 class=\"mt-4 text-3xl font-semibold\">{{ errorMessage | translate }}</h1>\r\n      <a routerLink=\"/home\" class=\"mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-white\">\r\n        <i class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>\r\n        {{ 'back' | translate }}\r\n      </a>\r\n    </div>\r\n  </main>\r\n} @else {\r\n  <section\r\n    class=\"relative flex min-h-[360px] items-end bg-cover bg-center bg-no-repeat py-14\"\r\n    [style.background-image]=\"'url(' + imageUrl(images[0]) + ')'\"\r\n  >\r\n    <div class=\"absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/25\"></div>\r\n    <div class=\"container relative text-white\">\r\n        <a routerLink=\"/home\" class=\"mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white\">\r\n          <i class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>\r\n          {{ 'home' | translate }}\r\n        </a>\r\n      <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'tour' | translate }}</p>\r\n      <h1 class=\"mt-3 max-w-4xl text-4xl font-semibold md:text-5xl\">{{ title }}</h1>\r\n      @if (tour.titleAr ?? tour.nameAr) {\r\n        <p dir=\"rtl\" class=\"mt-3 text-2xl text-white/75\">{{ tour.titleAr ?? tour.nameAr }}</p>\r\n      }\r\n    </div>\r\n  </section>\r\n\r\n  <main class=\"py-16 md:py-24\">\r\n    <div class=\"container\">\r\n      <section>\r\n        @if (images.length) {\r\n          <div class=\"mx-auto max-w-6xl\">\r\n            <div class=\"group relative mx-auto overflow-hidden rounded-2xl bg-slate-100 shadow-sm\">\r\n              <img\r\n                [src]=\"imageUrl(images[selectedImageIndex])\"\r\n                [alt]=\"title\"\r\n                class=\"aspect-[16/9] max-h-[620px] w-full cursor-zoom-in object-cover transition-opacity duration-300\"\r\n                (click)=\"openImageViewer()\"\r\n              />\r\n              <button\r\n                type=\"button\"\r\n                class=\"absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-slate-950/55 text-xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white\"\r\n                [attr.aria-label]=\"'view' | translate\"\r\n                [title]=\"'view' | translate\"\r\n                (click)=\"openImageViewer()\"\r\n              >\r\n                <i class=\"mdi mdi-fullscreen\"></i>\r\n              </button>\r\n              @if (images.length > 1) {\r\n                <button\r\n                  type=\"button\"\r\n                  (click)=\"previousImage()\"\r\n                  [attr.aria-label]=\"'previous' | translate\"\r\n                  [title]=\"'previous' | translate\"\r\n                  class=\"absolute start-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-950/55 text-2xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white\"\r\n                >\r\n                  <i class=\"mdi mdi-chevron-left rtl:rotate-180\"></i>\r\n                </button>\r\n                <button\r\n                  type=\"button\"\r\n                  (click)=\"nextImage()\"\r\n                  [attr.aria-label]=\"'next' | translate\"\r\n                  [title]=\"'next' | translate\"\r\n                  class=\"absolute end-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-950/55 text-2xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white\"\r\n                >\r\n                  <i class=\"mdi mdi-chevron-right rtl:rotate-180\"></i>\r\n                </button>\r\n                <span class=\"absolute bottom-4 end-4 rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm\">\r\n                  {{ selectedImageIndex + 1 }} / {{ images.length }}\r\n                </span>\r\n              }\r\n            </div>\r\n            @if (images.length > 1) {\r\n              <div class=\"mt-4 flex justify-center gap-3 overflow-x-auto pb-2\">\r\n                @for (image of images; track $index; let index = $index) {\r\n                  <button\r\n                    type=\"button\"\r\n                    class=\"shrink-0 overflow-hidden rounded-xl border-2 transition\"\r\n                    [class.border-primary]=\"index === selectedImageIndex\"\r\n                    [class.border-transparent]=\"index !== selectedImageIndex\"\r\n                    (click)=\"selectImage(index)\"\r\n                  >\r\n                    <img [src]=\"imageUrl(image)\" [alt]=\"title\" class=\"h-24 w-36 object-cover sm:h-28 sm:w-44\" />\r\n                  </button>\r\n                }\r\n              </div>\r\n            }\r\n          </div>\r\n        }\r\n      </section>\r\n\r\n      <div class=\"grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]\">\r\n        <app-tour-detail [tour]=\"tour\" />\r\n        <aside>\r\n          <app-tour-booking-card [tour]=\"tour\" />\r\n        </aside>\r\n      </div>\r\n      @if (itinerary.length) {\r\n        <div class=\"mt-12\">\r\n          <app-itinerary-timeline [items]=\"itinerary\" />\r\n        </div>\r\n      }\r\n    </div>\r\n  </main>\r\n}\r\n\r\n@if (imageViewerOpen) {\r\n  <app-image-viewer-modal\r\n    [images]=\"resolvedImages\"\r\n    [title]=\"title\"\r\n    [(selectedIndex)]=\"selectedImageIndex\"\r\n    (closed)=\"closeImageViewer()\"\r\n  />\r\n}\r\n\r\n<app-footer-one />\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeTourPage, { className: "HomeTourPage", filePath: "app/features/home/tour-page/tour-page.ts", lineNumber: 29 }); })();
