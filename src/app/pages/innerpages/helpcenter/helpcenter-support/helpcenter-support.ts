import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { HelpcenterSupportComp } from '../../../../components/helpcenter/helpcenter-support/helpcenter-support';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-helpcenter-support',
  imports: [RouterLink, NavbarOne, HelpcenterSupportComp, FooterOne, SwitcherOne],
  templateUrl: './helpcenter-support.html',
})
export class HelpcenterSupport {
  bg = 'assets/images/bg/cta.jpg';
}
