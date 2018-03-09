import { IMilestone } from "../model/milestone/milestone.d";
import { FirebaseMilestone } from "../model/firebase/firebase-milestone";
import { Action } from "@ngrx/store";


export const DISCONNECT_MILESTONES = 'DISCONNECT_MILESTONES';
export const DISCONNECT_MILESTONES_SUCCESS = 'DISCONNECT_MILESTONES_SUCCESS';
export const CONNECT_MILESTONES = 'CONNECT_MILESTONES';
export const CONNECT_MILESTONES_SUCCESS = 'CONNECT_MILESTONES_SUCCESS';
export const CONNECT_MILESTONES_FAILURE = 'CONNECT_MILESTONES_FAILURE';
export const REMOVE_MILESTONE = 'REMOVE_MILESTONE';
export const REMOVE_MILESTONE_SUCCESS = 'REMOVE_MILESTONE_SUCCESS';
export const REMOVE_MILESTONE_FAILURE = 'REMOVE_MILESTONE_FAILURE';
export const ADDED_MILESTONE_SYNCED = 'ADDED_MILESTONE_SYNCED';
export const UPDATED_MILESTONE_SYNCED = 'UPDATED_MILESTONE_SYNCED';
export const REMOVED_MILESTONE_SYNCED = 'REMOVED_MILESTONE_SYNCED';

export class ConnectMilestoneAction implements Action {
	readonly type = CONNECT_MILESTONES;
}

export class ConnectMilestonesSuccessAction implements Action {
	readonly type = CONNECT_MILESTONES_SUCCESS
	constructor(public payload: Array<FirebaseMilestone>) { }
}

export class ConnectMilestonesFailureAction implements Action {
	readonly type = CONNECT_MILESTONES_FAILURE;
	constructor(public payload: Error) { }
}

export class DisconnectMilestonesAction implements Action {
	readonly type = DISCONNECT_MILESTONES;
}

export class DisconnectMilestonesSuccessAction implements Action {
	readonly type = DISCONNECT_MILESTONES_SUCCESS;
}


export class AddedMilestoneSyncedAction implements Action {
	readonly type = ADDED_MILESTONE_SYNCED;
	constructor(public payload: IMilestone) { }
}

export class UpdatedMilestoneSyncedAction implements Action {
	readonly type = UPDATED_MILESTONE_SYNCED;
	constructor(public payload: FirebaseMilestone) { }
}

export class RemovedMilestoneSyncedAction implements Action {
	readonly type = REMOVED_MILESTONE_SYNCED
	constructor(public payload: FirebaseMilestone) { }
}

export type Action
	= ConnectMilestoneAction
	| ConnectMilestonesSuccessAction
	| ConnectMilestonesFailureAction
	| DisconnectMilestonesAction
	| DisconnectMilestonesSuccessAction
	| AddedMilestoneSyncedAction
	| UpdatedMilestoneSyncedAction
	| RemovedMilestoneSyncedAction