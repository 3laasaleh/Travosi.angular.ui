import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RoleEnum } from '../../../core/enums/role.enum';
import { IGenericResponse } from '../../../core/models/genericReponse.model';
import { UserProfileDTO } from '../auth-pages/models/userProfile.model';

interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
  user: UserProfileDTO;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly loginErrorStatusSubject = new BehaviorSubject<string>('');
  readonly currentUser = signal<UserProfileDTO | null>(null);
  private readonly accessToken = signal('');
  private refreshRequest$: Observable<string> | null = null;
  private readonly platformId = inject(PLATFORM_ID);

  readonly isLoggedIn = computed(() => this.currentUser() !== null && !!this.accessToken());
  readonly isAdmin = computed(() => this.currentUser()?.role === RoleEnum.Admin);
  readonly isAgent = computed(() => this.currentUser()?.role === RoleEnum.Agent);
  readonly isCustomer = computed(() => this.currentUser()?.role === RoleEnum.Customer);
  readonly fullName = computed(() => {
    const user = this.currentUser();
    return user ? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() : '';
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
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router,
    private readonly http: HttpClient,
  ) {}

  restoreSession(): Observable<void> {
    if (!isPlatformBrowser(this.platformId)) return of(undefined);

    return this.refreshSession().pipe(
      map(() => undefined),
      catchError(() => {
        this.clearSession();
        return of(undefined);
      }),
    );
  }

  login(
    user: unknown,
    returnUrl: string | null = null,
  ): Observable<IGenericResponse<UserProfileDTO & { token: string }>> {
    return this.http
      .post<IGenericResponse<UserProfileDTO & { token: string }>>(
        environment.baseUrl + 'Account/login',
        user,
        { withCredentials: true },
      )
      .pipe(
        tap((response) => {
          if (!response.isSuccess || !response.data) return;

          const { token, ...userData } = response.data;
          this.setSession(token, userData);
          const isAdminOrAgent =
            userData.role === RoleEnum.Admin || userData.role === RoleEnum.Agent;

          if (this.isSafeReturnUrl(returnUrl)) void this.router.navigateByUrl(returnUrl);
          else if (isAdminOrAgent) void this.router.navigate(['/configurations']);
          else void this.router.navigate(['/home']);
        }),
      );
  }

  refreshSession(): Observable<string> {
    if (this.refreshRequest$) return this.refreshRequest$;

    this.refreshRequest$ = this.http
      .post<RefreshResponse>(
        environment.baseUrl + 'auth/refresh',
        {},
        { withCredentials: true },
      )
      .pipe(
        tap((response) => this.setSession(response.accessToken, response.user)),
        map((response) => response.accessToken),
        finalize(() => {
          this.refreshRequest$ = null;
        }),
        shareReplay({ bufferSize: 1, refCount: false }),
      );

    return this.refreshRequest$;
  }

  logout(): void {
    const currentUrl = this.router.url;
    this.http
      .post(environment.baseUrl + 'auth/logout', {}, { withCredentials: true })
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          this.clearSession();
          this.navigateAfterLogout(currentUrl);
        }),
      )
      .subscribe();
  }

  handleRefreshFailure(): void {
    const returnUrl = this.router.url;
    this.clearSession();
    const language = this.routeLanguage(returnUrl) ?? 'en';
    void this.router.navigate([`/${language}/login`], {
      queryParams: this.isSafeReturnUrl(returnUrl) ? { returnUrl } : undefined,
    });
  }

  getCurentUser(): UserProfileDTO | null {
    return this.currentUser();
  }

  getCurrentUserRole(): string | undefined {
    switch (this.currentUser()?.role) {
      case RoleEnum.Admin:
        return 'Admin';
      case RoleEnum.Agent:
        return 'Agent';
      case RoleEnum.Customer:
        return 'Customer';
      default:
        return undefined;
    }
  }

  registeration(user: unknown): Observable<IGenericResponse<string>> {
    return this.http.post<IGenericResponse<string>>(
      environment.baseUrl + 'Account/Registeration',
      user,
    );
  }

  changePassword(data: unknown): Observable<IGenericResponse<boolean>> {
    return this.http.put<IGenericResponse<boolean>>(
      environment.baseUrl + 'Account/ChangePassword/',
      data,
    );
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return this.accessToken();
  }

  updateProfileImage(profileImageUrl: string | null): void {
    const user = this.currentUser();
    if (user) this.currentUser.set({ ...user, profileImageUrl });
  }

  private setSession(token: string, user: UserProfileDTO): void {
    this.accessToken.set(token);
    this.currentUser.set(user);
  }

  private clearSession(): void {
    this.accessToken.set('');
    this.currentUser.set(null);
  }

  private isSafeReturnUrl(returnUrl: string | null): returnUrl is string {
    return !!returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//');
  }

  private routeLanguage(url: string): string | null {
    const firstSegment = this.router
      .parseUrl(url)
      .root.children['primary']?.segments[0]?.path.toLowerCase();
    return /^(en|ar)$/.test(firstSegment ?? '') ? firstSegment ?? null : null;
  }

  private navigateAfterLogout(currentUrl: string): void {
    const segments =
      this.router
        .parseUrl(currentUrl)
        .root.children['primary']?.segments.map((segment) => segment.path) ?? [];
    const language = /^(en|ar)$/i.test(segments[0] ?? '')
      ? segments[0].toLowerCase()
      : null;
    const pageSegment = segments[language ? 1 : 0]?.toLowerCase();

    if (pageSegment === 'configurations') {
      void this.router.navigateByUrl(language ? `/${language}/home` : '/home');
    }
  }
}
