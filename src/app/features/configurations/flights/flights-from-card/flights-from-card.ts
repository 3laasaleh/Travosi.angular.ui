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
import { AirportSearchResult, AirportSearchService } from '../airport-search.service';
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

type AirportField = 'departure' | 'arrival';

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
  private readonly airportSearchService = inject(AirportSearchService);
  private readonly airportSessions: Record<AirportField, { token: string; interactionId: number }> = {
    departure: { token: '', interactionId: 0 },
    arrival: { token: '', interactionId: 0 },
  };
  private readonly airportFocused: Record<AirportField, boolean> = {
    departure: false,
    arrival: false,
  };
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
  departureAirportActiveIndex = -1;
  arrivalAirportActiveIndex = -1;
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

  selectAirport(field: AirportField, airport: AirportSearchResult): void {
    const control = this.airportControl(field);
    const placeIdControl = this.airportPlaceIdControl(field);
    control.setValue(airport.displayName, { emitEvent: false });
    control.markAsDirty();
    placeIdControl.setValue(airport.placeId, { emitEvent: false });
    placeIdControl.markAsDirty();
    this.flightForm.updateValueAndValidity();
    this.setAirportActiveIndex(field, -1);
    this.closeAirportResults(field);
    this.endAirportSearchSession(field);
  }

  openAirportResults(field: AirportField): void {
    this.airportFocused[field] = true;
    this.getAirportSessionToken(field);
    const shouldOpen = this.airportControl(field).value.trim().length >= 2
      && (this.airportResults(field).length > 0
        || this.airportLoading(field)
        || this.airportSearchFailed(field));
    if (field === 'departure') this.departureAirportOpen = shouldOpen;
    else this.arrivalAirportOpen = shouldOpen;
  }

  closeAirportResultsLater(field: AirportField): void {
    this.airportFocused[field] = false;
    setTimeout(() => {
      this.closeAirportResults(field);
    }, 160);
  }

  onAirportKeydown(field: AirportField, event: KeyboardEvent): void {
    const results = this.airportResults(field);
    const activeIndex = this.airportActiveIndex(field);

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeAirportResults(field);
      this.endAirportSearchSession(field);
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!results.length) return;
      this.openAirportResults(field);
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = activeIndex < 0
        ? (offset > 0 ? 0 : results.length - 1)
        : (activeIndex + offset + results.length) % results.length;
      this.setAirportActiveIndex(field, nextIndex);
      this.cdr.markForCheck();
      return;
    }

    if (event.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      this.selectAirport(field, results[activeIndex]);
    }
  }

  setAirportActiveIndex(field: AirportField, index: number): void {
    if (field === 'departure') this.departureAirportActiveIndex = index;
    else this.arrivalAirportActiveIndex = index;
  }

  airportOptionId(field: AirportField, index: number): string {
    return `${field}-airport-option-${index}`;
  }

  airportActiveDescendant(field: AirportField): string | null {
    const index = this.airportActiveIndex(field);
    return index >= 0 && this.airportResults(field)[index]
      ? this.airportOptionId(field, index)
      : null;
  }

  airportSelectionInvalid(field: AirportField): boolean {
    const airportControl = this.airportControl(field);
    return airportControl.touched
      && !!airportControl.value.trim()
      && this.airportPlaceIdControl(field).hasError('required');
  }

  private populateForm(flight: FlightDTO): void {
    const departureAirport = flight.departureAirport?.trim() ?? '';
    const arrivalAirport = flight.arrivalAirport?.trim() ?? '';
    this.flightForm.setValue({
      flightNumber: flight.flightNumber ?? '',
      airlineId: flight.airlineId ?? null,
      departureAirport,
      departureAirportPlaceId: this.existingAirportReference(departureAirport),
      arrivalAirport,
      arrivalAirportPlaceId: this.existingAirportReference(arrivalAirport),
      departureTime: this.toLocalInput(flight.departureTime),
      arrivalTime: this.toLocalInput(flight.arrivalTime),
      price: flight.price ?? 0,
      availableSeats: flight.availableSeats ?? 0,
      flightClass: flight.flightClass ?? FlightClassEnum.Economy,
    }, { emitEvent: false });
    this.clearAirportSearchState();
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
      departureAirportPlaceId: '',
      arrivalAirport: '',
      arrivalAirportPlaceId: '',
      departureTime: '',
      arrivalTime: '',
      price: 0,
      availableSeats: 0,
      flightClass: FlightClassEnum.Economy,
    }, { emitEvent: false });
    this.clearAirportSearchState();
    if (emitCancel) this.editCancelled.emit();
  }

  private configureAirportSearch(field: AirportField): void {
    const control = this.airportControl(field);

    control.valueChanges.pipe(
      map((value) => value.trim()),
      distinctUntilChanged(),
      tap((query) => {
        this.airportPlaceIdControl(field).setValue('', { emitEvent: false });
        this.setAirportResults(field, []);
        this.setAirportActiveIndex(field, -1);
        if (query.length < 2) this.endAirportSearchSession(field);
        this.setAirportState(field, {
          loading: query.length >= 2,
          failed: false,
          open: this.airportFocused[field] && query.length >= 2,
        });
        this.flightForm.updateValueAndValidity({ emitEvent: false });
        this.cdr.markForCheck();
      }),
      debounceTime(300),
      switchMap((query) => {
        if (query.length < 2) {
          return of({ results: [] as AirportSearchResult[], failed: false, interactionId: 0 });
        }
        const language = this.translate.currentLang?.() || 'en';
        const session = this.getAirportSession(field);
        return this.airportSearchService.search({
          query,
          language,
          sessionToken: session.token,
        }).pipe(
          map((results) => ({ results, failed: false, interactionId: session.interactionId })),
          catchError(() => of({
            results: [] as AirportSearchResult[],
            failed: true,
            interactionId: session.interactionId,
          })),
        );
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ results, failed, interactionId }) => {
      if (interactionId && this.airportSessions[field].interactionId !== interactionId) return;
      this.setAirportResults(field, results);
      this.setAirportActiveIndex(field, -1);
      this.setAirportState(field, {
        loading: false,
        failed,
        open: this.airportFocused[field] && this.airportControl(field).value.trim().length >= 2,
      });
      this.cdr.markForCheck();
    });
  }

  private setAirportResults(field: AirportField, results: AirportSearchResult[]): void {
    if (field === 'departure') this.departureAirports = results;
    else this.arrivalAirports = results;
  }

  private setAirportState(
    field: AirportField,
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

  private closeAirportResults(field: AirportField): void {
    if (field === 'departure') {
      this.departureAirportOpen = false;
      this.departureAirportActiveIndex = -1;
    } else {
      this.arrivalAirportOpen = false;
      this.arrivalAirportActiveIndex = -1;
    }
    this.cdr.markForCheck();
  }

  private clearAirportSearchState(): void {
    this.departureAirports = [];
    this.arrivalAirports = [];
    this.departureAirportLoading = false;
    this.arrivalAirportLoading = false;
    this.departureAirportSearchFailed = false;
    this.arrivalAirportSearchFailed = false;
    this.departureAirportOpen = false;
    this.arrivalAirportOpen = false;
    this.departureAirportActiveIndex = -1;
    this.arrivalAirportActiveIndex = -1;
    this.airportFocused.departure = false;
    this.airportFocused.arrival = false;
    this.endAirportSearchSession('departure');
    this.endAirportSearchSession('arrival');
    this.cdr.markForCheck();
  }

  private airportControl(field: AirportField) {
    return field === 'departure'
      ? this.flightForm.controls.departureAirport
      : this.flightForm.controls.arrivalAirport;
  }

  private airportPlaceIdControl(field: AirportField) {
    return field === 'departure'
      ? this.flightForm.controls.departureAirportPlaceId
      : this.flightForm.controls.arrivalAirportPlaceId;
  }

  private airportResults(field: AirportField): AirportSearchResult[] {
    return field === 'departure' ? this.departureAirports : this.arrivalAirports;
  }

  private airportActiveIndex(field: AirportField): number {
    return field === 'departure'
      ? this.departureAirportActiveIndex
      : this.arrivalAirportActiveIndex;
  }

  private airportLoading(field: AirportField): boolean {
    return field === 'departure' ? this.departureAirportLoading : this.arrivalAirportLoading;
  }

  private airportSearchFailed(field: AirportField): boolean {
    return field === 'departure'
      ? this.departureAirportSearchFailed
      : this.arrivalAirportSearchFailed;
  }

  private getAirportSession(field: AirportField): { token: string; interactionId: number } {
    const session = this.airportSessions[field];
    if (!session.token) {
      session.token = this.createSessionToken();
      session.interactionId++;
    }
    return session;
  }

  private getAirportSessionToken(field: AirportField): string {
    return this.getAirportSession(field).token;
  }

  private endAirportSearchSession(field: AirportField): void {
    const session = this.airportSessions[field];
    session.token = '';
    session.interactionId++;
  }

  private createSessionToken(): string {
    const cryptoApi = globalThis.crypto as Crypto & { randomUUID?: () => string };
    if (typeof cryptoApi?.randomUUID === 'function') return cryptoApi.randomUUID();
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }

  private existingAirportReference(value: string): string {
    return value ? `existing:${value.toLocaleLowerCase()}` : '';
  }

  private static differentAirportsValidator(control: AbstractControl): ValidationErrors | null {
    const departure = String(control.get('departureAirport')?.value ?? '').trim().toLocaleLowerCase();
    const arrival = String(control.get('arrivalAirport')?.value ?? '').trim().toLocaleLowerCase();
    return departure && arrival && departure === arrival ? { sameAirport: true } : null;
  }

  private static arrivalAfterDepartureValidator(control: AbstractControl): ValidationErrors | null {
    const departure = Date.parse(String(control.get('departureTime')?.value ?? ''));
    const arrival = Date.parse(String(control.get('arrivalTime')?.value ?? ''));
    if (!Number.isFinite(departure) || !Number.isFinite(arrival)) return null;
    return arrival > departure ? null : { arrivalNotAfterDeparture: true };
  }

  private createForm() {
    return new FormGroup({
      flightNumber: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      airlineId: new FormControl<number | null>(null, { validators: [Validators.required] }),
      departureAirport: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(250)],
      }),
      departureAirportPlaceId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      arrivalAirport: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(250)],
      }),
      arrivalAirportPlaceId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      departureTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      arrivalTime: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      availableSeats: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      flightClass: new FormControl(FlightClassEnum.Economy, { nonNullable: true, validators: [Validators.required] }),
    }, {
      validators: [
        FlightsFromCard.differentAirportsValidator,
        FlightsFromCard.arrivalAfterDepartureValidator,
      ],
    });
  }
}
