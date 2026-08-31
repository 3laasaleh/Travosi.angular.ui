import { firstValueFrom, Observable } from "rxjs";

import { Inject, Injectable } from "@angular/core";
import {
  HttpClient,
  HttpContext,
  HttpHeaders
} from "@angular/common/http";


import { AuthService } from "../../features/user/_services/auth.service";
import { IS_PUBLIC_API_REQUEST } from "../interceptors/public-api-context";
import { API_BASE_URL } from "../tokens/app-urls";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string='';
  constructor(
    private http: HttpClient,
    private _authService: AuthService,
    @Inject(API_BASE_URL) private readonly apiBaseUrl: string,
  ) {

  }


  getToken() {

    return this._authService.getToken();

  }

  getUnauthntecated<T = any>(url: string): Observable<T> {

    return this.http.get<T>(this.apiBaseUrl + url, {
      context: new HttpContext().set(IS_PUBLIC_API_REQUEST, true),
    });

  }
  postUnauthenticated<T = any>(url: string, data: unknown): Observable<T> {
    return this.http.post<T>(this.apiBaseUrl + url, data, {
      context: new HttpContext().set(IS_PUBLIC_API_REQUEST, true),
    });
  }
  get(url: string): Observable<any> {
    const bearer = 'Bearer ' + this.getToken(); // this.anyService.getToken();
    return this.http.get<any[]>(this.apiBaseUrl + url,
      {
        headers: new HttpHeaders
          ({
            Authorization: bearer
          })
      });

  }
  
    async getAsync<T = any>(url: string): Promise<T> {
    const bearer = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders({ Authorization: bearer });

    return await firstValueFrom(this.http.get<T>(this.apiBaseUrl + url, { headers }));
  }

  uploadImage(url: string, data: any): Observable<any> {

    return this.http.post<any>(this.apiBaseUrl + url, data,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
      reportProgress: true, observe: 'events' });

  }



  getById(url: string, id: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiBaseUrl}${url}/${id}`,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });

  }
  // add
  post(url: string, data: any): Observable<any>;
  post(url: string, data: any, token?: string): Observable<any>;
////overloading
  post(url: string, data: any, token?: string): Observable<any> {
    if (!token)
      token = this.getToken();

    return this.http.post<any>(this.apiBaseUrl + url, data,
      { headers: new HttpHeaders({ Authorization: "Bearer " + token }) });

  }
  // add
  put(url: string, data: any): Observable<any> {


    return this.http.put<any>(this.apiBaseUrl + url, data,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });

  }

  patch(url: string, data: any): Observable<any> {
    return this.http.patch<any>(this.apiBaseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
    });
  }

  patchFile(url: string, data: any): Observable<Blob> {
    return this.http.patch(this.apiBaseUrl + url, data, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.getToken(),
        Accept: "application/pdf, application/json",
      }),
      responseType: 'blob',
    });
  }

  getFile(url: string): Observable<Blob> {
    return this.http.get(this.apiBaseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken(), Accept: "application/pdf" }),
      responseType: 'blob',
    });
  }

  delete(url: string, id: any): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + url + "/" + id,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });
  }

  deleteRequest(url: string): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
    });
  }


  // add
  uploadFile(url: string, data: any): Observable<any> {


    return this.http.post(this.apiBaseUrl + url, data,
      {
        headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() })
        , reportProgress: true, observe: 'events'

      });

  }

  downloadFile(Url: string, fileName: string, body: any): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + Url + fileName, body,

      {
        responseType: "blob" as "json",
        headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() })

      });
  }

}


