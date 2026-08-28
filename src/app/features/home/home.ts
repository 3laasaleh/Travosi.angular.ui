import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
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
  isLoading = true;
  bg2 = 'assets/images/bg/2.jpg';
  bg3 = 'assets/images/bg/3.jpg';
  map = 'assets/images/map-plane.png';
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
    Promise.all([this.bg2, this.bg3, this.map].map((source) => this.preloadImage(source)))
      .finally(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
        requestAnimationFrame(() => this.initializeSlider());
      });
  }

  ngAfterViewInit(): void {
    if (!this.isLoading) this.initializeSlider();
  }

  private initializeSlider(): void {
    if (!document.querySelector('.swiper-container .swiper')) return;
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
