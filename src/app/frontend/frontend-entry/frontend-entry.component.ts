import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { Animations } from "../../animations/common-animations";
import { IMilestone } from "../../model/milestone/milestone.d";
import { FactoryService } from "../../service/factory.service";

@Component({
  selector: "frontend-entry",
  templateUrl: "./frontend-entry.component.html",
  styles: [],
  animations: [Animations.Stagger, Animations.TranslateFromLeft]
})
export class FrontendEntryComponent implements OnDestroy {

  milestones: IMilestone[];
  milestoneSubscription: Subscription;

  constructor(
    serviceFactory: FactoryService
  ) {
    this.milestoneSubscription =  serviceFactory
    .getMilestoneService()
    .getMilestones().subscribe(s => {
        this.milestones = s;
        console.log(this.milestones);
      });
  }

  ngOnDestroy(): void {
    this.milestoneSubscription.unsubscribe();
  }

}
