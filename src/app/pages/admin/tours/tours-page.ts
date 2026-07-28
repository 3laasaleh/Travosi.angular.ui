import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToursFromCard } from './tours-from-card/tours-from-card';
import { ToursList } from './tours-list/tours-list';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [RouterLink, TranslatePipe, ToursFromCard, ToursList],
  templateUrl: './tours-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tours-page.scss',
})
export class Tours {
  readonly currencies = [
    { id: 2, code: 'USD' },
    { id: 1, code: 'EGP' },
  ];
  viewMode: 'table' | 'grid' = 'table';
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
    this.selectedTour = tour;
    this.showForm = true;
  }

  clearSelectedTour(): void {
    this.selectedTour = null;
  }

  handleTourSaved(): void {
    this.selectedTour = null;
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
      `Destination #${tour?.destinationId}`
    );
  }

  tourDuration(tour: any): string {
    const days = Number(tour?.durationDays ?? 0);
    const hours = Number(tour?.durationhours ?? tour?.durationHours ?? 0);
    return `${days}d ${hours}h`;
  }

  tourPrice(tour: any): string {
    const currency = this.currencies.find((item) => item.id === Number(tour?.currencyId));
    return `${tour?.pricePerPerson ?? tour?.price ?? 0} ${currency?.code ?? ''}`.trim();
  }

  getImages(tour: any): any[] {
    if (Array.isArray(tour?.images) && tour.images.length) return tour.images;
    const cover = tour?.coverImageUrl ?? tour?.imageUrl;
    return cover ? [{ url: cover }] : [];
  }

  imageUrl(image: any): string {
    return typeof image === 'string' ? image : (image?.url ?? image?.imageUrl ?? image?.path ?? '');
  }
}
