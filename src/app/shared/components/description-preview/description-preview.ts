import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DescriptionLinks, parseDescriptionLinks } from '../description-links/description-links';

@Component({
  selector: 'app-description-preview',
  standalone: true,
  imports: [DescriptionLinks, TranslatePipe],
  templateUrl: './description-preview.html',
  styles: [':host { display: inline; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionPreview implements OnChanges {
  @Input() text: string | null | undefined = '';
  @Input() limit = 300;
  @Input() hideShowMoreBtn = false;

  expanded = false;
  normalizedText = '';
  previewText = '';
  hasMore = false;

  ngOnChanges(): void {
    this.expanded = false;
    const parts = parseDescriptionLinks(this.text);
    this.normalizedText = parts.map((part) => part.text).join('');
    const limit = Math.max(1, Number(this.limit) || 300);
    this.hasMore = this.normalizedText.length > limit;
    this.previewText = this.hasMore
      ? `${this.normalizedText.slice(0, Math.max(0, limit - 1)).trimEnd()}…`
      : this.normalizedText;
  }

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
