import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { datas, datas2, datas3, datas4 } from '../../../data/data';

@Component({
  selector: 'app-helpcenter-faqs-comp',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './helpcenter-faqs.html',
})
export class HelpcenterFaqsComp implements AfterViewInit {
  datas = datas;
  datas2 = datas2;
  datas3 = datas3;
  datas4 = datas4;

  activeIndex = 1;
  activeIndex2 = 1;
  activeIndex3 = 1;
  activeIndex4 = 1;

  ngAfterViewInit(): void {
    feather.replace();
  }

  handleclick(id: number): void {
    this.activeIndex = id;
  }
  handleclick2(id: number): void {
    this.activeIndex2 = id;
  }
  handleclick3(id: number): void {
    this.activeIndex3 = id;
  }
  handleclick4(id: number): void {
    this.activeIndex4 = id;
  }
}
