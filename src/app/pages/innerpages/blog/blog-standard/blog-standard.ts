import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { PaginationOne } from '../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { blogData } from '../../../../data/data';

@Component({
  selector: 'app-blog-standard',
  imports: [RouterLink, NavbarOne, PaginationOne, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './blog-standard.html',
})
export class BlogStandard implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  client = 'assets/images/client/05.jpg';
  blogData = blogData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
