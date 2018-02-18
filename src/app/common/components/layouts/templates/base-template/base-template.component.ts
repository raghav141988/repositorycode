
import { ResumeTitleDialog } from './../../../../../templates/resume-name-dialog';
import { ContactType } from './../../../contact-info/ContactType';
import { ComponentType } from './../../../ComponentType';
import { Section } from './../../../../../templates/side-nav-content/Section';
import { TemplateSettingService } from './../template-setting-service';
import { TemplateService } from './../service/template.service';
import { Component, Type, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';
import { Subscription } from 'rxjs/Subscription';
import { PageSettings } from '../PageSettings';
import { CardConfig } from '../../CardConfig';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
declare var html2canvas;
declare var deflate;
import * as jsPDF from 'jspdf';

var max_pages = 100;
var page_count = 0;
declare var jquery: any;
declare var $: any;
function snipMe() {
 
  page_count++;
  if (page_count > max_pages) {
    return;
  }
  console.log($(this)[0].scrollHeight);
  console.log(Math.ceil($(this).innerHeight()));
  var long = $(this)[0].scrollHeight - Math.ceil($(this).innerHeight());
  var children = $(this).children().toArray(); // Save elements in this page to children[] array
  var removed = [];
  console.log(children);
  console.log(long);
  // Loop while this page is longer than an A4 page
  while (long > 0 && children.length > 0) {
    var child = children.pop(); // Remove last array element from the children[] array 
    console.log('detaching a child');
    console.log(child);
    long = $(this)[0].scrollHeight - Math.ceil($(child).innerHeight()); 
    if(long<0){
        snipMe.call(child);
    }else {

    
    $(child).detach();  // JQuery Method detach() removes the "child" element from DOM for the current page
    removed.push(child);  // Add element that was removed to the end of "removed" array
    long = $(this)[0].scrollHeight - Math.ceil($(this).innerHeight()); // Compute current size of the page 
}
  }
  // If elements were removed from the page 

  if(removed.length==1 ){
      console.log('only one present');
      var children=removed.pop().children();
      console.log(children);
      snipMe.call(children);
  }

  
  if (removed.length > 0) {
   
    var rev_removed = removed.reverse(); 
    console.log(rev_removed); // Reverse the order of the removed array
    var a4 = $('<div #printScreen  class="A4" style="background: white;width: 21cm;height: 29.7cm;display: block;margin: 0 auto;padding: 10px 25px;margin-bottom: 0.5cm;box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);overflow-y: scroll;box-sizing: border-box;font-size: inherit;" ></div>'); // Start a new page
    a4.append(rev_removed); // Add elements removed from last page to the new page
    $(this).after(a4); // Add the new page to the document
    snipMe.call(a4[0]); // Recursively call myself to adjust the remainder of the pages
  }

}



export abstract class BaseTemplateComponent {
    @ViewChildren('cardTemplates') cardTemplates: any;
    @ViewChildren('printScreen') printContent: any;
    @ViewChild('titleText') titleText: ElementRef;
    @ViewChild('designation') designation: ElementRef;
    headerContactTypes: ContactType[];
    url: string = "assets/img/headshot.jpg";
    savedTemplateData;
    isPreviewComplete;
    cardsList: CardConfig[];
    userName = "Jane Doe";
    resumeID:string;
    sub;
    cardToTemplateMaping: { [type: number]: Type<ViewChild> } = {};
    subscription: Subscription;
    pageSettings: PageSettings = {};
    photoHover: boolean;
    showPhoto: boolean = true;
    title = "Designation";
    isNameEdit = false;
    isTitleEdit = false;
    isSecModified = false;
    /* DECLARE EDITING IN TEXT AREA VARIABLES */
    isDbClick = false;
    nameConverted = false;
    titleConverted = false;
    finalElements: HTMLCollection[];
    clonedList: CardConfig[];
    isSavedPage: boolean;
    resumeTitle;
    cardMaps: { [bagName: string]: CardConfig[] } = {};

    //@ViewChild('descTextArea') myTextArea:ElementRef;

    /* HEADER CONFIGURATION */
    fontHeaderColor = "#fff";

    /* DECLARE ALL THE VARIABLES OF THE Template1Component */
    myClonedCards: CardConfig[];
    editInfosubscription: Subscription;

    cardStartIndex: any;
    showContent: boolean = true;
    constructor(public dialog: MatDialog, public service: TemplateService, public templateSettings: TemplateSettingService, public dragula: DragulaService,
        public route: ActivatedRoute,
        public router: Router,
        public templateService:TemplateService
    ) {
        let that = this;
        this.subscription = this.templateSettings.getSettingsSubscriber().subscribe(pageSettings => {
            this.pageSettings = pageSettings;
            
            this.showContent = this.pageSettings.showContent;
           if(this.pageSettings.isPreviewMode){
               this.turnPreviewMode();
           }
            

        });
        this.editInfosubscription = this.templateSettings.getEditInfoSubscriber().subscribe(data => {
            this.handleEdit(data);


        });

        const bag: any = this.dragula.find('right');
        if (bag !== undefined ) this.dragula.destroy('right');

        const leftBag: any = this.dragula.find('left');
        if (leftBag !== undefined ) this.dragula.destroy('left');

    this.dragula.setOptions('right',{
        moves: ()=> { 
            if(this.pageSettings.showContent===undefined){
                return false;
            }
            if(this.pageSettings.showContent){
                return false;
            }else {
                return true;
            }
            }

    });
    this.dragula.setOptions('left',{
        moves: ()=> { 
            if(this.pageSettings.showContent===undefined){
                return false;
            }
            if(this.pageSettings.showContent){
                return false;
            }else {
                return true;
            }
            }

    });
       

        this.dragula.drop.subscribe((value) => {

            const [bagName, e, el, source] = value;
            this.finalElements = el.children;

            this.updateCardsAfterDnd(bagName);

        });



        this.dragula.dropModel.subscribe((value) => {
            let [bagName, el, target, source] = value;

            /* this.onDropModel(value.slice(1));*/
        });
        this.dragula.removeModel.subscribe((value) => {
            this.onRemoveModel(value.slice(1));
        });
    }

    private getElementIndex(el: HTMLElement): number {
        return [].slice.call(el.parentElement.children).indexOf(el);
    }
    private updateCardsAfterDnd(placing: string) {
        this.cardMaps[placing] = [];

        [].forEach.call(this.finalElements,
            (el) => {
              
                this.cardsList.forEach((card, index) => {
                    if (card.index == el.dataset.id && card.cardPlacing == placing) {

                        this.cardMaps[placing].push(card);
                    }
                });
            }

        );


      

    }
    turnPreviewMode(){
        this.isPreviewComplete=false;
    }
    private onDropModel(args) {
        let [el, target, source] = args;
        // do something else
    }

    private onRemoveModel(args) {
        let [el, source] = args;
        // do something else
    }
    ngAfterViewInit() {

        this.cardTemplates.toArray().forEach((el, index) => {
            this.cardToTemplateMaping[index] = el;
        });



    }
    ngOnInit() {

        this.sub = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
              //CHECK IF IT IS A SHARED RESUME URL IF SO THEN OPEN IN PREVIEW MODE ONLY
                let id=params['ID'];
                console.log('ID '+id);
                if(id){
                 let title=params['title'];
                 let random=params['random'];
                 console.log(title);
                // let template=params['template'] ;
                 this.service.fetchSharedResume(id,title,random).then((snapshot) => {
                    this.templateService.getProgressSpinnerService().endProgressBar();
                    var snapshotData = snapshot.val();
                    this.service.fetchSharedProfilePicture(id,random).then((url)=>{
                        this.url=url;
                    }).catch(function (error) {
                        console.log('User profile picture doesnt exist');
                      });
                    this.savedTemplateData = snapshotData;
                    this.userName=this.savedTemplateData.data.userName;
                    this.title=this.savedTemplateData.data.designation;
                    this.cardsList=this.savedTemplateData.data.sectionContent;
                    this.headerContactTypes=this.savedTemplateData.data.headerContactTypes;
                    this.pageSettings=snapshotData.pageSettings;
                    if (this.pageSettings === undefined) {
                        
                                            this.pageSettings = {};
                                        }
                  this.pageSettings.isSharedReadOnlyMode=true;
                  this.pageSettings.isPreviewMode=true;
                    this.templateSettings.updateTemplateSetting(this.pageSettings);
                                        this.arrangeCards();
                });

                }else {
                this.isSavedPage = params['saved'] || false;

                let template=params['template'] ;
                let isPreview=params['preview']|| false;
                let UID=params['UID']
                console.log(isPreview);
                this.resumeTitle=template;
                this.resumeID=UID;
                /* FIND OUT THE TEHEME WHICH USER HAS SAVED AND THEN NAVIGATE TO HIS THEME */
                if(this.isSavedPage && UID){
                this.service.fetchUserContent(UID).then((snapshot) => {
                    var snapshotData = snapshot.val();
                    this.templateService.getProgressSpinnerService().endProgressBar();
                    this.savedTemplateData = snapshotData;
                    this.userName=this.savedTemplateData.data.userName;
                    this.title=this.savedTemplateData.data.designation;
                    this.cardsList=this.savedTemplateData.data.sectionContent;
                    this.headerContactTypes=this.savedTemplateData.data.headerContactTypes;
                    /* FETCH PHOTO URL IF EXISTS */
                    this.service.fetchUserProfilePicture(UID).then((url)=>{
                        this.url=url;
                    }).catch(function (error) {
                        console.log('User profile picture doesnt exist');
                      });
                    /* URL FETCHED */
                    this.pageSettings=snapshotData.pageSettings;
                    if (this.pageSettings === undefined) {
                        
                                            this.pageSettings = {};
                                        }
                    this.pageSettings.isPreviewMode=(isPreview=='true')?true:false;
                    this.templateSettings.updateTemplateSetting(this.pageSettings);
                                        this.arrangeCards();
                });
            }
        }

            });
              if(!this.isSavedPage && !this.pageSettings.isSharedReadOnlyMode){
                this.headerContactTypes = this.service.getHeaderContactTypes();
              
              }
            

              

               
            }
        
    

    dragCardIndex;

    arrangeCards(){
        this.clonedList = this.cardsList.map(x => Object.assign({}, x));
        /* MAP THE CARDS PROPERLY */
        let leftCards: CardConfig[] = [];
        let rightCards: CardConfig[] = [];



        this.cardsList.forEach((card, index) => {
            if (card.cardPlacing == 'left') {
                leftCards.push(card);
            } else if (card.cardPlacing == 'right') {
                rightCards.push(card);
            }
        });



        this.cardMaps['left'] = leftCards;
        this.cardMaps['right'] = rightCards;
    }

        onHoverSection(event: any, config: CardConfig) {
            if(this.pageSettings.isPreviewMode){
                config.showConfig = false;
            }else {
                config.showConfig = event;
            }
            

        }
        /* HANDLE THE CARD EDIT CLICK */



        addNewSection(section: Section, component: ComponentType, isAdd: boolean) {
            if (isAdd) {
                let newCard: CardConfig = {

                    title: section.name,
                    cardClass: 'col-md-6',
                    isCardNavigationEnabled: true,
                    isDraggable: true,
                    isDroppable: true,
                    cardId: "" + (this.getLatestIndex() + 1),
                    index: "" + (this.getLatestIndex() + 1),
                    isEnlarge: false,
                    type: component,
                    cardPlacing: 'right'
                };
                this.cardsList.push(newCard);
                //ADD NEW SECTION TO MAP
                let cards = this.cardMaps[newCard.cardPlacing];

                cards.push(newCard);

            }
            else {


                let card = this.cardsList.find(card => card.title == section.name);
                let index = this.cardsList.indexOf(card);
                this.cardsList.splice(index, 1);

                let cards = this.cardMaps['left'];
                card = this.cardsList.find(card => card.title == section.name);
                index = this.cardsList.indexOf(card);
                if (index >= 0) {
                    cards.splice(index, 1);
                }
                cards = this.cardMaps['right'];
                card = this.cardsList.find(card => card.title == section.name);
                index = this.cardsList.indexOf(card);
                if (index >= 0) {
                    cards.splice(index, 1);
                }

            }
            this.isSecModified = true;
            //   this.handleChildClass();

        }

        getLatestIndex(): number{
            let index = 0;
            this.cardsList.forEach((card) => {

                if (index < Number(card.index)) {
                    index = Number(card.index);
                }
            });

            return index;
        }
        geTemplateContent(): any {
            let cardsToBeSaved = [];
            Object.keys(this.cardMaps).forEach(key => {

                // cardsToBeSaved.push(this.cardMaps[key]);

                this.cardMaps[key].forEach(i => {
                    cardsToBeSaved.push(i)
                        ;
                });

            });
if(!this.headerContactTypes) {
    this.headerContactTypes=[];
}
            var templateContent = {
                userName:this.userName,
                designation:this.title,
                sectionContent: cardsToBeSaved,
                headerContactTypes: this.headerContactTypes
            }
            return templateContent;
        }

        onUserPhotoHover(event: any) {
            this.photoHover = event;

        }
        onPhotoHide() {
            this.showPhoto = false;
        }
        onCardDelete(event: any, card: CardConfig){
            //REMOVE FROM THE CARD LIST
            let index = this.cardsList.findIndex(eachCard => card.cardPlacing === eachCard.cardPlacing && card.index === eachCard.index); //find index in your array
            this.cardsList.splice(index, 1);//remove element from array
            let cards = this.cardMaps[card.cardPlacing];
            index = cards.findIndex(eachCard => card.cardPlacing === eachCard.cardPlacing && card.index === eachCard.index); //find index in your array
            cards.splice(index, 1);//remove element from array

            //REMOVE FROM THE CONFIG SET
            this.templateSettings.loadedSections(this.cardsList);

        }
        onCardMove(event: any, card: CardConfig, position: string){
            //REMOVE FROM PREV BUCKET
            let cards = this.cardMaps[card.cardPlacing];
            let index = cards.findIndex(eachCard => card.cardPlacing === eachCard.cardPlacing && card.index === eachCard.index); //find index in your array
            cards.splice(index, 1);//remove element from array

            //ADD TO NEW BUCKET


            //UPDATE THE POSITION
            index = this.cardsList.findIndex(eachCard => card.cardPlacing === eachCard.cardPlacing && card.index === eachCard.index); //find index in your array



            this.cardsList[index].cardPlacing = position;

            card.cardPlacing = position;


            let newCards = this.cardMaps[position];
            newCards.push(card);
        }

        ngOnDestroy() {
            // unsubscribe to ensure no memory leaks
            this.subscription.unsubscribe();
            if(this.sub){
             this.sub.unsubscribe();
            }
        }


        OnEditComplete(event: any, cardDetails: CardConfig){
            cardDetails.isEdit = false;
        }
        onCardEdit(event: any, cardDetails: CardConfig){
            // this.openDialog(cardDetails);
            this.templateSettings.broadCastEdit(cardDetails);
            cardDetails.isEdit = true;
        }

       public abstract handleEdit(data: any);

       rearrangeForPreview(id:string){
        $('#'+id).each(function() {
            console.log(this);
           
          snipMe.call(this);
        });
       }
