import { CurrencyService } from './../../../core/services/currency.service';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { mdiIconClass } from '../../utils/mdi-icon.util';
import { formatHomePrice } from '../../../features/home/home-price.util';

@Component({
  selector: 'app-hotel-room-card',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './hotel-room-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelRoomCard {
  readonly iconClass = mdiIconClass;
  @Input() room: any;
  @Input() availability: any | null = null;
  @Input() editable = false;
  @Input() hotelRouteName = '';
  @Input() isArabic = false;
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
    return room?.name || room?.nameEng || room?.nameAr || '';
  }

  roomDescription(room: any): string {
    return room?.description;
  }

  bedTypeName(room: any): string {
    return room?.bedType;
  }

  amenityName(amenity: any): string {
    return amenity?.name;
  }

  ratePlanName(room: any, ratePlanId: number): string {
    const plan = this.ratePlan(room, ratePlanId);
    return plan?.name;
  }

  ratePlan(room: any, ratePlanId: number): any | null {
    return room?.ratePlans?.find((item: any) => Number(item.id) === Number(ratePlanId)) ?? null;
  }

  mealPlanName(plan: any): string {
    return plan?.mealPlanDetails?.name;
  }

  currentPeriod(room: any): any | null {
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return (room?.roomPeriodPrices ?? [])
      .filter((period: any) => period?.isActive !== false && period?.startDate <= date && period?.endDate >= date)
      .sort((left: any, right: any) => String(right.startDate).localeCompare(String(left.startDate)))[0] ?? null;
  }

  displayedQuote(availability: any): any | null {
    return availability?.ratePlans?.[0] ?? null;
  }

  formatPrice(value: unknown, source: any = { currencyCode: 'USD' }): string {
    return formatHomePrice(this._currencyService, value, source);
  }

  childrenPolicyItems(room: any): string[] {
    return (Array.isArray(room?.childrenPolicies) ? room.childrenPolicies : [])
      .map((policy: any) => typeof policy === 'string'
        ? policy
        : policy?.value || policy?.valueEng || policy?.valueAr || '')
      .map((policy: string) => policy.trim())
      .filter(Boolean);
  }

  get roomDetailsLink(): string[] | null {
    const roomRouteName = this.roomRouteName(this.room);
    if (!this.hotelRouteName || !roomRouteName) return null;
    return [this.isArabic ? '/ar/hotels' : '/en/hotels', this.hotelRouteName, 'rooms', roomRouteName];
  }

  private roomRouteName(room: any): string {
    const storedRouteName = String(room?.routeName ?? '').trim();
    if (storedRouteName) return storedRouteName;
    return String(room?.nameEng ?? room?.name ?? '')
      .trim()
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

}
