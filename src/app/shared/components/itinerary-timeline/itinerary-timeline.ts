import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

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
    return Array.isArray(this.items) ? this.items : [];
  }

  children(item: any): any[] {
    const children = item?.childs ?? item?.Childs ?? item?.children ?? item?.childItineraries;
    return Array.isArray(children) ? children : [];
  }

  dayNumber(item: any, fallback: number): number {
    const value = Number(item?.dayNumber ?? item?.DayNumber);
    return Number.isInteger(value) && value > 0 ? value : fallback;
  }

  title(item: any): string {
    return String(item?.title ?? item?.Title ?? '');
  }

  value(item: any): string {
    return String(item?.value ?? item?.Value ?? '');
  }

  description(item: any): string {
    return String(item?.description ?? item?.Description ?? '');
  }

  time(item: any): string {
    const start = this.formatTime(item?.startTime ?? item?.StartTime);
    const end = this.formatTime(item?.endTime ?? item?.EndTime);
    if (start && end) return `${start} - ${end}`;
    return start || end;
  }

  private formatTime(value: unknown): string {
    if (typeof value !== 'string') return '';
    const match = value.match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : '';
  }
}
