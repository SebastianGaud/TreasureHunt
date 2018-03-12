import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-details',
  templateUrl: './team-details.component.html',
  styles: []
})
export class TeamDetailsComponent implements OnInit {

  indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  constructor() { }

  ngOnInit() {
  }

  public orderChanged($event) {
    console.log($event);
  }

}
