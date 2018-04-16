import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../model/app-state';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';
import { FirebaseTeam } from '../../model/firebase/firebase-team';
import { MilestonesTeam } from '../../model/game/game-team';

@Component({
  selector: 'team-item-list',
  templateUrl: './team-item-list.component.html',
  styles: []
})
export class TeamItemListComponent implements OnDestroy, OnInit{


  @Input('team') team: FirebaseTeam;
  teamMilestone: MilestonesTeam;
  teamMilestoneSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
  ) { 
  }
  ngOnInit(): void {
    this.teamMilestoneSubscription = this.store.select(state => state.gameTeams.find(t => t.key == this.team.key)).subscribe(t => {
      this.teamMilestone = t;
    });
  }

  ngOnDestroy(): void {
    this.teamMilestoneSubscription ? this.teamMilestoneSubscription.unsubscribe : null;
  }


  public get LastMilestoneOpened() : FirebaseMilestone {
    if (this.teamMilestone.milestones) {
      let opened = this.teamMilestone.milestones.filter(t => t.opened);
      return opened[opened.length -1];
    }

    return new FirebaseMilestone();
  }

}
