import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PaginationInfoDTO } from '../destinations-page';

@Component({
  selector: 'app-admin-destinations-list',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './destinations-list.html',
  styles: `
    td .flex button,
    article .flex button {
      transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease;
    }

    td .flex button:first-child:hover,
    article .flex button:first-child:hover {
      border-color: #0d9488;
      background-color: #0d9488;
      color: #fff;
    }

    td .flex button:nth-child(2),
    article .flex button:nth-child(2) {
      border-color: #fcd34d;
      color: #d97706;
    }

    td .flex button:nth-child(2):hover,
    article .flex button:nth-child(2):hover {
      border-color: #f59e0b;
      background-color: #f59e0b;
      color: #fff;
    }

    td .flex button:nth-child(3):hover,
    article .flex button:nth-child(3):hover {
      border-color: #e11d48;
      background-color: #e11d48;
      color: #fff;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationsList {
  @Input() destinations: any[] = [];
  @Input() viewMode: 'table' | 'grid' = 'table';
  @Input() isLoading = false;
  @Input({ required: true }) paginationInfo!: PaginationInfoDTO;
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() previewRequested = new EventEmitter<any>();
  @Output() editRequested = new EventEmitter<any>();
  @Output() deactivateRequested = new EventEmitter<any>();

  getImages(destination: any): any[] {
    if (Array.isArray(destination?.images)) return destination.images;
    return destination?.imageUrl ? [{ url: destination.imageUrl }] : [];
  }

  imageUrl(image: any): string {
    return typeof image === 'string' ? image : (image?.url ?? image?.imageUrl ?? image?.path ?? '');
  }
}
