import { AfterViewInit, Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';
import { SwitcherOne } from '../../../../components/switcher-one/switcher-one';

@Component({
  selector: 'app-maintenance-page',
  imports: [SwitcherOne],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './maintenance-page.html',
})
export class MaintenancePage implements AfterViewInit, OnDestroy {
  bg = 'assets/images/bg/cta.jpg';
  logo = 'assets/images/logo-light.png';

  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngAfterViewInit(): void {
    feather.replace();

    const duration = 60 * 60;
    const display = document.querySelector('#maintenance');
    if (display) {
      this.startTimer(duration, display as HTMLElement);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private startTimer(duration: number, display: HTMLElement): void {
    let timer = duration;
    this.intervalId = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = Math.floor(timer % 60);

      const mm = minutes < 10 ? '0' + minutes : String(minutes);
      const ss = seconds < 10 ? '0' + seconds : String(seconds);

      display.textContent = mm + ':' + ss;

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }
}
