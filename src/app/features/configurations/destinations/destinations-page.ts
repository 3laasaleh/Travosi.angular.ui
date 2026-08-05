import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { DestinationsFromCard } from './destinations-from-card/destinations-from-card';
import { DestinationsList } from './destinations-list/destinations-list';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [RouterLink, TranslatePipe, DestinationsFromCard, DestinationsList],
  templateUrl: './destinations-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './destinations-page.scss',
})
export class Destinations {
  viewMode: 'table' | 'grid' = 'table';
  showForm = false;
  selectedDestination: any = null;
  previewDestination: any = null;
  previewImageIndex = 0;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedDestination = null;
  }

  selectDestinationForEdit(destination: any): void {
    this.selectedDestination = destination;
    this.showForm = true;
  }

  clearSelectedDestination(): void {
    this.selectedDestination = null;
  }

  handleDestinationSaved(): void {
    this.selectedDestination = null;
    this.refreshToken++;
  }

  openPreview(destination: any): void {
    this.previewDestination = destination;
    this.previewImageIndex = 0;
  }

  closePreview(): void {
    this.previewDestination = null;
    this.previewImageIndex = 0;
  }

  showPreviewImage(index: number): void {
    this.previewImageIndex = index;
  }

  previewPreviousImage(): void {
    const count = this.getImages(this.previewDestination).length;
    if (count) this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
  }

  previewNextImage(): void {
    const count = this.getImages(this.previewDestination).length;
    if (count) this.previewImageIndex = (this.previewImageIndex + 1) % count;
  }

  getImages(destination: any): any[] {
    if (Array.isArray(destination?.images)) return destination.images;
    return destination?.imageUrl ? [{ url: destination.imageUrl }] : [];
  }

  imageUrl(image: any): string {
    const url = typeof image === 'string'
      ? image
      : (image?.url ?? image?.imageUrl ?? image?.path ?? '');

    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;

    return `${environment.imageUrl}${String(url).replace(/^\/+/, '')}`;
  }
}
