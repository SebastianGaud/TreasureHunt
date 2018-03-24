import { Component, OnInit, OnDestroy } from '@angular/core';
import { MilestonesTeam } from '../../model/game/game-team';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as TeamAction from '../../actions/team.action';
import { Team } from '../../model/team/team';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseTeam } from '../../model/firebase/firebase-team';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';

@Component({
  selector: 'my-team',
  templateUrl: './my-team.component.html',
  styles: []
})
export class MyTeamComponent implements OnDestroy {

  myTeam: Team;
  myGameTeam:MilestonesTeam;
  myTeamSubscription: Subscription;
  myGameTeamSubscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) { 
    this.store.dispatch(new TeamAction.ConnectTeamAction());
  }

  ngOnInit() {
    this.myGameTeamSubscription = this.store.select<MilestonesTeam>(state => state.gameTeam).subscribe(gt => {
      this.myGameTeam = gt;
      console.log(this.myGameTeam);
    });
    this.myTeamSubscription = this.store.select<FirebaseTeam[]>(state => state.teams).subscribe(t => {
      if (this.myGameTeam) {
        this.myTeam = t.find(t => t.key == this.myGameTeam.key);
        console.log(this.myTeam);
      }
    })
  }


  ngOnDestroy(): void {
    this.store.dispatch(new TeamAction.DisconnetTeamsAction());
    this.myGameTeamSubscription != null ? this.myGameTeamSubscription.unsubscribe() : null; 
    this.myTeamSubscription != null ? this.myTeamSubscription.unsubscribe() : null; 
  }

  
  public get lastMilestone() : FirebaseMilestone {
    let onlyOpened = this.myGameTeam.milestones.filter(t => t.opened);
    return onlyOpened[onlyOpened.length-1];
  }
  

}
