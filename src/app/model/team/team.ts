import { ITeam } from "./team.d";
import { FirebaseMilestone } from "../firebase/firebase-milestone";

export class Team implements ITeam {
	name: string;
	points: number;
}