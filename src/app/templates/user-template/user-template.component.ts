import { UserDetailsService } from './../../user-details-service';
import { TemplateSettingService } from './../../common/components/layouts/templates/template-setting-service';
import { TemplateService } from './../../common/components/layouts/templates/service/template.service';

import { MatSnackBar } from '@angular/material';
import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var html2canvas;
declare var deflate;
import * as jsPDF from 'jspdf';
import { MatDialog } from '@angular/material';


import { Observable } from 'rxjs/Observable';
import { MediaMatcher } from '@angular/cdk/layout';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { Subscription } from 'rxjs/Subscription';

import { sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild } from '@angular/animations';
import { PageSettings } from '../../common/components/layouts/templates/PageSettings';

import { ConfirmDialog } from '../confirm-dialog';

export const confirmLoginString: string = "Please login to your google account before download."
export const confirmLSaveString: string = "Please login to your google account before you can save your work."
@Component({
    moduleId: module.id,
    selector: 'user-template',
    templateUrl: 'user-template.component.html',
    styleUrls: ['user-template.component.scss'],
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
export class UserTemplateComponent {
    mobileQuery: MediaQueryList;
    subscription: Subscription;
    userDetailsSubscription: Subscription;
    userDetails;
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
    ];
    fillerContent = Array(50).fill(0).map(() =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
           laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
           voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
           cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

    private _mobileQueryListener: () => void;

    @ViewChild('resumeDiv') el: ElementRef;
    @ViewChild('thumbNail') thumbNail: ElementRef;


    pageSettings: PageSettings = {};
    templateMappings: { [index: number]: String } = {
        0: 'templates/template1',
        1: 'templates/template2', 2: 'templates/template3', 3: 'templates/template4', 4: 'templates/template5'
    };

    userWantsDownload: boolean;
    maxWidth = "80%";
    loadedComponent: any;
    constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private templateService: TemplateService,
        private router: Router,
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public templateSettings: TemplateSettingService,
        public snackBar: MatSnackBar,private userDetailService:UserDetailsService 
    ) {

        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);



        this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => {
        this.pageSettings = pageSettings;


        });


    }
    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
    ngOnInit() {
        this.userDetailsSubscription = this.userDetailService.userDetailsSubscriber().subscribe(userDetails => {
            this.userDetails = userDetails;
    
    
            });
        this.templateService.resetCardData();
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.subscription.unsubscribe();
        this.userDetailsSubscription.unsubscribe();
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


    /* SAVE USER'S WORK */

    /* USER HAS LOGGED IN TO APPLICATION, NOW SAVE HIS WORK */

    onMenuClick(event:any){
        console.log(event.routerName);
        this.router.navigate(['/myprofile/'+event.routerName]);
    }














    openDialog(content: string): void {
        let dialogRef = this.dialog.open(ConfirmDialog, {
            width: '800px',
            data: content,
        });


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
}
