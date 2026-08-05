import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../user/_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  getDestinations(page = 1, pageSize = 20): Observable<any> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get(`${environment.baseUrl}Destinations/GetAll`, {
      headers: this.getHeaders(),
      params,
    });
  }

  createDestination(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}destinations`, payload, {
      headers: this.getHeaders(),
    });
  }

  updateDestination( payload: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}destinations`, payload, {
      headers: this.getHeaders(),
    });
  }

  getTours(page = 1, pageSize = 100): Observable<any> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);
    return this.http.get(`${environment.baseUrl}Tours/GetAll`, {
      headers: this.getHeaders(),
      params,
    });
  }

  

  cangeStatus(id: number): Observable<any> {
    return this.http.patch(`${environment.baseUrl}destinations/${id}/ChangeStatus`, {}, {
      headers: this.getHeaders(),
    });
  }

  deleteDestinationImage(imageId:number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}destinations/deleteImage/${imageId}`, {
      headers: this.getHeaders(),
    });
  }

  deleteTourImage(imageId: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}Tours/deleteImage/${imageId}`, {
      headers: this.getHeaders(),
    });
  }

  createTour(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}Tours`, payload, {
      headers: this.getHeaders(),
    });
  }

  addTourImages(payload: FormData): Observable<any> {
    return this.http.post(`${environment.baseUrl}Tours/AddImages`, payload, {
      headers: this.getHeaders(),
    });
  }

  addPackageImages(payload: FormData): Observable<any> {
    return this.http.post(`${environment.baseUrl}Packages/AddImages`, payload, {
      headers: this.getHeaders(),
    });
  }

  createPackage(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}Packages`, payload, {
      headers: this.getHeaders(),
    });
  }

  updatePackage(payload: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}Packages`, payload, {
      headers: this.getHeaders(),
    });
  }

  addPackageItinerary(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}Packages/AddItinerary`, payload, {
      headers: this.getHeaders(),
    });
  }

  changePackageStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.patch(`${environment.baseUrl}Packages/ChangeStatus`, {
      Id: id,
      IsActive: isActive,
    }, {
      headers: this.getHeaders(),
    });
  }

  deletePackageImage(imageId: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}Packages/deleteImage/${imageId}`, {
      headers: this.getHeaders(),
    });
  }

  addTourItinerary(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}Tours/AddItinerary`, payload, {
      headers: this.getHeaders(),
    });
  }

  changeTourStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.patch(`${environment.baseUrl}Tours/ChangeStatus`, {
      Id: id,
      IsActive: isActive,
    }, {
      headers: this.getHeaders(),
    });
  }

  updateTour(payload: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}Tours`, payload, {
      headers: this.getHeaders(),
    });
  }
}
