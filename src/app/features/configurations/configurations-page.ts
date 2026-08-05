import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../user/_services/auth.service';
import { SidebarMenu } from '../../layout/sidebar-menu/sidebar-menu';
import { ConfigurationsNavbar } from '../../layout/admin-navbar/configurations-navbar';

@Component({
  selector: 'app-configurations-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarMenu,ConfigurationsNavbar],
  templateUrl: './configurations-page.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './configurations-page.scss',
})
export class ConfigurationsPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {

  }
}
