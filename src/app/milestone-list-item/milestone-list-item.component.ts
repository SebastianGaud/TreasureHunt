import { Component, Input } from '@angular/core';

@Component({
  selector: 'milestone-list-item',
  templateUrl: './milestone-list-item.component.html',
  styles: []
})
export class MilestoneListItemComponent {

  tappa: string = 'TAPPA';
  @Input('number') num: number;
  @Input('id')id :string;

  constructor() { }

}
