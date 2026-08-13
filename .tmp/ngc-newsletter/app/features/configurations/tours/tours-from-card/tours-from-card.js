import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { createEmptyTourItinerary, readTourItinerary, } from '../../shared/tour-itinerary.model';
import { ImageUploadValidationError, normalizeImageUpload, } from '../../shared/image-upload.util';
import { hasInvalidItinerary, hasItineraryTimeOverlap, isQuarterHourTime, } from '../../shared/itinerary-validation.util';
import * as i0 from "@angular/core";
import * as i1 from "../../admin.service";
import * as i2 from "@ngx-translate/core";
import * as i3 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.url;
function ToursFromCard_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵelementStart(2, "div", 18)(3, "span", 19);
    i0.ɵɵelement(4, "span", 20)(5, "i", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 22);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 23);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 9, ctx_r0.screenLoaderMessage));
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("mdi-file-document-edit-outline", ctx_r0.apiLoadingMessage === "savingTourDetails")("mdi-image-multiple-outline", ctx_r0.apiLoadingMessage === "uploadingTourImages" || ctx_r0.deletingImageIndex !== null)("mdi-map-marker-path", ctx_r0.apiLoadingMessage === "savingTourItinerary");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 11, ctx_r0.screenLoaderMessage));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 13, "pleaseWaitForRequest"));
} }
function ToursFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function ToursFromCard_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function ToursFromCard_For_14_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 26);
} }
function ToursFromCard_For_14_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i");
} if (rf & 2) {
    const step_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassMap(i0.ɵɵinterpolate1("mdi ", step_r2.icon));
} }
function ToursFromCard_For_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24)(1, "span", 25);
    i0.ɵɵconditionalCreate(2, ToursFromCard_For_14_Conditional_2_Template, 1, 0, "i", 26)(3, ToursFromCard_For_14_Conditional_3_Template, 1, 3, "i", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 28)(5, "span", 29);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 30);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("bg-primary", ctx_r0.activeStep === step_r2.id)("text-white", ctx_r0.activeStep === step_r2.id)("text-primary", ctx_r0.activeStep !== step_r2.id && ctx_r0.completedStep >= step_r2.id)("text-slate-400", ctx_r0.activeStep !== step_r2.id && ctx_r0.completedStep < step_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("border-white", ctx_r0.activeStep === step_r2.id)("bg-white", ctx_r0.activeStep === step_r2.id)("text-primary", ctx_r0.activeStep === step_r2.id)("border-primary", ctx_r0.activeStep !== step_r2.id && ctx_r0.completedStep >= step_r2.id)("bg-slate-50", ctx_r0.activeStep !== step_r2.id)("border-slate-200", ctx_r0.activeStep !== step_r2.id && ctx_r0.completedStep < step_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.completedStep >= step_r2.id && ctx_r0.activeStep !== step_r2.id ? 2 : 3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(7, 24, "step"), " ", step_r2.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 26, step_r2.label));
} }
function ToursFromCard_Conditional_16_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "englishTitleRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "englishNameInvalid"));
} }
function ToursFromCard_Conditional_16_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arabicTitleRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arabicNameInvalid"));
} }
function ToursFromCard_Conditional_16_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵelement(1, "i", 93);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "loadingDestinations"));
} }
function ToursFromCard_Conditional_16_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.destinationLabel(ctx_r0.selectedDestination));
} }
function ToursFromCard_Conditional_16_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 46);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "selectDestination"));
} }
function ToursFromCard_Conditional_16_Conditional_37_For_8_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 26);
} }
function ToursFromCard_Conditional_16_Conditional_37_For_8_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 100);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_Conditional_37_For_8_Template_button_click_0_listener() { const destination_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.selectDestination(destination_r6)); });
    i0.ɵɵelementStart(1, "span", 45);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(3, ToursFromCard_Conditional_16_Conditional_37_For_8_Conditional_3_Template, 1, 0, "i", 26);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const destination_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("bg-primary-50", ctx_r0.tourForm.controls.destinationId.value === destination_r6.id)("text-primary", ctx_r0.tourForm.controls.destinationId.value === destination_r6.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.destinationLabel(destination_r6));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.destinationId.value === destination_r6.id ? 3 : -1);
} }
function ToursFromCard_Conditional_16_Conditional_37_ForEmpty_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 99);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.destinations.length ? "noMatchingDestinations" : "noDestinationsFound"));
} }
function ToursFromCard_Conditional_16_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 48)(1, "div", 94)(2, "div", 52);
    i0.ɵɵelement(3, "i", 95);
    i0.ɵɵelementStart(4, "input", 96);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵlistener("input", function ToursFromCard_Conditional_16_Conditional_37_Template_input_input_4_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.updateDestinationSearch($event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(6, "div", 97);
    i0.ɵɵrepeaterCreate(7, ToursFromCard_Conditional_16_Conditional_37_For_8_Template, 4, 6, "button", 98, _forTrack0, false, ToursFromCard_Conditional_16_Conditional_37_ForEmpty_9_Template, 3, 3, "p", 99);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r0.destinationSearchTerm)("placeholder", i0.ɵɵpipeBind1(5, 3, "searchDestinations"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.filteredDestinations);
} }
function ToursFromCard_Conditional_16_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "destinationRequired"));
} }
function ToursFromCard_Conditional_16_For_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const city_r7 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", city_r7.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", city_r7.nameEng, " \u2014 ", city_r7.nameAr);
} }
function ToursFromCard_Conditional_16_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "cityRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "positiveValueRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "nonNegativeValueRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "positiveValueRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_79_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "fieldRequired"), " ");
} }
function ToursFromCard_Conditional_16_Conditional_79_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "positiveValueRequired"), " ");
} }
function ToursFromCard_Conditional_16_Conditional_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, ToursFromCard_Conditional_16_Conditional_79_Conditional_0_Template, 3, 3, "p", 39);
    i0.ɵɵconditionalCreate(1, ToursFromCard_Conditional_16_Conditional_79_Conditional_1_Template, 3, 3, "p", 39);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(ctx_r0.tourForm.controls.durationDays.hasError("required") ? 0 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.durationDays.hasError("min") ? 1 : -1);
} }
function ToursFromCard_Conditional_16_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "durationHoursRange"));
} }
function ToursFromCard_Conditional_16_Conditional_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "startDateRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "endDateRequired"));
} }
function ToursFromCard_Conditional_16_Conditional_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "endDateBeforeStart"));
} }
function ToursFromCard_Conditional_16_For_135_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "listValueRequired"));
} }
function ToursFromCard_Conditional_16_For_135_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 76)(1, "div", 69);
    i0.ɵɵelement(2, "input", 101);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(4, "button", 102);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_For_135_Template_button_click_4_listener() { const ɵ$index_378_r9 = i0.ɵɵrestoreView(_r8).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeHighlight(ɵ$index_378_r9)); });
    i0.ɵɵelement(6, "i", 103);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(7, ToursFromCard_Conditional_16_For_135_Conditional_7_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const itemGroup_r10 = ctx.$implicit;
    i0.ɵɵproperty("formGroup", itemGroup_r10);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 4, "highlightPlaceholder"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(5, 6, "remove"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(itemGroup_r10.controls["value"].touched && itemGroup_r10.controls["value"].invalid ? 7 : -1);
} }
function ToursFromCard_Conditional_16_ForEmpty_136_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 77);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "noHighlightsAdded"));
} }
function ToursFromCard_Conditional_16_For_151_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "listValueRequired"));
} }
function ToursFromCard_Conditional_16_For_151_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 76)(1, "div", 69);
    i0.ɵɵelement(2, "input", 104);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(4, "button", 102);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_For_151_Template_button_click_4_listener() { const ɵ$index_423_r12 = i0.ɵɵrestoreView(_r11).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeInclude(ɵ$index_423_r12)); });
    i0.ɵɵelement(6, "i", 103);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(7, ToursFromCard_Conditional_16_For_151_Conditional_7_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const itemGroup_r13 = ctx.$implicit;
    i0.ɵɵproperty("formGroup", itemGroup_r13);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 4, "includeValuePlaceholder"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(5, 6, "remove"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(itemGroup_r13.controls["value"].touched && itemGroup_r13.controls["value"].invalid ? 7 : -1);
} }
function ToursFromCard_Conditional_16_ForEmpty_152_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 82);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "noTourIncludesAdded"));
} }
function ToursFromCard_Conditional_16_For_167_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "listValueRequired"));
} }
function ToursFromCard_Conditional_16_For_167_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 76)(1, "div", 69);
    i0.ɵɵelement(2, "input", 105);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(4, "button", 106);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_For_167_Template_button_click_4_listener() { const ɵ$index_468_r15 = i0.ɵɵrestoreView(_r14).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeExclude(ɵ$index_468_r15)); });
    i0.ɵɵelement(6, "i", 103);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(7, ToursFromCard_Conditional_16_For_167_Conditional_7_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const itemGroup_r16 = ctx.$implicit;
    i0.ɵɵproperty("formGroup", itemGroup_r16);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(3, 4, "excludeValuePlaceholder"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(5, 6, "remove"));
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(itemGroup_r16.controls["value"].touched && itemGroup_r16.controls["value"].invalid ? 7 : -1);
} }
function ToursFromCard_Conditional_16_ForEmpty_168_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 87);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "noTourExcludesAdded"));
} }
function ToursFromCard_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "div", 31)(2, "div", 32)(3, "span", 33);
    i0.ɵɵelement(4, "i", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h3", 35);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 23);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 36)(13, "div")(14, "label", 37);
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "input", 38);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(18, ToursFromCard_Conditional_16_Conditional_18_Template, 3, 3, "p", 39);
    i0.ɵɵconditionalCreate(19, ToursFromCard_Conditional_16_Conditional_19_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div")(21, "label", 37);
    i0.ɵɵtext(22);
    i0.ɵɵpipe(23, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 40);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(25, ToursFromCard_Conditional_16_Conditional_25_Template, 3, 3, "p", 39);
    i0.ɵɵconditionalCreate(26, ToursFromCard_Conditional_16_Conditional_26_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div")(28, "label", 41);
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 42);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_Template_div_click_31_listener($event) { return $event.stopPropagation(); })("keydown.escape", function ToursFromCard_Conditional_16_Template_div_keydown_escape_31_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeDestinationMenu()); });
    i0.ɵɵelementStart(32, "button", 43);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_Template_button_click_32_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.toggleDestinationMenu($event)); });
    i0.ɵɵconditionalCreate(33, ToursFromCard_Conditional_16_Conditional_33_Template, 4, 3, "span", 44)(34, ToursFromCard_Conditional_16_Conditional_34_Template, 2, 1, "span", 45)(35, ToursFromCard_Conditional_16_Conditional_35_Template, 3, 3, "span", 46);
    i0.ɵɵelement(36, "i", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(37, ToursFromCard_Conditional_16_Conditional_37_Template, 10, 5, "div", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(38, ToursFromCard_Conditional_16_Conditional_38_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div")(40, "label", 37);
    i0.ɵɵtext(41);
    i0.ɵɵpipe(42, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "select", 49)(44, "option", 50);
    i0.ɵɵtext(45);
    i0.ɵɵpipe(46, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(47, ToursFromCard_Conditional_16_For_48_Template, 2, 3, "option", 51, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(49, ToursFromCard_Conditional_16_Conditional_49_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div")(51, "label", 37);
    i0.ɵɵtext(52);
    i0.ɵɵpipe(53, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 52)(55, "span", 53);
    i0.ɵɵtext(56, "$");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(57, "input", 54);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(58, ToursFromCard_Conditional_16_Conditional_58_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div")(60, "label", 37);
    i0.ɵɵtext(61);
    i0.ɵɵpipe(62, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "div", 52)(64, "span", 53);
    i0.ɵɵtext(65, "$");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(66, "input", 55);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(67, ToursFromCard_Conditional_16_Conditional_67_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(68, "div")(69, "label", 37);
    i0.ɵɵtext(70);
    i0.ɵɵpipe(71, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(72, "input", 56);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(73, ToursFromCard_Conditional_16_Conditional_73_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "div")(75, "label", 37);
    i0.ɵɵtext(76);
    i0.ɵɵpipe(77, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(78, "input", 57);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(79, ToursFromCard_Conditional_16_Conditional_79_Template, 2, 2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "div")(81, "label", 37);
    i0.ɵɵtext(82);
    i0.ɵɵpipe(83, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(84, "input", 58);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(85, ToursFromCard_Conditional_16_Conditional_85_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "div")(87, "label", 37);
    i0.ɵɵtext(88);
    i0.ɵɵpipe(89, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "div", 59);
    i0.ɵɵelement(91, "app-date-picker", 60);
    i0.ɵɵpipe(92, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(93, ToursFromCard_Conditional_16_Conditional_93_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(94, "div")(95, "label", 37);
    i0.ɵɵtext(96);
    i0.ɵɵpipe(97, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(98, "div", 59);
    i0.ɵɵelement(99, "app-date-picker", 61);
    i0.ɵɵpipe(100, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(101, ToursFromCard_Conditional_16_Conditional_101_Template, 3, 3, "p", 39);
    i0.ɵɵconditionalCreate(102, ToursFromCard_Conditional_16_Conditional_102_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(103, "div", 62)(104, "div")(105, "label", 37);
    i0.ɵɵtext(106);
    i0.ɵɵpipe(107, "translate");
    i0.ɵɵelementStart(108, "span", 63);
    i0.ɵɵtext(109);
    i0.ɵɵpipe(110, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(111, "textarea", 64);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(112, "div")(113, "label", 37);
    i0.ɵɵtext(114);
    i0.ɵɵpipe(115, "translate");
    i0.ɵɵelementStart(116, "span", 63);
    i0.ɵɵtext(117);
    i0.ɵɵpipe(118, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(119, "textarea", 65);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(120, "div", 66)(121, "section", 67)(122, "div", 68)(123, "div", 69)(124, "span", 70);
    i0.ɵɵelement(125, "i", 71);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(126, "h3", 72);
    i0.ɵɵtext(127);
    i0.ɵɵpipe(128, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(129, "button", 73);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_Template_button_click_129_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addHighlight()); });
    i0.ɵɵelement(130, "i", 74);
    i0.ɵɵtext(131);
    i0.ɵɵpipe(132, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(133, "div", 75);
    i0.ɵɵrepeaterCreate(134, ToursFromCard_Conditional_16_For_135_Template, 8, 8, "div", 76, i0.ɵɵrepeaterTrackByIdentity, false, ToursFromCard_Conditional_16_ForEmpty_136_Template, 3, 3, "p", 77);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(137, "section", 78)(138, "div", 68)(139, "div", 69)(140, "span", 79);
    i0.ɵɵelement(141, "i", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(142, "h3", 72);
    i0.ɵɵtext(143);
    i0.ɵɵpipe(144, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(145, "button", 81);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_Template_button_click_145_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addInclude()); });
    i0.ɵɵelement(146, "i", 74);
    i0.ɵɵtext(147);
    i0.ɵɵpipe(148, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(149, "div", 75);
    i0.ɵɵrepeaterCreate(150, ToursFromCard_Conditional_16_For_151_Template, 8, 8, "div", 76, i0.ɵɵrepeaterTrackByIdentity, false, ToursFromCard_Conditional_16_ForEmpty_152_Template, 3, 3, "p", 82);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(153, "section", 83)(154, "div", 68)(155, "div", 69)(156, "span", 84);
    i0.ɵɵelement(157, "i", 85);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(158, "h3", 72);
    i0.ɵɵtext(159);
    i0.ɵɵpipe(160, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(161, "button", 86);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_16_Template_button_click_161_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addExclude()); });
    i0.ɵɵelement(162, "i", 74);
    i0.ɵɵtext(163);
    i0.ɵɵpipe(164, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(165, "div", 75);
    i0.ɵɵrepeaterCreate(166, ToursFromCard_Conditional_16_For_167_Template, 8, 8, "div", 76, i0.ɵɵrepeaterTrackByIdentity, false, ToursFromCard_Conditional_16_ForEmpty_168_Template, 3, 3, "p", 87);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(169, "div", 88)(170, "div")(171, "label", 37);
    i0.ɵɵtext(172);
    i0.ɵɵpipe(173, "translate");
    i0.ɵɵelementStart(174, "span", 63);
    i0.ɵɵtext(175);
    i0.ɵɵpipe(176, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(177, "textarea", 89);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(178, "div", 90)(179, "label", 91);
    i0.ɵɵelement(180, "input", 92);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtext(181);
    i0.ɵɵpipe(182, "translate");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 57, "tourDetailsStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 59, "detailsStepHint"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 61, "englishTitle"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.titleEng.touched && ctx_r0.tourForm.controls.titleEng.hasError("required") ? 18 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.titleEng.touched && ctx_r0.tourForm.controls.titleEng.hasError("pattern") ? 19 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 63, "arabicTitle"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.titleAr.touched && ctx_r0.tourForm.controls.titleAr.hasError("required") ? 25 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.titleAr.touched && ctx_r0.tourForm.controls.titleAr.hasError("pattern") ? 26 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 65, "destination"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.destinationsLoading);
    i0.ɵɵattribute("aria-expanded", ctx_r0.destinationMenuOpen);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destinationsLoading ? 33 : ctx_r0.selectedDestination ? 34 : 35);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("mdi-chevron-down", !ctx_r0.destinationMenuOpen)("mdi-chevron-up", ctx_r0.destinationMenuOpen);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.destinationMenuOpen ? 37 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.destinationId.touched && ctx_r0.tourForm.controls.destinationId.invalid ? 38 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(42, 67, "city"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r0.tourForm.controls.destinationId.value || ctx_r0.citiesLoading);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(46, 69, ctx_r0.citiesLoading ? "loadingCities" : "selectCity"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.cities);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.tourForm.controls.cityId.touched && ctx_r0.tourForm.controls.cityId.invalid ? 49 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(53, 71, "pricePerPerson"));
    i0.ɵɵadvance(5);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.pricePerPerson.touched && ctx_r0.tourForm.controls.pricePerPerson.invalid ? 58 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(62, 73, "pricePerChild"));
    i0.ɵɵadvance(5);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.pricePerChild.touched && ctx_r0.tourForm.controls.pricePerChild.invalid ? 67 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(71, 75, "maxSeats"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.maxSeats.touched && ctx_r0.tourForm.controls.maxSeats.invalid ? 73 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(77, 77, "durationDays"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.durationDays.touched ? 79 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(83, 79, "durationHours"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.durationHours.touched && ctx_r0.tourForm.controls.durationHours.invalid ? 85 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(89, 81, "startDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("max", ctx_r0.tourForm.controls.endDate.value || null)("ariaLabel", i0.ɵɵpipeBind1(92, 83, "startDate"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.tourForm.controls.startDate.touched && ctx_r0.tourForm.controls.startDate.invalid ? 93 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(97, 85, "endDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("min", ctx_r0.tourForm.controls.startDate.value || null)("ariaLabel", i0.ɵɵpipeBind1(100, 87, "endDate"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.tourForm.controls.endDate.touched && ctx_r0.tourForm.controls.endDate.hasError("required") ? 101 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.endDate.touched && ctx_r0.tourForm.hasError("invalidDateRange") ? 102 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(107, 89, "description"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(110, 91, "optional"), ")");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(115, 93, "fullDescription"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(118, 95, "optional"), ")");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(128, 97, "tourHighlights"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(132, 99, "addHighlight"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.highlightsArray.controls);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(144, 101, "tourIncludes"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(148, 103, "addIncluded"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.includesArray.controls);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(160, 105, "tourExcludes"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(164, 107, "addExcluded"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.excludesArray.controls);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(173, 109, "cancellationPolicy"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(176, 111, "optional"), ")");
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(182, 113, "freeCancellation"));
} }
function ToursFromCard_Conditional_17_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 110);
    i0.ɵɵelement(1, "i", 125);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(3, 2, "savedTourNumber"), " #", ctx_r0.currentTourId);
} }
function ToursFromCard_Conditional_17_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 120);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.imageValidationMessage));
} }
function ToursFromCard_Conditional_17_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 121);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "imagesRequired"));
} }
function ToursFromCard_Conditional_17_Conditional_32_For_2_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 132);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "cover"));
} }
function ToursFromCard_Conditional_17_Conditional_32_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 126);
    i0.ɵɵelement(1, "img", 127);
    i0.ɵɵelementStart(2, "button", 128);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_17_Conditional_32_For_2_Template_button_click_2_listener() { const ɵ$index_581_r19 = i0.ɵɵrestoreView(_r18).$index; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.setCoverImage(ɵ$index_581_r19)); });
    i0.ɵɵelement(4, "i", 129);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 130);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_17_Conditional_32_For_2_Template_button_click_5_listener() { const ɵ$index_581_r19 = i0.ɵɵrestoreView(_r18).$index; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.removeImage(ɵ$index_581_r19)); });
    i0.ɵɵelement(6, "i", 131);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ToursFromCard_Conditional_17_Conditional_32_For_2_Conditional_7_Template, 3, 3, "span", 132);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const image_r20 = ctx.$implicit;
    const ɵ$index_581_r19 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.getImageUrl(image_r20.url), i0.ɵɵsanitizeUrl)("alt", image_r20.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", image_r20.isCover || ctx_r0.deletingImageIndex !== null || ctx_r0.isSaving);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 12, "cover"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r0.deletingImageIndex !== null || ctx_r0.isSaving);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("mdi-loading", ctx_r0.deletingImageIndex === ɵ$index_581_r19)("mdi-spin", ctx_r0.deletingImageIndex === ɵ$index_581_r19)("mdi-close", ctx_r0.deletingImageIndex !== ɵ$index_581_r19);
    i0.ɵɵadvance();
    i0.ɵɵconditional(image_r20.isCover ? 7 : -1);
} }
function ToursFromCard_Conditional_17_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 122);
    i0.ɵɵrepeaterCreate(1, ToursFromCard_Conditional_17_Conditional_32_For_2_Template, 8, 14, "div", 126, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.imageUploads);
} }
function ToursFromCard_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 11)(1, "div", 107)(2, "div", 108)(3, "span", 33);
    i0.ɵɵelement(4, "i", 109);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h3", 35);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 23);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(12, ToursFromCard_Conditional_17_Conditional_12_Template, 4, 4, "span", 110);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 111)(14, "div", 112)(15, "label", 113);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 114);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "label", 115)(21, "span", 116);
    i0.ɵɵelement(22, "i", 117);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 118);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 23);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "input", 119);
    i0.ɵɵlistener("change", function ToursFromCard_Conditional_17_Template_input_change_29_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onImagesSelected($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(30, ToursFromCard_Conditional_17_Conditional_30_Template, 3, 3, "p", 120);
    i0.ɵɵconditionalCreate(31, ToursFromCard_Conditional_17_Conditional_31_Template, 3, 3, "p", 121);
    i0.ɵɵconditionalCreate(32, ToursFromCard_Conditional_17_Conditional_32_Template, 3, 0, "div", 122);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "p", 123);
    i0.ɵɵelement(34, "i", 124);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 17, "tourImagesStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 19, "imagesStepHint"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.currentTourId ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 21, "tourImages"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r0.imageUploads.length, " / ", ctx_r0.maxImages);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("cursor-not-allowed", ctx_r0.imageUploads.length >= ctx_r0.maxImages || ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null)("opacity-60", ctx_r0.imageUploads.length >= ctx_r0.maxImages || ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 23, "chooseImages"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(28, 25, "tourImageRules"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.imageUploads.length >= ctx_r0.maxImages || ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.imageValidationMessage ? 30 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.tourForm.controls.images.touched && ctx_r0.tourForm.controls.images.invalid ? 31 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.imageUploads.length ? 32 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 27, "imagesUploadStepHint"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "dayNumberPositive"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "stepTitleRequired"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "stepTitleMaxLength"));
} }
function ToursFromCard_Conditional_18_Conditional_21_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 155);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const timeOption_r23 = ctx.$implicit;
    i0.ɵɵproperty("value", timeOption_r23);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(timeOption_r23);
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "itineraryTimesRequired"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "itineraryTimeQuarterHour"));
} }
function ToursFromCard_Conditional_18_Conditional_21_For_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 155);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const timeOption_r24 = ctx.$implicit;
    i0.ɵɵproperty("value", timeOption_r24);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(timeOption_r24);
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "itineraryTimesRequired"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "itineraryTimeQuarterHour"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "endTimeAfterStart"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 157);
    i0.ɵɵelement(1, "i", 163);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "itineraryTimeConflict"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "stepDescriptionMaxLength"));
} }
function ToursFromCard_Conditional_18_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 140)(1, "div", 149)(2, "div")(3, "label", 150);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "input", 151);
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(7, ToursFromCard_Conditional_18_Conditional_21_Conditional_7_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div")(9, "label", 150);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 152);
    i0.ɵɵpipe(13, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(14, ToursFromCard_Conditional_18_Conditional_21_Conditional_14_Template, 3, 3, "p", 39);
    i0.ɵɵconditionalCreate(15, ToursFromCard_Conditional_18_Conditional_21_Conditional_15_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div")(17, "label", 150);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "input", 153);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div")(23, "label", 150);
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "select", 154)(27, "option", 51);
    i0.ɵɵtext(28, "--:--");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(29, ToursFromCard_Conditional_18_Conditional_21_For_30_Template, 2, 2, "option", 155, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(31, ToursFromCard_Conditional_18_Conditional_21_Conditional_31_Template, 3, 3, "p", 39)(32, ToursFromCard_Conditional_18_Conditional_21_Conditional_32_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div")(34, "label", 150);
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "select", 156)(38, "option", 51);
    i0.ɵɵtext(39, "--:--");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(40, ToursFromCard_Conditional_18_Conditional_21_For_41_Template, 2, 2, "option", 155, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(42, ToursFromCard_Conditional_18_Conditional_21_Conditional_42_Template, 3, 3, "p", 39)(43, ToursFromCard_Conditional_18_Conditional_21_Conditional_43_Template, 3, 3, "p", 39);
    i0.ɵɵconditionalCreate(44, ToursFromCard_Conditional_18_Conditional_21_Conditional_44_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(45, ToursFromCard_Conditional_18_Conditional_21_Conditional_45_Template, 4, 3, "p", 157);
    i0.ɵɵelementStart(46, "div")(47, "label", 150);
    i0.ɵɵtext(48);
    i0.ɵɵpipe(49, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(50, "textarea", 158);
    i0.ɵɵpipe(51, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵconditionalCreate(52, ToursFromCard_Conditional_18_Conditional_21_Conditional_52_Template, 3, 3, "p", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "div", 159)(54, "button", 160);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_Conditional_21_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r22); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.saveItineraryStep()); });
    i0.ɵɵelement(55, "i", 161);
    i0.ɵɵtext(56);
    i0.ɵɵpipe(57, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "button", 162);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_Conditional_21_Template_button_click_58_listener() { i0.ɵɵrestoreView(_r22); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.cancelItineraryStep()); });
    i0.ɵɵtext(59);
    i0.ɵɵpipe(60, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("formGroup", ctx_r0.itineraryDraft);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 23, "dayNumber"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.itineraryDraft.controls["dayNumber"].touched && ctx_r0.itineraryDraft.controls["dayNumber"].invalid ? 7 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 25, "stepTitle"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(13, 27, "stepTitlePlaceholder"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.itineraryDraft.controls["title"].touched && ctx_r0.itineraryDraft.controls["title"].hasError("required") ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.itineraryDraft.controls["title"].touched && ctx_r0.itineraryDraft.controls["title"].hasError("maxlength") ? 15 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(19, 29, "itineraryValue"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(21, 31, "itineraryValuePlaceholder"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 33, "startTime"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.itineraryTimeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.itineraryDraft.controls["startTime"].touched && ctx_r0.itineraryDraft.controls["startTime"].hasError("required") ? 31 : ctx_r0.itineraryDraft.controls["startTime"].hasError("invalidQuarterHourTime") ? 32 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 35, "endTime"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.itineraryTimeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.itineraryDraft.controls["endTime"].touched && ctx_r0.itineraryDraft.controls["endTime"].hasError("required") ? 42 : ctx_r0.itineraryDraft.controls["endTime"].hasError("invalidQuarterHourTime") ? 43 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((ctx_r0.itineraryDraft.controls["startTime"].touched || ctx_r0.itineraryDraft.controls["endTime"].touched) && ctx_r0.itineraryDraft.hasError("invalidItineraryTimeRange") ? 44 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.itineraryDraft.hasError("itineraryTimeOverlap") ? 45 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(49, 37, "description"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(51, 39, "stepDescriptionPlaceholder"));
    i0.ɵɵcontrol();
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.itineraryDraft.controls["description"].touched && ctx_r0.itineraryDraft.controls["description"].hasError("maxlength") ? 52 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.itineraryDraft.invalid);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(57, 41, "saveStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(60, 43, "cancel"));
} }
function ToursFromCard_Conditional_18_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 141)(1, "div");
    i0.ɵɵelement(2, "i", 164);
    i0.ɵɵelementStart(3, "p", 165);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, "clickAddStepToStart"));
} }
function ToursFromCard_Conditional_18_For_30_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 171);
    i0.ɵɵelement(1, "i", 179);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stepGroup_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stepGroup_r26.controls["value"].value);
} }
function ToursFromCard_Conditional_18_For_30_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 177);
    i0.ɵɵelement(1, "i", 180);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stepGroup_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", stepGroup_r26.controls["startTime"].value || "--:--", " - ", stepGroup_r26.controls["endTime"].value || "--:--");
} }
function ToursFromCard_Conditional_18_For_30_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 178);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stepGroup_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(stepGroup_r26.controls["description"].value);
} }
function ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 187);
    i0.ɵɵelement(1, "i", 179);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const childGroup_r31 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(childGroup_r31.controls["value"].value);
} }
function ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 23);
    i0.ɵɵelement(1, "i", 189);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const childGroup_r31 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", childGroup_r31.controls["startTime"].value || "--:--", " - ", childGroup_r31.controls["endTime"].value || "--:--");
} }
function ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 188);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const childGroup_r31 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(childGroup_r31.controls["description"].value);
} }
function ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 182);
    i0.ɵɵelement(1, "span", 183);
    i0.ɵɵelementStart(2, "div", 184)(3, "div")(4, "p", 185);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h5", 186);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 172)(11, "button", 174);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Template_button_click_11_listener() { const ɵ$index_852_r29 = i0.ɵɵrestoreView(_r28).$index; const children_r30 = i0.ɵɵnextContext(2); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.editItineraryStep(children_r30, ɵ$index_852_r29, true)); });
    i0.ɵɵelement(12, "i", 175);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 176);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Template_button_click_13_listener() { const ɵ$index_852_r29 = i0.ɵɵrestoreView(_r28).$index; const children_r30 = i0.ɵɵnextContext(2); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.removeItineraryStep(children_r30, ɵ$index_852_r29)); });
    i0.ɵɵelement(14, "i", 103);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(15, ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Conditional_15_Template, 3, 1, "p", 187);
    i0.ɵɵconditionalCreate(16, ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Conditional_16_Template, 3, 2, "p", 23);
    i0.ɵɵconditionalCreate(17, ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Conditional_17_Template, 2, 1, "p", 188);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const childGroup_r31 = ctx.$implicit;
    const ɵ$index_852_r29 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(6, 10, "childStep"), " ", ɵ$index_852_r29 + 1, " \u00B7 ", i0.ɵɵpipeBind1(7, 12, "day"), " ", childGroup_r31.controls["dayNumber"].value);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(childGroup_r31.controls["title"].value);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(childGroup_r31.controls["value"].value ? 15 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(childGroup_r31.controls["startTime"].value || childGroup_r31.controls["endTime"].value ? 16 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(childGroup_r31.controls["description"].value ? 17 : -1);
} }
function ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ol", 181);
    i0.ɵɵrepeaterCreate(1, ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_For_2_Template, 18, 14, "li", 182, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const children_r30 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(children_r30.controls);
} }
function ToursFromCard_Conditional_18_For_30_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, ToursFromCard_Conditional_18_For_30_Conditional_24_Conditional_0_Template, 3, 0, "ol", 181);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.length ? 0 : -1);
} }
function ToursFromCard_Conditional_18_For_30_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 145)(1, "span", 166);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "article", 167)(4, "div", 168)(5, "div")(6, "p", 169);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "h4", 170);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, ToursFromCard_Conditional_18_For_30_Conditional_12_Template, 3, 1, "p", 171);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 172)(14, "button", 173);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_For_30_Template_button_click_14_listener() { const stepGroup_r26 = i0.ɵɵrestoreView(_r25).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openItineraryChildEditor(stepGroup_r26)); });
    i0.ɵɵelement(15, "i", 74);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 174);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_For_30_Template_button_click_18_listener() { const ɵ$index_796_r27 = i0.ɵɵrestoreView(_r25).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editItineraryStep(ctx_r0.itineraryArray, ɵ$index_796_r27, false)); });
    i0.ɵɵelement(19, "i", 175);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 176);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_For_30_Template_button_click_20_listener() { const ɵ$index_796_r27 = i0.ɵɵrestoreView(_r25).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.removeItineraryStep(ctx_r0.itineraryArray, ɵ$index_796_r27)); });
    i0.ɵɵelement(21, "i", 103);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(22, ToursFromCard_Conditional_18_For_30_Conditional_22_Template, 3, 2, "p", 177);
    i0.ɵɵconditionalCreate(23, ToursFromCard_Conditional_18_For_30_Conditional_23_Template, 2, 1, "p", 178);
    i0.ɵɵconditionalCreate(24, ToursFromCard_Conditional_18_For_30_Conditional_24_Template, 1, 1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_22_0;
    const stepGroup_r26 = ctx.$implicit;
    const ɵ$index_796_r27 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_796_r27 + 1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate4("", i0.ɵɵpipeBind1(8, 14, "journeyStep"), " ", ɵ$index_796_r27 + 1, " \u00B7 ", i0.ɵɵpipeBind1(9, 16, "day"), " ", stepGroup_r26.controls["dayNumber"].value);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(stepGroup_r26.controls["title"].value);
    i0.ɵɵadvance();
    i0.ɵɵconditional(stepGroup_r26.controls["value"].value ? 12 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(17, 18, "addChild"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(stepGroup_r26.controls["startTime"].value || stepGroup_r26.controls["endTime"].value ? 22 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(stepGroup_r26.controls["description"].value ? 23 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_22_0 = ctx_r0.itineraryChildrenArray(stepGroup_r26)) ? 24 : -1, tmp_22_0);
} }
function ToursFromCard_Conditional_18_ForEmpty_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 146);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "noItineraryAdded"));
} }
function ToursFromCard_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 11)(1, "div", 133)(2, "div", 108)(3, "span", 134);
    i0.ɵɵelement(4, "i", 135);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "h3", 35);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 23);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "button", 136);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_18_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r21); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openItineraryStepEditor()); });
    i0.ɵɵelement(13, "i", 74);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 137)(17, "div", 138)(18, "h3", 139);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(21, ToursFromCard_Conditional_18_Conditional_21_Template, 61, 45, "div", 140)(22, ToursFromCard_Conditional_18_Conditional_22_Template, 6, 3, "div", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 142)(24, "h3", 139);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 143)(28, "ol", 144);
    i0.ɵɵrepeaterCreate(29, ToursFromCard_Conditional_18_For_30_Template, 25, 20, "li", 145, i0.ɵɵrepeaterTrackByIdentity, false, ToursFromCard_Conditional_18_ForEmpty_31_Template, 3, 3, "li", 146);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(32, "label", 147);
    i0.ɵɵelement(33, "input", 148);
    i0.ɵɵcontrolCreate();
    i0.ɵɵtext(34);
    i0.ɵɵpipe(35, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 9, "tourItineraryStep"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 11, "itineraryStepHint"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(15, 13, "addStep"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(20, 15, ctx_r0.itineraryDraftIsChild ? "childStepDetails" : "stepDetails"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.itineraryDraft ? 21 : 22);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 17, "itinerarySteps"));
    i0.ɵɵadvance(4);
    i0.ɵɵrepeater(ctx_r0.itineraryArray.controls);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(35, 19, "activeTour"));
} }
function ToursFromCard_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 190);
    i0.ɵɵlistener("click", function ToursFromCard_Conditional_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r32); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.previousStep()); });
    i0.ɵɵelement(1, "i", 191);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "previous"));
} }
function ToursFromCard_Conditional_26_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 93);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function ToursFromCard_Conditional_26_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "i", 192);
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "saveDetailsAndContinue"));
} }
function ToursFromCard_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵconditionalCreate(1, ToursFromCard_Conditional_26_Conditional_1_Template, 4, 3)(2, ToursFromCard_Conditional_26_Conditional_2_Template, 4, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.destinationsLoading);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isSaving ? 1 : 2);
} }
function ToursFromCard_Conditional_27_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 93);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function ToursFromCard_Conditional_27_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "i", 192);
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "saveImagesAndContinue"));
} }
function ToursFromCard_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵconditionalCreate(1, ToursFromCard_Conditional_27_Conditional_1_Template, 4, 3)(2, ToursFromCard_Conditional_27_Conditional_2_Template, 4, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isSaving ? 1 : 2);
} }
function ToursFromCard_Conditional_28_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 93);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function ToursFromCard_Conditional_28_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 80);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saveItineraryAndFinish"));
} }
function ToursFromCard_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵconditionalCreate(1, ToursFromCard_Conditional_28_Conditional_1_Template, 4, 3)(2, ToursFromCard_Conditional_28_Conditional_2_Template, 4, 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isSaving || ctx_r0.deletingImageIndex !== null || !!ctx_r0.itineraryDraft);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.isSaving ? 1 : 2);
} }
export class ToursFromCard {
    adminService;
    cdr;
    translate;
    selectedTour = null;
    tourSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    currencies = [
        { id: 2, code: 'USD', labelKey: 'currencyUsd' },
        { id: 1, code: 'EGP', labelKey: 'currencyEgp' },
    ];
    maxImages = 5;
    maxImageBytes = 5 * 1024 * 1024;
    maxImageWidth = 2400;
    maxImageHeight = 1600;
    imageConstraints = {
        maxWidth: this.maxImageWidth,
        maxHeight: this.maxImageHeight,
    };
    itineraryTimeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
        const hours = Math.floor(index / 4).toString().padStart(2, '0');
        const minutes = ((index % 4) * 15).toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    });
    formSteps = [
        { id: 1, label: 'tourDetailsStep', icon: 'mdi-file-document-edit-outline' },
        { id: 2, label: 'tourImagesStep', icon: 'mdi-image-multiple-outline' },
        { id: 3, label: 'tourItineraryStep', icon: 'mdi-map-marker-path' },
    ];
    destinations = [];
    cities = [];
    imageUploads = [];
    destinationsLoading = false;
    citiesLoading = false;
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
    savedTourId = null;
    tourForm = this.createForm();
    itineraryDraft = null;
    itineraryDraftIsChild = false;
    itineraryDraftCollection = null;
    itineraryDraftIndex = null;
    get defaultCurrencyId() {
        return this.currencies[0].id;
    }
    itineraryClientSequence = 0;
    citiesRequestSequence = 0;
    constructor(adminService, cdr, translate) {
        this.adminService = adminService;
        this.cdr = cdr;
        this.translate = translate;
    }
    ngOnInit() {
        this.loadDestinations();
    }
    ngOnChanges(changes) {
        if (!changes['selectedTour'])
            return;
        if (this.selectedTour)
            this.populateForm(this.selectedTour);
        else
            this.resetForm(false);
    }
    ngOnDestroy() {
        this.revokeNewImageUrls();
    }
    get filteredDestinations() {
        const searchTerm = this.destinationSearchTerm.trim().toLocaleLowerCase();
        if (!searchTerm)
            return this.destinations;
        return this.destinations.filter((destination) => this.destinationLabel(destination).toLocaleLowerCase().includes(searchTerm));
    }
    get selectedDestination() {
        const selectedId = this.tourForm.controls.destinationId.value;
        if (selectedId === '')
            return null;
        const destinationId = Number(selectedId);
        if (!Number.isInteger(destinationId) || destinationId <= 0)
            return null;
        return this.destinations.find((destination) => Number(destination.id) === destinationId) ?? null;
    }
    get selectedCity() {
        const selectedId = this.tourForm.controls.cityId.value;
        if (selectedId === '')
            return null;
        const cityId = Number(selectedId);
        if (!Number.isInteger(cityId) || cityId <= 0)
            return null;
        return this.cities.find((city) => Number(city.id) === cityId) ?? null;
    }
    get highlightsArray() {
        return this.tourForm.controls.highlights;
    }
    get includesArray() {
        return this.tourForm.controls.includes;
    }
    get excludesArray() {
        return this.tourForm.controls.excludes;
    }
    get itineraryArray() {
        return this.tourForm.controls.itinerary;
    }
    get currentTourId() {
        return this.savedTourId
            ?? this.toOptionalId(this.selectedTour?.id ?? this.selectedTour?.tourId);
    }
    get screenLoaderVisible() {
        return this.isSaving || this.deletingImageIndex !== null;
    }
    get screenLoaderMessage() {
        if (this.deletingImageIndex !== null)
            return 'deletingTourImage';
        return this.apiLoadingMessage || 'pleaseWaitForRequest';
    }
    loadDestinations() {
        this.destinationsLoading = true;
        this.errorMessage = '';
        this.adminService.getDestinations(1, 100).pipe(catchError(() => {
            this.errorMessage = 'destinationsLoadError';
            return of(null);
        }), finalize(() => {
            this.destinationsLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            this.destinations = this.extractCollection(response, ['destinations'])
                .map((destination) => {
                const id = Number(destination?.id ?? destination?.destinationId);
                return { ...destination, id };
            })
                .filter((destination) => Number.isFinite(destination.id));
        });
    }
    loadCities(destinationId, selectedCityId) {
        const requestSequence = ++this.citiesRequestSequence;
        if (!destinationId) {
            this.cities = [];
            this.tourForm.controls.cityId.setValue('');
            return;
        }
        this.citiesLoading = true;
        this.apiLoadingMessage = '';
        this.adminService.getCitiesByDestination(destinationId, 1, 500).pipe(catchError(() => {
            if (requestSequence !== this.citiesRequestSequence)
                return of(null);
            this.errorMessage = 'citiesLoadError';
            return of(null);
        }), finalize(() => {
            if (requestSequence !== this.citiesRequestSequence)
                return;
            this.citiesLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (requestSequence !== this.citiesRequestSequence)
                return;
            const rows = this.extractCollection(response, ['cities']);
            this.cities = rows.filter((city) => city?.isActive !== false)
                .map((city) => ({ ...city, id: Number(city?.id ?? city?.cityId) }))
                .filter((city) => Number.isFinite(city.id));
            const preferredId = Number(selectedCityId ?? this.tourForm.controls.cityId.value);
            this.tourForm.controls.cityId.setValue(this.cities.some((city) => city.id === preferredId) ? preferredId : '');
        });
    }
    saveCurrentStep() {
        if (this.activeStep === 1) {
            this.saveTourDetails();
            return;
        }
        if (this.activeStep === 2) {
            this.continueToItinerary();
            return;
        }
        this.saveTour();
    }
    saveTourDetails() {
        if (this.isSaving || !this.validateDetailsStep())
            return;
        if (this.tourForm.pristine) {
            this.savedTourId = this.currentTourId;
            ;
            this.completedStep = Math.max(this.completedStep, 1);
            this.activeStep = 2;
            return;
        }
        const existingId = this.currentTourId;
        const isCreating = !existingId;
        const payload = this.buildTourDetailsPayload(existingId);
        this.isSaving = true;
        this.apiLoadingMessage = 'savingTourDetails';
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = isCreating
            ? this.adminService.createTour(payload)
            : this.adminService.updateTour(payload);
        request$.pipe(switchMap((detailsResponse) => {
            if (detailsResponse?.isSuccess === false) {
                return of({ detailsResponse, tourId: null, statusResponse: null, statusError: null });
            }
            const tourId = existingId ?? this.extractTourId(detailsResponse);
            if (!tourId) {
                return of({ detailsResponse, tourId: null, statusResponse: null, statusError: null });
            }
            return this.adminService.changeTourStatus(tourId, false).pipe(map((statusResponse) => ({ detailsResponse, tourId, statusResponse, statusError: null })), catchError((statusError) => of({ detailsResponse, tourId, statusResponse: null, statusError })));
        }), catchError((error) => {
            this.errorMessage = 'tourSaveError';
            this.showApiToast('error', error?.error?.message || 'tourSaveError');
            return of(null);
        }), finalize(() => {
            this.isSaving = false;
            this.apiLoadingMessage = '';
            this.cdr.markForCheck();
        })).subscribe((result) => {
            if (result === null)
                return;
            const response = result.detailsResponse;
            if (response?.isSuccess === false) {
                this.errorMessage = response?.message || 'tourSaveError';
                this.showApiToast('error', this.errorMessage);
                return;
            }
            const tourId = result.tourId;
            if (!tourId) {
                this.errorMessage = 'tourIdMissingAfterCreate';
                this.showApiToast('error', this.errorMessage);
                return;
            }
            this.savedTourId = tourId;
            if (result.statusError || result.statusResponse?.isSuccess === false) {
                this.errorMessage = result.statusResponse?.message || 'tourStatusUpdateError';
                this.showApiToast('error', this.errorMessage);
                return;
            }
            this.completedStep = Math.max(this.completedStep, 1);
            this.activeStep = 2;
            this.successMessage = response?.message || (isCreating ? 'tourDetailsCreated' : 'tourDetailsUpdated');
            this.showApiToast('success', this.successMessage);
            this.cdr.markForCheck();
        });
    }
    continueToItinerary() {
        if (this.isSaving || !this.currentTourId)
            return;
        this.syncImagesControl();
        if (this.tourForm.controls.images.invalid) {
            this.tourForm.controls.images.markAsTouched();
            this.errorMessage = 'imagesRequired';
            return;
        }
        const pendingImages = this.imageUploads.filter((image) => image.file && !image.uploaded);
        if (!pendingImages.length) {
            this.showApiToast('success', 'tourImagesAlreadySaved');
            this.completeImagesStep();
            return;
        }
        const payload = new FormData();
        payload.append('TourId', String(this.currentTourId));
        const coverImageIndex = pendingImages.findIndex((image) => image.isCover);
        if (coverImageIndex >= 0)
            payload.append('CoverImageIndex', String(coverImageIndex));
        pendingImages.forEach((image) => payload.append('Images', image.file, image.file.name));
        this.isSaving = true;
        this.apiLoadingMessage = 'uploadingTourImages';
        this.errorMessage = '';
        this.successMessage = '';
        this.adminService.addTourImages(payload).pipe(catchError((error) => {
            this.errorMessage = 'tourImagesSaveError';
            this.showApiToast('error', error?.error?.message || 'tourImagesSaveError');
            return of(null);
        }), finalize(() => {
            this.isSaving = false;
            this.apiLoadingMessage = '';
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = response?.message || 'tourImagesSaveError';
                this.showApiToast('error', this.errorMessage);
                return;
            }
            const savedCoverUrl = String(response?.data?.coverImageUrl ?? '');
            const returnedImages = Array.isArray(response?.data?.images) ? response.data.images : [];
            if (returnedImages.length) {
                this.revokeNewImageUrls();
                this.imageUploads = returnedImages
                    .slice(0, this.maxImages)
                    .map((image, index) => ({
                    id: this.toOptionalId(image?.id ?? image?.tourImageId) ?? undefined,
                    url: this.imageUrl(image),
                    name: image?.imageName ?? image?.name
                        ?? this.translate.instant('tourImageNumber', { number: index + 1 }),
                    existing: true,
                    uploaded: true,
                    isCover: this.imageMatchesCover(image, savedCoverUrl),
                }))
                    .filter((image) => !!image.url);
                if (this.imageUploads.length && !this.imageUploads.some((image) => image.isCover)) {
                    this.imageUploads[0].isCover = true;
                }
                this.syncImagesControl();
            }
            else {
                pendingImages.forEach((image) => image.uploaded = true);
            }
            this.successMessage = response?.message || 'tourImagesSaved';
            this.showApiToast('success', this.successMessage);
            this.completeImagesStep();
        });
    }
    previousStep() {
        if (this.isSaving || this.activeStep === 1)
            return;
        this.errorMessage = '';
        this.successMessage = '';
        this.activeStep = (this.activeStep - 1);
        this.closeItineraryEditor();
    }
    completeImagesStep() {
        this.errorMessage = '';
        this.completedStep = Math.max(this.completedStep, 2);
        this.activeStep = 3;
        this.cdr.markForCheck();
    }
    saveTour() {
        if (this.isSaving || !this.currentTourId)
            return;
        if (this.itineraryDraft) {
            this.itineraryDraft.markAllAsTouched();
            this.errorMessage = 'saveItineraryStepFirst';
            return;
        }
        const itinerary = this.itineraryArray.getRawValue();
        this.itineraryArray.markAllAsTouched();
        if (!itinerary.length || hasInvalidItinerary(itinerary, Number(this.tourForm.controls.durationDays.value))) {
            this.errorMessage = 'itineraryTitleAndTimesRequired';
            return;
        }
        if (hasItineraryTimeOverlap(itinerary)) {
            this.errorMessage = 'itineraryTimeConflict';
            return;
        }
        this.isSaving = true;
        this.apiLoadingMessage = 'savingTourItinerary';
        this.errorMessage = '';
        this.successMessage = '';
        const payload = {
            TourId: this.currentTourId,
            Itinerary: this.buildItineraryPayload(),
        };
        this.adminService.addTourItinerary(payload).pipe(switchMap((itineraryResponse) => {
            if (itineraryResponse?.isSuccess === false) {
                return of({ itineraryResponse, statusResponse: null, statusError: null });
            }
            return this.adminService.changeTourStatus(this.currentTourId, this.tourForm.controls.isActive.value).pipe(map((statusResponse) => ({ itineraryResponse, statusResponse, statusError: null })), catchError((statusError) => of({ itineraryResponse, statusResponse: null, statusError })));
        }), catchError((error) => {
            this.errorMessage = 'tourItinerarySaveError';
            this.showApiToast('error', error?.error?.message || 'tourItinerarySaveError');
            return of(null);
        }), finalize(() => {
            this.isSaving = false;
            this.apiLoadingMessage = '';
            this.cdr.markForCheck();
        })).subscribe((result) => {
            if (result === null)
                return;
            const response = result.itineraryResponse;
            if (response?.isSuccess === false) {
                this.errorMessage = response?.message || 'tourItinerarySaveError';
                this.showApiToast('error', this.errorMessage);
                return;
            }
            if (result.statusError || result.statusResponse?.isSuccess === false) {
                this.errorMessage = result.statusResponse?.message || 'tourStatusUpdateError';
                this.showApiToast('error', this.errorMessage);
                return;
            }
            this.successMessage = response?.message || 'tourCreated';
            this.showApiToast('success', this.successMessage);
            this.completedStep = 3;
            this.tourSaved.emit();
            this.resetForm(false);
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    addHighlight() {
        this.highlightsArray.push(this.createListItemGroup());
    }
    removeHighlight(index) {
        this.highlightsArray.removeAt(index);
    }
    addInclude() {
        this.includesArray.push(this.createListItemGroup());
    }
    removeInclude(index) {
        this.includesArray.removeAt(index);
    }
    addExclude() {
        this.excludesArray.push(this.createListItemGroup());
    }
    removeExclude(index) {
        this.excludesArray.removeAt(index);
    }
    openItineraryStepEditor() {
        if (this.itineraryDraft)
            return;
        const tourId = this.currentTourId;
        const step = createEmptyTourItinerary(tourId);
        step.dayNumber = this.itineraryArray.length + 1;
        this.itineraryDraft = this.createItineraryGroup(step);
        this.itineraryDraftCollection = this.itineraryArray;
        this.itineraryDraftIndex = null;
        this.itineraryDraftIsChild = false;
        this.attachItineraryScheduleValidator();
    }
    openItineraryChildEditor(parentGroup) {
        if (this.itineraryDraft)
            return;
        const tourId = this.currentTourId;
        const parentId = this.toOptionalId(parentGroup.controls['id'].value);
        const child = createEmptyTourItinerary(tourId);
        child.parentId = parentId;
        child.isChildNode = true;
        child.dayNumber = Number(parentGroup.controls['dayNumber'].value) || 1;
        this.itineraryDraft = this.createItineraryGroup(child);
        this.itineraryDraftCollection = this.itineraryChildrenArray(parentGroup);
        this.itineraryDraftIndex = null;
        this.itineraryDraftIsChild = true;
        this.attachItineraryScheduleValidator();
    }
    editItineraryStep(collection, index, isChild) {
        if (this.itineraryDraft)
            return;
        this.itineraryDraft = this.createItineraryGroup(collection.at(index).getRawValue());
        this.itineraryDraftCollection = collection;
        this.itineraryDraftIndex = index;
        this.itineraryDraftIsChild = isChild;
        this.attachItineraryScheduleValidator();
    }
    saveItineraryStep() {
        if (!this.itineraryDraft || !this.itineraryDraftCollection)
            return;
        if (this.itineraryDraft.invalid) {
            this.itineraryDraft.markAllAsTouched();
            return;
        }
        if (this.itineraryDraftIndex === null) {
            this.itineraryDraftCollection.push(this.itineraryDraft);
        }
        else {
            this.itineraryDraftCollection.setControl(this.itineraryDraftIndex, this.itineraryDraft);
        }
        this.tourForm.markAsDirty();
        this.closeItineraryEditor();
    }
    cancelItineraryStep() {
        this.closeItineraryEditor();
    }
    itineraryChildrenArray(group) {
        return group.controls['childs'];
    }
    removeItineraryStep(collection, index) {
        if (this.itineraryDraft)
            return;
        collection.removeAt(index);
        this.tourForm.markAsDirty();
    }
    async onImagesSelected(event) {
        const input = event.target;
        const files = Array.from(input.files ?? []);
        input.value = '';
        this.imageValidationMessage = '';
        if (this.imageUploads.length + files.length > this.maxImages) {
            this.imageValidationMessage = 'tourImageLimit';
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
                this.imageUploads.push({
                    file: normalized,
                    url: URL.createObjectURL(normalized),
                    name: normalized.name,
                    existing: false,
                    uploaded: false,
                    isCover: this.imageUploads.length === 0,
                });
            }
            catch (error) {
                this.imageValidationMessage = error instanceof ImageUploadValidationError
                    ? error.translationKey
                    : 'imageReadError';
            }
        }
        this.syncImagesControl();
        this.cdr.markForCheck();
    }
    async removeImage(index) {
        if (this.deletingImageIndex !== null || this.isSaving)
            return;
        const image = this.imageUploads[index];
        if (!image)
            return;
        const confirmation = await Swal.fire({
            title: this.translate.instant('confirmImageDelete'),
            text: this.translate.instant('imageDeleteWarning'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('delete'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: '#e11d48',
            reverseButtons: true,
        });
        if (!confirmation.isConfirmed)
            return;
        const imageId = Number(image.id);
        if (image.existing && this.currentTourId && Number.isInteger(imageId) && imageId > 0) {
            const removedWasCover = image.isCover;
            this.deletingImageIndex = index;
            this.adminService.deleteTourImage(imageId).pipe(catchError(() => {
                Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
                return of({ imageDeleteFailed: true });
            }), finalize(() => {
                this.deletingImageIndex = null;
                this.cdr.markForCheck();
            })).subscribe((response) => {
                if (response?.imageDeleteFailed || response?.isSuccess === false) {
                    if (response?.isSuccess === false) {
                        Swal.fire({ icon: 'error', title: response?.message || this.translate.instant('imageDeleteError') });
                    }
                    return;
                }
                this.removeImageLocally(index);
                if (removedWasCover)
                    this.refreshTourImages();
                this.showImageDeletedToast();
            });
            return;
        }
        this.removeImageLocally(index);
        this.showImageDeletedToast();
    }
    setCoverImage(index) {
        if (this.isSaving || this.deletingImageIndex !== null)
            return;
        const image = this.imageUploads[index];
        if (!image || image.isCover)
            return;
        const tourId = this.currentTourId;
        const imageId = Number(image.id);
        if (image.existing && tourId && Number.isInteger(imageId) && imageId > 0) {
            this.isSaving = true;
            this.apiLoadingMessage = 'savingTourDetails';
            this.adminService.setTourCoverImage(tourId, imageId).pipe(catchError((error) => {
                this.showApiToast('error', error?.error?.message || 'tourSaveError');
                return of(null);
            }), finalize(() => {
                this.isSaving = false;
                this.apiLoadingMessage = '';
                this.cdr.markForCheck();
            })).subscribe((response) => {
                if (response === null || response?.isSuccess === false) {
                    if (response?.isSuccess === false) {
                        this.showApiToast('error', response?.message || 'tourSaveError');
                    }
                    return;
                }
                this.markCoverImage(index);
                this.showApiToast('success', response?.message || 'tourCover');
            });
            return;
        }
        this.markCoverImage(index);
    }
    destinationLabel(destination) {
        return [destination?.nameEng ?? destination?.name, destination?.nameAr]
            .filter(Boolean)
            .join(' — ');
    }
    toggleDestinationMenu(event) {
        event.stopPropagation();
        if (this.destinationsLoading)
            return;
        this.destinationMenuOpen = !this.destinationMenuOpen;
        if (!this.destinationMenuOpen)
            this.destinationSearchTerm = '';
    }
    selectDestination(destination) {
        const destinationId = Number(destination?.id ?? destination?.destinationId);
        if (!Number.isInteger(destinationId) || destinationId <= 0)
            return;
        this.tourForm.controls.destinationId.setValue(destinationId);
        this.tourForm.controls.destinationId.markAsDirty();
        this.tourForm.controls.destinationId.markAsTouched();
        this.tourForm.controls.cityId.setValue('');
        this.loadCities(destinationId);
        this.destinationMenuOpen = false;
        this.destinationSearchTerm = '';
    }
    updateDestinationSearch(event) {
        this.destinationSearchTerm = event.target.value;
    }
    closeDestinationMenu() {
        this.destinationMenuOpen = false;
        this.destinationSearchTerm = '';
    }
    closeDestinationMenuOnOutsideClick() {
        this.closeDestinationMenu();
    }
    populateForm(tour) {
        this.closeItineraryEditor();
        this.revokeNewImageUrls();
        this.imageValidationMessage = '';
        this.activeStep = 1;
        this.completedStep = 0;
        this.savedTourId = this.toOptionalId(tour?.id ?? tour?.tourId);
        const coverImageUrl = String(tour?.coverImageUrl ?? '');
        const tourImages = Array.isArray(tour?.images) && tour.images.length
            ? tour.images
            : (tour?.coverImageUrl ?? tour?.imageUrl ? [{
                    imageUrl: tour.coverImageUrl ?? tour.imageUrl,
                    imageName: this.translate.instant('tourCover'),
                }] : []);
        const imageUploads = tourImages
            .slice(0, this.maxImages)
            .map((image, index) => ({
            id: this.toOptionalId(image?.id ?? image?.tourImageId) ?? undefined,
            url: this.imageUrl(image),
            name: image?.imageName ?? image?.name
                ?? this.translate.instant('tourImageNumber', { number: index + 1 }),
            existing: true,
            uploaded: true,
            isCover: this.imageMatchesCover(image, coverImageUrl),
        }))
            .filter((image) => !!image.url);
        this.imageUploads = imageUploads;
        if (this.imageUploads.length && !this.imageUploads.some((image) => image.isCover)) {
            this.imageUploads[0].isCover = true;
        }
        this.tourForm.patchValue({
            titleEng: tour.titleEng ?? tour.title ?? '',
            titleAr: tour.titleAr ?? '',
            destinationId: tour.destinationId ?? '',
            cityId: tour.cityId ?? '',
            description: tour.description ?? tour.overview ?? '',
            fullDescription: tour.fullDescription ?? '',
            pricePerPerson: Number(tour.pricePerPerson ?? tour.price ?? 0),
            pricePerChild: Number(tour.pricePerChild ?? 0),
            currencyId: Number(tour.currencyId ?? this.defaultCurrencyId),
            durationDays: Number(tour.durationDays ?? 0),
            durationHours: Number(tour.durationhours ?? tour.durationHours ?? 0),
            maxSeats: Number(tour.maxSeats ?? 14),
            startDate: this.toDateInput(tour.startDate),
            endDate: this.toDateInput(tour.endDate),
            cancellationPolicy: tour.cancellationPolicy ?? '',
            isFreeCancelation: tour.isFreeCancelation === true,
            isActive: tour.isActive !== false,
        });
        this.setHighlights(tour.highlights ?? []);
        this.setIncludes(tour.includes ?? []);
        this.setExcludes(tour.excludes ?? []);
        this.setItinerary(tour.itinerary ?? tour.itineraries ?? []);
        this.syncImagesControl();
        const destinationId = Number(tour.destinationId);
        if (destinationId)
            this.loadCities(destinationId, Number(tour.cityId));
        this.closeDestinationMenu();
    }
    resetForm(emitCancel) {
        this.closeItineraryEditor();
        this.closeDestinationMenu();
        this.citiesRequestSequence++;
        this.cities = [];
        this.citiesLoading = false;
        this.revokeNewImageUrls();
        this.activeStep = 1;
        this.completedStep = 0;
        this.savedTourId = null;
        this.imageUploads = [];
        this.imageValidationMessage = '';
        this.tourForm.reset({
            titleEng: '',
            titleAr: '',
            destinationId: '',
            cityId: '',
            description: '',
            fullDescription: '',
            pricePerPerson: 0,
            pricePerChild: 0,
            currencyId: this.defaultCurrencyId,
            durationDays: 1,
            durationHours: 0,
            maxSeats: 1,
            startDate: '',
            endDate: '',
            images: [],
            cancellationPolicy: '',
            isFreeCancelation: false,
            isActive: true,
        });
        this.setHighlights([]);
        this.setIncludes([]);
        this.setExcludes([]);
        this.setItinerary([]);
        if (emitCancel)
            this.editCancelled.emit();
    }
    createForm() {
        return new FormGroup({
            titleEng: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.pattern(/^[A-Za-z][A-Za-z\s'-]*$/)],
            }),
            titleAr: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.pattern(/^[\u0600-\u06FF][\u0600-\u06FF\s'-]*$/)],
            }),
            destinationId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            cityId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            description: new FormControl('', { nonNullable: true }),
            fullDescription: new FormControl('', { nonNullable: true }),
            pricePerPerson: new FormControl(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0.01)],
            }),
            pricePerChild: new FormControl(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0)],
            }),
            currencyId: new FormControl(this.defaultCurrencyId, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(1)],
            }),
            durationDays: new FormControl(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(1)],
            }),
            durationHours: new FormControl(0, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(0), Validators.max(23)],
            }),
            maxSeats: new FormControl(1, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(1)],
            }),
            startDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            endDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            images: new FormControl([], {
                nonNullable: true,
                validators: [Validators.required],
            }),
            cancellationPolicy: new FormControl('', { nonNullable: true }),
            isFreeCancelation: new FormControl(false, { nonNullable: true }),
            isActive: new FormControl(true, { nonNullable: true }),
            highlights: new FormArray([]),
            includes: new FormArray([]),
            excludes: new FormArray([]),
            itinerary: new FormArray([]),
        }, { validators: this.dateRangeValidator });
    }
    createListItemGroup(item = {}) {
        return new FormGroup({
            id: new FormControl(Number(item?.id) || 0, { nonNullable: true }),
            value: new FormControl(String(item?.value ?? item?.text ?? item?.title ?? ''), {
                nonNullable: true,
                validators: [Validators.required],
            }),
        });
    }
    createItineraryGroup(item, depth = 0) {
        const itinerary = readTourItinerary(item, this.currentTourId);
        return new FormGroup({
            id: new FormControl(itinerary.id, { nonNullable: true }),
            parentId: new FormControl(itinerary.parentId),
            isChildNode: new FormControl(itinerary.isChildNode, { nonNullable: true }),
            title: new FormControl(itinerary.title, {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(200)],
            }),
            value: new FormControl(itinerary.value, { nonNullable: true }),
            description: new FormControl(itinerary.description, {
                nonNullable: true,
                validators: [Validators.maxLength(2000)],
            }),
            dayNumber: new FormControl(itinerary.dayNumber, {
                nonNullable: true,
                validators: [Validators.required, Validators.min(1), Validators.pattern(/^[1-9]\d*$/)],
            }),
            startTime: new FormControl(itinerary.startTime, {
                validators: [Validators.required, this.quarterHourTimeValidator],
            }),
            endTime: new FormControl(itinerary.endTime, {
                validators: [Validators.required, this.quarterHourTimeValidator],
            }),
            tourId: new FormControl(itinerary.tourId),
            childs: new FormArray(depth === 0
                ? itinerary.childs.map((child) => this.createItineraryGroup(child, 1))
                : []),
        }, { validators: this.itineraryTimeRangeValidator });
    }
    setHighlights(highlights) {
        this.setListItems(this.highlightsArray, highlights);
    }
    setIncludes(includes) {
        this.setListItems(this.includesArray, includes);
    }
    setExcludes(excludes) {
        this.setListItems(this.excludesArray, excludes);
    }
    setListItems(collection, values) {
        collection.clear();
        const items = Array.isArray(values) ? values : [];
        items.forEach((item) => collection.push(this.createListItemGroup(typeof item === 'string' ? { value: item } : item)));
    }
    setItinerary(itinerary) {
        this.itineraryArray.clear();
        const items = Array.isArray(itinerary) ? itinerary : [];
        items.forEach((item) => this.itineraryArray.push(this.createItineraryGroup(item)));
    }
    closeItineraryEditor() {
        this.itineraryDraft = null;
        this.itineraryDraftCollection = null;
        this.itineraryDraftIndex = null;
        this.itineraryDraftIsChild = false;
    }
    attachItineraryScheduleValidator() {
        if (!this.itineraryDraft)
            return;
        this.itineraryDraft.addValidators(this.itineraryTimeConflictValidator);
        this.itineraryDraft.updateValueAndValidity();
    }
    validateDetailsStep() {
        const controls = [
            this.tourForm.controls.titleEng,
            this.tourForm.controls.titleAr,
            this.tourForm.controls.destinationId,
            this.tourForm.controls.cityId,
            this.tourForm.controls.pricePerPerson,
            this.tourForm.controls.pricePerChild,
            this.tourForm.controls.currencyId,
            this.tourForm.controls.maxSeats,
            this.tourForm.controls.durationDays,
            this.tourForm.controls.durationHours,
            this.tourForm.controls.startDate,
            this.tourForm.controls.endDate,
            this.tourForm.controls.highlights,
            this.tourForm.controls.includes,
            this.tourForm.controls.excludes,
        ];
        controls.forEach((control) => control.markAllAsTouched());
        const valid = controls.every((control) => control.valid)
            && !this.tourForm.hasError('invalidDateRange');
        if (!valid)
            this.errorMessage = 'completeTourDetailsFirst';
        return valid;
    }
    buildTourDetailsPayload(tourId) {
        const form = this.tourForm.getRawValue();
        return {
            ...(tourId ? { Id: tourId } : {}),
            TitleEng: form.titleEng.trim(),
            TitleAr: form.titleAr.trim(),
            DestinationId: Number(form.destinationId),
            CityId: Number(form.cityId),
            Description: form.description.trim() || null,
            FullDescription: form.fullDescription.trim() || null,
            PricePerPerson: Number(form.pricePerPerson),
            PricePerChild: Number(form.pricePerChild),
            CurrencyId: Number(form.currencyId),
            DurationDays: Number(form.durationDays),
            Durationhours: Number(form.durationHours),
            MaxSeats: Number(form.maxSeats),
            StartDate: this.toApiDate(form.startDate),
            EndDate: this.toApiDate(form.endDate),
            CancellationPolicy: form.cancellationPolicy.trim(),
            IsFreeCancelation: form.isFreeCancelation,
            Highlights: this.toListPayload(form.highlights),
            Includes: this.toListPayload(form.includes),
            Excludes: this.toListPayload(form.excludes),
            IsActive: false,
        };
    }
    toListPayload(items) {
        return items
            .map((item) => ({
            Id: Number(item?.id) || 0,
            Value: String(item?.value ?? '').trim(),
        }))
            .filter((item) => !!item.Value);
    }
    buildItineraryPayload() {
        return this.itineraryArray.getRawValue()
            .filter((item) => !!item.title || !!item.value || !!item.description)
            .map((item) => this.mapItineraryItem(item));
    }
    mapItineraryItem(item) {
        const children = Array.isArray(item?.childs) ? item.childs : [];
        return {
            Title: String(item?.title ?? '').trim(),
            Value: String(item?.value ?? '').trim(),
            Description: String(item?.description ?? '').trim(),
            DayNumber: Number(item?.dayNumber),
            StartTime: this.toApiTime(item?.startTime),
            EndTime: this.toApiTime(item?.endTime),
            Childs: children.map((child) => this.mapItineraryItem(child)),
        };
    }
    extractTourId(response) {
        let current = response;
        for (let depth = 0; depth < 6 && current !== null && current !== undefined; depth++) {
            if (typeof current === 'number' || typeof current === 'string') {
                const directId = this.toOptionalId(current);
                if (directId)
                    return directId;
                break;
            }
            const id = this.toOptionalId(current?.tourId ?? current?.id);
            if (id)
                return id;
            current = current?.data ?? current?.result ?? current?.value ?? current?.tour;
        }
        return null;
    }
    toApiTime(value) {
        if (typeof value !== 'string' || !value.trim())
            return null;
        const match = value.trim().match(/^(\d{2}):(\d{2})/);
        return match ? `${match[1]}:${match[2]}:00` : null;
    }
    toApiDate(value) {
        return value ? `${value}T00:00:00` : value;
    }
    getImageUrl(url) {
        if (!url)
            return '';
        if (/^(blob:|data:|https?:\/\/)/i.test(url))
            return url;
        const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    syncImagesControl() {
        this.tourForm.controls.images.setValue(this.imageUploads.map((image) => image.url));
        this.tourForm.controls.images.markAsTouched();
        this.tourForm.controls.images.updateValueAndValidity();
    }
    removeImageLocally(index) {
        const [removed] = this.imageUploads.splice(index, 1);
        if (removed?.file)
            URL.revokeObjectURL(removed.url);
        if (removed?.isCover && this.imageUploads.length) {
            this.imageUploads[0].isCover = true;
        }
        this.syncImagesControl();
        this.cdr.markForCheck();
    }
    markCoverImage(index) {
        this.imageUploads.forEach((item, itemIndex) => item.isCover = itemIndex === index);
        this.cdr.markForCheck();
    }
    refreshTourImages() {
        const tourId = this.currentTourId;
        if (!tourId)
            return;
        this.adminService.getTours(1, 100).pipe(catchError(() => of(null))).subscribe((response) => {
            const rows = this.extractCollection(response, ['tours']);
            const tour = rows.find((item) => Number(item?.id ?? item?.tourId) === tourId);
            const coverImageUrl = String(tour?.coverImageUrl ?? '');
            if (!coverImageUrl)
                return;
            const replacementIndex = this.imageUploads.findIndex((item) => this.normalizeImagePath(item.url) === this.normalizeImagePath(coverImageUrl));
            if (replacementIndex >= 0)
                this.markCoverImage(replacementIndex);
        });
    }
    showImageDeletedToast() {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: this.translate.instant('imageDeleted'),
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true,
        });
    }
    showApiToast(icon, message) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon,
            title: this.translate.instant(message),
            showConfirmButton: false,
            timer: icon === 'success' ? 2600 : 4000,
            timerProgressBar: true,
        });
    }
    imageUrl(image) {
        return typeof image === 'string'
            ? image
            : (image?.imageUrl ?? image?.url ?? image?.path ?? image?.imageName ?? '');
    }
    imageMatchesCover(image, coverImageUrl) {
        if (!coverImageUrl)
            return false;
        const imageUrl = this.imageUrl(image);
        return this.normalizeImagePath(imageUrl) === this.normalizeImagePath(coverImageUrl);
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
    revokeNewImageUrls() {
        this.imageUploads
            .filter((image) => image.file)
            .forEach((image) => URL.revokeObjectURL(image.url));
    }
    extractCollection(response, collectionKeys) {
        let current = response;
        for (let depth = 0; depth < 4 && current; depth++) {
            if (Array.isArray(current))
                return current;
            for (const key of [...collectionKeys, 'items', 'records', 'result']) {
                if (Array.isArray(current?.[key]))
                    return current[key];
            }
            current = current?.data;
        }
        return [];
    }
    dateRangeValidator(control) {
        const startDate = control.get('startDate')?.value;
        const endDate = control.get('endDate')?.value;
        if (!startDate || !endDate)
            return null;
        return new Date(endDate).getTime() >= new Date(startDate).getTime()
            ? null
            : { invalidDateRange: true };
    }
    itineraryTimeRangeValidator(control) {
        const startTime = control.get('startTime')?.value;
        const endTime = control.get('endTime')?.value;
        if (!startTime || !endTime)
            return null;
        return String(endTime) > String(startTime)
            ? null
            : { invalidItineraryTimeRange: true };
    }
    quarterHourTimeValidator(control) {
        const value = control.value;
        if (value === null || value === undefined || value === '')
            return null;
        return isQuarterHourTime(value)
            ? null
            : { invalidQuarterHourTime: true };
    }
    itineraryTimeConflictValidator = (control) => {
        const startTime = control.get('startTime')?.value;
        const endTime = control.get('endTime')?.value;
        const dayNumber = Number(control.get('dayNumber')?.value);
        if (!startTime || !endTime || !Number.isInteger(dayNumber) || !this.itineraryDraftCollection) {
            return null;
        }
        const siblingSteps = this.itineraryDraftCollection.controls
            .filter((_, index) => index !== this.itineraryDraftIndex)
            .map((step) => step.getRawValue());
        const hasConflict = hasItineraryTimeOverlap([control.getRawValue(), ...siblingSteps]);
        return hasConflict ? { itineraryTimeOverlap: true } : null;
    };
    toDateInput(value) {
        if (!value)
            return '';
        const dateOnly = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
        if (dateOnly)
            return dateOnly[1];
        const date = new Date(value);
        if (Number.isNaN(date.getTime()))
            return '';
        const offset = date.getTimezoneOffset() * 60_000;
        return new Date(date.getTime() - offset).toISOString().slice(0, 10);
    }
    toOptionalId(value) {
        const id = Number(value);
        return Number.isInteger(id) && id > 0 ? id : null;
    }
    static ɵfac = function ToursFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || ToursFromCard)(i0.ɵɵdirectiveInject(i1.AdminService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.TranslateService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToursFromCard, selectors: [["app-tours-from-card"]], hostBindings: function ToursFromCard_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function ToursFromCard_click_HostBindingHandler() { return ctx.closeDestinationMenuOnOutsideClick(); }, i0.ɵɵresolveDocument);
        } }, inputs: { selectedTour: "selectedTour" }, outputs: { tourSaved: "tourSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 29, vars: 22, consts: [["role", "status", "aria-live", "assertive", 1, "fixed", "inset-0", "z-[9999]", "grid", "place-items-center", "bg-slate-950/55", "px-4", "backdrop-blur-sm"], [1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5", "md:p-6"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-6"], [1, "text-xl", "font-semibold"], [1, "mt-1", "text-sm", "text-slate-500"], [1, "mb-7", "grid", "grid-cols-3", "gap-2", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-2"], [1, "relative", "flex", "min-w-0", "items-center", "gap-2", "rounded-xl", "px-2", "py-3", "transition", "md:px-4", 3, "bg-primary", "text-white", "text-primary", "text-slate-400"], [3, "ngSubmit", "formGroup"], [1, "space-y-5"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5", "md:p-6"], [1, "mt-6", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-200", "pt-5"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "border", "bg-white", "px-4", "py-2", "text-sm", "font-semibold", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-white", 3, "disabled"], [1, "flex", "gap-3"], ["type", "button", 1, "rounded-full", "border", "bg-white", "px-4", "py-2", "text-sm", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-white", 3, "click", "disabled"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "submit", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], [1, "flex", "min-w-64", "flex-col", "items-center", "rounded-3xl", "border", "border-white/15", "bg-white", "px-8", "py-7", "text-center", "shadow-2xl"], [1, "relative", "grid", "h-16", "w-16", "place-items-center"], [1, "absolute", "inset-0", "animate-spin", "rounded-full", "border-4", "border-slate-200", "border-t-rose-600"], [1, "mdi", "text-2xl", "text-rose-600"], [1, "mt-5", "font-semibold", "text-slate-800"], [1, "mt-1", "text-xs", "text-slate-500"], [1, "relative", "flex", "min-w-0", "items-center", "gap-2", "rounded-xl", "px-2", "py-3", "transition", "md:px-4"], [1, "grid", "h-8", "w-8", "shrink-0", "place-items-center", "rounded-full", "border", "text-sm"], [1, "mdi", "mdi-check"], [3, "class"], [1, "min-w-0"], [1, "block", "text-[10px]", "font-semibold", "uppercase", "tracking-wider", "opacity-70"], [1, "hidden", "truncate", "text-sm", "font-semibold", "sm:block"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-5", "flex", "items-start", "gap-3"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-primary/10", "text-xl", "text-primary"], [1, "mdi", "mdi-file-document-edit-outline"], [1, "font-semibold"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "titleEng", "type", "text", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], ["formControlName", "titleAr", "type", "text", "dir", "rtl", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], ["id", "tourDestinationLabel", 1, "mb-2", "block", "text-sm", "font-medium"], [1, "relative", 3, "click", "keydown.escape"], ["type", "button", "aria-haspopup", "listbox", "aria-labelledby", "tourDestinationLabel", "aria-controls", "tourDestinationOptions", 1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-2xl", "border", "bg-white", "px-3", "py-2", "text-start", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "flex", "items-center", "gap-2", "text-slate-500"], [1, "truncate"], [1, "text-slate-500"], [1, "mdi", "text-lg", "text-slate-500"], [1, "absolute", "z-30", "mt-2", "w-full", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-xl"], ["formControlName", "cityId", 1, "w-full", "rounded-2xl", "border", "bg-white", "px-3", "py-2", "disabled:cursor-not-allowed", "disabled:bg-slate-100", 3, "disabled"], ["value", ""], [3, "ngValue"], [1, "relative"], [1, "pointer-events-none", "absolute", "inset-y-0", "start-0", "flex", "w-10", "items-center", "justify-center", "border-e", "text-sm", "font-semibold", "text-slate-500"], ["formControlName", "pricePerPerson", "type", "text", "appNumbersOnly", "", 1, "w-full", "rounded-2xl", "border", "py-2", "pe-3", "ps-12"], ["formControlName", "pricePerChild", "type", "text", "appNumbersOnly", "", 1, "w-full", "rounded-2xl", "border", "py-2", "pe-3", "ps-12"], ["formControlName", "maxSeats", "type", "text", "appNumbersOnly", "", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], ["formControlName", "durationDays", "type", "text", "appNumbersOnly", "", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], ["formControlName", "durationHours", "type", "text", "appNumbersOnly", "", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [1, "group", "relative"], ["formControlName", "startDate", "id", "tour-start-date", "inputClass", "cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-white py-3 pe-12 ps-12 shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10", 3, "max", "ariaLabel"], ["formControlName", "endDate", "id", "tour-end-date", "inputClass", "cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-white py-3 pe-12 ps-12 shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10", 3, "min", "ariaLabel"], [1, "mt-4", "grid", "gap-4"], [1, "text-slate-400"], ["formControlName", "description", "rows", "3", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], ["formControlName", "fullDescription", "rows", "4", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [1, "grid", "gap-4", "xl:grid-cols-3"], [1, "rounded-2xl", "border", "border-amber-200", "bg-amber-50/40", "p-4"], [1, "mb-3", "flex", "items-center", "justify-between", "gap-3"], [1, "flex", "items-center", "gap-2"], [1, "grid", "h-8", "w-8", "place-items-center", "rounded-xl", "bg-amber-100", "text-amber-600"], [1, "mdi", "mdi-star-outline"], [1, "text-sm", "font-semibold"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "bg-white", "px-3", "py-1", "text-xs", "font-semibold", "text-amber-700", "hover:bg-amber-100", 3, "click"], [1, "mdi", "mdi-plus"], [1, "space-y-2"], [3, "formGroup"], [1, "rounded-xl", "border", "border-dashed", "border-amber-200", "bg-white/70", "px-3", "py-5", "text-center", "text-xs", "text-slate-500"], [1, "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50/40", "p-4"], [1, "grid", "h-8", "w-8", "place-items-center", "rounded-xl", "bg-emerald-100", "text-emerald-600"], [1, "mdi", "mdi-check-circle-outline"], ["type", "button", 1, "rounded-full", "border", "border-emerald-300", "bg-white", "px-3", "py-1", "text-xs", "font-semibold", "text-emerald-700", "hover:bg-emerald-100", 3, "click"], [1, "rounded-xl", "border", "border-dashed", "border-emerald-200", "bg-white/70", "px-3", "py-5", "text-center", "text-xs", "text-slate-500"], [1, "rounded-2xl", "border", "border-rose-200", "bg-rose-50/40", "p-4"], [1, "grid", "h-8", "w-8", "place-items-center", "rounded-xl", "bg-rose-100", "text-rose-600"], [1, "mdi", "mdi-close-circle-outline"], ["type", "button", 1, "rounded-full", "border", "border-rose-300", "bg-white", "px-3", "py-1", "text-xs", "font-semibold", "text-rose-700", "hover:bg-rose-100", 3, "click"], [1, "rounded-xl", "border", "border-dashed", "border-rose-200", "bg-white/70", "px-3", "py-5", "text-center", "text-xs", "text-slate-500"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-4"], ["formControlName", "cancellationPolicy", "rows", "3", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [1, "mt-4"], [1, "flex", "items-center", "gap-2", "text-sm", "font-medium"], ["formControlName", "isFreeCancelation", "type", "checkbox"], [1, "mdi", "mdi-loading", "mdi-spin"], [1, "border-b", "border-slate-100", "p-2"], [1, "mdi", "mdi-magnify", "pointer-events-none", "absolute", "start-3", "top-1/2", "-translate-y-1/2", "text-slate-400"], ["type", "search", 1, "w-full", "rounded-xl", "border", "border-slate-200", "py-2", "pe-3", "ps-9", "text-sm", "outline-none", "focus:border-primary", 3, "input", "value", "placeholder"], ["id", "tourDestinationOptions", "role", "listbox", 1, "max-h-56", "overflow-y-auto", "p-2"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "px-3", "py-2", "text-start", "text-sm", "hover:bg-primary/5", "hover:text-primary", 3, "bg-primary-50", "text-primary"], [1, "px-3", "py-4", "text-center", "text-sm", "text-slate-500"], ["type", "button", 1, "flex", "w-full", "items-center", "justify-between", "gap-3", "rounded-xl", "px-3", "py-2", "text-start", "text-sm", "hover:bg-primary/5", "hover:text-primary", 3, "click"], ["formControlName", "value", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-amber-200", "bg-white", "px-3", "py-2", "text-sm", 3, "placeholder"], ["type", "button", 1, "grid", "h-9", "w-9", "shrink-0", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-white", "text-rose-600", "hover:bg-rose-50", 3, "click"], [1, "mdi", "mdi-close"], ["formControlName", "value", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-emerald-200", "bg-white", "px-3", "py-2", "text-sm", 3, "placeholder"], ["formControlName", "value", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-rose-200", "bg-white", "px-3", "py-2", "text-sm", 3, "placeholder"], ["type", "button", 1, "grid", "h-9", "w-9", "shrink-0", "place-items-center", "rounded-full", "border", "border-rose-200", "bg-white", "text-rose-600", "hover:bg-rose-100", 3, "click"], [1, "mb-5", "flex", "flex-wrap", "items-start", "justify-between", "gap-3"], [1, "flex", "items-start", "gap-3"], [1, "mdi", "mdi-image-multiple-outline"], [1, "rounded-full", "bg-emerald-50", "px-3", "py-1.5", "text-xs", "font-semibold", "text-emerald-700"], [1, "rounded-2xl", "border", "border-dashed", "border-slate-300", "p-4"], [1, "mb-2", "flex", "items-center", "justify-between"], ["for", "tourImages", 1, "text-sm", "font-medium"], [1, "text-xs", "text-slate-500"], ["for", "tourImages", 1, "flex", "cursor-pointer", "flex-col", "items-center", "rounded-2xl", "border-2", "border-dashed", "border-slate-300", "bg-slate-50", "px-4", "py-9", "text-center", "transition", "hover:border-primary", "hover:bg-primary/5"], [1, "grid", "h-14", "w-14", "place-items-center", "rounded-2xl", "bg-primary/10", "text-3xl", "text-primary"], [1, "mdi", "mdi-cloud-upload-outline"], [1, "mt-3", "text-sm", "font-semibold", "text-primary"], ["id", "tourImages", "type", "file", "accept", "image/jpeg,image/png,image/webp", "multiple", "", 1, "sr-only", 3, "change", "disabled"], ["role", "alert", 1, "mt-2", "text-xs", "font-medium", "text-red-600"], [1, "mt-2", "text-xs", "text-red-600"], [1, "mt-4", "grid", "grid-cols-2", "gap-3", "sm:grid-cols-3", "lg:grid-cols-5"], [1, "mt-3", "flex", "items-start", "gap-2", "text-xs", "text-slate-500"], [1, "mdi", "mdi-information-outline", "mt-0.5", "text-primary"], [1, "mdi", "mdi-check-circle", "me-1"], [1, "relative", "overflow-hidden", "rounded-xl", "bg-slate-200", "shadow-sm"], [1, "aspect-[3/2]", "w-full", "object-cover", 3, "src", "alt"], ["type", "button", 1, "absolute", "start-2", "top-2", "grid", "h-8", "w-8", "place-items-center", "rounded-full", "bg-black/70", "text-lg", "text-white", "transition", "hover:bg-primary", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi", "mdi-image-filter-center-focus-strong-outline"], ["type", "button", 1, "absolute", "end-2", "top-2", "grid", "h-8", "w-8", "place-items-center", "rounded-full", "bg-black/70", "text-lg", "text-white", "transition", "hover:bg-rose-600", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi"], [1, "absolute", "bottom-2", "start-2", "rounded-full", "bg-primary", "px-2", "py-1", "text-[10px]", "font-semibold", "text-white"], [1, "mb-5", "flex", "flex-wrap", "items-center", "justify-between", "gap-3"], [1, "grid", "h-10", "w-10", "shrink-0", "place-items-center", "rounded-xl", "bg-rose-100", "text-xl", "text-rose-600"], [1, "mdi", "mdi-map-marker-path"], ["type", "button", 1, "rounded-full", "border", "border-rose-200", "px-3", "py-1.5", "text-xs", "font-semibold", "text-rose-600", "hover:bg-rose-50", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-transparent", 3, "click", "disabled"], [1, "grid", "gap-4", "xl:grid-cols-2"], [1, "rounded-2xl", "border", "border-slate-200", "bg-slate-50", "p-4"], [1, "mb-3", "font-semibold"], [1, "space-y-3", 3, "formGroup"], [1, "grid", "min-h-48", "place-items-center", "rounded-xl", "border", "border-dashed", "border-slate-200", "bg-white", "px-5", "text-center", "text-slate-400"], [1, "rounded-2xl", "border", "border-slate-200", "p-4"], [1, "max-h-[70vh]", "overflow-y-auto", "pe-1"], [1, "relative", "space-y-7", "before:absolute", "before:bottom-4", "before:start-4", "before:top-4", "before:w-0.5", "before:bg-rose-200"], [1, "relative", "ps-11"], [1, "grid", "min-h-48", "place-items-center", "rounded-xl", "border", "border-dashed", "border-slate-200", "px-5", "text-center", "text-sm", "text-slate-400"], [1, "mt-5", "flex", "items-center", "gap-2", "rounded-2xl", "border", "border-slate-200", "bg-slate-50", "p-4", "text-sm", "font-medium"], ["formControlName", "isActive", "type", "checkbox"], [1, "grid", "gap-3", "md:grid-cols-2"], [1, "mb-1", "block", "text-xs", "font-medium"], ["formControlName", "dayNumber", "type", "text", "appNumbersOnly", "", "inputmode", "numeric", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], ["formControlName", "title", "type", "text", "maxlength", "200", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2", 3, "placeholder"], ["formControlName", "value", "type", "text", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2", 3, "placeholder"], ["formControlName", "startTime", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [3, "value"], ["formControlName", "endTime", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2"], [1, "rounded-xl", "border", "border-red-200", "bg-red-50", "px-3", "py-2", "text-xs", "font-medium", "text-red-600"], ["formControlName", "description", "rows", "3", "maxlength", "2000", 1, "w-full", "rounded-2xl", "border", "px-3", "py-2", 3, "placeholder"], [1, "flex", "gap-2"], ["type", "button", 1, "rounded-full", "bg-rose-600", "px-4", "py-2", "text-xs", "font-semibold", "text-white", "hover:bg-rose-700", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-rose-600", 3, "click", "disabled"], [1, "mdi", "mdi-content-save-outline"], ["type", "button", 1, "rounded-full", "border", "px-4", "py-2", "text-xs", "font-semibold", 3, "click"], [1, "mdi", "mdi-clock-alert-outline", "me-1"], [1, "mdi", "mdi-map-marker-path", "text-4xl"], [1, "mt-2", "text-sm"], [1, "absolute", "start-0", "top-0", "z-10", "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border-4", "border-white", "bg-rose-600", "text-xs", "font-bold", "text-white", "shadow-sm"], [1, "pb-1"], [1, "flex", "flex-wrap", "items-start", "justify-between", "gap-2"], [1, "text-[10px]", "font-semibold", "uppercase", "tracking-[0.18em]", "text-rose-600"], [1, "mt-1", "font-semibold"], [1, "mt-1", "text-xs", "font-medium", "text-rose-600"], [1, "flex", "gap-1"], ["type", "button", 1, "rounded-full", "border", "border-emerald-200", "px-2.5", "py-1", "text-xs", "text-emerald-600", "hover:bg-emerald-50", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-transparent", 3, "click", "disabled"], ["type", "button", 1, "grid", "h-7", "w-7", "place-items-center", "rounded-full", "border", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi", "mdi-pencil-outline"], ["type", "button", 1, "grid", "h-7", "w-7", "place-items-center", "rounded-full", "border", "text-red-500", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mt-2", "text-xs", "text-slate-500"], [1, "mt-2", "whitespace-pre-line", "text-sm", "leading-6", "text-slate-600"], [1, "mdi", "mdi-map-marker-outline", "me-1"], [1, "mdi", "mdi-clock-outline", "text-rose-600"], [1, "relative", "mt-4", "space-y-4", "before:absolute", "before:bottom-2", "before:start-1.5", "before:top-2", "before:w-px", "before:bg-emerald-200"], [1, "relative", "ps-7"], [1, "absolute", "start-0", "top-1.5", "z-10", "h-3", "w-3", "rounded-full", "border-[3px]", "border-emerald-500", "bg-white"], [1, "flex", "items-start", "justify-between", "gap-2"], [1, "text-[10px]", "font-semibold", "uppercase", "tracking-wider", "text-emerald-600"], [1, "mt-1", "font-medium"], [1, "mt-1", "text-xs", "font-medium", "text-emerald-600"], [1, "mt-1", "text-sm", "leading-6", "text-slate-600"], [1, "mdi", "mdi-clock-outline", "text-emerald-600"], ["type", "button", 1, "inline-flex", "items-center", "gap-2", "rounded-full", "border", "bg-white", "px-4", "py-2", "text-sm", "font-semibold", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-white", 3, "click", "disabled"], [1, "mdi", "mdi-arrow-left", "rtl:rotate-180"], [1, "mdi", "mdi-arrow-right", "rtl:rotate-180"]], template: function ToursFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, ToursFromCard_Conditional_0_Template, 12, 15, "div", 0);
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵconditionalCreate(2, ToursFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵconditionalCreate(3, ToursFromCard_Conditional_3_Template, 3, 3, "div", 3);
            i0.ɵɵelementStart(4, "div", 4)(5, "h2", 5);
            i0.ɵɵtext(6);
            i0.ɵɵpipe(7, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "nav", 7);
            i0.ɵɵpipe(12, "translate");
            i0.ɵɵrepeaterCreate(13, ToursFromCard_For_14_Template, 11, 28, "div", 8, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "form", 9);
            i0.ɵɵlistener("ngSubmit", function ToursFromCard_Template_form_ngSubmit_15_listener() { return ctx.saveCurrentStep(); });
            i0.ɵɵconditionalCreate(16, ToursFromCard_Conditional_16_Template, 183, 115, "section", 10);
            i0.ɵɵconditionalCreate(17, ToursFromCard_Conditional_17_Template, 37, 29, "section", 11);
            i0.ɵɵconditionalCreate(18, ToursFromCard_Conditional_18_Template, 36, 21, "section", 11);
            i0.ɵɵelementStart(19, "div", 12)(20, "div");
            i0.ɵɵconditionalCreate(21, ToursFromCard_Conditional_21_Template, 4, 4, "button", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 14)(23, "button", 15);
            i0.ɵɵlistener("click", function ToursFromCard_Template_button_click_23_listener() { return ctx.cancelEdit(); });
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(26, ToursFromCard_Conditional_26_Template, 3, 2, "button", 16)(27, ToursFromCard_Conditional_27_Template, 3, 2, "button", 17)(28, ToursFromCard_Conditional_28_Template, 3, 2, "button", 16);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.screenLoaderVisible ? 0 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.errorMessage ? 2 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 3 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 14, ctx.selectedTour ? "editTour" : "addTour"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 16, "tourStepperHint"));
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(12, 18, "tourCreationSteps"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.formSteps);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.tourForm);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeStep === 1 ? 16 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeStep === 2 ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.activeStep === 3 ? 18 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.activeStep === 2 ? 21 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isSaving || ctx.deletingImageIndex !== null);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(25, 20, "close"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.activeStep === 1 ? 26 : ctx.activeStep === 2 ? 27 : 28);
        } }, dependencies: [ReactiveFormsModule, i3.ɵNgNoValidate, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.CheckboxControlValueAccessor, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.MaxLengthValidator, i3.FormGroupDirective, i3.FormControlName, NumbersOnlyDirective, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToursFromCard, [{
        type: Component,
        args: [{ selector: 'app-tours-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe, NumbersOnlyDirective, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (screenLoaderVisible) {\n<div class=\"fixed inset-0 z-[9999] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm\" role=\"status\"\n  aria-live=\"assertive\" [attr.aria-label]=\"screenLoaderMessage | translate\">\n  <div\n    class=\"flex min-w-64 flex-col items-center rounded-3xl border border-white/15 bg-white px-8 py-7 text-center shadow-2xl\">\n    <span class=\"relative grid h-16 w-16 place-items-center\">\n      <span class=\"absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-rose-600\"></span>\n      <i class=\"mdi text-2xl text-rose-600\"\n        [class.mdi-file-document-edit-outline]=\"apiLoadingMessage === 'savingTourDetails'\"\n        [class.mdi-image-multiple-outline]=\"apiLoadingMessage === 'uploadingTourImages' || deletingImageIndex !== null\"\n        [class.mdi-map-marker-path]=\"apiLoadingMessage === 'savingTourItinerary'\"></i>\n    </span>\n    <p class=\"mt-5 font-semibold text-slate-800\">{{ screenLoaderMessage | translate }}</p>\n    <p class=\"mt-1 text-xs text-slate-500\">{{ 'pleaseWaitForRequest' | translate }}</p>\n  </div>\n</div>\n}\n\n<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6\">\n  @if (errorMessage) {\n  <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage |\n    translate }}</div>\n  }\n  @if (successMessage) {\n  <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{\n    successMessage | translate }}</div>\n  }\n\n  <div class=\"mb-6\">\n    <h2 class=\"text-xl font-semibold\">{{ (selectedTour ? 'editTour' : 'addTour') | translate }}</h2>\n    <p class=\"mt-1 text-sm text-slate-500\">{{ 'tourStepperHint' | translate }}</p>\n  </div>\n\n  <nav class=\"mb-7 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-2\"\n    [attr.aria-label]=\"'tourCreationSteps' | translate\">\n    @for (step of formSteps; track step.id) {\n    <div class=\"relative flex min-w-0 items-center gap-2 rounded-xl px-2 py-3 transition md:px-4\"\n      [class.bg-primary]=\"activeStep === step.id\" [class.text-white]=\"activeStep === step.id\"\n      [class.text-primary]=\"activeStep !== step.id && completedStep >= step.id\"\n      [class.text-slate-400]=\"activeStep !== step.id && completedStep < step.id\">\n      <span class=\"grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm\"\n        [class.border-white]=\"activeStep === step.id\" [class.bg-white]=\"activeStep === step.id\"\n        [class.text-primary]=\"activeStep === step.id\"\n        [class.border-primary]=\"activeStep !== step.id && completedStep >= step.id\"\n        [class.bg-slate-50]=\"activeStep !== step.id\"\n        [class.border-slate-200]=\"activeStep !== step.id && completedStep < step.id\">\n        @if (completedStep >= step.id && activeStep !== step.id) {\n        <i class=\"mdi mdi-check\"></i>\n        } @else {\n        <i class=\"mdi {{ step.icon }}\"></i>\n        }\n      </span>\n      <span class=\"min-w-0\">\n        <span class=\"block text-[10px] font-semibold uppercase tracking-wider opacity-70\">{{ 'step' | translate }} {{\n          step.id }}</span>\n        <span class=\"hidden truncate text-sm font-semibold sm:block\">{{ step.label | translate }}</span>\n      </span>\n    </div>\n    }\n  </nav>\n\n  <form [formGroup]=\"tourForm\" (ngSubmit)=\"saveCurrentStep()\">\n    @if (activeStep === 1) {\n    <section class=\"space-y-5\">\n      <div class=\"rounded-2xl border border-slate-200 bg-white p-5\">\n        <div class=\"mb-5 flex items-start gap-3\">\n          <span class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-xl text-primary\"><i\n              class=\"mdi mdi-file-document-edit-outline\"></i></span>\n          <div>\n            <h3 class=\"font-semibold\">{{ 'tourDetailsStep' | translate }}</h3>\n            <p class=\"mt-1 text-xs text-slate-500\">{{ 'detailsStepHint' | translate }}</p>\n          </div>\n        </div>\n\n        <div class=\"grid gap-4 md:grid-cols-2\">\n          <div>\n            <label class=\"mb-2 block text-sm font-medium\">{{ 'englishTitle' | translate }}</label>\n            <input formControlName=\"titleEng\" type=\"text\" class=\"w-full rounded-2xl border px-3 py-2\" />\n            @if (tourForm.controls.titleEng.touched && tourForm.controls.titleEng.hasError('required')) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'englishTitleRequired' | translate }}</p> }\n            @if (tourForm.controls.titleEng.touched && tourForm.controls.titleEng.hasError('pattern')) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'englishNameInvalid' | translate }}</p> }\n          </div>\n          <div>\n            <label class=\"mb-2 block text-sm font-medium\">{{ 'arabicTitle' | translate }}</label>\n            <input formControlName=\"titleAr\" type=\"text\" dir=\"rtl\" class=\"w-full rounded-2xl border px-3 py-2\" />\n            @if (tourForm.controls.titleAr.touched && tourForm.controls.titleAr.hasError('required')) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'arabicTitleRequired' | translate }}</p> }\n            @if (tourForm.controls.titleAr.touched && tourForm.controls.titleAr.hasError('pattern')) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'arabicNameInvalid' | translate }}</p> }\n          </div>\n\n          <div>\n            <label class=\"mb-2 block text-sm font-medium\" id=\"tourDestinationLabel\">{{ 'destination' | translate\n              }}</label>\n            <div class=\"relative\" (click)=\"$event.stopPropagation()\" (keydown.escape)=\"closeDestinationMenu()\">\n              <button type=\"button\"\n                class=\"flex w-full items-center justify-between gap-3 rounded-2xl border bg-white px-3 py-2 text-start disabled:cursor-not-allowed disabled:opacity-60\"\n                [disabled]=\"destinationsLoading\" [attr.aria-expanded]=\"destinationMenuOpen\" aria-haspopup=\"listbox\"\n                aria-labelledby=\"tourDestinationLabel\" aria-controls=\"tourDestinationOptions\"\n                (click)=\"toggleDestinationMenu($event)\">\n                @if (destinationsLoading) {\n                <span class=\"flex items-center gap-2 text-slate-500\"><i class=\"mdi mdi-loading mdi-spin\"></i>{{\n                  'loadingDestinations' | translate }}</span>\n                } @else if (selectedDestination) {\n                <span class=\"truncate\">{{ destinationLabel(selectedDestination) }}</span>\n                } @else {\n                <span class=\"text-slate-500\">{{ 'selectDestination' | translate }}</span>\n                }\n                <i class=\"mdi text-lg text-slate-500\" [class.mdi-chevron-down]=\"!destinationMenuOpen\"\n                  [class.mdi-chevron-up]=\"destinationMenuOpen\"></i>\n              </button>\n              @if (destinationMenuOpen) {\n              <div\n                class=\"absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl\">\n                <div class=\"border-b border-slate-100 p-2\">\n                  <div class=\"relative\">\n                    <i\n                      class=\"mdi mdi-magnify pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-slate-400\"></i>\n                    <input type=\"search\"\n                      class=\"w-full rounded-xl border border-slate-200 py-2 pe-3 ps-9 text-sm outline-none focus:border-primary\"\n                      [value]=\"destinationSearchTerm\" [placeholder]=\"'searchDestinations' | translate\"\n                      (input)=\"updateDestinationSearch($event)\" />\n                  </div>\n                </div>\n                <div id=\"tourDestinationOptions\" class=\"max-h-56 overflow-y-auto p-2\" role=\"listbox\">\n                  @for (destination of filteredDestinations; track destination.id) {\n                  <button type=\"button\"\n                    class=\"flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-start text-sm hover:bg-primary/5 hover:text-primary\"\n                    [class.bg-primary-50]=\"tourForm.controls.destinationId.value === destination.id\"\n                    [class.text-primary]=\"tourForm.controls.destinationId.value === destination.id\"\n                    (click)=\"selectDestination(destination)\">\n                    <span class=\"truncate\">{{ destinationLabel(destination) }}</span>\n                    @if (tourForm.controls.destinationId.value === destination.id) { <i class=\"mdi mdi-check\"></i> }\n                  </button>\n                  } @empty {\n                  <p class=\"px-3 py-4 text-center text-sm text-slate-500\">{{ (destinations.length ?\n                    'noMatchingDestinations' : 'noDestinationsFound') | translate }}</p>\n                  }\n                </div>\n              </div>\n              }\n            </div>\n            @if (tourForm.controls.destinationId.touched && tourForm.controls.destinationId.invalid) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'destinationRequired' | translate }}</p> }\n          </div>\n\n          <div>\n            <label class=\"mb-2 block text-sm font-medium\">{{ 'city' | translate }}</label>\n            <select formControlName=\"cityId\" [disabled]=\"!tourForm.controls.destinationId.value || citiesLoading\" class=\"w-full rounded-2xl border bg-white px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-100\">\n              <option value=\"\">{{ (citiesLoading ? 'loadingCities' : 'selectCity') | translate }}</option>\n              @for (city of cities; track city.id) {\n                <option [ngValue]=\"city.id\">{{ city.nameEng }} \u2014 {{ city.nameAr }}</option>\n              }\n            </select>\n            @if (tourForm.controls.cityId.touched && tourForm.controls.cityId.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'cityRequired' | translate }}</p> }\n          </div>\n\n          <!-- <div><label class=\"mb-2 block text-sm font-medium\">{{ 'currency' | translate }}</label><select formControlName=\"currencyId\" class=\"w-full rounded-2xl border bg-white px-3 py-2\">@for (currency of currencies; track currency.id) { <option [ngValue]=\"currency.id\">{{ currency.labelKey | translate }} ({{ currency.code }})</option> }</select></div> -->\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'pricePerPerson' | translate }}</label>\n            <div class=\"relative\"><span\n                class=\"pointer-events-none absolute inset-y-0 start-0 flex w-10 items-center justify-center border-e text-sm font-semibold text-slate-500\">$</span><input\n                formControlName=\"pricePerPerson\" type=\"text\" appNumbersOnly\n                class=\"w-full rounded-2xl border py-2 pe-3 ps-12\" /></div>@if (tourForm.controls.pricePerPerson.touched\n            && tourForm.controls.pricePerPerson.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{\n              'positiveValueRequired' | translate }}</p> }\n          </div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'pricePerChild' | translate }}</label>\n            <div class=\"relative\"><span\n                class=\"pointer-events-none absolute inset-y-0 start-0 flex w-10 items-center justify-center border-e text-sm font-semibold text-slate-500\">$</span><input\n                formControlName=\"pricePerChild\" type=\"text\" appNumbersOnly\n                class=\"w-full rounded-2xl border py-2 pe-3 ps-12\" /></div>@if (tourForm.controls.pricePerChild.touched\n            && tourForm.controls.pricePerChild.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{\n              'nonNegativeValueRequired' | translate }}</p> }\n          </div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'maxSeats' | translate }}</label><input\n              formControlName=\"maxSeats\" type=\"text\" appNumbersOnly class=\"w-full rounded-2xl border px-3 py-2\" />@if\n            (tourForm.controls.maxSeats.touched && tourForm.controls.maxSeats.invalid) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'positiveValueRequired' | translate }}</p> }</div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'durationDays' | translate }}</label>\n            <input formControlName=\"durationDays\" type=\"text\" appNumbersOnly\n              class=\"w-full rounded-2xl border px-3 py-2\" />\n      @if (tourForm.controls.durationDays.touched) {\n\n  @if (tourForm.controls.durationDays.hasError('required')) {\n    <p class=\"mt-1 text-xs text-red-600\">\n      {{ 'fieldRequired' | translate }}\n    </p>\n  }\n\n  @if (tourForm.controls.durationDays.hasError('min')) {\n    <p class=\"mt-1 text-xs text-red-600\">\n      {{ 'positiveValueRequired' | translate }}\n    </p>\n  }\n\n}\n            \n          </div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'durationHours' | translate }}</label><input\n              formControlName=\"durationHours\" type=\"text\" appNumbersOnly\n              class=\"w-full rounded-2xl border px-3 py-2\" />@if (tourForm.controls.durationHours.touched &&\n            tourForm.controls.durationHours.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'durationHoursRange' |\n              translate }}</p> }</div>\n\n          <div>\n            <label class=\"mb-2 block text-sm font-medium\">{{ 'startDate' | translate }}</label>\n            <div class=\"group relative\">\n              <app-date-picker formControlName=\"startDate\" id=\"tour-start-date\"\n                [max]=\"tourForm.controls.endDate.value || null\" [ariaLabel]=\"'startDate' | translate\"\n                inputClass=\"cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-white py-3 pe-12 ps-12 shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10\" />\n            </div>\n            @if (tourForm.controls.startDate.touched && tourForm.controls.startDate.invalid) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'startDateRequired' | translate }}</p> }\n          </div>\n          <div>\n            <label class=\"mb-2 block text-sm font-medium\">{{ 'endDate' | translate }}</label>\n            <div class=\"group relative\">\n              <app-date-picker formControlName=\"endDate\" id=\"tour-end-date\"\n                [min]=\"tourForm.controls.startDate.value || null\" [ariaLabel]=\"'endDate' | translate\"\n                inputClass=\"cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-white py-3 pe-12 ps-12 shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10\" />\n            </div>\n            @if (tourForm.controls.endDate.touched && tourForm.controls.endDate.hasError('required')) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'endDateRequired' | translate }}</p> }\n            @if (tourForm.controls.endDate.touched && tourForm.hasError('invalidDateRange')) { <p\n              class=\"mt-1 text-xs text-red-600\">{{ 'endDateBeforeStart' | translate }}</p> }\n          </div>\n        </div>\n\n        <div class=\"mt-4 grid gap-4\">\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'description' | translate }} <span\n                class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><textarea\n              formControlName=\"description\" rows=\"3\" class=\"w-full rounded-2xl border px-3 py-2\"></textarea></div>\n          <div><label class=\"mb-2 block text-sm font-medium\">{{ 'fullDescription' | translate }} <span\n                class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><textarea\n              formControlName=\"fullDescription\" rows=\"4\" class=\"w-full rounded-2xl border px-3 py-2\"></textarea></div>\n        </div>\n      </div>\n\n      <div class=\"grid gap-4 xl:grid-cols-3\">\n        <section class=\"rounded-2xl border border-amber-200 bg-amber-50/40 p-4\">\n          <div class=\"mb-3 flex items-center justify-between gap-3\">\n            <div class=\"flex items-center gap-2\"><span\n                class=\"grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-600\"><i\n                  class=\"mdi mdi-star-outline\"></i></span>\n              <h3 class=\"text-sm font-semibold\">{{ 'tourHighlights' | translate }}</h3>\n            </div>\n            <button type=\"button\"\n              class=\"rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100\"\n              (click)=\"addHighlight()\"><i class=\"mdi mdi-plus\"></i> {{ 'addHighlight' | translate }}</button>\n          </div>\n          <div class=\"space-y-2\">\n            @for (itemGroup of highlightsArray.controls; track itemGroup; let index = $index) {\n            <div [formGroup]=\"itemGroup\">\n              <div class=\"flex items-center gap-2\"><input formControlName=\"value\" type=\"text\"\n                  [placeholder]=\"'highlightPlaceholder' | translate\"\n                  class=\"w-full rounded-2xl border border-amber-200 bg-white px-3 py-2 text-sm\" /><button type=\"button\"\n                  class=\"grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rose-200 bg-white text-rose-600 hover:bg-rose-50\"\n                  (click)=\"removeHighlight(index)\" [attr.aria-label]=\"'remove' | translate\"><i\n                    class=\"mdi mdi-close\"></i></button></div>\n              @if (itemGroup.controls['value'].touched && itemGroup.controls['value'].invalid) { <p\n                class=\"mt-1 text-xs text-red-600\">{{ 'listValueRequired' | translate }}</p> }\n            </div>\n            } @empty { <p\n              class=\"rounded-xl border border-dashed border-amber-200 bg-white/70 px-3 py-5 text-center text-xs text-slate-500\">\n              {{ 'noHighlightsAdded' | translate }}</p> }\n          </div>\n        </section>\n\n        <section class=\"rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4\">\n          <div class=\"mb-3 flex items-center justify-between gap-3\">\n            <div class=\"flex items-center gap-2\"><span\n                class=\"grid h-8 w-8 place-items-center rounded-xl bg-emerald-100 text-emerald-600\"><i\n                  class=\"mdi mdi-check-circle-outline\"></i></span>\n              <h3 class=\"text-sm font-semibold\">{{ 'tourIncludes' | translate }}</h3>\n            </div>\n            <button type=\"button\"\n              class=\"rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100\"\n              (click)=\"addInclude()\"><i class=\"mdi mdi-plus\"></i> {{ 'addIncluded' | translate }}</button>\n          </div>\n          <div class=\"space-y-2\">\n            @for (itemGroup of includesArray.controls; track itemGroup; let index = $index) {\n            <div [formGroup]=\"itemGroup\">\n              <div class=\"flex items-center gap-2\"><input formControlName=\"value\" type=\"text\"\n                  [placeholder]=\"'includeValuePlaceholder' | translate\"\n                  class=\"w-full rounded-2xl border border-emerald-200 bg-white px-3 py-2 text-sm\" /><button\n                  type=\"button\"\n                  class=\"grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rose-200 bg-white text-rose-600 hover:bg-rose-50\"\n                  (click)=\"removeInclude(index)\" [attr.aria-label]=\"'remove' | translate\"><i\n                    class=\"mdi mdi-close\"></i></button></div>\n              @if (itemGroup.controls['value'].touched && itemGroup.controls['value'].invalid) { <p\n                class=\"mt-1 text-xs text-red-600\">{{ 'listValueRequired' | translate }}</p> }\n            </div>\n            } @empty { <p\n              class=\"rounded-xl border border-dashed border-emerald-200 bg-white/70 px-3 py-5 text-center text-xs text-slate-500\">\n              {{ 'noTourIncludesAdded' | translate }}</p> }\n          </div>\n        </section>\n\n        <section class=\"rounded-2xl border border-rose-200 bg-rose-50/40 p-4\">\n          <div class=\"mb-3 flex items-center justify-between gap-3\">\n            <div class=\"flex items-center gap-2\"><span\n                class=\"grid h-8 w-8 place-items-center rounded-xl bg-rose-100 text-rose-600\"><i\n                  class=\"mdi mdi-close-circle-outline\"></i></span>\n              <h3 class=\"text-sm font-semibold\">{{ 'tourExcludes' | translate }}</h3>\n            </div>\n            <button type=\"button\"\n              class=\"rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100\"\n              (click)=\"addExclude()\"><i class=\"mdi mdi-plus\"></i> {{ 'addExcluded' | translate }}</button>\n          </div>\n          <div class=\"space-y-2\">\n            @for (itemGroup of excludesArray.controls; track itemGroup; let index = $index) {\n            <div [formGroup]=\"itemGroup\">\n              <div class=\"flex items-center gap-2\"><input formControlName=\"value\" type=\"text\"\n                  [placeholder]=\"'excludeValuePlaceholder' | translate\"\n                  class=\"w-full rounded-2xl border border-rose-200 bg-white px-3 py-2 text-sm\" /><button type=\"button\"\n                  class=\"grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rose-200 bg-white text-rose-600 hover:bg-rose-100\"\n                  (click)=\"removeExclude(index)\" [attr.aria-label]=\"'remove' | translate\"><i\n                    class=\"mdi mdi-close\"></i></button></div>\n              @if (itemGroup.controls['value'].touched && itemGroup.controls['value'].invalid) { <p\n                class=\"mt-1 text-xs text-red-600\">{{ 'listValueRequired' | translate }}</p> }\n            </div>\n            } @empty { <p\n              class=\"rounded-xl border border-dashed border-rose-200 bg-white/70 px-3 py-5 text-center text-xs text-slate-500\">\n              {{ 'noTourExcludesAdded' | translate }}</p> }\n          </div>\n        </section>\n      </div>\n\n      <div class=\"rounded-2xl border border-slate-200 bg-white p-4\">\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'cancellationPolicy' | translate }} <span\n              class=\"text-slate-400\">({{ 'optional' | translate }})</span></label><textarea\n            formControlName=\"cancellationPolicy\" rows=\"3\" class=\"w-full rounded-2xl border px-3 py-2\"></textarea></div>\n        <div class=\"mt-4\"><label class=\"flex items-center gap-2 text-sm font-medium\"><input\n              formControlName=\"isFreeCancelation\" type=\"checkbox\" />{{ 'freeCancellation' | translate }}</label></div>\n      </div>\n    </section>\n    }\n\n    @if (activeStep === 2) {\n    <section class=\"rounded-2xl border border-slate-200 bg-white p-5 md:p-6\">\n      <div class=\"mb-5 flex flex-wrap items-start justify-between gap-3\">\n        <div class=\"flex items-start gap-3\"><span\n            class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-xl text-primary\"><i\n              class=\"mdi mdi-image-multiple-outline\"></i></span>\n          <div>\n            <h3 class=\"font-semibold\">{{ 'tourImagesStep' | translate }}</h3>\n            <p class=\"mt-1 text-xs text-slate-500\">{{ 'imagesStepHint' | translate }}</p>\n          </div>\n        </div>\n        @if (currentTourId) { <span\n          class=\"rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700\"><i\n            class=\"mdi mdi-check-circle me-1\"></i>{{ 'savedTourNumber' | translate }} #{{ currentTourId }}</span> }\n      </div>\n\n      <div class=\"rounded-2xl border border-dashed border-slate-300 p-4\">\n        <div class=\"mb-2 flex items-center justify-between\"><label for=\"tourImages\" class=\"text-sm font-medium\">{{\n            'tourImages' | translate }}</label><span class=\"text-xs text-slate-500\">{{ imageUploads.length }} / {{\n            maxImages }}</span></div>\n        <label for=\"tourImages\"\n          class=\"flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-9 text-center transition hover:border-primary hover:bg-primary/5\"\n          [class.cursor-not-allowed]=\"imageUploads.length >= maxImages || isSaving || deletingImageIndex !== null\"\n          [class.opacity-60]=\"imageUploads.length >= maxImages || isSaving || deletingImageIndex !== null\">\n          <span class=\"grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-3xl text-primary\"><i\n              class=\"mdi mdi-cloud-upload-outline\"></i></span>\n          <span class=\"mt-3 text-sm font-semibold text-primary\">{{ 'chooseImages' | translate }}</span>\n          <span class=\"mt-1 text-xs text-slate-500\">{{ 'tourImageRules' | translate }}</span>\n        </label>\n        <input id=\"tourImages\" type=\"file\" accept=\"image/jpeg,image/png,image/webp\" multiple class=\"sr-only\"\n          [disabled]=\"imageUploads.length >= maxImages || isSaving || deletingImageIndex !== null\"\n          (change)=\"onImagesSelected($event)\" />\n        @if (imageValidationMessage) { <p class=\"mt-2 text-xs font-medium text-red-600\" role=\"alert\">{{\n          imageValidationMessage | translate }}</p> }\n        @if (tourForm.controls.images.touched && tourForm.controls.images.invalid) { <p\n          class=\"mt-2 text-xs text-red-600\">{{ 'imagesRequired' | translate }}</p> }\n\n        @if (imageUploads.length) {\n        <div class=\"mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5\">\n          @for (image of imageUploads; track image.url; let index = $index) {\n          <div class=\"relative overflow-hidden rounded-xl bg-slate-200 shadow-sm\">\n            <img [src]=\"getImageUrl(image.url)\" [alt]=\"image.name\" class=\"aspect-[3/2] w-full object-cover\" />\n            <button type=\"button\"\n              class=\"absolute start-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-lg text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60\"\n              [disabled]=\"image.isCover || deletingImageIndex !== null || isSaving\" (click)=\"setCoverImage(index)\"\n              [attr.aria-label]=\"'cover' | translate\"><i class=\"mdi mdi-image-filter-center-focus-strong-outline\"></i></button>\n            <button type=\"button\"\n              class=\"absolute end-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-lg text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60\"\n              [disabled]=\"deletingImageIndex !== null || isSaving\" (click)=\"removeImage(index)\"><i class=\"mdi\"\n                [class.mdi-loading]=\"deletingImageIndex === index\" [class.mdi-spin]=\"deletingImageIndex === index\"\n                [class.mdi-close]=\"deletingImageIndex !== index\"></i></button>\n            @if (image.isCover) { <span\n              class=\"absolute bottom-2 start-2 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-white\">{{\n              'cover' | translate }}</span> }\n          </div>\n          }\n        </div>\n        }\n      </div>\n      <p class=\"mt-3 flex items-start gap-2 text-xs text-slate-500\"><i\n          class=\"mdi mdi-information-outline mt-0.5 text-primary\"></i>{{ 'imagesUploadStepHint' | translate }}</p>\n    </section>\n    }\n\n    @if (activeStep === 3) {\n    <section class=\"rounded-2xl border border-slate-200 bg-white p-5 md:p-6\">\n      <div class=\"mb-5 flex flex-wrap items-center justify-between gap-3\">\n        <div class=\"flex items-start gap-3\"><span\n            class=\"grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-100 text-xl text-rose-600\"><i\n              class=\"mdi mdi-map-marker-path\"></i></span>\n          <div>\n            <h3 class=\"font-semibold\">{{ 'tourItineraryStep' | translate }}</h3>\n            <p class=\"mt-1 text-xs text-slate-500\">{{ 'itineraryStepHint' | translate }}</p>\n          </div>\n        </div>\n        <button type=\"button\" [disabled]=\"!!itineraryDraft\"\n          class=\"rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent\"\n          (click)=\"openItineraryStepEditor()\"><i class=\"mdi mdi-plus\"></i> {{ 'addStep' | translate }}</button>\n      </div>\n\n      <div class=\"grid gap-4 xl:grid-cols-2\">\n        <div class=\"rounded-2xl border border-slate-200 bg-slate-50 p-4\">\n          <h3 class=\"mb-3 font-semibold\">{{ (itineraryDraftIsChild ? 'childStepDetails' : 'stepDetails') | translate }}\n          </h3>\n          @if (itineraryDraft) {\n          <div [formGroup]=\"itineraryDraft\" class=\"space-y-3\">\n            <div class=\"grid gap-3 md:grid-cols-2\">\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'dayNumber' | translate }}</label><input\n                  formControlName=\"dayNumber\" type=\"text\" appNumbersOnly inputmode=\"numeric\"\n                  class=\"w-full rounded-2xl border px-3 py-2\" />@if (itineraryDraft.controls['dayNumber'].touched &&\n                itineraryDraft.controls['dayNumber'].invalid) { <p class=\"mt-1 text-xs text-red-600\">{{\n                  'dayNumberPositive' | translate }}</p> }</div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'stepTitle' | translate }}</label><input\n                  formControlName=\"title\" type=\"text\" maxlength=\"200\" [placeholder]=\"'stepTitlePlaceholder' | translate\"\n                  class=\"w-full rounded-2xl border px-3 py-2\" />@if (itineraryDraft.controls['title'].touched &&\n                itineraryDraft.controls['title'].hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{\n                  'stepTitleRequired' | translate }}</p> }@if (itineraryDraft.controls['title'].touched &&\n                itineraryDraft.controls['title'].hasError('maxlength')) { <p class=\"mt-1 text-xs text-red-600\">{{\n                  'stepTitleMaxLength' | translate }}</p> }</div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'itineraryValue' | translate }}</label><input\n                  formControlName=\"value\" type=\"text\" [placeholder]=\"'itineraryValuePlaceholder' | translate\"\n                  class=\"w-full rounded-2xl border px-3 py-2\" /></div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'startTime' | translate }}</label><select\n                  formControlName=\"startTime\" class=\"w-full rounded-2xl border px-3 py-2\">\n                  <option [ngValue]=\"null\">--:--</option>@for (timeOption of itineraryTimeOptions; track timeOption) {\n                  <option [value]=\"timeOption\">{{ timeOption }}</option> }\n                </select>@if (itineraryDraft.controls['startTime'].touched &&\n                itineraryDraft.controls['startTime'].hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{\n                  'itineraryTimesRequired' | translate }}</p> } @else if\n                (itineraryDraft.controls['startTime'].hasError('invalidQuarterHourTime')) { <p\n                  class=\"mt-1 text-xs text-red-600\">{{ 'itineraryTimeQuarterHour' | translate }}</p> }</div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'endTime' | translate }}</label><select\n                  formControlName=\"endTime\" class=\"w-full rounded-2xl border px-3 py-2\">\n                  <option [ngValue]=\"null\">--:--</option>@for (timeOption of itineraryTimeOptions; track timeOption) {\n                  <option [value]=\"timeOption\">{{ timeOption }}</option> }\n                </select>@if (itineraryDraft.controls['endTime'].touched &&\n                itineraryDraft.controls['endTime'].hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{\n                  'itineraryTimesRequired' | translate }}</p> } @else if\n                (itineraryDraft.controls['endTime'].hasError('invalidQuarterHourTime')) { <p\n                  class=\"mt-1 text-xs text-red-600\">{{ 'itineraryTimeQuarterHour' | translate }}</p> }@if\n                ((itineraryDraft.controls['startTime'].touched || itineraryDraft.controls['endTime'].touched) &&\n                itineraryDraft.hasError('invalidItineraryTimeRange')) { <p class=\"mt-1 text-xs text-red-600\">{{\n                  'endTimeAfterStart' | translate }}</p> }</div>\n            </div>\n            @if (itineraryDraft.hasError('itineraryTimeOverlap')) { <p\n              class=\"rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600\"><i\n                class=\"mdi mdi-clock-alert-outline me-1\"></i>{{ 'itineraryTimeConflict' | translate }}</p> }\n            <div><label class=\"mb-1 block text-xs font-medium\">{{ 'description' | translate }}</label><textarea\n                formControlName=\"description\" rows=\"3\" maxlength=\"2000\"\n                [placeholder]=\"'stepDescriptionPlaceholder' | translate\"\n                class=\"w-full rounded-2xl border px-3 py-2\"></textarea>@if\n              (itineraryDraft.controls['description'].touched &&\n              itineraryDraft.controls['description'].hasError('maxlength')) { <p class=\"mt-1 text-xs text-red-600\">{{\n                'stepDescriptionMaxLength' | translate }}</p> }</div>\n            <div class=\"flex gap-2\"><button type=\"button\" [disabled]=\"itineraryDraft.invalid\"\n                class=\"rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-rose-600\"\n                (click)=\"saveItineraryStep()\"><i class=\"mdi mdi-content-save-outline\"></i> {{ 'saveStep' | translate\n                }}</button><button type=\"button\" class=\"rounded-full border px-4 py-2 text-xs font-semibold\"\n                (click)=\"cancelItineraryStep()\">{{ 'cancel' | translate }}</button></div>\n          </div>\n          } @else {\n          <div\n            class=\"grid min-h-48 place-items-center rounded-xl border border-dashed border-slate-200 bg-white px-5 text-center text-slate-400\">\n            <div><i class=\"mdi mdi-map-marker-path text-4xl\"></i>\n              <p class=\"mt-2 text-sm\">{{ 'clickAddStepToStart' | translate }}</p>\n            </div>\n          </div>\n          }\n        </div>\n\n        <div class=\"rounded-2xl border border-slate-200 p-4\">\n          <h3 class=\"mb-3 font-semibold\">{{ 'itinerarySteps' | translate }}</h3>\n          <div class=\"max-h-[70vh] overflow-y-auto pe-1\">\n            <ol\n              class=\"relative space-y-7 before:absolute before:bottom-4 before:start-4 before:top-4 before:w-0.5 before:bg-rose-200\">\n              @for (stepGroup of itineraryArray.controls; track stepGroup; let stepIndex = $index) {\n              <li class=\"relative ps-11\">\n                <span\n                  class=\"absolute start-0 top-0 z-10 grid h-8 w-8 place-items-center rounded-full border-4 border-white bg-rose-600 text-xs font-bold text-white shadow-sm\">{{\n                  stepIndex + 1 }}</span>\n                <article class=\"pb-1\">\n                  <div class=\"flex flex-wrap items-start justify-between gap-2\">\n                    <div>\n                      <p class=\"text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-600\">{{ 'journeyStep' |\n                        translate }} {{ stepIndex + 1 }} \u00B7 {{ 'day' | translate }} {{\n                        stepGroup.controls['dayNumber'].value }}</p>\n                      <h4 class=\"mt-1 font-semibold\">{{ stepGroup.controls['title'].value }}</h4>@if\n                      (stepGroup.controls['value'].value) { <p class=\"mt-1 text-xs font-medium text-rose-600\"><i\n                          class=\"mdi mdi-map-marker-outline me-1\"></i>{{ stepGroup.controls['value'].value }}</p> }\n                    </div>\n                    <div class=\"flex gap-1\"><button type=\"button\" [disabled]=\"!!itineraryDraft\"\n                        class=\"rounded-full border border-emerald-200 px-2.5 py-1 text-xs text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent\"\n                        (click)=\"openItineraryChildEditor(stepGroup)\"><i class=\"mdi mdi-plus\"></i> {{ 'addChild' |\n                        translate }}</button><button type=\"button\" [disabled]=\"!!itineraryDraft\"\n                        class=\"grid h-7 w-7 place-items-center rounded-full border disabled:cursor-not-allowed disabled:opacity-60\"\n                        (click)=\"editItineraryStep(itineraryArray, stepIndex, false)\"><i\n                          class=\"mdi mdi-pencil-outline\"></i></button><button type=\"button\"\n                        [disabled]=\"!!itineraryDraft\"\n                        class=\"grid h-7 w-7 place-items-center rounded-full border text-red-500 disabled:cursor-not-allowed disabled:opacity-60\"\n                        (click)=\"removeItineraryStep(itineraryArray, stepIndex)\"><i class=\"mdi mdi-close\"></i></button>\n                    </div>\n                  </div>\n                  @if (stepGroup.controls['startTime'].value || stepGroup.controls['endTime'].value) { <p\n                    class=\"mt-2 text-xs text-slate-500\"><i class=\"mdi mdi-clock-outline text-rose-600\"></i> {{\n                    stepGroup.controls['startTime'].value || '--:--' }} - {{ stepGroup.controls['endTime'].value ||\n                    '--:--' }}</p> }\n                  @if (stepGroup.controls['description'].value) { <p\n                    class=\"mt-2 whitespace-pre-line text-sm leading-6 text-slate-600\">{{\n                    stepGroup.controls['description'].value }}</p> }\n                  @if (itineraryChildrenArray(stepGroup); as children) {\n                  @if (children.length) {\n                  <ol\n                    class=\"relative mt-4 space-y-4 before:absolute before:bottom-2 before:start-1.5 before:top-2 before:w-px before:bg-emerald-200\">\n                    @for (childGroup of children.controls; track childGroup; let childIndex = $index) {\n                    <li class=\"relative ps-7\"><span\n                        class=\"absolute start-0 top-1.5 z-10 h-3 w-3 rounded-full border-[3px] border-emerald-500 bg-white\"></span>\n                      <div class=\"flex items-start justify-between gap-2\">\n                        <div>\n                          <p class=\"text-[10px] font-semibold uppercase tracking-wider text-emerald-600\">{{ 'childStep'\n                            | translate }} {{ childIndex + 1 }} \u00B7 {{ 'day' | translate }} {{\n                            childGroup.controls['dayNumber'].value }}</p>\n                          <h5 class=\"mt-1 font-medium\">{{ childGroup.controls['title'].value }}</h5>\n                        </div>\n                        <div class=\"flex gap-1\"><button type=\"button\" [disabled]=\"!!itineraryDraft\"\n                            class=\"grid h-7 w-7 place-items-center rounded-full border disabled:cursor-not-allowed disabled:opacity-60\"\n                            (click)=\"editItineraryStep(children, childIndex, true)\"><i\n                              class=\"mdi mdi-pencil-outline\"></i></button><button type=\"button\"\n                            [disabled]=\"!!itineraryDraft\"\n                            class=\"grid h-7 w-7 place-items-center rounded-full border text-red-500 disabled:cursor-not-allowed disabled:opacity-60\"\n                            (click)=\"removeItineraryStep(children, childIndex)\"><i class=\"mdi mdi-close\"></i></button>\n                        </div>\n                      </div>@if (childGroup.controls['value'].value) { <p\n                        class=\"mt-1 text-xs font-medium text-emerald-600\"><i\n                          class=\"mdi mdi-map-marker-outline me-1\"></i>{{ childGroup.controls['value'].value }}</p> }@if\n                      (childGroup.controls['startTime'].value || childGroup.controls['endTime'].value) { <p\n                        class=\"mt-1 text-xs text-slate-500\"><i class=\"mdi mdi-clock-outline text-emerald-600\"></i> {{\n                        childGroup.controls['startTime'].value || '--:--' }} - {{ childGroup.controls['endTime'].value\n                        || '--:--' }}</p> }@if (childGroup.controls['description'].value) { <p\n                        class=\"mt-1 text-sm leading-6 text-slate-600\">{{ childGroup.controls['description'].value }}</p>\n                      }\n                    </li>\n                    }\n                  </ol>\n                  }\n                  }\n                </article>\n              </li>\n              } @empty {\n              <li\n                class=\"grid min-h-48 place-items-center rounded-xl border border-dashed border-slate-200 px-5 text-center text-sm text-slate-400\">\n                {{ 'noItineraryAdded' | translate }}</li>\n              }\n            </ol>\n          </div>\n        </div>\n      </div>\n      <label\n        class=\"mt-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium\"><input\n          formControlName=\"isActive\" type=\"checkbox\" />{{ 'activeTour' | translate }}</label>\n    </section>\n    }\n\n    <div class=\"mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5\">\n      <div>\n        @if (activeStep === 2) {\n        <button type=\"button\" [disabled]=\"isSaving || deletingImageIndex !== null\"\n          class=\"inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white\"\n          (click)=\"previousStep()\"><i class=\"mdi mdi-arrow-left rtl:rotate-180\"></i>{{ 'previous' | translate\n          }}</button>\n        }\n      </div>\n      <div class=\"flex gap-3\">\n        <button type=\"button\" [disabled]=\"isSaving || deletingImageIndex !== null\"\n          class=\"rounded-full border bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white\"\n          (click)=\"cancelEdit()\">{{ 'close' | translate }}</button>\n        @if (activeStep === 1) {\n        <button type=\"submit\" [disabled]=\"isSaving || destinationsLoading\"\n          class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">\n          @if (isSaving) { <i class=\"mdi mdi-loading mdi-spin\"></i><span>{{ 'saving' | translate }}</span> } @else {\n          <span>{{ 'saveDetailsAndContinue' | translate }}</span><i class=\"mdi mdi-arrow-right rtl:rotate-180\"></i> }\n        </button>\n        } @else if (activeStep === 2) {\n        <button type=\"submit\" [disabled]=\"isSaving || deletingImageIndex !== null\"\n          class=\"inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if\n          (isSaving) { <i class=\"mdi mdi-loading mdi-spin\"></i><span>{{ 'saving' | translate }}</span> } @else {\n          <span>{{ 'saveImagesAndContinue' | translate }}</span><i class=\"mdi mdi-arrow-right rtl:rotate-180\"></i>\n          }</button>\n        } @else {\n        <button type=\"submit\" [disabled]=\"isSaving || deletingImageIndex !== null || !!itineraryDraft\"\n          class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">\n          @if (isSaving) { <i class=\"mdi mdi-loading mdi-spin\"></i><span>{{ 'saving' | translate }}</span> } @else { <i\n            class=\"mdi mdi-check-circle-outline\"></i><span>{{ 'saveItineraryAndFinish' | translate }}</span> }\n        </button>\n        }\n      </div>\n    </div>\n  </form>\n</div>\n" }]
    }], () => [{ type: i1.AdminService }, { type: i0.ChangeDetectorRef }, { type: i2.TranslateService }], { selectedTour: [{
            type: Input
        }], tourSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }], closeDestinationMenuOnOutsideClick: [{
            type: HostListener,
            args: ['document:click']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToursFromCard, { className: "ToursFromCard", filePath: "app/features/configurations/tours/tours-from-card/tours-from-card.ts", lineNumber: 64 }); })();
