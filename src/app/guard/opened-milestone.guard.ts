import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FactoryService } from '../service/factory.service';
import { IMilestone } from '../model/milestone/milestone.d';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/first';

@Injectable()
export class OpenedMilestoneGuard implements CanActivate {

  constructor(
    private serviceFactory: FactoryService,
    private snack: MatSnackBar
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let id = next.params.id;
    return this.serviceFactory.getMilestoneService().getMilestone(id).map(s => {
      if (!s.opened) {
        this.snack.open("Non puoi ancora accedere a questa tappa!", "Chiudi", { duration: 3000 });
        return false;
      }
      return true;
    }).first();
  }
}
