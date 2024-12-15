import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { DeleteInspectionComponent } from '../delete-inspection/delete-inspection.component';
import { UpdateInspectionComponent } from '../update-inspection/update-inspection.component';
import { IInspection } from 'src/app/interfaces/inspection.interface';

@Component({
  selector: 'app-inspections-table',
  templateUrl: './inspections-table.component.html',
  styleUrls: ['./inspections-table.component.scss'],
})
export class InspectionsTableComponent {
  @Input() inspections!: IInspection[];
  @Output() inspectionUpdated = new EventEmitter<void>();
  displayedColumns: string[] = [
    'date',
    'inspector',
    'airport',
    'deadline',
    'status',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  navigateDetails(_id: string) {
    this.router.navigate([`/inspections/list/${_id}`]);
  }

  openEditDialog(inspection: IInspection): void {
    const dialogRef = this.dialog.open(UpdateInspectionComponent, {
      data: inspection,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inspectionUpdated.emit();
      }
    });
  }

  openDeleteDialog(inspection: IInspection): void {
    const dialogRef = this.dialog.open(DeleteInspectionComponent, {
      data: inspection,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inspectionUpdated.emit();
      }
    });
  }
}
