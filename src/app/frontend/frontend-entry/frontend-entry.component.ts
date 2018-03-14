import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Animations } from "../../animations/common-animations";
import { IMilestone } from "../../model/milestone/milestone.d";
import { AppState } from "../../model/app-state";
import { Observable } from "rxjs/Observable";
import * as MilestonesTeamActions from "./../../actions/team-milestones.action";
import { CookieService } from "../../service/cookie-service.service";
import { Consts } from "../../../environments/Consts";

@Component({
  selector: "frontend-entry",
  templateUrl: "./frontend-entry.component.html",
  styles: [],
  animations: [Animations.Stagger, Animations.TranslateFromLeft]
})
export class FrontendEntryComponent implements OnDestroy {

  milestones$: Observable<IMilestone[]>;

  constructor(
    private store: Store<AppState>,
    private cookieService: CookieService
  ) {
    this.store.dispatch(new MilestonesTeamActions.ConnectTeamMilestonesAction());
    this.store.select(state => state.gameTeams.find(t => t.key == this.cookieService.read(Consts.CookieAuth)))
      .toPromise().then(t => {
        this.store.dispatch(new MilestonesTeamActions.AddGameMilestonesTeam(t));
      });
    this.milestones$ = this.store.select(state => state.gameteam.milestones);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new MilestonesTeamActions.DisconnectTeamMilestonesAction());
  }
}
