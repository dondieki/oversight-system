import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { UsersListComponent } from 'src/app/users/users-list/users-list.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss'],
})
export class DownloadReportComponent {
  issuesReportFormGroup: FormGroup;

  isLoading: boolean = false;

  statuses: { label: string; value: boolean | string }[] = [
    { label: 'All', value: 'All' },
    { label: 'Resolved', value: true },
    { label: 'Pending', value: false },
  ];

  entities: { label: string; value: string | string }[] = [
    { label: 'All', value: 'All' },
    { label: 'Airport', value: 'airportId' },
    { label: 'Airline', value: 'airlineId' },
    { label: 'ANS Station', value: 'ansStationId' },
    { label: 'Maintenance Organization', value: 'maintenanceOrgId' },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<UsersListComponent>,
    private dialog: MatDialog
  ) {
    this.issuesReportFormGroup = this._formBuilder.group({
      sendTo: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      entity: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    const authUser: IUser = this.appService.getSessionUser();

    if (authUser) { 
      this.issuesReportFormGroup = this._formBuilder.group({
        sendTo: [authUser.email, [Validators.required, Validators.email]],
        status: ['', Validators.required],
        entity: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      });
    }
  }

  sendReport() {
    this.isLoading = true;

    this.appService
      .makePostRequest(
        `${environment.BASE_URL}/issues/download-report`,
        this.issuesReportFormGroup.value
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.appService.showSnackBarMessage('Successfully sent');
            this.dialogRef.close(false);
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

  filterStatus() {}
}
