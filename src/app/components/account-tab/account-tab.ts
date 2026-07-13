import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-account-tab',
  imports: [RouterLink],
  templateUrl: './account-tab.html',
})
export class AccountTab implements AfterViewInit {
  imageSrc = 'assets/images/client/16.jpg';
  currentUrl = '';

  constructor(private router: Router) {
    this.currentUrl = this.router.url.split('?')[0];
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  loadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageSrc = URL.createObjectURL(input.files[0]);
    }
  }
}
