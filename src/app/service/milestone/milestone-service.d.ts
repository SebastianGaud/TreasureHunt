import { IMilestone } from "../../model/milestone/milestone.d";
import { Observable } from "rxjs/Observable";

export interface IMilestoneService {
	getMilestones() : Observable<Array<IMilestone>>;
}
