import { Injectable } from '@angular/core';
import { IMilestoneService } from './milestone-service';
import { IMilestone } from '../../model/milestone/milestone.d';

@Injectable()
export class MilestoneService implements IMilestoneService{

  getMilestones(): Observable<IMilestone[]> {
    throw new Error("Method not implemented.");
  }
  constructor() { }

}
