import { IMilestone } from "../model/milestone/milestone.d";

export const LOAD_MILESTONES = "LOAD_MILESTONES";
export const LOAD_MILESTONES_SUCCESS = "LOAD_MILESTONES_SUCCESS";
export const SET_MILESTONE_HINT_OPENED = 'SET_MILESTONE_HINT_OPENED'; 
export const SET_MILESTONE_HINT_OPENED_SUCCESS = 'SET_MILESTONE_HINT_OPENED_SUCCESS'; 

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

export class SetMilestoneHintOpenedAction {
	readonly type = SET_MILESTONE_HINT_OPENED;

	constructor(public payload: SetMilestoneHintOpenedPayload) {
	}
}

export class SetMilestoneHintOpenedSuccessAction {
	readonly type = SET_MILESTONE_HINT_OPENED_SUCCESS;

	constructor(public payload: SetMilestoneHintOpenedPayload) {
	}
}



export interface SetMilestoneHintOpenedPayload {
	id: string;
	isOpened: boolean;
	points: number;
}

export type Action
	= LoadMilestonesAction
	| LoadMilestonesSuccessAction
	| SetMilestoneHintOpenedAction
	| SetMilestoneHintOpenedSuccessAction