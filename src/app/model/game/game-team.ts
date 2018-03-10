import { FirebaseTeam } from "../firebase/firebase-team";
import { FirebaseMilestone } from "../firebase/firebase-milestone";
import { IGameTeam } from "./game-team.d";

export class GameTeam implements IGameTeam {
	teamKey: string; // Chiave del team
	milestones: Array<FirebaseMilestone>
}