import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { HelpcenterGuidesComp } from '../../../../components/helpcenter/helpcenter-guides/helpcenter-guides';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-helpcenter-guides',
  imports: [RouterLink, HomeNavbar,HelpcenterGuidesComp, FooterOne, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-guides.html',
})
export class HelpcenterGuides {
  bg = 'assets/images/bg/cta.jpg';
}
