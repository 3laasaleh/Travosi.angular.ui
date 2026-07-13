import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';

@Component({
  selector: 'app-tour-sidebar',
  imports: [FormsModule],
  templateUrl: './tour-sidebar.html',
})
export class TourSidebar implements AfterViewInit {
  date: string | null = null;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
