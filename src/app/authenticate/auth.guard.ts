import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { error } from 'jquery';

export const LoggedIn: CanActivateFn = (
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
      if (result.status) return result.status;
      return router.navigateByUrl('/our-testimony');
    })
    .catch((error) => {
      return router.navigateByUrl('/our-testimony');
    });
  return loggedin;
};

export const LoggedOut: CanActivateFn = (
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
      if (!result.status) return true;
      return router.navigateByUrl('/our-testimony');
    })
    .catch((error) => {
      return true;
    });
  return loggedin;
};
