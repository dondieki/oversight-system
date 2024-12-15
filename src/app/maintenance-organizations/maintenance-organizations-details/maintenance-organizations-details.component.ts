import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMaintenanceOrganization } from 'src/app/interfaces/maintenance-organizations.interface ';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maintenance-organizations-details',
  templateUrl: './maintenance-organizations-details.component.html',
  styleUrls: ['./maintenance-organizations-details.component.scss']
})
export class MaintenanceOrganizationsDetailsComponent {
  entity: string = 'maintenanceOrgId';
  maintenanceOrganization: IMaintenanceOrganization = {} as IMaintenanceOrganization;

  selectedmaintenanceOrganizationId!: string;

  isLoading: boolean = false;

  constructor(
    public appService: AppService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params?.subscribe((p) => {
      this.selectedmaintenanceOrganizationId = p['id'];
      this.getMaintenanceOrganizationeDetails(this.selectedmaintenanceOrganizationId);
    });
  }

  getMaintenanceOrganizationeDetails(selectedmaintenanceOrganizationId: string) {
    this.isLoading = true;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/maintenance-organizations/${selectedmaintenanceOrganizationId}`)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.Status === 200) {
            this.maintenanceOrganization = res.Payload;
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
