import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IAirline } from 'src/app/interfaces/airline.interface ';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { IANSStation } from 'src/app/interfaces/ans-station.interface';
import { IMaintenanceOrganization } from 'src/app/interfaces/maintenance-organizations.interface ';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';
import { AddNewComponent } from '../add-new/add-new.component';

@Component({
  selector: 'app-schedule-inspection',
  templateUrl: './schedule-inspection.component.html',
  styleUrls: ['./schedule-inspection.component.scss'],
})
export class ScheduleInspectionComponent {
  @Output() inspectionUpdated = new EventEmitter<void>();

  scheduleInspectionFormGroup: FormGroup;

  inspectors: IUser[] = [];
  airports: IAirport[] = [];
  airlines: IAirline[] = [];
  ansStations: IANSStation[] = [];
  maintenanceOrgs: IMaintenanceOrganization[] = [];
  isLoading: boolean = false;

  inspectionTypes: string[] = [
    'Airport',
    'Airline',
    'ANS Station',
    'Maintenance Organization',
  ].sort();

  constructor(
    private _formBuilder: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<AddNewComponent>
  ) {
    this.scheduleInspectionFormGroup = _formBuilder.group({
      airport: [null],
      airline: [null],
      ansStation: [null],
      maintenanceOrg: [null],
      inspectionType: ['', Validators.required],
      inspector: ['', Validators.required],
      _deadline: ['', [Validators.required, this.deadlineValidator]],
    });

    // Watch for changes to inspectionType
    this.scheduleInspectionFormGroup
      .get('inspectionType')
      ?.valueChanges.subscribe((type) => this.onInspectionTypeChange(type));
  }

  ngOnInit() {
    this.fetchInspectors();
    this.fetchAirportsList();
    this.fetchAirlinesList();
    this.fetchANSStationsList();
    this.fetchMaintenanceOrgList();
  }

  // Custom validator for deadline date
  deadlineValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day for accurate comparison

    if (selectedDate < today) {
      return { invalidDeadline: 'Deadline cannot be in the past.' };
    }
    return null;
  }

  onInspectionTypeChange(type: string) {
    const controls = this.scheduleInspectionFormGroup.controls;

    // Reset all fields before applying specific visibility/required rules
    controls['airport'].clearValidators();
    controls['airline'].clearValidators();
    controls['ansStation'].clearValidators();
    controls['maintenanceOrg'].clearValidators();

    // Hide all options
    this.hideAllFields();

    // Make relevant fields visible and required
    if (type === 'ANS Station') {
      controls['ansStation'].setValidators([Validators.required]);
    } else if (type === 'Airport') {
      controls['airport'].setValidators([Validators.required]);
    } else if (type === 'Airline') {
      controls['airline'].setValidators([Validators.required]);
    } else if (type === 'Maintenance Organization') {
      controls['maintenanceOrg'].setValidators([Validators.required]);
    }

    // Update validation based on changes
    controls['airport'].updateValueAndValidity();
    controls['airline'].updateValueAndValidity();
    controls['ansStation'].updateValueAndValidity();
    controls['maintenanceOrg'].updateValueAndValidity();
  }

  hideAllFields() {
    const controls = this.scheduleInspectionFormGroup.controls;

    // Hide the fields by clearing all validators
    controls['airport'].setValidators(null);
    controls['airline'].setValidators(null);
    controls['ansStation'].setValidators(null);
    controls['maintenanceOrg'].setValidators(null);
  }

  fetchInspectors() {
    this.isLoading = true;
    const queryParams = `?limit=100&role=inspector`;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/users${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.inspectors = response.Payload.results;
            this.inspectors.sort((a, b) => a.createdAt - b.createdAt);
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

  fetchAirportsList() {
    this.isLoading = true;
    const queryParams = `?limit=100`;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/airports${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.airports = response.Payload.results;
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

  fetchAirlinesList() {
    this.isLoading = true;
    const queryParams = `?limit=100`;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/airlines${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.airlines = response.Payload.results;
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

  fetchANSStationsList() {
    this.isLoading = true;
    const queryParams = `?limit=100`;
    this.appService
      .makeGetRequest(`${environment.BASE_URL}/ans-stations${queryParams}`)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.ansStations = response.Payload.results;
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

  fetchMaintenanceOrgList() {
    this.isLoading = true;
    const queryParams = `?limit=100`;
    this.appService
      .makeGetRequest(
        `${environment.BASE_URL}/maintenance-organizations${queryParams}`
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.Status === 200) {
            this.maintenanceOrgs = response.Payload.results;
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

  scheduleInspection() {
    if (this.scheduleInspectionFormGroup.valid) {
      const deadline = this.scheduleInspectionFormGroup.get('_deadline')?.value;
      const timestamp = new Date(deadline).getTime(); // Convert to timestamp

      const payload = {
        airportId: this.scheduleInspectionFormGroup.get('airport')?.value,
        airlineId: this.scheduleInspectionFormGroup.get('airline')?.value,
        ansStationId:
          this.scheduleInspectionFormGroup.get('ansStation')?.value,
        maintenanceOrgId:
          this.scheduleInspectionFormGroup.get('maintenanceOrg')?.value,
        inspectorId: this.scheduleInspectionFormGroup.get('inspector')?.value,
        _deadline: timestamp,
        isComplete: false,
      };

      this.appService
        .makeAnyPostRequest(`${environment.BASE_URL}/inspections`, payload)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage(
                'Inspection scheduled successfully!'
              );
              this.dialogRef.close(true);
            } else {
              this.appService.showSnackBarMessage(res.Message);
              this.dialogRef.close(false);
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.appService.showSnackBarMessage(
              this.appService.processHttpErrors(err)
            );
            this.dialogRef.close(false);
          },
        });
    }
  }
}
