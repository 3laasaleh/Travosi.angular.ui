import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-user-notification',
  imports: [NavbarOne, AccountTab, FooterOne, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-notification.html',
})
export class UserNotification implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
