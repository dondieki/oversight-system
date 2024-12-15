import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IInspection } from 'src/app/interfaces/inspection.interface';
import { IRunway } from 'src/app/interfaces/runway.interface ';
import { ITaxiway } from 'src/app/interfaces/taxiways.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-initiate-inspection',
  templateUrl: './initiate-inspection.component.html',
  styleUrls: ['./initiate-inspection.component.scss'],
})
export class InitiateInspectionComponent {
  @ViewChild('stepper') private myStepper!: MatStepper;

  @Input() inspectionId!: string;
  @Input() inspection!: IInspection;

  runways: IRunway[] = [];
  taxiways: ITaxiway[] = [];

  isLoading: boolean = false;
  isLinear: boolean = false;

  runwaysOrderStatusFormGroup: FormGroup;
  runwayIssuesFormGroup: FormGroup;

  taxiwaysOrderStatusFormGroup: FormGroup;
  taxiwayIssuesFormGroup: FormGroup;

  airlineOrderStatusFormGroup: FormGroup;
  airlineIssuesFormGroup: FormGroup;

  ansStationOrderStatusFormGroup: FormGroup;
  ansStationIssuesFormGroup: FormGroup;

  maintenanceOrgOrderStatusFormGroup: FormGroup;
  maintenanceIssuesFormGroup: FormGroup;

  booleanValues: string[] = ['Yes', 'No'].sort();

  inspectionTypes: string[] = [
    'Daily Visual Inspections (DVIR)',
    'Regular Safety Inspections',
    'Friction Testing',
    'Runway Surface Condition Assessments',
    'Obstruction Surveys',
    'Wildlife Hazard Inspections',
    'Runway Markings and Lighting Inspections',
    'Compliance Inspections',
  ].sort();

  airwaysInspectionTypes: string[] = [
    'Aircraft Approach Path Checks',
    'Airfield Lighting Inspections',
    'Navigation Aid Inspections',
    'Runway and Taxiway Inspections',
    'Apron Safety Inspections',
    'Wind Shear Monitoring',
    'Airspace Obstruction Analysis',
    'Meteorological Equipment Inspections',
  ].sort();

  ansStationInspectionTypes: string[] = [
    'Communication Equipment Testing',
    'Radar Calibration',
    'Flight Data Processing System Checks',
    'Aeronautical Information Updates',
    'Air Traffic Management Systems Testing',
    'Power Backup System Inspections',
    'Tower Communication Range Checks',
    'Compliance Inspections for ATC Procedures',
  ].sort();

  maintenanceOrgInspectionTypes: string[] = [
    'Aircraft Maintenance Schedule Checks',
    'Tool and Equipment Calibration',
    'Hangar Safety Inspections',
    'Fuel Quality Assurance Testing',
    'Engine and Component Inspections',
    'Logbook and Maintenance Records Audits',
    'Ground Support Equipment Inspections',
    'Regulatory Compliance Inspections',
  ].sort();

  savedRunwayIssues: any[] = [];
  savedTaxiwayIssues: any[] = [];
  savedAirlineIssues: any[] = [];
  savedANSStationIssues: any[] = [];
  savedMaintenanceOrgIssues: any[] = [];

  allRunwayIssues: any[] = [];
  allTaxiwayIssues: any[] = [];
  allAirlineIssues: any[] = [];
  allANSStationIssues: any[] = [];
  allMaintenanceOrgIssues: any[] = [];

