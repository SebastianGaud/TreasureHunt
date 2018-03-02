import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Animations } from '../../animations/common-animations';
import { IMilestone } from '../../model/milestone/milestone.d';
import { FactoryService } from '../../service/factory.service';
import { AppState } from '../../model/app-state';
import { Observable } from 'rxjs/Observable';
import * as milestoneActions from './../../actions/milestone.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "frontend-entry",
  templateUrl: "./frontend-entry.component.html",
  styles: [],
  animations: [Animations.Stagger, Animations.TranslateFromLeft]
})
export class FrontendEntryComponent implements OnInit {

  milestones$: Observable<any>;
  
  constructor(
    private store: Store<AppState>
  ) {

    this.milestones$ = this.store.select(state => state.milestones);
  }

  getMilestones() {
    this.store.dispatch(new milestoneActions.LoadMilestonesAction());
  }

  ngOnInit(): void {
    this.getMilestones();
  }
  
}
