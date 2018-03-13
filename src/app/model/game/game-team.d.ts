import { FirebaseMilestone } from "../firebase/firebase-milestone";
import { FirebaseTeam } from "../firebase/firebase-team";

export interface IMilestonesTeam {
	token: boolean;
	key: string;
	milestones: Array<FirebaseMilestone>
}