import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import * as TeamActions from "./../actions/team.action";
import { Observable } from "rxjs/Observable";
import { TeamService } from "../service/team/team.service";

@Injectable()
export class TeamEffect {

	constructor(
		private teamService: TeamService,
		private actions$: Actions
	) {}


	@Effect() connectTeams$ = this.actions$.ofType(TeamActions.CONNECT_TEAMS, TeamActions.DISCONNECT_TEAMS)
		.switchMap(action => {
			if (action.type == TeamActions.CONNECT_TEAMS) {
				return this.teamService.getTeamEvent()
					.catch(error => Observable.of(new TeamActions.ConnectTeamFailureAction(error)));
			} else {
				this.teamService.disconnectTeam();
				return Observable.of(new TeamActions.DisconnectTeamsSuccessAction());
			}
		});
}