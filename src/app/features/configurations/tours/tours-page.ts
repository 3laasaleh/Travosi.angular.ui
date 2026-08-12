import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ToursFromCard } from './tours-from-card/tours-from-card';
import { ToursList } from './tours-list/tours-list';
import { ItineraryTimeline } from '../../../shared/components/itinerary-timeline/itinerary-timeline';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [RouterLink, TranslatePipe, ToursFromCard, ToursList, ItineraryTimeline],
  templateUrl: './tours-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tours-page.scss',
})
export class Tours {
  private readonly translate = inject(TranslateService);
  readonly currencies = [
    { id: 2, code: 'USD' },
    { id: 1, code: 'EGP' },
  ];
  viewMode: 'table' | 'grid' = 'grid';
  showForm = false;
  selectedTour: any = null;
  previewTour: any = null;
  previewImageIndex = 0;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedTour = null;
  }

  selectTourForEdit(tour: any): void {
    if (tour?.isActive !== false) return;
    this.selectedTour = tour;
    this.showForm = true;
  }

  clearSelectedTour(): void {
    this.selectedTour = null;
    this.showForm = false;
  }

  handleTourSaved(): void {
    this.selectedTour = null;
    this.showForm = false;
    this.refreshToken++;
  }

  openPreview(tour: any): void {
    this.previewTour = tour;
    this.previewImageIndex = 0;
  }

  closePreview(): void {
    this.previewTour = null;
    this.previewImageIndex = 0;
  }

  showPreviewImage(index: number): void {
    this.previewImageIndex = index;
  }

  previewPreviousImage(): void {
    const count = this.getImages(this.previewTour).length;
    if (count) this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
  }

  previewNextImage(): void {
    const count = this.getImages(this.previewTour).length;
    if (count) this.previewImageIndex = (this.previewImageIndex + 1) % count;
  }

  destinationName(tour: any): string {
    return (
      tour?.destination?.nameEng ??
      tour?.destinationName ??
      this.translate.instant('destinationNumber', { id: tour?.destinationId ?? '-' })
    );
  }

  tourDuration(tour: any): string {
    const days = Number(tour?.durationDays ?? 0);
    const hours = Number(tour?.durationhours ?? tour?.durationHours ?? 0);
    return this.translate.instant('durationDaysHours', { days, hours });
  }

  tourPrice(tour: any): string {
    const currency = this.currencies.find((item) => item.id === Number(tour?.currencyId));
    return `${tour?.pricePerPerson ?? tour?.price ?? 0} ${currency?.code ?? ''}`.trim();
  }

  getItinerary(tour: any): any[] {
    const itinerary = tour?.itinerary ?? tour?.itineraries;
    return Array.isArray(itinerary) ? itinerary : [];
  }

  itineraryTime(item: any): string {
    const startTime = this.formatTime(item?.startTime);
    const endTime = this.formatTime(item?.endTime);
    return [startTime, endTime].filter(Boolean).join(' - ');
  }

  getImages(tour: any): any[] {
    const cover = tour?.coverImageUrl ?? tour?.imageUrl;
    const images = Array.isArray(tour?.images) ? tour.images : [];
    if (!cover) return images;
    const coverIndex = images.findIndex((image: any) => this.imageMatchesCover(image, cover));
    if (coverIndex < 0) return [{ url: cover }, ...images];
    return [images[coverIndex], ...images.filter((_: any, index: number) => index !== coverIndex)];
  }

  imageUrl(image: any): string {
    const url = typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? '');
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private imageMatchesCover(image: any, cover: string): boolean {
    return this.normalizeImagePath(this.imageUrl(image)) === this.normalizeImagePath(cover);
  }

  private normalizeImagePath(url: string): string {
    return String(url ?? '')
      .trim()
      .replace(/\\/g, '/')
      .replace(/^https?:\/\/[^/]+\/images\//i, '')
      .replace(/^\/+/, '')
      .replace(/^images\//i, '')
      .toLowerCase();
  }

  private formatTime(value: unknown): string {
    if (typeof value !== 'string') return '';
    const match = value.match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : '';
  }
}
