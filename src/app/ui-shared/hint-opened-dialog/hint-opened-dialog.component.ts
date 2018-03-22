import { Component, Inject, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Store } from "@ngrx/store";
import { AppState } from "../../model/app-state";
import { MilestoneService } from "../../service/milestone/milestone.service";
import * as MilestoneAction from '../../actions/milestone.actions';
import { TeamService } from "../../service/team/team.service";

@Component({
  selector: "hint-opened-dialog",
  templateUrl: "./hint-opened-dialog.component.html",
  styles: []
})
export class HintOpenedDialogComponent implements OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<HintOpenedDialogComponent>,
    public store: Store<AppState>,
    public teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.store.dispatch(new MilestoneAction.ConnectMilestoneAction());
  }

  setPenalityPoint() {
    this.store.select(state => state.gameTeam).first().subscribe(t => {
      if (t) {
        console.log(t);
        this.store.select(state => state.teams).first().subscribe(tm => {
          let team = tm.find(tmy => tmy.key == t.key);
          team.points -= t.milestones.find(mt => mt.key == this.data.milestoneId).penalityPoints;
          t.milestones.find(mt => mt.key == this.data.milestoneId).hintOpened = true;
          this.teamService.editTeam(team.key, team);
        });
        this.dialogRef.close(true);
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new MilestoneAction.DisconnectMilestonesAction());
  }
}