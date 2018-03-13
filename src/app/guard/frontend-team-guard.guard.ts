import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../model/app-state';
import { Store } from '@ngrx/store';

@Injectable()
export class FrontendTeamGuardGuard implements CanActivate {
  constructor(
    private store: Store<AppState>
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(state => state.gameteam.token).map(s => {
      return s !== null;
    });
  }
}
