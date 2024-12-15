import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { IMaintenanceOrganization } from 'src/app/interfaces/maintenance-organizations.interface ';
import { MaintenanceOrganizationsTableComponent } from '../maintenance-organizations-table/maintenance-organizations-table.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-maintenance-organization',
  templateUrl: './delete-maintenance-organization.component.html',
  styleUrls: ['./delete-maintenance-organization.component.scss']
})
export class DeleteMaintenanceOrganizationComponent {
  @Output() maintenanceOrganizationUpdated = new EventEmitter<void>();

  isLoading: boolean = false;

  constructor(
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: IMaintenanceOrganization,
    public dialogRef: MatDialogRef<MaintenanceOrganizationsTableComponent>,
    private dialog: MatDialog
  ) {}

  deleteMaintenanceOrgInfo() {
    this.isLoading = true;
    this.appService
      .makeDeleteRequest(`${environment.BASE_URL}/maintenance-organizations/${this.data._id}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.appService.showSnackBarMessage(
              'Maintenance organization record deleted successfully!'
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
