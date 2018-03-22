import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'backend-login',
  templateUrl: './backend-login.component.html',
  styles: []
})
export class BackendLoginComponent implements OnInit {
  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  error: string;

  constructor(
    private router: Router,
    private af: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.af.authState.subscribe(u => {
      if (u) {
        this.router.navigate(['/backend']);
      }
    });
  }


  login() {
    this.af.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(p => {
        this.router.navigate(['/backend']);
      }).catch(err => {
        this.error = err;
      });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

}
