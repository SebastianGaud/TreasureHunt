import { IMilestone } from "./milestone.d";

export class Milestone implements IMilestone {
	hintOpened: boolean;
	id: string;
	opened: boolean;
	name: string;
	question: string;
	hint: string;
	points: number;
	penalityPoints: number;
}
