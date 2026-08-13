import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';
import { AdminService } from '../../admin.service';

interface BlogImageUpload { id?: number; file?: File; url: string; existing: boolean; }

@Component({ selector: 'app-blogs-form-card', standalone: true, imports: [ReactiveFormsModule, DatePicker], templateUrl: './blogs-form-card.html', changeDetection: ChangeDetectionStrategy.OnPush })
export class BlogsFormCard implements OnChanges, OnDestroy {
  @Input() selectedBlog: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  readonly maxImages = 5;
  form = new FormGroup({
    titleEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    titleAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    summaryEng: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(500)] }),
    summaryAr: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(500)] }),
    contentEng: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(15000)] }),
    contentAr: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(15000)] }),
    publishedAt: new FormControl('', { nonNullable: true }),
  });
  images: BlogImageUpload[] = [];
  isSaving = false;
  errorMessage = '';

  constructor(private readonly adminService: AdminService, private readonly cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void { if (changes['selectedBlog']) this.populate(); }
  ngOnDestroy(): void { this.images.filter(image => image.file).forEach(image => URL.revokeObjectURL(image.url)); }

  populate(): void {
    this.images.filter(image => image.file).forEach(image => URL.revokeObjectURL(image.url));
    const blog = this.selectedBlog;
    this.images = (blog?.images ?? []).map((image: any) => ({ id: image.id, existing: true, url: this.resolveImage(image.imageUrl ?? image.url) }));
    this.form.reset({ titleEng: blog?.titleEng ?? '', titleAr: blog?.titleAr ?? '', summaryEng: blog?.summaryEng ?? '', summaryAr: blog?.summaryAr ?? '', contentEng: blog?.contentEng ?? '', contentAr: blog?.contentAr ?? '', publishedAt: this.dateInput(blog?.publishedAt) });
  }

  onFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []); input.value = '';
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (this.images.length + files.length > this.maxImages) { this.errorMessage = `A blog can contain at most ${this.maxImages} images.`; return; }
    const invalid = files.find(file => !allowed.includes(file.type) || file.size > 5 * 1024 * 1024);
    if (invalid) { this.errorMessage = 'Images must be JPEG, PNG, or WebP and no larger than 5 MB.'; return; }
    this.errorMessage = '';
    files.forEach(file => this.images.push({ file, url: URL.createObjectURL(file), existing: false }));
    this.cdr.markForCheck();
  }

  removeImage(index: number): void {
    const image = this.images[index]; if (!image) return;
    if (image.existing && image.id) {
      this.adminService.deleteBlogImage(image.id).pipe(catchError(() => of(null))).subscribe(response => {
        if (response?.isSuccess !== false && response) this.removeLocal(index);
      }); return;
    }
    this.removeLocal(index);
  }

  save(): void {
    if (this.isSaving) return;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue(); const data = new FormData();
    if (this.selectedBlog?.id) data.append('Id', String(this.selectedBlog.id));
    data.append('TitleEng', value.titleEng.trim()); data.append('TitleAr', value.titleAr.trim()); data.append('SummaryEng', value.summaryEng.trim()); data.append('SummaryAr', value.summaryAr.trim()); data.append('ContentEng', value.contentEng.trim()); data.append('ContentAr', value.contentAr.trim());
    if (value.publishedAt) data.append('PublishedAt', `${value.publishedAt}T00:00:00.000Z`);
    this.images.filter(image => image.file).forEach(image => data.append('Images', image.file!, image.file!.name));
    this.isSaving = true; this.errorMessage = '';
    (this.selectedBlog ? this.adminService.updateBlog(data) : this.adminService.createBlog(data)).pipe(
      catchError(() => { this.errorMessage = 'Unable to save this blog.'; return of(null); }),
      finalize(() => { this.isSaving = false; this.cdr.markForCheck(); }),
    ).subscribe(response => { if (response?.isSuccess === false) { this.errorMessage = response.message || 'Unable to save this blog.'; return; } if (response) this.saved.emit(); });
  }

  private removeLocal(index: number): void { const [image] = this.images.splice(index, 1); if (image?.file) URL.revokeObjectURL(image.url); this.cdr.markForCheck(); }
  private resolveImage(url: string): string { return /^(https?:|data:|blob:)/i.test(url ?? '') ? url : `${environment.imageUrl}${String(url ?? '').replace(/^\/+/, '')}`; }
  private dateInput(value: unknown): string { if (!value) return ''; const date = new Date(String(value)); return Number.isNaN(date.valueOf()) ? '' : date.toISOString().slice(0, 10); }
}
