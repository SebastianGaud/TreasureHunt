import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import * as MilestoneAction from '../../actions/milestone.actions';
import * as TeamAction from '../../actions/team.action';
import { FirebaseTeam } from '../../model/firebase/firebase-team';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'team-wizard',
  templateUrl: './team-wizard.component.html',
  styles: []
})
export class TeamWizardComponent  {

  teams$: Observable<FirebaseTeam[]>;

  constructor(
    private store: Store<AppState>,
    private auth: AngularFireAuth
  ) { 
    this.store.dispatch(new MilestoneAction.ConnectMilestoneAction());
    this.store.dispatch(new TeamAction.ConnectTeamAction());

    this.teams$ = this.store.select<FirebaseTeam[]>(state => state.teams.filter(t => !t.token));
  }
}
