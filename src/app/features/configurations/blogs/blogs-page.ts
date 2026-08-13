import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogsFormCard } from './blogs-form-card/blogs-form-card';
import { BlogsList } from './blogs-list/blogs-list';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [BlogsFormCard, BlogsList],
  templateUrl: './blogs-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blogs {
  showForm = false;
  selectedBlog: any = null;
  refreshToken = 0;

  create(): void { this.selectedBlog = null; this.showForm = true; }
  edit(blog: any): void { this.selectedBlog = blog; this.showForm = true; }
  closeForm(): void { this.selectedBlog = null; this.showForm = false; }
  saved(): void { this.closeForm(); this.refreshToken++; }
}
