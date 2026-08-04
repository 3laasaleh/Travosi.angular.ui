import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-footer-one',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './footer-one.html',
})
export class FooterOne implements AfterViewInit {
  logo = 'assets/images/main-logo.png';
  year = new Date().getFullYear();

  ngAfterViewInit(): void {
    feather.replace();
  }
}
