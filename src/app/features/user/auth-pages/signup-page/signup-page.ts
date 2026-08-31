import { AfterViewInit, Component, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { AuthService } from '../../_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';
import { finalize } from 'rxjs';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';

interface RegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: number;
  passportNumber: string;
}

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, DatePicker],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-page.html',
})
export class SignupPage implements AfterViewInit {
  private readonly fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly genders = [
    { value: 0, label: 'male' },
    { value: 1, label: 'female' },
  ];
  readonly maxBirthDate = new Date().toISOString().slice(0, 10);

  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signupForm = this.fb.nonNullable.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: [0, Validators.required],
      passportNumber: ['', [Validators.maxLength(20),Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
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
      dateOfBirth: this.signupForm.controls.dateOfBirth.value,
      gender: Number(this.signupForm.controls.gender.value),
      passportNumber: this.signupForm.controls.passportNumber.value.trim(),
    };

    this.isSubmitting = true;

    this._authService.registeration(payload).pipe(
      finalize(() => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (res: IGenericResponse<string>) => {
        if(res.isSuccess){
        this.successMessage = res.data ?? 'signupCompleted';
        this.router.navigateByUrl('/login');
        }
        else{
        this.errorMessage = res.message ?? 'signupFailed';
        }
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || error?.message || 'registrationFailed';
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
