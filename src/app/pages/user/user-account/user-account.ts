import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { NavbarOne } from '../../../layout/navbar-one/navbar-one';
import { AccountTab } from '../account-tab/account-tab';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';
import { packageData } from '../../../data/data';

@Component({
  selector: 'app-user-account',
  imports: [RouterLink, NavbarOne, AccountTab, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './user-account.html',
})
export class UserAccount implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  packageData = packageData.slice(0, 6);

  ngAfterViewInit(): void {
    feather.replace();
  }
}
