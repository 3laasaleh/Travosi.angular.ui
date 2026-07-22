import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../../components/navbar-one/navbar-one';
import { PriceFilter } from '../../../../../components/listing/tour-grid/price-filter/price-filter';
import { PaginationOne } from '../../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../../components/switcher-one/switcher-one';
import { packageData } from '../../../../../data/data';

@Component({
  selector: 'app-grid-right-sidebar',
  imports: [RouterLink, NavbarOne, PriceFilter, PaginationOne, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './grid-right-sidebar.html',
})
export class GridRightSidebar implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  packageData = packageData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
