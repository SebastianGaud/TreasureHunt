import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { ITeam } from "../../model/team/team.d";
import { AngularFireDatabase, AngularFireList, AngularFireAction } from "angularfire2/database";
import { Subject } from "rxjs/Subject";
import { Action, Store } from "@ngrx/store";
import { AppState } from "../../model/app-state";
import { FirebaseTeam } from "../../model/firebase/firebase-team";
import { Subscription } from "rxjs/Subscription";
import * as TeamAction from "../../actions/team.action";
import { DataSnapshot } from "@firebase/database-types";
import { Team } from "../../model/team/team";

@Injectable()
export class TeamService {

  teamRef: AngularFireList<ITeam>;
  teamEventSubject: Subject<Action>;
  private teamChildAddedRef: Subscription;
  private teamChildUpdatedRef: Subscription;
  private teamChildRemovedRef: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {
    this.teamRef = db.list<ITeam>("teams/");
    this.teamEventSubject = new Subject<Action>();
  }

  getTeamEvent(): Observable<Action> {
    this.initConnectTeam();
    return this.teamEventSubject.asObservable();
  }

  public disconnectTeam() {
    this.teamChildAddedRef.unsubscribe();
    this.teamChildRemovedRef.unsubscribe();
    this.teamChildUpdatedRef.unsubscribe();
  }
  
  public initConnectTeam() {
    let initialLoaded = false;

    this.teamRef.snapshotChanges().take(1).subscribe(m => {
      initialLoaded = true;
      this.teamEventSubject.next(new TeamAction.ConnectTeamSuccessAction(m.map(this.mapType)));
    });

    this.teamChildAddedRef = this.teamRef.stateChanges(["child_added"]).subscribe(t => {
      if (initialLoaded) {
        this.teamEventSubject.next(new TeamAction.AddedTeamSyncedAction(this.mapType(t)));
      }
    });

    this.teamChildUpdatedRef = this.teamRef.stateChanges(["child_changed"]).subscribe(t => {
      this.teamEventSubject.next(new TeamAction.UpdateTeamSyncedAction(this.mapType(t)));
    });

    this.teamChildRemovedRef = this.teamRef.stateChanges(["child_removed"]).subscribe(t => {
      this.teamEventSubject.next(new TeamAction.RemovedTeamSyncedAction(this.mapType(t)));
    });
  }

  private mapType(m: AngularFireAction<DataSnapshot>): FirebaseTeam {
    return ({
      key: m.key,
      ...m.payload.val() as ITeam
    });
  }

  getTeam(milestoneKey: string): Observable<FirebaseTeam> {
    return this.store.select<FirebaseTeam>(state => state.milestones.find(m => m.key == milestoneKey));
  }

  getTeams(): Observable<Array<FirebaseTeam>> {
    return this.store.select<Array<FirebaseTeam>>(state => state.milestones);
  }

  saveTeam(team: ITeam) {
    this.teamRef.push(team);
  }

  editTeam(team: FirebaseTeam) {
    this.teamRef.update(team.key, team as Team);
  }

  removeTeam(team: FirebaseTeam) {
    this.teamRef.remove(team.key);
  }

}
