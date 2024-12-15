import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user.roles.enums';
import { IUser } from 'src/app/interfaces/user.interface';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading: boolean = false;
  loginFormGroup!: FormGroup;

  constructor(
    private appService: AppService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  forgotPassword() {
    this.router.navigate(['/auth/reset-password']);
  }

  login() {
    if (this.loginFormGroup.valid) {
      this.isLoading = true;
      this.appService
        .makeAnyPostRequest(
          `${environment.BASE_URL}/auth/login`,
          this.loginFormGroup.value
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.Status === 200) {
              const user: IUser = res.Payload?.user;
              this.appService.setSessionUser(user);
              if (user.role === UserRole.Inspector) {
                this.router.navigate(['airports']);
              } else {
                this.router.navigate(['dashboard']);
              }
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
