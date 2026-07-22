import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-pagination-one',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './pagination-one.html',
})
export class PaginationOne implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();
  }
}
