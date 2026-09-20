import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { validDate } from '../../../../core/services/custom.validators';
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { AirportPicker } from '../airport-picker/airport-picker';

type ConnectionType = 'DIRECT' | 'CONNECTING';
type FlightType = 'ONE_WAY' | 'ROUND_TRIP' | 'MULTI_CITY';
type PassengerType = 'adults' | 'children' | 'infants';
interface FlightSegmentValue {
  airlineId?: number;
  airlineCode?: string;
  flightNumber?: string;
  ticketNumber?: string;
  originAirport?: string;
  destinationAirport?: string;
  departureLocal?: string;
  departureTimeZone?: string;
  arrivalLocal?: string;
  arrivalTimeZone?: string;
  cabinClass?: string;
}
interface FlightLegValue {
  originAirport?: string;
  destinationAirport?: string;
  segments?: FlightSegmentValue[];
}

@Component({
  selector: 'app-flights-from-card',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, AirportPicker, NumbersOnlyDirective, DatePicker],
  templateUrl: './flights-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsFromCard implements OnInit, OnChanges {
  @ViewChild('passengerPicker') private passengerPicker?: ElementRef<HTMLElement>;
  @ViewChild('passengerTrigger') private passengerTrigger?: ElementRef<HTMLButtonElement>;
  @Input() selectedFlight: any = null;
  @Output() flightSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  readonly connectionTypes: ConnectionType[] = ['DIRECT', 'CONNECTING'];
  readonly flightTypeOptions: ReadonlyArray<{ value: FlightType; labelKey: string }> = [
    { value: 'ONE_WAY', labelKey: 'oneWay' },
    { value: 'ROUND_TRIP', labelKey: 'roundTrip' },
    { value: 'MULTI_CITY', labelKey: 'multiCity' },
  ];
  readonly cabinClasses = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];
  readonly passengerTypes: ReadonlyArray<{ key: PassengerType; labelKey: string; min: number }> = [
    { key: 'adults', labelKey: 'adults', min: 1 },
    { key: 'children', labelKey: 'children', min: 0 },
    { key: 'infants', labelKey: 'infants', min: 0 },
  ];
  readonly passengerMenuOpen = signal(false);
  airlines: any[] = [];
  isLoading = false;
  validationSubmitted = false;
  errorMessage = '';
  successMessage = '';

  readonly flightForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }),
    flightType: new FormControl<FlightType>('ONE_WAY', { nonNullable: true }),
    adults: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
    }),
    children: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    infants: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.pattern(/^\d+(?:\.\d+)?$/)],
    }),
    legs: new FormArray<FormGroup>([]),
  });

  constructor(
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.resetForm(false);
  }
  get legs(): FormArray<FormGroup> {
    return this.flightForm.controls.legs;
  }

  get today(): string {
    return FlightsFromCard.localDate(new Date());
  }

  togglePassengerMenu(): void {
    this.flightForm.controls.adults.markAsTouched();
    this.passengerMenuOpen.update((open) => !open);
  }

  passengerCount(type: PassengerType): number {
    return this.flightForm.controls[type].value;
  }

  changePassengerCount(type: PassengerType, change: -1 | 1): void {
    const control = this.flightForm.controls[type];
    const minimum = type === 'adults' ? 1 : 0;
    control.setValue(Math.max(minimum, control.value + change));
    control.markAsDirty();
    control.markAsTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.passengerMenuOpen() && !this.passengerPicker?.nativeElement.contains(event.target as Node)) {
      this.passengerMenuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.passengerMenuOpen()) return;
    this.passengerMenuOpen.set(false);
    this.passengerTrigger?.nativeElement.focus();
  }

  ngOnInit(): void {
    this.api
      .get('Airlines/GetAll?page=1&pageSize=100')
      .pipe(catchError(() => of(null)))
      .subscribe((response: any) => {
        const data = response?.data ?? response;
        this.airlines = data?.data ?? data?.items ?? (Array.isArray(data) ? data : []);
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedFlight']) return;
    if (this.selectedFlight) {
      if (Array.isArray(this.selectedFlight.legs)) this.populateForm(this.selectedFlight);
      else this.loadFlightForEdit(Number(this.selectedFlight.id));
    } else this.resetForm(false);
  }

  onTripTypeChange(type: FlightType): void {
    this.flightForm.controls.flightType.setValue(type);
    if (type === 'ONE_WAY') while (this.legs.length > 1) this.legs.removeAt(this.legs.length - 1);
    else if (type === 'ROUND_TRIP') {
      while (this.legs.length > 2) this.legs.removeAt(this.legs.length - 1);
      while (this.legs.length < 2) this.addLeg();
      this.copyReturnRoute();
    } else if (this.legs.length < 2) this.addLeg();
    this.flightForm.updateValueAndValidity();
  }

  addLeg(value: FlightLegValue = {}): void {
    const rows = value.segments?.length ? value.segments : [{}];
    const leg = new FormGroup(
      {
        originAirport: new FormControl(this.code(value.originAirport), {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
        }),
        destinationAirport: new FormControl(this.code(value.destinationAirport), {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
        }),
        connectionType: new FormControl<ConnectionType>(rows.length > 1 ? 'CONNECTING' : 'DIRECT', {
          nonNullable: true,
        }),
        segments: new FormArray<FormGroup>([]),
      },
      { validators: [FlightsFromCard.legConnectionValidator] },
    );
    this.legs.push(leg);
    rows.forEach((segment) => this.addSegment(this.legs.length - 1, segment));
    this.synchronizeLeg(this.legs.length - 1);
  }

  removeLeg(index: number): void {
    if (this.legs.length > 1) this.legs.removeAt(index);
  }
  moveLeg(index: number, offset: number): void {
    const target = index + offset;
    if (target < 0 || target >= this.legs.length) return;
    const leg = this.legs.at(index);
    this.legs.removeAt(index);
    this.legs.insert(target, leg);
  }
  segments(legIndex: number): FormArray<FormGroup> {
    return this.legs.at(legIndex).controls['segments'] as FormArray<FormGroup>;
  }

  setConnectionType(legIndex: number, type: ConnectionType): void {
    const leg = this.legs.at(legIndex);
    const rows = this.segments(legIndex);
    if (type === 'DIRECT' && rows.length > 1) {
      const confirmed =
        typeof window === 'undefined' ||
        window.confirm('Changing to a direct flight removes all stop details. Continue?');
      if (!confirmed) return;
      const first = rows.at(0).getRawValue();
      const last = rows.at(rows.length - 1).getRawValue();
      while (rows.length > 1) rows.removeAt(rows.length - 1);
      rows
        .at(0)
        .patchValue({
          ...first,
          destinationAirport: leg.controls['destinationAirport'].value,
          arrivalLocal: last.arrivalLocal,
          arrivalTimeZone: last.arrivalTimeZone,
        });
    }
    leg.controls['connectionType'].setValue(type);
    if (type === 'CONNECTING' && rows.length === 1) this.addStop(legIndex);
    this.synchronizeLeg(legIndex);
  }

  addStop(legIndex: number): void {
    const rows = this.segments(legIndex);
    const finalSegment = rows.at(rows.length - 1);
    const current = finalSegment.getRawValue() as FlightSegmentValue;
    finalSegment.patchValue({
      destinationAirport: '',
      arrivalLocal: '',
      arrivalTimeZone: current.departureTimeZone || 'UTC',
    });
    rows.push(
      this.createSegment({
        ...current,
        originAirport: '',
        destinationAirport: current.destinationAirport,
        departureLocal: '',
        departureTimeZone: current.arrivalTimeZone || 'UTC',
      }),
    );
    this.legs.at(legIndex).controls['connectionType'].setValue('CONNECTING');
    this.synchronizeLeg(legIndex);
  }

  removeStop(legIndex: number, stopIndex: number): void {
    const rows = this.segments(legIndex);
    const previous = rows.at(stopIndex);
    const next = rows.at(stopIndex + 1);
    if (!previous || !next) return;
    const nextValue = next.getRawValue();
    previous.patchValue({
      destinationAirport: nextValue.destinationAirport,
      arrivalLocal: nextValue.arrivalLocal,
      arrivalTimeZone: nextValue.arrivalTimeZone,
    });
    rows.removeAt(stopIndex + 1);
    if (rows.length === 1) this.legs.at(legIndex).controls['connectionType'].setValue('DIRECT');
    this.synchronizeLeg(legIndex);
  }

  onLegAirportChanged(legIndex: number, isOrigin: boolean): void {
    const leg = this.legs.at(legIndex);
    const controlName = isOrigin ? 'originAirport' : 'destinationAirport';
    leg.controls[controlName].setValue(this.code(leg.controls[controlName].value), {
      emitEvent: false,
    });
    this.synchronizeLeg(legIndex);
    if (
      this.flightForm.controls.flightType.value === 'ROUND_TRIP' &&
      legIndex === 0 &&
      this.legs.length > 1
    )
      this.copyReturnRoute();
    if (
      this.flightForm.controls.flightType.value === 'MULTI_CITY' &&
      !isOrigin &&
      this.legs.at(legIndex + 1)
    ) {
      this.legs
        .at(legIndex + 1)
        .controls['originAirport'].setValue(leg.controls['destinationAirport'].value);
      this.synchronizeLeg(legIndex + 1);
    }
  }

  onStopAirportChanged(legIndex: number, segmentIndex: number): void {
    const rows = this.segments(legIndex);
    const row = rows.at(segmentIndex);
    const stopCode = this.code(row.controls['destinationAirport'].value);
    row.controls['destinationAirport'].setValue(stopCode, { emitEvent: false });
    rows.at(segmentIndex + 1).controls['originAirport'].setValue(stopCode);
    this.synchronizeLeg(legIndex);
  }

  addSegment(legIndex: number, value: FlightSegmentValue = {}): void {
    this.segments(legIndex).push(this.createSegment(value));
  }
  airlineChanged(legIndex: number, segmentIndex: number): void {
    const row = this.segments(legIndex).at(segmentIndex);
    const airline = this.airlines.find(
      (item) => Number(item.id) === Number(row.controls['airlineId'].value),
    );
    row.controls['airlineCode'].setValue(
      String(airline?.code ?? airline?.iataCode ?? '').trim().toUpperCase(),
    );
    row.controls['airlineCode'].markAsTouched();
  }

  stopCount(legIndex: number): number {
    return Math.max(0, this.segments(legIndex).length - 1);
  }
  layoverDuration(legIndex: number, stopIndex: number): string {
    const current = this.segments(legIndex).at(stopIndex);
    const next = this.segments(legIndex).at(stopIndex + 1);
    const arrival = this.localTimeInZoneToUtc(
      current?.controls['arrivalLocal'].value,
      current?.controls['arrivalTimeZone'].value,
    );
    const departure = this.localTimeInZoneToUtc(
      next?.controls['departureLocal'].value,
      next?.controls['departureTimeZone'].value,
    );
    const milliseconds = departure - arrival;
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return '—';
    const minutes = Math.round(milliseconds / 60000);
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }

  saveFlight(): void {
    for (let index = 0; index < this.legs.length; index++) {
      this.synchronizeLeg(index);
      for (const segment of this.segments(index).controls) {
        segment.controls['departureLocal'].updateValueAndValidity();
        segment.controls['arrivalLocal'].updateValueAndValidity();
      }
    }
    this.validationSubmitted = true;
    this.flightForm.markAllAsTouched();
    if (this.isLoading || this.flightForm.invalid) return;
    const raw = this.flightForm.getRawValue();
    const payload: any = {
      flightType: raw.flightType,
      adults: raw.adults,
      children: raw.children,
      infants: raw.infants,
      price: Number(raw.price),
      legs: raw.legs.map((leg: any) => ({
        originAirport: this.code(leg.originAirport),
        destinationAirport: this.code(leg.destinationAirport),
        segments: leg.segments.map((segment: any) => ({
          ...segment,
          airlineCode: String(segment.airlineCode).trim().toUpperCase(),
          originAirport: this.code(segment.originAirport),
          destinationAirport: this.code(segment.destinationAirport),
          cabinClass: String(segment.cabinClass).toUpperCase(),
        })),
      })),
    };
    if (raw.id) payload.id = raw.id;
    this.isLoading = true;
    this.errorMessage = '';
    const request = raw.id ? this.api.put('Flights', payload) : this.api.post('Flights', payload);
    request
      .pipe(
        catchError((error) => {
          this.errorMessage = error?.error?.message ?? 'flightSaveError';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (!response || response.isSuccess === false) {
          if (response?.message) this.errorMessage = response.message;
          return;
        }
        this.successMessage = response.message ?? 'flightSaved';
        this.flightSaved.emit();
        this.resetForm(false);
      });
  }

  cancelEdit(): void {
    this.resetForm(true);
  }
  private loadFlightForEdit(id: number): void {
    if (!id) return;
    this.api
      .get(`Flights/${id}`)
      .pipe(catchError(() => of(null)))
      .subscribe((response: any) => {
        const flight = response?.data ?? response;
        if (flight) this.populateForm(flight);
        else this.errorMessage = 'flightLoadError';
        this.cdr.markForCheck();
      });
  }
  private populateForm(flight: any): void {
    this.passengerMenuOpen.set(false);
    this.legs.clear();
    this.flightForm.patchValue({
      id: Number(flight.id ?? 0),
      flightType: flight.flightType ?? 'ONE_WAY',
      adults: Number(flight.adults ?? 1),
      children: Number(flight.children ?? 0),
      infants: Number(flight.infants ?? 0),
      price: Number(flight.price ?? 0),
    });
    const legs =
      Array.isArray(flight.legs) && flight.legs.length ? flight.legs : [this.legacyLeg(flight)];
    legs.forEach((leg: FlightLegValue) => this.addLeg(leg));
    this.validationSubmitted = false;
  }
  private legacyLeg(flight: any): FlightLegValue {
    return {
      originAirport: flight.departureAirport,
      destinationAirport: flight.arrivalAirport,
      segments: [
        {
          airlineId: flight.airlineId,
          airlineCode: flight.airlineCode ?? '',
          flightNumber: flight.flightNumber,
          originAirport: flight.departureAirport,
          destinationAirport: flight.arrivalAirport,
          departureLocal: flight.departureTime,
          arrivalLocal: flight.arrivalTime,
          departureTimeZone: 'UTC',
          arrivalTimeZone: 'UTC',
          cabinClass: flight.flightClassName ?? 'ECONOMY',
        },
      ],
    };
  }
  private resetForm(emitCancel: boolean): void {
    this.passengerMenuOpen.set(false);
    this.legs.clear();
    this.flightForm.reset({
      id: 0,
      flightType: 'ONE_WAY',
      adults: 1,
      children: 0,
      infants: 0,
      price: 0,
    });
    this.addLeg();
    this.validationSubmitted = false;
    this.errorMessage = '';
    if (emitCancel) this.editCancelled.emit();
  }
  private createSegment(value: FlightSegmentValue = {}): FormGroup {
    return new FormGroup(
      {
        airlineId: new FormControl(Number(value.airlineId ?? 0), {
          nonNullable: true,
          validators: [Validators.required, Validators.min(1)],
        }),
        airlineCode: new FormControl(String(value.airlineCode ?? '').trim().toUpperCase(), {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,3}$/)],
        }),
        flightNumber: new FormControl(String(value.flightNumber ?? ''), {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(20)],
        }),
        ticketNumber: new FormControl(String(value.ticketNumber ?? ''), {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/\S/)],
        }),
        originAirport: new FormControl(this.code(value.originAirport), {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
        }),
        destinationAirport: new FormControl(this.code(value.destinationAirport), {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/^[A-Z]{3}$/)],
        }),
        departureLocal: new FormControl(this.datetime(value.departureLocal), {
          nonNullable: true,
          validators: [Validators.required, validDate(true), FlightsFromCard.notBeforeTodayValidator],
        }),
        departureTimeZone: new FormControl(String(value.departureTimeZone ?? 'UTC'), {
          nonNullable: true,
          validators: [Validators.required],
        }),
        arrivalLocal: new FormControl(this.datetime(value.arrivalLocal), {
          nonNullable: true,
          validators: [Validators.required, validDate(true), FlightsFromCard.notBeforeTodayValidator],
        }),
        arrivalTimeZone: new FormControl(String(value.arrivalTimeZone ?? 'UTC'), {
          nonNullable: true,
          validators: [Validators.required],
        }),
        cabinClass: new FormControl(
          String(value.cabinClass ?? 'ECONOMY').replace('PREMIUMECONOMY', 'PREMIUM_ECONOMY'),
          { nonNullable: true, validators: [Validators.required] },
        ),
      },
      { validators: [FlightsFromCard.segmentValidator] },
    );
  }
  private synchronizeLeg(legIndex: number): void {
    const leg = this.legs.at(legIndex);
    const rows = this.segments(legIndex);
    if (!leg || !rows.length) return;
    rows
      .at(0)
      .controls['originAirport'].setValue(this.code(leg.controls['originAirport'].value), {
        emitEvent: false,
      });
    rows
      .at(rows.length - 1)
      .controls['destinationAirport'].setValue(
        this.code(leg.controls['destinationAirport'].value),
        { emitEvent: false },
      );
    for (let index = 0; index < rows.length - 1; index++) {
      const destination = this.code(rows.at(index).controls['destinationAirport'].value);
      rows.at(index).controls['destinationAirport'].setValue(destination, { emitEvent: false });
      rows.at(index + 1).controls['originAirport'].setValue(destination, { emitEvent: false });
    }
    rows.updateValueAndValidity();
    leg.updateValueAndValidity();
  }
  private copyReturnRoute(): void {
    if (this.legs.length < 2) return;
    const outbound = this.legs.at(0);
    const inbound = this.legs.at(1);
    inbound.patchValue({
      originAirport: outbound.controls['destinationAirport'].value,
      destinationAirport: outbound.controls['originAirport'].value,
    });
    this.synchronizeLeg(1);
  }
  private code(value: unknown): string {
    return String(value ?? '')
      .trim()
      .toUpperCase();
  }
  private datetime(value: unknown): string {
    return value ? String(value).slice(0, 16) : '';
  }

  private static localDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  private static notBeforeTodayValidator(control: AbstractControl): ValidationErrors | null {
    const value = String(control.value ?? '');
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
    return value.slice(0, 10) < FlightsFromCard.localDate(new Date()) ? { pastDate: true } : null;
  }
  private localTimeInZoneToUtc(value: unknown, timeZone: unknown): number {
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(value ?? ''));
    if (!match || !timeZone) return Number.NaN;
    const desired = Date.UTC(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      Number(match[4]),
      Number(match[5]),
    );
    let instant = desired;
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: String(timeZone),
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      });
      for (let attempt = 0; attempt < 2; attempt++) {
        const parts = Object.fromEntries(
          formatter
            .formatToParts(new Date(instant))
            .filter((part) => part.type !== 'literal')
            .map((part) => [part.type, part.value]),
        );
        const displayed = Date.UTC(
          Number(parts['year']),
          Number(parts['month']) - 1,
          Number(parts['day']),
          Number(parts['hour']),
          Number(parts['minute']),
        );
        instant += desired - displayed;
      }
      return instant;
    } catch {
      return Number.NaN;
    }
  }
  private static segmentValidator(control: AbstractControl): ValidationErrors | null {
    const origin = String(control.get('originAirport')?.value ?? '').trim();
    const destination = String(control.get('destinationAirport')?.value ?? '').trim();
    const departure = Date.parse(String(control.get('departureLocal')?.value ?? ''));
    const arrival = Date.parse(String(control.get('arrivalLocal')?.value ?? ''));
    if (origin && destination && origin === destination) return { sameAirport: true };
    if (Number.isFinite(departure) && Number.isFinite(arrival) && arrival <= departure)
      return { invalidSegmentTime: true };
    return null;
  }
  private static legConnectionValidator(control: AbstractControl): ValidationErrors | null {
    const rows = control.get('segments') as FormArray<FormGroup> | null;
    if (!rows?.length) return { noSegments: true };
    for (let index = 0; index < rows.length - 1; index++) {
      const current = rows.at(index).getRawValue();
      const next = rows.at(index + 1).getRawValue();
      if (String(current.destinationAirport).trim() !== String(next.originAirport).trim())
        return { disconnectedSegments: true };
      const arrival = Date.parse(current.arrivalLocal);
      const departure = Date.parse(next.departureLocal);
      if (Number.isFinite(arrival) && Number.isFinite(departure) && departure <= arrival)
        return { invalidLayover: true };
    }
    return null;
  }
}
