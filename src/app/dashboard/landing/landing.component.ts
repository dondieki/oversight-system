import { Component } from '@angular/core';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { IInspection } from 'src/app/interfaces/inspection.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  isAirportsLoading: boolean = false;
  isInspectionsLoading: boolean = false;
  isUsersLoading: boolean = false;
  airports: number = 0;
  inspections: number = 0;
  users: number = 0;
  user!: IUser;

  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.user = this.appService.getSessionUser();
    this.fetchAirportList();
    this.fetchInspectionsList();
    this.fetchUserssList();
  }

  fetchAirportList() {
    this.isAirportsLoading = true;
    const pipeline: any = {
      pipeline: [{ $match: {} }, { $project: { _id: 1 } }],
    };
    this.appService
      .makePostRequest(`${environment.BASE_URL}/list`, pipeline)
      .subscribe(
        (res) => {
          this.isAirportsLoading = false;
          if (res.Status === 200) {
            let payload: IAirport[] = res.Payload;
            if (payload.length > 0) {
              this.airports = payload.length;
            }
          } else {
            this.appService.showSnackBarMessage(res.Payload);
          }
        },
        (error) => {
          this.isAirportsLoading = false;
          this.appService.showSnackBarMessage('Error! Something went wrong');
        }
      );
  }

  fetchInspectionsList() {
    this.isInspectionsLoading = true;
    const pipeline: any = {
      pipeline: [{ $match: {} }, { $project: { _id: 1 } }],
    };
    this.appService
      .makePostRequest(`${environment.BASE_URL}/list`, pipeline)
      .subscribe(
        (res) => {
          this.isInspectionsLoading = false;
          if (res.Status === 200) {
            let payload: IInspection[] = res.Payload;
            if (payload.length > 0) {
              this.inspections = payload.length;
            }
          } else {
            this.appService.showSnackBarMessage(res.Payload);
          }
        },
        (error) => {
          this.isInspectionsLoading = false;
          this.appService.showSnackBarMessage('Error! Something went wrong');
        }
      );
  }

  fetchUserssList() {
    this.isInspectionsLoading = true;
    const pipeline: any = {
      pipeline: [{ $match: {} }, { $project: { _id: 1 } }],
    };
    this.appService
      .makePostRequest(`${environment.BASE_URL}/list`, pipeline)
      .subscribe(
        (res) => {
          this.isUsersLoading = false;
          if (res.Status === 200) {
            let payload: IUser[] = res.Payload;
            if (payload.length > 0) {
              this.users = payload.length;
            }
          } else {
            this.appService.showSnackBarMessage(res.Payload);
          }
        },
        (error) => {
          this.isUsersLoading = false;
          this.appService.showSnackBarMessage('Error! Something went wrong');
        }
      );
  }
}
