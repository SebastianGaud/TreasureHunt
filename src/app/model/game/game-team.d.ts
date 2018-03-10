import { FirebaseMilestone } from "../firebase/firebase-milestone";
import { FirebaseTeam } from "../firebase/firebase-team";

export interface IGameTeam {
	teamKey: string;
	milestones: Array<FirebaseMilestone>
}