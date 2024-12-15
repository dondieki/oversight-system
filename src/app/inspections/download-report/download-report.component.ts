import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { InspectionsListComponent } from '../inspections-list/inspections-list.component';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss'],
})
export class DownloadReportComponent {
  inspectionsReportFormGroup: FormGroup;

  isLoading: boolean = false;

  statuses: { label: string; value: boolean | string }[] = [
    { label: 'All', value: 'All' },
    { label: 'Completed', value: true },
    { label: 'Pending', value: false },
  ];

  entities: { label: string; value: boolean | string }[] = [
    { label: 'All', value: 'All' },
    { label: 'Runway', value: true },
    { label: 'Taxiway', value: false },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<InspectionsListComponent>,
    private dialog: MatDialog
  ) {
    this.inspectionsReportFormGroup = this._formBuilder.group({
      sendTo: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    const authUser: IUser = this.appService.getSessionUser();

    if (authUser) {
      console.log(authUser.email);
      this.inspectionsReportFormGroup = this._formBuilder.group({
        sendTo: [authUser.email, [Validators.required, Validators.email]],
        status: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      });
    }
  }

  sendReport() {
    this.isLoading = true;

    this.appService
      .makePostRequest(
        `${environment.BASE_URL}/inspections/download-report`,
        this.inspectionsReportFormGroup.value
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
