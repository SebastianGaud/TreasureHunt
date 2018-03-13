import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../model/app-state';
import { Store } from '@ngrx/store';

@Injectable()
export class FrontendTeamGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(state => state.gameteam).map(s => {
      if (s !== null){
        return true;
      }
      this.router.navigate(['/team-wizard']);
      return false;
    });
  }
}
