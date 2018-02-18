import { Tile } from './Tile';
import { UserDetailsService } from './../../../user-details-service';
import { Component } from '@angular/core';
import {sequence, trigger, stagger, animate, style, state,group, query , transition, keyframes, animateChild} from '@angular/animations';
import { TemplateService } from '../../../common/components/layouts/templates/service/template.service';
import { Subscription } from 'rxjs/Subscription';
import {ActivatedRoute,Router}  from '@angular/router';
import { ConfirmDialog } from '../../confirm-dialog';
import { MatDialog } from '@angular/material';
@Component({
    moduleId: module.id,
    selector: 'saved-template',
    animations: [
        
      
        trigger('stateAnimation', [
           state('false', style({
              transform:'scale(1)'
            })),
             state('true', style({
               
                transform:'scale(1.1)'
            })),
          transition('true => false', [
              style({
                 transform:'scale(1.1)',
                 
              }),
              animate('0.4s ease-out' , style({
                 
                  transform:'scale(1)'
              }))
          ]),
          transition('false => true', [
              style({
                 
                  
              }),
              animate('0.4s ease-out', style({
                 transform:'scale(1.1)',
                 
              }))
          ])
      ]) ,
    
        trigger('listAnimation', [
          transition('* => *', [
    
            query(':enter', style({ opacity: 0 }), {optional: true}),
    
            query(':enter', stagger('500ms 1.2s', [
              animate('1s ease-in', keyframes([
                style({opacity: 0, transform: 'translate(-75%)', offset: 0}),
                style({opacity: .5, transform: 'translate(35px)',  offset: 0.5}),
              
                style({opacity: 1, transform: 'translate(0)',     offset: 1.0}),
              ]))]), {optional: true}),
              query(':leave', stagger('500ms 1.2s', [
                animate('1s ease-out', keyframes([
                  style({opacity: 1, transform: 'translateY(35px)', offset: 0}),
                  style({opacity: .5, transform: 'translateY(-75%)',  offset: 0.5}),
                
                  style({opacity: 0, transform: 'translateY(0)',     offset: 1.0}),
                ]))]), {optional: true})
    
          ])
        ])
        
          ],
    templateUrl: 'saved-template.component.html',
    styleUrls: ['saved-template.component.scss']
})
export class SavedTemplateComponent {
tiles:Tile[]=[];
private userDetails=null;
userDetailsSubscription: Subscription;
    constructor(public dialog: MatDialog,private templateService:TemplateService,private userDetailService:UserDetailsService,private activatedRoute: ActivatedRoute,private router: Router){

        this.userDetailsSubscription = this.userDetailService.userDetailsSubscriber().subscribe(userDetails => {
            this.userDetails = userDetails;
      
      
            }); 
           this.userDetails= this.userDetailService.getUserDetails();
    }
ngOnInit(){
   
if(this.userDetails){
    this.templateService.getProgressSpinnerService().startProgressBar();
    this.templateService.fetchUserSavedTemplates().then((snapshot) => {
        var snapshotData = snapshot.val();
        this.templateService.getProgressSpinnerService().endProgressBar();
        console.log(snapshotData);
        snapshot.forEach((child)=> {
            console.log(child.key+': '+child.val());
             let tile:Tile=child.val();
             //tile.UID=tile.UID;
             tile.tileID=child.key;
            this.tiles.push(tile);
          
          });


      // this.tiles=snapshotData;

    });
}

}
  
      onHover(tile:Tile,event:any){
          this.tiles.forEach((thisTile) => {
           if(thisTile.title==tile.title){
    thisTile.hovered=event;
           }else {
    //thisTile.colored=!event;
           }
    
    
    
          });
      }

      openMySavedWork(){
        this.router.navigate(['/templates/mywork']);
    }

    openTemplateforPreview(tile:Tile){
        this.templateService.getProgressSpinnerService().startProgressBar();
        let theme=tile.theme;
        let title=tile.title;
        this.router.navigate(['/templates/'+theme], { queryParams: { saved: true,template:title,preview:true,UID:tile.UID } });

    }
    openTemplateforEdit(tile:Tile){
        this.templateService.getProgressSpinnerService().startProgressBar();
        let theme=tile.theme;
        let title=tile.title;
        this.router.navigate(['/templates/'+theme], { queryParams: { saved: true,template:title,preview:false,UID:tile.UID  } });
    }
    deleteTemplate(tile:Tile){
        
        let dialogRef = this.dialog.open(ConfirmDialog, {
            width: '600px',
            data: {title:'',content:'Do you want to delete your saved Resume?',showCancel:true},
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.templateService.getProgressSpinnerService().startProgressBar();
                this.templateService.deleteResume(tile,this.tiles);
            }
      
          });
       
       

    }
      ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.userDetailsSubscription.unsubscribe();
       
    }
    createResumeLink(tile:Tile){
        //CREATE A RESUME LINK TO SHARE WITH OTHERS




if(this.userDetails){
    this.templateService.fetchCurrentTemplate(tile).then((snapshot) => {
        var snapshotData = snapshot.val();
        
        console.log(snapshotData);
        snapshotData.isPublic=true;
        //UPDATE BACK IN FIREBASE
        this.templateService.updateUserTemplate(tile,snapshotData).then((snapshot) => {
          //  var snapshotData = snapshot.val();
            
           
            //UPDATE BACK IN FIREBASE
         
           

            let copiedURl= window.location.href.split("#")[0]+'#/templates/'+snapshotData.theme+'?ID='+ this.userDetails.uid+'&template='+snapshotData.theme+'&title='+tile.title+'&random='+tile.UID ;
            console.log('copiedURl' +copiedURl); 

           this.openDialog("Please copy below URL to share your resume",copiedURl,false);
        });


     

    });
}

    }
    openDialog(title:string,content: string,showCancel:boolean): void {
        let dialogRef = this.dialog.open(ConfirmDialog, {
          width: '800px',
          data: {title:title,content:content,showCancel:showCancel},
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
          
          }
    
        });
      }

    }
