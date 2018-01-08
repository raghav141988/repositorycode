import { NgxCarousel } from 'ngx-carousel';

import { Component,ViewChild } from '@angular/core';
import {ActivatedRoute,Router}  from '@angular/router';
import { AuthService } from '../providers/auth.service.ts.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";

@Component({
    moduleId: module.id,
    selector: 'template-chooser',
    templateUrl: 'template-chooser.component.html',
    styleUrls: ['template-chooser.component.scss']
})
export class TemplateChooserComponent {
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

   
    user: Observable<firebase.User>;
    galleryOptions;
    galleryImages;
     userDetails: firebase.User = null;
      slideIndex = 1;
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


    constructor( private route: ActivatedRoute,
        private router: Router,afAuth: AngularFireAuth,private authService:AuthService) {
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
        }
    
     
      loadTemplate(template:string){
        this.router.navigate(['templates/'+template]);
      }
     
      onNavClick(pathtoNavigate:string){
        this.router.navigate([pathtoNavigate]);
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

ngAfterViewInit(){
  this.openGallery();
}

 plusSlides(n) {
  this.showSlides(this.slideIndex += n);
}

 currentSlide(n) {
  this.showSlides(this.slideIndex = n);
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
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }

}
