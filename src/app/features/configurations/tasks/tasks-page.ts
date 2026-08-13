import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { TasksFromCard } from './tasks-from-card/tasks-from-card';
import { TasksList } from './tasks-list/tasks-list';
import { AuthService } from '../../user/_services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ TranslatePipe, TasksFromCard, TasksList],
  templateUrl: './tasks-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tasks {
  private authService = inject(AuthService);

  viewMode: 'table' | 'grid' = 'table';
  selectedTask: any = null;
  refreshToken = 0;

  get isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'Admin';
  }

  showForm = false;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedTask = null;
  }

  selectTaskForEdit(task: any): void {
    this.selectedTask = task;
    this.showForm = true;
  }

  clearSelectedTask(): void {
    this.selectedTask = null;
    this.showForm = false;
  }

  handleTaskSaved(): void {
    this.selectedTask = null;
    this.showForm = false;
    this.refreshToken++;
  }
}
