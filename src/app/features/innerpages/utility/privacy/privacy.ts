import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { PrivacyOne } from '../../../../shared/components/utility/privacy-one/privacy-one';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink, HomeNavbar, PrivacyOne, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.html',
})
export class Privacy {}
