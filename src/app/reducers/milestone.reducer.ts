import * as companyActions from './../actions/milestone.actions';

export function milestoneReducer(state = [], action: companyActions.Action)  {
	switch (action.type) {
		case companyActions.LOAD_MILESTONES_SUCCESS:{
			return action.payload;
		}
		default:{
			return state;
		}
	}
}