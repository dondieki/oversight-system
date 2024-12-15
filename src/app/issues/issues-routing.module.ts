import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from './issues.component';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';

const routes: Routes = [
  {
    path: '',
    component: IssuesComponent,
    children: [
      { path: 'list', component: IssuesListComponent },
      { path: 'list/details/:id', component: IssueDetailsComponent },
      { path: '**', component: IssuesListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuesRoutingModule {}
