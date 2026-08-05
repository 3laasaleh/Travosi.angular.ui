import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../layout/navbar-one/navbar-one';
import { AccountTab } from '../../../user/account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-user-payment',
  imports: [HomeNavbar,AccountTab, FooterOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-payment.html',
})
export class UserPayment implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  payments = [
    {
      image: 'assets/images/payments/visa.jpg',
      name: 'Visa ending in 4578',
      date: 'Expires in 12/2022',
    },
    {
      image: 'assets/images/payments/american-express.jpg',
      name: 'American Express ending in 4578',
      date: 'Expires in 12/2022',
    },
    {
      image: 'assets/images/payments/discover.jpg',
      name: 'Discover ending in 4578',
      date: 'Expires in 12/2022',
    },
    {
      image: 'assets/images/payments/mastercard.jpg',
      name: 'Master Card ending in 4578',
      date: 'Expires in 12/2022',
    },
  ];

  ngAfterViewInit(): void {
    feather.replace();
  }

  showModal(): void {
    (document.getElementById('paymentMethod') as HTMLDialogElement)?.showModal();
  }
}
