import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { packageData } from '../../../data/data';

@Component({
  selector: 'app-tour-packages-slider',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './tour-packages-slider.html',
})
export class TourPackagesSlider implements AfterViewInit {
  packageData = packageData.slice(0, 6);

  ngAfterViewInit(): void {
    feather.replace();
  }
}
