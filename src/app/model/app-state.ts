import { FirebaseMilestone } from './firebase/firebase-milestone';
import { FirebaseTeam } from './firebase/firebase-team';
import { MilestonesTeam } from './game/game-team';

export interface AppState {
	teams: Array<FirebaseTeam>;
	milestones: Array<FirebaseMilestone>;
	
	gameteam: MilestonesTeam;
	gameTeams: Array<MilestonesTeam>;
}
