import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AboutUsText } from '../../../core/data/about-us-content';

@Component({
  selector: 'app-users-one',
  imports: [TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './users-one.html',
})
export class UsersOne {
  @Input() aboutContent: AboutUsText | null = null;
  text(key: string, fallback: string): string { return this.aboutContent?.[key] || fallback; }
  readonly travelPromises = [
    { icon: 'mdi-map-marker-path', title: 'personalizedTravelPlanning', description: 'personalizedTravelPlanningDescription' },
    { icon: 'mdi-headset', title: 'supportThroughoutJourney', description: 'supportThroughoutJourneyDescription' },
    { icon: 'mdi-shield-check-outline', title: 'trustedTravelArrangements', description: 'trustedTravelArrangementsDescription' },
  ];
}
