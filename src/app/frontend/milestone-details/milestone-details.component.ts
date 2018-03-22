import { Component } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { AppState } from "../../model/app-state";
import { IMilestone } from "../../model/milestone/milestone.d";
import { HintOpenedDialogComponent } from "../../ui-shared/hint-opened-dialog/hint-opened-dialog.component";
import { FirebaseMilestone } from "../../model/firebase/firebase-milestone";
import { MilestoneService } from "../../service/milestone/milestone.service";
import { TeamMilestonesService } from "../../service/team-milestones/team-milestones.service";

@Component({
  selector: "milestone-details",
  templateUrl: "./milestone-details.component.html",
  styles: []
})
export class MilestoneDetailsComponent {

  key: string;
  milestone$: Observable<IMilestone>;

  constructor(
    private milestoneService: MilestoneService,
    private teamMilestonesService: TeamMilestonesService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.key = this.route.snapshot.params.id;
    this.milestone$ = this.store.select<FirebaseMilestone>(state =>
      state.gameTeam.milestones.find(s => s.key == this.key)
    );
  }

  checkCurrentPosition(milestone: FirebaseMilestone) {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        let distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
          new google.maps.LatLng(milestone.coords.lat, milestone.coords.lng));

          console.log(distance);
        if(distance < 30) {
          milestone.opened = true;
          this.teamMilestonesService.openNextTeamMilestone(milestone);
          this.router.navigate(["/frontend"]);
        } else {
          this.snack.open("Non sei nel posto giusto!", "Chiudi", {
            duration: 3000
          });
        }
      }, (error)=> {
        console.log(error);
      });
    }
  }

  protected getHintMessege(milestone: FirebaseMilestone): string {
    return !milestone.hintOpened ?
      "Aprire il suggerimento ti penalizzerà di: " + milestone.penalityPoints + " punti."
      : null;
  }

  openDialog(milestone: FirebaseMilestone): void {
    if (!milestone.hintOpened) {
      let dialogRef = this.dialog.open(HintOpenedDialogComponent, {
        data: {
          points: milestone.penalityPoints,
          milestoneId: milestone.key
        }
      });
    }
  }
}
