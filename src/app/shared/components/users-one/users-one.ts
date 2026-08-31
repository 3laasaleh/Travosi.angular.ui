import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ChangeDetectionStrategy, PLATFORM_ID, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-users-one',
  imports: [TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './users-one.html',
})
export class UsersOne implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly travelPromises = [
    { icon: 'mdi-map-marker-path', title: 'personalizedTravelPlanning', description: 'personalizedTravelPlanningDescription' },
    { icon: 'mdi-headset', title: 'supportThroughoutJourney', description: 'supportThroughoutJourneyDescription' },
    { icon: 'mdi-shield-check-outline', title: 'trustedTravelArrangements', description: 'trustedTravelArrangementsDescription' },
  ];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    void import('tiny-slider').then(({ tns }) => tns({
      container: '.tiny-three-item',
      controls: false,
      mouseDrag: true,
      loop: true,
      rewind: true,
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayTimeout: 3000,
      navPosition: 'bottom',
      speed: 400,
      gutter: 12,
      responsive: {
        992: { items: 3 },
        768: { items: 2 },
        320: { items: 1 },
      },
    }));
  }
}
