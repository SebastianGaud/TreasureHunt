import { Team } from "../team/team";
import { FirebaseObject } from "./firebase-object";

export class FirebaseTeam extends Team implements FirebaseObject {
	key: string;
}