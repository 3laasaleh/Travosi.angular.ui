import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './packages-page.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './packages-page.scss',
})
export class Packages implements OnInit {
  packages: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  selectedPackage: any = null;
  showForm = true;
  page = 1;
  pageSize = 4;

  packageForm: any = {
    title: '',
    destinationId: '',
    price: '',
    duration: '',
    description: '',
    imageUrl: '',
    isActive: true,
  };

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
    if (!this.packageForm.title) {
      this.errorMessage = 'packageTitleRequired';
      return;
    }

    this.packages.unshift({ ...this.packageForm, id: Date.now() });
    this.successMessage = this.selectedPackage
      ? 'packageUpdated'
      : 'packageCreated';
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

  resetForm(): void {
    this.selectedPackage = null;
    this.packageForm = {
      title: '',
      destinationId: '',
      price: '',
      duration: '',
      description: '',
      imageUrl: '',
      isActive: true,
    };
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }


}
