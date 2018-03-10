import { Action } from '@ngrx/store';

import { MilestonesTeam } from '../model/game/game-team';

export const CONNECT_TEAM_MILESTONES = 'CONNECT_TEAM_MILESTONES';
export const CONNECT_TEAM_MILESTONES_SUCCESS = 'CONNECT_TEAM_MILESTONES_SUCCESS';
export const CONNECT_TEAM_MILESTONES_FAILURE = 'CONNECT_TEAM_MILESTONES_FAILURE';
export const DISCONNECT_TEAM_MILESTONES_SUCCESS = 'DISCONNECT_TEAM_MILESTONES_SUCCESS';
export const DISCONNECT_TEAM_MILESTONES = 'DISCONNECT_TEAM_MILESTONES';
export const ADD_TEAM_MILESTONES_SYNCED = 'ADD_TEAM_MILESTONES_SYNCED';
export const UPDATED_TEAM_MILESTONES_SYNCED = 'UPDATED_TEAM_MILESTONES_SYNCED';
export const REMOVED_TEAM_MILESTONES_SYNCED = 'REMOVED_TEAM_MILESTONES_SYNCED';


export class ConnectTeamMilestonesAction implements Action {
	readonly type = CONNECT_TEAM_MILESTONES;
}

export class ConnectTeamMilestonesSuccessAction implements Action {
	readonly type = CONNECT_TEAM_MILESTONES_SUCCESS;
	constructor(public payload: MilestonesTeam) { }
}

export class ConnectTeamMilestonesFailureAction implements Action {
	readonly type = CONNECT_TEAM_MILESTONES_FAILURE;
	constructor(public error: Error) { }
}

export class DisconnectTeamMilestonesAction implements Action {
	readonly type = DISCONNECT_TEAM_MILESTONES;
}

export class DisconnectTeamMilestonesSuccessAction implements Action {
	readonly type = DISCONNECT_TEAM_MILESTONES_SUCCESS
}


export class AddedTeamMilestoneSyncedAction implements Action {
	readonly type = ADD_TEAM_MILESTONES_SYNCED;
	constructor(public payload: MilestonesTeam) { }
}

export class UpdatedTeamMilestoneSyncedAction implements Action {
	readonly type = UPDATED_TEAM_MILESTONES_SYNCED;
	constructor(public payload: MilestonesTeam) { }
}

export class RemovedTeamMilestoneSyncedAction implements Action {
	readonly type = REMOVED_TEAM_MILESTONES_SYNCED;
	constructor(public payload: MilestonesTeam) { }
}

export type Action
	= ConnectTeamMilestonesAction
	| ConnectTeamMilestonesFailureAction
	| ConnectTeamMilestonesSuccessAction
	| DisconnectTeamMilestonesAction
	| DisconnectTeamMilestonesSuccessAction
	| AddedTeamMilestoneSyncedAction
	| UpdatedTeamMilestoneSyncedAction
	| RemovedTeamMilestoneSyncedAction