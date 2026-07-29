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
    return this.http.get(`${environment.baseUrl}Tours`, {
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

  updateTour(payload: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}Tours`, payload, {
      headers: this.getHeaders(),
    });
  }
}
