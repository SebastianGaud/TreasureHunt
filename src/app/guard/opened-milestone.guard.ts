import 'rxjs/add/operator/first';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../model/app-state';

@Injectable()
export class OpenedMilestoneGuard implements CanActivate {

  constructor(
    private snack: MatSnackBar,
    private store: Store<AppState>
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let id = next.params.id;
    
    return this.store.select(state => state.gameTeam).map(gm => {
      if (gm && gm.milestones) {
        let s = gm.milestones.find(s => { return s.key == id;}).opened
        if (!s) {
          this.snack.open("Non puoi ancora accedere a questa tappa!", "Chiudi", { duration: 3000 });
          return false;
        }
        return true; 
      }
      return false
    });
  }
}
