import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IANSStation } from 'src/app/interfaces/ans-station.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AnsStationsListComponent } from '../ans-stations-list/ans-stations-list.component';

@Component({
  selector: 'app-update-ans-station',
  templateUrl: './update-ans-station.component.html',
  styleUrls: ['./update-ans-station.component.scss'],
})
export class UpdateAnsStationComponent {
  @Output() ANSStationsUpdated = new EventEmitter<void>();

  updateANSStationFormGroup: FormGroup;
  isLoading: boolean = false;

  services: string[] = [
    'Air Traffic Control',
    'Navigation Services',
    'Weather Monitoring',
    'Ground Services',
    'Communication Services',
    'Surveillance Services',
    'Flight Planning',
    'Maintenance Services',
    'Security Services',
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IANSStation,
    public dialogRef: MatDialogRef<AnsStationsListComponent>,
    private dialog: MatDialog
  ) {
    this.updateANSStationFormGroup = this._formBuilder.group({
      name: [data.name, [Validators.required]],
      services: [data.services, [Validators.required]],
    });
  }

  addANSStation() {
    if (this.updateANSStationFormGroup.valid) {
      this.isLoading = true;

      // Make the POST request with the updated form data
      this.appService
        .makeUpdateRequest(
          `${environment.BASE_URL}/ans-stations/${this.data._id}`,
          this.updateANSStationFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'ANS station added successfully!'
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
