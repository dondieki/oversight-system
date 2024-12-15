import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { TaxiwaysTableComponent } from '../taxiways-table/taxiways-table.component';

@Component({
  selector: 'app-delete-taxiway',
  templateUrl: './delete-taxiway.component.html',
  styleUrls: ['./delete-taxiway.component.scss'],
})
export class DeleteTaxiwayComponent {
  isLoading: boolean = false;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<TaxiwaysTableComponent>,
    private dialog: MatDialog
  ) {}

  deleteTaxiwayInfo() {
    this.isLoading = true;
    this.appService
      .makeDeleteRequest(`${environment.BASE_URL}/taxiways/${this.data}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.appService.showSnackBarMessage(
              'Taxiway record deleted successfully!'
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
