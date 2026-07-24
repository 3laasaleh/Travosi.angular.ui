import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../user/auth-pages/_services/auth.service';
import { SidebarMenu } from '../../layout/sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarMenu],
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
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
    }
  }
}
