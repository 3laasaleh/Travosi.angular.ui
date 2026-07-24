import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-user-invoice',
  imports: [RouterLink, HomeNavbar,FooterOne, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-invoice.html',
})
export class UserInvoice implements AfterViewInit {
  logoDark = 'assets/images/logo-dark.png';
  logoLight = 'assets/images/logo-light.png';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
