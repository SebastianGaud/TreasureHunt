import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { ITeam } from "../../model/team/team.d";
import { ITeamService } from "./team.service.d";
import { Subscription } from "rxjs/Subscription";
import { Consts } from "../../../Consts";
import { MilestoneService } from "../milestone/milestone.service";
import { FirebaseMilestone } from "../../model/firebase/firebase-milestone";
import { FirebaseTeam } from "../../model/firebase/firebase-team";

@Injectable()
export class FakeTeamService implements ITeamService {

  milestones: FirebaseMilestone[];
  milestonesSubscription: Subscription;
  teams: FirebaseTeam[];

  constructor(
    milestoneService: MilestoneService
  ) {
    this.milestonesSubscription = milestoneService
      .getMilestones()
      .subscribe(s => {
        this.milestones = s;
        this.teams = [
          {
            key: "asdadsas",
            name: "Squadra 1",
            points: 0
          },
          {
            key: "dasdasd",
            name: "Squadra 2",
            points: 0
          },
        ];
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

  setMilestoneOpened(teamKey: string, milestoneKey: string, opened: boolean = true) {

  }

  setHintOpened(teamKey: string, milestoneKey: string, opened: boolean) {
  }
}
