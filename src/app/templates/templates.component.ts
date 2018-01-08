import { TemplateService } from './../common/components/layouts/templates/service/template.service';
import { TemplateSettingService } from './../common/components/layouts/templates/template-setting-service';
import { PageSettings } from './../common/components/layouts/templates/PageSettings';
import { CardData } from './../common/components/layouts/CardData';
import { ConfirmDialog } from './confirm-dialog';
import { AuthService } from './../providers/auth.service.ts.service';
import { Template1Component } from './../common/components/layouts/templates/template1/template1.component';
import {MatSnackBar} from '@angular/material';
import { Component,ViewChild ,ElementRef,ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute,Router}  from '@angular/router';
declare var html2canvas;
import * as jsPDF from 'jspdf';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {MediaMatcher} from '@angular/cdk/layout';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { Subscription } from 'rxjs/Subscription';
export const confirmLoginString:string= "Please login to your google account before download."
export const confirmLSaveString:string= "Please login to your google account before you can save your work."
@Component({
    moduleId: module.id,
    selector: 'templates',
    templateUrl: 'templates.component.html',
    styleUrls: ['templates.component.scss']
})
export class TemplatesComponent {
    mobileQuery: MediaQueryList;
    subscription: Subscription;
    @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
      fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);
      conf: GALLERY_CONF = {
        // imageOffset: '0px',
         showDeleteControl: false,
         showImageTitle: true,
       };
       
       // gallery images
       images: GALLERY_IMAGE[] = [
         {
           url: "assets/img/templates/template1.png", 
           altText: 'Select these template for your resume', 
           title: 'Select these template for your resume',
           thumbnailUrl: "assets/img/templates/template1.png"
         },
         {
           url: "assets/img/templates/template2.png", 
           altText: 'Select these template for your resume', 
           title: 'Select these template for your resume',
           thumbnailUrl: "assets/img/templates/template2.png"
         },
         {
           url: "assets/img/templates/template3.png", 
           altText: 'Select these template for your resume', 
           title: 'Select these template for your resume',
           thumbnailUrl: "assets/img/templates/template3.png"
         },
         {
           url: "assets/img/templates/template4.png", 
           altText: 'Select these template for your resume', 
           title: 'Select these template for your resume',
           thumbnailUrl: "assets/img/templates/template4.png"
         },
         {
           url: "assets/img/templates/template5.png", 
           altText: 'Select these template for your resume', 
           title: 'Select these template for your resume',
           thumbnailUrl: "assets/img/templates/template5.png"
         }
       ];
      fillerContent = Array(50).fill(0).map(() =>
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
           laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
           voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
           cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
    
      private _mobileQueryListener: () => void;

    @ViewChild('resumeDiv') el: ElementRef;
    user: Observable<firebase.User>;
     userDetails: firebase.User = null;
   pageSettings:PageSettings={};
   templateMappings: { [index: number]: String } = {0:'templates/template1',
   1:'templates/template2',2:'templates/template3',3:'templates/template4',4:'templates/template5'
   };

    userWantsDownload:boolean;
    maxWidth="80%";
    loadedComponent:any;
    constructor( public dialog: MatDialog,private activatedRoute: ActivatedRoute,private templateService:TemplateService,
        private router: Router,afAuth: AngularFireAuth,private authService:AuthService,
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public templateSettings:TemplateSettingService,
        public snackBar: MatSnackBar
    ) {
            
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        this.user = afAuth.authState;
           
            this.user.subscribe(
                    (user) => {
                      if (user) {
                        this.userDetails = user;
                        console.log(this.userDetails.displayName);
                        if(  this.userWantsDownload){
                            this.download();
                        }
                      }
                      else {
                        this.userDetails = null;
                      }
                    }
                  );
          
                  this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => { this.pageSettings = pageSettings; 
                    
                      
                      });
           

        }

       ngOnInit(){
           this.templateService.resetCardData();
       }
 ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }
    onNavClick(pathtoNavigate:string){
        this.openGallery();
    }
    addOrRemoveSection(event:any){
        let isAdd=event.isAddition;
        console.log("adding.."+isAdd);
        if(isAdd){
            this.loadedComponent.addNewSection(event.section,event.componentType);
        }
    }

    onActivate(componentRef:any){
    this.loadedComponent=componentRef;
     
    }


    /* SAVE USER'S WORK */
    save(){
        //FIND OUT USER THEME HE HAS WORKED ON AND SAVE
        if (this.userDetails) {
            console.log("Logged in");
           // this.saveUserTheme()
            this.saveTemplate();
           
          }else {
              //USER IS NOT LOGGED IN, ASK HIM TO LOGIN FIRST
              this.openDialog(confirmLoginString)
              
          }
       
     
    }
     
    /* USER HAS LOGGED IN TO APPLICATION, NOW SAVE HIS WORK */
    saveTemplate(){
        var templateName=this.loadedComponent.getThemeName();
        if(this.userDetails){
            var postData = {
              name: this.userDetails.displayName,
              email:this.userDetails.email,
              theme:templateName,
              data:this.loadedComponent.geTemplateContent(),
              pageSettings:this.pageSettings
            };
          
            // Get a key for a new Post.
           console.log(this.loadedComponent.geTemplateContent().sectionContent[0]);
           console.log(this.pageSettings);
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/userContent/' + this.userDetails.uid] = postData;
            
           
             firebase.database().ref().update(updates).then(()=>{
                this.showSuccessMsg('Your Resume is saved successfully!');
             });
            
  
      }
      
  
  
    

    }
    /* DOWNLOAD AS A PDF DOCUMENT */
    makePdf(){

      
            if (this.userDetails) {
              console.log("Logged in");
             // this.saveUserTheme()
              this.download();
             
             
            }else {
                //USER IS NOT LOGGED IN, ASK HIM TO LOGIN FIRST
                this.openDialog(confirmLoginString)
                 this.download();
            }
       
          
     
      }

      openDialog(content:string): void {
        let dialogRef = this.dialog.open(ConfirmDialog, {
          width: '800px',
          data:content,
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                //LOGIN WITH GOOGLE
                this.userWantsDownload=true;
                this.authService.loginWithGoogle();
               
            }
       
        });
      }

