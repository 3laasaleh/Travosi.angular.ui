import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { blogData } from '../../../../data/data';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../../../shared/components/listing/tour-grid/pagination-one/pagination-one';

@Component({
  selector: 'app-blog-standard',
  imports: [RouterLink, HomeNavbar,PaginationOne, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-standard.html',
})
export class BlogStandard implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  client = 'assets/images/client/05.jpg';
  blogData = blogData;

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
