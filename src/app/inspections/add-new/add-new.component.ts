import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { IAirport } from 'src/app/interfaces/airport.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

interface AirportInformation {
  _id: string;
  name: string;
}
@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  @ViewChild('stepper') private myStepper!: MatStepper;

  isLinear: boolean = true;
  isLoading: boolean = false;

  airportNameFormGroup: FormGroup;
  inspectorFormGroup: FormGroup;
  questionsFormGroup: FormGroup;
  operationsManagerFormGroup: FormGroup;
  issuesFormGroup: FormGroup;

  booleanValues: any[] = [
    { name: 'Yes', value: 'Yes' },
    { name: 'No', value: 'No' },
  ];

  inspectionTypes: any[] = [
    'Runway Inspections',
    'Taxiway and Apron Inspections',
    'Lighting and Navigational Aids',
    'Foreign Object Debris (FOD)',
    'Perimeter Security',
    'Wildlife Control',
    'Pavement and Surface Condition',
    'Emergency Readiness',
    'Environmental Compliance',
    'Security Patrols',
  ];

  runwayInspectionTypes: string[] = [
    'Daily Visual Inspections (DVIR)',
    'Regular Safety Inspections',
    'Friction Testing',
    'Runway Surface Condition Assessments',
    'Obstruction Surveys',
    'Wildlife Hazard Inspections',
    'Runway Markings and Lighting Inspections',
    'Compliance Inspections',
  ];

  savedIssues: any[] = [];
  airportsList: IAirport[] = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.airportNameFormGroup = _formBuilder.group({
      airportName: ['', Validators.required],
    });
    this.operationsManagerFormGroup = _formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
    });
    this.inspectorFormGroup = _formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
    });
    this.questionsFormGroup = _formBuilder.group({
      allRunwaysInOrder: ['', [Validators.required]],
    });
    this.issuesFormGroup = _formBuilder.group({
      runwayNumber: ['', [Validators.required]],
      issue: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchAirportsList();
  }

  goBack() {
    this.myStepper.previous();
  }

  goForward() {
    this.myStepper.next();
  }

  validateAirportInformation() {
    if (this.airportNameFormGroup.valid) {
      this.goForward();
    } else {
      this.appService.showSnackBarMessage('All fields are required');
    }
  }

  validateInspectorInformation() {
    if (this.inspectorFormGroup.valid) {
      this.goForward();
    } else {
      this.appService.showSnackBarMessage('All fields are required');
    }
  }

  validateQuestionsInformation() {
    if (this.questionsFormGroup.valid) {
      this.goForward();
    } else {
      this.appService.showSnackBarMessage('All fields are required');
    }
  }

  validateORInformation() {
    if (this.operationsManagerFormGroup.valid) {
      this.goForward();
    } else {
      this.appService.showSnackBarMessage('All fields are required');
    }
  }

  validateIssuesInformation() {
    if (this.issuesFormGroup.valid) {
      this.goForward();
    } else {
      this.appService.showSnackBarMessage('All fields are required');
    }
  }

  submitIssue() {
    if (!this.issuesFormGroup.valid) {
      this.appService.showSnackBarMessage('Please fill the form correctly');
      this.appService.showSnackBarMessage('Please fill the form correctly');
      return;
    }
    let data = this.issuesFormGroup.value;
    this.savedIssues.push(data);
  }

  removeIssue(idx: number) {
    if (idx !== -1) {
      this.savedIssues.splice(idx, 1);
    }
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
            const res = response.Payload;
            this.airportsList = res.results;
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

  submitInspection() {
    if (
      this.questionsFormGroup.get('allRunwaysInOrder')?.value === 'No' &&
      this.savedIssues.length < 0
    ) {
      this.appService.showSnackBarMessage(
        'Please add the noticed in-orders on the runways'
      );
      return;
    } else {
      this.isLoading = true;
      const payload = {
        airportName: this.airportNameFormGroup.get('airportName')?.value,
        operationsManager: this.operationsManagerFormGroup.value,
        inspector: this.inspectorFormGroup.value,
        runwaysInOrder: this.questionsFormGroup.get('runwaysInOrder')?.value,
        issues: this.savedIssues,
      };
      this.appService
        .makePostRequest(`${environment.BASE_URL}/new`, payload)
        .subscribe(
          (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage('Success');
              this.router.navigate(['/inspections', res.Payload._id]);
            } else {
              this.appService.showSnackBarMessage(res.Payload);
            }
          },
          (error) => {
            this.appService.showSnackBarMessage('Error! Something went wrong');
          }
        );
    }
  }
}
