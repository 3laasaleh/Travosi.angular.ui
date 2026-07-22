import { Component, ChangeDetectionStrategy } from '@angular/core';
import { datas } from '../../data/data';

@Component({
  selector: 'app-asked-questions',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './asked-questions.html',
})
export class AskedQuestions {
  datas = datas;
  activeIndex = 1;

  handleclick(id: number): void {
    this.activeIndex = id;
  }
}
