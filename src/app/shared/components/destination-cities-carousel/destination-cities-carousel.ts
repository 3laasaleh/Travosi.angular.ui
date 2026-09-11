import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { UtilityService } from '../../../core/services/utilityservice';
import { CityHomeDTO } from '../../models/city-home.model';

@Component({
  selector: 'app-destination-cities-carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './destination-cities-carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationCitiesCarousel implements AfterViewInit, OnChanges, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly utilityService = inject(UtilityService);
  @Input() cities: CityHomeDTO[] = [];
  private swiper: Swiper | null = null;
  readonly instanceId = 'destination-cities-carousel';

  ngAfterViewInit(): void { this.initialize(); }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities'] && !changes['cities'].firstChange) setTimeout(() => this.initialize());
  }
  ngOnDestroy(): void { this.swiper?.destroy(true, true); }

  get selector(): string { return `#${this.instanceId}`; }
  cityName(city: CityHomeDTO): string {
    return city.title ?? '';
  }
  cityImage(city: CityHomeDTO): string {
    return this.utilityService.imageUrl(city.coverImageUrl ?? city.imageUrl ?? city.images?.[0]?.imageUrl ?? '');
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
