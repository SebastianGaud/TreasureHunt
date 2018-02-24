import { Component, Input, OnDestroy } from "@angular/core";
import { FactoryService } from "../../service/factory.service";
import { IMilestone } from "../../model/milestone/milestone.d";
import { Subscription } from "rxjs/Subscription";
import { Milestone } from "../../model/milestone/milestone";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "milestone-list-item",
  templateUrl: "./milestone-list-item.component.html",
  styles: []
})
export class MilestoneListItemComponent {

  tappa: string = "TAPPA";
  @Input("number") num: number;
  @Input("id") id: string;
  @Input("opened") opened: boolean;

  constructor() {
  }
}
