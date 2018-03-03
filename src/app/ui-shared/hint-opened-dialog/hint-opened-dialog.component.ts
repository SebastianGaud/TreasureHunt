import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FactoryService } from '../../service/factory.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../model/app-state';
import { SetMilestoneHintOpenedAction } from '../../actions/milestone.actions';

@Component({
  selector: 'hint-opened-dialog',
  templateUrl: './hint-opened-dialog.component.html',
  styles: []
})
export class HintOpenedDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HintOpenedDialogComponent>,
    public store: Store<AppState>,
    @Inject(FactoryService) private serviceFactory: FactoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  setPenalityPoint() {    
    this.store.dispatch(new SetMilestoneHintOpenedAction({
      id: this.data.milestoneId,
      isOpened : true,
      points: this.data.points
    }));

    this.dialogRef.close(true);
  }

}