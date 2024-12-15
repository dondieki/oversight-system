import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../modules/shared/shared.module';
import { AddNewComponent } from './add-new/add-new.component';
import { AddRunwayComponent } from './add-runway/add-runway.component';
import { AddTaxiwayComponent } from './add-taxiway/add-taxiway.component';
import { AirportDetailsComponent } from './airport-details/airport-details.component';
import { AirportsListComponent } from './airports-list/airports-list.component';
import { AirportsRoutingModule } from './airports-routing.module';
import { AirportsTableComponent } from './airports-table/airports-table.component';
import { AirportsComponent } from './airports.component';
import { DeleteAirportComponent } from './delete-airport/delete-airport.component';
import { DeleteRunwayComponent } from './delete-runway/delete-runway.component';
import { DeleteTaxiwayComponent } from './delete-taxiway/delete-taxiway.component';
import { RunwaysTableComponent } from './runways-table/runways-table.component';
import { TaxiwaysTableComponent } from './taxiways-table/taxiways-table.component';
import { UpdateAirportComponent } from './update-airport/update-airport.component';
import { UpdateRunwayComponent } from './update-runway/update-runway.component';
import { UpdateTaxiwayComponent } from './update-taxiway/update-taxiway.component';


@NgModule({
  declarations: [
    AirportsComponent,
    AirportsListComponent,
    AirportsTableComponent,
    AddNewComponent,
    AirportDetailsComponent,
    RunwaysTableComponent,
    DeleteAirportComponent,
    UpdateAirportComponent,
    UpdateRunwayComponent,
    DeleteRunwayComponent,
    AddRunwayComponent,
    TaxiwaysTableComponent,
    UpdateTaxiwayComponent,
    DeleteTaxiwayComponent,
    AddTaxiwayComponent
  ],
  imports: [
    CommonModule,
    AirportsRoutingModule,
    SharedModule
  ]
})
export class AirportsModule { }
