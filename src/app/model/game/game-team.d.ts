import { FirebaseMilestone } from "../firebase/firebase-milestone";
import { FirebaseTeam } from "../firebase/firebase-team";

export interface IGameTeam {
	team: FirebaseTeam;
	milestones: Array<FirebaseMilestone>
}