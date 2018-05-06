import { Component, OnDestroy } from "@angular/core";
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
import { TeamService } from "../../service/team/team.service";
import { FirebaseTeam } from "../../model/firebase/firebase-team";

import * as TeamActions from '../../actions/team.action';
import * as TeamMilestonesActions from '../../actions/team-milestones.action';

@Component({
  selector: "milestone-details",
  templateUrl: "./milestone-details.component.html",
  styles: []
})
export class MilestoneDetailsComponent implements OnDestroy{

  key: string;
  milestone$: Observable<IMilestone>;

  constructor(
    private milestoneService: MilestoneService,
    private teamMilestonesService: TeamMilestonesService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.route.params.subscribe(p => {
      this.milestone$ = this.store.select<FirebaseMilestone>(state =>
        state.gameTeam.milestones.find(s => s.key == p['id'])
      );
    })
    this.store.dispatch(new TeamActions.ConnectTeamAction());
  }

  checkCurrentPosition(milestone: FirebaseMilestone) {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        let distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
          new google.maps.LatLng(milestone.coords.lat, milestone.coords.lng));
        if(distance < 30) {
          this.computeMilestone(milestone);
        } else {
          this.snack.open("Non sei nel posto giusto!", "Chiudi", {
            duration: 3000
          });
        }
      }, (error)=> {
        console.log(error);
      }, {timeout: 10000});
    } else {
      this.snack.open("Non riesco a localizzare la tua posizione, controlla di aver attivo il GPS", "Chiudi", {
        duration: 5000
      });
    }
  }

  protected getHintMessege(milestone: FirebaseMilestone): string {
    return !milestone.hintOpened ?
      "Aprire il suggerimento ti penalizzerà di: " + milestone.penalityPoints + " punti."
      : null;
  }

  private openDialog(milestone: FirebaseMilestone): void {
    if (milestone.token) {
      this.snack.open("Hai già aperto questa tappa", "Chiudi", {
        duration: 300
      });
      return;
    }
    if (!milestone.hintOpened) {
      let dialogRef = this.dialog.open(HintOpenedDialogComponent, {
        data: {
          points: milestone.penalityPoints,
          milestoneId: milestone.key
        }
      });
    }
  }

  private computeMilestone(milestone: FirebaseMilestone) : void {
    milestone.opened = true;
    this.teamMilestonesService.openNextTeamMilestone(milestone);
    this.store.select(state => state.gameTeam).first().subscribe(t => {
      if (t) {
        console.log(t);  
        this.store.select(state => state.teams).first().subscribe(tm => {
          let team = tm.find(tmy => tmy.key == t.key);
          team.points += milestone.points;
          this.teamService.editTeam(team.key, team);
          this.router.navigate(["/frontend"]); 
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new TeamActions.DisconnetTeamsAction());
  }
}
