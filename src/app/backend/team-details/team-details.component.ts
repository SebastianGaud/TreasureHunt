import * as _ from "lodash";

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as MilestonesAction from '../../actions/milestone.actions';
import * as TeamMilestoneAction from '../../actions/team-milestones.action';
import { AppState } from '../../model/app-state';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';
import { MilestonesTeam } from '../../model/game/game-team';
import { TeamMilestonesService } from '../../service/team-milestones/team-milestones.service';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operator/combineLatest';
import { MatSnackBar } from "@angular/material";


@Component({
  selector: 'team-details',
  templateUrl: './team-details.component.html',
  styles: []
})
export class TeamDetailsComponent implements OnDestroy {

  order: number[];
  milestones: Array<FirebaseMilestone>;
  milestonesTeam: MilestonesTeam;
  milestoneTeamSubscription: Subscription;
  milestoneSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private teamMilestoneService: TeamMilestonesService,
    private store: Store<AppState>,
    private snack: MatSnackBar
  ) {
    let mt: MilestonesTeam;


    //TODO: Refactor di questo metodo che fa schifo
    this.milestoneTeamSubscription = this.store.select(state => state.gameTeams.find(tm =>
      tm.key == this.route.snapshot.params['id'])).subscribe(t => {
        if (t) {
          this.milestoneSubscription = this.store.select(state => state.milestones)
            .subscribe(m => {
              if (m.length > 0) {
                t.milestones = _.uniqBy([...t.milestones, ...m], 'key');
                this.milestonesTeam = t;
              }
          });
        }
      });
  }

  orderChanged($event) {
    this.order = $event as number[];
  }

  ngOnDestroy(): void {
    this.milestoneSubscription ? this.milestoneSubscription.unsubscribe() : null;
    this.milestoneTeamSubscription ? this.milestoneTeamSubscription.unsubscribe() : null;
  }

  save() {
    let milestones = new Array<FirebaseMilestone>();
    if (this.order) {
      this.order.forEach(n => {
        this.milestonesTeam.milestones[n].opened = false;
        milestones.push(this.milestonesTeam.milestones[n]);
      });
      milestones[0].opened = true;
      this.teamMilestoneService.editMilestoneTeam({
        key: this.milestonesTeam.key,
        milestones: milestones
      }); 
    }

    this.snack.open("Lista salvata con successo", "Chiudi", {
      horizontalPosition: "right"
    });
  }

}
