import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FirebaseMilestone } from '../../model/firebase/firebase-milestone';

@Component({
  selector: 'milestones-list',
  templateUrl: './milestones-list.component.html',
  styles: []
})
export class MilestonesListComponent{

  @Input('milestones') milestones: Array<FirebaseMilestone>;
  @Input('isSortable') isSortable: boolean;
  @Output('orderChanged') order: EventEmitter<Array<number>> = new EventEmitter<number[]>();
  
  constructor() { }

  orderChanged($event) {
    this.order.emit($event as number[]);
  }
}
