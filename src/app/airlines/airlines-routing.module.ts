import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { AirlinesDetailsComponent } from './airlines-details/airlines-details.component';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';
import { AirlinesComponent } from './airlines.component';

const routes: Routes = [
  {
    path: '',
    component: AirlinesComponent,
    children: [
      { path: 'list', component: AirlinesListComponent },
      { path: 'add-new', component: AddNewComponent },
      { path: 'list/:id', component: AirlinesDetailsComponent },
      { path: '**', component: AirlinesListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirlinesRoutingModule {}
