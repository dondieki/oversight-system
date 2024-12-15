import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAirline } from 'src/app/interfaces/airline.interface ';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-airlines-details',
  templateUrl: './airlines-details.component.html',
  styleUrls: ['./airlines-details.component.scss'],
})
export class AirlinesDetailsComponent {
  entity: string = 'airlineId';
  airline: IAirline = {} as IAirline;

  selectedAirlineId!: string;

  isLoading: boolean = false;

  constructor(
    public appService: AppService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params?.subscribe((p) => {
      this.selectedAirlineId = p['id'];
      this.getAirlineDetails(this.selectedAirlineId);
    });
  }

  getAirlineDetails(selectedAirlineId: string) {
    this.isLoading = true;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/airlines/${selectedAirlineId}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.airline = res.Payload;
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
}
