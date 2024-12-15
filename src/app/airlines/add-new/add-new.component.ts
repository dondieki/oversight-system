import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AirlinesListComponent } from '../airlines-list/airlines-list.component';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  @Output() airlinesUpdated = new EventEmitter<void>();

  addAirlineFormGroup: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<AirlinesListComponent>,
    private dialog: MatDialog
  ) {
    this.addAirlineFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      numberOfAircraft: ['', [Validators.required]],
      totalPassengers: ['', [Validators.required]],
      routesFlown: ['', [Validators.required]],
    });
  }

  addAirline() {
    if (this.addAirlineFormGroup.valid) {
      this.isLoading = true;

      // Convert the routesFlown field to an array
      const routesFlown = this.addAirlineFormGroup.get('routesFlown')?.value;
      const routesArray = routesFlown
        .split(',')
        .map((route: string) => route.trim());

      // Update the form value with the converted array
      const formData = {
        ...this.addAirlineFormGroup.value,
        routesFlown: routesArray,
      };

      // Make the POST request with the updated form data
      this.appService
        .makePostRequest(`${environment.BASE_URL}/airlines`, formData)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Airline added successfully!'
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
