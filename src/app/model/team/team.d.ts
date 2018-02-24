import { IMilestone } from "../milestone/milestone.d";

export interface ITeam {
	key: string;
	name: string;
	points: number;
	milestones: Array<IMilestone>
}