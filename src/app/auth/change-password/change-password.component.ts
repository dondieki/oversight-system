import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordFormGroup!: FormGroup;

  isLoading: boolean = false;
  email!: string;
  token!: string;

  constructor(
    private appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Extract token and email from the URL query parameters
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];
    });

    // Initialize the form
    this.changePasswordFormGroup = this._formBuilder.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ),
          ],
        ],
        confirm_password: ['', Validators.required],
      },
      {
        validator: this.passwordsMatchValidator,
      }
    );
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirm_password')?.setErrors(null);
    }
  }

  sendResetEmail() {
    if (this.changePasswordFormGroup.valid) {
      this.isLoading = true;
      this.appService
        .makeAnyPostRequest(`${environment.BASE_URL}/auth/reset-password`, {
          newPassword: this.changePasswordFormGroup.get('newPassword')?.value,
          token: this.token,
          email: this.email,
        })
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              this.appService.showSnackBarMessage('Success');
              this.router.navigate(['/auth/login']);
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
