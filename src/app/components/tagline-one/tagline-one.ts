import { AfterViewInit, Component } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-tagline-one',
  templateUrl: './tagline-one.html',
})
export class TaglineOne implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();
  }
}