  constructor(
    public appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {
    this.runwaysOrderStatusFormGroup = _formBuilder.group({
      orderStatus: ['', Validators.required],
    });
    this.runwayIssuesFormGroup = _formBuilder.group({
      runway: ['', Validators.required],
      inspectionType: ['', Validators.required],
      comment: ['', Validators.required],
    });
    this.taxiwaysOrderStatusFormGroup = _formBuilder.group({
      orderStatus: ['', Validators.required],
    });
    this.taxiwayIssuesFormGroup = _formBuilder.group({
      taxiway: ['', Validators.required],
      inspectionType: ['', Validators.required],
      comment: ['', Validators.required],
    });
    this.airlineOrderStatusFormGroup = _formBuilder.group({
      orderStatus: ['', Validators.required],
    });
    this.airlineIssuesFormGroup = _formBuilder.group({
      inspectionType: ['', Validators.required],
      comment: ['', Validators.required],
    });
    this.ansStationOrderStatusFormGroup = _formBuilder.group({
      orderStatus: ['', Validators.required],
    });
    this.ansStationIssuesFormGroup = _formBuilder.group({
      inspectionType: ['', Validators.required],
      comment: ['', Validators.required],
    });
    this.maintenanceOrgOrderStatusFormGroup = _formBuilder.group({
      orderStatus: ['', Validators.required],
    });
    this.maintenanceIssuesFormGroup = _formBuilder.group({
      inspectionType: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.inspection?.airportId) {
      this.fetchRunwaysList(this.inspection?.airportId);
      this.fetchTaxiwaysList(this.inspection?.airportId);
    }
  }

  goBack() {
    this.myStepper.previous();
  }

  goForward() {
    this.myStepper.next();
  }

  // Runway code

  quickSaveRunwayIssue() {
    if (this.runwayIssuesFormGroup.valid) {
      const payload = {
        airportId: this.inspection?.airportId,
        runwayId: this.runwayIssuesFormGroup.get('runway')?.value._id,
        inspectionType: this.runwayIssuesFormGroup.get('inspectionType')?.value,
        comment: this.runwayIssuesFormGroup.get('comment')?.value,
        entity: 'RUNWAY',
      };
      this.allRunwayIssues.push(payload);
      this.savedRunwayIssues.push(this.runwayIssuesFormGroup.value);
    }
    return;
  }

  saveRunwayIssue() {
    this.quickSaveRunwayIssue();
    if (this.runwayIssuesFormGroup.valid) {
      this.runwayIssuesFormGroup.reset();
      this.runwayIssuesFormGroup.updateValueAndValidity();
    }
  }

  removeRunwayIssue(idx: number) {
    if (idx !== -1) {
      this.savedRunwayIssues.splice(idx, 1);
      this.allRunwayIssues.splice(idx, 1);
    }
  }

  saveAndContinueRunwayIssue() {
    if (this.allRunwayIssues.length > 0) {
      if (
        this.runwayIssuesFormGroup.value &&
        this.runwayIssuesFormGroup.valid
      ) {
        this.saveRunwayIssue();
        this.goForward();
      } else {
        this.goForward();
      }
    } else {
      this.appService.showSnackBarMessage(
        'Atleast one runway issue is required'
      );
    }
  }

  submitRunwayIssues() {
    if (this.allRunwayIssues.length > 0) {
      if (
        this.runwayIssuesFormGroup.value &&
        this.runwayIssuesFormGroup.valid
      ) {
        this.saveRunwayIssue();
        this.submitAllIssues();
      } else {
        this.submitAllIssues();
      }
    } else {
      this.appService.showSnackBarMessage(
        'Atleast one runway issue is required'
      );
    }
  }

  validateRunwayOrderStatusInfo() {
    if (!this.runwaysOrderStatusFormGroup.valid) {
      return;
    }
    this.goForward();
  }

  fetchRunwaysList(selectedAirportId: string) {
    this.isLoading = true;
    const queryParams = `?limit=100`;

    this.appService
      .makeGetRequest(
        `${environment.BASE_URL}/airports/runways/${selectedAirportId}${queryParams}`
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
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

  // Taxiway code

  saveTaxiwayIssue() {
    if (this.taxiwayIssuesFormGroup.valid) {
      const payload = {
        airportId: this.inspection?.airportId,
        taxiwayId: this.taxiwayIssuesFormGroup.get('taxiway')?.value._id,
        inspectionType:
          this.taxiwayIssuesFormGroup.get('inspectionType')?.value,
        comment: this.taxiwayIssuesFormGroup.get('comment')?.value,
        entity: 'TAXIWAY',
      };
      this.allTaxiwayIssues.push(payload);
      this.savedTaxiwayIssues.push(this.taxiwayIssuesFormGroup.value);
      this.taxiwayIssuesFormGroup.reset();
    }
    return;
  }

  saveAndContinueTaxiwayIssue() {
    if (
      this.taxiwayIssuesFormGroup.value &&
      this.taxiwayIssuesFormGroup.valid
    ) {
      this.saveTaxiwayIssue();
      this.submitAllIssues();
    } else {
      this.submitAllIssues();
    }
  }

  validateTaxiwaysOrderStatusInfo() {
    if (!this.taxiwaysOrderStatusFormGroup.valid) {
      return;
    }
    this.goForward();
  }

  removeTaxiwayIssue(idx: number) {
    if (idx !== -1) {
      this.savedTaxiwayIssues.splice(idx, 1);
      this.allTaxiwayIssues.splice(idx, 1);
    }
  }

  // Airline Code
  quickSaveAirlineIssue() {
    if (this.airlineIssuesFormGroup.valid) {
      const payload = {
        airlineId: this.inspection?.airlineId?._id,
        inspectionType:
          this.airlineIssuesFormGroup.get('inspectionType')?.value,
        comment: this.airlineIssuesFormGroup.get('comment')?.value,
        entity: 'AIRLINE',
      };
      this.allAirlineIssues.push(payload);
      this.savedAirlineIssues.push(this.airlineIssuesFormGroup.value);
    }
    return;
  }

  saveAirlineIssue() {
    this.quickSaveAirlineIssue();
    if (this.airlineIssuesFormGroup.valid) {
      this.airlineIssuesFormGroup.reset();
      this.airlineIssuesFormGroup.updateValueAndValidity();
    }
  }

  removeAirlineIssue(idx: number) {
    if (idx !== -1) {
      this.savedAirlineIssues.splice(idx, 1);
      this.allAirlineIssues.splice(idx, 1);
    }
  }

   // ansStation Code
   quickSaveAnsStationIssue() {
    if (this.ansStationIssuesFormGroup.valid) {
      const payload = {
        ansStationId: this.inspection?.ansStationId?._id,
        inspectionType:
          this.ansStationIssuesFormGroup.get('inspectionType')?.value,
        comment: this.ansStationIssuesFormGroup.get('comment')?.value,
        entity: 'ANS STATION',
      };
      this.allANSStationIssues.push(payload);
      this.savedANSStationIssues.push(this.ansStationIssuesFormGroup.value);
    }
    return;
  }

  saveAnsStationIssue() {
    this.quickSaveAnsStationIssue();
    if (this.ansStationIssuesFormGroup.valid) {
      this.ansStationIssuesFormGroup.reset();
      this.ansStationIssuesFormGroup.updateValueAndValidity();
    }
  }

  removeAnsStationIssue(idx: number) {
    if (idx !== -1) {
      this.savedANSStationIssues.splice(idx, 1);
      this.allANSStationIssues.splice(idx, 1);
    }
  }

  // ansStation Code
  quickSaveMaintenanceOrgIssue() {
    if (this.maintenanceIssuesFormGroup.valid) {
      const payload = {
        maintenanceOrgId: this.inspection?.maintenanceOrgId?._id,
        inspectionType:
          this.maintenanceIssuesFormGroup.get('inspectionType')?.value,
        comment: this.maintenanceIssuesFormGroup.get('comment')?.value,
        entity: 'MAINTENANCE ORGANIZATION',
      };
      this.allMaintenanceOrgIssues.push(payload);
      this.savedMaintenanceOrgIssues.push(this.maintenanceIssuesFormGroup.value);
    }
    return;
  }

  saveMaintenanceOrgIssue() {
    this.quickSaveMaintenanceOrgIssue();
    if (this.maintenanceIssuesFormGroup.valid) {
      this.maintenanceIssuesFormGroup.reset();
      this.maintenanceIssuesFormGroup.updateValueAndValidity();
    }
  }

  removeMaintenanceOrgIssue(idx: number) {
    if (idx !== -1) {
      this.allMaintenanceOrgIssues.splice(idx, 1);
      this.savedMaintenanceOrgIssues.splice(idx, 1);
    }
  }

  fetchTaxiwaysList(selectedAirportId: string) {
    this.isLoading = true;

    const queryParams = `?limit=100`;

    this.appService
      .makeGetRequest(
        `${environment.BASE_URL}/airports/taxiways/${selectedAirportId}${queryParams}`
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            const res = response.Payload;
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

  submitAllIssues() {
    if (this.allRunwayIssues.length > 0 || this.allTaxiwayIssues.length > 0) {
      const mergedIssues = [...this.allRunwayIssues, ...this.allTaxiwayIssues];

      this.isLoading = true;

      const request = mergedIssues.map((issue) => {
        return this.appService.makePostRequest(
          `${environment.BASE_URL}/issues`,
          issue
        );
      });

      forkJoin(request).subscribe({
        next: (responses) => {
          this.isLoading = false;
          const allSuccess = responses.every((res: any) => res.Status === 200);
          if (allSuccess) {
            this.appService.showSnackBarMessage(
              'All issues submitted successfully!'
            );
            this.updateInspection();
          } else {
            const errorMessages = responses
              .filter((res: any) => res.Status !== 200)
              .map((res: any) => res.Payload)
              .join(', ');
            this.appService.showSnackBarMessage(`Errors: ${errorMessages}`);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(error)
          );
        },
      });
    } else {
      this.updateInspection();
    }
  }

  submitAirlineIssues() {
    if (this.allAirlineIssues.length > 0) {
      this.isLoading = true;

      const request = this.allAirlineIssues.map((issue) => {
        return this.appService.makePostRequest(
          `${environment.BASE_URL}/issues`,
          issue
        );
      });

      forkJoin(request).subscribe({
        next: (responses) => {
          this.isLoading = false;
          const allSuccess = responses.every((res: any) => res.Status === 200);
          if (allSuccess) {
            this.appService.showSnackBarMessage(
              'All issues submitted successfully!'
            );
            this.updateInspection();
          } else {
            const errorMessages = responses
              .filter((res: any) => res.Status !== 200)
              .map((res: any) => res.Payload)
              .join(', ');
            this.appService.showSnackBarMessage(`Errors: ${errorMessages}`);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(error)
          );
        },
      });
    } else {
      this.updateInspection();
    }
  }

  submitAnsStationIssues() {
    if (this.allANSStationIssues.length > 0) {
      this.isLoading = true;

      const request = this.allANSStationIssues.map((issue) => {
        return this.appService.makePostRequest(
          `${environment.BASE_URL}/issues`,
          issue
        );
      });

      forkJoin(request).subscribe({
        next: (responses) => {
          this.isLoading = false;
          const allSuccess = responses.every((res: any) => res.Status === 200);
          if (allSuccess) {
            this.appService.showSnackBarMessage(
              'All issues submitted successfully!'
            );
            this.updateInspection();
          } else {
            const errorMessages = responses
              .filter((res: any) => res.Status !== 200)
              .map((res: any) => res.Payload)
              .join(', ');
            this.appService.showSnackBarMessage(`Errors: ${errorMessages}`);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(error)
          );
        },
      });
    } else {
      this.updateInspection();
    }
  }

  submitMaintenanceOrgStationIssues() {
    if (this.allMaintenanceOrgIssues.length > 0) {
      this.isLoading = true;

      const request = this.allMaintenanceOrgIssues.map((issue) => {
        return this.appService.makePostRequest(
          `${environment.BASE_URL}/issues`,
          issue
        );
      });

      forkJoin(request).subscribe({
        next: (responses) => {
          this.isLoading = false;
          const allSuccess = responses.every((res: any) => res.Status === 200);
          if (allSuccess) {
            this.appService.showSnackBarMessage(
              'All issues submitted successfully!'
            );
            this.updateInspection();
          } else {
            const errorMessages = responses
              .filter((res: any) => res.Status !== 200)
              .map((res: any) => res.Payload)
              .join(', ');
            this.appService.showSnackBarMessage(`Errors: ${errorMessages}`);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.appService.showSnackBarMessage(
            this.appService.processHttpErrors(error)
          );
        },
      });
    } else {
      this.updateInspection();
    }
  }

  updateInspection() {
    this.isLoading = true;
    this.appService
      .makeUpdateRequest(
        `${environment.BASE_URL}/inspections/${this.inspectionId}`,
        {
          isComplete: true,
        }
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.router.navigate([`/inspections/${this.inspectionId}`]);
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
