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
  readonly hasPendingDestination = signal(false);

  private pendingUrl = '';
  private pendingTarget = '';
  private hasShownExitIntent = false;
  private currentPath = '/';

  constructor() {
    this.updateRoute(this.router.url);
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.updateRoute(event.urlAfterRedirects));
  }

  @HostListener('document:click', ['$event'])
  interceptExternalLink(event: MouseEvent): void {
    if (!this.isCustomerPage() || event.defaultPrevented || event.button !== 0) return;

    const source = event.target instanceof Element ? event.target : null;
    const link = source?.closest<HTMLAnchorElement>('a[href]');
    if (!link || link.hasAttribute('data-exit-bypass') || link.hasAttribute('download')) return;

    const url = new URL(link.href, window.location.href);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin === window.location.origin) return;

    event.preventDefault();
    this.pendingUrl = url.href;
    this.pendingTarget = link.target;
    this.hasPendingDestination.set(true);
    this.modalOpen.set(true);
  }

  @HostListener('document:mouseout', ['$event'])
  showHomeExitIntent(event: MouseEvent): void {
    const isLeavingViewport = event.relatedTarget === null && event.clientY <= 8;
    if (
      !isLeavingViewport ||
      !this.isCustomerPage() ||
      !this.isHomePage ||
      this.modalOpen() ||
      this.hasShownExitIntent
    ) return;

    this.hasShownExitIntent = true;
    this.pendingUrl = '';
    this.pendingTarget = '';
    this.hasPendingDestination.set(false);
    this.modalOpen.set(true);
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.modalOpen()) this.closeModal();
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.hasPendingDestination.set(false);
    this.pendingUrl = '';
    this.pendingTarget = '';
  }

  leaveSite(): void {
    if (!this.pendingUrl) {
      this.closeModal();
      return;
    }

    const url = this.pendingUrl;
    const target = this.pendingTarget;
    this.modalOpen.set(false);
    this.pendingUrl = '';
    this.pendingTarget = '';
    this.hasPendingDestination.set(false);

    if (target === '_blank') {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    window.location.assign(url);
  }

  private updateRoute(url: string): void {
    this.currentPath = url.split(/[?#]/, 1)[0] || '/';
    const customerPage = !this.currentPath.startsWith('/configurations');
    this.isCustomerPage.set(customerPage);
    if (!customerPage && this.modalOpen()) this.closeModal();
  }

  private get isHomePage(): boolean {
    return this.currentPath === '/' || this.currentPath === '/home';
  }
}
