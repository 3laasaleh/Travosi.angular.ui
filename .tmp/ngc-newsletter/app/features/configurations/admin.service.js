import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../user/_services/auth.service";
export class AdminService {
    http;
    authService;
    constructor(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    getHeaders() {
        return new HttpHeaders({
            Authorization: `Bearer ${this.authService.getToken()}`,
        });
    }
    getDestinations(page = 1, pageSize = 20) {
        const params = new HttpParams().set('page', page).set('pageSize', pageSize);
        return this.http.get(`${environment.baseUrl}Destinations/GetAll`, {
            headers: this.getHeaders(),
            params,
        });
    }
    createDestination(payload) {
        return this.http.post(`${environment.baseUrl}destinations`, payload, {
            headers: this.getHeaders(),
        });
    }
    updateDestination(payload) {
        return this.http.put(`${environment.baseUrl}destinations`, payload, {
            headers: this.getHeaders(),
        });
    }
    getTours(page = 1, pageSize = 100) {
        const params = new HttpParams().set('page', page).set('pageSize', pageSize);
        return this.http.get(`${environment.baseUrl}Tours/GetAll`, {
            headers: this.getHeaders(),
            params,
        });
    }
    cangeStatus(id) {
        return this.http.patch(`${environment.baseUrl}destinations/${id}/ChangeStatus`, {}, {
            headers: this.getHeaders(),
        });
    }
    deleteDestinationImage(imageId) {
        return this.http.delete(`${environment.baseUrl}destinations/deleteImage/${imageId}`, {
            headers: this.getHeaders(),
        });
    }
    deleteTourImage(imageId) {
        return this.http.delete(`${environment.baseUrl}Tours/deleteImage/${imageId}`, {
            headers: this.getHeaders(),
        });
    }
    createTour(payload) {
        return this.http.post(`${environment.baseUrl}Tours`, payload, {
            headers: this.getHeaders(),
        });
    }
    addTourImages(payload) {
        return this.http.post(`${environment.baseUrl}Tours/AddImages`, payload, {
            headers: this.getHeaders(),
        });
    }
    getBlogs(page = 1, pageSize = 20) {
        const params = new HttpParams().set('page', page).set('pageSize', pageSize);
        return this.http.get(`${environment.baseUrl}Blogs/GetAll`, { headers: this.getHeaders(), params });
    }
    createBlog(payload) {
        return this.http.post(`${environment.baseUrl}Blogs`, payload, { headers: this.getHeaders() });
    }
    updateBlog(payload) {
        return this.http.put(`${environment.baseUrl}Blogs`, payload, { headers: this.getHeaders() });
    }
    changeBlogStatus(id) {
        return this.http.patch(`${environment.baseUrl}Blogs/${id}/ChangeStatus`, {}, { headers: this.getHeaders() });
    }
    deleteBlogImage(imageId) {
        return this.http.delete(`${environment.baseUrl}Blogs/deleteImage/${imageId}`, { headers: this.getHeaders() });
    }
    setTourCoverImage(tourId, imageId) {
        return this.http.patch(`${environment.baseUrl}Tours/CoverImage`, {
            TourId: tourId,
            ImageId: imageId,
        }, {
            headers: this.getHeaders(),
        });
    }
    getCitiesByDestination(destinationId, page = 1, pageSize = 100) {
        const params = new HttpParams()
            .set('destinationId', destinationId)
            .set('page', page)
            .set('pageSize', pageSize);
        return this.http.get(`${environment.baseUrl}Cities/GetAll`, {
            headers: this.getHeaders(),
            params,
        });
    }
    addPackageImages(payload) {
        return this.http.post(`${environment.baseUrl}Packages/AddImages`, payload, {
            headers: this.getHeaders(),
        });
    }
    createPackage(payload) {
        return this.http.post(`${environment.baseUrl}Packages`, payload, {
            headers: this.getHeaders(),
        });
    }
    updatePackage(payload) {
        return this.http.put(`${environment.baseUrl}Packages`, payload, {
            headers: this.getHeaders(),
        });
    }
    addPackageItinerary(payload) {
        return this.http.post(`${environment.baseUrl}Packages/AddItinerary`, payload, {
            headers: this.getHeaders(),
        });
    }
    changePackageStatus(id, isActive) {
        return this.http.patch(`${environment.baseUrl}Packages/ChangeStatus`, {
            Id: id,
            IsActive: isActive,
        }, {
            headers: this.getHeaders(),
        });
    }
    deletePackageImage(imageId) {
        return this.http.delete(`${environment.baseUrl}Packages/deleteImage/${imageId}`, {
            headers: this.getHeaders(),
        });
    }
    addTourItinerary(payload) {
        return this.http.post(`${environment.baseUrl}Tours/AddItinerary`, payload, {
            headers: this.getHeaders(),
        });
    }
    changeTourStatus(id, isActive) {
        return this.http.patch(`${environment.baseUrl}Tours/ChangeStatus`, {
            Id: id,
            IsActive: isActive,
        }, {
            headers: this.getHeaders(),
        });
    }
    updateTour(payload) {
        return this.http.put(`${environment.baseUrl}Tours`, payload, {
            headers: this.getHeaders(),
        });
    }
    static ɵfac = function AdminService_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || AdminService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.AuthService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminService, factory: AdminService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: i1.HttpClient }, { type: i2.AuthService }], null); })();
