import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IANSStation } from 'src/app/interfaces/ans-station.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AnsStationsTableComponent } from '../ans-stations-table/ans-stations-table.component';

@Component({
  selector: 'app-delete-ans-station',
  templateUrl: './delete-ans-station.component.html',
  styleUrls: ['./delete-ans-station.component.scss'],
})
export class DeleteAnsStationComponent {
  @Output() ANSStationsUpdated = new EventEmitter<void>();

  isLoading: boolean = false;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IANSStation,
    public dialogRef: MatDialogRef<AnsStationsTableComponent>,
    private dialog: MatDialog
  ) {}

  deleteAirlineInfo() {
    this.isLoading = true;
    this.appService
      .makeDeleteRequest(
        `${environment.BASE_URL}/ans-stations/${this.data._id}`
      )
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.appService.showSnackBarMessage(
              'ANS station record deleted successfully!'
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
