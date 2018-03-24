import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent {

  href: string;
  isLogged: boolean;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { 
    router.events.filter(event => event instanceof NavigationStart).first()
    .subscribe((event:NavigationStart) => {
      this.href = event.url;
    });

    this.afAuth.authState.subscribe(u => {
      this.isLogged = u && u.uid != null && !u.isAnonymous;
    })
  }
}
