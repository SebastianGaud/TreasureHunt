import { FirebaseObject } from "./firebase-object";
import { Milestone } from "../milestone/milestone";

export class FirebaseMilestone extends Milestone implements FirebaseObject {
	key: string;
}