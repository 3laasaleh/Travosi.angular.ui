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
import { TranslatePipe } from '@ngx-translate/core';
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

const AIRPORT_RESULT_LIMIT = 20;
const AIRPORT_MIN_QUERY_LENGTH = 2;

@Component({
  selector: 'app-flights-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, NumbersOnlyDirective, DatePicker],
  templateUrl: './flights-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsFromCard implements OnInit, OnChanges {
  private readonly destroyRef = inject(DestroyRef);
  private readonly airportSearchService = inject(AirportSearchService);
  private readonly airportFocused: Record<AirportField, boolean> = {
    departure: false,
    arrival: false,
  };
  private allAirports: AirportSearchResult[] = [];
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
    this.loadAirports();
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

  loadAirports(): void {
    this.airportSearchService.loadAll().pipe(
      catchError(() => of([] as AirportSearchResult[])),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe((airports) => {
      this.allAirports = airports;
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
    const codeControl = this.airportCodeControl(field);
    control.setValue(airport.value, { emitEvent: false });
    control.markAsDirty();
    codeControl.setValue(airport.code, { emitEvent: false });
    codeControl.markAsDirty();
    this.flightForm.updateValueAndValidity();
    this.setAirportResults(field, []);
    this.setAirportActiveIndex(field, -1);
    this.closeAirportResults(field);
  }

  airportLocation(airport: AirportSearchResult): string {
    return [airport.city, airport.country].filter((part) => !!part).join(', ');
  }

  openAirportResults(field: AirportField): void {
    this.airportFocused[field] = true;
    const shouldOpen = this.airportQuery(field).length >= AIRPORT_MIN_QUERY_LENGTH
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
      && this.airportCodeControl(field).hasError('required');
  }

  private populateForm(flight: FlightDTO): void {
    const departureAirport = flight.departureAirport?.trim() ?? '';
    const arrivalAirport = flight.arrivalAirport?.trim() ?? '';
    this.flightForm.setValue({
      flightNumber: flight.flightNumber ?? '',
      airlineId: flight.airlineId ?? null,
      departureAirport,
      departureAirportCode: this.existingAirportCode(departureAirport),
      arrivalAirport,
      arrivalAirportCode: this.existingAirportCode(arrivalAirport),
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
      departureAirportCode: '',
      arrivalAirport: '',
      arrivalAirportCode: '',
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
        this.airportCodeControl(field).setValue('', { emitEvent: false });
        this.setAirportResults(field, []);
        this.setAirportActiveIndex(field, -1);
        this.setAirportState(field, {
          loading: query.length >= AIRPORT_MIN_QUERY_LENGTH && this.allAirports.length === 0,
          failed: false,
          open: this.airportFocused[field] && query.length >= AIRPORT_MIN_QUERY_LENGTH,
        });
        this.flightForm.updateValueAndValidity({ emitEvent: false });
        this.cdr.markForCheck();
      }),
      debounceTime(200),
      switchMap((query) => {
        if (query.length < AIRPORT_MIN_QUERY_LENGTH) {
          return of({ results: [] as AirportSearchResult[], failed: false });
        }
        if (this.allAirports.length) {
          return of({ results: this.filterAirports(query), failed: false });
        }
        return this.airportSearchService.search({ query, limit: AIRPORT_RESULT_LIMIT }).pipe(
          map((results) => ({ results, failed: false })),
          catchError(() => of({ results: [] as AirportSearchResult[], failed: true })),
        );
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(({ results, failed }) => {
      this.setAirportResults(field, results);
      this.setAirportActiveIndex(field, -1);
      this.setAirportState(field, {
        loading: false,
        failed,
        open: this.airportFocused[field] && this.airportQuery(field).length >= AIRPORT_MIN_QUERY_LENGTH,
      });
      this.cdr.markForCheck();
    });
  }

  private filterAirports(query: string): AirportSearchResult[] {
    const tokens = query.toLowerCase().split(/[\s,\-/()]+/).filter((token) => !!token);
    if (!tokens.length) return [];
    const term = tokens.join(' ');

    return this.allAirports
      .map((airport) => ({ airport, score: this.scoreAirport(airport, tokens, term) }))
      .filter((match) => match.score < Number.MAX_SAFE_INTEGER)
      .sort((left, right) => left.score - right.score
        || left.airport.name.localeCompare(right.airport.name))
      .slice(0, AIRPORT_RESULT_LIMIT)
      .map((match) => match.airport);
  }

  private scoreAirport(airport: AirportSearchResult, tokens: string[], term: string): number {
    const code = airport.code.toLowerCase();
    if (code === term) return 0;
    if (code.startsWith(term)) return 1;
    if (airport.city.toLowerCase().startsWith(term)) return 2;
    if (airport.name.toLowerCase().startsWith(term)) return 3;

    const haystack = `${code} ${airport.icaoCode} ${airport.name} ${airport.city} ${airport.country}`.toLowerCase();
    return tokens.every((token) => haystack.includes(token)) ? 4 : Number.MAX_SAFE_INTEGER;
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
    this.cdr.markForCheck();
  }

  private airportControl(field: AirportField) {
    return field === 'departure'
      ? this.flightForm.controls.departureAirport
      : this.flightForm.controls.arrivalAirport;
  }

  private airportCodeControl(field: AirportField) {
    return field === 'departure'
      ? this.flightForm.controls.departureAirportCode
      : this.flightForm.controls.arrivalAirportCode;
  }

  private airportQuery(field: AirportField): string {
    return this.airportControl(field).value.trim();
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

  private existingAirportCode(value: string): string {
    const code = /^([A-Za-z]{3})\s*-\s*/.exec(value)?.[1];
    if (code) return code.toUpperCase();
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
      departureAirportCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      arrivalAirport: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(250)],
      }),
      arrivalAirportCode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
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
