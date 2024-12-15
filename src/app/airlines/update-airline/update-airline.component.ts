import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IAirline } from 'src/app/interfaces/airline.interface ';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AirlinesListComponent } from '../airlines-list/airlines-list.component';

@Component({
  selector: 'app-update-airline',
  templateUrl: './update-airline.component.html',
  styleUrls: ['./update-airline.component.scss'],
})
export class UpdateAirlineComponent {
  @Output() airlinesUpdated = new EventEmitter<void>();

  updateAirlineFormGroup: FormGroup;
  isLoading: boolean = false;
  roles: string[] = ['admin', 'supervisor', 'inspector'].sort();

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IAirline,
    public dialogRef: MatDialogRef<AirlinesListComponent>,
    private dialog: MatDialog
  ) {
    const routesFlownString = data.routesFlown.join(', ');

    this.updateAirlineFormGroup = this._formBuilder.group({
      name: [data.name, [Validators.required]],
      numberOfAircraft: [data.numberOfAircraft, [Validators.required]],
      totalPassengers: [data.totalPassengers, [Validators.required]],
      routesFlown: [routesFlownString, [Validators.required]],
    });
  }

  updateAirline() {
    if (this.updateAirlineFormGroup.valid) {
      console.log(this.updateAirlineFormGroup.value);
      this.isLoading = true;

      // Convert the routesFlown field to an array
      const routesFlown = this.updateAirlineFormGroup.get('routesFlown')?.value;
      const routesArray = routesFlown
        .split(',')
        .map((route: string) => route.trim());

      // Update the form value with the converted array
      const formData = {
        ...this.updateAirlineFormGroup.value,
        routesFlown: routesArray,
      };

      // Make the POST request with the updated form data
      this.appService
        .makeUpdateRequest(
          `${environment.BASE_URL}/airlines/${this.data._id}`,
          formData
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Airline updated successfully!'
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
