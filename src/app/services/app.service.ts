import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from '../enums/user.roles.enums';
import { ApiResponse } from '../interfaces/api-reponse.interface';
import { IUser } from '../interfaces/user.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}
  setSessionUser(authUser: IUser) {
    // This function is used to set the authenticated user in the session storage
    sessionStorage.setItem('user', JSON.stringify(authUser));
  }

  getSessionUser(): IUser {
    // This function is used to get the authenticated user from the session storage
    let userString: any = sessionStorage.getItem('user');
    let sessionUser: IUser = JSON.parse(userString);
    return sessionUser;
  }

  isAdmin(): boolean {
    return this.getSessionUser().role === UserRole.Admin;
  }

  isSupervisor(): boolean {
    return this.getSessionUser().role === UserRole.Supervisor;
  }

  isInspector(): boolean {
    return this.getSessionUser().role === UserRole.Inspector;
  }

  makeAnyPostRequest(fullUrl: string, data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(fullUrl, data, httpOptions);
  }

  makeGetRequest(fullUrl: string): Observable<ApiResponse> {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${this.getSessionUser().token}`
    );
    return this.http.get<ApiResponse>(fullUrl, httpOptions);
  }

  makePostRequest(fullUrl: string, data: any): Observable<ApiResponse> {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${this.getSessionUser().token}`
    );
    return this.http.post<ApiResponse>(fullUrl, data, httpOptions);
  }

  makeUpdateRequest(fullUrl: string, data: any): Observable<ApiResponse> {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${this.getSessionUser().token}`
    );
    return this.http.put<ApiResponse>(fullUrl, data, httpOptions);
  }

  makeDeleteRequest(fullUrl: string): Observable<ApiResponse> {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${this.getSessionUser().token}`
    );
    return this.http.delete<ApiResponse>(fullUrl, httpOptions);
  }

  showSnackBarMessage(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['auth/login']);
  }

  processHttpErrors(err: any) {
    let e = err.error;

    if (e.Status === 403) {
      this.logout();
      return `Session Expired. Log in afresh`;
    }

    if (e.Status === 401) {
      return e.Message?.message ?? e.Message;
    }

    return e.Message ?? e.Payload ?? 'Internal Server Error!';
  }
}
