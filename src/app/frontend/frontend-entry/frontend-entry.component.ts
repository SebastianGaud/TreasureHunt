import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Animations } from '../../animations/common-animations';
import { IMilestone } from '../../model/milestone/milestone.d';
import { FactoryService } from '../../service/factory.service';
import { AppState } from '../../model/app-state';
import { Observable } from 'rxjs/Observable';
import * as MilestoneActions from './../../actions/milestone.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "frontend-entry",
  templateUrl: "./frontend-entry.component.html",
  styles: [],
  animations: [Animations.Stagger, Animations.TranslateFromLeft]
})
export class FrontendEntryComponent implements OnDestroy {

  milestones$: Observable<IMilestone[]>;
  
  constructor(
    private store: Store<AppState>
  ) {
    this.store.dispatch(new MilestoneActions.ConnectMilestoneAction());
    this.milestones$ = this.store.select(state => state.milestones);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new MilestoneActions.DisconnectMilestonesAction());
  }
}
