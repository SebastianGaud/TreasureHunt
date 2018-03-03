import * as milestoneActions from './../actions/milestone.actions';
import { Milestone } from '../model/milestone/milestone';

export function milestoneReducer(state = [], action: milestoneActions.Action) {
	switch (action.type) {
		case milestoneActions.LOAD_MILESTONES_SUCCESS:
			return action.payload;
		case milestoneActions.SET_MILESTONE_HINT_OPENED_SUCCESS:
			return state.map(milestone => {
				if (milestone.id === action.payload.id){
					let m: Milestone = {
						id: milestone.id,
						hint: milestone.hint,
						name: milestone.name,
						question: milestone.question,
						points: action.payload.points,
						opened: milestone.opened,
						penalityPoints: milestone.penalityPoints,
						hintOpened: action.payload.isOpened
					}
					return m;
				}

				return milestone;
			});
		default:
			return state;
	}
}