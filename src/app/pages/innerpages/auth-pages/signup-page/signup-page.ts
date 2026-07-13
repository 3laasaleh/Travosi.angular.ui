import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-signup-page',
  imports: [RouterLink, SwitcherOne],
  templateUrl: './signup-page.html',
})
export class SignupPage implements AfterViewInit {
  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/logo-icon.png';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
