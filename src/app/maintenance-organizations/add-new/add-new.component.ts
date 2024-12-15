import { Component, EventEmitter, Output } from '@angular/core';
import { MaintenanceOrganizationsListComponent } from '../maintenance-organizations-list/maintenance-organizations-list.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  @Output() maintenanceOrganizationUpdated = new EventEmitter<void>();

  addMaintenanceOrganizationFormGroup: FormGroup;
  isLoading: boolean = false;
  strAircraftTypes: string[] = [
    'Boeing 737',
    'Airbus A320',
    'Boeing 787 Dreamliner',
    'Airbus A380',
    'Embraer E190',
    'Cessna Citation X',
    'Gulfstream G550',
    'Bombardier Global 6000',
    'Dassault Falcon 7X',
    'Learjet 75',
    'Bell 206',
    'Sikorsky UH-60 Black Hawk',
    'Airbus H125',
    'Robinson R44',
    'Boeing CH-47 Chinook',
  ].sort();

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<MaintenanceOrganizationsListComponent>,
    private dialog: MatDialog
  ) {
    this.addMaintenanceOrganizationFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      aircraftTypes: ['', [Validators.required]],
    });
  }

  addMaintenanceOrganization() {
    if (this.addMaintenanceOrganizationFormGroup.valid) {
      this.isLoading = true;

      // Make the POST request with the updated form data
      this.appService
        .makePostRequest(
          `${environment.BASE_URL}/maintenance-organizations`,
          this.addMaintenanceOrganizationFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Maintenance organization added successfully!'
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
