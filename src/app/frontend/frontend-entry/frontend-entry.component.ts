import { Component, OnDestroy, OnInit, ChangeDetectorRef } from "@angular/core";
import { Store } from "@ngrx/store";

import { Animations } from "../../animations/common-animations";
import { IMilestone } from "../../model/milestone/milestone.d";
import { AppState } from "../../model/app-state";
import { Observable } from "rxjs/Observable";
import * as MilestonesTeamActions from "./../../actions/team-milestones.action";
import { CookieService } from "../../service/cookie-service.service";
import { Consts } from "../../../environments/Consts";
import { FirebaseMilestone } from "../../model/firebase/firebase-milestone";
import { IMilestonesTeam } from "../../model/game/game-team.d";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  selector: "frontend-entry",
  templateUrl: "./frontend-entry.component.html",
  styles: [],
  animations: [Animations.Stagger, Animations.TranslateFromLeft]
})
export class FrontendEntryComponent implements OnDestroy {

  team$: Observable<IMilestonesTeam>;
  private registered = false;

  constructor(
    private store: Store<AppState>,
    private cookieService: CookieService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    let token = this.cookieService.read(Consts.CookieAuth);
    this.store.dispatch(new MilestonesTeamActions.ConnectTeamMilestonesAction());
    this.store.select(state => state.gameTeams.find(t => t.key == token))
      .subscribe(t => {
        if (t === undefined && this.registered) {
          this.afAuth.auth.signOut().then(() => {
            this.cookieService.remove(Consts.CookieAuth);
            window.location.reload();
          });
        }
        this.store.dispatch(new MilestonesTeamActions.AddGameMilestonesTeam(t));
        this.registered = true;
      });
    this.team$ = this.store.select(state => state.gameTeam);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new MilestonesTeamActions.DisconnectTeamMilestonesAction());
  }
}
