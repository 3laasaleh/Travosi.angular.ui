import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { ImageUploadValidationError, normalizeImageUpload } from '../../shared/image-upload.util';
import { AdminService } from '../../admin.service';
import {
  arabicTextValidator,
  startsWithArabic,
} from '../../../../core/validators/arabic-text.validator';

interface BlogImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
  altEng?: string;
  altAr?: string;
  altEngTouched?: boolean;
  altArTouched?: boolean;
}

interface BlogHeaderDataValue {
  headerType: number;
  headerEng: string;
  headerAr: string;
  descriptionEng: string;
  descriptionAr: string;
}

@Component({
  selector: 'app-blogs-form-card',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DatePicker, TranslatePipe],
  templateUrl: './blogs-form-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsFormCard implements OnChanges, OnDestroy {
  @Input() selectedBlog: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  readonly maxImages = 5;
  readonly maxImageBytes = 5 * 1024 * 1024;
  readonly maxImageWidth = 2400;
  readonly maxImageHeight = 1600;
  readonly maxHeaderData = 5;
  readonly headerTypes = [1, 2, 3, 4, 5];
  readonly today = this.localDate(new Date());
  readonly maximumPublishDate = this.localDate(this.addYears(new Date(), 1));
  originalPublishedAt = '';

  private readonly imageConstraints = {
    maxWidth: this.maxImageWidth,
    maxHeight: this.maxImageHeight,
  };

  form = new FormGroup({
    nameEng: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern(/^[A-Za-z].*$/),
      ],
    }),
    nameAr: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200), arabicTextValidator()],
    }),
    routeName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
      ],
    }),
    summaryEng: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
    summaryAr: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500), arabicTextValidator()],
    }),
    headerData: new FormArray<FormGroup>([]),
    publishedAt: new FormControl(this.today, {
      nonNullable: true,
      validators: [
        Validators.required,
        (control: AbstractControl): ValidationErrors | null => {
          const value = String(control.value ?? '');
          if (!value) return null;
          const normalized = this.validDateInput(value);
          if (!normalized) return { invalidDate: true };
          if (normalized === this.originalPublishedAt) return null;
          if (normalized < this.today) return { minDate: true };
          return normalized > this.maximumPublishDate ? { maxDate: true } : null;
        },
      ],
    }),
  });

  images: BlogImageUpload[] = [];
  isSaving = false;
  isProcessingImages = false;
  deletingImageIndex: number | null = null;
  errorMessage = '';
  imageValidationMessage = '';
  imageAltErrorsVisible = false;
  validationSubmitted = false;

  constructor(
    private readonly adminService: AdminService,
    private readonly cdr: ChangeDetectorRef,
    private readonly translate: TranslateService,
  ) {
    this.headerData.push(this.createHeaderDataGroup());
  }

  get headerData(): FormArray<FormGroup> {
    return this.form.controls.headerData;
  }

  get dateMinimum(): string {
    return this.originalPublishedAt && this.originalPublishedAt < this.today
      ? this.originalPublishedAt
      : this.today;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBlog']) this.populate();
  }

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  populate(): void {
    this.revokeNewImageUrls();
    this.imageValidationMessage = '';
    this.imageAltErrorsVisible = false;
    this.errorMessage = '';
    this.validationSubmitted = false;

    const blog = this.selectedBlog;
    const originalDate = this.dateInput(blog?.publishedAt ?? blog?.PublishedAt);
    this.originalPublishedAt = blog ? originalDate : '';
    const storedImages = blog?.images ?? blog?.Images ?? [];
    this.images = (Array.isArray(storedImages) ? storedImages : [])
      .slice(0, this.maxImages)
      .map((image: any) => ({
        id: image?.id ?? image?.Id,
        existing: true,
        url: image?.imageUrl ?? image?.ImageUrl,
        name: image?.imageName ?? image?.ImageName ?? '',
        altEng: image?.altEng ?? image?.AltEng ?? '',
        altAr: image?.altAr ?? image?.AltAr ?? '',
        altEngTouched: false,
        altArTouched: false,
      }))
      .filter((image: BlogImageUpload) => !!image.url);
    this.form.reset({
      nameEng: blog?.nameEng ?? blog?.nameEng,
      nameAr: blog?.nameAr ?? blog?.nameAr,
      routeName: blog?.routeName ?? blog?.RouteName,
      summaryEng: blog?.summaryEng ?? blog?.SummaryEng,
      summaryAr: blog?.summaryAr ?? blog?.SummaryAr,
      publishedAt: originalDate || (blog ? '' : this.today),
    });
    this.setHeaderData(
      blog?.headerData ?? blog?.HeaderData,
      blog?.contentEng ?? blog?.ContentEng,
      blog?.contentAr ?? blog?.ContentAr,
      blog,
    );
    this.cdr.markForCheck();
  }

  async onFiles(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.imageValidationMessage = '';
    this.imageAltErrorsVisible = false;

    if (
      this.isSaving ||
      this.isProcessingImages ||
      this.deletingImageIndex !== null ||
      files.length === 0
    )
      return;

    if (this.images.length + files.length > this.maxImages) {
      this.imageValidationMessage = 'blogImageLimit';
      this.cdr.markForCheck();
      return;
    }

    this.isProcessingImages = true;
    this.cdr.markForCheck();
    try {
      for (const file of files) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          this.imageValidationMessage = 'invalidImageType';
          continue;
        }

        if (file.size > this.maxImageBytes) {
          this.imageValidationMessage = 'imageTooLarge';
          continue;
        }

        try {
          const normalized = await normalizeImageUpload(file, this.imageConstraints);
          this.images.push({
            file: normalized,
            url: URL.createObjectURL(normalized),
            name: normalized.name,
            existing: false,
            altEng: '',
            altAr: '',
            altEngTouched: false,
            altArTouched: false,
          });
        } catch (error) {
          this.imageValidationMessage =
            error instanceof ImageUploadValidationError ? error.translationKey : 'imageReadError';
        }
      }
    } finally {
      this.isProcessingImages = false;
      this.cdr.markForCheck();
    }
  }

  async removeImage(index: number): Promise<void> {
    if (this.deletingImageIndex !== null || this.isSaving || this.isProcessingImages) return;

    const image = this.images[index];
    if (!image) return;

    const confirmation = await Swal.fire({
      title: this.translate.instant('confirmImageDelete'),
      text: this.translate.instant('imageDeleteWarning'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText: this.translate.instant('cancel'),
      confirmButtonColor: '#e11d48',
      reverseButtons: true,
    });
    if (!confirmation.isConfirmed) return;

    if (image.existing && image.id) {
      this.deletingImageIndex = index;
      this.adminService
        .deleteBlogImage(image.id)
        .pipe(
          catchError(() => {
            Swal.fire({ icon: 'error', title: this.translate.instant('imageDeleteError') });
            return of({ imageDeleteFailed: true });
          }),
          finalize(() => {
            this.deletingImageIndex = null;
            this.cdr.markForCheck();
          }),
        )
        .subscribe((response: any) => {
          if (
            !response ||
            response?.imageDeleteFailed ||
            response?.isSuccess === false ||
            response?.IsSuccess === false
          ) {
            if (!response?.imageDeleteFailed) {
              Swal.fire({
                icon: 'error',
                title:
                  response?.message ??
                  response?.Message ??
                  this.translate.instant('imageDeleteError'),
              });
            }
            return;
          }

          this.removeLocal(index);
          this.showImageDeletedToast();
        });
      return;
    }

    this.removeLocal(index);
    this.showImageDeletedToast();
  }

  save(): void {
    if (this.isSaving || this.isProcessingImages || this.deletingImageIndex !== null) return;
    this.validationSubmitted = true;
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }

    const value = this.form.getRawValue();
    this.imageAltErrorsVisible = true;
    if (this.images.some((image) => image.file && this.hasInvalidImageAlt(image))) {
      this.images.filter((image) => image.file).forEach((image) => {
        image.altEngTouched = true;
        image.altArTouched = true;
      });
      this.errorMessage = 'imageAltRequired';
      this.cdr.markForCheck();
      return;
    }
    const data = new FormData();
    const blogId = this.selectedBlog?.id ?? this.selectedBlog?.Id;
    if (blogId) data.append('Id', String(blogId));

    data.append('nameEng', value.nameEng.trim());
    data.append('nameAr', value.nameAr.trim());
    data.append('RouteName', value.routeName.trim().toLowerCase());
    data.append('SummaryEng', value.summaryEng.trim());
    data.append('SummaryAr', value.summaryAr.trim());
    const headerData = this.headerData.getRawValue() as BlogHeaderDataValue[];
    headerData.forEach((section, index) => {
      data.append(`HeaderData[${index}].HeaderType`, String(section.headerType));
      data.append(`HeaderData[${index}].HeaderEng`, section.headerEng.trim());
      data.append(`HeaderData[${index}].HeaderAr`, section.headerAr.trim());
      data.append(`HeaderData[${index}].DescriptionEng`, section.descriptionEng.trim());
      data.append(`HeaderData[${index}].DescriptionAr`, section.descriptionAr.trim());
    });
    if (value.publishedAt) data.append('PublishedAt', `${value.publishedAt}T00:00:00.000Z`);
    this.images
      .filter((image) => image.file)
      .forEach((image, index) => {
        data.append(`Images[${index}].Image`, image.file!, image.file!.name);
        data.append(`Images[${index}].AltEng`, image.altEng!.trim());
        data.append(`Images[${index}].AltAr`, image.altAr!.trim());
      });

    this.isSaving = true;
    this.errorMessage = '';
    (this.selectedBlog ? this.adminService.updateBlog(data) : this.adminService.createBlog(data))
      .pipe(
        catchError(() => {
          this.errorMessage = 'Unable to save this blog.';
          return of(null);
        }),
        finalize(() => {
          this.isSaving = false;
          this.cdr.markForCheck();
        }),
      )
      .subscribe((response: any) => {
        if (response?.isSuccess === false || response?.IsSuccess === false) {
          this.form.markAllAsTouched();
          const errors = response?.errors ?? response?.Errors;
          this.errorMessage = Array.isArray(errors) && errors.length
            ? errors.join(' ')
            : response?.message ?? response?.Message ?? 'Unable to save this blog.';
          return;
        }
        if (response) this.saved.emit();
      });
  }

  addContentSection(): void {
    if (this.headerData.length >= this.maxHeaderData) return;
    this.headerData.push(this.createHeaderDataGroup());
    this.headerData.markAsDirty();
  }

  removeContentSection(index: number): void {
    if (this.headerData.length <= 1) return;
    this.headerData.removeAt(index);
    this.headerData.markAsDirty();
  }

  getImageUrl(url: string): string {
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;

    const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  hasInvalidImageAlt(image: BlogImageUpload): boolean {
    return !image.altEng?.trim() || !image.altAr?.trim() || !startsWithArabic(image.altAr);
  }

  hasInvalidArabicAlt(image: BlogImageUpload): boolean {
    return !!image.altAr?.trim() && !startsWithArabic(image.altAr);
  }

  showImageAltError(image: BlogImageUpload, language: 'eng' | 'ar'): boolean {
    return this.validationSubmitted
      || this.imageAltErrorsVisible
      || (language === 'eng' ? image.altEngTouched === true : image.altArTouched === true);
  }

  private createHeaderDataGroup(value: any = {}): FormGroup {
    return new FormGroup({
      headerType: new FormControl(Number(value.headerType ?? value.HeaderType) || 2, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.max(5)],
      }),
      headerEng: new FormControl(String(value.headerEng ?? ''), {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(200),
          Validators.pattern(/^[A-Za-z].*$/),
        ],
      }),
      headerAr: new FormControl(String(value.headerAr ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200), arabicTextValidator()],
      }),
      descriptionEng: new FormControl(String(value.descriptionEng ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(4000)],
      }),
      descriptionAr: new FormControl(String(value.descriptionAr ?? ''), {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(4000), arabicTextValidator()],
      }),
    });
  }

  private setHeaderData(headerData: any[], contentEng: string, contentAr: string, blog: any): void {
    this.headerData.clear();
    const sections = Array.isArray(headerData) ? headerData.slice(0, this.maxHeaderData) : [];
    if (sections.length > 0) {
      sections.forEach((section) =>
        this.headerData.push(
          this.createHeaderDataGroup({
            headerType: section?.headerType ?? section?.HeaderType,
            headerEng: section?.headerEng ?? section?.HeaderEng,
            headerAr: section?.headerAr ?? section?.HeaderAr,
            descriptionEng: section?.descriptionEng ?? section?.DescriptionEng,
            descriptionAr: section?.descriptionAr ?? section?.DescriptionAr,
          }),
        ),
      );
      return;
    }

    const english = this.parseLegacyContentSections(contentEng);
    const arabic = this.parseLegacyContentSections(contentAr);
    const legacyCount = Math.min(this.maxHeaderData, Math.max(english.length, arabic.length));
    if (legacyCount > 0) {
      for (let index = 0; index < legacyCount; index++) {
        this.headerData.push(
          this.createHeaderDataGroup({
            headerType: english[index]?.headerType ?? arabic[index]?.headerType ?? 2,
            headerEng: english[index]?.header ?? '',
            descriptionEng: english[index]?.description ?? '',
            headerAr: arabic[index]?.header ?? '',
            descriptionAr: arabic[index]?.description ?? '',
          }),
        );
      }
      return;
    }

    this.headerData.push(
      this.createHeaderDataGroup({
        headerType: 2,
        headerEng: contentEng ? (blog?.nameEng ?? blog?.nameEng ?? '') : '',
        descriptionEng: contentEng,
        headerAr: contentAr ? (blog?.nameAr ?? blog?.nameAr ?? '') : '',
        descriptionAr: contentAr,
      }),
    );
  }

  private parseLegacyContentSections(
    content: string,
  ): Array<{ headerType: number; header: string; description: string }> {
    if (!content?.trim()) return [];
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed)
        ? parsed
            .filter((item) => item && typeof item === 'object')
            .map((item) => ({
              headerType: Number(item.headerType) || 2,
              header: String(item.header ?? ''),
              description: String(item.description ?? ''),
            }))
        : [];
    } catch {
      return [];
    }
  }

  private removeLocal(index: number): void {
    const [image] = this.images.splice(index, 1);
    if (image?.file) URL.revokeObjectURL(image.url);
    this.imageValidationMessage = '';
    this.cdr.markForCheck();
  }

  private showImageDeletedToast(): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      iconColor: '#00d492',
      title: this.translate.instant('imageDeleted'),
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,
    });
  }

  private revokeNewImageUrls(): void {
    this.images.filter((image) => image.file).forEach((image) => URL.revokeObjectURL(image.url));
  }

  private dateInput(value: unknown): string {
    if (!value) return '';
    const text = String(value);
    const normalized = this.validDateInput(text);
    if (normalized) return normalized;
    const date = new Date(text);
    return Number.isNaN(date.valueOf()) ? '' : this.localDate(date);
  }

  private validDateInput(value: string): string | null {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
      ? `${match[1]}-${match[2]}-${match[3]}`
      : null;
  }

  private addYears(value: Date, years: number): Date {
    const date = new Date(value.getTime());
    date.setFullYear(date.getFullYear() + years);
    return date;
  }

  private localDate(date: Date): string {
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }
}
