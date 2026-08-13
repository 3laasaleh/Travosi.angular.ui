import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input, ViewChild, forwardRef, inject, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Datepicker as FlowbiteDatepicker } from 'flowbite';
import * as i0 from "@angular/core";
const _c0 = ["dateInput"];
function DatePicker_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "input", 6);
    i0.ɵɵlistener("input", function DatePicker_Conditional_6_Template_input_input_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleTimeChange($event)); })("blur", function DatePicker_Conditional_6_Template_input_blur_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleTimeBlur()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", ctx_r1.timeInputId)("value", ctx_r1.timeValue)("disabled", ctx_r1.isDisabled);
    i0.ɵɵattribute("aria-label", ctx_r1.ariaLabel || ctx_r1.placeholder || "Time");
} }
const ARABIC_LOCALE = {
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    daysShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
    daysMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    months: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ],
    monthsShort: [
        'يناير',
        'فبراير',
        'مارس',
        'أبريل',
        'مايو',
        'يونيو',
        'يوليو',
        'أغسطس',
        'سبتمبر',
        'أكتوبر',
        'نوفمبر',
        'ديسمبر',
    ],
    today: 'اليوم',
    clear: 'مسح',
    titleFormat: 'MM y',
    format: 'yyyy-mm-dd',
    weekStart: 6,
};
let nextDatePickerId = 0;
let arabicLocaleRegistered = false;
export class DatePicker {
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    translate = inject(TranslateService);
    instanceId = `flowbite-datepicker-${++nextDatePickerId}`;
    dateInput;
    min = null;
    max = null;
    id = '';
    placeholder = '';
    ariaLabel = '';
    inputClass = '';
    icon = 'mdi-calendar-month-outline';
    includeTime = false;
    selectedDate;
    timeValue = '00:00';
    isDisabled = false;
    isArabic = false;
    picker = null;
    viewInitialized = false;
    syncingPicker = false;
    removeDateChangeListener = null;
    onChange = () => { };
    onTouched = () => { };
    constructor() {
        this.isArabic = this.translate.currentLang()?.toLowerCase().startsWith('ar') ?? false;
        this.translate.onLangChange
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(({ lang }) => {
            const nextIsArabic = lang.toLowerCase().startsWith('ar');
            if (nextIsArabic === this.isArabic)
                return;
            this.isArabic = nextIsArabic;
            this.cdr.markForCheck();
            this.schedulePickerRebuild();
        });
    }
    get inputId() {
        return this.id || this.instanceId;
    }
    get timeInputId() {
        return `${this.inputId}-time`;
    }
    ngAfterViewInit() {
        this.viewInitialized = true;
        const input = this.dateInput?.nativeElement;
        if (!input)
            return;
        const listener = () => this.handleDateSelection();
        input.addEventListener('changeDate', listener);
        this.removeDateChangeListener = () => input.removeEventListener('changeDate', listener);
        this.initializePicker();
    }
    ngOnChanges(changes) {
        if (changes['min'] || changes['max'])
            this.schedulePickerRebuild();
    }
    ngOnDestroy() {
        this.removeDateChangeListener?.();
        this.destroyPicker();
    }
    writeValue(value) {
        this.selectedDate = this.parseDate(value);
        this.timeValue = this.parseTime(value);
        this.syncPickerValue();
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        if (isDisabled)
            this.picker?.hide();
        this.cdr.markForCheck();
    }
    handleDateInputBlur() {
        this.onTouched();
    }
    handleTimeChange(event) {
        this.timeValue = event.target.value || '00:00';
        this.emitModelValue();
    }
    handleTimeBlur() {
        this.onTouched();
    }
    initializePicker() {
        const input = this.dateInput?.nativeElement;
        if (!input)
            return;
        this.registerArabicLocale(input);
        const options = {
            autohide: true,
            format: 'yyyy-mm-dd',
            minDate: this.normalizeBoundary(this.min),
            maxDate: this.normalizeBoundary(this.max),
            orientation: 'bottom',
            buttons: true,
            autoSelectToday: 1,
            language: this.isArabic ? 'ar' : 'en',
            rangePicker: false,
        };
        this.picker = new FlowbiteDatepicker(input, options, {
            id: this.instanceId,
            override: true,
        });
        this.syncPickerValue();
    }
    registerArabicLocale(input) {
        if (arabicLocaleRegistered)
            return;
        const bootstrapPicker = new FlowbiteDatepicker(input, { format: 'yyyy-mm-dd', language: 'en' }, { id: `${this.instanceId}-locale-bootstrap`, override: true });
        const innerPicker = bootstrapPicker.getDatepickerInstance();
        innerPicker.constructor.locales.ar = ARABIC_LOCALE;
        bootstrapPicker.destroyAndRemoveInstance();
        arabicLocaleRegistered = true;
    }
    handleDateSelection() {
        if (this.syncingPicker || !this.picker)
            return;
        const innerPicker = this.picker.getDatepickerInstance();
        const value = innerPicker.getDate();
        this.selectedDate = value && !Number.isNaN(value.getTime())
            ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
            : undefined;
        this.emitModelValue();
        this.cdr.markForCheck();
    }
    emitModelValue() {
        this.onChange(this.toModelValue(this.selectedDate));
        this.onTouched();
    }
    syncPickerValue() {
        if (!this.picker)
            return;
        const innerPicker = this.picker.getDatepickerInstance();
        this.syncingPicker = true;
        try {
            if (this.selectedDate) {
                innerPicker.setDate(this.selectedDate, { autohide: false });
            }
            else {
                innerPicker.setDate({ clear: true, autohide: false });
            }
        }
        finally {
            this.syncingPicker = false;
        }
    }
    schedulePickerRebuild() {
        if (!this.viewInitialized)
            return;
        queueMicrotask(() => {
            if (!this.viewInitialized)
                return;
            this.destroyPicker();
            this.initializePicker();
        });
    }
    destroyPicker() {
        this.picker?.destroyAndRemoveInstance();
        this.picker = null;
    }
    normalizeBoundary(value) {
        const date = this.parseDate(value);
        return date ? this.formatDate(date) : null;
    }
    parseDate(value) {
        if (!value)
            return undefined;
        if (value instanceof Date) {
            return Number.isNaN(value.getTime()) ? undefined : new Date(value.getTime());
        }
        const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/);
        if (!match)
            return undefined;
        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const day = Number(match[3]);
        const hours = this.includeTime ? Number(match[4] ?? 0) : 0;
        const minutes = this.includeTime ? Number(match[5] ?? 0) : 0;
        const date = new Date(year, month, day, hours, minutes, 0, 0);
        return date.getFullYear() === year
            && date.getMonth() === month
            && date.getDate() === day
            && date.getHours() === hours
            && date.getMinutes() === minutes
            ? date
            : undefined;
    }
    parseTime(value) {
        if (!this.includeTime || !value)
            return '00:00';
        if (value instanceof Date && !Number.isNaN(value.getTime())) {
            return `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`;
        }
        const match = String(value).match(/[T\s](\d{2}):(\d{2})/);
        return match ? `${match[1]}:${match[2]}` : '00:00';
    }
    formatDate(value) {
        return [
            value.getFullYear().toString().padStart(4, '0'),
            (value.getMonth() + 1).toString().padStart(2, '0'),
            value.getDate().toString().padStart(2, '0'),
        ].join('-');
    }
    toModelValue(value) {
        if (!value || Number.isNaN(value.getTime()))
            return '';
        const date = this.formatDate(value);
        return this.includeTime ? `${date}T${this.timeValue || '00:00'}` : date;
    }
    static ɵfac = function DatePicker_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DatePicker)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DatePicker, selectors: [["app-date-picker"]], viewQuery: function DatePicker_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dateInput = _t.first);
        } }, inputs: { min: "min", max: "max", id: "id", placeholder: "placeholder", ariaLabel: "ariaLabel", inputClass: "inputClass", icon: "icon", includeTime: "includeTime" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => DatePicker),
                    multi: true,
                },
            ]), i0.ɵɵNgOnChangesFeature], decls: 7, vars: 10, consts: [["dateInput", ""], [1, "grid", "gap-2"], [1, "relative"], [1, "pointer-events-none", "absolute", "inset-y-0", "start-0", "z-10", "flex", "items-center", "ps-3", "text-slate-400"], ["aria-hidden", "true", 1, "mdi", "text-lg", 3, "ngClass"], ["type", "text", "autocomplete", "off", 1, "block", "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "py-2.5", "ps-10", "pe-3", "text-sm", "text-slate-900", "shadow-xs", "outline-none", "transition", "placeholder:text-slate-400", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", "disabled:cursor-not-allowed", "disabled:bg-slate-100", "disabled:text-slate-400", "dark:border-slate-700", "dark:disabled:bg-slate-800", 2, "padding-inline-start", "2.5rem", 3, "blur", "ngClass", "disabled", "placeholder"], ["type", "time", 1, "block", "w-full", "rounded-xl", "border", "border-slate-300", "bg-white", "px-3", "py-2.5", "text-sm", "text-slate-900", "shadow-xs", "outline-none", "transition", "focus:border-primary", "focus:ring-2", "focus:ring-primary/20", "disabled:cursor-not-allowed", "disabled:bg-slate-100", "disabled:text-slate-400", "dark:border-slate-700", "dark:disabled:bg-slate-800", 3, "input", "blur", "id", "value", "disabled"]], template: function DatePicker_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
            i0.ɵɵelement(3, "i", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "input", 5, 0);
            i0.ɵɵlistener("blur", function DatePicker_Template_input_blur_4_listener() { return ctx.handleDateInputBlur(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, DatePicker_Conditional_6_Template, 2, 4, "div", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("grid-cols-[minmax(0,1fr)_8rem]", ctx.includeTime);
            i0.ɵɵattribute("dir", ctx.isArabic ? "rtl" : "ltr");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngClass", ctx.icon);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.inputClass)("disabled", ctx.isDisabled)("placeholder", ctx.placeholder);
            i0.ɵɵattribute("id", ctx.inputId)("aria-label", ctx.ariaLabel || ctx.placeholder || "Date");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.includeTime ? 6 : -1);
        } }, dependencies: [NgClass], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DatePicker, [{
        type: Component,
        args: [{ selector: 'app-date-picker', standalone: true, imports: [NgClass], providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DatePicker),
                        multi: true,
                    },
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"grid gap-2\"\n  [class.grid-cols-[minmax(0,1fr)_8rem]]=\"includeTime\"\n  [attr.dir]=\"isArabic ? 'rtl' : 'ltr'\">\n  <div class=\"relative\">\n    <div class=\"pointer-events-none absolute inset-y-0 start-0 z-10 flex items-center ps-3 text-slate-400\">\n      <i class=\"mdi text-lg\" [ngClass]=\"icon\" aria-hidden=\"true\"></i>\n    </div>\n    <input\n      #dateInput\n      type=\"text\"\n      autocomplete=\"off\"\n      style=\"padding-inline-start: 2.5rem\"\n      class=\"block w-full rounded-xl border border-slate-300 bg-white py-2.5 ps-10 pe-3 text-sm text-slate-900 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700   dark:disabled:bg-slate-800\"\n      [ngClass]=\"inputClass\"\n      [disabled]=\"isDisabled\"\n      [attr.id]=\"inputId\"\n      [attr.aria-label]=\"ariaLabel || placeholder || 'Date'\"\n      [placeholder]=\"placeholder\"\n      (blur)=\"handleDateInputBlur()\" />\n  </div>\n\n  @if (includeTime) {\n    <div class=\"relative\">\n      <input\n        type=\"time\"\n        class=\"block w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700   dark:disabled:bg-slate-800\"\n        [id]=\"timeInputId\"\n        [value]=\"timeValue\"\n        [disabled]=\"isDisabled\"\n        [attr.aria-label]=\"ariaLabel || placeholder || 'Time'\"\n        (input)=\"handleTimeChange($event)\"\n        (blur)=\"handleTimeBlur()\" />\n    </div>\n  }\n</div>\n" }]
    }], () => [], { dateInput: [{
            type: ViewChild,
            args: ['dateInput']
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], id: [{
            type: Input
        }], placeholder: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], inputClass: [{
            type: Input
        }], icon: [{
            type: Input
        }], includeTime: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DatePicker, { className: "DatePicker", filePath: "app/shared/components/date-picker/date-picker.ts", lineNumber: 79 }); })();
