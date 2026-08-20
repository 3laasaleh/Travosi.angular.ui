import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ContactMessagesList } from './contact-messages-list/contact-messages-list';

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [TranslatePipe, ContactMessagesList],
  templateUrl: './contact-messages-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMessages {
  readonly readFilters: ReadonlyArray<'all' | 'unread' | 'read'> = ['all', 'unread', 'read'];
  viewMode: 'table' | 'grid' = 'table';
  readFilter: 'all' | 'unread' | 'read' = 'all';
  refreshToken = 0;

  setReadFilter(filter: 'all' | 'unread' | 'read'): void {
    this.readFilter = filter;
  }

  refresh(): void {
    this.refreshToken++;
  }
}
