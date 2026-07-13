import { Component } from '@angular/core';
import { destinations } from '../../../data/data';

@Component({
  selector: 'app-destinations-two',
  templateUrl: './destinations-two.html',
})
export class DestinationsTwo {
  destinations = destinations;
}
