import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../user/_services/auth.service';
import { SidebarMenu } from '../../layout/sidebar-menu/sidebar-menu';
import { AdminNavbar } from '../../layout/admin-navbar/admin-navbar';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarMenu, AdminNavbar],
  templateUrl: './admin-page.html',
  changeDetection:ChangeDetectionStrategy.OnPush,
  styleUrl: './admin-page.scss',
})
export class AdminPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {

  }
}
