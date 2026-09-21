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
import { NumbersOnlyDirective } from '../../../../core/directives/numbers-only.directive';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { AirportPicker } from '../airport-picker/airport-picker';
import {
  CreateFlightDto,
  FlightApiResponseDto,
  UpdateFlightDto,
} from '../flight.dto';
import { FlighConnectionTypeEnum, FLIGHT_TYPE_OPTIONS, FlightTypeEnum } from '../flight.enum';

type PassengerType = 'adults' | 'children' | 'infants';
interface FlightSegmentValue {
  airlineId?: number;
  airlineCode?: string;
  flightNumber?: string;
  ticketNumber?: string;
  originAirport?: string;
  destinationAirport?: string;
  departureDate?: string;
  arrivalDate?: string;
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

  readonly connectionTypes: FlighConnectionTypeEnum[] = [
    FlighConnectionTypeEnum.DIRECT,
    FlighConnectionTypeEnum.STOPPED,
  ];
  flightTypeOptions = FLIGHT_TYPE_OPTIONS;

  DIRECT = FlighConnectionTypeEnum.DIRECT;
  STOPPED = FlighConnectionTypeEnum.STOPPED;

  OneWay = FlightTypeEnum.OneWay;
  RoundTrip = FlightTypeEnum.RoundTrip;
  MultiCity = FlightTypeEnum.MultiCity;

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
    flightType: new FormControl<FlightTypeEnum>(FlightTypeEnum.RoundTrip, { nonNullable: true }),
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
    baggageAllowanceKg: new FormControl<number>(10, {
      validators: [Validators.min(1), Validators.max(99)],
    }),
    legs: new FormArray<FormGroup>([]),
  }, { validators: [FlightsFromCard.roundTripReturnDateValidator] });

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
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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
    if (
      this.passengerMenuOpen() &&
      !this.passengerPicker?.nativeElement.contains(event.target as Node)
    ) {
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

  onTripTypeChange(type: FlightTypeEnum): void {
    this.flightForm.controls.flightType.setValue(type);
    if (type === FlightTypeEnum.OneWay)
      while (this.legs.length > 1) this.legs.removeAt(this.legs.length - 1);
    else if (type === FlightTypeEnum.RoundTrip) {
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
        connectionType: new FormControl<FlighConnectionTypeEnum>(
          rows.length > 1 ? FlighConnectionTypeEnum.STOPPED : FlighConnectionTypeEnum.DIRECT,
          {
            nonNullable: true,
          },
        ),
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

  setConnectionType(legindex: number, type: FlighConnectionTypeEnum): void {
    const leg = this.legs.at(legindex);
    const rows = this.segments(legindex);
    if (type === FlighConnectionTypeEnum.DIRECT && rows.length > 1) {
      const confirmed =
        typeof window === 'undefined' ||
        window.confirm('Changing to a direct flight removes all stop details. Continue?');
      if (!confirmed) return;
      const first = rows.at(0).getRawValue();
      const last = rows.at(rows.length - 1).getRawValue();
      while (rows.length > 1) rows.removeAt(rows.length - 1);
      rows.at(0).patchValue({
        ...first,
        destinationAirport: leg.controls['destinationAirport'].value,
        arrivalLocal: last.arrivalLocal,
        arrivalTimeZone: last.arrivalTimeZone,
      });
    }
    leg.controls['connectionType'].setValue(type);
    if (type === this.STOPPED && rows.length === 1) this.addStop(legindex);
    this.synchronizeLeg(legindex);
  }

  addStop(legIndex: number): void {
    const rows = this.segments(legIndex);
    const finalSegment = rows.at(rows.length - 1);
    const current = finalSegment.getRawValue() as FlightSegmentValue;
    finalSegment.patchValue({
      destinationAirport: '',
      arrivalDate: '',
    });
    rows.push(
      this.createSegment({
        ...current,
        originAirport: '',
        destinationAirport: current.destinationAirport,
        departureDate: '',
      }),
    );
    this.legs.at(legIndex).controls['connectionType'].setValue('STOPPED');
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
      arrivalDate: nextValue.arrivalDate,
    });
    rows.removeAt(stopIndex + 1);
    if (rows.length === 1) this.legs.at(legIndex).controls['connectionType'].setValue(this.DIRECT);
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
      this.flightForm.controls.flightType.value === FlightTypeEnum.RoundTrip &&
      legIndex === 0 &&
      this.legs.length > 1
    )
      this.copyReturnRoute();
    if (
      this.flightForm.controls.flightType.value === FlightTypeEnum.MultiCity &&
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
      String(airline?.code ?? airline?.iataCode ?? '')
        .trim()
        .toUpperCase(),
    );
    row.controls['airlineCode'].markAsTouched();
  }

  stopCount(legIndex: number): number {
    return Math.max(0, this.segments(legIndex).length - 1);
  }
  layoverDuration(legIndex: number, stopIndex: number): string {
    const current = this.segments(legIndex).at(stopIndex);
    const next = this.segments(legIndex).at(stopIndex + 1);

    const milliseconds =
      Date.parse(String(next?.controls['departureDate'].value ?? '')) -
      Date.parse(String(current?.controls['arrivalDate'].value ?? ''));
    if (!Number.isFinite(milliseconds) || milliseconds < 0) return '—';
    const minutes = Math.round(milliseconds / 60000);
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  }

  saveFlight(): void {
    this.validationSubmitted = true;
    for (let index = 0; index < this.legs.length; index++) {
      this.synchronizeLeg(index);
      for (const segment of this.segments(index).controls) {
        segment.controls['departureDate'].updateValueAndValidity();
        segment.controls['arrivalDate'].updateValueAndValidity();
      }
    }
    this.flightForm.updateValueAndValidity();
    this.flightForm.markAllAsTouched();
    if (this.isLoading || this.flightForm.invalid) return;
    const raw = this.flightForm.getRawValue();
    const createPayload: CreateFlightDto = {
      flightType: raw.flightType,
      adults: raw.adults,
      children: raw.children,
      infants: raw.infants,
      price: Number(raw.price),
      baggageAllowanceKg: raw.baggageAllowanceKg ?? null,
      legs: raw.legs.map((leg: any) => ({
        originAirport: this.code(leg.originAirport),
        destinationAirport: this.code(leg.destinationAirport),
        segments: leg.segments.map((segment: any) => ({
          airlineId: Number(segment.airlineId),
          airlineCode: String(segment.airlineCode).trim().toUpperCase(),
          flightNumber: String(segment.flightNumber).trim(),
          ticketNumber: String(segment.ticketNumber ?? '').trim() || null,
          originAirport: this.code(segment.originAirport),
          destinationAirport: this.code(segment.destinationAirport),
          departureDate: this.datePart(segment.departureDate),
          departureTime: this.timePart(segment.departureDate),
          arrivalDate: this.datePart(segment.arrivalDate),
          arrivalTime: this.timePart(segment.arrivalDate),
          cabinClass: String(segment.cabinClass).toUpperCase(),
        })),
      })),
    };
    const payload: CreateFlightDto | UpdateFlightDto = raw.id
      ? { ...createPayload, id: raw.id }
      : createPayload;
    this.isLoading = true;
    this.errorMessage = '';
    const request = raw.id
      ? this.api.put<FlightApiResponseDto>('Flights', payload)
      : this.api.post<FlightApiResponseDto>('Flights', payload);
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
      flightType: this.toFlightType(flight.flightType),
      adults: Number(flight.adults ?? 1),
      children: Number(flight.children ?? 0),
      infants: Number(flight.infants ?? 0),
      price: Number(flight.price ?? 0),
      baggageAllowanceKg: flight.baggageAllowanceKg ?? null,
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
          departureDate: flight.departureDate,
          arrivalDate: flight.arrivalDate,
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
      flightType: FlightTypeEnum.RoundTrip,
      adults: 1,
      children: 0,
      infants: 0,
      price: 0,
      baggageAllowanceKg: 10,
    });
    this.addLeg();
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
        airlineCode: new FormControl(
          String(value.airlineCode ?? '')
            .trim()
            .toUpperCase(),
          {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(/^[A-Za-z0-9]{2,3}$/)],
          },
        ),
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
        departureDate: new FormControl(this.datetime(value.departureDate), {
          nonNullable: true,
          validators: [Validators.required, FlightsFromCard.dateTimeRequiredValidator, FlightsFromCard.notBeforeTodayValidator],
        }),

        arrivalDate: new FormControl(this.datetime(value.arrivalDate), {
          nonNullable: true,
          validators: [Validators.required, FlightsFromCard.dateTimeRequiredValidator, FlightsFromCard.notBeforeTodayValidator],
        }),

        cabinClass: new FormControl(
          String(value.cabinClass ?? 'ECONOMY').replace('PREMIUMECONOMY', 'PREMIUM_ECONOMY'),
          { nonNullable: true, validators: [Validators.required] },
        ),
      },
      { validators: [FlightsFromCard.segmentDateRangeValidator] },
    );
  }
  private synchronizeLeg(legIndex: number): void {
    const leg = this.legs.at(legIndex);
    const rows = this.segments(legIndex);
    if (!leg || !rows.length) return;
    rows.at(0).controls['originAirport'].setValue(this.code(leg.controls['originAirport'].value), {
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
  private datePart(value: unknown): string {
    return String(value ?? '').slice(0, 10);
  }
  private timePart(value: unknown): string {
    const match = String(value ?? '').match(/[T\s](\d{2}:\d{2})/);
    return match ? `${match[1]}:00` : '';
  }

  private toFlightType(value: unknown): FlightTypeEnum {
    if (value === FlightTypeEnum.OneWay || value === FlightTypeEnum.RoundTrip || value === FlightTypeEnum.MultiCity) {
      return value;
    }

    switch (String(value ?? '').trim().toUpperCase()) {
      case 'ONE_WAY':
      case 'ONEWAY':
        return FlightTypeEnum.OneWay;
      case 'MULTI_CITY':
      case 'MULTICITY':
        return FlightTypeEnum.MultiCity;
      default:
        return FlightTypeEnum.RoundTrip;
    }
  }

  private static notBeforeTodayValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Let Validators.required handle empty values
    }

    const selectedDate = new Date(control.value);
    const today = new Date();

    // Remove time to compare dates only
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      return { invalidDate: true };
    }
    const result = selectedDate < today ? { pastDate: true } : null;
    return result;
  }

  private static dateTimeRequiredValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; // Let Validators.required handle an empty value.
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(String(control.value))
      ? null
      : { timeRequired: true };
  }

  private static segmentDateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const departure = Date.parse(String(control.get('departureDate')?.value ?? ''));
    const arrival = Date.parse(String(control.get('arrivalDate')?.value ?? ''));

    if (!Number.isFinite(departure) || !Number.isFinite(arrival)) return null;

    return arrival <= departure ? { arrivalNotAfterDeparture: true } : null;
  }

  private static roundTripReturnDateValidator(control: AbstractControl): ValidationErrors | null {
    if (control.get('flightType')?.value !== FlightTypeEnum.RoundTrip) return null;
    const legs = control.get('legs') as FormArray<FormGroup> | null;
    if (!legs || legs.length < 2) return null;

    const outboundDate = String(legs.at(0).get('segments.0.departureDate')?.value ?? '').slice(0, 10);
    const returnDate = String(legs.at(1).get('segments.0.departureDate')?.value ?? '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(outboundDate) || !/^\d{4}-\d{2}-\d{2}$/.test(returnDate)) return null;

    return returnDate <= outboundDate ? { returnDateNotAfterDeparture: true } : null;
  }

  private static legConnectionValidator(control: AbstractControl): ValidationErrors | null {
    const rows = control.get('segments') as FormArray<FormGroup> | null;
    if (!rows?.length) return { noSegments: true };
    for (let index = 0; index < rows.length - 1; index++) {
      const current = rows.at(index).getRawValue();
      const next = rows.at(index + 1).getRawValue();
      if (String(current.destinationAirport).trim() !== String(next.originAirport).trim())
        return { disconnectedSegments: true };
      const arrival = Date.parse(current.arrivalDate);
      const departure = Date.parse(next.departureDate);
      if (Number.isFinite(arrival) && Number.isFinite(departure) && departure <= arrival)
        return { invalidLayover: true };
    }
    return null;
  }
}
