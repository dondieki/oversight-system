import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BaseLayoutComponent } from 'src/app/components/base-layout/base-layout.component';
import { InspectionsComponent } from 'src/app/components/inspections/inspections.component';
import { IssuesComponent } from 'src/app/components/issues/issues.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { SideNavComponent } from 'src/app/components/side-nav/side-nav.component';

// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TableInspectionsComponent } from 'src/app/components/table-inspections/table-inspections.component';
import { TableIssuesComponent } from 'src/app/components/table-issues/table-issues.component';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    SideNavComponent,
    LoaderComponent,
    PaginationComponent,
    NavbarComponent,
    SearchComponent,
    IssuesComponent,
    InspectionsComponent,
    TableIssuesComponent,
    TableInspectionsComponent,
    // CustomTableComponent,
  ],
  imports: [
    // Packages
    CommonModule,
    RouterOutlet,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Material Components
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  exports: [
    // Packages
    RouterModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    // Components
    BaseLayoutComponent,
    SideNavComponent,
    LoaderComponent,
    PaginationComponent,
    NavbarComponent,
    SearchComponent,
    IssuesComponent,
    TableIssuesComponent,
    TableInspectionsComponent,
    InspectionsComponent,
    // CustomTableComponent,
    // Material Components
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  providers: [],
})
export class SharedModule {}
