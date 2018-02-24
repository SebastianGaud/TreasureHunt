import { Observable } from "rxjs/Observable";
import { IMilestone } from "../../model/milestone/milestone.d";

export interface IMilestoneService {
	getMilestones() : Observable<Array<IMilestone>>;
	getMilestone(key: string) : Observable<IMilestone>;
}
