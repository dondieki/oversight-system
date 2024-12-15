import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-airports-list',
  templateUrl: './airports-list.component.html',
  styleUrls: ['./airports-list.component.scss'],
})
export class AirportsListComponent {
  isLoading: boolean = false;
  airports: IAirport[] = [];
  allAirports: number = 0;
  totalResAirport: number = 0;
  searchTerm: string = '';
  pageSize: number = 8;
  pageIndex: number = 0;

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAirportsList();
  }

  // Fetch airports with optional filters (pagination and search)
  fetchAirportsList() {
    this.isLoading = true;
    const queryParams = `?page=${this.pageIndex + 1}&limit=${
      this.pageSize
    }&search=${this.searchTerm}`;

    this.appService
      .makeGetRequest(`${environment.BASE_URL}/airports${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
            this.allAirports = res.total;
            this.airports = res.results;
            this.totalResAirport = this.airports.length;
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

  // Handle search changes
  onSearch(searchValue: string) {
    this.searchTerm = searchValue;
    this.pageIndex = 0; // Reset to first page when searching
    this.fetchAirportsList();
  }

  // Handle page changes from pagination
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchAirportsList();
  }

  addAirport() {
    this.router.navigate(['/airports/add-airport']);
  }
}
