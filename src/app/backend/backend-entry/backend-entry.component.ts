import { Component, OnInit, OnDestroy } from "@angular/core";
import { MilestoneService } from "../../service/milestone/milestone.service";
import { AppState } from "../../model/app-state";
import { Store } from "@ngrx/store";
import { TeamService } from "../../service/team/team.service";
import { FirebaseTeam } from "../../model/firebase/firebase-team";
import { Observable } from "rxjs/Observable";
import * as TeamAction from '../../actions/team.action';

@Component({
  selector: "backend-entry",
  templateUrl: "./backend-entry.component.html",
  styles: []
})
export class BackendEntryComponent implements OnDestroy {

  teams$: Observable<FirebaseTeam[]>;

  constructor(
    private store: Store<AppState>,
    private teamService: TeamService
  ) { 
    this.store.dispatch(new TeamAction.ConnectTeamAction());
    this.teams$ = this.store.select<FirebaseTeam[]>(state => state.teams);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new TeamAction.DisconnetTeamsAction);
  }
}
