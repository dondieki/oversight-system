import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { IAirline } from 'src/app/interfaces/airline.interface ';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AirlinesTableComponent } from '../airlines-table/airlines-table.component';

@Component({
  selector: 'app-delete-airline',
  templateUrl: './delete-airline.component.html',
  styleUrls: ['./delete-airline.component.scss'],
})
export class DeleteAirlineComponent {
  @Output() airlineUpdated = new EventEmitter<void>();

  isLoading: boolean = false;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IAirline,
    public dialogRef: MatDialogRef<AirlinesTableComponent>,
    private dialog: MatDialog
  ) {}

  deleteAirlineInfo() {
    this.isLoading = true;
    this.appService
      .makeDeleteRequest(`${environment.BASE_URL}/airlines/${this.data._id}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.appService.showSnackBarMessage(
              'Airline record deleted successfully!'
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
