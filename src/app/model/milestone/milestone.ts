import { IMilestone } from './milestone.d';

export class Milestone implements IMilestone {
	opened: boolean;
	name: string;
	question: string;
	hint: string;
	points: number;
	penalityPoints: number;
}
