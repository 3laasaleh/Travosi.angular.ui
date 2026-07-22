import { Component, ChangeDetectionStrategy } from '@angular/core';
import { destinations } from '../../../data/data';

@Component({
  selector: 'app-destinations-two',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './destinations-two.html',
})
export class DestinationsTwo {
  destinations = destinations;
}
