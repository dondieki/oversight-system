import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../modules/shared/shared.module';
import { AddNewComponent } from './add-new/add-new.component';
import { AnsStationsDetailsComponent } from './ans-stations-details/ans-stations-details.component';
import { AnsStationsListComponent } from './ans-stations-list/ans-stations-list.component';
import { AnsStationsRoutingModule } from './ans-stations-routing.module';
import { AnsStationsTableComponent } from './ans-stations-table/ans-stations-table.component';
import { AnsStationsComponent } from './ans-stations.component';
import { DeleteAnsStationComponent } from './delete-ans-station/delete-ans-station.component';
import { UpdateAnsStationComponent } from './update-ans-station/update-ans-station.component';

@NgModule({
  declarations: [
    AnsStationsComponent,
    AddNewComponent,
    AnsStationsListComponent,
    DeleteAnsStationComponent,
    UpdateAnsStationComponent,
    AnsStationsTableComponent,
    AnsStationsDetailsComponent,
  ],
  imports: [CommonModule, AnsStationsRoutingModule, SharedModule],
})
export class AnsStationsModule {}
