import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import { Consts } from '../../../environments/Consts';
import * as TeamAction from '../../actions/team.action';
import { AppState } from '../../model/app-state';
import { CookieService } from '../../service/cookie-service.service';
import { TeamService } from '../../service/team/team.service';

@Component({
  selector: 'team-wizard',
  templateUrl: './team-wizard.component.html',
  styles: []
})
export class TeamWizardComponent {

  teamToken: string;

  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private teamService: TeamService,
    private cookieService: CookieService
  ) {
    this.store.dispatch(new TeamAction.ConnectTeamAction());
  }

  save() {
    //Inserire in un Effect 
    this.store.select(state => state.teams.find(k => k.key == this.teamToken)).toPromise().then(t => {
      this.teamService.editTeam(t.key, {
        name: t.name,
        points: t.points,
        token: true
      });
    });
    this.cookieService.write(Consts.CookieAuth, this.teamToken);

  }
}