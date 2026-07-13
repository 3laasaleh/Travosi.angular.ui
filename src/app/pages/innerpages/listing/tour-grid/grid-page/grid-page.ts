import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../../components/navbar-one/navbar-one';
import { PaginationOne } from '../../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../../components/switcher-one/switcher-one';
import { packageData } from '../../../../../data/data';

@Component({
  selector: 'app-grid-page',
  imports: [RouterLink, NavbarOne, PaginationOne, FooterOne, SwitcherOne],
  templateUrl: './grid-page.html',
})
export class GridPage implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  packageData = packageData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
