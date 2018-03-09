import { IMilestone } from "../model/milestone/milestone.d";

export const LOAD_MILESTONES = "LOAD_MILESTONES";
export const LOAD_MILESTONES_SUCCESS = "LOAD_MILESTONES_SUCCESS";
export const SET_MILESTONE_HINT_OPENED = 'SET_MILESTONE_HINT_OPENED'; 
export const SET_MILESTONE_HINT_OPENED_SUCCESS = 'SET_MILESTONE_HINT_OPENED_SUCCESS'; 
export const SET_MILESTONE_OPENED = 'SET_MILESTONE_OPENED'; 
export const SET_MILESTONE_OPENED_SUCCESS = 'SET_MILESTONE_OPENED_SUCCESS'; 
export const ADD_MILESTONE = 'ADD_MILESTONE';
export const ADD_MILESTONE_SUCCESS = 'ADD_MILESTONE_SUCCESS';

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

export class SetMilestoneOpenedAction {
	readonly type = SET_MILESTONE_OPENED;
	constructor(public payload: IMilestone) {
	}
}

export class SetMilestoneOpenedSuccessAction {
	readonly type = SET_MILESTONE_OPENED_SUCCESS;
	constructor(public payload: IMilestone) {
	}
}

export class AddMilestoneAction {
	readonly type = ADD_MILESTONE;
	constructor(public payload: IMilestone) {
	}
}

export class AddMilestoneActionSuccess {
	readonly type = ADD_MILESTONE_SUCCESS;
	constructor(public payload: IMilestone) {
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
	| SetMilestoneOpenedAction
	| SetMilestoneOpenedSuccessAction
	| AddMilestoneAction
	| AddMilestoneActionSuccess