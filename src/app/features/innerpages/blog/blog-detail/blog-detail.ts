import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({ selector: 'app-blog-detail', standalone: true, imports: [RouterLink, DatePipe, HomeNavbar, FooterOne], templateUrl: './blog-detail.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class BlogDetail implements OnInit {
  private readonly api = inject(ApiService); private readonly route = inject(ActivatedRoute); private readonly cdr = inject(ChangeDetectorRef); private readonly translate = inject(TranslateService);
  blog: any = null; isLoading = true; errorMessage = '';
  ngOnInit(): void { const id = Number(this.route.snapshot.paramMap.get('id')); if (!Number.isInteger(id) || id <= 0) { this.errorMessage = 'Blog not found.'; this.isLoading = false; return; }
    this.api.getUnauthntecated(`Blogs/${id}`).pipe(catchError(() => { this.errorMessage = 'Blog not found.'; return of(null); }), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); })).subscribe(response => { if (response?.isSuccess === false || !response) { this.errorMessage = response?.message || 'Blog not found.'; return; } this.blog = response.data ?? response; }); }
  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
  get title(): string { return this.isArabic ? (this.blog?.titleAr || this.blog?.titleEng || '') : (this.blog?.titleEng || this.blog?.titleAr || ''); }
  get content(): string { return this.isArabic ? (this.blog?.contentAr || this.blog?.contentEng || '') : (this.blog?.contentEng || this.blog?.contentAr || ''); }
  image(image: any): string { const url = image?.imageUrl ?? image?.url ?? image; return /^(https?:|data:|blob:)/i.test(url ?? '') ? url : `${environment.imageUrl}${String(url ?? '').replace(/^\/+/, '')}`; }
}
