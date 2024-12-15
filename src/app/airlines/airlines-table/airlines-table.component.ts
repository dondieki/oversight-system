import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateAirlineComponent } from '../update-airline/update-airline.component';
import { DeleteAirlineComponent } from '../delete-airline/delete-airline.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IAirline } from 'src/app/interfaces/airline.interface ';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-airlines-table',
  templateUrl: './airlines-table.component.html',
  styleUrls: ['./airlines-table.component.scss']
})
export class AirlinesTableComponent {
  @Input() airlines!: IAirline[];
  @Output() airlinesUpdated = new EventEmitter<void>();
  displayedColumns: string[] = [
    'date',
    'name',
    'numberOfAircraft',
    'totalPassengers',
    'actions',
  ];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  navigateDetails(_id: string) {
    this.router.navigate([`/airlines/list/${_id}`]);
  }

  openEditDialog(airline: IAirline): void {
    const dialogRef = this.dialog.open(UpdateAirlineComponent, {
      data: airline,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.airlinesUpdated.emit();
      }
    });
  }

  openDeleteDialog(airline: IAirline): void {
    const dialogRef = this.dialog.open(DeleteAirlineComponent, {
      data: airline,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.airlinesUpdated.emit();
      }
    });
  }
}
