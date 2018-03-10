import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { FactoryService } from "../service/factory.service";
import { MatSnackBar } from "@angular/material";
import "rxjs/add/operator/first";
import { Store } from "@ngrx/store";
import { AppState } from "../model/app-state";

@Injectable()
export class OpenedMilestoneGuard implements CanActivate {

  constructor(
    private serviceFactory: FactoryService,
    private snack: MatSnackBar,
    private store: Store<AppState>
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let id = next.params.id;

    return this.store.select(state => state.milestones.find(s => { return s.key == id;}).opened).map(s => {
      if (!s) {
        this.snack.open("Non puoi ancora accedere a questa tappa!", "Chiudi", { duration: 3000 });
        return false;
      }
      return true;
    });
  }
}
