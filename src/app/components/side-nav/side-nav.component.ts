import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ISideNav } from 'src/app/interfaces/sidenav.interface';
import { AppService } from 'src/app/services/app.service';
import { SideNavList } from './nav-list';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  navListItems: ISideNav[] = [];
  currentUrl: string = '';
  userRole!: string;

  constructor(private router: Router, private appService: AppService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    this.userRole = this.appService.getSessionUser().role;
    this.navListItems = this.filterNavListByRole(SideNavList, this.userRole);
  }

  navigateScreens(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  isActive(path: string): boolean {
    return this.currentUrl.includes(path);
  }

  // Filter nav items based on user role
  filterNavListByRole(navList: ISideNav[], userRole: string): ISideNav[] {
    if (!userRole) {
      return [];
    }

    return navList.filter((item) => item.roles.includes(userRole));
  }
}
