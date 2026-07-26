import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { AuthService } from '../../pages/user/_services/auth.service';
import { ApiService } from '../../core/services/apiservice.service';
import { TaskStatusEnum } from '../../pages/admin/tasks/task-status.enum';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink, DatePipe, TranslatePipe],
  templateUrl: './admin-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNavbar implements OnInit, AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly apiService = inject(ApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  readonly languageService = inject(LanguageService);

  accountMenuOpen = false;
  mobileMenuOpen = false;
  notificationsOpen = false;
  languageMenuOpen = false;
  agentTasks: any[] = [];
  readonly taskStatusEnum = TaskStatusEnum;

  get isAgent(): boolean {
    return this.authService.getCurrentUserRole() === 'Agent';
  }

  get pendingTasksCount(): number {
    return this.agentTasks.filter((task) => Number(task.status) === TaskStatusEnum.Pending).length;
  }

  ngOnInit(): void {
    if (this.isAgent) this.loadAgentTasks();
  }

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
  }

  switchLanguage(language: string): void {
    this.languageService.setGLobalLanguage(language).subscribe({ error: () => {} });
    this.closeMenus();
  }

  get userName(): string {
    const user = this.authService.getCurentUser();
    return [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Administrator';
  }

  get userEmail(): string {
    return this.authService.getCurentUser()?.email ?? '';
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
