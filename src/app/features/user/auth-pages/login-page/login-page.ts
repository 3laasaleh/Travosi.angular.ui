import { UserProfileDTO } from './../models/userProfile.model';
import { AfterViewInit, Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './login-page.html',
})
export class LoginPage implements AfterViewInit {
  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';
  private readonly fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
   cdr=inject(ChangeDetectorRef);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  isSubmitting = false;
  errorMessage = '';
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
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
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this._authService.login(payload, returnUrl).pipe(
      finalize(() => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (res: IGenericResponse<UserProfileDTO>) => {
        if(!res.isSuccess&&res?.message)
        this.errorMessage = res?.message ??"" ;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });

  }
}
