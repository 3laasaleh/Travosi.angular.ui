import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { DatePicker } from '../date-picker/date-picker';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class SelectedDate {
    date = null;
    date2 = null;
    ngAfterViewInit() {
        feather.replace();
    }
    static ɵfac = function SelectedDate_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SelectedDate)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SelectedDate, selectors: [["app-selected-date"]], decls: 39, vars: 4, consts: [[1, "p-6", "bg-white", "rounded-xl", "shadow", "dark:shadow-gray-700"], [1, "registration-form", "text-dark", "text-start"], [1, "grid", "lg:grid-cols-5", "md:grid-cols-2", "grid-cols-1", "gap-4"], [1, "form-label", "font-medium", "text-slate-900"], [1, "relative", "mt-2"], ["data-feather", "search", 1, "size-[18px]", "absolute", "top-[10px]", "start-3"], ["name", "name", "type", "text", "id", "job-keyword", "placeholder", "Search", 1, "w-full", "py-2", "px-3", "ps-10", "h-10", "bg-transparent", "rounded-md", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["name", "date", "placeholder", "Select Your Date", "ariaLabel", "Select Your Date", 1, "block", 3, "ngModelChange", "ngModel", "inputClass"], ["name", "date2", "placeholder", "Select Your Date", "ariaLabel", "Select Your Date", 1, "block", 3, "ngModelChange", "ngModel", "inputClass"], ["data-feather", "users", 1, "size-[18px]", "absolute", "top-[10px]", "start-3"], [1, "form-select", "w-full", "py-2", "px-3", "ps-10", "h-10", "bg-transparent", "rounded-md", "outline-none", "border", "border-gray-100", "dark:border-gray-800", "focus:ring-0"], ["disabled", "", "selected", ""], [1, "lg:mt-[35px]"], ["type", "submit", "id", "search-buy", "name", "search", "value", "Search", 1, "py-1", "px-5", "h-10", "inline-block", "tracking-wide", "align-middle", "duration-500", "text-base", "text-center", "bg-primary", "text-white", "rounded-md", "w-full", "cursor-pointer"]], template: function SelectedDate_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "form", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "label", 3);
            i0.ɵɵtext(5, "Search:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 4);
            i0.ɵɵelement(7, "i", 5)(8, "input", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div")(10, "label", 3);
            i0.ɵɵtext(11, "Select Your Date:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 4)(13, "app-date-picker", 7);
            i0.ɵɵtwoWayListener("ngModelChange", function SelectedDate_Template_app_date_picker_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.date, $event) || (ctx.date = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div")(15, "label", 3);
            i0.ɵɵtext(16, "Select Your Date:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 4)(18, "app-date-picker", 8);
            i0.ɵɵtwoWayListener("ngModelChange", function SelectedDate_Template_app_date_picker_ngModelChange_18_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.date2, $event) || (ctx.date2 = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵcontrolCreate();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div")(20, "label", 3);
            i0.ɵɵtext(21, "No. of person:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 4);
            i0.ɵɵelement(23, "i", 9);
            i0.ɵɵelementStart(24, "select", 10)(25, "option", 11);
            i0.ɵɵtext(26, "No. of person");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "option");
            i0.ɵɵtext(28, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "option");
            i0.ɵɵtext(30, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "option");
            i0.ɵɵtext(32, "3");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "option");
            i0.ɵɵtext(34, "4");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "option");
            i0.ɵɵtext(36, "5");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(37, "div", 12);
            i0.ɵɵelement(38, "input", 13);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵtwoWayProperty("ngModel", ctx.date);
            i0.ɵɵproperty("inputClass", "h-10 w-full rounded-md border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:ring-0 dark:border-gray-800  ");
            i0.ɵɵcontrol();
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.date2);
            i0.ɵɵproperty("inputClass", "h-10 w-full rounded-md border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:ring-0 dark:border-gray-800  ");
            i0.ɵɵcontrol();
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, i1.NgForm, DatePicker], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SelectedDate, [{
        type: Component,
        args: [{ selector: 'app-selected-date', imports: [FormsModule, DatePicker], changeDetection: ChangeDetectionStrategy.OnPush, template: "<form class=\"p-6 bg-white  rounded-xl shadow dark:shadow-gray-700\">\r\n    <div class=\"registration-form text-dark text-start\">\r\n        <div class=\"grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-4\">\r\n            <div>\r\n                <label class=\"form-label font-medium text-slate-900 \">Search:</label>\r\n                <div class=\"relative mt-2\">\r\n                    <i data-feather=\"search\" class=\"size-[18px] absolute top-[10px] start-3\"></i>\r\n                    <input name=\"name\" type=\"text\" id=\"job-keyword\" class=\"w-full py-2 px-3 ps-10 h-10 bg-transparent   rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\" placeholder=\"Search\">\r\n                </div>\r\n            </div>\r\n\r\n            <div>\r\n                <label class=\"form-label font-medium text-slate-900 \">Select Your Date:</label>\r\n                <div class=\"relative mt-2\">\r\n                    <app-date-picker\r\n                        [(ngModel)]=\"date\"\r\n                        name=\"date\"\r\n                        placeholder=\"Select Your Date\"\r\n                        ariaLabel=\"Select Your Date\"\r\n                        class=\"block\"\r\n                        [inputClass]=\"'h-10 w-full rounded-md border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:ring-0 dark:border-gray-800  '\" />\r\n                </div>\r\n            </div>\r\n\r\n            <div>\r\n                <label class=\"form-label font-medium text-slate-900 \">Select Your Date:</label>\r\n                <div class=\"relative mt-2\">\r\n                    <app-date-picker\r\n                        [(ngModel)]=\"date2\"\r\n                        name=\"date2\"\r\n                        placeholder=\"Select Your Date\"\r\n                        ariaLabel=\"Select Your Date\"\r\n                        class=\"block\"\r\n                        [inputClass]=\"'h-10 w-full rounded-md border border-gray-100 bg-transparent py-2 ps-3 outline-none focus:ring-0 dark:border-gray-800  '\" />\r\n                </div>\r\n            </div>\r\n\r\n            <div>\r\n                <label class=\"form-label font-medium text-slate-900 \">No. of person:</label>\r\n                <div class=\"relative mt-2\">\r\n                    <i data-feather=\"users\" class=\"size-[18px] absolute top-[10px] start-3\"></i>\r\n                    <select class=\"form-select w-full py-2 px-3 ps-10 h-10 bg-transparent   rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0\">\r\n                        <option disabled selected>No. of person</option>\r\n                        <option>1</option>\r\n                        <option>2</option>\r\n                        <option>3</option>\r\n                        <option>4</option>\r\n                        <option>5</option>\r\n                    </select>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"lg:mt-[35px]\">\r\n                <input type=\"submit\" id=\"search-buy\" name=\"search\" class=\"py-1 px-5 h-10 inline-block tracking-wide align-middle duration-500 text-base text-center bg-primary text-white rounded-md w-full cursor-pointer\" value=\"Search\">\r\n            </div>\r\n        </div>\r\n    </div>\r\n</form>\r\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SelectedDate, { className: "SelectedDate", filePath: "app/shared/components/selected-date/selected-date.ts", lineNumber: 12 }); })();
