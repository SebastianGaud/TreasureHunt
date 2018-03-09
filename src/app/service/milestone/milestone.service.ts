import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { DataSnapshot } from '@firebase/database-types';
import { Action, Store } from '@ngrx/store';
import { AngularFireAction, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import * as milestoneAction from '../../actions/milestone.actions';
import { AppState } from '../../model/app-state';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';
import { Milestone } from '../../model/milestone/milestone';
import { IMilestone } from '../../model/milestone/milestone.d';


@Injectable()
export class MilestoneService {

  milestonesRef: AngularFireList<IMilestone>;
  milestoneEventsSubject: Subject<Action>;
  milestoneChildAddedRef: Subscription;
  milestoneChildUpdatedRef: Subscription;
  milestoneChildRemovedRef: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<AppState>
  ) {
    this.milestonesRef = db.list<IMilestone>('milestone/');
    this.milestoneEventsSubject = new Subject<Action>();
  }

  public getMilestonesEvent(): Observable<Action> {
    this.initConnectMilestones();
    return this.milestoneEventsSubject.asObservable();
  }

  public initConnectMilestones() {
    let initialLoaded = false;

    this.milestonesRef.snapshotChanges().take(1).subscribe(m => {
      initialLoaded = true;
      this.milestoneEventsSubject.next(new milestoneAction.ConnectMilestonesSuccessAction(m.map(this.mapType)));
    });

    this.milestoneChildAddedRef = this.milestonesRef.stateChanges(['child_added']).subscribe(m => {
      this.milestoneEventsSubject.next(new milestoneAction.AddedMilestoneSyncedAction(this.mapType(m)))
    });

    this.milestoneChildUpdatedRef = this.milestonesRef.stateChanges(['child_changed']).subscribe(m => {
      this.milestoneEventsSubject.next(new milestoneAction.UpdatedMilestoneSyncedAction(this.mapType(m)))
    });

    this.milestoneChildRemovedRef = this.milestonesRef.stateChanges(['child_removed']).subscribe(m => {
      this.milestoneEventsSubject.next(new milestoneAction.RemovedMilestoneSyncedAction(this.mapType(m)))
    });
  }

  public disconnectCompanies(): void {
    this.milestoneChildAddedRef.unsubscribe();
    this.milestoneChildRemovedRef.unsubscribe();
    this.milestoneChildUpdatedRef.unsubscribe();
  }

  private mapType(m: AngularFireAction<DataSnapshot>): FirebaseMilestone {
    return ({
      key: m.key,
      ...m.payload.val() as IMilestone
    });
  }

  getMilestone(milestoneKey: string): Observable<FirebaseMilestone> {
    return this.store.select<FirebaseMilestone>(state => state.milestones.find(m => m.key == milestoneKey));
  }

  getMilestones(): Observable<Array<FirebaseMilestone>> {
    return this.store.select<Array<FirebaseMilestone>>(state => state.milestones);
  }

  saveMilestones(milestone: IMilestone) {
    this.milestonesRef.push(milestone);
  }

  editMilestones(milestone: FirebaseMilestone) {
    this.milestonesRef.update(milestone.key, milestone as Milestone);
  }

  removeMilestones(milestone: FirebaseMilestone) {
    this.milestonesRef.remove(milestone.key);
  }
}
