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
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of, switchMap, throwError, tap } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { environment } from '../../../../../environments/environment';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import { arabicTextValidator } from '../../../../core/validators/arabic-text.validator';
import { HotelRoomsManager } from '../hotel-rooms-manager/hotel-rooms-manager';
import { mdiIconClass } from '../../../../shared/utils/mdi-icon.util';
import { SaveFeedbackService } from '../../shared/save-feedback.service';
import { hotelImageFileError, hotelImagesError } from '../hotel-image-validation.util';

interface HotelImageUpload { id?: number; file?: File; url: string; altEng: string; altAr: string; existing: boolean; }

export interface HotelDTO {
  id: number;
  nameEng?: string;
  nameAr?: string;
  routeName?: string;
  starRating: number;
  distanceFromDowntownKm?: number | null;
  hasFreeAirportTaxi?: boolean;
  googleMapsUrl?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  website?: string | null;
  policiesEng?: string | null;
  policiesAr?: string | null;
  cancellationPolicyEng?: string | null;
  cancellationPolicyAr?: string | null;
  isFreeCancelation?: boolean | null;
  descriptionEng?: string;
  descriptionAr?: string;
  isActive: boolean;
  showAsDefault: boolean;
  destinationId: number;
}

@Component({
  selector: 'app-hotels-from-card',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './hotels-from-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsFromCard implements OnInit, OnChanges {
  private readonly feedback = inject(SaveFeedbackService);
  private readonly translate = inject(TranslateService);
  private readonly element: ElementRef<HTMLElement> = inject(ElementRef);
  private persistedHotelId: number | null = null;
  readonly iconClass = mdiIconClass;
  @Input() selectedHotel: HotelDTO | null = null;
  @Output() hotelSaved = new EventEmitter<void>();
  @Output() editCancelled = new EventEmitter<void>();

  hotelForm = this.createForm();
  isLoading = false;
  errorMessage = '';
  validationSubmitted = false;
  successMessage = '';
  readonly starOptions = [1, 2, 3, 4, 5];
  readonly maxImages = 5;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly imageConstraints = { maxWidth: 2400, maxHeight: 1600 };
  destinations: any[] = [];
  hotelFacilities: any[] = [];
  selectedHotelFacilityIds = new Set<number>();
  private originalHotelFacilityIds = new Set<number>();
  imageUploads: HotelImageUpload[] = [];
  imageValidationMessage = '';
  readonly processingImages = signal(false);

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    forkJoin({
      destinations: this.apiService.get('Destinations?page=1&pageSize=500').pipe(catchError(() => of(null))),
      facilities: this.apiService.get('HotelAmenities?kind=1&isActive=true').pipe(catchError(() => of(null))),
    }).pipe(finalize(() => this.cdr.markForCheck())).subscribe(({ destinations, facilities }: any) => {
      const page = destinations?.data ?? destinations;
      const rows = page?.data ?? page?.items ?? page?.destinations ?? page;
      this.destinations = (Array.isArray(rows) ? rows : []).filter((item) => item?.isActive !== false);
      this.hotelFacilities = this.rows(facilities)
        .filter((facility) => Number(facility?.kind) === 1 );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selectedHotel']) return;
    if (this.selectedHotel) this.populateForm(this.selectedHotel);
    else this.resetForm(false);
  }

  saveHotel(): void {
    if (this.isLoading || this.processingImages()) return;
    this.validationSubmitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      this.notifyValidation('pleaseCorrectFormErrors');
      return;
    }
    const form = this.hotelForm.getRawValue();
    const policies = this.cancellationPoliciesArray.getRawValue()
      .map((item: any) => ({ valueEng: String(item.valueEng ?? '').trim(), valueAr: String(item.valueAr ?? '').trim() }))
      .filter((item) => item.valueEng || item.valueAr);
    if (!form.isFreeCancelation && (!policies.length || policies.some((item) => !item.valueEng || !item.valueAr))) {
      this.cancellationPoliciesArray.markAllAsTouched();
      this.errorMessage = 'cancellationPolicyRequired';
      this.notifyValidation(this.errorMessage);
      return;
    }
    if (form.from && form.to && form.to < form.from) {
      this.errorMessage = 'endDateBeforeStart';
      this.notifyValidation(this.errorMessage);
      return;
    }
    this.imageValidationMessage = hotelImagesError(this.imageUploads);
    if (this.imageValidationMessage) {
      this.notifyValidation(this.imageValidationMessage);
      return;
    }
    const payload: any = {
      name: form.nameEng.trim(),
      nameEng: form.nameEng.trim(),
      nameAr: form.nameAr.trim(),
      routeName: form.routeName.trim() || null,
      starRating: Number(form.starRating),
      distanceFromDowntownKm: form.distanceFromDowntownKm === null ? null : Number(form.distanceFromDowntownKm),
      hasFreeAirportTaxi: form.hasFreeAirportTaxi === true,
      googleMapsUrl: form.googleMapsUrl.trim() || null,
      from: form.from || null,
      to: form.to || null,
      policiesEng: policies.map((item) => item.valueEng).join(';'),
      policiesAr: policies.map((item) => item.valueAr).join(';'),
      cancellationPolicyEng: policies.map((item) => item.valueEng).join(';'),
      cancellationPolicyAr: policies.map((item) => item.valueAr).join(';'),
      isFreeCancelation: form.isFreeCancelation === true,
      destinationId: Number(form.destinationId),
      descriptionEng: form.descriptionEng.trim(),
      descriptionAr: form.descriptionAr.trim(),
      phoneNumber: form.phoneNumber.trim(),
      email: form.email.trim(),
      website: form.website.trim(),
      isActive: form.isActive,
      showAsDefault: form.showAsDefault,
      imageUpdates: this.imageUploads.filter(image => image.existing && image.id).map(image => ({
        id: image.id, altEng: image.altEng.trim(), altAr: image.altAr.trim(),
      })),
    };
    const existingId = this.selectedHotel?.id ?? this.persistedHotelId;
    if (existingId) payload.id = existingId;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request$ = existingId
      ? this.apiService.put('Hotels', payload)
      : this.apiService.post('Hotels', payload);
    request$
      .pipe(
        switchMap((res: any) => {
          if (!res?.isSuccess) return throwError(() => ({ error: res || { message: 'hotelSaveError' } }));
          const hotelId = Number(res.data?.id ?? existingId);
          if (!hotelId) return throwError(() => ({ error: { message: 'hotelSaveError' } }));
          // Retrying a failed facility/image upload must update the hotel already created.
          this.persistedHotelId = hotelId;
          return this.saveHotelFacilities(hotelId).pipe(switchMap(() => this.uploadNewImages(hotelId)));
        }),
        catchError(error => {
          this.errorMessage = this.feedback.errorMessage(error, 'hotelSaveError');
          this.feedback.show('error', this.errorMessage);
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((res: any) => {
        if (res === null) return;
        this.completeSave('hotelSavedSuccessfully');
      });
  }

  cancelEdit(): void {
    if (this.isLoading || this.processingImages()) return;
    this.resetForm(true);
  }

  async onImagesSelected(event: Event): Promise<void> {
    if (this.isLoading || this.processingImages()) return;
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []); input.value = '';
    this.imageValidationMessage = '';
    if (this.imageUploads.length + files.length > this.maxImages) { this.imageValidationMessage = 'hotelImageLimit'; return; }
    this.processingImages.set(true);
    try { for (const file of files) {
      const error = hotelImageFileError(file);
      if (error) { this.imageValidationMessage = error; continue; }
      try { const normalized = await normalizeImageUpload(file, this.imageConstraints); this.imageUploads.push({ file: normalized, url: URL.createObjectURL(normalized), altEng: '', altAr: '', existing: false }); }
      catch (error) { this.imageValidationMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError'; }
    } } finally {
      this.processingImages.set(false);
      this.cdr.markForCheck();
    }
  }

  removeImage(index: number): void {
    if (this.isLoading || this.processingImages()) return;
    const image = this.imageUploads[index]; if (!image) return;
    if (image.existing && this.selectedHotel?.id && image.id) {
      this.apiService.deleteRequest(`Hotels/${this.selectedHotel.id}/Images/${image.id}`).pipe(catchError(() => of(null))).subscribe((response: any) => {
        if (response?.isSuccess === false || !response) { this.imageValidationMessage = 'imageDeleteError'; this.cdr.markForCheck(); return; }
        this.removeImageLocally(index);
      });
      return;
    }
    this.removeImageLocally(index);
  }

  imageUrl(url: string): string { if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url; return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/?(?:images\/)?/i, '')}`; }

  private populateForm(hotel: HotelDTO): void {
    this.persistedHotelId = hotel.id;
    this.validationSubmitted = false;
    this.hotelForm.patchValue({
      nameEng: hotel.nameEng ?? '',
      nameAr: hotel.nameAr ??  '',
      routeName: hotel.routeName ??'',
      starRating: hotel.starRating ?? 1,
      distanceFromDowntownKm: hotel.distanceFromDowntownKm ?? null,
      hasFreeAirportTaxi: hotel.hasFreeAirportTaxi === true,
      googleMapsUrl: hotel.googleMapsUrl ?? '',
      phoneNumber: hotel.phoneNumber ?? '',
      email: hotel.email ?? '',
      website: hotel.website ?? '',
      isFreeCancelation: hotel.isFreeCancelation === true,
      destinationId: hotel.destinationId ?? null,
      descriptionEng: hotel.descriptionEng ?? '',
      descriptionAr: hotel.descriptionAr ?? '',
      isActive: hotel.isActive !== false,
      showAsDefault: hotel.showAsDefault === true,
    });
    this.cancellationPoliciesArray.clear();
    const policiesEng = this.splitPolicies(hotel.cancellationPolicyEng ?? hotel.policiesEng);
    const policiesAr = this.splitPolicies(hotel.cancellationPolicyAr ?? hotel.policiesAr);
    for (let index = 0; index < Math.max(policiesEng.length, policiesAr.length); index++) {
      this.addCancellationPolicy({ valueEng: policiesEng[index] ?? '', valueAr: policiesAr[index] ?? '' });
    }
    this.revokeNewImageUrls();
    this.imageUploads = ((hotel as any).images ?? []).slice(0, this.maxImages).map((image: any) => ({ id: image.id, url: image.imageUrl ?? image.url, altEng: image.altTextEng ?? image.altEng ?? '', altAr: image.altTextAr ?? image.altAr ?? '', existing: true })).filter((image: HotelImageUpload) => !!image.url);
    const amenityIds = ((hotel as any).amenities ?? [])
      .map((facility: any) => Number(facility.id))
      .filter(Boolean);
    this.selectedHotelFacilityIds = new Set(amenityIds);
    this.originalHotelFacilityIds = new Set(amenityIds);
  }

  private resetForm(emitCancel: boolean): void {
    this.persistedHotelId = null;
    this.validationSubmitted = false;
    this.revokeNewImageUrls(); this.imageUploads = []; this.imageValidationMessage = ''; this.selectedHotelFacilityIds = new Set(); this.originalHotelFacilityIds = new Set();
    this.hotelForm.reset({
      name: '',
      nameEng: '',
      nameAr: '',
      routeName: '',
      starRating: 1,
      distanceFromDowntownKm: null,
      hasFreeAirportTaxi: false,
      googleMapsUrl: '',
      from: null,
      to: null,
      isFreeCancelation: false,
      destinationId: null,
      descriptionEng: '',
      descriptionAr: '',
      phoneNumber: '',
      email: '',
      website: '',
      isActive: true,
      showAsDefault: false,
    });
    this.cancellationPoliciesArray.clear();
    if (emitCancel) this.editCancelled.emit();
  }

  private uploadNewImages(hotelId: number) {
    const images = this.imageUploads.filter(image => image.file);
    if (!images.length) return of({ isSuccess: true });
    const payload = new FormData();
    images.forEach((image, index) => { payload.append(`Images[${index}].Image`, image.file!, image.file!.name); payload.append(`Images[${index}].AltEng`, image.altEng.trim()); payload.append(`Images[${index}].AltAr`, image.altAr.trim()); });
    return this.apiService.post(`Hotels/${hotelId}/Images`, payload).pipe(
      switchMap((response: any) => response?.isSuccess ? of(response)
        : throwError(() => ({ error: response || { message: 'hotelImageSaveError' } }))),
    );
  }
  get hotelFacilityGroups(): Array<{ id: number; name: string; facilities: any[] }> {
    const groups = new Map<number, { id: number; name: string; facilities: any[] }>();
    this.hotelFacilities.forEach((facility) => {
      const id = Number(facility.facilityCategoryId) || 0;
      if (!groups.has(id))
        groups.set(id, { id, name: facility.facilityCategoryName || 'Other', facilities: [] });
      groups.get(id)!.facilities.push(facility);
    });
    return [...groups.values()];
  }
  facilityGroupSelected(group: { facilities: any[] }): boolean { return group.facilities.length > 0 && group.facilities.every((facility) => this.selectedHotelFacilityIds.has(Number(facility.id))); }
  toggleHotelFacility(id: number, checked: boolean): void { checked ? this.selectedHotelFacilityIds.add(id) : this.selectedHotelFacilityIds.delete(id); }
  toggleHotelFacilityGroup(group: { facilities: any[] }, checked: boolean): void { group.facilities.forEach((facility) => this.toggleHotelFacility(Number(facility.id), checked)); }
  private saveHotelFacilities(hotelId: number) {
    const facilities = this.hotelFacilities.map((facility) => {
      const id = Number(facility.id);
      const selected = this.selectedHotelFacilityIds.has(id);
      const originallySelected = this.originalHotelFacilityIds.has(id);
      return { facilityId: id, status: selected === originallySelected ? null : selected ? 'add' : 'remove' };
    });
    return this.apiService.put(`HotelAmenities/Hotels/${hotelId}`, { facilities }).pipe(
      switchMap((response: any) => response?.isSuccess ? of(response)
        : throwError(() => ({ error: response || { message: 'hotelFacilitiesSaveError' } }))),
      tap(() => { this.originalHotelFacilityIds = new Set(this.selectedHotelFacilityIds); }),
    );
  }
  private completeSave(message: string): void {
    this.successMessage = message;
    this.feedback.show('success', message);
    this.resetForm(false);
    this.hotelSaved.emit();
  }

  private notifyValidation(message: string): void {
    this.errorMessage = message;
    this.feedback.show('warning', message);
    this.cdr.detectChanges();
    const firstInvalid = this.element.nativeElement.querySelector<HTMLElement>('input.ng-invalid, select.ng-invalid, textarea.ng-invalid, [role="alert"]');
    firstInvalid?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    firstInvalid?.focus();
  }

  get invalidFieldMessages(): string[] {
    if (!this.validationSubmitted) return [];
    const labels: Record<string, string> = {
      nameEng: 'nameEnglish', nameAr: 'nameArabic', routeName: 'routeName', starRating: 'starRating',
      destinationId: 'destination', descriptionEng: 'englishDescription', descriptionAr: 'arabicDescription',
      distanceFromDowntownKm: 'distanceFromDowntown', email: 'email', cancellationPolicies: 'cancellationPolicies',
      googleMapsUrl: 'googleMapsUrl', website: 'website',
    };
    return Object.entries(this.hotelForm.controls).filter(([, control]) => control.invalid).map(([key, control]) => {
      const errors = control.errors;
      const reason = errors?.['maxlength']
        ? this.translate.instant('maximumCharacters', { count: errors['maxlength'].requiredLength })
        : this.translate.instant(errors?.['arabicText'] ? 'arabicNameInvalid' : errors?.['email'] ? 'emailInvalid' : 'pleaseCorrectFormErrors');
      return `${this.translate.instant(labels[key] ?? key)}: ${reason}`;
    });
  }
  private removeImageLocally(index: number): void { const [removed] = this.imageUploads.splice(index, 1); if (removed?.file) URL.revokeObjectURL(removed.url); this.cdr.markForCheck(); }
  private revokeNewImageUrls(): void { this.imageUploads.filter(image => image.file).forEach(image => URL.revokeObjectURL(image.url)); }
  private rows(response: any): any[] { const data = response?.data ?? response; return Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : Array.isArray(data?.items) ? data.items : []; }

  get cancellationPoliciesArray(): FormArray<FormGroup> {
    return this.hotelForm.controls.cancellationPolicies;
  }

  addCancellationPolicy(value: { valueEng?: string; valueAr?: string } = {}): void {
    this.cancellationPoliciesArray.push(new FormGroup({
      valueEng: new FormControl(value.valueEng ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(1000)] }),
      valueAr: new FormControl(value.valueAr ?? '', { nonNullable: true, validators: [Validators.required, Validators.maxLength(1000), arabicTextValidator()] }),
    }));
  }

  removeCancellationPolicy(index: number): void {
    this.cancellationPoliciesArray.removeAt(index);
  }

  private splitPolicies(value: unknown): string[] {
    return typeof value === 'string' ? value.split(';').map((item) => item.trim()).filter(Boolean) : [];
  }

  private createForm() {
    return new FormGroup({
      // `nameEng` is the displayed/editable name; keep the legacy field only for API compatibility.
      name: new FormControl('', { nonNullable: true }),
      nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
      nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
      routeName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100), Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/)] }),
      starRating: new FormControl(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
      distanceFromDowntownKm: new FormControl<number | null>(null, { validators: [Validators.min(0)] }),
      hasFreeAirportTaxi: new FormControl(false, { nonNullable: true }),
      googleMapsUrl: new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^https?:\/\/.+/i)] }),
      from: new FormControl<string | null>(null),
      to: new FormControl<string | null>(null),
      isFreeCancelation: new FormControl(false, { nonNullable: true }),
      cancellationPolicies: new FormArray<FormGroup>([]),
      destinationId: new FormControl<number | null>(null, { validators: [Validators.required] }),
      descriptionEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000)] }),
      descriptionAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(4000), arabicTextValidator()] }),
      phoneNumber: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.email] }),
      website: new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^https?:\/\/.+/i)] }),
      isActive: new FormControl(true, { nonNullable: true }),
      showAsDefault: new FormControl(false, { nonNullable: true }),
    });
  }
}
