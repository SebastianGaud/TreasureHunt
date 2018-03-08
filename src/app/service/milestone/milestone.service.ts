import { Injectable } from "@angular/core";
import { IMilestoneService } from "./milestone-service";
import { IMilestone } from "../../model/milestone/milestone.d";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MilestoneService implements IMilestoneService {

  addMilestone(milestone: IMilestone): void {
    throw new Error("Method not implemented.");
  }
  getMilestone(key: string): Observable<IMilestone> {
    throw new Error("Method not implemented.");
  }
  getMilestones(): Observable<IMilestone[]> {
    throw new Error("Method not implemented.");
  }
  constructor() { }

}
