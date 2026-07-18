import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-activate-page',
  imports: [RouterLink],
  templateUrl: './activate-page.html',
})
export class ActivatePage implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';
  apiUrl = 'https://localhost:44382/api/Account/Activate';
  isLoading = true;
  errorMessage = '';
  email = '';
  token = '';

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email')?.trim() ?? '';
    const token = this.route.snapshot.queryParamMap.get('token')?.trim() ?? '';

    if (!email || !token) {
      this.isLoading = false;
      this.errorMessage = 'Activation link is invalid or incomplete.';
      return;
    }

    this.email = email;
    this.token = token;
    this.activateAccount();
  }

  private activateAccount(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.http.post(this.apiUrl, { email: this.email, token: this.token },
      { headers:new HttpHeaders({'Authorization':`Bearer ${this.token}`})}
      ).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/signup-success?status=activated');
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error?.error?.message || error?.message || 'Activation failed. Please try again.';
      },
    });
  }
}
