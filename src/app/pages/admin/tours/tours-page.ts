import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tours-page.html',
  styleUrl: './tours-page.scss',
})
export class Tours implements OnInit {
  tours: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  selectedTour: any = null;
  page = 1;
  pageSize = 5;

  tourForm: any = {
    title: '',
    destinationId: '',
    duration: '',
    price: '',
    overview: '',
    itinerary: '',
    imageUrl: '',
    isActive: true,
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadTours();
  }

  get pagedTours(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.tours.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.tours.length / this.pageSize));
  }

  loadTours(): void {
    this.isLoading = true;
    this.tours = this.getFallbackTours();
    this.isLoading = false;
  }

  saveTour(): void {
    if (!this.tourForm.title || !this.tourForm.destinationId) {
      this.errorMessage = 'Please add a tour title and destination.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      title: this.tourForm.title,
      destinationId: Number(this.tourForm.destinationId),
      duration: this.tourForm.duration,
      price: this.tourForm.price,
      overview: this.tourForm.overview,
      itinerary: this.tourForm.itinerary,
      imageUrl: this.tourForm.imageUrl,
      isActive: this.tourForm.isActive !== false,
    };

    const request$ = this.selectedTour
      ? this.adminService.createTour(payload)
      : this.adminService.createTour(payload);

    request$.pipe(catchError(() => {
      this.errorMessage = 'The tour could not be saved now.';
      this.isLoading = false;
      return of({});
    })).subscribe(() => {
      this.tours.unshift({ ...payload, id: Date.now() });
      this.successMessage = this.selectedTour ? 'Tour updated.' : 'Tour created successfully.';
      this.resetForm();
      this.isLoading = false;
    });
  }

  startEdit(tour: any): void {
    this.selectedTour = tour;
    this.tourForm = {
      title: tour.title ?? '',
      destinationId: tour.destinationId ?? '',
      duration: tour.duration ?? '',
      price: tour.price ?? '',
      overview: tour.overview ?? '',
      itinerary: tour.itinerary ?? '',
      imageUrl: tour.imageUrl ?? '',
      isActive: tour.isActive !== false,
    };
  }

  deactivateTour(tour: any): void {
    tour.isActive = false;
    this.successMessage = 'Tour deactivated.';
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
    this.selectedTour = null;
    this.tourForm = {
      title: '',
      destinationId: '',
      duration: '',
      price: '',
      overview: '',
      itinerary: '',
      imageUrl: '',
      isActive: true,
    };
  }

  private getFallbackTours(): any[] {
    return [
      { id: 1, title: 'Santorini Escape', destinationId: 1, duration: '5 Days', price: '$980', overview: 'Island hopping and sunset sailing.', itinerary: 'Day 1 Arrival\nDay 2 Village tour\nDay 3 Catamaran cruise', imageUrl: '', isActive: true },
      { id: 2, title: 'Marrakech Adventure', destinationId: 2, duration: '7 Days', price: '$1250', overview: 'Markets, desert camp, and cultural sites.', itinerary: 'Day 1 Arrival\nDay 2 Medina\nDay 3 Sahara', imageUrl: '', isActive: true },
    ];
  }
}
