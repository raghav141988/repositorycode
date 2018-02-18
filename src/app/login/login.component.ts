import { Component, OnInit, HostBinding,Output,EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn } from './router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
  @Output() onLogin = new EventEmitter<any>();
  error: any;
  constructor(public af: AngularFireAuth,private router: Router) {

      

  }

  loginFb() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
        (success) => {
       this.onLogin.emit({loginType:'facebook'});
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
        (success) => {
          this.onLogin.emit({loginType:'Google'});
      }).catch(
        (err) => {
        this.error = err;
      })
  }


  ngOnInit() {
  }

}
