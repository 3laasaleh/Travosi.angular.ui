import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { ImageViewerModal } from '../../../../shared/components/image-viewer-modal/image-viewer-modal';
import { SeoService } from '../../../../core/services/seo.service';
import { DescriptionLinks } from '../../../../shared/components/description-links/description-links';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [Breadcrumbs, 
    RouterLink,
    DatePipe,
    TranslatePipe,
    HomeNavbar,
    FooterOne,
    ImageViewerModal,
    DescriptionLinks,
  ],
  templateUrl: './blog-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetail implements OnInit {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);
  private readonly seo = inject(SeoService);
  blog: any = null;
  isLoading = true;
  errorMessage = '';
  selectedImageIndex = 0;
  imageViewerOpen = false;
  ngOnInit(): void {
    const routeName = this.route.snapshot.paramMap.get('routeName')?.trim();
    if (!routeName) {
      this.errorMessage = 'Blog not found.';
      this.isLoading = false;
      this.seo.markNotFound('Blog not found');
      return;
    }
    this.api
      .getUnauthntecated(`Blogs/by-route/${encodeURIComponent(routeName)}`)
      .pipe(
        catchError(() => {
          this.errorMessage = 'Blog not found.';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response) => {
        if (response?.isSuccess === false || response?.IsSuccess === false || !response) {
          this.errorMessage = response?.message || response?.Message || 'Blog not found.';
          this.seo.markNotFound('Blog not found');
          return;
        }
        this.blog = response.data ?? response.Data ?? response;
        this.selectedImageIndex = 0;
        this.syncImageGallery();
        
        this.seo.updateFrom(this.blog, {
          image: this.imageSources[0],
          imageUrl: this.images[0],
          schemaType: 'BlogPosting',
        });
      });
  }
  get isArabic(): boolean {
    return (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
  }
  get title(): string {
    return (
      this.blog?.title ??
      this.blog?.Title ??
      (this.isArabic
        ? this.blog?.titleAr || this.blog?.titleEng || ''
        : this.blog?.titleEng || this.blog?.titleAr || '')
    );
  }
  get summary(): string {
    return this.blog?.summary ?? this.blog?.Summary ?? '';
  }
  get content(): string {
    return this.headerData.length ? '' : this.localizedRawContent;
  }
  get headerData(): Array<{ headerType: number; header: string; description: string }> {
    const sections = this.blog?.headerData ?? this.blog?.HeaderData ?? [];
    if (Array.isArray(sections) && sections.length) {
      return sections
        .slice(0, 5)
        .sort(
          (left: any, right: any) =>
            Number(left?.orderNumber ?? left?.OrderNumber) -
            Number(right?.orderNumber ?? right?.OrderNumber),
        )
        .map((section: any) => ({
          headerType: this.normalizeHeaderType(section?.headerType ?? section?.HeaderType),
          header: this.isArabic
            ? (section?.headerAr ?? section?.HeaderAr ?? section?.header ?? section?.Header ?? '')
            : (section?.headerEng ??
              section?.HeaderEng ??
              section?.header ??
              section?.Header ??
              ''),
          description: this.isArabic
            ? (section?.descriptionAr ??
              section?.DescriptionAr ??
              section?.description ??
              section?.Description ??
              '')
            : (section?.descriptionEng ??
              section?.DescriptionEng ??
              section?.description ??
              section?.Description ??
              ''),
        }));
    }
    return this.parseLegacyHeaderData(this.localizedRawContent);
  }
  get imageSources(): any[] {
    const images = this.blog?.images ?? this.blog?.Images;
    return Array.isArray(images) ? images : [];
  }
  get images(): string[] {
    return this.imageSources.map((image: any) => this.image(image));
  }
  imageAlt(index: number): string {
    return this.seo.imageAlt(this.imageSources[index], this.title);
  }
  image(image: any): string {
    const url = image?.imageUrl ?? image?.ImageUrl ?? image?.url ?? image?.Url ?? image;
    return /^(https?:|data:|blob:)/i.test(url ?? '')
      ? url
      : `${environment.imageUrl}${String(url ?? '').replace(/^\/+/, '')}`;
  }
  selectImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    this.selectedImageIndex = index;
  }
  previousImage(): void {
    if (this.images.length < 2) return;
    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }
  nextImage(): void {
    if (this.images.length < 2) return;
    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.images.length;
  }
  openImageViewer(): void {
    if (this.images.length) {
      this.imageViewerOpen = true;
    }
  }
  closeImageViewer(): void {
    this.imageViewerOpen = false;
  }
  private get localizedRawContent(): string {
    return (
      this.blog?.content ??
      (this.isArabic
        ? this.blog?.contentAr || this.blog?.contentEng || ''
        : this.blog?.contentEng || this.blog?.contentAr || '')
    );
  }
  private parseLegacyHeaderData(
    content: string,
  ): Array<{ headerType: number; header: string; description: string }> {
    if (!content?.trim()) return [];
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed)
        ? parsed
            .slice(0, 5)
            .filter((item) => item && typeof item === 'object')
            .map((item) => ({
              headerType: this.normalizeHeaderType(item.headerType),
              header: String(item.header ?? ''),
              description: String(item.description ?? ''),
            }))
        : [];
    } catch {
      return [];
    }
  }
  private normalizeHeaderType(value: unknown): number {
    const type = Number(value);
    return Number.isInteger(type) && type >= 1 && type <= 5 ? type : 2;
  }
  private syncImageGallery(): void {
    const maxIndex = Math.max(0, this.images.length - 1);
    this.selectedImageIndex = Math.min(this.selectedImageIndex, maxIndex);
  }
}
