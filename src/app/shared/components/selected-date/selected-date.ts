import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import feather from 'feather-icons';
import { DatePicker } from '../date-picker/date-picker';

@Component({
  selector: 'app-selected-date',
  imports: [FormsModule, DatePicker],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './selected-date.html',
})
export class SelectedDate implements AfterViewInit {
  date: string | null = null;
  date2: string | null = null;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
