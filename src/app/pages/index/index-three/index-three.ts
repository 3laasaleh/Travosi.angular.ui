import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaglineOne } from '../../../components/tagline-one/tagline-one';
import { NavbarOne } from '../../../layout/navbar-one/navbar-one';
import { SelectedDate } from '../../../components/selected-date/selected-date';
import { DestinationsTwo } from '../../../components/destinations/destinations-two/destinations-two';
import { AgencyOne } from '../../../components/agency-one/agency-one';
import { TourPackages12item } from '../../../components/tour-packages/tour-packages-12item/tour-packages-12item';
import { UsersOne } from '../../../components/users-one/users-one';
import { InstaPost } from '../../../components/insta-post/insta-post';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-index-three',
  imports: [
    TaglineOne,
    NavbarOne,
    SelectedDate,
    DestinationsTwo,
    AgencyOne,
    TourPackages12item,
    UsersOne,
    InstaPost,
    FooterOne,
    SwitcherOne,
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './index-three.html',
})
export class IndexThree implements OnInit, OnDestroy {
  randomImage = '';
  backgroundImages = ['assets/images/bg/4.jpg', 'assets/images/bg/5.jpg', 'assets/images/bg/6.jpg'];
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.changeBackground();
    this.intervalId = setInterval(() => this.changeBackground(), 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  changeBackground(): void {
    const randomIndex = Math.floor(Math.random() * this.backgroundImages.length);
    this.randomImage = this.backgroundImages[randomIndex];
  }
}
