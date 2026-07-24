import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';

@Component({
  selector: 'app-switcher-one',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './switcher-one.html',
})
export class SwitcherOne implements AfterViewInit, OnDestroy {
  @Input() switcherBack = false;

  showTopButton = false;

  private htmlTag = document.getElementsByTagName('html')[0];

  ngAfterViewInit(): void {
    feather.replace();
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  handleScroll(): void {
    this.showTopButton =
      document.body.scrollTop >= 400 || document.documentElement.scrollTop >= 400;
  }

  changeThem(event: Event): void {
    const target = event.target as HTMLElement;
    this.htmlTag.dir = target.innerText === 'LTR' ? 'ltr' : 'rtl';
  }

  changeMode(): void {
    if (this.htmlTag.className.includes('dark')) {
      this.htmlTag.className = 'light';
    } else {
      this.htmlTag.className = 'dark';
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
