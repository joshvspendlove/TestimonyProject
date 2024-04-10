import { Injectable } from '@angular/core';
import { Testimony } from '../testimony.model';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { TestimonyService } from '../testimony.service';

@Injectable({
  providedIn: 'root'
})
export class OurTestimonyResolverService implements Resolve<Testimony[]>{

  constructor(private testimonyService: TestimonyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Testimony[]> {
    const ourTestimonies = this.testimonyService.getOurTestimonies()

    if (ourTestimonies.length === 0) {
      return this.testimonyService.requestOurTestimonies()
    }

    return ourTestimonies
  }
}
