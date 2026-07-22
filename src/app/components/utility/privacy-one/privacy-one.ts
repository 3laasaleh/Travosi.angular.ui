import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-privacy-one',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './privacy-one.html',
})
export class PrivacyOne {
  data = [
    'Digital Marketing Solutions for Tomorrow',
    'Our Talented & Experienced Marketing Agency',
    'Create your own skin to match your brand',
    'Digital Marketing Solutions for Tomorrow',
    'Our Talented & Experienced Marketing Agency',
    'Create your own skin to match your brand',
  ];
}
