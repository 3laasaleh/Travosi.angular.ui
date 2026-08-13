import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, finalize, map, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { CurrencyService } from '../../../core/services/currency.service';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { environment } from '../../../../environments/environment';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';
import { TourBookingCard } from '../tour-page/tour-detail/tour-booking-card/tour-booking-card';
import { formatHomePrice } from '../home-price.util';
import * as i0 from "@angular/core";
const _c0 = a0 => ["/tours", a0];
const _c1 = a0 => ["/destinations", a0];
const _forTrack0 = ($index, $item) => $item.id ?? $item.tourId;
function HomePackagePage_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 0);
    i0.ɵɵelement(1, "div", 2)(2, "div", 3);
    i0.ɵɵelementEnd();
} }
function HomePackagePage_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 1)(1, "div");
    i0.ɵɵelement(2, "i", 4);
    i0.ɵɵelementStart(3, "h1", 5);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "a", 6);
    i0.ɵɵelement(7, "i", 7);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 2, ctx_r0.errorMessage));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 4, "backToHome"));
} }
function HomePackagePage_Conditional_3_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵelement(1, "i", 60);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.destinationName);
} }
function HomePackagePage_Conditional_3_Conditional_15_Conditional_3_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 65);
    i0.ɵɵlistener("click", function HomePackagePage_Conditional_3_Conditional_15_Conditional_3_For_2_Template_button_click_0_listener() { const ɵ$index_67_r3 = i0.ɵɵrestoreView(_r2).$index; const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.selectImage(ɵ$index_67_r3)); });
    i0.ɵɵelement(1, "img", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r4 = ctx.$implicit;
    const ɵ$index_67_r3 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("border-primary", ɵ$index_67_r3 === ctx_r0.selectedImageIndex)("border-transparent", ɵ$index_67_r3 !== ctx_r0.selectedImageIndex);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.imageUrl(image_r4), i0.ɵɵsanitizeUrl)("alt", ctx_r0.title);
} }
function HomePackagePage_Conditional_3_Conditional_15_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵrepeaterCreate(1, HomePackagePage_Conditional_3_Conditional_15_Conditional_3_For_2_Template, 2, 6, "button", 64, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.images);
} }
function HomePackagePage_Conditional_3_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 17)(1, "div", 61);
    i0.ɵɵelement(2, "img", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, HomePackagePage_Conditional_3_Conditional_15_Conditional_3_Template, 3, 0, "div", 63);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r0.imageUrl(ctx_r0.images[ctx_r0.selectedImageIndex]), i0.ɵɵsanitizeUrl)("alt", ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.images.length > 1 ? 3 : -1);
} }
function HomePackagePage_Conditional_3_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵelement(1, "i", 67);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.destinationName);
} }
function HomePackagePage_Conditional_3_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate2(" \u00B7 ", ctx_r0.durationHours, " ", i0.ɵɵpipeBind1(1, 2, "hours"), " ");
} }
function HomePackagePage_Conditional_3_Conditional_72_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵelement(1, "i", 73);
    i0.ɵɵelementStart(2, "span", 74);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const highlight_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.itemText(highlight_r5));
} }
function HomePackagePage_Conditional_3_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 44)(1, "div", 37)(2, "span", 68);
    i0.ɵɵelement(3, "i", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2", 70);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 71);
    i0.ɵɵrepeaterCreate(8, HomePackagePage_Conditional_3_Conditional_72_For_9_Template, 4, 1, "div", 72, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 1, "packageHighlights"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.highlights);
} }
function HomePackagePage_Conditional_3_Conditional_73_For_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 80);
    i0.ɵɵelement(1, "i", 85);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.itemText(item_r6));
} }
function HomePackagePage_Conditional_3_Conditional_73_ForEmpty_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 81);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noTourIncludesAdded"));
} }
function HomePackagePage_Conditional_3_Conditional_73_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 80);
    i0.ɵɵelement(1, "i", 86);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.itemText(item_r7));
} }
function HomePackagePage_Conditional_3_Conditional_73_ForEmpty_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 81);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noTourExcludesAdded"));
} }
function HomePackagePage_Conditional_3_Conditional_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 36)(1, "h2", 70);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 75)(5, "div", 76)(6, "h3", 77);
    i0.ɵɵelement(7, "i", 78);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "ul", 79);
    i0.ɵɵrepeaterCreate(11, HomePackagePage_Conditional_3_Conditional_73_For_12_Template, 3, 1, "li", 80, i0.ɵɵrepeaterTrackByIndex, false, HomePackagePage_Conditional_3_Conditional_73_ForEmpty_13_Template, 3, 3, "li", 81);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 82)(15, "h3", 83);
    i0.ɵɵelement(16, "i", 84);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "ul", 79);
    i0.ɵɵrepeaterCreate(20, HomePackagePage_Conditional_3_Conditional_73_For_21_Template, 3, 1, "li", 80, i0.ɵɵrepeaterTrackByIndex, false, HomePackagePage_Conditional_3_Conditional_73_ForEmpty_22_Template, 3, 3, "li", 81);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 5, "whatsIncludedExcluded"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 7, "included"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.includedItems);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 9, "excluded"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.excludedItems);
} }
function HomePackagePage_Conditional_3_Conditional_74_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 88)(1, "p", 89);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3", 90);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 91);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelement(9, "i", 92);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tour_r8 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c0, tour_r8.id ?? tour_r8.tourId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, "tour"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.tourTitle(tour_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(8, 6, "viewDetails"), " ");
} }
function HomePackagePage_Conditional_3_Conditional_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section")(1, "h2", 70);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 87);
    i0.ɵɵrepeaterCreate(5, HomePackagePage_Conditional_3_Conditional_74_For_6_Template, 10, 10, "a", 88, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "toursInPackage"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.tours);
} }
function HomePackagePage_Conditional_3_Conditional_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53)(1, "dt", 54);
    i0.ɵɵelement(2, "i", 60);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "dd", 93);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(4, 2, "destination"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.destinationName);
} }
function HomePackagePage_Conditional_3_Conditional_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 58);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelement(3, "i", 92);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(4, _c1, ctx_r0.destinationId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, "viewDestination"), " ");
} }
function HomePackagePage_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 8);
    i0.ɵɵelement(1, "div", 9);
    i0.ɵɵelementStart(2, "div", 10)(3, "a", 11);
    i0.ɵɵelement(4, "i", 7);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 12);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h1", 13);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, HomePackagePage_Conditional_3_Conditional_12_Template, 3, 1, "p", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "main", 15)(14, "div", 16);
    i0.ɵɵconditionalCreate(15, HomePackagePage_Conditional_3_Conditional_15_Template, 4, 3, "section", 17);
    i0.ɵɵelementStart(16, "div", 18)(17, "div", 19)(18, "section", 20)(19, "div", 21)(20, "span", 22);
    i0.ɵɵelement(21, "i", 23);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "h2", 24);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(26, HomePackagePage_Conditional_3_Conditional_26_Template, 3, 1, "p", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 26)(28, "div", 27)(29, "span", 28);
    i0.ɵɵelement(30, "i", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div")(32, "p", 30);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "p", 31);
    i0.ɵɵtext(36);
    i0.ɵɵpipe(37, "translate");
    i0.ɵɵconditionalCreate(38, HomePackagePage_Conditional_3_Conditional_38_Template, 2, 4);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "div", 27)(40, "span", 28);
    i0.ɵɵelement(41, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div")(43, "p", 30);
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p", 31);
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(49, "div", 33)(50, "span", 28);
    i0.ɵɵelement(51, "i", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div")(53, "p", 30);
    i0.ɵɵtext(54);
    i0.ɵɵpipe(55, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "p", 35);
    i0.ɵɵtext(57);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(58, "section", 36)(59, "div", 37)(60, "span", 38);
    i0.ɵɵelement(61, "i", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div")(63, "p", 40);
    i0.ɵɵtext(64);
    i0.ɵɵpipe(65, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "h2", 41);
    i0.ɵɵtext(67);
    i0.ɵɵpipe(68, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(69, "p", 42);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(71, "app-itinerary-timeline", 43);
    i0.ɵɵconditionalCreate(72, HomePackagePage_Conditional_3_Conditional_72_Template, 10, 3, "section", 44);
    i0.ɵɵconditionalCreate(73, HomePackagePage_Conditional_3_Conditional_73_Template, 23, 11, "section", 36);
    i0.ɵɵconditionalCreate(74, HomePackagePage_Conditional_3_Conditional_74_Template, 7, 3, "section");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "aside", 45)(76, "div", 46)(77, "p", 47);
    i0.ɵɵtext(78);
    i0.ɵɵpipe(79, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "div", 48)(81, "strong", 49);
    i0.ɵɵtext(82);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "span", 50);
    i0.ɵɵtext(84);
    i0.ɵɵpipe(85, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(86, "div", 51);
    i0.ɵɵelementStart(87, "dl", 52)(88, "div", 53)(89, "dt", 54);
    i0.ɵɵelement(90, "i", 55);
    i0.ɵɵtext(91);
    i0.ɵɵpipe(92, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "dd", 56);
    i0.ɵɵtext(94);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(95, HomePackagePage_Conditional_3_Conditional_95_Template, 7, 4, "div", 53);
    i0.ɵɵelementStart(96, "div", 53)(97, "dt", 54);
    i0.ɵɵelement(98, "i", 57);
    i0.ɵɵtext(99);
    i0.ɵɵpipe(100, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(101, "dd", 56);
    i0.ɵɵtext(102);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(103, HomePackagePage_Conditional_3_Conditional_103_Template, 4, 6, "a", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(104, "app-tour-booking-card", 59);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r0.imageUrl(ctx_r0.images[0]) + ")");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 36, "backToHome"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 38, "travelPackage"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destinationName ? 12 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.images.length ? 15 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 40, "travelPackage"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destinationName ? 26 : -1);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 42, "duration"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.duration, " ", i0.ɵɵpipeBind1(37, 44, "days"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.durationHours ? 38 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(45, 46, "groupSize"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.groupSize, " ", i0.ɵɵpipeBind1(48, 48, "people"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(55, 50, "pricePerPerson"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.formattedPrice);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(65, 52, "travelPackage"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(68, 54, "packageOverview"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("items", ctx_r0.itinerary);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.highlights.length ? 72 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.includedItems.length || ctx_r0.excludedItems.length ? 73 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tours.length ? 74 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(79, 56, "packageSummary"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.formattedPrice);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("/ ", i0.ɵɵpipeBind1(85, 58, "person"));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(92, 60, "duration"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.duration);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destinationName ? 95 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(100, 62, "itinerarySteps"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.itinerary.length);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destinationId ? 103 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("travelPackage", ctx_r0.travelPackage);
} }
export class HomePackagePage {
    route = inject(ActivatedRoute);
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    translate = inject(TranslateService);
    currencyService = inject(CurrencyService);
    travelPackage = null;
    isLoading = true;
    errorMessage = '';
    selectedImageIndex = 0;
    get title() {
        const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
        return arabic
            ? (this.travelPackage?.nameAr ?? this.travelPackage?.titleAr ?? this.travelPackage?.nameEng ?? this.travelPackage?.titleEng ?? this.travelPackage?.name ?? this.travelPackage?.title ?? '')
            : (this.travelPackage?.nameEng ?? this.travelPackage?.titleEng ?? this.travelPackage?.name ?? this.travelPackage?.title ?? this.travelPackage?.nameAr ?? this.travelPackage?.titleAr ?? '');
    }
    get description() {
        const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
        return arabic
            ? (this.travelPackage?.descriptionAr ?? this.travelPackage?.fullDescriptionAr ?? this.travelPackage?.description ?? this.travelPackage?.fullDescription ?? this.travelPackage?.subDescription ?? '')
            : (this.travelPackage?.descriptionEng ?? this.travelPackage?.fullDescriptionEng ?? this.travelPackage?.fullDescription ?? this.travelPackage?.description ?? this.travelPackage?.subDescription ?? '');
    }
    get images() {
        if (Array.isArray(this.travelPackage?.images) && this.travelPackage.images.length)
            return this.travelPackage.images;
        const fallback = this.travelPackage?.coverImageUrl ?? this.travelPackage?.imageUrl;
        return fallback ? [fallback] : [];
    }
    get itinerary() {
        const value = this.travelPackage?.itinerary ?? this.travelPackage?.itineraries ?? this.travelPackage?.packageItinerary;
        return Array.isArray(value) ? value : [];
    }
    get highlights() {
        return Array.isArray(this.travelPackage?.highlights) ? this.travelPackage.highlights : [];
    }
    get includes() {
        return Array.isArray(this.travelPackage?.includes) ? this.travelPackage.includes : [];
    }
    get includedItems() {
        return this.includes.filter((item) => item?.isIncluded !== false);
    }
    get excludedItems() {
        const excludes = Array.isArray(this.travelPackage?.excludes) ? this.travelPackage.excludes : [];
        return excludes.length ? excludes : this.includes.filter((item) => item?.isIncluded === false);
    }
    get tours() {
        return Array.isArray(this.travelPackage?.tours) ? this.travelPackage.tours : [];
    }
    get destinationId() {
        const id = this.travelPackage?.destinationId ?? this.travelPackage?.destination?.id ?? this.travelPackage?.destinations?.[0]?.destinationId;
        const parsed = Number(id);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    }
    get destinationName() {
        return this.travelPackage?.destinationName ?? this.travelPackage?.destination?.nameEng ?? this.travelPackage?.destination?.name ?? this.travelPackage?.destinations?.[0]?.destinationName ?? '';
    }
    get formattedPrice() {
        return formatHomePrice(this.currencyService, this.travelPackage?.pricePerPerson ?? this.travelPackage?.price, this.travelPackage);
    }
    get duration() {
        const days = this.travelPackage?.durationDays ?? this.travelPackage?.days;
        const duration = this.travelPackage?.duration;
        return days ? `${days}` : (duration ? String(duration) : '-');
    }
    get durationHours() {
        return Number(this.travelPackage?.durationHours ?? 0);
    }
    get groupSize() {
        return Number(this.travelPackage?.maxCapacity ?? this.travelPackage?.maxSeats ?? 0);
    }
    ngOnInit() {
        this.route.paramMap.pipe(map((params) => Number(params.get('id'))), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe((packageId) => {
            if (!Number.isFinite(packageId) || packageId <= 0) {
                this.isLoading = false;
                this.errorMessage = 'packageNotFound';
                this.cdr.markForCheck();
                return;
            }
            this.loadPackage(packageId);
        });
    }
    selectImage(index) {
        if (index >= 0 && index < this.images.length)
            this.selectedImageIndex = index;
    }
    imageUrl(source) {
        const url = typeof source === 'string' ? source : (source?.imageUrl ?? source?.url ?? source?.path ?? '');
        if (!url)
            return 'assets/images/bg/2.jpg';
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    itemText(item) {
        return typeof item === 'string' ? item : (item?.value ?? item?.text ?? item?.title ?? item?.name ?? '');
    }
    tourTitle(tour) {
        const arabic = this.translate.currentLang()?.toLowerCase().startsWith('ar');
        return arabic
            ? (tour?.titleAr ?? tour?.nameAr ?? tour?.titleEng ?? tour?.nameEng ?? tour?.title ?? tour?.name ?? '')
            : (tour?.titleEng ?? tour?.nameEng ?? tour?.title ?? tour?.name ?? tour?.titleAr ?? tour?.nameAr ?? '');
    }
    loadPackage(packageId) {
        this.isLoading = true;
        this.errorMessage = '';
        this.travelPackage = null;
        this.selectedImageIndex = 0;
        this.packageRequest(packageId).pipe(finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef)).subscribe((travelPackage) => {
            this.travelPackage = travelPackage;
            if (!travelPackage)
                this.errorMessage = 'packageNotFound';
        });
    }
    packageRequest(packageId) {
        return this.apiService.getUnauthntecated(`Packages/${packageId}`).pipe(map((response) => this.extractEntity(response, 'package')), catchError(() => this.apiService.getUnauthntecated('Packages?page=1&pageSize=100').pipe(map((response) => this.extractCollection(response, ['packages']).find((item) => Number(item?.id ?? item?.packageId) === packageId) ?? null), catchError(() => of(null)))));
    }
    extractEntity(response, key) {
        if (response?.isSuccess === false)
            return null;
        const data = response && Object.prototype.hasOwnProperty.call(response, 'data') ? response.data : response;
        return data?.[key] ?? data;
    }
    extractCollection(response, keys) {
        const data = response?.data ?? response;
        const rows = data?.data ?? data?.items ?? keys.map((key) => data?.[key]).find(Array.isArray) ?? data;
        return Array.isArray(rows) ? rows : [];
    }
    static ɵfac = function HomePackagePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomePackagePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomePackagePage, selectors: [["app-home-package-page"]], decls: 5, vars: 1, consts: [["aria-busy", "true", 1, "container", "py-20"], [1, "container", "grid", "min-h-[70vh]", "place-items-center", "py-24", "text-center"], [1, "h-12", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "mt-8", "aspect-[16/7]", "animate-pulse", "rounded-3xl", "bg-slate-200"], [1, "mdi", "mdi-package-variant-remove", "text-7xl", "text-slate-300"], [1, "mt-4", "text-3xl", "font-semibold"], ["routerLink", "/home", 1, "mt-6", "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2.5", "font-semibold", "text-white"], [1, "mdi", "mdi-arrow-left", "rtl:rotate-180"], [1, "relative", "flex", "min-h-[430px]", "items-end", "bg-cover", "bg-center", "py-16"], [1, "absolute", "inset-0", "bg-gradient-to-t", "from-slate-950", "via-slate-950/65", "to-slate-900/20"], [1, "container", "relative", "text-white"], ["routerLink", "/home", 1, "mb-5", "inline-flex", "items-center", "gap-2", "text-sm", "font-semibold", "text-white/75", "hover:text-white"], [1, "text-sm", "font-semibold", "uppercase", "tracking-[0.3em]", "text-primary"], [1, "mt-3", "max-w-4xl", "text-4xl", "font-semibold", "md:text-6xl"], [1, "mt-4", "flex", "items-center", "gap-2", "text-white/75"], [1, "py-16", "md:py-24"], [1, "container"], [1, "mx-auto", "mb-12", "max-w-6xl"], [1, "grid", "items-start", "gap-8", "lg:grid-cols-[minmax(0,1fr)_360px]"], [1, "space-y-8"], [1, "overflow-hidden", "rounded-3xl", "border", "border-slate-200", "bg-white", "shadow-sm"], [1, "bg-primary/5", "p-6", "sm:p-8"], [1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary/10", "px-3", "py-1", "text-xs", "font-bold", "uppercase", "tracking-[0.18em]", "text-primary"], [1, "mdi", "mdi-package-variant-closed"], [1, "mt-4", "text-2xl", "font-semibold", "text-slate-900", "sm:text-3xl"], [1, "mt-3", "flex", "items-center", "gap-2", "font-medium", "text-slate-500"], [1, "grid", "grid-cols-2", "divide-x", "divide-y", "divide-slate-100", "sm:grid-cols-3"], [1, "flex", "items-center", "gap-3", "p-4", "sm:p-5"], [1, "grid", "h-10", "w-10", "place-items-center", "rounded-xl", "bg-primary/10", "text-xl", "text-primary"], [1, "mdi", "mdi-clock-outline"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wide", "text-slate-400"], [1, "mt-1", "text-sm", "font-bold", "text-slate-800"], [1, "mdi", "mdi-account-group-outline"], [1, "col-span-2", "flex", "items-center", "gap-3", "p-4", "sm:col-span-1", "sm:p-5"], [1, "mdi", "mdi-wallet-outline"], [1, "mt-1", "text-lg", "font-bold", "text-primary"], [1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-6", "shadow-sm", "sm:p-8"], [1, "flex", "items-center", "gap-3"], [1, "grid", "h-11", "w-11", "place-items-center", "rounded-2xl", "bg-primary/10", "text-2xl", "text-primary"], [1, "mdi", "mdi-text-box-outline"], [1, "text-xs", "font-bold", "uppercase", "tracking-[0.2em]", "text-primary"], [1, "mt-1", "text-xl", "font-semibold", "text-slate-900"], [1, "mt-5", "whitespace-pre-line", "leading-8", "text-slate-600"], [3, "items"], [1, "rounded-3xl", "border", "border-primary/20", "bg-primary/5", "p-6", "shadow-sm", "sm:p-8"], [1, "space-y-5"], [1, "rounded-[2rem]", "border", "border-slate-200", "bg-slate-950", "p-6", "text-white", "shadow-xl"], [1, "text-xs", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "mt-4", "flex", "items-end", "gap-2"], [1, "text-4xl"], [1, "pb-1", "text-sm", "text-white/55"], [1, "my-6", "h-px", "bg-white/10"], [1, "space-y-4", "text-sm"], [1, "flex", "items-center", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-2", "text-white/55"], [1, "mdi", "mdi-clock-outline", "text-primary"], [1, "font-semibold"], [1, "mdi", "mdi-format-list-numbered", "text-primary"], [1, "mt-6", "flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-3", "font-semibold", "text-white", 3, "routerLink"], [3, "travelPackage"], [1, "mdi", "mdi-map-marker-outline", "text-primary"], [1, "overflow-hidden", "rounded-2xl", "bg-slate-100", "shadow-sm"], [1, "aspect-[16/9]", "max-h-[620px]", "w-full", "object-cover", 3, "src", "alt"], [1, "mt-4", "flex", "justify-center", "gap-3", "overflow-x-auto", "pb-2"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-2xl", "border-2", 3, "border-primary", "border-transparent"], ["type", "button", 1, "shrink-0", "overflow-hidden", "rounded-2xl", "border-2", 3, "click"], [1, "h-24", "w-36", "object-cover", "sm:h-28", "sm:w-44", 3, "src", "alt"], [1, "mdi", "mdi-map-marker-outline", "text-xl", "text-primary"], [1, "grid", "h-11", "w-11", "place-items-center", "rounded-2xl", "bg-primary", "text-2xl", "text-white"], [1, "mdi", "mdi-star-four-points-outline"], [1, "text-2xl", "font-semibold"], [1, "mt-5", "grid", "gap-3", "sm:grid-cols-2"], [1, "flex", "items-start", "gap-3", "rounded-2xl", "border", "border-primary/10", "bg-white", "p-4"], [1, "mdi", "mdi-check-circle", "text-xl", "text-primary"], [1, "text-sm", "leading-6", "text-slate-700"], [1, "mt-5", "grid", "gap-4", "md:grid-cols-2"], [1, "rounded-2xl", "bg-emerald-50", "p-5"], [1, "flex", "items-center", "gap-2", "font-bold", "text-emerald-700"], [1, "mdi", "mdi-check-circle", "text-xl"], [1, "mt-4", "space-y-3"], [1, "flex", "items-start", "gap-2", "text-sm", "leading-6", "text-slate-700"], [1, "text-sm", "text-slate-400"], [1, "rounded-2xl", "bg-rose-50", "p-5"], [1, "flex", "items-center", "gap-2", "font-bold", "text-rose-700"], [1, "mdi", "mdi-close-circle", "text-xl"], [1, "mdi", "mdi-check", "text-emerald-600"], [1, "mdi", "mdi-close", "text-rose-600"], [1, "mt-5", "grid", "gap-4", "sm:grid-cols-2"], [1, "group", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "shadow-sm", "transition", "hover:-translate-y-1", "hover:border-primary/30", "hover:shadow-lg", 3, "routerLink"], [1, "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-primary"], [1, "mt-2", "text-lg", "font-semibold", "group-hover:text-primary"], [1, "mt-4", "inline-flex", "items-center", "gap-1", "text-sm", "font-semibold", "text-primary"], [1, "mdi", "mdi-arrow-right", "rtl:rotate-180"], [1, "text-end", "font-semibold"]], template: function HomePackagePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-home-navbar");
            i0.ɵɵconditionalCreate(1, HomePackagePage_Conditional_1_Template, 3, 0, "main", 0)(2, HomePackagePage_Conditional_2_Template, 10, 6, "main", 1)(3, HomePackagePage_Conditional_3_Template, 105, 64);
            i0.ɵɵelement(4, "app-footer-one");
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 1 : ctx.errorMessage ? 2 : 3);
        } }, dependencies: [RouterLink, HomeNavbar, FooterOne, ItineraryTimeline, TourBookingCard, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomePackagePage, [{
        type: Component,
        args: [{ selector: 'app-home-package-page', standalone: true, imports: [RouterLink, TranslatePipe, HomeNavbar, FooterOne, ItineraryTimeline, TourBookingCard], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-home-navbar />\n\n@if (isLoading) {\n<main class=\"container py-20\" aria-busy=\"true\">\n  <div class=\"h-12 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\n  <div class=\"mt-8 aspect-[16/7] animate-pulse rounded-3xl bg-slate-200\"></div>\n</main>\n} @else if (errorMessage) {\n<main class=\"container grid min-h-[70vh] place-items-center py-24 text-center\">\n  <div><i class=\"mdi mdi-package-variant-remove text-7xl text-slate-300\"></i>\n    <h1 class=\"mt-4 text-3xl font-semibold\">{{ errorMessage | translate }}</h1><a routerLink=\"/home\"\n      class=\"mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-white\"><i\n        class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>{{ 'backToHome' | translate }}</a>\n  </div>\n</main>\n} @else {\n<section class=\"relative flex min-h-[430px] items-end bg-cover bg-center py-16\"\n  [style.background-image]=\"'url(' + imageUrl(images[0]) + ')'\">\n  <div class=\"absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/20\"></div>\n  <div class=\"container relative text-white\"><a routerLink=\"/home\"\n      class=\"mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white\"><i\n        class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>{{ 'backToHome' | translate }}</a>\n    <p class=\"text-sm font-semibold uppercase tracking-[0.3em] text-primary\">{{ 'travelPackage' | translate }}</p>\n    <h1 class=\"mt-3 max-w-4xl text-4xl font-semibold md:text-6xl\">{{ title }}</h1>@if (destinationName) { <p\n      class=\"mt-4 flex items-center gap-2 text-white/75\"><i class=\"mdi mdi-map-marker-outline text-primary\"></i>{{\n      destinationName }}</p> }\n  </div>\n</section>\n\n<main class=\"py-16 md:py-24\">\n  <div class=\"container\">\n    @if (images.length) { <section class=\"mx-auto mb-12 max-w-6xl\">\n      <div class=\"overflow-hidden rounded-2xl bg-slate-100 shadow-sm\"><img\n          [src]=\"imageUrl(images[selectedImageIndex])\" [alt]=\"title\"\n          class=\"aspect-[16/9] max-h-[620px] w-full object-cover\" /></div>@if (images.length > 1) { <div\n        class=\"mt-4 flex justify-center gap-3 overflow-x-auto pb-2\">@for (image of images; track\n        $index; let imageIndex = $index) { <button type=\"button\" class=\"shrink-0 overflow-hidden rounded-2xl border-2\"\n          [class.border-primary]=\"imageIndex === selectedImageIndex\"\n          [class.border-transparent]=\"imageIndex !== selectedImageIndex\" (click)=\"selectImage(imageIndex)\"><img\n            [src]=\"imageUrl(image)\" [alt]=\"title\" class=\"h-24 w-36 object-cover sm:h-28 sm:w-44\" /></button> }</div> }\n    </section> }\n\n    <div class=\"grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]\">\n      <div class=\"space-y-8\">\n        <section class=\"overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm\">\n          <div class=\"bg-primary/5 p-6 sm:p-8\">\n            <span class=\"inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary\"><i class=\"mdi mdi-package-variant-closed\"></i>{{ 'travelPackage' | translate }}</span>\n            <h2 class=\"mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl\">{{ title }}</h2>\n            @if (destinationName) { <p class=\"mt-3 flex items-center gap-2 font-medium text-slate-500\"><i class=\"mdi mdi-map-marker-outline text-xl text-primary\"></i>{{ destinationName }}</p> }\n          </div>\n          <div class=\"grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-3\">\n            <div class=\"flex items-center gap-3 p-4 sm:p-5\"><span class=\"grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-xl text-primary\"><i class=\"mdi mdi-clock-outline\"></i></span><div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'duration' | translate }}</p><p class=\"mt-1 text-sm font-bold text-slate-800\">{{ duration }} {{ 'days' | translate }} @if (durationHours) { \u00B7 {{ durationHours }} {{ 'hours' | translate }} }</p></div></div>\n            <div class=\"flex items-center gap-3 p-4 sm:p-5\"><span class=\"grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-xl text-primary\"><i class=\"mdi mdi-account-group-outline\"></i></span><div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'groupSize' | translate }}</p><p class=\"mt-1 text-sm font-bold text-slate-800\">{{ groupSize }} {{ 'people' | translate }}</p></div></div>\n            <div class=\"col-span-2 flex items-center gap-3 p-4 sm:col-span-1 sm:p-5\"><span class=\"grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-xl text-primary\"><i class=\"mdi mdi-wallet-outline\"></i></span><div><p class=\"text-xs font-semibold uppercase tracking-wide text-slate-400\">{{ 'pricePerPerson' | translate }}</p><p class=\"mt-1 text-lg font-bold text-primary\">{{ formattedPrice }}</p></div></div>\n          </div>\n        </section>\n\n        <section class=\"rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8\">\n          <div class=\"flex items-center gap-3\"><span class=\"grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-2xl text-primary\"><i class=\"mdi mdi-text-box-outline\"></i></span><div><p class=\"text-xs font-bold uppercase tracking-[0.2em] text-primary\">{{ 'travelPackage' | translate }}</p><h2 class=\"mt-1 text-xl font-semibold text-slate-900\">{{ 'packageOverview' | translate }}</h2></div></div>\n          <p class=\"mt-5 whitespace-pre-line leading-8 text-slate-600\">{{ description }}</p>\n        </section>\n\n        <app-itinerary-timeline [items]=\"itinerary\" />\n\n        @if (highlights.length) { <section class=\"rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm sm:p-8\">\n          <div class=\"flex items-center gap-3\"><span class=\"grid h-11 w-11 place-items-center rounded-2xl bg-primary text-2xl text-white\"><i class=\"mdi mdi-star-four-points-outline\"></i></span><h2 class=\"text-2xl font-semibold\">{{ 'packageHighlights' | translate }}</h2></div>\n          <div class=\"mt-5 grid gap-3 sm:grid-cols-2\">@for (highlight of highlights; track $index) { <div\n              class=\"flex items-start gap-3 rounded-2xl border border-primary/10 bg-white p-4\"><i\n                class=\"mdi mdi-check-circle text-xl text-primary\"></i><span class=\"text-sm leading-6 text-slate-700\">{{\n                itemText(highlight) }}</span></div> }</div>\n        </section> }\n\n        @if (includedItems.length || excludedItems.length) { <section class=\"rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8\">\n          <h2 class=\"text-2xl font-semibold\">{{ 'whatsIncludedExcluded' | translate }}</h2>\n          <div class=\"mt-5 grid gap-4 md:grid-cols-2\">\n            <div class=\"rounded-2xl bg-emerald-50 p-5\"><h3 class=\"flex items-center gap-2 font-bold text-emerald-700\"><i class=\"mdi mdi-check-circle text-xl\"></i>{{ 'included' | translate }}</h3><ul class=\"mt-4 space-y-3\">@for (item of includedItems; track $index) { <li class=\"flex items-start gap-2 text-sm leading-6 text-slate-700\"><i class=\"mdi mdi-check text-emerald-600\"></i>{{ itemText(item) }}</li> } @empty { <li class=\"text-sm text-slate-400\">{{ 'noTourIncludesAdded' | translate }}</li> }</ul></div>\n            <div class=\"rounded-2xl bg-rose-50 p-5\"><h3 class=\"flex items-center gap-2 font-bold text-rose-700\"><i class=\"mdi mdi-close-circle text-xl\"></i>{{ 'excluded' | translate }}</h3><ul class=\"mt-4 space-y-3\">@for (item of excludedItems; track $index) { <li class=\"flex items-start gap-2 text-sm leading-6 text-slate-700\"><i class=\"mdi mdi-close text-rose-600\"></i>{{ itemText(item) }}</li> } @empty { <li class=\"text-sm text-slate-400\">{{ 'noTourExcludesAdded' | translate }}</li> }</ul></div>\n          </div>\n        </section> }\n\n        @if (tours.length) { <section>\n          <h2 class=\"text-2xl font-semibold\">{{ 'toursInPackage' | translate }}</h2>\n          <div class=\"mt-5 grid gap-4 sm:grid-cols-2\">@for (tour of tours; track tour.id ?? tour.tourId) { <a\n              [routerLink]=\"['/tours', tour.id ?? tour.tourId]\"\n              class=\"group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg\">\n              <p class=\"text-xs font-semibold uppercase tracking-wider text-primary\">{{ 'tour' | translate }}</p>\n              <h3 class=\"mt-2 text-lg font-semibold group-hover:text-primary\">{{ tourTitle(tour) }}</h3><span\n                class=\"mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary\">{{ 'viewDetails' |\n                translate }} <i class=\"mdi mdi-arrow-right rtl:rotate-180\"></i></span>\n            </a> }</div>\n        </section> }\n      </div>\n\n      <aside class=\"space-y-5\">\n        <div class=\"rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl\">\n          <p class=\"text-xs font-semibold uppercase tracking-[0.25em] text-primary\">\n            {{ 'packageSummary' | translate }}</p>\n          <div class=\"mt-4 flex items-end gap-2\">\n            <strong class=\"text-4xl\">{{ formattedPrice }}</strong>\n            <span class=\"pb-1 text-sm text-white/55\">/ {{ 'person' | translate }}</span>\n          </div>\n          <div class=\"my-6 h-px bg-white/10\"></div>\n          <dl class=\"space-y-4 text-sm\">\n            <div class=\"flex items-center justify-between gap-4\">\n              <dt class=\"flex items-center gap-2 text-white/55\">\n                <i class=\"mdi mdi-clock-outline text-primary\">\n                </i>{{ 'duration' | translate }}\n              </dt>\n              <dd class=\"font-semibold\">{{ duration }}</dd>\n            </div>@if (destinationName)\n            { <div class=\"flex items-center justify-between gap-4\">\n              <dt class=\"flex items-center gap-2 text-white/55\">\n                <i class=\"mdi mdi-map-marker-outline text-primary\"></i>{{ 'destination' | translate }}\n              </dt>\n              <dd class=\"text-end font-semibold\">{{ destinationName }}</dd>\n            </div> }<div class=\"flex items-center justify-between gap-4\">\n              <dt class=\"flex items-center gap-2 text-white/55\">\n                <i class=\"mdi mdi-format-list-numbered text-primary\">\n                </i>{{ 'itinerarySteps' | translate }}\n              </dt>\n              <dd class=\"font-semibold\">{{ itinerary.length }}</dd>\n              </div>\n          </dl>@if (destinationId)\n          {\n          <a [routerLink]=\"['/destinations', destinationId]\"\n            class=\"mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-white\">\n            {{ 'viewDestination' | translate }}\n            <i class=\"mdi mdi-arrow-right rtl:rotate-180\"></i>\n          </a>\n         }\n        </div>\n        <app-tour-booking-card [travelPackage]=\"travelPackage\" />\n      </aside>\n    </div>\n  </div>\n</main>\n}\n\n<app-footer-one />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomePackagePage, { className: "HomePackagePage", filePath: "app/features/home/package-page/package-page.ts", lineNumber: 29 }); })();
