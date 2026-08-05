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
  }

  closePreview(): void {
    this.previewPackage = null;
  }

  packageTitle(travelPackage: any): string {
    return travelPackage?.titleEng ?? travelPackage?.title ?? travelPackage?.nameEng ?? travelPackage?.name ?? '';
  }

  destinationName(travelPackage: any): string {
    return travelPackage?.destination?.nameEng ?? travelPackage?.destinationName ?? `Destination #${travelPackage?.destinationId ?? '-'}`;
  }

  imageUrl(travelPackage: any): string {
    const image = Array.isArray(travelPackage?.images) ? travelPackage.images[0] : null;
    const url = image?.imageUrl ?? image?.url ?? image?.path ?? travelPackage?.coverImageUrl ?? travelPackage?.imageUrl ?? '';
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    const path = String(url).replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }
}
