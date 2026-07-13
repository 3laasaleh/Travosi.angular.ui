import { AfterViewInit, Component } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { AccountTab } from '../../../../components/account-tab/account-tab';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-user-notification',
  imports: [NavbarOne, AccountTab, FooterOne, SwitcherOne],
  templateUrl: './user-notification.html',
})
export class UserNotification implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
