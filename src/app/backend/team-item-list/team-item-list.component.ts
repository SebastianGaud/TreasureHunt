import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FirebaseTeam } from '../../model/firebase/firebase-team';

import * as TeamMilestoneAction from '../../actions/team-milestones.action';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import { MilestonesTeam } from '../../model/game/game-team';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';

@Component({
  selector: 'team-item-list',
  templateUrl: './team-item-list.component.html',
  styles: []
})
export class TeamItemListComponent implements OnDestroy{

  @Input('team') team: FirebaseTeam;
  teamMilestone: MilestonesTeam;
  teamMilestoneSubscription: Subscription;
  constructor(
    private store: Store<AppState>
  ) { 
    this.store.dispatch(new TeamMilestoneAction.ConnectTeamMilestonesAction());
    this.teamMilestoneSubscription = this.store.select(state => state.gameTeams.find(t => t.key == this.team.key)).subscribe(t => {
      this.teamMilestone = t;
    });
  }


  ngOnDestroy(): void {
    this.store.dispatch(new TeamMilestoneAction.DisconnectTeamMilestonesAction());
  }

  
  public get LastMilestoneOpened() : FirebaseMilestone {
    let opened = this.teamMilestone.milestones.filter(t => t.opened);
    return opened[opened.length -1];
  }
  
}
