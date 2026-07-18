import { environment } from './../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { computed, Injectable, OnInit, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserProfileModel } from "../models/userProfile.model";
import { IGenericResponseModel } from '../../../../core/models/genericReponse.model';
import { RoleEnum } from '../../../../core/enums/role.enum';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginErrorStatusSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  userloginData = signal<UserProfileModel | null>(null);
  isAdmin = signal<boolean|null>(null);
  // Derived values
  isLoggedIn = computed(() => !!this.userloginData());
  fullName = computed(() => this.userloginData() ? this.userloginData()!.userName : '');

  constructor(
    private jwtHelper: JwtHelperService,
    private _router: Router,
    private http: HttpClient,
    private _coockiesService: CookieService,
  ) {
    if (this.isTokenExpired()) 
      this.logout();
    else
      this.getCurentUser();
  }

  getCurentUser(): UserProfileModel | null {

    if (this.userloginData()) {
      return this.userloginData();
    }
    let userSignedInString = this._coockiesService.get('userSignedIn');
    if (userSignedInString) {
      let userSignedIn = JSON.parse(userSignedInString);
      this.userloginData.set(userSignedIn);
      return userSignedIn;
    }
    return null;

  }
  getCurrentUserRole(): string | undefined {

    switch(this.userloginData()?.role){
      case RoleEnum.Admin:
    return 'Admin'
       case RoleEnum.Agent:
    return 'Agent'
       case RoleEnum.Customer:
    return 'Customer'
default :
    return 'Customer'

    }
  }
  login(user: any) {
    this.http.post(environment.baseUrl +
      "Account/login",
      user
    ).subscribe(
      {
        next: (res: IGenericResponseModel<UserProfileModel> | any) => {
          if (res.isSuccess) {
           const { token, ...userData } = res.data;
            this.isAdmin.set(userData.role===RoleEnum.Admin)
            this._coockiesService.set('userSignedIn', JSON.stringify(userData), 1, '/');
            this._coockiesService.set('token', token, 1, '/');
            this.userloginData.set(userData);
    
            this._router.navigate(['/home']);
      
          }
          else
            this.loginErrorStatusSubject.next(res.message);


        }, error: (error) => {
          console.log(error);

        }
      }
    );
  }
  registeration(user: any): Observable<any> {
    return this.http.post(environment.baseUrl + "Account/Registeration", user);
  }
  changePassword(data: any) {
    return this.http.put<any>(
      environment.baseUrl + "Account/ChangePassword/",
      data
    );
  }
  logout() {
    this._coockiesService.deleteAll('/');
    this.userloginData.set(null);
    this._router.navigate(["home"]);
  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token === 'undefined' || token === undefined || token === "")
      return true;
    let res = this.jwtHelper.isTokenExpired(token);
    return res;
  }

  getToken(): string {
    return this._coockiesService.get('token') || '';
  }

}


