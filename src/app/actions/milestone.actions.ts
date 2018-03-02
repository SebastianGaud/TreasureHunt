import { IMilestone } from "../model/milestone/milestone.d";

export const LOAD_MILESTONES = "LOAD_MILESTONES";
export const LOAD_MILESTONES_SUCCESS = "LOAD_MILESTONES_SUCCESS";

export class LoadMilestonesAction {
	readonly type = LOAD_MILESTONES;
	
	constructor() {
	}
}

export class LoadMilestonesSuccessAction {
	readonly type = LOAD_MILESTONES_SUCCESS;
	
	constructor(public payload: IMilestone[]) {
	}
}

export type Action
	= LoadMilestonesAction
	| LoadMilestonesSuccessAction