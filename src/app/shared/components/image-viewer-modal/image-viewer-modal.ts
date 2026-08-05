import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-image-viewer-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './image-viewer-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageViewerModal implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private previousBodyOverflow = '';

  @Input() images: string[] = [];
  @Input() title = '';
  @Input() selectedIndex = 0;
  @Output() readonly selectedIndexChange = new EventEmitter<number>();
  @Output() readonly closed = new EventEmitter<void>();

  get currentImage(): string {
    return this.images[this.selectedIndex] ?? this.images[0] ?? '';
  }

  ngOnInit(): void {
    this.previousBodyOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = this.previousBodyOverflow;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previousImage();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextImage();
    }
  }

  selectImage(index: number): void {
    if (index < 0 || index >= this.images.length) return;
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }

  previousImage(): void {
    const imageCount = this.images.length;
    if (imageCount < 2) return;
    this.selectImage((this.selectedIndex - 1 + imageCount) % imageCount);
  }

  nextImage(): void {
    const imageCount = this.images.length;
    if (imageCount < 2) return;
    this.selectImage((this.selectedIndex + 1) % imageCount);
  }

  close(): void {
    this.closed.emit();
  }
}
