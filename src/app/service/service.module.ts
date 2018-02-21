import { NgModule } from "@angular/core";

import { FactoryService } from "./factory.service";
import { MilestoneService } from "./milestone/milestone.service";
import { FakeMilestoneService } from "./milestone/fake-milestone.service";

@NgModule({
  imports: [
  ],
  declarations: [],
  providers: [
    FactoryService,
    MilestoneService,
    FakeMilestoneService,
  ]
})
export class ServiceModule { }
