import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ScheduleInspectionComponent } from 'src/app/inspections/schedule-inspection/schedule-inspection.component';
import { IInspection } from 'src/app/interfaces/inspection.interface';
import { AppService } from 'src/app/services/app.service';
import { DownloadReportComponent } from 'src/app/users/download-report/download-report.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss'],
})
export class InspectionsComponent {
  @Input() entity!: string;
  @Input() entityId!: string;

  filterFormGroup: FormGroup;

  isLoading: boolean = false;
  inspections: IInspection[] = [];
  allInspections: number = 0;
  totalResInspection: number = 0;
  searchTerm: string = '';
  pageSize: number = 8;
  pageIndex: number = 0;

  queryParams: string = '';

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
    this.updateQueryParams(); // Ensure queryParams is initialized
    this.fetchInspectionsList(this.queryParams);
  }

  fetchInspectionsList(queryParams: string) {
    this.isLoading = true;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/inspections${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.allInspections = res.total;
            this.inspections = res.results;
            this.totalResInspection = this.inspections.length;
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
    this.fetchInspectionsList(this.queryParams);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateQueryParams();
    this.fetchInspectionsList(this.queryParams);
  }

  addInspection() {
    const dialogRef = this.dialog.open(ScheduleInspectionComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchInspectionsList(this.queryParams);
      }
    });
  }

  filterStatus() {
    const status = this.filterFormGroup.get('status')?.value;

    this.updateQueryParams({
      isComplete: status !== 'All' ? status : undefined,
    });

    this.fetchInspectionsList(this.queryParams);
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
