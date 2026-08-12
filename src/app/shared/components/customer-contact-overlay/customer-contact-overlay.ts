import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-customer-contact-overlay',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './customer-contact-overlay.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerContactOverlay {
  private readonly router = inject(Router);

  readonly phoneDisplay = '+20 115 501 1300';
  readonly phoneUrl = 'tel:+201155011300';
  readonly whatsappUrl = 'https://wa.me/201155011300';
  readonly instagramUrl = 'https://www.instagram.com/seaworldholidays1/';
  readonly facebookUrl = 'https://www.facebook.com/seaworldholidays1/';

  readonly isCustomerPage = signal(true);
  readonly modalOpen = signal(false);

  private hasShownExitIntent = false;

  constructor() {
    this.updateRoute(this.router.url);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.updateRoute(event.urlAfterRedirects));
  }

  @HostListener('document:mouseout', ['$event'])
  showHomeExitIntent(event: MouseEvent): void {
    const isLeavingViewport = event.relatedTarget === null && event.clientY <= 8;
    if (
      !isLeavingViewport ||
      !this.isCustomerPage() ||
      this.modalOpen() ||
      this.hasShownExitIntent
    ) return;

    this.hasShownExitIntent = true;
    this.modalOpen.set(true);
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.modalOpen()) this.closeModal();
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  private updateRoute(url: string): void {
    const currentPath = url.split(/[?#]/, 1)[0] || '/';
    const customerPage = !currentPath.startsWith('/configurations');
    this.isCustomerPage.set(customerPage);
    if (!customerPage && this.modalOpen()) this.closeModal();
  }
}
