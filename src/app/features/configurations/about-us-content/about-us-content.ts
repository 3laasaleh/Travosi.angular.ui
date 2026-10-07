import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ABOUT_US_FIELDS, ABOUT_US_SECTIONS, AboutUsContent, AboutUsText, readAboutUsDefault } from '../../../core/data/about-us-content';
import { AboutUsContentService } from '../../../core/services/about-us-content.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-about-us-content',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './about-us-content.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsContentEditor {
  private readonly contentService = inject(AboutUsContentService);
  private readonly http = inject(HttpClient);
  private readonly language = inject(LanguageService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly sections = ABOUT_US_SECTIONS;
  content: AboutUsContent = { en: {}, ar: {} };
  loading = true;
  saving = false;
  attempted = false;
  loadError = false;
  saveError = false;
  saved = false;

  constructor() {
    forkJoin({
      en: this.http.get<Record<string, unknown>>('/assets/lang/en.json'),
      ar: this.http.get<Record<string, unknown>>('/assets/lang/ar.json'),
      saved: this.contentService.load().pipe(catchError(() => {
        this.loadError = true;
        return of({ en: {} as AboutUsText, ar: {} as AboutUsText });
      })),
    }).pipe(
      finalize(() => { this.loading = false; this.cdr.markForCheck(); }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ en, ar, saved }) => {
      this.content = {
        en: Object.fromEntries(ABOUT_US_FIELDS.map(field => [field.key, saved.en[field.key] ?? readAboutUsDefault(en, field.key)])),
        ar: Object.fromEntries(ABOUT_US_FIELDS.map(field => [field.key, saved.ar[field.key] ?? readAboutUsDefault(ar, field.key)])),
      };
      this.cdr.markForCheck();
    });
  }

  get isArabic(): boolean { return this.language.currentLanguage() === 'ar'; }
  get previewPath(): string { return `/${this.language.currentLanguage()}/aboutus`; }

  invalid(key: string, language: 'en' | 'ar'): boolean {
    const value = this.content[language][key] ?? '';
    return this.attempted && (!value.trim() || value.length > 10000);
  }

  save(): void {
    this.attempted = true;
    this.saved = false;
    this.saveError = false;
    if (this.saving || this.loading || this.loadError || ABOUT_US_FIELDS.some(field =>
      !this.content.en[field.key]?.trim() || !this.content.ar[field.key]?.trim()
      || this.content.en[field.key].length > 10000 || this.content.ar[field.key].length > 10000)) {
      this.cdr.markForCheck();
      return;
    }

    this.saving = true;
    const payload: AboutUsContent = {
      en: Object.fromEntries(ABOUT_US_FIELDS.map(field => [field.key, this.content.en[field.key].trim()])),
      ar: Object.fromEntries(ABOUT_US_FIELDS.map(field => [field.key, this.content.ar[field.key].trim()])),
    };
    this.contentService.save(payload).pipe(
      finalize(() => { this.saving = false; this.cdr.markForCheck(); }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: saved => { this.content = saved; this.saved = true; this.attempted = false; },
      error: () => { this.saveError = true; },
    });
  }
}
