import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import { Consts } from '../../../environments/Consts';
import * as TeamAction from '../../actions/team.action';
import { AppState } from '../../model/app-state';
import { CookieService } from '../../service/cookie-service.service';
import { TeamService } from '../../service/team/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'team-wizard',
  templateUrl: './team-wizard.component.html',
  styles: []
})
export class TeamWizardComponent {

  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private teamService: TeamService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.store.dispatch(new TeamAction.ConnectTeamAction());
  }

  save(value) {
    //Inserire in un Effect 
    this.store.select(state => state.teams.find(k => k.key == value)).toPromise().then(t => {
      this.teamService.editTeam(t.key, {
        name: t.name,
        points: t.points,
        token: true
      });
    });
    this.cookieService.write(Consts.CookieAuth, value);
    this.router.navigate(['/frontend']);
  }
}