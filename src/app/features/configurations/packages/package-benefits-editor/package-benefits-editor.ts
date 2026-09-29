import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CurrencyService } from '../../../../core/services/currency.service';
import { formatHomePrice } from '../../../home/home-price.util';

export function packageRoomGroup(item: any): FormGroup {
  return new FormGroup({
    hotelId: new FormControl(item.hotelId, [Validators.required, Validators.min(1)]),
    hotelRoomId: new FormControl(item.hotelRoomId, [Validators.required, Validators.min(1)]),
    hotelNameEng: new FormControl(item.hotelNameEng ?? item.hotelName ?? ''),
    hotelNameAr: new FormControl(item.hotelNameAr ?? item.hotelName ?? ''),
    roomNameEng: new FormControl(item.roomNameEng ?? item.roomName ?? ''),
    roomNameAr: new FormControl(item.roomNameAr ?? item.roomName ?? ''),
    adults: new FormControl(item.adults ?? 0), children: new FormControl(item.children ?? 0), infants: new FormControl(item.infants ?? 0),
    quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(1), Validators.pattern(/^\d+$/)]),
    // Display-only value derived from the room's active period price. The API stores only the room link and quantity.
    price: new FormControl(item.price ?? null),
  });
}

export function packageTransportGroup(item: any = {}): FormGroup {
  const group = new FormGroup<Record<string, FormControl>>({ id: new FormControl(item.id ?? 0) });
  for (const field of ['fromEng', 'fromAr', 'toEng', 'toAr', 'transportationTypeEng', 'transportationTypeAr'])
    group.addControl(field, new FormControl(item[field] ?? '', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)]));
  group.addControl('fromTime', new FormControl(item.fromTime ?? '', Validators.required));
  group.addControl('arrivalTime', new FormControl(item.arrivalTime ?? '', Validators.required));
  group.addControl('numberOfBags', new FormControl(item.numberOfBags ?? 0, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)]));
  group.addControl('maxKgPerBag', new FormControl(item.maxKgPerBag ?? 0, [Validators.required, Validators.min(0), Validators.max(1000)]));
  group.addValidators(packageTransportationTimeRangeValidator);
  group.updateValueAndValidity({ emitEvent: false });
  return group;
}

export function packageTransportationTimeRangeValidator(control: AbstractControl): ValidationErrors | null {
  const from = timeMinutes(control.get('fromTime')?.value);
  const arrival = timeMinutes(control.get('arrivalTime')?.value);
  if (from === null || arrival === null) return null;
  return arrival > from ? null : { transportationTimeRange: true };
}

export function packageTransportationOverlapValidator(control: AbstractControl): ValidationErrors | null {
  if (!(control instanceof FormArray)) return null;
  const intervals = control.controls
    .map((row) => ({
      from: timeMinutes(row.get('fromTime')?.value),
      arrival: timeMinutes(row.get('arrivalTime')?.value),
    }))
    .filter((item): item is { from: number; arrival: number } =>
      item.from !== null && item.arrival !== null && item.arrival > item.from)
    .sort((left, right) => left.from - right.from);

  for (let index = 1; index < intervals.length; index += 1) {
    if (intervals[index].from < intervals[index - 1].arrival) {
      return { transportationTimeOverlap: true };
    }
  }
  return null;
}

