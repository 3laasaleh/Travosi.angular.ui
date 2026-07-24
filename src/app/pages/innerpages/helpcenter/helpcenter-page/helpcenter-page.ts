import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { HelpcenterOne } from '../../../../components/helpcenter/helpcenter-one/helpcenter-one';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-helpcenter-page',
  imports: [RouterLink, NavbarOne, HelpcenterOne, FooterOne, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-page.html',
})
export class HelpcenterPage {
  bg = 'assets/images/bg/cta.jpg';
}
