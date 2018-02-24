import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ITeam } from '../../model/team/team.d';
import { ITeamService } from './team.service.d';
import { FactoryService } from '../factory.service';
import { IMilestoneService } from '../milestone/milestone-service';
import { Subscription } from 'rxjs/Subscription';
import { IMilestone } from '../../model/milestone/milestone.d';
import { Consts } from '../../../Consts';
import { FakeMilestoneService } from '../milestone/fake-milestone.service';

@Injectable()
export class FakeTeamService implements ITeamService {

  milestones: IMilestone[];
  milestonesSubscription: Subscription;
  teams: ITeam[];

  constructor(
    fakeMilestoneService: FakeMilestoneService
  ) {
    this.milestonesSubscription = fakeMilestoneService
      .getMilestones()
      .subscribe(s => {
        this.milestones = s;
        this.teams = [
          {
            key: 'asdadsas',
            name: 'Squadra 1',
            points: 0,
            milestones: this.milestones
          },
          {
            key: 'dasdasd',
            name: 'Squadra 2',
            points: 0,
            milestones: this.milestones
          },
        ]
      });
  }

  getTeam(key: string): Observable<ITeam> {
    let obs = Observable.of(this.teams.find(v => {
      return v.key == key;
    })).delay(Consts.FakeTimeoutMillis);
    return obs;
  }
  
  addPoints(key: string, points: number): void {
    this.getTeam(key).subscribe(s => {
      s.points += points;
    });
  }
  
  removePoints(key: string, points: number): void {
    this.getTeam(key).subscribe(s => {
      s.points -= points;
    });
  }

  setMilestoneOpened(teamKey: string, milestoneKey: string, opened: boolean) {
    this.getTeam(teamKey).subscribe(s => {
      s.milestones.find(f => {
        return f.id == milestoneKey
      }).opened = true;
    })
  }

  setHintOpened(teamKey: string, milestoneKey: string, opened: boolean) {
    this.getTeam(teamKey).subscribe(s => {
      s.milestones.find(f => {
        console.log(f)
        return f.id == milestoneKey.toString();
      }).hintOpened = true;
    })
  }
}