/* CREATE A PDF FOR THE USER */
download(){

    html2canvas(this.el.nativeElement).then((canvas) =>
    
    {
        var imgData = canvas.toDataURL('image/png');
        
              /*
              Here are the numbers (paper width and height) that I found to work. 
              It still creates a little overlap part between the pages, but good enough for me.
              if you can find an official number from jsPDF, use them.
              */
              var imgWidth = 210; 
              var pageHeight = 295;  
              var imgHeight = canvas.height * imgWidth / canvas.width;
              var heightLeft = imgHeight;
        
              var doc = new jsPDF('p', 'mm');
              var position = 0;
        
              doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
              heightLeft -= pageHeight;
        
              while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
              }
              doc.save( 'file.pdf');
              this.showSuccessMsg('Your Resume is downloaded successfully!');
    });



  
//PDF IS CREATED FOR THE USER NOW STORE IN OUR DB

            this.saveDownloadInfo(this.loadedComponent.getThemeName());
}


saveDownloadInfo(themeName:string){
    if(this.userDetails){


        var postData = {
            name: this.userDetails.displayName,
            email:this.userDetails.email
          };
        
          // Get a key for a new Post.
          var key = firebase.database().ref().child('downloads/'+themeName).push().key;
        
          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates['downloads/'+themeName+ '/' + key] = postData;
          
        
           firebase.database().ref().update(updates).then(()=>{
           
           });



          
        
         

    }
    


    this.userDetails.getIdToken().then(function(token:any){
   console.log(token);
    });
   }


   login(){
    this.authService.loginWithGoogle();
}
openMySavedWork(){
    this.router.navigate(['/templates/mywork']);
}
logout(){
    this.authService.logout();
}


openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
   showSlides(n) {
     /*
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
    captionText.innerHTML = dots[this.slideIndex-1].alt;
  */
  }
  closeGallery() {
      this.ngxImageGallery.close();
    }
    
    // set new active(visible) image in gallery
    newImage(index: number = 0) {
      this.ngxImageGallery.setActiveImage(index);
    }
    
    // next image in gallery
  
    
    /**************************************************/
    
    // EVENTS
    // callback on gallery opened
    galleryOpened(index) {
      console.info('Gallery opened at index ', index);
      //this.router.navigate([ this.templateMappings[index]]);

    }
  
    // callback on gallery closed
    galleryClosed() {
      console.info('Gallery closed.');
    }
  
    // callback on gallery image clicked
    galleryImageClicked(index) {
      console.info('Gallery image clicked with index ', index);
      this.pageSettings={};
      this.templateService.resetCardData();
      this.templateSettings.updateTemplateSetting(this.pageSettings);
      this.router.navigate([ this.templateMappings[index]]);
      this.closeGallery();
    }
    
    // callback on gallery image changed
    galleryImageChanged(index) {
      console.info('Gallery image changed to index ', index);
    }
  
    // callback on user clicked delete button
    deleteImage(index) {
      console.info('Delete image at index ', index);
    }
    onHomeClick(){
        this.router.navigate(['home']);
    }
    showSuccessMsg(msg:string){
      
        this.snackBar.open(msg,"" ,{
            duration: 5000,
          });
    }
}
