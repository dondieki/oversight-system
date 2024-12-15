import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { UsersTableComponent } from '../users-table/users-table.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  @Output() userUpdated = new EventEmitter<void>();

  updateUserFormGroup: FormGroup;
  isLoading: boolean = false;
  roles: string[] = ['admin', 'supervisor', 'inspector'].sort();

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public dialogRef: MatDialogRef<UsersTableComponent>,
    private dialog: MatDialog
  ) {
    this.updateUserFormGroup = this._formBuilder.group({
      email: [
        data.email,
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      firstName: [data.firstName, [Validators.required]],
      lastName: [data.lastName, [Validators.required]],
      phoneNumber: [
        data.phoneNumber,
        [
          Validators.required,
          Validators.pattern(/^[+]*[0-9]{1,3}[ -]?[0-9]{3,14}$/),
        ],
      ],
      idNumber: [data.idNumber, [Validators.required]],
      role: [data.role, Validators.required],
    });
  }

  updateUserInfo() {
    if (this.updateUserFormGroup.valid) {
      this.isLoading = true;
      this.appService
        .makeUpdateRequest(
          `${environment.BASE_URL}/users/${this.data._id}`,
          this.updateUserFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage('Updated user successfully!');
              this.dialogRef.close(true);
            } else {
              this
              .appService.showSnackBarMessage(res.Payload);
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
