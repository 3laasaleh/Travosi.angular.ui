import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import feather from 'feather-icons';
import { catchError, finalize, of } from 'rxjs';
import { ApiService } from '../../core/services/apiservice.service';
import { TaskNotificationsService } from '../../core/services/task-notifications.service';
import { LanguageService } from '../../core/services/language.service';
import { TaskStatusEnum } from '../../features/configurations/tasks/task-status.enum';
import { AuthService } from '../../features/user/_services/auth.service';

@Component({
  selector: 'app-configurations-navbar',
  imports: [RouterLink, DatePipe, TranslatePipe],
  templateUrl: './configurations-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationsNavbar implements OnInit, AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly taskNotifications = inject(TaskNotificationsService);
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
  readonly taskStatusEnum = TaskStatusEnum;

  get isAgent(): boolean {
    return this.authService.getCurrentUserRole() === 'Agent';
  }

  get pendingTasksCount(): number {
    return this.agentTasks.filter((task) => {
      const status = Number(task.status);
      return status === TaskStatusEnum.Pending || status === TaskStatusEnum.Returned;
    }).length;
  }

  ngOnInit(): void {}

  loadAgentTasks(): void {
    this.apiService.get('Tasks/GetAgentTasks?page=1&pageSize=50').pipe(
      catchError(() => of(null)),
      finalize(() => this.cdr.markForCheck()),
    ).subscribe((response: any) => {
      if (response === null) return;
      const pageData = response?.data ?? response;
      const rows = pageData?.data ?? pageData?.items ?? pageData?.tasks ?? pageData;
      this.agentTasks = Array.isArray(rows) ? rows : [];
    });
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
    this.languageService.setGLobalLanguage(language).pipe(
      finalize(() => {
        this.switchingLanguage = null;
        this.closeMenus();
        this.cdr.markForCheck();
      }),
    ).subscribe({ error: () => {} });
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
    this.refreshIcons();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
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

  private refreshIcons(): void {
    requestAnimationFrame(() => feather.replace());
  }
}
