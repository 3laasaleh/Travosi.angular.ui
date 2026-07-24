import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { HelpcenterFaqsComp } from '../../../../components/helpcenter/helpcenter-faqs/helpcenter-faqs';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-helpcenter-faqs',
  imports: [RouterLink, NavbarOne, HelpcenterFaqsComp, FooterOne, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-faqs.html',
})
export class HelpcenterFaqs {
  bg = 'assets/images/bg/cta.jpg';
}
