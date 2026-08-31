import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VisitorTrackingService } from './core/services/visitor-tracking.service';
import { CustomerContactOverlay } from './shared/components/customer-contact-overlay/customer-contact-overlay';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomerContactOverlay],
  templateUrl: './app.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Sea World');
  private translate = inject(TranslateService);
  private visitorTracking = inject(VisitorTrackingService);
  private seo = inject(SeoService);

  constructor() {
    this.translate.addLangs(['en', 'ar']);
    void this.seo;
    this.visitorTracking.track().subscribe();

  }
}
