import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import feather from 'feather-icons';
import { AuthService } from '../../features/user/_services/auth.service';

@Component({
  selector: 'app-navbar-one',
  imports: [RouterLink],
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar-one.html',
})
export class NavbarOne implements OnInit, AfterViewInit {
  @Input() menuLight = '';
  @Input() tagLine = '';
  @Input() searchMenu = '';
  @Input() navLight = false;

  logoDark = 'assets/images/logo-dark.png';
  logoLight = 'assets/images/logo-light.png';
  logoWhite = 'assets/images/logo-light.png';
  user = 'assets/images/client/16.jpg';

  toggle = false;
  activeMenu = '';
  menuOpen = '';
  searchmenu = false;
  account = false;
  _authService =inject(AuthService);
 isLoggedIn:boolean=false;

  constructor(private router: Router) {
   this.isLoggedIn =this._authService.getCurentUser() ? true:false;
  }

  ngOnInit(): void {
    this.activeMenu = this.router.url.split('?')[0];
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    feather.replace();
  }

  handler(): void {
    this.toggle = !this.toggle;
  }

  toggleParagraph(): void {
    this.searchmenu = !this.searchmenu;
  }

  toggleParagraph3(): void {
    this.account = !this.account;
  }

  submenu(item: string): void {
    this.menuOpen = this.menuOpen === item ? '' : item;
  }

  isActive(paths: string[]): boolean {
    return paths.includes(this.activeMenu);
  }

  isOpen(paths: string[]): boolean {
    return paths.includes(this.menuOpen);
  }

  @HostListener('window:scroll')
  handleScroll(): void {
    const navbar = document.getElementById('topnav');
    if (!navbar) return;
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
      navbar.classList.add('nav-sticky');
    } else {
      navbar.classList.remove('nav-sticky');
    }
  }
  onLogout(){
    this._authService.logout();
  }


}
