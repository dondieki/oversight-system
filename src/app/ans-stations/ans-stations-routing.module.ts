import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionDetailsComponent } from '../inspections/inspection-details/inspection-details.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AnsStationsListComponent } from './ans-stations-list/ans-stations-list.component';
import { AnsStationsComponent } from './ans-stations.component';
import { AnsStationsDetailsComponent } from './ans-stations-details/ans-stations-details.component';

const routes: Routes = [
  {
    path: '',
    component: AnsStationsComponent,
    children: [
      { path: 'list', component: AnsStationsListComponent },
      { path: 'add-new', component: AddNewComponent },
      { path: 'list/:id', component: AnsStationsDetailsComponent },
      { path: '**', component: AnsStationsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnsStationsRoutingModule {}
