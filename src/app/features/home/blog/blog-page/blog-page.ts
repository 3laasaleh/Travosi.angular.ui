import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({ selector: 'app-blog-page', standalone: true, imports: [RouterLink, DatePipe, HomeNavbar, FooterOne], templateUrl: './blog-page.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class BlogPage implements OnInit {
  private readonly api = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);
  blogs: any[] = [];
  isLoading = false;
  errorMessage = '';
  readonly bg = 'assets/images/bg/cta.jpg';

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getUnauthntecated('Blogs?page=1&pageSize=30').pipe(
      catchError(() => { this.errorMessage = 'Unable to load blogs right now.'; return of(null); }),
      finalize(() => { this.isLoading = false; this.cdr.markForCheck(); }),
    ).subscribe(response => { const page = response?.data ?? response; this.blogs = Array.isArray(page?.data) ? page.data : []; });
  }
  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
  title(blog: any): string { return blog.title ?? blog.Title ?? (this.isArabic ? (blog.titleAr || blog.titleEng) : (blog.titleEng || blog.titleAr)); }
  summary(blog: any): string { return blog.summary ?? blog.Summary ?? (this.isArabic ? (blog.summaryAr || blog.summaryEng) : (blog.summaryEng || blog.summaryAr)); }
  image(blog: any): string { const url = blog?.images?.[0]?.imageUrl ?? blog?.images?.[0]?.url; return !url ? 'assets/images/blog/1.jpg' : (/^(https?:|data:|blob:)/i.test(url) ? url : `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`); }
}
