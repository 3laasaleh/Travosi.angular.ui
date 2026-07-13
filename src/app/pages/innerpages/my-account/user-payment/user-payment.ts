import { AfterViewInit, Component } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../../components/navbar-one/navbar-one';
import { AccountTab } from '../../../../components/account-tab/account-tab';
import { FooterOne } from '../../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-user-payment',
  imports: [NavbarOne, AccountTab, FooterOne, SwitcherOne],
  templateUrl: './user-payment.html',
})
export class UserPayment implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';

  payments = [
    { image: 'assets/images/payments/visa.jpg', name: 'Visa ending in 4578', date: 'Expires in 12/2022' },
    { image: 'assets/images/payments/american-express.jpg', name: 'American Express ending in 4578', date: 'Expires in 12/2022' },
    { image: 'assets/images/payments/discover.jpg', name: 'Discover ending in 4578', date: 'Expires in 12/2022' },
    { image: 'assets/images/payments/mastercard.jpg', name: 'Master Card ending in 4578', date: 'Expires in 12/2022' },
  ];

  ngAfterViewInit(): void {
    feather.replace();
  }

  showModal(): void {
    (document.getElementById('paymentMethod') as HTMLDialogElement)?.showModal();
  }
}