/* TODO REMOVE */
       preview(){
      //  this.pageSettings.isPreviewMode=true;
        
      
      }

      getSavedResumeTitle():string{
        return this.resumeTitle;
      }


      download(){
       // this.templateService.getProgressSpinnerService().startProgressBar();
        var count= $('.A4').length;
        var curCount=0;
        var doc = new jsPDF('p', 'mm','a4');
        console.log('count'+count);
      
$('.top-header').each(function(){

    console.log('*********');
    console.log(this);
    console.log('count'+count);
  
 // this.style.width= "21cm";
    this.style.height="32.4cm";
 
   
    var imgArray=[];

   

 
            setTimeout(()=>{
            html2canvas(this).then((canvas) =>
            
            {
               
               // canvas.width  = "21cm";
              
                  
                 
                    var imgData = canvas.toDataURL('image/png');
                    canvas.height="297";
                    console.log('******************');
                   
                    console.log('****************')
                  
 
                    //$('#copyCanvas').append(a4);
                  //  imgArray.push(imgData);
                    var imgWidth = 210; 
                    var pageHeight = 295;  
                    var imgHeight = canvas.height * imgWidth / canvas.width;
                    var heightLeft = imgHeight;
              
                  
                    var position = 0;
                    
                    doc.addImage( imgData, 'PNG', 0, 5, 210, 297,'a'+curCount,'FAST');
                    this.style.height="";

                          /*
                          Here are the numbers (paper width and height) that I found to work. 
                          It still creates a little overlap part between the pages, but good enough for me.
                          if you can find an official number from jsPDF, use them.
                          */
                         

                      
                        
                         
                       
                        
                            console.log('adding page');
                            
                        
                        
                        if(count==0){
                            doc.save( 'file.pdf');
                        }
                          else {
                            doc.addPage();
                          }
                        
            
                      
            
                         
                });
        
        }, 1000);
           
          
        

});
          $('.A4').each(function() {
            console.log('*********');
            console.log(this);
            console.log('count'+count);
          
         // this.style.width= "21cm";
            this.style.height="29.7cm";
         //   this.style.display="block";
         //   this.style.margin="0 auto";
         //   this.style.padding="10px 25px";
            
           
            var imgArray=[];
    
           
    
         
                    setTimeout(()=>{
                    html2canvas(this).then((canvas) =>
                    
                    {
                      
                       // canvas.width  = "21cm";
                      
                           curCount++;
                         
                            var imgData = canvas.toDataURL('image/png');
                            console.log('******************');
                           
                            console.log('****************')
                          
         
                            //$('#copyCanvas').append(a4);
                          //  imgArray.push(imgData);
                            var imgWidth = 210; 
                            var pageHeight = 295;  
                            var imgHeight = canvas.height * imgWidth / canvas.width;
                            var heightLeft = imgHeight;
                      
                          
                            var position = 0;
                            
                            doc.addImage( imgData, 'PNG', 0, 5, 210, 297,'a'+curCount,'FAST');
                          
    
                                  /*
                                  Here are the numbers (paper width and height) that I found to work. 
                                  It still creates a little overlap part between the pages, but good enough for me.
                                  if you can find an official number from jsPDF, use them.
                                  */
                                 
        
                              
                                
                                 
                               
                                if(curCount==count){
                                  
                                    console.log('done');
                                   // this.templateService.getProgressSpinnerService().endProgressBar();
                                    doc.save( 'file.pdf');
                                }else {
                                    console.log('adding page');
                                    doc.addPage();
                                }
                                
                                  
                                
                                
                    
                              
                    
                                 
                        });
                
                }, 2000);
                   
                  
                }
    
            );

     
         
       

      
       
      

      
    }
    setResumeInfo(resumeTitle:string,resumeID:string){
        this.resumeTitle=resumeTitle;
        this.resumeID=resumeID;
    }
    getUserPicture(){
      return this.url ==='assets/img/headshot.jpg'?null:this.url;
    }

    getSavedResumeID(){
        return this.resumeID;
    }

}


