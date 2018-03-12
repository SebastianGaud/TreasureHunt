import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as TeamMilestonesAction from '../../actions/team-milestones.action';
import { AppState } from '../../model/app-state';
import { MilestonesTeam } from '../../model/game/game-team';
import { Subscription } from 'rxjs/Subscription';
import { DataSnapshot } from '@firebase/database-types';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';

@Injectable()
export class TeamMilestonesService {

  milestoneTeamsRef: AngularFireList<MilestonesTeam>;
  milestoneTeamsSubject: Subject<Action>;
  milestonesAddedChildRef: Subscription;
  milestonesUpdatedChildRef: Subscription;
  milestonesRemovedChildRef: Subscription;

  constructor(
    private store: Store<AppState>,
    private db: AngularFireDatabase
  ) { 
    this.milestoneTeamsRef = db.list<MilestonesTeam>('teamMilestones/');
    this.milestoneTeamsSubject = new Subject<Action>();
  }

  public getTeamEvent() : Observable<Action> {
    this.initConnection();
    return this.milestoneTeamsSubject.asObservable();
  }

  public initConnection(){
    let initialLoaded = true;

    this.milestoneTeamsRef.snapshotChanges().first().subscribe(tm => {
      initialLoaded = true;
      this.milestoneTeamsSubject.next(new TeamMilestonesAction.ConnectTeamMilestonesSuccessAction(tm.map(this.mapType)));
    });


    this.milestonesAddedChildRef = this.milestoneTeamsRef.stateChanges(["child_added"]).subscribe(t => {
      if (initialLoaded) {
        this.milestoneTeamsSubject.next(new TeamMilestonesAction.AddedTeamMilestoneSyncedAction(this.mapType(t)));
      }
    });

    this.milestonesUpdatedChildRef = this.milestoneTeamsRef.stateChanges(["child_changed"]).subscribe(t => {
      this.milestoneTeamsSubject.next(new TeamMilestonesAction.UpdatedTeamMilestoneSyncedAction(this.mapType(t)));
    });

    this.milestonesRemovedChildRef = this.milestoneTeamsRef.stateChanges(["child_removed"]).subscribe(t => {
      this.milestoneTeamsSubject.next(new TeamMilestonesAction.RemovedTeamMilestoneSyncedAction(this.mapType(t)));
    });
  }

  private mapType(a: AngularFireAction<DataSnapshot>) : MilestonesTeam {
    let ab = ({
      teamKey: a.key,
      milestones: a.payload.val()
    });


    console.log(ab);
    return ab; 
  }

  getMilestoneTeam(teamkey: string){
    return this.store.select<MilestonesTeam>(state => state.gameTeams.find(m => m.teamKey == teamkey));
  }

  getMilestonesTeam(){
    return this.store.select<MilestonesTeam[]>(state => state.gameTeams);
  }

  saveMilestoneTeam(milestonesTeam: MilestonesTeam) {
    console.log(milestonesTeam);
    this.milestoneTeamsRef.push(milestonesTeam);
  }

  editMilestoneTeam(milestonesTeam: MilestonesTeam) {
    this.milestoneTeamsRef.update(milestonesTeam.teamKey, milestonesTeam as MilestonesTeam);
  }

  removeMilestoneTeam(milestoneTeam: MilestonesTeam) {
    this.milestoneTeamsRef.remove(milestoneTeam.teamKey);
  }

  public disconnectTeamMilestonesteam(){
    this.milestonesAddedChildRef.unsubscribe();
    this.milestonesRemovedChildRef.unsubscribe();
    this.milestonesUpdatedChildRef.unsubscribe();
  }

}
