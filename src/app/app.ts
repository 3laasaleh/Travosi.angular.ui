import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { VisitorTrackingService } from './core/services/visitor-tracking.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Sea World');
  private translate = inject(TranslateService);
  private visitorTracking = inject(VisitorTrackingService);

  constructor() {
    this.translate.addLangs(['en', 'ar']);
    this.visitorTracking.track().subscribe();

  }
}
