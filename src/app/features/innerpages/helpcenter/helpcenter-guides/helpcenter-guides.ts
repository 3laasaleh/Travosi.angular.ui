import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterGuidesComp } from '../../../../shared/components/helpcenter/helpcenter-guides/helpcenter-guides';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-helpcenter-guides',
  imports: [Breadcrumbs, RouterLink, HomeNavbar,HelpcenterGuidesComp, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-guides.html',
})
export class HelpcenterGuides {
  bg = 'assets/images/bg/cta.jpg';
}
