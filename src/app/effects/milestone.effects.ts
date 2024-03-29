import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";

import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import { MilestoneService } from "../service/milestone/milestone.service";
import * as MilestoneActions from "./../actions/milestone.actions";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MilestoneEffect {

	constructor(
		private milestoneService: MilestoneService,
		private actions$: Actions
	) {}


	@Effect() connectMilestones$ = this.actions$.ofType(MilestoneActions.CONNECT_MILESTONES, MilestoneActions.DISCONNECT_MILESTONES)
		.switchMap(action => {
			if (action.type == MilestoneActions.CONNECT_MILESTONES) {
				return this.milestoneService.getMilestonesEvent()
					.catch(error => Observable.of(new MilestoneActions.ConnectMilestonesFailureAction(error)));
			} else {
				this.milestoneService.disconnectMilestones();
				return Observable.of(new MilestoneActions.DisconnectMilestonesSuccessAction());
			}
		});
}