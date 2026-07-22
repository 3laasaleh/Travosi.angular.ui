import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { TaglineOne } from '../../components/tagline-one/tagline-one';
import { NavbarOne } from '../../components/navbar-one/navbar-one';
import { SelectedDate } from '../../components/selected-date/selected-date';
import { AgencyOne } from '../../components/agency-one/agency-one';
import { TourPackages } from '../../components/tour-packages/tour-packages/tour-packages';
import { UsersOne } from '../../components/users-one/users-one';
import { BlogsOne } from '../../components/blogs-one/blogs-one';
import { FooterOne } from '../../components/footer-one/footer-one';
import { SwitcherOne } from '../../components/switcher-one/switcher-one';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { DestinationsTwo } from '../../components/destinations/destinations-two/destinations-two';
import { TourPackages12item } from '../../components/tour-packages/tour-packages-12item/tour-packages-12item';

@Component({
  selector: 'app-home',
  imports: [
    TaglineOne,
    NavbarOne,
    SelectedDate,
    AgencyOne,
    UsersOne,
    FooterOne,
    SwitcherOne,
    DestinationsTwo,
    TourPackages12item,
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  bg2 = 'assets/images/bg/2.jpg';
  bg3 = 'assets/images/bg/3.jpg';
  map = 'assets/images/map-plane.png';

  ngAfterViewInit(): void {
    new Swiper('.swiper-container .swiper', {
      modules: [Navigation, Autoplay, Pagination],
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
    });
  }
}
