import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { ImageViewerModal } from '../../../../shared/components/image-viewer-modal/image-viewer-modal';
import { SeoService } from '../../../../core/services/seo.service';

@Component({ selector: 'app-blog-detail', standalone: true, imports: [RouterLink, DatePipe, TranslatePipe, HomeNavbar, FooterOne, ImageViewerModal], templateUrl: './blog-detail.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class BlogDetail implements OnInit {
  private readonly api = inject(ApiService); private readonly route = inject(ActivatedRoute); private readonly cdr = inject(ChangeDetectorRef); private readonly translate = inject(TranslateService); private readonly seo = inject(SeoService);
  blog: any = null; isLoading = true; errorMessage = ''; selectedImageIndex = 0; imageViewerOpen = false;
  ngOnInit(): void { const routeName = this.route.snapshot.paramMap.get('routeName')?.trim(); if (!routeName) { this.errorMessage = 'Blog not found.'; this.isLoading = false; return; }
    this.api.getUnauthntecated(`Blogs/by-route/${encodeURIComponent(routeName)}`).pipe(catchError(() => { this.errorMessage = 'Blog not found.'; return of(null); }), finalize(() => { this.isLoading = false; this.cdr.markForCheck(); })).subscribe(response => { if (response?.isSuccess === false || !response) { this.errorMessage = response?.message || 'Blog not found.'; return; } this.blog = response.data ?? response; this.selectedImageIndex = 0; this.syncImageGallery(); this.seo.updateFrom(this.blog, { image: this.imageSources[0], imageUrl: this.images[0], schemaType: 'BlogPosting' }); }); }
  get isArabic(): boolean { return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar'); }
  get title(): string { return this.blog?.title ?? (this.isArabic ? (this.blog?.titleAr || this.blog?.titleEng || '') : (this.blog?.titleEng || this.blog?.titleAr || '')); }
  get content(): string { return this.blog?.content ?? (this.isArabic ? (this.blog?.contentAr || this.blog?.contentEng || '') : (this.blog?.contentEng || this.blog?.contentAr || '')); }
  get imageSources(): any[] { return Array.isArray(this.blog?.images) ? this.blog.images : []; }
  get images(): string[] { return this.imageSources.map((image: any) => this.image(image)); }
  imageAlt(index: number): string { return this.seo.imageAlt(this.imageSources[index], this.title); }
  image(image: any): string { const url = image?.imageUrl ?? image?.url ?? image; return /^(https?:|data:|blob:)/i.test(url ?? '') ? url : `${environment.imageUrl}${String(url ?? '').replace(/^\/+/, '')}`; }
  selectImage(index: number): void { if (index < 0 || index >= this.images.length) return; this.selectedImageIndex = index; }
  previousImage(): void { if (this.images.length < 2) return; this.selectedImageIndex = (this.selectedImageIndex - 1 + this.images.length) % this.images.length; }
  nextImage(): void { if (this.images.length < 2) return; this.selectedImageIndex = (this.selectedImageIndex + 1) % this.images.length; }
  openImageViewer(): void { if (this.images.length) { this.imageViewerOpen = true; } }
  closeImageViewer(): void { this.imageViewerOpen = false; }
  private syncImageGallery(): void { const maxIndex = Math.max(0, this.images.length - 1); this.selectedImageIndex = Math.min(this.selectedImageIndex, maxIndex); }
}
