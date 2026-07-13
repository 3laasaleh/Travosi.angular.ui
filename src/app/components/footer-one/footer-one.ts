import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-footer-one',
  imports: [RouterLink],
  templateUrl: './footer-one.html',
})
export class FooterOne implements AfterViewInit {
  logo = 'assets/images/logo-light.png';
  year = new Date().getFullYear();

  ngAfterViewInit(): void {
    feather.replace();
  }
}
