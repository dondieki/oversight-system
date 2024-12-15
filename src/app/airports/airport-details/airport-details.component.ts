import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { IRunway } from 'src/app/interfaces/runway.interface ';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AddRunwayComponent } from '../add-runway/add-runway.component';
import { AddTaxiwayComponent } from '../add-taxiway/add-taxiway.component';
import { UpdateAirportComponent } from '../update-airport/update-airport.component';
import { ITaxiway } from 'src/app/interfaces/taxiways.interface';

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.scss'],
})
export class AirportDetailsComponent {
  @Output() airportUpdated = new EventEmitter<void>();
  @Output() runwayUpdated = new EventEmitter<void>();
  @Output() taxiwayUpdated = new EventEmitter<void>();

  entity: string = "airportId";
  airport: IAirport = {} as IAirport;
  runways: IRunway[] = [];
  taxiways: ITaxiway[] = [];

  allRunways: number = 0;
  allTaxiways: number = 0;

  selectedAirportId!: string;
  searchTerm: string = '';
  taxiwaySearchTerm: string = '';

  totalRunways: number = 0;
  totalTaxiways: number = 0;

  pageSize: number = 8;
  pageIndex: number = 0;
  taxiwayPageSize: number = 8;
  taxiwayPageIndex: number = 0;

  isLoading: boolean = false;

  constructor(
    public appService: AppService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.activeRoute.params?.subscribe((p) => {
      this.selectedAirportId = p['id'];
      this.getAirportDetails(this.selectedAirportId);
      this.fetchRunwaysList(this.selectedAirportId);
      this.fetchTaxiwaysList(this.selectedAirportId);
    });
  }

  getAirportDetails(selectedAirportId: string) {
    this.isLoading = true;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/airports/${selectedAirportId}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.airport = res.Payload;
          } else {
            this.appService.showSnackBarMessage(res.Payload);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(error);
        },
      });
  }

  fetchRunwaysList(selectedAirportId: string) {
    this.isLoading = true;
    const queryParams = `?page=${this.pageIndex + 1}&limit=${
      this.pageSize
    }&search=${this.searchTerm}`;

    this.appService
      .makeGetRequest(
        `${environment.BASE_URL}/airports/runways/${selectedAirportId}${queryParams}`
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.totalRunways = res.total;
            this.runways = res.results;
          } else {
            this.appService.showSnackBarMessage(response.Message);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(err)
          );
        },
      });
  }

  fetchTaxiwaysList(selectedAirportId: string) {
    this.isLoading = true;

    const queryParams = `?page=${this.taxiwayPageIndex + 1}&limit=${
      this.taxiwayPageSize
    }&search=${this.taxiwaySearchTerm}`;

    this.appService
      .makeGetRequest(
        `${environment.BASE_URL}/airports/taxiways/${selectedAirportId}${queryParams}`
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.totalTaxiways = res.total;
            this.taxiways = res.results;
          } else {
            this.appService.showSnackBarMessage(response.Message);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(err)
          );
        },
      });
  }

  onSearch(searchValue: string) {
    this.searchTerm = searchValue;
    this.pageIndex = 0;
    this.fetchRunwaysList(this.selectedAirportId);
  }

  onTaxiwaySearch(searchValue: string) {
    this.taxiwaySearchTerm = searchValue;
    this.taxiwayPageIndex = 0;
    this.fetchTaxiwaysList(this.selectedAirportId);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchRunwaysList(this.selectedAirportId);
  }

  onTaxiwayPageChange(event: PageEvent) {
    this.taxiwayPageIndex = event.pageIndex;
    this.taxiwayPageSize = event.pageSize;
    this.fetchTaxiwaysList(this.selectedAirportId);
  }

  openEditAirportDialog(airport: IAirport): void {
    const dialogRef = this.dialog.open(UpdateAirportComponent, {
      data: airport,
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAirportDetails(this.selectedAirportId);
      }
    });
  }

  openAddRunwayDialog() {
    const dialogRef = this.dialog.open(AddRunwayComponent, {
      data: this.selectedAirportId,
      width: '65%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchRunwaysList(this.selectedAirportId);
      }
    });
  }

  openAddTaxiwayDialog() {
    const dialogRef = this.dialog.open(AddTaxiwayComponent, {
      data: this.selectedAirportId,
      width: '65%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchTaxiwaysList(this.selectedAirportId);
      }
    });
  }
}
