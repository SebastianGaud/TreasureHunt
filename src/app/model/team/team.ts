import { ITeam } from './team.d';
import { IMilestone } from '../milestone/milestone.d';

export class Team implements ITeam {
	key: string;
	name: string;
	points: number;
	milestones: IMilestone[];
}