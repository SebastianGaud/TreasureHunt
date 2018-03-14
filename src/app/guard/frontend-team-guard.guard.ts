import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../model/app-state';
import { Store } from '@ngrx/store';
import { CookieService } from '../service/cookie-service.service';
import { Consts } from '../../environments/Consts';

@Injectable()
export class FrontendTeamGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.cookieService.read(Consts.CookieAuth));
    if (this.cookieService.read(Consts.CookieAuth) != null) {
      return true;
    }
    this.router.navigate(['/team-wizard']);
    return false;
  }
}
