import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-lock-screen',
  imports: [RouterLink, SwitcherOne],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './lock-screen.html',
})
export class LockScreen implements AfterViewInit {
  bg = 'assets/images/bg/6.jpg';
  client = 'assets/images/client/16.jpg';

  ngAfterViewInit(): void {
    feather.replace();
  }
}
