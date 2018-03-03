import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../model/app-state';
import { IMilestone } from '../../model/milestone/milestone.d';
import { FactoryService } from '../../service/factory.service';
import { HintOpenedDialogComponent } from '../../ui-shared/hint-opened-dialog/hint-opened-dialog.component';

@Component({
  selector: "milestone-details",
  templateUrl: "./milestone-details.component.html",
  styles: []
})
export class MilestoneDetailsComponent {

  id: string;
  milestone$: Observable<IMilestone>;

  constructor(
    private route: ActivatedRoute,
    private serviceFactory: FactoryService,
    private router: Router,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.id = this.route.snapshot.params.id;
      this.milestone$ = this.store.select(state => state.milestones.find(s => s.id == this.id));
  }

  checkCurrentPosition(milestone: IMilestone) {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        if(Math.random() >= 0.5){
          this.serviceFactory.getTeamService().setMilestoneOpened("asdadsas", milestone.id, true);
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

  protected getHintMessege(milestone: IMilestone): string {
    return !milestone.hintOpened ? 
      "Aprire il suggerimento ti penalizzerà di: " + milestone.penalityPoints + "punti." 
      : null;
  }

  openDialog(milestone: IMilestone): void {
    if (!milestone.hintOpened) {
      let dialogRef = this.dialog.open(HintOpenedDialogComponent, { 
        data: { 
          points: milestone.penalityPoints, 
          milestoneId: milestone.id
        }
      });
    }
  }
}
