import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FactoryService } from "../../service/factory.service";
import { IMilestone } from "../../model/milestone/milestone.d";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "milestone-details",
  templateUrl: "./milestone-details.component.html",
  styles: []
})
export class MilestoneDetailsComponent implements OnInit {

  key: string;
  milestone: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private serviceFactory: FactoryService
  ) { }

  ngOnInit() {
    this.key = this.route.snapshot.params.key;
    this.milestone = this.serviceFactory.getMilestoneService().getMilestone(this.key);
  }

}
