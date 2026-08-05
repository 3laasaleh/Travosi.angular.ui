import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { TermsOne } from '../../../../shared/components/utility/terms-one/terms-one';

@Component({
  selector: 'app-terms',
  imports: [RouterLink, HomeNavbar, TermsOne, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './terms.html',
})
export class Terms {}
