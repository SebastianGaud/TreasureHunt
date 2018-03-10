import { FirebaseTeam } from "../model/firebase/firebase-team";
import { CONNECT_MILESTONES_FAILURE, DISCONNECT_MILESTONES_SUCCESS } from "./milestone.actions";
import { ITeam } from "../model/team/team.d";
import { Action } from "@ngrx/store";


export const CONNECT_TEAMS = "CONNECT_TEAMS";
export const CONNECT_TEAMS_SUCCESS = "CONNECT_TEAMS_SUCCESS";
export const CONNECT_TEAMS_FAILURE = "CONNECT_TEAMS_FAILURE";
export const DISCONNECT_TEAMS = "DISCONNECT_TEAMS";
export const DISCONNECT_TEAMS_SUCCESS = "DISCONNECT_TEAMS_SUCCESS";
export const REMOVE_TEAMS = "REMOVE_TEAMS";
export const REMOVE_TEAMS_SUCCESS = "REMOVE_TEAMS_SUCCESS";
export const REMOVE_TEAMS_FAILURE = "REMOVE_TEAMS_FAILURE";
export const ADDED_TEAM_SYNCED = "ADDED_TEAM_SYNCED";
export const UPDATED_TEAM_SYNCED = "UPDATED_TEAM_SYNCED";
export const REMOVED_TEAM_SYNCED = "REMOVED_TEAM_SYNCED";


export class ConnectTeamAction implements Action {
	readonly type = CONNECT_TEAMS;
}

export class ConnectTeamSuccessAction implements Action {
	readonly type = CONNECT_TEAMS_SUCCESS;
	constructor (public payload: Array<FirebaseTeam>) {}
}

export class ConnectTeamFailureAction implements Action {
	readonly type = CONNECT_MILESTONES_FAILURE;
	constructor (public payload: Error) {}
}

export class DisconnetTeamsAction implements Action {
	readonly type = DISCONNECT_TEAMS;
}

export class DisconnectTeamsSuccessAction implements Action {
	readonly type = DISCONNECT_MILESTONES_SUCCESS;
}

export class AddedTeamSyncedAction implements Action {
	readonly type = ADDED_TEAM_SYNCED;
	constructor (public payload: ITeam) {}
}

export class UpdateTeamSyncedAction implements Action {
	readonly type = UPDATED_TEAM_SYNCED;
	constructor (public payload: FirebaseTeam) {}
}

export class RemovedTeamSyncedAction implements Action {
	readonly type = REMOVED_TEAM_SYNCED;
	constructor (public payload: FirebaseTeam) {}
}

export type Action
	= ConnectTeamAction
	| ConnectTeamSuccessAction
	| ConnectTeamFailureAction
	| DisconnetTeamsAction
	| DisconnectTeamsSuccessAction
	| AddedTeamSyncedAction
	| UpdateTeamSyncedAction
	| RemovedTeamSyncedAction;