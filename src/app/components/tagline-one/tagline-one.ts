import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-tagline-one',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './tagline-one.html',
})
export class TaglineOne implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();
  }
}
