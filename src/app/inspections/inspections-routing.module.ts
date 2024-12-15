import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionDetailsComponent } from './inspection-details/inspection-details.component';
import { InspectionsListComponent } from './inspections-list/inspections-list.component';
import { InspectionsComponent } from './inspections.component';
import { ScheduleInspectionComponent } from './schedule-inspection/schedule-inspection.component';

const routes: Routes = [
  {
    path: '',
    component: InspectionsComponent,
    children: [
      { path: 'list', component: InspectionsListComponent },
      { path: 'schedule-inspection', component: ScheduleInspectionComponent },
      { path: 'list/:id', component: InspectionDetailsComponent },
      { path: '**', component: InspectionsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionsRoutingModule {}
