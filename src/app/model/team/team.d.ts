import { IMilestone } from "../milestone/milestone.d";

export interface ITeam {
	name: string;
	points: number;
	milestones: Array<IMilestone>
}