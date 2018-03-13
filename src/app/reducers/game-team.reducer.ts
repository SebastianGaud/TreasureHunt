import * as TeamMilestone from "./../actions/team-milestones.action";

export function milestoneReducer(state = [], action: TeamMilestone.Action) {
	switch (action.type) {
		case TeamMilestone.ADD_GAME_MILESTONE_TEAM:
			return action.payload;
		default:
			return state;
	}
}