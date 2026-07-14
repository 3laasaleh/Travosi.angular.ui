import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, SwitcherOne],
  templateUrl: './login-page.html',
})
export class LoginPage implements AfterViewInit {
  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
