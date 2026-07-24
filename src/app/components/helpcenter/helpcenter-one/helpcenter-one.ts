import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { helps, starts } from '../../../data/data';

@Component({
  selector: 'app-helpcenter-one',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-one.html',
})
export class HelpcenterOne implements AfterViewInit {
  helps = helps;
  starts = starts;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
