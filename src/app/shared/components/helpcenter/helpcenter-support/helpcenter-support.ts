import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { helps } from '../../../../data/data';

@Component({
  selector: 'app-helpcenter-support-comp',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './helpcenter-support.html',
})
export class HelpcenterSupportComp implements AfterViewInit {
  helps = helps;

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') feather.replace();
  }
}
