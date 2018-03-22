import * as TeamMilestone from "./../actions/team-milestones.action";
import { MilestonesTeam } from "../model/game/game-team";

export function gameTeamReducer(state = MilestonesTeam, action: TeamMilestone.Action) {
	switch (action.type) {
		case TeamMilestone.ADD_GAME_MILESTONE_TEAM:
			return action.payload;
		default:
			return state;
	}
}