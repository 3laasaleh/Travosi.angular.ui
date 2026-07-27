import { environment } from './../../../../../environments/environment';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';

interface PaginationInfoDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

@Component({
  selector: 'app-admin-destinations-list',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './destinations-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsList implements OnInit, OnChanges {
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() refreshToken = 0;
  @Output() previewRequested = new EventEmitter<any>();
  @Output() editRequested = new EventEmitter<any>();

  destinations: any[] = [];
  isLoading = false;
  statusUpdatingId: number | null = null;
  errorMessage = '';
  successMessage = '';
  paginationInfo: PaginationInfoDTO = { page: 1, pageSize: 5, totalCount: 0, totalPages: 0 };

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshToken'] && !changes['refreshToken'].firstChange) {
      this.paginationInfo.page = 1;
      this.loadDestinations();
    }
  }

  loadDestinations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.adminService.getDestinations(this.paginationInfo.page, this.paginationInfo.pageSize).pipe(
      catchError(() => {
        this.errorMessage = 'destinationServiceUnavailable';
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.destinations ?? pageData;
      this.destinations = Array.isArray(rows) ? rows : [];
      this.paginationInfo = {
        page: Number(pageData?.page ?? this.paginationInfo.page),
        pageSize: Number(pageData?.pageSize ?? this.paginationInfo.pageSize),
        totalCount: Number(pageData?.totalCount ?? this.destinations.length),
        totalPages: Math.max(1, Number(pageData?.totalPages ?? 1)),
      };
    });
  }

  previousPage(): void {
    if (this.paginationInfo.page > 1) {
      this.paginationInfo.page--;
      this.loadDestinations();
    }
  }

  nextPage(): void {
    if (this.paginationInfo.page < this.paginationInfo.totalPages) {
      this.paginationInfo.page++;
      this.loadDestinations();
    }
  }

  deactivateDestination(destination: any): void {
    if (this.statusUpdatingId !== null || destination.isActive === false) return;
    this.statusUpdatingId = Number(destination.id);
    this.adminService.cangeStatus(destination.id).pipe(
      catchError(() => {
        this.errorMessage = 'destinationSaveError';
        return of(null);
      }),
      finalize(() => {
        this.statusUpdatingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      this.successMessage = 'destinationDeactivated';
      destination.isActive = false;
      this.cdr.markForCheck();
    });
  }

  async toggleDestinationStatus(destination: any): Promise<void> {
    if (this.statusUpdatingId !== null) return;
    const result = await Swal.fire({
      title: this.translate.instant('confirmStatusChange'),
      text: this.translate.instant(
        destination.isActive ? 'confirmDeactivateDestination' : 'confirmActivateDestination',
      ),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('confirm'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: destination.isActive ? '#e11d48' : '#059669',
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    this.statusUpdatingId = Number(destination.id);
    this.adminService.cangeStatus(destination.id).pipe(
      catchError(() => {
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('statusUpdateError'),
        });
        return of({ statusToggleFailed: true });
      }),
      finalize(() => {
        this.statusUpdatingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response?.statusToggleFailed) return;
      destination.isActive = !destination.isActive;
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: this.translate.instant('statusUpdated'),
        showConfirmButton: false,
        timer: 2200,
        timerProgressBar: true,
      });
      this.cdr.markForCheck();
    });
  }

  getImages(destination: any): any[] {
    if (Array.isArray(destination?.images)) return destination.images;
    return destination?.imageUrl ? [{ url: environment.imageUrl +destination.imageUrl }] : [];
  }

  imageUrl(image: any): string {
    return  environment.imageUrl +image?.imageUrl ;
  }
}
