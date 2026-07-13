import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { blogData } from '../../../../data/data';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, NavbarOne, FooterOne, SwitcherOne],
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
