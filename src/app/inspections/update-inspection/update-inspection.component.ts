import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { IInspection } from 'src/app/interfaces/inspection.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { UsersTableComponent } from 'src/app/users/users-table/users-table.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-inspection',
  templateUrl: './update-inspection.component.html',
  styleUrls: ['./update-inspection.component.scss'],
})
export class UpdateInspectionComponent {
  @Output() inspectionUpdated = new EventEmitter<void>();

  updateInspectionFormGroup: FormGroup;

  inspectors: IUser[] = [];
  airports: IAirport[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.fetchInspectors();
    this.fetchAirportsList();
  }

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IInspection,
    public dialogRef: MatDialogRef<UsersTableComponent>,
    private dialog: MatDialog
  ) {
    this.updateInspectionFormGroup = this._formBuilder.group({
      _deadline: [new Date(data._deadline), [Validators.required, this.deadlineValidator]],
    });
  }

  deadlineValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day for accurate comparison

    if (selectedDate < today) {
      return { invalidDeadline: 'Deadline cannot be in the past.' };
    }
    return null;
  }

  fetchInspectors() {
    this.isLoading = true;
    const queryParams = `?limit=100&role=inspector`;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/users${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.inspectors = response.Payload.results;
            this.inspectors.sort((a, b) => a.createdAt - b.createdAt);
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

  fetchAirportsList() {
    this.isLoading = true;
    const queryParams = `?limit=100`;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/airports${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.airports = response.Payload.results;
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

  updateInspectionInfo() {
    if (this.updateInspectionFormGroup.valid) {
      this.isLoading = true;
      const deadline = this.updateInspectionFormGroup.get('_deadline')?.value;
      const timestamp = new Date(deadline).getTime(); // Convert to timestamp

      const payload = {
        _deadline: timestamp,
      };

      this.appService
        .makeUpdateRequest(
          `${environment.BASE_URL}/inspections/${this.data._id}`,
          payload
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Updated inspection successfully!'
              );
              this.dialogRef.close(true);
            } else {
              this.appService.showSnackBarMessage(res.Payload);
              this.dialogRef.close(false);
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.appService.showSnackBarMessage(
              this.appService.processHttpErrors(err)
            );
            this.dialogRef.close(false);
          },
        });
    }
  }
}
