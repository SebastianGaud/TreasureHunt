import { FirebaseMilestone } from "./firebase/firebase-milestone";
import { FirebaseTeam } from "./firebase/firebase-team";
import { GameTeam } from "./game/game-team";

export interface AppState {
	teams: Array<FirebaseTeam>;
	milestones: Array<FirebaseMilestone>;
	
	gameteam: GameTeam;
	gameTeams: Array<GameTeam>;
}
