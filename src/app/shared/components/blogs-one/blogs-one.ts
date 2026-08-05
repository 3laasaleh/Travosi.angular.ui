import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { blogData } from '../../../data/data';

@Component({
  selector: 'app-blogs-one',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './blogs-one.html',
})
export class BlogsOne implements AfterViewInit {
  blogData = blogData.slice(0, 3);

  ngAfterViewInit(): void {
    feather.replace();
  }
}
