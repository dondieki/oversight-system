import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IANSStation } from 'src/app/interfaces/ans-station.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ans-stations-details',
  templateUrl: './ans-stations-details.component.html',
  styleUrls: ['./ans-stations-details.component.scss'],
})
export class AnsStationsDetailsComponent {
  entity: string = 'ansStationId';
  ansStation: IANSStation = {} as IANSStation;

  selectedansStationId!: string;

  isLoading: boolean = false;

  constructor(
    public appService: AppService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params?.subscribe((p) => {
      this.selectedansStationId = p['id'];
      this.getAnsStationDetails(this.selectedansStationId);
    });
  }

  getAnsStationDetails(selectedansStationId: string) {
    this.isLoading = true;
    this.appService
      .makeGetRequest(
        `${environment.BASE_URL}/ans-stations/${selectedansStationId}`
      )
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.ansStation = res.Payload;
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
