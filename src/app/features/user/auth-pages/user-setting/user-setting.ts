import { AfterViewInit, Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import feather from 'feather-icons';
import { AccountTab } from '../../account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../../core/services/apiservice.service';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-setting',
  imports: [HomeNavbar, AccountTab, FooterOne, ReactiveFormsModule, TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './user-setting.html',
})
export class UserSetting implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  public _authService = inject(AuthService);
  public _route = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  currentUser: any;
  isPersonalSubmitting = false;
  isPasswordSubmitting = false;
  personalMessage = '';
  personalError = '';
  passwordMessage = '';
  passwordError = '';
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  personalForm = this.fb.nonNullable.group({
    firstName: [''],
    lastName: [''],
    email: [{ value: '', disabled: true }, ],
    phone: [''],
  });

  passwordForm = this.fb.nonNullable.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, { validators: this.passwordMatchValidator });

  constructor() {
    const user = this._authService.getCurentUser();
    if (!user) {
      this._route.navigate(['login']);
      return;
    }

    this.currentUser = user;
    this.personalForm.patchValue({
      firstName: user?.firstName??'' ,
      lastName: user?.lastName ?? '',
      phone: user?.mobile ?? '',
      email:user?.email??"",
    });
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  savePersonalDetails(): void {
    if (this.isPersonalSubmitting) return;
    this.personalMessage = '';
    this.personalError = '';

    if (this.personalForm.invalid) {
      this.personalForm.markAllAsTouched();
      return;
    }

    this.isPersonalSubmitting = true;
    const payload = {
      firstName: this.personalForm.value.firstName,
      lastName: this.personalForm.value.lastName,
      phone: this.personalForm.value.phone,
    };

    this.apiService.post('Account/UpdateProfile', payload).pipe(
      finalize(() => {
        this.isPersonalSubmitting = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: () => {
        this.personalMessage = 'personalSaveSuccess';
        this.personalForm.markAsPristine();
      },
      error: () => {
        this.personalError = 'personalSaveError';
      },
    });
  }

  changePassword(): void {
    if (this.isPasswordSubmitting) return;
    this.passwordMessage = '';
    this.passwordError = '';

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const payload = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword,
      confirmPassword: this.passwordForm.value.confirmPassword,
    };

    this.isPasswordSubmitting = true;
    this.apiService.put('Account/ChangePassword', payload).pipe(
      finalize(() => {
        this.isPasswordSubmitting = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: () => {
        this.passwordMessage = 'passwordSaveSuccess';
        this.passwordForm.reset();
      },
      error: () => {
        this.passwordError = 'passwordSaveError';
      },
    });
  }

  private passwordMatchValidator(form: any) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }
}
