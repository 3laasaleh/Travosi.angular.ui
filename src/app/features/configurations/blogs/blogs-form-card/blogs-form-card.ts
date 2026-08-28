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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { catchError, finalize, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import {
  ImageUploadValidationError,
  normalizeImageUpload,
} from '../../shared/image-upload.util';
import { AdminService } from '../../admin.service';
import { arabicTextValidator } from '../../../../core/validators/arabic-text.validator';

interface BlogImageUpload {
  id?: number;
  file?: File;
  url: string;
  name: string;
  existing: boolean;
}

type BlogContentControl = 'contentEng' | 'contentAr';

@Component({
  selector: 'app-blogs-form-card',
  standalone: true,
  imports: [ReactiveFormsModule, DatePicker, TranslatePipe],
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

  private readonly imageConstraints = {
    maxWidth: this.maxImageWidth,
    maxHeight: this.maxImageHeight,
  };

  form = new FormGroup({
    titleEng: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    titleAr: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200), arabicTextValidator()],
    }),
    summaryEng: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500)],
    }),
    summaryAr: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(500), arabicTextValidator()],
    }),
    contentEng: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(15000)],
    }),
    contentAr: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(15000), arabicTextValidator()],
    }),
    publishedAt: new FormControl('', { nonNullable: true }),
  });

  images: BlogImageUpload[] = [];
  isSaving = false;
  isProcessingImages = false;
  deletingImageIndex: number | null = null;
  errorMessage = '';
  imageValidationMessage = '';

  constructor(
    private readonly adminService: AdminService,
    private readonly cdr: ChangeDetectorRef,
    private readonly translate: TranslateService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBlog']) this.populate();
  }

  ngOnDestroy(): void {
    this.revokeNewImageUrls();
  }

  populate(): void {
    this.revokeNewImageUrls();
    this.imageValidationMessage = '';
    this.errorMessage = '';

    const blog = this.selectedBlog;
    const storedImages = blog?.images ?? blog?.Images ?? [];
    this.images = (Array.isArray(storedImages) ? storedImages : [])
      .slice(0, this.maxImages)
      .map((image: any, index: number) => ({
        id: image?.id ?? image?.Id,
        existing: true,
        url: image?.imageUrl ?? image?.ImageUrl ?? image?.url ?? image?.Url ?? '',
        name:
          image?.imageName ??
          image?.ImageName ??
          image?.name ??
          this.translate.instant('blogImageNumber', { number: index + 1 }),
      }))
      .filter((image: BlogImageUpload) => !!image.url);

    this.form.reset({
      titleEng: blog?.titleEng ?? blog?.TitleEng ?? '',
      titleAr: blog?.titleAr ?? blog?.TitleAr ?? '',
      summaryEng: blog?.summaryEng ?? blog?.SummaryEng ?? '',
      summaryAr: blog?.summaryAr ?? blog?.SummaryAr ?? '',
      contentEng: blog?.contentEng ?? blog?.ContentEng ?? '',
      contentAr: blog?.contentAr ?? blog?.ContentAr ?? '',
      publishedAt: this.dateInput(blog?.publishedAt ?? blog?.PublishedAt),
    });
  }

  async onFiles(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.imageValidationMessage = '';

    if (
      this.isSaving ||
      this.isProcessingImages ||
      this.deletingImageIndex !== null ||
      files.length === 0
    ) return;

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
          });
        } catch (error) {
          this.imageValidationMessage =
            error instanceof ImageUploadValidationError
              ? error.translationKey
              : 'imageReadError';
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const data = new FormData();
    const blogId = this.selectedBlog?.id ?? this.selectedBlog?.Id;
    if (blogId) data.append('Id', String(blogId));

    data.append('TitleEng', value.titleEng.trim());
    data.append('TitleAr', value.titleAr.trim());
    data.append('SummaryEng', value.summaryEng.trim());
    data.append('SummaryAr', value.summaryAr.trim());
    data.append('ContentEng', value.contentEng.trim());
    data.append('ContentAr', value.contentAr.trim());
    if (value.publishedAt) data.append('PublishedAt', `${value.publishedAt}T00:00:00.000Z`);
    this.images
      .filter((image) => image.file)
      .forEach((image) => data.append('Images', image.file!, image.file!.name));

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
          this.errorMessage =
            response?.message ?? response?.Message ?? 'Unable to save this blog.';
          return;
        }
        if (response) this.saved.emit();
      });
  }

  formatContent(controlName: BlogContentControl, command: 'bold' | 'italic' | 'insertUnorderedList'): void {
    const editor = this.contentEditor(controlName);
    if (!editor) return;
    editor.focus();
    document.execCommand(command);
    this.syncContentEditor(controlName, editor);
  }

  insertLink(controlName: BlogContentControl): void {
    const editor = this.contentEditor(controlName);
    if (!editor) return;

    const input = window.prompt(this.translate.instant('blogLinkPrompt'));
    if (!input) return;
    const href = this.safeLinkUrl(input);
    if (!href) {
      this.errorMessage = 'blogLinkInvalid';
      this.cdr.markForCheck();
      return;
    }

    editor.focus();
    document.execCommand('createLink', false, href);
    this.secureEditorLinks(editor);
    this.syncContentEditor(controlName, editor);
  }

  onContentInput(controlName: BlogContentControl, event: Event): void {
    const editor = event.target as HTMLElement;
    this.secureEditorLinks(editor);
    this.syncContentEditor(controlName, editor);
  }

  preventToolbarFocus(event: MouseEvent): void {
    event.preventDefault();
  }

  getImageUrl(url: string): string {
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;

    const path = url.replace(/^\/+/, '').replace(/^images\//i, '');
    return `${environment.imageUrl.replace(/\/+$/, '')}/${path}`;
  }

  private contentEditor(controlName: BlogContentControl): HTMLElement | null {
    return document.getElementById(`blog-${controlName}-editor`);
  }

  private syncContentEditor(controlName: BlogContentControl, editor: HTMLElement): void {
    const control = this.form.controls[controlName];
    control.setValue(editor.innerHTML);
    control.markAsTouched();
    control.markAsDirty();
  }

  private secureEditorLinks(editor: HTMLElement): void {
    editor.querySelectorAll('a').forEach((anchor) => {
      const href = this.safeLinkUrl(anchor.getAttribute('href') ?? '');
      if (!href) {
        anchor.replaceWith(...Array.from(anchor.childNodes));
        return;
      }
      anchor.href = href;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    });
  }

  private safeLinkUrl(value: string): string | null {
    const raw = value.trim();
    if (!raw) return null;
    if (raw.startsWith('/')) return raw;
    const withProtocol = /^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`;
    try {
      const url = new URL(withProtocol);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
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
    this.images
      .filter((image) => image.file)
      .forEach((image) => URL.revokeObjectURL(image.url));
  }

  private dateInput(value: unknown): string {
    if (!value) return '';
    const date = new Date(String(value));
    return Number.isNaN(date.valueOf()) ? '' : date.toISOString().slice(0, 10);
  }
}
