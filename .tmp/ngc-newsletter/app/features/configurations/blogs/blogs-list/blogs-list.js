import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, Output, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';
import { AdminService } from '../../admin.service';
import * as i0 from "@angular/core";
const _c0 = () => [1, 2, 3, 4, 5, 6];
const _c1 = () => [1, 2, 3, 4, 5];
const _c2 = () => [1, 2, 3, 4];
function _forTrack0($index, $item) { /* @ts-ignore */
return this.blogId($item) ?? $index; }
function BlogsList_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, ctx_r0.errorMessage), " ");
} }
function BlogsList_Conditional_6_Conditional_0_For_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 10);
} }
function BlogsList_Conditional_6_Conditional_0_For_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12)(2, "div", 10)(3, "div", 10)(4, "div", 10)(5, "div", 13)(6, "div", 14);
    i0.ɵɵelementEnd();
} }
function BlogsList_Conditional_6_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 9);
    i0.ɵɵrepeaterCreate(2, BlogsList_Conditional_6_Conditional_0_For_3_Template, 1, 0, "div", 10, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(4, BlogsList_Conditional_6_Conditional_0_For_5_Template, 7, 0, "div", 11, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(1, _c1));
} }
function BlogsList_Conditional_6_Conditional_1_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 15);
    i0.ɵɵelement(1, "div", 16);
    i0.ɵɵelementStart(2, "div", 17);
    i0.ɵɵelement(3, "div", 18)(4, "div", 19)(5, "div", 20);
    i0.ɵɵelementEnd()();
} }
function BlogsList_Conditional_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, BlogsList_Conditional_6_Conditional_1_For_2_Template, 6, 0, "article", 15, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵrepeater(i0.ɵɵpureFunction0(0, _c2));
} }
function BlogsList_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, BlogsList_Conditional_6_Conditional_0_Template, 6, 2, "div", 7)(1, BlogsList_Conditional_6_Conditional_1_Template, 3, 1, "div", 8);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r0.viewMode === "table" ? 0 : 1);
} }
function BlogsList_Conditional_7_For_24_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 25);
} if (rf & 2) {
    const blog_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", ctx_r0.titleEng(blog_r3));
} }
function BlogsList_Conditional_7_For_24_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelementEnd();
} }
function BlogsList_Conditional_7_For_24_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 33);
} }
function BlogsList_Conditional_7_For_24_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 38);
} if (rf & 2) {
    const blog_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("translate-x-6", ctx_r0.isActive(blog_r3))("translate-x-1", !ctx_r0.isActive(blog_r3));
} }
function BlogsList_Conditional_7_For_24_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵpipe(1, "translate");
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵlistener("click", function BlogsList_Conditional_7_For_24_Conditional_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const blog_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(blog_r3)); });
    i0.ɵɵelement(3, "i", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 2, "editBlog"))("title", i0.ɵɵpipeBind1(2, 4, "editBlog"));
} }
function BlogsList_Conditional_7_For_24_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 24)(1, "td", 23);
    i0.ɵɵconditionalCreate(2, BlogsList_Conditional_7_For_24_Conditional_2_Template, 1, 2, "img", 25)(3, BlogsList_Conditional_7_For_24_Conditional_3_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td", 27)(5, "span", 28);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 29)(8, "span", 28);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td", 30);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 23)(14, "div", 31)(15, "button", 32);
    i0.ɵɵpipe(16, "translate");
    i0.ɵɵlistener("click", function BlogsList_Conditional_7_For_24_Template_button_click_15_listener() { const blog_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleStatus(blog_r3)); });
    i0.ɵɵconditionalCreate(17, BlogsList_Conditional_7_For_24_Conditional_17_Template, 1, 0, "i", 33)(18, BlogsList_Conditional_7_For_24_Conditional_18_Template, 1, 4, "span", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 35);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "td", 23);
    i0.ɵɵconditionalCreate(23, BlogsList_Conditional_7_For_24_Conditional_23_Template, 4, 6, "button", 36);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_11_0;
    const blog_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.imageUrl(blog_r3)) ? 2 : 3, tmp_11_0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.titleEng(blog_r3));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.titleAr(blog_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(12, 18, ctx_r0.publishedAt(blog_r3), "mediumDate"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("bg-emerald-500", ctx_r0.isActive(blog_r3))("bg-slate-300", !ctx_r0.isActive(blog_r3));
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", ctx_r0.isActive(blog_r3))("aria-label", i0.ɵɵpipeBind1(16, 21, ctx_r0.isActive(blog_r3) ? "deactivate" : "activate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === ctx_r0.blogId(blog_r3) ? 17 : 18);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("text-emerald-600", ctx_r0.isActive(blog_r3))("text-slate-500", !ctx_r0.isActive(blog_r3));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 23, ctx_r0.isActive(blog_r3) ? "active" : "inactive"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(!ctx_r0.isActive(blog_r3) ? 23 : -1);
} }
function BlogsList_Conditional_7_ForEmpty_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 41);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, "noBlogsCreated"));
} }
function BlogsList_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "table", 21)(2, "thead", 22)(3, "tr")(4, "th", 23);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 23);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 23);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 23);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 23);
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th", 23);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "tbody");
    i0.ɵɵrepeaterCreate(23, BlogsList_Conditional_7_For_24_Template, 24, 25, "tr", 24, _forTrack0, true, BlogsList_Conditional_7_ForEmpty_25_Template, 4, 3, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, "image"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 9, "englishTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 11, "arabicTitle"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 13, "publishDate"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 15, "status"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(21, 17, "actions"));
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.blogs);
} }
function BlogsList_Conditional_8_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 45);
} if (rf & 2) {
    const blog_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", ctx_r0.titleEng(blog_r6));
} }
function BlogsList_Conditional_8_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵelement(1, "i", 56);
    i0.ɵɵelementEnd();
} }
function BlogsList_Conditional_8_For_2_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const blog_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.summaryEng(blog_r6));
} }
function BlogsList_Conditional_8_For_2_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 57);
    i0.ɵɵlistener("click", function BlogsList_Conditional_8_For_2_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const blog_r6 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editRequested.emit(blog_r6)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "edit"), " ");
} }
function BlogsList_Conditional_8_For_2_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
} }
function BlogsList_Conditional_8_For_2_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 33);
} }
function BlogsList_Conditional_8_For_2_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 38);
} if (rf & 2) {
    const blog_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("translate-x-6", ctx_r0.isActive(blog_r6))("translate-x-1", !ctx_r0.isActive(blog_r6));
} }
function BlogsList_Conditional_8_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 42)(1, "div", 44);
    i0.ɵɵconditionalCreate(2, BlogsList_Conditional_8_For_2_Conditional_2_Template, 1, 2, "img", 45)(3, BlogsList_Conditional_8_For_2_Conditional_3_Template, 2, 0, "div", 46);
    i0.ɵɵelementStart(4, "div", 47)(5, "div", 48)(6, "span", 49);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 50);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "translate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "h3", 51);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p", 52);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(16, BlogsList_Conditional_8_For_2_Conditional_16_Template, 2, 1, "p", 53);
    i0.ɵɵelementStart(17, "div", 54);
    i0.ɵɵconditionalCreate(18, BlogsList_Conditional_8_For_2_Conditional_18_Template, 3, 3, "button", 55)(19, BlogsList_Conditional_8_For_2_Conditional_19_Template, 1, 0, "span");
    i0.ɵɵelementStart(20, "button", 32);
    i0.ɵɵpipe(21, "translate");
    i0.ɵɵlistener("click", function BlogsList_Conditional_8_For_2_Template_button_click_20_listener() { const blog_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleStatus(blog_r6)); });
    i0.ɵɵconditionalCreate(22, BlogsList_Conditional_8_For_2_Conditional_22_Template, 1, 0, "i", 33)(23, BlogsList_Conditional_8_For_2_Conditional_23_Template, 1, 4, "span", 34);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    let tmp_11_0;
    const blog_r6 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = ctx_r0.imageUrl(blog_r6)) ? 2 : 3, tmp_11_0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 23, ctx_r0.publishedAt(blog_r6), "mediumDate"));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-100", ctx_r0.isActive(blog_r6))("text-emerald-700", ctx_r0.isActive(blog_r6))("bg-slate-100", !ctx_r0.isActive(blog_r6))("text-slate-600", !ctx_r0.isActive(blog_r6));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(11, 26, ctx_r0.isActive(blog_r6) ? "active" : "inactive"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.titleEng(blog_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.titleAr(blog_r6));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.summaryEng(blog_r6) ? 16 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(!ctx_r0.isActive(blog_r6) ? 18 : 19);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("bg-emerald-500", ctx_r0.isActive(blog_r6))("bg-slate-300", !ctx_r0.isActive(blog_r6));
    i0.ɵɵproperty("disabled", ctx_r0.statusUpdatingId !== null);
    i0.ɵɵattribute("aria-checked", ctx_r0.isActive(blog_r6))("aria-label", i0.ɵɵpipeBind1(21, 28, ctx_r0.isActive(blog_r6) ? "deactivate" : "activate"));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.statusUpdatingId === ctx_r0.blogId(blog_r6) ? 22 : 23);
} }
function BlogsList_Conditional_8_ForEmpty_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 43);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "noBlogsCreated"));
} }
function BlogsList_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵrepeaterCreate(1, BlogsList_Conditional_8_For_2_Template, 24, 30, "article", 42, _forTrack0, true, BlogsList_Conditional_8_ForEmpty_3_Template, 3, 3, "p", 43);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.blogs);
} }
function BlogsList_Conditional_9_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 62);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const size_r9 = ctx.$implicit;
    i0.ɵɵproperty("value", size_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(size_r9);
} }
function BlogsList_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 58);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 59)(5, "label", 60)(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "select", 61);
    i0.ɵɵlistener("change", function BlogsList_Conditional_9_Template_select_change_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageSizeChange($event)); });
    i0.ɵɵrepeaterCreate(10, BlogsList_Conditional_9_For_11_Template, 2, 2, "option", 62, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "app-pagination-one", 63);
    i0.ɵɵlistener("pageChange", function BlogsList_Conditional_9_Template_app_pagination_one_pageChange_12_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onPageChange($event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind1(3, 7, "totalRecords"), ": ", ctx_r0.paginationInfo.totalCount, " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(8, 9, "pageSize"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r0.paginationInfo.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.pageSizeOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("compact", true)("currentPage", ctx_r0.paginationInfo.page)("totalPages", ctx_r0.paginationInfo.totalPages);
} }
export class BlogsList {
    adminService = inject(AdminService);
    cdr = inject(ChangeDetectorRef);
    destroyRef = inject(DestroyRef);
    translate = inject(TranslateService);
    pageSizeOptions = [10, 20, 50];
    viewMode = 'table';
    refreshToken = 0;
    editRequested = new EventEmitter();
    blogs = [];
    isLoading = false;
    statusUpdatingId = null;
    errorMessage = '';
    paginationInfo = {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 1,
    };
    ngOnInit() {
        this.load();
    }
    ngOnChanges(changes) {
        if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
            this.paginationInfo.page = 1;
            this.load();
        }
    }
    load() {
        this.isLoading = true;
        this.errorMessage = '';
        this.adminService
            .getBlogs(this.paginationInfo.page, this.paginationInfo.pageSize)
            .pipe(catchError(() => {
            this.errorMessage = 'blogsLoadError';
            return of(null);
        }), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
            if (response === null)
                return;
            if (response?.isSuccess === false || response?.IsSuccess === false) {
                this.blogs = [];
                this.errorMessage = response?.message || response?.Message || 'blogsLoadError';
                return;
            }
            const pageData = response?.data ?? response?.Data ?? response;
            const rows = pageData?.data ??
                pageData?.Data ??
                pageData?.items ??
                pageData?.Items ??
                pageData?.blogs ??
                pageData?.Blogs ??
                pageData;
            this.blogs = Array.isArray(rows) ? rows : [];
            const page = this.positiveInteger(pageData?.page ?? pageData?.Page, this.paginationInfo.page);
            const pageSize = this.positiveInteger(pageData?.pageSize ?? pageData?.PageSize, this.paginationInfo.pageSize);
            const totalCount = this.nonNegativeInteger(pageData?.totalCount ?? pageData?.TotalCount, this.blogs.length);
            const totalPages = this.positiveInteger(pageData?.totalPages ?? pageData?.TotalPages, Math.max(1, Math.ceil(totalCount / pageSize)));
            this.paginationInfo = { page, pageSize, totalCount, totalPages };
        });
    }
    onPageChange(page) {
        if (page === this.paginationInfo.page || page < 1 || page > this.paginationInfo.totalPages)
            return;
        this.paginationInfo.page = page;
        this.load();
    }
    onPageSizeChange(event) {
        const pageSize = Number(event.target.value);
        if (!this.pageSizeOptions.includes(pageSize))
            return;
        this.paginationInfo.pageSize = pageSize;
        this.paginationInfo.page = 1;
        this.load();
    }
    async toggleStatus(blog) {
        if (this.statusUpdatingId !== null)
            return;
        const isActive = this.isActive(blog);
        const confirmation = await Swal.fire({
            title: this.translate.instant('confirmStatusChange'),
            text: this.translate.instant(isActive ? 'confirmDeactivateBlog' : 'confirmActivateBlog'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('confirm'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: isActive ? '#e11d48' : '#059669',
            reverseButtons: true,
        });
        if (!confirmation.isConfirmed)
            return;
        const blogId = Number(blog?.id ?? blog?.Id);
        if (!Number.isInteger(blogId) || blogId <= 0) {
            await Swal.fire({ icon: 'error', title: this.translate.instant('blogStatusUpdateError') });
            return;
        }
        this.statusUpdatingId = blogId;
        this.adminService
            .changeBlogStatus(blogId)
            .pipe(catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('blogStatusUpdateError') });
            return of({ statusToggleFailed: true });
        }), finalize(() => {
            this.statusUpdatingId = null;
            this.cdr.markForCheck();
        }), takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
            if (response?.statusToggleFailed || response?.isSuccess === false || response?.IsSuccess === false) {
                if (!response?.statusToggleFailed) {
                    Swal.fire({
                        icon: 'error',
                        title: response?.message ??
                            response?.Message ??
                            this.translate.instant('blogStatusUpdateError'),
                    });
                }
                return;
            }
            blog.isActive = !isActive;
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.translate.instant('blogStatusUpdated'),
                showConfirmButton: false,
                timer: 2200,
                timerProgressBar: true,
            });
            this.cdr.markForCheck();
        });
    }
    blogId(blog) {
        return blog?.id ?? blog?.Id;
    }
    isActive(blog) {
        return blog?.isActive ?? blog?.IsActive ?? false;
    }
    titleEng(blog) {
        return blog?.titleEng ?? blog?.TitleEng ?? '';
    }
    titleAr(blog) {
        return blog?.titleAr ?? blog?.TitleAr ?? '';
    }
    summaryEng(blog) {
        return blog?.summaryEng ?? blog?.SummaryEng ?? '';
    }
    publishedAt(blog) {
        return blog?.publishedAt ?? blog?.PublishedAt;
    }
    imageUrl(blog) {
        const images = blog?.images ?? blog?.Images ?? [];
        const firstImage = Array.isArray(images) ? images[0] : undefined;
        const raw = typeof firstImage === 'string'
            ? firstImage
            : firstImage?.imageUrl ?? firstImage?.ImageUrl ?? firstImage?.url ?? firstImage?.Url;
        if (!raw)
            return '';
        if (/^(https?:|data:|blob:)/i.test(raw))
            return raw;
        const path = String(raw).replace(/^\/+/, '').replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
    }
    positiveInteger(value, fallback) {
        const number = Number(value);
        return Number.isInteger(number) && number > 0 ? number : fallback;
    }
    nonNegativeInteger(value, fallback) {
        const number = Number(value);
        return Number.isInteger(number) && number >= 0 ? number : fallback;
    }
    static ɵfac = function BlogsList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BlogsList)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BlogsList, selectors: [["app-blogs-list"]], inputs: { viewMode: "viewMode", refreshToken: "refreshToken" }, outputs: { editRequested: "editRequested" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 6, consts: [[1, "rounded-3xl", "border", "border-slate-200", "bg-white", "p-5"], [1, "mb-4", "rounded-2xl", "border", "border-red-200", "bg-red-50", "px-4", "py-3", "text-sm", "text-red-600"], [1, "mb-4", "flex", "items-center", "justify-between"], [1, "text-xl", "font-semibold"], [1, "max-h-[70vh]", "overflow-auto", "rounded-2xl", "border", "border-slate-200"], [1, "grid", "max-h-[70vh]", "grid-cols-[repeat(auto-fill,minmax(240px,1fr))]", "gap-5", "overflow-y-auto", "pe-1"], [1, "mt-4", "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "border-t", "border-slate-100", "pt-4"], ["aria-busy", "true", 1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], ["aria-busy", "true", 1, "grid", "grid-cols-[repeat(auto-fill,minmax(240px,1fr))]", "gap-5"], [1, "grid", "grid-cols-[80px_1fr_1fr_120px_100px_80px]", "gap-4", "bg-slate-50", "px-4", "py-3"], [1, "h-4", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "grid", "grid-cols-[80px_1fr_1fr_120px_100px_80px]", "items-center", "gap-4", "border-t", "border-slate-200", "px-4", "py-3"], [1, "h-12", "w-20", "animate-pulse", "rounded-lg", "bg-slate-200"], [1, "h-6", "w-11", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-8", "w-8", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "overflow-hidden", "rounded-2xl", "border", "border-slate-200"], [1, "h-44", "animate-pulse", "bg-slate-200"], [1, "space-y-3", "p-4"], [1, "h-4", "w-2/3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-3", "w-1/2", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "h-3", "animate-pulse", "rounded-full", "bg-slate-200"], [1, "min-w-[960px]", "w-full", "text-left", "text-sm"], [1, "sticky", "top-0", "z-10", "bg-slate-50", "text-slate-600"], [1, "px-4", "py-3"], [1, "border-t", "border-slate-200", "transition", "hover:bg-slate-50"], [1, "h-12", "w-20", "rounded-lg", "object-cover", 3, "src", "alt"], [1, "grid", "h-12", "w-20", "place-items-center", "rounded-lg", "bg-slate-100", "text-slate-400"], [1, "max-w-64", "px-4", "py-3", "font-semibold"], [1, "line-clamp-2"], ["dir", "rtl", 1, "max-w-64", "px-4", "py-3"], [1, "whitespace-nowrap", "px-4", "py-3", "text-slate-500"], [1, "flex", "items-center", "gap-2"], ["type", "button", "role", "switch", 1, "relative", "inline-flex", "h-6", "w-11", "cursor-pointer", "items-center", "rounded-full", "transition-colors", "duration-200", "focus:outline-none", "focus:ring-2", "focus:ring-primary/30", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], ["aria-hidden", "true", 1, "mdi", "mdi-loading", "mdi-spin", "mx-auto", "text-sm", "text-white"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200", 3, "translate-x-6", "translate-x-1"], [1, "text-xs", "font-semibold"], ["type", "button", 1, "grid", "h-8", "w-8", "cursor-pointer", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white"], ["aria-hidden", "true", 1, "mdi", "mdi-image-off-outline"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "shadow", "transition-transform", "duration-200"], ["type", "button", 1, "grid", "h-8", "w-8", "cursor-pointer", "place-items-center", "rounded-full", "border", "border-amber-300", "text-amber-600", "transition", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], ["aria-hidden", "true", 1, "mdi", "mdi-pencil-outline"], ["colspan", "6", 1, "p-8", "text-center", "text-slate-500"], [1, "flex", "overflow-hidden", "rounded-2xl", "border", "border-slate-200", "bg-white", "shadow-sm", "transition", "hover:-translate-y-0.5", "hover:shadow-md"], [1, "col-span-full", "py-10", "text-center", "text-slate-500"], [1, "flex", "w-full", "flex-col"], [1, "h-44", "w-full", "object-cover", 3, "src", "alt"], [1, "grid", "h-44", "place-items-center", "bg-slate-100", "text-slate-400"], [1, "flex", "flex-1", "flex-col", "p-4"], [1, "flex", "items-center", "justify-between", "gap-3"], [1, "text-xs", "text-slate-500"], [1, "rounded-full", "px-2.5", "py-1", "text-xs", "font-semibold"], [1, "mt-3", "line-clamp-2", "text-lg", "font-semibold"], ["dir", "rtl", 1, "mt-1", "line-clamp-1", "text-sm", "text-slate-500"], [1, "mt-3", "line-clamp-2", "text-sm", "leading-6", "text-slate-500"], [1, "mt-auto", "flex", "items-center", "justify-between", "gap-3", "pt-4"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1.5", "text-xs", "font-semibold", "text-amber-600", "transition", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white"], ["aria-hidden", "true", 1, "mdi", "mdi-image-off-outline", "text-4xl"], ["type", "button", 1, "rounded-full", "border", "border-amber-300", "px-3", "py-1.5", "text-xs", "font-semibold", "text-amber-600", "transition", "hover:border-amber-500", "hover:bg-amber-500", "hover:text-white", 3, "click"], [1, "text-sm", "font-medium", "text-slate-500"], [1, "flex", "flex-wrap", "items-center", "gap-2"], [1, "flex", "items-center", "gap-1", "text-sm", "text-slate-500"], [1, "rounded-full", "border", "border-slate-200", "bg-white", "px-2", "py-1", "text-sm", "text-slate-700", 3, "change", "value"], [3, "value"], [3, "pageChange", "compact", "currentPage", "totalPages"]], template: function BlogsList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, BlogsList_Conditional_1_Template, 3, 3, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "h2", 3);
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(6, BlogsList_Conditional_6_Template, 2, 1)(7, BlogsList_Conditional_7_Template, 26, 19, "div", 4)(8, BlogsList_Conditional_8_Template, 4, 1, "div", 5);
            i0.ɵɵconditionalCreate(9, BlogsList_Conditional_9_Template, 13, 11, "div", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.errorMessage ? 1 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "blogsData"));
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLoading ? 6 : ctx.viewMode === "table" ? 7 : 8);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(!ctx.isLoading ? 9 : -1);
        } }, dependencies: [PaginationOne, DatePipe, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BlogsList, [{
        type: Component,
        args: [{ selector: 'app-blogs-list', standalone: true, imports: [DatePipe, PaginationOne, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"rounded-3xl border border-slate-200 bg-white p-5\">\n  @if (errorMessage) {\n    <div class=\"mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600\">\n      {{ errorMessage | translate }}\n    </div>\n  }\n\n  <div class=\"mb-4 flex items-center justify-between\">\n    <h2 class=\"text-xl font-semibold\">{{ 'blogsData' | translate }}</h2>\n  </div>\n\n  @if (isLoading) {\n    @if (viewMode === 'table') {\n      <div class=\"overflow-hidden rounded-2xl border border-slate-200\" aria-busy=\"true\">\n        <div class=\"grid grid-cols-[80px_1fr_1fr_120px_100px_80px] gap-4 bg-slate-50 px-4 py-3\">\n          @for (column of [1, 2, 3, 4, 5, 6]; track column) {\n            <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\n          }\n        </div>\n        @for (row of [1, 2, 3, 4, 5]; track row) {\n          <div class=\"grid grid-cols-[80px_1fr_1fr_120px_100px_80px] items-center gap-4 border-t border-slate-200 px-4 py-3\">\n            <div class=\"h-12 w-20 animate-pulse rounded-lg bg-slate-200\"></div>\n            <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\n            <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\n            <div class=\"h-4 animate-pulse rounded-full bg-slate-200\"></div>\n            <div class=\"h-6 w-11 animate-pulse rounded-full bg-slate-200\"></div>\n            <div class=\"h-8 w-8 animate-pulse rounded-full bg-slate-200\"></div>\n          </div>\n        }\n      </div>\n    } @else {\n      <div class=\"grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5\" aria-busy=\"true\">\n        @for (card of [1, 2, 3, 4]; track card) {\n          <article class=\"overflow-hidden rounded-2xl border border-slate-200\">\n            <div class=\"h-44 animate-pulse bg-slate-200\"></div>\n            <div class=\"space-y-3 p-4\">\n              <div class=\"h-4 w-2/3 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-3 w-1/2 animate-pulse rounded-full bg-slate-200\"></div>\n              <div class=\"h-3 animate-pulse rounded-full bg-slate-200\"></div>\n            </div>\n          </article>\n        }\n      </div>\n    }\n  } @else if (viewMode === 'table') {\n    <div class=\"max-h-[70vh] overflow-auto rounded-2xl border border-slate-200\">\n      <table class=\"min-w-[960px] w-full text-left text-sm\">\n        <thead class=\"sticky top-0 z-10 bg-slate-50 text-slate-600\">\n          <tr>\n            <th class=\"px-4 py-3\">{{ 'image' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'englishTitle' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'arabicTitle' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'publishDate' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'status' | translate }}</th>\n            <th class=\"px-4 py-3\">{{ 'actions' | translate }}</th>\n          </tr>\n        </thead>\n        <tbody>\n          @for (blog of blogs; track blogId(blog) ?? $index) {\n            <tr class=\"border-t border-slate-200 transition hover:bg-slate-50\">\n              <td class=\"px-4 py-3\">\n                @if (imageUrl(blog); as image) {\n                  <img [src]=\"image\" [alt]=\"titleEng(blog)\" class=\"h-12 w-20 rounded-lg object-cover\" />\n                } @else {\n                  <div class=\"grid h-12 w-20 place-items-center rounded-lg bg-slate-100 text-slate-400\">\n                    <i class=\"mdi mdi-image-off-outline\" aria-hidden=\"true\"></i>\n                  </div>\n                }\n              </td>\n              <td class=\"max-w-64 px-4 py-3 font-semibold\">\n                <span class=\"line-clamp-2\">{{ titleEng(blog) }}</span>\n              </td>\n              <td class=\"max-w-64 px-4 py-3\" dir=\"rtl\">\n                <span class=\"line-clamp-2\">{{ titleAr(blog) }}</span>\n              </td>\n              <td class=\"whitespace-nowrap px-4 py-3 text-slate-500\">\n                {{ publishedAt(blog) | date: 'mediumDate' }}\n              </td>\n              <td class=\"px-4 py-3\">\n                <div class=\"flex items-center gap-2\">\n                  <button\n                    type=\"button\"\n                    role=\"switch\"\n                    [disabled]=\"statusUpdatingId !== null\"\n                    [attr.aria-checked]=\"isActive(blog)\"\n                    [attr.aria-label]=\"(isActive(blog) ? 'deactivate' : 'activate') | translate\"\n                    class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60\"\n                    [class.bg-emerald-500]=\"isActive(blog)\"\n                    [class.bg-slate-300]=\"!isActive(blog)\"\n                    (click)=\"toggleStatus(blog)\"\n                  >\n                    @if (statusUpdatingId === blogId(blog)) {\n                      <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\" aria-hidden=\"true\"></i>\n                    } @else {\n                      <span\n                        class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200\"\n                        [class.translate-x-6]=\"isActive(blog)\"\n                        [class.translate-x-1]=\"!isActive(blog)\"\n                      ></span>\n                    }\n                  </button>\n                  <span class=\"text-xs font-semibold\" [class.text-emerald-600]=\"isActive(blog)\" [class.text-slate-500]=\"!isActive(blog)\">\n                    {{ (isActive(blog) ? 'active' : 'inactive') | translate }}\n                  </span>\n                </div>\n              </td>\n              <td class=\"px-4 py-3\">\n                @if (!isActive(blog)) {\n                  <button\n                    type=\"button\"\n                    class=\"grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-amber-300 text-amber-600 transition hover:border-amber-500 hover:bg-amber-500 hover:text-white\"\n                    [attr.aria-label]=\"'editBlog' | translate\"\n                    [attr.title]=\"'editBlog' | translate\"\n                    (click)=\"editRequested.emit(blog)\"\n                  >\n                    <i class=\"mdi mdi-pencil-outline\" aria-hidden=\"true\"></i>\n                  </button>\n                }\n              </td>\n            </tr>\n          } @empty {\n            <tr>\n              <td colspan=\"6\" class=\"p-8 text-center text-slate-500\">{{ 'noBlogsCreated' | translate }}</td>\n            </tr>\n          }\n        </tbody>\n      </table>\n    </div>\n  } @else {\n    <div class=\"grid max-h-[70vh] grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 overflow-y-auto pe-1\">\n      @for (blog of blogs; track blogId(blog) ?? $index) {\n        <article class=\"flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md\">\n          <div class=\"flex w-full flex-col\">\n            @if (imageUrl(blog); as image) {\n              <img [src]=\"image\" [alt]=\"titleEng(blog)\" class=\"h-44 w-full object-cover\" />\n            } @else {\n              <div class=\"grid h-44 place-items-center bg-slate-100 text-slate-400\">\n                <i class=\"mdi mdi-image-off-outline text-4xl\" aria-hidden=\"true\"></i>\n              </div>\n            }\n\n            <div class=\"flex flex-1 flex-col p-4\">\n              <div class=\"flex items-center justify-between gap-3\">\n                <span class=\"text-xs text-slate-500\">{{ publishedAt(blog) | date: 'mediumDate' }}</span>\n                <span\n                  class=\"rounded-full px-2.5 py-1 text-xs font-semibold\"\n                  [class.bg-emerald-100]=\"isActive(blog)\"\n                  [class.text-emerald-700]=\"isActive(blog)\"\n                  [class.bg-slate-100]=\"!isActive(blog)\"\n                  [class.text-slate-600]=\"!isActive(blog)\"\n                >\n                  {{ (isActive(blog) ? 'active' : 'inactive') | translate }}\n                </span>\n              </div>\n\n              <h3 class=\"mt-3 line-clamp-2 text-lg font-semibold\">{{ titleEng(blog) }}</h3>\n              <p dir=\"rtl\" class=\"mt-1 line-clamp-1 text-sm text-slate-500\">{{ titleAr(blog) }}</p>\n              @if (summaryEng(blog)) {\n                <p class=\"mt-3 line-clamp-2 text-sm leading-6 text-slate-500\">{{ summaryEng(blog) }}</p>\n              }\n\n              <div class=\"mt-auto flex items-center justify-between gap-3 pt-4\">\n                @if (!isActive(blog)) {\n                  <button\n                    type=\"button\"\n                    class=\"rounded-full border border-amber-300 px-3 py-1.5 text-xs font-semibold text-amber-600 transition hover:border-amber-500 hover:bg-amber-500 hover:text-white\"\n                    (click)=\"editRequested.emit(blog)\"\n                  >\n                    {{ 'edit' | translate }}\n                  </button>\n                } @else {\n                  <span></span>\n                }\n                <button\n                  type=\"button\"\n                  role=\"switch\"\n                  [disabled]=\"statusUpdatingId !== null\"\n                  [attr.aria-checked]=\"isActive(blog)\"\n                  [attr.aria-label]=\"(isActive(blog) ? 'deactivate' : 'activate') | translate\"\n                  class=\"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60\"\n                  [class.bg-emerald-500]=\"isActive(blog)\"\n                  [class.bg-slate-300]=\"!isActive(blog)\"\n                  (click)=\"toggleStatus(blog)\"\n                >\n                  @if (statusUpdatingId === blogId(blog)) {\n                    <i class=\"mdi mdi-loading mdi-spin mx-auto text-sm text-white\" aria-hidden=\"true\"></i>\n                  } @else {\n                    <span\n                      class=\"inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200\"\n                      [class.translate-x-6]=\"isActive(blog)\"\n                      [class.translate-x-1]=\"!isActive(blog)\"\n                    ></span>\n                  }\n                </button>\n              </div>\n            </div>\n          </div>\n        </article>\n      } @empty {\n        <p class=\"col-span-full py-10 text-center text-slate-500\">{{ 'noBlogsCreated' | translate }}</p>\n      }\n    </div>\n  }\n\n  @if (!isLoading) {\n    <div class=\"mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4\">\n      <span class=\"text-sm font-medium text-slate-500\">\n        {{ 'totalRecords' | translate }}: {{ paginationInfo.totalCount }}\n      </span>\n      <div class=\"flex flex-wrap items-center gap-2\">\n        <label class=\"flex items-center gap-1 text-sm text-slate-500\">\n          <span>{{ 'pageSize' | translate }}</span>\n          <select\n            class=\"rounded-full border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700\"\n            [value]=\"paginationInfo.pageSize\"\n            (change)=\"onPageSizeChange($event)\"\n          >\n            @for (size of pageSizeOptions; track size) {\n              <option [value]=\"size\">{{ size }}</option>\n            }\n          </select>\n        </label>\n        <app-pagination-one\n          [compact]=\"true\"\n          [currentPage]=\"paginationInfo.page\"\n          [totalPages]=\"paginationInfo.totalPages\"\n          (pageChange)=\"onPageChange($event)\"\n        />\n      </div>\n    </div>\n  }\n</div>\n" }]
    }], null, { viewMode: [{
            type: Input
        }], refreshToken: [{
            type: Input
        }], editRequested: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BlogsList, { className: "BlogsList", filePath: "app/features/configurations/blogs/blogs-list/blogs-list.ts", lineNumber: 37 }); })();
