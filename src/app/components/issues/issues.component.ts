import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ScheduleInspectionComponent } from 'src/app/inspections/schedule-inspection/schedule-inspection.component';
import { IIssue } from 'src/app/interfaces/issue.interface';
import { AppService } from 'src/app/services/app.service';
import { DownloadReportComponent } from 'src/app/users/download-report/download-report.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent {
  @Input() entity!: string;
  @Input() entityId!: string;

  filterFormGroup: FormGroup;

  isLoading: boolean = false;
  issues: IIssue[] = [];
  allIssues: number = 0;
  totalResIssue: number = 0;
  searchTerm: string = '';
  pageSize: number = 8;
  pageIndex: number = 0;

  queryParams: string = '';

  statuses: { label: string; value: boolean | string }[] = [
    { label: 'All', value: 'All' },
    { label: 'Resolved', value: true },
    { label: 'Pending', value: false },
  ];

  entities: { label: string; value: boolean | string }[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Runway', value: 'RUNWAY' },
    { label: 'Taxiway', value: 'TAXIWAY' },
    { label: 'ANS Station', value: 'ANS STATION' },
    { label: 'Airline', value: 'AIRLINE' },
    { label: 'Maintenance org.', value: 'MAINTENANCE ORGANIZATION' },
  ].sort();

  constructor(
    public appService: AppService,
    private router: Router,
    private dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {
    this.filterFormGroup = _formBuilder.group({
      status: [''],
      entity: [''],
    });
  }

  ngOnInit(): void {
    this.updateQueryParams(); // Ensure queryParams is initialized
    this.fetchIssuesList(this.queryParams);
  }

  fetchIssuesList(queryParams: string) {
    this.isLoading = true;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/issues${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.allIssues = res.total;
            this.issues = res.results;
            this.totalResIssue = this.issues.length;
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
      isResolved?: boolean | string;
      entity?: string;
    }> = {}
  ) {
    const params: {
      page: number;
      limit: number;
      search: string;
      isResolved?: boolean | string;
      entity?: string;
    } = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
      search: this.searchTerm,
      ...extraParams,
    };

    // Append base params and add the entity-specific filter
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
        .join('&') +
      `&${this.entity}=${this.entityId}`;
  }

  onSearch(searchValue: string) {
    this.searchTerm = searchValue;
    this.pageIndex = 0;
    this.updateQueryParams();
    this.fetchIssuesList(this.queryParams);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateQueryParams();
    this.fetchIssuesList(this.queryParams);
  }

  addInspection() {
    const dialogRef = this.dialog.open(ScheduleInspectionComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchIssuesList(this.queryParams);
      }
    });
  }

  updateFilters() {
    const status = this.filterFormGroup.get('status')?.value;
    const entity = this.filterFormGroup.get('entity')?.value;

    this.updateQueryParams({
      isResolved: status !== 'All' ? status : undefined,
      entity: entity !== 'ALL' ? entity : undefined,
    });

    this.fetchIssuesList(this.queryParams);
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
