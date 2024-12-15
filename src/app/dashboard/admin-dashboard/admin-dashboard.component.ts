import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  allUsers: number = 0;
  userStats: any = {};
  inspectionStats: any = {};
  issueStats: any = {};
  airports: number = 0;
  inspections: number = 0;
  issues: number = 0;
  taxiways: number = 0;

  isLoading: boolean = false;
  isUserStatsLoading: boolean = false;
  isInspectionsStatsLoading: boolean = false;
  isIssuesStatsLoading: boolean = false;

  constructor(public appService: AppService) {}

  ngOnInit() {
    this.fetchSummary();
    this.fetchInspectionsStats();
    this.fetchIssuesStats();
    this.fetchUserStats();
  }

  fetchSummary() {
    this.isLoading = true;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/dashboard/summary`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.allUsers = res.users;
            this.airports = res.airports;
            this.inspections = res.inspections;
            this.issues = res.issues;
          } else {
            this.appService.showSnackBarMessage(response.Message);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(err)
          );
        },
      });
  }

  fetchUserStats() {
    this.isUserStatsLoading = true;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/dashboard/users/stats`)
      .subscribe({
        next: (response) => {
          this.isUserStatsLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.userStats = res;
          } else {
            this.appService.showSnackBarMessage(response.Message);
          }
        },
        error: (err) => {
          this.isUserStatsLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(err)
          );
        },
      });
  }

  fetchInspectionsStats() {
    this.isInspectionsStatsLoading = true;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/dashboard/inspections/stats`)
      .subscribe({
        next: (response) => {
          this.isInspectionsStatsLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.inspectionStats = res;
          } else {
            this.appService.showSnackBarMessage(response.Message);
          }
        },
        error: (err) => {
          this.isInspectionsStatsLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(err)
          );
        },
      });
  }

  fetchIssuesStats() {
    this.isIssuesStatsLoading = true;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/dashboard/issues/stats`)
      .subscribe({
        next: (response) => {
          this.isIssuesStatsLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.issueStats = res;
          } else {
            this.appService.showSnackBarMessage(response.Message);
          }
        },
        error: (err) => {
          this.isIssuesStatsLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(err)
          );
        },
      });
  }
}
