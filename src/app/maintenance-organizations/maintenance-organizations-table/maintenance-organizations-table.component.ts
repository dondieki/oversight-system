import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IMaintenanceOrganization } from 'src/app/interfaces/maintenance-organizations.interface ';
import { AppService } from 'src/app/services/app.service';
import { DeleteMaintenanceOrganizationComponent } from '../delete-maintenance-organization/delete-maintenance-organization.component';
import { UpdateMaintenanceOrganizationComponent } from '../update-maintenance-organization/update-maintenance-organization.component';

@Component({
  selector: 'app-maintenance-organizations-table',
  templateUrl: './maintenance-organizations-table.component.html',
  styleUrls: ['./maintenance-organizations-table.component.scss'],
})
export class MaintenanceOrganizationsTableComponent {
  @Input() maintenanceOrganizations!: IMaintenanceOrganization[];
  @Output() maintenanceOrganizationsUpdated = new EventEmitter<void>();
  displayedColumns: string[] = [
    'date',
    'name',
    'location',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  navigateDetails(_id: string) {
    this.router.navigate([`/maintenance-organizations/list/${_id}`]);
  }

  openEditDialog(MaintenanceOrganization: IMaintenanceOrganization): void {
    const dialogRef = this.dialog.open(UpdateMaintenanceOrganizationComponent, {
      data: MaintenanceOrganization,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.maintenanceOrganizationsUpdated.emit();
      }
    });
  }

  openDeleteDialog(MaintenanceOrganization: IMaintenanceOrganization): void {
    const dialogRef = this.dialog.open(DeleteMaintenanceOrganizationComponent, {
      data: MaintenanceOrganization,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.maintenanceOrganizationsUpdated.emit();
      }
    });
  }
}
