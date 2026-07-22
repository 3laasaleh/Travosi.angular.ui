import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TaglineOne } from '../../../components/tagline-one/tagline-one';
import { NavbarOne } from '../../../components/navbar-one/navbar-one';
import { SelectedDate } from '../../../components/selected-date/selected-date';
import { DestinationsSlider } from '../../../components/destinations/destinations-slider/destinations-slider';
import { TourPackagesSlider } from '../../../components/tour-packages/tour-packages-slider/tour-packages-slider';
import { AgencyOne } from '../../../components/agency-one/agency-one';
import { UsersOne } from '../../../components/users-one/users-one';
import { BlogsOne } from '../../../components/blogs-one/blogs-one';
import { FooterOne } from '../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-index-one',
  imports: [
    TaglineOne,
    NavbarOne,
    SelectedDate,
    DestinationsSlider,
    TourPackagesSlider,
    AgencyOne,
    UsersOne,
    BlogsOne,
    FooterOne,
    SwitcherOne,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './index-one.html',
})
export class IndexOne {
  bg = 'assets/images/bg/1.jpg';
  isActive = false;

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
