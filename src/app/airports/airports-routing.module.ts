import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirportsComponent } from './airports.component';
import { AirportsListComponent } from './airports-list/airports-list.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AddNewComponent } from './add-new/add-new.component';

const routes: Routes = [
  {
    path: '',
    component: AirportsComponent,
    children: [
      { path: 'list', component: AirportsListComponent },
      { path: 'add-airport', component: AddNewComponent },
      { path: 'list/:id', component: AirportDetailsComponent },
      { path: '**', component: AirportsListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirportsRoutingModule {}
