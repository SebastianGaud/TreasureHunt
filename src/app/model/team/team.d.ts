import { FirebaseMilestone } from "../firebase/firebase-milestone";

export interface ITeam {
	key: string;
	name: string;
	points: number;
	milestones: Array<FirebaseMilestone>
}