import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterOne } from '../../../../shared/components/helpcenter/helpcenter-one/helpcenter-one';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-helpcenter-page',
  imports: [Breadcrumbs, RouterLink, HomeNavbar,HelpcenterOne, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-page.html',
})
export class HelpcenterPage {
  bg = 'assets/images/bg/cta.jpg';
}
