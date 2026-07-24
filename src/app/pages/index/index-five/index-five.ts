import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarOne } from '../../../layout/navbar-one/navbar-one';
import { SelectedDate } from '../../../components/selected-date/selected-date';
import { DestinationsSlider } from '../../../components/destinations/destinations-slider/destinations-slider';
import { AgencyOne } from '../../../components/agency-one/agency-one';
import { TourPackages } from '../../../components/tour-packages/tour-packages/tour-packages';
import { UsersOne } from '../../../components/users-one/users-one';
import { BlogsOne } from '../../../components/blogs-one/blogs-one';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-index-five',
  imports: [
    NavbarOne,
    SelectedDate,
    DestinationsSlider,
    AgencyOne,
    TourPackages,
    UsersOne,
    BlogsOne,
    FooterOne,
    SwitcherOne,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './index-five.html',
})
export class IndexFive {
  bg = 'assets/images/bg/7.png';
}
