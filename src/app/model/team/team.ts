import { ITeam } from "./team.d";

export class Team implements ITeam {
	token: string;
	name: string;
	points: number;
}