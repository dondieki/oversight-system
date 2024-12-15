import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  inviteUserFormGroup: FormGroup;
  isLoading: boolean = false;
  roles: string[] = ['admin', 'supervisor', 'inspector'].sort();

  constructor(
    private appService: AppService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.inviteUserFormGroup = this._formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[+]*[0-9]{1,3}[ -]?[0-9]{3,14}$/),
        ],
      ],
      idNumber: ['', [Validators.required]],
      role: ['', Validators.required],
    });
  }

  inviteUser() {
    if (this.inviteUserFormGroup.valid) {
      this.isLoading = true;
      this.appService
        .makePostRequest(
          `${environment.BASE_URL}/auth/send-invite`,
          this.inviteUserFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 201) {
              this.appService.showSnackBarMessage('Invite sent successfully!');
              this.router.navigate(['/users']);
            } else {
              this.appService.showSnackBarMessage(res.Payload);
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
}
