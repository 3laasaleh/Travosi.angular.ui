import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../../layout/navbar-one/navbar-one';
import { TourDetail } from '../../../../../components/tour-detail/tour-detail/tour-detail';
import { TourSidebar } from '../../../../../components/tour-detail/tour-sidebar/tour-sidebar';
import { FooterOne } from '../../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-tour-detail-one',
  imports: [RouterLink, NavbarOne, TourDetail, TourSidebar, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './tour-detail-one.html',
})
export class TourDetailOne implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  images = [
    'assets/images/listing/1.jpg',
    'assets/images/listing/2.jpg',
    'assets/images/listing/3.jpg',
    'assets/images/listing/4.jpg',
  ];

  visible = false;
  index = 0;

  ngAfterViewInit(): void {
    feather.replace();
  }

  showMultiple(index: number): void {
    this.index = index;
    this.visible = true;
  }

  onHide(): void {
    this.visible = false;
  }

  next(event: Event): void {
    event.stopPropagation();
    this.index = (this.index + 1) % this.images.length;
  }

  prev(event: Event): void {
    event.stopPropagation();
    this.index = (this.index - 1 + this.images.length) % this.images.length;
  }
}
