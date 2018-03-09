import * as MilestoneActions from './../actions/milestone.actions';
import { Milestone } from '../model/milestone/milestone';

export function milestoneReducer(state = [], action: MilestoneActions.Action) {
	switch (action.type) {
		case MilestoneActions.CONNECT_MILESTONES_SUCCESS:
			return action.payload;
		
		case MilestoneActions.ADDED_MILESTONE_SYNCED:
			return [...state, action.payload];

		case MilestoneActions.UPDATED_MILESTONE_SYNCED:
			return state.map(milestone => {
				return milestone.key == action.payload.key ? Object.assign({}, action.payload) : milestone;
			});
		
		case MilestoneActions.REMOVED_MILESTONE_SYNCED:
			return state.filter(milestone => milestone.key !== action.payload.key);

		default:
			return state;
	}
}