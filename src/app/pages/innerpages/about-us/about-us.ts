import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../components/navbar-one/navbar-one';
import { AgencyOne } from '../../../components/agency-one/agency-one';
import { TeamOne } from '../../../components/team-one/team-one';
import { UsersOne } from '../../../components/users-one/users-one';
import { BlogsOne } from '../../../components/blogs-one/blogs-one';
import { InstaPost } from '../../../components/insta-post/insta-post';
import { FooterOne } from '../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-about-us',
  imports: [
    RouterLink,
    NavbarOne,
    AgencyOne,
    TeamOne,
    UsersOne,
    BlogsOne,
    InstaPost,
    FooterOne,
    SwitcherOne,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './about-us.html',
})
export class AboutUs {
  cta = 'assets/images/bg/cta.jpg';
}
