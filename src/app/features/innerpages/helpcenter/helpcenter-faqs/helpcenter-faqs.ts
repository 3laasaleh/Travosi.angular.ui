import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterFaqsComp } from '../../../../shared/components/helpcenter/helpcenter-faqs/helpcenter-faqs';

@Component({
  selector: 'app-helpcenter-faqs',
  imports: [RouterLink, HomeNavbar,HelpcenterFaqsComp, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-faqs.html',
})
export class HelpcenterFaqs {
  bg = 'assets/images/bg/cta.jpg';
}
