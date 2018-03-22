import * as TeamMilestonesAction from "./../actions/team-milestones.action";


export function teamMilestoneReducer(state = [], action: TeamMilestonesAction.Action) {
	switch (action.type) {
		case TeamMilestonesAction.CONNECT_TEAM_MILESTONES_SUCCESS:
			return action.payload;

		case TeamMilestonesAction.ADD_TEAM_MILESTONES_SYNCED:
			return [...state, action.payload];

		case TeamMilestonesAction.UPDATED_TEAM_MILESTONES_SYNCED:
			return state.map(team => {
				return team.key == action.payload.key ? Object.assign({}, action.payload) : team;
			});

		case TeamMilestonesAction.REMOVED_TEAM_MILESTONES_SYNCED:
			return state.filter(team => team.key !== action.payload.key);

		default:
			return state;
	}
}