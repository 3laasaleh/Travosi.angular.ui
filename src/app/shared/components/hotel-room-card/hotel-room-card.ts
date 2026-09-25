import { CurrencyService } from './../../../core/services/currency.service';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { mdiIconClass } from '../../utils/mdi-icon.util';
import { readRoomChildrenPolicies } from '../../utils/hotel-room-children-policies.util';

@Component({
  selector: 'app-hotel-room-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hotel-room-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomCard {
  readonly iconClass = mdiIconClass;
  @Input() room: any;
  @Input() availability: any | null = null;
  @Input() isArabic = false;
  @Input() editable = false;
  @Output() editRequested = new EventEmitter<any>();
  _currencyService=inject(CurrencyService);

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

  roomDescription(room: any): string {
    return this.localized(room?.descriptionEng ?? room?.description, room?.descriptionAr);
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

  childrenPolicyItems(room: any): string[] {
    return readRoomChildrenPolicies(room?.childrenPolicies)
      .map(policy => this.localized(policy.valueEng, policy.valueAr)).filter(Boolean);
  }

  private localized(english: unknown, arabic: unknown, fallback = ''): string {
    const value = this.isArabic ? arabic || english || fallback : english || arabic || fallback;
    return typeof value === 'string' ? value : fallback;
  }

}
