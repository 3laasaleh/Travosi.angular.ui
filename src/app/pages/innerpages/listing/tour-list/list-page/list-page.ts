import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../../components/navbar-one/navbar-one';
import { PaginationOne } from '../../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../../components/switcher-one/switcher-one';
import { packageData } from '../../../../../data/data';

@Component({
  selector: 'app-list-page',
  imports: [RouterLink, NavbarOne, PaginationOne, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './list-page.html',
})
export class ListPage implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  packageData = packageData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
