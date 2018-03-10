import { Component, OnInit } from "@angular/core";
import { AppState } from "../../model/app-state";
import { Store } from "@ngrx/store";
import { TeamService } from "../../service/team/team.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "generate-team",
  templateUrl: "./generate-team.component.html",
  styles: []
})
export class GenerateTeamComponent implements OnInit {
  
  form = new FormGroup({
    name: new FormControl("", Validators.required),
  });

  constructor(
    private store: Store<AppState>,
    private teamService: TeamService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  protected save() {
    this.teamService.saveTeam({
      name: this.name.value,
      points: 0
    });

    this.router.navigate(['backend']);
  }

  get name() {
    return this.form.get('name');
  }


}
