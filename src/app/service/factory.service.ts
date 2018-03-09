import { Injectable } from "@angular/core";
import { MilestoneService } from "./milestone/milestone.service";
import { environment } from "../../environments/environment";
import { ITeamService } from "./team/team.service.d";
import { FakeTeamService } from "./team/fake-team.service";
import { TeamService } from "./team/team.service";

@Injectable()
export class FactoryService {

  constructor(
    private readonly milestoneService: MilestoneService,
    private readonly teamService: TeamService,
    private readonly fakeTeamService: FakeTeamService
  ) { 
  }

  getTeamService(): ITeamService {
    return environment.useFakeProviders ? this.fakeTeamService : this.teamService;
  }
}