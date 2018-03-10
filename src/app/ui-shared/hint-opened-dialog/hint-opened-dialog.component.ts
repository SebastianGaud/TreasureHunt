import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Store } from "@ngrx/store";
import { AppState } from "../../model/app-state";
import { MilestoneService } from "../../service/milestone/milestone.service";

@Component({
  selector: "hint-opened-dialog",
  templateUrl: "./hint-opened-dialog.component.html",
  styles: []
})
export class HintOpenedDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HintOpenedDialogComponent>,
    public store: Store<AppState>,
    @Inject(MilestoneService) private milestoneService: MilestoneService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  setPenalityPoint() {
    let milestone = this.milestoneService.getMilestone(this.data.id)
    .first()
    .subscribe(m => {
      m.opened = true;
      this.milestoneService.editMilestone(m);
    });
    this.dialogRef.close(true);
  }
}