import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CountUp } from 'countup.js';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agency-one',
  imports: [TranslatePipe, RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './agency-one.html',
})
export class AgencyOne implements AfterViewInit, OnChanges {
  about = 'assets/images/about.jpg';
  map = 'assets/images/map-plane-big.png';
  @Input() visitorTotal = 4589;
  @Input() packageTotal = 50;

  @ViewChild('visitorCount') visitorCount!: ElementRef<HTMLElement>;
  @ViewChild('packageCount') packageCount!: ElementRef<HTMLElement>;
  private visitorCounter?: CountUp;
  private packageCounter?: CountUp;

  ngAfterViewInit(): void {
    feather.replace();
    this.visitorCounter = new CountUp(this.visitorCount.nativeElement, this.visitorTotal, {
      startVal: 0,
    });
    this.packageCounter = new CountUp(this.packageCount.nativeElement, this.packageTotal, {
      startVal: 0,
    });
    this.visitorCounter.start();
    this.packageCounter.start();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visitorTotal']) this.visitorCounter?.update(this.visitorTotal);
    if (changes['packageTotal']) this.packageCounter?.update(this.packageTotal);
  }
}
