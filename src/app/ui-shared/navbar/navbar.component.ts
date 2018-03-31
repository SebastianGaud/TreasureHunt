import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { User } from "@firebase/auth-types";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent {
  u: User;

  constructor(
    private afAuth: AngularFireAuth
  ) { 

    this.afAuth.authState.subscribe(u => {
      if (u) {
        this.u = u;
      }
    })
  }
}
