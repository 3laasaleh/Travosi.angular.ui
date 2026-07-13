import { AfterViewInit, Component } from '@angular/core';
import feather from 'feather-icons';
import { datas } from '../../../data/data';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.html',
})
export class TourDetail implements AfterViewInit {
  datas = datas;
  activeIndex = 1;

  ngAfterViewInit(): void {
    feather.replace();
  }

  handleclick(id: number): void {
    this.activeIndex = id;
  }
}
