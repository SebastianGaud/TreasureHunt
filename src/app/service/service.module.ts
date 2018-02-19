import { NgModule } from '@angular/core';

import { FactoryService } from './factory.service';
import { MilestoneService } from './milestone/milestone.service';
import { FakeMilestoneService } from './milestone/fake-milestone.service';

@NgModule({
  imports: [
    FactoryService,
    MilestoneService,
    FakeMilestoneService,
  ],
  exports: [
    FactoryService,
    MilestoneService,
    FakeMilestoneService
  ],
  declarations: []
})
export class ServiceModule { }
