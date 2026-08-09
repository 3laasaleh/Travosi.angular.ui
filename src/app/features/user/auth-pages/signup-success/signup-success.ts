import { AfterViewInit, Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-success',
  imports: [RouterLink, TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './signup-success.html',
})
export class SignupSuccess implements OnInit {
  private readonly route = inject(ActivatedRoute);

  year = new Date().getFullYear();
  title = 'success';
  message = 'accountCreatedActivationRequired';
  buttonText = 'continue';
  redirectLink = '/';

  ngOnInit(): void {
    const status = this.route.snapshot.queryParamMap.get('status');

    if (status === 'activated') {
      this.title = 'activated';
      this.message = 'accountActivatedSignin';
      this.buttonText = 'signin';
      this.redirectLink = '/login';
    } else if (status === 'registered') {
      this.title = 'success';
      this.message = 'accountCreatedActivationRequired';
      this.buttonText = 'continue';
      this.redirectLink = '/';
    }
  }
}
