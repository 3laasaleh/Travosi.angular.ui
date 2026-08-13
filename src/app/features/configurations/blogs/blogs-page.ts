import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BlogsFormCard } from './blogs-form-card/blogs-form-card';
import { BlogsList } from './blogs-list/blogs-list';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogsFormCard, BlogsList, TranslatePipe],
  templateUrl: './blogs-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blogs {
  viewMode: 'table' | 'grid' = 'table';
  showForm = false;
  selectedBlog: any = null;
  refreshToken = 0;

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.selectedBlog = null;
  }

  edit(blog: any): void { this.selectedBlog = blog; this.showForm = true; }
  closeForm(): void { this.selectedBlog = null; this.showForm = false; }
  saved(): void { this.closeForm(); this.refreshToken++; }
}
