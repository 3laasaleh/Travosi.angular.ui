import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { CityDTO } from '../../../features/configurations/cities/cities-from-card/cities-from-card';
import { UtilityService } from '../../../core/services/utilityservice';

@Component({
  selector: 'app-destination-cities-carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './destination-cities-carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationCitiesCarousel implements AfterViewInit, OnChanges, OnDestroy {
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly utilityService = inject(UtilityService);
  @Input() destinationId!: number;
  @Input() cities: CityDTO[] = [];
  private swiper: Swiper | null = null;
  readonly instanceId = 'destination-cities-carousel';

  ngAfterViewInit(): void { this.initialize(); }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities'] && !changes['cities'].firstChange) setTimeout(() => this.initialize());
  }
  ngOnDestroy(): void { this.swiper?.destroy(true, true); }

  get selector(): string { return `#${this.instanceId}`; }
  cityName(city: any): string { return city?.title; }
  get isArabic(): boolean { return this.utilityService.isArabic(this.translate); }
  cityImage(city: any): string {
    return this.utilityService.imageUrl(city?.coverImageUrl ?? city?.imageUrl ?? city?.images?.[0]?.imageUrl ?? '');
  }

  onCityImageError(event: Event): void {
    this.utilityService.onCityImageError(event);
  }

  private initialize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.swiper?.destroy(true, true);
    if (!this.cities.length || !document.querySelector(this.selector)) return;
    this.swiper = new Swiper(`${this.selector} .swiper`, {
      modules: [Navigation, Pagination],
      slidesPerView: 1.1,
      spaceBetween: 16,
      navigation: { nextEl: `${this.selector} .cities-next`, prevEl: `${this.selector} .cities-prev` },
      pagination: { el: `${this.selector} .cities-pagination`, clickable: true },
      breakpoints: { 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3.1 }, 1280: { slidesPerView: 4 } },
    });
  }
}
