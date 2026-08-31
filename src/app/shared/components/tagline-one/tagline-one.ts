import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-tagline-one',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './tagline-one.html',
})
export class TaglineOne implements AfterViewInit {
  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
