import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { packageData } from '../../../data/data';

@Component({
  selector: 'app-tour-packages',
  imports: [RouterLink],
  templateUrl: './tour-packages.html',
})
export class TourPackages implements AfterViewInit {
  packageData = packageData.slice(0, 8);

  ngAfterViewInit(): void {
    feather.replace();
  }
}
