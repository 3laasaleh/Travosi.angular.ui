import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { HelpcenterSupportComp } from '../../../../components/helpcenter/helpcenter-support/helpcenter-support';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-helpcenter-support',
  imports: [RouterLink, NavbarOne, HelpcenterSupportComp, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './helpcenter-support.html',
})
export class HelpcenterSupport {
  bg = 'assets/images/bg/cta.jpg';
}
