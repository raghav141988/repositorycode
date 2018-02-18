
import { Injectable, Type } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './providers/auth.service.ts.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserDetailsService {
    private subject = new Subject<any>();
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(afAuth: AngularFireAuth,private authService:AuthService) { 
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
         
        this.subject.next(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
   
  }
getUserDetails(){
    return this.userDetails;
}
  
  userDetailsSubscriber(): Observable<any> {
    return this.subject.asObservable();
}



}