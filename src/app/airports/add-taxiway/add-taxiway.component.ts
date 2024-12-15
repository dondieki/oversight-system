import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AirportsTableComponent } from '../airports-table/airports-table.component';

@Component({
  selector: 'app-add-taxiway',
  templateUrl: './add-taxiway.component.html',
  styleUrls: ['./add-taxiway.component.scss']
})
export class AddTaxiwayComponent {
  @Output() taxiwayUpdated = new EventEmitter<void>();

  taxiwayFormGroup: FormGroup;
  isLoading: boolean = false;
  savedTaxiways: any[] = [];
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
    this.taxiwayFormGroup = _formBuilder.group({
      number: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      surfaceType: ['', Validators.required],
      inService: ['', Validators.required],
    });
  }

  removeTaxiway(idx: number) {
    if (idx !== -1) {
      this.savedTaxiways.splice(idx, 1);
    }
  }

  submitTaxiway() {
    if (!this.taxiwayFormGroup.valid) {
      return;
    }
    let data = this.taxiwayFormGroup.value;
    const taxiwayData = { ...data, ...{ airportId: this.data } };
    this.savedTaxiways.push(taxiwayData);
    this.taxiwayFormGroup.reset();
  }

  submitAllTaxiways() {
    if (this.savedTaxiways.length > 0) {
      this.isLoading = true;
      const taxiwayRequests = this.savedTaxiways.map((taxiway) =>
        this.appService.makePostRequest(
          `${environment.BASE_URL}/taxiways`,
          taxiway
        )
      );

      // Execute all taxiway requests in parallel
      forkJoin(taxiwayRequests).subscribe({
        next: (responses) => {
          this.isLoading = false;
          const allSuccess = responses.every((res: any) => res.Status === 200);
          if (allSuccess) {
            this.appService.showSnackBarMessage(
              'All taxiways submitted successfully!'
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
