import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AirportsTableComponent } from '../airports-table/airports-table.component';

@Component({
  selector: 'app-add-runway',
  templateUrl: './add-runway.component.html',
  styleUrls: ['./add-runway.component.scss'],
})
export class AddRunwayComponent {
  @Output() airportUpdated = new EventEmitter<void>();

  runwayFormGroup: FormGroup;
  isLoading: boolean = false;
  savedRunways: any[] = [];
  surfaceTypes: string[] = ['Murram', 'Bitumen', 'Grass', 'Concrete'].sort();
  booleanValues: any[] = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ];
  savedAirport!: IAirport;
  savedAirportId: any;

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IAirport,
    public dialogRef: MatDialogRef<AirportsTableComponent>,
    private dialog: MatDialog
  ) {
    this.runwayFormGroup = _formBuilder.group({
      number: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      surfaceType: ['', Validators.required],
      inService: ['', Validators.required],
    });
  }

  removeRunway(idx: number) {
    if (idx !== -1) {
      this.savedRunways.splice(idx, 1);
    }
  }

  submitRunway() {
    if (!this.runwayFormGroup.valid) {
      return;
    }
    let data = this.runwayFormGroup.value;
    const runwayData = { ...data, ...{ airportId: this.data } };
    this.savedRunways.push(runwayData);
    this.runwayFormGroup.reset();
  }

  submitAllRunways() {
    if (this.savedRunways.length > 0) {
      this.isLoading = true;
      const runwayRequests = this.savedRunways.map((runway) =>
        this.appService.makePostRequest(
          `${environment.BASE_URL}/runways`,
          runway
        )
      );

      // Execute all runway requests in parallel
      forkJoin(runwayRequests).subscribe({
        next: (responses) => {
          this.isLoading = false;
          const allSuccess = responses.every((res: any) => res.Status === 200);
          if (allSuccess) {
            this.appService.showSnackBarMessage(
              'All runways submitted successfully!'
            );
            this.dialogRef.close(true);
          } else {
            // Find any error messages and display them
            const errorMessages = responses
              .filter((res: any) => res.Status !== 200)
              .map((res: any) => res.Payload)
              .join(', ');
            this.appService.showSnackBarMessage(`Errors: ${errorMessages}`);
            this.dialogRef.close(true);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(error)
          );
          this.dialogRef.close(true);
        },
      });
    }
  }
}
