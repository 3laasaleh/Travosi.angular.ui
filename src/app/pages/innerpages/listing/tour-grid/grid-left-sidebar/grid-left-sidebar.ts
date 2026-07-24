import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../../layout/navbar-one/navbar-one';
import { PriceFilter } from '../../../../../components/listing/tour-grid/price-filter/price-filter';
import { PaginationOne } from '../../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../../components/switcher-one/switcher-one';
import { packageData } from '../../../../../data/data';

@Component({
  selector: 'app-grid-left-sidebar',
  imports: [RouterLink, NavbarOne, PriceFilter, PaginationOne, FooterOne, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './grid-left-sidebar.html',
})
export class GridLeftSidebar implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  packageData = packageData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
