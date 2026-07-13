import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { helps } from '../../../data/data';

@Component({
  selector: 'app-helpcenter-support-comp',
  imports: [RouterLink],
  templateUrl: './helpcenter-support.html',
})
export class HelpcenterSupportComp implements AfterViewInit {
  helps = helps;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
