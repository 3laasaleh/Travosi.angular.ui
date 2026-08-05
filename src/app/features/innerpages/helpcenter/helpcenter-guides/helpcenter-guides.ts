import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { HelpcenterGuidesComp } from '../../../../shared/components/helpcenter/helpcenter-guides/helpcenter-guides';

@Component({
  selector: 'app-helpcenter-guides',
  imports: [RouterLink, HomeNavbar,HelpcenterGuidesComp, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-guides.html',
})
export class HelpcenterGuides {
  bg = 'assets/images/bg/cta.jpg';
}
