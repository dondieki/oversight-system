import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { DownloadReportComponent } from '../download-report/download-report.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  isLoading: boolean = false;
  users: IUser[] = [];
  allUsers!: number;
  totalResUser!: number;
  searchTerm: string = '';
  pageSize: number = 8;
  pageIndex: number = 0;

  constructor(
    public appService: AppService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUserList();
  }

  // Fetch users with optional filters (pagination and search)
  fetchUserList() {
    this.isLoading = true;
    const queryParams = `?page=${this.pageIndex + 1}&limit=${
      this.pageSize
    }&search=${this.searchTerm}`;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/users${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.allUsers = res.total;
            this.users = res.results;
            this.totalResUser = this.users.length;
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

  // Handle search changes
  onSearch(searchValue: string) {
    this.searchTerm = searchValue;
    this.pageIndex = 0; // Reset to first page when searching
    this.fetchUserList();
  }

  // Handle page changes from pagination
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchUserList();
  }

  addUser() {
    this.router.navigate(['/users/invite-user']);
  }

  downloadReport() {
    const dialogRef = this.dialog.open(DownloadReportComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        return;
      }
    });
  }
}
