import { Component, OnInit } from "@angular/core";
import { MilestoneService } from "../../service/milestone/milestone.service";

@Component({
  selector: "backend-entry",
  templateUrl: "./backend-entry.component.html",
  styles: []
})
export class BackendEntryComponent implements OnInit {

  constructor(private milestoneService: MilestoneService) { }

  ngOnInit() {
    this.milestoneService.initConnectMilestones();
  }

}
