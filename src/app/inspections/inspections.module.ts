import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionsRoutingModule } from './inspections-routing.module';
import { InspectionsComponent } from './inspections.component';
import { SharedModule } from '../modules/shared/shared.module';
import { InspectionsListComponent } from './inspections-list/inspections-list.component';
import { InspectionsTableComponent } from './inspections-table/inspections-table.component';
import { AddNewComponent } from './add-new/add-new.component';
import { InspectionDetailsComponent } from './inspection-details/inspection-details.component';
import { UpdateInspectionComponent } from './update-inspection/update-inspection.component';
import { DeleteInspectionComponent } from './delete-inspection/delete-inspection.component';
import { ScheduleInspectionComponent } from './schedule-inspection/schedule-inspection.component';
import { InitiateInspectionComponent } from './initiate-inspection/initiate-inspection.component';
import { BasicDetailsLoaderComponent } from './basic-details-loader/basic-details-loader.component';
import { InitiateInspectionsLoaderComponent } from './initiate-inspections-loader/initiate-inspections-loader.component';
import { DownloadReportComponent } from './download-report/download-report.component';


@NgModule({
  declarations: [
    InspectionsComponent,
    InspectionsListComponent,
    InspectionsTableComponent,
    AddNewComponent,
    InspectionDetailsComponent,
    UpdateInspectionComponent,
    DeleteInspectionComponent,
    ScheduleInspectionComponent,
    InitiateInspectionComponent,
    BasicDetailsLoaderComponent,
    InitiateInspectionsLoaderComponent,
    DownloadReportComponent
  ],
  imports: [
    CommonModule,
    InspectionsRoutingModule,
    SharedModule
  ]
})
export class InspectionsModule { }
