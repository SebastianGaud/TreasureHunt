import { IMilestone } from "./milestone.d";
import { ICoords } from "../maps/coord.d";

export class Milestone implements IMilestone {
	coords: ICoords;
	hintOpened: boolean;
	opened: boolean;
	name: string;
	question: string;
	hint: string;
	points: number;
	penalityPoints: number;
}
