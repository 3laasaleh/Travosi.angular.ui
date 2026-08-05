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
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';

@Component({
  selector: 'app-bookings-from-card',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, TranslatePipe],
  templateUrl: './bookings-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsFromCard implements OnInit, OnChanges {
  @Input() selectedBooking: any = null;
  @Output() bookingSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  bookingForm = this.createForm();
  agents: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedBooking']) return;
    if (this.selectedBooking) this.populateForm(this.selectedBooking);
    else this.resetForm(false);
  }

  loadAgents(): void {
    this.apiService.get('Account/GetAgents').pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe((response: any) => {
      if (response === null) return;
      const rows = response?.data ?? response;
      this.agents = Array.isArray(rows) ? rows : [];
    });
  }

  saveAssignment(): void {
    if (this.isLoading) return;
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const bookingId = Number(this.selectedBooking?.id ?? this.selectedBooking?.bookingId);
    if (!Number.isInteger(bookingId) || bookingId <= 0) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.apiService
      .patch(`Bookings/${bookingId}/AssignAgent`, { agentId: this.bookingForm.getRawValue().agentId })
      .pipe(
        catchError(() => {
          this.errorMessage = 'bookingAssignError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        if (res?.isSuccess === false) {
          this.errorMessage = res?.message || 'bookingAssignError';
          return;
        }
        this.successMessage = res?.message || 'bookingAssigned';
        this.bookingSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(booking: any): void {
    this.bookingForm.setValue({
      agentId: booking?.agentId ?? booking?.agent?.id ?? null,
    });
  }

  private resetForm(emitCancel: boolean): void {
    this.bookingForm.reset({ agentId: null });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      agentId: new FormControl<string | null>(null, { validators: [Validators.required] }),
    });
  }
}
