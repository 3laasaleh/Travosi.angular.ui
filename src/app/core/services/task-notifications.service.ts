import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskNotificationsService {
  readonly changed = signal(0);

  notifyChanged(): void {
    this.changed.update((value) => value + 1);
  }
}
