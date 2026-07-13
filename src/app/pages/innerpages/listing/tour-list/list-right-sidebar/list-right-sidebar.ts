import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../../components/navbar-one/navbar-one';
import { PriceFilter } from '../../../../../components/listing/tour-grid/price-filter/price-filter';
import { PaginationOne } from '../../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../../components/switcher-one/switcher-one';
import { packageData } from '../../../../../data/data';

@Component({
  selector: 'app-list-right-sidebar',
  imports: [RouterLink, NavbarOne, PriceFilter, PaginationOne, FooterOne, SwitcherOne],
  templateUrl: './list-right-sidebar.html',
})
export class ListRightSidebar implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  packageData = packageData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
