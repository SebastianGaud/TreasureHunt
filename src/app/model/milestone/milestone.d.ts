export interface IMilestone {
	id: string;
	opened: boolean;
	name: string;
	question: string;
	hint: string;
	hintOpened: boolean;
	points: number;
	penalityPoints: number;
}
