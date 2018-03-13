import { FirebaseTeam } from "../firebase/firebase-team";
import { FirebaseMilestone } from "../firebase/firebase-milestone";
import { IMilestonesTeam } from "./game-team.d";

export class MilestonesTeam implements IMilestonesTeam {
  	token: boolean;
	key: string; // Chiave del team
	milestones: Array<FirebaseMilestone>
}