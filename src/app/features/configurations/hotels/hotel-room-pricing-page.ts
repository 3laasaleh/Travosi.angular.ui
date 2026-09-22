import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { ApiService } from '../../../core/services/apiservice.service';
import { environment } from '../../../../environments/environment';
import { ImageUploadValidationError, normalizeImageUpload } from '../shared/image-upload.util';

interface PricingPeriodValue { startDate: string; endDate: string; nightlyRate: number; isActive: boolean; }
interface RoomImageUpload { id?: number; file?: File; url: string; altEng: string; altAr: string; existing: boolean; }

@Component({
  selector: 'app-hotel-room-pricing-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './hotel-room-pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomPricingPage implements OnInit {
  hotels: any[] = [];
  rooms: any[] = [];
  currencies: any[] = [];
  mealPlans: any[] = [];
  benefits: any[] = [];
  plans: any[] = [];
  selectedHotelId: number | null = null;
  selectedRoomId: number | null = null;
  editingId: number | null = null;
  loading = false;
  saving = false;
  error = '';
  roomImages: RoomImageUpload[] = [];
  imageMessage = '';
  private pendingRoomId: number | null = null;
  readonly maxImages = 5;
  readonly form = this.createForm();

  constructor(private readonly api: ApiService, private readonly cdr: ChangeDetectorRef, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const requestedHotelId = this.number(this.route.snapshot.queryParamMap.get('hotelId'));
    this.pendingRoomId = this.number(this.route.snapshot.queryParamMap.get('roomId'));
    forkJoin({ hotels: this.api.get('Hotels?page=1&pageSize=500').pipe(catchError(() => of(null))), currencies: this.api.get('Currencies').pipe(catchError(() => of(null))), mealPlans: this.api.get('MealPlans/Active').pipe(catchError(() => of(null))), benefits: this.api.get('HotelAmenities?kind=3&isActive=true').pipe(catchError(() => of(null))) })
      .pipe(finalize(() => this.cdr.markForCheck()))
      .subscribe(result => {
        this.hotels = this.rows(result.hotels);
        this.currencies = this.rows(result.currencies);
        this.mealPlans = this.rows(result.mealPlans);
        this.benefits = this.rows(result.benefits);
        if (!this.currencies.length) this.currencies = [{ name: 'USD', sign: '$' }];
        if (requestedHotelId) this.onHotelChange(requestedHotelId);
      });
  }

  get rates(): FormArray<FormGroup> { return this.form.get('rates') as FormArray<FormGroup>; }

  onHotelChange(value: unknown): void {
    this.selectedHotelId = this.number(value);
    this.selectedRoomId = null;
    this.rooms = [];
    this.plans = [];
    this.reset();
    if (!this.selectedHotelId) return;
    this.loading = true;
    this.api.get(`HotelRooms/ByHotel/${this.selectedHotelId}`).pipe(catchError(() => of(null)), finalize(() => { this.loading = false; this.cdr.markForCheck(); }))
      .subscribe(response => {
        this.rooms = this.rows(response);
        if (this.pendingRoomId && this.rooms.some(room => Number(room.id) === this.pendingRoomId)) {
          const roomId = this.pendingRoomId;
          this.pendingRoomId = null;
          this.onRoomChange(roomId);
        }
      });
  }

  onRoomChange(value: unknown): void {
    this.selectedRoomId = this.number(value);
    this.plans = [];
    this.reset();
    if (!this.selectedRoomId) return;
    this.roomImages = ((this.rooms.find(room => Number(room.id) === this.selectedRoomId)?.images ?? []) as any[]).slice(0, this.maxImages).map((image: any) => ({ id: image.id, url: image.imageUrl ?? image.url, altEng: image.altTextEng ?? image.altEng ?? '', altAr: image.altTextAr ?? image.altAr ?? '', existing: true }));
    this.loading = true;
    this.api.get(`HotelRatePlans/Rooms/${this.selectedRoomId}`).pipe(catchError(() => of(null)), finalize(() => { this.loading = false; this.cdr.markForCheck(); }))
      .subscribe(response => this.plans = this.rows(response));
  }

  addPeriod(value?: any): void {
    this.rates.push(new FormGroup({
      startDate: new FormControl(value?.startDate ?? '', { nonNullable: true, validators: [Validators.required] }),
      endDate: new FormControl(value?.endDate ?? '', { nonNullable: true, validators: [Validators.required] }),
      nightlyRate: new FormControl(Number(value?.nightlyRate ?? 0), { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
      isActive: new FormControl(value?.isActive !== false, { nonNullable: true }),
    }));
  }

  removePeriod(index: number): void { this.rates.removeAt(index); }

  async onRoomImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement; const files = Array.from(input.files ?? []); input.value = ''; this.imageMessage = '';
    if (this.roomImages.length + files.length > this.maxImages) { this.imageMessage = 'hotelImageLimit'; return; }
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { this.imageMessage = file.size > 5 * 1024 * 1024 ? 'imageTooLarge' : 'invalidImageType'; continue; }
      try { const normalized = await normalizeImageUpload(file, { maxWidth: 2400, maxHeight: 1600 }); this.roomImages.push({ file: normalized, url: URL.createObjectURL(normalized), altEng: '', altAr: '', existing: false }); }
      catch (error) { this.imageMessage = error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError'; }
    }
    this.cdr.markForCheck();
  }

  uploadRoomImages(): void {
    if (!this.selectedRoomId) return;
    const images = this.roomImages.filter(image => image.file);
    if (!images.length) return;
    if (images.some(image => !image.altEng.trim() || !image.altAr.trim())) { this.imageMessage = 'imageAltRequired'; return; }
    const form = new FormData(); images.forEach((image, index) => { form.append(`Images[${index}].Image`, image.file!, image.file!.name); form.append(`Images[${index}].AltEng`, image.altEng.trim()); form.append(`Images[${index}].AltAr`, image.altAr.trim()); });
    this.api.post(`HotelRooms/${this.selectedRoomId}/Images`, form).pipe(catchError(() => of(null))).subscribe((response: any) => { if (!response?.isSuccess) { this.imageMessage = response?.message || 'hotelImageSaveError'; this.cdr.markForCheck(); return; } this.onHotelChange(this.selectedHotelId); });
  }
  removeRoomImage(index: number): void { const image = this.roomImages[index]; if (!image) return; if (image.existing && image.id && this.selectedRoomId) { this.api.deleteRequest(`HotelRooms/${this.selectedRoomId}/Images/${image.id}`).pipe(catchError(() => of(null))).subscribe((response: any) => { if (!response?.isSuccess) { this.imageMessage = 'imageDeleteError'; this.cdr.markForCheck(); return; } this.roomImages.splice(index, 1); this.cdr.markForCheck(); }); return; } const [removed] = this.roomImages.splice(index, 1); if (removed?.file) URL.revokeObjectURL(removed.url); }
  roomImageUrl(url: string): string { return !url || /^(blob:|data:|https?:\/\/)/i.test(url) ? url : `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/?(?:images\/)?/i, '')}`; }

  edit(plan: any): void {
    this.editingId = Number(plan.id);
    this.rates.clear();
    (plan.rates ?? []).forEach((rate: any) => this.addPeriod(rate));
    this.form.patchValue({
      nameEng: plan.nameEng ?? '', nameAr: plan.nameAr ?? '', mealPlan: Number(plan.mealPlan ?? 0), mealPlanId: Number(plan.mealPlanId ?? 0), benefitIds: (plan.benefits ?? []).map((benefit: any) => Number(benefit.id)),
      currencyCode: plan.currencyCode ?? this.currencyName(this.currencies[0]), baseNightlyRate: Number(plan.baseNightlyRate ?? 0),
      extraAdultCharge: Number(plan.extraAdultCharge ?? 0), extraChildCharge: Number(plan.extraChildCharge ?? 0),
      taxRate: Number(plan.taxRate ?? 0), serviceFee: Number(plan.serviceFee ?? 0), minimumStay: Number(plan.minimumStay ?? 1),
      maximumStay: plan.maximumStay ?? null, isRefundable: plan.isRefundable === true, isActive: plan.isActive !== false,
      cancellationPolicyEng: plan.cancellationPolicyEng ?? '', cancellationPolicyAr: plan.cancellationPolicyAr ?? '',
    });
  }

  reset(): void {
    this.editingId = null;
    this.form.reset({ nameEng: '', nameAr: '', mealPlan: 0, mealPlanId: 0, benefitIds: [], currencyCode: this.currencyName(this.currencies[0]) || 'USD', baseNightlyRate: 0, extraAdultCharge: 0, extraChildCharge: 0, taxRate: 0, serviceFee: 0, minimumStay: 1, maximumStay: null, isRefundable: false, isActive: true, cancellationPolicyEng: '', cancellationPolicyAr: '' });
    this.rates.clear();
  }

  save(): void {
    if (!this.selectedRoomId) { this.error = 'selectRoomTypeFirst'; return; }
    if (this.form.invalid || !this.validatePeriods()) { this.form.markAllAsTouched(); return; }
    const raw = this.form.getRawValue();
    const payload = { ...raw, id: this.editingId ?? 0, hotelRoomId: this.selectedRoomId, mealPlanId: Number(raw.mealPlanId), benefits: (raw.benefitIds as number[]).map(id => ({ id: Number(id) })), maximumStay: raw.maximumStay ? Number(raw.maximumStay) : null, rates: this.rates.getRawValue().map((rate: any) => ({ ...rate, nightlyRate: Number(rate.nightlyRate) })) };
    this.saving = true;
    this.error = '';
    const request = this.editingId ? this.api.put(`HotelRatePlans/${this.editingId}`, payload) : this.api.post('HotelRatePlans', payload);
    request.pipe(catchError(() => of(null)), finalize(() => { this.saving = false; this.cdr.markForCheck(); })).subscribe((response: any) => {
      if (!response?.isSuccess) { this.error = response?.message || 'pricingSaveError'; return; }
      this.onRoomChange(this.selectedRoomId);
    });
  }

  delete(plan: any): void {
    if (!confirm('Delete this rate plan?')) return;
    this.api.delete('HotelRatePlans', Number(plan.id)).pipe(catchError(() => of(null))).subscribe((response: any) => {
      if (!response?.isSuccess) { this.error = response?.message || 'pricingSaveError'; this.cdr.markForCheck(); return; }
      this.onRoomChange(this.selectedRoomId);
    });
  }

  periodEndForDisplay(value: string): string { return value ? value : ''; }
  currencyName(currency: any): string { return String(currency?.name ?? currency?.code ?? currency?.currencyCode ?? '').toUpperCase(); }
  private validatePeriods(): boolean {
    const active = (this.rates.getRawValue() as PricingPeriodValue[]).filter(rate => rate.isActive).sort((a, b) => a.startDate.localeCompare(b.startDate));
    const invalid = active.some(rate => !rate.startDate || !rate.endDate || rate.startDate >= rate.endDate) || active.some((rate, i) => i > 0 && active[i - 1].endDate > rate.startDate);
    if (invalid) this.error = 'pricingPeriodsInvalid';
    return !invalid;
  }
  private rows(response: any): any[] { const data = response?.data ?? response; return Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : Array.isArray(data?.items) ? data.items : []; }
  private number(value: unknown): number | null { const parsed = Number(value); return Number.isInteger(parsed) && parsed > 0 ? parsed : null; }
  private createForm(): FormGroup<any> {
    return new FormGroup({
      nameEng: new FormControl('', { nonNullable: true, validators: [Validators.required] }), nameAr: new FormControl('', { nonNullable: true, validators: [Validators.required] }), mealPlan: new FormControl(0, { nonNullable: true }), mealPlanId: new FormControl(0, { nonNullable: true, validators: [Validators.min(1)] }), benefitIds: new FormControl<number[]>([], { nonNullable: true }), currencyCode: new FormControl('USD', { nonNullable: true, validators: [Validators.required] }), baseNightlyRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }), extraAdultCharge: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }), extraChildCharge: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }), taxRate: new FormControl(0, { nonNullable: true, validators: [Validators.min(0), Validators.max(100)] }), serviceFee: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }), minimumStay: new FormControl(1, { nonNullable: true, validators: [Validators.min(1)] }), maximumStay: new FormControl<number | null>(null), isRefundable: new FormControl(false, { nonNullable: true }), isActive: new FormControl(true, { nonNullable: true }), cancellationPolicyEng: new FormControl('', { nonNullable: true }), cancellationPolicyAr: new FormControl('', { nonNullable: true }), rates: new FormArray<FormGroup>([]),
    });
  }
}
