import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirlinesRoutingModule } from './airlines-routing.module';
import { AirlinesComponent } from './airlines.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';
import { DeleteAirlineComponent } from './delete-airline/delete-airline.component';
import { UpdateAirlineComponent } from './update-airline/update-airline.component';
import { AirlinesTableComponent } from './airlines-table/airlines-table.component';
import { SharedModule } from '../modules/shared/shared.module';
import { AirlinesDetailsComponent } from './airlines-details/airlines-details.component';


@NgModule({
  declarations: [
    AirlinesComponent,
    AddNewComponent,
    AirlinesListComponent,
    DeleteAirlineComponent,
    UpdateAirlineComponent,
    AirlinesTableComponent,
    AirlinesDetailsComponent
  ],
  imports: [
    CommonModule,
    AirlinesRoutingModule,
    SharedModule
  ]
})
export class AirlinesModule { }
