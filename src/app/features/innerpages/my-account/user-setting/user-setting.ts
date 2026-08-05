import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-setting',
  imports: [HomeNavbar, AccountTab, FooterOne, TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-setting.html',
})
export class UserSetting implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  details = [
    { name: 'First Name : ', name2: '*', icon: 'user', placeholder: 'First Name:' },
    { name: 'Last Name : ', name2: '*', icon: 'user-check', placeholder: 'Last Name:' },
    { name: 'Your Email : ', name2: '*', icon: 'mail', placeholder: 'Email' },
    { name: 'Occupation : ', name2: '', icon: 'bookmark', placeholder: 'Occupation :' },
  ];

  details2 = [
    { name: 'Phone No. :', icon: 'phone', placeholder: 'Phone :' },
    { name: 'Website :', icon: 'globe', placeholder: 'Url :' },
  ];

  details3 = [
    { name: 'Old password :', icon: 'key', placeholder: 'Old password' },
    { name: 'New password :', icon: 'key', placeholder: 'New password' },
    { name: 'Re-type New password :', icon: 'key', placeholder: 'Re-type New password' },
  ];
  passwordVisibility = this.details3.map(() => false);

  togglePasswordVisibility(index: number): void {
    this.passwordVisibility[index] = !this.passwordVisibility[index];
  }

  ngAfterViewInit(): void {
    feather.replace();
  }
}
