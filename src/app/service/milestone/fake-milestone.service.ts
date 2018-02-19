import { Injectable } from '@angular/core';
import { IMilestoneService } from './milestone-service';
import { IMilestone } from '../../model/milestone/milestone.d';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FakeMilestoneService implements IMilestoneService{

  getMilestones(): Observable<IMilestone[]> {
    throw new Error("Method not implemented.");
  }
  constructor() { }

}
