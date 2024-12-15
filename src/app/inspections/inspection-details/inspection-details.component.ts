import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInspection } from 'src/app/interfaces/inspection.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inspection-details',
  templateUrl: './inspection-details.component.html',
  styleUrls: ['./inspection-details.component.scss'],
})
export class InspectionDetailsComponent {
  selectedRecordId!: string;
  inspection!: IInspection;
  isLoading: boolean = false;
  constructor(
    private appService: AppService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.params?.subscribe((p) => {
      this.selectedRecordId = p['id'];
      this.getInspectionDetails(this.selectedRecordId);
    });
  }
  ngOnChanges(): void {}

  getInspectionDetails(selectedRecordId: string) {
    this.isLoading = true;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/inspections/${selectedRecordId}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.inspection = response.Payload;
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
}
