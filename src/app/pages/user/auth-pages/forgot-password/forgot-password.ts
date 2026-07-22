import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './forgot-password.html',
})
export class ForgotPassword implements AfterViewInit {
  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/logo-icon.png';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
