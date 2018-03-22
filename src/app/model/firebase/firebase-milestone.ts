import { FirebaseObject } from "./firebase-object";
import { Milestone } from "../milestone/milestone";
import { IMilestone } from "../milestone/milestone.d";

export class FirebaseMilestone extends Milestone implements FirebaseObject {
	key: string;

	static convert(firebaseKey: string, params:IMilestone) : FirebaseMilestone{
		return {
			name: params.name,
			hint: params.hint,
			hintOpened: params.hintOpened,
			points: params.points,
			penalityPoints: params.penalityPoints,
			coords: params.coords,
			opened: params.opened,
			question: params.question,
			key: firebaseKey,
			token: params.token
		}
	}
}