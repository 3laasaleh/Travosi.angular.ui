import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { computed, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IGenericResponse } from '../../../core/models/genericReponse.model';
import { RoleEnum } from '../../../core/enums/role.enum';
import { UserProfileDTO } from '../auth-pages/models/userProfile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginErrorStatusSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentUser = signal<UserProfileDTO | null>(null);
 readonly isLoggedIn = computed(() =>
    this.currentUser() !== null
);

readonly isAdmin = computed(() =>
    this.currentUser()?.role === RoleEnum.Admin
);

readonly isAgent = computed(() =>
    this.currentUser()?.role === RoleEnum.Agent
);

readonly isCustomer = computed(() =>
    this.currentUser()?.role === RoleEnum.Customer
);

readonly fullName = computed(() => {

    const user = this.currentUser();

    if (!user) return '';

    return `${user.firstName} ${user.lastName}`;
});

readonly profileImageUrl = computed(() => {
  const value = this.currentUser()?.profileImageUrl;
  if (!value) return null;
  if (/^(blob:|data:|https?:\/\/)/i.test(value)) return value;

  const relativePath = String(value)
    .replace(/^\/+/, '')
    .replace(/^images\//i, '');
  return `${environment.imageUrl.replace(/\/+$/, '')}/${relativePath}`;
});

  constructor(
    private jwtHelper: JwtHelperService,
    private _router: Router,
    private http: HttpClient,
    private _coockiesService: CookieService,
  ) {
    this.initializeUser();
  }
  initializeUser() {
    const user = this._coockiesService.get('userSignedIn');

    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }
  getCurentUser(): UserProfileDTO | null {
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
  getCurrentUserRole(): string | undefined {
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
  login(user: any, returnUrl: string | null = null) {
    return this.http.post(environment.baseUrl + 'Account/login', user).pipe(
      map((res: any) => {
        if (res.isSuccess) {
         
          const { token, ...userData } = res.data;
          this._coockiesService.set('userSignedIn', JSON.stringify(userData), 1, '/');
          this._coockiesService.set('token', token, 1, '/');
          this.currentUser.set(userData);
          const isAdminOrAgent = userData.role === RoleEnum.Admin
            || userData.role === RoleEnum.Agent;

          if (this.isSafeReturnUrl(returnUrl)) this._router.navigateByUrl(returnUrl);
          else if (isAdminOrAgent) this._router.navigate(['/configurations']);
          else this._router.navigate(['/home']);
        }
        return res;
      }),
    );
  }

  private isSafeReturnUrl(returnUrl: string | null): returnUrl is string {
    return !!returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//');
  }

  registeration(user: any): Observable<any> {
    return this.http.post(environment.baseUrl + 'Account/Registeration', user);
  }
  changePassword(data: any) {
    return this.http.put<any>(environment.baseUrl + 'Account/ChangePassword/', data);
  }
  logout() {
    const currentUrl = this._router.url;
    this._coockiesService.deleteAll('/');
    this.currentUser.set(null);

    const primarySegments = this._router
      .parseUrl(currentUrl)
      .root.children['primary']?.segments.map((segment) => segment.path) ?? [];
    const language = /^(en|ar)$/i.test(primarySegments[0] ?? '')
      ? primarySegments[0].toLowerCase()
      : null;
    const pageSegment = primarySegments[language ? 1 : 0]?.toLowerCase();

    if (pageSegment === 'configurations') {
      this._router.navigateByUrl(language ? `/${language}/home` : '/home');
    }
  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token === 'undefined' || token === undefined || token === '') return true;
    let res = this.jwtHelper.isTokenExpired(token);
    return res;
  }

  getToken(): string {
    return this._coockiesService.get('token') || '';
  }

  updateProfileImage(profileImageUrl: string | null): void {
    const user = this.getCurentUser();
    if (!user) return;

    const updatedUser: UserProfileDTO = { ...user, profileImageUrl };
    this.currentUser.set(updatedUser);
    this._coockiesService.set('userSignedIn', JSON.stringify(updatedUser), 1, '/');
  }
}
