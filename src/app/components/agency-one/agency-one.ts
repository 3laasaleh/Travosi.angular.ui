import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CountUp } from 'countup.js';
import feather from 'feather-icons';

@Component({
  selector: 'app-agency-one',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './agency-one.html',
})
export class AgencyOne implements AfterViewInit {
  about = 'assets/images/about.jpg';
  map = 'assets/images/map-plane-big.png';

  @ViewChild('visitorCount') visitorCount!: ElementRef<HTMLElement>;
  @ViewChild('packageCount') packageCount!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    feather.replace();
    new CountUp(this.visitorCount.nativeElement, 4589, { startVal: 2100 }).start();
    new CountUp(this.packageCount.nativeElement, 50, { startVal: 1 }).start();
  }
}
