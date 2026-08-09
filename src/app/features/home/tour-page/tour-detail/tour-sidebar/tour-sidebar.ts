import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tour-sidebar',
  imports: [FormsModule, TranslatePipe],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './tour-sidebar.html',
})
export class TourSidebar implements AfterViewInit {
  date: string | null = null;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
