import { UserProfileDTO } from './../models/userProfile.model';
import { AfterViewInit, Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, SwitcherOne, ReactiveFormsModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './login-page.html',
})
export class LoginPage implements AfterViewInit {
  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';
  private readonly fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  isSubmitting = false;
  errorMessage = '';

  ngAfterViewInit(): void {
    feather.replace();
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = {
      email: this.loginForm.get('email')?.value?.trim(),
      password: this.loginForm.get('password')?.value,
      rememberMe: this.loginForm.get('rememberMe')?.value,
    };

    // AuthService handles storing the login result and redirection
    this._authService.login(payload).subscribe({
      next: (res: IGenericResponse<UserProfileDTO>) => {
        if(!res.isSuccess&&res?.message)
        this.errorMessage = res?.message ??"" ;
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isSubmitting = false;
      },
    });

  }
}
