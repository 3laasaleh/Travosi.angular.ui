import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { tns } from 'tiny-slider';
import { instraImg } from '../../data/data';

@Component({
  selector: 'app-insta-post',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './insta-post.html',
})
export class InstaPost implements AfterViewInit {
  instraImg = instraImg;

  visible = false;
  index = 0;

  ngAfterViewInit(): void {
    tns({
      container: '.tiny-twelve-item',
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
        1025: { items: 12 },
        992: { items: 8 },
        767: { items: 6 },
        575: { items: 5 },
        420: { items: 3 },
        320: { items: 2 },
      },
    });
    feather.replace();
  }

  showLightbox(index: number): void {
    this.index = index;
    this.visible = true;
  }

  onHide(): void {
    this.visible = false;
  }

  next(event: Event): void {
    event.stopPropagation();
    this.index = (this.index + 1) % this.instraImg.length;
  }

  prev(event: Event): void {
    event.stopPropagation();
    this.index = (this.index - 1 + this.instraImg.length) % this.instraImg.length;
  }
}
