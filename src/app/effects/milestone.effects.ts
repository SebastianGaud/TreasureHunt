import { Injectable } from "@angular/core";
import { FactoryService } from "../service/factory.service";
import { Effect, Actions } from "@ngrx/effects";
import * as milestoneActions from './../actions/milestone.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

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
}