import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import feather from 'feather-icons';
import { catchError, finalize, of } from 'rxjs';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../core/services/apiservice.service';
import { TaskNotificationsService } from '../../core/services/task-notifications.service';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../features/user/_services/auth.service';
import { CONFIGURATION_MENU_ITEMS } from '../configuration-menu-items';

@Component({
  selector: 'app-configurations-navbar',
  imports: [RouterLink, RouterLinkActive, DatePipe, TranslatePipe],
  templateUrl: './configurations-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationsNavbar implements OnInit, AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly taskNotifications = inject(TaskNotificationsService);
  private readonly destroyRef = inject(DestroyRef);
  readonly languageService = inject(LanguageService);

  constructor() {
    effect(() => {
      this.taskNotifications.changed();
      if (this.isAgent) this.loadAgentTasks();
    });
  }

  accountMenuOpen = false;
  mobileMenuOpen = false;
  notificationsOpen = false;
  languageMenuOpen = false;
  switchingLanguage: string | null = null;
  agentTasks: any[] = [];
  readonly menuItems = CONFIGURATION_MENU_ITEMS;

  get isAgent(): boolean {
    return this.authService.getCurrentUserRole() === 'Agent';
  }

  get pendingTasksCount(): number {
    return this.agentTasks.filter((notification) => notification?.isRead !== true).length;
  }

  get roleTranslationKey(): string {
    return this.isAgent ? 'agent' : 'administrator';
  }

  ngOnInit(): void {
    // if (this.isAgent) {
    //   timer(0, 30000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadAgentTasks());
    // }
  }

  loadAgentTasks(): void {
    this.apiService.get('Notifications/Mine?unreadOnly=false').pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe((response: any) => {
      if (response === null) return;
      const rows = response?.data ?? response;
      this.agentTasks = Array.isArray(rows) ? rows : [];
    });
  }

  markNotificationAsRead(notification: any): void {
    this.notificationsOpen = false;
    if (notification?.isRead === true || !notification?.id) return;
    notification.isRead = true;
    this.apiService.patch(`Notifications/${notification.id}/Read`, {}).pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe();
  }

  markAllNotificationsAsRead(): void {
    if (!this.pendingTasksCount) return;
    this.agentTasks.forEach((notification) => notification.isRead = true);
    this.apiService.patch('Notifications/ReadAll', {}).pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe();
  }

  toggleNotifications(event: MouseEvent): void {
    event.stopPropagation();
    this.notificationsOpen = !this.notificationsOpen;
    this.accountMenuOpen = false;
    if (this.notificationsOpen) this.loadAgentTasks();
    this.refreshIcons();
  }

  get currentLanguage(): string {
    return this.languageService.getCurrentLanguage();
  }

  localizedPath(path: string): string[] {
    return ['/', this.languageService.currentLanguage(), ...path.split('/').filter(Boolean)];
  }

  toggleLanguageMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.languageMenuOpen = !this.languageMenuOpen;
    this.accountMenuOpen = false;
    this.notificationsOpen = false;
    this.refreshIcons();
  }

  switchLanguage(language: string): void {
    if (this.switchingLanguage !== null) return;
    this.switchingLanguage = language;
    this.mobileMenuOpen = false;
    this.languageMenuOpen = false;
    this.closeMenus();
    this.cdr.markForCheck();
    this.languageService.setLanguageAndReload(language);
  }

  get userName(): string {
    const user = this.authService.getCurentUser();
    return [user?.firstName, user?.lastName].filter(Boolean).join(' ')
      || this.languageService.translate.instant('administrator');
  }

  get userEmail(): string {
    return this.authService.getCurentUser()?.email ?? '';
  }

  get profileImageUrl(): string | null {
    return this.authService.profileImageUrl();
  }

  get userInitials(): string {
    const initials = this.userName
      .split(' ')
      .slice(0, 2)
      .map((name) => name.charAt(0))
      .join('');

    return initials.toUpperCase() || 'A';
  }

  ngAfterViewInit(): void {
    this.refreshIcons();
  }

  toggleAccountMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.accountMenuOpen = !this.accountMenuOpen;
    this.mobileMenuOpen = false;
    this.languageMenuOpen = false;
    this.notificationsOpen = false;
    this.refreshIcons();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.accountMenuOpen = false;
    this.languageMenuOpen = false;
    this.notificationsOpen = false;
    this.refreshIcons();
  }

  closeMenus(): void {
    this.accountMenuOpen = false;
    this.mobileMenuOpen = false;
    this.notificationsOpen = false;
    this.languageMenuOpen = false;
  }

  logout(): void {
    this.closeMenus();
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  closeAccountMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.accountMenuOpen = false;
      this.notificationsOpen = false;
      this.languageMenuOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closeMenus();
  }

  private refreshIcons(): void {
    requestAnimationFrame(() => feather.replace());
    this.cdr.markForCheck();
  }
}
