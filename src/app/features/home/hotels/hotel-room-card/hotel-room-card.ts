import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { CurrencyService } from '../../../../core/services/currency.service';
import { mdiIconClass } from '../../../../shared/utils/mdi-icon.util';
import { DescriptionPreview } from '../../../../shared/components/description-preview/description-preview';
import { formatHomePrice } from '../../home-price.util';


@Component({
  selector: 'app-hotel-room-card',
  standalone: true,
  imports: [DescriptionPreview, RouterLink, TranslatePipe],
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
  /** Guest selection made on the hotel search form. It is carried to the room page as read-only context. */
  @Input() bookingAdults = 1;
  @Input() bookingChildren = 0;
  @Input() bookingInfants = 0;
  @Input() bookingChildrenAges: number[] = [];
  @Input() bookingCheckIn = '';
  @Input() bookingCheckOut = '';
  @Input() bookingRoomCount = 1;
  @Output() editRequested = new EventEmitter<any>();
  _currencyService=inject(CurrencyService);
  selectedMealPlanId = 0;

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
    return room?.description || room?.descriptionEng || room?.descriptionAr || '';
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
    const prices = room?.mealPlanPrices?.length ? room.mealPlanPrices : room?.roomPeriodPrices ?? [];
    const currentPrices = (prices ?? [])
      .filter((period: any) => period?.isActive !== false && period?.startDate <= date && period?.endDate >= date)
    if (!currentPrices.length) return null;
    const availablePlanIds = currentPrices
      .map((period: any) => Number(period?.mealPlanId))
      .filter((id: number) => id > 0);
    const selectedPlanId = availablePlanIds.includes(this.selectedMealPlanId)
      ? this.selectedMealPlanId
      : Number(currentPrices[0]?.mealPlanId ?? 0);
    return currentPrices
      .filter((period: any) => !period?.mealPlanId || Number(period.mealPlanId) === selectedPlanId)
      [0] ?? currentPrices[0];
  }

  displayedQuote(availability: any): any | null {
    const plans = availability?.ratePlans ?? [];
    if (!plans.length) return null;
    const selected = this.selectedMealPlanId || Number(plans[0]?.mealPlanId ?? plans[0]?.ratePlanId ?? 0);
    return plans.find((plan: any) => Number(plan?.mealPlanId ?? plan?.ratePlanId) === selected) ?? plans[0];
  }

  selectMealPlan(value: unknown): void {
    this.selectedMealPlanId = Number(value) || 0;
  }

  mealPlanOptions(): any[] {
    const quotePlans = this.availability?.ratePlans ?? [];
    if (quotePlans.length) return quotePlans;
    const plans = new Map<number, any>();
    for (const price of this.room?.mealPlanPrices ?? []) {
      if (price?.isActive === false || !Number(price?.mealPlanId)) continue;
      if (!plans.has(Number(price.mealPlanId))) plans.set(Number(price.mealPlanId), price);
    }
    return [...plans.values()];
  }

  quoteMealPlanName(plan: any): string {
    return this.isArabic
      ? plan?.mealPlanNameAr || plan?.mealPlanNameEng || plan?.mealPlanName || ''
      : plan?.mealPlanNameEng || plan?.mealPlanNameAr || plan?.mealPlanName || '';
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

  get roomDetailsBookingQueryParams(): Record<string, string | number | number[]> {
    const ages = Array.isArray(this.bookingChildrenAges) ? this.bookingChildrenAges : [];
    return {
      checkIn: this.bookingCheckIn,
      checkOut: this.bookingCheckOut,
      rooms: Math.max(1, Number(this.bookingRoomCount) || 1),
      adults: Math.max(1, Number(this.bookingAdults) || 1),
      children: Math.max(0, Number(this.bookingChildren) || 0),
      infants: Math.max(0, Number(this.bookingInfants) || 0),
      childrenAges: ages.map((age) => Number(age) || 0),
      mealPlan: Number((this.availability ? this.displayedQuote(this.availability)?.mealPlanId : this.selectedMealPlanId)
        || (this.availability ? this.displayedQuote(this.availability)?.ratePlanId : 0)
        || this.mealPlanOptions()[0]?.mealPlanId
        || 1),
    };
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
