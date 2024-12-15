import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssuesTableComponent } from './issues-table/issues-table.component';
import { DeleteIssuesComponent } from './delete-issues/delete-issues.component';
import { UpdateIssueComponent } from './update-issue/update-issue.component';
import { SharedModule } from '../modules/shared/shared.module';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { DownloadReportComponent } from './download-report/download-report.component';

@NgModule({
  declarations: [
    IssuesComponent,
    IssuesListComponent,
    IssuesTableComponent,
    DeleteIssuesComponent,
    UpdateIssueComponent,
    IssueDetailsComponent,
    DownloadReportComponent,
  ],
  imports: [CommonModule, IssuesRoutingModule, SharedModule],
})
export class IssuesModule {}
