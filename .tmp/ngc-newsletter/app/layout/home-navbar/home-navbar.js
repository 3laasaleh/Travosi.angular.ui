import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject, } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';
import { DestinationsMenu } from './destinations-menu/destinations-menu';
import { PackagesMenu } from './packages-menu/packages-menu';
import { SearchBox } from './search-box/search-box';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../core/services/apiservice.service';
import { AuthService } from '../../features/user/_services/auth.service';
import { CurrencyService } from '../../core/services/currency.service';
import * as i0 from "@angular/core";
const _c0 = () => [];
const _c1 = a0 => ["/tours", a0];
const _forTrack0 = ($index, $item) => $item.id;
function HomeNavbar_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 13);
} }
function HomeNavbar_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.currencyService.currentCurrency().symbol);
} }
function HomeNavbar_Conditional_25_For_3_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 32);
} }
function HomeNavbar_Conditional_25_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 29);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_25_For_3_Template_button_click_0_listener() { const currency_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.switchCurrency(currency_r3.code)); });
    i0.ɵɵelementStart(1, "span", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 31);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, HomeNavbar_Conditional_25_For_3_Conditional_5_Template, 1, 0, "i", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currency_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bg-primary-50", currency_r3.code === ctx_r0.currencyService.currentCurrency().code)("text-primary", currency_r3.code === ctx_r0.currencyService.currentCurrency().code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", currency_r3.symbol, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(currency_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currency_r3.code === ctx_r0.currencyService.currentCurrency().code ? 5 : -1);
} }
function HomeNavbar_Conditional_25_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 28);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelement(3, "br");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("1 USD = ", i0.ɵɵpipeBind2(2, 2, ctx_r0.currencyService.usdToEgpRate(), "1.2-4"), " EGP");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.currencyService.rateProvider());
} }
function HomeNavbar_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "div", 22);
    i0.ɵɵrepeaterCreate(2, HomeNavbar_Conditional_25_For_3_Template, 6, 7, "button", 27, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, HomeNavbar_Conditional_25_Conditional_4_Template, 5, 5, "p", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.currencyService.options());
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.currencyService.currentCurrency().code === "EGP" && ctx_r0.currencyService.usdToEgpRate() ? 4 : -1);
} }
function HomeNavbar_Conditional_33_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 13);
} }
function HomeNavbar_Conditional_33_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 35);
} }
function HomeNavbar_Conditional_33_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 13);
} }
function HomeNavbar_Conditional_33_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 35);
} }
function HomeNavbar_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20)(1, "div", 22)(2, "button", 33);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_33_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.switchLanguage("en")); });
    i0.ɵɵelement(3, "i", 34);
    i0.ɵɵelementStart(4, "span", 31);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, HomeNavbar_Conditional_33_Conditional_7_Template, 1, 0, "i", 13)(8, HomeNavbar_Conditional_33_Conditional_8_Template, 1, 0, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 33);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_33_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.switchLanguage("ar")); });
    i0.ɵɵelement(10, "i", 36);
    i0.ɵɵelementStart(11, "span", 31);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(14, HomeNavbar_Conditional_33_Conditional_14_Template, 1, 0, "i", 13)(15, HomeNavbar_Conditional_33_Conditional_15_Template, 1, 0, "i", 35);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-primary-50", ctx_r0.currentLanguage === "en")("text-primary", ctx_r0.currentLanguage === "en");
    i0.ɵɵproperty("disabled", ctx_r0.switchingLanguage !== null);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 14, "languageEnglish"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.switchingLanguage === "en" ? 7 : ctx_r0.currentLanguage === "en" ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-primary-50", ctx_r0.currentLanguage === "ar")("text-primary", ctx_r0.currentLanguage === "ar");
    i0.ɵɵproperty("disabled", ctx_r0.switchingLanguage !== null);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 16, "languageArabic"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.switchingLanguage === "ar" ? 14 : ctx_r0.currentLanguage === "ar" ? 15 : -1);
} }
function HomeNavbar_Conditional_35_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 38);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r0.profileImageUrl, i0.ɵɵsanitizeUrl)("alt", ctx_r0.userName);
} }
function HomeNavbar_Conditional_35_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.userInitials, " ");
} }
function HomeNavbar_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_35_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleAccountMenu($event)); });
    i0.ɵɵconditionalCreate(2, HomeNavbar_Conditional_35_Conditional_2_Template, 1, 2, "img", 38)(3, HomeNavbar_Conditional_35_Conditional_3_Template, 2, 1, "span", 39);
    i0.ɵɵelementStart(4, "span", 40)(5, "span", 41);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "i", 42);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 4, "openAccountMenu"))("aria-expanded", ctx_r0.accountMenuOpen);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.profileImageUrl ? 2 : 3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.userName);
} }
function HomeNavbar_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "a", 43);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_36_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelement(2, "i", 44);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 1, "signin"), " ");
} }
function HomeNavbar_Conditional_37_Conditional_1_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 48);
    i0.ɵɵelement(1, "i", 53);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 1, "Configurations"));
} }
function HomeNavbar_Conditional_37_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "p", 46);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 47);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 22);
    i0.ɵɵconditionalCreate(6, HomeNavbar_Conditional_37_Conditional_1_Conditional_6_Template, 4, 3, "a", 48);
    i0.ɵɵelementStart(7, "a", 49);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_37_Conditional_1_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelement(8, "i", 50);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 51);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_37_Conditional_1_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.logout()); });
    i0.ɵɵelement(12, "i", 52);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.userEmail);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.canAccessConfigurations ? 6 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(10, 5, "myProfile"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(14, 7, "signOut"), " ");
} }
function HomeNavbar_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵconditionalCreate(1, HomeNavbar_Conditional_37_Conditional_1_Template, 15, 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isLoggedIn ? 1 : -1);
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 76);
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_2_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 80);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_13_Conditional_2_For_2_Template_button_click_0_listener() { const destination_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.openMobileDestination(destination_r10)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵelement(2, "i", 81);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "i", 82);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r10 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.mobileDestinationName(destination_r10));
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_2_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 79);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noDestinationsFound"));
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77);
    i0.ɵɵrepeaterCreate(1, HomeNavbar_Conditional_41_Conditional_13_Conditional_2_For_2_Template, 5, 1, "button", 78, _forTrack0, false, HomeNavbar_Conditional_41_Conditional_13_Conditional_2_ForEmpty_3_Template, 3, 3, "p", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.mobileDestinations);
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_3_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 80);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_13_Conditional_3_For_8_Template_button_click_0_listener() { const city_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.openMobileCity(city_r13)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵelement(2, "i", 86);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "i", 82);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const city_r13 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.mobileCityName(city_r13));
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_3_ForEmpty_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 79);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noCitiesForDestination"));
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 83);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_13_Conditional_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.backMobileDestinationMenu()); });
    i0.ɵɵelement(1, "i", 84);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 85);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 77);
    i0.ɵɵrepeaterCreate(7, HomeNavbar_Conditional_41_Conditional_13_Conditional_3_For_8_Template, 5, 1, "button", 78, _forTrack0, false, HomeNavbar_Conditional_41_Conditional_13_Conditional_3_ForEmpty_9_Template, 3, 3, "p", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, "back"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.mobileDestinationName(ctx_r0.selectedMobileDestination));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.selectedMobileDestination?.cities ?? i0.ɵɵpureFunction0(5, _c0));
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_4_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 88);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_13_Conditional_4_For_8_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵelement(2, "i", 89);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "i", 82);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tour_r16 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c1, tour_r16.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.mobileTourName(tour_r16));
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_4_ForEmpty_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 79);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noToursForCity"));
} }
function HomeNavbar_Conditional_41_Conditional_13_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 83);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_13_Conditional_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.backMobileDestinationMenu()); });
    i0.ɵɵelement(1, "i", 84);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 85);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 77);
    i0.ɵɵrepeaterCreate(7, HomeNavbar_Conditional_41_Conditional_13_Conditional_4_For_8_Template, 5, 4, "a", 87, _forTrack0, false, HomeNavbar_Conditional_41_Conditional_13_Conditional_4_ForEmpty_9_Template, 3, 3, "p", 79);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 3, "back"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.mobileCityName(ctx_r0.selectedMobileCity));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.selectedMobileCity?.tours ?? i0.ɵɵpureFunction0(5, _c0));
} }
function HomeNavbar_Conditional_41_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵconditionalCreate(1, HomeNavbar_Conditional_41_Conditional_13_Conditional_1_Template, 1, 0, "div", 76)(2, HomeNavbar_Conditional_41_Conditional_13_Conditional_2_Template, 4, 1, "div", 77)(3, HomeNavbar_Conditional_41_Conditional_13_Conditional_3_Template, 10, 6)(4, HomeNavbar_Conditional_41_Conditional_13_Conditional_4_Template, 10, 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.mobileNavigationLoading ? 1 : ctx_r0.mobileDestinationMenuLevel === "destinations" ? 2 : ctx_r0.mobileDestinationMenuLevel === "cities" ? 3 : 4);
} }
function HomeNavbar_Conditional_41_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 90);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_22_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelement(1, "i", 91);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 1, "Configurations"), " ");
} }
function HomeNavbar_Conditional_41_For_31_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 94);
} }
function HomeNavbar_Conditional_41_For_31_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 92);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_For_31_Template_button_click_0_listener() { const currency_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.switchCurrency(currency_r19.code)); });
    i0.ɵɵelementStart(1, "span", 93);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, HomeNavbar_Conditional_41_For_31_Conditional_5_Template, 1, 0, "i", 94);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const currency_r19 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bg-white", currency_r19.code === ctx_r0.currencyService.currentCurrency().code)("text-primary", currency_r19.code === ctx_r0.currencyService.currentCurrency().code)("shadow-sm", currency_r19.code === ctx_r0.currencyService.currentCurrency().code);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-primary-100", currency_r19.code === ctx_r0.currencyService.currentCurrency().code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(currency_r19.symbol);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(currency_r19.code);
    i0.ɵɵadvance();
    i0.ɵɵconditional(currency_r19.code === ctx_r0.currencyService.currentCurrency().code ? 5 : -1);
} }
function HomeNavbar_Conditional_41_Conditional_45_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 96);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("src", ctx_r0.profileImageUrl, i0.ɵɵsanitizeUrl)("alt", ctx_r0.userName);
} }
function HomeNavbar_Conditional_41_Conditional_45_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 97);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.userInitials);
} }
function HomeNavbar_Conditional_41_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 95);
    i0.ɵɵconditionalCreate(1, HomeNavbar_Conditional_41_Conditional_45_Conditional_1_Template, 1, 2, "img", 96)(2, HomeNavbar_Conditional_41_Conditional_45_Conditional_2_Template, 2, 1, "span", 97);
    i0.ɵɵelementStart(3, "div", 98)(4, "p", 99);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 47);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 100)(9, "a", 101);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_45_Template_a_click_9_listener() { i0.ɵɵrestoreView(_r20); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelement(10, "i", 50);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 102);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_45_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r20); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.logout()); });
    i0.ɵɵelement(14, "i", 52);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.profileImageUrl ? 1 : 2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.userEmail);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 5, "myProfile"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(16, 7, "signOut"), " ");
} }
function HomeNavbar_Conditional_41_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 103);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Conditional_46_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r21); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelement(1, "i", 44);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 1, "signin"), " ");
} }
function HomeNavbar_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 26);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelementStart(2, "div", 54)(3, "div", 55);
    i0.ɵɵelement(4, "app-search-box");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 56)(6, "div", 57)(7, "button", 58);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleMobileDestinations()); });
    i0.ɵɵelementStart(8, "span", 59);
    i0.ɵɵelement(9, "i", 60);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "i", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(13, HomeNavbar_Conditional_41_Conditional_13_Template, 5, 1, "div", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "a", 63);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Template_a_click_14_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelement(15, "i", 64);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "a", 65);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Template_a_click_18_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeMenus()); });
    i0.ɵɵelement(19, "i", 66);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(22, HomeNavbar_Conditional_41_Conditional_22_Template, 4, 3, "a", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 68)(24, "section")(25, "p", 69);
    i0.ɵɵelement(26, "i", 70);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 71);
    i0.ɵɵrepeaterCreate(30, HomeNavbar_Conditional_41_For_31_Template, 6, 11, "button", 72, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "section")(33, "p", 69);
    i0.ɵɵelement(34, "i", 73);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 71)(38, "button", 74);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.switchLanguage("en")); });
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "button", 74);
    i0.ɵɵlistener("click", function HomeNavbar_Conditional_41_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.switchLanguage("ar")); });
    i0.ɵɵtext(42);
    i0.ɵɵpipe(43, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(44, "section");
    i0.ɵɵconditionalCreate(45, HomeNavbar_Conditional_41_Conditional_45_Template, 17, 9)(46, HomeNavbar_Conditional_41_Conditional_46_Template, 4, 3, "a", 75);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 29, "mobileNavigation"));
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 31, "destinations"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("mdi-chevron-down", !ctx_r0.mobileDestinationsOpen)("mdi-chevron-up", ctx_r0.mobileDestinationsOpen);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.mobileDestinationsOpen ? 13 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(17, 33, "tours"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 35, "packages"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.canAccessConfigurations ? 22 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 37, "currency"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.currencyService.options());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(36, 39, "language"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("bg-white", ctx_r0.currentLanguage === "en")("text-primary", ctx_r0.currentLanguage === "en")("shadow-sm", ctx_r0.currentLanguage === "en");
    i0.ɵɵproperty("disabled", ctx_r0.switchingLanguage !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(40, 41, "languageEnglish"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-white", ctx_r0.currentLanguage === "ar")("text-primary", ctx_r0.currentLanguage === "ar")("shadow-sm", ctx_r0.currentLanguage === "ar");
    i0.ɵɵproperty("disabled", ctx_r0.switchingLanguage !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(43, 43, "languageArabic"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r0.isLoggedIn ? 45 : 46);
} }
export class HomeNavbar {
    authService = inject(AuthService);
    apiService = inject(ApiService);
    elementRef = inject((ElementRef));
    cdr = inject(ChangeDetectorRef);
    languageService = inject(LanguageService);
    currencyService = inject(CurrencyService);
    accountMenuOpen = false;
    mobileMenuOpen = false;
    languageMenuOpen = false;
    currencyMenuOpen = false;
    switchingLanguage = null;
    mobileDestinationsOpen = false;
    mobileNavigationLoading = false;
    mobileDestinations = [];
    mobileDestinationMenuLevel = 'destinations';
    selectedMobileDestination = null;
    selectedMobileCity = null;
    get currentLanguage() {
        return this.languageService.getCurrentLanguage();
    }
    toggleLanguageMenu(event) {
        event.stopPropagation();
        this.languageMenuOpen = !this.languageMenuOpen;
        this.accountMenuOpen = false;
        this.currencyMenuOpen = false;
        this.refreshIcons();
    }
    switchLanguage(lang) {
        if (this.switchingLanguage !== null)
            return;
        this.switchingLanguage = lang;
        this.mobileMenuOpen = false;
        this.languageService.setGLobalLanguage(lang).pipe(finalize(() => {
            this.switchingLanguage = null;
            this.closeMenus();
            this.cdr.markForCheck();
        })).subscribe({ error: () => { } });
    }
    get canAccessConfigurations() {
        return this.authService.isAdmin() || this.authService.isAgent();
    }
    get isLoggedIn() {
        return !!this.authService.getCurentUser();
    }
    get userName() {
        const user = this.authService.getCurentUser();
        return [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.userName || '';
    }
    get userEmail() {
        return this.authService.getCurentUser()?.email ?? '';
    }
    get profileImageUrl() {
        return this.authService.profileImageUrl();
    }
    get userInitials() {
        return this.userName
            .split(' ')
            .slice(0, 2)
            .map((name) => name.charAt(0))
            .join('')
            .toUpperCase();
    }
    ngAfterViewInit() {
        this.refreshIcons();
    }
    toggleAccountMenu(event) {
        event.stopPropagation();
        this.accountMenuOpen = !this.accountMenuOpen;
        this.refreshIcons();
    }
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        if (!this.mobileMenuOpen)
            this.resetMobileDestinationMenu();
        this.accountMenuOpen = false;
        this.languageMenuOpen = false;
        this.refreshIcons();
    }
    toggleCurrencyMenu(event) {
        event.stopPropagation();
        this.currencyMenuOpen = !this.currencyMenuOpen;
        this.languageMenuOpen = false;
        this.accountMenuOpen = false;
    }
    switchCurrency(code) {
        this.currencyMenuOpen = false;
        this.mobileMenuOpen = false;
        this.currencyService.selectCurrency(code);
    }
    toggleMobileDestinations() {
        this.mobileDestinationsOpen = !this.mobileDestinationsOpen;
        if (this.mobileDestinationsOpen) {
            this.resetMobileDestinationMenu();
            if (!this.mobileDestinations.length)
                this.loadMobileNavigation();
        }
    }
    openMobileDestination(destination) {
        this.selectedMobileDestination = destination;
        this.selectedMobileCity = null;
        this.mobileDestinationMenuLevel = 'cities';
    }
    openMobileCity(city) {
        this.selectedMobileCity = city;
        this.mobileDestinationMenuLevel = 'tours';
    }
    backMobileDestinationMenu() {
        if (this.mobileDestinationMenuLevel === 'tours') {
            this.selectedMobileCity = null;
            this.mobileDestinationMenuLevel = 'cities';
            return;
        }
        if (this.mobileDestinationMenuLevel === 'cities')
            this.resetMobileDestinationMenu();
    }
    mobileDestinationName(item) { return this.currentLanguage === 'ar' ? item?.nameAr ?? item?.nameEng ?? '' : item?.nameEng ?? item?.nameAr ?? ''; }
    mobileCityName(item) { return this.mobileDestinationName(item); }
    mobileTourName(item) { return this.currentLanguage === 'ar' ? item?.titleAr ?? item?.titleEng ?? '' : item?.titleEng ?? item?.titleAr ?? ''; }
    closeMenus() {
        this.accountMenuOpen = false;
        this.mobileMenuOpen = false;
        this.languageMenuOpen = false;
        this.currencyMenuOpen = false;
        this.mobileDestinationsOpen = false;
        this.resetMobileDestinationMenu();
    }
    logout() {
        this.closeMenus();
        this.authService.logout();
    }
    closeAccountMenuOnOutsideClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.accountMenuOpen = false;
            this.languageMenuOpen = false;
            this.currencyMenuOpen = false;
        }
    }
    refreshIcons() {
        requestAnimationFrame(() => feather.replace());
    }
    loadMobileNavigation() {
        this.mobileNavigationLoading = true;
        this.apiService.getUnauthntecated('Destinations/Navigation?takeDestinations=10&takeCities=10&takeTours=5').pipe(catchError(() => of(null)), finalize(() => { this.mobileNavigationLoading = false; this.cdr.markForCheck(); })).subscribe((response) => {
            const data = response?.data ?? response;
            const rows = data?.data ?? data?.destinations ?? data;
            this.mobileDestinations = Array.isArray(rows) ? rows : [];
        });
    }
    resetMobileDestinationMenu() {
        this.mobileDestinationMenuLevel = 'destinations';
        this.selectedMobileDestination = null;
        this.selectedMobileCity = null;
    }
    static ɵfac = function HomeNavbar_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeNavbar)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeNavbar, selectors: [["app-home-navbar"]], hostBindings: function HomeNavbar_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function HomeNavbar_click_HostBindingHandler($event) { return ctx.closeAccountMenuOnOutsideClick($event); }, i0.ɵɵresolveDocument);
        } }, decls: 42, vars: 43, consts: [[1, "sticky", "top-0", "z-50", "border-b", "border-slate-200", "bg-white"], [1, "mx-auto", "flex", "h-16", "max-w-[1600px]", "items-center", "gap-2", "px-3", "sm:h-20", "sm:gap-4", "sm:px-6", "lg:gap-6", "lg:px-8"], ["routerLink", "/home", 1, "flex", "min-w-0", "shrink-0", "items-center", "gap-3"], ["src", "./assets/images/main-logo.png", 1, "h-12", "w-auto", "shrink-0", "sm:h-14", 3, "alt"], [1, "sm:block"], [1, "block", "text-lg", "font-bold", "leading-tight", "text-primary"], [1, "hidden", "min-w-0", "flex-1", "justify-center", "md:flex"], [1, "w-full", "max-w-md"], [1, "ml-auto", "hidden", "items-center", "gap-1", "lg:flex"], [1, "hidden", "h-8", "w-px", "bg-slate-200", "lg:block"], [1, "ms-auto", "flex", "items-center", "gap-2"], [1, "relative", "hidden", "lg:block"], ["type", "button", "aria-haspopup", "menu", 1, "flex", "items-center", "gap-1.5", "rounded-xl", "border", "border-slate-200", "px-3", "py-2", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:border-primary", "hover:text-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin", "text-base"], ["aria-hidden", "true", 1, "text-base", "font-bold", "leading-none"], [1, "uppercase"], [1, "mdi", "text-base", "leading-none"], ["role", "menu", 1, "absolute", "right-0", "mt-2", "w-36", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg"], ["type", "button", "aria-haspopup", "menu", 1, "flex", "items-center", "gap-1.5", "rounded-xl", "border", "border-slate-200", "px-3", "py-2", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:border-primary", "hover:text-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", "dark:border-slate-700", 3, "click", "disabled"], [1, "mdi", "mdi-web", "text-base", "leading-none"], ["role", "menu", 1, "absolute", "right-0", "mt-2", "w-48", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg", "dark:border-slate-700"], ["type", "button", "aria-haspopup", "menu", 1, "flex", "items-center", "gap-3", "rounded-2xl", "p-1.5", "text-left", "transition", "hover:bg-slate-100", "dark:hover:bg-slate-800"], [1, "p-2"], ["role", "menu", 1, "absolute", "right-0", "mt-2", "w-64", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg", "dark:border-slate-700"], ["type", "button", 1, "flex", "size-10", "items-center", "justify-center", "rounded-xl", "border", "border-slate-200", "text-slate-600", "lg:hidden", "dark:border-slate-700", 3, "click"], ["aria-hidden", "true", 1, "mdi", "text-xl", "leading-none"], [1, "max-h-[calc(100vh-4rem)]", "overflow-y-auto", "border-t", "border-slate-200", "bg-white", "px-4", "py-4", "shadow-lg", "lg:hidden", "dark:border-slate-800"], ["type", "button", "role", "menuitem", 1, "flex", "w-full", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "bg-primary-50", "text-primary"], [1, "mx-4", "mb-3", "border-t", "border-slate-100", "pt-2", "text-xs", "text-slate-500"], ["type", "button", "role", "menuitem", 1, "flex", "w-full", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click"], ["aria-hidden", "true", 1, "min-w-7", "text-center", "text-lg", "font-bold", "leading-none"], [1, "flex-1", "text-start"], ["aria-label", "Selected", 1, "mdi", "mdi-check", "text-base"], ["type", "button", "role", "menuitem", 1, "flex", "w-full", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", "dark:hover:bg-slate-800", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-alphabet-latin", "text-lg"], ["aria-hidden", "true", 1, "mdi", "mdi-check", "text-base"], ["aria-hidden", "true", 1, "mdi", "mdi-abjad-arabic", "text-lg"], ["type", "button", "aria-haspopup", "menu", 1, "flex", "items-center", "gap-3", "rounded-2xl", "p-1.5", "text-left", "transition", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [1, "size-9", "rounded-full", "object-cover", "ring-2", "ring-primary/15", 3, "src", "alt"], [1, "flex", "size-9", "items-center", "justify-center", "rounded-full", "bg-primary-50", "text-sm", "font-bold", "text-primary", "dark:bg-primary/15"], [1, "hidden", "max-w-36", "md:block"], [1, "block", "truncate", "text-sm", "font-semibold", "text-slate-800"], ["data-feather", "chevron-down", 1, "hidden", "size-4", "text-slate-400", "md:block"], ["routerLink", "/login", "role", "menuitem", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "transition", "hover:text-primary", 3, "click"], ["data-feather", "log-in", 1, "size-4"], [1, "border-b", "border-slate-100", "px-4", "py-3", "dark:border-slate-800"], [1, "truncate", "text-sm", "font-semibold", "text-slate-900"], [1, "truncate", "text-xs", "text-slate-500"], ["routerLink", "/configurations", "routerLinkActive", "bg-primary-50 text-primary", "role", "menuitem", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800"], ["routerLink", "/user-booking", "role", "menuitem", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["data-feather", "user", 1, "size-4"], ["type", "button", "role", "menuitem", 1, "flex", "w-full", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-primary-50", "hover:text-primary", "dark:hover:bg-primary/10", 3, "click"], ["data-feather", "log-out", 1, "size-4"], ["data-feather", "settings", 1, "size-4"], [1, "mx-auto", "max-w-[1600px]"], [1, "mb-4", "md:hidden"], [1, "grid", "gap-1", "sm:grid-cols-2"], [1, "sm:col-span-2", "rounded-xl", "border", "border-slate-200", "dark:border-slate-800"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", 3, "click"], [1, "flex", "items-center", "gap-3"], [1, "mdi", "mdi-map-marker-outline", "text-xl", "text-primary"], [1, "mdi"], [1, "border-t", "border-slate-100", "p-3", "dark:border-slate-800"], ["routerLink", "/tours", "routerLinkActive", "bg-primary-50 text-primary", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["aria-hidden", "true", 1, "mdi", "mdi-compass-outline", "text-xl"], ["routerLink", "/packages", "routerLinkActive", "bg-primary-50 text-primary", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["aria-hidden", "true", 1, "mdi", "mdi-package-variant-closed", "text-xl"], ["routerLink", "/configurations", "routerLinkActive", "bg-primary-50 text-primary", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800"], [1, "mt-4", "grid", "gap-4", "border-t", "border-slate-200", "pt-4", "sm:grid-cols-2", "dark:border-slate-800"], [1, "mb-2", "flex", "items-center", "gap-2", "text-sm", "font-semibold", "text-slate-700"], [1, "mdi", "mdi-cash-multiple", "text-lg"], [1, "grid", "grid-cols-2", "gap-2", "rounded-2xl", "bg-slate-100", "p-1.5"], ["type", "button", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", 3, "bg-white", "text-primary", "shadow-sm"], ["aria-hidden", "true", 1, "mdi", "mdi-web", "text-lg"], ["type", "button", 1, "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["routerLink", "/login", 1, "flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-xl", "bg-primary", "px-4", "py-3", "text-sm", "font-semibold", "text-white", "transition", "hover:opacity-90"], [1, "h-16", "animate-pulse", "rounded-xl", "bg-slate-100"], [1, "space-y-1"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "bg-slate-50", "px-3", "py-3", "text-start", "text-sm", "font-semibold", "text-slate-700", "transition", "hover:bg-primary-50", "hover:text-primary"], [1, "p-3", "text-sm", "text-slate-500"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "bg-slate-50", "px-3", "py-3", "text-start", "text-sm", "font-semibold", "text-slate-700", "transition", "hover:bg-primary-50", "hover:text-primary", 3, "click"], [1, "mdi", "mdi-map-marker-outline", "me-2", "text-primary"], ["aria-hidden", "true", 1, "mdi", "mdi-chevron-right", "text-lg", "rtl:rotate-180"], ["type", "button", 1, "mb-3", "inline-flex", "items-center", "gap-2", "rounded-xl", "px-2", "py-2", "text-sm", "font-semibold", "text-primary", "hover:bg-primary-50", 3, "click"], ["aria-hidden", "true", 1, "mdi", "mdi-arrow-left", "rtl:rotate-180"], [1, "mb-2", "px-2", "text-sm", "font-semibold", "text-slate-700"], [1, "mdi", "mdi-city-variant-outline", "me-2", "text-primary"], [1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "bg-slate-50", "px-3", "py-3", "text-sm", "font-semibold", "text-slate-700", "transition", "hover:bg-primary-50", "hover:text-primary", 3, "routerLink"], [1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "bg-slate-50", "px-3", "py-3", "text-sm", "font-semibold", "text-slate-700", "transition", "hover:bg-primary-50", "hover:text-primary", 3, "click", "routerLink"], [1, "mdi", "mdi-compass-outline", "me-2", "text-primary"], ["routerLink", "/configurations", "routerLinkActive", "bg-primary-50 text-primary", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["aria-hidden", "true", 1, "mdi", "mdi-cog-outline", "text-xl"], ["type", "button", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", 3, "click"], ["aria-hidden", "true", 1, "grid", "h-6", "min-w-6", "place-items-center", "rounded-md", "bg-slate-200", "px-1", "text-xs", "font-bold"], ["aria-label", "Selected", 1, "mdi", "mdi-check-circle", "text-base"], [1, "mb-2", "flex", "items-center", "gap-3", "px-1"], [1, "size-10", "rounded-full", "object-cover", "ring-2", "ring-primary/15", 3, "src", "alt"], [1, "flex", "size-10", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-primary-50", "text-sm", "font-bold", "text-primary", "dark:bg-primary/15"], [1, "min-w-0"], [1, "truncate", "text-sm", "font-semibold", "text-slate-800"], [1, "grid", "grid-cols-2", "gap-2"], ["routerLink", "/user-booking", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "border", "border-slate-200", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:border-primary", "hover:text-primary", "dark:border-slate-700", 3, "click"], ["type", "button", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "border", "border-slate-200", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:border-primary", "hover:text-primary", "dark:border-slate-700", 3, "click"], ["routerLink", "/login", 1, "flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-xl", "bg-primary", "px-4", "py-3", "text-sm", "font-semibold", "text-white", "transition", "hover:opacity-90", 3, "click"]], template: function HomeNavbar_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵpipe(3, "translate");
            i0.ɵɵelement(4, "img", 3);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementStart(6, "span", 4)(7, "span", 5);
            i0.ɵɵtext(8, "Sea World Holidays");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 6);
            i0.ɵɵelement(10, "app-search-box", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "nav", 8);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelement(13, "app-destinations-menu")(14, "app-packages-menu");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "div", 9);
            i0.ɵɵelementStart(16, "div", 10)(17, "div", 11)(18, "button", 12);
            i0.ɵɵpipe(19, "translate");
            i0.ɵɵlistener("click", function HomeNavbar_Template_button_click_18_listener($event) { return ctx.toggleCurrencyMenu($event); });
            i0.ɵɵconditionalCreate(20, HomeNavbar_Conditional_20_Template, 1, 0, "i", 13)(21, HomeNavbar_Conditional_21_Template, 2, 1, "span", 14);
            i0.ɵɵelementStart(22, "span", 15);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(24, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(25, HomeNavbar_Conditional_25_Template, 5, 1, "div", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 11)(27, "button", 18);
            i0.ɵɵpipe(28, "translate");
            i0.ɵɵlistener("click", function HomeNavbar_Template_button_click_27_listener($event) { return ctx.toggleLanguageMenu($event); });
            i0.ɵɵelement(29, "i", 19);
            i0.ɵɵelementStart(30, "span", 15);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(33, HomeNavbar_Conditional_33_Template, 16, 18, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 11);
            i0.ɵɵconditionalCreate(35, HomeNavbar_Conditional_35_Template, 8, 6, "button", 21)(36, HomeNavbar_Conditional_36_Template, 5, 3, "div", 22);
            i0.ɵɵconditionalCreate(37, HomeNavbar_Conditional_37_Template, 2, 1, "div", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 24);
            i0.ɵɵpipe(39, "translate");
            i0.ɵɵlistener("click", function HomeNavbar_Template_button_click_38_listener() { return ctx.toggleMobileMenu(); });
            i0.ɵɵelement(40, "i", 25);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(41, HomeNavbar_Conditional_41_Template, 47, 45, "nav", 26);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 31, "homeLinkLabel"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("alt", i0.ɵɵpipeBind1(5, 33, "seaworldHolidaysLogo"));
            i0.ɵɵadvance(7);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(12, 35, "mainNavigation"));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("disabled", ctx.currencyService.isLoading() || ctx.currencyService.isRateLoading());
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(19, 37, "currency"))("aria-expanded", ctx.currencyMenuOpen);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.currencyService.isLoading() || ctx.currencyService.isRateLoading() ? 20 : 21);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.currencyService.currentCurrency().code);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("mdi-chevron-down", !ctx.currencyMenuOpen)("mdi-chevron-up", ctx.currencyMenuOpen);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currencyMenuOpen ? 25 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.switchingLanguage !== null);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(28, 39, "language"))("aria-expanded", ctx.languageMenuOpen);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.currentLanguage);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("mdi-chevron-down", !ctx.languageMenuOpen)("mdi-chevron-up", ctx.languageMenuOpen);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.languageMenuOpen ? 33 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoggedIn ? 35 : 36);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.accountMenuOpen ? 37 : -1);
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(39, 41, "toggleHomeNavigation"))("aria-expanded", ctx.mobileMenuOpen);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-menu", !ctx.mobileMenuOpen)("mdi-close", ctx.mobileMenuOpen);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mobileMenuOpen ? 41 : -1);
        } }, dependencies: [RouterLink, RouterLinkActive, DestinationsMenu, PackagesMenu, SearchBox, TranslatePipe, DecimalPipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeNavbar, [{
        type: Component,
        args: [{ selector: 'app-home-navbar', imports: [RouterLink, RouterLinkActive, TranslatePipe, DecimalPipe, DestinationsMenu, PackagesMenu, SearchBox], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"sticky top-0 z-50 border-b border-slate-200 bg-white\">\r\n  <div class=\"mx-auto flex h-16 max-w-[1600px] items-center gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8\">\r\n    <a routerLink=\"/home\" class=\"flex min-w-0 shrink-0 items-center gap-3\"\r\n      [attr.aria-label]=\"'homeLinkLabel' | translate\">\r\n      <img src=\"./assets/images/main-logo.png\" class=\"h-12 w-auto shrink-0 sm:h-14\"\r\n        [alt]=\"'seaworldHolidaysLogo' | translate\">\r\n      <span class=\" sm:block\">\r\n        <span class=\"block text-lg font-bold leading-tight text-primary \">Sea World Holidays</span>\r\n      </span>\r\n    </a>\r\n\r\n    <div class=\"hidden min-w-0 flex-1 justify-center md:flex\">\r\n      <app-search-box class=\"w-full max-w-md\" />\r\n    </div>\r\n\r\n    <nav class=\"ml-auto hidden items-center gap-1 lg:flex\" [attr.aria-label]=\"'mainNavigation' | translate\">\r\n      <app-destinations-menu />\r\n      <!-- <app-tours-menu /> -->\r\n      <app-packages-menu />\r\n\r\n\r\n    </nav>\r\n\r\n    <div class=\"hidden h-8 w-px bg-slate-200 lg:block \"></div>\r\n\r\n    <div class=\"ms-auto flex items-center gap-2\">\r\n      <div class=\"relative hidden lg:block\">\r\n        <button type=\"button\"\r\n          class=\"flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60\"\r\n          [disabled]=\"currencyService.isLoading() || currencyService.isRateLoading()\"\r\n          [attr.aria-label]=\"'currency' | translate\" aria-haspopup=\"menu\" [attr.aria-expanded]=\"currencyMenuOpen\"\r\n          (click)=\"toggleCurrencyMenu($event)\">\r\n          @if (currencyService.isLoading() || currencyService.isRateLoading())\r\n          {\r\n          <i class=\"mdi mdi-loading mdi-spin text-base\" aria-hidden=\"true\"></i>\r\n          }\r\n          @else {\r\n          <span class=\"text-base font-bold leading-none\" aria-hidden=\"true\">{{\r\n            currencyService.currentCurrency().symbol}}</span> }\r\n          <span class=\"uppercase\">{{ currencyService.currentCurrency().code }}</span><i\r\n            class=\"mdi text-base leading-none\" [class.mdi-chevron-down]=\"!currencyMenuOpen\"\r\n            [class.mdi-chevron-up]=\"currencyMenuOpen\"></i>\r\n        </button>\r\n        @if (currencyMenuOpen) {\r\n        <div class=\"absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg\"\r\n          role=\"menu\">\r\n          <div class=\"p-2\">\r\n            @for (currency of currencyService.options(); track currency.id) {\r\n            <button type=\"button\"\r\n              class=\"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60\"\r\n              [class.bg-primary-50]=\"currency.code === currencyService.currentCurrency().code\"\r\n              [class.text-primary]=\"currency.code === currencyService.currentCurrency().code\"\r\n              (click)=\"switchCurrency(currency.code)\" role=\"menuitem\"><span\r\n                class=\"min-w-7 text-center text-lg font-bold leading-none\" aria-hidden=\"true\">\r\n                {{ currency.symbol }}\r\n              </span>\r\n              <span class=\"flex-1 text-start\">{{ currency.name }}</span>\r\n              @if (currency.code ===\r\n              currencyService.currentCurrency().code) { <i class=\"mdi mdi-check text-base\" aria-label=\"Selected\"></i>\r\n              }</button>\r\n            }\r\n          </div>\r\n          @if (currencyService.currentCurrency().code === 'EGP' && currencyService.usdToEgpRate()) { <p\r\n            class=\"mx-4 mb-3 border-t border-slate-100 pt-2 text-xs text-slate-500\">1 USD = {{\r\n            currencyService.usdToEgpRate() | number:'1.2-4' }} EGP<br>{{ currencyService.rateProvider() }}</p> }\r\n        </div>\r\n        }\r\n      </div>\r\n      <!-- Desktop language switcher -->\r\n      <div class=\"relative hidden lg:block\">\r\n        <button type=\"button\"\r\n          class=\"flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 \"\r\n          [disabled]=\"switchingLanguage !== null\" [attr.aria-label]=\"'language' | translate\" aria-haspopup=\"menu\"\r\n          [attr.aria-expanded]=\"languageMenuOpen\" (click)=\"toggleLanguageMenu($event)\">\r\n          <i class=\"mdi mdi-web text-base leading-none\"></i>\r\n          <span class=\"uppercase\">{{ currentLanguage }}</span>\r\n          <i class=\"mdi text-base leading-none\" [class.mdi-chevron-down]=\"!languageMenuOpen\"\r\n            [class.mdi-chevron-up]=\"languageMenuOpen\"></i>\r\n        </button>\r\n\r\n        @if (languageMenuOpen) {\r\n        <div\r\n          class=\"absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 \"\r\n          role=\"menu\">\r\n          <div class=\"p-2\">\r\n            <button type=\"button\" (click)=\"switchLanguage('en')\" [disabled]=\"switchingLanguage !== null\"\r\n              class=\"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60  dark:hover:bg-slate-800\"\r\n              [class.bg-primary-50]=\"currentLanguage === 'en'\" [class.text-primary]=\"currentLanguage === 'en'\"\r\n              role=\"menuitem\">\r\n              <i class=\"mdi mdi-alphabet-latin text-lg\" aria-hidden=\"true\"></i>\r\n              <span class=\"flex-1 text-start\">{{ 'languageEnglish' | translate }}</span>\r\n              @if (switchingLanguage === 'en') { <i class=\"mdi mdi-loading mdi-spin text-base\" aria-hidden=\"true\"></i> }\r\n              @else if (currentLanguage === 'en') { <i class=\"mdi mdi-check text-base\" aria-hidden=\"true\"></i> }\r\n            </button>\r\n            <button type=\"button\" (click)=\"switchLanguage('ar')\" [disabled]=\"switchingLanguage !== null\"\r\n              class=\"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60  dark:hover:bg-slate-800\"\r\n              [class.bg-primary-50]=\"currentLanguage === 'ar'\" [class.text-primary]=\"currentLanguage === 'ar'\"\r\n              role=\"menuitem\">\r\n              <i class=\"mdi mdi-abjad-arabic text-lg\" aria-hidden=\"true\"></i>\r\n              <span class=\"flex-1 text-start\">{{ 'languageArabic' | translate }}</span>\r\n              @if (switchingLanguage === 'ar') { <i class=\"mdi mdi-loading mdi-spin text-base\" aria-hidden=\"true\"></i> }\r\n              @else if (currentLanguage === 'ar') { <i class=\"mdi mdi-check text-base\" aria-hidden=\"true\"></i> }\r\n            </button>\r\n          </div>\r\n        </div>\r\n        }\r\n      </div>\r\n\r\n      <div class=\"relative hidden lg:block\">\r\n        @if (isLoggedIn) {\r\n        <button type=\"button\"\r\n          class=\"flex items-center gap-3 rounded-2xl p-1.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800\"\r\n          [attr.aria-label]=\"'openAccountMenu' | translate\" aria-haspopup=\"menu\" [attr.aria-expanded]=\"accountMenuOpen\"\r\n          (click)=\"toggleAccountMenu($event)\">\r\n\r\n          @if (profileImageUrl) {\r\n          <img [src]=\"profileImageUrl\" [alt]=\"userName\"\r\n            class=\"size-9 rounded-full object-cover ring-2 ring-primary/15\" />\r\n          } @else {\r\n          <span\r\n            class=\"flex size-9 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary dark:bg-primary/15\">\r\n            {{ userInitials }}\r\n          </span>\r\n          }\r\n          <span class=\"hidden max-w-36 md:block\">\r\n            <span class=\"block truncate text-sm font-semibold text-slate-800 \">{{ userName }}</span>\r\n          </span>\r\n          <i data-feather=\"chevron-down\" class=\"hidden size-4 text-slate-400 md:block\"></i>\r\n        </button>\r\n        }\r\n        @else {\r\n        <div class=\"p-2\">\r\n          <a routerLink=\"/login\" (click)=\"closeMenus()\"\r\n            class=\"flex items-center gap-3 rounded-xl  px-3 py-2.5 text-sm font-semibold  transition hover:text-primary \"\r\n            role=\"menuitem\">\r\n            <i data-feather=\"log-in\" class=\"size-4\"></i>\r\n            {{ 'signin' | translate }}\r\n          </a>\r\n        </div>\r\n        }\r\n\r\n        @if (accountMenuOpen) {\r\n        <div\r\n          class=\"absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 \"\r\n          role=\"menu\">\r\n          @if (isLoggedIn) {\r\n          <div class=\"border-b border-slate-100 px-4 py-3 dark:border-slate-800\">\r\n            <p class=\"truncate text-sm font-semibold text-slate-900 \">{{ userName }}</p>\r\n            <p class=\"truncate text-xs text-slate-500 \">{{ userEmail }}</p>\r\n          </div>\r\n          <div class=\"p-2\">\r\n            @if (canAccessConfigurations) {\r\n            <a routerLink=\"/configurations\" routerLinkActive=\"bg-primary-50 text-primary\"\r\n              class=\"flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-800\"\r\n              role=\"menuitem\">\r\n              <i data-feather=\"settings\" class=\"size-4\"></i>\r\n              {{'Configurations'|translate}}</a>\r\n\r\n            }\r\n\r\n            <a routerLink=\"/user-booking\" (click)=\"closeMenus()\"\r\n              class=\"flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-800\"\r\n              role=\"menuitem\">\r\n              <i data-feather=\"user\" class=\"size-4\"></i>\r\n              {{ 'myProfile' | translate }}\r\n            </a>\r\n            <button type=\"button\" (click)=\"logout()\"\r\n              class=\"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-primary-50 hover:text-primary dark:hover:bg-primary/10\"\r\n              role=\"menuitem\">\r\n              <i data-feather=\"log-out\" class=\"size-4\"></i>\r\n              {{ 'signOut' | translate }}\r\n            </button>\r\n          </div>\r\n          }\r\n        </div>\r\n        }\r\n      </div>\r\n\r\n      <button type=\"button\"\r\n        class=\"flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden dark:border-slate-700\"\r\n        [attr.aria-label]=\"'toggleHomeNavigation' | translate\" [attr.aria-expanded]=\"mobileMenuOpen\"\r\n        (click)=\"toggleMobileMenu()\">\r\n        <i class=\"mdi text-xl leading-none\" [class.mdi-menu]=\"!mobileMenuOpen\" [class.mdi-close]=\"mobileMenuOpen\"\r\n          aria-hidden=\"true\"></i>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  @if (mobileMenuOpen) {\r\n  <nav\r\n    class=\"max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden dark:border-slate-800 \"\r\n    [attr.aria-label]=\"'mobileNavigation' | translate\">\r\n    <div class=\"mx-auto max-w-[1600px]\">\r\n      <div class=\"mb-4 md:hidden\">\r\n        <app-search-box />\r\n      </div>\r\n\r\n      <div class=\"grid gap-1 sm:grid-cols-2\">\r\n        <div class=\"sm:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800\">\r\n          <button type=\"button\" (click)=\"toggleMobileDestinations()\"\r\n            class=\"flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 \"><span\r\n              class=\"flex items-center gap-3\"><i class=\"mdi mdi-map-marker-outline text-xl text-primary\"></i>{{\r\n              'destinations' | translate }}</span><i class=\"mdi\" [class.mdi-chevron-down]=\"!mobileDestinationsOpen\"\r\n              [class.mdi-chevron-up]=\"mobileDestinationsOpen\"></i></button>\r\n          @if (mobileDestinationsOpen) {\r\n          <div class=\"border-t border-slate-100 p-3 dark:border-slate-800\">\r\n            @if (mobileNavigationLoading) {\r\n            <div class=\"h-16 animate-pulse rounded-xl bg-slate-100 \"></div>\r\n            } @else if (mobileDestinationMenuLevel === 'destinations') {\r\n            <div class=\"space-y-1\">\r\n              @for (destination of mobileDestinations; track destination.id) {\r\n              <button type=\"button\" (click)=\"openMobileDestination(destination)\"\r\n                class=\"flex w-full items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 text-start text-sm font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-primary\">\r\n                <span><i class=\"mdi mdi-map-marker-outline me-2 text-primary\"></i>{{ mobileDestinationName(destination)\r\n                  }}</span>\r\n                <i class=\"mdi mdi-chevron-right text-lg rtl:rotate-180\" aria-hidden=\"true\"></i>\r\n              </button>\r\n              } @empty {\r\n              <p class=\"p-3 text-sm text-slate-500\">{{ 'noDestinationsFound' | translate }}</p>\r\n              }\r\n            </div>\r\n            } @else if (mobileDestinationMenuLevel === 'cities') {\r\n            <button type=\"button\" (click)=\"backMobileDestinationMenu()\"\r\n              class=\"mb-3 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-primary hover:bg-primary-50\"><i\r\n                class=\"mdi mdi-arrow-left rtl:rotate-180\" aria-hidden=\"true\"></i>{{ 'back' | translate }}</button>\r\n            <p class=\"mb-2 px-2 text-sm font-semibold text-slate-700\">{{\r\n              mobileDestinationName(selectedMobileDestination) }}</p>\r\n            <div class=\"space-y-1\">\r\n              @for (city of selectedMobileDestination?.cities ?? []; track city.id) {\r\n              <button type=\"button\" (click)=\"openMobileCity(city)\"\r\n                class=\"flex w-full items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 text-start text-sm font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-primary\">\r\n                <span><i class=\"mdi mdi-city-variant-outline me-2 text-primary\"></i>{{ mobileCityName(city) }}</span>\r\n                <i class=\"mdi mdi-chevron-right text-lg rtl:rotate-180\" aria-hidden=\"true\"></i>\r\n              </button>\r\n              } @empty {\r\n              <p class=\"p-3 text-sm text-slate-500\">{{ 'noCitiesForDestination' | translate }}</p>\r\n              }\r\n            </div>\r\n            } @else {\r\n            <button type=\"button\" (click)=\"backMobileDestinationMenu()\"\r\n              class=\"mb-3 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-primary hover:bg-primary-50\"><i\r\n                class=\"mdi mdi-arrow-left rtl:rotate-180\" aria-hidden=\"true\"></i>{{ 'back' | translate }}</button>\r\n            <p class=\"mb-2 px-2 text-sm font-semibold text-slate-700\">{{ mobileCityName(selectedMobileCity) }}</p>\r\n            <div class=\"space-y-1\">\r\n              @for (tour of selectedMobileCity?.tours ?? []; track tour.id) {\r\n              <a [routerLink]=\"['/tours', tour.id]\" (click)=\"closeMenus()\"\r\n                class=\"flex w-full items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-primary\"><span><i\r\n                    class=\"mdi mdi-compass-outline me-2 text-primary\"></i>{{ mobileTourName(tour) }}</span><i\r\n                  class=\"mdi mdi-chevron-right text-lg rtl:rotate-180\" aria-hidden=\"true\"></i></a>\r\n              } @empty {\r\n              <p class=\"p-3 text-sm text-slate-500\">{{ 'noToursForCity' | translate }}</p>\r\n              }\r\n            </div>\r\n            }\r\n          </div>\r\n          }\r\n        </div>\r\n        <a routerLink=\"/tours\" routerLinkActive=\"bg-primary-50 text-primary\" (click)=\"closeMenus()\"\r\n          class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\">\r\n          <i class=\"mdi mdi-compass-outline text-xl\" aria-hidden=\"true\"></i>\r\n          {{ 'tours' | translate }}\r\n        </a>\r\n        <a routerLink=\"/packages\" routerLinkActive=\"bg-primary-50 text-primary\" (click)=\"closeMenus()\"\r\n          class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\">\r\n          <i class=\"mdi mdi-package-variant-closed text-xl\" aria-hidden=\"true\"></i>\r\n          {{ 'packages' | translate }}\r\n        </a>\r\n        <!-- <a routerLink=\"/contact\" routerLinkActive=\"bg-primary-50 text-primary\" (click)=\"closeMenus()\"\r\n            class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\">\r\n            <i class=\"mdi mdi-email-outline text-xl\" aria-hidden=\"true\"></i>\r\n            Contact Us\r\n          </a> -->\r\n        @if (canAccessConfigurations) {\r\n        <a routerLink=\"/configurations\" routerLinkActive=\"bg-primary-50 text-primary\" (click)=\"closeMenus()\"\r\n          class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\">\r\n          <i class=\"mdi mdi-cog-outline text-xl\" aria-hidden=\"true\"></i>\r\n          {{ 'Configurations' | translate }}\r\n        </a>\r\n        }\r\n      </div>\r\n\r\n      <div class=\"mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2 dark:border-slate-800\">\r\n        <section>\r\n          <p class=\"mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700\"><i\r\n              class=\"mdi mdi-cash-multiple text-lg\"></i>{{ 'currency' | translate }}</p>\r\n          <div class=\"grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5\">@for (currency of\r\n            currencyService.options(); track currency.id) { <button type=\"button\"\r\n              class=\"flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600\"\r\n              [class.bg-white]=\"currency.code === currencyService.currentCurrency().code\"\r\n              [class.text-primary]=\"currency.code === currencyService.currentCurrency().code\"\r\n              [class.shadow-sm]=\"currency.code === currencyService.currentCurrency().code\"\r\n              (click)=\"switchCurrency(currency.code)\"><span\r\n                class=\"grid h-6 min-w-6 place-items-center rounded-md bg-slate-200 px-1 text-xs font-bold\"\r\n                [class.bg-primary-100]=\"currency.code === currencyService.currentCurrency().code\" aria-hidden=\"true\">{{\r\n                currency.symbol }}</span><span>{{ currency.code }}</span>@if (currency.code ===\r\n              currencyService.currentCurrency().code) { <i class=\"mdi mdi-check-circle text-base\"\r\n                aria-label=\"Selected\"></i> }</button> }</div>\r\n        </section>\r\n        <section>\r\n          <p class=\"mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 \">\r\n            <i class=\"mdi mdi-web text-lg\" aria-hidden=\"true\"></i>\r\n            {{ 'language' | translate }}\r\n          </p>\r\n          <div class=\"grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5 \">\r\n            <button type=\"button\" (click)=\"switchLanguage('en')\" [disabled]=\"switchingLanguage !== null\"\r\n              class=\"rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-60 \"\r\n              [class.bg-white]=\"currentLanguage === 'en'\" [class.text-primary]=\"currentLanguage === 'en'\"\r\n              [class.shadow-sm]=\"currentLanguage === 'en'\">\r\n              {{ 'languageEnglish' | translate }}\r\n            </button>\r\n            <button type=\"button\" (click)=\"switchLanguage('ar')\" [disabled]=\"switchingLanguage !== null\"\r\n              class=\"rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-60 \"\r\n              [class.bg-white]=\"currentLanguage === 'ar'\" [class.text-primary]=\"currentLanguage === 'ar'\"\r\n              [class.shadow-sm]=\"currentLanguage === 'ar'\">\r\n              {{ 'languageArabic' | translate }}\r\n            </button>\r\n          </div>\r\n        </section>\r\n\r\n        <section>\r\n          @if (isLoggedIn) {\r\n          <div class=\"mb-2 flex items-center gap-3 px-1\">\r\n            @if (profileImageUrl) {\r\n            <img [src]=\"profileImageUrl\" [alt]=\"userName\"\r\n              class=\"size-10 rounded-full object-cover ring-2 ring-primary/15\" />\r\n            } @else {\r\n            <span\r\n              class=\"flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary dark:bg-primary/15\">{{\r\n              userInitials }}</span>\r\n            }\r\n            <div class=\"min-w-0\">\r\n              <p class=\"truncate text-sm font-semibold text-slate-800 \">{{ userName }}</p>\r\n              <p class=\"truncate text-xs text-slate-500\">{{ userEmail }}</p>\r\n            </div>\r\n          </div>\r\n          <div class=\"grid grid-cols-2 gap-2\">\r\n            <a routerLink=\"/user-booking\" (click)=\"closeMenus()\"\r\n              class=\"flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 \">\r\n              <i data-feather=\"user\" class=\"size-4\"></i>\r\n              {{ 'myProfile' | translate }}\r\n            </a>\r\n            <button type=\"button\" (click)=\"logout()\"\r\n              class=\"flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary dark:border-slate-700 \">\r\n              <i data-feather=\"log-out\" class=\"size-4\"></i>\r\n              {{ 'signOut' | translate }}\r\n            </button>\r\n          </div>\r\n          } @else {\r\n          <a routerLink=\"/login\" (click)=\"closeMenus()\"\r\n            class=\"flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90\">\r\n            <i data-feather=\"log-in\" class=\"size-4\"></i>\r\n            {{ 'signin' | translate }}\r\n          </a>\r\n          }\r\n        </section>\r\n      </div>\r\n    </div>\r\n  </nav>\r\n  }\r\n</header>" }]
    }], null, { closeAccountMenuOnOutsideClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeNavbar, { className: "HomeNavbar", filePath: "app/layout/home-navbar/home-navbar.ts", lineNumber: 30 }); })();
