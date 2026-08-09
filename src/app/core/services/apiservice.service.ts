import { firstValueFrom, Observable } from "rxjs";

import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";


import { environment } from "../../../environments/environment";
import { AuthService } from "../../features/user/_services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string='';
  constructor(private http: HttpClient, private _authService: AuthService) {

  }


  getToken() {

    return this._authService.getToken();

  }

  getUnauthntecated(url: string): Observable<any> {

    return this.http.get<any[]>(environment.baseUrl + url);

  }
  postUnauthenticated(url: string, data: unknown): Observable<any> {
    return this.http.post<any>(environment.baseUrl + url, data);
  }
  get(url: string): Observable<any> {
    const bearer = 'Bearer ' + this.getToken(); // this.anyService.getToken();
    return this.http.get<any[]>(environment.baseUrl + url,
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

    return await firstValueFrom(this.http.get<T>(environment.baseUrl + url, { headers }));
  }

  uploadImage(url: string, data: any): Observable<any> {

    return this.http.post<any>(environment.baseUrl + url, data,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
      reportProgress: true, observe: 'events' });

  }



  getById(url: string, id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}${url}/${id}`,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });

  }
  // add
  post(url: string, data: any): Observable<any>;
  post(url: string, data: any, token?: string): Observable<any>;
////overloading
  post(url: string, data: any, token?: string): Observable<any> {
    if (!token)
      token = this.getToken();

    return this.http.post<any>(environment.baseUrl + url, data,
      { headers: new HttpHeaders({ Authorization: "Bearer " + token }) });

  }
  // add
  put(url: string, data: any): Observable<any> {


    return this.http.put<any>(environment.baseUrl + url, data,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });

  }

  patch(url: string, data: any): Observable<any> {
    return this.http.patch<any>(environment.baseUrl + url, data, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
    });
  }

  patchFile(url: string, data: any): Observable<Blob> {
    return this.http.patch(environment.baseUrl + url, data, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.getToken(),
        Accept: "application/pdf, application/json",
      }),
      responseType: 'blob',
    });
  }

  getFile(url: string): Observable<Blob> {
    return this.http.get(environment.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken(), Accept: "application/pdf" }),
      responseType: 'blob',
    });
  }

  delete(url: string, id: any): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + url + "/" + id,
      { headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }) });
  }

  deleteRequest(url: string): Observable<any> {
    return this.http.delete<any>(environment.baseUrl + url, {
      headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() }),
    });
  }


  // add
  uploadFile(url: string, data: any): Observable<any> {


    return this.http.post(environment.baseUrl + url, data,
      {
        headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() })
        , reportProgress: true, observe: 'events'

      });

  }

  downloadFile(Url: string, fileName: string, body: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + Url + fileName, body,

      {
        responseType: "blob" as "json",
        headers: new HttpHeaders({ Authorization: "Bearer " + this.getToken() })

      });
  }

}


