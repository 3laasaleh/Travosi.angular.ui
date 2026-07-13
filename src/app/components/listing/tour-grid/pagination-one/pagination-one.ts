import { AfterViewInit, Component } from '@angular/core';
import feather from 'feather-icons';

@Component({
  selector: 'app-pagination-one',
  templateUrl: './pagination-one.html',
})
export class PaginationOne implements AfterViewInit {
  ngAfterViewInit(): void {
    feather.replace();
  }
}
