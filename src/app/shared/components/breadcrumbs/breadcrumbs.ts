import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BreadcrumbService } from '../../../core/services/breadcrumb.service';

/**
 * Localized breadcrumb trail (en/ar, RTL aware) for every page except the home page.
 * The trail itself comes from BreadcrumbService, which also feeds the BreadcrumbList schema.
 */
@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './breadcrumbs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs {
  private readonly breadcrumbs = inject(BreadcrumbService);

  /** `light` sits on a page background, `dark` sits on top of a dark hero image. */
  readonly theme = input<'light' | 'dark'>('light');
  /** Renders without the surrounding container so it can be dropped inside an existing one. */
  readonly bare = input(false, { transform: (value: boolean | string) => value !== false && value !== 'false' });

  readonly items = this.breadcrumbs.items;
  readonly isVisible = computed(() => this.items().length > 1);
  readonly onDark = computed(() => this.theme() === 'dark');
}
