import { GameTeam } from "../game/game-team";
import { FirebaseObject } from "./firebase-object";

export class FirebaseGameTeam extends GameTeam implements FirebaseObject {
	key: string;
}