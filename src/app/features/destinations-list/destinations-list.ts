import { AfterViewInit, Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterOne } from '../../layout/footer-one/footer-one';

import feather from 'feather-icons';
import { destinations } from '../../data/data';
import { HomeNavbar } from '../../layout/home-navbar/home-navbar';
import { PaginationOne } from '../../shared/components/listing/tour-grid/pagination-one/pagination-one';
@Component({
  selector: 'app-destinations-list',
  imports: [RouterLink, HomeNavbar, PaginationOne, FooterOne],
  templateUrl: './destinations-list.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './destinations-list.scss',
})
export class DestinationsList implements AfterViewInit {
  bg = 'assets/images/bg/cta.jpg';
  destinations = destinations;

  ngAfterViewInit(): void {
    feather.replace();
  }
}
