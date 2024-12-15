import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionDetailsComponent } from '../inspections/inspection-details/inspection-details.component';
import { AddNewComponent } from './add-new/add-new.component';
import { MaintenanceOrganizationsListComponent } from './maintenance-organizations-list/maintenance-organizations-list.component';
import { MaintenanceOrganizationsComponent } from './maintenance-organizations.component';
import { MaintenanceOrganizationsDetailsComponent } from './maintenance-organizations-details/maintenance-organizations-details.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceOrganizationsComponent,
    children: [
      { path: 'list', component: MaintenanceOrganizationsListComponent },
      { path: 'add-new', component: AddNewComponent },
      { path: 'list/:id', component: MaintenanceOrganizationsDetailsComponent },
      { path: '**', component: MaintenanceOrganizationsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceOrganizationsRoutingModule {}
