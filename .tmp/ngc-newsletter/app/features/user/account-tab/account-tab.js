import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import feather from 'feather-icons';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../../../core/services/apiservice.service';
import { AuthService } from '../_services/auth.service';
import * as i0 from "@angular/core";
function AccountTab_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 31)(2, "span", 32);
    i0.ɵɵelement(3, "span", 33)(4, "i", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 35);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "translate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 36);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "translate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 2, ctx_r1.isRemovingImage ? "removingProfileImage" : "uploadingProfileImage"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 4, "pleaseWaitForRequest"));
} }
function AccountTab_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 7);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r1.imageSrc, i0.ɵɵsanitizeUrl)("alt", ctx_r1.userName);
} }
function AccountTab_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", ctx_r1.userName);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.userInitials, " ");
} }
function AccountTab_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function AccountTab_Conditional_26_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.removeProfileImage()); });
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r1.isImageRequestActive);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(3, 2, "removeImage"), " ");
} }
function AccountTab_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 19);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "translate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.imageValidationMessage));
} }
export class AccountTab {
    authService = inject(AuthService);
    apiService = inject(ApiService);
    router = inject(Router);
    translate = inject(TranslateService);
    cdr = inject(ChangeDetectorRef);
    maxImageBytes = 5 * 1024 * 1024;
    allowedImageTypes = new Set([
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ]);
    currentUrl = '';
    userName = '';
    userEmail = '';
    isUploadingImage = false;
    isRemovingImage = false;
    imageValidationMessage = '';
    previewUrl = null;
    constructor() {
        this.currentUrl = this.router.url.split('?')[0];
        const user = this.authService.getCurentUser();
        if (!user) {
            this.router.navigate(['login']);
            return;
        }
        this.userName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.userName || '';
        this.userEmail = user.email ?? '';
    }
    get imageSrc() {
        return this.previewUrl ?? this.authService.profileImageUrl();
    }
    get hasProfileImage() {
        return !!this.authService.getCurentUser()?.profileImageUrl;
    }
    get userInitials() {
        return this.userName
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0))
            .join('')
            .toUpperCase() || 'U';
    }
    get isImageRequestActive() {
        return this.isUploadingImage || this.isRemovingImage;
    }
    ngAfterViewInit() {
        feather.replace();
    }
    ngOnDestroy() {
        if (this.previewUrl)
            URL.revokeObjectURL(this.previewUrl);
        this.previewUrl = null;
    }
    loadFile(event) {
        const input = event.target;
        const file = input.files?.[0];
        input.value = '';
        if (!file || this.isImageRequestActive)
            return;
        this.imageValidationMessage = '';
        if (!this.allowedImageTypes.has(file.type)) {
            this.imageValidationMessage = 'invalidImageType';
            return;
        }
        if (file.size > this.maxImageBytes) {
            this.imageValidationMessage = 'imageTooLarge';
            return;
        }
        this.revokePreview();
        this.previewUrl = URL.createObjectURL(file);
        this.isUploadingImage = true;
        this.cdr.markForCheck();
        const payload = new FormData();
        payload.append('image', file, file.name);
        this.apiService.post('Users/ProfileImage', payload).pipe(catchError((error) => {
            this.showToast('error', error?.error?.message || 'profileImageUploadError');
            return of(null);
        }), finalize(() => {
            this.isUploadingImage = false;
            this.cdr.markForCheck();
        })).subscribe((response) => {
            if (response === null) {
                this.revokePreview();
                return;
            }
            if (response?.isSuccess === false) {
                this.showToast('error', response?.message || 'profileImageUploadError');
                this.revokePreview();
                return;
            }
            const imageUrl = String(response?.data ?? '').trim();
            if (!imageUrl) {
                this.showToast('error', 'profileImageUploadError');
                this.revokePreview();
                return;
            }
            this.authService.updateProfileImage(imageUrl);
            this.revokePreview();
            this.showToast('success', response?.message || 'profileImageUpdated');
        });
    }
    removeProfileImage() {
        if (!this.hasProfileImage || this.isImageRequestActive)
            return;
        Swal.fire({
            title: this.translate.instant('confirmRemoveProfileImage'),
            text: this.translate.instant('removeProfileImageWarning'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('removeImage'),
            cancelButtonText: this.translate.instant('cancel'),
            confirmButtonColor: '#e11d48',
            reverseButtons: true,
        }).then((result) => {
            if (!result.isConfirmed)
                return;
            this.isRemovingImage = true;
            this.cdr.markForCheck();
            this.apiService.deleteRequest('Users/ProfileImage').pipe(catchError((error) => {
                this.showToast('error', error?.error?.message || 'profileImageRemoveError');
                return of(null);
            }), finalize(() => {
                this.isRemovingImage = false;
                this.cdr.markForCheck();
            })).subscribe((response) => {
                if (response === null)
                    return;
                if (response?.isSuccess === false) {
                    this.showToast('error', response?.message || 'profileImageRemoveError');
                    return;
                }
                this.authService.updateProfileImage(null);
                this.showToast('success', response?.message || 'profileImageRemoved');
            });
        });
    }
    onLogoutClicked() {
        Swal.fire({
            title: this.translate.instant('confirmSignOut'),
            text: this.translate.instant('confirmSignOutQuestion'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: this.translate.instant('signOut'),
            confirmButtonColor: '#fb2c36',
            cancelButtonText: this.translate.instant('cancel'),
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed)
                this.authService.logout();
        });
    }
    revokePreview() {
        if (this.previewUrl)
            URL.revokeObjectURL(this.previewUrl);
        this.previewUrl = null;
        this.cdr.markForCheck();
    }
    showToast(icon, message) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon,
            title: this.translate.instant(message),
            showConfirmButton: false,
            timer: icon === 'success' ? 2600 : 4200,
            timerProgressBar: true,
        });
    }
    static ɵfac = function AccountTab_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountTab)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountTab, selectors: [["app-account-tab"]], decls: 51, vars: 33, consts: [["profileImageInput", ""], ["role", "status", "aria-live", "assertive", 1, "fixed", "inset-0", "z-[9999]", "grid", "place-items-center", "bg-slate-950/55", "px-4", "backdrop-blur-sm"], [1, "relative", "md:-mt-48", "-mt-32"], [1, "rounded-md", "bg-white", "p-6", "shadow", "dark:shadow-gray-800"], [1, "mb-5", "text-center"], ["id", "pro-img", "name", "profile-image", "type", "file", "accept", "image/jpeg,image/png,image/webp,image/gif", 1, "hidden", 3, "change"], [1, "relative", "mx-auto", "h-28", "w-28"], ["id", "profile-image", 1, "h-28", "w-28", "rounded-full", "object-cover", "shadow", "ring-4", "ring-slate-50", "dark:shadow-gray-800", "dark:ring-slate-800", 3, "src", "alt"], ["role", "img", 1, "grid", "h-28", "w-28", "place-items-center", "rounded-full", "bg-gradient-to-br", "from-primary", "to-sky-500", "text-3xl", "font-bold", "text-white", "shadow", "ring-4", "ring-slate-50", "dark:ring-slate-800"], ["type", "button", 1, "absolute", "bottom-0", "end-0", "grid", "h-9", "w-9", "place-items-center", "rounded-full", "border-2", "border-white", "bg-primary", "text-white", "shadow-lg", "transition", "hover:brightness-95", "disabled:cursor-not-allowed", "disabled:opacity-60", "dark:border-slate-900", 3, "click", "disabled", "title"], [1, "mdi", "mdi-camera-outline", "text-lg"], [1, "mt-4"], [1, "text-lg", "font-semibold"], [1, "text-slate-400"], [1, "mx-auto", "mt-2", "max-w-56", "text-xs", "leading-5", "text-slate-400"], [1, "mt-4", "flex", "flex-wrap", "justify-center", "gap-2"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "rounded-full", "bg-primary", "px-4", "py-2", "text-xs", "font-semibold", "text-white", "disabled:cursor-not-allowed", "disabled:opacity-60", 3, "click", "disabled"], [1, "mdi", "mdi-camera-outline"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "rounded-full", "border", "border-rose-200", "px-4", "py-2", "text-xs", "font-semibold", "text-rose-600", "transition", "hover:bg-rose-50", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-transparent", 3, "disabled"], ["role", "alert", 1, "mx-auto", "mt-2", "max-w-72", "text-xs", "font-medium", "text-red-600"], [1, "border-t", "border-gray-100", "dark:border-gray-700"], ["id", "navmenu-nav", 1, "sidebar-nav", "mb-0", "list-none", "pb-0"], [1, "navbar-item", "account-menu", "ms-0"], ["routerLink", "/user-booking", 1, "navbar-link", "flex", "items-center", "rounded", "py-2", "text-slate-400"], [1, "me-2", "mb-0"], ["data-feather", "airplay", 1, "size-4"], [1, "mb-0", "font-medium"], ["routerLink", "/user-setting", 1, "navbar-link", "flex", "items-center", "rounded", "py-2", "text-slate-400"], ["data-feather", "settings", 1, "size-4"], ["type", "button", 1, "navbar-link", "flex", "w-full", "items-center", "rounded", "py-2", "text-slate-400", 3, "click"], ["data-feather", "log-out", 1, "size-4"], [1, "flex", "min-w-64", "flex-col", "items-center", "rounded-3xl", "border", "border-white/15", "bg-white", "px-8", "py-7", "text-center", "shadow-2xl"], [1, "relative", "grid", "h-16", "w-16", "place-items-center"], [1, "absolute", "inset-0", "animate-spin", "rounded-full", "border-4", "border-slate-200", "border-t-primary"], [1, "mdi", "mdi-account-circle-outline", "text-2xl", "text-primary"], [1, "mt-5", "font-semibold", "text-slate-800"], [1, "mt-1", "text-xs", "text-slate-500"], ["type", "button", 1, "inline-flex", "items-center", "gap-1.5", "rounded-full", "border", "border-rose-200", "px-4", "py-2", "text-xs", "font-semibold", "text-rose-600", "transition", "hover:bg-rose-50", "disabled:cursor-not-allowed", "disabled:opacity-60", "disabled:hover:bg-transparent", 3, "click", "disabled"], [1, "mdi", "mdi-delete-outline"]], template: function AccountTab_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵconditionalCreate(0, AccountTab_Conditional_0_Template, 11, 6, "div", 1);
            i0.ɵɵelementStart(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "input", 5, 0);
            i0.ɵɵlistener("change", function AccountTab_Template_input_change_4_listener($event) { return ctx.loadFile($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 6);
            i0.ɵɵconditionalCreate(7, AccountTab_Conditional_7_Template, 1, 2, "img", 7)(8, AccountTab_Conditional_8_Template, 2, 2, "div", 8);
            i0.ɵɵelementStart(9, "button", 9);
            i0.ɵɵpipe(10, "translate");
            i0.ɵɵpipe(11, "translate");
            i0.ɵɵlistener("click", function AccountTab_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); const profileImageInput_r3 = i0.ɵɵreference(5); return i0.ɵɵresetView(profileImageInput_r3.click()); });
            i0.ɵɵelement(12, "i", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 11)(14, "h5", 12);
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "p", 13);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "p", 14);
            i0.ɵɵtext(19);
            i0.ɵɵpipe(20, "translate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 15)(22, "button", 16);
            i0.ɵɵlistener("click", function AccountTab_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r1); const profileImageInput_r3 = i0.ɵɵreference(5); return i0.ɵɵresetView(profileImageInput_r3.click()); });
            i0.ɵɵelement(23, "i", 17);
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "translate");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(26, AccountTab_Conditional_26_Template, 4, 4, "button", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(27, AccountTab_Conditional_27_Template, 3, 3, "p", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 20)(29, "ul", 21)(30, "li", 22)(31, "a", 23)(32, "span", 24);
            i0.ɵɵelement(33, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "h6", 26);
            i0.ɵɵtext(35);
            i0.ɵɵpipe(36, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "li", 22)(38, "a", 27)(39, "span", 24);
            i0.ɵɵelement(40, "i", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "h6", 26);
            i0.ɵɵtext(42);
            i0.ɵɵpipe(43, "translate");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(44, "li", 22)(45, "button", 29);
            i0.ɵɵlistener("click", function AccountTab_Template_button_click_45_listener() { return ctx.onLogoutClicked(); });
            i0.ɵɵelementStart(46, "span", 24);
            i0.ɵɵelement(47, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "h6", 26);
            i0.ɵɵtext(49);
            i0.ɵɵpipe(50, "translate");
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.isImageRequestActive ? 0 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵconditional(ctx.imageSrc ? 7 : 8);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isImageRequestActive)("title", i0.ɵɵpipeBind1(10, 19, ctx.hasProfileImage ? "changeProfileImage" : "addProfileImage"));
            i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(11, 21, ctx.hasProfileImage ? "changeProfileImage" : "addProfileImage"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.userName);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.userEmail);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 23, "profileImageHint"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.isImageRequestActive);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(25, 25, ctx.hasProfileImage ? "changeProfileImage" : "addProfileImage"), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.hasProfileImage ? 26 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.imageValidationMessage ? 27 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.currentUrl == "/user-booking");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 27, "myBookings"));
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentUrl == "/user-setting");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(43, 29, "settings"));
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(50, 31, "signOut"));
        } }, dependencies: [RouterLink, TranslatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountTab, [{
        type: Component,
        args: [{ selector: 'app-account-tab', imports: [RouterLink, TranslatePipe], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (isImageRequestActive) {\n  <div class=\"fixed inset-0 z-[9999] grid place-items-center bg-slate-950/55 px-4 backdrop-blur-sm\" role=\"status\" aria-live=\"assertive\">\n    <div class=\"flex min-w-64 flex-col items-center rounded-3xl border border-white/15 bg-white px-8 py-7 text-center shadow-2xl\">\n      <span class=\"relative grid h-16 w-16 place-items-center\">\n        <span class=\"absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-primary\"></span>\n        <i class=\"mdi mdi-account-circle-outline text-2xl text-primary\"></i>\n      </span>\n      <p class=\"mt-5 font-semibold text-slate-800\">{{ (isRemovingImage ? 'removingProfileImage' : 'uploadingProfileImage') | translate }}</p>\n      <p class=\"mt-1 text-xs text-slate-500\">{{ 'pleaseWaitForRequest' | translate }}</p>\n    </div>\n  </div>\n}\n\n<div class=\"relative md:-mt-48 -mt-32\">\n  <div class=\"rounded-md bg-white p-6 shadow  dark:shadow-gray-800\">\n    <div class=\"mb-5 text-center\">\n      <input #profileImageInput id=\"pro-img\" name=\"profile-image\" type=\"file\" accept=\"image/jpeg,image/png,image/webp,image/gif\" class=\"hidden\" (change)=\"loadFile($event)\" />\n\n      <div class=\"relative mx-auto h-28 w-28\">\n        @if (imageSrc) {\n          <img [src]=\"imageSrc\" class=\"h-28 w-28 rounded-full object-cover shadow ring-4 ring-slate-50 dark:shadow-gray-800 dark:ring-slate-800\" id=\"profile-image\" [alt]=\"userName\" />\n        } @else {\n          <div class=\"grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-primary to-sky-500 text-3xl font-bold text-white shadow ring-4 ring-slate-50 dark:ring-slate-800\" role=\"img\" [attr.aria-label]=\"userName\">\n            {{ userInitials }}\n          </div>\n        }\n        <button type=\"button\" [disabled]=\"isImageRequestActive\" (click)=\"profileImageInput.click()\"\n          class=\"absolute bottom-0 end-0 grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-primary text-white shadow-lg transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-900\"\n          [attr.aria-label]=\"(hasProfileImage ? 'changeProfileImage' : 'addProfileImage') | translate\"\n          [title]=\"(hasProfileImage ? 'changeProfileImage' : 'addProfileImage') | translate\">\n          <i class=\"mdi mdi-camera-outline text-lg\"></i>\n        </button>\n      </div>\n\n      <div class=\"mt-4\">\n        <h5 class=\"text-lg font-semibold\">{{ userName }}</h5>\n        <p class=\"text-slate-400\">{{ userEmail }}</p>\n        <p class=\"mx-auto mt-2 max-w-56 text-xs leading-5 text-slate-400\">{{ 'profileImageHint' | translate }}</p>\n      </div>\n\n      <div class=\"mt-4 flex flex-wrap justify-center gap-2\">\n        <button type=\"button\" [disabled]=\"isImageRequestActive\" (click)=\"profileImageInput.click()\"\n          class=\"inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60\">\n          <i class=\"mdi mdi-camera-outline\"></i>\n          {{ (hasProfileImage ? 'changeProfileImage' : 'addProfileImage') | translate }}\n        </button>\n        @if (hasProfileImage) {\n          <button type=\"button\" [disabled]=\"isImageRequestActive\" (click)=\"removeProfileImage()\"\n            class=\"inline-flex items-center gap-1.5 rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent\">\n            <i class=\"mdi mdi-delete-outline\"></i>{{ 'removeImage' | translate }}\n          </button>\n        }\n      </div>\n      @if (imageValidationMessage) {\n        <p class=\"mx-auto mt-2 max-w-72 text-xs font-medium text-red-600\" role=\"alert\">{{ imageValidationMessage | translate }}</p>\n      }\n    </div>\n\n    <div class=\"border-t border-gray-100 dark:border-gray-700\">\n      <ul class=\"sidebar-nav mb-0 list-none pb-0\" id=\"navmenu-nav\">\n        <li class=\"navbar-item account-menu ms-0\" [class.active]=\"currentUrl == '/user-booking'\">\n          <a routerLink=\"/user-booking\" class=\"navbar-link flex items-center rounded py-2 text-slate-400\">\n            <span class=\"me-2 mb-0\"><i data-feather=\"airplay\" class=\"size-4\"></i></span>\n            <h6 class=\"mb-0 font-medium\">{{ 'myBookings' | translate }}</h6>\n          </a>\n        </li>\n        <li class=\"navbar-item account-menu ms-0\" [class.active]=\"currentUrl == '/user-setting'\">\n          <a routerLink=\"/user-setting\" class=\"navbar-link flex items-center rounded py-2 text-slate-400\">\n            <span class=\"me-2 mb-0\"><i data-feather=\"settings\" class=\"size-4\"></i></span>\n            <h6 class=\"mb-0 font-medium\">{{ 'settings' | translate }}</h6>\n          </a>\n        </li>\n        <li class=\"navbar-item account-menu ms-0\">\n          <button type=\"button\" (click)=\"onLogoutClicked()\" class=\"navbar-link flex w-full items-center rounded py-2 text-slate-400\">\n            <span class=\"me-2 mb-0\"><i data-feather=\"log-out\" class=\"size-4\"></i></span>\n            <h6 class=\"mb-0 font-medium\">{{ 'signOut' | translate }}</h6>\n          </button>\n        </li>\n      </ul>\n    </div>\n  </div>\n</div>\n" }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountTab, { className: "AccountTab", filePath: "app/features/user/account-tab/account-tab.ts", lineNumber: 23 }); })();
