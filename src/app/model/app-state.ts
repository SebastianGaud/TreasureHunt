import { FirebaseMilestone } from "./firebase/firebase-milestone";
import { FirebaseTeam } from "./firebase/firebase-team";

export interface AppState {
	team: FirebaseTeam,
	milestones: Array<FirebaseMilestone>
}
