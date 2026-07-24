import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { TaglineOne } from '../../../components/tagline-one/tagline-one';
import { NavbarOne } from '../../../layout/navbar-one/navbar-one';
import { SelectedDate } from '../../../components/selected-date/selected-date';
import { AgencyOne } from '../../../components/agency-one/agency-one';
import { TourPackages } from '../../../components/tour-packages/tour-packages/tour-packages';
import { UsersOne } from '../../../components/users-one/users-one';
import { BlogsOne } from '../../../components/blogs-one/blogs-one';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-index-two',
  imports: [
    TaglineOne,
    HomeNavbar,
    SelectedDate,
    AgencyOne,
    TourPackages,
    UsersOne,
    BlogsOne,
    FooterOne,
    SwitcherOne,
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './index-two.html',
})
export class IndexTwo implements AfterViewInit {
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
