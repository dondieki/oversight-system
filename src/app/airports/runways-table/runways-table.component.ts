import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IRunway } from 'src/app/interfaces/runway.interface ';
import { AppService } from 'src/app/services/app.service';
import { DeleteRunwayComponent } from '../delete-runway/delete-runway.component';
import { UpdateRunwayComponent } from '../update-runway/update-runway.component';

@Component({
  selector: 'app-runways-table',
  templateUrl: './runways-table.component.html',
  styleUrls: ['./runways-table.component.scss']
})

export class RunwaysTableComponent {
  @Input() runways!: IRunway[];
  @Output() runwayUpdated = new EventEmitter<void>();
  displayedColumns: string[] = ['date', 'number', 'width', 'surfaceType', 'inService', 'actions'];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  openEditDialog(runway: IRunway): void {
      const dialogRef = this.dialog.open(UpdateRunwayComponent, {
      data: runway,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.runwayUpdated.emit();
      }
    });
  }

  openDeleteDialog(runway: IRunway): void {
    const dialogRef = this.dialog.open(DeleteRunwayComponent, {
      data: runway?._id,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.runwayUpdated.emit();
      }
    });
  }
}
