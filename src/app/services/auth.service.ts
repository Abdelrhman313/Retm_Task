import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint: any = environment.endPoint;

  constructor(private _HttpClient: HttpClient) {}

  // ======= check token =======
  checkToken(token: any): any {
    return this._HttpClient.get(`${this.endPoint}/check.php?get=${token}`).pipe(
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
      .get(`${this.endPoint}/check.php?serviceCode=${code}`)
      .pipe(
        catchError((err) => {
          return throwError(
            () => new Error(err.message || 'Unstable Connection')
          );
        })
      );
  }
}
