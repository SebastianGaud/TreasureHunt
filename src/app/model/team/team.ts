import { ITeam } from "./team.d";
import { FirebaseMilestone } from "../firebase/firebase-milestone";

export class Team implements ITeam {
	milestones: FirebaseMilestone[];
	key: string;
	name: string;
	points: number;
}