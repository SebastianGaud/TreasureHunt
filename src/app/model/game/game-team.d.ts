import { FirebaseMilestone } from "../firebase/firebase-milestone";
import { FirebaseTeam } from "../firebase/firebase-team";

export interface IMilestonesTeam {
	key: string;
	milestones: Array<FirebaseMilestone>
}