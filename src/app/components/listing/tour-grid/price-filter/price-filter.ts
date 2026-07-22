import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './price-filter.html',
})
export class PriceFilter {
  rangeValues: number[] = [50, 120];
  numberValues: number[] = [50, 120];

  updateNumbers(): void {
    const [slide1, slide2] = this.rangeValues.map(Number);
    if (slide1 > slide2) {
      this.numberValues = [slide2, slide1];
    } else {
      this.numberValues = [slide1, slide2];
    }
  }

  updateSliders(): void {
    const [number1, number2] = this.numberValues.map(Number);
    if (number1 > number2) {
      this.rangeValues = [number2, number1];
    } else {
      this.rangeValues = [number1, number2];
    }
  }
}
