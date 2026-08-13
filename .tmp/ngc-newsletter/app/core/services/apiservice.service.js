import { firstValueFrom } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpContext, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { IS_PUBLIC_API_REQUEST } from "../interceptors/public-api-context";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../features/user/_services/auth.service";
export class ApiService {
    http;
    _authService;
    token = '';
    constructor(http, _authService) {
        this.http = http;
        this._authService = _authService;
    }
    getToken() {
        return this._authService.getToken();
    }
    getUnauthntecated(url) {
        return this.http.get(environment.baseUrl + url, {
            context: new HttpContext().set(IS_PUBLIC_API_REQUEST, true),
        });
    }
    postUnauthenticated(url, data) {
        return this.http.post(environment.baseUrl + url, data, {
            context: new HttpContext().set(IS_PUBLIC_API_REQUEST, true),
        });
    }
    get(url) {
        const bearer = 'Bearer ' + this.getToken(); // this.anyService.getToken();
        return this.http.get(environment.baseUrl + url, {
            headers: new HttpHeaders({
                Authorization: bearer
            })
        });
    }
    async getAsync(url) {
        const bearer = 'Bearer ' + this.getToken();
        const headers = new HttpHeaders({ Authorization: bearer });
        return await firstValueFrom(this.http.get(environment.baseUrl + url, { headers }));
    }
    uploadImage(url, data) {
        return this.http.post(environment.baseUrl + url, data, { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
            reportProgress: true, observe: 'events' });
    }
    getById(url, id) {
        return this.http.get(`${environment.baseUrl}${url}/${id}`, { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });
    }
    ////overloading
    post(url, data, token) {
        if (!token)
            token = this.getToken();
        return this.http.post(environment.baseUrl + url, data, { headers: new HttpHeaders({ Authorization: "Bearer " + token }) });
    }
    // add
    put(url, data) {
        return this.http.put(environment.baseUrl + url, data, { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });
    }
    patch(url, data) {
        return this.http.patch(environment.baseUrl + url, data, {
            headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
        });
    }
    patchFile(url, data) {
        return this.http.patch(environment.baseUrl + url, data, {
            headers: new HttpHeaders({
                Authorization: "Bearer " + this.getToken(),
                Accept: "application/pdf, application/json",
            }),
            responseType: 'blob',
        });
    }
    getFile(url) {
        return this.http.get(environment.baseUrl + url, {
            headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken(), Accept: "application/pdf" }),
            responseType: 'blob',
        });
    }
    delete(url, id) {
        return this.http.delete(environment.baseUrl + url + "/" + id, { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });
    }
    deleteRequest(url) {
        return this.http.delete(environment.baseUrl + url, {
            headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
        });
    }
    // add
    uploadFile(url, data) {
        return this.http.post(environment.baseUrl + url, data, {
            headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
            reportProgress: true, observe: 'events'
        });
    }
    downloadFile(Url, fileName, body) {
        return this.http.post(environment.baseUrl + Url + fileName, body, {
            responseType: "blob",
            headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() })
        });
    }
    static ɵfac = function ApiService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || ApiService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AuthService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.HttpClient }, { type: i2.AuthService }], null); })();
