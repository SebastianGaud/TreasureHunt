import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';

import { Consts } from '../../../environments/Consts';
import * as TeamAction from '../../actions/team.action';
import { AppState } from '../../model/app-state';
import { CookieService } from '../../service/cookie-service.service';
import { TeamService } from '../../service/team/team.service';
import { Router } from '@angular/router';
import { FirebaseTeam } from '../../model/firebase/firebase-team';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'team-wizard',
  templateUrl: './team-wizard.component.html',
  styles: []
})
export class TeamWizardComponent implements OnDestroy {

  teams$: Observable<FirebaseTeam[]>;
  selected: FirebaseTeam;
  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private teamService: TeamService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.store.dispatch(new TeamAction.ConnectTeamAction());
    this.teams$ = this.store.select<FirebaseTeam[]>(state => state.teams.filter(t => !t.token));
  }

  save() {
    this.afAuth.auth.signInAnonymously().then(() => {
      this.store.select(state => state.teams.find(k => k.key == this.selected.key)).first().subscribe(t => {
        this.teamService.editTeam(t.key, {
          name: t.name,
          points: t.points,
          token: true
        });
      });
      this.cookieService.write(Consts.CookieAuth, this.selected.key);
      this.router.navigate(['/frontend']);
    });
  }


  ngOnDestroy(): void {
    this.store.dispatch(new TeamAction.DisconnetTeamsAction);
  }
}