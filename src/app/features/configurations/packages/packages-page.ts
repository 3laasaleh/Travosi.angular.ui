import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { PackagesFromCard } from './packages-from-card/packages-from-card';
import { PackagesList } from './packages-list/packages-list';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [RouterLink, TranslatePipe, PackagesFromCard, PackagesList],
  templateUrl: './packages-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './packages-page.scss',
})
export class Packages {
  viewMode: 'table' | 'grid' = 'grid';
  showForm = false;
  selectedPackage: any = null;
  previewPackage: any = null;
  previewImageIndex = 0;
  imageMagnifierOpen = false;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedPackage = null;
  }

  selectPackageForEdit(travelPackage: any): void {
    if (travelPackage?.isActive !== false) return;
    this.selectedPackage = travelPackage;
    this.showForm = true;
  }

  clearSelectedPackage(): void {
    this.selectedPackage = null;
    this.showForm = false;
  }

  handlePackageSaved(): void {
    this.selectedPackage = null;
    this.showForm = false;
    this.refreshToken++;
  }

  openPreview(travelPackage: any): void {
    this.previewPackage = travelPackage;
    this.previewImageIndex = 0;
    this.imageMagnifierOpen = false;
  }

  closePreview(): void {
    this.previewPackage = null;
    this.previewImageIndex = 0;
    this.imageMagnifierOpen = false;
  }

  showPreviewImage(index: number): void {
    if (index >= 0 && index < this.getImages(this.previewPackage).length) {
      this.previewImageIndex = index;
    }
  }

  previewPreviousImage(): void {
    const count = this.getImages(this.previewPackage).length;
    if (count) this.previewImageIndex = (this.previewImageIndex - 1 + count) % count;
  }

  previewNextImage(): void {
    const count = this.getImages(this.previewPackage).length;
    if (count) this.previewImageIndex = (this.previewImageIndex + 1) % count;
  }

  openImageMagnifier(): void {
    if (this.getImages(this.previewPackage)[this.previewImageIndex]) {
      this.imageMagnifierOpen = true;
    }
  }

  closeImageMagnifier(): void {
    this.imageMagnifierOpen = false;
  }

  packageTitle(travelPackage: any): string {
    return travelPackage?.titleEng ?? travelPackage?.title ?? travelPackage?.nameEng ?? travelPackage?.name ?? '';
  }

  destinationName(travelPackage: any): string {
    const destinations = Array.isArray(travelPackage?.destinations) ? travelPackage.destinations : [];
    if (destinations.length) {
      return destinations
        .map((destination: any) => destination?.destinationName ?? destination?.nameEng ?? destination?.name)
        .filter(Boolean)
        .join(', ');
    }
    return travelPackage?.destination?.nameEng ?? travelPackage?.destinationName ?? `Destination #${travelPackage?.destinationId ?? '-'}`;
  }

  getImages(travelPackage: any): any[] {
    if (Array.isArray(travelPackage?.images) && travelPackage.images.length) return travelPackage.images;
    const cover = travelPackage?.coverImageUrl ?? travelPackage?.imageUrl;
    return cover ? [{ imageUrl: cover }] : [];
  }

  imageUrl(image: any): string {
    const url = typeof image === 'string' ? image : (image?.imageUrl ?? image?.url ?? image?.path ?? '');
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  packagePrice(travelPackage: any): string {
    const price = Number(travelPackage?.pricePerPerson ?? travelPackage?.price ?? 0);
    return `$${Number.isFinite(price) ? price : 0}`;
  }
}
