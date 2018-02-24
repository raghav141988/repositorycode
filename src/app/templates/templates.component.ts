import { LoginDialog } from './../login/login-dialog';
import { ResumeTitleDialog } from './resume-name-dialog';
import { TemplateService } from './../common/components/layouts/templates/service/template.service';
import { TemplateSettingService } from './../common/components/layouts/templates/template-setting-service';
import { PageSettings } from './../common/components/layouts/templates/PageSettings';
import { CardData } from './../common/components/layouts/CardData';
import { ConfirmDialog } from './confirm-dialog';
import { AuthService } from './../providers/auth.service.ts.service';
import { Template1Component } from './../common/components/layouts/templates/template1/template1.component';
import { MatSnackBar } from '@angular/material';
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var html2canvas;
declare var deflate;
import * as jsPDF from 'jspdf';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase/app';
import * as firebaseStorage from 'firebase/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { MediaMatcher } from '@angular/cdk/layout';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { Subscription } from 'rxjs/Subscription';
import { routerTransition } from './router.animations';

//mport { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
import { AngularFireDatabase } from 'angularfire2/database';
import { sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild } from '@angular/animations';
import 'firebase/storage';
export const confirmLoginString: string = "Please login to your google account before download."
export const confirmLSaveString: string = "Please login to your google account before you can save your work."
@Component({
  moduleId: module.id,
  selector: 'templates',
  templateUrl: 'templates.component.html',
  styleUrls: ['templates.component.scss'],
  animations: [
    trigger('explainerAnim', [
      transition('* => *', [

        query('.nav-item', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('.nav-item', stagger('500ms', [
          animate('800ms  ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        query('.nav-item', [
          animate(1000, style('*'))
        ]),


      ])
    ])



  ]
})


export class TemplatesComponent {
  toBeOpened = true;
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
      altText: 'Select this template for your resume',
      title: 'Select this template for your resume',
      thumbnailUrl: "assets/img/templates/template1.png"
    },
    {
      url: "assets/img/templates/template2.png",
      altText: 'Select this template for your resume',
      title: 'Select this template for your resume',
      thumbnailUrl: "assets/img/templates/template2.png"
    },
    {
      url: "assets/img/templates/template3.png",
      altText: 'Select this template for your resume',
      title: 'Select this template for your resume',
      thumbnailUrl: "assets/img/templates/template3.png"
    },
    {
      url: "assets/img/templates/template4.png",
      altText: 'Select this template for your resume',
      title: 'Select this template for your resume',
      thumbnailUrl: "assets/img/templates/template4.png"
    },
    {
      url: "assets/img/templates/template5.png",
      altText: 'Select this template for your resume',
      title: 'Select this template for your resume',
      thumbnailUrl: "assets/img/templates/template5.png"
    }
    ,
    {
      url: "assets/img/templates/template6.png",
      altText: 'Select this template for your resume',
      title: 'Select this template for your resume',
      thumbnailUrl: "assets/img/templates/template6.png"
    }
  ];

  private _mobileQueryListener: () => void;

  @ViewChild('resumeDiv') el: ElementRef;


  user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  pageSettings: PageSettings = {};
  templateMappings: { [index: number]: String } = {
    0: 'templates/template1',
    1: 'templates/template2', 2: 'templates/template3', 3: 'templates/template4', 4: 'templates/template5',
    5:'templates/template6'
  };

  userWantsDownload: boolean;
  maxWidth = "80%";
  loadedComponent: any;
  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private templateService: TemplateService,
    private router: Router, afAuth: AngularFireAuth, private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public templateSettings: TemplateSettingService,
    public snackBar: MatSnackBar,
    public afDb: AngularFireDatabase
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.user = afAuth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;

          if (this.userWantsDownload) {
            this.download();
          }
        }
        else {
          this.userDetails = null;
        }
      }
    );

    this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => {
      this.pageSettings = pageSettings;

      if (this.pageSettings.isPreviewMode) {
        this.maxWidth = "25cm";
      } else {
        this.maxWidth = "80%";
      }
      if (this.pageSettings.isSharedReadOnlyMode) {
        this.maxWidth = "28cm";
      }

    });


  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  ngOnInit() {
    this.templateService.resetCardData();
    

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }
  onNavClick(pathtoNavigate: string) {
    this.openGallery();
  }
  addOrRemoveSection(event: any) {
    let isAdd = event.isAddition;


    this.loadedComponent.addNewSection(event.section, event.componentType, isAdd);

  }

  onActivate(componentRef: any) {
    this.loadedComponent = componentRef;

  }
  createResumeLink(){}

  /* SAVE USER'S WORK */
  save() {
    //FIND OUT USER THEME HE HAS WORKED ON AND SAVE
    if (this.userDetails) {

      // this.saveUserTheme()
      this.saveTemplate();

    } else {
      //USER IS NOT LOGGED IN, ASK HIM TO LOGIN FIRST
      this.openLoginDialog(confirmLSaveString, "Save");
      // this.openDialog(confirmLSaveString,false)

    }


  }

  /* USER HAS LOGGED IN TO APPLICATION, NOW SAVE HIS WORK */
  saveTemplate() {
    let resumeTitle = this.loadedComponent.getSavedResumeTitle();
    let resumeID = this.loadedComponent.getSavedResumeID();
    if (resumeID) {
      this.saveResumeInfo(resumeID, resumeTitle);
    } else {
      this.openResumeTitleDialog();
    }




  }
  /* DOWNLOAD AS A PDF DOCUMENT */
  makePdf() {


    if (this.userDetails) {

      // this.saveUserTheme()
      this.download();


    } else {
      //USER IS NOT LOGGED IN, ASK HIM TO LOGIN FIRST
      this.openLoginDialog(confirmLoginString, "Download");
      //this.download();
    }



  }

  /* openDialog(content: string, isDownload:boolean): void {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      width: '800px',
      data: content,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //LOGIN WITH GOOGLE
        this.userWantsDownload = isDownload;
      //  this.authService.loginWithGoogle();
         this.openLoginDialog();
      }

    });
  }
*/
  /* CREATE A PDF FOR THE USER */

  /* download() {

    html2canvas(this.el.nativeElement).then((canvas) => {
      var imgData = canvas.toDataURL('image/png');

   
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF('p', 'mm', 'a4');
      var position = 0;

      doc.addImage(imgData, 'png', 0, position, imgWidth, imgHeight, '', 'FAST'

        , { margin: { top: 20, right: 10, bottom: 20, left: 10, useFor: 'page' } }
      );
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = (heightLeft - imgHeight) + 100;

        doc.addPage();
        doc.addImage(imgData, 'png', 0, position, imgWidth, imgHeight, '', 'FAST', { margin: { top: 20, right: 10, bottom: 20, left: 10, useFor: 'page' } });
        heightLeft -= pageHeight;
      }
      doc.save('file.pdf');



      this.showSuccessMsg('Your Resume is downloaded successfully!');
    });




    //PDF IS CREATED FOR THE USER NOW STORE IN OUR DB

    this.saveDownloadInfo(this.loadedComponent.getThemeName());
  }
*/


  download() {

    this.loadedComponent.download();

  }



  saveDownloadInfo(themeName: string) {
    if (this.userDetails) {


      var postData = {
        name: this.userDetails.displayName,
        email: this.userDetails.email
      };

      // Get a key for a new Post.
      var key = firebase.database().ref().child('downloads/' + themeName).push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['downloads/' + themeName + '/' + key] = postData;


      firebase.database().ref().update(updates).then(() => {

      });







    }



    this.userDetails.getIdToken().then(function (token: any) {

    });
  }

  openLoginDialog(msg: string, type: string): void {
    let dialogRef = this.dialog.open(LoginDialog, {
      width: '550px',
      data: msg
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isLoggedIn) {
        if (type == 'Download') {
          this.download();
        } else if (type == 'Save') {
          this.save();
        }
      }


    });
  }
  login() {
    // this.authService.loginWithGoogle();
    this.openLoginDialog("", "");
  }
  openMySavedWork() {
    this.router.navigate(['/templates/mywork']);
  }
  logout() {
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
    this.pageSettings = {};
    this.templateService.resetCardData();
    this.templateSettings.updateTemplateSetting(this.pageSettings);
    this.router.navigate([this.templateMappings[index]]);
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
  onHomeClick() {
    this.router.navigate(['home']);
  }
  showSuccessMsg(msg: string) {

    this.snackBar.open(msg, "", {
      duration: 5000,
    });
  }

  getScreenImage() {
    return html2canvas(this.el.nativeElement).then((canvas) => {
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

      return imgData;
    });
  }

  openMyProfile() {
    this.router.navigate(['myprofile']);
  }


  openResumeTitleDialog(): void {

    let dialogRef = this.dialog.open(ResumeTitleDialog, {
      width: '350px',
      data: { templateName: "" }
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result) {
        var nameToSave = result ? result : this.userDetails.displayName;
       
        this.saveResumeInfo(null, nameToSave);

      }

    });
  }
  saveResumeInfo(resumeID: string, nameToSave: string) {
    this.templateService.getProgressSpinnerService().startProgressBar();
    var templateName = this.loadedComponent.getThemeName();
    let resumeTitle = this.loadedComponent.getSavedResumeTitle();
    let userPicture = this.loadedComponent.getUserPicture();
    let randomKey;
    if (resumeID) {
      randomKey = resumeID;
    } else {
    randomKey = firebase.database().ref('/userContent/' + this.userDetails.uid + '/' + nameToSave).push().key;
    }
    html2canvas(this.el.nativeElement).then((canvas) => {

      var imgData = canvas.toDataURL('image/png');
      let thumbnailUrl;
      const storageRef = firebase.storage().ref();
      
      let resumeThumbNail = '/userTemplate/' + this.userDetails.uid + '/' + randomKey + '.png';
      var mountainImagesRef = storageRef.child(resumeThumbNail);
      var thumbNailResumeImage = imgData.replace('data:image/png;base64,', ""); 

/* STORE IMAGE IN FIREBASE STORAGE AND GET URL */
let templateDataUpdates={};


      mountainImagesRef.putString(thumbNailResumeImage,'base64').then( (snapshot)=> {
        console.log('Uploaded a data_url string!');
      /* DOWNLOAD URL */
        storageRef.child(resumeThumbNail).getDownloadURL().then( (url)=> {
          thumbnailUrl=url;
          var templateUpdates = {};
          var saveThumbNail = {
            title: nameToSave,
            theme: templateName,
            thumbNail: thumbnailUrl,
            UID: randomKey
          };
          firebase.database().ref().update(updates).then(() => {
            templateDataUpdates['/userTemplate/' + this.userDetails.uid+ '/' + randomKey]=saveThumbNail
            firebase.database().ref().update(templateDataUpdates).then(() => {
            });

          });

        }).catch(function (error) {
          console.log(error);
       
        });
        
      
      });

      








      if (this.userDetails) {
        var postData = {
          name: this.userDetails.displayName,
          email: this.userDetails.email,
          theme: templateName,
          data: this.loadedComponent.geTemplateContent(),
          pageSettings: this.pageSettings,

          isPublic: false,
          title: nameToSave,
        };

        // Get a key for a new Post.

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/userContent/' + this.userDetails.uid + '/' + randomKey] = postData;

/* UPLOAD PROFILE PICTURE */
if(userPicture){
        const storageRef = firebase.storage().ref();
        let resumeProfilePath = '/userContent/' + this.userDetails.uid + '/' + randomKey + '.jpg';
        var mountainImagesRef = storageRef.child(resumeProfilePath);

        
        mountainImagesRef.putString(userPicture, 'data_url').then( (snapshot) => {
          console.log('Uploaded a data_url string!');



        });

      }
        firebase.database().ref().update(updates).then(() => {
          this.loadedComponent.setResumeInfo(nameToSave,randomKey);
          this.showSuccessMsg('Your Resume is saved successfully!');
          this.templateService.getProgressSpinnerService().endProgressBar();

        });

      }
    });


  }
  print() {

  }
  preview() {
    this.pageSettings.isPreviewMode = true;

    this.templateSettings.updateTemplateSetting(this.pageSettings);
  }
  edit() {
    this.pageSettings.isPreviewMode = false;
    this.templateSettings.updateTemplateSetting(this.pageSettings);

  }

  toggleSideNav() {
    this.toBeOpened = !this.toBeOpened;
  }
}
