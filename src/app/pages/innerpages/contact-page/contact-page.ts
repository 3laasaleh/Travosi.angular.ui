import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { NavbarOne } from '../../../layout/navbar-one/navbar-one';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-contact-page',
  imports: [NavbarOne, FooterOne, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './contact-page.html',
})
export class ContactPage implements AfterViewInit {
  bg = 'assets/images/travel-train-station.svg';
  isActive = false;

  contacts = [
    {
      icon: 'phone',
      name: 'Phone',
      desc: 'The phrasal sequence of the is now so that many campaign and benefit',
      status: '+201155011300',
    },
    {
      icon: 'mail',
      name: 'Email',
      desc: 'The phrasal sequence of the is now so that many campaign and benefit',
      status: 'Info@seaworldholidays.com',
    },
    {
      icon: 'map-pin',
      name: 'Location',
      desc: 'C/54 Northwest Freeway, Suite 558, 7 Mariouteya, Haram, Al Rehab Tower,',
      status: 'View on Google map',
    },
  ];

  ngAfterViewInit(): void {
    feather.replace();
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
