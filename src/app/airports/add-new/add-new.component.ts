import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  @ViewChild('stepper') private myStepper!: MatStepper;

  isLinear: boolean = true;
  isLoading: boolean = false;

  isBasicInfoLoading: boolean = false;
  isRunwayInfoLoading: boolean = false;

  basicInfoFormGroup: FormGroup;
  runwayFormGroup: FormGroup;
  taxiwayFormGroup: FormGroup;

  booleanValues: any[] = [
    { name: 'Yes', value: true },
    { name: 'No', value: false },
  ];

  savedRunways: any[] = [];
  savedTaxiways: any[] = [];

  surfaceTypes: string[] = ['Murram', 'Bitumen', 'Grass', 'Concrete'].sort();

  savedAirport!: IAirport;
  savedAirportId: any;

  constructor(
    private appService: AppService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.basicInfoFormGroup = _formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[+]*[0-9]{1,3}[ -]?[0-9]{3,14}$/),
        ],
      ],
      physicalAddress: ['', [Validators.required]],
      postalAddress: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });
    this.runwayFormGroup = _formBuilder.group({
      number: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      surfaceType: ['', Validators.required],
      inService: ['', Validators.required],
    });
    this.taxiwayFormGroup = _formBuilder.group({
      number: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      surfaceType: ['', Validators.required],
      inService: ['', Validators.required],
    });
  }

  goBack() {
    this.myStepper.previous();
  }

  goForward() {
    this.myStepper.next();
  }

  submitAirportInformation() {
    if (this.basicInfoFormGroup.valid) {
      this.isBasicInfoLoading = true;
      const payload = this.basicInfoFormGroup.value;
      this.appService
        .makePostRequest(`${environment.BASE_URL}/airports`, payload)
        .subscribe({
          next: (res) => {
            this.isBasicInfoLoading = false;
            if (res.Status === 200) {
              this.savedAirport = res.Payload;
              this.savedAirportId = this.savedAirport._id;
              this.isLinear = false;
              this.goForward();
            } else {
              this.appService.showSnackBarMessage(res.Message);
            }
          },
          error: (error) => {
            this.isBasicInfoLoading = false;
            this.appService.showSnackBarMessage(error);
          },
        });
    } else {
      this.appService.showSnackBarMessage('All fields are required');
    }
  }

  removeRunway(idx: number) {
    if (idx !== -1) {
      this.savedRunways.splice(idx, 1);
    }
  }

  submitRunway() {
    if (!this.runwayFormGroup.valid) {
      this.appService.showSnackBarMessage('All fields are required');
      return;
    }
    let data = this.runwayFormGroup.value;
    const runwayData = { ...data, ...{ airportId: this.savedAirport._id } };
    this.savedRunways.push(runwayData);
    this.runwayFormGroup.reset();
  }

  submitAllRunways() {
    if (this.savedRunways.length > 0) {
      this.isLoading = true;

      const runwayRequests = this.savedRunways.map((runway) =>
        this.appService.makePostRequest(
          `${environment.BASE_URL}/runways`,
          runway
        )
      );

      forkJoin(runwayRequests).subscribe({
        next: (responses) => {
          this.isLoading = false;

          const allSuccess = responses.every((res: any) => res.Status === 200);

          if (allSuccess) {
            this.goForward();
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
          this.appService.showSnackBarMessage(`Error: ${error.message}`);
        },
      });
    } else {
      this.appService.showSnackBarMessage('At least one runway is required');
    }
  }

  submitTaxiway() {
    if (!this.taxiwayFormGroup.valid) {
      this.appService.showSnackBarMessage('All fields are required');
      return;
    }
    let data = this.taxiwayFormGroup.value;
    const taxiwayData = { ...data, ...{ airportId: this.savedAirport._id } };
    this.savedTaxiways.push(taxiwayData);
    this.taxiwayFormGroup.reset();
  }

  removeTaxiway(idx: number) {
    if (idx !== -1) {
      this.savedTaxiways.splice(idx, 1);
    }
  }

  submitAllTaxiways() {
    if (this.savedTaxiways.length > 0) {
      this.isLoading = true;

      const taxiwayRequests = this.savedTaxiways.map((taxiways) =>
        this.appService.makePostRequest(
          `${environment.BASE_URL}/taxiways`,
          taxiways
        )
      );

      forkJoin(taxiwayRequests).subscribe({
        next: (responses) => {
          this.isLoading = false;

          const allSuccess = responses.every((res: any) => res.Status === 200);

          if (allSuccess) {
            this.appService.showSnackBarMessage('Success');
            this.router.navigate(['/airports/list', this.savedAirport._id]);
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
          this.appService.showSnackBarMessage(`Error: ${error.message}`);
        },
      });
    } else {
      this.appService.showSnackBarMessage('At least one taxiways is required');
    }
  }

  submitLater() {
    this.router.navigate(['/airports/list', this.savedAirport._id]);
  }
}
