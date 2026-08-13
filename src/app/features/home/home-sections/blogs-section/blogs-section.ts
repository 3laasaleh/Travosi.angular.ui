import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../../../core/services/apiservice.service';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-blogs-section',
  standalone: true,
  imports: [DatePipe, RouterLink, TranslatePipe],
  templateUrl: './blogs-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsSection implements OnInit, AfterViewInit, OnDestroy {
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly translate = inject(TranslateService);

  blogs: any[] = [];
  isLoading = false;
  hasError = false;
  private swiper: Swiper | null = null;
  private viewReady = false;
  @ViewChild('blogSwiper') private blogSwiper?: ElementRef<HTMLElement>;

  ngOnInit(): void { this.loadBlogs(); }
  ngAfterViewInit(): void { this.viewReady = true; this.scheduleSwiper(); }
  ngOnDestroy(): void { this.swiper?.destroy(true, true); }

  loadBlogs(): void {
    this.isLoading = true;
    this.hasError = false;
    this.swiper?.destroy(true, true);
    this.swiper = null;
    this.apiService.getUnauthntecated('Blogs?page=1&pageSize=8').pipe(
      catchError(() => { this.hasError = true; return of(null); }),
      finalize(() => { this.isLoading = false; this.cdr.markForCheck(); this.scheduleSwiper(); }),
    ).subscribe(response => {
      const page = response?.data ?? response;
      this.blogs = Array.isArray(page?.data) ? page.data.slice(0, 8) : [];
    });
  }

  title(blog: any): string {
    const isArabic = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
    return isArabic ? (blog?.titleAr || blog?.titleEng || '') : (blog?.titleEng || blog?.titleAr || '');
  }

  summary(blog: any): string {
    const isArabic = (this.translate.currentLang?.() ?? '').toLowerCase().startsWith('ar');
    return isArabic ? (blog?.summaryAr || blog?.summaryEng || '') : (blog?.summaryEng || blog?.summaryAr || '');
  }

  imageUrl(blog: any): string {
    const url = blog?.images?.[0]?.imageUrl ?? blog?.images?.[0]?.url;
    if (!url) return 'assets/images/blog/1.jpg';
    return /^(blob:|data:|https?:\/\/)/i.test(url)
      ? url
      : `${environment.imageUrl.replace(/\/+$/, '')}/${String(url).replace(/^\/+/, '')}`;
  }

  private scheduleSwiper(): void {
    if (!this.viewReady || this.isLoading || this.hasError || this.blogs.length < 2) return;
    queueMicrotask(() => this.initializeSwiper());
  }

  private initializeSwiper(): void {
    const element = this.blogSwiper?.nativeElement;
    if (!element || this.swiper) return;
    const canLoop = this.blogs.length > 3;
    this.swiper = new Swiper(element, {
      modules: [Autoplay, Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 24,
      loop: canLoop,
      autoplay: { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
      navigation: { nextEl: '.blog-swiper-next', prevEl: '.blog-swiper-prev' },
      pagination: { el: '.blog-swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }
}
