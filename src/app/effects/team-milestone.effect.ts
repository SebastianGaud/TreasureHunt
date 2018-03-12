import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import { MilestoneService } from "../service/milestone/milestone.service";
import * as TeamMilestoneActions from "./../actions/team-milestones.action";
import { Observable } from "rxjs/Observable";
import { TeamMilestonesService } from "../service/team-milestones/team-milestones.service";

@Injectable()
export class TeamMilestoneEffect {

	constructor(
		private teamMilestonesService: TeamMilestonesService,
		private actions$: Actions
	) { }


	@Effect() connectTeamMilestones$ = this.actions$.ofType(TeamMilestoneActions.CONNECT_TEAM_MILESTONES, TeamMilestoneActions.DISCONNECT_TEAM_MILESTONES)
		.switchMap(action => {
			if (action.type == TeamMilestoneActions.CONNECT_TEAM_MILESTONES) {
				return this.teamMilestonesService.getTeamEvent()
					.catch(error => Observable.of(new TeamMilestoneActions.ConnectTeamMilestonesFailureAction(error)));
			} else {
				this.teamMilestonesService.disconnectTeamMilestonesteam();
				return Observable.of(new TeamMilestoneActions.DisconnectTeamMilestonesSuccessAction());
			}
		});
}