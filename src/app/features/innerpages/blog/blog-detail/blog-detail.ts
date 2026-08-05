import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { blogData } from '../../../../data/data';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, HomeNavbar,FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-detail.html',
})
export class BlogDetail implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  client = 'assets/images/client/05.jpg';
  blog = 'assets/images/blog/9.jpg';
  blogData = blogData.slice(0, 3);

  ngAfterViewInit(): void {
    feather.replace();
  }
}
