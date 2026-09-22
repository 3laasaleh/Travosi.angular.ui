import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';

interface FacilityGroup { id: number; name: string; facilities: any[]; }

@Component({
  selector: 'app-hotel-rooms-manager',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './hotel-rooms-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomsManager implements OnChanges {
  @Input() hotelId: number | null = null;

  rooms: any[] = [];
  facilities: any[] = [];
  loading = false;
  saving = false;
  error = '';
  editingRoom: any | null = null;
  selectedFacilityIds = new Set<number>();
  readonly roomTypes = [
    { value: 1, label: 'Single' }, { value: 2, label: 'Double' }, { value: 3, label: 'Twin' },
    { value: 4, label: 'Triple' }, { value: 5, label: 'Family' }, { value: 6, label: 'Suite' },
    { value: 7, label: 'Junior suite' }, { value: 8, label: 'Deluxe' },
  ];
  readonly mealPlans = [
    { value: 1, label: 'Room only' }, { value: 2, label: 'Bed & breakfast' }, { value: 3, label: 'Half board' },
    { value: 4, label: 'Full board' }, { value: 5, label: 'All inclusive' }, { value: 6, label: 'Ultra all inclusive' },
  ];

  readonly roomForm = new FormGroup({
    nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    descriptionEng: new FormControl('', { nonNullable: true }),
    descriptionAr: new FormControl('', { nonNullable: true }),
    roomType: new FormControl(1, { nonNullable: true }),
    mealPlan: new FormControl(1, { nonNullable: true }),
    maxAdults: new FormControl(1, { nonNullable: true, validators: [Validators.min(1)] }),
    maxChildren: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    maxInfants: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    totalInventory: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    costPrice: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    sellingPrice: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    isPublished: new FormControl(false, { nonNullable: true }),
  });

  constructor(
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['hotelId']) return;
    this.reset();
    if (!this.hotelId) { this.rooms = []; return; }
    this.load();
  }

  get facilityGroups(): FacilityGroup[] {
    const groups = new Map<number, FacilityGroup>();
    this.facilities.forEach((facility) => {
      const id = Number(facility.facilityCategoryId) || 0;
      if (!groups.has(id)) groups.set(id, { id, name: facility.facilityCategoryNameEng || 'Other', facilities: [] });
      groups.get(id)!.facilities.push(facility);
    });
    return [...groups.values()];
  }

  edit(room: any): void {
    this.editingRoom = room;
    this.selectedFacilityIds = new Set((room.amenities ?? []).map((facility: any) => Number(facility.id)).filter(Boolean));
    this.roomForm.reset({
      nameEng: room.nameEng ?? room.name ?? '', nameAr: room.nameAr ?? '', descriptionEng: room.descriptionEng ?? '', descriptionAr: room.descriptionAr ?? '',
      roomType: Number(room.roomType ?? 1), mealPlan: Number(room.mealPlan ?? 1), maxAdults: Number(room.maxAdults ?? 1),
      maxChildren: Number(room.maxChildren ?? 0), maxInfants: Number(room.maxInfants ?? 0), totalInventory: Number(room.totalInventory ?? 0),
      costPrice: Number(room.costPrice ?? 0), sellingPrice: Number(room.sellingPrice ?? 0), isPublished: room.isPublished === true,
    });
    this.cdr.markForCheck();
  }

  reset(): void {
    this.editingRoom = null;
    this.error = '';
    this.selectedFacilityIds = new Set();
    this.roomForm.reset({ nameEng: '', nameAr: '', descriptionEng: '', descriptionAr: '', roomType: 1, mealPlan: 1, maxAdults: 1, maxChildren: 0, maxInfants: 0, totalInventory: 0, costPrice: 0, sellingPrice: 0, isPublished: false });
  }

  toggleFacility(id: number, checked: boolean): void {
    checked ? this.selectedFacilityIds.add(id) : this.selectedFacilityIds.delete(id);
  }

  allSelected(group: FacilityGroup): boolean {
    return group.facilities.length > 0 && group.facilities.every((facility) => this.selectedFacilityIds.has(Number(facility.id)));
  }

  toggleGroup(group: FacilityGroup, checked: boolean): void {
    group.facilities.forEach((facility) => this.toggleFacility(Number(facility.id), checked));
  }

  save(): void {
    if (!this.hotelId || this.saving) return;
    if (this.roomForm.invalid || this.roomForm.controls.sellingPrice.value < this.roomForm.controls.costPrice.value) {
      this.roomForm.markAllAsTouched();
      this.error = this.roomForm.controls.sellingPrice.value < this.roomForm.controls.costPrice.value ? 'roomPriceRangeInvalid' : 'pleaseCorrectFormErrors';
      return;
    }
    const value = this.roomForm.getRawValue();
    const payload = {
      hotelId: this.hotelId,
      name: value.nameEng.trim(),
      ...value,
      roomType: Number(value.roomType), mealPlan: Number(value.mealPlan), maxAdults: Number(value.maxAdults), maxChildren: Number(value.maxChildren),
      maxInfants: Number(value.maxInfants), maxTotalOccupancy: Number(value.maxAdults) + Number(value.maxChildren) + Number(value.maxInfants),
      totalInventory: Number(value.totalInventory), costPrice: Number(value.costPrice), sellingPrice: Number(value.sellingPrice),
      ...(this.editingRoom ? { id: Number(this.editingRoom.id) } : {}),
    };
    this.saving = true;
    this.error = '';
    const request = this.editingRoom ? this.api.put('HotelRooms', payload) : this.api.post('HotelRooms', payload);
    request.pipe(catchError(() => of(null)), finalize(() => { this.saving = false; this.cdr.markForCheck(); })).subscribe((response: any) => {
      if (!response?.isSuccess) { this.error = response?.message || 'roomSaveError'; return; }
      const roomId = Number(response.data?.id ?? this.editingRoom?.id);
      this.saveFacilities(roomId);
    });
  }

  openPricing(room: any): void {
    this.router.navigate(['/configurations/hotel-room-pricing'], { queryParams: { hotelId: this.hotelId, roomId: room.id } });
  }

  private load(): void {
    this.loading = true;
    forkJoin({
      rooms: this.api.get(`HotelRooms/ByHotel/${this.hotelId}`).pipe(catchError(() => of(null))),
      facilities: this.api.get('HotelAmenities?kind=2&isActive=true').pipe(catchError(() => of(null))),
    }).pipe(finalize(() => { this.loading = false; this.cdr.markForCheck(); })).subscribe(({ rooms, facilities }) => {
      this.rooms = this.rows(rooms);
      this.facilities = this.rows(facilities);
    });
  }

  private saveFacilities(roomId: number): void {
    if (!roomId) { this.error = 'roomSaveError'; return; }
    this.api.put(`HotelAmenities/Rooms/${roomId}`, [...this.selectedFacilityIds]).pipe(catchError(() => of(null))).subscribe((response: any) => {
      if (!response?.isSuccess) { this.error = response?.message || 'hotelFacilitiesSaveError'; this.cdr.markForCheck(); return; }
      this.reset();
      this.load();
    });
  }

  private rows(response: any): any[] {
    const data = response?.data ?? response;
    return Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : Array.isArray(data?.items) ? data.items : [];
  }
}
