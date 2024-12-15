import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../modules/shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { AddNewComponent } from './add-new/add-new.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { DownloadReportComponent } from './download-report/download-report.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersTableComponent,
    AddNewComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    DownloadReportComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
