import { FirebaseObject } from "./firebase-object";
import { IMilestone } from "../milestone/milestone.d";
import { Milestone } from "../milestone/milestone";

export class FirebaseMilestone extends Milestone implements FirebaseObject {
	key: string;
}