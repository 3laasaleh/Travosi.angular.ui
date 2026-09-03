import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';

import { packageData } from '../../../data/data';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-user-account',
  imports: [Breadcrumbs, HomeNavbar, AccountTab, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-account.html',
})
export class UserAccount implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  packageData = packageData.slice(0, 6);

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
