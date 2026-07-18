import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './packages-page.html',
  styleUrl: './packages-page.scss',
})
export class Packages implements OnInit {
  packages: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  selectedPackage: any = null;
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
    this.packages = this.getFallbackPackages();
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
      this.errorMessage = 'Please add a package title.';
      return;
    }

    this.packages.unshift({ ...this.packageForm, id: Date.now() });
    this.successMessage = this.selectedPackage ? 'Package updated.' : 'Package created successfully.';
    this.resetForm();
  }

  startEdit(pkg: any): void {
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
    this.successMessage = 'Package deactivated.';
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

  private getFallbackPackages(): any[] {
    return [
      { id: 1, title: 'Golden Hour Escape', destinationId: 1, price: '$920', duration: '5 Days', description: 'Beachfront relax and cultural dinner.', imageUrl: '', isActive: true },
      { id: 2, title: 'Desert Nights', destinationId: 2, price: '$1180', duration: '6 Days', description: 'Desert camp and local excursions.', imageUrl: '', isActive: true },
    ];
  }
}
