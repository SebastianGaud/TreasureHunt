import { IMilestone } from "../../model/milestone/milestone.d";

export interface IMilestoneService {
	getMilestones() : Array<IMilestone>;
}
