import { UserDetailsService } from './../../user-details-service';
import {Component, Output,EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {sequence, trigger, stagger, animate, style, group, query , transition, keyframes, animateChild} from '@angular/animations';
import { TemplateService } from '../../common/components/layouts/templates/service/template.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
    selector: 'user-profile',
    styleUrls: ['user-profile.component.scss'],
    templateUrl: 'user-profile.component.html',
    
    animations: [
       
        trigger('listAnimation', [
            transition('* => *', [
      
              query(':enter', style({ opacity: 0 }), {optional: true}),
      
              query(':enter', stagger('500ms', [
                animate('1s ease-in', keyframes([
                  style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
                  style({opacity: .5, transform: 'translateX(35px)',  offset: 0.5}),
                  style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
                ]))]), {optional: true}),
                query(':leave', stagger('300ms', [
                    animate('1s ease-out', keyframes([
                      style({opacity: 1, transform: 'translateX(0)', offset: 0}),
                      style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
                      style({opacity: 0, transform: 'translateX(-75%)',     offset: 1.0}),
                    ]))]), {optional: true}),

                    

                /*    query('@slideIn', [
                        stagger(500, [
                            animateChild()
                        ]),
                    ], { optional: true })*/

            ]),
            
        
      ])],
    
})
export class UserProfileComponent {
    userDetailsSubscription: Subscription;
    photoHover:boolean;
    url: string = "assets/img/headshot.jpg";
    @Output() onMenuItemClick = new EventEmitter<any>();
    userDetails;
    active: boolean;
    menuItems=[{name:'All My Resumes',isActive:false,routerName:'myresumes'},{name:'Resume Templates',isActive:false,routerName:'resumeTemplates'}];
    userProfileImage="assets/img/headshot.jpg";
    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
    constructor(private currentRoute:ActivatedRoute,private userDetailService:UserDetailsService,private templateService:TemplateService){}
    ngOnInit(){
      this.userDetailsSubscription = this.userDetailService.userDetailsSubscriber().subscribe(userDetails => {
            this.userDetails = userDetails;
            this.updateUserPicture();
    
            }); 
           this.userDetails= this.userDetailService.getUserDetails();
           if(this.userDetails){
               this.updateUserPicture();
           }
           console.log( this.currentRoute.url);
         this.menuItems.forEach((item)=>{
           if(window.location.href.includes(item.routerName)){
               item.isActive=true;
           }
         });
    }
    userMenuClick(menuItem:any,event:any){
        menuItem.isActive=true;
        this.menuItems.forEach((menu) => {
           if(menu.name != menuItem.name){
               menu.isActive=false;
           }
        });

        let menuClickEvent={
            event:event,
            menuItem:menuItem.name,
            routerName:menuItem.routerName

        }
        this.onMenuItemClick.emit(menuClickEvent);
    }
    isActive(menu:string){

    }
    onUserPhotoHover(event: any) {
        this.photoHover = event;

    }
     /* READING IMAGE URL FOR PICTURE */
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.templateService.saveUserProfilePic(this.url).then( (snapshot) => {
            console.log('Uploaded a data_url string!');
        
          }).catch((error)=>{
           console.log(error);   
          });
      }

      reader.readAsDataURL(event.target.files[0]);
//SAVE THE URL IN FIRE STORE


  
      

    }
  }

  updateUserPicture(){
      this.templateService.fetchUserProfilePic().then((url)=>{
     this.url=url;
      }).catch((error)=>{
console.log("User profile pic doesn't exist");
      });

  }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.userDetailsSubscription.unsubscribe();
       
    }
}
