import { NgModule } from '@angular/core';

import { FactoryService } from './factory.service';
import { MilestoneService } from './milestone/milestone.service';

@NgModule({
  imports: [
    FactoryService,
    MilestoneService
  ],
  exports: [
    FactoryService,
    MilestoneService
  ],
  declarations: []
})
export class ServiceModule { }
