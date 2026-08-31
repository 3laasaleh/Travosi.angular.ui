import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-user-social',
  imports: [HomeNavbar, AccountTab, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-social.html',
})
export class UserSocial implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  socials = [
    {
      name: 'Facebook',
      icon: 'facebook',
      placeholder: 'Facebook Profile Name',
      desc: 'Add your Facebook username (e.g. jesus).',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      placeholder: 'Instagram Profile Name',
      desc: 'Add your Instagram username (e.g. jesus).',
    },
    {
      name: 'Linkedin',
      icon: 'linkedin',
      placeholder: 'Linkedin Profile Name',
      desc: 'Add your Linkedin username.',
    },
    { name: 'Youtube', icon: 'youtube', placeholder: 'Youtube url', desc: 'Add your Youtube url.' },
  ];

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
