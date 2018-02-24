import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FactoryService } from "../../service/factory.service";
import { IMilestone } from "../../model/milestone/milestone.d";
import { Observable } from "rxjs/Observable";
import { Milestone } from "../../model/milestone/milestone";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "milestone-details",
  templateUrl: "./milestone-details.component.html",
  styles: []
})
export class MilestoneDetailsComponent implements OnDestroy {

  id: string;
  milestone: IMilestone;
  milestoneSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private serviceFactory: FactoryService
  ) { 
    this.id = this.route.snapshot.params.id;
    this.milestoneSubscription =  FactoryService.getInstance().getMilestoneService()
    .getMilestone(this.id).subscribe(s => {
      this.milestone = s;
    });
  }

  ngOnDestroy(): void {
    this.milestoneSubscription.unsubscribe();
  }

}
