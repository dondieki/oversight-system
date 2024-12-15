import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITaxiway } from 'src/app/interfaces/taxiways.interface';
import { AppService } from 'src/app/services/app.service';
import { DeleteTaxiwayComponent } from '../delete-taxiway/delete-taxiway.component';
import { UpdateTaxiwayComponent } from '../update-taxiway/update-taxiway.component';

@Component({
  selector: 'app-taxiways-table',
  templateUrl: './taxiways-table.component.html',
  styleUrls: ['./taxiways-table.component.scss'],
})
export class TaxiwaysTableComponent {
  @Input() taxiways!: ITaxiway[];
  @Output() taxiwayUpdated = new EventEmitter<void>();
  displayedColumns: string[] = [
    'date',
    'number',
    'width',
    'surfaceType',
    'inService',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  openEditDialog(taxiway: ITaxiway): void {
    const dialogRef = this.dialog.open(UpdateTaxiwayComponent, {
      data: taxiway,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taxiwayUpdated.emit();
      }
    });
  }

  openDeleteDialog(taxiway: ITaxiway): void {
    const dialogRef = this.dialog.open(DeleteTaxiwayComponent, {
      data: taxiway?._id,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.taxiwayUpdated.emit();
      }
    });
  }
}
