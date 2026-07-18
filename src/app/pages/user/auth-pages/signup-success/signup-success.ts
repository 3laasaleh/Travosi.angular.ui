import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  imports: [RouterLink],
  templateUrl: './signup-success.html',
})
export class SignupSuccess implements OnInit {
  private readonly route = inject(ActivatedRoute);

  year = new Date().getFullYear();
  title = 'Success';
  message = 'Your account has been created. Please check your email to activate your account.';
  buttonText = 'Continue';
  redirectLink = '/';

  ngOnInit(): void {
    const status = this.route.snapshot.queryParamMap.get('status');

    if (status === 'activated') {
      this.title = 'Activated';
      this.message = 'Your account has been activated successfully. You can now sign in.';
      this.buttonText = 'Sign in';
      this.redirectLink = '/login';
    } else if (status === 'registered') {
      this.title = 'Success';
      this.message = 'Your account has been created. Please check your email to activate your account.';
      this.buttonText = 'Continue';
      this.redirectLink = '/';
    }
  }
}
