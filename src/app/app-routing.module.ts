import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'airports',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./airports/airports.module').then((m) => m.AirportsModule),
  },
  {
    path: 'airlines',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./airlines/airlines.module').then((m) => m.AirlinesModule),
  },
  {
    path: 'ans-stations',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./ans-stations/ans-stations.module').then(
        (m) => m.AnsStationsModule
      ),
  },
  {
    path: 'maintenance-organizations',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './maintenance-organizations/maintenance-organizations.module'
      ).then((m) => m.MaintenanceOrganizationsModule),
  },
  {
    path: 'inspections',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./inspections/inspections.module').then(
        (m) => m.InspectionsModule
      ),
  },
  {
    path: 'issues',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./issues/issues.module').then((m) => m.IssuesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