function timeMinutes(value: unknown): number | null {
  const match = /^(\d{2}):(\d{2})/.exec(String(value ?? '').trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59
    ? hours * 60 + minutes
    : null;
}

@Component({
  selector: 'app-package-benefits-editor', standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './package-benefits-editor.html', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageBenefitsEditor implements OnInit, OnChanges {
  readonly maxHotels = 3;
  @Input({ required: true }) rooms!: FormArray<FormGroup>;
  @Input({ required: true }) transportations!: FormArray<FormGroup>;
  @Input() destinationIds: readonly number[] = [];
  @Input() startDate = '';
  readonly hotels = signal<any[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly fields = [
    { key: 'fromEng', label: 'packageFromEng', ar: false }, { key: 'fromAr', label: 'packageFromAr', ar: true },
    { key: 'toEng', label: 'packageToEng', ar: false }, { key: 'toAr', label: 'packageToAr', ar: true },
    { key: 'transportationTypeEng', label: 'packageTransportTypeEng', ar: false },
    { key: 'transportationTypeAr', label: 'packageTransportTypeAr', ar: true },
  ];
  private readonly api = inject(ApiService);
  private readonly currency = inject(CurrencyService);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private requestId = 0;
  private loadedDestinationKey = '';

  ngOnInit(): void { this.loadHotelsForSelectedDestinations(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['destinationIds'] && !changes['destinationIds'].firstChange)
      this.loadHotelsForSelectedDestinations();
  }

  get hasSelectedDestinations(): boolean { return this.selectedDestinationIds.length > 0; }

  hotelRooms(hotel: any): any[] {
    return Array.isArray(hotel?.rooms) ? hotel.rooms.filter((room: any) => room?.isActive !== false) : [];
  }

  retry(): void { this.loadHotelsForSelectedDestinations(true); }

  private get selectedDestinationIds(): number[] {
    return [...new Set((this.destinationIds ?? []).map(Number).filter((id) => Number.isInteger(id) && id > 0))]
      .sort((left, right) => left - right);
  }

  private loadHotelsForSelectedDestinations(force = false): void {
    const destinationIds = this.selectedDestinationIds;
    const key = destinationIds.join(',');
    if (!force && key === this.loadedDestinationKey) return;

    this.loadedDestinationKey = key;
    const request = ++this.requestId;
    this.hotels.set([]);
    this.error.set('');

    if (!destinationIds.length) {
      this.loading.set(false);
      this.removeRoomsOutsideSelectedHotels(new Set());
      return;
    }

    this.loading.set(true);
    const query = destinationIds.map((id) => `destinationIds=${encodeURIComponent(String(id))}`).join('&');
    this.api.get(`Hotels/PackageBenefits?${query}`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response: any) => {
        if (request !== this.requestId) return;
        if (response?.isSuccess === false) { this.error.set('packageBenefitsLoadError'); this.loading.set(false); return; }
        const data = response?.data ?? response;
        const rows = data?.data ?? data?.items ?? data;
        const hotels = Array.isArray(rows) ? rows : [];
        this.hotels.set(hotels);
        this.removeRoomsOutsideSelectedHotels(new Set(hotels.map((hotel: any) => Number(hotel.id))));
        this.loading.set(false);
      },
      error: () => {
        if (request !== this.requestId) return;
        this.error.set('packageBenefitsLoadError'); this.loading.set(false);
      },
    });
  }

  label(item: any, prefix = 'name'): string {
    const ar = this.translate.currentLang()?.startsWith('ar');
    return (ar ? item?.[prefix + 'Ar'] || item?.[prefix + 'Eng'] : item?.[prefix + 'Eng'] || item?.[prefix + 'Ar']) || item?.[prefix] || '';
  }
  price(room: any): number | null {
    const rates = (room.roomPeriodPrices ?? []).filter((p: any) =>
      p.isActive !== false && p.startDate <= this.startDate && p.endDate >= this.startDate,
    );
    return rates.length === 1 ? Number(rates[0].price) : null;
  }
  money(value: number): string { return formatHomePrice(this.currency, value, { currencyCode: 'USD' }); }
  selected(room: any): boolean { return this.rooms.controls.some(c => Number(c.value.hotelRoomId) === Number(room.id)); }
  canSelectRoom(hotel: any, room: any): boolean {
    if (this.selected(room)) return true;
    const hotelId = Number(hotel?.id);
    const alreadyHasHotel = this.rooms.controls.some(control => Number(control.value.hotelId) === hotelId);
    return alreadyHasHotel || this.selectedHotelCount < this.maxHotels;
  }
  get selectedHotelCount(): number {
    return new Set(this.rooms.controls.map(control => Number(control.value.hotelId)).filter(id => id > 0)).size;
  }
  toggleRoom(hotel: any, room: any): void {
    const index = this.rooms.controls.findIndex(c => Number(c.value.hotelRoomId) === Number(room.id));
    if (index >= 0) this.rooms.removeAt(index);
    else {
      const hotelId = Number(hotel.id);
      const hotelRoomIndex = this.rooms.controls.findIndex(control => Number(control.value.hotelId) === hotelId);
      if (hotelRoomIndex < 0 && this.selectedHotelCount >= this.maxHotels) return;
      if (hotelRoomIndex >= 0) this.rooms.removeAt(hotelRoomIndex);
      this.rooms.push(packageRoomGroup({
        hotelId, hotelRoomId: room.id,
        hotelNameEng: hotel?.nameEng ?? hotel?.name, hotelNameAr: hotel?.nameAr ?? hotel?.name,
        roomNameEng: room.nameEng ?? room.name, roomNameAr: room.nameAr ?? room.name,
        adults: room.maxAdults, children: room.maxChildren, infants: room.maxInfants, price: this.price(room),
      }));
    }
    this.rooms.markAsDirty();
  }
  private removeRoomsOutsideSelectedHotels(allowedHotelIds: Set<number>): void {
    let changed = false;
    for (let index = this.rooms.length - 1; index >= 0; index--) {
      if (!allowedHotelIds.has(Number(this.rooms.at(index).value.hotelId))) {
        this.rooms.removeAt(index);
        changed = true;
      }
    }
    if (changed) this.rooms.markAsDirty();
  }
  removeRoom(index: number): void { this.rooms.removeAt(index); this.rooms.markAsDirty(); }
  addTransport(): void { this.transportations.push(packageTransportGroup()); this.transportations.markAsDirty(); }
  removeTransport(index: number): void { this.transportations.removeAt(index); this.transportations.markAsDirty(); }
}
