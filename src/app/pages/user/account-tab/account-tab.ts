import { AfterViewInit, Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-account-tab',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
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

  onLogoutClicked(): void {
    Swal.fire({
      title: 'Confirm Sign Out',
      text: 'Are you sure you want to log out of your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sign Out',
      confirmButtonColor:'#fb2c36',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
