import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { DatePicker } from '../../../shared/components/date-picker/date-picker';

type VoucherReferenceKey = 'flightId' | 'hotelId' | 'tourId' | 'packageId';

interface VoucherTypeOption {
  id: number;
  key: string;
  referenceKey: VoucherReferenceKey;
}

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe, DatePicker],
  templateUrl: './vouchers-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Vouchers implements OnInit {
  showForm = false;
  vouchers: any[] = [];
  customers: any[] = [];
  flights: any[] = [];
  hotels: any[] = [];
  tours: any[] = [];
  packages: any[] = [];
  selectedId = 0;
  errorMessage = '';
  isListLoading = false;
  isOptionsLoading = false;
  optionsLoadError = false;
  isSaving = false;
  deletingId: number | null = null;
  downloadingId: number | null = null;

  readonly types: VoucherTypeOption[] = [
    { id: 1, key: 'flight', referenceKey: 'flightId' },
    { id: 2, key: 'hotel', referenceKey: 'hotelId' },
    { id: 3, key: 'tour', referenceKey: 'tourId' },
    { id: 4, key: 'package', referenceKey: 'packageId' },
  ];

  readonly form = new FormGroup({
    customerId: new FormControl<number | null>(null, Validators.required),
    serviceType: new FormControl(1, { nonNullable: true, validators: [Validators.required] }),
    serviceId: new FormControl<number | null>(null, Validators.required),
    serviceDate: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    endDate: new FormControl('', { nonNullable: true }),
  }, { validators: Vouchers.dateRangeValidator });

  constructor(
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
    private readonly translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.load();
    this.loadOptions();
  }

  get serviceOptions(): any[] {
    switch (this.form.controls.serviceType.value) {
      case 1: return this.flights;
      case 2: return this.hotels;
      case 3: return this.tours;
      case 4: return this.packages;
      default: return [];
    }
  }

  toggleForm(): void {
    if (this.isSaving) return;
    this.showForm = !this.showForm;
    if (!this.showForm) this.reset();
  }

  serviceTypeChanged(): void {
    this.form.controls.serviceId.reset(null);
    this.errorMessage = '';
  }

  save(): void {
    if (this.isSaving) return;
    if (this.form.hasError('invalidDateRange')) {
      this.form.markAllAsTouched();
      this.errorMessage = 'invalidVoucherDates';
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'invalidVoucherData';
      return;
    }

    const value = this.form.getRawValue();
    const type = this.types.find((option) => option.id === Number(value.serviceType));
    if (!type || value.serviceId === null) {
      this.errorMessage = 'invalidVoucherData';
      return;
    }

    const references: Record<VoucherReferenceKey, number | null> = {
      flightId: null,
      hotelId: null,
      tourId: null,
      packageId: null,
    };
    references[type.referenceKey] = Number(value.serviceId);

    const payload = {
      id: this.selectedId,
      customerId: Number(value.customerId),
      serviceType: Number(value.serviceType),
      serviceDate: value.serviceDate,
      endDate: value.endDate || null,
      ...references,
    };

    this.isSaving = true;
    this.errorMessage = '';
    const request$ = this.selectedId
      ? this.api.put('Vouchers', payload)
      : this.api.post('Vouchers', payload);

    request$.pipe(
      catchError((error) => {
        this.errorMessage = this.apiError(error, 'voucherSaveError');
        return of(null);
      }),
      finalize(() => {
        this.isSaving = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response, 'voucherSaveError');
        return;
      }
      this.showForm = false;
      this.reset();
      this.load();
    });
  }

  edit(voucher: any): void {
    this.reset();
    this.selectedId = Number(voucher.id);
    const serviceType = Number(voucher.serviceType);
    const serviceId = this.referenceId(voucher, serviceType);
    this.ensureSelectedServiceIsAvailable(voucher, serviceType, serviceId);
    this.form.setValue({
      customerId: Number(voucher.customerId),
      serviceType,
      serviceId,
      serviceDate: this.dateOnly(voucher.serviceDate),
      endDate: this.dateOnly(voucher.endDate),
    });
    this.showForm = true;
  }

  pdf(voucher: any): void {
    if (this.downloadingId !== null) return;
    this.downloadingId = Number(voucher.id);
    this.errorMessage = '';
    this.api.getFile(`Vouchers/${voucher.id}/Pdf`).pipe(
      catchError(() => {
        this.errorMessage = 'pdfDownloadError';
        return of(null);
      }),
      finalize(() => {
        this.downloadingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((blob) => {
      if (blob) this.download(blob, `${voucher.voucherNo || `voucher-${voucher.id}`}.pdf`);
    });
  }

  delete(voucher: any): void {
    if (this.deletingId !== null) return;
    const confirmed = confirm(
      `${this.translate.instant('confirmDeleteRecord')} ${this.translate.instant('recordDeleteWarning')}`,
    );
    if (!confirmed) return;

    this.deletingId = Number(voucher.id);
    this.errorMessage = '';
    this.api.delete('Vouchers', voucher.id).pipe(
      catchError((error) => {
        this.errorMessage = this.apiError(error, 'recordDeleteError');
        return of(null);
      }),
      finalize(() => {
        this.deletingId = null;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response, 'recordDeleteError');
        return;
      }
      this.load();
    });
  }

  customerName(customer: any): string {
    return customer?.companyName ?? `${customer?.firstName ?? ''} ${customer?.lastName ?? ''}`.trim();
  }

  serviceName(service: any): string {
    switch (this.form.controls.serviceType.value) {
      case 1:
        return [service?.flightNumber, `${service?.departureAirport ?? ''} - ${service?.arrivalAirport ?? ''}`]
          .filter(Boolean).join(' - ');
      case 2: return service?.name ?? '';
      case 3: return service?.titleEng ?? service?.titleAr ?? service?.name ?? '';
      case 4: return service?.nameEng ?? service?.nameAr ?? service?.name ?? '';
      default: return '';
    }
  }

  voucherTypeKey(value: unknown): string {
    return this.types.find((type) => type.id === Number(value))?.key ?? String(value ?? '');
  }

  loadOptions(): void {
    if (this.isOptionsLoading) return;
    this.isOptionsLoading = true;
    this.optionsLoadError = false;

    const safeGet = (url: string) => this.api.get(url).pipe(catchError(() => {
      this.optionsLoadError = true;
      return of(null);
    }));

    forkJoin({
      customers: safeGet('Customers?page=1&pageSize=100'),
      flights: safeGet('Flights/GetAll?page=1&pageSize=100'),
      hotels: safeGet('Hotels?page=1&pageSize=100'),
      tours: safeGet('Tours?page=1&pageSize=100'),
      packages: safeGet('Packages?page=1&pageSize=100'),
    }).pipe(finalize(() => {
      this.isOptionsLoading = false;
      this.cdr.markForCheck();
    })).subscribe((response) => {
      this.customers = this.rows(response.customers);
      this.flights = this.rows(response.flights);
      this.hotels = this.rows(response.hotels);
      this.tours = this.rows(response.tours);
      this.packages = this.rows(response.packages);
    });
  }

  private load(): void {
    this.isListLoading = true;
    this.api.get('Vouchers').pipe(
      catchError((error) => {
        this.errorMessage = this.apiError(error, 'voucherListLoadError');
        return of(null);
      }),
      finalize(() => {
        this.isListLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      if (response === null) return;
      if (response?.isSuccess === false) {
        this.errorMessage = this.responseError(response, 'voucherListLoadError');
        this.vouchers = [];
        return;
      }
      this.vouchers = this.rows(response);
    });
  }

  private rows(response: any): any[] {
    const payload = response?.data ?? response;
    const rows = Array.isArray(payload) ? payload : payload?.data ?? payload?.items ?? [];
    return Array.isArray(rows) ? rows : [];
  }

  private reset(): void {
    this.selectedId = 0;
    this.errorMessage = '';
    this.form.reset({ customerId: null, serviceType: 1, serviceId: null, serviceDate: '', endDate: '' });
  }

  private referenceId(voucher: any, serviceType: number): number | null {
    const type = this.types.find((option) => option.id === serviceType);
    const value = type ? voucher?.[type.referenceKey] : null;
    return value === null || value === undefined ? null : Number(value);
  }

  private ensureSelectedServiceIsAvailable(voucher: any, serviceType: number, serviceId: number | null): void {
    if (serviceId === null) return;
    const target = serviceType === 1 ? this.flights
      : serviceType === 2 ? this.hotels
        : serviceType === 3 ? this.tours
          : this.packages;
    if (target.some((option) => Number(option.id) === serviceId)) return;

    const fallback: any = { id: serviceId };
    if (serviceType === 1) fallback.flightNumber = voucher.serviceName;
    else if (serviceType === 2) fallback.name = voucher.serviceName;
    else if (serviceType === 3) fallback.titleEng = voucher.serviceName;
    else fallback.nameEng = voucher.serviceName;
    target.push(fallback);
  }

  private dateOnly(value: unknown): string {
    return typeof value === 'string' ? value.slice(0, 10) : '';
  }

  private responseError(response: any, fallback: string): string {
    const errors = Array.isArray(response?.errors)
      ? response.errors.filter((error: unknown) => typeof error === 'string' && error.trim())
      : [];
    return errors.length ? errors.join(' ') : response?.message || fallback;
  }

  private apiError(error: any, fallback: string): string {
    return this.responseError(error?.error, fallback);
  }

  private download(blob: Blob, name: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  private static dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const start = String(control.get('serviceDate')?.value ?? '');
    const end = String(control.get('endDate')?.value ?? '');
    return start && end && end < start ? { invalidDateRange: true } : null;
  }
}
