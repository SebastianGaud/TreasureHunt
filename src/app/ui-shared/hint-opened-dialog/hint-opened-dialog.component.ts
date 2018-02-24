import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FactoryService } from '../../service/factory.service';

@Component({
  selector: 'hint-opened-dialog',
  templateUrl: './hint-opened-dialog.component.html',
  styles: []
})
export class HintOpenedDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HintOpenedDialogComponent>,
    @Inject(FactoryService) private serviceFactory: FactoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  setPenalityPoint() {
    this.serviceFactory.getTeamService().removePoints("asdadsas", this.data.points);
    this.serviceFactory.getTeamService().setHintOpened("asdadsas",  this.data.milestoneId ,this.data.points);
    this.dialogRef.close(true);
  }

}