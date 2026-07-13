import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { HelpcenterGuidesComp } from '../../../../components/helpcenter/helpcenter-guides/helpcenter-guides';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-helpcenter-guides',
  imports: [RouterLink, NavbarOne, HelpcenterGuidesComp, FooterOne, SwitcherOne],
  templateUrl: './helpcenter-guides.html',
})
export class HelpcenterGuides {
  bg = 'assets/images/bg/cta.jpg';
}
