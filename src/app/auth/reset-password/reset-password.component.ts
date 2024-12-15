import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  isLoading: boolean = false;
  userEmail!: string;
  resetPasswordFormGroup!: FormGroup;

  constructor(
    private appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetPasswordFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetEmail() {
    if (this.resetPasswordFormGroup.valid) {
      this.isLoading = true;
      this.appService
        .makeAnyPostRequest(
          `${environment.BASE_URL}/auth/request-reset`,
          this.resetPasswordFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.userEmail = res.Payload.email;
            } else {
              this.appService.showSnackBarMessage(res.Message);
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
