import { Component, OnInit, Input } from '@angular/core';
import { FirebaseTeam } from '../../model/firebase/firebase-team';

@Component({
  selector: 'team-item-list',
  templateUrl: './team-item-list.component.html',
  styles: []
})
export class TeamItemListComponent {

  @Input('team') team: FirebaseTeam;

  constructor() { }
}
