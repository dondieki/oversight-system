import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { MaintenanceOrganizationsListComponent } from '../maintenance-organizations-list/maintenance-organizations-list.component';
import { IMaintenanceOrganization } from 'src/app/interfaces/maintenance-organizations.interface ';

@Component({
  selector: 'app-update-maintenance-organization',
  templateUrl: './update-maintenance-organization.component.html',
  styleUrls: ['./update-maintenance-organization.component.scss'],
})
export class UpdateMaintenanceOrganizationComponent {
  @Output() maintenanceOrganizationUpdated = new EventEmitter<void>();

  updateMaintenanceOrganizationFormGroup: FormGroup;
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
    @Inject(MAT_DIALOG_DATA) public data: IMaintenanceOrganization,
    public dialogRef: MatDialogRef<MaintenanceOrganizationsListComponent>,
    private dialog: MatDialog
  ) {
    this.updateMaintenanceOrganizationFormGroup = this._formBuilder.group({
      name: [data.name, [Validators.required]],
      location: [data.location, [Validators.required]],
      aircraftTypes: [data.aircraftTypes, [Validators.required]],
    });
  }

  addMaintenanceOrganization() {
    if (this.updateMaintenanceOrganizationFormGroup.valid) {
      this.isLoading = true;

      // Make the POST request with the updated form data
      this.appService
        .makeUpdateRequest(
          `${environment.BASE_URL}/maintenance-organizations/${this.data._id}`,
          this.updateMaintenanceOrganizationFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Maintenance organization updated successfully!'
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
