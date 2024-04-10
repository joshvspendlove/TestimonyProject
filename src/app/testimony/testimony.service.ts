import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Testimony } from './testimony.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Subject, Subscription, catchError, tap } from 'rxjs';
import { AuthenticationService } from '../authenticate/authentication.service';
import { LoggedIn } from '../authenticate/auth.guard';

@Injectable({
  providedIn: 'root',
})
export class TestimonyService {
  private ourTestimonies: Testimony[] = [];
  private myTestimonies: Testimony[] = [];

  ourTestimonyListChanged = new Subject<Testimony[]>();
  myTestimonyListChanged = new Subject<Testimony[]>();
  loading = new Subject<boolean>()

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.authService.loggedInChangedEvent.subscribe((isLoggedIn) => {
      this.refreshMyTestimony();
      this.refreshOurTestimony();
    });
  }

  getTestimony(id: number) {
    const pos = this.ourTestimonies.findIndex((t) => t.id == id);
    return this.ourTestimonies[pos];
  }

  getMyTestimony(id: number) {
    const pos = this.myTestimonies.findIndex((t) => t.id == id);
    return this.myTestimonies[pos];
  }

  getOurTestimonies() {
    return this.ourTestimonies.slice();
  }

  getMyTestimonies() {
    return this.myTestimonies.slice();
  }

  requestOurTestimonies() {
    this.loading.next(true)
    return this.http
      .get<{ testimonies: Testimony[] }>(
        'http://localhost:3000/api/testimony/ours'
      )
      .pipe(
        tap({
          next: (value: any) => {
            this.ourTestimonies = value.testimonies;

            this.ourTestimonies = value.testimonies.sort((a, b) => {
              return (
                new Date(b.posted).getTime() - new Date(a.posted).getTime()
              );
            });
            this.ourTestimonyListChanged.next(this.ourTestimonies);
            this.loading.next(false)
          },
        })
      );
  }

  requestMyTestimonies() {
    this.loading.next(true)
    return this.http
      .get<{ testimonies: Testimony[] }>(
        'http://localhost:3000/api/testimony/mine'
      )
      .pipe(
        tap({
          next: (value: any) => {
            this.myTestimonies = value.testimonies;
            this.myTestimonies.sort((a, b) => {
              return (
                new Date(b.posted).getTime() - new Date(a.posted).getTime()
              );
            });
            this.myTestimonyListChanged.next(this.myTestimonies);
            this.loading.next(false)
          },
        })
      );
  }

  deleteTestimony(testimony: Testimony) {
    if (!testimony) return;

    this.http
      .delete<{ testimonies: Testimony[] }>(
        'http://localhost:3000/api/testimony/' + testimony.id
      )
      .subscribe({
        next: (value) => {
          this.refreshMyTestimony();
          this.refreshOurTestimony();
        },
      });
  }

  addTestimony(testimony: Testimony) {
    this.http
      .post('http://localhost:3000/api/testimony/', testimony)
      .subscribe({
        next: (value) => {
          this.refreshMyTestimony();
          this.refreshOurTestimony();
        },
      });
  }

  updateTestimony(testimony: Testimony) {
    const posOur = this.ourTestimonies.findIndex((t) => t.id == testimony.id);
    const posMine = this.myTestimonies.findIndex((t) => t.id == testimony.id);

    this.http
      .put('http://localhost:3000/api/testimony/' + testimony.id, testimony)
      .subscribe({
        next: (value) => {
          this.refreshMyTestimony();
          this.refreshOurTestimony();
        },
      });
  }

  refreshOurTestimony() {
    this.loading.next(true)
    this.ourTestimonies = [];
    this.ourTestimonyListChanged.next(this.ourTestimonies.slice());
    this.requestOurTestimonies().subscribe();
  }

  refreshMyTestimony() {
    this.loading.next(true)
    this.myTestimonies = [];
    this.myTestimonyListChanged.next(this.myTestimonies.slice());
    this.requestMyTestimonies().subscribe();
  }
}
