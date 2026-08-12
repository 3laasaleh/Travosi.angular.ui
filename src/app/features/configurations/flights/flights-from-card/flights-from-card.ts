import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, debounceTime, distinctUntilChanged, finalize, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
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

interface AirportSearchResult {
  placeId: string;
  name: string;
  description: string;
  displayName: string;
}

@Component({
  selector: 'app-flights-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, NumbersOnlyDirective, DatePicker],
  templateUrl: './flights-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsFromCard implements OnInit, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private readonly translate = inject(TranslateService);
  @Input() selectedFlight: FlightDTO | null = null;
  @Output() flightSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  flightForm = this.createForm();
  airlines: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  departureAirports: AirportSearchResult[] = [];
  arrivalAirports: AirportSearchResult[] = [];
  departureAirportLoading = false;
  arrivalAirportLoading = false;
  departureAirportSearchFailed = false;
  arrivalAirportSearchFailed = false;
  departureAirportOpen = false;
  arrivalAirportOpen = false;
  readonly flightClassOptions = FLIGHT_CLASS_OPTIONS;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadAirlines();
    this.configureAirportSearch('departure');
    this.configureAirportSearch('arrival');
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

  selectAirport(field: 'departure' | 'arrival', airport: AirportSearchResult): void {
    const control = field === 'departure'
      ? this.flightForm.controls.departureAirport
      : this.flightForm.controls.arrivalAirport;
    control.setValue(airport.displayName, { emitEvent: false });
    control.markAsDirty();
    control.updateValueAndValidity();
    this.flightForm.updateValueAndValidity();
    this.closeAirportResults(field);
  }

  openAirportResults(field: 'departure' | 'arrival'): void {
    if (field === 'departure') this.departureAirportOpen = true;
    else this.arrivalAirportOpen = true;
  }

  closeAirportResultsLater(field: 'departure' | 'arrival'): void {
    setTimeout(() => this.closeAirportResults(field), 160);
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
    this.closeAirportResults('departure');
    this.closeAirportResults('arrival');
    if (emitCancel) this.editCancelled.emit();
  }

  private configureAirportSearch(field: 'departure' | 'arrival'): void {
    const control = field === 'departure'
      ? this.flightForm.controls.departureAirport
      : this.flightForm.controls.arrivalAirport;

    control.valueChanges.pipe(
      map((value) => value.trim()),
      debounceTime(300),
      distinctUntilChanged(),
      tap((query) => {
        this.setAirportState(field, { loading: query.length >= 2, failed: false, open: true });
        if (query.length < 2) this.setAirportResults(field, []);
        this.cdr.markForCheck();
      }),
      switchMap((query) => {
        if (query.length < 2) return of({ results: [] as AirportSearchResult[], failed: false });
        const language = this.translate.currentLang?.() || 'en';
        const url = `Airports/search?query=${encodeURIComponent(query)}&language=${encodeURIComponent(language)}`;
        return this.apiService.get(url).pipe(
          map((response: any) => ({
            results: response?.isSuccess && Array.isArray(response?.data) ? response.data : [],
            failed: response?.isSuccess === false,
          })),
          catchError(() => of({ results: [] as AirportSearchResult[], failed: true })),
        );
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ results, failed }) => {
      this.setAirportResults(field, results);
      this.setAirportState(field, { loading: false, failed, open: true });
      this.cdr.markForCheck();
    });
  }

  private setAirportResults(field: 'departure' | 'arrival', results: AirportSearchResult[]): void {
    if (field === 'departure') this.departureAirports = results;
    else this.arrivalAirports = results;
  }

  private setAirportState(
    field: 'departure' | 'arrival',
    state: { loading: boolean; failed: boolean; open: boolean },
  ): void {
    if (field === 'departure') {
      this.departureAirportLoading = state.loading;
      this.departureAirportSearchFailed = state.failed;
      this.departureAirportOpen = state.open;
    } else {
      this.arrivalAirportLoading = state.loading;
      this.arrivalAirportSearchFailed = state.failed;
      this.arrivalAirportOpen = state.open;
    }
  }

  private closeAirportResults(field: 'departure' | 'arrival'): void {
    if (field === 'departure') this.departureAirportOpen = false;
    else this.arrivalAirportOpen = false;
    this.cdr.markForCheck();
  }

  private static differentAirportsValidator(control: AbstractControl): ValidationErrors | null {
    const departure = String(control.get('departureAirport')?.value ?? '').trim().toLocaleLowerCase();
    const arrival = String(control.get('arrivalAirport')?.value ?? '').trim().toLocaleLowerCase();
    return departure && arrival && departure === arrival ? { sameAirport: true } : null;
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
    }, { validators: FlightsFromCard.differentAirportsValidator });
  }
}
