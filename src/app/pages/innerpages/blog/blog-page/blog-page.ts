import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { PaginationOne } from '../../../../components/listing/tour-grid/pagination-one/pagination-one';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { blogData } from '../../../../data/data';

@Component({
  selector: 'app-blog-page',
  imports: [RouterLink, NavbarOne, PaginationOne, FooterOne, SwitcherOne],
  templateUrl: './blog-page.html',
})
export class BlogPage implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  blogData = blogData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
