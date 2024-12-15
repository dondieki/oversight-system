import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IInspection } from 'src/app/interfaces/inspection.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { UsersTableComponent } from 'src/app/users/users-table/users-table.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-inspection',
  templateUrl: './delete-inspection.component.html',
  styleUrls: ['./delete-inspection.component.scss']
})
export class DeleteInspectionComponent {
  @Output() inspectionUpdated = new EventEmitter<void>();

  isLoading: boolean = false;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IInspection,
    public dialogRef: MatDialogRef<UsersTableComponent>,
    private dialog: MatDialog
  ) {}

  deleteInspectionInfo() {
    this.isLoading = true;
    this.appService
      .makeDeleteRequest(`${environment.BASE_URL}/inspections/${this.data._id}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.appService.showSnackBarMessage(
              'Inspection record deleted successfully!'
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
