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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { FLIGHT_CLASS_OPTIONS, FlightClassEnum } from '../flight-class.enum';

export interface FlightDTO {
  id: number;
  flightNumber: string;
  airlineId: number;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  flightClass: FlightClassEnum;
}

@Component({
  selector: 'app-flights-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, NumbersOnlyDirective],
  templateUrl: './flights-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsFromCard implements OnInit, OnChanges {
  @Input() selectedFlight: FlightDTO | null = null;
  @Output() flightSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  flightForm = this.createForm();
  airlines: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  readonly flightClassOptions = FLIGHT_CLASS_OPTIONS;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAirlines();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedFlight']) return;
    if (this.selectedFlight) this.populateForm(this.selectedFlight);
    else this.resetForm(false);
  }

  loadAirlines(): void {
    this.apiService.get('Airlines/GetAll?page=1&pageSize=100').pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.airlines ?? pageData;
      this.airlines = Array.isArray(rows) ? rows : [];
    });
  }

  saveFlight(): void {
    if (this.isLoading) return;
    if (this.flightForm.invalid) {
      this.flightForm.markAllAsTouched();
      return;
    }
    const form = this.flightForm.getRawValue();
    const payload: any = {
      flightNumber: form.flightNumber.trim(),
      airlineId: Number(form.airlineId),
      departureAirport: form.departureAirport.trim(),
      arrivalAirport: form.arrivalAirport.trim(),
      departureTime: form.departureTime,
      arrivalTime: form.arrivalTime,
      price: Number(form.price),
      availableSeats: Number(form.availableSeats),
      flightClass: Number(form.flightClass),
    };
    if (this.selectedFlight?.id) payload.id = this.selectedFlight.id;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = this.selectedFlight
      ? this.apiService.put('Flights', payload)
      : this.apiService.post('Flights', payload);
    request$
      .pipe(
        catchError(() => {
          this.errorMessage = 'flightSaveError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        if (!res.isSuccess) {
          this.errorMessage = res.message;
          return;
        }
        this.successMessage = res.message;
        this.resetForm(false);
        this.flightSaved.emit();
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }

  private populateForm(flight: FlightDTO): void {
    this.flightForm.setValue({
      flightNumber: flight.flightNumber ?? '',
      airlineId: flight.airlineId ?? null,
      departureAirport: flight.departureAirport ?? '',
      arrivalAirport: flight.arrivalAirport ?? '',
      departureTime: this.toLocalInput(flight.departureTime),
      arrivalTime: this.toLocalInput(flight.arrivalTime),
      price: flight.price ?? 0,
      availableSeats: flight.availableSeats ?? 0,
      flightClass: flight.flightClass ?? FlightClassEnum.Economy,
    });
  }

  private toLocalInput(value?: string): string {
    if (!value) return '';
    return value.length > 16 ? value.substring(0, 16) : value;
  }

  private resetForm(emitCancel: boolean): void {
    this.flightForm.reset({
      flightNumber: '',
      airlineId: null,
      departureAirport: '',
      arrivalAirport: '',
      departureTime: '',
      arrivalTime: '',
      price: 0,
      availableSeats: 0,
      flightClass: FlightClassEnum.Economy,
    });
    if (emitCancel) this.editCancelled.emit();
  }

  private createForm() {
    return new FormGroup({
      flightNumber: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      airlineId: new FormControl<number | null>(null, { validators: [Validators.required] }),
      departureAirport: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      arrivalAirport: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      departureTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      arrivalTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      availableSeats: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      flightClass: new FormControl(FlightClassEnum.Economy, { nonNullable: true, validators: [Validators.required] }),
    });
  }
}
