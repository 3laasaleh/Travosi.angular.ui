import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';

import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-user-invoice',
  imports: [RouterLink, HomeNavbar,FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-invoice.html',
})
export class UserInvoice implements AfterViewInit {
  logoDark = 'assets/images/main-logo.png';
  logoLight = 'assets/images/main-logo.png';

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
