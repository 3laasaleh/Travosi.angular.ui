import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { packageData } from '../../../data/data';

@Component({
  selector: 'app-tour-packages-8item',
  imports: [RouterLink],
  templateUrl: './tour-packages-8item.html',
})
export class TourPackages8item implements AfterViewInit {
  packageData = packageData.slice(0, 8);

  ngAfterViewInit(): void {
    feather.replace();
  }
}
