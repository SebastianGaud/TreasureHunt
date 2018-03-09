import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../model/app-state';
import { IMilestone } from '../../model/milestone/milestone.d';
import { FactoryService } from '../../service/factory.service';
import { HintOpenedDialogComponent } from '../../ui-shared/hint-opened-dialog/hint-opened-dialog.component';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';
import * as MilestoneAction from '../../actions/milestone.actions';

@Component({
  selector: "milestone-details",
  templateUrl: "./milestone-details.component.html",
  styles: []
})
export class MilestoneDetailsComponent {

  key: string;
  milestone$: Observable<IMilestone>;

  constructor(
    private route: ActivatedRoute,
    private serviceFactory: FactoryService,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.key = this.route.snapshot.params.id;
    this.milestone$ = this.store.select<FirebaseMilestone>(state => 
      state.milestones.find(s => s.key == this.key)
    );
  }

  checkCurrentPosition(milestone: FirebaseMilestone) {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        if(Math.random() >= 0.5){
          milestone.opened = true;
          this.store.dispatch(new MilestoneAction.UpdatedMilestoneSyncedAction(milestone));
          this.router.navigate(['/frontend']);
        }else {
          this.snack.open('Non sei nel posto giusto!', "Chiudi", {
            duration: 3000
          });
        }
      }, (error)=> {
        console.log(error)
      });
    }
  }

  protected getHintMessege(milestone: FirebaseMilestone): string {
    return !milestone.hintOpened ? 
      "Aprire il suggerimento ti penalizzerà di: " + milestone.penalityPoints + "punti." 
      : null;
  }

  openDialog(milestone: FirebaseMilestone): void {
    if (!milestone.hintOpened) {
      let dialogRef = this.dialog.open(HintOpenedDialogComponent, { 
        data: { 
          points: milestone.penalityPoints, 
          milestoneId: milestone.key
        }
      });
    }
  }
}
