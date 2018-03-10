import { FirebaseMilestone } from "../firebase/firebase-milestone";
import { FirebaseTeam } from "../firebase/firebase-team";

export interface IMilestonesTeam {
	teamKey: string;
	milestones: Array<FirebaseMilestone>
}