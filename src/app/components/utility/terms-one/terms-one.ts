import { Component } from '@angular/core';
import { datas } from '../../../data/data';

@Component({
  selector: 'app-terms-one',
  templateUrl: './terms-one.html',
})
export class TermsOne {
  datas = datas;
  activeIndex = 1;

  handleclick(id: number): void {
    this.activeIndex = id;
  }
}
