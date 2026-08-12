import { AfterViewInit, Component, inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { AuthService } from '../../_services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { IGenericResponse } from '../../../../core/models/genericReponse.model';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../../../core/services/apiservice.service';
import { CustomerTypeEnum } from '../../../configurations/customers/customer-type.enum';
import { DatePicker } from '../../../../shared/components/date-picker/date-picker';

interface RegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  nationalityId: number;
  gender: number;
  customerType: CustomerTypeEnum;
  companyName: string | null;
  passportNumber: string | null;
}

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe, DatePicker],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-page.html',
})
export class SignupPage implements OnInit, AfterViewInit {
  private readonly fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly apiService = inject(ApiService);

  readonly customerTypeEnum = CustomerTypeEnum;
  readonly customerTypes = [
    { value: CustomerTypeEnum.Individual, label: 'individual' },
    { value: CustomerTypeEnum.Couple, label: 'couple' },
    { value: CustomerTypeEnum.Family, label: 'family' },
    { value: CustomerTypeEnum.Company, label: 'company' },
  ];
  readonly genders = [
    { value: 0, label: 'male' },
    { value: 1, label: 'female' },
  ];
  readonly maxBirthDate = new Date().toISOString().slice(0, 10);
  countries: any[] = [];
  countriesLoading = false;

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
      nationalityId: [null as number | null, Validators.required],
      gender: [0, Validators.required],
      customerType: [CustomerTypeEnum.Individual, Validators.required],
      companyName: [''],
      passportNumber: ['', Validators.maxLength(20)],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  ngOnInit(): void {
    this.loadCountries();
    this.signupForm.controls.customerType.valueChanges.subscribe((type) => {
      const companyName = this.signupForm.controls.companyName;
      if (type === CustomerTypeEnum.Company) companyName.setValidators([Validators.required, Validators.maxLength(200)]);
      else {
        companyName.clearValidators();
        companyName.setValue('');
      }
      companyName.updateValueAndValidity();
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
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
      nationalityId: Number(this.signupForm.controls.nationalityId.value),
      gender: Number(this.signupForm.controls.gender.value),
      customerType: this.signupForm.controls.customerType.value,
      companyName: this.signupForm.controls.customerType.value === CustomerTypeEnum.Company
        ? this.signupForm.controls.companyName.value.trim()
        : null,
      passportNumber: this.signupForm.controls.passportNumber.value.trim() || null,
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

  private loadCountries(): void {
    this.countriesLoading = true;
    this.apiService.getUnauthntecated('Countries/GetAll?page=1&pageSize=500').pipe(
      catchError(() => {
        this.errorMessage = 'countriesLoadError';
        return of(null);
      }),
      finalize(() => {
        this.countriesLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe((response: any) => {
      const page = response?.data ?? response;
      const rows = page?.data ?? page?.items ?? page;
      this.countries = (Array.isArray(rows) ? rows : []).filter((country) => country?.isActive !== false);
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
