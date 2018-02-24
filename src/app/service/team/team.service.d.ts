import { Observable } from "rxjs/Observable";
import { ITeam } from "../../model/team/team.d";

export interface ITeamService {
	getTeam(key: string) : Observable<ITeam>;
	addPoints(key: string, points: number) : void;
	removePoints(key: string, points: number): void;
	setMilestoneOpened(teamKey: string, milestoneKey: string, opened: boolean);
	setHintOpened(teamKey: string, milestoneKey: string, opened: boolean);
}
