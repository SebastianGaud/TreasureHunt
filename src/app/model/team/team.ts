import { ITeam } from './team.d';
import { IMilestone } from '../milestone/milestone.d';

export class Team implements ITeam {
	name: string;
	points: number;
	milestones: IMilestone[];
}