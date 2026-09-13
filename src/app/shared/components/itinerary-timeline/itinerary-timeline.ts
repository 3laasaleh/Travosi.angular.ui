import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { orderItineraryItems } from '../../utils/itinerary-order.util';

@Component({
  selector: 'app-itinerary-timeline',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './itinerary-timeline.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItineraryTimeline {
  @Input() items: any[] | null | undefined = [];

  get itinerary(): any[] {
    return orderItineraryItems(this.items);
  }

  children(item: any): any[] {
    return orderItineraryItems(item?.childs ?? item?.Childs ?? item?.children);
  }

  date(item: any): string {
    return String(item?.arrivalDate ?? '').slice(0, 10);
  }

  title(item: any): string {
    return String(item?.title ?? item?.titleEng ??  '');
  }

  value(item: any): string {
    return String(item?.value ??  '');
  }

  description(item: any): string {
    return String(item?.value ??  '');
  }

  notes(item: any): string {
    return String(item?.notes ?? '');
  }

  time(item: any): string {
    const start = this.formatTime(item?.startTime );
    const end = this.formatTime(item?.endTime );
    if (start && end) return `${start} - ${end}`;
    return start || end;
  }

  private formatTime(value: unknown): string {
    if (typeof value !== 'string') return '';
    const match = value.match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : '';
  }
}
