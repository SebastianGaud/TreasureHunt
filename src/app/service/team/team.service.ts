import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ITeam } from '../../model/team/team.d';
import { ITeamService } from './team.service.d';

@Injectable()
export class TeamService implements ITeamService {

  setHintOpened(teamKey: string, milestoneKey: string, opened: boolean) {
    throw new Error("Method not implemented.");
  }
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
  constructor() { }

}
