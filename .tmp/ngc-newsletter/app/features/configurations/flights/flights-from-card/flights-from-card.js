import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, of, switchMap, tap } from 'rxjs';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { AirportSearchService } from '../airport-search.service';
import { FLIGHT_CLASS_OPTIONS, FlightClassEnum } from '../flight-class.enum';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
const _forTrack2 = ($index, $item) => $item.placeId;
function FlightsFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function FlightsFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.successMessage));
} }
function FlightsFromCard_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "flightNumberRequired"));
} }
function FlightsFromCard_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "flightNumberMaxLength"));
} }
function FlightsFromCard_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const airline_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", airline_r2.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(airline_r2.name);
} }
function FlightsFromCard_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airlineRequired"));
} }
function FlightsFromCard_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 16);
} }
function FlightsFromCard_Conditional_36_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("mouseenter", function FlightsFromCard_Conditional_36_For_2_Template_button_mouseenter_0_listener() { const ɵ$index_81_r4 = i0.ɵɵrestoreView(_r3).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.setAirportActiveIndex("departure", ɵ$index_81_r4)); })("mousedown", function FlightsFromCard_Conditional_36_For_2_Template_button_mousedown_0_listener($event) { return $event.preventDefault(); })("click", function FlightsFromCard_Conditional_36_For_2_Template_button_click_0_listener() { const airport_r5 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectAirport("departure", airport_r5)); });
    i0.ɵɵelementStart(1, "span", 37);
    i0.ɵɵelement(2, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 39)(4, "strong", 40);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 41);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const airport_r5 = ctx.$implicit;
    const ɵ$index_81_r4 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bg-primary\\/5", ctx_r0.departureAirportActiveIndex === ɵ$index_81_r4);
    i0.ɵɵproperty("id", ctx_r0.airportOptionId("departure", ɵ$index_81_r4));
    i0.ɵɵattribute("aria-selected", ctx_r0.departureAirportActiveIndex === ɵ$index_81_r4);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(airport_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(airport_r5.description);
} }
function FlightsFromCard_Conditional_36_ForEmpty_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.departureAirportSearchFailed ? "airportSearchUnavailable" : "noAirportsFound"));
} }
function FlightsFromCard_Conditional_36_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, FlightsFromCard_Conditional_36_ForEmpty_3_Conditional_0_Template, 3, 3, "p", 42);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(!ctx_r0.departureAirportLoading ? 0 : -1);
} }
function FlightsFromCard_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵrepeaterCreate(1, FlightsFromCard_Conditional_36_For_2_Template, 8, 6, "button", 33, _forTrack2, false, FlightsFromCard_Conditional_36_ForEmpty_3_Template, 1, 1);
    i0.ɵɵelementStart(4, "p", 34)(5, "span", 35);
    i0.ɵɵtext(6, "Google Maps");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.departureAirports);
} }
function FlightsFromCard_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "departureAirportRequired"));
} }
function FlightsFromCard_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airportNameMaxLength"));
} }
function FlightsFromCard_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airportSelectionRequired"));
} }
function FlightsFromCard_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 16);
} }
function FlightsFromCard_Conditional_49_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("mouseenter", function FlightsFromCard_Conditional_49_For_2_Template_button_mouseenter_0_listener() { const ɵ$index_141_r7 = i0.ɵɵrestoreView(_r6).$index; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.setAirportActiveIndex("arrival", ɵ$index_141_r7)); })("mousedown", function FlightsFromCard_Conditional_49_For_2_Template_button_mousedown_0_listener($event) { return $event.preventDefault(); })("click", function FlightsFromCard_Conditional_49_For_2_Template_button_click_0_listener() { const airport_r8 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.selectAirport("arrival", airport_r8)); });
    i0.ɵɵelementStart(1, "span", 37);
    i0.ɵɵelement(2, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 39)(4, "strong", 40);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 41);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const airport_r8 = ctx.$implicit;
    const ɵ$index_141_r7 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bg-primary\\/5", ctx_r0.arrivalAirportActiveIndex === ɵ$index_141_r7);
    i0.ɵɵproperty("id", ctx_r0.airportOptionId("arrival", ɵ$index_141_r7));
    i0.ɵɵattribute("aria-selected", ctx_r0.arrivalAirportActiveIndex === ɵ$index_141_r7);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(airport_r8.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(airport_r8.description);
} }
function FlightsFromCard_Conditional_49_ForEmpty_3_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.arrivalAirportSearchFailed ? "airportSearchUnavailable" : "noAirportsFound"));
} }
function FlightsFromCard_Conditional_49_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, FlightsFromCard_Conditional_49_ForEmpty_3_Conditional_0_Template, 3, 3, "p", 42);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(!ctx_r0.arrivalAirportLoading ? 0 : -1);
} }
function FlightsFromCard_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵrepeaterCreate(1, FlightsFromCard_Conditional_49_For_2_Template, 8, 6, "button", 33, _forTrack2, false, FlightsFromCard_Conditional_49_ForEmpty_3_Template, 1, 1);
    i0.ɵɵelementStart(4, "p", 34)(5, "span", 35);
    i0.ɵɵtext(6, "Google Maps");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.arrivalAirports);
} }
function FlightsFromCard_Conditional_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arrivalAirportRequired"));
} }
function FlightsFromCard_Conditional_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airportNameMaxLength"));
} }
function FlightsFromCard_Conditional_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "airportSelectionRequired"));
} }
function FlightsFromCard_Conditional_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "departureArrivalDifferent"));
} }
function FlightsFromCard_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "departureTimeRequired"));
} }
function FlightsFromCard_Conditional_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arrivalTimeRequired"));
} }
function FlightsFromCard_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "arrivalTimeAfterDeparture"));
} }
function FlightsFromCard_Conditional_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "priceRequired"));
} }
function FlightsFromCard_Conditional_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "availableSeatsRequired"));
} }
function FlightsFromCard_For_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r9 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", option_r9.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, option_r9.labelKey));
} }
function FlightsFromCard_Conditional_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 43);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function FlightsFromCard_Conditional_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(1, 1, ctx_r0.selectedFlight ? "update" : "add"), " ");
} }
function FlightsFromCard_Conditional_97_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function FlightsFromCard_Conditional_97_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
export class FlightsFromCard {
    apiService;
    cdr;
    destroyRef = inject(DestroyRef);
    translate = inject(TranslateService);
    airportSearchService = inject(AirportSearchService);
    airportSessions = {
        departure: { token: '', interactionId: 0 },
        arrival: { token: '', interactionId: 0 },
    };
    airportFocused = {
        departure: false,
        arrival: false,
    };
    selectedFlight = null;
    flightSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    flightForm = this.createForm();
    airlines = [];
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    departureAirports = [];
    arrivalAirports = [];
    departureAirportLoading = false;
    arrivalAirportLoading = false;
    departureAirportSearchFailed = false;
    arrivalAirportSearchFailed = false;
    departureAirportOpen = false;
    arrivalAirportOpen = false;
    departureAirportActiveIndex = -1;
    arrivalAirportActiveIndex = -1;
    flightClassOptions = FLIGHT_CLASS_OPTIONS;
    constructor(apiService, cdr) {
        this.apiService = apiService;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.loadAirlines();
        this.configureAirportSearch('departure');
        this.configureAirportSearch('arrival');
    }
    ngOnChanges(changes) {
        if (!changes['selectedFlight'])
            return;
        if (this.selectedFlight)
            this.populateForm(this.selectedFlight);
        else
            this.resetForm(false);
    }
    loadAirlines() {
        this.apiService.get('Airlines/GetAll?page=1&pageSize=100').pipe(catchError(() => of(null)), finalize(() => this.cdr.markForCheck())).subscribe((response) => {
            if (response === null)
                return;
            const pageData = response?.data ?? response;
            const rows = pageData?.data ?? pageData?.items ?? pageData?.airlines ?? pageData;
            this.airlines = Array.isArray(rows) ? rows : [];
        });
    }
    saveFlight() {
        if (this.isLoading)
            return;
        if (this.flightForm.invalid) {
            this.flightForm.markAllAsTouched();
            return;
        }
        const form = this.flightForm.getRawValue();
        const payload = {
            flightNumber: form.flightNumber.trim(),
            airlineId: Number(form.airlineId),
            departureAirport: form.departureAirport.trim(),
            arrivalAirport: form.arrivalAirport.trim(),
            departureTime: form.departureTime,
            arrivalTime: form.arrivalTime,
            price: Number(form.price),
            availableSeats: Number(form.availableSeats),
            flightClass: Number(form.flightClass),
        };
        if (this.selectedFlight?.id)
            payload.id = this.selectedFlight.id;
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = this.selectedFlight
            ? this.apiService.put('Flights', payload)
            : this.apiService.post('Flights', payload);
        request$
            .pipe(catchError(() => {
            this.errorMessage = 'flightSaveError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }))
            .subscribe((res) => {
            if (res === null)
                return;
            if (!res.isSuccess) {
                this.errorMessage = res.message;
                return;
            }
            this.successMessage = res.message;
            this.resetForm(false);
            this.flightSaved.emit();
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    selectAirport(field, airport) {
        const control = this.airportControl(field);
        const placeIdControl = this.airportPlaceIdControl(field);
        control.setValue(airport.displayName, { emitEvent: false });
        control.markAsDirty();
        placeIdControl.setValue(airport.placeId, { emitEvent: false });
        placeIdControl.markAsDirty();
        this.flightForm.updateValueAndValidity();
        this.setAirportActiveIndex(field, -1);
        this.closeAirportResults(field);
        this.endAirportSearchSession(field);
    }
    openAirportResults(field) {
        this.airportFocused[field] = true;
        this.getAirportSessionToken(field);
        const shouldOpen = this.airportControl(field).value.trim().length >= 2
            && (this.airportResults(field).length > 0
                || this.airportLoading(field)
                || this.airportSearchFailed(field));
        if (field === 'departure')
            this.departureAirportOpen = shouldOpen;
        else
            this.arrivalAirportOpen = shouldOpen;
    }
    closeAirportResultsLater(field) {
        this.airportFocused[field] = false;
        setTimeout(() => {
            this.closeAirportResults(field);
        }, 160);
    }
    onAirportKeydown(field, event) {
        const results = this.airportResults(field);
        const activeIndex = this.airportActiveIndex(field);
        if (event.key === 'Escape') {
            event.preventDefault();
            this.closeAirportResults(field);
            this.endAirportSearchSession(field);
            return;
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!results.length)
                return;
            this.openAirportResults(field);
            const offset = event.key === 'ArrowDown' ? 1 : -1;
            const nextIndex = activeIndex < 0
                ? (offset > 0 ? 0 : results.length - 1)
                : (activeIndex + offset + results.length) % results.length;
            this.setAirportActiveIndex(field, nextIndex);
            this.cdr.markForCheck();
            return;
        }
        if (event.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
            event.preventDefault();
            this.selectAirport(field, results[activeIndex]);
        }
    }
    setAirportActiveIndex(field, index) {
        if (field === 'departure')
            this.departureAirportActiveIndex = index;
        else
            this.arrivalAirportActiveIndex = index;
    }
    airportOptionId(field, index) {
        return `${field}-airport-option-${index}`;
    }
    airportActiveDescendant(field) {
        const index = this.airportActiveIndex(field);
        return index >= 0 && this.airportResults(field)[index]
            ? this.airportOptionId(field, index)
            : null;
    }
    airportSelectionInvalid(field) {
        const airportControl = this.airportControl(field);
        return airportControl.touched
            && !!airportControl.value.trim()
            && this.airportPlaceIdControl(field).hasError('required');
    }
    populateForm(flight) {
        const departureAirport = flight.departureAirport?.trim() ?? '';
        const arrivalAirport = flight.arrivalAirport?.trim() ?? '';
        this.flightForm.setValue({
            flightNumber: flight.flightNumber ?? '',
            airlineId: flight.airlineId ?? null,
            departureAirport,
            departureAirportPlaceId: this.existingAirportReference(departureAirport),
            arrivalAirport,
            arrivalAirportPlaceId: this.existingAirportReference(arrivalAirport),
            departureTime: this.toLocalInput(flight.departureTime),
            arrivalTime: this.toLocalInput(flight.arrivalTime),
            price: flight.price ?? 0,
            availableSeats: flight.availableSeats ?? 0,
            flightClass: flight.flightClass ?? FlightClassEnum.Economy,
        }, { emitEvent: false });
        this.clearAirportSearchState();
    }
    toLocalInput(value) {
        if (!value)
            return '';
        return value.length > 16 ? value.substring(0, 16) : value;
    }
    resetForm(emitCancel) {
        this.flightForm.reset({
            flightNumber: '',
            airlineId: null,
            departureAirport: '',
            departureAirportPlaceId: '',
            arrivalAirport: '',
            arrivalAirportPlaceId: '',
            departureTime: '',
            arrivalTime: '',
            price: 0,
            availableSeats: 0,
            flightClass: FlightClassEnum.Economy,
        }, { emitEvent: false });
        this.clearAirportSearchState();
        if (emitCancel)
            this.editCancelled.emit();
    }
    configureAirportSearch(field) {
        const control = this.airportControl(field);
        control.valueChanges.pipe(map((value) => value.trim()), distinctUntilChanged(), tap((query) => {
            this.airportPlaceIdControl(field).setValue('', { emitEvent: false });
            this.setAirportResults(field, []);
            this.setAirportActiveIndex(field, -1);
            if (query.length < 2)
                this.endAirportSearchSession(field);
            this.setAirportState(field, {
                loading: query.length >= 2,
                failed: false,
                open: this.airportFocused[field] && query.length >= 2,
            });
            this.flightForm.updateValueAndValidity({ emitEvent: false });
            this.cdr.markForCheck();
        }), debounceTime(300), switchMap((query) => {
            if (query.length < 2) {
                return of({ results: [], failed: false, interactionId: 0 });
            }
            const language = this.translate.currentLang?.() || 'en';
            const session = this.getAirportSession(field);
            return this.airportSearchService.search({
                query,
                language,
                sessionToken: session.token,
            }).pipe(map((results) => ({ results, failed: false, interactionId: session.interactionId })), catchError(() => of({
                results: [],
                failed: true,
                interactionId: session.interactionId,
            })));
        }), takeUntilDestroyed(this.destroyRef)).subscribe(({ results, failed, interactionId }) => {
            if (interactionId && this.airportSessions[field].interactionId !== interactionId)
                return;
            this.setAirportResults(field, results);
            this.setAirportActiveIndex(field, -1);
            this.setAirportState(field, {
                loading: false,
                failed,
                open: this.airportFocused[field] && this.airportControl(field).value.trim().length >= 2,
            });
            this.cdr.markForCheck();
        });
    }
    setAirportResults(field, results) {
        if (field === 'departure')
            this.departureAirports = results;
        else
            this.arrivalAirports = results;
    }
    setAirportState(field, state) {
        if (field === 'departure') {
            this.departureAirportLoading = state.loading;
            this.departureAirportSearchFailed = state.failed;
            this.departureAirportOpen = state.open;
        }
        else {
            this.arrivalAirportLoading = state.loading;
            this.arrivalAirportSearchFailed = state.failed;
            this.arrivalAirportOpen = state.open;
        }
    }
    closeAirportResults(field) {
        if (field === 'departure') {
            this.departureAirportOpen = false;
            this.departureAirportActiveIndex = -1;
        }
        else {
            this.arrivalAirportOpen = false;
            this.arrivalAirportActiveIndex = -1;
        }
        this.cdr.markForCheck();
    }
    clearAirportSearchState() {
        this.departureAirports = [];
        this.arrivalAirports = [];
        this.departureAirportLoading = false;
        this.arrivalAirportLoading = false;
        this.departureAirportSearchFailed = false;
        this.arrivalAirportSearchFailed = false;
        this.departureAirportOpen = false;
        this.arrivalAirportOpen = false;
        this.departureAirportActiveIndex = -1;
        this.arrivalAirportActiveIndex = -1;
        this.airportFocused.departure = false;
        this.airportFocused.arrival = false;
        this.endAirportSearchSession('departure');
        this.endAirportSearchSession('arrival');
        this.cdr.markForCheck();
    }
    airportControl(field) {
        return field === 'departure'
            ? this.flightForm.controls.departureAirport
            : this.flightForm.controls.arrivalAirport;
    }
    airportPlaceIdControl(field) {
        return field === 'departure'
            ? this.flightForm.controls.departureAirportPlaceId
            : this.flightForm.controls.arrivalAirportPlaceId;
    }
    airportResults(field) {
        return field === 'departure' ? this.departureAirports : this.arrivalAirports;
    }
    airportActiveIndex(field) {
        return field === 'departure'
            ? this.departureAirportActiveIndex
            : this.arrivalAirportActiveIndex;
    }
    airportLoading(field) {
        return field === 'departure' ? this.departureAirportLoading : this.arrivalAirportLoading;
    }
    airportSearchFailed(field) {
        return field === 'departure'
            ? this.departureAirportSearchFailed
            : this.arrivalAirportSearchFailed;
    }
    getAirportSession(field) {
        const session = this.airportSessions[field];
        if (!session.token) {
            session.token = this.createSessionToken();
            session.interactionId++;
        }
        return session;
    }
    getAirportSessionToken(field) {
        return this.getAirportSession(field).token;
    }
    endAirportSearchSession(field) {
        const session = this.airportSessions[field];
        session.token = '';
        session.interactionId++;
    }
    createSessionToken() {
        const cryptoApi = globalThis.crypto;
        if (typeof cryptoApi?.randomUUID === 'function')
            return cryptoApi.randomUUID();
        return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    }
    existingAirportReference(value) {
        return value ? `existing:${value.toLocaleLowerCase()}` : '';
    }
    static differentAirportsValidator(control) {
        const departure = String(control.get('departureAirport')?.value ?? '').trim().toLocaleLowerCase();
        const arrival = String(control.get('arrivalAirport')?.value ?? '').trim().toLocaleLowerCase();
        return departure && arrival && departure === arrival ? { sameAirport: true } : null;
    }
    static arrivalAfterDepartureValidator(control) {
        const departure = Date.parse(String(control.get('departureTime')?.value ?? ''));
        const arrival = Date.parse(String(control.get('arrivalTime')?.value ?? ''));
        if (!Number.isFinite(departure) || !Number.isFinite(arrival))
            return null;
        return arrival > departure ? null : { arrivalNotAfterDeparture: true };
    }
    createForm() {
        return new FormGroup({
            flightNumber: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(20)],
            }),
            airlineId: new FormControl(null, { validators: [Validators.required] }),
            departureAirport: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(250)],
            }),
            departureAirportPlaceId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            arrivalAirport: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.maxLength(250)],
            }),
            arrivalAirportPlaceId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            departureTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            arrivalTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
            availableSeats: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
            flightClass: new FormControl(FlightClassEnum.Economy, { nonNullable: true, validators: [Validators.required] }),
        }, {
            validators: [
                FlightsFromCard.differentAirportsValidator,
                FlightsFromCard.arrivalAfterDepartureValidator,
            ],
        });
    }
    static ɵfac = function FlightsFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || FlightsFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FlightsFromCard, selectors: [["app-flights-from-card"]], inputs: { selectedFlight: "selectedFlight" }, outputs: { flightSaved: "flightSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 98, vars: 74, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "text-emerald-600"], [1, "mb-4", "text-xl", "font-semibold"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "flightNumber", "type", "text", "maxlength", "20", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "mt-1", "text-xs", "text-red-600"], ["formControlName", "airlineId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], [1, "relative"], ["for", "departureAirport", 1, "mb-2", "block", "text-sm", "font-medium"], [1, "mdi", "mdi-airplane-takeoff", "pointer-events-none", "absolute", "start-3", "top-1/2", "-translate-y-1/2", "text-xl", "text-primary"], ["id", "departureAirport", "formControlName", "departureAirport", "type", "search", "autocomplete", "off", "maxlength", "250", "role", "combobox", "aria-autocomplete", "list", "aria-controls", "departure-airport-results", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "py-2", "pe-10", "ps-11", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/15", 3, "focus", "blur", "keydown", "placeholder"], [1, "mdi", "mdi-loading", "mdi-spin", "absolute", "end-3", "top-1/2", "-translate-y-1/2", "text-xl", "text-primary"], ["id", "departure-airport-results", "role", "listbox", 1, "absolute", "z-30", "mt-2", "max-h-72", "w-full", "overflow-y-auto", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-2", "shadow-xl"], ["for", "arrivalAirport", 1, "mb-2", "block", "text-sm", "font-medium"], [1, "mdi", "mdi-airplane-landing", "pointer-events-none", "absolute", "start-3", "top-1/2", "-translate-y-1/2", "text-xl", "text-primary"], ["id", "arrivalAirport", "formControlName", "arrivalAirport", "type", "search", "autocomplete", "off", "maxlength", "250", "role", "combobox", "aria-autocomplete", "list", "aria-controls", "arrival-airport-results", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "py-2", "pe-10", "ps-11", "outline-none", "focus:border-primary", "focus:ring-2", "focus:ring-primary/15", 3, "focus", "blur", "keydown", "placeholder"], ["id", "arrival-airport-results", "role", "listbox", 1, "absolute", "z-30", "mt-2", "max-h-72", "w-full", "overflow-y-auto", "rounded-2xl", "border", "border-slate-200", "bg-white", "p-2", "shadow-xl"], [1, "-mt-2", "text-xs", "text-red-600"], ["formControlName", "departureTime", "id", "flight-departure-time", "inputClass", "rounded-2xl border border-slate-300 px-3 py-2 pe-11", 3, "includeTime", "ariaLabel"], ["formControlName", "arrivalTime", "id", "flight-arrival-time", "inputClass", "rounded-2xl border border-slate-300 px-3 py-2 pe-11", 3, "includeTime", "ariaLabel"], [1, "grid", "gap-4", "md:grid-cols-3"], [1, "pointer-events-none", "absolute", "inset-y-0", "start-0", "flex", "w-10", "items-center", "justify-center", "border-e", "border-slate-300", "text-sm", "font-semibold", "text-slate-500"], ["formControlName", "price", "type", "text", "appNumbersOnly", "", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "py-2", "pe-3", "ps-12"], ["formControlName", "availableSeats", "type", "number", "min", "0", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], ["formControlName", "flightClass", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2"], [1, "flex", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-4", "py-2", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "disabled"], ["type", "button", "role", "option", 1, "flex", "w-full", "items-start", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-start", "transition", "hover:bg-primary/5", 3, "id", "bg-primary\\/5"], [1, "border-t", "border-slate-100", "px-3", "pt-2", "text-end", "text-xs", "font-normal", "text-[#5e5e5e]"], ["translate", "no"], ["type", "button", "role", "option", 1, "flex", "w-full", "items-start", "gap-3", "rounded-xl", "px-3", "py-2.5", "text-start", "transition", "hover:bg-primary/5", 3, "mouseenter", "mousedown", "click", "id"], [1, "grid", "h-9", "w-9", "shrink-0", "place-items-center", "rounded-xl", "bg-primary/10", "text-lg", "text-primary"], [1, "mdi", "mdi-airport"], [1, "min-w-0"], [1, "block", "truncate", "text-sm", "text-slate-800"], [1, "mt-0.5", "block", "truncate", "text-xs", "text-slate-500"], [1, "px-3", "py-4", "text-center", "text-sm", "text-slate-500"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"]], template: function FlightsFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, FlightsFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, FlightsFromCard_Conditional_2_Template, 3, 3, "div", 2);
            i0.ɵɵelementStart(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "form", 4);
            i0.ɵɵlistener("ngSubmit", function FlightsFromCard_Template_form_ngSubmit_6_listener() { return ctx.saveFlight(); });
            i0.ɵɵelementStart(7, "div", 5)(8, "div")(9, "label", 6);
            i0.ɵɵtext(10);
            i0.ɵɵpipe(11, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(12, "input", 7);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(13, FlightsFromCard_Conditional_13_Template, 3, 3, "p", 8)(14, FlightsFromCard_Conditional_14_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div")(16, "label", 6);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "select", 9)(20, "option", 10);
            i0.ɵɵtext(21);
            i0.ɵɵpipe(22, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(23, FlightsFromCard_For_24_Template, 2, 2, "option", 11, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(25, FlightsFromCard_Conditional_25_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 5)(27, "div", 12)(28, "label", 13);
            i0.ɵɵtext(29);
            i0.ɵɵpipe(30, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 12);
            i0.ɵɵelement(32, "i", 14);
            i0.ɵɵelementStart(33, "input", 15);
            i0.ɵɵpipe(34, "translate");
            i0.ɵɵlistener("focus", function FlightsFromCard_Template_input_focus_33_listener() { return ctx.openAirportResults("departure"); })("blur", function FlightsFromCard_Template_input_blur_33_listener() { return ctx.closeAirportResultsLater("departure"); })("keydown", function FlightsFromCard_Template_input_keydown_33_listener($event) { return ctx.onAirportKeydown("departure", $event); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(35, FlightsFromCard_Conditional_35_Template, 1, 0, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(36, FlightsFromCard_Conditional_36_Template, 7, 1, "div", 17);
            i0.ɵɵconditionalCreate(37, FlightsFromCard_Conditional_37_Template, 3, 3, "p", 8)(38, FlightsFromCard_Conditional_38_Template, 3, 3, "p", 8)(39, FlightsFromCard_Conditional_39_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 12)(41, "label", 18);
            i0.ɵɵtext(42);
            i0.ɵɵpipe(43, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 12);
            i0.ɵɵelement(45, "i", 19);
            i0.ɵɵelementStart(46, "input", 20);
            i0.ɵɵpipe(47, "translate");
            i0.ɵɵlistener("focus", function FlightsFromCard_Template_input_focus_46_listener() { return ctx.openAirportResults("arrival"); })("blur", function FlightsFromCard_Template_input_blur_46_listener() { return ctx.closeAirportResultsLater("arrival"); })("keydown", function FlightsFromCard_Template_input_keydown_46_listener($event) { return ctx.onAirportKeydown("arrival", $event); });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(48, FlightsFromCard_Conditional_48_Template, 1, 0, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(49, FlightsFromCard_Conditional_49_Template, 7, 1, "div", 21);
            i0.ɵɵconditionalCreate(50, FlightsFromCard_Conditional_50_Template, 3, 3, "p", 8)(51, FlightsFromCard_Conditional_51_Template, 3, 3, "p", 8)(52, FlightsFromCard_Conditional_52_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(53, FlightsFromCard_Conditional_53_Template, 3, 3, "p", 22);
            i0.ɵɵelementStart(54, "div", 5)(55, "div")(56, "label", 6);
            i0.ɵɵtext(57);
            i0.ɵɵpipe(58, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(59, "app-date-picker", 23);
            i0.ɵɵpipe(60, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(61, FlightsFromCard_Conditional_61_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "div")(63, "label", 6);
            i0.ɵɵtext(64);
            i0.ɵɵpipe(65, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(66, "app-date-picker", 24);
            i0.ɵɵpipe(67, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(68, FlightsFromCard_Conditional_68_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(69, FlightsFromCard_Conditional_69_Template, 3, 3, "p", 22);
            i0.ɵɵelementStart(70, "div", 25)(71, "div")(72, "label", 6);
            i0.ɵɵtext(73);
            i0.ɵɵpipe(74, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "div", 12)(76, "span", 26);
            i0.ɵɵtext(77, "$");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(78, "input", 27);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(79, FlightsFromCard_Conditional_79_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div")(81, "label", 6);
            i0.ɵɵtext(82);
            i0.ɵɵpipe(83, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(84, "input", 28);
            i0.ɵɵcontrolCreate();
            i0.ɵɵconditionalCreate(85, FlightsFromCard_Conditional_85_Template, 3, 3, "p", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "div")(87, "label", 6);
            i0.ɵɵtext(88);
            i0.ɵɵpipe(89, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "select", 29);
            i0.ɵɵrepeaterCreate(91, FlightsFromCard_For_92_Template, 3, 4, "option", 11, _forTrack1);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "div", 30)(94, "button", 31);
            i0.ɵɵconditionalCreate(95, FlightsFromCard_Conditional_95_Template, 4, 3)(96, FlightsFromCard_Conditional_96_Template, 2, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(97, FlightsFromCard_Conditional_97_Template, 3, 4, "button", 32);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 44, ctx.selectedFlight ? "editFlight" : "addFlight"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.flightForm);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 46, "flightNumber"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.flightForm.get("flightNumber")?.touched && ctx.flightForm.get("flightNumber")?.hasError("required") ? 13 : ctx.flightForm.controls.flightNumber.touched && ctx.flightForm.controls.flightNumber.hasError("maxlength") ? 14 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 48, "airline"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", null);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 50, "selectAirline"));
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.airlines);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.flightForm.get("airlineId")?.touched && ctx.flightForm.get("airlineId")?.hasError("required") ? 25 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 52, "departureAirport"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(34, 54, "searchAirportPlaceholder"));
            i0.ɵɵattribute("aria-expanded", ctx.departureAirportOpen)("aria-activedescendant", ctx.airportActiveDescendant("departure"))("aria-invalid", ctx.flightForm.controls.departureAirport.touched && (ctx.flightForm.controls.departureAirport.invalid || ctx.flightForm.controls.departureAirportPlaceId.invalid));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.departureAirportLoading ? 35 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.departureAirportOpen && ctx.flightForm.controls.departureAirport.value.trim().length >= 2 ? 36 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.flightForm.controls.departureAirport.touched && ctx.flightForm.controls.departureAirport.hasError("required") ? 37 : ctx.flightForm.controls.departureAirport.touched && ctx.flightForm.controls.departureAirport.hasError("maxlength") ? 38 : ctx.airportSelectionInvalid("departure") ? 39 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(43, 56, "arrivalAirport"));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(47, 58, "searchAirportPlaceholder"));
            i0.ɵɵattribute("aria-expanded", ctx.arrivalAirportOpen)("aria-activedescendant", ctx.airportActiveDescendant("arrival"))("aria-invalid", ctx.flightForm.controls.arrivalAirport.touched && (ctx.flightForm.controls.arrivalAirport.invalid || ctx.flightForm.controls.arrivalAirportPlaceId.invalid));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.arrivalAirportLoading ? 48 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.arrivalAirportOpen && ctx.flightForm.controls.arrivalAirport.value.trim().length >= 2 ? 49 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.flightForm.controls.arrivalAirport.touched && ctx.flightForm.controls.arrivalAirport.hasError("required") ? 50 : ctx.flightForm.controls.arrivalAirport.touched && ctx.flightForm.controls.arrivalAirport.hasError("maxlength") ? 51 : ctx.airportSelectionInvalid("arrival") ? 52 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional((ctx.flightForm.controls.departureAirport.touched || ctx.flightForm.controls.arrivalAirport.touched) && ctx.flightForm.hasError("sameAirport") ? 53 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 60, "departureTime"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("includeTime", true)("ariaLabel", i0.ɵɵpipeBind1(60, 62, "departureTime"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.flightForm.get("departureTime")?.touched && ctx.flightForm.get("departureTime")?.hasError("required") ? 61 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(65, 64, "arrivalTime"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("includeTime", true)("ariaLabel", i0.ɵɵpipeBind1(67, 66, "arrivalTime"));
            i0.ɵɵcontrol();
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.flightForm.get("arrivalTime")?.touched && ctx.flightForm.get("arrivalTime")?.hasError("required") ? 68 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional((ctx.flightForm.controls.departureTime.touched || ctx.flightForm.controls.arrivalTime.touched) && ctx.flightForm.hasError("arrivalNotAfterDeparture") ? 69 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(74, 68, "price"));
            i0.ɵɵadvance(5);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.flightForm.get("price")?.touched && ctx.flightForm.get("price")?.invalid ? 79 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(83, 70, "availableSeats"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.flightForm.get("availableSeats")?.touched && ctx.flightForm.get("availableSeats")?.invalid ? 85 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(89, 72, "flightClass"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.flightClassOptions);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.flightForm.invalid || ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 95 : 96);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedFlight ? 97 : -1);
        } }, dependencies: [ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MaxLengthValidator, i2.MinValidator, i2.FormGroupDirective, i2.FormControlName, NumbersOnlyDirective, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FlightsFromCard, [{
        type: Component,
        args: [{ selector: 'app-flights-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe, NumbersOnlyDirective, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\r\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\r\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600\">{{ successMessage | translate }}</div> }\r\n  <h2 class=\"mb-4 text-xl font-semibold\">{{ (selectedFlight ? 'editFlight' : 'addFlight') | translate }}</h2>\r\n  <form class=\"space-y-4\" [formGroup]=\"flightForm\" (ngSubmit)=\"saveFlight()\">\r\n    <div class=\"grid gap-4 md:grid-cols-2\">\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'flightNumber' | translate }}</label><input formControlName=\"flightNumber\" type=\"text\" maxlength=\"20\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (flightForm.get('flightNumber')?.touched && flightForm.get('flightNumber')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'flightNumberRequired' | translate }}</p> } @else if (flightForm.controls.flightNumber.touched && flightForm.controls.flightNumber.hasError('maxlength')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'flightNumberMaxLength' | translate }}</p> }</div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'airline' | translate }}</label><select formControlName=\"airlineId\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\"><option [ngValue]=\"null\" disabled>{{ 'selectAirline' | translate }}</option>@for (airline of airlines; track airline.id) { <option [ngValue]=\"airline.id\">{{ airline.name }}</option> }</select>@if (flightForm.get('airlineId')?.touched && flightForm.get('airlineId')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'airlineRequired' | translate }}</p> }</div>\r\n    </div>\n    <div class=\"grid gap-4 md:grid-cols-2\">\n      <div class=\"relative\">\n        <label for=\"departureAirport\" class=\"mb-2 block text-sm font-medium\">{{ 'departureAirport' | translate }}</label>\n        <div class=\"relative\">\n          <i class=\"mdi mdi-airplane-takeoff pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-xl text-primary\"></i>\n          <input id=\"departureAirport\" formControlName=\"departureAirport\" type=\"search\" autocomplete=\"off\" maxlength=\"250\" role=\"combobox\"\n            aria-autocomplete=\"list\" [attr.aria-expanded]=\"departureAirportOpen\" aria-controls=\"departure-airport-results\"\n            [attr.aria-activedescendant]=\"airportActiveDescendant('departure')\" [attr.aria-invalid]=\"flightForm.controls.departureAirport.touched && (flightForm.controls.departureAirport.invalid || flightForm.controls.departureAirportPlaceId.invalid)\"\n            [placeholder]=\"'searchAirportPlaceholder' | translate\"\n            class=\"w-full rounded-2xl border border-slate-300 py-2 pe-10 ps-11 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15\"\n            (focus)=\"openAirportResults('departure')\" (blur)=\"closeAirportResultsLater('departure')\" (keydown)=\"onAirportKeydown('departure', $event)\" />\n          @if (departureAirportLoading) { <i class=\"mdi mdi-loading mdi-spin absolute end-3 top-1/2 -translate-y-1/2 text-xl text-primary\"></i> }\n        </div>\n        @if (departureAirportOpen && flightForm.controls.departureAirport.value.trim().length >= 2) {\n          <div id=\"departure-airport-results\" role=\"listbox\" class=\"absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl\">\n            @for (airport of departureAirports; track airport.placeId; let index = $index) {\n              <button [id]=\"airportOptionId('departure', index)\" type=\"button\" role=\"option\" [attr.aria-selected]=\"departureAirportActiveIndex === index\" class=\"flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-start transition hover:bg-primary/5\" [class.bg-primary\\/5]=\"departureAirportActiveIndex === index\" (mouseenter)=\"setAirportActiveIndex('departure', index)\" (mousedown)=\"$event.preventDefault()\" (click)=\"selectAirport('departure', airport)\">\n                <span class=\"grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-lg text-primary\"><i class=\"mdi mdi-airport\"></i></span>\n                <span class=\"min-w-0\"><strong class=\"block truncate text-sm text-slate-800\">{{ airport.name }}</strong><span class=\"mt-0.5 block truncate text-xs text-slate-500\">{{ airport.description }}</span></span>\n              </button>\n            } @empty {\n              @if (!departureAirportLoading) { <p class=\"px-3 py-4 text-center text-sm text-slate-500\">{{ (departureAirportSearchFailed ? 'airportSearchUnavailable' : 'noAirportsFound') | translate }}</p> }\n            }\n            <p class=\"border-t border-slate-100 px-3 pt-2 text-end text-xs font-normal text-[#5e5e5e]\"><span translate=\"no\">Google Maps</span></p>\n          </div>\n        }\n        @if (flightForm.controls.departureAirport.touched && flightForm.controls.departureAirport.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'departureAirportRequired' | translate }}</p> }\n        @else if (flightForm.controls.departureAirport.touched && flightForm.controls.departureAirport.hasError('maxlength')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'airportNameMaxLength' | translate }}</p> }\n        @else if (airportSelectionInvalid('departure')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'airportSelectionRequired' | translate }}</p> }\n      </div>\n      <div class=\"relative\">\n        <label for=\"arrivalAirport\" class=\"mb-2 block text-sm font-medium\">{{ 'arrivalAirport' | translate }}</label>\n        <div class=\"relative\">\n          <i class=\"mdi mdi-airplane-landing pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-xl text-primary\"></i>\n          <input id=\"arrivalAirport\" formControlName=\"arrivalAirport\" type=\"search\" autocomplete=\"off\" maxlength=\"250\" role=\"combobox\"\n            aria-autocomplete=\"list\" [attr.aria-expanded]=\"arrivalAirportOpen\" aria-controls=\"arrival-airport-results\"\n            [attr.aria-activedescendant]=\"airportActiveDescendant('arrival')\" [attr.aria-invalid]=\"flightForm.controls.arrivalAirport.touched && (flightForm.controls.arrivalAirport.invalid || flightForm.controls.arrivalAirportPlaceId.invalid)\"\n            [placeholder]=\"'searchAirportPlaceholder' | translate\"\n            class=\"w-full rounded-2xl border border-slate-300 py-2 pe-10 ps-11 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15\"\n            (focus)=\"openAirportResults('arrival')\" (blur)=\"closeAirportResultsLater('arrival')\" (keydown)=\"onAirportKeydown('arrival', $event)\" />\n          @if (arrivalAirportLoading) { <i class=\"mdi mdi-loading mdi-spin absolute end-3 top-1/2 -translate-y-1/2 text-xl text-primary\"></i> }\n        </div>\n        @if (arrivalAirportOpen && flightForm.controls.arrivalAirport.value.trim().length >= 2) {\n          <div id=\"arrival-airport-results\" role=\"listbox\" class=\"absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl\">\n            @for (airport of arrivalAirports; track airport.placeId; let index = $index) {\n              <button [id]=\"airportOptionId('arrival', index)\" type=\"button\" role=\"option\" [attr.aria-selected]=\"arrivalAirportActiveIndex === index\" class=\"flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-start transition hover:bg-primary/5\" [class.bg-primary\\/5]=\"arrivalAirportActiveIndex === index\" (mouseenter)=\"setAirportActiveIndex('arrival', index)\" (mousedown)=\"$event.preventDefault()\" (click)=\"selectAirport('arrival', airport)\">\n                <span class=\"grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-lg text-primary\"><i class=\"mdi mdi-airport\"></i></span>\n                <span class=\"min-w-0\"><strong class=\"block truncate text-sm text-slate-800\">{{ airport.name }}</strong><span class=\"mt-0.5 block truncate text-xs text-slate-500\">{{ airport.description }}</span></span>\n              </button>\n            } @empty {\n              @if (!arrivalAirportLoading) { <p class=\"px-3 py-4 text-center text-sm text-slate-500\">{{ (arrivalAirportSearchFailed ? 'airportSearchUnavailable' : 'noAirportsFound') | translate }}</p> }\n            }\n            <p class=\"border-t border-slate-100 px-3 pt-2 text-end text-xs font-normal text-[#5e5e5e]\"><span translate=\"no\">Google Maps</span></p>\n          </div>\n        }\n        @if (flightForm.controls.arrivalAirport.touched && flightForm.controls.arrivalAirport.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'arrivalAirportRequired' | translate }}</p> }\n        @else if (flightForm.controls.arrivalAirport.touched && flightForm.controls.arrivalAirport.hasError('maxlength')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'airportNameMaxLength' | translate }}</p> }\n        @else if (airportSelectionInvalid('arrival')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'airportSelectionRequired' | translate }}</p> }\n      </div>\n    </div>\n    @if ((flightForm.controls.departureAirport.touched || flightForm.controls.arrivalAirport.touched) && flightForm.hasError('sameAirport')) { <p class=\"-mt-2 text-xs text-red-600\">{{ 'departureArrivalDifferent' | translate }}</p> }\n    <div class=\"grid gap-4 md:grid-cols-2\">\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'departureTime' | translate }}</label><app-date-picker formControlName=\"departureTime\" id=\"flight-departure-time\" [includeTime]=\"true\" [ariaLabel]=\"'departureTime' | translate\" inputClass=\"rounded-2xl border border-slate-300 px-3 py-2 pe-11\" />@if (flightForm.get('departureTime')?.touched && flightForm.get('departureTime')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'departureTimeRequired' | translate }}</p> }</div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'arrivalTime' | translate }}</label><app-date-picker formControlName=\"arrivalTime\" id=\"flight-arrival-time\" [includeTime]=\"true\" [ariaLabel]=\"'arrivalTime' | translate\" inputClass=\"rounded-2xl border border-slate-300 px-3 py-2 pe-11\" />@if (flightForm.get('arrivalTime')?.touched && flightForm.get('arrivalTime')?.hasError('required')) { <p class=\"mt-1 text-xs text-red-600\">{{ 'arrivalTimeRequired' | translate }}</p> }</div>\n    </div>\n    @if ((flightForm.controls.departureTime.touched || flightForm.controls.arrivalTime.touched) && flightForm.hasError('arrivalNotAfterDeparture')) { <p class=\"-mt-2 text-xs text-red-600\">{{ 'arrivalTimeAfterDeparture' | translate }}</p> }\n    <div class=\"grid gap-4 md:grid-cols-3\">\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'price' | translate }}</label><div class=\"relative\"><span class=\"pointer-events-none absolute inset-y-0 start-0 flex w-10 items-center justify-center border-e border-slate-300 text-sm font-semibold text-slate-500\">$</span><input formControlName=\"price\" type=\"text\" appNumbersOnly class=\"w-full rounded-2xl border border-slate-300 py-2 pe-3 ps-12\" /></div>@if (flightForm.get('price')?.touched && flightForm.get('price')?.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'priceRequired' | translate }}</p> }</div>\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'availableSeats' | translate }}</label><input formControlName=\"availableSeats\" type=\"number\" min=\"0\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\" />@if (flightForm.get('availableSeats')?.touched && flightForm.get('availableSeats')?.invalid) { <p class=\"mt-1 text-xs text-red-600\">{{ 'availableSeatsRequired' | translate }}</p> }</div>\r\n      <div><label class=\"mb-2 block text-sm font-medium\">{{ 'flightClass' | translate }}</label><select formControlName=\"flightClass\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2\">@for (option of flightClassOptions; track option.value) { <option [ngValue]=\"option.value\">{{ option.labelKey | translate }}</option> }</select></div>\r\n    </div>\r\n    <div class=\"flex gap-3\"><button type=\"submit\" [disabled]=\"flightForm.invalid || isLoading\" class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\" aria-hidden=\"true\"></i><span>{{ 'saving' | translate }}</span> } @else { {{ (selectedFlight ? 'update' : 'add') | translate }} }</button>@if (selectedFlight) { <button type=\"button\" class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading\" (click)=\"cancelEdit()\">{{ 'cancel' | translate }}</button> }</div>\n  </form>\r\n</div>\r\n" }]
    }], () => [{ type: i1.ApiService }, { type: i0.ChangeDetectorRef }], { selectedFlight: [{
            type: Input
        }], flightSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FlightsFromCard, { className: "FlightsFromCard", filePath: "app/features/configurations/flights/flights-from-card/flights-from-card.ts", lineNumber: 53 }); })();
