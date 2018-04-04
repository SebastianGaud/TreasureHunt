import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styles: [],
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.router.navigate(['/frontend']);   
  }
}
