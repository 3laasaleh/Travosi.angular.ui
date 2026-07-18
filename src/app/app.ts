import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('See World');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setFallbackLang('en');
    this.translate.use('en');
  }
}
