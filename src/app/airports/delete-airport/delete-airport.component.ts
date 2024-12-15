import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { UsersTableComponent } from 'src/app/users/users-table/users-table.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-airport',
  templateUrl: './delete-airport.component.html',
  styleUrls: ['./delete-airport.component.scss']
})
export class DeleteAirportComponent {
  @Output() userUpdated = new EventEmitter<void>();

  isLoading: boolean = false;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IAirport,
    public dialogRef: MatDialogRef<UsersTableComponent>,
    private dialog: MatDialog
  ) {}

  deleteAirportInfo() {
    this.isLoading = true;
    this.appService
      .makeDeleteRequest(`${environment.BASE_URL}/airports/${this.data._id}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.appService.showSnackBarMessage(
              'Airport record deleted successfully!'
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
