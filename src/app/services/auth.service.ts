import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint: string = env.endPoint;

  constructor(private _HttpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      content: 'application/json',
      Accept: '*/*',
      // Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
    }),
  };

  // ======= check token =======
  checkToken(token: any): any {
    return this._HttpClient
      .get(`${this.endPoint}/check.php?get=${token}`, this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(
            () => new Error(err.message || 'Unstable Connection')
          );
        })
      );
  }

  // ======= check Service Code =======
  checkServiceCode(code: any): any {
    return this._HttpClient
      .get(`${this.endPoint}/check.php?serviceCode=${code}`, this.httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(
            () => new Error(err.message || 'Unstable Connection')
          );
        })
      );
  }
}
