import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PaginationOne } from '../../../components/listing/tour-grid/pagination-one/pagination-one';
import { NumbersOnlyDirective } from '../../../core/directives/numbers-only.directive';
import {
  createEmptyTourItinerary,
  readTourItinerary,
  toTourItineraryPayload,
  TourItineraryItem,
} from '../shared/tour-itinerary.model';

interface EditableTourItineraryItem extends TourItineraryItem {
  clientId: string;
  parentClientId: string | null;
}

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe, PaginationOne, NumbersOnlyDirective],
  templateUrl: './packages-page.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './packages-page.scss',
})
export class Packages implements OnInit {
  readonly pageSizeOptions = [10, 20, 50];
  packages: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  selectedPackage: any = null;
  showForm = false;
  page = 1;
  pageSize = 10;
  private itineraryClientSequence = 0;

  packageForm: any = this.createEmptyPackageForm();

  ngOnInit(): void {
  }

  get pagedPackages(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.packages.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.packages.length / this.pageSize));
  }

  get rootItineraryItems(): EditableTourItineraryItem[] {
    const items = this.packageForm.itinerary as EditableTourItineraryItem[];
    const clientIds = new Set(items.map((item) => item.clientId));
    return items.filter(
      (item) =>
        !item.isChildNode ||
        !item.parentClientId ||
        !clientIds.has(item.parentClientId),
    );
  }

  itineraryChildren(parent: EditableTourItineraryItem): EditableTourItineraryItem[] {
    return (this.packageForm.itinerary as EditableTourItineraryItem[]).filter(
      (item) => item.isChildNode && item.parentClientId === parent.clientId,
    );
  }

  savePackage(): void {
    if (!this.packageForm.title.trim()) {
      this.errorMessage = 'packageTitleRequired';
      return;
    }
    if (this.packageForm.itinerary.some((item: TourItineraryItem) => !item.title.trim())) {
      this.errorMessage = 'stepTitleRequired';
      return;
    }

    const editing = this.selectedPackage;
    const packageRecord = {
      ...this.packageForm,
      id: editing?.id ?? Date.now(),
      title: this.packageForm.title.trim(),
      itinerary: this.packageForm.itinerary
        .map((item: TourItineraryItem) => toTourItineraryPayload(item))
        .filter((item: TourItineraryItem) => !!item.title || !!item.value || !!item.description),
    };
    if (editing) {
      this.packages = this.packages.map((pkg) => pkg.id === editing.id ? packageRecord : pkg);
    } else {
      this.packages = [packageRecord, ...this.packages];
    }
    this.errorMessage = '';
    this.successMessage = editing ? 'packageUpdated' : 'packageCreated';
    this.resetForm();
  }

  startEdit(pkg: any): void {
    this.showForm = true;
    this.selectedPackage = pkg;
    this.packageForm = {
      title: pkg.title ?? '',
      destinationId: pkg.destinationId ?? '',
      price: pkg.price ?? '',
      duration: pkg.duration ?? '',
      description: pkg.description ?? '',
      imageUrl: pkg.imageUrl ?? '',
      isActive: pkg.isActive !== false,
      itinerary: this.readEditableItinerary(pkg.itinerary ?? pkg.itineraries ?? []),
    };
  }

  deactivatePackage(pkg: any): void {
    pkg.isActive = false;
    this.successMessage = 'packageDeactivated';
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  onPageChange(page: number): void {
    if (page === this.page || page < 1 || page > this.totalPages) return;
    this.page = page;
  }

  onPageSizeChange(event: Event): void {
    const pageSize = Number((event.target as HTMLSelectElement).value);
    if (!this.pageSizeOptions.includes(pageSize)) return;
    this.pageSize = pageSize;
    this.page = 1;
  }

  resetForm(): void {
    this.selectedPackage = null;
    this.itineraryClientSequence = 0;
    this.packageForm = this.createEmptyPackageForm();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  addItineraryStep(): void {
    this.packageForm.itinerary.push({
      ...createEmptyTourItinerary(),
      clientId: this.nextItineraryClientId(),
      parentClientId: null,
    });
  }

  addItineraryChild(parent: EditableTourItineraryItem): void {
    const child: EditableTourItineraryItem = {
      ...createEmptyTourItinerary(),
      parentId: parent.id > 0 ? parent.id : null,
      isChildNode: true,
      clientId: this.nextItineraryClientId(),
      parentClientId: parent.clientId,
    };
    const items = this.packageForm.itinerary as EditableTourItineraryItem[];
    const parentIndex = items.indexOf(parent);
    let insertIndex = parentIndex + 1;
    while (insertIndex < items.length && items[insertIndex].parentClientId === parent.clientId) {
      insertIndex++;
    }
    items.splice(insertIndex, 0, child);
  }

  removeItineraryStep(item: EditableTourItineraryItem): void {
    this.packageForm.itinerary = (this.packageForm.itinerary as EditableTourItineraryItem[])
      .filter(
        (current) =>
          current !== item &&
          current.parentClientId !== item.clientId,
      );
  }

  private createEmptyPackageForm(): any {
    return {
      title: '',
      destinationId: '',
      price: '',
      duration: '',
      description: '',
      imageUrl: '',
      isActive: true,
      itinerary: [] as EditableTourItineraryItem[],
    };
  }

  private readEditableItinerary(itinerary: any[]): EditableTourItineraryItem[] {
    const items = Array.isArray(itinerary) ? itinerary : [];
    this.itineraryClientSequence = 0;
    const idToClientId = new Map<number, string>();
    items.forEach((item) => {
      const id = Number(item?.id);
      if (Number.isInteger(id) && id > 0) idToClientId.set(id, `server-itinerary-${id}`);
    });
    return items.map((item) => {
      const parsed = readTourItinerary(item);
      return {
        ...parsed,
        clientId: idToClientId.get(parsed.id) ?? this.nextItineraryClientId(),
        parentClientId: parsed.parentId
          ? (idToClientId.get(parsed.parentId) ?? `server-itinerary-${parsed.parentId}`)
          : null,
      };
    });
  }

  private nextItineraryClientId(): string {
    this.itineraryClientSequence++;
    return `new-itinerary-${this.itineraryClientSequence}`;
  }
}
