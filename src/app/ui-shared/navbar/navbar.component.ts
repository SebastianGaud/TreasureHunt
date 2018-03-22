import { Component, OnInit } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent {

  href: string;

  constructor(
    private router: Router
  ) { 
    router.events.filter(event => event instanceof NavigationStart).first()
    .subscribe((event:NavigationStart) => {
      this.href = event.url;
    });
  }
}
