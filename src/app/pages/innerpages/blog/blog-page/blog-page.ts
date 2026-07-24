import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { PaginationOne } from '../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { blogData } from '../../../../data/data';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-blog-page',
  imports: [RouterLink, HomeNavbar,PaginationOne, FooterOne, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-page.html',
})
export class BlogPage implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  blogData = blogData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
