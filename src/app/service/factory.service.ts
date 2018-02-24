import { Injectable } from "@angular/core";
import { MilestoneService } from "./milestone/milestone.service";
import { FakeMilestoneService } from "./milestone/fake-milestone.service";
import { IMilestoneService } from "./milestone/milestone-service";
import { environment } from "../../environments/environment";

@Injectable()
export class FactoryService {

  private static instance: FactoryService;

  static getInstance() : FactoryService {
    return FactoryService.instance;
  }

  constructor(
    private readonly milestoneService: MilestoneService,
    private readonly fakeMilestoneService: FakeMilestoneService
  ) { 
    FactoryService.instance = this;
  }

  getMilestoneService(): IMilestoneService {
    return environment.useFakeProviders ? this.fakeMilestoneService : this.milestoneService;
  }
}