import { ICoords } from "../maps/coord.d";

export interface IMilestone {
	opened: boolean;
	name: string;
	question: string;
	hint: string;
	hintOpened: boolean;
	points: number;
	penalityPoints: number;
	coords: ICoords;
}
