import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IRunway } from 'src/app/interfaces/runway.interface ';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AirportsTableComponent } from '../airports-table/airports-table.component';

@Component({
  selector: 'app-update-runway',
  templateUrl: './update-runway.component.html',
  styleUrls: ['./update-runway.component.scss'],
})
export class UpdateRunwayComponent {
  runwayFormGroup: FormGroup;
  isLoading: boolean = false;
  surfaceTypes: string[] = ['Murram', 'Bitumen', 'Grass', 'Concrete'].sort();
  booleanValues: any[] = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IRunway,
    public dialogRef: MatDialogRef<AirportsTableComponent>,
    private dialog: MatDialog
  ) {
    this.runwayFormGroup = _formBuilder.group({
      number: [data.number, Validators.required],
      width: [data.width, Validators.required],
      length: [data.length, Validators.required],
      surfaceType: [data.surfaceType, Validators.required],
      inService: [data.inService, Validators.required],
    });
  }

  updatRunwayInfo() {
    if (this.runwayFormGroup.valid) {
      this.isLoading = true;
      this.appService
        .makeUpdateRequest(
          `${environment.BASE_URL}/runways/${this.data?._id}`,
          this.runwayFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Updated runway successfully!'
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
