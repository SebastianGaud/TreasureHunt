import { FirebaseGameTeam } from './firebase/firebase-game-team';
import { FirebaseMilestone } from './firebase/firebase-milestone';
import { FirebaseTeam } from './firebase/firebase-team';

export interface AppState {
	teams: Array<FirebaseTeam>;
	milestones: Array<FirebaseMilestone>;
	
	gameteam: FirebaseGameTeam;
	gameTeams: Array<FirebaseGameTeam>;
}
