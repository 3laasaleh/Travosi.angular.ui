import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-comingsoon-page',
  imports: [RouterLink, SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './comingsoon-page.html',
})
export class ComingsoonPage implements OnInit, AfterViewInit, OnDestroy {
  bg = 'assets/images/bg/cta.jpg';
  logo = 'assets/images/logo-icon.png';

  date1 = new Date().getFullYear();
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private countDownToTime = new Date('Sep 26, 2026 00:00:00').getTime();
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.tickTock();
    this.intervalId = setInterval(() => this.tickTock(), 1000);
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private tickTock(): void {
    const currentDate = new Date();
    const now = currentDate.getTime();
    const difference = this.countDownToTime - now;
    const totalDays = difference / (1000 * 60 * 60 * 24);

    this.days = Math.floor(totalDays);
    this.hours = 23 - currentDate.getHours();
    this.minutes = 60 - currentDate.getMinutes();
    this.seconds = 60 - currentDate.getSeconds();
  }
}
