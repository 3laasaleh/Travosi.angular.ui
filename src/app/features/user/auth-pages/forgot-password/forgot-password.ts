import { AfterViewInit, Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { ApiService } from '../../../../core/services/apiservice.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink,TranslatePipe,ReactiveFormsModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './forgot-password.html',
})
export class ForgotPassword implements AfterViewInit {
  _apiService = inject(ApiService);
  _router=inject(Router);
  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);

  resetPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required,Validators.email]],
  });
  isEmailSent: boolean=false;
  isSubmitting = false;
  errorMessage = '';
  messageSent: any;
  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
  navigateToHome(){
    this._router.navigate(['home']);
  }
  onSubmit(): void {
    if (this.isSubmitting) return;
    this.errorMessage = '';
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this._apiService
      .post('account/ForgetPassword', this.resetPasswordForm.getRawValue())
      .pipe(finalize(() => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }))
      .subscribe({ next: (res) => {
        this.isEmailSent=true;
        this.messageSent=res.message;
      }, error: () => {
        this.errorMessage = 'forgotPasswordError';
      } });
  }
}
