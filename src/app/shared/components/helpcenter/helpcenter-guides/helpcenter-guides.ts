import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { guidesData } from '../../../../data/data';

@Component({
  selector: 'app-helpcenter-guides-comp',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-guides.html',
})
export class HelpcenterGuidesComp implements AfterViewInit {
  guidesData = guidesData;

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
