import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-user-notification',
  imports: [Breadcrumbs, HomeNavbar,AccountTab, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-notification.html',
})
export class UserNotification implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
