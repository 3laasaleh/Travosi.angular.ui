import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-blogs-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './blogs-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogsList implements OnInit, OnChanges {
  @Input() refreshToken = 0;
  @Output() editRequested = new EventEmitter<any>();
  blogs: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private readonly adminService: AdminService, private readonly cdr: ChangeDetectorRef) {}
  ngOnInit(): void { this.load(); }
  ngOnChanges(changes: SimpleChanges): void { if (changes['refreshToken'] && !changes['refreshToken'].firstChange) this.load(); }

  load(): void {
    this.isLoading = true; this.errorMessage = '';
    this.adminService.getBlogs().pipe(
      catchError(() => { this.errorMessage = 'Unable to load blogs.'; return of(null); }),
      finalize(() => { this.isLoading = false; this.cdr.markForCheck(); }),
    ).subscribe(response => {
      const page = response?.data ?? response;
      this.blogs = Array.isArray(page?.data) ? page.data : [];
    });
  }

  toggleStatus(blog: any): void {
    this.adminService.changeBlogStatus(blog.id).pipe(catchError(() => of(null))).subscribe(response => {
      if (response?.isSuccess !== false && response) { blog.isActive = !blog.isActive; this.cdr.markForCheck(); }
    });
  }

  imageUrl(blog: any): string {
    const image = blog?.images?.[0]?.imageUrl ?? blog?.images?.[0]?.url;
    return !image ? '' : (/^(https?:|data:|blob:)/i.test(image) ? image : `${environment.imageUrl}${String(image).replace(/^\/+/, '')}`);
  }
}
