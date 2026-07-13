import { AfterViewInit, Component } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../components/navbar-one/navbar-one';
import { FooterOne } from '../../../components/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-contact-page',
  imports: [NavbarOne, FooterOne, SwitcherOne],
  templateUrl: './contact-page.html',
})
export class ContactPage implements AfterViewInit {
  bg = 'assets/images/travel-train-station.svg';
  isActive = false;

  contacts = [
    { icon: 'phone', name: 'Phone', desc: 'The phrasal sequence of the is now so that many campaign and benefit', status: '+152 534-468-854' },
    { icon: 'mail', name: 'Email', desc: 'The phrasal sequence of the is now so that many campaign and benefit', status: 'contact@example.com' },
    { icon: 'map-pin', name: 'Location', desc: 'C/54 Northwest Freeway, Suite 558, Houston, USA 485', status: 'View on Google map' },
  ];

  ngAfterViewInit(): void {
    feather.replace();
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
