import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NumbersOnlyDirective } from '../../../core/directives/numbers-only.directive';
import {
  createEmptyTourItinerary,
  readTourItinerary,
  toTourItineraryPayload,
  TourItineraryItem,
} from '../shared/tour-itinerary.model';
import { PaginationOne } from '../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

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

  packageForm: any = this.createEmptyPackageForm();
  itineraryDraft: TourItineraryItem | null = null;
  itineraryDraftIsChild = false;
  private itineraryDraftCollection: TourItineraryItem[] | null = null;
  private itineraryDraftIndex: number | null = null;

  ngOnInit(): void {
  }

  get pagedPackages(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.packages.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.packages.length / this.pageSize));
  }

  savePackage(): void {
    if (this.itineraryDraft) {
      this.errorMessage = 'saveItineraryStepFirst';
      return;
    }
    if (!this.packageForm.title.trim()) {
      this.errorMessage = 'packageTitleRequired';
      return;
    }
    if (this.hasUntitledItinerary(this.packageForm.itinerary)) {
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
    this.closeItineraryEditor();
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
      itinerary: (Array.isArray(pkg.itinerary ?? pkg.itineraries)
        ? (pkg.itinerary ?? pkg.itineraries)
        : []).map((item: any) => this.readTwoLevelItinerary(item)),
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
    this.closeItineraryEditor();
    this.selectedPackage = null;
    this.packageForm = this.createEmptyPackageForm();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  openItineraryStepEditor(): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = createEmptyTourItinerary();
    this.itineraryDraftCollection = this.packageForm.itinerary;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
  }

  openItineraryChildEditor(parent: TourItineraryItem): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = {
      ...createEmptyTourItinerary(),
      parentId: parent.id > 0 ? parent.id : null,
      isChildNode: true,
    };
    this.itineraryDraftCollection = parent.childs;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = true;
  }

  editItineraryStep(
    collection: TourItineraryItem[],
    index: number,
    isChild: boolean,
  ): void {
    if (this.itineraryDraft) return;
    this.itineraryDraft = readTourItinerary(collection[index]);
    this.itineraryDraftCollection = collection;
    this.itineraryDraftIndex = index;
    this.itineraryDraftIsChild = isChild;
  }

  saveItineraryStep(): void {
    if (!this.itineraryDraft || !this.itineraryDraftCollection) return;
    if (!this.itineraryDraft.title.trim()) {
      this.errorMessage = 'stepTitleRequired';
      return;
    }
    if (this.itineraryDraftIndex === null) {
      this.itineraryDraftCollection.push(this.itineraryDraft);
    } else {
      this.itineraryDraftCollection[this.itineraryDraftIndex] = this.itineraryDraft;
    }
    this.errorMessage = '';
    this.closeItineraryEditor();
  }

  cancelItineraryStep(): void {
    this.closeItineraryEditor();
  }

  removeItineraryStep(collection: TourItineraryItem[], index: number): void {
    if (this.itineraryDraft) return;
    collection.splice(index, 1);
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
      itinerary: [] as TourItineraryItem[],
    };
  }

  private hasUntitledItinerary(items: TourItineraryItem[]): boolean {
    return items.some(
      (item) => !item.title.trim() || this.hasUntitledItinerary(item.childs),
    );
  }

  private readTwoLevelItinerary(item: any): TourItineraryItem {
    const itinerary = readTourItinerary(item);
    itinerary.childs = itinerary.childs.map((child) => ({ ...child, childs: [] }));
    return itinerary;
  }

  private closeItineraryEditor(): void {
    this.itineraryDraft = null;
    this.itineraryDraftCollection = null;
    this.itineraryDraftIndex = null;
    this.itineraryDraftIsChild = false;
  }
}
