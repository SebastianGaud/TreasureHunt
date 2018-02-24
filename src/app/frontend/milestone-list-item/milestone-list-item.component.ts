import { Component, Input, OnDestroy } from "@angular/core";
import { FactoryService } from "../../service/factory.service";
import { IMilestone } from "../../model/milestone/milestone.d";
import { Subscription } from "rxjs/Subscription";
import { Milestone } from "../../model/milestone/milestone";

@Component({
  selector: "milestone-list-item",
  templateUrl: "./milestone-list-item.component.html",
  styles: []
})
export class MilestoneListItemComponent implements OnDestroy{

  milestone: IMilestone = new Milestone;
  tappa: string = "TAPPA";
  milestoneSubscription: Subscription;
  @Input("number") num: number;
  @Input("id")id :string;

  constructor(
    private serviceFactory: FactoryService
  ) { 
    this.milestoneSubscription = serviceFactory.getMilestoneService().getMilestone(this.id).subscribe(s => {
      this.milestone = s;
    })
  }


  ngOnDestroy(): void {
    this.milestoneSubscription.unsubscribe();
  }
}
