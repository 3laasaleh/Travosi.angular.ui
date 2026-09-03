import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { PrivacyOne } from '../../../../shared/components/utility/privacy-one/privacy-one';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-privacy',
  imports: [Breadcrumbs, RouterLink, HomeNavbar, PrivacyOne, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.html',
})
export class Privacy {}
