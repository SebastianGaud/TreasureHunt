import { Component, Input } from '@angular/core';

@Component({
  selector: 'milestone',
  templateUrl: './milestone.component.html',
  styles: []
})
export class MilestoneComponent {


  tappa: string = 'TAPPA';
  @Input('number') num: number;

  constructor() { }

}
