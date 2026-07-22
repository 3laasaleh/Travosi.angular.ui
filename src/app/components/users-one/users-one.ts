import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { tns } from 'tiny-slider';
import { clientData } from '../../data/data';

@Component({
  selector: 'app-users-one',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './users-one.html',
})
export class UsersOne implements AfterViewInit {
  clientData = clientData;

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
