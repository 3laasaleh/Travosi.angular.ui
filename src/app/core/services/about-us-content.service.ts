import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AboutUsContent, selectAboutUsText } from '../data/about-us-content';
import { ApiService } from './apiservice.service';

@Injectable({ providedIn: 'root' })
export class AboutUsContentService {
  private readonly api = inject(ApiService);

  load(): Observable<AboutUsContent> {
    return this.api.getUnauthntecated('AboutUs/Content').pipe(map(response => this.unwrap(response)));
  }

  save(content: AboutUsContent): Observable<AboutUsContent> {
    return this.api.put('AboutUs/Content', content).pipe(map(response => this.unwrap(response)));
  }

  private unwrap(response: any): AboutUsContent {
    if (!response || response.isSuccess === false) throw new Error(response?.message ?? 'About Us content request failed');
    const data = response.data ?? response;
    return {
      en: selectAboutUsText(data.en ?? data.En),
      ar: selectAboutUsText(data.ar ?? data.Ar),
    };
  }
}
