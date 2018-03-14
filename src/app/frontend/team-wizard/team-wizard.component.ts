import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import * as MilestonesTeamAction from '../../actions/team-milestones.action';
import * as TeamAction from '../../actions/team.action';
import * as firebase from 'firebase/app';
import { FirebaseTeam } from '../../model/firebase/firebase-team';
import { Observable } from 'rxjs/Observable';
import { TeamService } from '../../service/team/team.service';
import { Team } from '../../model/team/team';
import { MilestonesTeam } from '../../model/game/game-team';
import { CookieService } from '../../service/cookie-service.service';
import { Consts } from '../../../environments/Consts';

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
    this.store.dispatch(new MilestonesTeamAction.ConnectTeamMilestonesAction());
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

    this.store.select<MilestonesTeam>(state => state.gameTeams.find(t => t.key == this.teamToken))
    .toPromise().then(mt => {
      this.store.dispatch(new MilestonesTeamAction.AddGameMilestonesTeam(mt));
    }); 
  }
}