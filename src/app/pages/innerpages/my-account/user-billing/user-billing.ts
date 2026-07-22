import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { AccountTab } from '../../../../components/account-tab/account-tab';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-user-billing',
  imports: [NavbarOne, AccountTab, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './user-billing.html',
})
export class UserBilling implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
