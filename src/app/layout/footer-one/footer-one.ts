import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-one',
  imports: [RouterLink, TranslatePipe],
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
