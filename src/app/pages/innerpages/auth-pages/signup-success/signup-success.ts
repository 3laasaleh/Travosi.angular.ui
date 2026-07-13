import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-success',
  imports: [RouterLink],
  templateUrl: './signup-success.html',
})
export class SignupSuccess {
  year = new Date().getFullYear();
}
