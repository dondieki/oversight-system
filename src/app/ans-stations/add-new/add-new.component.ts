import { Component, EventEmitter, Output } from '@angular/core';
import { AnsStationsListComponent } from '../ans-stations-list/ans-stations-list.component';
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
  @Output() ANSStationsUpdated = new EventEmitter<void>();

  addANSStationFormGroup: FormGroup;
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
    public dialogRef: MatDialogRef<AnsStationsListComponent>,
    private dialog: MatDialog
  ) {
    this.addANSStationFormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      services: ['', [Validators.required]],
    });
  }

  addANSStation() {
    if (this.addANSStationFormGroup.valid) {
      this.isLoading = true;

      // Make the POST request with the updated form data
      this.appService
        .makePostRequest(
          `${environment.BASE_URL}/ans-stations`,
          this.addANSStationFormGroup.value
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
