import { AfterViewInit, Component } from '@angular/core';
import feather from 'feather-icons';
import { teamData } from '../../data/data';

@Component({
  selector: 'app-team-one',
  templateUrl: './team-one.html',
})
export class TeamOne implements AfterViewInit {
  teamData = teamData;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
