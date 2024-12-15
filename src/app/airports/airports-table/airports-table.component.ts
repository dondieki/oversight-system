import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteAirportComponent } from 'src/app/airports/delete-airport/delete-airport.component';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { UpdateAirportComponent } from '../update-airport/update-airport.component';

@Component({
  selector: 'app-airports-table',
  templateUrl: './airports-table.component.html',
  styleUrls: ['./airports-table.component.scss'],
})
export class AirportsTableComponent {
  @Input() airports!: IAirport[];
  @Output() airportUpdated = new EventEmitter<void>();
  displayedColumns: string[] = ['date', 'airport', 'location', 'actions'];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  navigateDetails(_id: string) {
    this.router.navigate([`/airports/list/${_id}`]);
  }

  openEditDialog(airport: IAirport): void {
      const dialogRef = this.dialog.open(UpdateAirportComponent, {
      data: airport,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.airportUpdated.emit();
      }
    });
  }

  openDeleteDialog(airport: IAirport): void {
    const dialogRef = this.dialog.open(DeleteAirportComponent, {
      data: airport,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.airportUpdated.emit();
      }
    });
  }
}
