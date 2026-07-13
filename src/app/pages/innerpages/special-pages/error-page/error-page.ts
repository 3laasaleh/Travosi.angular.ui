import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  templateUrl: './error-page.html',
})
export class ErrorPage implements AfterViewInit {
  logo = 'assets/images/logo-icon.png';
  maintenance = 'assets/images/maintenance.svg';
  year = new Date().getFullYear();

  ngAfterViewInit(): void {
    feather.replace();
  }
}
