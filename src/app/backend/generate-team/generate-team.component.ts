import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppState } from "../../model/app-state";
import { Store } from "@ngrx/store";
import { TeamService } from "../../service/team/team.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TeamMilestonesService } from "../../service/team-milestones/team-milestones.service";
import { MilestoneService } from "../../service/milestone/milestone.service";
import { FirebaseMilestone } from "../../model/firebase/firebase-milestone";
import * as MilestoneAction from '../../actions/milestone.actions';

@Component({
  selector: "generate-team",
  templateUrl: "./generate-team.component.html",
  styles: []
})
export class GenerateTeamComponent implements OnDestroy {

  form = new FormGroup({
    name: new FormControl("", Validators.required),
  });

  constructor(
    private store: Store<AppState>,
    private teamService: TeamService,
    private teamMilestoneService: TeamMilestonesService,
    private milestoneService: MilestoneService,
    private router: Router
  ) {
    this.store.dispatch(new MilestoneAction.ConnectMilestoneAction());
  }


  save() {
    this.teamService.saveTeam({
      token: null,
      name: this.name.value,
      points: 0
    }).then(t => {
      this.milestoneService.getMilestones().first().subscribe(m => {
        this.teamMilestoneService.saveMilestoneTeam({
          key: t.key,
          milestones: m
        })
      })
    })
    this.router.navigate(['backend']);
  }


  ngOnDestroy(): void {
    this.store.dispatch(new MilestoneAction.DisconnectMilestonesAction());
  }

  get name() {
    return this.form.get('name');
  }
}
