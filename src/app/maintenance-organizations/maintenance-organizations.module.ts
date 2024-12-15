import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceOrganizationsRoutingModule } from './maintenance-organizations-routing.module';
import { MaintenanceOrganizationsComponent } from './maintenance-organizations.component';
import { AddNewComponent } from './add-new/add-new.component';
import { MaintenanceOrganizationsListComponent } from './maintenance-organizations-list/maintenance-organizations-list.component';
import { MaintenanceOrganizationsTableComponent } from './maintenance-organizations-table/maintenance-organizations-table.component';
import { DeleteMaintenanceOrganizationComponent } from './delete-maintenance-organization/delete-maintenance-organization.component';
import { UpdateMaintenanceOrganizationComponent } from './update-maintenance-organization/update-maintenance-organization.component';
import { SharedModule } from '../modules/shared/shared.module';
import { MaintenanceOrganizationsDetailsComponent } from './maintenance-organizations-details/maintenance-organizations-details.component';


@NgModule({
  declarations: [
    MaintenanceOrganizationsComponent,
    AddNewComponent,
    MaintenanceOrganizationsListComponent,
    MaintenanceOrganizationsTableComponent,
    DeleteMaintenanceOrganizationComponent,
    UpdateMaintenanceOrganizationComponent,
    MaintenanceOrganizationsDetailsComponent
  ],
  imports: [
    CommonModule,
    MaintenanceOrganizationsRoutingModule,
    SharedModule
  ]
})
export class MaintenanceOrganizationsModule { }
