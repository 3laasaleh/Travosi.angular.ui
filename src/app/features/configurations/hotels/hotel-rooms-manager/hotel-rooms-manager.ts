import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import { HotelRoomCard } from '../../../../shared/components/hotel-room-card/hotel-room-card';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { HotelRoomDto } from '../models/hotel-room.dto';
import { LanguageService } from '../../../../core/services/language.service';
import { mdiIconClass } from '../../../../shared/utils/mdi-icon.util';
import { HotelRoomChildrenPolicy, readRoomChildrenPolicies } from '../../../../shared/utils/hotel-room-children-policies.util';
import { arabicTextValidator } from '../../../../core/validators/arabic-text.validator';

interface FacilityGroup {
  id: number;
  name: string;
  facilities: any[];
}

@Component({
  selector: 'app-hotel-rooms-manager',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, HotelRoomCard, DatePicker],
  templateUrl: './hotel-rooms-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomsManager implements OnChanges {
  readonly iconClass = mdiIconClass;
  @Input() hotelId: number | null = null;
  rooms: any[] = [];
  facilities: any[] = [];
  mealPlans: any[] = [];
  loading = false;
  saving = false;
  error = '';
  editingRoom: any | null = null;
  readonly roomFormOpen = signal(false);
  selectedFacilityIds = new Set<number>();
  roomImages: Array<{
    id?: number;
    file?: File;
    url: string;
    altEng: string;
    altAr: string;
    existing: boolean;
  }> = [];
  imageMessage = '';
  readonly maxImages = 5;
  private readonly language = inject(LanguageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly hotelRooms = [
    { value: 1, label: 'Single' },
    { value: 2, label: 'Double' },
    { value: 3, label: 'Twin' },
    { value: 4, label: 'Triple' },
    { value: 5, label: 'Family' },
    { value: 6, label: 'Suite' },
    { value: 7, label: 'Junior suite' },
    { value: 8, label: 'Deluxe' },
  ];
  readonly childPricingTypes = [
    { value: 1, label: 'free' },
    { value: 2, label: 'perNight' },
    { value: 3, label: 'perStay' },
    { value: 4, label: 'percentage' },
    { value: 5, label: 'adultRate' },
  ];
  readonly childBedTypes = [
    { value: 1, label: 'existingBed' },
    { value: 2, label: 'extraBed' },
    { value: 3, label: 'babyCot' },
    { value: 4, label: 'noAdditionalBed' },
  ];

  readonly roomForm = new FormGroup({
    nameEng: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    nameAr: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    descriptionEng: new FormControl('', { nonNullable: true }),
    descriptionAr: new FormControl('', { nonNullable: true }),
    roomType: new FormControl(1, { nonNullable: true }),
    mealPlan: new FormControl(1, { nonNullable: true }),
    roomSize: new FormControl<number | null>(null),
    bedTypeEng: new FormControl('', { nonNullable: true }),
    bedTypeAr: new FormControl('', { nonNullable: true }),
    bedSize: new FormControl('', { nonNullable: true }),
    avilableRoomsCount: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    hasBalcony: new FormControl(false, { nonNullable: true }),
    smokingAllowed: new FormControl(false, { nonNullable: true }),
    maxAdults: new FormControl(1, { nonNullable: true, validators: [Validators.min(1)] }),
    maxChildren: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    maxInfants: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
    roomPeriodPrices: new FormArray<FormGroup>([]),
    childrenPolicies: new FormArray<FormGroup>([]),
  });

  constructor(
    private readonly api: ApiService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.roomPeriodPrices.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.validateAllPeriods();
      this.cdr.markForCheck();
    });
  }

  get roomPeriodPrices(): FormArray<FormGroup> {
    return this.roomForm.controls.roomPeriodPrices;
  }
  get childrenPolicies(): FormArray<FormGroup> {
    return this.roomForm.controls.childrenPolicies;
  }
  get isArabic(): boolean {
    return this.language.currentLanguage() === 'ar';
  }
  mealPlanName(plan: any): string {
    return this.isArabic ? plan?.nameAr || plan?.nameEng || '' : plan?.nameEng || plan?.nameAr || '';
  }
  get today(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
  minimumEndDate(startDate: unknown): string {
    if (typeof startDate !== 'string' || !startDate) return this.today;
    const date = new Date(`${startDate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return this.today;
    date.setDate(date.getDate() + 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
get todayAfterMonth(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['hotelId']) return;
    this.reset();
    if (!this.hotelId) {
      this.rooms = [];
      return;
    }
    this.load();
  }

  get facilityGroups(): FacilityGroup[] {
    const groups = new Map<number, FacilityGroup>();
    this.facilities.forEach((facility) => {
      const id = Number(facility.facilityCategoryId) || 0;
      if (!groups.has(id))
        groups.set(id, { id, name: facility.facilityCategoryNameEng || 'Other', facilities: [] });
      groups.get(id)!.facilities.push(facility);
    });
    return [...groups.values()];
  }

  addRoom(): void {
    this.reset();
    this.roomFormOpen.set(true);
  }

  edit(room: HotelRoomDto): void {
    this.roomFormOpen.set(true);
    this.error = '';
    this.api.get(`HotelRooms/${room.id}/Edit`).pipe(catchError(() => of(null))).subscribe((response: any) => {
      if (!response?.isSuccess || !response.data) {
        this.error = response?.message || 'roomLoadError';
        this.roomFormOpen.set(false);
        this.cdr.markForCheck();
        return;
      }
      this.populateEditRoom(response.data);
    });
  }

  private populateEditRoom(room: HotelRoomDto): void {
    this.editingRoom = room;
    this.revokeNewImageUrls();
    this.roomImages = (room.images ?? [])
      .slice(0, this.maxImages)
      .map((image: any) => ({
        id: image.id,
        url: image.imageUrl ?? image.url ?? '',
        altEng: image.altTextEng ?? image.altEng ?? '',
        altAr: image.altTextAr ?? image.altAr ?? '',
        existing: true,
      }))
      .filter((image: any) => !!image.url);
    this.imageMessage = '';
    this.selectedFacilityIds = new Set(
      (room.amenities ?? [])
        .map((facility: any) => Number(typeof facility === 'number' ? facility : facility?.id))
        .filter(Boolean),
    );
    this.roomForm.reset({
      nameEng: room.nameEng  ?? '',
      nameAr: room.nameAr ?? '',
      descriptionEng: room.descriptionEng ?? '',
      descriptionAr: room.descriptionAr ?? '',
      roomType: Number(room.roomType ?? 1),
      mealPlan: Number(room.mealPlan ?? 1),
      roomSize: room.roomSize ?? null,
      bedTypeEng: room.bedTypeEng ?? room.bedType ?? '',
      bedTypeAr: room.bedTypeAr ?? '',
      bedSize: room.bedSize ?? '',
      avilableRoomsCount: Number(room.avilableRoomsCount ?? 1),
      hasBalcony: room.hasBalcony === true,
      smokingAllowed: room.smokingAllowed === true,
      maxAdults: Number(room.maxAdults ?? 1),
      maxChildren: Number(room.maxChildren ?? 0),
      maxInfants: Number(room.maxInfants ?? 0),
      childrenPolicies:[],
    });


    this.roomPeriodPrices.clear();
    ((room as any).roomPeriodPrices ?? [])
      .sort((left: any, right: any) => String(left.startDate).localeCompare(String(right.startDate)))
      .forEach((period: any) => this.addPeriod(period));
    if (!this.roomPeriodPrices.length) this.addPeriod();
    this.childrenPolicies.clear();
    readRoomChildrenPolicies(room.childrenPolicies).forEach((policy) => this.addChildPolicy(policy));
    this.cdr.markForCheck();
  }

  reset(): void {
    this.roomFormOpen.set(false);
    this.revokeNewImageUrls();
    this.roomImages = [];
    this.imageMessage = '';
    this.editingRoom = null;
    this.error = '';
    this.selectedFacilityIds = new Set();
    this.roomForm.reset({
      nameEng: '',
      nameAr: '',
      descriptionEng: '',
      descriptionAr: '',
      roomType: 1,
      mealPlan: 1,
      roomSize: null,
      bedTypeEng: '',
      bedTypeAr: '',
      bedSize: '',
      avilableRoomsCount: 1,
      hasBalcony: false,
      smokingAllowed: false,
      maxAdults: 1,
      maxChildren: 0,
      maxInfants: 0,
      childrenPolicies:[]
    });
    this.roomPeriodPrices.clear();
    this.addPeriod();
    this.childrenPolicies.clear();
  }

  toggleFacility(id: number, checked: boolean): void {
    checked ? this.selectedFacilityIds.add(id) : this.selectedFacilityIds.delete(id);
  }
  allSelected(group: FacilityGroup): boolean {
    return (
      group.facilities.length > 0 &&
      group.facilities.every((facility) => this.selectedFacilityIds.has(Number(facility.id)))
    );
  }
  toggleGroup(group: FacilityGroup, checked: boolean): void {
    group.facilities.forEach((facility) => this.toggleFacility(Number(facility.id), checked));
  }
  addPeriod(value: any = {}): void {
    const previousEndDate = this.roomPeriodPrices.length
      ? String(this.roomPeriodPrices.at(this.roomPeriodPrices.length - 1).controls['endDate'].value ?? '')
      : '';
    this.roomPeriodPrices.push(
      new FormGroup({
        id: new FormControl(Number(value.id ?? 0)),
        startDate: new FormControl(
          value.startDate ?? (this.roomPeriodPrices.length && previousEndDate ? this.addDays(previousEndDate, 1) : this.today),
          { nonNullable: true, validators: [Validators.required] },
        ),
        endDate: new FormControl(value.endDate ?? '', {
          nonNullable: true,
          validators: [Validators.required],
        }),

        price: new FormControl<number | null>(
          value.price != null || value.nightlyRate != null
            ? Number(value.price ?? value.nightlyRate)
            : null, {
          validators: [Validators.required, Validators.min(0.01)],
        }),
        isActive: new FormControl(value.isActive !== false, { nonNullable: true }),
      }),
    );
    this.validateAllPeriods();
  }
  removePeriod(index: number): void {
    if (this.roomPeriodPrices.length > 1) {
      this.roomPeriodPrices.removeAt(index);
      this.validateAllPeriods();
    }
  }

  addChildPolicy(value: Partial<HotelRoomChildrenPolicy> = {}): void {
    this.childrenPolicies.push(
      new FormGroup({
        valueEng: new FormControl(value.valueEng ?? '', {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(1000)],
        }),
        valueAr: new FormControl(value.valueAr ?? '', {
          nonNullable: true,
          validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(1000), arabicTextValidator()],
        }),
      }),
    );
  }
  removeChildPolicy(index: number): void {
    this.childrenPolicies.removeAt(index);
  }

  async onRoomImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.imageMessage = '';
    if (this.roomImages.length + files.length > this.maxImages) {
      this.imageMessage = 'hotelImageLimit';
      return;
    }
    for (const file of files) {
      if (
        !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
        file.size > 5 * 1024 * 1024
      ) {
        this.imageMessage = file.size > 5 * 1024 * 1024 ? 'imageTooLarge' : 'invalidImageType';
        continue;
      }
      try {
        const normalized = await normalizeImageUpload(file, { maxWidth: 2400, maxHeight: 1600 });
        this.roomImages.push({
          file: normalized,
          url: URL.createObjectURL(normalized),
          altEng: '',
          altAr: '',
          existing: false,
        });
      } catch (error) {
        this.imageMessage =
          error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
      }
    }
    this.cdr.markForCheck();
  }

  removeRoomImage(index: number): void {
    const image = this.roomImages[index];
    if (!image) return;
    if (image.existing && image.id && this.editingRoom?.id) {
      this.api
        .deleteRequest(`HotelRooms/${this.editingRoom.id}/Images/${image.id}`)
        .pipe(catchError(() => of(null)))
        .subscribe((response: any) => {
          if (response?.isSuccess === false || !response) {
            this.imageMessage = 'imageDeleteError';
            this.cdr.markForCheck();
            return;
          }
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
    this.validateAllPeriods();
    if (this.roomForm.invalid) {
      this.roomForm.markAllAsTouched();
      this.error = 'pleaseCorrectFormErrors';
      return;
    }
    const value = this.roomForm.getRawValue();
    const { childrenPolicies, ...roomValue } = value;
    const payload = {
      hotelId: this.hotelId,
      name: value.nameEng.trim(),
      ...roomValue,
      childrenPolicies: childrenPolicies.map((policy) => ({
        valueEng: String(policy['valueEng']).trim(),
        valueAr: String(policy['valueAr']).trim(),
      })),
      roomType: Number(value.roomType),
      mealPlan: Number(value.mealPlan),
      roomSize: value.roomSize === null ? null : Number(value.roomSize),
      avilableRoomsCount: Number(value.avilableRoomsCount),
      maxAdults: Number(value.maxAdults),
      maxChildren: Number(value.maxChildren),
      maxInfants: Number(value.maxInfants),
      maxTotalOccupancy:
        Number(value.maxAdults) + Number(value.maxChildren) + Number(value.maxInfants),
      roomPeriodPrices: value.roomPeriodPrices.map((period: any) => ({
        id: Number(period.id ?? 0),
        startDate: period.startDate,
        endDate: period.endDate,
        price: Number(period.price),
        isActive: period.isActive !== false,
      })),
      ...(this.editingRoom ? { id: Number(this.editingRoom.id) } : {}),
    };
    this.saving = true;
    this.error = '';
    const request = this.editingRoom
      ? this.api.put('HotelRooms', payload)
      : this.api.post('HotelRooms', payload);
    request
      .pipe(
        catchError((error) => {
          this.error = error?.error?.message || 'roomSaveError';
          return of(null);
        }),
      )
      .subscribe((response: any) => {
        if (!response?.isSuccess) {
          if (response) this.error = response.message || 'roomSaveError';
          this.saving = false;
          this.cdr.markForCheck();
          return;
        }
        const roomId = Number(response.data?.id ?? this.editingRoom?.id);
        if (!roomId) {
          this.error = 'roomSaveError';
          this.saving = false;
          this.cdr.markForCheck();
          return;
        }
        this.api.put(`HotelAmenities/Rooms/${roomId}`, [...this.selectedFacilityIds])
          .pipe(catchError(() => of(null)))
          .subscribe(() => this.uploadNewRoomImages(roomId));
      });
  }

  deleteRoom(room: any): void {
    if (!room?.id || this.saving || !window.confirm('Delete this room?')) return;
    this.saving = true;
    this.api
      .delete('HotelRooms', Number(room.id))
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          this.saving = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (!response?.isSuccess) {
          this.error = response?.message || 'roomSaveError';
          return;
        }
        if (this.editingRoom?.id === room.id) this.reset();
        this.load();
      });
  }

  private uploadNewRoomImages(roomId: number): void {
    const images = this.roomImages.filter((image) => image.file);
    if (!images.length) {
      this.reset();
      this.load();
      return;
    }
    if (images.some((image) => !image.altEng.trim() || !image.altAr.trim())) {
      this.imageMessage = 'imageAltRequired';
      this.cdr.markForCheck();
      return;
    }
    const form = new FormData();
    images.forEach((image, index) => {
      form.append(`Images[${index}].Image`, image.file!, image.file!.name);
      form.append(`Images[${index}].AltEng`, image.altEng.trim());
      form.append(`Images[${index}].AltAr`, image.altAr.trim());
    });
    this.saving = true;
    this.api
      .post(`HotelRooms/${roomId}/Images`, form)
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          this.saving = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (!response?.isSuccess) {
          this.imageMessage = response?.message || 'hotelImageSaveError';
          return;
        }
        this.reset();
        this.load();
      });
  }



  private load(): void {
    this.loading = true;
    forkJoin({
      rooms: this.api.get(`HotelRooms/ByHotel/${this.hotelId}`).pipe(catchError(() => of(null))),
      facilities: this.api
        .get('HotelAmenities?kind=2&isActive=true')
        .pipe(catchError(() => of(null))),
      mealPlans: this.api.get('MealPlans').pipe(catchError(() => of(null))),
    })
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((result) => {
        this.rooms = this.rows(result.rooms);
        this.facilities = this.rows(result.facilities)
          .filter((facility) => Number(facility?.kind) === 2);
        this.mealPlans = this.rows(result.mealPlans);
        if (!this.roomFormOpen()) 
          this.reset();
      });
  }
  private rows(response: any): any[] {
    const data = response?.data ?? response;
    return Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : [];
  }
  private removeRoomImageLocally(index: number): void {
    const [removed] = this.roomImages.splice(index, 1);
    if (removed?.file) URL.revokeObjectURL(removed.url);
    this.cdr.markForCheck();
  }
  private revokeNewImageUrls(): void {
    this.roomImages
      .filter((image) => image.file)
      .forEach((image) => URL.revokeObjectURL(image.url));
  }
private addError(
  control: AbstractControl,
  errorName: string
): void {
  control.setErrors({
    ...control.errors,
    [errorName]: true
  }, { emitEvent: false });
}

private removeError(
  control: AbstractControl,
  errorName: string
): void {
  if (!control.errors) {
    return;
  }

  const errors = { ...control.errors };

  delete errors[errorName];

  control.setErrors(
    Object.keys(errors).length > 0 ? errors : null,
    { emitEvent: false }
  );
}
addDays(date: string, days: number): string {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return `${result.getFullYear()}-${String(result.getMonth() + 1).padStart(2, '0')}-${String(result.getDate()).padStart(2, '0')}`;
}
getMinimumStartDate(index: number): string {

  if (index === 0) {
    return this.today;
  }

  const previousPeriod =
    this.roomPeriodPrices.at(index - 1) as FormGroup;

  const previousEndDate =
    previousPeriod.get('endDate')?.value;

  return previousEndDate
    ? this.addDays(previousEndDate, 1)
    : this.today;
}
  private validateAllPeriods(): void {
    this.roomPeriodPrices.controls.forEach((period) => {
      this.removeError(period.controls['startDate'], 'previousPeriod');
      this.removeError(period.controls['endDate'], 'dateOrder');
    });

    this.roomPeriodPrices.controls.forEach((period, index) => {
      const startDate = String(period.controls['startDate'].value ?? '');
      const endDate = String(period.controls['endDate'].value ?? '');
      if (startDate && endDate && endDate <= startDate) this.addError(period.controls['endDate'], 'dateOrder');

      if (index > 0 && startDate) {
        const previousEndDate = String(this.roomPeriodPrices.at(index - 1).controls['endDate'].value ?? '');
        if (previousEndDate && startDate <= previousEndDate) this.addError(period.controls['startDate'], 'previousPeriod');
      }
    });
  }
}
