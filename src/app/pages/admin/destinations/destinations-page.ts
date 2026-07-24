import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './destinations-page.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './destinations-page.scss',
})
export class Destinations implements OnInit {
  destinations: any[] = [];
  viewMode: 'table' | 'grid' = 'table';
  page = 1;
  pageSize = 6;
  selectedDestination: any = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  destinationForm: any = {
    name: '',
    country: '',
    city: '',
    description: '',
    imageUrl: '',
    isActive: true,
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.destinations.length / this.pageSize));
  }

  get pagedDestinations(): any[] {
    const start = (this.page - 1) * this.pageSize;
    return this.destinations.slice(start, start + this.pageSize);
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.adminService
      .getDestinations(1, 100)
      .pipe(
        catchError(() => {
          this.errorMessage =
            'The destination service is currently unavailable. Showing local sample data.';
          return of({ data: this.getFallbackDestinations() });
        }),
      )
      .subscribe((res: any) => {
        const payload = res?.data ?? res;
        this.destinations = Array.isArray(payload)
          ? payload
          : (payload?.items ?? payload?.destinations ?? payload?.result ?? []);
        this.page = 1;
        this.isLoading = false;
      });
  }

  saveDestination(): void {
    if (!this.destinationForm.name) {
      this.errorMessage = 'Please add a destination name.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const payload = {
      name: this.destinationForm.name,
      country: this.destinationForm.country,
      city: this.destinationForm.city,
      description: this.destinationForm.description,
      imageUrl: this.destinationForm.imageUrl,
      isActive: this.destinationForm.isActive !== false,
    };

    const request$ = this.selectedDestination
      ? this.adminService.updateDestination(this.selectedDestination.id, payload)
      : this.adminService.createDestination(payload);

    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'The destination could not be saved right now.';
          this.isLoading = false;
          return of({});
        }),
      )
      .subscribe((res: any) => {
        if (this.selectedDestination) {
          Object.assign(this.selectedDestination, payload);
          this.successMessage = 'Destination updated successfully.';
        } else {
          this.destinations.unshift({ ...payload, id: res?.id ?? Date.now() });
          this.successMessage = 'Destination created successfully.';
        }
        this.resetForm();
        this.isLoading = false;
      });
  }

  startEdit(destination: any): void {
    this.selectedDestination = destination;
    this.destinationForm = {
      name: destination.name ?? '',
      country: destination.country ?? '',
      city: destination.city ?? '',
      description: destination.description ?? '',
      imageUrl: destination.imageUrl ?? '',
      isActive: destination.isActive !== false,
    };
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deactivateDestination(destination: any): void {
    this.isLoading = true;
    this.adminService
      .deactivateDestination(destination.id)
      .pipe(
        catchError(() => {
          destination.isActive = false;
          this.successMessage = 'Destination deactivated locally.';
          this.isLoading = false;
          return of({});
        }),
      )
      .subscribe(() => {
        destination.isActive = false;
        this.successMessage = 'Destination deactivated successfully.';
        this.isLoading = false;
      });
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

  private resetForm(): void {
    this.selectedDestination = null;
    this.destinationForm = {
      name: '',
      country: '',
      city: '',
      description: '',
      imageUrl: '',
      isActive: true,
    };
  }

  private getFallbackDestinations(): any[] {
    return [
      {
        id: 1,
        name: 'Santorini',
        country: 'Greece',
        city: 'Cyclades',
        description: 'A classic island escape.',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        isActive: true,
      },
      {
        id: 2,
        name: 'Marrakech',
        country: 'Morocco',
        city: 'Marrakech',
        description: 'A vibrant desert and culture destination.',
        imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada',
        isActive: true,
      },
      {
        id: 3,
        name: 'Reykjavík',
        country: 'Iceland',
        city: 'Reykjavík',
        description: 'Northern lights and volcanic landscapes.',
        imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        isActive: false,
      },
    ];
  }
}
