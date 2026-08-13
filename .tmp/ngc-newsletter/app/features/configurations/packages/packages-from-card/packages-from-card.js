import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { createEmptyTourItinerary, readTourItinerary } from '../../shared/tour-itinerary.model';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import { hasInvalidItinerary, hasItineraryTimeOverlap, } from '../../shared/itinerary-validation.util';
import * as i0 from "@angular/core";
import * as i1 from "../../admin.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
const _c0 = () => ({ standalone: true });
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.id ?? $item.destinationId;
function _forTrack2($index, $item) { /* @ts-ignore */
return this.destinationId($item); }
const _forTrack3 = ($index, $item) => $item.url;
function PackagesFromCard_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0)(1, "div", 18);
    i0.ɵɵelement(2, "span", 19);
    i0.ɵɵelementStart(3, "p", 20);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, ctx_r0.screenLoaderMessage));
} }
function PackagesFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function PackagesFromCard_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function PackagesFromCard_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 21)(1, "span", 22);
    i0.ɵɵelement(2, "i", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "p", 24);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 25);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("border-primary", ctx_r0.activeStep === step_r2.id)("bg-primary-50", ctx_r0.activeStep === step_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bg-primary", ctx_r0.activeStep === step_r2.id)("text-white", ctx_r0.activeStep === step_r2.id)("bg-emerald-100", ctx_r0.completedStep >= step_r2.id && ctx_r0.activeStep !== step_r2.id)("text-emerald-600", ctx_r0.completedStep >= step_r2.id && ctx_r0.activeStep !== step_r2.id)("bg-slate-100", ctx_r0.completedStep < step_r2.id && ctx_r0.activeStep !== step_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r0.completedStep >= step_r2.id && ctx_r0.activeStep !== step_r2.id ? "mdi mdi-check" : "mdi " + step_r2.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(6, 19, "step"), " ", step_r2.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 21, step_r2.label));
} }
function PackagesFromCard_Conditional_15_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "fieldRequired"));
} }
function PackagesFromCard_Conditional_15_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "fieldRequired"));
} }
function PackagesFromCard_Conditional_15_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" : ", ctx_r0.selectedDestinations.length, " ");
} }
function PackagesFromCard_Conditional_15_Conditional_32_For_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 60);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_15_Conditional_32_For_6_Template_button_click_0_listener() { const destination_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.toggleDestination(destination_r6)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "i", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("bg-primary-50", ctx_r0.isDestinationSelected(destination_r6))("text-primary", ctx_r0.isDestinationSelected(destination_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.destinationLabel(destination_r6));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("mdi-checkbox-marked", ctx_r0.isDestinationSelected(destination_r6))("mdi-checkbox-blank-outline", !ctx_r0.isDestinationSelected(destination_r6));
} }
function PackagesFromCard_Conditional_15_Conditional_32_ForEmpty_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 59);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noDestinationsFound"));
} }
function PackagesFromCard_Conditional_15_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 37)(1, "div", 55)(2, "input", 56);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵlistener("input", function PackagesFromCard_Conditional_15_Conditional_32_Template_input_input_2_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.updateDestinationSearch($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 57);
    i0.ɵɵrepeaterCreate(5, PackagesFromCard_Conditional_15_Conditional_32_For_6_Template, 4, 9, "button", 58, _forTrack1, false, PackagesFromCard_Conditional_15_Conditional_32_ForEmpty_7_Template, 3, 3, "p", 59);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r0.destinationSearchTerm)("placeholder", i0.ɵɵpipeBind1(3, 3, "searchDestinations"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.filteredDestinations);
} }
function PackagesFromCard_Conditional_15_Conditional_33_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 61)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 62);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_15_Conditional_33_For_2_Template_button_click_3_listener() { const destination_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.removeDestination(ctx_r0.destinationId(destination_r8))); });
    i0.ɵɵelement(4, "i", 63);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const destination_r8 = ctx.$implicit;
    const ɵ$index_140_r9 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ɵ$index_140_r9 + 1, ". ", ctx_r0.destinationLabel(destination_r8));
} }
function PackagesFromCard_Conditional_15_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵrepeaterCreate(1, PackagesFromCard_Conditional_15_Conditional_33_For_2_Template, 5, 2, "span", 61, _forTrack2, true);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.selectedDestinations);
} }
function PackagesFromCard_Conditional_15_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "selectDestinations"));
} }
function PackagesFromCard_Conditional_15_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "durationHoursRange"));
} }
function PackagesFromCard_Conditional_15_Conditional_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "bookingDateRangeInvalid"));
} }
function PackagesFromCard_Conditional_15_Conditional_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "cancellationPolicyRequired"));
} }
function PackagesFromCard_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "div")(2, "h3", 26);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 27);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 28)(9, "div")(10, "label", 29);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 30);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(14, PackagesFromCard_Conditional_15_Conditional_14_Template, 3, 3, "p", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div")(16, "label", 29);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 32);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(20, PackagesFromCard_Conditional_15_Conditional_20_Template, 3, 3, "p", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div")(22, "label", 33);
    i0.ɵɵtext(23);
    i0.ɵɵpipe(24, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 34);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_15_Template_div_click_25_listener($event) { return $event.stopPropagation(); })("keydown.escape", function PackagesFromCard_Conditional_15_Template_div_keydown_escape_25_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeDestinationMenu()); });
    i0.ɵɵelementStart(26, "button", 35);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_15_Template_button_click_26_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleDestinationMenu($event)); });
    i0.ɵɵelementStart(27, "span", 36);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "translate");
    i0.ɵɵconditionalCreate(30, PackagesFromCard_Conditional_15_Conditional_30_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "i", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(32, PackagesFromCard_Conditional_15_Conditional_32_Template, 8, 5, "div", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(33, PackagesFromCard_Conditional_15_Conditional_33_Template, 3, 0, "div", 38);
    i0.ɵɵconditionalCreate(34, PackagesFromCard_Conditional_15_Conditional_34_Template, 3, 3, "p", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 39)(36, "div")(37, "label", 29);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(40, "input", 40);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div")(42, "label", 29);
    i0.ɵɵtext(43);
    i0.ɵɵpipe(44, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(45, "input", 41);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(46, PackagesFromCard_Conditional_15_Conditional_46_Template, 3, 3, "p", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div")(48, "label", 29);
    i0.ɵɵtext(49);
    i0.ɵɵpipe(50, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(51, "input", 42);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelement(52, "div");
    i0.ɵɵelementStart(53, "div")(54, "label", 29);
    i0.ɵɵtext(55);
    i0.ɵɵpipe(56, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 43)(58, "span", 44);
    i0.ɵɵtext(59, "$");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(60, "input", 45);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "div")(62, "label", 29);
    i0.ɵɵtext(63);
    i0.ɵɵpipe(64, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 43)(66, "span", 44);
    i0.ɵɵtext(67, "$");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(68, "input", 46);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(69, "div")(70, "label", 29);
    i0.ɵɵtext(71);
    i0.ɵɵpipe(72, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(73, "app-date-picker", 47);
    i0.ɵɵpipe(74, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "div")(76, "label", 29);
    i0.ɵɵtext(77);
    i0.ɵɵpipe(78, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(79, "app-date-picker", 48);
    i0.ɵɵpipe(80, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(81, PackagesFromCard_Conditional_15_Conditional_81_Template, 3, 3, "p", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(82, "div")(83, "label", 29);
    i0.ɵɵtext(84);
    i0.ɵɵpipe(85, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(86, "textarea", 49);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "div", 50)(88, "label", 51);
    i0.ɵɵelement(89, "input", 52);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtext(90);
    i0.ɵɵpipe(91, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "div", 53)(93, "label", 29);
    i0.ɵɵtext(94);
    i0.ɵɵpipe(95, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(96, "textarea", 54);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(97, PackagesFromCard_Conditional_15_Conditional_97_Template, 3, 3, "p", 31);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 35, "packageDetailsStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 37, "packageDetailsHint"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 39, "englishName"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.packageForm.controls.nameEng.touched && ctx_r0.packageForm.controls.nameEng.invalid ? 14 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 41, "arabicName"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.packageForm.controls.nameAr.touched && ctx_r0.packageForm.controls.nameAr.invalid ? 20 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 43, "destinations"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.destinationsLoading);
    i0.ɵɵattribute("aria-expanded", ctx_r0.destinationMenuOpen);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 45, ctx_r0.selectedDestinations.length ? "selectedDestinationsCount" : "selectDestinations"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.selectedDestinations.length ? 30 : -1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("mdi-chevron-down", !ctx_r0.destinationMenuOpen)("mdi-chevron-up", ctx_r0.destinationMenuOpen);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destinationMenuOpen ? 32 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.selectedDestinations.length ? 33 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.packageForm.controls.destinationIds.touched && ctx_r0.packageForm.controls.destinationIds.invalid ? 34 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 47, "durationDays"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(44, 49, "durationHours"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.packageForm.controls.durationHours.touched && ctx_r0.packageForm.controls.durationHours.invalid ? 46 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(50, 51, "maxCapacity"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(56, 53, "pricePerPerson"));
    i0.ɵɵadvance(5);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(64, 55, "pricePerChild"));
    i0.ɵɵadvance(5);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(72, 57, "dateFrom"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("max", ctx_r0.packageForm.controls.dateTo.value || null)("ariaLabel", i0.ɵɵpipeBind1(74, 59, "dateFrom"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(78, 61, "dateTo"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("min", ctx_r0.packageForm.controls.dateFrom.value || null)("ariaLabel", i0.ɵɵpipeBind1(80, 63, "dateTo"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.packageForm.controls.dateTo.touched && ctx_r0.packageForm.controls.dateTo.hasError("dateRange") ? 81 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(85, 65, "description"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(91, 67, "freeCancellation"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(95, 69, "cancellationPolicy"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.packageForm.controls.cancellationPolicy.touched && ctx_r0.packageForm.controls.cancellationPolicy.invalid ? 97 : -1);
} }
function PackagesFromCard_Conditional_16_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68);
    i0.ɵɵelement(1, "i", 83);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(3, 2, "savedPackageNumber"), " #", ctx_r0.currentPackageId);
} }
function PackagesFromCard_Conditional_16_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 78);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.imageValidationMessage));
} }
function PackagesFromCard_Conditional_16_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 79);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "imagesRequired"));
} }
function PackagesFromCard_Conditional_16_Conditional_32_For_2_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 87);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "cover"));
} }
function PackagesFromCard_Conditional_16_Conditional_32_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵelement(1, "img", 85);
    i0.ɵɵelementStart(2, "button", 86);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_16_Conditional_32_For_2_Template_button_click_2_listener() { const ɵ$index_334_r12 = i0.ɵɵrestoreView(_r11).$index; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.removeImage(ɵ$index_334_r12)); });
    i0.ɵɵelement(5, "i", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, PackagesFromCard_Conditional_16_Conditional_32_For_2_Conditional_6_Template, 3, 3, "span", 87);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r13 = ctx.$implicit;
    const ɵ$index_334_r12 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.getImageUrl(image_r13.url), i0.ɵɵsanitizeUrl)("alt", image_r13.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.deletingImageIndex !== null || ctx_r0.isSaving);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 12, "removeImage"))("title", i0.ɵɵpipeBind1(4, 14, "removeImage"));
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("mdi-loading", ctx_r0.deletingImageIndex === ɵ$index_334_r12)("mdi-spin", ctx_r0.deletingImageIndex === ɵ$index_334_r12)("mdi-close", ctx_r0.deletingImageIndex !== ɵ$index_334_r12);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ɵ$index_334_r12 === 0 ? 6 : -1);
} }
function PackagesFromCard_Conditional_16_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 80);
    i0.ɵɵrepeaterCreate(1, PackagesFromCard_Conditional_16_Conditional_32_For_2_Template, 7, 16, "div", 84, _forTrack3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.imageUploads);
} }
function PackagesFromCard_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 11)(1, "div", 64)(2, "div", 65)(3, "span", 66);
    i0.ɵɵelement(4, "i", 67);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h3", 26);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 27);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(12, PackagesFromCard_Conditional_16_Conditional_12_Template, 4, 4, "span", 68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 69)(14, "div", 70)(15, "label", 71);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 72);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "label", 73)(21, "span", 74);
    i0.ɵɵelement(22, "i", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 76);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 27);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "input", 77);
    i0.ɵɵlistener("change", function PackagesFromCard_Conditional_16_Template_input_change_29_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onImagesSelected($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(30, PackagesFromCard_Conditional_16_Conditional_30_Template, 3, 3, "p", 78);
    i0.ɵɵconditionalCreate(31, PackagesFromCard_Conditional_16_Conditional_31_Template, 3, 3, "p", 79);
    i0.ɵɵconditionalCreate(32, PackagesFromCard_Conditional_16_Conditional_32_Template, 3, 0, "div", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "p", 81);
    i0.ɵɵelement(34, "i", 82);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 17, "packageImagesStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 19, "packageImagesHint"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.currentPackageId ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 21, "packageImages"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.imageUploads.length, " / ", ctx_r0.maxImages);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("cursor-not-allowed", ctx_r0.imageUploads.length >= ctx_r0.maxImages || ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null)("opacity-60", ctx_r0.imageUploads.length >= ctx_r0.maxImages || ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 23, "chooseImages"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 25, "packageImageRules"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.imageUploads.length >= ctx_r0.maxImages || ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.imageValidationMessage ? 30 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.packageForm.controls.images.touched && ctx_r0.packageForm.controls.images.invalid ? 31 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.imageUploads.length ? 32 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 27, "packageImagesUploadStepHint"));
} }
function PackagesFromCard_Conditional_17_Conditional_18_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 106);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const timeOption_r16 = ctx.$implicit;
    i0.ɵɵproperty("value", timeOption_r16);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(timeOption_r16);
} }
function PackagesFromCard_Conditional_17_Conditional_18_For_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 106);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const timeOption_r17 = ctx.$implicit;
    i0.ɵɵproperty("value", timeOption_r17);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(timeOption_r17);
} }
function PackagesFromCard_Conditional_17_Conditional_18_Conditional_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 108);
    i0.ɵɵelement(1, "i", 113);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "itineraryTimeConflict"));
} }
function PackagesFromCard_Conditional_17_Conditional_18_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 109);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "validItineraryStepRequired"));
} }
function PackagesFromCard_Conditional_17_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 93)(1, "div", 100)(2, "div")(3, "label", 101);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 102);
    i0.ɵɵtwoWayListener("ngModelChange", function PackagesFromCard_Conditional_17_Conditional_18_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.itineraryDraft.dayNumber, $event) || (ctx_r0.itineraryDraft.dayNumber = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div")(8, "label", 101);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 103);
    i0.ɵɵtwoWayListener("ngModelChange", function PackagesFromCard_Conditional_17_Conditional_18_Template_input_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.itineraryDraft.title, $event) || (ctx_r0.itineraryDraft.title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div")(13, "label", 101);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "input", 104);
    i0.ɵɵtwoWayListener("ngModelChange", function PackagesFromCard_Conditional_17_Conditional_18_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.itineraryDraft.value, $event) || (ctx_r0.itineraryDraft.value = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div")(18, "label", 101);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "select", 104);
    i0.ɵɵtwoWayListener("ngModelChange", function PackagesFromCard_Conditional_17_Conditional_18_Template_select_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.itineraryDraft.startTime, $event) || (ctx_r0.itineraryDraft.startTime = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(22, "option", 105);
    i0.ɵɵtext(23, "--:--");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(24, PackagesFromCard_Conditional_17_Conditional_18_For_25_Template, 2, 2, "option", 106, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div")(27, "label", 101);
    i0.ɵɵtext(28);
    i0.ɵɵpipe(29, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "select", 104);
    i0.ɵɵtwoWayListener("ngModelChange", function PackagesFromCard_Conditional_17_Conditional_18_Template_select_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.itineraryDraft.endTime, $event) || (ctx_r0.itineraryDraft.endTime = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(31, "option", 105);
    i0.ɵɵtext(32, "--:--");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(33, PackagesFromCard_Conditional_17_Conditional_18_For_34_Template, 2, 2, "option", 106, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div")(36, "label", 101);
    i0.ɵɵtext(37);
    i0.ɵɵpipe(38, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "textarea", 107);
    i0.ɵɵtwoWayListener("ngModelChange", function PackagesFromCard_Conditional_17_Conditional_18_Template_textarea_ngModelChange_39_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.itineraryDraft.description, $event) || (ctx_r0.itineraryDraft.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(40, PackagesFromCard_Conditional_17_Conditional_18_Conditional_40_Template, 4, 3, "p", 108)(41, PackagesFromCard_Conditional_17_Conditional_18_Conditional_41_Template, 3, 3, "p", 109);
    i0.ɵɵelementStart(42, "div", 110)(43, "button", 111);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_Conditional_18_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.saveItineraryStep()); });
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "button", 112);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_Conditional_18_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.cancelItineraryStep()); });
    i0.ɵɵtext(47);
    i0.ɵɵpipe(48, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 25, "dayNumber"));
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.itineraryDraft.dayNumber);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(41, _c0))("max", ctx_r0.packageForm.controls.durationDays.value);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 27, "stepTitle"));
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.itineraryDraft.title);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(42, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 29, "itineraryValue"));
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.itineraryDraft.value);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(43, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 31, "startTime"));
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.itineraryDraft.startTime);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(44, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.itineraryTimeOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(29, 33, "endTime"));
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.itineraryDraft.endTime);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(45, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.itineraryTimeOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(38, 35, "description"));
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.itineraryDraft.description);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(46, _c0));
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.itineraryDraftHasTimeOverlap ? 40 : ctx_r0.invalidDraft ? 41 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.invalidDraft);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(45, 37, "saveStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(48, 39, "cancel"));
} }
function PackagesFromCard_Conditional_17_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 94);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "clickAddStepToStart"));
} }
function PackagesFromCard_Conditional_17_For_26_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", step_r19.startTime || "--:--", " - ", step_r19.endTime || "--:--");
} }
function PackagesFromCard_Conditional_17_For_26_Conditional_17_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 123)(1, "div")(2, "p", 124);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 125);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 117)(8, "button", 126);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_For_26_Conditional_17_For_2_Template_button_click_8_listener() { const ɵ$index_523_r22 = i0.ɵɵrestoreView(_r21).$index; const step_r19 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editItineraryStep(step_r19.childs, ɵ$index_523_r22, true)); });
    i0.ɵɵelement(9, "i", 120);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 127);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_For_26_Conditional_17_For_2_Template_button_click_10_listener() { const ɵ$index_523_r22 = i0.ɵɵrestoreView(_r21).$index; const step_r19 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeItineraryStep(step_r19.childs, ɵ$index_523_r22)); });
    i0.ɵɵelement(11, "i", 63);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const child_r23 = ctx.$implicit;
    const ɵ$index_523_r22 = ctx.$index;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(4, 3, "childStep"), " ", ɵ$index_523_r22 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(child_r23.title);
} }
function PackagesFromCard_Conditional_17_For_26_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 122);
    i0.ɵɵrepeaterCreate(1, PackagesFromCard_Conditional_17_For_26_Conditional_17_For_2_Template, 12, 5, "div", 123, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵrepeater(step_r19.childs);
} }
function PackagesFromCard_Conditional_17_For_26_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 96)(1, "div", 114)(2, "div")(3, "p", 115);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h5", 116);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(9, PackagesFromCard_Conditional_17_For_26_Conditional_9_Template, 2, 2, "p", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 117)(11, "button", 118);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_For_26_Template_button_click_11_listener() { const step_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openItineraryChildEditor(step_r19)); });
    i0.ɵɵelement(12, "i", 90);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 119);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_For_26_Template_button_click_13_listener() { const ɵ$index_487_r20 = i0.ɵɵrestoreView(_r18).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editItineraryStep(ctx_r0.packageForm.controls.itinerary.value, ɵ$index_487_r20, false)); });
    i0.ɵɵelement(14, "i", 120);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 121);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_For_26_Template_button_click_15_listener() { const ɵ$index_487_r20 = i0.ɵɵrestoreView(_r18).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeItineraryStep(ctx_r0.packageForm.controls.itinerary.value, ɵ$index_487_r20)); });
    i0.ɵɵelement(16, "i", 63);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(17, PackagesFromCard_Conditional_17_For_26_Conditional_17_Template, 3, 0, "div", 122);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r19 = ctx.$implicit;
    const ɵ$index_487_r20 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(5, 10, "day"), " ", step_r19.dayNumber, " \u00B7 ", i0.ɵɵpipeBind1(6, 12, "journeyStep"), " ", ɵ$index_487_r20 + 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(step_r19.title);
    i0.ɵɵadvance();
    i0.ɵɵconditional(step_r19.startTime || step_r19.endTime ? 9 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(step_r19.childs.length ? 17 : -1);
} }
function PackagesFromCard_Conditional_17_ForEmpty_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 97);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noItineraryAdded"));
} }
function PackagesFromCard_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 12)(1, "div", 88)(2, "div")(3, "h3", 26);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 27);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 89);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_17_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openItineraryStepEditor()); });
    i0.ɵɵelement(10, "i", 90);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 91)(14, "div", 50)(15, "h4", 92);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(18, PackagesFromCard_Conditional_17_Conditional_18_Template, 49, 47, "div", 93)(19, PackagesFromCard_Conditional_17_Conditional_19_Template, 3, 3, "div", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 95)(21, "h4", 92);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "ol", 93);
    i0.ɵɵrepeaterCreate(25, PackagesFromCard_Conditional_17_For_26_Template, 18, 14, "li", 96, i0.ɵɵrepeaterTrackByIndex, false, PackagesFromCard_Conditional_17_ForEmpty_27_Template, 3, 3, "li", 97);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "label", 98);
    i0.ɵɵelement(29, "input", 99);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 9, "packageItineraryStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 11, "itineraryStepHint"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 13, "addStep"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 15, ctx_r0.itineraryDraftIsChild ? "childStepDetails" : "stepDetails"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.itineraryDraft ? 18 : 19);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 17, "itinerarySteps"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.packageForm.controls.itinerary.value);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(31, 19, "activePackage"));
} }
function PackagesFromCard_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 128);
    i0.ɵɵlistener("click", function PackagesFromCard_Conditional_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.previousStep()); });
    i0.ɵɵelement(1, "i", 129);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 2, "previous"));
} }
function PackagesFromCard_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "saveDetailsAndContinue"), " ");
} }
function PackagesFromCard_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, "saveImagesAndContinue"), " ");
} }
function PackagesFromCard_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 130);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(2, 1, "saveItineraryAndFinish"), " ");
} }
export class PackagesFromCard {
    adminService;
    cdr;
    translate;
    selectedPackage = null;
    packageSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    maxImages = 5;
    maxImageBytes = 5 * 1024 * 1024;
    maxImageWidth = 2400;
    maxImageHeight = 1600;
    itineraryTimeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
        const hours = Math.floor(index / 4).toString().padStart(2, '0');
        const minutes = ((index % 4) * 15).toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    });
    formSteps = [
        { id: 1, label: 'packageDetailsStep', icon: 'mdi-file-document-edit-outline' },
        { id: 2, label: 'packageImagesStep', icon: 'mdi-image-multiple-outline' },
        { id: 3, label: 'packageItineraryStep', icon: 'mdi-map-marker-path' },
    ];
    imageConstraints = {
        maxWidth: this.maxImageWidth,
        maxHeight: this.maxImageHeight,
    };
    packageForm = this.createForm();
    destinations = [];
    imageUploads = [];
    destinationsLoading = false;
    destinationMenuOpen = false;
    destinationSearchTerm = '';
    isSaving = false;
    apiLoadingMessage = '';
    deletingImageIndex = null;
    errorMessage = '';
    imageValidationMessage = '';
    successMessage = '';
    activeStep = 1;
    completedStep = 0;
    savedPackageId = null;
    itineraryDraft = null;
    itineraryDraftIsChild = false;
    itineraryDraftCollection = null;
    itineraryDraftIndex = null;
    constructor(adminService, cdr, translate) {
        this.adminService = adminService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() { this.loadDestinations(); }
    ngOnChanges(changes) {
        if (!changes['selectedPackage'])
            return;
        if (this.selectedPackage)
            this.populateForm(this.selectedPackage);
        else
            this.resetForm(false);
    }
    ngOnDestroy() { this.revokeNewImageUrls(); }
    get currentPackageId() {
        return this.savedPackageId ?? this.toOptionalId(this.selectedPackage?.id ?? this.selectedPackage?.packageId);
    }
    get filteredDestinations() {
        const search = this.destinationSearchTerm.trim().toLocaleLowerCase();
        return search
            ? this.destinations.filter((item) => this.destinationLabel(item).toLocaleLowerCase().includes(search))
            : this.destinations;
    }
    get selectedDestinations() {
        const selectedIds = new Set(this.packageForm.controls.destinationIds.value);
        return this.destinations.filter((item) => selectedIds.has(this.destinationId(item)));
    }
    get screenLoaderVisible() { return this.isSaving || this.deletingImageIndex !== null; }
    get screenLoaderMessage() {
        return this.deletingImageIndex !== null ? 'deletingPackageImage' : (this.apiLoadingMessage || 'pleaseWaitForRequest');
    }
    loadDestinations() {
        this.destinationsLoading = true;
        this.adminService.getDestinations(1, 100).pipe(catchError(() => { this.errorMessage = 'destinationsLoadError'; return of(null); }), finalize(() => { this.destinationsLoading = false; this.cdr.markForCheck(); })).subscribe((response) => {
            if (response === null)
                return;
            const data = response?.data ?? response;
            const rows = data?.data ?? data?.items ?? data?.destinations ?? data;
            this.destinations = Array.isArray(rows) ? rows : [];
        });
    }
    saveCurrentStep() {
        if (this.activeStep === 1)
            this.savePackageDetails();
        else if (this.activeStep === 2)
            this.savePackageImages();
        else
            this.savePackageItinerary();
    }
    savePackageDetails() {
        if (this.isSaving || !this.validateDetailsStep())
            return;
        const existingId = this.currentPackageId;
        const payload = this.buildDetailsPayload(existingId);
        this.beginRequest('savingPackageDetails');
        const request$ = existingId
            ? this.adminService.updatePackage(payload)
            : this.adminService.createPackage(payload);
        request$.pipe(switchMap((detailsResponse) => {
            if (detailsResponse?.isSuccess === false) {
                return of({ detailsResponse, packageId: null, statusResponse: null, statusError: null });
            }
            const packageId = existingId ?? this.extractPackageId(detailsResponse);
            if (!packageId) {
                return of({ detailsResponse, packageId: null, statusResponse: null, statusError: null });
            }
            return this.adminService.changePackageStatus(packageId, false).pipe(map((statusResponse) => ({ detailsResponse, packageId, statusResponse, statusError: null })), catchError((statusError) => of({ detailsResponse, packageId, statusResponse: null, statusError })));
        }), catchError((error) => { this.handleRequestError(error, 'packageSaveError'); return of(null); }), finalize(() => this.endRequest())).subscribe((result) => {
            if (result === null || !this.acceptResponse(result.detailsResponse, 'packageSaveError'))
                return;
            const packageId = result.packageId;
            if (!packageId) {
                this.errorMessage = 'packageIdMissingAfterCreate';
                return;
            }
            this.savedPackageId = packageId;
            if (result.statusError) {
                this.handleRequestError(result.statusError, 'statusUpdateError');
                return;
            }
            if (!this.acceptResponse(result.statusResponse, 'statusUpdateError'))
                return;
            this.completedStep = Math.max(this.completedStep, 1);
            this.activeStep = 2;
            this.successMessage = result.detailsResponse?.message || (existingId ? 'packageDetailsUpdated' : 'packageDetailsCreated');
            this.showToast('success', this.successMessage);
            this.cdr.markForCheck();
        });
    }
    savePackageImages() {
        if (this.isSaving || !this.currentPackageId)
            return;
        this.syncImagesControl();
        if (this.packageForm.controls.images.invalid) {
            this.packageForm.controls.images.markAsTouched();
            this.errorMessage = 'imagesRequired';
            return;
        }
        const pending = this.imageUploads.filter((image) => image.file && !image.uploaded);
        if (!pending.length) {
            this.completeImagesStep();
            return;
        }
        const payload = new FormData();
        payload.append('PackageId', String(this.currentPackageId));
        pending.forEach((image) => payload.append('Images', image.file, image.file.name));
        this.beginRequest('uploadingPackageImages');
        this.adminService.addPackageImages(payload).pipe(catchError((error) => { this.handleRequestError(error, 'packageImagesSaveError'); return of(null); }), finalize(() => this.endRequest())).subscribe((response) => {
            if (!this.acceptResponse(response, 'packageImagesSaveError'))
                return;
            pending.forEach((image) => image.uploaded = true);
            this.successMessage = response?.message || 'packageImagesSaved';
            this.showToast('success', this.successMessage);
            this.completeImagesStep();
        });
    }
    savePackageItinerary() {
        if (this.isSaving || !this.currentPackageId)
            return;
        if (this.itineraryDraft) {
            this.errorMessage = 'saveItineraryStepFirst';
            return;
        }
        const itinerary = this.packageForm.controls.itinerary.value;
        if (!itinerary.length || hasInvalidItinerary(itinerary, Number(this.packageForm.controls.durationDays.value))) {
            this.errorMessage = 'itineraryTitleAndTimesRequired';
            return;
        }
        if (hasItineraryTimeOverlap(itinerary)) {
            this.errorMessage = 'itineraryTimeConflict';
            return;
        }
        this.beginRequest('savingPackageItinerary');
        this.adminService.addPackageItinerary({
            PackageId: this.currentPackageId,
            Itinerary: itinerary.map((item) => this.toItineraryPayload(item)),
        }).pipe(switchMap((itineraryResponse) => {
            if (itineraryResponse?.isSuccess === false) {
                return of({ itineraryResponse, statusResponse: null, statusError: null });
            }
            return this.adminService.changePackageStatus(this.currentPackageId, this.packageForm.controls.isActive.value).pipe(map((statusResponse) => ({ itineraryResponse, statusResponse, statusError: null })), catchError((statusError) => of({ itineraryResponse, statusResponse: null, statusError })));
        }), catchError((error) => { this.handleRequestError(error, 'packageItinerarySaveError'); return of(null); }), finalize(() => this.endRequest())).subscribe((result) => {
            if (result === null || !this.acceptResponse(result.itineraryResponse, 'packageItinerarySaveError'))
                return;
            if (result.statusError) {
                this.handleRequestError(result.statusError, 'statusUpdateError');
                return;
            }
            if (!this.acceptResponse(result.statusResponse, 'statusUpdateError'))
                return;
            this.completedStep = 3;
            this.showToast('success', result.itineraryResponse?.message || (this.selectedPackage ? 'packageUpdated' : 'packageCreated'));
            this.packageSaved.emit();
            this.resetForm(false);
        });
    }
    previousStep() {
        if (this.isSaving || this.activeStep === 1)
            return;
        this.errorMessage = '';
        this.activeStep = (this.activeStep - 1);
        this.closeItineraryEditor();
    }
    toggleDestinationMenu(event) {
        event.stopPropagation();
        if (!this.destinationsLoading)
            this.destinationMenuOpen = !this.destinationMenuOpen;
    }
    toggleDestination(destination) {
        const id = this.destinationId(destination);
        const control = this.packageForm.controls.destinationIds;
        const values = [...control.value];
        const index = values.indexOf(id);
        if (index >= 0)
            values.splice(index, 1);
        else
            values.push(id);
        control.setValue(values);
        control.markAsTouched();
        control.markAsDirty();
    }
    removeDestination(id) {
        this.packageForm.controls.destinationIds.setValue(this.packageForm.controls.destinationIds.value.filter((value) => value !== id));
    }
    isDestinationSelected(destination) {
        return this.packageForm.controls.destinationIds.value.includes(this.destinationId(destination));
    }
    destinationId(destination) { return Number(destination?.id ?? destination?.destinationId); }
    destinationLabel(destination) {
        return [destination?.nameEng ?? destination?.name, destination?.nameAr].filter(Boolean).join(' — ');
    }
    updateDestinationSearch(event) { this.destinationSearchTerm = event.target.value; }
    closeDestinationMenu() { this.destinationMenuOpen = false; this.destinationSearchTerm = ''; }
    closeDestinationMenuOnOutsideClick() { this.closeDestinationMenu(); }
    async onImagesSelected(event) {
        const input = event.target;
        const files = Array.from(input.files ?? []);
        input.value = '';
        this.imageValidationMessage = '';
        if (this.imageUploads.length + files.length > this.maxImages) {
            this.imageValidationMessage = 'packageImageLimit';
            return;
        }
        for (const file of files) {
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                this.imageValidationMessage = 'invalidImageType';
                continue;
            }
            if (file.size > this.maxImageBytes) {
                this.imageValidationMessage = 'imageTooLarge';
                continue;
            }
            try {
                const normalized = await normalizeImageUpload(file, this.imageConstraints);
                this.imageUploads.push({ file: normalized, url: URL.createObjectURL(normalized), name: normalized.name, existing: false, uploaded: false });
            }
            catch (error) {
                this.imageValidationMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
            }
        }
        this.syncImagesControl();
        this.cdr.markForCheck();
    }
    async removeImage(index) {
        const image = this.imageUploads[index];
        if (!image || this.isSaving || this.deletingImageIndex !== null)
            return;
        const result = await Swal.fire({
            title: this.translate.instant('confirmImageDelete'), text: this.translate.instant('imageDeleteWarning'),
            icon: 'warning', showCancelButton: true, confirmButtonText: this.translate.instant('delete'),
            cancelButtonText: this.translate.instant('cancel'), confirmButtonColor: '#e11d48', reverseButtons: true,
        });
        if (!result.isConfirmed)
            return;
        const imageId = Number(image.id);
        if (image.existing && this.currentPackageId && Number.isInteger(imageId) && imageId > 0) {
            this.deletingImageIndex = index;
            this.adminService.deletePackageImage(imageId).pipe(catchError(() => { this.showToast('error', 'imageDeleteError'); return of({ imageDeleteFailed: true }); }), finalize(() => { this.deletingImageIndex = null; this.cdr.markForCheck(); })).subscribe((response) => {
                if (response?.imageDeleteFailed || response?.isSuccess === false) {
                    if (response?.isSuccess === false)
                        this.showToast('error', response?.message || 'imageDeleteError');
                    return;
                }
                this.removeImageLocally(index);
                this.showImageDeletedToast();
            });
            return;
        }
        this.removeImageLocally(index);
        this.showImageDeletedToast();
    }
    openItineraryStepEditor() {
        if (this.itineraryDraft)
            return;
        this.itineraryDraft = createEmptyTourItinerary(this.currentPackageId);
        this.itineraryDraft.dayNumber = this.packageForm.controls.itinerary.value.length + 1;
        this.itineraryDraftCollection = this.packageForm.controls.itinerary.value;
        this.itineraryDraftIndex = null;
        this.itineraryDraftIsChild = false;
    }
    openItineraryChildEditor(parent) {
        if (this.itineraryDraft)
            return;
        this.itineraryDraft = createEmptyTourItinerary(this.currentPackageId);
        this.itineraryDraft.dayNumber = parent.dayNumber;
        this.itineraryDraft.isChildNode = true;
        this.itineraryDraftCollection = parent.childs;
        this.itineraryDraftIndex = null;
        this.itineraryDraftIsChild = true;
    }
    editItineraryStep(collection, index, isChild) {
        if (this.itineraryDraft)
            return;
        this.itineraryDraft = readTourItinerary(collection[index]);
        this.itineraryDraftCollection = collection;
        this.itineraryDraftIndex = index;
        this.itineraryDraftIsChild = isChild;
    }
    saveItineraryStep() {
        if (!this.itineraryDraft || !this.itineraryDraftCollection || this.invalidDraft)
            return;
        if (this.itineraryDraftIndex === null)
            this.itineraryDraftCollection.push(this.itineraryDraft);
        else
            this.itineraryDraftCollection[this.itineraryDraftIndex] = this.itineraryDraft;
        this.packageForm.controls.itinerary.markAsDirty();
        this.closeItineraryEditor();
    }
    get invalidDraft() {
        if (!this.itineraryDraft)
            return true;
        const maxDay = Number(this.packageForm.controls.durationDays.value);
        return hasInvalidItinerary([this.itineraryDraft], maxDay)
            || this.itineraryDraftHasTimeOverlap;
    }
    get itineraryDraftHasTimeOverlap() {
        if (!this.itineraryDraft || !this.itineraryDraftCollection)
            return false;
        const siblings = this.itineraryDraftCollection
            .filter((_, index) => index !== this.itineraryDraftIndex);
        return hasItineraryTimeOverlap([this.itineraryDraft, ...siblings]);
    }
    cancelItineraryStep() { this.closeItineraryEditor(); }
    removeItineraryStep(collection, index) { if (!this.itineraryDraft)
        collection.splice(index, 1); }
    cancelEdit() { this.resetForm(true); }
    getImageUrl(url) {
        if (!url || /^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '').replace(/^images\//i, '')}`;
    }
    createForm() {
        return new FormGroup({
            nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
            nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
            description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000)] }),
            durationDays: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
            durationHours: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.max(23)] }),
            pricePerPerson: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
            pricePerChild: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
            maxCapacity: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
            cancellationPolicy: new FormControl('', { nonNullable: true }),
            isFreeCancelation: new FormControl(false, { nonNullable: true }),
            isActive: new FormControl(true, { nonNullable: true }),
            dateFrom: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            dateTo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            destinationIds: new FormControl([], { nonNullable: true, validators: [Validators.required] }),
            images: new FormControl([], { nonNullable: true, validators: [Validators.required] }),
            itinerary: new FormControl([], { nonNullable: true }),
        });
    }
    validateDetailsStep() {
        const names = ['nameEng', 'nameAr', 'description', 'durationDays', 'durationHours', 'pricePerPerson', 'pricePerChild', 'maxCapacity', 'cancellationPolicy', 'isFreeCancelation', 'dateFrom', 'dateTo', 'destinationIds'];
        names.forEach((name) => this.packageForm.controls[name].markAsTouched());
        if (!this.packageForm.controls.isFreeCancelation.value && !this.packageForm.controls.cancellationPolicy.value.trim()) {
            this.packageForm.controls.cancellationPolicy.setErrors({ required: true });
        }
        else if (this.packageForm.controls.cancellationPolicy.hasError('required')) {
            this.packageForm.controls.cancellationPolicy.setErrors(null);
        }
        const values = this.packageForm.getRawValue();
        if (values.dateFrom && values.dateTo && values.dateTo < values.dateFrom) {
            this.packageForm.controls.dateTo.setErrors({ dateRange: true });
        }
        return names.every((name) => this.packageForm.controls[name].valid);
    }
    buildDetailsPayload(id) {
        const value = this.packageForm.getRawValue();
        const payload = {
            NameEng: value.nameEng.trim(), NameAr: value.nameAr.trim(), Description: value.description.trim(),
            DurationDays: Number(value.durationDays), DurationHours: Number(value.durationHours),
            PricePerPerson: Number(value.pricePerPerson), PricePerChild: Number(value.pricePerChild),
            MaxCapacity: Number(value.maxCapacity), CancellationPolicy: value.cancellationPolicy.trim(),
            IsFreeCancelation: value.isFreeCancelation,
            DateFrom: `${value.dateFrom}T00:00:00`, DateTo: `${value.dateTo}T00:00:00`,
            Destinations: value.destinationIds.map((destinationId, index) => ({ DestinationId: destinationId, DisplayOrder: index })),
            Images: [], Itinerary: [], IsActive: false,
        };
        if (id)
            payload.Id = id;
        return payload;
    }
    toItineraryPayload(item) {
        return {
            Title: item.title.trim(), Value: item.value?.trim() ?? '', Description: item.description?.trim() ?? '',
            DayNumber: Number(item.dayNumber), StartTime: item.startTime || null, EndTime: item.endTime || null,
            Childs: (item.childs ?? []).map((child) => this.toItineraryPayload(child)),
        };
    }
    populateForm(item) {
        this.revokeNewImageUrls();
        this.imageValidationMessage = '';
        const images = Array.isArray(item?.images) ? item.images : [];
        this.imageUploads = images.slice(0, this.maxImages).map((image, index) => ({
            id: this.toOptionalId(image?.id ?? image?.packageImageId) ?? undefined,
            url: this.resolveImageUrl(image),
            name: image?.imageName ?? this.translate.instant('packageImageNumber', { number: index + 1 }),
            existing: true, uploaded: true,
        })).filter((image) => !!image.url);
        this.savedPackageId = this.toOptionalId(item?.id ?? item?.packageId);
        const destinationIds = (Array.isArray(item?.destinations) ? item.destinations : [])
            .sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder))
            .map((destination) => Number(destination.destinationId ?? destination.id)).filter(Number.isFinite);
        this.packageForm.setValue({
            nameEng: item?.nameEng ?? '', nameAr: item?.nameAr ?? '', description: item?.description ?? '',
            durationDays: Number(item?.durationDays) || 1, durationHours: Number(item?.durationHours) || 0,
            pricePerPerson: Number(item?.pricePerPerson) || 0, pricePerChild: Number(item?.pricePerChild) || 0,
            maxCapacity: Number(item?.maxCapacity) || 1, cancellationPolicy: item?.cancellationPolicy ?? '',
            isFreeCancelation: item?.isFreeCancelation === true,
            isActive: item?.isActive !== false,
            dateFrom: this.toDateInput(item?.dateFrom), dateTo: this.toDateInput(item?.dateTo), destinationIds,
            images: this.imageUploads.map((image) => image.url),
            itinerary: (Array.isArray(item?.itinerary) ? item.itinerary : []).map((step) => readTourItinerary(step)),
        });
        this.activeStep = 1;
        this.completedStep = 0;
    }
    resetForm(emitCancel) {
        this.closeItineraryEditor();
        this.closeDestinationMenu();
        this.revokeNewImageUrls();
        this.imageUploads = [];
        this.savedPackageId = null;
        this.activeStep = 1;
        this.completedStep = 0;
        this.imageValidationMessage = '';
        this.errorMessage = '';
        this.successMessage = '';
        this.packageForm.reset({ nameEng: '', nameAr: '', description: '', durationDays: 1, durationHours: 0,
            pricePerPerson: 0, pricePerChild: 0, maxCapacity: 1, cancellationPolicy: '', isFreeCancelation: false, isActive: true,
            dateFrom: '', dateTo: '', destinationIds: [], images: [], itinerary: [] });
        if (emitCancel)
            this.editCancelled.emit();
    }
    completeImagesStep() { this.completedStep = Math.max(this.completedStep, 2); this.activeStep = 3; this.errorMessage = ''; this.cdr.markForCheck(); }
    closeItineraryEditor() { this.itineraryDraft = null; this.itineraryDraftCollection = null; this.itineraryDraftIndex = null; this.itineraryDraftIsChild = false; }
    syncImagesControl() { this.packageForm.controls.images.setValue(this.imageUploads.map((image) => image.url)); this.packageForm.controls.images.markAsTouched(); this.packageForm.controls.images.updateValueAndValidity(); }
    removeImageLocally(index) { const [image] = this.imageUploads.splice(index, 1); if (image?.file)
        URL.revokeObjectURL(image.url); this.syncImagesControl(); this.cdr.markForCheck(); }
    showImageDeletedToast() { this.showToast('success', 'imageDeleted'); }
    beginRequest(message) { this.isSaving = true; this.apiLoadingMessage = message; this.errorMessage = ''; this.successMessage = ''; }
    endRequest() { this.isSaving = false; this.apiLoadingMessage = ''; this.cdr.markForCheck(); }
    handleRequestError(error, fallback) { this.errorMessage = error?.error?.message || fallback; this.showToast('error', this.errorMessage); }
    acceptResponse(response, fallback) { if (response === null)
        return false; if (response?.isSuccess === false) {
        this.errorMessage = response?.message || fallback;
        this.showToast('error', this.errorMessage);
        return false;
    } return true; }
    showToast(icon, message) { Swal.fire({ toast: true, position: 'top-end', icon, title: this.translate.instant(message), showConfirmButton: false, timer: icon === 'success' ? 2500 : 4500, timerProgressBar: true }); }
    extractPackageId(response) { const data = response?.data ?? response?.result ?? response; return this.toOptionalId(data?.id ?? data?.packageId ?? data?.data?.id ?? data?.data?.packageId ?? data); }
    toOptionalId(value) { const id = Number(value); return Number.isInteger(id) && id > 0 ? id : null; }
    toDateInput(value) { const text = String(value ?? ''); return /^\d{4}-\d{2}-\d{2}/.test(text) ? text.slice(0, 10) : ''; }
    resolveImageUrl(image) { return this.getImageUrl(String(typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? ''))); }
    revokeNewImageUrls() { this.imageUploads.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url)); }
    static ɵfac = function PackagesFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || PackagesFromCard)(i0.ɵɵdirectiveInject(i1.AdminService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PackagesFromCard, selectors: [["app-packages-from-card"]], hostBindings: function PackagesFromCard_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function PackagesFromCard_click_HostBindingHandler() { return ctx.closeDestinationMenuOnOutsideClick(); }, i0.ɵɵresolveDocument);
        } }, inputs: { selectedPackage: "selectedPackage" }, outputs: { packageSaved: "packageSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 29, vars: 20, consts: [["role", "status", "aria-live", "assertive", 1, "fixed", "inset-0", "z-[9999]", "grid", "place-items-center", "bg-slate-950/55", "px-4", "backdrop-blur-sm"], [1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5", "md:p-6"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-6"], [1, "text-xl", "font-semibold"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "mb-7", "grid", "gap-3", "md:grid-cols-3"], [1, "flex", "items-center", "gap-3", "rounded-2xl", "border", "bg-white", "p-3", 3, "border-primary", "bg-primary-50"], [3, "ngSubmit", "formGroup"], [1, "space-y-5", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "md:p-6"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "md:p-6"], [1, "rounded-2xl", "border", "bg-white", "p-5", "md:p-6"], [1, "mt-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "pt-5"], ["type", "button", 1, "rounded-full", "border", "bg-white", "px-4", "py-2", "text-sm", "font-semibold", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "flex", "gap-3"], ["type", "button", 1, "rounded-full", "border", "bg-white", "px-4", "py-2", "text-sm", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["type", "submit", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "flex", "min-w-64", "flex-col", "items-center", "rounded-3xl", "bg-white", "px-8", "py-7", "text-center", "shadow-2xl"], [1, "mdi", "mdi-loading", "mdi-spin", "text-5xl", "text-primary"], [1, "mt-4", "font-semibold", "text-slate-800"], [1, "flex", "items-center", "gap-3", "rounded-2xl", "border", "bg-white", "p-3"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-full", "text-lg"], [1, "mdi"], [1, "text-[10px]", "font-semibold", "uppercase", "tracking-wider", "text-slate-400"], [1, "text-sm", "font-semibold"], [1, "font-semibold"], [1, "mt-1", "text-xs", "text-slate-500"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "nameEng", "maxlength", "200", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], ["formControlName", "nameAr", "maxlength", "200", "dir", "rtl", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["id", "packageDestinationLabel", 1, "mb-2", "block", "text-sm", "font-medium"], [1, "relative", 3, "click", "keydown.escape"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "text-start", "disabled:opacity-60", 3, "click", "disabled"], [1, "text-slate-500"], [1, "absolute", "z-30", "mt-2", "w-full", "overflow-hidden", "rounded-2xl", "border", "bg-white", "shadow-xl"], [1, "mt-2", "flex", "flex-wrap", "gap-2"], [1, "grid", "gap-4", "sm:grid-cols-2", "xl:grid-cols-4"], ["formControlName", "durationDays", "type", "text", "appNumbersOnly", "", "inputmode", "numeric", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], ["formControlName", "durationHours", "type", "text", "appNumbersOnly", "", "inputmode", "numeric", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], ["formControlName", "maxCapacity", "type", "text", "appNumbersOnly", "", "inputmode", "numeric", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [1, "relative"], [1, "absolute", "inset-y-0", "start-0", "flex", "w-10", "items-center", "justify-center", "border-e", "text-sm", "font-semibold", "text-slate-500"], ["formControlName", "pricePerPerson", "type", "number", "min", "0", "step", "0.01", 1, "w-full", "rounded-2xl", "border", "py-2", "pe-3", "ps-12"], ["formControlName", "pricePerChild", "type", "number", "min", "0", "step", "0.01", 1, "w-full", "rounded-2xl", "border", "py-2", "pe-3", "ps-12"], ["formControlName", "dateFrom", "id", "package-date-from", "inputClass", "rounded-2xl border px-3 py-2 pe-11", 3, "max", "ariaLabel"], ["formControlName", "dateTo", "id", "package-date-to", "inputClass", "rounded-2xl border px-3 py-2 pe-11", 3, "min", "ariaLabel"], ["formControlName", "description", "rows", "5", "maxlength", "4000", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [1, "rounded-2xl", "border", "bg-slate-50", "p-4"], [1, "flex", "items-center", "gap-2", "text-sm", "font-medium"], ["formControlName", "isFreeCancelation", "type", "checkbox"], [1, "mt-3"], ["formControlName", "cancellationPolicy", "rows", "3", 1, "w-full", "rounded-2xl", "border", "bg-white", "px-3", "py-2"], [1, "border-b", "p-2"], ["type", "search", 1, "w-full", "rounded-xl", "border", "px-3", "py-2", "text-sm", 3, "input", "value", "placeholder"], ["role", "listbox", "aria-multiselectable", "true", 1, "max-h-60", "overflow-y-auto", "p-2"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "rounded-xl", "px-3", "py-2", "text-start", "text-sm", "hover:bg-primary/5", 3, "bg-primary-50", "text-primary"], [1, "p-4", "text-center", "text-sm", "text-slate-500"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "rounded-xl", "px-3", "py-2", "text-start", "text-sm", "hover:bg-primary/5", 3, "click"], [1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary/10", "px-3", "py-1", "text-xs", "font-medium", "text-primary"], ["type", "button", 3, "click"], [1, "mdi", "mdi-close"], [1, "mb-5", "flex", "flex-wrap", "items-start", "justify-between", "gap-3"], [1, "flex", "items-start", "gap-3"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-primary/10", "text-xl", "text-primary"], [1, "mdi", "mdi-image-multiple-outline"], [1, "rounded-full", "bg-emerald-50", "px-3", "py-1.5", "text-xs", "font-semibold", "text-emerald-700"], [1, "rounded-2xl", "border", "border-dashed", "border-slate-300", "p-4"], [1, "mb-2", "flex", "items-center", "justify-between"], ["for", "packageImages", 1, "text-sm", "font-medium"], [1, "text-xs", "text-slate-500"], ["for", "packageImages", 1, "flex", "cursor-pointer", "flex-col", "items-center", "rounded-2xl", "border-2", "border-dashed", "border-slate-300", "bg-slate-50", "px-4", "py-9", "text-center", "transition", "hover:border-primary", "hover:bg-primary/5"], [1, "grid", "h-14", "w-14", "place-items-center", "rounded-2xl", "bg-primary/10", "text-3xl", "text-primary"], [1, "mdi", "mdi-cloud-upload-outline"], [1, "mt-3", "text-sm", "font-semibold", "text-primary"], ["id", "packageImages", "type", "file", "accept", "image/jpeg,image/png,image/webp", "multiple", "", 1, "sr-only", 3, "change", "disabled"], ["role", "alert", 1, "mt-2", "text-xs", "font-medium", "text-red-600"], [1, "mt-2", "text-xs", "text-red-600"], [1, "mt-4", "grid", "grid-cols-2", "gap-3", "sm:grid-cols-3", "lg:grid-cols-5"], [1, "mt-3", "flex", "items-start", "gap-2", "text-xs", "text-slate-500"], [1, "mdi", "mdi-information-outline", "mt-0.5", "text-primary"], [1, "mdi", "mdi-check-circle", "me-1"], [1, "relative", "overflow-hidden", "rounded-xl", "bg-slate-200", "shadow-sm"], [1, "aspect-[3/2]", "w-full", "object-cover", 3, "src", "alt"], ["type", "button", 1, "absolute", "end-2", "top-2", "grid", "h-8", "w-8", "place-items-center", "rounded-full", "bg-black/70", "text-lg", "text-white", "transition", "hover:bg-rose-600", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "absolute", "bottom-2", "start-2", "rounded-full", "bg-primary", "px-2", "py-1", "text-[10px]", "font-semibold", "text-white"], [1, "mb-5", "flex", "items-center", "justify-between", "gap-3"], ["type", "button", 1, "rounded-full", "border", "border-primary", "px-3", "py-1.5", "text-xs", "font-semibold", "text-primary", "disabled:opacity-50", 3, "click", "disabled"], [1, "mdi", "mdi-plus"], [1, "grid", "gap-4", "xl:grid-cols-2"], [1, "mb-3", "font-semibold"], [1, "space-y-3"], [1, "grid", "min-h-48", "place-items-center", "rounded-xl", "border", "border-dashed", "bg-white", "text-center", "text-sm", "text-slate-400"], [1, "rounded-2xl", "border", "p-4"], [1, "rounded-xl", "border", "p-3"], [1, "rounded-xl", "border", "border-dashed", "p-8", "text-center", "text-sm", "text-slate-400"], [1, "mt-5", "flex", "items-center", "gap-2", "rounded-2xl", "border", "bg-slate-50", "p-4", "text-sm", "font-medium"], ["formControlName", "isActive", "type", "checkbox"], [1, "grid", "gap-3", "md:grid-cols-2"], [1, "mb-1", "block", "text-xs", "font-medium"], ["type", "number", "min", "1", 1, "w-full", "rounded-xl", "border", "bg-white", "px-3", "py-2", 3, "ngModelChange", "ngModel", "ngModelOptions", "max"], ["maxlength", "200", 1, "w-full", "rounded-xl", "border", "bg-white", "px-3", "py-2", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "w-full", "rounded-xl", "border", "bg-white", "px-3", "py-2", 3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "ngValue"], [3, "value"], ["rows", "3", "maxlength", "2000", 1, "w-full", "rounded-xl", "border", "bg-white", "px-3", "py-2", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["role", "alert", 1, "rounded-xl", "border", "border-red-200", "bg-red-50", "px-3", "py-2", "text-xs", "font-medium", "text-red-600"], [1, "text-xs", "text-red-600"], [1, "flex", "gap-2"], ["type", "button", 1, "rounded-full", "bg-primary", "px-4", "py-2", "text-xs", "font-semibold", "text-white", "disabled:opacity-50", 3, "click", "disabled"], ["type", "button", 1, "rounded-full", "border", "px-4", "py-2", "text-xs", 3, "click"], [1, "mdi", "mdi-clock-alert-outline", "me-1"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "text-xs", "font-semibold", "text-primary"], [1, "mt-1", "font-semibold"], [1, "flex", "gap-1"], ["type", "button", 1, "rounded-full", "border", "px-2", "py-1", "text-xs", "text-primary", 3, "click", "disabled"], ["type", "button", 1, "grid", "h-7", "w-7", "place-items-center", "rounded-full", "border", 3, "click", "disabled"], [1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "grid", "h-7", "w-7", "place-items-center", "rounded-full", "border", "text-red-500", 3, "click", "disabled"], [1, "mt-3", "space-y-2", "border-s", "ps-4"], [1, "flex", "justify-between", "gap-2"], [1, "text-[10px]", "text-emerald-600"], [1, "text-sm", "font-medium"], ["type", "button", 1, "grid", "h-7", "w-7", "place-items-center", "rounded-full", "border", 3, "click"], ["type", "button", 1, "grid", "h-7", "w-7", "place-items-center", "rounded-full", "border", "text-red-500", 3, "click"], ["type", "button", 1, "rounded-full", "border", "bg-white", "px-4", "py-2", "text-sm", "font-semibold", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi", "mdi-arrow-left", "rtl:rotate-180"], [1, "mdi", "mdi-check-circle-outline"]], template: function PackagesFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, PackagesFromCard_Conditional_0_Template, 6, 3, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵconditionalCreate(2, PackagesFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵconditionalCreate(3, PackagesFromCard_Conditional_3_Template, 3, 3, "div", 3);
            i0.ɵɵelementStart(4, "div", 4)(5, "h2", 5);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "ol", 7);
            i0.ɵɵrepeaterCreate(12, PackagesFromCard_For_13_Template, 10, 23, "li", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "form", 9);
            i0.ɵɵlistener("ngSubmit", function PackagesFromCard_Template_form_ngSubmit_14_listener() { return ctx.saveCurrentStep(); });
            i0.ɵɵconditionalCreate(15, PackagesFromCard_Conditional_15_Template, 98, 71, "section", 10);
            i0.ɵɵconditionalCreate(16, PackagesFromCard_Conditional_16_Template, 37, 29, "section", 11);
            i0.ɵɵconditionalCreate(17, PackagesFromCard_Conditional_17_Template, 32, 21, "section", 12);
            i0.ɵɵelementStart(18, "div", 13)(19, "div");
            i0.ɵɵconditionalCreate(20, PackagesFromCard_Conditional_20_Template, 4, 4, "button", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 15)(22, "button", 16);
            i0.ɵɵlistener("click", function PackagesFromCard_Template_button_click_22_listener() { return ctx.cancelEdit(); });
            i0.ɵɵtext(23);
            i0.ɵɵpipe(24, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "button", 17);
            i0.ɵɵconditionalCreate(26, PackagesFromCard_Conditional_26_Template, 2, 3)(27, PackagesFromCard_Conditional_27_Template, 2, 3)(28, PackagesFromCard_Conditional_28_Template, 3, 3);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.screenLoaderVisible ? 0 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.errorMessage ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 3 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 14, ctx.selectedPackage ? "editPackage" : "addPackage"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 16, "packageStepperHint"));
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.formSteps);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.packageForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeStep === 1 ? 15 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeStep === 2 ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeStep === 3 ? 17 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.activeStep > 1 ? 20 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isSaving || ctx.deletingImageIndex !== null);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(24, 18, "close"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isSaving || ctx.deletingImageIndex !== null || ctx.destinationsLoading || !!ctx.itineraryDraft);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeStep === 1 ? 26 : ctx.activeStep === 2 ? 27 : 28);
        } }, dependencies: [ReactiveFormsModule, i3.ɵNgNoValidate, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.NumberValueAccessor, i3.CheckboxControlValueAccessor, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.MaxLengthValidator, i3.MinValidator, i3.MaxValidator, i3.FormGroupDirective, i3.FormControlName, FormsModule, i3.NgModel, NumbersOnlyDirective, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PackagesFromCard, [{
        type: Component,
        args: [{ selector: 'app-packages-from-card', standalone: true, imports: [ReactiveFormsModule, FormsModule, TranslatePipe, NumbersOnlyDirective, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (screenLoaderVisible) {\n  <div class=\"fixed inset-0 z-[9999] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm\" role=\"status\" aria-live=\"assertive\">\n    <div class=\"flex min-w-64 flex-col items-center rounded-3xl bg-white px-8 py-7 text-center shadow-2xl\">\n      <span class=\"mdi mdi-loading mdi-spin text-5xl text-primary\"></span>\n      <p class=\"mt-4 font-semibold text-slate-800\">{{ screenLoaderMessage | translate }}</p>\n    </div>\n  </div>\n}\n\n<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6\">\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\n\n  <div class=\"mb-6\">\n    <h2 class=\"text-xl font-semibold\">{{ (selectedPackage ? 'editPackage' : 'addPackage') | translate }}</h2>\n    <p class=\"mt-1 text-sm text-slate-500\">{{ 'packageStepperHint' | translate }}</p>\n  </div>\n\n  <ol class=\"mb-7 grid gap-3 md:grid-cols-3\">\n    @for (step of formSteps; track step.id) {\n      <li class=\"flex items-center gap-3 rounded-2xl border bg-white p-3\"\n        [class.border-primary]=\"activeStep === step.id\" [class.bg-primary-50]=\"activeStep === step.id\">\n        <span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg\"\n          [class.bg-primary]=\"activeStep === step.id\" [class.text-white]=\"activeStep === step.id\"\n          [class.bg-emerald-100]=\"completedStep >= step.id && activeStep !== step.id\"\n          [class.text-emerald-600]=\"completedStep >= step.id && activeStep !== step.id\"\n          [class.bg-slate-100]=\"completedStep < step.id && activeStep !== step.id\">\n          <i class=\"mdi\" [class]=\"completedStep >= step.id && activeStep !== step.id ? 'mdi mdi-check' : 'mdi ' + step.icon\"></i>\n        </span>\n        <div><p class=\"text-[10px] font-semibold uppercase tracking-wider text-slate-400\">{{ 'step' | translate }} {{ step.id }}</p><p class=\"text-sm font-semibold\">{{ step.label | translate }}</p></div>\n      </li>\n    }\n  </ol>\n\n  <form [formGroup]=\"packageForm\" (ngSubmit)=\"saveCurrentStep()\">\n    @if (activeStep === 1) {\n      <section class=\"space-y-5 rounded-2xl border border-slate-200 bg-white p-5 md:p-6\">\n        <div><h3 class=\"font-semibold\">{{ 'packageDetailsStep' | translate }}</h3><p class=\"mt-1 text-xs text-slate-500\">{{ 'packageDetailsHint' | translate }}</p></div>\n\n        <div class=\"grid gap-4 md:grid-cols-2\">\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'englishName' | translate }}</label><input formControlName=\"nameEng\" maxlength=\"200\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (packageForm.controls.nameEng.touched && packageForm.controls.nameEng.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'fieldRequired' | translate }}</p> }</div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'arabicName' | translate }}</label><input formControlName=\"nameAr\" maxlength=\"200\" dir=\"rtl\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (packageForm.controls.nameAr.touched && packageForm.controls.nameAr.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'fieldRequired' | translate }}</p> }</div>\n        </div>\n\n        <div>\n          <label class=\"mb-2 block text-sm font-medium\" id=\"packageDestinationLabel\">{{ 'destinations' | translate }}</label>\n          <div class=\"relative\" (click)=\"$event.stopPropagation()\" (keydown.escape)=\"closeDestinationMenu()\">\n            <button type=\"button\" class=\"flex w-full items-center justify-between rounded-2xl border border-slate-300 px-3 py-2 text-start disabled:opacity-60\" [disabled]=\"destinationsLoading\" [attr.aria-expanded]=\"destinationMenuOpen\" (click)=\"toggleDestinationMenu($event)\">\n              <span class=\"text-slate-500\">{{ (selectedDestinations.length ? 'selectedDestinationsCount' : 'selectDestinations') | translate }}@if (selectedDestinations.length) { : {{ selectedDestinations.length }} }</span>\n              <i class=\"mdi\" [class.mdi-chevron-down]=\"!destinationMenuOpen\" [class.mdi-chevron-up]=\"destinationMenuOpen\"></i>\n            </button>\n            @if (destinationMenuOpen) {\n              <div class=\"absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border bg-white shadow-xl\">\n                <div class=\"border-b p-2\"><input type=\"search\" class=\"w-full rounded-xl border px-3 py-2 text-sm\" [value]=\"destinationSearchTerm\" [placeholder]=\"'searchDestinations' | translate\" (input)=\"updateDestinationSearch($event)\" /></div>\n                <div class=\"max-h-60 overflow-y-auto p-2\" role=\"listbox\" aria-multiselectable=\"true\">\n                  @for (destination of filteredDestinations; track destination.id ?? destination.destinationId) {\n                    <button type=\"button\" class=\"flex w-full items-center justify-between rounded-xl px-3 py-2 text-start text-sm hover:bg-primary/5\" [class.bg-primary-50]=\"isDestinationSelected(destination)\" [class.text-primary]=\"isDestinationSelected(destination)\" (click)=\"toggleDestination(destination)\">\n                      <span>{{ destinationLabel(destination) }}</span><i class=\"mdi\" [class.mdi-checkbox-marked]=\"isDestinationSelected(destination)\" [class.mdi-checkbox-blank-outline]=\"!isDestinationSelected(destination)\"></i>\n                    </button>\n                  } @empty { <p class=\"p-4 text-center text-sm text-slate-500\">{{ 'noDestinationsFound' | translate }}</p> }\n                </div>\n              </div>\n            }\n          </div>\n          @if (selectedDestinations.length) { <div class=\"mt-2 flex flex-wrap gap-2\">@for (destination of selectedDestinations; track destinationId(destination); let index = $index) { <span class=\"inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary\"><span>{{ index + 1 }}. {{ destinationLabel(destination) }}</span><button type=\"button\" (click)=\"removeDestination(destinationId(destination))\"><i class=\"mdi mdi-close\"></i></button></span> }</div> }\n          @if (packageForm.controls.destinationIds.touched && packageForm.controls.destinationIds.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'selectDestinations' | translate }}</p> }\n        </div>\n\n        <div class=\"grid gap-4 sm:grid-cols-2 xl:grid-cols-4\">\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'durationDays' | translate }}</label><input formControlName=\"durationDays\" type=\"text\" appNumbersOnly inputmode=\"numeric\" class=\"w-full rounded-2xl border px-3 py-2\" /></div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'durationHours' | translate }}</label><input formControlName=\"durationHours\" type=\"text\" appNumbersOnly inputmode=\"numeric\" class=\"w-full rounded-2xl border px-3 py-2\" />@if (packageForm.controls.durationHours.touched && packageForm.controls.durationHours.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'durationHoursRange' | translate }}</p> }</div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'maxCapacity' | translate }}</label><input formControlName=\"maxCapacity\" type=\"text\" appNumbersOnly inputmode=\"numeric\" class=\"w-full rounded-2xl border px-3 py-2\" /></div>\n          <div></div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'pricePerPerson' | translate }}</label><div class=\"relative\"><span class=\"absolute inset-y-0 start-0 flex w-10 items-center justify-center border-e text-sm font-semibold text-slate-500\">$</span><input formControlName=\"pricePerPerson\" type=\"number\" min=\"0\" step=\"0.01\" class=\"w-full rounded-2xl border py-2 pe-3 ps-12\" /></div></div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'pricePerChild' | translate }}</label><div class=\"relative\"><span class=\"absolute inset-y-0 start-0 flex w-10 items-center justify-center border-e text-sm font-semibold text-slate-500\">$</span><input formControlName=\"pricePerChild\" type=\"number\" min=\"0\" step=\"0.01\" class=\"w-full rounded-2xl border py-2 pe-3 ps-12\" /></div></div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'dateFrom' | translate }}</label><app-date-picker formControlName=\"dateFrom\" id=\"package-date-from\" [max]=\"packageForm.controls.dateTo.value || null\" [ariaLabel]=\"'dateFrom' | translate\" inputClass=\"rounded-2xl border px-3 py-2 pe-11\" /></div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'dateTo' | translate }}</label><app-date-picker formControlName=\"dateTo\" id=\"package-date-to\" [min]=\"packageForm.controls.dateFrom.value || null\" [ariaLabel]=\"'dateTo' | translate\" inputClass=\"rounded-2xl border px-3 py-2 pe-11\" />@if (packageForm.controls.dateTo.touched && packageForm.controls.dateTo.hasError('dateRange')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'bookingDateRangeInvalid' | translate }}</p> }</div>\n        </div>\n\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'description' | translate }}</label><textarea formControlName=\"description\" rows=\"5\" maxlength=\"4000\" class=\"w-full rounded-2xl border px-3 py-2\"></textarea></div>\n        <div class=\"rounded-2xl border bg-slate-50 p-4\"><label class=\"flex items-center gap-2 text-sm font-medium\"><input formControlName=\"isFreeCancelation\" type=\"checkbox\" />{{ 'freeCancellation' | translate }}</label><div class=\"mt-3\"><label class=\"mb-2 block text-sm font-medium\">{{ 'cancellationPolicy' | translate }}</label><textarea formControlName=\"cancellationPolicy\" rows=\"3\" class=\"w-full rounded-2xl border bg-white px-3 py-2\"></textarea>@if (packageForm.controls.cancellationPolicy.touched && packageForm.controls.cancellationPolicy.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'cancellationPolicyRequired' | translate }}</p> }</div></div>\n      </section>\n    }\n\n    @if (activeStep === 2) {\n      <section class=\"rounded-2xl border border-slate-200 bg-white p-5 md:p-6\">\n        <div class=\"mb-5 flex flex-wrap items-start justify-between gap-3\">\n          <div class=\"flex items-start gap-3\"><span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-xl text-primary\"><i class=\"mdi mdi-image-multiple-outline\"></i></span><div><h3 class=\"font-semibold\">{{ 'packageImagesStep' | translate }}</h3><p class=\"mt-1 text-xs text-slate-500\">{{ 'packageImagesHint' | translate }}</p></div></div>\n          @if (currentPackageId) { <span class=\"rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700\"><i class=\"mdi mdi-check-circle me-1\"></i>{{ 'savedPackageNumber' | translate }} #{{ currentPackageId }}</span> }\n        </div>\n        <div class=\"rounded-2xl border border-dashed border-slate-300 p-4\">\n          <div class=\"mb-2 flex items-center justify-between\"><label for=\"packageImages\" class=\"text-sm font-medium\">{{ 'packageImages' | translate }}</label><span class=\"text-xs text-slate-500\">{{ imageUploads.length }} / {{ maxImages }}</span></div>\n          <label for=\"packageImages\" class=\"flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-9 text-center transition hover:border-primary hover:bg-primary/5\"\n            [class.cursor-not-allowed]=\"imageUploads.length >= maxImages || isSaving || deletingImageIndex !== null\"\n            [class.opacity-60]=\"imageUploads.length >= maxImages || isSaving || deletingImageIndex !== null\">\n            <span class=\"grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-3xl text-primary\"><i class=\"mdi mdi-cloud-upload-outline\"></i></span>\n            <span class=\"mt-3 text-sm font-semibold text-primary\">{{ 'chooseImages' | translate }}</span>\n            <span class=\"mt-1 text-xs text-slate-500\">{{ 'packageImageRules' | translate }}</span>\n          </label>\n          <input id=\"packageImages\" type=\"file\" accept=\"image/jpeg,image/png,image/webp\" multiple class=\"sr-only\" [disabled]=\"imageUploads.length >= maxImages || isSaving || deletingImageIndex !== null\" (change)=\"onImagesSelected($event)\" />\n          @if (imageValidationMessage) { <p class=\"mt-2 text-xs font-medium text-red-600\" role=\"alert\">{{ imageValidationMessage | translate }}</p> }\n          @if (packageForm.controls.images.touched && packageForm.controls.images.invalid) { <p class=\"mt-2 text-xs text-red-600\">{{ 'imagesRequired' | translate }}</p> }\n          @if (imageUploads.length) { <div class=\"mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5\">@for (image of imageUploads; track image.url; let index = $index) { <div class=\"relative overflow-hidden rounded-xl bg-slate-200 shadow-sm\"><img [src]=\"getImageUrl(image.url)\" [alt]=\"image.name\" class=\"aspect-[3/2] w-full object-cover\" /><button type=\"button\" class=\"absolute end-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-lg text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60\" [disabled]=\"deletingImageIndex !== null || isSaving\" [attr.aria-label]=\"'removeImage' | translate\" [attr.title]=\"'removeImage' | translate\" (click)=\"removeImage(index)\"><i class=\"mdi\" [class.mdi-loading]=\"deletingImageIndex === index\" [class.mdi-spin]=\"deletingImageIndex === index\" [class.mdi-close]=\"deletingImageIndex !== index\"></i></button>@if (index === 0) { <span class=\"absolute bottom-2 start-2 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white\">{{ 'cover' | translate }}</span> }</div> }</div> }\n        </div>\n        <p class=\"mt-3 flex items-start gap-2 text-xs text-slate-500\"><i class=\"mdi mdi-information-outline mt-0.5 text-primary\"></i>{{ 'packageImagesUploadStepHint' | translate }}</p>\n      </section>\n    }\n\n    @if (activeStep === 3) {\n      <section class=\"rounded-2xl border bg-white p-5 md:p-6\">\n        <div class=\"mb-5 flex items-center justify-between gap-3\"><div><h3 class=\"font-semibold\">{{ 'packageItineraryStep' | translate }}</h3><p class=\"mt-1 text-xs text-slate-500\">{{ 'itineraryStepHint' | translate }}</p></div><button type=\"button\" [disabled]=\"!!itineraryDraft\" class=\"rounded-full border border-primary px-3 py-1.5 text-xs font-semibold text-primary disabled:opacity-50\" (click)=\"openItineraryStepEditor()\"><i class=\"mdi mdi-plus\"></i> {{ 'addStep' | translate }}</button></div>\n        <div class=\"grid gap-4 xl:grid-cols-2\">\n          <div class=\"rounded-2xl border bg-slate-50 p-4\">\n            <h4 class=\"mb-3 font-semibold\">{{ (itineraryDraftIsChild ? 'childStepDetails' : 'stepDetails') | translate }}</h4>\n            @if (itineraryDraft) {\n              <div class=\"space-y-3\">\n                <div class=\"grid gap-3 md:grid-cols-2\">\n                  <div><label class=\"mb-1 block text-xs font-medium\">{{ 'dayNumber' | translate }}</label><input [(ngModel)]=\"itineraryDraft.dayNumber\" [ngModelOptions]=\"{ standalone: true }\" type=\"number\" min=\"1\" [max]=\"packageForm.controls.durationDays.value\" class=\"w-full rounded-xl border bg-white px-3 py-2\" /></div>\n                  <div><label class=\"mb-1 block text-xs font-medium\">{{ 'stepTitle' | translate }}</label><input [(ngModel)]=\"itineraryDraft.title\" [ngModelOptions]=\"{ standalone: true }\" maxlength=\"200\" class=\"w-full rounded-xl border bg-white px-3 py-2\" /></div>\n                  <div><label class=\"mb-1 block text-xs font-medium\">{{ 'itineraryValue' | translate }}</label><input [(ngModel)]=\"itineraryDraft.value\" [ngModelOptions]=\"{ standalone: true }\" class=\"w-full rounded-xl border bg-white px-3 py-2\" /></div>\n                  <div><label class=\"mb-1 block text-xs font-medium\">{{ 'startTime' | translate }}</label><select [(ngModel)]=\"itineraryDraft.startTime\" [ngModelOptions]=\"{ standalone: true }\" class=\"w-full rounded-xl border bg-white px-3 py-2\"><option [ngValue]=\"null\">--:--</option>@for (timeOption of itineraryTimeOptions; track timeOption) { <option [value]=\"timeOption\">{{ timeOption }}</option> }</select></div>\n                  <div><label class=\"mb-1 block text-xs font-medium\">{{ 'endTime' | translate }}</label><select [(ngModel)]=\"itineraryDraft.endTime\" [ngModelOptions]=\"{ standalone: true }\" class=\"w-full rounded-xl border bg-white px-3 py-2\"><option [ngValue]=\"null\">--:--</option>@for (timeOption of itineraryTimeOptions; track timeOption) { <option [value]=\"timeOption\">{{ timeOption }}</option> }</select></div>\n                </div>\n                <div><label class=\"mb-1 block text-xs font-medium\">{{ 'description' | translate }}</label><textarea [(ngModel)]=\"itineraryDraft.description\" [ngModelOptions]=\"{ standalone: true }\" rows=\"3\" maxlength=\"2000\" class=\"w-full rounded-xl border bg-white px-3 py-2\"></textarea></div>\n                @if (itineraryDraftHasTimeOverlap) { <p class=\"rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600\" role=\"alert\"><i class=\"mdi mdi-clock-alert-outline me-1\"></i>{{ 'itineraryTimeConflict' | translate }}</p> }\n                @else if (invalidDraft) { <p class=\"text-xs text-red-600\">{{ 'validItineraryStepRequired' | translate }}</p> }\n                <div class=\"flex gap-2\"><button type=\"button\" [disabled]=\"invalidDraft\" class=\"rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white disabled:opacity-50\" (click)=\"saveItineraryStep()\">{{ 'saveStep' | translate }}</button><button type=\"button\" class=\"rounded-full border px-4 py-2 text-xs\" (click)=\"cancelItineraryStep()\">{{ 'cancel' | translate }}</button></div>\n              </div>\n            } @else { <div class=\"grid min-h-48 place-items-center rounded-xl border border-dashed bg-white text-center text-sm text-slate-400\">{{ 'clickAddStepToStart' | translate }}</div> }\n          </div>\n          <div class=\"rounded-2xl border p-4\"><h4 class=\"mb-3 font-semibold\">{{ 'itinerarySteps' | translate }}</h4><ol class=\"space-y-3\">@for (step of packageForm.controls.itinerary.value; track $index; let stepIndex = $index) { <li class=\"rounded-xl border p-3\"><div class=\"flex items-start justify-between gap-2\"><div><p class=\"text-xs font-semibold text-primary\">{{ 'day' | translate }} {{ step.dayNumber }} \u00B7 {{ 'journeyStep' | translate }} {{ stepIndex + 1 }}</p><h5 class=\"mt-1 font-semibold\">{{ step.title }}</h5>@if (step.startTime || step.endTime) { <p class=\"mt-1 text-xs text-slate-500\">{{ step.startTime || '--:--' }} - {{ step.endTime || '--:--' }}</p> }</div><div class=\"flex gap-1\"><button type=\"button\" [disabled]=\"!!itineraryDraft\" class=\"rounded-full border px-2 py-1 text-xs text-primary\" (click)=\"openItineraryChildEditor(step)\"><i class=\"mdi mdi-plus\"></i></button><button type=\"button\" [disabled]=\"!!itineraryDraft\" class=\"grid h-7 w-7 place-items-center rounded-full border\" (click)=\"editItineraryStep(packageForm.controls.itinerary.value, stepIndex, false)\"><i class=\"mdi mdi-pencil-outline\"></i></button><button type=\"button\" [disabled]=\"!!itineraryDraft\" class=\"grid h-7 w-7 place-items-center rounded-full border text-red-500\" (click)=\"removeItineraryStep(packageForm.controls.itinerary.value, stepIndex)\"><i class=\"mdi mdi-close\"></i></button></div></div>@if (step.childs.length) { <div class=\"mt-3 space-y-2 border-s ps-4\">@for (child of step.childs; track $index; let childIndex = $index) { <div class=\"flex justify-between gap-2\"><div><p class=\"text-[10px] text-emerald-600\">{{ 'childStep' | translate }} {{ childIndex + 1 }}</p><p class=\"text-sm font-medium\">{{ child.title }}</p></div><div class=\"flex gap-1\"><button type=\"button\" class=\"grid h-7 w-7 place-items-center rounded-full border\" (click)=\"editItineraryStep(step.childs, childIndex, true)\"><i class=\"mdi mdi-pencil-outline\"></i></button><button type=\"button\" class=\"grid h-7 w-7 place-items-center rounded-full border text-red-500\" (click)=\"removeItineraryStep(step.childs, childIndex)\"><i class=\"mdi mdi-close\"></i></button></div></div> }</div> }</li> } @empty { <li class=\"rounded-xl border border-dashed p-8 text-center text-sm text-slate-400\">{{ 'noItineraryAdded' | translate }}</li> }</ol></div>\n        </div>\n        <label class=\"mt-5 flex items-center gap-2 rounded-2xl border bg-slate-50 p-4 text-sm font-medium\"><input formControlName=\"isActive\" type=\"checkbox\" />{{ 'activePackage' | translate }}</label>\n      </section>\n    }\n\n    <div class=\"mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5\">\n      <div>@if (activeStep > 1) { <button type=\"button\" [disabled]=\"isSaving || deletingImageIndex !== null\" class=\"rounded-full border bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"previousStep()\"><i class=\"mdi mdi-arrow-left rtl:rotate-180\"></i> {{ 'previous' | translate }}</button> }</div>\n      <div class=\"flex gap-3\"><button type=\"button\" [disabled]=\"isSaving || deletingImageIndex !== null\" class=\"rounded-full border bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60\" (click)=\"cancelEdit()\">{{ 'close' | translate }}</button><button type=\"submit\" [disabled]=\"isSaving || deletingImageIndex !== null || destinationsLoading || !!itineraryDraft\" class=\"inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if (activeStep === 1) { {{ 'saveDetailsAndContinue' | translate }} } @else if (activeStep === 2) { {{ 'saveImagesAndContinue' | translate }} } @else { <i class=\"mdi mdi-check-circle-outline\"></i>{{ 'saveItineraryAndFinish' | translate }} }</button></div>\n    </div>\n  </form>\n</div>\n" }]
    }], () => [{ type: i1.AdminService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { selectedPackage: [{
            type: Input
        }], packageSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }], closeDestinationMenuOnOutsideClick: [{
            type: HostListener,
            args: ['document:click']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PackagesFromCard, { className: "PackagesFromCard", filePath: "app/features/configurations/packages/packages-from-card/packages-from-card.ts", lineNumber: 47 }); })();
