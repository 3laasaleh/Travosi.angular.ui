import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { ApiService } from './apiservice.service';

@Injectable({ providedIn: 'root' })
export class VisitorTrackingService {
  private readonly apiService = inject(ApiService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'seeWorldVisitorId';
  private trackingRequest?: Observable<number | null>;

  track(): Observable<number | null> {
    if (this.trackingRequest) return this.trackingRequest;

    const visitorId = this.getOrCreateVisitorId();
    if (!visitorId) {
      this.trackingRequest = of(null);
      return this.trackingRequest;
    }

    this.trackingRequest = this.apiService
      .postUnauthenticated('AboutUs/Visitors', { visitorId })
      .pipe(
        map((response) => {
          if (response?.isSuccess === false) return null;
          const value = Number(response?.data ?? response);
          return Number.isFinite(value) ? value : null;
        }),
        catchError(() => of(null)),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    return this.trackingRequest;
  }

  private getOrCreateVisitorId(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const savedId = localStorage.getItem(this.storageKey);
      if (savedId && this.isUuid(savedId)) return savedId;

      const visitorId = crypto.randomUUID();
      localStorage.setItem(this.storageKey, visitorId);
      return visitorId;
    } catch {
      // Do not create a non-persistent ID because that would inflate unique visitor totals.
      return null;
    }
  }

  private isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }
}
