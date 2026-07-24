import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { TaglineOne } from '../../../components/tagline-one/tagline-one';
import { NavbarOne } from '../../../layout/navbar-one/navbar-one';
import { DestinationsSlider } from '../../../components/destinations/destinations-slider/destinations-slider';
import { TourPackages8item } from '../../../components/tour-packages/tour-packages-8item/tour-packages-8item';
import { UsersOne } from '../../../components/users-one/users-one';
import { AskedQuestions } from '../../../components/asked-questions/asked-questions';
import { FooterOne } from '../../../layout/footer-one/footer-one';
import { SwitcherOne } from '../../../components/switcher-one/switcher-one';
import { HomeNavbar } from '../../../layout/home-navbar/home-navbar';

@Component({
  selector: 'app-index-four',
  imports: [
    FormsModule,
    TaglineOne,
    HomeNavbar,
    DestinationsSlider,
    TourPackages8item,
    UsersOne,
    AskedQuestions,
    FooterOne,
    SwitcherOne,
  ],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './index-four.html',
})
export class IndexFour implements AfterViewInit {
  backgroundImagePath = 'assets/images/bg/6.jpg';
  isActive = false;
  date: string | null = null;
  date2: string | null = null;

  ngAfterViewInit(): void {
    feather.replace();
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }

  scrollToBottom(): void {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }
}
