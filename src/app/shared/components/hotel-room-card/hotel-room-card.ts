import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-hotel-room-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hotel-room-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomCard {
  private readonly bathroomKeys: Record<string, string> = {
    'Free toiletries': 'freeToiletries',
    Bidet: 'bidet',
    Toilet: 'toilet',
    'Bath or shower': 'bathOrShower',
    Towels: 'towels',
    Slippers: 'slippers',
    Hairdryer: 'hairdryer',
    'Toilet paper': 'toiletPaper',
  };
  @Input() room: any;
  @Input() availability: any | null = null;
  @Input() isArabic = false;
  @Input() editable = false;
  @Output() editRequested = new EventEmitter<any>();

  image(room: any): string | null {
    const url = room?.images?.find((image: any) => image.isMain)?.imageUrl
      ?? room?.images?.[0]?.imageUrl
      ?? null;
    if (!url || /^(blob:|data:|https?:\/\/)/i.test(url)) return url;
    return `${environment.imageUrl.replace(/\/+$/, '')}/${url.replace(/^\/?(?:images\/)?/i, '')}`;
  }

  roomName(room: any): string {
    return this.localized(room?.nameEng ?? room?.name, room?.nameAr);
  }

  bedTypeName(room: any): string {
    return this.localized(room?.bedTypeEng ?? room?.bedType, room?.bedTypeAr, room?.roomTypeName ?? '');
  }

  amenityName(amenity: any): string {
    return this.localized(amenity?.nameEng ?? amenity?.name, amenity?.nameAr);
  }

  ratePlanName(room: any, ratePlanId: number): string {
    const plan = this.ratePlan(room, ratePlanId);
    return this.localized(plan?.nameEng ?? plan?.name, plan?.nameAr, 'Rate plan');
  }

  ratePlan(room: any, ratePlanId: number): any | null {
    return room?.ratePlans?.find((item: any) => Number(item.id) === Number(ratePlanId)) ?? null;
  }

  mealPlanName(plan: any): string {
    return this.localized(plan?.mealPlanDetails?.nameEng, plan?.mealPlanDetails?.nameAr, '');
  }

  bathroomItems(room: any): string[] {
    return this.semicolonItems(room?.bathroom);
  }

  childrenPolicyItems(room: any): string[] {
    return this.semicolonItems(room?.childrenPolicies);
  }

  bathroomLabel(item: string): string {
    return this.bathroomKeys[item] ?? item;
  }

  viewLabel(view: unknown): string {
    const keys: Record<string, string> = { 'Pool view': 'poolView', 'Beach view': 'beachView', 'Garden view': 'gardenView' };
    const value = typeof view === 'string' ? view : '';
    return keys[value] ?? value;
  }

  private localized(english: unknown, arabic: unknown, fallback = ''): string {
    const value = this.isArabic ? arabic || english || fallback : english || arabic || fallback;
    return typeof value === 'string' ? value : fallback;
  }

  private semicolonItems(value: unknown): string[] {
    return typeof value === 'string'
      ? value.split(';').map((item) => item.trim()).filter(Boolean)
      : [];
  }
}
