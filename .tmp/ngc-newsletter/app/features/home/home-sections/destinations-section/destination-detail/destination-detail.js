import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, forkJoin, map, of } from 'rxjs';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from '../../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../../core/services/currency.service';
import { FooterOne } from '../../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../../layout/home-navbar/home-navbar';
import { ImageViewerModal } from '../../../../../shared/components/image-viewer-modal/image-viewer-modal';
import { DestinationCitiesCarousel } from '../../../../../shared/components/destination-cities-carousel/destination-cities-carousel';
import { formatHomePrice } from '../../../home-price.util';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4];
const _c1 = a0 => ({ count: a0 });
const _c2 = a0 => ["/tours", a0];
const _forTrack0 = ($index, $item) => $item.id ?? $item.tourId;
function HomeDestinationDetail_Conditional_1_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "div", 8);
    i0.ɵɵelementStart(2, "div", 9);
    i0.ɵɵelement(3, "div", 10)(4, "div", 11);
    i0.ɵɵelementEnd()();
} }
function HomeDestinationDetail_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "section", 2);
    i0.ɵɵelementStart(1, "section", 3)(2, "div", 4);
    i0.ɵɵelement(3, "div", 5);
    i0.ɵɵelementStart(4, "div", 6);
    i0.ɵɵrepeaterCreate(5, HomeDestinationDetail_Conditional_1_For_6_Template, 5, 0, "div", 7, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
} }
function HomeDestinationDetail_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 0)(1, "div");
    i0.ɵɵelement(2, "i", 12);
    i0.ɵɵelementStart(3, "h1", 13);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 14);
    i0.ɵɵelement(7, "i", 15);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 2, ctx_r0.errorMessage));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 4, "backToDestinations"), " ");
} }
function HomeDestinationDetail_Conditional_3_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.destination.nameAr);
} }
function HomeDestinationDetail_Conditional_3_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.destination.subDescription);
} }
function HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 48);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵlistener("click", function HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.previousImage()); });
    i0.ɵɵelement(3, "i", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 50);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵlistener("click", function HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_6_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.nextImage()); });
    i0.ɵɵelement(7, "i", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 52);
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
function HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_7_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 54);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_7_For_2_Template_button_click_0_listener() { const ɵ$index_119_r5 = i0.ɵɵrestoreView(_r4).$index; const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.selectImage(ɵ$index_119_r5)); });
    i0.ɵɵelement(2, "img", 55);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r6 = ctx.$implicit;
    const ɵ$index_119_r5 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("border-primary", ɵ$index_119_r5 === ctx_r0.selectedImageIndex)("border-transparent", ɵ$index_119_r5 !== ctx_r0.selectedImageIndex);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 7, "view") + " " + (ɵ$index_119_r5 + 1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r0.imageUrl(image_r6), i0.ɵɵsanitizeUrl)("alt", ctx_r0.destination.nameEng ?? ctx_r0.destination.name);
} }
function HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵrepeaterCreate(1, HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_7_For_2_Template, 3, 9, "button", 53, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.images);
} }
function HomeDestinationDetail_Conditional_3_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 43)(1, "img", 44);
    i0.ɵɵlistener("click", function HomeDestinationDetail_Conditional_3_Conditional_25_Template_img_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openImageViewer()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "button", 45);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵlistener("click", function HomeDestinationDetail_Conditional_3_Conditional_25_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openImageViewer()); });
    i0.ɵɵelement(5, "i", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_6_Template, 10, 14);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, HomeDestinationDetail_Conditional_3_Conditional_25_Conditional_7_Template, 3, 0, "div", 47);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.imageUrl(ctx_r0.images[ctx_r0.selectedImageIndex]), i0.ɵɵsanitizeUrl)("alt", ctx_r0.destination.nameEng ?? ctx_r0.destination.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(3, 6, "view"));
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(4, 8, "view"));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r0.images.length > 1 ? 6 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.images.length > 1 ? 7 : -1);
} }
function HomeDestinationDetail_Conditional_3_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 56);
    i0.ɵɵelement(2, "i", 57);
    i0.ɵɵelementEnd()();
} }
function HomeDestinationDetail_Conditional_3_Conditional_37_For_4_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 67);
    i0.ɵɵelement(1, "i", 76);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tour_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.tourDestinationName(tour_r7), " ");
} }
function HomeDestinationDetail_Conditional_3_Conditional_37_For_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 70);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tour_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tour_r7.subDescription ?? tour_r7.description);
} }
function HomeDestinationDetail_Conditional_3_Conditional_37_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "a", 64)(2, "div", 65);
    i0.ɵɵelement(3, "img", 66);
    i0.ɵɵconditionalCreate(4, HomeDestinationDetail_Conditional_3_Conditional_37_For_4_Conditional_4_Template, 3, 1, "span", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 68)(6, "h3", 69);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, HomeDestinationDetail_Conditional_3_Conditional_37_For_4_Conditional_8_Template, 2, 1, "p", 70);
    i0.ɵɵelementStart(9, "div", 71)(10, "div", 72)(11, "strong", 73);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 74);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelement(16, "i", 75);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const tour_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(10, _c2, tour_r7.id ?? tour_r7.tourId));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r0.tourImage(tour_r7), i0.ɵɵsanitizeUrl)("alt", ctx_r0.tourTitle(tour_r7));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourDestinationName(tour_r7) ? 4 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.tourTitle(tour_r7));
    i0.ɵɵadvance();
    i0.ɵɵconditional(tour_r7.subDescription ?? tour_r7.description ? 8 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.formattedTourPrice(tour_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(15, 8, "bookNow"), " ");
} }
function HomeDestinationDetail_Conditional_3_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35)(1, "div", 58)(2, "div", 59);
    i0.ɵɵrepeaterCreate(3, HomeDestinationDetail_Conditional_3_Conditional_37_For_4_Template, 17, 12, "div", 60, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 61);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelement(7, "i", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 62);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelement(10, "i", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "div", 63);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.tours);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(6, 2, "previous"));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(9, 4, "next"));
} }
function HomeDestinationDetail_Conditional_3_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div");
    i0.ɵɵelement(2, "i", 77);
    i0.ɵɵelementStart(3, "p", 78);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, "noToursForDestination"));
} }
function HomeDestinationDetail_Conditional_3_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 37)(1, "p", 79);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.destination.description, " ");
} }
function HomeDestinationDetail_Conditional_3_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-destination-cities-carousel", 41);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("destinationId", ctx_r0.destination.id)("cities", ctx_r0.cities);
} }
function HomeDestinationDetail_Conditional_3_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵelement(1, "i", 80);
    i0.ɵɵelementStart(2, "p", 78);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "noCitiesForDestination"));
} }
function HomeDestinationDetail_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 16);
    i0.ɵɵelement(1, "div", 17);
    i0.ɵɵelementStart(2, "div", 18)(3, "a", 19);
    i0.ɵɵelement(4, "i", 15);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 20)(8, "p", 21);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h1", 22);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(13, HomeDestinationDetail_Conditional_3_Conditional_13_Template, 2, 1, "p", 23);
    i0.ɵɵconditionalCreate(14, HomeDestinationDetail_Conditional_3_Conditional_14_Template, 2, 1, "p", 24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "main", 3)(16, "div", 4)(17, "section", 25)(18, "div", 26)(19, "div", 27)(20, "p", 28);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "h2", 29);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(25, HomeDestinationDetail_Conditional_3_Conditional_25_Template, 8, 10)(26, HomeDestinationDetail_Conditional_3_Conditional_26_Template, 3, 0, "div", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "aside", 31)(28, "div", 32)(29, "div")(30, "p", 28);
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "span", 33);
    i0.ɵɵelement(34, "i", 34);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(37, HomeDestinationDetail_Conditional_3_Conditional_37_Template, 12, 6, "div", 35)(38, HomeDestinationDetail_Conditional_3_Conditional_38_Template, 6, 3, "div", 36);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(39, HomeDestinationDetail_Conditional_3_Conditional_39_Template, 3, 1, "section", 37);
    i0.ɵɵelementStart(40, "section", 38)(41, "div", 39)(42, "div")(43, "p", 28);
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p", 40);
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(49, HomeDestinationDetail_Conditional_3_Conditional_49_Template, 1, 2, "app-destination-cities-carousel", 41)(50, HomeDestinationDetail_Conditional_3_Conditional_50_Template, 5, 3, "div", 42);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r0.destinationImage() + ")");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 17, "backToDestinations"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 19, "destination"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.destination.nameEng ?? ctx_r0.destination.name, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destination.nameAr ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destination.subDescription ? 14 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 21, "destination"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.destination.nameEng ?? ctx_r0.destination.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.images.length ? 25 : 26);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(32, 23, "tours"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(36, 25, "tourCount", i0.ɵɵpureFunction1(32, _c1, ctx_r0.tours.length)), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.tours.length ? 37 : 38);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.destination.description ? 39 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(45, 28, "cities"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(48, 30, "citiesBrowseHint"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.cities.length ? 49 : 50);
} }
function HomeDestinationDetail_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-image-viewer-modal", 81);
    i0.ɵɵtwoWayListener("selectedIndexChange", function HomeDestinationDetail_Conditional_4_Template_app_image_viewer_modal_selectedIndexChange_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.selectedImageIndex, $event) || (ctx_r0.selectedImageIndex = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("closed", function HomeDestinationDetail_Conditional_4_Template_app_image_viewer_modal_closed_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeImageViewer()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("images", ctx_r0.resolvedImages)("title", ctx_r0.destination.nameEng ?? ctx_r0.destination.name);
    i0.ɵɵtwoWayProperty("selectedIndex", ctx_r0.selectedImageIndex);
} }
export class HomeDestinationDetail {
    route = inject(ActivatedRoute);
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    currencyService = inject(CurrencyService);
    destination = null;
    tours = [];
    cities = [];
    isLoading = true;
    errorMessage = '';
    selectedImageIndex = 0;
    imageViewerOpen = false;
    tourCarousel = null;
    viewInitialized = false;
    get images() {
        if (Array.isArray(this.destination?.images) && this.destination.images.length) {
            return this.destination.images;
        }
        const fallback = this.destination?.coverImageUrl ?? this.destination?.imageUrl;
        return fallback ? [fallback] : [];
    }
    get resolvedImages() {
        return this.images.map((image) => this.imageUrl(image));
    }
    ngOnInit() {
        this.route.paramMap
            .pipe(map((params) => Number(params.get('id'))), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe((destinationId) => {
            if (!Number.isFinite(destinationId) || destinationId <= 0) {
                this.destination = null;
                this.tours = [];
                this.cities = [];
                this.isLoading = false;
                this.errorMessage = 'destinationNotFound';
                this.cdr.markForCheck();
                return;
            }
            this.loadDestination(destinationId);
        });
    }
    ngAfterViewInit() {
        this.viewInitialized = true;
        this.initializeTourCarousel();
    }
    ngOnDestroy() {
        this.tourCarousel?.destroy(true, true);
    }
    imageUrl(source, fallback = 'assets/images/bg/2.jpg') {
        const url = typeof source === 'string'
            ? source
            : (source?.imageUrl ?? source?.url ?? source?.path ?? '');
        if (!url)
            return fallback;
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
    }
    destinationImage() {
        return this.imageUrl(this.images[0]);
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
    tourImage(tour) {
        const image = Array.isArray(tour?.images) ? tour.images[0] : null;
        return this.imageUrl(tour?.coverImageUrl ?? image ?? tour?.imageUrl, 'assets/images/bg/3.jpg');
    }
    tourTitle(tour) {
        return tour?.titleEng ?? tour?.nameEng ?? tour?.title ?? tour?.name ?? '';
    }
    formattedTourPrice(tour) {
        return formatHomePrice(this.currencyService, tour?.pricePerPerson ?? tour?.price, tour);
    }
    tourDestinationName(tour) {
        return (tour?.destinationName ??
            tour?.destination?.nameEng ??
            this.destination?.nameEng ??
            this.destination?.name ??
            '');
    }
    loadDestination(destinationId) {
        this.tourCarousel?.destroy(true, true);
        this.tourCarousel = null;
        this.isLoading = true;
        this.errorMessage = '';
        this.destination = null;
        this.tours = [];
        this.cities = [];
        this.selectedImageIndex = 0;
        this.imageViewerOpen = false;
        forkJoin({
            destination: this.destinationRequest(destinationId),
            tours: this.apiService
                .getUnauthntecated(`Tours?page=1&pageSize=100&destinationId=${destinationId}`)
                .pipe(catchError(() => of(null))),
            cities: this.apiService
                .getUnauthntecated(`Cities?destinationId=${destinationId}&page=1&pageSize=10`)
                .pipe(catchError(() => of(null))),
        })
            .pipe(finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe(({ destination, tours, cities }) => {
            this.destination = destination;
            if (!destination) {
                this.errorMessage = 'destinationNotFound';
                return;
            }
            const apiTours = this.extractCollection(tours, ['tours']);
            const nestedTours = Array.isArray(destination?.tours) ? destination.tours : [];
            const hasDestinationIds = apiTours.some((tour) => this.resolveDestinationId(tour) !== null);
            const matchingTours = hasDestinationIds
                ? apiTours.filter((tour) => Number(this.resolveDestinationId(tour)) === Number(destinationId))
                : apiTours;
            this.tours = matchingTours.length ? matchingTours : nestedTours;
            this.cities = this.extractCollection(cities, ['cities']).slice(0, 10);
            this.cdr.markForCheck();
            setTimeout(() => this.initializeTourCarousel());
        });
    }
    initializeTourCarousel() {
        if (!this.viewInitialized)
            return;
        this.tourCarousel?.destroy(true, true);
        this.tourCarousel = null;
        const carousel = document.querySelector('#destination-tours-carousel .swiper');
        if (!carousel || !this.tours.length)
            return;
        this.tourCarousel = new Swiper(carousel, {
            modules: [Autoplay, Navigation, Pagination],
            slidesPerView: 1,
            spaceBetween: 18,
            watchOverflow: true,
            loop: this.tours.length > 1,
            autoplay: this.tours.length > 1
                ? {
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }
                : false,
            navigation: {
                nextEl: '#destination-tours-carousel .tours-next',
                prevEl: '#destination-tours-carousel .tours-prev',
            },
            pagination: {
                el: '#destination-tours-carousel .tours-pagination',
                clickable: true,
            },
        });
    }
    destinationRequest(destinationId) {
        return this.apiService.getUnauthntecated(`destinations/${destinationId}`).pipe(map((response) => this.extractEntity(response, 'destination')), catchError(() => this.apiService.getUnauthntecated('destinations?page=1&pageSize=100').pipe(map((response) => this.extractCollection(response, ['destinations']).find((destination) => Number(destination?.id ?? destination?.destinationId) === Number(destinationId)) ?? null), catchError(() => of(null)))));
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
    resolveDestinationId(tour) {
        const id = tour?.destinationId ?? tour?.destination?.id ?? tour?.destination?.destinationId;
        return id === null || id === undefined || id === '' ? null : Number(id);
    }
    static ɵfac = function HomeDestinationDetail_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeDestinationDetail)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeDestinationDetail, selectors: [["app-home-destination-detail"]], decls: 6, vars: 2, consts: [[1, "container", "grid", "min-h-[60vh]", "place-items-center", "py-24", "text-center"], [3, "images", "title", "selectedIndex"], [1, "relative", "min-h-[420px]", "animate-pulse", "bg-slate-300"], [1, "py-16", "md:py-24"], [1, "container"], [1, "mb-10", "h-8", "w-64", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "gap-6", "md:grid-cols-2", "lg:grid-cols-4"], [1, "overflow-hidden", "rounded-xl", "border", "border-slate-200"], [1, "aspect-[4/3]", "animate-pulse", "bg-slate-200"], [1, "space-y-3", "p-4"], [1, "h-4", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-5", "w-3/4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "mdi", "mdi-map-marker-off-outline", "text-7xl", "text-slate-300"], [1, "mt-4", "text-3xl", "font-semibold"], ["routerLink", "/destinations", 1, "mt-6", "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2.5", "font-semibold", "text-white"], [1, "mdi", "mdi-arrow-left", "rtl:rotate-180"], [1, "relative", "flex", "min-h-[480px]", "items-end", "bg-cover", "bg-center", "bg-no-repeat", "py-16"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-950", "via-slate-950/60", "to-slate-900/15"], [1, "container", "relative", "text-white"], ["routerLink", "/destinations", 1, "mb-5", "inline-flex", "items-center", "gap-2", "text-sm", "font-semibold", "text-white/75", "hover:text-white"], [1, "max-w-3xl"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-3", "text-4xl", "font-semibold", "md:text-6xl"], ["dir", "rtl", 1, "mt-3", "text-2xl", "text-white/75"], [1, "mt-5", "max-w-2xl", "text-lg", "leading-8", "text-white/85"], [1, "mb-16", "grid", "items-start", "gap-8", "lg:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)]", "xl:gap-12"], [1, "min-w-0"], [1, "mb-6"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "mt-2", "text-3xl", "font-semibold"], [1, "grid", "aspect-[16/10]", "place-items-center", "rounded-3xl", "border", "border-dashed", "border-slate-300", "bg-slate-50", "text-slate-400", "dark:border-slate-700"], [1, "min-w-0", "lg:sticky", "lg:top-24"], [1, "mb-6", "flex", "items-end", "justify-between", "gap-4"], [1, "inline-flex", "shrink-0", "items-center", "gap-2", "rounded-full", "bg-primary/10", "px-3", "py-1.5", "text-sm", "font-bold", "text-primary"], ["aria-hidden", "true", 1, "mdi", "mdi-map-marker-path"], ["id", "destination-tours-carousel", 1, "relative"], [1, "grid", "min-h-80", "place-items-center", "rounded-3xl", "border", "border-dashed", "border-slate-300", "bg-slate-50", "p-8", "text-center", "text-slate-500", "dark:border-slate-700"], [1, "mx-auto", "mb-16", "max-w-4xl"], [1, "mb-16"], [1, "mb-8"], [1, "mt-2", "text-sm", "text-slate-500"], [3, "destinationId", "cities"], [1, "rounded-2xl", "border", "border-dashed", "border-slate-300", "p-8", "text-center", "text-slate-500"], [1, "relative", "overflow-hidden", "rounded-3xl", "bg-slate-100", "shadow-sm"], [1, "aspect-[16/10]", "max-h-[620px]", "w-full", "cursor-zoom-in", "object-cover", "transition-opacity", "duration-300", 3, "click", "src", "alt"], ["type", "button", 1, "absolute", "end-4", "top-4", "grid", "h-10", "w-10", "place-items-center", "rounded-full", "border", "border-white/40", "bg-slate-950/55", "text-xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", 3, "click", "title"], [1, "mdi", "mdi-fullscreen"], [1, "mt-4", "flex", "gap-3", "overflow-x-auto", "pb-2"], ["type", "button", 1, "absolute", "start-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/40", "bg-slate-950/55", "text-2xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", 3, "click", "title"], [1, "mdi", "mdi-chevron-left", "rtl:rotate-180"], ["type", "button", 1, "absolute", "end-4", "top-1/2", "grid", "h-11", "w-11", "-translate-y-1/2", "place-items-center", "rounded-full", "border", "border-white/40", "bg-slate-950/55", "text-2xl", "text-white", "shadow-lg", "backdrop-blur-sm", "transition", "hover:bg-primary", "focus:outline-none", "focus:ring-2", "focus:ring-white", 3, "click", "title"], [1, "mdi", "mdi-chevron-right", "rtl:rotate-180"], [1, "absolute", "bottom-4", "end-4", "rounded-full", "bg-slate-950/60", "px-3", "py-1", "text-xs", "font-semibold", "text-white", "backdrop-blur-sm"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", "transition", 3, "border-primary", "border-transparent"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-xl", "border-2", "transition", 3, "click"], [1, "h-24", "w-36", "object-cover", "sm:h-28", "sm:w-44", 3, "src", "alt"], [1, "text-center"], [1, "mdi", "mdi-image-off-outline", "text-5xl"], [1, "swiper", "overflow-hidden"], [1, "swiper-wrapper"], [1, "swiper-slide", "h-auto", "pb-12"], ["type", "button", 1, "tours-prev", "absolute", "start-3", "top-[38%]", "z-10", "grid", "h-10", "w-10", "place-items-center", "rounded-full", "bg-white/95", "text-xl", "text-slate-700", "shadow", "transition", "hover:bg-primary", "hover:text-white", "disabled:opacity-40"], ["type", "button", 1, "tours-next", "absolute", "end-3", "top-[38%]", "z-10", "grid", "h-10", "w-10", "place-items-center", "rounded-full", "bg-white/95", "text-xl", "text-slate-700", "shadow", "transition", "hover:bg-primary", "hover:text-white", "disabled:opacity-40"], [1, "tours-pagination", "absolute", "bottom-2", "left-1/2", "z-10", "-translate-x-1/2"], [1, "group", "flex", "h-full", "flex-col", "overflow-hidden", "rounded-3xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "duration-300", "hover:border-primary/40", "hover:shadow-lg", "dark:border-slate-800", 3, "routerLink"], [1, "relative", "overflow-hidden"], ["loading", "lazy", 1, "aspect-[16/10]", "w-full", "object-cover", "transition", "duration-500", "group-hover:scale-105", 3, "src", "alt"], [1, "absolute", "start-3", "top-3", "rounded-full", "bg-white/90", "px-3", "py-1", "text-xs", "font-semibold", "text-slate-700", "shadow-sm", "backdrop-blur", "/90"], [1, "flex", "flex-1", "flex-col", "p-5"], [1, "line-clamp-2", "text-xl", "font-semibold", "transition", "group-hover:text-primary"], [1, "mt-2", "line-clamp-2", "text-sm", "leading-6", "text-slate-500"], [1, "mt-auto", "pt-5"], [1, "flex", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4", "dark:border-slate-800"], [1, "text-lg", "text-primary"], [1, "text-sm", "font-semibold", "text-slate-900", "transition", "group-hover:text-primary"], [1, "mdi", "mdi-calendar-check-outline", "ms-1"], [1, "mdi", "mdi-map-marker-outline", "me-1", "text-primary"], [1, "mdi", "mdi-compass-off-outline", "text-5xl", "text-slate-300"], [1, "mt-3"], [1, "whitespace-pre-line", "text-base", "leading-8", "text-slate-600"], [1, "mdi", "mdi-city-variant-outline", "text-4xl", "text-slate-300"], [3, "selectedIndexChange", "closed", "images", "title", "selectedIndex"]], template: function HomeDestinationDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵconditionalCreate(1, HomeDestinationDetail_Conditional_1_Template, 7, 1)(2, HomeDestinationDetail_Conditional_2_Template, 10, 6, "main", 0)(3, HomeDestinationDetail_Conditional_3_Template, 51, 34);
            i0.ɵɵconditionalCreate(4, HomeDestinationDetail_Conditional_4_Template, 1, 3, "app-image-viewer-modal", 1);
            i0.ɵɵelement(5, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 1 : ctx.errorMessage ? 2 : 3);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.imageViewerOpen ? 4 : -1);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, ImageViewerModal, DestinationCitiesCarousel, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeDestinationDetail, [{
        type: Component,
        args: [{ selector: 'app-home-destination-detail', standalone: true, imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, ImageViewerModal, DestinationCitiesCarousel], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\n\n@if (isLoading) {\n  <section class=\"relative min-h-[420px] animate-pulse bg-slate-300\"></section>\n  <section class=\"py-16 md:py-24\">\n    <div class=\"container\">\n      <div class=\"mb-10 h-8 w-64 animate-pulse rounded-full bg-slate-200\"></div>\n      <div class=\"grid gap-6 md:grid-cols-2 lg:grid-cols-4\">\n        @for (card of [1,2,3,4]; track card) {\n          <div class=\"overflow-hidden rounded-xl border border-slate-200\">\n            <div class=\"aspect-[4/3] animate-pulse bg-slate-200\"></div>\n            <div class=\"space-y-3 p-4\">\n              <div class=\"h-4 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-5 w-3/4 animate-pulse rounded-full bg-slate-200\"></div>\n            </div>\n          </div>\n        }\n      </div>\n    </div>\n  </section>\n} @else if (errorMessage) {\n  <main class=\"container grid min-h-[60vh] place-items-center py-24 text-center\">\n    <div>\n      <i class=\"mdi mdi-map-marker-off-outline text-7xl text-slate-300\"></i>\n      <h1 class=\"mt-4 text-3xl font-semibold\">{{ errorMessage | translate }}</h1>\n      <a routerLink=\"/destinations\" class=\"mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-white\">\n        <i class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>\n        {{ 'backToDestinations' | translate }}\n      </a>\n    </div>\n  </main>\n} @else {\n  <section\n    class=\"relative flex min-h-[480px] items-end bg-cover bg-center bg-no-repeat py-16\"\n    [style.background-image]=\"'url(' + destinationImage() + ')'\"\n  >\n    <div class=\"absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/15\"></div>\n    <div class=\"container relative text-white\">\n      <a routerLink=\"/destinations\" class=\"mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white\">\n        <i class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>\n        {{ 'backToDestinations' | translate }}\n      </a>\n      <div class=\"max-w-3xl\">\n        <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'destination' | translate }}</p>\n        <h1 class=\"mt-3 text-4xl font-semibold md:text-6xl\">\n          {{ destination.nameEng ?? destination.name }}\n        </h1>\n        @if (destination.nameAr) {\n          <p dir=\"rtl\" class=\"mt-3 text-2xl text-white/75\">{{ destination.nameAr }}</p>\n        }\n        @if (destination.subDescription) {\n          <p class=\"mt-5 max-w-2xl text-lg leading-8 text-white/85\">{{ destination.subDescription }}</p>\n        }\n      </div>\n    </div>\n  </section>\n\n  <main class=\"py-16 md:py-24\">\n    <div class=\"container\">\n      <section class=\"mb-16 grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)] xl:gap-12\">\n        <div class=\"min-w-0\">\n          <div class=\"mb-6\">\n            <p class=\"text-sm font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'destination' | translate }}</p>\n            <h2 class=\"mt-2 text-3xl font-semibold\">{{ destination.nameEng ?? destination.name }}</h2>\n          </div>\n\n          @if (images.length) {\n            <div class=\"relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm \">\n              <img\n                [src]=\"imageUrl(images[selectedImageIndex])\"\n                [alt]=\"destination.nameEng ?? destination.name\"\n                class=\"aspect-[16/10] max-h-[620px] w-full cursor-zoom-in object-cover transition-opacity duration-300\"\n                (click)=\"openImageViewer()\"\n              />\n              <button\n                type=\"button\"\n                class=\"absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-slate-950/55 text-xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white\"\n                [attr.aria-label]=\"'view' | translate\"\n                [title]=\"'view' | translate\"\n                (click)=\"openImageViewer()\"\n              >\n                <i class=\"mdi mdi-fullscreen\"></i>\n              </button>\n              @if (images.length > 1) {\n                <button\n                  type=\"button\"\n                  (click)=\"previousImage()\"\n                  [attr.aria-label]=\"'previous' | translate\"\n                  [title]=\"'previous' | translate\"\n                  class=\"absolute start-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-950/55 text-2xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white\"\n                >\n                  <i class=\"mdi mdi-chevron-left rtl:rotate-180\"></i>\n                </button>\n                <button\n                  type=\"button\"\n                  (click)=\"nextImage()\"\n                  [attr.aria-label]=\"'next' | translate\"\n                  [title]=\"'next' | translate\"\n                  class=\"absolute end-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-slate-950/55 text-2xl text-white shadow-lg backdrop-blur-sm transition hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white\"\n                >\n                  <i class=\"mdi mdi-chevron-right rtl:rotate-180\"></i>\n                </button>\n                <span class=\"absolute bottom-4 end-4 rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm\">\n                  {{ selectedImageIndex + 1 }} / {{ images.length }}\n                </span>\n              }\n            </div>\n\n            @if (images.length > 1) {\n              <div class=\"mt-4 flex gap-3 overflow-x-auto pb-2\">\n                @for (image of images; track $index; let imageIndex = $index) {\n                  <button\n                    type=\"button\"\n                    class=\"shrink-0 overflow-hidden rounded-xl border-2 transition\"\n                    [class.border-primary]=\"imageIndex === selectedImageIndex\"\n                    [class.border-transparent]=\"imageIndex !== selectedImageIndex\"\n                    [attr.aria-label]=\"('view' | translate) + ' ' + (imageIndex + 1)\"\n                    (click)=\"selectImage(imageIndex)\"\n                  >\n                    <img\n                      [src]=\"imageUrl(image)\"\n                      [alt]=\"destination.nameEng ?? destination.name\"\n                      class=\"h-24 w-36 object-cover sm:h-28 sm:w-44\"\n                    />\n                  </button>\n                }\n              </div>\n            }\n          } @else {\n            <div class=\"grid aspect-[16/10] place-items-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 dark:border-slate-700 \">\n              <div class=\"text-center\"><i class=\"mdi mdi-image-off-outline text-5xl\"></i></div>\n            </div>\n          }\n        </div>\n\n        <aside class=\"min-w-0 lg:sticky lg:top-24\">\n          <div class=\"mb-6 flex items-end justify-between gap-4\">\n            <div>\n              <p class=\"text-sm font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'tours' | translate }}</p>\n            </div>\n            <span class=\"inline-flex shrink-0 items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary\">\n              <i class=\"mdi mdi-map-marker-path\" aria-hidden=\"true\"></i>\n              {{ 'tourCount' | translate:{ count: tours.length } }}\n            </span>\n          </div>\n\n          @if (tours.length) {\n            <div id=\"destination-tours-carousel\" class=\"relative\">\n              <div class=\"swiper overflow-hidden\">\n                <div class=\"swiper-wrapper\">\n                  @for (tour of tours; track tour.id ?? tour.tourId) {\n                    <div class=\"swiper-slide h-auto pb-12\">\n                      <a\n                        [routerLink]=\"['/tours', tour.id ?? tour.tourId]\"\n                        class=\"group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-primary/40 hover:shadow-lg dark:border-slate-800 \"\n                      >\n                        <div class=\"relative overflow-hidden\">\n                          <img\n                            [src]=\"tourImage(tour)\"\n                            [alt]=\"tourTitle(tour)\"\n                            loading=\"lazy\"\n                            class=\"aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105\"\n                          />\n                          @if (tourDestinationName(tour)) {\n                            <span class=\"absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur /90 \">\n                              <i class=\"mdi mdi-map-marker-outline me-1 text-primary\"></i>{{ tourDestinationName(tour) }}\n                            </span>\n                          }\n                        </div>\n                        <div class=\"flex flex-1 flex-col p-5\">\n                          <h3 class=\"line-clamp-2 text-xl font-semibold transition group-hover:text-primary\">{{ tourTitle(tour) }}</h3>\n                          @if (tour.subDescription ?? tour.description) {\n                            <p class=\"mt-2 line-clamp-2 text-sm leading-6 text-slate-500\">{{ tour.subDescription ?? tour.description }}</p>\n                          }\n                          <div class=\"mt-auto pt-5\">\n                            <div class=\"flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800\">\n                              <strong class=\"text-lg text-primary\">{{ formattedTourPrice(tour) }}</strong>\n                              <span class=\"text-sm font-semibold text-slate-900 transition group-hover:text-primary\">\n                                {{ 'bookNow' | translate }} <i class=\"mdi mdi-calendar-check-outline ms-1\"></i>\n                              </span>\n                            </div>\n                          </div>\n                        </div>\n                      </a>\n                    </div>\n                  }\n                </div>\n              </div>\n              <button type=\"button\" class=\"tours-prev absolute start-3 top-[38%] z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-xl text-slate-700 shadow transition hover:bg-primary hover:text-white disabled:opacity-40  \" [attr.aria-label]=\"'previous' | translate\">\n                <i class=\"mdi mdi-chevron-left rtl:rotate-180\"></i>\n              </button>\n              <button type=\"button\" class=\"tours-next absolute end-3 top-[38%] z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-xl text-slate-700 shadow transition hover:bg-primary hover:text-white disabled:opacity-40  \" [attr.aria-label]=\"'next' | translate\">\n                <i class=\"mdi mdi-chevron-right rtl:rotate-180\"></i>\n              </button>\n              <div class=\"tours-pagination absolute bottom-2 left-1/2 z-10 -translate-x-1/2\"></div>\n            </div>\n          } @else {\n            <div class=\"grid min-h-80 place-items-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 dark:border-slate-700 \">\n              <div><i class=\"mdi mdi-compass-off-outline text-5xl text-slate-300\"></i><p class=\"mt-3\">{{ 'noToursForDestination' | translate }}</p></div>\n            </div>\n          }\n        </aside>\n      </section>\n\n      @if (destination.description) {\n        <section class=\"mx-auto mb-16 max-w-4xl\">\n          <p class=\"whitespace-pre-line text-base leading-8 text-slate-600 \">\n            {{ destination.description }}\n          </p>\n        </section>\n      }\n\n      <section class=\"mb-16\">\n        <div class=\"mb-8\">\n          <div>\n            <p class=\"text-sm font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'cities' | translate }}</p>\n            <p class=\"mt-2 text-sm text-slate-500\">{{ 'citiesBrowseHint' | translate }}</p>\n          </div>\n        </div>\n        @if (cities.length) {\n          <app-destination-cities-carousel [destinationId]=\"destination.id\" [cities]=\"cities\" />\n        } @else {\n          <div class=\"rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500\"><i class=\"mdi mdi-city-variant-outline text-4xl text-slate-300\"></i><p class=\"mt-3\">{{ 'noCitiesForDestination' | translate }}</p></div>\n        }\n      </section>\n\n    </div>\n  </main>\n}\n\n@if (imageViewerOpen) {\n  <app-image-viewer-modal\n    [images]=\"resolvedImages\"\n    [title]=\"destination.nameEng ?? destination.name\"\n    [(selectedIndex)]=\"selectedImageIndex\"\n    (closed)=\"closeImageViewer()\"\n  />\n}\n\n<app-footer-one />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeDestinationDetail, { className: "HomeDestinationDetail", filePath: "app/features/home/home-sections/destinations-section/destination-detail/destination-detail.ts", lineNumber: 33 }); })();
