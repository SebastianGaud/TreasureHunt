import { ITeam } from "./team.d";

export class Team implements ITeam {
	token: boolean;
	name: string;
	points: number;
}