import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hint-opened-dialog',
  templateUrl: './hint-opened-dialog.component.html',
  styles: []
})
export class HintOpenedDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HintOpenedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}