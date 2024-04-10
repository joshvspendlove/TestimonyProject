import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedin: boolean;
  private user_id: Number
  loggedInChangedEvent = new Subject<boolean>();
  errorMessage = new Subject<String>();

  constructor(private router: Router, private http: HttpClient) {
    this.checkLoginStatus();
    this.getLoginStatus()
  }

  isLoggedIn() {
    return this.loggedin;
  }

  hasSameUserId(user_id: Number)
  {
    if (this.loggedin)
      return this.user_id == user_id
    return false
  }

  checkLoginStatus() {
    this.http
      .get<{ status: boolean, user_id?: Number }>('http://localhost:3000/api/auth/loggedin')
      .subscribe({
        next: (result) => {
          this.loggedin = result.status;
          if (result.status)
          {
            this.user_id = result.user_id
          }
        },
      });
  }

  async getLoginStatus() {

    const result =  this.http.get<{ status: boolean; user_id?: number }>('http://localhost:3000/api/auth/loggedin').toPromise();
    return result
  }

  login(user: User) {
    if (!user) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.errorMessage.next(null)
    this.http
      .post<{ status: String; message: string; error?: string, user_id?: number}>(
        'http://localhost:3000/api/auth/login',
        user,
        { headers: headers }
      )
      .subscribe({
        next: (result) => {
          if (!result.error && result.status == 'success') {
            this.user_id = result.user_id
            this.loggedin = true;
            this.loggedInChangedEvent.next(this.loggedin)

            this.router.navigate(['/my-testimony']);
          }
          else
          {
            this.errorMessage.next("Invalid Credentials")
            console.log("Invalid Credentials")
          }
        },
        error: (err: any) => {
          this.errorMessage.next("Invalid Credentials")
        }
      });
  }

  logout() {
    this.http
      .post<{ status: String; message: String }>(
        'http://localhost:3000/api/auth/logout',
        {}
      )
      .subscribe({
        next: (result) => {
          this.loggedin = false;
          this.user_id = -1
          this.loggedInChangedEvent.next(this.loggedin)
         
          this.router.navigate(['/our-testimony']);
        },
      });
  }

  signup(user: User) {
    if (!user) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: String; status: String; error?: String, user_id?: Number }>(
        'http://localhost:3000/api/auth/signup',
        user,
        { headers: headers }
      )
      .subscribe({
        next: (result) => {
          if (!result.error && result.status == 'success') {
            this.user_id = result.user_id
            this.loggedin = true;
            this.loggedInChangedEvent.next(this.loggedin)
            this.router.navigate(['/my-testimony']);
          }
        },
      });
  }
}
