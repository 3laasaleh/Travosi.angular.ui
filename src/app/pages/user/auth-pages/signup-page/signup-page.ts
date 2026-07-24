import { AfterViewInit, Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { AuthService } from '../_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

interface RegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-page.html',
})
export class SignupPage implements AfterViewInit {
  private readonly fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly router = inject(Router);

  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';
  apiUrl = 'https://localhost:44382/api/Account/Registeration';
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  signupForm = this.fb.nonNullable.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  ngAfterViewInit(): void {
    feather.replace();
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload: RegistrationPayload = {
      firstName: this.signupForm.get('firstName')?.value?.trim() ?? '',
      lastName: this.signupForm.get('lastName')?.value?.trim() ?? '',
      email: this.signupForm.get('email')?.value?.trim() ?? '',
      mobile: this.signupForm.get('mobile')?.value?.trim() ?? '',
      password: this.signupForm.get('password')?.value ?? '',
      confirmPassword: this.signupForm.get('confirmPassword')?.value ?? '',
    };

    this.isSubmitting = true;

    this._authService.registeration(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;

        this.successMessage = 'Sign up compeleted successfully.';
        this.router.navigateByUrl('/signup-success?status=registered');
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage =
          error?.error?.message || error?.message || 'Registration failed. Please try again.';
      },
    });
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    if (control.get('confirmPassword')?.hasError('mismatch')) {
      control.get('confirmPassword')?.setErrors(null);
    }

    return null;
  }
}
