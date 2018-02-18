import { UserInfo } from './UserInfo';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';




@Injectable()
export class AuthService {
  
  constructor(public afAuth: AngularFireAuth) { 

    
   
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFaceBook() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}