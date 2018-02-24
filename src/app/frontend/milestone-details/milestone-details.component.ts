import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FactoryService } from "../../service/factory.service";
import { IMilestone } from "../../model/milestone/milestone.d";
import { Observable } from "rxjs/Observable";
import { Milestone } from "../../model/milestone/milestone";
import { Subscription } from "rxjs/Subscription";
import { MatDialog } from "@angular/material";
import { HintOpenedDialogComponent } from "../../ui-shared/hint-opened-dialog/hint-opened-dialog.component";

@Component({
  selector: "milestone-details",
  templateUrl: "./milestone-details.component.html",
  styles: []
})
export class MilestoneDetailsComponent implements OnDestroy {

  id: string;
  milestone: IMilestone;
  milestoneSubscription: Subscription;
  hintOpened: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serviceFactory: FactoryService,
    private dialog: MatDialog
  ) {
    this.id = this.route.snapshot.params.id;
    this.milestoneSubscription = serviceFactory.getMilestoneService()
      .getMilestone(this.id).subscribe(s => {
        this.milestone = s;
        this.hintOpened = this.milestone.hintOpened;
      });
  }

  prova() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
      }, (error )=> {
        console.log(error)
      });
    }
  }

  protected getHintMessege(): string {
    return !this.hintOpened ? 
      "Aprire il suggerimento ti penalizzerà di: " + this.milestone.penalityPoints + "punti." 
      : null;
  }

  openDialog(): void {
    if (!this.hintOpened) {
      let dialogRef = this.dialog.open(HintOpenedDialogComponent, { 
        data: { 
          points: this.milestone.penalityPoints, 
          milestoneId: this.milestone.id
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.hintOpened = result
      });
    }
  }

  ngOnDestroy(): void {
    this.milestoneSubscription.unsubscribe();
  }

}
