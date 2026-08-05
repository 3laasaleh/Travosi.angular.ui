import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { tns } from 'tiny-slider';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-users-one',
  imports: [TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './users-one.html',
})
export class UsersOne implements AfterViewInit {
  readonly travelPromises = [
    { icon: 'mdi-map-marker-path', title: 'personalizedTravelPlanning', description: 'personalizedTravelPlanningDescription' },
    { icon: 'mdi-headset', title: 'supportThroughoutJourney', description: 'supportThroughoutJourneyDescription' },
    { icon: 'mdi-shield-check-outline', title: 'trustedTravelArrangements', description: 'trustedTravelArrangementsDescription' },
  ];

  ngAfterViewInit(): void {
    tns({
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
    });
  }
}
