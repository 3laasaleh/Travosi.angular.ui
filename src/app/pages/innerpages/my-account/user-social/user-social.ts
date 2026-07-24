import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-user-social',
  imports: [NavbarOne, AccountTab, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
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
    feather.replace();
  }
}
