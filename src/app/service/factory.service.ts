import { Injectable } from '@angular/core';
import { MilestoneService } from './milestone/milestone.service';
import { FakeMilestoneService } from './milestone/fake-milestone.service';
import { IMilestoneService } from './milestone/milestone-service';
import { environment } from '../../environments/environment';

@Injectable()
export class FactoryService {
  constructor(
    private milestoneService: MilestoneService,
    private fakeMilestoneService: FakeMilestoneService
  ) { }

  getMilestoneService() : IMilestoneService {
    return environment.useFakeProviders ? this.fakeMilestoneService : this.milestoneService;
  }
}