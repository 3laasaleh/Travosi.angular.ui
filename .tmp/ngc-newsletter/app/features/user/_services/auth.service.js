import { environment } from '../../../../environments/environment';
import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { RoleEnum } from '../../../core/enums/role.enum';
import * as i0 from "@angular/core";
import * as i1 from "@auth0/angular-jwt";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common/http";
import * as i4 from "ngx-cookie-service";
export class AuthService {
    jwtHelper;
    _router;
    http;
    _coockiesService;
    loginErrorStatusSubject = new BehaviorSubject('');
    currentUser = signal(null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "currentUser" }] : /* istanbul ignore next */ []));
    isLoggedIn = computed(() => this.currentUser() !== null, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoggedIn" }] : /* istanbul ignore next */ []));
    isAdmin = computed(() => this.currentUser()?.role === RoleEnum.Admin, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isAdmin" }] : /* istanbul ignore next */ []));
    isAgent = computed(() => this.currentUser()?.role === RoleEnum.Agent, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isAgent" }] : /* istanbul ignore next */ []));
    isCustomer = computed(() => this.currentUser()?.role === RoleEnum.Customer, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isCustomer" }] : /* istanbul ignore next */ []));
    fullName = computed(() => {
        const user = this.currentUser();
        if (!user)
            return '';
        return `${user.firstName} ${user.lastName}`;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "fullName" }] : /* istanbul ignore next */ []));
    profileImageUrl = computed(() => {
        const value = this.currentUser()?.profileImageUrl;
        if (!value)
            return null;
        if (/^(blob:|data:|https?:\/\/)/i.test(value))
            return value;
        const relativePath = String(value)
            .replace(/^\/+/, '')
            .replace(/^images\//i, '');
        return `${environment.imageUrl.replace(/\/+$/, '')}/${relativePath}`;
    }, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "profileImageUrl" }] : /* istanbul ignore next */ []));
    constructor(jwtHelper, _router, http, _coockiesService) {
        this.jwtHelper = jwtHelper;
        this._router = _router;
        this.http = http;
        this._coockiesService = _coockiesService;
        this.initializeUser();
    }
    initializeUser() {
        const user = this._coockiesService.get('userSignedIn');
        if (user) {
            this.currentUser.set(JSON.parse(user));
        }
    }
    getCurentUser() {
        if (this.currentUser()) {
            return this.currentUser();
        }
        let userSignedInString = this._coockiesService.get('userSignedIn');
        if (userSignedInString) {
            let userSignedIn = JSON.parse(userSignedInString);
            this.currentUser.set(userSignedIn);
            return userSignedIn;
        }
        return null;
    }
    getCurrentUserRole() {
        let r = this.getCurentUser()?.role;
        switch (r) {
            case RoleEnum.Admin:
                return 'Admin';
            case RoleEnum.Agent:
                return 'Agent';
            case RoleEnum.Customer:
                return 'Customer';
            default:
                return 'Customer';
        }
    }
    login(user, returnUrl = null) {
        return this.http.post(environment.baseUrl + 'Account/login', user).pipe(map((res) => {
            if (res.isSuccess) {
                const { token, ...userData } = res.data;
                this._coockiesService.set('userSignedIn', JSON.stringify(userData), 1, '/');
                this._coockiesService.set('token', token, 1, '/');
                this.currentUser.set(userData);
                const isAdminOrAgent = userData.role === RoleEnum.Admin
                    || userData.role === RoleEnum.Agent;
                if (isAdminOrAgent)
                    this._router.navigate(['/configurations']);
                else if (returnUrl && returnUrl.startsWith('/'))
                    this._router.navigateByUrl(returnUrl);
                else
                    this._router.navigate(['/home']);
            }
            return res;
        }));
    }
    registeration(user) {
        return this.http.post(environment.baseUrl + 'Account/Registeration', user);
    }
    changePassword(data) {
        return this.http.put(environment.baseUrl + 'Account/ChangePassword/', data);
    }
    logout() {
        this._coockiesService.deleteAll('/');
        this.currentUser.set(null);
        this._router.navigate(['home']);
    }
    isTokenExpired() {
        const token = this.getToken();
        if (token === 'undefined' || token === undefined || token === '')
            return true;
        let res = this.jwtHelper.isTokenExpired(token);
        return res;
    }
    getToken() {
        return this._coockiesService.get('token') || '';
    }
    updateProfileImage(profileImageUrl) {
        const user = this.getCurentUser();
        if (!user)
            return;
        const updatedUser = { ...user, profileImageUrl };
        this.currentUser.set(updatedUser);
        this._coockiesService.set('userSignedIn', JSON.stringify(updatedUser), 1, '/');
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.JwtHelperService), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i3.HttpClient), i0.ɵɵinject(i4.CookieService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.JwtHelperService }, { type: i2.Router }, { type: i3.HttpClient }, { type: i4.CookieService }], null); })();
