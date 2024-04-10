import { Injectable } from '@angular/core';
import { Testimony } from '../testimony.model';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { TestimonyService } from '../testimony.service';

@Injectable({
  providedIn: 'root'
})
export class MyTestimonyResolverService implements Resolve<Testimony[]>{

  constructor(private testimonyService: TestimonyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Testimony[]> {
    const myTestimonies = this.testimonyService.getMyTestimonies()

    if (myTestimonies.length === 0) {
      return this.testimonyService.requestMyTestimonies()
    }

    return myTestimonies
  }
}
