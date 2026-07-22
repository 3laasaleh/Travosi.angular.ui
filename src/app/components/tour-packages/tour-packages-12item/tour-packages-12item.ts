import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { packageData } from '../../../data/data';

@Component({
  selector: 'app-tour-packages-12item',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './tour-packages-12item.html',
})
export class TourPackages12item implements AfterViewInit {
  packageData = packageData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
