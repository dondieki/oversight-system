import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IANSStation } from 'src/app/interfaces/ans-station.interface';
import { AppService } from 'src/app/services/app.service';
import { UpdateAnsStationComponent } from '../update-ans-station/update-ans-station.component';
import { DeleteAnsStationComponent } from '../delete-ans-station/delete-ans-station.component';

@Component({
  selector: 'app-ans-stations-table',
  templateUrl: './ans-stations-table.component.html',
  styleUrls: ['./ans-stations-table.component.scss'],
})
export class AnsStationsTableComponent {
  @Input() ANSStations!: IANSStation[];
  @Output() ANSStationsUpdated = new EventEmitter<void>();
  displayedColumns: string[] = ['date', 'name', 'services', 'actions'];

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private router: Router
  ) {}

  navigateDetails(_id: string) {
    this.router.navigate([`/ans-stations/list/${_id}`]);
  }

  openEditDialog(ANSStation: IANSStation): void {
    const dialogRef = this.dialog.open(UpdateAnsStationComponent, {
      data: ANSStation,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ANSStationsUpdated.emit();
      }
    });
  }

  openDeleteDialog(ANSStation: IANSStation): void {
    const dialogRef = this.dialog.open(DeleteAnsStationComponent, {
      data: ANSStation,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ANSStationsUpdated.emit();
      }
    });
  }
}
