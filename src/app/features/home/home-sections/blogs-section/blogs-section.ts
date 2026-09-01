import { DatePipe, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
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
import { IGenericResponse } from '../../../../core/models/genericReponse.model';

interface ActiveBlog {
  id?: number;
  routeName?: string;
  title?: string;
  summary?: string;
  publishedAt?: string;
  images?: unknown[];
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
  private readonly platformId = inject(PLATFORM_ID);

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
      .subscribe((response: IGenericResponse<ActiveBlog[]>) => {
        if (response?.data === null || this.isFailedResponse(response)) {
          this.blogs = [];
          this.hasError = true;
          return;
        }
        this.blogs = response.data  ?? [];
      });
  }

  blogRoute(blog: ActiveBlog): string | number | undefined {
    return blog.routeName ?? blog.routeName ?? '';
  }

  publishedAt(blog: ActiveBlog): string | undefined {
    return blog.publishedAt ?? blog.publishedAt;
  }

  title(blog: ActiveBlog): string { return blog.title ?? ''; }

  summary(blog: ActiveBlog): string { return blog.summary ?? ''; }

 



  imageUrl(blog: ActiveBlog): string {
    const images = blog.images ?? blog.images ?? [];
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



  private isFailedResponse(response: unknown): boolean {
    if (!response || typeof response !== 'object') return false;
    const envelope = response as Record<string, unknown>;
    return envelope['isSuccess'] === false || envelope['IsSuccess'] === false;
  }



  private scheduleSwiperInitialization(): void {
    if (!isPlatformBrowser(this.platformId)) return;
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
