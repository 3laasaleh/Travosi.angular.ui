import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import { HomeNavbar } from '../../layout/home-navbar/home-navbar';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ApiService } from '../../core/services/apiservice.service';
import { VisitorTrackingService } from '../../core/services/visitor-tracking.service';
import { FooterOne } from '../../layout/footer-one/footer-one';
import { AgencyOne } from '../../shared/components/agency-one/agency-one';
import { DestinationsSection } from './home-sections/destinations-section/destinations-section';
import { PackagesSection } from './home-sections/packages-section/packages-section';
import { BlogsSection } from './home-sections/blogs-section/blogs-section';
import { ToursSection } from './home-sections/tours-section/tours-section';
import { UsersOne } from '../../shared/components/users-one/users-one';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

/**
 * One slide of the home hero slider. Add, remove or reorder entries in `Home.heroSlides`
 * to change the slider — the template renders whatever is in the array.
 *
 * The `*Key` fields are translation keys resolved from `assets/lang/en.json` and `ar.json`.
 * A key that does not exist is rendered as-is, so plain text also works for a quick change.
 */
export interface HomeHeroSlide {
  /** Background image path, e.g. `assets/images/bg/2.jpg`. */
  image: string;
  /** Small illustration above the title. Omit to hide it on this slide. */
  icon?: string;
  /** Translation key for the icon's alt text. */
  iconAltKey?: string;
  /** Translation key for the headline. */
  titleKey: string;
  /** Translation key for the supporting paragraph. Omit to hide it. */
  descriptionKey?: string;
  /** Translation key for the button label. Omit to hide the button. */
  ctaKey?: string;
  /** Router link the button navigates to, e.g. `/packages`. */
  ctaLink?: string;
}

@Component({
  selector: 'app-home',
  imports: [
    HomeNavbar,
    AgencyOne,
    UsersOne,
    FooterOne,
    DestinationsSection,
    ToursSection,
    PackagesSection,
    BlogsSection,
    TranslatePipe,
    RouterLink,
  ],
  templateUrl: './home.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  isLoading = true;

  /** Edit this array to add, remove or reword the hero slides. */
  readonly heroSlides: HomeHeroSlide[] = [
    {
      image: 'assets/images/bg/2.jpg',
      icon: 'assets/images/map-plane.png',
      iconAltKey: 'travelAroundWorld',
      titleKey: 'homeHeroPackagesTitle',
      descriptionKey: 'homeHeroPackagesDescription',
      ctaKey: 'explorePackages',
      ctaLink: '/packages',
    },
    {
      image: 'assets/images/bg/3.jpg',
      icon: 'assets/images/map-plane.png',
      iconAltKey: 'travelAroundWorld',
      titleKey: 'homeHeroDestinationsTitle',
      descriptionKey: 'homeHeroDestinationsDescription',
      ctaKey: 'exploreDestinations',
      ctaLink: '/destinations',
    },
  ];

  visitorTotal = 0;
  packageTotal = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private visitorTracking: VisitorTrackingService,
    private destroyRef: DestroyRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {

    this.loadStatistics();
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading = false;
      return;
    }
    const heroImages = new Set(
      this.heroSlides.flatMap((slide) => [slide.image, slide.icon]).filter((source): source is string => !!source),
    );
    Promise.all([...heroImages].map((source) => this.preloadImage(source)))
      .finally(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
        requestAnimationFrame(() => this.initializeSlider());
      });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && !this.isLoading) this.initializeSlider();
  }

  private initializeSlider(): void {
    // A single slide must not loop or paginate, otherwise Swiper clones it into a fake carousel.
    if (this.heroSlides.length < 2 || !document.querySelector('.swiper-container .swiper')) return;
    new Swiper('.swiper-container .swiper', {
      modules: [Navigation, Autoplay, Pagination],
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });
  }

  private preloadImage(source: string): Promise<void> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = source;
    });
  }

  private loadStatistics(): void {
    this.visitorTracking
      .track()
      .pipe(
        switchMap(() =>
          this.apiService
            .getUnauthntecated('AboutUs/Statistics')
            .pipe(catchError(() => of(null))),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((response) => {
        const data = response?.data ?? response?.Data ?? response;
        if (!data || response?.isSuccess === false || response?.IsSuccess === false) return;

        this.visitorTotal = this.nonNegativeNumber(data.totalVisitors ?? data.TotalVisitors);
        this.packageTotal = this.nonNegativeNumber(data.totalPackages ?? data.TotalPackages);
        this.cdr.markForCheck();
      });
  }

  private nonNegativeNumber(value: unknown): number {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.floor(number) : 0;
  }
}
