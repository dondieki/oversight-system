import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../modules/shared/shared.module';
import { LandingComponent } from './landing/landing.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { InspectorDashboardComponent } from './inspector-dashboard/inspector-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersStatsComponent } from './users-stats/users-stats.component';
import { InspectionsStatsComponent } from './inspections-stats/inspections-stats.component';
import { IssuesStatsComponent } from './issues-stats/issues-stats.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LandingComponent,
    DefaultDashboardComponent,
    InspectorDashboardComponent,
    AdminDashboardComponent,
    UsersStatsComponent,
    InspectionsStatsComponent,
    IssuesStatsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
