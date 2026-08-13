import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { CustomerTypeEnum } from '../customer-type.enum';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/apiservice.service";
import * as i2 from "../../../user/_services/auth.service";
import * as i3 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.id;
function CustomersFromCard_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage));
} }
function CustomersFromCard_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "i", 36);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.successMessage));
} }
function CustomersFromCard_For_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const gender_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", gender_r2.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, gender_r2.label));
} }
function CustomersFromCard_For_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r3.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r3.label));
} }
function CustomersFromCard_Conditional_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label", 14);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 37);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "companyName"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
} }
function CustomersFromCard_Conditional_70_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const agent_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", agent_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", agent_r4.firstName, " ", agent_r4.lastName);
} }
function CustomersFromCard_Conditional_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "label", 14);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 38)(5, "option", 22);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(8, CustomersFromCard_Conditional_70_For_9_Template, 2, 3, "option", 22, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(10, "p", 27);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, "assignedAgent"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 6, "selectAgent"));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.agents);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 8, "customerAgentNotificationHint"));
} }
function CustomersFromCard_Conditional_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "i", 39);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "customerAutoAssignedToAgent"));
} }
function CustomersFromCard_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 25);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "requiredTravelerFieldsHint"));
} }
function CustomersFromCard_Conditional_83_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function CustomersFromCard_Conditional_83_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addTraveler("spouse")); });
    i0.ɵɵelement(1, "i", 41);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.travelers.length >= 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "addSpouse"));
} }
function CustomersFromCard_Conditional_84_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 42);
    i0.ɵɵlistener("click", function CustomersFromCard_Conditional_84_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addTraveler("adult")); });
    i0.ɵɵelement(1, "i", 41);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 43);
    i0.ɵɵlistener("click", function CustomersFromCard_Conditional_84_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addTraveler("child")); });
    i0.ɵɵelement(5, "i", 41);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 44);
    i0.ɵɵlistener("click", function CustomersFromCard_Conditional_84_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addTraveler("infant")); });
    i0.ɵɵelement(9, "i", 41);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 45);
    i0.ɵɵlistener("click", function CustomersFromCard_Conditional_84_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.addTraveler("babysitter")); });
    i0.ɵɵelement(13, "i", 41);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 4, "addAdult"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 6, "addChild"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 8, "addInfant"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 10, "addBabysitter"));
} }
function CustomersFromCard_For_87_For_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r9 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", type_r9.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, type_r9.label));
} }
function CustomersFromCard_For_87_For_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const gender_r10 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", gender_r10.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, gender_r10.label));
} }
function CustomersFromCard_For_87_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 31)(1, "div", 46)(2, "div", 47)(3, "span", 48);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h4", 11);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 49);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵlistener("click", function CustomersFromCard_For_87_Template_button_click_8_listener() { const ɵ$index_215_r8 = i0.ɵɵrestoreView(_r7).$index; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.removeTraveler(ɵ$index_215_r8)); });
    i0.ɵɵelement(10, "i", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 51)(12, "div")(13, "label", 52);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 53);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div")(18, "label", 52);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "select", 54);
    i0.ɵɵrepeaterCreate(22, CustomersFromCard_For_87_For_23_Template, 3, 4, "option", 22, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div")(25, "label", 52);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "select", 55);
    i0.ɵɵrepeaterCreate(29, CustomersFromCard_For_87_For_30_Template, 3, 4, "option", 22, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div")(32, "label", 52);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "input", 56);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div")(37, "label", 52);
    i0.ɵɵtext(38);
    i0.ɵɵpipe(39, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(40, "input", 57);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div")(42, "label", 52);
    i0.ɵɵtext(43);
    i0.ɵɵpipe(44, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(45, "input", 58);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "div")(47, "label", 52);
    i0.ɵɵtext(48);
    i0.ɵɵpipe(49, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(50, "app-date-picker", 20);
    i0.ɵɵpipe(51, "translate");
    i0.ɵɵpipe(52, "translate");
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const traveler_r11 = ctx.$implicit;
    const ɵ$index_215_r8 = ctx.$index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroupName", ɵ$index_215_r8);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ɵ$index_215_r8 + 2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(traveler_r11.controls.relationship.value || i0.ɵɵpipeBind1(7, 14, "traveler"));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(9, 16, "removeTraveler"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 18, "relationship"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 20, "travelerType"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.travelerTypes);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(27, 22, "gender"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.genders);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 24, "firstName"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(39, 26, "lastName"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(44, 28, "passportNumber"));
    i0.ɵɵadvance(2);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(49, 30, "dateOfBirth"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(51, 32, "dateOfBirth"))("ariaLabel", i0.ɵɵpipeBind1(52, 34, "dateOfBirth"))("inputClass", "w-full rounded-xl border border-slate-300 bg-white py-2 ps-3 text-sm");
    i0.ɵɵcontrol();
} }
function CustomersFromCard_ForEmpty_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "i", 59);
    i0.ɵɵelementStart(2, "p", 60);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "noCompanionTravelers"));
} }
function CustomersFromCard_Conditional_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 61);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "saving"));
} }
function CustomersFromCard_Conditional_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 62);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(2, 1, ctx_r0.selectedCustomer ? "update" : "add"), " ");
} }
function CustomersFromCard_Conditional_93_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 63);
    i0.ɵɵlistener("click", function CustomersFromCard_Conditional_93_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelEdit()); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.isLoading);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, "cancel"));
} }
var GenderEnum;
(function (GenderEnum) {
    GenderEnum[GenderEnum["Male"] = 0] = "Male";
    GenderEnum[GenderEnum["Female"] = 1] = "Female";
})(GenderEnum || (GenderEnum = {}));
var TravelerTypeEnum;
(function (TravelerTypeEnum) {
    TravelerTypeEnum[TravelerTypeEnum["Adult"] = 1] = "Adult";
    TravelerTypeEnum[TravelerTypeEnum["Child"] = 2] = "Child";
    TravelerTypeEnum[TravelerTypeEnum["Infant"] = 3] = "Infant";
})(TravelerTypeEnum || (TravelerTypeEnum = {}));
export class CustomersFromCard {
    apiService;
    authService;
    cdr;
    destroyRef = inject(DestroyRef);
    customerTypeEnum = CustomerTypeEnum;
    travelerTypeEnum = TravelerTypeEnum;
    genderEnum = GenderEnum;
    customerTypes = [
        { value: CustomerTypeEnum.Individual, label: 'individual' },
        { value: CustomerTypeEnum.Couple, label: 'couple' },
        { value: CustomerTypeEnum.Family, label: 'family' },
        { value: CustomerTypeEnum.Company, label: 'company' },
    ];
    travelerTypes = [
        { value: TravelerTypeEnum.Adult, label: 'adult' },
        { value: TravelerTypeEnum.Child, label: 'child' },
        { value: TravelerTypeEnum.Infant, label: 'infant' },
    ];
    genders = [
        { value: GenderEnum.Male, label: 'male' },
        { value: GenderEnum.Female, label: 'female' },
    ];
    selectedCustomer = null;
    customerSaved = new EventEmitter();
    editCancelled = new EventEmitter();
    customerForm = this.createForm();
    agents = [];
    isLoading = false;
    errorMessage = '';
    successMessage = '';
    constructor(apiService, authService, cdr) {
        this.apiService = apiService;
        this.authService = authService;
        this.cdr = cdr;
    }
    get isAdmin() {
        return this.authService.getCurrentUserRole() === 'Admin';
    }
    get travelers() {
        return this.customerForm.controls.travelers;
    }
    ngOnInit() {
        this.loadLookups();
        this.applyAgentValidator();
        this.customerForm.controls.customerType.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((type) => this.applyCustomerType(type));
    }
    ngOnChanges(changes) {
        if (!changes['selectedCustomer'])
            return;
        if (this.selectedCustomer)
            this.populateForm(this.selectedCustomer);
        else
            this.resetForm(false);
    }
    addTraveler(kind = 'adult') {
        if (this.customerForm.controls.customerType.value === CustomerTypeEnum.Couple && this.travelers.length >= 1)
            return;
        const presets = {
            spouse: { relationship: 'Spouse', travelerType: TravelerTypeEnum.Adult },
            child: { relationship: 'Child', travelerType: TravelerTypeEnum.Child },
            infant: { relationship: 'Infant', travelerType: TravelerTypeEnum.Infant },
            babysitter: { relationship: 'Babysitter', travelerType: TravelerTypeEnum.Adult },
            adult: { relationship: 'Companion', travelerType: TravelerTypeEnum.Adult },
        };
        this.travelers.push(this.createTravelerForm(presets[kind]));
        this.cdr.markForCheck();
    }
    removeTraveler(index) {
        this.travelers.removeAt(index);
        this.cdr.markForCheck();
    }
    saveCustomer() {
        if (this.isLoading)
            return;
        if (this.customerForm.invalid) {
            this.customerForm.markAllAsTouched();
            this.errorMessage = 'customerFormInvalid';
            return;
        }
        const form = this.customerForm.getRawValue();
        const payload = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            mobile: form.mobile.trim(),
            passportNumber: form.passportNumber.trim(),
            dateOfBirth: form.dateOfBirth,
            gender: Number(form.gender),
            customerType: Number(form.customerType),
            companyName: form.customerType === CustomerTypeEnum.Company ? form.companyName.trim() : null,
            agentId: this.isAdmin ? Number(form.agentId) : null,
            travelers: form.travelers.map((traveler) => ({
                firstName: traveler.firstName.trim(),
                lastName: traveler.lastName.trim(),
                passportNumber: traveler.passportNumber.trim(),
                dateOfBirth: traveler.dateOfBirth,
                gender: Number(traveler.gender),
                travelerType: Number(traveler.travelerType),
                relationship: traveler.relationship.trim(),
            })),
        };
        if (this.selectedCustomer?.id)
            payload.id = this.selectedCustomer.id;
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        const request$ = this.selectedCustomer
            ? this.apiService.put('Customers', payload)
            : this.apiService.post('Customers', payload);
        request$.pipe(catchError((error) => {
            this.errorMessage = error?.error?.message || 'customerSaveError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false) {
                this.errorMessage = response?.message || 'customerSaveError';
                return;
            }
            this.successMessage = response?.message || 'customerSavedWithTravelers';
            this.resetForm(false, true);
            this.customerSaved.emit();
        });
    }
    cancelEdit() {
        this.resetForm(true);
    }
    loadLookups() {
        if (this.isAdmin) {
            this.apiService.get('Account/GetAgents').pipe(catchError(() => of(null))).subscribe((response) => {
                const rows = response?.data ?? response;
                this.agents = (Array.isArray(rows) ? rows : []).filter((agent) => agent?.isActivated !== false);
                this.cdr.markForCheck();
            });
        }
    }
    populateForm(customer) {
        const allTravelers = Array.isArray(customer.travelers) ? customer.travelers : [];
        const primary = allTravelers.find((traveler) => traveler.isPrimary) ?? allTravelers[0];
        this.customerForm.patchValue({
            firstName: customer.firstName ?? primary?.firstName ?? '',
            lastName: customer.lastName ?? primary?.lastName ?? '',
            email: customer.email ?? '',
            mobile: customer.mobile ?? '',
            passportNumber: primary?.passportNumber ?? '',
            dateOfBirth: this.toDateInput(primary?.dateOfBirth),
            gender: primary?.gender ?? GenderEnum.Male,
            customerType: customer.customerType ?? CustomerTypeEnum.Individual,
            companyName: customer.companyName ?? '',
            agentId: customer.agentId ?? null,
        }, { emitEvent: false });
        this.travelers.clear();
        allTravelers.filter((traveler) => traveler !== primary).forEach((traveler) => this.travelers.push(this.createTravelerForm({
            firstName: traveler.firstName,
            lastName: traveler.lastName,
            passportNumber: traveler.passportNumber,
            dateOfBirth: this.toDateInput(traveler.dateOfBirth),
            gender: traveler.gender,
            travelerType: traveler.travelerType,
            relationship: traveler.relationship ?? '',
        })));
        this.applyAgentValidator();
        this.applyCustomerType(customer.customerType ?? CustomerTypeEnum.Individual);
    }
    applyCustomerType(type) {
        const companyName = this.customerForm.controls.companyName;
        companyName.setValidators(type === CustomerTypeEnum.Company ? [Validators.required] : []);
        companyName.updateValueAndValidity({ emitEvent: false });
        this.travelers.setValidators(type === CustomerTypeEnum.Couple || type === CustomerTypeEnum.Family
            ? [Validators.minLength(1)]
            : []);
        this.travelers.updateValueAndValidity({ emitEvent: false });
        if (this.selectedCustomer)
            return;
        this.travelers.clear();
        if (type === CustomerTypeEnum.Couple)
            this.addTraveler('spouse');
        if (type === CustomerTypeEnum.Family) {
            this.addTraveler('spouse');
            this.addTraveler('child');
        }
        this.cdr.markForCheck();
    }
    applyAgentValidator() {
        const control = this.customerForm.controls.agentId;
        control.setValidators(this.isAdmin ? [Validators.required] : []);
        control.updateValueAndValidity({ emitEvent: false });
    }
    resetForm(emitCancel, keepMessage = false) {
        this.customerForm.reset({
            firstName: '', lastName: '', email: '', mobile: '', passportNumber: '', dateOfBirth: '',
            gender: GenderEnum.Male, customerType: CustomerTypeEnum.Individual,
            companyName: '', agentId: null,
        }, { emitEvent: false });
        this.travelers.clear();
        this.errorMessage = '';
        if (!keepMessage)
            this.successMessage = '';
        this.applyAgentValidator();
        this.applyCustomerType(CustomerTypeEnum.Individual);
        if (emitCancel)
            this.editCancelled.emit();
    }
    createForm() {
        return new FormGroup({
            firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
            lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
            email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
            mobile: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\+?[0-9 ()-]{7,20}$/)] }),
            passportNumber: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(20)] }),
            dateOfBirth: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            gender: new FormControl(GenderEnum.Male, { nonNullable: true, validators: [Validators.required] }),
            customerType: new FormControl(CustomerTypeEnum.Individual, { nonNullable: true, validators: [Validators.required] }),
            companyName: new FormControl('', { nonNullable: true }),
            agentId: new FormControl(null),
            travelers: new FormArray([]),
        });
    }
    createTravelerForm(value = {}) {
        return new FormGroup({
            firstName: new FormControl(value.firstName ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
            lastName: new FormControl(value.lastName ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
            passportNumber: new FormControl(value.passportNumber ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(20)] }),
            dateOfBirth: new FormControl(value.dateOfBirth ?? '', { nonNullable: true, validators: [Validators.required] }),
            gender: new FormControl(value.gender ?? GenderEnum.Male, { nonNullable: true, validators: [Validators.required] }),
            travelerType: new FormControl(value.travelerType ?? TravelerTypeEnum.Adult, { nonNullable: true, validators: [Validators.required] }),
            relationship: new FormControl(value.relationship ?? 'Companion', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
        });
    }
    toDateInput(value) {
        return String(value ?? '').match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? '';
    }
    static ɵfac = function CustomersFromCard_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || CustomersFromCard)(i0.ɵɵdirectiveInject(i1.ApiService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomersFromCard, selectors: [["app-customers-from-card"]], inputs: { selectedCustomer: "selectedCustomer" }, outputs: { customerSaved: "customerSaved", editCancelled: "editCancelled" }, features: [i0.ɵɵNgOnChangesFeature], decls: 94, vars: 61, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-slate-50", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "rounded-2xl", "border", "border-emerald-200", "bg-emerald-50", "px-4", "py-3", "text-sm", "font-medium", "text-emerald-700"], [1, "mb-5"], [1, "text-xs", "font-semibold", "uppercase", "tracking-[0.25em]", "text-primary"], [1, "mt-1", "text-xl", "font-semibold"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "rounded-2xl", "border", "border-slate-200", "bg-white", "p-4"], [1, "mb-4", "flex", "items-center", "gap-3"], [1, "grid", "h-10", "w-10", "place-items-center", "rounded-full", "bg-primary/10", "text-xl", "text-primary"], [1, "mdi", "mdi-account-star-outline"], [1, "font-semibold"], [1, "text-xs", "text-slate-500"], [1, "grid", "gap-4", "md:grid-cols-2"], [1, "mb-2", "block", "text-sm", "font-medium"], ["formControlName", "firstName", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "outline-none", "focus:border-primary"], ["formControlName", "lastName", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "outline-none", "focus:border-primary"], ["formControlName", "email", "type", "email", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "outline-none", "focus:border-primary"], ["formControlName", "mobile", "type", "tel", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "outline-none", "focus:border-primary"], ["formControlName", "passportNumber", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "uppercase", "outline-none", "focus:border-primary"], ["formControlName", "dateOfBirth", 1, "block", 3, "placeholder", "ariaLabel", "inputClass"], ["formControlName", "gender", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "outline-none", "focus:border-primary"], [3, "ngValue"], ["formControlName", "customerType", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "outline-none", "focus:border-primary"], [1, "flex", "items-center", "gap-3", "rounded-2xl", "border", "border-primary/20", "bg-primary/5", "px-4", "py-3", "text-sm", "text-slate-600"], [1, "mt-3", "text-xs", "font-medium", "text-red-600"], [1, "flex", "flex-col", "gap-4", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "mt-1", "text-xs", "text-slate-500"], [1, "flex", "flex-wrap", "gap-2"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "rounded-full", "border", "border-primary/30", "px-3", "py-1.5", "text-xs", "font-semibold", "text-primary", "hover:bg-primary", "hover:text-white", "disabled:opacity-40", 3, "disabled"], ["formArrayName", "travelers", 1, "mt-4", "space-y-4"], [1, "rounded-2xl", "border", "border-slate-200", "bg-slate-50", "p-4", 3, "formGroupName"], [1, "rounded-2xl", "border", "border-dashed", "border-slate-300", "px-4", "py-7", "text-center", "text-sm", "text-slate-500"], [1, "flex", "flex-wrap", "gap-3"], ["type", "submit", 1, "inline-flex", "items-center", "justify-center", "gap-2", "rounded-full", "bg-primary", "px-5", "py-2.5", "text-sm", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "disabled"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "disabled"], [1, "mdi", "mdi-check-circle-outline", "me-2"], ["formControlName", "companyName", "type", "text", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "px-3", "py-2", "outline-none", "focus:border-primary"], ["formControlName", "agentId", 1, "w-full", "rounded-2xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "outline-none", "focus:border-primary"], [1, "mdi", "mdi-account-check-outline", "text-xl", "text-primary"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "rounded-full", "border", "border-primary/30", "px-3", "py-1.5", "text-xs", "font-semibold", "text-primary", "hover:bg-primary", "hover:text-white", "disabled:opacity-40", 3, "click", "disabled"], [1, "mdi", "mdi-plus"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "rounded-full", "border", "border-primary/30", "px-3", "py-1.5", "text-xs", "font-semibold", "text-primary", "hover:bg-primary", "hover:text-white", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "rounded-full", "border", "border-amber-300", "px-3", "py-1.5", "text-xs", "font-semibold", "text-amber-700", "hover:bg-amber-500", "hover:text-white", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "rounded-full", "border", "border-sky-300", "px-3", "py-1.5", "text-xs", "font-semibold", "text-sky-700", "hover:bg-sky-500", "hover:text-white", 3, "click"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "rounded-full", "border", "border-violet-300", "px-3", "py-1.5", "text-xs", "font-semibold", "text-violet-700", "hover:bg-violet-500", "hover:text-white", 3, "click"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-2"], [1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "bg-white", "font-semibold", "text-primary", "shadow-sm"], ["type", "button", 1, "grid", "h-8", "w-8", "place-items-center", "rounded-full", "border", "border-rose-200", "text-rose-600", "hover:bg-rose-600", "hover:text-white", 3, "click"], [1, "mdi", "mdi-delete-outline"], [1, "grid", "gap-3", "md:grid-cols-2", "xl:grid-cols-3"], [1, "mb-1", "block", "text-xs", "font-medium"], ["formControlName", "relationship", 1, "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "text-sm"], ["formControlName", "travelerType", 1, "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "text-sm"], ["formControlName", "gender", 1, "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "text-sm"], ["formControlName", "firstName", 1, "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "text-sm"], ["formControlName", "lastName", 1, "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "text-sm"], ["formControlName", "passportNumber", 1, "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "px-3", "py-2", "text-sm", "uppercase"], [1, "mdi", "mdi-account-multiple-plus-outline", "text-3xl", "text-slate-300"], [1, "mt-2"], [1, "mdi", "mdi-loading", "mdi-spin"], [1, "mdi", "mdi-content-save-outline"], ["type", "button", 1, "rounded-full", "border", "border-slate-300", "px-4", "py-2", "text-sm", "font-medium", 3, "click", "disabled"]], template: function CustomersFromCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, CustomersFromCard_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵconditionalCreate(2, CustomersFromCard_Conditional_2_Template, 4, 3, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "p", 4);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h2", 5);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "form", 6);
            i0.ɵɵlistener("ngSubmit", function CustomersFromCard_Template_form_ngSubmit_10_listener() { return ctx.saveCustomer(); });
            i0.ɵɵelementStart(11, "section", 7)(12, "div", 8)(13, "span", 9);
            i0.ɵɵelement(14, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div")(16, "h3", 11);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "p", 12);
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "div", 13)(23, "div")(24, "label", 14);
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 15);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div")(29, "label", 14);
            i0.ɵɵtext(30);
            i0.ɵɵpipe(31, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 16);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div")(34, "label", 14);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(37, "input", 17);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div")(39, "label", 14);
            i0.ɵɵtext(40);
            i0.ɵɵpipe(41, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(42, "input", 18);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div")(44, "label", 14);
            i0.ɵɵtext(45);
            i0.ɵɵpipe(46, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(47, "input", 19);
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div")(49, "label", 14);
            i0.ɵɵtext(50);
            i0.ɵɵpipe(51, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(52, "app-date-picker", 20);
            i0.ɵɵpipe(53, "translate");
            i0.ɵɵpipe(54, "translate");
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div")(56, "label", 14);
            i0.ɵɵtext(57);
            i0.ɵɵpipe(58, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "select", 21);
            i0.ɵɵrepeaterCreate(60, CustomersFromCard_For_61_Template, 3, 4, "option", 22, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "div")(63, "label", 14);
            i0.ɵɵtext(64);
            i0.ɵɵpipe(65, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "select", 23);
            i0.ɵɵrepeaterCreate(67, CustomersFromCard_For_68_Template, 3, 4, "option", 22, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(69, CustomersFromCard_Conditional_69_Template, 5, 3, "div");
            i0.ɵɵconditionalCreate(70, CustomersFromCard_Conditional_70_Template, 13, 10, "div")(71, CustomersFromCard_Conditional_71_Template, 4, 3, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(72, CustomersFromCard_Conditional_72_Template, 3, 3, "p", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "section", 7)(74, "div", 26)(75, "div")(76, "h3", 11);
            i0.ɵɵtext(77);
            i0.ɵɵpipe(78, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "p", 27);
            i0.ɵɵtext(80);
            i0.ɵɵpipe(81, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(82, "div", 28);
            i0.ɵɵconditionalCreate(83, CustomersFromCard_Conditional_83_Template, 4, 4, "button", 29);
            i0.ɵɵconditionalCreate(84, CustomersFromCard_Conditional_84_Template, 16, 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "div", 30);
            i0.ɵɵrepeaterCreate(86, CustomersFromCard_For_87_Template, 53, 36, "article", 31, i0.ɵɵrepeaterTrackByIdentity, false, CustomersFromCard_ForEmpty_88_Template, 5, 3, "div", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(89, "div", 33)(90, "button", 34);
            i0.ɵɵconditionalCreate(91, CustomersFromCard_Conditional_91_Template, 4, 3)(92, CustomersFromCard_Conditional_92_Template, 3, 3);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(93, CustomersFromCard_Conditional_93_Template, 3, 4, "button", 35);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.successMessage ? 2 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 29, "customerProfile"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 31, ctx.selectedCustomer ? "editCustomer" : "addCustomer"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.customerForm);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 33, "leadTraveler"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 35, "leadTravelerHint"));
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(26, 37, "firstName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(31, 39, "lastName"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 41, "email"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(41, 43, "mobile"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(46, 45, "passportNumber"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(51, 47, "dateOfBirth"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("placeholder", i0.ɵɵpipeBind1(53, 49, "dateOfBirth"))("ariaLabel", i0.ɵɵpipeBind1(54, 51, "dateOfBirth"))("inputClass", "w-full rounded-2xl border border-slate-300 py-2 ps-3 outline-none focus:border-primary");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(58, 53, "gender"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.genders);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(65, 55, "customerType"));
            i0.ɵɵadvance(2);
            i0.ɵɵcontrol();
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.customerTypes);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.customerForm.controls.customerType.value === ctx.customerTypeEnum.Company ? 69 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isAdmin ? 70 : 71);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.customerForm.touched && ctx.customerForm.invalid ? 72 : -1);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(78, 57, "companionTravelers"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(81, 59, "companionTravelersHint"));
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.customerForm.controls.customerType.value === ctx.customerTypeEnum.Couple ? 83 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.customerForm.controls.customerType.value === ctx.customerTypeEnum.Family || ctx.customerForm.controls.customerType.value === ctx.customerTypeEnum.Company ? 84 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.travelers.controls);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.customerForm.invalid || ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isLoading ? 91 : 92);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedCustomer ? 93 : -1);
        } }, dependencies: [ReactiveFormsModule, i3.ɵNgNoValidate, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.FormGroupDirective, i3.FormControlName, i3.FormGroupName, i3.FormArrayName, DatePicker, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomersFromCard, [{
        type: Component,
        args: [{ selector: 'app-customers-from-card', standalone: true, imports: [ReactiveFormsModule, TranslatePipe, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-slate-50 p-5\">\n  @if (errorMessage) { <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">{{ errorMessage | translate }}</div> }\n  @if (successMessage) { <div class=\"mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700\"><i class=\"mdi mdi-check-circle-outline me-2\"></i>{{ successMessage | translate }}</div> }\n  <div class=\"mb-5\"><p class=\"text-xs font-semibold uppercase tracking-[0.25em] text-primary\">{{ 'customerProfile' | translate }}</p><h2 class=\"mt-1 text-xl font-semibold\">{{ (selectedCustomer ? 'editCustomer' : 'addCustomer') | translate }}</h2></div>\n\n  <form class=\"space-y-6\" [formGroup]=\"customerForm\" (ngSubmit)=\"saveCustomer()\">\n    <section class=\"rounded-2xl border border-slate-200 bg-white p-4\">\n      <div class=\"mb-4 flex items-center gap-3\"><span class=\"grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-xl text-primary\"><i class=\"mdi mdi-account-star-outline\"></i></span><div><h3 class=\"font-semibold\">{{ 'leadTraveler' | translate }}</h3><p class=\"text-xs text-slate-500\">{{ 'leadTravelerHint' | translate }}</p></div></div>\n      <div class=\"grid gap-4 md:grid-cols-2\">\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'firstName' | translate }}</label><input formControlName=\"firstName\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:border-primary\" /></div>\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'lastName' | translate }}</label><input formControlName=\"lastName\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:border-primary\" /></div>\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'email' | translate }}</label><input formControlName=\"email\" type=\"email\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:border-primary\" /></div>\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'mobile' | translate }}</label><input formControlName=\"mobile\" type=\"tel\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:border-primary\" /></div>\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'passportNumber' | translate }}</label><input formControlName=\"passportNumber\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2 uppercase outline-none focus:border-primary\" /></div>\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'dateOfBirth' | translate }}</label><app-date-picker formControlName=\"dateOfBirth\" [placeholder]=\"'dateOfBirth' | translate\" [ariaLabel]=\"'dateOfBirth' | translate\" class=\"block\" [inputClass]=\"'w-full rounded-2xl border border-slate-300 py-2 ps-3 outline-none focus:border-primary'\" /></div>\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'gender' | translate }}</label><select formControlName=\"gender\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-primary\">@for (gender of genders; track gender.value) { <option [ngValue]=\"gender.value\">{{ gender.label | translate }}</option> }</select></div>\n        <div><label class=\"mb-2 block text-sm font-medium\">{{ 'customerType' | translate }}</label><select formControlName=\"customerType\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-primary\">@for (type of customerTypes; track type.value) { <option [ngValue]=\"type.value\">{{ type.label | translate }}</option> }</select></div>\n        @if (customerForm.controls.customerType.value === customerTypeEnum.Company) { <div><label class=\"mb-2 block text-sm font-medium\">{{ 'companyName' | translate }}</label><input formControlName=\"companyName\" type=\"text\" class=\"w-full rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:border-primary\" /></div> }\n        @if (isAdmin) { <div><label class=\"mb-2 block text-sm font-medium\">{{ 'assignedAgent' | translate }}</label><select formControlName=\"agentId\" class=\"w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 outline-none focus:border-primary\"><option [ngValue]=\"null\">{{ 'selectAgent' | translate }}</option>@for (agent of agents; track agent.id) { <option [ngValue]=\"agent.id\">{{ agent.firstName }} {{ agent.lastName }}</option> }</select><p class=\"mt-1 text-xs text-slate-500\">{{ 'customerAgentNotificationHint' | translate }}</p></div> } @else { <div class=\"flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-slate-600\"><i class=\"mdi mdi-account-check-outline text-xl text-primary\"></i>{{ 'customerAutoAssignedToAgent' | translate }}</div> }\n      </div>\n      @if (customerForm.touched && customerForm.invalid) { <p class=\"mt-3 text-xs font-medium text-red-600\">{{ 'requiredTravelerFieldsHint' | translate }}</p> }\n    </section>\n\n    <section class=\"rounded-2xl border border-slate-200 bg-white p-4\">\n      <div class=\"flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between\"><div><h3 class=\"font-semibold\">{{ 'companionTravelers' | translate }}</h3><p class=\"mt-1 text-xs text-slate-500\">{{ 'companionTravelersHint' | translate }}</p></div>\n        <div class=\"flex flex-wrap gap-2\">\n          @if (customerForm.controls.customerType.value === customerTypeEnum.Couple) { <button type=\"button\" [disabled]=\"travelers.length >= 1\" class=\"inline-flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white disabled:opacity-40\" (click)=\"addTraveler('spouse')\"><i class=\"mdi mdi-plus\"></i>{{ 'addSpouse' | translate }}</button> }\n          @if (customerForm.controls.customerType.value === customerTypeEnum.Family || customerForm.controls.customerType.value === customerTypeEnum.Company) {\n            <button type=\"button\" class=\"inline-flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white\" (click)=\"addTraveler('adult')\"><i class=\"mdi mdi-plus\"></i>{{ 'addAdult' | translate }}</button>\n            <button type=\"button\" class=\"inline-flex items-center gap-1 rounded-full border border-amber-300 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-500 hover:text-white\" (click)=\"addTraveler('child')\"><i class=\"mdi mdi-plus\"></i>{{ 'addChild' | translate }}</button>\n            <button type=\"button\" class=\"inline-flex items-center gap-1 rounded-full border border-sky-300 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-500 hover:text-white\" (click)=\"addTraveler('infant')\"><i class=\"mdi mdi-plus\"></i>{{ 'addInfant' | translate }}</button>\n            <button type=\"button\" class=\"inline-flex items-center gap-1 rounded-full border border-violet-300 px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-500 hover:text-white\" (click)=\"addTraveler('babysitter')\"><i class=\"mdi mdi-plus\"></i>{{ 'addBabysitter' | translate }}</button>\n          }\n        </div>\n      </div>\n\n      <div class=\"mt-4 space-y-4\" formArrayName=\"travelers\">\n        @for (traveler of travelers.controls; track traveler; let index = $index) {\n          <article class=\"rounded-2xl border border-slate-200 bg-slate-50 p-4\" [formGroupName]=\"index\">\n            <div class=\"mb-4 flex items-center justify-between\"><div class=\"flex items-center gap-2\"><span class=\"grid h-8 w-8 place-items-center rounded-full bg-white font-semibold text-primary shadow-sm\">{{ index + 2 }}</span><h4 class=\"font-semibold\">{{ traveler.controls.relationship.value || ('traveler' | translate) }}</h4></div><button type=\"button\" class=\"grid h-8 w-8 place-items-center rounded-full border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white\" [attr.aria-label]=\"'removeTraveler' | translate\" (click)=\"removeTraveler(index)\"><i class=\"mdi mdi-delete-outline\"></i></button></div>\n            <div class=\"grid gap-3 md:grid-cols-2 xl:grid-cols-3\">\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'relationship' | translate }}</label><input formControlName=\"relationship\" class=\"w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm\" /></div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'travelerType' | translate }}</label><select formControlName=\"travelerType\" class=\"w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm\">@for (type of travelerTypes; track type.value) { <option [ngValue]=\"type.value\">{{ type.label | translate }}</option> }</select></div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'gender' | translate }}</label><select formControlName=\"gender\" class=\"w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm\">@for (gender of genders; track gender.value) { <option [ngValue]=\"gender.value\">{{ gender.label | translate }}</option> }</select></div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'firstName' | translate }}</label><input formControlName=\"firstName\" class=\"w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm\" /></div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'lastName' | translate }}</label><input formControlName=\"lastName\" class=\"w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm\" /></div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'passportNumber' | translate }}</label><input formControlName=\"passportNumber\" class=\"w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm uppercase\" /></div>\n              <div><label class=\"mb-1 block text-xs font-medium\">{{ 'dateOfBirth' | translate }}</label><app-date-picker formControlName=\"dateOfBirth\" [placeholder]=\"'dateOfBirth' | translate\" [ariaLabel]=\"'dateOfBirth' | translate\" class=\"block\" [inputClass]=\"'w-full rounded-xl border border-slate-300 bg-white py-2 ps-3 text-sm'\" /></div>\n            </div>\n          </article>\n        } @empty { <div class=\"rounded-2xl border border-dashed border-slate-300 px-4 py-7 text-center text-sm text-slate-500\"><i class=\"mdi mdi-account-multiple-plus-outline text-3xl text-slate-300\"></i><p class=\"mt-2\">{{ 'noCompanionTravelers' | translate }}</p></div> }\n      </div>\n    </section>\n\n    <div class=\"flex flex-wrap gap-3\"><button type=\"submit\" [disabled]=\"customerForm.invalid || isLoading\" class=\"inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">@if (isLoading) { <i class=\"mdi mdi-loading mdi-spin\"></i><span>{{ 'saving' | translate }}</span> } @else { <i class=\"mdi mdi-content-save-outline\"></i>{{ (selectedCustomer ? 'update' : 'add') | translate }} }</button>@if (selectedCustomer) { <button type=\"button\" class=\"rounded-full border border-slate-300 px-4 py-2 text-sm font-medium\" [disabled]=\"isLoading\" (click)=\"cancelEdit()\">{{ 'cancel' | translate }}</button> }</div>\n  </form>\n</div>\n" }]
    }], () => [{ type: i1.ApiService }, { type: i2.AuthService }, { type: i0.ChangeDetectorRef }], { selectedCustomer: [{
            type: Input
        }], customerSaved: [{
            type: Output
        }], editCancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomersFromCard, { className: "CustomersFromCard", filePath: "app/features/configurations/customers/customers-from-card/customers-from-card.ts", lineNumber: 58 }); })();
