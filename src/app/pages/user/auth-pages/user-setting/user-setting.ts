import { AfterViewInit, Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import feather from 'feather-icons';
import { AccountTab } from '../../account-tab/account-tab';
import { FooterOne } from '../../../../layout/footer-one/footer-one';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiService } from '../../../../core/services/apiservice.service';
import { HomeNavbar } from '../../../../layout/home-navbar/home-navbar';

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

  currentUser: any;
  isPersonalSubmitting = false;
  isPasswordSubmitting = false;
  personalMessage = '';
  personalError = '';
  passwordMessage = '';
  passwordError = '';

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

    this.apiService.post('Account/UpdateProfile', payload).subscribe({
      next: () => {
        this.personalMessage = 'personalSaveSuccess';
        this.personalForm.markAsPristine();
        this.isPersonalSubmitting = false;
      },
      error: () => {
        this.personalError = 'personalSaveError';
        this.isPersonalSubmitting = false;
      },
    });
  }

  changePassword(): void {
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
    this.apiService.put('Account/ChangePassword', payload).subscribe({
      next: () => {
        this.passwordMessage = 'passwordSaveSuccess';
        this.passwordForm.reset();
        this.isPasswordSubmitting = false;
      },
      error: () => {
        this.passwordError = 'passwordSaveError';
        this.isPasswordSubmitting = false;
      },
    });
  }

  private passwordMatchValidator(form: any) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }
}
