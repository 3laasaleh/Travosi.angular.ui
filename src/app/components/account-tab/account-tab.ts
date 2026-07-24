import { AfterViewInit, Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { AuthService } from '../../pages/user/auth-pages/_services/auth.service';

@Component({
  selector: 'app-account-tab',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './account-tab.html',
})
export class AccountTab implements AfterViewInit {
  imageSrc = 'assets/images/client/16.jpg';
  currentUrl = '';
  userName = '';
  userEmail = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.currentUrl = this.router.url.split('?')[0];
    const user = this.authService.getCurentUser();
    if (!user) {
      this.router.navigate(['login']);
      return;
    }

    this.userName = user.userName ?? '';
    this.userEmail = user.email ?? '';
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
