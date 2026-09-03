import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterSupportComp } from '../../../../shared/components/helpcenter/helpcenter-support/helpcenter-support';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-helpcenter-support',
  imports: [Breadcrumbs, RouterLink, HomeNavbar,HelpcenterSupportComp, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-support.html',
})
export class HelpcenterSupport {
  bg = 'assets/images/bg/cta.jpg';
}
