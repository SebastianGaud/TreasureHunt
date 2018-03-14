import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../model/app-state';
import { Store } from '@ngrx/store';
import { CookieService } from '../service/cookie-service.service';

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
    if (this.cookieService.read('Authentication') != null) {
      return true;
    }
    this.router.navigate(['/team-wizard']);
    return false;
  }
}
