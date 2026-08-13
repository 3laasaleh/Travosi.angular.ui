import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swiper from 'swiper';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import { LanguageService } from '../../../../core/services/language.service';

interface ActiveBlog {
  id?: number;
  Id?: number;
  titleEng?: string;
  TitleEng?: string;
  titleAr?: string;
  TitleAr?: string;
  summaryEng?: string;
  SummaryEng?: string;
  summaryAr?: string;
  SummaryAr?: string;
  publishedAt?: string;
  PublishedAt?: string;
  images?: unknown[];
  Images?: unknown[];
}

@Component({
  selector: 'app-blogs-section',
  standalone: true,
  imports: [DatePipe, RouterLink, TranslatePipe],
  templateUrl: './blogs-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsSection implements OnInit, OnDestroy {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  private swiper: Swiper | null = null;
  private swiperInitializationTimer: ReturnType<typeof setTimeout> | null = null;
  private blogSwiperElement?: ElementRef<HTMLElement>;

  @ViewChild('blogSwiper')
  set blogSwiper(element: ElementRef<HTMLElement> | undefined) {
    this.blogSwiperElement = element;
    if (element) this.scheduleSwiperInitialization();
  }

  blogs: ActiveBlog[] = [];
  isLoading = true;
  hasError = false;

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngOnDestroy(): void {
    if (this.swiperInitializationTimer !== null) {
      clearTimeout(this.swiperInitializationTimer);
    }
    this.destroySwiper();
  }

  loadBlogs(): void {
    this.isLoading = true;
    this.hasError = false;
    this.destroySwiper();

    this.apiService
      .getUnauthntecated('Blogs/AllActive')
      .pipe(
        catchError(() => {
          this.hasError = true;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response: unknown) => {
        if (response === null || this.isFailedResponse(response)) {
          this.blogs = [];
          this.hasError = true;
          return;
        }

        this.blogs = this.extractBlogs(response);
      });
  }

  blogId(blog: ActiveBlog): number | undefined {
    return blog.id ?? blog.Id;
  }

  publishedAt(blog: ActiveBlog): string | undefined {
    return blog.publishedAt ?? blog.PublishedAt;
  }

  title(blog: ActiveBlog): string {
    const titleEng = blog.titleEng ?? blog.TitleEng ?? '';
    const titleAr = blog.titleAr ?? blog.TitleAr ?? '';
    return this.isArabic ? titleAr || titleEng : titleEng || titleAr;
  }

  summary(blog: ActiveBlog): string {
    const summaryEng = blog.summaryEng ?? blog.SummaryEng ?? '';
    const summaryAr = blog.summaryAr ?? blog.SummaryAr ?? '';
    return this.isArabic ? summaryAr || summaryEng : summaryEng || summaryAr;
  }

  imageUrl(blog: ActiveBlog): string {
    const images = blog.images ?? blog.Images ?? [];
    const firstImage = Array.isArray(images) ? images[0] : undefined;
    const image = firstImage as Record<string, unknown> | string | undefined;
    const rawUrl =
      typeof image === 'string'
        ? image
        : image?.['imageUrl'] ?? image?.['ImageUrl'] ?? image?.['url'] ?? image?.['Url'];

    if (!rawUrl) return 'assets/images/blog/1.jpg';

    const url = String(rawUrl);
    if (/^(blob:|data:|https?:\/\/)/i.test(url)) return url;

    const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private get isArabic(): boolean {
    return this.languageService.currentLanguage() === 'ar';
  }

  private isFailedResponse(response: unknown): boolean {
    if (!response || typeof response !== 'object') return false;
    const envelope = response as Record<string, unknown>;
    return envelope['isSuccess'] === false || envelope['IsSuccess'] === false;
  }

  private extractBlogs(response: unknown): ActiveBlog[] {
    const envelope = response as Record<string, any>;
    const candidates = [
      envelope?.['data'],
      envelope?.['Data'],
      envelope?.['data']?.['data'],
      envelope?.['data']?.['Data'],
      envelope?.['data']?.['items'],
      envelope?.['Data']?.['data'],
      envelope?.['Data']?.['Data'],
      envelope?.['Data']?.['items'],
      response,
    ];

    return candidates.find((candidate) => Array.isArray(candidate)) ?? [];
  }

  private scheduleSwiperInitialization(): void {
    if (this.swiperInitializationTimer !== null) {
      clearTimeout(this.swiperInitializationTimer);
    }

    this.swiperInitializationTimer = setTimeout(() => {
      this.swiperInitializationTimer = null;
      this.initializeSwiper();
    });
  }

  private initializeSwiper(): void {
    const element = this.blogSwiperElement?.nativeElement;
    if (!element || this.swiper || this.blogs.length === 0) return;

    this.swiper = new Swiper(element, {
      modules: [A11y, Autoplay, Navigation, Pagination],
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      speed: 650,
      rewind: this.blogs.length > 1,
      watchOverflow: true,
      autoplay:
        this.blogs.length > 1
          ? {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false,
      navigation: {
        nextEl: '.home-blogs-next',
        prevEl: '.home-blogs-previous',
      },
      pagination: {
        el: '.home-blogs-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
  }

  private destroySwiper(): void {
    this.swiper?.destroy(true, true);
    this.swiper = null;
  }
}
