import { AfterViewInit, Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';
import { ApiService } from '../../../../core/services/apiservice.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink,TranslatePipe,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './forgot-password.html',
})
export class ForgotPassword implements AfterViewInit {
  _apiService = inject(ApiService);
  _router=inject(Router);
  bg = 'assets/images/bg/6.jpg';
  logo = 'assets/images/main-logo.png';
  private readonly fb = inject(FormBuilder);

  resetPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required,Validators.email]],
  });
  isEmailSent: boolean=false;
  messageSent: any;
  ngAfterViewInit(): void {
    feather.replace();
  }
  navigateToHome(){
    this._router.navigate(['home']);
  }
  onSubmit() {
    this._apiService
      .post('account/ForgetPassword', this.resetPasswordForm.getRawValue())
      .subscribe({ next: (res) => {
        this.isEmailSent=true;
        this.messageSent=res.message;

      }, error(err) {

      } });
  }
}
