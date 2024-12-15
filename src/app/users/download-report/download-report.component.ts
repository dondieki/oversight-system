import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss'],
})
export class DownloadReportComponent {
  usersReportFormGroup: FormGroup;

  isLoading: boolean = false;

  roles: string[] = ['admin', 'supervisor', 'inspector', 'all'].sort();

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<UsersListComponent>,
    private dialog: MatDialog
  ) {
    this.usersReportFormGroup = this._formBuilder.group({
      sendTo: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    const authUser: IUser = this.appService.getSessionUser();

    if (authUser) {
      console.log(authUser.email)
      this.usersReportFormGroup = this._formBuilder.group({
        sendTo: [authUser.email, [Validators.required, Validators.email]],
        role: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      });
    }
  }

  sendReport() {
    this.isLoading = true;

    this.appService
      .makePostRequest(
        `${environment.BASE_URL}/users/download-report`,
        this.usersReportFormGroup.value
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
}
