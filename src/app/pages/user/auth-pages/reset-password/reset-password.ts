import { AfterViewInit, Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { ApiService } from '../../../../core/services/apiservice.service';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './reset-password.html',
})
export class ResetPassword implements AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly fb = inject(FormBuilder);
  private readonly jwtHelper = inject(JwtHelperService);

  bg = 'assets/images/bg/6.jpg';
  email = '';
  token = '';
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  tokenExpired = false;
  invalidLink = false;
  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  resetPasswordForm = this.fb.nonNullable.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator },
  );

  constructor() {
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';

    this.email = email;
    this.token = token;

    if (!token || !email) {
      this.invalidLink = true;
      return;
    }

    if (this.jwtHelper.isTokenExpired(token)) {
      this.tokenExpired = true;
      return;
    }
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  get password(): AbstractControl | null {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.resetPasswordForm.get('confirmPassword');
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isFormValid()) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = {
      email: this.email,
      token: this.token,
      password: this.password?.value,
    };

    this.apiService.post('Account/changepassword', payload).subscribe({
      next: () => {
        this.successMessage = 'resetPasswordSuccess';
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'resetPasswordError';
        this.isSubmitting = false;
      },
    });
  }

  private isFormValid(): boolean {
    return this.resetPasswordForm.valid && !this.resetPasswordForm.hasError('mismatch');
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { mismatch: true };
  }
    navigateToHome(){
    this._router.navigate(['home']);
  }
}
