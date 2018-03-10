import { Action } from '@ngrx/store';

import { MilestonesTeam } from '../model/game/game-team';

export const CONNECT_TEAM_MILESTONES = 'CONNECT_TEAM_MILESTONES';
export const CONNECT_TEAM_MILESTONES_SUCCESS = 'CONNECT_TEAM_MILESTONES_SUCCESS';
export const CONNECT_TEAM_MILESTONES_FAILURE = 'CONNECT_TEAM_MILESTONES_FAILURE';
export const DISCONNECT_TEAM_MILESTONES = 'DISCONNECT_TEAM_MILESTONES';

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