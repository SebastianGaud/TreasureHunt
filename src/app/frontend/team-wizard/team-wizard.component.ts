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

@Component({
  selector: 'team-wizard',
  templateUrl: './team-wizard.component.html',
  styles: []
})
export class TeamWizardComponent {

  teams$: Observable<FirebaseTeam[]>;
  selected: FirebaseTeam;
  phone: string;
  user: any;

  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private teamService: TeamService
  ) {
    this.store.dispatch(new TeamAction.ConnectTeamAction());
    this.store.dispatch(new MilestonesTeamAction.ConnectTeamMilestonesAction());
    this.teams$ = this.store.select<FirebaseTeam[]>(state => state.teams.filter(t => !t.token));
  }

  loginFB() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(t => {
      this.user = t.user;
    });
  }

  save() {
      //Inserire in un Effect 
    this.teamService.editTeam(this.selected.key, {
      name: this.selected.name,
      points: this.selected.points,
      token: this.user.uid
    });
    this.selected.token = this.user.uid;
    this.store.select<MilestonesTeam>(state => state.gameTeams.find(t => t.key == this.selected.key))
    .toPromise().then(mt => {
      this.store.dispatch(new MilestonesTeamAction.AddGameMilestonesTeam(mt));
    }); 
  }
}
