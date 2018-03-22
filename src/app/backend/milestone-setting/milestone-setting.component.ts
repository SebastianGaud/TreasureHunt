import { Component, OnInit, OnDestroy } from '@angular/core';
import * as MilestoneActions from '../../actions/milestone.actions';
import { AppState } from '../../model/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';

@Component({
  selector: 'milestone-setting',
  templateUrl: './milestone-setting.component.html',
  styles: []
})
export class MilestoneSettingComponent implements OnDestroy {

  milestones$: Observable<FirebaseMilestone[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.dispatch(new MilestoneActions.ConnectMilestoneAction());
    this.milestones$ = this.store.select<FirebaseMilestone[]>(state => state.milestones);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new MilestoneActions.DisconnectMilestonesAction());
  }
}
