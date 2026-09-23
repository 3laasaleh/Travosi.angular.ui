import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import { HotelRoomCard } from '../../../../shared/components/hotel-room-card/hotel-room-card';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';

interface FacilityGroup { id: number; name: string; facilities: any[]; }
interface BathroomOption { value: string; label: string; }

@Component({
  selector: 'app-hotel-rooms-manager',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, HotelRoomCard, DatePicker],
  templateUrl: './hotel-rooms-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomsManager implements OnChanges {
  @Input() hotelId: number | null = null;
  rooms: any[] = [];
  facilities: any[] = [];
  mealPlans: any[] = [];
  currencies: any[] = [];
  hotelPolicies: any[] = [];
  loading = false;
  saving = false;
  error = '';
  editingRoom: any | null = null;
  selectedFacilityIds = new Set<number>();
  selectedBathroomItems = new Set<string>();
  roomImages: Array<{ id?: number; file?: File; url: string; altEng: string; altAr: string; existing: boolean }> = [];
  imageMessage = '';
  readonly maxImages = 5;

  readonly roomTypes = [
    { value: 1, label: 'Single' }, { value: 2, label: 'Double' }, { value: 3, label: 'Twin' },
    { value: 4, label: 'Triple' }, { value: 5, label: 'Family' }, { value: 6, label: 'Suite' },
    { value: 7, label: 'Junior suite' }, { value: 8, label: 'Deluxe' },
  ];
  readonly mealPlanTypes = [
    { value: 1, label: 'Room only' }, { value: 2, label: 'Bed & breakfast' }, { value: 3, label: 'Half board' },
    { value: 4, label: 'Full board' }, { value: 5, label: 'All inclusive' }, { value: 6, label: 'Ultra all inclusive' },
  ];
  readonly bathroomOptions: BathroomOption[] = [
    { value: 'Free toiletries', label: 'freeToiletries' },
    { value: 'Bidet', label: 'bidet' },
    { value: 'Toilet', label: 'toilet' },
    { value: 'Bath or shower', label: 'bathOrShower' },
    { value: 'Towels', label: 'towels' },
    { value: 'Slippers', label: 'slippers' },
    { value: 'Hairdryer', label: 'hairdryer' },
    { value: 'Toilet paper', label: 'toiletPaper' },
  ];
  readonly viewOptions = [
    { value: 'Pool view', label: 'poolView' },
    { value: 'Beach view', label: 'beachView' },
    { value: 'Garden view', label: 'gardenView' },
  ];
  readonly childPricingTypes = [
    { value: 1, label: 'free' }, { value: 2, label: 'perNight' }, { value: 3, label: 'perStay' },
    { value: 4, label: 'percentage' }, { value: 5, label: 'adultRate' },
  ];
  readonly childBedTypes = [
    { value: 1, label: 'existingBed' }, { value: 2, label: 'extraBed' },
    { value: 3, label: 'babyCot' }, { value: 4, label: 'noAdditionalBed' },
  ];

  readonly roomForm = new FormGroup({
    nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    descriptionEng: new FormControl('', { nonNullable: true }), descriptionAr: new FormControl('', { nonNullable: true }),
    roomType: new FormControl(1, { nonNullable: true }), mealPlan: new FormControl(1, { nonNullable: true }),
    roomSize: new FormControl<number | null>(null),
    bedType: new FormControl('', { nonNullable: true }), bedSize: new FormControl('', { nonNullable: true }),
    view: new FormControl('', { nonNullable: true }), avilableRoomsCount: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    hasBalcony: new FormControl(false, { nonNullable: true }),
    numberOfBathrooms: new FormControl(1, { nonNullable: true, validators: [Validators.min(0)] }),
    smokingAllowed: new FormControl(false, { nonNullable: true }), maxAdults: new FormControl(1, { nonNullable: true, validators: [Validators.min(1)] }),
    maxChildren: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }), maxInfants: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    isPublished: new FormControl(false, { nonNullable: true }),
  });

  readonly rateForm = new FormGroup({
    id: new FormControl(0, { nonNullable: true }), nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required] }), mealPlanId: new FormControl(0, { nonNullable: true, validators: [Validators.min(1)] }),
    currencyCode: new FormControl('USD', { nonNullable: true, validators: [Validators.required] }), baseNightlyRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    extraAdultCharge: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }), extraChildCharge: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.max(100)] }), serviceFee: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    minimumStay: new FormControl(1, { nonNullable: true, validators: [Validators.min(1)] }), maximumStay: new FormControl<number | null>(null),
    isRefundable: new FormControl(false, { nonNullable: true }), isActive: new FormControl(true, { nonNullable: true }), rates: new FormArray<FormGroup>([]),
  });
  readonly policyForm = new FormGroup({ policies: new FormArray<FormGroup>([]) });

  constructor(private readonly api: ApiService, private readonly cdr: ChangeDetectorRef) {}
  get rates(): FormArray<FormGroup> { return this.rateForm.controls.rates; }
  get policies(): FormArray<FormGroup> { return this.policyForm.controls.policies; }
  get today(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }

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
    this.revokeNewImageUrls();
    this.roomImages = (room.images ?? []).slice(0, this.maxImages).map((image: any) => ({ id: image.id, url: image.imageUrl ?? image.url ?? '', altEng: image.altTextEng ?? image.altEng ?? '', altAr: image.altTextAr ?? image.altAr ?? '', existing: true })).filter((image: any) => !!image.url);
    this.imageMessage = '';
    this.selectedFacilityIds = new Set((room.amenities ?? []).map((facility: any) => Number(facility.id)).filter(Boolean));
    this.selectedBathroomItems = new Set(this.parseBathroom(room.bathroom));
    this.roomForm.reset({ nameEng: room.nameEng ?? room.name ?? '', nameAr: room.nameAr ?? '', descriptionEng: room.descriptionEng ?? '', descriptionAr: room.descriptionAr ?? '', roomType: Number(room.roomType ?? 1), mealPlan: Number(room.mealPlan ?? 1), roomSize: room.roomSize ?? null, bedType: room.bedType ?? '', bedSize: room.bedSize ?? '', view: room.view ?? '', avilableRoomsCount: Number(room.avilableRoomsCount ?? 1), hasBalcony: room.hasBalcony === true, numberOfBathrooms: Number(room.numberOfBathrooms ?? 1), smokingAllowed: room.smokingAllowed === true, maxAdults: Number(room.maxAdults ?? 1), maxChildren: Number(room.maxChildren ?? 0), maxInfants: Number(room.maxInfants ?? 0), isPublished: room.isPublished === true });
    const plan = room.ratePlans?.[0];
    this.rateForm.reset({ id: Number(plan?.id ?? 0), nameEng: plan?.nameEng ?? room.nameEng ?? room.name ?? '', nameAr: plan?.nameAr ?? room.nameAr ?? '', mealPlanId: Number(plan?.mealPlanId ?? this.mealPlans[0]?.id ?? 0), currencyCode: plan?.currencyCode ?? (this.currencyName(this.currencies[0]) || 'USD'), baseNightlyRate: Number(plan?.baseNightlyRate ?? 0), extraAdultCharge: Number(plan?.extraAdultCharge ?? 0), extraChildCharge: Number(plan?.extraChildCharge ?? 0), taxRate: Number(plan?.taxRate ?? 0), serviceFee: Number(plan?.serviceFee ?? 0), minimumStay: Number(plan?.minimumStay ?? 1), maximumStay: plan?.maximumStay ?? null, isRefundable: plan?.isRefundable === true, isActive: plan?.isActive !== false });
    this.rates.clear(); (plan?.rates ?? []).forEach((rate: any) => this.addPeriod(rate));
    if (!this.rates.length) this.addPeriod();
    this.policies.clear(); this.hotelPolicies.filter((policy) => Number(policy.hotelRoomId) === Number(room.id)).forEach((policy) => this.addPolicy(policy));
    this.cdr.markForCheck();
  }

  reset(): void {
    this.revokeNewImageUrls();
    this.roomImages = [];
    this.imageMessage = '';
    this.editingRoom = null; this.error = ''; this.selectedFacilityIds = new Set(); this.selectedBathroomItems = new Set();
    this.roomForm.reset({ nameEng: '', nameAr: '', descriptionEng: '', descriptionAr: '', roomType: 1, mealPlan: 1, roomSize: null, bedType: '', bedSize: '', view: '', avilableRoomsCount: 1, hasBalcony: false, numberOfBathrooms: 1, smokingAllowed: false, maxAdults: 1, maxChildren: 0, maxInfants: 0, isPublished: false });
    this.rateForm.reset({ id: 0, nameEng: '', nameAr: '', mealPlanId: Number(this.mealPlans[0]?.id ?? 0), currencyCode: this.currencyName(this.currencies[0]) || 'USD', baseNightlyRate: 0, extraAdultCharge: 0, extraChildCharge: 0, taxRate: 0, serviceFee: 0, minimumStay: 1, maximumStay: null, isRefundable: false, isActive: true });
    this.rates.clear(); this.addPeriod(); this.policies.clear();
  }

  toggleFacility(id: number, checked: boolean): void { checked ? this.selectedFacilityIds.add(id) : this.selectedFacilityIds.delete(id); }
  toggleBathroom(value: string, checked: boolean): void { checked ? this.selectedBathroomItems.add(value) : this.selectedBathroomItems.delete(value); }
  allSelected(group: FacilityGroup): boolean { return group.facilities.length > 0 && group.facilities.every((facility) => this.selectedFacilityIds.has(Number(facility.id))); }
  toggleGroup(group: FacilityGroup, checked: boolean): void { group.facilities.forEach((facility) => this.toggleFacility(Number(facility.id), checked)); }
  addPeriod(value: any = {}): void {
    const previousEndDate = this.rates.length ? String(this.rates.at(this.rates.length - 1).controls['endDate'].value ?? '') : '';
    this.rates.push(new FormGroup({
      startDate: new FormControl(value.startDate ?? (this.rates.length ? previousEndDate : this.today), { nonNullable: true, validators: [Validators.required] }),
      endDate: new FormControl(value.endDate ?? '', { nonNullable: true, validators: [Validators.required] }),
      title: new FormControl(value.title ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(150)] }),
      nightlyRate: new FormControl(Number(value.nightlyRate ?? 0), { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
      isActive: new FormControl(value.isActive !== false, { nonNullable: true }),
    }));
  }
  removePeriod(index: number): void { if (this.rates.length > 1) this.rates.removeAt(index); }

  addPolicy(value: any = {}): void {
    this.policies.push(new FormGroup({ minAge: new FormControl(Number(value.minAge ?? 0), { nonNullable: true, validators: [Validators.min(0), Validators.max(17)] }), maxAge: new FormControl(Number(value.maxAge ?? 17), { nonNullable: true, validators: [Validators.min(0), Validators.max(17)] }), chargeType: new FormControl(Number(value.chargeType ?? 1), { nonNullable: true }), amount: new FormControl(Number(value.amount ?? 0), { nonNullable: true, validators: [Validators.min(0)] }), currencyCode: new FormControl(value.currencyCode ?? (this.currencyName(this.currencies[0]) || 'USD'), { nonNullable: true }), bedType: new FormControl(Number(value.bedType ?? 1), { nonNullable: true }), maximumEligibleChildren: new FormControl<number | null>(value.maximumEligibleChildren ?? null), maximumExtraBeds: new FormControl<number | null>(value.maximumExtraBeds ?? null), maximumBabyCots: new FormControl<number | null>(value.maximumBabyCots ?? null), descriptionEng: new FormControl(value.descriptionEng ?? '', { nonNullable: true }), descriptionAr: new FormControl(value.descriptionAr ?? '', { nonNullable: true }), isActive: new FormControl(value.isActive !== false, { nonNullable: true }) }));
  }
  removePolicy(index: number): void { this.policies.removeAt(index); }

  async onRoomImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.imageMessage = '';
    if (this.roomImages.length + files.length > this.maxImages) { this.imageMessage = 'hotelImageLimit'; return; }
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
        this.imageMessage = file.size > 5 * 1024 * 1024 ? 'imageTooLarge' : 'invalidImageType';
        continue;
      }
      try {
        const normalized = await normalizeImageUpload(file, { maxWidth: 2400, maxHeight: 1600 });
        this.roomImages.push({ file: normalized, url: URL.createObjectURL(normalized), altEng: '', altAr: '', existing: false });
      } catch (error) {
        this.imageMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
      }
    }
    this.cdr.markForCheck();
  }

  removeRoomImage(index: number): void {
    const image = this.roomImages[index];
    if (!image) return;
    if (image.existing && image.id && this.editingRoom?.id) {
      this.api.deleteRequest(`HotelRooms/${this.editingRoom.id}/Images/${image.id}`).pipe(catchError(() => of(null))).subscribe((response: any) => {
        if (response?.isSuccess === false || !response) { this.imageMessage = 'imageDeleteError'; this.cdr.markForCheck(); return; }
        this.removeRoomImageLocally(index);
      });
      return;
    }
    this.removeRoomImageLocally(index);
  }

  roomImageUrl(url: string): string {
    return !url || /^(blob:|data:|https?:\/\/)/i.test(url)
      ? url
      : `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/?(?:images\/)?/i, '')}`;
  }

  save(): void {
    if (!this.hotelId || this.saving) return;
    if (this.roomForm.invalid) { this.roomForm.markAllAsTouched(); this.error = 'pleaseCorrectFormErrors'; return; }
    if (!this.validatePeriods()) { this.error = 'pricingPeriodsInvalid'; return; }
    const value = this.roomForm.getRawValue();
    const rateValue = this.rateForm.getRawValue();
    if (!rateValue.nameEng.trim()) this.rateForm.controls.nameEng.setValue(value.nameEng.trim());
    if (!rateValue.nameAr.trim()) this.rateForm.controls.nameAr.setValue(value.nameAr.trim());
    if (Number(rateValue.mealPlanId) <= 0 && this.mealPlans[0]?.id) this.rateForm.controls.mealPlanId.setValue(Number(this.mealPlans[0].id));
    if (this.rateForm.invalid) { this.rateForm.markAllAsTouched(); this.error = 'pleaseCorrectFormErrors'; return; }
    const payload = { hotelId: this.hotelId, name: value.nameEng.trim(), ...value, bathroom: this.bathroomOptions.filter((option) => this.selectedBathroomItems.has(option.value)).map((option) => option.value).join(';'), roomType: Number(value.roomType), mealPlan: Number(value.mealPlan), roomSize: value.roomSize === null ? null : Number(value.roomSize), avilableRoomsCount: Number(value.avilableRoomsCount), numberOfBathrooms: Number(value.numberOfBathrooms), maxAdults: Number(value.maxAdults), maxChildren: Number(value.maxChildren), maxInfants: Number(value.maxInfants), maxTotalOccupancy: Number(value.maxAdults) + Number(value.maxChildren) + Number(value.maxInfants), ...(this.editingRoom ? { id: Number(this.editingRoom.id) } : {}) };
    this.saving = true; this.error = '';
    const request = this.editingRoom ? this.api.put('HotelRooms', payload) : this.api.post('HotelRooms', payload);
    request.pipe(catchError((error) => { this.error = error?.error?.message || 'roomSaveError'; return of(null); })).subscribe((response: any) => { if (!response?.isSuccess) { if (response) this.error = response.message || 'roomSaveError'; this.saving = false; this.cdr.markForCheck(); return; } this.saveRoomChildren(Number(response.data?.id ?? this.editingRoom?.id)); });
  }

  deleteRoom(room: any): void {
    if (!room?.id || this.saving || !window.confirm('Delete this room?')) return;
    this.saving = true;
    this.api.delete('HotelRooms', Number(room.id)).pipe(catchError(() => of(null)), finalize(() => { this.saving = false; this.cdr.markForCheck(); })).subscribe((response: any) => { if (!response?.isSuccess) { this.error = response?.message || 'roomSaveError'; return; } if (this.editingRoom?.id === room.id) this.reset(); this.load(); });
  }

  currencyName(currency: any): string { return String(currency?.name ?? currency?.code ?? currency?.currencyCode ?? '').toUpperCase(); }

  private saveRoomChildren(roomId: number): void {
    if (!roomId) { this.error = 'roomSaveError'; this.saving = false; this.cdr.markForCheck(); return; }
    const policyRows = this.policies.getRawValue().map((policy: any, index: number) => ({ ...policy, hotelId: this.hotelId, hotelRoomId: roomId, displayOrder: index + 1, hotelRoomRatePlanId: null }));
    const otherPolicies = this.hotelPolicies.filter((policy) => Number(policy.hotelRoomId) !== roomId).map((policy) => ({ ...policy, hotelId: this.hotelId, hotelRoomId: policy.hotelRoomId || null, hotelRoomRatePlanId: policy.hotelRoomRatePlanId || null }));
    const rate = this.rateForm.getRawValue(); const room = this.roomForm.getRawValue();
    const ratePayload = { ...rate, id: Number(rate.id), hotelRoomId: roomId, nameEng: rate.nameEng.trim() || room.nameEng.trim(), nameAr: rate.nameAr.trim() || room.nameAr.trim(), mealPlan: Number(room.mealPlan), mealPlanId: Number(rate.mealPlanId), currencyCode: rate.currencyCode, baseNightlyRate: Number(rate.baseNightlyRate), extraAdultCharge: Number(rate.extraAdultCharge), extraChildCharge: Number(rate.extraChildCharge), taxRate: Number(rate.taxRate), serviceFee: Number(rate.serviceFee), minimumStay: Number(rate.minimumStay), maximumStay: rate.maximumStay ? Number(rate.maximumStay) : null, benefits: [], rates: this.rates.getRawValue().map((period: any) => ({ ...period, title: String(period.title).trim(), nightlyRate: Number(period.nightlyRate) })) };
    forkJoin({ facilities: this.api.put(`HotelAmenities/Rooms/${roomId}`, [...this.selectedFacilityIds]).pipe(catchError(() => of(null))), pricing: ratePayload.id ? this.api.put(`HotelRatePlans/${ratePayload.id}`, ratePayload).pipe(catchError(() => of(null))) : this.api.post('HotelRatePlans', ratePayload).pipe(catchError(() => of(null))), policies: this.api.put(`HotelChildPolicies/Hotels/${this.hotelId}`, { hotelId: this.hotelId, policies: [...otherPolicies, ...policyRows] }).pipe(catchError(() => of(null))) }).pipe(finalize(() => { this.saving = false; this.cdr.markForCheck(); })).subscribe((result: any) => { if (!result.facilities?.isSuccess || !result.pricing?.isSuccess || !result.policies?.isSuccess) { this.error = result.pricing?.message || result.policies?.message || result.facilities?.message || 'roomSaveError'; return; } this.hotelPolicies = [...otherPolicies, ...policyRows]; this.uploadNewRoomImages(roomId); });
  }

  private uploadNewRoomImages(roomId: number): void {
    const images = this.roomImages.filter((image) => image.file);
    if (!images.length) { this.reset(); this.load(); return; }
    if (images.some((image) => !image.altEng.trim() || !image.altAr.trim())) { this.imageMessage = 'imageAltRequired'; this.cdr.markForCheck(); return; }
    const form = new FormData();
    images.forEach((image, index) => {
      form.append(`Images[${index}].Image`, image.file!, image.file!.name);
      form.append(`Images[${index}].AltEng`, image.altEng.trim());
      form.append(`Images[${index}].AltAr`, image.altAr.trim());
    });
    this.saving = true;
    this.api.post(`HotelRooms/${roomId}/Images`, form).pipe(catchError(() => of(null)), finalize(() => { this.saving = false; this.cdr.markForCheck(); })).subscribe((response: any) => {
      if (!response?.isSuccess) { this.imageMessage = response?.message || 'hotelImageSaveError'; return; }
      this.reset(); this.load();
    });
  }

  private validatePeriods(): boolean {
    const periods = (this.rates.getRawValue() as any[]).sort((a, b) => String(a.startDate).localeCompare(String(b.startDate)));
    return periods.length > 0
      && periods.every((period) => !!String(period.title ?? '').trim() && period.startDate && period.endDate && period.endDate > period.startDate && Number(period.nightlyRate) > 0)
      && periods.every((period, index) => index === 0 || periods[index - 1].endDate <= period.startDate);
  }

  private load(): void {
    this.loading = true;
    forkJoin({ rooms: this.api.get(`HotelRooms/ByHotel/${this.hotelId}`).pipe(catchError(() => of(null))), facilities: this.api.get('HotelAmenities?kind=2&isActive=true').pipe(catchError(() => of(null))), mealPlans: this.api.get('MealPlans/Active').pipe(catchError(() => of(null))), currencies: this.api.get('Currencies').pipe(catchError(() => of(null))), policies: this.api.get(`HotelChildPolicies/Hotels/${this.hotelId}`).pipe(catchError(() => of(null))) }).pipe(finalize(() => { this.loading = false; this.cdr.markForCheck(); })).subscribe((result) => { this.rooms = this.rows(result.rooms); this.facilities = this.rows(result.facilities); this.mealPlans = this.rows(result.mealPlans); this.currencies = this.rows(result.currencies); this.hotelPolicies = this.rows(result.policies); if (!this.editingRoom) this.reset(); });
  }
  private rows(response: any): any[] { const data = response?.data ?? response; return Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : Array.isArray(data?.items) ? data.items : []; }
  private parseBathroom(value: unknown): string[] { return typeof value === 'string' ? value.split(';').map((item) => item.trim()).filter(Boolean) : []; }
  private removeRoomImageLocally(index: number): void { const [removed] = this.roomImages.splice(index, 1); if (removed?.file) URL.revokeObjectURL(removed.url); this.cdr.markForCheck(); }
  private revokeNewImageUrls(): void { this.roomImages.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url)); }
}
