import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteInspectionComponent } from 'src/app/inspections/delete-inspection/delete-inspection.component';
import { UpdateInspectionComponent } from 'src/app/inspections/update-inspection/update-inspection.component';
import { IInspection } from 'src/app/interfaces/inspection.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-table-inspections',
  templateUrl: './table-inspections.component.html',
  styleUrls: ['./table-inspections.component.scss']
})
export class TableInspectionsComponent {
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
