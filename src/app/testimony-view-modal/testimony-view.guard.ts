import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authenticate/authentication.service';
import { error } from 'jquery';

export const TestimonyViewRedirect: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  let router = inject(Router);
  let loggedin = inject(AuthenticationService)
    .getLoginStatus()
    .then((result) => {
      return result.status;
    })
    .catch((error) => {
      return false;
    });
  return loggedin;
};


