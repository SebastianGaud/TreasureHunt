import { Component, OnDestroy } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import * as MilestoneActions from '../../actions/milestone.actions';
import * as MilestonesTeamActions from '../../actions/team-milestones.action';
import * as TeamActions from '../../actions/team.action';
import { AppState } from '../../model/app-state';
import { FirebaseTeam } from '../../model/firebase/firebase-team';


@Component({
  selector: "backend-entry",
  templateUrl: "./backend-entry.component.html",
  styles: []
})
export class BackendEntryComponent implements OnDestroy {

  teams$: Observable<FirebaseTeam[]>;
  u: User;

  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(u => {
      if (u) {
        this.u = u;
      }else {
        this.u = null;
      }
    })

    this.store.dispatch(new TeamActions.ConnectTeamAction());
    this.store.dispatch(new MilestoneActions.ConnectMilestoneAction());
    this.store.dispatch(new MilestonesTeamActions.ConnectTeamMilestonesAction());
    this.teams$ = this.store.select<FirebaseTeam[]>(state => state.teams);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new TeamActions.DisconnetTeamsAction());
    this.store.dispatch(new MilestoneActions.DisconnectMilestonesAction());
    this.store.dispatch(new MilestonesTeamActions.DisconnectTeamMilestonesAction());
  }
}
