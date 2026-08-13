import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, effect, ElementRef, HostListener, inject, } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import feather from 'feather-icons';
import { catchError, finalize, of } from 'rxjs';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/services/apiservice.service';
import { TaskNotificationsService } from '../../core/services/task-notifications.service';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../features/user/_services/auth.service';
import * as i0 from "@angular/core";
const _c0 = () => ({ exact: true });
const _forTrack0 = ($index, $item) => $item.id;
function ConfigurationsNavbar_Conditional_24_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 35);
} }
function ConfigurationsNavbar_Conditional_24_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 36);
} }
function ConfigurationsNavbar_Conditional_24_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 35);
} }
function ConfigurationsNavbar_Conditional_24_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 36);
} }
function ConfigurationsNavbar_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 31)(2, "button", 32);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_24_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchLanguage("en")); });
    i0.ɵɵelement(3, "i", 33);
    i0.ɵɵelementStart(4, "span", 34);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ConfigurationsNavbar_Conditional_24_Conditional_7_Template, 1, 0, "i", 35)(8, ConfigurationsNavbar_Conditional_24_Conditional_8_Template, 1, 0, "i", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 32);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_24_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchLanguage("ar")); });
    i0.ɵɵelement(10, "i", 37);
    i0.ɵɵelementStart(11, "span", 34);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(14, ConfigurationsNavbar_Conditional_24_Conditional_14_Template, 1, 0, "i", 35)(15, ConfigurationsNavbar_Conditional_24_Conditional_15_Template, 1, 0, "i", 36);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-primary-50", ctx_r1.currentLanguage === "en")("text-primary", ctx_r1.currentLanguage === "en");
    i0.ɵɵproperty("disabled", ctx_r1.switchingLanguage !== null);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 14, "languageEnglish"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.switchingLanguage === "en" ? 7 : ctx_r1.currentLanguage === "en" ? 8 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-primary-50", ctx_r1.currentLanguage === "ar")("text-primary", ctx_r1.currentLanguage === "ar");
    i0.ɵɵproperty("disabled", ctx_r1.switchingLanguage !== null);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 16, "languageArabic"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.switchingLanguage === "ar" ? 14 : ctx_r1.currentLanguage === "ar" ? 15 : -1);
} }
function ConfigurationsNavbar_Conditional_29_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.pendingTasksCount);
} }
function ConfigurationsNavbar_Conditional_29_Conditional_5_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_29_Conditional_5_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.markAllNotificationsAsRead()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "markAllAsRead"));
} }
function ConfigurationsNavbar_Conditional_29_Conditional_5_For_8_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const task_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(2, 1, task_r7.createdDate, "medium"));
} }
function ConfigurationsNavbar_Conditional_29_Conditional_5_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 50);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_29_Conditional_5_For_8_Template_a_click_0_listener() { const task_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.markNotificationAsRead(task_r7)); });
    i0.ɵɵelementStart(1, "span", 51);
    i0.ɵɵelement(2, "i", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53)(4, "span", 24);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 54);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(8, ConfigurationsNavbar_Conditional_29_Conditional_5_For_8_Conditional_8_Template, 3, 4, "span", 55);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const task_r7 = ctx.$implicit;
    i0.ɵɵclassProp("bg-primary-50", task_r7.isRead !== true);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(task_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(task_r7.message);
    i0.ɵɵadvance();
    i0.ɵɵconditional(task_r7.createdDate ? 8 : -1);
} }
function ConfigurationsNavbar_Conditional_29_Conditional_5_ForEmpty_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 47);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noNotifications"));
} }
function ConfigurationsNavbar_Conditional_29_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "div", 42)(2, "p", 43);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, ConfigurationsNavbar_Conditional_29_Conditional_5_Conditional_5_Template, 3, 3, "button", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 45);
    i0.ɵɵrepeaterCreate(7, ConfigurationsNavbar_Conditional_29_Conditional_5_For_8_Template, 9, 5, "a", 46, _forTrack0, false, ConfigurationsNavbar_Conditional_29_Conditional_5_ForEmpty_9_Template, 3, 3, "p", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "a", 48);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_29_Conditional_5_Template_a_click_10_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 4, "notifications"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.pendingTasksCount ? 5 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.agentTasks);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 6, "viewAllTasks"));
} }
function ConfigurationsNavbar_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19)(1, "button", 38);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_29_Template_button_click_1_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleNotifications($event)); });
    i0.ɵɵelement(3, "i", 39);
    i0.ɵɵconditionalCreate(4, ConfigurationsNavbar_Conditional_29_Conditional_4_Template, 2, 1, "span", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, ConfigurationsNavbar_Conditional_29_Conditional_5_Template, 13, 8, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 4, "notifications"))("aria-expanded", ctx_r1.notificationsOpen);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.pendingTasksCount > 0 ? 4 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.notificationsOpen ? 5 : -1);
} }
function ConfigurationsNavbar_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 21);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r1.profileImageUrl, i0.ɵɵsanitizeUrl)("alt", ctx_r1.userName);
} }
function ConfigurationsNavbar_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.userInitials, " ");
} }
function ConfigurationsNavbar_Conditional_42_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.userEmail);
} }
function ConfigurationsNavbar_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 56)(2, "p", 57);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(4, ConfigurationsNavbar_Conditional_42_Conditional_4_Template, 2, 1, "p", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 31)(6, "a", 58);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_42_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(7, "i", 59);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 60);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_42_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵelement(11, "i", 61);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.userName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.userEmail ? 4 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 4, "myProfile"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(13, 6, "signOut"), " ");
} }
function ConfigurationsNavbar_Conditional_46_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 76);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.pendingTasksCount);
} }
function ConfigurationsNavbar_Conditional_46_Conditional_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 93);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r1.profileImageUrl, i0.ɵɵsanitizeUrl)("alt", ctx_r1.userName);
} }
function ConfigurationsNavbar_Conditional_46_Conditional_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 94);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.userInitials);
} }
function ConfigurationsNavbar_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "nav", 30);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelementStart(2, "div", 62)(3, "a", 63);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(4, "i", 64);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 65);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_7_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(8, "i", 66);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "a", 67);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_11_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(12, "i", 68);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "a", 69);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_15_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(16, "i", 70);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "a", 71);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_19_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(20, "i", 72);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "a", 73);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_23_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(24, "i", 74);
    i0.ɵɵelementStart(25, "span", 75);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(28, ConfigurationsNavbar_Conditional_46_Conditional_28_Template, 2, 1, "span", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "a", 77);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_29_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(30, "i", 78);
    i0.ɵɵtext(31);
    i0.ɵɵpipe(32, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "a", 79);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_33_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(34, "i", 80);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "a", 81);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_37_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(38, "i", 82);
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "a", 83);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_41_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(42, "i", 84);
    i0.ɵɵtext(43);
    i0.ɵɵpipe(44, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "a", 85);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_45_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(46, "i", 86);
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "div", 87)(50, "section")(51, "p", 88);
    i0.ɵɵelement(52, "i", 89);
    i0.ɵɵtext(53);
    i0.ɵɵpipe(54, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "div", 90)(56, "button", 91);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchLanguage("en")); });
    i0.ɵɵtext(57);
    i0.ɵɵpipe(58, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "button", 91);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_button_click_59_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.switchLanguage("ar")); });
    i0.ɵɵtext(60);
    i0.ɵɵpipe(61, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(62, "section")(63, "div", 92);
    i0.ɵɵconditionalCreate(64, ConfigurationsNavbar_Conditional_46_Conditional_64_Template, 1, 2, "img", 93)(65, ConfigurationsNavbar_Conditional_46_Conditional_65_Template, 2, 1, "span", 94);
    i0.ɵɵelementStart(66, "div", 53)(67, "p", 8);
    i0.ɵɵtext(68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "p", 9);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(71, "div", 95)(72, "a", 96);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_72_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(73, "i", 59);
    i0.ɵɵtext(74);
    i0.ɵɵpipe(75, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "button", 97);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_button_click_76_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵelement(77, "i", 61);
    i0.ɵɵtext(78);
    i0.ɵɵpipe(79, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(80, "a", 98);
    i0.ɵɵlistener("click", function ConfigurationsNavbar_Conditional_46_Template_a_click_80_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeMenus()); });
    i0.ɵɵelement(81, "i", 18);
    i0.ɵɵtext(82);
    i0.ɵɵpipe(83, "translate");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 47, "adminNavigation"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(83, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 49, "destinations"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(84, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 51, "tours"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(85, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 53, "packages"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(86, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 55, "bookings"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(87, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 57, "customers"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(88, _c0));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(27, 59, "tasks"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.isAgent && ctx_r1.pendingTasksCount > 0 ? 28 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(89, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(32, 61, "airlines"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(90, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 63, "hotels"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(91, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(40, 65, "flights"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(92, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(44, 67, "cities"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLinkActiveOptions", i0.ɵɵpureFunction0(93, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(48, 69, "quotations"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(54, 71, "language"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("bg-white", ctx_r1.currentLanguage === "en")("text-primary", ctx_r1.currentLanguage === "en")("shadow-sm", ctx_r1.currentLanguage === "en");
    i0.ɵɵproperty("disabled", ctx_r1.switchingLanguage !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 73, "languageEnglish"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-white", ctx_r1.currentLanguage === "ar")("text-primary", ctx_r1.currentLanguage === "ar")("shadow-sm", ctx_r1.currentLanguage === "ar");
    i0.ɵɵproperty("disabled", ctx_r1.switchingLanguage !== null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(61, 75, "languageArabic"));
    i0.ɵɵadvance(4);
    i0.ɵɵconditional(ctx_r1.profileImageUrl ? 64 : 65);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.userEmail);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(75, 77, "myProfile"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(79, 79, "signOut"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(83, 81, "viewWebsite"));
} }
export class ConfigurationsNavbar {
    authService = inject(AuthService);
    apiService = inject(ApiService);
    cdr = inject(ChangeDetectorRef);
    elementRef = inject((ElementRef));
    taskNotifications = inject(TaskNotificationsService);
    destroyRef = inject(DestroyRef);
    languageService = inject(LanguageService);
    constructor() {
        effect(() => {
            this.taskNotifications.changed();
            if (this.isAgent)
                this.loadAgentTasks();
        });
    }
    accountMenuOpen = false;
    mobileMenuOpen = false;
    notificationsOpen = false;
    languageMenuOpen = false;
    switchingLanguage = null;
    agentTasks = [];
    get isAgent() {
        return this.authService.getCurrentUserRole() === 'Agent';
    }
    get pendingTasksCount() {
        return this.agentTasks.filter((notification) => notification?.isRead !== true).length;
    }
    get roleTranslationKey() {
        return this.isAgent ? 'agent' : 'administrator';
    }
    ngOnInit() {
        if (this.isAgent) {
            timer(0, 30000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadAgentTasks());
        }
    }
    loadAgentTasks() {
        this.apiService.get('Notifications/Mine?unreadOnly=false').pipe(catchError(() => of(null)), finalize(() => this.cdr.markForCheck())).subscribe((response) => {
            if (response === null)
                return;
            const rows = response?.data ?? response;
            this.agentTasks = Array.isArray(rows) ? rows : [];
        });
    }
    markNotificationAsRead(notification) {
        this.notificationsOpen = false;
        if (notification?.isRead === true || !notification?.id)
            return;
        notification.isRead = true;
        this.apiService.patch(`Notifications/${notification.id}/Read`, {}).pipe(catchError(() => of(null)), finalize(() => this.cdr.markForCheck())).subscribe();
    }
    markAllNotificationsAsRead() {
        if (!this.pendingTasksCount)
            return;
        this.agentTasks.forEach((notification) => notification.isRead = true);
        this.apiService.patch('Notifications/ReadAll', {}).pipe(catchError(() => of(null)), finalize(() => this.cdr.markForCheck())).subscribe();
    }
    toggleNotifications(event) {
        event.stopPropagation();
        this.notificationsOpen = !this.notificationsOpen;
        this.accountMenuOpen = false;
        if (this.notificationsOpen)
            this.loadAgentTasks();
        this.refreshIcons();
    }
    get currentLanguage() {
        return this.languageService.getCurrentLanguage();
    }
    toggleLanguageMenu(event) {
        event.stopPropagation();
        this.languageMenuOpen = !this.languageMenuOpen;
        this.accountMenuOpen = false;
        this.notificationsOpen = false;
        this.refreshIcons();
    }
    switchLanguage(language) {
        if (this.switchingLanguage !== null)
            return;
        this.switchingLanguage = language;
        this.mobileMenuOpen = false;
        this.languageService.setGLobalLanguage(language).pipe(finalize(() => {
            this.switchingLanguage = null;
            this.closeMenus();
            this.cdr.markForCheck();
        })).subscribe({ error: () => { } });
    }
    get userName() {
        const user = this.authService.getCurentUser();
        return [user?.firstName, user?.lastName].filter(Boolean).join(' ')
            || this.languageService.translate.instant('administrator');
    }
    get userEmail() {
        return this.authService.getCurentUser()?.email ?? '';
    }
    get profileImageUrl() {
        return this.authService.profileImageUrl();
    }
    get userInitials() {
        const initials = this.userName
            .split(' ')
            .slice(0, 2)
            .map((name) => name.charAt(0))
            .join('');
        return initials.toUpperCase() || 'A';
    }
    ngAfterViewInit() {
        this.refreshIcons();
    }
    toggleAccountMenu(event) {
        event.stopPropagation();
        this.accountMenuOpen = !this.accountMenuOpen;
        this.mobileMenuOpen = false;
        this.languageMenuOpen = false;
        this.notificationsOpen = false;
        this.refreshIcons();
    }
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        this.accountMenuOpen = false;
        this.languageMenuOpen = false;
        this.notificationsOpen = false;
        this.refreshIcons();
    }
    closeMenus() {
        this.accountMenuOpen = false;
        this.mobileMenuOpen = false;
        this.notificationsOpen = false;
        this.languageMenuOpen = false;
    }
    logout() {
        this.closeMenus();
        this.authService.logout();
    }
    closeAccountMenuOnOutsideClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.accountMenuOpen = false;
            this.notificationsOpen = false;
            this.languageMenuOpen = false;
        }
    }
    closeOnEscape() {
        this.closeMenus();
    }
    refreshIcons() {
        requestAnimationFrame(() => feather.replace());
        this.cdr.markForCheck();
    }
    static ɵfac = function ConfigurationsNavbar_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConfigurationsNavbar)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConfigurationsNavbar, selectors: [["app-configurations-navbar"]], hostBindings: function ConfigurationsNavbar_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function ConfigurationsNavbar_click_HostBindingHandler($event) { return ctx.closeAccountMenuOnOutsideClick($event); }, i0.ɵɵresolveDocument)("keydown.escape", function ConfigurationsNavbar_keydown_escape_HostBindingHandler() { return ctx.closeOnEscape(); }, i0.ɵɵresolveDocument);
        } }, decls: 47, vars: 43, consts: [[1, "sticky", "top-0", "z-40", "border-b", "border-slate-200", "bg-white/95", "shadow-sm", "backdrop-blur", "dark:border-slate-800", "/95"], [1, "mx-auto", "flex", "h-16", "items-center", "gap-2", "px-3", "sm:h-20", "sm:gap-4", "sm:px-6", "lg:px-8"], ["routerLink", "/home", 1, "flex", "min-w-0", "shrink-0", "items-center", "gap-3"], ["src", "./assets/images/main-logo.png", "alt", "Sea World Holidays", 1, "h-10", "w-auto", "shrink-0", "sm:h-12"], [1, "hidden", "sm:block"], [1, "block", "text-lg", "font-bold", "leading-tight", "text-primary"], [1, "hidden", "h-8", "w-px", "bg-slate-200", "lg:block"], [1, "hidden", "min-w-0", "flex-1", "lg:block"], [1, "truncate", "text-sm", "font-semibold", "text-slate-800"], [1, "truncate", "text-xs", "text-slate-500"], [1, "ms-auto", "flex", "min-w-0", "items-center", "gap-1", "sm:gap-2"], [1, "relative", "hidden", "lg:block"], ["type", "button", "aria-haspopup", "menu", 1, "flex", "items-center", "gap-1.5", "rounded-xl", "border", "border-slate-200", "px-3", "py-2", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:border-primary", "hover:text-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", "dark:border-slate-700", 3, "click", "disabled"], [1, "mdi", "mdi-web", "text-base", "leading-none"], [1, "uppercase"], [1, "mdi", "text-base", "leading-none"], ["role", "menu", 1, "absolute", "end-0", "mt-2", "w-48", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg", "dark:border-slate-700"], ["routerLink", "/home", 1, "hidden", "items-center", "gap-2", "rounded-xl", "border", "border-slate-200", "px-3", "py-2", "text-sm", "font-semibold", "text-slate-600", "transition", "hover:border-primary", "hover:text-primary", "lg:flex", "dark:border-slate-700"], ["data-feather", "external-link", 1, "size-4"], [1, "relative"], ["type", "button", "aria-haspopup", "menu", 1, "flex", "items-center", "gap-3", "rounded-2xl", "p-1.5", "text-left", "transition", "hover:bg-slate-100", "dark:hover:bg-slate-800", 3, "click"], [1, "size-9", "rounded-full", "object-cover", "ring-2", "ring-primary/15", 3, "src", "alt"], [1, "flex", "size-9", "items-center", "justify-center", "rounded-full", "bg-primary-50", "text-sm", "font-bold", "text-primary", "dark:bg-primary/15"], [1, "hidden", "max-w-36", "md:block"], [1, "block", "truncate", "text-sm", "font-semibold", "text-slate-800"], [1, "block", "truncate", "text-xs", "text-slate-500"], ["data-feather", "chevron-down", 1, "hidden", "size-4", "text-slate-400", "md:block"], ["role", "menu", 1, "absolute", "end-0", "mt-2", "w-64", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg", "dark:border-slate-700"], ["type", "button", 1, "flex", "size-10", "items-center", "justify-center", "rounded-xl", "border", "border-slate-200", "text-slate-600", "lg:hidden", "dark:border-slate-700", 3, "click"], ["aria-hidden", "true", 1, "mdi", "text-xl", "leading-none"], [1, "max-h-[calc(100vh-4rem)]", "overflow-y-auto", "border-t", "border-slate-200", "bg-white", "px-4", "py-4", "shadow-lg", "lg:hidden", "dark:border-slate-800"], [1, "p-2"], ["type", "button", "role", "menuitem", 1, "flex", "w-full", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", "dark:hover:bg-slate-800", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-alphabet-latin", "text-lg"], [1, "flex-1", "text-start"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin", "text-base"], ["aria-hidden", "true", 1, "mdi", "mdi-check", "text-base"], ["aria-hidden", "true", 1, "mdi", "mdi-abjad-arabic", "text-lg"], ["type", "button", 1, "relative", "flex", "size-10", "items-center", "justify-center", "rounded-xl", "text-slate-500", "transition", "hover:bg-slate-100", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["data-feather", "bell", 1, "size-5"], [1, "absolute", "-right-1", "-top-1", "grid", "h-5", "min-w-5", "place-items-center", "rounded-full", "border-2", "border-white", "bg-rose-600", "px-1", "text-[10px]", "font-bold", "text-white", "dark:border-slate-950"], ["role", "menu", 1, "absolute", "end-0", "mt-2", "w-80", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-lg", "dark:border-slate-700"], [1, "flex", "items-center", "justify-between", "border-b", "border-slate-100", "px-4", "py-3", "dark:border-slate-800"], [1, "text-sm", "font-semibold", "text-slate-900"], ["type", "button", 1, "text-xs", "font-semibold", "text-primary"], [1, "max-h-80", "overflow-y-auto", "p-2"], ["routerLink", "/configurations/tasks", "role", "menuitem", 1, "flex", "items-start", "gap-3", "rounded-xl", "px-3", "py-2", "transition", "hover:bg-slate-50", "dark:hover:bg-slate-800", 3, "bg-primary-50"], [1, "p-4", "text-center", "text-sm", "text-slate-500"], ["routerLink", "/configurations/tasks", 1, "block", "border-t", "border-slate-100", "px-4", "py-3", "text-center", "text-sm", "font-semibold", "text-primary", "hover:bg-slate-50", "dark:border-slate-800", "dark:hover:bg-slate-800", 3, "click"], ["type", "button", 1, "text-xs", "font-semibold", "text-primary", 3, "click"], ["routerLink", "/configurations/tasks", "role", "menuitem", 1, "flex", "items-start", "gap-3", "rounded-xl", "px-3", "py-2", "transition", "hover:bg-slate-50", "dark:hover:bg-slate-800", 3, "click"], [1, "mt-1", "grid", "size-8", "shrink-0", "place-items-center", "rounded-full", "bg-primary-50", "text-primary"], [1, "mdi", "mdi-bell-ring-outline"], [1, "min-w-0"], [1, "line-clamp-2", "text-xs", "text-slate-500"], [1, "mt-1", "block", "text-[11px]", "text-slate-400"], [1, "border-b", "border-slate-100", "px-4", "py-3", "dark:border-slate-800"], [1, "truncate", "text-sm", "font-semibold", "text-slate-900"], ["routerLink", "/user-booking", "role", "menuitem", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click"], ["data-feather", "user", 1, "size-4"], ["type", "button", "role", "menuitem", 1, "flex", "w-full", "items-center", "gap-3", "rounded-xl", "px-3", "py-2", "text-sm", "font-medium", "text-slate-600", "transition", "hover:bg-primary-50", "hover:text-primary", "dark:hover:bg-primary/10", 3, "click"], ["data-feather", "log-out", 1, "size-4"], [1, "grid", "gap-1", "sm:grid-cols-2"], ["routerLink", "/configurations/destinations", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-map-marker-outline", "text-xl"], ["routerLink", "/configurations/tours", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-compass-outline", "text-xl"], ["routerLink", "/configurations/packages", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-package-variant-closed", "text-xl"], ["routerLink", "/configurations/bookings", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-calendar-check-outline", "text-xl"], ["routerLink", "/configurations/customers", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-account-group-outline", "text-xl"], ["routerLink", "/configurations/tasks", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-checkbox-marked-outline", "text-xl"], [1, "flex-1"], [1, "rounded-full", "bg-rose-600", "px-2", "py-0.5", "text-xs", "font-bold", "text-white"], ["routerLink", "/configurations/airlines", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-airplane", "text-xl"], ["routerLink", "/configurations/hotels", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-bed-outline", "text-xl"], ["routerLink", "/configurations/flights", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-airplane-takeoff", "text-xl"], ["routerLink", "/configurations/cities", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-city-variant-outline", "text-xl"], ["routerLink", "/configurations/quotations", "routerLinkActive", "!bg-primary !text-white shadow-sm", "ariaCurrentWhenActive", "page", 1, "flex", "items-center", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:bg-slate-50", "hover:text-primary", "dark:hover:bg-slate-800", 3, "click", "routerLinkActiveOptions"], [1, "mdi", "mdi-file-document-outline", "text-xl"], [1, "mt-4", "grid", "gap-4", "border-t", "border-slate-200", "pt-4", "sm:grid-cols-2", "dark:border-slate-800"], [1, "mb-2", "flex", "items-center", "gap-2", "text-sm", "font-semibold", "text-slate-700"], [1, "mdi", "mdi-web", "text-lg"], [1, "grid", "grid-cols-2", "gap-2", "rounded-2xl", "bg-slate-100", "p-1.5"], ["type", "button", 1, "rounded-xl", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "transition", "disabled:opacity-60", 3, "click", "disabled"], [1, "mb-2", "flex", "items-center", "gap-3", "px-1"], [1, "size-10", "rounded-full", "object-cover", "ring-2", "ring-primary/15", 3, "src", "alt"], [1, "flex", "size-10", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-primary-50", "text-sm", "font-bold", "text-primary", "dark:bg-primary/15"], [1, "grid", "grid-cols-2", "gap-2"], ["routerLink", "/user-booking", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "border", "border-slate-200", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:border-primary", "hover:text-primary", "dark:border-slate-700", 3, "click"], ["type", "button", 1, "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "border", "border-slate-200", "px-3", "py-2.5", "text-sm", "font-semibold", "text-slate-600", "hover:border-primary", "hover:text-primary", "dark:border-slate-700", 3, "click"], ["routerLink", "/home", 1, "mt-2", "flex", "items-center", "justify-center", "gap-2", "rounded-xl", "bg-primary", "px-3", "py-2.5", "text-sm", "font-semibold", "text-white", 3, "click"]], template: function ConfigurationsNavbar_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵpipe(3, "translate");
            i0.ɵɵelement(4, "img", 3);
            i0.ɵɵelementStart(5, "span", 4)(6, "span", 5);
            i0.ɵɵtext(7, "Sea World Holidays");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(8, "div", 6);
            i0.ɵɵelementStart(9, "div", 7)(10, "p", 8);
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p", 9);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 10)(17, "div", 11)(18, "button", 12);
            i0.ɵɵpipe(19, "translate");
            i0.ɵɵlistener("click", function ConfigurationsNavbar_Template_button_click_18_listener($event) { return ctx.toggleLanguageMenu($event); });
            i0.ɵɵelement(20, "i", 13);
            i0.ɵɵelementStart(21, "span", 14);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "i", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(24, ConfigurationsNavbar_Conditional_24_Template, 16, 18, "div", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "a", 17);
            i0.ɵɵelement(26, "i", 18);
            i0.ɵɵtext(27);
            i0.ɵɵpipe(28, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(29, ConfigurationsNavbar_Conditional_29_Template, 6, 6, "div", 19);
            i0.ɵɵelementStart(30, "div", 11)(31, "button", 20);
            i0.ɵɵpipe(32, "translate");
            i0.ɵɵlistener("click", function ConfigurationsNavbar_Template_button_click_31_listener($event) { return ctx.toggleAccountMenu($event); });
            i0.ɵɵconditionalCreate(33, ConfigurationsNavbar_Conditional_33_Template, 1, 2, "img", 21)(34, ConfigurationsNavbar_Conditional_34_Template, 2, 1, "span", 22);
            i0.ɵɵelementStart(35, "span", 23)(36, "span", 24);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "span", 25);
            i0.ɵɵtext(39);
            i0.ɵɵpipe(40, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(41, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(42, ConfigurationsNavbar_Conditional_42_Template, 14, 8, "div", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "button", 28);
            i0.ɵɵpipe(44, "translate");
            i0.ɵɵlistener("click", function ConfigurationsNavbar_Template_button_click_43_listener() { return ctx.toggleMobileMenu(); });
            i0.ɵɵelement(45, "i", 29);
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(46, ConfigurationsNavbar_Conditional_46_Template, 84, 94, "nav", 30);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 27, "homeLinkLabel"));
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 29, "contentManagement"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 31, "manageTravelContent"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.switchingLanguage !== null);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(19, 33, "language"))("aria-expanded", ctx.languageMenuOpen);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.currentLanguage);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("mdi-chevron-down", !ctx.languageMenuOpen)("mdi-chevron-up", ctx.languageMenuOpen);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.languageMenuOpen ? 24 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(28, 35, "viewWebsite"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isAgent ? 29 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(32, 37, "openAccountMenu"))("aria-expanded", ctx.accountMenuOpen);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.profileImageUrl ? 33 : 34);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.userName);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(40, 39, ctx.roleTranslationKey));
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.accountMenuOpen ? 42 : -1);
            i0.ɵɵadvance();
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(44, 41, "toggleAdminNavigation"))("aria-expanded", ctx.mobileMenuOpen);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("mdi-menu", !ctx.mobileMenuOpen)("mdi-close", ctx.mobileMenuOpen);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mobileMenuOpen ? 46 : -1);
        } }, dependencies: [RouterLink, RouterLinkActive, DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfigurationsNavbar, [{
        type: Component,
        args: [{ selector: 'app-configurations-navbar', imports: [RouterLink, RouterLinkActive, DatePipe, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 /95\">\r\n  <div class=\"mx-auto flex h-16 items-center gap-2 px-3 sm:h-20 sm:gap-4 sm:px-6 lg:px-8\">\r\n    <a routerLink=\"/home\" class=\"flex min-w-0 shrink-0 items-center gap-3\" [attr.aria-label]=\"'homeLinkLabel' | translate\">\r\n      <img src=\"./assets/images/main-logo.png\" class=\"h-10 w-auto shrink-0 sm:h-12\" alt=\"Sea World Holidays\">\r\n      <span class=\"hidden sm:block\">\r\n        <span class=\"block text-lg font-bold leading-tight text-primary \">Sea World Holidays</span>\r\n      </span>\r\n    </a>\r\n\r\n    <div class=\"hidden h-8 w-px bg-slate-200 lg:block \"></div>\r\n\r\n    <div class=\"hidden min-w-0 flex-1 lg:block\">\r\n      <p class=\"truncate text-sm font-semibold text-slate-800 \">{{ 'contentManagement' | translate }}</p>\r\n      <p class=\"truncate text-xs text-slate-500 \">{{ 'manageTravelContent' | translate }}</p>\r\n    </div>\r\n\r\n    <div class=\"ms-auto flex min-w-0 items-center gap-1 sm:gap-2\">\r\n      <div class=\"relative hidden lg:block\">\r\n        <button type=\"button\"\r\n          class=\"flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 \"\r\n          [disabled]=\"switchingLanguage !== null\"\r\n          [attr.aria-label]=\"'language' | translate\" aria-haspopup=\"menu\" [attr.aria-expanded]=\"languageMenuOpen\"\r\n          (click)=\"toggleLanguageMenu($event)\">\r\n          <i class=\"mdi mdi-web text-base leading-none\"></i>\r\n          <span class=\"uppercase\">{{ currentLanguage }}</span>\r\n          <i class=\"mdi text-base leading-none\" [class.mdi-chevron-down]=\"!languageMenuOpen\" [class.mdi-chevron-up]=\"languageMenuOpen\"></i>\r\n        </button>\r\n        @if (languageMenuOpen) {\r\n          <div class=\"absolute end-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 \" role=\"menu\">\r\n            <div class=\"p-2\">\r\n              <button type=\"button\" (click)=\"switchLanguage('en')\" [disabled]=\"switchingLanguage !== null\" class=\"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60  dark:hover:bg-slate-800\" [class.bg-primary-50]=\"currentLanguage === 'en'\" [class.text-primary]=\"currentLanguage === 'en'\" role=\"menuitem\">\r\n                <i class=\"mdi mdi-alphabet-latin text-lg\" aria-hidden=\"true\"></i>\r\n                <span class=\"flex-1 text-start\">{{ 'languageEnglish' | translate }}</span>\r\n                @if (switchingLanguage === 'en') { <i class=\"mdi mdi-loading mdi-spin text-base\" aria-hidden=\"true\"></i> }\r\n                @else if (currentLanguage === 'en') { <i class=\"mdi mdi-check text-base\" aria-hidden=\"true\"></i> }\r\n              </button>\r\n              <button type=\"button\" (click)=\"switchLanguage('ar')\" [disabled]=\"switchingLanguage !== null\" class=\"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60  dark:hover:bg-slate-800\" [class.bg-primary-50]=\"currentLanguage === 'ar'\" [class.text-primary]=\"currentLanguage === 'ar'\" role=\"menuitem\">\r\n                <i class=\"mdi mdi-abjad-arabic text-lg\" aria-hidden=\"true\"></i>\r\n                <span class=\"flex-1 text-start\">{{ 'languageArabic' | translate }}</span>\r\n                @if (switchingLanguage === 'ar') { <i class=\"mdi mdi-loading mdi-spin text-base\" aria-hidden=\"true\"></i> }\r\n                @else if (currentLanguage === 'ar') { <i class=\"mdi mdi-check text-base\" aria-hidden=\"true\"></i> }\r\n              </button>\r\n            </div>\r\n          </div>\r\n        }\r\n      </div>\r\n      <a\r\n        routerLink=\"/home\"\r\n        class=\"hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary hover:text-primary lg:flex dark:border-slate-700 \"\r\n      >\r\n        <i data-feather=\"external-link\" class=\"size-4\"></i>\r\n        {{ 'viewWebsite' | translate }}\r\n      </a>\r\n\r\n      @if (isAgent) {\r\n        <div class=\"relative\">\r\n          <button\r\n            type=\"button\"\r\n            class=\"relative flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-primary  dark:hover:bg-slate-800\"\r\n            [attr.aria-label]=\"'notifications' | translate\"\r\n            [attr.aria-expanded]=\"notificationsOpen\"\r\n            (click)=\"toggleNotifications($event)\"\r\n          >\r\n            <i data-feather=\"bell\" class=\"size-5\"></i>\r\n            @if (pendingTasksCount > 0) {\r\n              <span class=\"absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-white bg-rose-600 px-1 text-[10px] font-bold text-white dark:border-slate-950\">{{ pendingTasksCount }}</span>\r\n            }\r\n          </button>\r\n\r\n          @if (notificationsOpen) {\r\n            <div class=\"absolute end-0 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 \" role=\"menu\">\r\n              <div class=\"flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800\">\r\n                <p class=\"text-sm font-semibold text-slate-900 \">{{ 'notifications' | translate }}</p>\r\n                @if (pendingTasksCount) { <button type=\"button\" class=\"text-xs font-semibold text-primary\" (click)=\"markAllNotificationsAsRead()\">{{ 'markAllAsRead' | translate }}</button> }\r\n              </div>\r\n              <div class=\"max-h-80 overflow-y-auto p-2\">\r\n                @for (task of agentTasks; track task.id) {\r\n                  <a routerLink=\"/configurations/tasks\" (click)=\"markNotificationAsRead(task)\" class=\"flex items-start gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-50 dark:hover:bg-slate-800\" [class.bg-primary-50]=\"task.isRead !== true\" role=\"menuitem\">\r\n                    <span class=\"mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-primary-50 text-primary\">\r\n                      <i class=\"mdi mdi-bell-ring-outline\"></i>\r\n                    </span>\r\n                    <span class=\"min-w-0\">\r\n                      <span class=\"block truncate text-sm font-semibold text-slate-800 \">{{ task.title }}</span>\r\n                      <span class=\"line-clamp-2 text-xs text-slate-500 \">{{ task.message }}</span>\r\n                      @if (task.createdDate) { <span class=\"mt-1 block text-[11px] text-slate-400\">{{ task.createdDate | date: 'medium' }}</span> }\r\n                    </span>\r\n                  </a>\r\n                } @empty {\r\n                  <p class=\"p-4 text-center text-sm text-slate-500\">{{ 'noNotifications' | translate }}</p>\r\n                }\r\n              </div>\r\n              <a routerLink=\"/configurations/tasks\" (click)=\"closeMenus()\" class=\"block border-t border-slate-100 px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800\">{{ 'viewAllTasks' | translate }}</a>\r\n            </div>\r\n          }\r\n        </div>\r\n      }\r\n\r\n      <div class=\"relative hidden lg:block\">\r\n        <button\r\n          type=\"button\"\r\n          class=\"flex items-center gap-3 rounded-2xl p-1.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800\"\r\n          [attr.aria-label]=\"'openAccountMenu' | translate\"\r\n          aria-haspopup=\"menu\"\r\n          [attr.aria-expanded]=\"accountMenuOpen\"\r\n          (click)=\"toggleAccountMenu($event)\"\r\n        >\r\n          @if (profileImageUrl) {\r\n            <img [src]=\"profileImageUrl\" [alt]=\"userName\" class=\"size-9 rounded-full object-cover ring-2 ring-primary/15\" />\r\n          } @else {\r\n            <span class=\"flex size-9 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary dark:bg-primary/15\">\r\n              {{ userInitials }}\r\n            </span>\r\n          }\r\n          <span class=\"hidden max-w-36 md:block\">\r\n            <span class=\"block truncate text-sm font-semibold text-slate-800 \">{{ userName }}</span>\r\n            <span class=\"block truncate text-xs text-slate-500 \">{{ roleTranslationKey | translate }}</span>\r\n          </span>\r\n          <i data-feather=\"chevron-down\" class=\"hidden size-4 text-slate-400 md:block\"></i>\r\n        </button>\r\n\r\n        @if (accountMenuOpen) {\r\n          <div class=\"absolute end-0 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 \" role=\"menu\">\r\n            <div class=\"border-b border-slate-100 px-4 py-3 dark:border-slate-800\">\r\n              <p class=\"truncate text-sm font-semibold text-slate-900 \">{{ userName }}</p>\r\n              @if (userEmail) {\r\n                <p class=\"truncate text-xs text-slate-500 \">{{ userEmail }}</p>\r\n              }\r\n            </div>\r\n            <div class=\"p-2\">\r\n              <a routerLink=\"/user-booking\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\" role=\"menuitem\">\r\n                <i data-feather=\"user\" class=\"size-4\"></i>\r\n                {{ 'myProfile' | translate }}\r\n              </a>\r\n              <button type=\"button\" (click)=\"logout()\" class=\"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-primary-50 hover:text-primary  dark:hover:bg-primary/10\" role=\"menuitem\">\r\n                <i data-feather=\"log-out\" class=\"size-4\"></i>\r\n                {{ 'signOut' | translate }}\r\n              </button>\r\n            </div>\r\n          </div>\r\n        }\r\n      </div>\r\n\r\n      <button\r\n        type=\"button\"\r\n        class=\"flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden dark:border-slate-700 \"\r\n        [attr.aria-label]=\"'toggleAdminNavigation' | translate\"\r\n        [attr.aria-expanded]=\"mobileMenuOpen\"\r\n        (click)=\"toggleMobileMenu()\"\r\n      >\r\n        <i\r\n          class=\"mdi text-xl leading-none\"\r\n          [class.mdi-menu]=\"!mobileMenuOpen\"\r\n          [class.mdi-close]=\"mobileMenuOpen\"\r\n          aria-hidden=\"true\"\r\n        ></i>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  @if (mobileMenuOpen) {\r\n    <nav class=\"max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden dark:border-slate-800 \" [attr.aria-label]=\"'adminNavigation' | translate\">\r\n      <div class=\"grid gap-1 sm:grid-cols-2\">\r\n        <a routerLink=\"/configurations/destinations\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-map-marker-outline text-xl\"></i>{{ 'destinations' | translate }}</a>\r\n        <a routerLink=\"/configurations/tours\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-compass-outline text-xl\"></i>{{ 'tours' | translate }}</a>\r\n        <a routerLink=\"/configurations/packages\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-package-variant-closed text-xl\"></i>{{ 'packages' | translate }}</a>\r\n        <a routerLink=\"/configurations/bookings\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-calendar-check-outline text-xl\"></i>{{ 'bookings' | translate }}</a>\r\n        <a routerLink=\"/configurations/customers\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-account-group-outline text-xl\"></i>{{ 'customers' | translate }}</a>\r\n        <a routerLink=\"/configurations/tasks\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\">\r\n          <i class=\"mdi mdi-checkbox-marked-outline text-xl\"></i>\r\n          <span class=\"flex-1\">{{ 'tasks' | translate }}</span>\r\n          @if (isAgent && pendingTasksCount > 0) { <span class=\"rounded-full bg-rose-600 px-2 py-0.5 text-xs font-bold text-white\">{{ pendingTasksCount }}</span> }\r\n        </a>\r\n        <a routerLink=\"/configurations/airlines\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-airplane text-xl\"></i>{{ 'airlines' | translate }}</a>\r\n        <a routerLink=\"/configurations/hotels\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-bed-outline text-xl\"></i>{{ 'hotels' | translate }}</a>\r\n        <a routerLink=\"/configurations/flights\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-airplane-takeoff text-xl\"></i>{{ 'flights' | translate }}</a>\r\n        <a routerLink=\"/configurations/cities\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-city-variant-outline text-xl\"></i>{{ 'cities' | translate }}</a>\r\n        <a routerLink=\"/configurations/quotations\" routerLinkActive=\"!bg-primary !text-white shadow-sm\" [routerLinkActiveOptions]=\"{ exact: true }\" ariaCurrentWhenActive=\"page\" (click)=\"closeMenus()\" class=\"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary  dark:hover:bg-slate-800\"><i class=\"mdi mdi-file-document-outline text-xl\"></i>{{ 'quotations' | translate }}</a>\r\n      </div>\r\n\r\n      <div class=\"mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2 dark:border-slate-800\">\r\n        <section>\r\n          <p class=\"mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 \"><i class=\"mdi mdi-web text-lg\"></i>{{ 'language' | translate }}</p>\r\n          <div class=\"grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5 \">\r\n            <button type=\"button\" (click)=\"switchLanguage('en')\" [disabled]=\"switchingLanguage !== null\" class=\"rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition disabled:opacity-60 \" [class.bg-white]=\"currentLanguage === 'en'\" [class.text-primary]=\"currentLanguage === 'en'\" [class.shadow-sm]=\"currentLanguage === 'en'\">{{ 'languageEnglish' | translate }}</button>\r\n            <button type=\"button\" (click)=\"switchLanguage('ar')\" [disabled]=\"switchingLanguage !== null\" class=\"rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition disabled:opacity-60 \" [class.bg-white]=\"currentLanguage === 'ar'\" [class.text-primary]=\"currentLanguage === 'ar'\" [class.shadow-sm]=\"currentLanguage === 'ar'\">{{ 'languageArabic' | translate }}</button>\r\n          </div>\r\n        </section>\r\n\r\n        <section>\r\n          <div class=\"mb-2 flex items-center gap-3 px-1\">\r\n            @if (profileImageUrl) {\r\n              <img [src]=\"profileImageUrl\" [alt]=\"userName\" class=\"size-10 rounded-full object-cover ring-2 ring-primary/15\" />\r\n            } @else {\r\n              <span class=\"flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary dark:bg-primary/15\">{{ userInitials }}</span>\r\n            }\r\n            <div class=\"min-w-0\"><p class=\"truncate text-sm font-semibold text-slate-800 \">{{ userName }}</p><p class=\"truncate text-xs text-slate-500\">{{ userEmail }}</p></div>\r\n          </div>\r\n          <div class=\"grid grid-cols-2 gap-2\">\r\n            <a routerLink=\"/user-booking\" (click)=\"closeMenus()\" class=\"flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary dark:border-slate-700 \"><i data-feather=\"user\" class=\"size-4\"></i>{{ 'myProfile' | translate }}</a>\r\n            <button type=\"button\" (click)=\"logout()\" class=\"flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary dark:border-slate-700 \"><i data-feather=\"log-out\" class=\"size-4\"></i>{{ 'signOut' | translate }}</button>\r\n          </div>\r\n          <a routerLink=\"/home\" (click)=\"closeMenus()\" class=\"mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-white\"><i data-feather=\"external-link\" class=\"size-4\"></i>{{ 'viewWebsite' | translate }}</a>\r\n        </section>\r\n      </div>\r\n    </nav>\r\n  }\r\n</header>\r\n" }]
    }], () => [], { closeAccountMenuOnOutsideClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], closeOnEscape: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConfigurationsNavbar, { className: "ConfigurationsNavbar", filePath: "app/layout/admin-navbar/configurations-navbar.ts", lineNumber: 31 }); })();
