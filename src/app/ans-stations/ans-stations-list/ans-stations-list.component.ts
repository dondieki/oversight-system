import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IANSStation } from 'src/app/interfaces/ans-station.interface';
import { AppService } from 'src/app/services/app.service';
import { DownloadReportComponent } from 'src/app/users/download-report/download-report.component';
import { environment } from 'src/environments/environment';
import { AddNewComponent } from '../add-new/add-new.component';

@Component({
  selector: 'app-ans-stations-list',
  templateUrl: './ans-stations-list.component.html',
  styleUrls: ['./ans-stations-list.component.scss']
})
export class AnsStationsListComponent {
  filterFormGroup: FormGroup;

  isLoading: boolean = false;
  ANSStations: IANSStation[] = [];
  allANSStations: number = 0;
  totalResANSStations: number = 0;
  searchTerm: string = '';
  pageSize: number = 8;
  pageIndex: number = 0;
  queryParams = `?page=${this.pageIndex + 1}&limit=${this.pageSize}&search=${
    this.searchTerm
  }`;

  statuses: { label: string; value: boolean | string }[] = [
    { label: 'All', value: 'All' },
    { label: 'Complete', value: true },
    { label: 'Pending', value: false },
  ];

  constructor(
    public appService: AppService,
    private router: Router,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
    this.filterFormGroup = _formBuilder.group({
      status: [''],
    });
  }

  ngOnInit(): void {
    this.fetchANSStationsList(this.queryParams);
  }

  fetchANSStationsList(queryParams: string) {
    this.isLoading = true;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/ans-stations${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.allANSStations = res.total;
            this.ANSStations = res.results;
            this.totalResANSStations = this.ANSStations.length;
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

  private updateQueryParams(
    extraParams: Partial<{
      page: number;
      limit: number;
      search: string;
      isComplete?: boolean | string;
    }> = {}
  ) {
    const params: {
      page: number;
      limit: number;
      search: string;
      isComplete?: boolean | string;
    } = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
      search: this.searchTerm,
      ...extraParams,
    };

    this.queryParams =
      '?' +
      Object.keys(params)
        .filter(
          (key) =>
            params[key as keyof typeof params] !== undefined &&
            params[key as keyof typeof params] !== ''
        )
        .map(
          (key) =>
            `${key}=${encodeURIComponent(
              params[key as keyof typeof params] as string | number
            )}`
        )
        .join('&');
  }

  // Handle search changes
  onSearch(searchValue: string) {
    this.searchTerm = searchValue;
    this.pageIndex = 0;
    this.updateQueryParams();
    this.fetchANSStationsList(this.queryParams);
  }

  // Handle page changes from pagination
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateQueryParams();
    this.fetchANSStationsList(this.queryParams);
  }

  addANSStation() {
    const dialogRef = this.dialog.open(AddNewComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchANSStationsList(this.queryParams);
      }
    });
  }

  filterStatus() {
    const status = this.filterFormGroup.get('status')?.value;

    if (status === 'All') {
      this.queryParams = `?page=${this.pageIndex + 1}&limit=${
        this.pageSize
      }&search=${this.searchTerm}`;
      this.fetchANSStationsList(this.queryParams);
    } else {
      this.queryParams = `?page=${this.pageIndex + 1}&limit=${
        this.pageSize
      }&search=${this.searchTerm}&isComplete=${status}`;
      this.fetchANSStationsList(this.queryParams);
    }
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
