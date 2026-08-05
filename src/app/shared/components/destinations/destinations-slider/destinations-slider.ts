import { AfterViewInit, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { tns } from 'tiny-slider';
import { destinations } from '../../../data/data';

@Component({
  selector: 'app-destinations-slider',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './destinations-slider.html',
})
export class DestinationsSlider implements AfterViewInit {
  @Input() Destinations = false;

  destinations = destinations;

  ngAfterViewInit(): void {
    tns({
      container: '.tiny-five-item',
      controls: true,
      mouseDrag: true,
      loop: true,
      rewind: true,
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayTimeout: 3000,
      navPosition: 'bottom',
      controlsText: [
        '<i class="mdi mdi-chevron-left "></i>',
        '<i class="mdi mdi-chevron-right"></i>',
      ],
      nav: false,
      speed: 400,
      gutter: 0,
      responsive: {
        1025: { items: 5 },
        992: { items: 4 },
        767: { items: 3 },
        425: { items: 1 },
      },
    });
  }
}
