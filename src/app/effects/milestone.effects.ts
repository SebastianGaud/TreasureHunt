import { Injectable } from "@angular/core";
import { FactoryService } from "../service/factory.service";
import { Effect, Actions } from "@ngrx/effects";
import * as milestoneActions from './../actions/milestone.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class MilestoneEffect {

	constructor(
		private serviceFactory: FactoryService,
		private actions$: Actions
	) {
	}


	@Effect() loadMilestones$ = this.actions$.ofType(milestoneActions.LOAD_MILESTONES)
		.switchMap(() => this.serviceFactory.getMilestoneService().getMilestones()
			.map(milestones => (new milestoneActions.LoadMilestonesSuccessAction(milestones)))
		);


	@Effect() setMiletoneHintOpened = this.actions$.ofType(milestoneActions.SET_MILESTONE_HINT_OPENED)
		.switchMap(
			(action: milestoneActions.SetMilestoneHintOpenedAction) => {
				this.serviceFactory.getTeamService().setHintOpened("asdadsas", action.payload.id, action.payload.isOpened);
				this.serviceFactory.getTeamService().removePoints("asdadsas", action.payload.points);
				return Observable.of(new milestoneActions.SetMilestoneHintOpenedSuccessAction(action.payload));
			}
		);

	@Effect() setMilestoneOpened = this.actions$.ofType(milestoneActions.SET_MILESTONE_OPENED)
		.switchMap((action: milestoneActions.SetMilestoneOpenedAction) => {
			this.serviceFactory.getTeamService().setMilestoneOpened("asdadsas", action.payload.id, true);
			return Observable.of(new milestoneActions.SetMilestoneOpenedSuccessAction(action.payload));
		});
}