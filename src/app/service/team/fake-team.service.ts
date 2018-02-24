import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ITeam } from '../../model/team/team.d';
import { ITeamService } from './team.service.d';
import { FactoryService } from '../factory.service';
import { IMilestoneService } from '../milestone/milestone-service';

@Injectable()
export class FakeTeamService implements ITeamService {

  getTeam(key: string): Observable<ITeam> {
    throw new Error("Method not implemented.");
  }
  addPoints(key: string, points: number): void {
    throw new Error("Method not implemented.");
  }
  removePoints(key: string, points: number): void {
    throw new Error("Method not implemented.");
  }
  setMilestoneOpened(teamKey: string, milestoneKey: string, opened: boolean) {
    throw new Error("Method not implemented.");
  }

  milestoneService: IMilestoneService;

  constructor() { 
    this.milestoneService = FactoryService.getInstance().getMilestoneService();
  }

}
