import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { User } from "@firebase/auth-types";
import { CookieService } from "../../service/cookie-service.service";
import { Consts } from "../../../environments/Consts";
import { TeamService } from "../../service/team/team.service";
import { AppState } from "../../model/app-state";
import { Store } from "@ngrx/store";
import { AngularFireDatabase } from "angularfire2/database";
import { Team } from "../../model/team/team";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent {
  u: User;

  constructor(
    private afAuth: AngularFireAuth,
    private cookieService: CookieService,
    private store: Store<AppState>,
    private db: AngularFireDatabase,
    private router: Router
  ) { 

    this.afAuth.authState.subscribe(u => {
      if (u) {
        this.u = u;
      }else {
        this.u = null;
      }
    })
  }

  public logOut() {
    let token = this.cookieService.read(Consts.CookieAuth);    
    this.store.select(state => state.gameTeam).first().subscribe(t => {
      const itemRef =  this.db.object(`teams/${token}`);
      itemRef.update({token: false}).then(() => {
        this.makeSignOutOperations();
      });
    });
  }

  private makeSignOutOperations() {
    this.afAuth.auth.signOut();
    this.cookieService.remove(Consts.CookieAuth);
    this.router.navigate(['/team-wizard']);
    this.u = undefined;
  }

  public logOutBackend() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/backendLogin']);
    });
  }
}
