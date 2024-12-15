import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AirportsTableComponent } from '../airports-table/airports-table.component';

@Component({
  selector: 'app-update-airport',
  templateUrl: './update-airport.component.html',
  styleUrls: ['./update-airport.component.scss'],
})
export class UpdateAirportComponent {
  @Output() airportUpdated = new EventEmitter<void>();

  updateAirportFormGroup: FormGroup;
  isLoading: boolean = false;
  roles: string[] = ['admin', 'supervisor', 'inspector'].sort();

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IAirport,
    public dialogRef: MatDialogRef<AirportsTableComponent>,
    private dialog: MatDialog
  ) {
    this.updateAirportFormGroup = this._formBuilder.group({
      name: [data.name, [Validators.required]],
      email: [
        data.email,
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      phoneNumber: [
        data.phoneNumber,
        [
          Validators.required,
          Validators.pattern(/^[+]*[0-9]{1,3}[ -]?[0-9]{3,14}$/),
        ],
      ],
      physicalAddress: [data.physicalAddress, [Validators.required]],
      postalAddress: [data.postalAddress, [Validators.required]],
      postalCode: [data.postalCode, [Validators.required]],
    });
  }

  updateAirportInfo() {
    if (this.updateAirportFormGroup.valid) {
      this.isLoading = true;
      this.appService
        .makeUpdateRequest(
          `${environment.BASE_URL}/airports/${this.data._id}`,
          this.updateAirportFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Updated airport successfully!'
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
