import { TemplateService } from './../service/template.service';

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import {ActivatedRoute,Router}  from '@angular/router';
@Component({
    moduleId: module.id,
    selector: 'saved-template',
    templateUrl: 'saved-template.component.html',
    styleUrls: ['saved-template.component.scss']
})
export class SavedTemplateComponent {
    user: Observable<firebase.User>;
    private userDetails: firebase.User = null;

    constructor( public dialog: MatDialog,private activatedRoute: ActivatedRoute,
        private router: Router,afAuth: AngularFireAuth,private service:TemplateService) {
            this.user = afAuth.authState;
           
            this.user.subscribe(
                    (user) => {
                      if (user) {
                        this.userDetails = user;
                        console.log(this.userDetails.displayName);
                        
                      }
                      else {
                        this.userDetails = null;
                      }
                    }
                  );
          
           //LOAD THE DATA FOR THE USER
        

        }
ngAfterViewInit(){
    this.redirect();
}
        
        redirect(){
            if(this.userDetails){


                var userId = firebase.auth().currentUser.uid;
                /* FIND OUT THE TEHEME WHICH USER HAS SAVED AND THEN NAVIGATE TO HIS THEME */
                return firebase.database().ref('/userContent/' + userId).once('value').then((snapshot) =>
                
                {
                    var snapshotData=snapshot.val();
                    this.service.updateTemplateData(snapshotData);
                    this.router.navigate(['/templates/'+snapshotData.theme]);
                });


               
             }
        }
        
}
