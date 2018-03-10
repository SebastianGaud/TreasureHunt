import * as TeamActions from "./../actions/team.action";


export function teamReducer(state = [], action: TeamActions.Action) {
	switch (action.type) {
		case TeamActions.CONNECT_TEAMS_SUCCESS:
			return action.payload;

		case TeamActions.ADDED_TEAM_SYNCED:
			return [...state, action.payload];

		case TeamActions.UPDATED_TEAM_SYNCED:
			return state.map(team => {
				return team.key == action.payload.key ? Object.assign({}, action.payload) : team;
			});

		case TeamActions.REMOVED_TEAM_SYNCED:
			return state.filter(team => team.key !== action.payload.key);

		default:
			return state;
	}
}