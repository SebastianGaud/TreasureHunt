import { IMilestone } from "./milestone.d";

export class Milestone implements IMilestone {
	coords: google.maps.LatLng;
	hintOpened: boolean;
	opened: boolean;
	name: string;
	question: string;
	hint: string;
	points: number;
	penalityPoints: number;
}
